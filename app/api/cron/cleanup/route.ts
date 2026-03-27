import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

// Adjust these to change retention behaviour
const AUTOCLOSE_AFTER_DAYS = 30
const FILE_RETENTION_DAYS = 365

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = { closed: 0, filesDeleted: 0, errors: [] as string[] }

  // ---------------------------------------------------------------
  // 1. Auto-close: delivered engagements where first download was
  //    more than AUTOCLOSE_AFTER_DAYS ago
  // ---------------------------------------------------------------
  const { data: downloadLogs } = await supabaseAdmin
    .from('audit_log')
    .select('engagement_id, created_at')
    .eq('action', 'deliverable_downloaded')
    .order('created_at', { ascending: true })

  // Build map of engagement_id → first download date
  const firstDownloads = new Map<string, Date>()
  for (const log of downloadLogs ?? []) {
    if (!firstDownloads.has(log.engagement_id)) {
      firstDownloads.set(log.engagement_id, new Date(log.created_at))
    }
  }

  const autocloseCutoff = daysAgo(AUTOCLOSE_AFTER_DAYS)
  const candidateIds = Array.from(firstDownloads.entries())
    .filter(([, date]) => date < autocloseCutoff)
    .map(([id]) => id)

  if (candidateIds.length > 0) {
    const { data: toClose } = await supabaseAdmin
      .from('engagements')
      .select('id')
      .in('id', candidateIds)
      .eq('status', 'delivered')

    if (toClose?.length) {
      const ids = toClose.map(e => e.id)
      await supabaseAdmin
        .from('engagements')
        .update({ status: 'closed' })
        .in('id', ids)

      await supabaseAdmin.from('audit_log').insert(
        ids.map(id => ({
          engagement_id: id,
          action: 'auto_closed',
          actor: 'system',
          metadata: { reason: `Auto-closed ${AUTOCLOSE_AFTER_DAYS} days after first download` },
        }))
      )

      results.closed = ids.length
    }
  }

  // ---------------------------------------------------------------
  // 2. File deletion: engagements where deliverable was uploaded
  //    more than FILE_RETENTION_DAYS ago
  // ---------------------------------------------------------------
  const { data: oldUploads } = await supabaseAdmin
    .from('audit_log')
    .select('engagement_id')
    .eq('action', 'deliverable_uploaded')
    .lt('created_at', daysAgo(FILE_RETENTION_DAYS).toISOString())

  const oldIds = Array.from(new Set((oldUploads ?? []).map(l => l.engagement_id)))

  if (oldIds.length > 0) {
    const { data: engagements } = await supabaseAdmin
      .from('engagements')
      .select('id, deliverable_path, rotation_file_path')
      .in('id', oldIds)

    for (const eng of engagements ?? []) {
      try {
        if (eng.deliverable_path) {
          await supabaseAdmin.storage.from('deliverables').remove([eng.deliverable_path])
        }
        if (eng.rotation_file_path) {
          await supabaseAdmin.storage.from('rotations').remove([eng.rotation_file_path])
        }

        await supabaseAdmin
          .from('engagements')
          .update({ deliverable_path: null, rotation_file_path: null })
          .eq('id', eng.id)

        await supabaseAdmin.from('audit_log').insert({
          engagement_id: eng.id,
          action: 'files_deleted',
          actor: 'system',
          metadata: { reason: `Files purged after ${FILE_RETENTION_DAYS}-day retention period` },
        })

        results.filesDeleted++
      } catch (e) {
        results.errors.push(`${eng.id}: ${e}`)
      }
    }
  }

  return NextResponse.json({ ok: true, ...results })
}
