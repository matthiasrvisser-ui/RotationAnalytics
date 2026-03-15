import type { Metadata } from 'next'
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
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Analysis Flow
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
        className="bg-brand-cream"
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
    </>
  )
}
