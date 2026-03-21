import { NextRequest, NextResponse } from 'next/server'
import { sendEnquiry } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { org, contactName, email, phone, message } = await req.json()

    if (!org || !contactName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendEnquiry({ org, contactName, email, phone, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
