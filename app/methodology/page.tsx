import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { AnalysisFlow } from '@/components/AnalysisFlow'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Rotation Analytics Inc applies structured analytical methodology — identifying fatigue risk, agreement interpretation exposure, and rotation design vulnerabilities across shift-based scheduling environments.',
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
      'The elapsed time between the end of one shift and the start of the next based agreement provisions.',
  },
  {
    label: 'Shift Type Changes',
    detail:
      'Rapid shift type changes, specifically Night Shift to Day Shift changes are identified.',
  },
  {
    label: 'Fatigue risk patterns',
    detail:
      'Shift sequences and rest intervals assessed against established occupational health guidelines to identify scheduling patterns associated with fatigue risk. These are occupational best practices from peer-reviewed standards; they are not quantified fatigue scores.',
  },
  {
    label: 'Weekend and statutory holiday distribution',
    detail:
      'Weekends off patterns, and statutory holiday assignments across the full rotation, compared to the rotation group where data is available.',
  },
  {
    label: 'Collective agreement provisions',
    detail:
      'Scheduling provisions stipulated in the applicable collective agreement are cross-referenced against the actual rotation record.',
  },
]

const riskLevels = [
  {
    level: 'High',
    leftBorder: 'border-l-4 border-l-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    description:
      'The scheduling pattern presents an immediate basis for grievance proceedings, regulatory non-compliance, or documented occupational health risk. Prompt review by the commissioning party is warranted.',
  },
  {
    level: 'Moderate',
    leftBorder: 'border-l-4 border-l-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    description:
      'The pattern warrants attention and monitoring. It may not yet constitute a grievable violation, but it represents elevated exposure. Tracking and formal documentation are appropriate.',
  },
  {
    level: 'Low',
    leftBorder: 'border-l-4 border-l-green-400',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    description:
      'Parameters have been met. Documented for completeness. The item is not immediately concerning, and this is captured in the report record.',
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
        subheadline="How we examine rotation schedules and identify scheduling risk for review by the commissioning party."
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
          Your rotation is confidential and all findings are delivered only to the commissioning party.
        </p>
      </Section>

      <Section
        title="Risk Classification"
        subtitle="Identified findings are classified into three levels to guide commissioning party prioritisation."
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
        title="Our Independence"
        subtitle="The structural foundation of the assurance we provide."
        divider
      >
        <div className="max-w-3xl space-y-5">
          <p className="text-base text-slate-600 leading-relaxed">
            Rotation Analytics Inc operates as an independent entity. It holds no ownership, financial, or contractual relationship with any employer, employer association, or management body, and accepts no instruction from any external party.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            Findings reflect the rotation record as submitted and are assessed against established occupational health standards, regulatory requirements, and applicable collective agreement provisions. They are analytical interpretations, not advocacy positions and not representative of the interests of any party.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            All materials received and findings produced within an engagement are treated as strictly confidential. The scope of each engagement, and the parties to whom findings are released, are defined in the engagement agreement prior to commencement.
          </p>
        </div>
      </Section>

      <Section divider>
        <div className="max-w-3xl space-y-2 text-sm text-slate-500 leading-relaxed">
          <p>
            Rotation Analytics Inc currently does not design rotation schedules; we expertly evaluate existing rotations to provide informed review and decision-making for our clients.
          </p>
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
