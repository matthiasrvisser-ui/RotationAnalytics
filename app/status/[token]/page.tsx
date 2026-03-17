import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { Section } from '@/components/Section'
import { MessageThread } from '@/components/MessageThread'
import { STATUS_LABELS, STATUS_ORDER, type EngagementStatus, type Message } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rotationanalytics.ca'

export const dynamic = 'force-dynamic'

function StatusBadge({ status }: { status: EngagementStatus }) {
  const colors: Partial<Record<EngagementStatus, string>> = {
    delivered: 'bg-green-100 text-green-800 border-green-200',
    paid: 'bg-green-50 text-green-700 border-green-200',
    awaiting_payment: 'bg-amber-50 text-amber-800 border-amber-200',
    invoice_issued: 'bg-amber-50 text-amber-700 border-amber-200',
    in_analysis: 'bg-blue-50 text-blue-800 border-blue-200',
    closed: 'bg-slate-100 text-slate-600 border-slate-200',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors[status] ?? 'bg-slate-50 text-slate-700 border-slate-200'}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export default async function StatusPage({ params }: { params: { token: string } }) {
  const { data: engagement, error } = await supabaseAdmin
    .from('engagements')
    .select('id, status, org_name, contact_name, email, created_at, agreement_signed_at, invoice_number, invoice_amount, invoice_issued_at, payment_confirmed_at, deliverable_token, deliverable_expires_at, work_order_number')
    .eq('status_token', params.token)
    .single()

  if (error || !engagement) notFound()

  const { data: messages } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('engagement_id', engagement.id)
    .order('created_at', { ascending: true })

  const currentIndex = STATUS_ORDER.indexOf(engagement.status as EngagementStatus)
  const hasDeliverable = engagement.status === 'delivered' && engagement.deliverable_token
  const downloadUrl = hasDeliverable ? `${BASE_URL}/api/deliverable/${engagement.deliverable_token}` : null

  return (
    <>
      <div className="bg-brand-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Engagement Status</p>
          <h1 className="text-3xl font-bold mb-2">{engagement.org_name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={engagement.status as EngagementStatus} />
            <span className="text-white/50 text-sm">
              Submitted {new Date(engagement.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {engagement.work_order_number && (
              <span className="text-white/40 text-sm font-mono">{engagement.work_order_number}</span>
            )}
          </div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Progress tracker */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Engagement Progress</p>

            <div className="space-y-0">
              {STATUS_ORDER.filter(s => s !== 'draft' && s !== 'closed').map((s, i, arr) => {
                const isDone = STATUS_ORDER.indexOf(s) <= currentIndex
                const isCurrent = s === engagement.status
                const isLast = i === arr.length - 1

                return (
                  <div key={s} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDone ? isCurrent ? 'bg-brand-navy text-white ring-4 ring-brand-navy/20' : 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {isDone && !isCurrent ? '✓' : i + 1}
                      </div>
                      {!isLast && <div className={`w-0.5 h-8 mt-1 ${isDone ? 'bg-brand-navy' : 'bg-slate-200'}`} />}
                    </div>
                    <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                      <p className={`text-sm font-semibold mt-1 ${isCurrent ? 'text-brand-navy' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                        {STATUS_LABELS[s]}
                        {isCurrent && <span className="ml-2 text-xs bg-brand-navy/10 text-brand-navy px-2 py-0.5 rounded-full">Current</span>}
                      </p>

                      {s === 'submission_complete' && isDone && (
                        <p className="text-xs text-slate-500 mt-0.5">Files received. Analysis will begin shortly.</p>
                      )}
                      {s === 'in_analysis' && isDone && (
                        <p className="text-xs text-slate-500 mt-0.5">Analysis underway. Estimated turnaround: 24 hours (best effort, not guaranteed).</p>
                      )}
                      {s === 'invoice_issued' && engagement.invoice_number && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          Invoice {engagement.invoice_number} — ${Number(engagement.invoice_amount).toFixed(2)} CAD. Check your email for payment link.
                        </p>
                      )}
                      {s === 'awaiting_payment' && isCurrent && (
                        <p className="text-xs text-amber-600 font-medium mt-0.5">Deliverable is held pending payment confirmation.</p>
                      )}
                      {s === 'paid' && engagement.payment_confirmed_at && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          Payment confirmed {new Date(engagement.payment_confirmed_at).toLocaleDateString('en-CA')}.
                        </p>
                      )}
                      {s === 'delivered' && isDone && downloadUrl && (
                        <div className="mt-2">
                          <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded text-xs font-semibold hover:bg-brand-navy-dark transition-colors"
                          >
                            Download Deliverable
                          </a>
                          {engagement.deliverable_expires_at && (
                            <p className="text-xs text-slate-400 mt-1">
                              Link expires {new Date(engagement.deliverable_expires_at).toLocaleDateString('en-CA')}.
                              Contact us to reissue.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 border-t border-slate-100 pt-8">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Messages</p>
              <MessageThread messages={(messages ?? []) as Message[]} token={params.token} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-brand-cream border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Engagement Details</p>
              <dl className="space-y-2 text-sm">
                {engagement.work_order_number && (
                  <div>
                    <dt className="text-slate-500 text-xs">Work Order</dt>
                    <dd className="text-slate-800 font-mono font-medium">{engagement.work_order_number}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-slate-500 text-xs">Organization</dt>
                  <dd className="text-slate-800 font-medium">{engagement.org_name}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs">Contact</dt>
                  <dd className="text-slate-800">{engagement.contact_name}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs">Agreement Signed</dt>
                  <dd className="text-slate-800">{new Date(engagement.agreement_signed_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Enquiries</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                For status enquiries, contact us and reference your organization name and submission date.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Important Notice</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deliverables are released only upon payment confirmation. No licence or usage rights exist prior to payment. Findings are analytical observations only — not legal, safety, or compliance determinations.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
