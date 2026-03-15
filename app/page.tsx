import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { IndependenceSection } from '@/components/IndependenceSection'
import { ProcessOverview } from '@/components/ProcessOverview'

const primaryProblems = [
  {
    heading: 'Collective Agreement Compliance',
    body: 'Scheduling provisions within collective agreements create documented operational obligations. Without structured review, non-compliance may persist across rotation cycles without being identified.',
  },
  {
    heading: 'Lack of Documented Analysis',
    body: 'Grievance preparation is strengthened when supported by structured, independently produced analysis. Informal review does not carry the same evidentiary weight. Rotation Analytics Inc provides a documented analysis package for client use at their discretion.',
  },
]

const exampleProblems = [
  {
    heading: 'Inadequate Rest Periods',
    body: 'Shift sequences providing insufficient recovery time between duties are a recognized contributor to occupational fatigue and a frequent basis for grievance proceedings.',
  },
  {
    heading: 'Shift Type Transitions',
    body: 'Night-to-day shift transitions are a common source of fatigue risk. Many agreements contain specific provisions governing transition structure and recovery time that go unnoticed during routine schedule review.',
  },
]

export default function Home() {
  return (
    <>
      <Hero
        headline="Independent Rotation Analysis for Complex Shift Operations"
        subheadline="Rotation Analytics Inc applies structured analytical methodology to rotation schedules across shift-based operations, examining rest intervals, consecutive sequences, and collective agreement obligations to produce documented findings for client utilization."
        cta={{ label: 'View Sample Report', href: '/sample-report' }}
        secondaryCta={{ label: 'Our Methodology', href: '/methodology' }}
      />

      {/* Problem framing */}
      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              The Problem
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Rotation schedules carry documented risk that is rarely examined independently.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Unionized rotations can appear acceptable during cursory review while quietly creating fatigue, worker dissatisfaction, and failing to meet collective agreement obligations. Most of these problems only surface after a grievance is filed, because schedules are rarely subjected to structured, independent analysis before implementation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {primaryProblems.map((item) => (
              <div key={item.heading} className="border-l-2 border-slate-200 pl-5">
                <p className="text-sm font-semibold text-slate-800 mb-1">{item.heading}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest pt-2">
              Some examples include
            </p>
            {exampleProblems.map((item) => (
              <div key={item.heading} className="border-l-2 border-slate-100 pl-5">
                <p className="text-sm font-semibold text-slate-700 mb-1">{item.heading}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What We Provide */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            What We Provide
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Independent Rotation Analysis
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Rotation Analytics Inc provides comprehensive, independent, third-party review of rotation schedules conducted on behalf of the commissioning party.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            The methodology evaluates rotation schedules against collective agreement provisions, extended work agreements, applicable employment standards, and established fatigue management principles. The result is an executive summary identifying schedule elements that fall outside of these parameters, classified by risk level.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-10">
            Rotation Analytics Inc offers clients impartial shift analysis and a documented analytical report for use in their own internal reviews, decision-making, and processes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
            {[
              { label: 'Independent', detail: 'No conflicting employment or advisory relationship.' },
              { label: 'Documented', detail: 'Executive report summary and recommendations.' },
              { label: 'Risk-Classified', detail: 'Observations classified by severity to support internal assessment.' },
              { label: 'Confidential', detail: 'Reports are released solely to the commissioning client.' },
            ].map((item) => (
              <div key={item.label} className="text-center py-4">
                <p className="text-sm font-bold text-brand-navy mb-1">{item.label}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process overview */}
      <Section
        title="The Analysis Process"
        subtitle="How a rotation analysis is conducted from receipt to delivery."
        divider
      >
        <ProcessOverview />
      </Section>

      {/* Where Rotation Analysis Applies */}
      <Section title="Where Rotation Analysis Applies" className="bg-brand-cream" divider>
        <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-3xl">
          A rotation, or master schedule, is a cyclical work plan where a pre-determined pattern of shifts — including on duty times, off duty days, and shift types — automatically repeats over a set period, usually spanning weeks or months.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {[
            {
              label: 'Healthcare',
              detail: 'Complex shift agreements and fatigue-sensitive operations.',
            },
            {
              label: 'Energy & Industrial',
              detail: 'Extended rotations with documented rest requirements.',
            },
            {
              label: 'Emergency Services',
              detail: 'Collective agreement provisions and fatigue protocols.',
            },
            {
              label: 'Transportation',
              detail: 'Regulated rest obligations across multi-week schedules.',
            },
            {
              label: 'Manufacturing',
              detail: 'Continuous production with multi-week rotation structures.',
            },
            {
              label: '24/7 Operations',
              detail: 'Consecutive sequence risk and agreement exposure.',
            },
          ].map((sector) => (
            <div key={sector.label} className="bg-white p-6">
              <p className="text-sm font-semibold text-slate-900 mb-2">{sector.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{sector.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Independence & Confidentiality */}
      <IndependenceSection />

      {/* Pilot diagnostic */}
      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Entry Point
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Pilot Diagnostic Engagement
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              Organizations interested in independent rotation analysis may begin with our Pilot Diagnostic — a limited engagement covering two rotation schedules, designed to demonstrate what structured analysis reveals before committing to broader work.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              The pilot is intentionally small in scope. All findings remain the property of the commissioning organization and may be used internally at their discretion.
            </p>
            <Link
              href="/pilot-diagnostic"
              className="text-sm font-medium text-brand-navy hover:underline"
            >
              Learn more about the Pilot Diagnostic &rarr;
            </Link>
          </div>

          <div className="bg-brand-cream border border-slate-200 rounded-lg p-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Pilot Diagnostic Scope
            </p>
            <p className="text-sm text-slate-500 mb-5">A Pilot Diagnostic engagement typically includes:</p>
            <ul className="space-y-4">
              {[
                'Evaluation of two defined rotation cycles (commonly four-week rotations)',
                'Full rest interval analysis across the rotation cycle',
                'Consecutive shift sequence review',
                'Assessment of shift-type transitions where applicable',
                'Cross-reference against collective agreement scheduling provisions',
                'A date and time stamped executive summary report with risk classifications',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-6 pt-5 border-t border-slate-200">
              All findings are delivered confidentially to the commissioning party.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Next Steps
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Choose how you want to begin.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div className="border border-slate-200 rounded-lg p-8">
            <h3 className="text-base font-bold text-slate-900 mb-3">Start with a Pilot Diagnostic</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Evaluate the analysis with a defined-scope pilot engagement.
              If the pilot produces no findings, there is no cost.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-navy text-white px-6 py-2.5 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Learn About the Pilot &rarr;
            </Link>
          </div>
          <div className="border border-slate-200 rounded-lg p-8">
            <h3 className="text-base font-bold text-slate-900 mb-3">Commission a Full Analysis</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              For organizations ready to proceed, rotation analysis can be commissioned immediately for defined schedules or worker groups.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-navy text-white px-6 py-2.5 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Discuss an Engagement &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
