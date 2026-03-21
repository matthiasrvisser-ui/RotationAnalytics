import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { RiskClassification, SampleReportTable, HowItWorks, WhyItMatters } from './components'

export const metadata: Metadata = {
  title: 'Fatigue Risk Analysis',
  description:
    'Science-based fatigue risk assessment for every rotation line. Rotation Analytics applies a biomathematical fatigue model to identify where schedules create physiological fatigue — even when they are fully compliant.',
  openGraph: {
    title: 'Fatigue Risk Analysis | Rotation Analytics',
    description:
      'Biomathematical fatigue modeling integrated with collective agreement compliance analysis. Identify fatigue exposure that manual review cannot detect.',
  },
}

export default function FatigueAnalysisPage() {
  return (
    <>
      <Hero
        headline="Fatigue Risk Analysis"
        subheadline="A schedule can be fully compliant and still produce a fatigued worker. This analysis identifies where and when that happens."
      />

      {/* ── WHAT THIS ANALYSIS ANSWERS ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            What This Analysis Answers
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Collective agreement compliance tells you whether a schedule follows the rules.
            Fatigue risk analysis tells you what that schedule actually does to the worker&rsquo;s body.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            This is a science-based fatigue risk assessment for every rotation line in the schedule.
            It runs continuously across the entire rotation — including days off — to track each
            worker&rsquo;s physiological state without interruption. The result is a fatigue score
            for every day of the rotation, risk classification for every line, and a clear picture
            of where the schedule creates risk that manual review cannot detect.
          </p>

          <WhyItMatters />
        </div>
      </Section>

      {/* ── HOW IT WORKS (PLAIN ENGLISH) ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-3">
            How the Fatigue Score Is Calculated
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            The fatigue score is calculated using a biomathematical model that simulates three
            physiological processes operating inside the human body. The model runs a 15-minute
            step simulation continuously across every day in the rotation to track the worker&rsquo;s
            physiological state.
          </p>
          <HowItWorks />
        </div>
      </Section>

      {/* ── SLEEP PREDICTION & DEBT ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Sleep Prediction and Recovery
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The model does not assume workers sleep a fixed number of hours between shifts.
            Instead, it predicts when sleep actually occurs based on the worker&rsquo;s physiological
            state — sleep pressure, circadian phase, and shift timing determine when and how long
            the worker sleeps.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Night shift workers are predicted to sleep during the day because their sleep pressure
            is high after the night shift. During multi-day breaks, the model recognises the
            worker&rsquo;s natural daily sleep-wake cycle. No fixed sleep window is assumed —
            sleep timing adapts to the schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
                Sleep Debt
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                When predicted sleep falls below 6 hours and the gap between shifts is short,
                the shortfall accumulates as sleep debt. Each hour of debt adds to the fatigue
                score. Sleep debt resets when the worker achieves a full sleep period — capturing
                the compounding effect of consecutive short-rest shifts without penalising
                well-rested workers during long recovery periods.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
                Days Off
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike analyses that only score worked shifts, this model simulates physiology
                through every day of the rotation — including days off. Recovery is visible in the
                data, and the worker&rsquo;s state entering their next shift block is accurately
                carried forward rather than artificially reset.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── RISK CLASSIFICATION ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Risk Classification
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Fatigue scores are classified into four risk levels. These classifications appear in
            the deliverable alongside compliance findings, giving the commissioning party a
            complete picture of scheduling risk.
          </p>
          <RiskClassification />
        </div>
      </Section>

      {/* ── SAMPLE REPORT ── */}
      <Section contained>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-3">
            Sample Fatigue Report
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            The table below is representative of an actual Fatigue Risk Analysis deliverable.
            Each row represents a rotation line. The trend column traces the fatigue score across
            every day of the rotation — both worked days and days off — showing the full recovery
            and fatigue cycle.
          </p>
          <SampleReportTable />
          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            All sparklines use the same 0–100 vertical scale and are directly comparable across
            rows. Lines with visibly higher peaks carry more fatigue risk, even if both are
            classified at the same average risk level. The deliverable includes the full
            per-line breakdown, trend visualisations, and the methodology explanation.
          </p>
        </div>
      </Section>

      {/* ── INTEGRATED VALUE ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Integrated with Compliance Analysis
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Fatigue analysis is available as an add-on to any compliance engagement. A single
            rotation submission flows through both the compliance engine and the fatigue model,
            producing a combined deliverable that covers both dimensions of scheduling risk.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden my-6">
            <div className="bg-brand-navy px-5 py-3">
              <p className="text-white text-sm font-semibold">What You Receive</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">1</span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Annotated Rotation Schedule</p>
                  <p className="text-sm text-slate-600">Every shift flagged for compliance non-conformances — directly in your rotation file.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">2</span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Executive Findings Report</p>
                  <p className="text-sm text-slate-600">Risk-classified compliance findings with collective agreement citations and supporting explanation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">3</span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Fatigue Risk Analysis Report</p>
                  <p className="text-sm text-slate-600">Per-line fatigue scores (average, min, max), risk classifications, and rotation-wide trend visualisations showing the complete fatigue and recovery cycle.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            Compliance analysis identifies what the schedule violates. Fatigue analysis identifies
            what the schedule does to the worker. Together, they provide the complete risk profile
            that informed decision-making requires.
          </p>
        </div>
      </Section>

      {/* ── SCIENTIFIC FOUNDATION ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Scientific Foundation
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The fatigue model is built on the Three-Process Model published by Åkerstedt and
            Folkard (1987, revised through 2008), the most widely validated biomathematical model
            for shift work fatigue in the occupational health literature. Its parameters have been
            validated against real worker performance data including healthcare and industrial settings.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            This analysis models a representative worker based on established physiological
            parameters. It does not account for individual variation in sleep patterns, age,
            chronotype, or health status. The fatigue scores represent what a typical working-age
            adult would experience on this schedule.
          </p>

          <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-lg p-6">
            <p className="text-sm font-semibold text-brand-navy mb-2">
              Full Methodology
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              A comprehensive white paper detailing the complete mathematical methodology,
              model parameters, and validation references is available upon request.
              Every deliverable includes a methodology explanation section.
            </p>
            <Link
              href="/contact"
              className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              Request the full methodology white paper &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-brand-navy mb-4">
            Add Fatigue Analysis to Your Engagement
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            Fatigue risk analysis is available alongside any compliance engagement at $0.15 per
            shift analyzed. Combined with compliance analysis, the total is $0.50 per shift —
            providing the most complete rotation risk assessment available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/engage"
              className="inline-flex items-center justify-center bg-brand-navy text-white text-sm font-medium px-6 py-3 rounded hover:bg-brand-navy-dark transition-colors"
            >
              Begin an Engagement
            </Link>
            <Link
              href="/example-rotation"
              className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              View Example Rotation &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
