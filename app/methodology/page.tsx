import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Rotation Analytics applies the Independent Rotation Assurance™ methodology — identifying structural fatigue risk, agreement interpretation exposure, and rotation design vulnerabilities across shift-based scheduling environments.',
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
      'The elapsed time between the end of one shift and the start of the next. The established minimum under most provincial health sector collective agreements and labour standards is 11 hours.',
  },
  {
    label: 'Consecutive shift sequences',
    detail:
      'Night shift strings, extended stretches of consecutive working days, and rapid shift type rotations (day to night, evening to day, night to day).',
  },
  {
    label: 'Fatigue accumulation',
    detail:
      'Estimated cumulative fatigue exposure based on shift type, sequence, and rest intervals, referenced against NIOSH and peer-reviewed occupational health standards.',
  },
  {
    label: 'Weekend and statutory holiday distribution',
    detail:
      'Pattern of weekend and statutory holiday assignments across the full rotation, compared to the rotation group where data is available.',
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
      'The scheduling pattern represents an immediate potential for grievance proceedings, regulatory non-compliance, or documented occupational health risk. The finding warrants prompt attention by the union committee.',
  },
  {
    level: 'Moderate',
    leftBorder: 'border-l-4 border-l-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    description:
      'The pattern warrants union attention and monitoring. It may not yet constitute a grievable violation but represents elevated exposure that should be tracked and formally documented.',
  },
  {
    level: 'Low',
    leftBorder: 'border-l-4 border-l-green-400',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    description:
      'Documented for completeness. The item is not immediately concerning but is captured in the report record. It may escalate under a continued or repeated pattern.',
  },
]

const referencePoints = [
  'Provincial Labour Standards legislation',
  'Applicable collective agreement scheduling provisions',
  'Occupational Health & Safety Act requirements',
  'NIOSH shiftwork and fatigue guidelines',
  'Peer-reviewed fatigue science (cited on applicable findings)',
]

export default function Methodology() {
  return (
    <>
      <Hero
        headline="Our Methodology"
        subheadline="How we examine rotation schedules and identify scheduling risk for union review."
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

      <Section
        title="Risk Classification"
        subtitle="Identified findings are classified into three levels to guide union prioritisation."
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
            Independent Rotation Assurance™ operates exclusively on behalf of unions and worker representatives. We do not accept engagements from employers, management, or facility administration.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            Findings are produced for and released only to the commissioning party. Our analysis is never shared with the employer without the explicit direction of the commissioning union.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            This independence is not incidental — it is the structural basis of the assurance. A rotation analysis produced without a clear independence standard cannot reliably serve the interests of workers.
          </p>
        </div>
      </Section>

      <Section divider>
        <div className="max-w-3xl space-y-2 text-sm text-slate-500 leading-relaxed">
          <p>
            Rotation Analytics does not design schedules for employers.
            Independent Rotation Assurance™ evaluates existing rotations independently to support
            informed review and decision-making.
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
