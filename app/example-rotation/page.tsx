import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Example Rotation',
  description:
    'See how a rotation schedule can appear compliant at first glance while containing hidden issues that only independent analysis reveals.',
}

const SITE = 'https://www.rotationanalytics.ca'

const issuesIdentified = [
  {
    title: 'Regular Weekends Off',
    impact: 'High',
    detail: 'Lines 1, 3, 9, and 10 do not meet the minimum required weekends off within the specified period.',
    badge: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    title: 'Maximum Consecutive Shifts',
    impact: 'High',
    detail: 'Line 3 exceeds the maximum permitted instances of long runs of consecutive shifts (3 instances found, 2 permitted).',
    badge: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    title: 'Minimum Hours Off Between Shifts',
    impact: 'High',
    detail: 'Lines 1, 2, 3, 7, and 8 do not meet the required minimum of 15.5 hours off between shifts.',
    badge: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    title: 'Full-time Minimum Consecutive Days Off',
    impact: 'High',
    detail: 'Line 3 contains single days off in weeks 3 and 8 where a minimum of 2 consecutive days off is required.',
    badge: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    title: 'On Call Scheduling Parameters',
    impact: 'Medium',
    detail: 'Lines 1, 5, 6, 9, 10, and 11 have on-call shifts placed the evening before or during scheduled off-duty days.',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
  },
]

const missedIssues = [
  'Insufficient hours between shifts that fall just below the collective agreement threshold',
  'Weekend off requirements across multi-week periods that are not immediately visible',
  'Consecutive shift limits that are exceeded when counting across week boundaries',
  'On-call shifts placed before off-duty days in violation of scheduling provisions',
  'Single day off occurrences hidden within longer apparent rest patterns',
]

export default function ExampleRotation() {
  const uncheckedUrl = encodeURIComponent(`${SITE}/rotations/unchecked-sample-rotation.xlsx`)
  const checkedUrl = encodeURIComponent(`${SITE}/rotations/checked-sample-rotation.xlsx`)

  return (
    <>
      <Hero
        headline="Example Rotation Analysis"
        subheadline="A sample rotation schedule that passed manual review, and the hidden issues that independent analysis revealed."
        cta={{ label: 'View Sample Report', href: '/sample-report' }}
        secondaryCta={{ label: 'Our Methodology', href: '/methodology' }}
      />

      {/* 1. Before — Rotation That Looks Acceptable */}
      <Section className="bg-brand-cream" divider>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
          Before Analysis
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          A Rotation That Looks Acceptable
        </h2>
        <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-3xl">
          This rotation passed initial manual review and appeared compliant. It covers 10 weeks with 11 shift lines across day, evening, night, and on-call assignments.
        </p>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-4">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Unchecked Sample Rotation</p>
                <p className="text-xs text-slate-400">Excel Spreadsheet</p>
              </div>
            </div>
            <a
              href="/rotations/unchecked-sample-rotation.xlsx"
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
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${uncheckedUrl}`}
              className="absolute inset-0 w-full h-full border-0"
              title="Unchecked Sample Rotation"
            />
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This rotation appears compliant on visual inspection. Shifts are covered, staffing levels look adequate, and rest days are present throughout.
        </p>
      </Section>

      {/* 2. The Gap — brief bridge */}
      <Section divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            What Manual Review Misses
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Manual reviews confirm the fundamentals: shift coverage, staffing levels, visible rest days. These checks pass. But deeper issues persist across multi-week periods where the intersecting rules of collective agreements, employment standards, and scheduling provisions cannot be held in view simultaneously.
          </p>
          <div className="space-y-3">
            {missedIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 border-l-2 border-red-300 pl-4">
                <p className="text-sm text-slate-600 leading-relaxed">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. After — Rotation With Issues Highlighted */}
      <Section className="bg-brand-cream" divider>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
          After Analysis
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          The Same Rotation, With Issues Highlighted
        </h2>
        <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-3xl">
          The analysis engine applied 15 parameters drawn from the applicable collective agreement and employment standards. Cells highlighted in orange indicate insufficient hours between shifts. Cells in pink or purple indicate on-call scheduling violations.
        </p>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-4">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Checked Sample Rotation</p>
                <p className="text-xs text-slate-400">Excel Spreadsheet, violations highlighted</p>
              </div>
            </div>
            <a
              href="/rotations/checked-sample-rotation.xlsx"
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
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${checkedUrl}`}
              className="absolute inset-0 w-full h-full border-0"
              title="Checked Sample Rotation"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mt-4 max-w-3xl">
          Analysis revealed a number of non-conformances across this rotation, highlighted directly within the schedule for review. The full findings are documented in the executive report.
        </p>
      </Section>

      {/* 4. Key Issues Identified */}
      <Section
        title="Key Issues Identified"
        subtitle="The analysis engine applied 15 parameters and revealed 5 areas that did not meet requirements."
        divider
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">15</p>
            <p className="text-xs text-slate-500 mt-1">Parameters Applied</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">10</p>
            <p className="text-xs text-slate-500 mt-1">Met</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-600">5</p>
            <p className="text-xs text-slate-500 mt-1">Not Met</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-700">4</p>
            <p className="text-xs text-slate-500 mt-1">High Impact</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-amber-700">1</p>
            <p className="text-xs text-slate-500 mt-1">Medium Impact</p>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {issuesIdentified.map((issue) => (
            <div key={issue.title} className="bg-white border border-slate-200 rounded-lg p-5 flex items-start gap-4">
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded border whitespace-nowrap ${issue.badge}`}>
                {issue.impact}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">{issue.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{issue.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-6 leading-relaxed max-w-3xl">
          Each issue is documented in the executive report with applicable collective agreement references, specific line numbers affected, and the relevant periods. The full report is available on the <Link href="/sample-report" className="text-brand-navy hover:underline">Sample Report</Link> page.
        </p>
      </Section>

      {/* 5. CTA */}
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
              href="/sample-report"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              View the Sample Report &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
