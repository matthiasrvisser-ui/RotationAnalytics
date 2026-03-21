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
    body: 'Findings are released only to the Client as defined in the service agreement. Disclosure to any other party requires explicit written direction.',
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
    title: 'Annotated Rotation Schedule (Excel)',
    body: 'The submitted rotation returned with all identified non-conformances flagged directly within the schedule. Issues are annotated where they occur, allowing reviewers to see exactly where provisions, fatigue considerations, or regulatory requirements may not have been met.',
  },
  {
    number: '02',
    title: 'Executive Findings Report',
    body: 'A structured findings report documenting each discrepancy against applicable parameters. Includes risk-classified findings, citation of collective agreement provisions and employment standards, and supporting explanation for internal review.',
  },
  {
    number: '03',
    title: 'Fatigue Risk Analysis Report (Add-On)',
    body: 'Available when fatigue analysis is elected at submission. Per-line fatigue scores, risk classifications, and trend visualisations showing the complete fatigue and recovery cycle across the full rotation. Based on a biomathematical model validated in occupational health research.',
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

      {/* What Sets Us Apart */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            What Sets Us Apart
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Expert knowledge. Purpose-built tools. Focused analysis.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Analyzing rotation schedules for compliance against collective bargaining agreements is extraordinarily complex. Hundreds of provisions. Weeks of shift data. Thousands of individual checkpoints. A human expert can work through a basic rotation in about an hour — but complex schedules take significantly longer, and as complexity increases, violations are inevitably missed.
              </p>
              <p>
                Rotation Analytics combines decades of domain expertise with a proprietary analysis engine built from the ground up for this specific problem. Not a subscription-based platform. Not adapted from general scheduling software. A focused, independent analytical service that delivers documented findings for your review.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">Proprietary Analysis Engine</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Purpose-built to evaluate rotation schedules against collective agreement provisions, employment standards, and fatigue management principles — systematically and completely.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">Flexible Engagement</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Commission analysis when you need it. No platform subscriptions, no long-term contracts. Focused, per-rotation analytical service with documented deliverables.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">Documented Deliverables</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Every analysis produces a marked rotation schedule and a risk-classified executive report — structured for internal review, grievance preparation, or decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="What a Full Report Includes"
        subtitle="Every engagement produces two core deliverables, with an optional third when fatigue analysis is elected."
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

      {/* CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready to discuss an engagement?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation in mind or want to understand what structured analysis would reveal, we are available to discuss your requirements.
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
