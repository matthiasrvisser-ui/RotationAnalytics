import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Rotation Analytics Inc examines rotation schedules, classifies compliance and fatigue risk, and delivers independent findings for client review.',
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
      'Shift sequences and rest intervals assessed against established occupational health guidelines. Quantified fatigue scoring is available separately through the Fatigue Risk Analysis add-on.',
  },
  {
    label: 'Weekend distribution',
    detail:
      'Weekends off patterns across the full rotation, compared to the rotation group where data is available.',
  },
  {
    label: 'On-call shift validation',
    detail:
      'On-call scheduling assessed against collective agreement provisions — including placement relative to off-duty days, frequency, and rest period interactions. This validation is unique to Rotation Analytics Inc.',
  },
  {
    label: 'Collective agreement provisions',
    detail:
      'Scheduling provisions in the applicable collective agreement cross-referenced against the actual rotation record.',
  },
]

const referencePoints = [
  'Provincial Labour Standards legislation',
  'Applicable collective agreement scheduling provisions',
  'Applicable provincial employment standards',
  'Peer-reviewed fatigue science (cited on applicable findings)',
]

export default function Methodology() {
  return (
    <>
      <Hero
        headline="Our Methodology"
        subheadline="How Rotation Analytics Inc examines rotation schedules and classifies scheduling risk for client review."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
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
                Evaluates the schedule against collective agreement provisions, employment standards, and regulatory requirements. Included in every engagement.
              </p>
              <div className="space-y-2">
                {[
                  { level: 'High', color: 'bg-red-100 text-red-700', desc: 'Immediate grievance basis or regulatory non-compliance.' },
                  { level: 'Moderate', color: 'bg-amber-100 text-amber-700', desc: 'Elevated exposure warranting attention and monitoring.' },
                  { level: 'Low', color: 'bg-green-100 text-green-700', desc: 'Parameters met. Documented for completeness.' },
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
            Walk through a real analysis — from a rotation that passed manual review to the findings report that revealed what was missed.
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
