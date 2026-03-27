import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

function isAuthorized(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('deliverable_path')
    .eq('id', params.id)
    .single()

  if (!engagement?.deliverable_path) {
    return NextResponse.json({ error: 'No deliverable on file.' }, { status: 404 })
  }

  const { data } = await supabaseAdmin.storage
    .from('deliverables')
    .createSignedUrl(engagement.deliverable_path, 3600)

  if (!data?.signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download link.' }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('deliverable') as File | null

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filePath = `${params.id}/${Date.now()}-deliverable.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from('deliverables')
    .upload(filePath, buffer, { contentType: file.type, upsert: true })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Generate a download token and 7-day expiry
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const { error: updateError } = await supabaseAdmin
    .from('engagements')
    .update({
      deliverable_path: filePath,
      deliverable_token: crypto.randomUUID(),
      deliverable_expires_at: expiresAt.toISOString(),
    })
    .eq('id', params.id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  await supabaseAdmin.from('audit_log').insert({
    engagement_id: params.id,
    action: 'deliverable_uploaded',
    actor: 'admin',
    metadata: { file_path: filePath },
  })

  return NextResponse.json({ success: true })
}
