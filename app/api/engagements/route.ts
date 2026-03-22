import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendSubmissionConfirmation, sendAdminSubmissionAlert } from '@/lib/email'
import { AGREEMENT_VERSION } from '@/lib/types'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const orgName = formData.get('org_name') as string
    const contactName = formData.get('contact_name') as string
    const email = formData.get('email') as string
    const phone = (formData.get('phone') as string) || null
    const collectiveAgreement = formData.get('collective_agreement') as string
    const localConditions = (formData.get('local_conditions') as string) || null
    const notes = (formData.get('notes') as string) || null
    const agreementAccepted = formData.get('agreement_accepted') === 'true'

    if (!orgName || !contactName || !email || !collectiveAgreement || !agreementAccepted) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create engagement record first
    const { data: engagement, error: insertError } = await supabaseAdmin
      .from('engagements')
      .insert({
        org_name: orgName,
        contact_name: contactName,
        email,
        phone,
        collective_agreement: collectiveAgreement,
        local_conditions: localConditions,
        notes,
        agreement_version: AGREEMENT_VERSION,
        agreement_signed_at: new Date().toISOString(),
        agreement_ip: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip'),
        status: 'agreement_signed',
      })
      .select()
      .single()

    if (insertError || !engagement) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to create engagement' }, { status: 500 })
    }

    // Handle file upload
    const file = formData.get('rotation_file') as File | null
    let filePath: string | null = null

    if (file && file.size > 0) {
      const ext = file.name.split('.').pop()
      filePath = `${engagement.id}/${Date.now()}-rotation.${ext}`
      const buffer = Buffer.from(await file.arrayBuffer())

      const { error: uploadError } = await supabaseAdmin.storage
        .from('rotations')
        .upload(filePath, buffer, { contentType: file.type, upsert: false })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        // Don't fail the engagement — admin can follow up
      }
    }

    // Generate unique random work order number (4 digits, expanding to 5 when exhausted)
    let workOrderNumber = ''
    let digits = 4
    for (let attempt = 0; attempt < 20; attempt++) {
      const max = Math.pow(10, digits)
      const min = Math.pow(10, digits - 1)
      const candidate = String(Math.floor(Math.random() * (max - min)) + min)
      const { data: existing } = await supabaseAdmin
        .from('engagements')
        .select('id')
        .eq('work_order_number', candidate)
        .single()
      if (!existing) { workOrderNumber = candidate; break }
      if (attempt === 18) digits = 5 // expand to 5 digits after exhausting 4-digit space
    }

    // Handle supporting documents
    const supportingFiles = formData.getAll('supporting_documents') as File[]
    const uploadedDocs: { file_path: string; file_name: string; file_size: number }[] = []

    for (const supportFile of supportingFiles) {
      if (!supportFile || supportFile.size === 0) continue
      const safeName = supportFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const docPath = `${engagement.id}/${Date.now()}-${safeName}`
      const docBuffer = Buffer.from(await supportFile.arrayBuffer())

      const { error: docUploadError } = await supabaseAdmin.storage
        .from('supporting-documents')
        .upload(docPath, docBuffer, { contentType: supportFile.type, upsert: false })

      if (!docUploadError) {
        uploadedDocs.push({
          file_path: docPath,
          file_name: supportFile.name,
          file_size: supportFile.size,
        })
      } else {
        console.error('Supporting doc upload error:', docUploadError)
      }
    }

    // Insert supporting document records
    if (uploadedDocs.length > 0) {
      await supabaseAdmin.from('supporting_documents').insert(
        uploadedDocs.map(doc => ({
          engagement_id: engagement.id,
          ...doc,
        }))
      )
    }

    // Update with file path, work order, and advance status
    await supabaseAdmin
      .from('engagements')
      .update({
        rotation_file_path: filePath,
        work_order_number: workOrderNumber,
        status: 'submission_complete',
      })
      .eq('id', engagement.id)

    // Audit log
    await supabaseAdmin.from('audit_log').insert({
      engagement_id: engagement.id,
      action: 'submission_received',
      actor: 'client',
      metadata: { org_name: orgName, has_file: !!filePath, supporting_documents: uploadedDocs.length },
    })

    // Send emails — must await on Vercel serverless (function terminates after response)
    await Promise.allSettled([
      sendSubmissionConfirmation({
        to: email,
        contactName,
        orgName,
        statusToken: engagement.status_token,
        workOrderNumber,
      }),
      sendAdminSubmissionAlert({
        engagementId: engagement.id,
        orgName,
        contactName,
        email,
      }),
    ])

    return NextResponse.json({
      success: true,
      statusToken: engagement.status_token,
    })
  } catch (err) {
    console.error('Engagement creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
