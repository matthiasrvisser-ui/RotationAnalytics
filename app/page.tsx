import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { IndependenceSection } from '@/components/IndependenceSection'
import { ProcessOverview } from '@/components/ProcessOverview'

const problemAreas = [
  {
    heading: 'Inadequate Rest Periods',
    body: 'Shift sequences that leave less than 11 hours between consecutive shifts are a documented source of occupational fatigue and a common basis for grievance proceedings.',
  },
  {
    heading: 'Extended Night Shift Sequences',
    body: 'Established occupational health research identifies consecutive night shift strings as a primary driver of cumulative fatigue accumulation in healthcare settings.',
  },
  {
    heading: 'Collective Agreement Compliance',
    body: 'Scheduling provisions in collective agreements create documented obligations. Without structured review, violations may go undetected across rotation cycles.',
  },
  {
    heading: 'Lack of Documented Analysis',
    body: 'Grievance preparation is materially strengthened by structured, independently produced analysis. Informal assessment does not carry the same evidentiary weight.',
  },
]

export default function Home() {
  return (
    <>
      <Hero
        headline="Independent Rotation Analysis for Complex Shift Operations"
        subheadline="Independent Rotation Assurance™ applies structured analytical methodology to rotation schedules across shift-based operations, examining rest intervals, consecutive sequences, and collective agreement obligations to produce documented findings for union review."
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
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              Healthcare rotation schedules determine when workers rest, how fatigue accumulates,
              and whether the obligations in a collective agreement are being met. In practice,
              schedules are produced by the employer and typically reviewed by unions without the
              benefit of structured, independent analysis.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              The result is that rest period violations, problematic shift sequences, and collective
              agreement non-compliance may go undocumented until a worker files a grievance or a
              health event occurs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {problemAreas.map((item) => (
              <div key={item.heading} className="border-l-2 border-slate-200 pl-5">
                <p className="text-sm font-semibold text-slate-800 mb-1">{item.heading}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What is Rotation Assurance */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            What We Provide
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            What is Independent Rotation Assurance™?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Rotation Analytics provides Independent Rotation Assurance™ — a structured, third-party
            review of rotation schedules conducted on behalf of unions and worker representatives.
            The methodology examines rotation records against rest period standards, collective
            agreement provisions, and established fatigue science. The output is a written findings
            report, classified by risk level.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            It is not a consulting service. It does not advise on bargaining positions or strategy,
            represent workers, or determine grievance outcomes. It produces documented findings that
            union representatives can use in their own review processes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-200">
            {[
              { label: 'Third-party', detail: 'No employer relationship' },
              { label: 'Documented', detail: 'Written findings by risk level' },
              { label: 'Confidential', detail: 'Released to union only' },
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

      {/* Methodology origin */}
      <Section title="Where the Methodology Comes From" divider>
        <div className="max-w-3xl">
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            Independent Rotation Assurance™ was developed within the scheduling conditions present in
            unionized healthcare. Those environments are characterised by collective agreements of
            significant interpretive complexity, multi-week extended-hours rotations, and documented
            fatigue sensitivity from clinical shift demands.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            Those conditions produce a concentration of scheduling risk factors: narrow rest period
            tolerances, accumulated consecutive sequences, and provisions that interact across
            rotation cycles in ways that are not apparent without structured review.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                label: 'Complex collective agreements',
                detail: 'Multi-provision scheduling obligations with interpretive interdependencies.',
              },
              {
                label: 'Extended-hours rotations',
                detail: '12-hour shift environments with compressed rest tolerances and accumulation risk.',
              },
              {
                label: 'Fatigue-sensitive environments',
                detail: 'Settings where occupational fatigue carries documented operational and safety consequences.',
              },
              {
                label: 'Interpretive scheduling risk',
                detail: 'Provisions that create compliance exposure only when examined across full rotation cycles.',
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-slate-200 pl-5">
                <p className="text-sm font-semibold text-slate-800 mb-1">{item.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-brand-navy pl-5">
            Methods developed for the most complex scheduling environments translate naturally to
            other shift-based operations.
          </p>
        </div>
      </Section>

      {/* Sectors */}
      <Section title="Where Rotation Assurance Applies" className="bg-brand-cream" divider>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {[
            {
              label: 'Healthcare',
              detail: 'The originating environment: complex shift agreements and fatigue-sensitive operations.',
            },
            {
              label: 'Energy & Industrial Operations',
              detail: 'Extended rotations and continuous operations with documented rest requirements.',
            },
            {
              label: 'Emergency Services',
              detail: 'Shift scheduling subject to collective agreement provisions and fatigue protocols.',
            },
            {
              label: 'Transportation',
              detail: 'Regulated rest period obligations across rotating multi-week schedules.',
            },
            {
              label: 'Manufacturing',
              detail: 'Continuous production environments with multi-week rotation structures.',
            },
            {
              label: '24/7 Operations',
              detail: 'Any shift-based environment with consecutive sequence risk and collective agreement exposure.',
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
              For unions beginning to work with rotation analysis, Independent Rotation Assurance™
              offers a structured first engagement. A pilot diagnostic covers a defined rotation
              period for a defined group of workers and produces a findings report that establishes
              a documented baseline.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              It gives union leadership a concrete understanding of what rotation analysis reveals,
              without the commitment of a broader engagement.
            </p>
            <Link
              href="/pilot-diagnostic"
              className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Learn About the Pilot
            </Link>
          </div>

          {/* What a pilot diagnostic covers */}
          <div className="bg-brand-cream border border-slate-200 rounded-lg p-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              A Pilot Diagnostic Covers
            </p>
            <ul className="space-y-4">
              {[
                'A single defined rotation cycle (typically 4 weeks)',
                'One or more workers within the commissioning local',
                'Full rest period interval analysis',
                'Consecutive shift sequencing review',
                'Cross-reference against collective agreement scheduling provisions',
                'Written findings report with risk classification',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Example Rotation placeholder */}
      <Section className="bg-slate-50" divider>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Demonstration
          </p>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
            Example Rotation Analysis
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-8">
            A worked example using anonymized schedule data, showing how findings are identified,
            classified, and documented. Illustrates the structure and depth of a full rotation findings report.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg p-8 text-left">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Example Rotation — Registered Nurse
              </p>
              <span className="inline-block text-xs font-semibold text-slate-400 border border-slate-200 bg-slate-50 px-3 py-1 rounded-full">
                Demonstration coming soon
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Period', value: '4-week rotation' },
                { label: 'Workers', value: '1 (anonymized)' },
                { label: 'Status', value: 'Pending publication' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</p>
                  <p className="text-xs text-slate-600 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When published, this section will include a full shift table, fatigue accumulation map,
              and a complete findings summary showing exactly what a rotation analysis produces.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/methodology"
              className="text-sm text-brand-navy font-medium hover:underline"
            >
              Review our methodology in the meantime →
            </Link>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Next Steps
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-5">
            Commission an analysis for your members.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-8">
            If you represent a healthcare union local, Health & Safety committee, or labour relations
            body and want to discuss a rotation analysis engagement, contact us directly.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="inline-block border border-slate-300 text-slate-700 px-7 py-3 rounded font-medium text-sm hover:border-slate-400 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
