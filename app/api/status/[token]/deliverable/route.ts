import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('status, deliverable_path')
    .eq('status_token', params.token)
    .single()

  if (!engagement?.deliverable_path) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  if (!['delivered', 'closed'].includes(engagement.status)) {
    return NextResponse.json({ error: 'Deliverable not yet available.' }, { status: 403 })
  }

  const { data } = await supabaseAdmin.storage
    .from('deliverables')
    .createSignedUrl(engagement.deliverable_path, 3600)

  if (!data?.signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download link.' }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
