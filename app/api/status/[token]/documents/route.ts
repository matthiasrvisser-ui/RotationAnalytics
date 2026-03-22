import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file size (10 MB max)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File exceeds 10 MB limit' }, { status: 400 })
  }

  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('id, status')
    .eq('status_token', params.token)
    .single()

  if (!engagement) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Only allow uploads during active workflow stages
  const allowedStatuses = ['submission_complete', 'in_analysis', 'invoice_issued', 'awaiting_payment']
  if (!allowedStatuses.includes(engagement.status)) {
    return NextResponse.json({ error: 'Document upload is not available at this stage' }, { status: 400 })
  }

  // Check existing document count (cap at 10 per engagement)
  const { count } = await supabaseAdmin
    .from('supporting_documents')
    .select('id', { count: 'exact', head: true })
    .eq('engagement_id', engagement.id)

  if ((count ?? 0) >= 10) {
    return NextResponse.json({ error: 'Maximum document limit reached. Please contact us directly.' }, { status: 400 })
  }

  // Upload to storage
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const docPath = `${engagement.id}/${Date.now()}-${safeName}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from('supporting-documents')
    .upload(docPath, buffer, { contentType: file.type, upsert: false })

  if (uploadError) {
    console.error('Supporting doc upload error:', uploadError)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  // Insert record
  const { error: insertError } = await supabaseAdmin
    .from('supporting_documents')
    .insert({
      engagement_id: engagement.id,
      file_path: docPath,
      file_name: file.name,
      file_size: file.size,
    })

  if (insertError) {
    console.error('Supporting doc insert error:', insertError)
    return NextResponse.json({ error: 'Failed to record document' }, { status: 500 })
  }

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    engagement_id: engagement.id,
    action: 'document_uploaded',
    actor: 'client',
    metadata: { file_name: file.name, file_size: file.size },
  })

  return NextResponse.json({ success: true, fileName: file.name })
}
