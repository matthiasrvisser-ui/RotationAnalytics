import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Independent Rotation Assurance™ — independent rotation schedule analysis produced exclusively for healthcare unions and worker representatives.',
}

const commitments = [
  {
    title: 'Independence',
    body: 'No employer relationships. No management-side engagements. All analysis is produced exclusively for union use.',
  },
  {
    title: 'Confidentiality',
    body: 'Findings are released only to the commissioning party. Reports are never shared with the employer without explicit union direction.',
  },
  {
    title: 'Accuracy',
    body: 'All findings are documented with references to the specific scheduling data, applicable provisions, and the methodological basis for each classification.',
  },
  {
    title: 'Clarity',
    body: 'Reports are written to be useful to union committees — not to demonstrate analytical sophistication. Plain language is used throughout.',
  },
  {
    title: 'Scope Integrity',
    body: 'We produce what is commissioned. We do not add recommendations outside the agreed analytical scope or advise on bargaining strategy.',
  },
  {
    title: 'Support — Not Replacement',
    body: 'Independent Rotation Assurance™ supports union decision-making. It does not replace union expertise, judgement, or authority.',
  },
]

const clientTypes = [
  'Healthcare union locals',
  'Labour Relations leadership',
  'Health & Safety committees',
  'Union-appointed occupational health representatives',
]

export default function About() {
  return (
    <>
      <Hero
        headline="About Independent Rotation Assurance™"
        subheadline="Independent, structured analysis of rotation schedules — produced for unions, not for management."
      />

      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">What We Do</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Independent Rotation Assurance™ provides third-party analysis of healthcare rotation schedules.
                We examine shift records for rest period compliance, fatigue accumulation, consecutive shift patterns,
                and collective agreement provisions — then produce structured reports for union review.
              </p>
              <p>
                Our work is analytical. We do not negotiate, represent, or advise on strategy. We produce documented
                findings that support the work of union committees, labour relations representatives, and Health &amp; Safety directors.
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
                <strong className="text-slate-900 font-semibold">We do not accept engagements from employers.</strong>{' '}
                Our independence from management is the foundation of the assurance we provide.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Our Commitments"
        subtitle="The principles that govern how we work."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {commitments.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-brand-navy mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Enquiries" divider>
        <div className="max-w-xl">
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            If you represent a union, Health & Safety committee, or labour relations body in the healthcare sector
            and want to understand how rotation analysis might support your work, we are available to discuss.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  )
}
