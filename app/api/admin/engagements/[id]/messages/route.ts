import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

function validateAdmin(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token && token === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('engagement_id', params.id)
    .order('created_at', { ascending: true })

  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { body } = await req.json()
  if (!body?.trim()) return NextResponse.json({ error: 'Message required' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert({ engagement_id: params.id, sender: 'admin', body: body.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })

  return NextResponse.json({ success: true, message: data })
}
