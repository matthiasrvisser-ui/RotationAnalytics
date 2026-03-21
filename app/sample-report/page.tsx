import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Sample Report',
  description:
    'A sample executive report demonstrating how Rotation Analytics documents rotation findings with risk classifications, agreement references, and structured analysis.',
}

const SITE = 'https://www.rotationanalytics.ca'

const reportFindings = [
  {
    num: 7,
    title: 'Regular Weekends Off',
    result: 'Not Met',
    impact: 'High',
    category: 'Weekends',
    detail: 'Lines 1, 3, 9, and 10 do not meet the minimum required weekends off. Requirement: 2 weekends off per 5-week period.',
    badge: 'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-400',
  },
  {
    num: 8,
    title: 'Maximum Consecutive Shifts',
    result: 'Not Met',
    impact: 'High',
    category: 'Shift Structure',
    detail: 'Line 3 exceeds the maximum instances of long runs of consecutive shifts (3 found, 2 permitted per 5-week period).',
    badge: 'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-400',
  },
  {
    num: 11,
    title: 'Minimum Hours Off Between Shifts',
    result: 'Not Met',
    impact: 'High',
    category: 'Hours Between Shifts',
    detail: 'Lines 1, 2, 3, 7, and 8 do not meet the required minimum of 15.5 hours off between shifts. Multiple instances per line.',
    badge: 'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-400',
  },
  {
    num: 12,
    title: 'Full-time Minimum Consecutive Days Off',
    result: 'Not Met',
    impact: 'High',
    category: 'Days Off',
    detail: 'Line 3 contains single days off in weeks 3 and 8 where the collective agreement requires a minimum of 2 consecutive days off.',
    badge: 'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-400',
  },
  {
    num: 15,
    title: 'On Call Scheduling Parameters',
    result: 'Not Met',
    impact: 'Medium',
    category: 'On Call',
    detail: 'Lines 1, 5, 6, 9, 10, and 11 have on-call shifts placed the evening before or during scheduled off-duty days, contrary to the requirement to avoid such placement where possible.',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    border: 'border-l-amber-400',
  },
]

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
        subheadline="A representative findings report demonstrating the structure, depth, and format of analysis delivered to the commissioning party."
        cta={{ label: 'Discuss an Engagement', href: '/contact' }}
        secondaryCta={{ label: 'View Example Rotation', href: '/example-rotation' }}
      />

      {/* 1. Introduction */}
      <Section divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Introduction
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Structured findings from an independent rotation analysis.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            The report below was generated from the sample rotation available on the <Link href="/example-rotation" className="text-brand-navy font-medium hover:underline">Example Rotation</Link> page. That rotation appeared compliant during manual review. Structured analysis revealed five areas where the schedule did not meet documented requirements — including insufficient rest periods, weekend off violations, and on-call scheduling concerns.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            This sample demonstrates the format, depth, and classification structure that every Rotation Analytics executive report follows.
          </p>
        </div>
      </Section>

      {/* 2. Context: From Rotation to Report */}
      <Section className="bg-brand-cream" divider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-lg overflow-hidden">
          {[
            { step: '01', title: 'Rotation Received', body: 'A 10-week rotation with 11 shift lines covering day, evening, night, and on-call assignments was submitted for analysis.' },
            { step: '02', title: 'Structured Analysis Applied', body: '15 parameters were evaluated against the applicable collective agreement and employment standards across all lines and the full rotation cycle.' },
            { step: '03', title: 'Executive Report Produced', body: 'Findings documented with risk classifications, specific line references, affected periods, and applicable agreement citations.' },
          ].map((s) => (
            <div key={s.step} className="bg-white p-8">
              <p className="text-2xl font-bold text-slate-200 mb-4">{s.step}</p>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <Link href="/example-rotation" className="text-sm font-medium text-brand-navy hover:underline">
            &larr; View the rotation that generated this report
          </Link>
        </div>
      </Section>

      {/* 3. Why This Matters */}
      <Section divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Why This Matters
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Most scheduling issues are discovered after the fact — and the cost is significant.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            You already know this: subtle scheduling issues — rest periods that fall hours short, weekends that miss thresholds by a single occurrence, on-call placements that violate nuanced provisions — routinely escape manual review. These issues typically emerge only after a grievance is filed, by which point the scheduling arrangement has already created exposure for all parties.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            Each undetected non-conformance represents potential grievance exposure. Arbitration is costly and time-consuming. Worker frustration compounds. And the longer a non-compliant rotation runs, the deeper the exposure becomes.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            Structured rotation analysis identifies these issues while they can still be addressed — before they escalate into formal disputes.
          </p>
          <div className="space-y-3">
            {[
              'Identify collective agreement non-compliance before it results in grievances',
              'Document findings with risk classifications for internal review and decision-making',
              'Reduce grievance exposure through preventative, structured evaluation',
              'Support confident scheduling decisions with independent analysis',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Sample Report Preview (embedded Excel) */}
      <Section className="bg-brand-cream" divider>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
          Sample Deliverable
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Executive Report
        </h2>
        <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-3xl">
          The executive report is one of two deliverables provided. It documents all parameters evaluated, whether each was met, the impact classification, and specific details for any findings.
        </p>

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

      {/* 5. Key Findings Summary */}
      <Section
        title="Key Findings"
        subtitle="Parameters that did not meet requirements, classified by impact level."
        divider
      >
        <div className="space-y-4 max-w-4xl mb-10">
          {reportFindings.map((f) => (
            <div key={f.num} className={`bg-white border border-slate-200 border-l-4 ${f.border} rounded-lg p-5`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded border ${f.badge}`}>
                    {f.impact}
                  </span>
                  <span className="text-xs text-slate-400">#{f.num}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{f.category}</p>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Parameters Met
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metParameters.map((p) => (
              <div key={p.num} className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg p-3">
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
            Parameters #2 (Maximum Shift Length) and #5 (Paid Rest Periods) are classified as informational and documented for reference.
          </p>
        </div>
      </Section>

      {/* 6. CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready to discuss an engagement?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation in mind or want to understand what structured analysis would reveal, we are available to discuss your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-5 items-center">
            <Link
              href="/contact"
              className="bg-white text-brand-navy px-7 py-3 rounded font-medium text-sm hover:bg-brand-cream transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/submit"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Already commissioned? Submit Work &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
