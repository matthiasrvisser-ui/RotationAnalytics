'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { STATUS_LABELS, STATUS_ORDER, type EngagementStatus, type Engagement, type AuditEntry, type Message } from '@/lib/types'

interface SupportingDoc {
  id: string
  file_name: string
  file_size: number | null
  created_at: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rotationanalytics.ca'

let _adminToken = ''
async function getAdminToken(): Promise<string> {
  if (_adminToken) return _adminToken
  const res = await fetch('/api/admin/session')
  if (!res.ok) return ''
  const json = await res.json()
  _adminToken = json.token ?? ''
  return _adminToken
}

async function authHeaders(): Promise<Record<string, string>> {
  return { 'x-admin-token': await getAdminToken() }
}

export default function EngagementDetail() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [engagement, setEngagement] = useState<Engagement | null>(null)
  const [audit, setAudit] = useState<AuditEntry[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [msgBody, setMsgBody] = useState('')
  const [sendingMsg, setSendingMsg] = useState(false)

  // Invoice form state
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [paymentLink, setPaymentLink] = useState('')

  // Admin notes
  const [adminNotes, setAdminNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)

  // Deliverable upload
  const [deliverableFile, setDeliverableFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  // Supporting documents
  const [supportingDocs, setSupportingDocs] = useState<SupportingDoc[]>([])

  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = useCallback(async () => {
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}`, { headers })
    if (res.status === 401) { router.push('/admin/login'); return }
    const json = await res.json()
    setEngagement(json.engagement)
    setAudit(json.audit ?? [])
    setAdminNotes(json.engagement?.admin_notes ?? '')

    // Load messages
    const msgRes = await fetch(`/api/admin/engagements/${id}/messages`, { headers })
    if (msgRes.ok) setMessages(await msgRes.json())

    // Load supporting documents
    const docsRes = await fetch(`/api/admin/engagements/${id}/supporting-documents`, { headers })
    if (docsRes.ok) setSupportingDocs(await docsRes.json())

    setLoading(false)
  }, [id, router])

  useEffect(() => { load() }, [load])

  async function updateStatus(newStatus: EngagementStatus, extra?: Record<string, unknown>) {
    setActionLoading(true)
    setMessage(null)
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, ...extra }),
    })
    const json = await res.json()
    if (res.ok) {
      setMessage({ type: 'success', text: `Status updated to: ${STATUS_LABELS[newStatus]}` })
      await load()
    } else {
      setMessage({ type: 'error', text: json.error })
    }
    setActionLoading(false)
  }

  async function saveNotes() {
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_notes: adminNotes }),
    })
    if (res.ok) { setNotesSaved(true); setTimeout(() => setNotesSaved(false), 2000) }
  }

  async function issueInvoice() {
    if (!invoiceNumber || !invoiceAmount) {
      setMessage({ type: 'error', text: 'Invoice number and amount are required.' })
      return
    }
    await updateStatus('invoice_issued', {
      invoice_number: invoiceNumber,
      invoice_amount: Number(invoiceAmount),
      payment_link: paymentLink,
    })
  }

  async function sendMessage() {
    if (!msgBody.trim()) return
    setSendingMsg(true)
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}/messages`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: msgBody }),
    })
    if (res.ok) {
      const { message } = await res.json()
      setMessages(prev => [...prev, message])
      setMsgBody('')
    }
    setSendingMsg(false)
  }

  async function downloadRotation() {
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}/rotation`, { headers })
    if (res.ok) {
      const { url } = await res.json()
      window.open(url, '_blank')
    } else {
      setMessage({ type: 'error', text: 'Failed to generate download link.' })
    }
  }

  async function downloadSupportingDoc(docId: string) {
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}/supporting-documents`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ doc_id: docId }),
    })
    if (res.ok) {
      const { url } = await res.json()
      window.open(url, '_blank')
    } else {
      setMessage({ type: 'error', text: 'Failed to generate download link.' })
    }
  }

  async function uploadDeliverable() {
    if (!deliverableFile) return
    setUploading(true)
    setMessage(null)
    const form = new FormData()
    form.append('deliverable', deliverableFile)
    const headers = await authHeaders()
    const res = await fetch(`/api/admin/engagements/${id}/deliverable`, {
      method: 'POST',
      headers,
      body: form,
    })
    const json = await res.json()
    if (res.ok) {
      setMessage({ type: 'success', text: 'Deliverable uploaded. Now mark as Delivered to notify client.' })
      await load()
    } else {
      setMessage({ type: 'error', text: json.error })
    }
    setUploading(false)
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>
  if (!engagement) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500 text-sm">Not found.</div>

  const currentIndex = STATUS_ORDER.indexOf(engagement.status)
  const nextStatuses = STATUS_ORDER.slice(currentIndex + 1).filter(s => s !== 'draft')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{engagement.org_name}</h1>
              <p className="text-xs text-slate-400">
                {engagement.work_order_number && <span className="font-mono mr-2">{engagement.work_order_number}</span>}
                {engagement.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`${BASE_URL}/status/${engagement.status_token}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-navy hover:underline"
            >
              View Client Status →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Actions */}
          <div className="lg:col-span-2 space-y-6">

            {/* Status */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Current Status</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg font-semibold text-slate-800">{STATUS_LABELS[engagement.status]}</span>
              </div>

              {/* Quick advance */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Advance Status</p>
                {engagement.status !== 'invoice_issued' && nextStatuses
                  .filter(s => s !== 'invoice_issued')
                  .map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      disabled={actionLoading}
                      className="block w-full text-left px-4 py-2.5 border border-slate-200 rounded text-sm hover:border-brand-navy hover:bg-brand-navy/5 transition-colors disabled:opacity-50"
                    >
                      Mark as: <strong>{STATUS_LABELS[s]}</strong>
                    </button>
                  ))}
              </div>
            </div>

            {/* Invoice */}
            {!engagement.invoice_number && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Issue Invoice</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">Invoice Number *</label>
                      <input
                        type="text"
                        value={invoiceNumber}
                        onChange={e => setInvoiceNumber(e.target.value)}
                        placeholder="e.g. RA-2025-001"
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">Amount (CAD) *</label>
                      <input
                        type="number"
                        value={invoiceAmount}
                        onChange={e => setInvoiceAmount(e.target.value)}
                        placeholder="200.00"
                        min="0"
                        max="600"
                        step="0.01"
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Payment Link (QuickBooks / Stripe)</label>
                    <input
                      type="url"
                      value={paymentLink}
                      onChange={e => setPaymentLink(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                    />
                  </div>
                  <button
                    onClick={issueInvoice}
                    disabled={actionLoading}
                    className="bg-brand-navy text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-brand-navy-dark transition-colors disabled:opacity-50"
                  >
                    Issue Invoice &amp; Notify Client
                  </button>
                </div>
              </div>
            )}

            {engagement.invoice_number && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">Invoice Issued</p>
                <p className="text-sm text-amber-900">
                  {engagement.invoice_number} — ${Number(engagement.invoice_amount).toFixed(2)} CAD
                  {engagement.invoice_issued_at && ` — Issued ${new Date(engagement.invoice_issued_at).toLocaleDateString('en-CA')}`}
                </p>
                {!engagement.payment_confirmed_at && (
                  <button
                    onClick={() => updateStatus('paid')}
                    disabled={actionLoading}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    Confirm Payment Received
                  </button>
                )}
              </div>
            )}

            {/* Deliverable upload */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Upload Deliverable</p>
              {engagement.deliverable_path ? (
                <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3 mb-4">
                  Deliverable uploaded. After payment is confirmed, mark status as Delivered to notify client.
                </div>
              ) : null}
              <div className="space-y-3">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf,.zip"
                  onChange={e => setDeliverableFile(e.target.files?.[0] ?? null)}
                  className="block text-sm text-slate-600"
                />
                <button
                  onClick={uploadDeliverable}
                  disabled={uploading || !deliverableFile}
                  className="bg-brand-navy text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-brand-navy-dark transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading…' : 'Upload Deliverable'}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Client Messages</p>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {messages.length === 0 && <p className="text-xs text-slate-400">No messages yet.</p>}
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${m.sender === 'admin' ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <p>{m.body}</p>
                      <p className={`text-xs mt-1 ${m.sender === 'admin' ? 'text-white/60' : 'text-slate-400'}`}>
                        {new Date(m.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                        {' · '}{m.sender === 'admin' ? 'You' : 'Client'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={msgBody}
                  onChange={e => setMsgBody(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Reply to client…"
                  className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                />
                <button
                  onClick={sendMessage}
                  disabled={sendingMsg || !msgBody.trim()}
                  className="bg-brand-navy text-white px-4 py-2 rounded text-sm font-medium hover:bg-brand-navy-dark disabled:opacity-50 transition-colors"
                >
                  {sendingMsg ? '…' : 'Send'}
                </button>
              </div>
            </div>

            {/* Admin notes */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Internal Notes</p>
              <textarea
                rows={4}
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                placeholder="Internal notes (not visible to client)…"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
              />
              <button
                onClick={saveNotes}
                className="mt-2 text-xs text-brand-navy font-medium hover:underline"
              >
                {notesSaved ? 'Saved ✓' : 'Save Notes'}
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Client</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-xs text-slate-400">Organization</dt><dd className="font-medium text-slate-800">{engagement.org_name}</dd></div>
                <div><dt className="text-xs text-slate-400">Contact</dt><dd>{engagement.contact_name}</dd></div>
                <div><dt className="text-xs text-slate-400">Email</dt><dd><a href={`mailto:${engagement.email}`} className="text-brand-navy hover:underline">{engagement.email}</a></dd></div>
                {engagement.phone && <div><dt className="text-xs text-slate-400">Phone</dt><dd>{engagement.phone}</dd></div>}
              </dl>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Submission</p>
              <dl className="space-y-2 text-sm">
                {engagement.work_order_number && (
                  <div><dt className="text-xs text-slate-400">Work Order</dt><dd className="font-mono font-semibold text-slate-800">{engagement.work_order_number}</dd></div>
                )}
                <div>
                  <dt className="text-xs text-slate-400">Analysis Type</dt>
                  <dd>
                    {engagement.fatigue_analysis ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">Fatigue Analysis Elected</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600">Compliance Only</span>
                    )}
                  </dd>
                </div>
                <div><dt className="text-xs text-slate-400">Agreement Signed</dt><dd>{new Date(engagement.agreement_signed_at).toLocaleDateString('en-CA')}</dd></div>
                <div><dt className="text-xs text-slate-400">Agreement Version</dt><dd>{engagement.agreement_version}</dd></div>
                <div><dt className="text-xs text-slate-400">Collective Agreement</dt><dd>{engagement.collective_agreement}</dd></div>
                {engagement.local_conditions && <div><dt className="text-xs text-slate-400">Local Conditions</dt><dd>{engagement.local_conditions}</dd></div>}
                {engagement.notes && <div><dt className="text-xs text-slate-400">Notes</dt><dd className="text-xs text-slate-500">{engagement.notes}</dd></div>}
                {engagement.rotation_file_path && (
                  <div>
                    <dt className="text-xs text-slate-400">Rotation File</dt>
                    <dd>
                      <button
                        onClick={downloadRotation}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-navy hover:underline mt-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Rotation
                      </button>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Supporting Documents */}
            {supportingDocs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Supporting Documents</p>
                <div className="space-y-2">
                  {supportingDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-700 truncate">{doc.file_name}</p>
                        {doc.file_size && <p className="text-xs text-slate-400">{(doc.file_size / 1024).toFixed(0)} KB</p>}
                      </div>
                      <button
                        onClick={() => downloadSupportingDoc(doc.id)}
                        className="flex-shrink-0 text-xs font-medium text-brand-navy hover:underline"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audit log */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Audit Log</p>
              <div className="space-y-2">
                {audit.length === 0 && <p className="text-xs text-slate-400">No entries.</p>}
                {audit.map(entry => (
                  <div key={entry.id} className="flex gap-2 text-xs">
                    <span className="text-slate-400 whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString('en-CA')}
                    </span>
                    <span className="text-slate-600">{entry.action}</span>
                    <span className={`ml-auto text-xs ${entry.actor === 'admin' ? 'text-brand-navy' : 'text-slate-400'}`}>{entry.actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
