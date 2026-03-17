import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  const { data: engagement, error } = await supabaseAdmin
    .from('engagements')
    .select('id, status, deliverable_path, deliverable_expires_at, org_name')
    .eq('deliverable_token', token)
    .single()

  if (error || !engagement) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 })
  }

  if (engagement.status !== 'delivered' && engagement.status !== 'paid') {
    return NextResponse.json({ error: 'Deliverable not yet available' }, { status: 403 })
  }

  if (engagement.deliverable_expires_at) {
    const expires = new Date(engagement.deliverable_expires_at)
    if (expires < new Date()) {
      return NextResponse.json({ error: 'Download link has expired' }, { status: 410 })
    }
  }

  if (!engagement.deliverable_path) {
    return NextResponse.json({ error: 'Deliverable not yet uploaded' }, { status: 404 })
  }

  // Generate a signed URL (1 hour)
  const { data: signed, error: signError } = await supabaseAdmin.storage
    .from('deliverables')
    .createSignedUrl(engagement.deliverable_path, 3600)

  if (signError || !signed) {
    return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 })
  }

  // Audit
  await supabaseAdmin.from('audit_log').insert({
    engagement_id: engagement.id,
    action: 'deliverable_downloaded',
    actor: 'client',
    metadata: { token },
  })

  return NextResponse.redirect(signed.signedUrl)
}
