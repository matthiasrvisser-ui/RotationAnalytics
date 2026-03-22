'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

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
        subheadline="Reach out to discuss independent rotation analysis — whether it's a single rotation or a full schedule evaluation."
        secondaryCta={{ label: 'Already commissioned? Begin Engagement', href: '/engage' }}
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left — Direct contact + what happens next */}
          <div>
            <div className="border border-slate-200 rounded-lg p-5 space-y-3 mb-6">
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

            <div className="bg-brand-cream border border-slate-200 rounded-lg p-5 mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                What Happens Next
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                We respond within 2 business days. We&rsquo;ll discuss your rotation environment, the collective agreement(s) in scope, and confirm engagement structure and timeline — before any commitment.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                All communications are confidential from first contact.
              </p>
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
                    placeholder="Your rotation environment, any scheduling concerns, or questions you have."
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
                  {status === 'submitting' ? 'Sending\u2026' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
