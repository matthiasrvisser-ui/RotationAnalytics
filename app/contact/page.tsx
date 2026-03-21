'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

const timelineSteps = [
  {
    title: 'Enquiry & Scope Confirmation',
    description: 'We review your enquiry and confirm rotation period, worker count, and applicable collective agreement provisions.',
  },
  {
    title: 'Service Agreement',
    description: 'A brief service agreement confirming confidentiality, deliverables, and timeline is issued before work begins.',
  },
  {
    title: 'Analysis & Report Delivery',
    description: 'Rotation files are submitted, analysis is conducted, and the marked schedule and executive report are delivered confidentially.',
  },
]

const inputClass =
  'w-full border border-slate-300 rounded px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors'

const labelClass =
  'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ org: '', contactName: '', email: '', phone: '', message: '' })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Hero
        headline="Get in Touch"
        subheadline="Discuss an engagement for independent rotation analysis — from a single rotation review to a full schedule evaluation."
        secondaryCta={{ label: 'Already commissioned? Begin Engagement', href: '/engage' }}
      />

      {/* How It Works */}
      <Section className="bg-brand-cream" divider>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          How It Works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-lg overflow-hidden">
          {timelineSteps.map((s, i) => (
            <div key={i} className="bg-white p-8">
              <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center mb-5">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-5 leading-relaxed">
          All communications and materials are treated as confidential from first contact.
        </p>
      </Section>

      {/* What to Expect + Form */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left — What to Expect */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              What to Expect
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              A Rotation Analytics engagement is straightforward: you submit a rotation, we analyze it, you receive documented findings. No platform subscriptions. No long-term contracts.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Purpose-Built Analysis</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Every shift evaluated against every applicable provision across the full rotation cycle — powered by proprietary compliance tools.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Documented Deliverables</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    A marked rotation schedule and risk-classified executive report, delivered confidentially to the Client.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Flexible Engagement</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Commission analysis when you need it. Per-rotation service — no subscriptions, no ongoing commitment required.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Not sure what to expect?{' '}
                <Link href="/example-rotation" className="text-brand-navy font-medium hover:underline">See an example rotation</Link>
                {' and the '}
                <Link href="/sample-report" className="text-brand-navy font-medium hover:underline">sample executive report</Link>
                {' it produced.'}
              </p>
            </div>

            <div className="mt-6 border border-slate-200 rounded-lg p-5 space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Direct Contact
              </p>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-brand-navy flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+14035063636" className="text-sm text-slate-700 hover:text-brand-navy transition-colors">
                  (403) 506-3636
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-brand-navy flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:hello@rotationanalytics.ca" className="text-sm text-slate-700 hover:text-brand-navy transition-colors">
                  hello@rotationanalytics.ca
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-brand-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-sm text-slate-700 leading-relaxed">
                  PO Box 2234<br />
                  Crossfield, Alberta<br />
                  Canada
                </p>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Enquiry
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-green-800 mb-2">Enquiry Received</p>
                <p className="text-sm text-green-700 leading-relaxed">
                  Thank you. We will respond within 2 business days at <strong>{form.email}</strong>.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} aria-label="Engagement enquiry form">
                <div>
                  <label htmlFor="org" className={labelClass}>
                    Organization Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="org"
                    type="text"
                    autoComplete="organization"
                    required
                    value={form.org}
                    onChange={e => set('org', e.target.value)}
                    className={inputClass}
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Contact Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.contactName}
                    onChange={e => set('contactName', e.target.value)}
                    className={inputClass}
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>Contact Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    className={inputClass}
                    placeholder="+1 (___) ___-____"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message / Comments</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Brief description of your rotation environment, scheduling concerns, or any questions."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
                    Something went wrong. Please try again or email us directly at hello@rotationanalytics.ca.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-brand-navy text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  We respond within 2 business days. No commitment until a service agreement is issued and accepted.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
