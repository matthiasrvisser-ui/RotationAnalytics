import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Rotation Analytics Inc — an independent analytical firm providing third-party review of rotation schedules for any organization requiring expert, non-affiliated rotation analysis.',
}

const commitments = [
  {
    title: 'Independence',
    body: 'No ownership, financial, or contractual relationship with any employer, employer association, or management body.',
  },
  {
    title: 'Confidentiality',
    body: 'Findings released only to the client as defined in the service agreement.',
  },
  {
    title: 'Accuracy',
    body: 'All findings documented with specific data references, applicable provisions, and methodological basis.',
  },
  {
    title: 'Scope Integrity',
    body: 'We produce what is commissioned. We do not advise on bargaining strategy or substitute for the client\u2019s own authority.',
  },
]

const clientTypes = [
  'Unions and worker representatives',
  'Employers and management',
  'Labour relations professionals',
  'Health & Safety committees',
  'Scheduling and workforce deployment platforms',
  'Any organization requiring independent rotation evaluation',
]

export default function About() {
  return (
    <>
      <Hero
        headline="About Rotation Analytics Inc"
        subheadline="An independent analytical firm providing third-party review of rotation schedules. Analysis conducted without alignment to any party to the scheduling arrangement."
      />

      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">What We Do</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Rotation Analytics is an independent analytical firm specializing in the review of rotational staffing schedules. Our expertise is built on decades of real-world experience in healthcare union shift environments, combined with a proprietary analysis engine that evaluates rotation schedules at a level not achievable through routine review.
              </p>
              <p>
                We identify collective agreement non-compliance, fatigue risk exposure, and scheduling issues across full rotation cycles. The result is a documented findings report delivered to the commissioning organization for its own review and decision-making.
              </p>
              <p>
                We do not negotiate, represent parties, or advise on labour strategy. Our role is analytical, neutral, and evidence-focused.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Who We Work With</h2>
            <ul className="space-y-3 mb-6">
              {clientTypes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">
                Our expertise originates in healthcare, but the methodology applies to any fatigue-sensitive, shift-based operation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Leadership
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-8">
            Built by people who have lived the schedules.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white text-sm font-bold">
                  KV
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Kristy Visser</p>
                  <p className="text-xs text-slate-500">Principal Analyst</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Former frontline registered nurse who transitioned into rotation consulting over a decade ago. Kristy has spent the last 10 years building rotation schedules, advising on schedule design, and training organizations across unionized healthcare environments. Her firsthand experience as both a shift worker and a rotation specialist is the foundation of every parameter Rotation Analytics evaluates.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white text-sm font-bold">
                  MV
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Matthias Visser</p>
                  <p className="text-xs text-slate-500">Founder &amp; CEO</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Entrepreneur and business operator responsible for the technology, analytical infrastructure, and commercial operations behind Rotation Analytics. Matthias designed and built the proprietary analysis engine that powers every engagement &mdash; turning decades of domain expertise into a tool that finds what manual review cannot.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 leading-relaxed">
            Rotation Analytics is a division of Visser Ventures Corp., incorporated under the laws of the Province of Alberta, Canada.
          </p>
        </div>
      </Section>

      {/* Commitments */}
      <Section divider>
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Our Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commitments.map((c) => (
              <div key={c.title} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{c.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready to discuss an engagement?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation in mind or want to understand what independent analysis would reveal, we are available to discuss your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-5 items-center">
            <Link
              href="/engage"
              className="bg-white text-brand-navy px-7 py-3 rounded font-medium text-sm hover:bg-brand-cream transition-colors"
            >
              Begin an Engagement
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
