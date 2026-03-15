import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Rotation Analytics Inc to request a pilot engagement discussion. We accept engagements commissioned by healthcare unions, worker representatives, and Health & Safety committees.',
}

const primaryConcerns = [
  'Rest period compliance (short rest intervals)',
  'Consecutive shift sequencing (night shifts, extended stretches)',
  'Weekend and statutory holiday distribution',
  'Collective agreement provision review',
  'Fatigue risk patterns and shift sequencing',
  'General rotation assessment',
  'Other',
]

const rotationVolumes = [
  '1–5 workers',
  '6–20 workers',
  '21–50 workers',
  '51 or more workers',
  'Unknown at this time',
]

const nextSteps = [
  {
    number: '01',
    title: 'Initial Response',
    description:
      'We will review your enquiry and respond within 2 business days to confirm that your situation falls within our scope.',
  },
  {
    number: '02',
    title: 'Scope Confirmation',
    description:
      'We will confirm the rotation period, worker count, and collective agreement provisions relevant to the analysis.',
  },
  {
    number: '03',
    title: 'Engagement Agreement',
    description:
      'A brief engagement letter is issued to the commissioning party confirming confidentiality, deliverables, and timeline before work begins.',
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
        headline="Contact"
        subheadline="Request a pilot engagement discussion. We accept engagements commissioned by healthcare unions, worker representatives, and Health &amp; Safety committees."
      />

      <Section divider>
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            New Engagement
          </p>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Request a Pilot Discussion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left — What Happens Next */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Eligibility
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                We accept engagements commissioned by healthcare unions, worker representatives, and
                Health &amp; Safety committees.
              </p>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 mb-6 uppercase tracking-wide">
              What Happens Next
            </h3>

            <div className="space-y-7">
              {nextSteps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-semibold flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">{step.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 leading-relaxed">
                All communications are treated as confidential. Enquiries are not shared with employers
                or third parties.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Already commissioned?{' '}
                <Link href="/submit" className="text-brand-navy hover:underline font-medium">
                  Submit your rotation files here.
                </Link>
              </p>
            </div>
          </div>

          {/* Right — Pilot Request Form */}
          <form className="space-y-5" aria-label="Pilot discussion request form">
            <div>
              <label htmlFor="org" className={labelClass}>
                Organisation <span className="text-red-400">*</span>
              </label>
              <input
                id="org"
                type="text"
                autoComplete="organization"
                required
                aria-required="true"
                className={inputClass}
                placeholder="Union local or organisation name"
              />
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>
                Your Role <span className="text-red-400">*</span>
              </label>
              <input
                id="role"
                type="text"
                required
                aria-required="true"
                className={inputClass}
                placeholder="e.g. Local President, H&S Representative, Labour Relations Officer"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-400">*</span>
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
              <label htmlFor="volume" className={labelClass}>
                Rotation Volume Estimate
              </label>
              <select
                id="volume"
                className={inputClass}
                defaultValue=""
                aria-label="Estimated number of workers in the rotation"
              >
                <option value="" disabled>
                  Select number of workers
                </option>
                {rotationVolumes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="concern" className={labelClass}>
                Primary Concern
              </label>
              <select
                id="concern"
                className={inputClass}
                defaultValue=""
                aria-label="Primary scheduling concern"
              >
                <option value="" disabled>
                  Select primary concern
                </option>
                {primaryConcerns.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Additional Context
              </label>
              <textarea
                id="message"
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Describe the scheduling concern, applicable collective agreement provisions, or any other context that would help us assess scope."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Submit Enquiry
            </button>

            <p className="text-xs text-slate-400 text-center">
              We typically respond within 2 business days. No commitment is made until an engagement
              letter is issued and accepted.
            </p>
          </form>
        </div>
      </Section>
    </>
  )
}
