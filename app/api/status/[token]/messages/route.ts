import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const { body } = await req.json()
  if (!body?.trim()) return NextResponse.json({ error: 'Message required' }, { status: 400 })

  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('id')
    .eq('status_token', params.token)
    .single()

  if (!engagement) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert({ engagement_id: engagement.id, sender: 'client', body: body.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed to send' }, { status: 500 })

  return NextResponse.json({ success: true, message: data })
}
