import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

// Simple in-memory rate limiter — 5 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > MAX_ATTEMPTS
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many lookup attempts. Please try again later or contact us for assistance.' },
        { status: 429 }
      )
    }

    const { work_order, email } = await req.json()

    if (!work_order || !email) {
      return NextResponse.json({ error: 'Work order number and email are required.' }, { status: 400 })
    }

    // Intentional delay on all lookups to slow brute-force attempts
    await new Promise(resolve => setTimeout(resolve, 800))

    const { data: engagement, error } = await supabaseAdmin
      .from('engagements')
      .select('status_token')
      .eq('work_order_number', work_order.trim())
      .ilike('email', email.trim())
      .single()

    if (error || !engagement) {
      return NextResponse.json(
        { error: 'No engagement found. Please verify your work order number and email address.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ statusToken: engagement.status_token })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
