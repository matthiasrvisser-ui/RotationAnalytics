'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { STATUS_LABELS, type EngagementStatus } from '@/lib/types'

interface EngagementRow {
  id: string
  created_at: string
  status: EngagementStatus
  org_name: string
  contact_name: string
  email: string
  invoice_number: string | null
  invoice_amount: number | null
  payment_confirmed_at: string | null
  status_token: string
  fatigue_analysis: boolean
  work_order_number: string | null
}

const STATUS_COLORS: Partial<Record<EngagementStatus, string>> = {
  delivered: 'bg-green-100 text-green-800',
  paid: 'bg-green-50 text-green-700',
  awaiting_payment: 'bg-amber-50 text-amber-800',
  invoice_issued: 'bg-amber-50 text-amber-700',
  in_analysis: 'bg-blue-50 text-blue-800',
  closed: 'bg-slate-100 text-slate-500',
}

async function getAdminToken(): Promise<string> {
  const res = await fetch('/api/admin/session')
  if (!res.ok) return ''
  const json = await res.json()
  return json.token ?? ''
}

export default function AdminDashboard() {
  const router = useRouter()
  const [engagements, setEngagements] = useState<EngagementRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hideClosed, setHideClosed] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const fetchEngagements = useCallback(async () => {
    const pw = await getAdminToken()
    const res = await fetch('/api/admin/engagements', {
      headers: { 'x-admin-token': pw },
    })
    if (res.status === 401) {
      router.push('/admin/login')
      return
    }
    const json = await res.json()
    if (!res.ok) { setError(json.error); return }
    setEngagements(json.engagements)
    setLoading(false)
  }, [router])

  useEffect(() => {
    fetchEngagements()
  }, [fetchEngagements])

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  async function archiveEngagement(id: string) {
    const pw = await getAdminToken()
    await fetch(`/api/admin/engagements/${id}`, {
      method: 'PATCH',
      headers: { 'x-admin-token': pw, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'closed' }),
    })
    await fetchEngagements()
  }

  async function deleteEngagement(id: string) {
    const pw = await getAdminToken()
    const res = await fetch(`/api/admin/engagements/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': pw },
    })
    if (res.ok) {
      setConfirmDelete(null)
      await fetchEngagements()
    }
  }

  const filtered = hideClosed
    ? engagements.filter(e => e.status !== 'closed')
    : engagements

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>
  if (error) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500 text-sm">{error}</div>

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Rotation Analytics Inc</p>
          <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">Sign Out</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">
              {filtered.length} engagement{filtered.length !== 1 ? 's' : ''}
              {hideClosed && engagements.length !== filtered.length && (
                <span className="text-slate-400 ml-1">({engagements.length - filtered.length} archived)</span>
              )}
            </p>
            <button
              onClick={() => setHideClosed(!hideClosed)}
              className="text-xs text-brand-navy hover:underline"
            >
              {hideClosed ? 'Show Archived' : 'Hide Archived'}
            </button>
          </div>
          <button onClick={fetchEngagements} className="text-xs text-brand-navy hover:underline">Refresh</button>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-400 text-sm">
            No engagements yet.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Date', 'Organization', 'Contact', 'Status', 'Invoice', 'Paid', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(e => (
                  <tr key={e.id} className={`hover:bg-slate-50 transition-colors ${e.status === 'closed' ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleDateString('en-CA')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">{e.org_name}</div>
                      {e.work_order_number && <div className="text-xs text-slate-400 font-mono">{e.work_order_number}</div>}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{e.contact_name}</div>
                      <div className="text-xs text-slate-400">{e.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[e.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {STATUS_LABELS[e.status]}
                      </span>
                      {e.fatigue_analysis && (
                        <span className="ml-1.5 inline-flex px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600" title="Fatigue Analysis Elected">
                          FA
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {e.invoice_number ? `${e.invoice_number} — $${Number(e.invoice_amount).toFixed(2)}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {e.payment_confirmed_at
                        ? <span className="text-green-600 font-medium">Yes</span>
                        : <span className="text-slate-400">No</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/${e.id}`} className="text-brand-navy text-xs font-medium hover:underline">
                          Manage →
                        </Link>
                        {e.status !== 'closed' ? (
                          <button
                            onClick={() => archiveEngagement(e.id)}
                            title="Archive"
                            className="text-slate-300 hover:text-slate-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          </button>
                        ) : null}
                        {confirmDelete === e.id ? (
                          <span className="flex items-center gap-1">
                            <button
                              onClick={() => deleteEngagement(e.id)}
                              className="text-xs text-red-600 font-semibold hover:underline"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs text-slate-400 hover:underline"
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(e.id)}
                            title="Delete permanently"
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
