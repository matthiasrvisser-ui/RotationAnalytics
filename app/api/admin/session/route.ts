import { NextRequest, NextResponse } from 'next/server'

// Returns the admin password from the cookie so client-side JS can use it for API header auth.
// Only returns it if the cookie is already valid — no security escalation possible.
export async function GET(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ token: session })
}
