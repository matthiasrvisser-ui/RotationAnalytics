import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { AnalysisFlow } from '@/components/AnalysisFlow'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Rotation Analytics Inc applies structured analytical methodology to identify fatigue risk, agreement compliance exposure, and rotation design vulnerabilities across shift-based scheduling environments.',
}

const examineItems = [
  {
    label: 'Individual shift records',
    detail:
      'Start time, end time, shift type, and total hours for each scheduled shift in the rotation period under review.',
  },
  {
    label: 'Rest intervals',
    detail:
      'Elapsed time between the end of one shift and the start of the next, assessed against applicable agreement provisions.',
  },
  {
    label: 'Shift type changes',
    detail:
      'Rapid shift type transitions, specifically night-to-day shift changes, identified and flagged.',
  },
  {
    label: 'Fatigue risk patterns',
    detail:
      'Shift sequences and rest intervals assessed against established occupational health guidelines. These are peer-reviewed best practices, not quantified fatigue scores.',
  },
  {
    label: 'Weekend and statutory holiday distribution',
    detail:
      'Weekends off patterns and statutory holiday assignments across the full rotation, compared to the rotation group where data is available.',
  },
  {
    label: 'Collective agreement provisions',
    detail:
      'Scheduling provisions in the applicable collective agreement cross-referenced against the actual rotation record.',
  },
]

const riskLevels = [
  {
    level: 'High',
    leftBorder: 'border-l-4 border-l-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    description:
      'Immediate basis for grievance proceedings, regulatory non-compliance, or documented occupational health risk. Prompt review warranted.',
  },
  {
    level: 'Moderate',
    leftBorder: 'border-l-4 border-l-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    description:
      'Elevated exposure warranting attention and monitoring. May not yet constitute a grievable violation, but formal documentation is appropriate.',
  },
  {
    level: 'Low',
    leftBorder: 'border-l-4 border-l-green-400',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    description:
      'Parameters met. Documented for completeness and ongoing record.',
  },
]

const referencePoints = [
  'Provincial Labour Standards legislation',
  'Applicable collective agreement scheduling provisions',
  'Occupational Health & Safety Act requirements',
  'Peer-reviewed fatigue science (cited on applicable findings)',
]

export default function Methodology() {
  return (
    <>
      <Hero
        headline="Our Methodology"
        subheadline="How we examine rotation schedules and classify scheduling risk for client review."
      />

      <Section
        title="What We Examine"
        subtitle="Each rotation analysis reviews the following dimensions of the schedule."
        divider
      >
        <div className="divide-y divide-slate-100">
          {examineItems.map((item, i) => (
            <div
              key={i}
              className="py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8"
            >
              <p className="text-sm font-semibold text-slate-900 md:col-span-1">{item.label}</p>
              <p className="text-sm text-slate-600 leading-relaxed md:col-span-3">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Analysis Flow
        </p>
        <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-3xl">
          Our methodology is powered by a proprietary analysis engine built specifically for rotation compliance. Unlike manual review — which scales linearly with rotation complexity and inevitably misses more as schedules grow longer — our tools systematically evaluate every shift against every applicable provision across the full rotation cycle.
        </p>
        <AnalysisFlow />
        <p className="text-xs text-slate-400 mt-5 leading-relaxed max-w-2xl">
          Your rotation is confidential. All findings are delivered only to the commissioning party.
        </p>
      </Section>

      <Section
        title="Risk Classification"
        subtitle="Findings are classified into three levels to guide client prioritisation."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {riskLevels.map((r) => (
            <div key={r.level} className={`rounded-lg ${r.leftBorder} ${r.bg} p-5`}>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded mb-4 ${r.badge}`}>
                {r.level} Risk
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Regulatory Reference Points"
        subtitle="Analyses reference applicable frameworks in context of the specific jurisdiction and collective agreement."
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {referencePoints.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* See the Methodology Applied */}
      <Section className="bg-brand-cream" divider>
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            See the Methodology Applied
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            From rotation to documented findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Walk through a real analysis — from a rotation that passed manual review to the structured report that revealed what was missed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <Link href="/example-rotation" className="group border border-slate-200 bg-white rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">01</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">
              Example Rotation
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              See how a rotation can appear compliant at first glance while containing hidden rest period violations, weekend non-compliance, and on-call scheduling issues.
            </p>
            <span className="text-sm font-medium text-brand-navy">View the rotation &rarr;</span>
          </Link>
          <Link href="/sample-report" className="group border border-slate-200 bg-white rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">02</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">
              Sample Report
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Review the executive report that analysis produced — 15 parameters evaluated, 5 findings documented with risk classifications and agreement references.
            </p>
            <span className="text-sm font-medium text-brand-navy">View the report &rarr;</span>
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
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
              href="/contact"
              className="bg-white text-brand-navy px-7 py-3 rounded font-medium text-sm hover:bg-brand-cream transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/submit"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Already commissioned? Submit Work &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
