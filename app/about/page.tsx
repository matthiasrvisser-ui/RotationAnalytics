import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Rotation Analytics Inc — an independent analytical firm providing structured third-party review of rotation schedules for unions, labour relations leadership, and Health & Safety committees.',
}

const commitments = [
  {
    title: 'Independence',
    body: 'Analysis is conducted without structural alignment to any party to the scheduling arrangement. No ownership, financial, or contractual relationship exists with any employer, employer association, or management body.',
  },
  {
    title: 'Confidentiality',
    body: 'Findings are released only to the commissioning party as defined in the engagement agreement. Disclosure to any other party requires explicit written direction in that agreement.',
  },
  {
    title: 'Accuracy',
    body: 'All findings are documented with references to the specific scheduling data, applicable provisions, and the methodological basis for each classification.',
  },
  {
    title: 'Clarity',
    body: 'Reports are written to be useful to the commissioning party, not to demonstrate analytical sophistication. Plain language is used throughout.',
  },
  {
    title: 'Scope Integrity',
    body: 'We produce what is commissioned. We do not add recommendations outside the agreed analytical scope or advise on bargaining strategy.',
  },
  {
    title: 'Support — Not Replacement',
    body: "Rotation Analytics Inc supports the commissioning party's review process. It does not substitute for the party's own expertise, judgement, or authority.",
  },
]

const clientTypes = [
  'Healthcare union locals',
  'Labour relations leadership',
  'Health & Safety committees',
  'Worker and union representatives',
  'Any organization requiring independent rotation evaluation',
]

const deliverables = [
  {
    number: '01',
    title: 'Marked Rotation Schedule (Excel)',
    body: 'Your submitted rotation returned with all identified non-conformances clearly flagged directly within the schedule. Lines are flagged and issues are annotated where they occur in the rotation, allowing reviewers to see exactly where scheduling provisions, fatigue considerations, or regulatory requirements may not have been met.',
  },
  {
    number: '02',
    title: 'Executive Summary Report',
    body: "A structured findings report explaining each discrepancy identified in the schedule compared to applicable parameters, with the basis for each observation documented. Includes risk-classified findings, direct citation of applicable collective agreement provisions and employment standards, and improvement guidance for the commissioning party's internal use.",
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
                Rotation Analytics Inc is an independent analytical firm specializing in the review of complex rotational staffing schedules.
              </p>
              <p>
                Our work is built on decades of real-world experience in healthcare union shift environments, where collective agreements, fatigue risk, and operational demands intersect. We combine that practical expertise with proprietary analytical tools designed specifically to evaluate rotation schedules at a level not achievable through routine review.
              </p>
              <p>
                We conduct structured, third-party analysis of rotation schedules, identifying collective agreement non-compliance, fatigue risk exposure, and structural scheduling issues across full rotation cycles. The result is a documented findings report delivered to the commissioning organization for its own review and decision-making.
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
                While our expertise is healthcare, the methodology applies to any fatigue-sensitive, shift-based operation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="What a Full Report Includes"
        subtitle="Every engagement produces two core deliverables supported by structured analytical findings."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {commitments.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-brand-navy mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section divider>
        <div className="max-w-3xl space-y-2 text-sm text-slate-500 leading-relaxed">
          <p>
            Rotation Analytics Inc does not design rotation schedules. We evaluate existing rotations independently to support informed review and decision-making by the commissioning party.
          </p>
        </div>
      </Section>

      <Section title="Enquiries">
        <div className="max-w-xl">
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            If you represent a union, Health &amp; Safety committee, or labour relations body and want to understand how rotation analysis might support your work, we are available to discuss. Commissioned clients may submit rotation files directly.
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
