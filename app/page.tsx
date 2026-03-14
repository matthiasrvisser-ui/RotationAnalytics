import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { IndependenceSection } from '@/components/IndependenceSection'
import { ProcessOverview } from '@/components/ProcessOverview'

const problemAreas = [
  {
    heading: 'Collective Agreement Compliance',
    body: 'Scheduling provisions within collective agreements create documented operational obligations. Without structured review, non-compliance may persist across rotation schedules without being clearly identified.',
  },
  {
    heading: 'Lack of Documented Analysis',
    body: 'Grievance preparation is strengthened when concerns are supported by structured, independently produced analysis. Informal or ad hoc review does not carry the same evidentiary weight. Rotation Analytics Inc. provides a documented analysis package that clients may use at their discretion.',
  },
  {
    heading: 'Inadequate Rest Periods',
    body: 'Shift sequences that provide insufficient recovery time between duties are a recognized contributor to occupational fatigue and a frequent basis for grievance proceedings. Rotation analysis identifies rest period exposures across the full schedule cycle.',
  },
  {
    heading: 'Shift Type Transitions',
    body: 'Transitions between night and day shifts are a common source of fatigue risk. Many agreements contain specific provisions governing shift change direction, recovery time, or transition structure. These issues often go unnoticed during routine schedule review but can create clear compliance exposure within the rotation schedule.',
  },
]

export default function Home() {
  return (
    <>
      <Hero
        headline="Independent Rotation Analysis for Complex Shift Operations"
        subheadline="Rotation Analytics Inc applies structured analytical methodology to rotation schedules across shift-based operations, examining rest intervals, consecutive sequences, and collective agreement obligations to produce documented findings for union review."
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
              Healthcare rotations can look compliant on paper while quietly creating fatigue, worker dissatisfaction, and collective agreement violations. Most of these problems only surface after a grievance is filed, because schedules are rarely subjected to structured, independent analysis before implementation.
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
            Rotation Analytics Inc. provides Independent Rotation Analysis, a structured third-party review of rotation schedules conducted on behalf of unions and worker representatives.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            The methodology evaluates rotation schedules against collective agreement provisions, extended work agreements, applicable employment standards, and established fatigue science principles. The result is a written findings report identifying schedule elements that fall outside these parameters, classified by risk level.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-10">
            Rotation Analytics does not provide consulting or labour relations strategy. We do not advise on bargaining positions, represent individual workers, or determine grievance outcomes. Our role is limited to producing documented analytical findings that union representatives may use within their own review and decision-making processes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
            {[
              { label: 'Independent', detail: 'No employment or advisory relationship with the employer.' },
              { label: 'Documented', detail: 'Structured written findings supported by analytical review.' },
              { label: 'Risk-Classified', detail: 'Observations organized by severity to support internal assessment.' },
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

      {/* Methodological Foundation */}
      <Section title="Methodological Foundation" divider>
        <div className="max-w-3xl">
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            Our methodology was developed within the scheduling environments of unionized healthcare systems. These environments are characterised by collective agreements of significant interpretive complexity, large shift groups, multi-week extended-hours rotations, shift-type transitions, and documented fatigue sensitivity.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            These conditions concentrate several scheduling risk factors: narrow rest period tolerances, accumulated consecutive work sequences, and provisions that interact across rotation cycles in ways that are not apparent without structured analysis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                label: 'Complex Collective Agreements',
                detail: 'Multi-provision scheduling obligations with interpretive interdependencies.',
              },
              {
                label: 'Extended-Hours Rotations',
                detail: '12-hour shift environments with compressed rest tolerances and fatigue accumulation risk.',
              },
              {
                label: 'Fatigue-Sensitive Environments',
                detail: 'Operational settings where occupational fatigue carries documented safety and performance consequences.',
              },
              {
                label: 'Interpretive Scheduling Risk',
                detail: 'Agreement provisions that create compliance exposure only when examined across full rotation cycles.',
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-slate-200 pl-5">
                <p className="text-sm font-semibold text-slate-800 mb-1">{item.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-brand-navy pl-5">
            Analytical methods developed for the most complex scheduling environments translate directly to other shift-based operations.
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
              For organizations interested in utilizing independent rotation analysis, Rotation Analytics Inc. offers a structured introductory engagement known as the Pilot Diagnostic.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              The pilot establishes a documented analytical baseline through a limited-scope review of selected rotation schedules. It allows commissioning parties to see what structured rotation analysis identifies before considering broader engagement.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              The engagement is intentionally limited in scope and designed to demonstrate what independent analysis reveals within a defined sample. All findings remain fully owned by the commissioning party and may be used internally at their discretion.
            </p>
            <Link
              href="/contact"
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
            A worked example using anonymized schedule data showing how findings are identified, classified, and documented. This demonstration illustrates the structure and depth of a completed rotation findings report.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg p-8 text-left">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Example Rotation
              </p>
              <span className="inline-block text-xs font-semibold text-slate-400 border border-slate-200 bg-slate-50 px-3 py-1 rounded-full">
                Demonstration coming soon.
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When published, this section will include a full shift table, fatigue risk observations,
              and a complete findings summary showing exactly what a rotation analysis produces.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/methodology"
              className="text-sm text-brand-navy font-medium hover:underline"
            >
              Review our methodology in the meantime &rarr;
            </Link>
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
              For unions ready to proceed, rotation analysis can be commissioned immediately for defined schedules or worker groups.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-slate-300 text-slate-700 px-6 py-2.5 rounded font-medium text-sm hover:border-slate-400 transition-colors"
            >
              Discuss an Engagement &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
