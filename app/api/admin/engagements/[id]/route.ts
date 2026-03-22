import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendInvoiceNotification, sendDeliverableReady } from '@/lib/email'
import type { EngagementStatus } from '@/lib/types'

export const runtime = 'nodejs'

function isAuthorized(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rotationanalytics.ca'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: auditData } = await supabaseAdmin
    .from('audit_log')
    .select('*')
    .eq('engagement_id', params.id)
    .order('created_at', { ascending: false })

  return NextResponse.json({ engagement: data, audit: auditData ?? [] })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { status, admin_notes, invoice_number, invoice_amount, payment_link } = body

  const { data: engagement, error: fetchError } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('id', params.id)
    .single()

  if (fetchError || !engagement) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updates: Record<string, unknown> = {}

  if (status) updates.status = status
  if (admin_notes !== undefined) updates.admin_notes = admin_notes

  if (status === 'invoice_issued') {
    updates.invoice_number = invoice_number
    updates.invoice_amount = invoice_amount
    updates.invoice_issued_at = new Date().toISOString()
  }

  if (status === 'paid') {
    updates.payment_confirmed_at = new Date().toISOString()
  }

  // Persist status update FIRST — emails should never block the DB write
  const { error: updateError } = await supabaseAdmin
    .from('engagements')
    .update(updates)
    .eq('id', params.id)

  if (updateError) {
    console.error('Engagement update error:', updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    engagement_id: params.id,
    action: status ? `status_changed_to_${status}` : 'admin_notes_updated',
    actor: 'admin',
    metadata: { previous_status: engagement.status, ...updates },
  })

  // Send notification emails AFTER successful DB update (failures logged, never block response)
  let emailSent = false
  try {
    if (status === 'invoice_issued' && payment_link) {
      await sendInvoiceNotification({
        to: engagement.email,
        contactName: engagement.contact_name,
        orgName: engagement.org_name,
        invoiceNumber: invoice_number,
        invoiceAmount: Number(invoice_amount),
        paymentLink: payment_link,
        statusToken: engagement.status_token,
      })
      emailSent = true
    }

    if (status === 'delivered' && engagement.deliverable_token) {
      const downloadUrl = `${BASE_URL}/api/deliverable/${engagement.deliverable_token}`
      await sendDeliverableReady({
        to: engagement.email,
        contactName: engagement.contact_name,
        orgName: engagement.org_name,
        downloadUrl,
      })
      emailSent = true
    }
  } catch (emailErr) {
    console.error('Email notification failed (status update succeeded):', emailErr)
  }

  return NextResponse.json({ success: true, emailSent })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('id, rotation_file_path, deliverable_path')
    .eq('id', params.id)
    .single()

  if (!engagement) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Clean up storage files
  if (engagement.rotation_file_path) {
    await supabaseAdmin.storage.from('rotations').remove([engagement.rotation_file_path])
  }
  if (engagement.deliverable_path) {
    await supabaseAdmin.storage.from('deliverables').remove([engagement.deliverable_path])
  }

  // Clean up supporting documents storage
  const { data: docs } = await supabaseAdmin
    .from('supporting_documents')
    .select('file_path')
    .eq('engagement_id', params.id)

  if (docs?.length) {
    await supabaseAdmin.storage.from('supporting-documents').remove(docs.map(d => d.file_path))
  }

  // Delete engagement (cascades to messages, supporting_documents, audit_log)
  const { error } = await supabaseAdmin
    .from('engagements')
    .delete()
    .eq('id', params.id)

  if (error) {
    console.error('Delete engagement error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
