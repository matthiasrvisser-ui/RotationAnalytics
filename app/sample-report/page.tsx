import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Sample Report',
  description:
    'A sample executive report demonstrating how Rotation Analytics Inc documents rotation findings with risk classifications, agreement references, and independent analysis.',
}

const SITE = 'https://www.rotationanalytics.ca'

const metParameters = [
  { num: 1, title: 'Average Hours Per Week', value: '38.75 hrs', impact: 'High' },
  { num: 3, title: 'Maximum Paid Hours Per Shift', value: '7.75 hrs', impact: 'Medium' },
  { num: 4, title: 'Unpaid Meal Period', value: '30 min', impact: 'High' },
  { num: 6, title: 'Minimize D/E/N Lines', value: 'Yes', impact: 'Low' },
  { num: 9, title: 'Consecutive Shifts Configuration', value: 'Compliant', impact: 'Medium' },
  { num: 10, title: 'Minimum Day Duty', value: '≥ 33.3%', impact: 'Medium' },
  { num: 13, title: 'Part-time Minimum Consecutive Days Off', value: '2 days', impact: 'High' },
  { num: 14, title: 'Ratio of Worked Days to Days Off', value: 'Compliant', impact: 'High' },
]

export default function SampleReport() {
  const reportUrl = encodeURIComponent(`${SITE}/rotations/sample-executive-report.xlsx`)

  return (
    <>
      <Hero
        headline="Sample Executive Report"
        subheadline="A representative findings report demonstrating the structure, depth, and format of analysis delivered to the Client."
        cta={{ label: 'Begin an Engagement', href: '/engage' }}
        secondaryCta={{ label: 'View Example Rotation', href: '/example-rotation' }}
      />

      {/* 1. Brief context + embedded report */}
      <Section divider>
        <div className="max-w-3xl mb-8">
          <p className="text-base text-slate-600 leading-relaxed">
            This report was generated from the sample rotation on the <Link href="/example-rotation" className="text-brand-navy font-medium hover:underline">Example Rotation</Link> page — a schedule that appeared compliant during manual review. The analysis engine identified five areas that did not meet documented requirements.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
          <strong>Sample report.</strong> This executive report was generated from the sample rotation. Parameter references, collective agreement citations, and employee data are illustrative.
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-4">
          <div className="bg-brand-navy px-5 py-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sample Executive Report</p>
                <p className="text-xs text-slate-400">Rotation Analytics Inc — Confidential</p>
              </div>
            </div>
            <a
              href="/rotations/sample-executive-report.xlsx"
              download
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .xlsx
            </a>
          </div>
          <div className="relative w-full" style={{ height: '600px' }}>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${reportUrl}`}
              className="absolute inset-0 w-full h-full border-0"
              title="Sample Executive Report"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400 mb-0.5">Parameters Applied</p>
            <p className="text-sm font-bold text-slate-900">15</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400 mb-0.5">Not Met</p>
            <p className="text-sm font-bold text-red-600">5</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400 mb-0.5">High Impact</p>
            <p className="text-sm font-bold text-red-700">4</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400 mb-0.5">Medium Impact</p>
            <p className="text-sm font-bold text-amber-600">1</p>
          </div>
        </div>
      </Section>

      {/* 2. Parameters Met — unique to this page, shows thoroughness */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Parameters Met
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-3xl">
            Every parameter is documented — including those that were met — providing the complete picture of compliance posture across the rotation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metParameters.map((p) => (
              <div key={p.num} className="flex items-center gap-4 bg-white border border-green-200 rounded-lg p-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 font-medium">{p.title}</p>
                </div>
                <p className="text-xs text-slate-500 flex-shrink-0">{p.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Parameters #2 (Maximum Shift Length) and #5 (Paid Rest Periods) are classified as informational and documented for reference. Findings that did not meet requirements are detailed in the <Link href="/example-rotation" className="text-brand-navy hover:underline">Example Rotation</Link> walkthrough.
          </p>
        </div>
      </Section>

      {/* 3. CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready to discuss an engagement?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation in mind or want to understand what this analysis would reveal for your schedule, we are available to discuss your requirements.
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
