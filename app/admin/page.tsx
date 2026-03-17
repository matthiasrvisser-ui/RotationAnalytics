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

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>
  if (error) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500 text-sm">{error}</div>

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Rotation Analytics</p>
          <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">Sign Out</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">{engagements.length} engagement{engagements.length !== 1 ? 's' : ''}</p>
          <button onClick={fetchEngagements} className="text-xs text-brand-navy hover:underline">Refresh</button>
        </div>

        {engagements.length === 0 ? (
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
                {engagements.map(e => (
                  <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleDateString('en-CA')}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{e.org_name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{e.contact_name}</div>
                      <div className="text-xs text-slate-400">{e.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[e.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {STATUS_LABELS[e.status]}
                      </span>
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
                      <Link href={`/admin/${e.id}`} className="text-brand-navy text-xs font-medium hover:underline">
                        Manage →
                      </Link>
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
