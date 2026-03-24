import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { RiskClassification, HowItWorks, WhyItMatters } from './components'

const SITE = 'https://www.rotationanalytics.ca'

export const metadata: Metadata = {
  title: 'Fatigue Risk Analysis',
  description:
    'Science-based fatigue risk assessment for every rotation line. Rotation Analytics applies a biomathematical fatigue model to identify where schedules create physiological fatigue, even when they are fully compliant.',
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
            The model runs continuously across the entire rotation, including days off, to track each
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
            The fatigue score is produced by a biomathematical model that simulates three
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
            state. Sleep pressure, circadian phase, and shift timing determine when and how long
            the worker sleeps.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Sleep onset occurs when predicted alertness falls below a threshold, and waking occurs
            when alertness recovers above a higher threshold. A circadian sleep gate between 22:00
            and 06:00 facilitates nighttime sleep. Daytime sleep is capped at 5.5 hours per calendar
            day, consistent with published research showing that night-shift workers obtain
            significantly less restorative sleep when sleeping during biological daytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
                Sleep Debt
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                When actual sleep falls short of the 8-hour daily requirement, the deficit
                accumulates. When sleep exceeds the requirement, debt recovers at 50% efficiency,
                reflecting that recovery sleep is less efficient than preventive sleep.
                This captures the compounding effect of consecutive short-rest shifts.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
                Days Off
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike analyses that only score worked shifts, this model simulates physiology
                through every day of the rotation, including days off. Recovery is visible in the
                data, and the worker&rsquo;s state entering their next shift block is accurately
                carried forward rather than artificially reset.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
                First Night in Run
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The first night shift after day shifts or days off carries the highest fatigue risk.
                Workers have typically been awake since their normal morning wake time and have not
                adapted their sleep schedule to night work. The model suppresses pre-shift sleep
                to reflect this, producing appropriately elevated fatigue scores for transitional
                night shifts.
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
            Fatigue scores are classified into five risk levels. These classifications appear in
            the deliverable alongside compliance findings, giving the Client a
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
            The report below is representative of an actual Fatigue Risk Analysis deliverable.
            Each row represents a rotation line. The trend column traces the fatigue score across
            every day of the rotation, both worked days and days off, showing the full recovery
            and fatigue cycle. The days-in-risk-band columns show how many days each worker
            spends at each risk level across the full rotation, capturing the cumulative
            exposure profile.
          </p>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-4">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-brand-navy/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Sample Fatigue Risk Analysis Report</p>
                  <p className="text-xs text-slate-400">Excel Spreadsheet, Biomathematical Analysis</p>
                </div>
              </div>
              <a
                href="/rotations/sample-fatigue-report.xlsx"
                download
                className="inline-flex items-center gap-2 text-xs font-medium text-brand-navy hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .xlsx
              </a>
            </div>
            <div className="relative w-full" style={{ height: '500px' }}>
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${SITE}/rotations/sample-fatigue-report.xlsx`)}`}
                className="absolute inset-0 w-full h-full border-0"
                title="Sample Fatigue Risk Analysis Report"
              />
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            All sparklines use a 25–100 vertical scale to show meaningful detail. 25 represents baseline, with the worker well rested on days off. Lines with visibly higher peaks carry more fatigue risk, even if both are classified at the same average risk level. The deliverable includes the full per-line breakdown, trend visualisations, and the methodology explanation.
          </p>
        </div>
      </Section>

      {/* ── INTEGRATED VALUE — brief transition ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-4">
            Available as an Add-On
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Fatigue risk analysis is available as an add-on to any compliance engagement. A single rotation submission flows through both the compliance engine and the fatigue model, providing the most complete rotation risk assessment available.
          </p>
          <Link
            href="/getting-started"
            className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
          >
            See the full engagement pathway &rarr;
          </Link>
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
            calibrated against expected fatigue outcomes for common shift patterns, including
            healthcare and industrial settings.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            This analysis models a representative worker based on established physiological
            parameters. It does not account for individual variation in sleep patterns, age,
            chronotype, or health status. The fatigue scores represent what a typical working-age
            adult would experience on this schedule. The model evaluates the planned rotation
            design, not day-to-day variations such as overtime, shift swaps, or unplanned absences.
          </p>

          <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-lg p-6">
            <p className="text-sm font-semibold text-brand-navy mb-2">
              Full Methodology
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              A comprehensive white paper detailing the complete mathematical methodology,
              model parameters, validation references, and risk classification thresholds
              is available for download. Every deliverable also includes a methodology
              explanation section.
            </p>
            <a
              href="/rotations/RA-Fatigue-Engine-White-Paper.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Methodology White Paper (PDF) &rarr;
            </a>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready when you are.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Independent rotation analysis. No discovery call. Findings delivered in 48&ndash;72 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-5 items-center">
            <Link
              href="/engage"
              className="bg-white text-brand-navy px-7 py-3 rounded font-medium text-sm hover:bg-brand-cream transition-colors"
            >
              Begin an Engagement
            </Link>
            <Link
              href="/example-rotation"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              View an Example Rotation &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
