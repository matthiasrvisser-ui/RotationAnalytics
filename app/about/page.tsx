import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Rotation Analytics Inc — an independent analytical firm providing structured third-party review of rotation schedules for any organization requiring expert, non-affiliated rotation analysis.',
}

const commitments = [
  {
    title: 'Independence',
    body: 'No ownership, financial, or contractual relationship exists with any employer, employer association, or management body. Analysis is conducted without structural alignment to any party to the scheduling arrangement.',
  },
  {
    title: 'Confidentiality',
    body: 'Findings are released only to the commissioning party as defined in the engagement agreement. Disclosure to any other party requires explicit written direction.',
  },
  {
    title: 'Accuracy',
    body: 'All findings are documented with references to the specific scheduling data, applicable provisions, and the methodological basis for each classification.',
  },
  {
    title: 'Scope Integrity',
    body: 'We produce what is commissioned. We do not add recommendations outside the agreed scope, advise on bargaining strategy, or substitute for the client\'s own expertise and authority.',
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

const deliverables = [
  {
    number: '01',
    title: 'Marked Rotation Schedule (Excel)',
    body: 'The submitted rotation returned with all identified non-conformances flagged directly within the schedule. Issues are annotated where they occur, allowing reviewers to see exactly where provisions, fatigue considerations, or regulatory requirements may not have been met.',
  },
  {
    number: '02',
    title: 'Executive Summary Report',
    body: 'A structured findings report documenting each discrepancy against applicable parameters. Includes risk-classified findings, citation of collective agreement provisions and employment standards, and supporting explanation for internal review.',
  },
]

export default function About() {
  return (
    <>
      <Hero
        headline="About Rotation Analytics Inc"
        subheadline="An independent analytical firm providing structured third-party review of rotation schedules. Analysis conducted without structural alignment to any party to the scheduling arrangement."
      />

      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">What We Do</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Rotation Analytics Inc is an independent analytical firm specializing in the review of complex rotational staffing schedules. Our expertise is built on decades of real-world experience in healthcare union shift environments, combined with proprietary analytical tools designed to evaluate rotation schedules at a level not achievable through routine review.
              </p>
              <p>
                We conduct structured, third-party analysis identifying collective agreement non-compliance, fatigue risk exposure, and structural scheduling issues across full rotation cycles. The result is a documented findings report delivered to the commissioning organization for its own review and decision-making.
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

      <Section
        title="What a Full Report Includes"
        subtitle="Every engagement produces two core deliverables."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {deliverables.map((d) => (
            <div key={d.number} className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-bold text-slate-300 tracking-widest mb-4 text-2xl leading-none">
                {d.number}
              </p>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{d.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Our Commitments"
        subtitle="The principles that govern how we work."
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {commitments.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-brand-navy mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Enquiries">
        <div className="max-w-xl">
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            If your organization requires independent rotation analysis, we are available to discuss scope and engagement terms. Commissioned clients may submit rotation files directly.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Request a Pilot Discussion
            </Link>
            <Link
              href="/submit"
              className="inline-block border border-slate-300 text-slate-700 px-7 py-3 rounded font-medium text-sm hover:border-slate-400 transition-colors"
            >
              Submit Work
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
