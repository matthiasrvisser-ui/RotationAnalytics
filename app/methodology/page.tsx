import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Rotation Analytics examines rotation schedules, classifies compliance and fatigue risk, and delivers independent findings for client review.',
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
      'Shift sequences and rest intervals assessed using a biomathematical fatigue model that quantifies sleep pressure, circadian rhythm disruption, and accumulated sleep debt across the full rotation. Quantified fatigue scoring is available separately through the Fatigue Risk Analysis add-on.',
  },
  {
    label: 'Weekend distribution',
    detail:
      'Weekends are analyzed using two primary parameters: the minimum hours off required to classify a period as a weekend, and the total number of weekends off within a defined timeframe. Some agreements also require weekends off to be distributed equally.',
  },
  {
    label: 'On-call shift validation',
    detail:
      'On-call scheduling assessed against collective agreement provisions, including placement relative to off-duty days, frequency, and rest period interactions. This validation is unique to Rotation Analytics',
  },
  {
    label: 'Collective agreement provisions',
    detail:
      'Scheduling provisions in the applicable collective agreement cross-referenced against the actual rotation record.',
  },
]

const referencePoints = [
  'Provincial employment standards legislation',
  'Applicable collective agreement scheduling provisions',
  'Peer-reviewed fatigue science (cited in applicable findings)',
]

export default function Methodology() {
  return (
    <>
      <Hero
        headline="Our Methodology"
        subheadline="How Rotation Analytics examines rotation schedules and classifies scheduling risk for client review."
      />

      <Section
        title="What We Examine"
        subtitle="Each compliance analysis reviews the following dimensions of the schedule."
        divider
      >
        <div className="divide-y divide-slate-100 mb-10">
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

        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Regulatory Reference Points
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 max-w-3xl">
          Each analysis references the applicable frameworks for its jurisdiction and collective agreement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
          {referencePoints.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Risk Classification */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Risk Classification
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Two dimensions of scheduling risk.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-3xl">
            Compliance analysis and fatigue analysis evaluate different aspects of the schedule and use different risk scales. When both are elected, findings combine to form the complete rotation risk profile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compliance */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-4">
                Compliance Risk
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Each scheduling parameter is evaluated against collective agreement provisions, employment standards, and regulatory requirements. Every parameter is first classified as <strong className="text-slate-800">Met</strong> or <strong className="text-slate-800">Not Met</strong>. Each parameter also carries an impact classification that reflects its significance to the worker on that schedule.
              </p>

              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Parameter Status
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0 bg-green-100 text-green-700">
                      Met
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">Parameter meets the required provisions.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0 bg-red-100 text-red-700">
                      Not Met
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">Parameter does not meet the required provisions.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Impact Classification
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Every parameter carries an impact classification. When a parameter is met, the impact level confirms the significance of that compliance. When a parameter is not met, the impact level indicates how urgently it needs to be addressed.
                </p>
                <div className="space-y-2">
                  {[
                    { level: 'High', color: 'bg-red-100 text-red-700', desc: 'Critical parameter. Requires immediate attention when not met.' },
                    { level: 'Moderate', color: 'bg-amber-100 text-amber-700', desc: 'Notable parameter. Warrants review and monitoring when not met.' },
                    { level: 'Low', color: 'bg-green-100 text-green-700', desc: 'Supporting parameter. Documented for completeness.' },
                  ].map((r) => (
                    <div key={r.level} className="flex items-start gap-3">
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0 ${r.color}`}>
                        {r.level}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fatigue — brief reference, links to dedicated page */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-4">
                Fatigue Risk
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Models physiological fatigue across the full rotation using a biomathematical model validated in occupational health literature. Available as an add-on when elected at submission.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Fatigue scores are classified into four risk levels (Low, Moderate, High, Critical) based on the combined effect of sleep pressure, circadian rhythm, and accumulated sleep debt.
              </p>
              <Link
                href="/fatigue-analysis"
                className="text-xs font-medium text-brand-navy hover:underline inline-block"
              >
                Full fatigue methodology and risk classification &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* See the Methodology Applied — simplified to inline links */}
      <Section divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            See the Methodology Applied
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            From rotation to documented findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-6">
            Walk through a real analysis, from a rotation that passed manual review to the findings report that revealed what was missed.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/example-rotation"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              View the example rotation &rarr;
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              View the sample report &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
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
