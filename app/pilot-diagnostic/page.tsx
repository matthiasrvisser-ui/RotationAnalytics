import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Pilot Diagnostic',
  description:
    'The Rotation Analytics Pilot Diagnostic — a structured entry point for unions evaluating Independent Rotation Assurance™, covering fatigue risk, agreement exposure, and scheduling vulnerabilities across a defined rotation period.',
}

const pilotScope = [
  { label: 'Workers covered', value: 'Up to 5 workers per pilot' },
  { label: 'Rotation period', value: 'One defined cycle (typically 4 weeks)' },
  { label: 'Deliverables', value: '4 structured documents' },
  { label: 'Employer involvement', value: 'None' },
  { label: 'Findings ownership', value: 'Commissioning union only' },
]

const deliverables = [
  {
    number: '01',
    title: 'Structured Findings Report',
    body: 'All identified scheduling irregularities documented by worker and rotation period, classified by risk level, and referenced against applicable collective agreement provisions and regulatory standards.',
  },
  {
    number: '02',
    title: 'Fatigue Risk Observations',
    body: 'A review of shift sequences and rest intervals against established occupational health guidelines, identifying scheduling patterns associated with fatigue risk. Observations reference industry best practices and are not quantified fatigue scores.',
  },
  {
    number: '03',
    title: 'Risk Classification Summary',
    body: 'A consolidated index of all findings by risk level, with the specific scheduling pattern, applicable reference, and recommended action noted for each.',
  },
  {
    number: '04',
    title: 'Union Decision Support Brief',
    body: 'A plain-language summary of the most significant findings, written for use by the union committee in determining appropriate next steps. Not strategic advice. A factual summary for internal use.',
  },
]

const principles = [
  {
    title: 'Independent',
    body: 'Independent Rotation Assurance™ holds no ownership, financial, or contractual relationship with any employer, employer association, or management body. Analysis is conducted without reference to management scheduling rationale or employer instruction.',
  },
  {
    title: 'Confidential',
    body: 'All materials received and findings produced are treated as strictly confidential and governed by the engagement agreement. No disclosure is made to any party not identified in that agreement.',
  },
  {
    title: 'Analytical Findings',
    body: 'The pilot produces analytical findings for the commissioning party to use in its own review process. Findings are interpretations of the rotation record against established standards — not advocacy positions and not strategic advice.',
  },
  {
    title: 'No Operational Role',
    body: 'Analysis is conducted entirely from submitted records. No contact is made with the facility, scheduling staff, management, or any employer-side party at any stage of the engagement.',
  },
]

const timelineSteps = [
  {
    step: 'Step 1',
    title: 'Submission',
    body: 'The commissioning union provides rotation files in Excel format for up to five workers across a defined rotation period. Optional context notes may be included. No employer contact is required.',
  },
  {
    step: 'Step 2',
    title: 'Independent Analysis',
    body: 'IRA conducts review against rest period standards, collective agreement provisions, and established fatigue science. No employer communication takes place during this phase.',
  },
  {
    step: 'Step 3',
    title: 'Report Delivery',
    body: 'The complete findings package is delivered confidentially to the commissioning party: structured report, fatigue risk observations, risk summary, and decision support brief.',
  },
]

export default function PilotDiagnostic() {
  return (
    <>
      <Hero
        headline="5-Rotation Diagnostic Pilot"
        subheadline="A structured, defined-scope engagement for unions evaluating independent rotation analysis. Fixed deliverables, no operational interference, and a documented fee waiver condition."
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
              Independent rotation analysis is a new form of engagement for most union committees.
              The 5-Rotation Diagnostic Pilot gives union leadership a concrete, documented
              experience of what the analysis produces, without the commitment of a full-scale or
              ongoing engagement.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-5">
              The pilot covers a defined set of workers and a defined rotation period. Scope does
              not expand without explicit direction from the union. All findings are owned entirely
              by the commissioning party.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              A pilot also produces a documented record in its own right, useful for Health &amp;
              Safety reporting, internal union files, and collective bargaining preparation,
              regardless of what the findings show.
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

      {/* What the Union Provides */}
      <Section
        title="What the Union Provides"
        subtitle="The pilot requires minimal input from the commissioning union."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Required
            </p>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Rotation files (Excel)</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Shift schedule data for up to five workers provided in Excel format. Standard
                  rotation export files are accepted without modification or reformatting.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Optional
            </p>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Context notes</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Background the union wishes to provide: active scheduling concerns, specific
                  provisions of interest, or ongoing grievance context. Not required, but may
                  focus the analysis on areas of union priority.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 max-w-2xl leading-relaxed">
          No access to employer systems is required. No direct communication with the facility,
          employer, or scheduling staff is involved at any stage. All materials are submitted
          directly to IRA by the commissioning union.
        </p>
      </Section>

      {/* What We Deliver */}
      <Section
        title="What We Deliver"
        subtitle="Every pilot engagement produces four structured documents, delivered as a complete package."
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
        subtitle="The terms under which every pilot is conducted, documented in the engagement agreement."
        className="bg-brand-cream"
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        subtitle="The pilot follows a structured three-phase sequence from submission to delivery."
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
          Target delivery window: 10–15 business days from receipt of a complete submission.
          Timeline is confirmed at the outset of the engagement.
        </p>
      </Section>

      {/* Risk Reduction Statement */}
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
              Where independent analysis of the submitted rotation files does not identify findings
              classified as high or moderate risk under the standard classification framework, the
              pilot engagement fee is waived in full.
            </p>
            <p>
              This condition is documented in the engagement agreement prior to commencement. It is
              not a promotional offer. It reflects the analytical basis on which this service
              operates: if the schedules are compliant and the rotations are sound, the union carries
              no financial exposure from the engagement.
            </p>
            <p>
              In practice, a clean pilot result is itself a documented finding. It can inform
              collective bargaining, Health &amp; Safety reporting, and internal union records in
              the same way that an adverse finding would.
            </p>
          </div>

          {/* Waiver condition box */}
          <div className="border border-slate-200 rounded-lg p-6 mb-10 bg-white">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Waiver Applies When
            </p>
            <ul className="space-y-3">
              {[
                'No findings are classified as High Risk',
                'No findings are classified as Moderate Risk',
                'The submitted rotation files are complete and cover the agreed period',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-5 pt-4 border-t border-slate-100 leading-relaxed">
              Full waiver terms are set out in the engagement agreement. Low-risk findings do not
              trigger the waiver. A low-risk finding is a documented record, not a null result.
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
