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
    .select('rotation_file_path')
    .eq('id', params.id)
    .single()

  if (!engagement?.rotation_file_path) {
    return NextResponse.json({ error: 'No rotation file found' }, { status: 404 })
  }

  const { data, error } = await supabaseAdmin.storage
    .from('rotations')
    .createSignedUrl(engagement.rotation_file_path, 3600) // 1-hour signed URL

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}
