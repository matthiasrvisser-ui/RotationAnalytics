import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

function isAuthorized(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

// List supporting documents for an engagement
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('supporting_documents')
    .select('*')
    .eq('engagement_id', params.id)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data ?? [])
}

// Download a specific supporting document (pass ?doc_id=xxx)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { doc_id } = await req.json()
  if (!doc_id) return NextResponse.json({ error: 'doc_id required' }, { status: 400 })

  const { data: doc } = await supabaseAdmin
    .from('supporting_documents')
    .select('file_path')
    .eq('id', doc_id)
    .eq('engagement_id', params.id)
    .single()

  if (!doc?.file_path) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  const { data, error } = await supabaseAdmin.storage
    .from('supporting-documents')
    .createSignedUrl(doc.file_path, 3600)

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}
