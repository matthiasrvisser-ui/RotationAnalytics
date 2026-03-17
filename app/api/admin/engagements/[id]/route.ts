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

    // Send invoice email
    if (payment_link) {
      sendInvoiceNotification({
        to: engagement.email,
        contactName: engagement.contact_name,
        orgName: engagement.org_name,
        invoiceNumber: invoice_number,
        invoiceAmount: Number(invoice_amount),
        paymentLink: payment_link,
        statusToken: engagement.status_token,
      }).catch(console.error)
    }
  }

  if (status === 'paid') {
    updates.payment_confirmed_at = new Date().toISOString()
  }

  if (status === 'delivered' && engagement.deliverable_token) {
    const downloadUrl = `${BASE_URL}/api/deliverable/${engagement.deliverable_token}`
    sendDeliverableReady({
      to: engagement.email,
      contactName: engagement.contact_name,
      orgName: engagement.org_name,
      downloadUrl,
    }).catch(console.error)
  }

  const { error: updateError } = await supabaseAdmin
    .from('engagements')
    .update(updates)
    .eq('id', params.id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    engagement_id: params.id,
    action: status ? `status_changed_to_${status}` : 'admin_notes_updated',
    actor: 'admin',
    metadata: { previous_status: engagement.status, ...updates },
  })

  return NextResponse.json({ success: true })
}
