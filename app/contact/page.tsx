import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Rotation Analytics Inc to discuss an engagement for independent rotation analysis.',
}

const timelineSteps = [
  {
    number: '01',
    title: 'Enquiry & Scope Confirmation',
    description: 'We review your enquiry and confirm rotation period, worker count, and applicable collective agreement provisions.',
  },
  {
    number: '02',
    title: 'Service Agreement',
    description: 'A brief service agreement confirming confidentiality, deliverables, and timeline is issued before work begins.',
  },
  {
    number: '03',
    title: 'Analysis & Report Delivery',
    description: 'Rotation files are submitted, analysis is conducted, and the marked schedule and executive report are delivered confidentially.',
  },
]

const inputClass =
  'w-full border border-slate-300 rounded px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors'

const labelClass =
  'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5'

export default function Contact() {
  return (
    <>
      <Hero
        headline="Get in Touch"
        subheadline="Discuss an engagement for independent rotation analysis — from a single rotation review to a full schedule evaluation."
        secondaryCta={{ label: 'Already commissioned? Submit Work', href: '/submit' }}
      />

      {/* How It Works — process first, then form */}
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
                    A marked rotation schedule and risk-classified executive report, delivered confidentially to the commissioning party.
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
          </div>

          {/* Right — Contact Form */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Enquiry
            </p>

            <form className="space-y-5" aria-label="Engagement enquiry form">
              <div>
                <label htmlFor="org" className={labelClass}>
                  Organization Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="org"
                  type="text"
                  autoComplete="organization"
                  required
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Contact Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="+1 (___) ___-____"
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message / Comments
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Brief description of your rotation environment, scheduling concerns, or any questions."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-navy text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
              >
                Submit Enquiry
              </button>

              <p className="text-xs text-slate-400 text-center">
                We respond within 2 business days. No commitment until a service agreement is issued and accepted.
              </p>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
