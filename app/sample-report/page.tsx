import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { RiskCard } from '@/components/RiskCard'

export const metadata: Metadata = {
  title: 'Sample Report',
  description:
    'A representative Independent Rotation Assurance™ report from Rotation Analytics, showing how fatigue risk, agreement interpretation exposure, and rotation design vulnerabilities are documented and classified for union review.',
}

const findings = [
  {
    level: 'high' as const,
    title: 'Rest Period Violations — Recurring Quick Return Pattern',
    description:
      'Four instances identified over the 4-week rotation where the interval between consecutive shifts falls below the 11-hour minimum established in the collective agreement and provincial labour standards.',
    finding:
      'Mar 7 (8h), Mar 16 (8h), Mar 23 (9h), Mar 29 (8.5h). The pattern is recurring and structurally consistent across the rotation, indicating a scheduling design issue rather than an isolated occurrence.',
    reference: 'Art. 14.03 — Rest Between Shifts | Labour Standards Act s.36',
  },
  {
    level: 'high' as const,
    title: 'Consecutive Night Shifts — Exceeds Established Occupational Health Guideline',
    description:
      'A sequence of six consecutive night shifts was identified in Week 3. Established occupational health guidelines (NIOSH, 2020) indicate that sequences exceeding four consecutive nights are associated with significantly elevated cumulative fatigue and error risk.',
    finding:
      'Sequence runs Mar 11–16. Estimated cumulative fatigue score of 62 points over this stretch, based on the Fatigue Risk Management framework applied in this analysis. Exceeds the moderate-risk threshold of 45.',
    reference: 'NIOSH Night Shift Guidelines | CBA Art. 12.07',
  },
  {
    level: 'moderate' as const,
    title: 'Weekend Distribution — Inequitable Assignment Pattern',
    description:
      'Analysis of the 4-week rotation reveals this worker is scheduled for 5 of 8 weekend days (62.5%). The collective agreement provides for equitable distribution of weekend work within the rotation group.',
    finding:
      'Weekend distribution for this worker: 62.5%. Rotation group average: 48.3%. The differential of 14.2 percentage points warrants review under the applicable equitable distribution provision.',
    reference: 'CBA Art. 15.01 — Weekend Scheduling',
  },
  {
    level: 'low' as const,
    title: 'Annual Overtime Accumulation — Within Expected Range',
    description:
      'Overtime hours to date are within expected ranges and no collective agreement threshold has been approached. Documented for completeness and ongoing period tracking.',
    finding:
      'YTD overtime as of end of rotation period: 14.5 hours. No threshold triggers apply. No action required at this time.',
    reference: 'CBA Art. 18.01 — Overtime Provisions',
  },
]

const reportSections = [
  'Executive Summary',
  'Rotation Record — Full 4-Week Schedule',
  'Fatigue Accumulation Map',
  'Findings — Classified by Risk Level',
  'Regulatory and Collective Agreement References',
  'Recommended Actions for Union Review',
  'Methodology Notes',
]

const reportMeta = [
  { label: 'Worker', value: '[Anonymized]' },
  { label: 'Classification', value: 'Registered Nurse' },
  { label: 'Facility', value: '[Anonymized]' },
  { label: 'Period', value: 'March 2025' },
  { label: 'Commissioned By', value: '[Union Local]' },
  { label: 'Analyst', value: 'IRA — File #2025-0047' },
  { label: 'Date Issued', value: 'March 31, 2025' },
  { label: 'Status', value: 'Final' },
]

export default function SampleReport() {
  return (
    <>
      <Hero
        headline="Sample Report"
        subheadline="A representative Independent Rotation Assurance™ report, showing the structure, depth, and format of findings delivered to unions."
      />

      <Section divider>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10 text-sm text-amber-800">
          <strong>Representative example.</strong> Names, facility identifiers, collective agreement references, and dates are illustrative.
          Findings are drawn from common scheduling patterns for demonstration purposes only.
        </div>

        {/* Report header block */}
        <div className="border border-slate-200 rounded-lg overflow-hidden mb-12">
          <div className="bg-brand-navy px-6 py-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
              Confidential — For Union Use Only
            </p>
            <h2 className="text-xl font-bold text-white">Rotation Assurance Report</h2>
          </div>
          <div className="bg-white px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 border-b border-slate-100">
            {reportMeta.map((item) => (
              <div key={item.label}>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm text-slate-800 font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive summary */}
        <div className="max-w-3xl mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Executive Summary</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            This report presents findings from an independent analysis of the rotation schedule for the above-referenced worker over a 4-week period in March 2025. The analysis examined rest periods, shift sequencing, fatigue accumulation, weekend distribution, and applicable collective agreement provisions.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Two high-risk findings were identified: a recurring quick-return pattern (rest periods below the 11-hour minimum on four occasions) and an extended consecutive night shift sequence exceeding established occupational health guidelines. One moderate-risk finding relates to inequitable weekend distribution. One low-risk item is documented for ongoing tracking.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Recommended actions are noted for each finding. The union committee should review these findings in the context of the applicable collective agreement and determine appropriate next steps.
          </p>
        </div>

        {/* Risk summary badges */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-full text-sm font-semibold">
            2 High Risk Findings
          </div>
          <div className="bg-amber-100 text-amber-700 border border-amber-200 px-4 py-2 rounded-full text-sm font-semibold">
            1 Moderate Risk Finding
          </div>
          <div className="bg-green-100 text-green-700 border border-green-200 px-4 py-2 rounded-full text-sm font-semibold">
            1 Low Risk Finding
          </div>
        </div>
      </Section>

      {/* Findings */}
      <Section
        title="Findings"
        subtitle="All identified scheduling irregularities, classified by risk level."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {findings.map((f, i) => (
            <RiskCard key={i} {...f} />
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section
        title="What a Full Report Includes"
        subtitle="Every Independent Rotation Assurance™ report is delivered with the following sections."
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {reportSections.map((section, i) => (
            <div key={i} className="flex items-center gap-4 bg-brand-cream border border-slate-200 rounded-lg p-4">
              <div className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-slate-700">{section}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Commission an Analysis</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Independent Rotation Assurance™ accepts engagements from unions and worker representatives. Contact us to discuss a rotation analysis for your members.
          </p>
          <Link
            href="/contact"
            className="bg-white text-brand-navy px-7 py-3 rounded font-medium text-sm hover:bg-brand-cream transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  )
}
