import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Pilot Diagnostic',
  description:
    'The Rotation Analytics Inc Pilot Diagnostic — a structured entry point for evaluating independent rotation analysis across a defined rotation period.',
}

const pilotScope = [
  { label: 'Workers covered', value: 'Up to 5 workers per pilot' },
  { label: 'Rotation period', value: 'Two defined cycles (typically 4 weeks each)' },
  { label: 'Deliverables', value: '2 structured documents' },
  { label: 'Employer involvement', value: 'None' },
  { label: 'Findings ownership', value: 'Commissioning party only' },
]

const deliverables = [
  {
    number: '01',
    title: 'Marked Rotation Schedule (Excel)',
    body: 'The submitted rotation returned with all identified non-conformances flagged and annotated directly within the schedule.',
  },
  {
    number: '02',
    title: 'Executive Summary Report',
    body: 'Risk-classified findings with citation of applicable collective agreement provisions, employment standards, and supporting explanation.',
  },
]

const principles = [
  {
    title: 'Independent',
    body: 'No ownership, financial, or contractual relationship with any employer or management body. No contact with facility or scheduling staff at any stage.',
  },
  {
    title: 'Confidential',
    body: 'All materials and findings governed by the engagement agreement. No disclosure to any party not identified in that agreement.',
  },
  {
    title: 'Analytical',
    body: 'Findings are interpretations of the rotation record against established standards — not advocacy positions and not strategic advice.',
  },
]

const timelineSteps = [
  {
    step: 'Step 1',
    title: 'Submission',
    body: 'Rotation files provided in Excel format for up to five workers. Optional context notes may be included. No employer contact required.',
  },
  {
    step: 'Step 2',
    title: 'Independent Analysis',
    body: 'Rotation Analytics Inc conducts review against rest period standards, collective agreement provisions, and established fatigue science.',
  },
  {
    step: 'Step 3',
    title: 'Report Delivery',
    body: 'The marked rotation schedule and executive summary report are delivered confidentially to the commissioning party.',
  },
]

export default function PilotDiagnostic() {
  return (
    <>
      <Hero
        headline="2-Rotation Diagnostic Pilot"
        subheadline="A structured, defined-scope engagement with fixed deliverables, no operational interference, and a documented fee waiver condition."
        cta={{ label: 'Discuss an Engagement', href: '/contact' }}
      />

      {/* Why a Pilot Exists */}
      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Why a Pilot Exists
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Evaluate the value of rotation analysis before any broader commitment.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              The 2-Rotation Diagnostic Pilot provides a concrete, documented experience of what independent rotation analysis produces — without the commitment of a full-scale engagement.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              Scope is fixed at the outset and does not expand without explicit client direction. All findings are owned entirely by the commissioning party and produce a documented record useful for internal files, Health &amp; Safety reporting, and collective bargaining preparation.
            </p>
          </div>

          {/* Scope at a glance */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Scope at a Glance
            </p>
            <div className="divide-y divide-slate-100">
              {pilotScope.map((item) => (
                <div key={item.label} className="flex justify-between items-baseline py-4">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900 text-right ml-6">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What the Client Provides */}
      <Section
        title="What the Client Provides"
        className="bg-brand-cream"
        divider
      >
        <div className="max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
              <span><strong>Required:</strong> Rotation files in Excel format covering the agreed period</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
              <span><strong>Optional:</strong> Context notes on active concerns or provisions of interest</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            No employer system access required. No outside communication with the facility or scheduling staff at any stage.
          </p>
        </div>
      </Section>

      {/* What We Deliver */}
      <Section
        title="What We Deliver"
        subtitle="Every pilot produces two structured documents."
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {deliverables.map((d) => (
            <div key={d.number} className="bg-brand-cream border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-bold text-slate-300 tracking-widest mb-4 text-2xl leading-none">
                {d.number}
              </p>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{d.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement Principles */}
      <Section
        title="Engagement Principles"
        subtitle="Documented in the engagement agreement."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {principles.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-slate-200 border-l-4 border-l-brand-navy rounded-lg p-6"
            >
              <h3 className="text-sm font-semibold text-brand-navy mb-3">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section
        title="Engagement Timeline"
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-lg overflow-hidden">
          {timelineSteps.map((s, i) => (
            <div key={i} className="bg-white p-8">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
                {s.step}
              </p>
              <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center mb-6">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-5 leading-relaxed">
          Target delivery: 2 business days from receipt of complete submission.
        </p>
      </Section>

      {/* Fee Waiver */}
      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Engagement Fee Waiver Condition
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-8">
            If the analysis identifies no findings of material concern, the pilot fee is waived.
          </h2>

          <div className="space-y-5 text-base text-slate-500 leading-relaxed mb-10">
            <p>
              Where independent analysis does not identify findings classified as high or moderate risk, the pilot fee is waived in full. This condition is documented in the engagement agreement prior to commencement.
            </p>
            <p>
              A clean result is itself a documented finding — useful for internal records, Health &amp; Safety reporting, and collective bargaining preparation in the same way an adverse finding would be.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 mb-10 bg-white">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Waiver Applies When
            </p>
            <ul className="space-y-3">
              {[
                'No findings classified as High Risk',
                'No findings classified as Moderate Risk',
                'Submitted rotation files are complete and cover the agreed period',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-5 pt-4 border-t border-slate-100 leading-relaxed">
              Full terms in the engagement agreement. Low-risk findings do not trigger the waiver.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
          >
            Discuss a Pilot Engagement
          </Link>
        </div>
      </Section>
    </>
  )
}
