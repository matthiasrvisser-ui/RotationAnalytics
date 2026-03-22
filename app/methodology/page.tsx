import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { AnalysisFlow } from '@/components/AnalysisFlow'

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
      'Shift sequences and rest intervals assessed against established occupational health guidelines. Quantified fatigue scoring is available separately through the Fatigue Risk Analysis add-on.',
  },
  {
    label: 'Weekend distribution',
    detail:
      'Weekends off patterns across the full rotation, compared to the rotation group where data is available.',
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
        subheadline="How Rotation Analytics examines rotation schedules and classifies scheduling risk for client review."
      />

      <Section
        title="What We Examine"
        subtitle="Each compliance analysis reviews the following dimensions of the schedule."
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
          Our methodology is powered by a proprietary analysis engine built specifically for rotation compliance. Manual review scales linearly with rotation complexity and inevitably misses more as schedules grow longer. Our engine evaluates every shift against every applicable provision across the full rotation cycle.
        </p>
        <AnalysisFlow />
        <p className="text-xs text-slate-400 mt-5 leading-relaxed max-w-2xl">
          Your rotation is confidential. All findings are delivered only to the Client.
        </p>
      </Section>

      {/* Two Dimensions of Risk */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Risk Classification
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Two dimensions of scheduling risk. Each with its own classification system.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-3xl">
            Compliance analysis and fatigue analysis evaluate different aspects of the schedule and use different risk scales. When both are elected, findings from each appear in their respective reports and combine to form the complete rotation risk profile.
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

            {/* Fatigue */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-4">
                Fatigue Risk
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Models physiological fatigue across the full rotation using a biomathematical model. Available as an add-on when elected at submission.
              </p>
              <div className="space-y-2">
                {[
                  { level: 'Low', range: '0–44', color: 'bg-green-100 text-green-700', desc: 'Optimal physiological parameters for a standard shift.' },
                  { level: 'Moderate', range: '45–59', color: 'bg-amber-100 text-amber-700', desc: 'Slightly elevated fatigue. Expected baseline for shift workers.' },
                  { level: 'High', range: '60–74', color: 'bg-red-100 text-red-700', desc: 'Significant fatigue. Meaningful degradation in reaction time and decision-making.' },
                  { level: 'Critical', range: '75–100', color: 'bg-red-200 text-red-800', desc: 'Severe fatigue. Immediate schedule review required.' },
                ].map((r) => (
                  <div key={r.level} className="flex items-start gap-3">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0 ${r.color}`}>
                      {r.level}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/fatigue-analysis"
                className="text-xs font-medium text-brand-navy hover:underline mt-4 inline-block"
              >
                Full fatigue methodology &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Fatigue Risk Analysis Add-on */}
      <Section divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Fatigue Risk Analysis
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            A schedule can be fully compliant and still produce a fatigued worker.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-3xl">
            Compliance analysis identifies what the schedule violates. Fatigue analysis identifies what the schedule does to the worker. The fatigue engine runs a biomathematical model continuously across every day of the rotation — including days off — to produce a fatigue score for every line.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Science-Based', detail: 'Built on the Three-Process Model (Åkerstedt & Folkard), the most widely validated fatigue model in occupational health literature.' },
              { label: 'Full Rotation Coverage', detail: 'Simulates physiology through every day — worked and off — so recovery and compounding effects are accurately captured.' },
              { label: 'Per-Line Scoring', detail: 'Every rotation line receives a fatigue score, risk classification, and trend visualisation across the full cycle.' },
            ].map((item) => (
              <div key={item.label} className="bg-brand-cream border border-slate-200 rounded-lg p-5">
                <p className="text-sm font-semibold text-slate-900 mb-2">{item.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <Link
            href="/fatigue-analysis"
            className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
          >
            Read the full Fatigue Risk Analysis methodology &rarr;
          </Link>
        </div>
      </Section>

      <Section
        title="Regulatory Reference Points"
        subtitle="Each analysis references the applicable frameworks for its jurisdiction and collective agreement."
        className="bg-brand-cream"
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
      <Section divider>
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            See the Methodology Applied
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            From rotation to documented findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Walk through a real analysis — from a rotation that passed manual review to the findings report that revealed what was missed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <Link href="/example-rotation" className="group border border-slate-200 rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">01</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">
              Example Rotation
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              See how a rotation can appear compliant at first glance while containing hidden rest period violations, weekend non-compliance, and on-call scheduling issues.
            </p>
            <span className="text-sm font-medium text-brand-navy">View the rotation &rarr;</span>
          </Link>
          <Link href="/sample-report" className="group border border-slate-200 rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
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
