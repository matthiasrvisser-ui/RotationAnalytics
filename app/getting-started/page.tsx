import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Getting Started',
  description:
    'How to engage Rotation Analytics Inc for independent rotation compliance and fatigue risk analysis. From initial conversation through delivery — a clear process.',
  openGraph: {
    title: 'Getting Started | Rotation Analytics Inc',
    description:
      'An engagement pathway for unions, employers, and labour relations professionals seeking independent rotation analysis.',
  },
}

const timelineSteps = [
  {
    number: '01',
    title: 'Initial Conversation',
    duration: '15–30 minutes',
    description:
      'We discuss your scheduling environment, the collective agreement(s) in scope, and what you are looking to achieve. This conversation is confidential and carries no obligation.',
    details: [
      'Identify the rotation(s) and agreement(s) in scope',
      'Determine whether fatigue analysis is relevant',
      'Answer any questions about methodology or deliverables',
      'Confirm the engagement structure and expected timeline',
    ],
  },
  {
    number: '02',
    title: 'Service Agreement',
    duration: 'Electronic acceptance',
    description:
      'A straightforward service agreement governs all engagements. It covers scope, confidentiality, independence, deliverables, and fees. You review and accept it electronically — no procurement cycles or lengthy negotiations.',
    details: [
      'Per-rotation pricing with a $225 CAD minimum — no subscriptions or platform fees',
      'Confidentiality obligations documented in writing',
      'Independence commitments explicitly stated',
      'Agreement covers all submissions for 12 months',
    ],
  },
  {
    number: '03',
    title: 'Rotation Submission',
    duration: '5 minutes',
    description:
      'Submit the rotation schedule (Excel or CSV), identify the applicable collective agreement, and elect whether to include fatigue risk analysis. That is all we need to begin.',
    details: [
      'Upload the rotation file directly through the secure portal',
      'Reference the collective agreement and any local conditions',
      'Elect the optional Fatigue Risk Analysis add-on',
      'Provide any additional context that may assist the analysis',
    ],
  },
  {
    number: '04',
    title: 'Analysis and Delivery',
    duration: '48–72 hours from confirmed payment',
    description:
      'Rotation Analytics Inc evaluates the rotation against every applicable provision in the collective agreement. If fatigue analysis is elected, the biomathematical model runs concurrently. Deliverables are released confidentially to the submitting client.',
    details: [
      'Annotated rotation schedule with flagged non-conformances',
      'Executive findings report with risk classifications and citations',
      'Fatigue risk analysis report with per-line scores and trend data (if elected)',
      'All deliverables are confidential to the engagement client',
    ],
  },
]

const pilotBenefits = [
  {
    title: 'One Rotation, One Fee',
    description:
      'One fee, one rotation, one deliverable set. No minimum volume, no multi-year contract, no platform subscription.',
  },
  {
    title: 'Full Methodology',
    description:
      'The pilot engagement uses the same analysis engine, the same fatigue model, and the same deliverable format as every other engagement. Nothing is simplified or reduced.',
  },
  {
    title: 'Evaluate the Output',
    description:
      'Review the deliverables against your own internal analysis or known issues. The findings speak for themselves — and they provide the basis for deciding whether ongoing engagement adds value.',
  },
  {
    title: 'No Ongoing Commitment',
    description:
      'A single analysis starting at $225 CAD. If the pilot demonstrates value, your service agreement remains active for 12 months — submit additional rotations at any time.',
  },
]

const faqs = [
  {
    question: 'What format does the rotation need to be in?',
    answer:
      'Excel (.xlsx, .xls) or CSV. The rotation should include shift start times, end times, and shift type identifiers. A shift legend or key should be included or provided separately.',
  },
  {
    question: 'How are findings delivered?',
    answer:
      'Deliverables are released through authenticated download. The submitting client receives a secure link to access their engagement deliverables. Findings are never shared with any party other than the engagement client.',
  },
  {
    question: 'Can both the union and the employer engage separately?',
    answer:
      'Yes. Rotation Analytics Inc operates independently and will accept engagements from any party. Each engagement is confidential to the submitting client. If both parties engage on the same rotation, each receives their own independent analysis.',
  },
  {
    question: 'What collective agreements do you support?',
    answer:
      'The analysis engine is configured for the specific collective agreement identified at submission. We have deep experience with healthcare collective agreements in Alberta and can support agreements from any Canadian jurisdiction and sector.',
  },
  {
    question: 'Is there a minimum engagement size?',
    answer:
      'The minimum engagement fee is $225 CAD, which covers rotations up to approximately 640 shifts at the base compliance rate. Most single-rotation analyses fall within this range.',
  },
]

export default function GettingStartedPage() {
  return (
    <>
      <Hero
        headline="Getting Started"
        subheadline="A clear process from initial conversation to delivered findings. No platform onboarding, no procurement hurdles — just the analysis your rotation requires."
      />

      {/* ── ENGAGEMENT PATHWAY ── */}
      <Section contained>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            The Engagement Pathway
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Four steps from conversation to findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-12 max-w-3xl">
            Every engagement follows the same process. Whether this is
            your first analysis or your twentieth, the pathway is consistent,
            predictable, and designed to be fast.
          </p>

          <div className="space-y-0">
            {timelineSteps.map((step, i) => (
              <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Timeline line */}
                {i < timelineSteps.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-slate-200" />
                )}
                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-brand-navy">{step.title}</h3>
                    <span className="text-xs text-slate-400 font-medium">{step.duration}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-slate-500 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PILOT ENGAGEMENT ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Start with a Pilot
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            One rotation. Full analysis. No ongoing commitment.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-3xl">
            The most effective way to evaluate the service is to submit a rotation
            you already know well. Compare the findings against your own understanding
            of the schedule. If the analysis identifies issues you were already
            aware of — and reveals issues you were not — you have your answer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pilotBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border border-brand-navy/10 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-navy mb-1">
                Ready to evaluate with a pilot?
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Reach out to discuss your rotation and collective agreement. We will
                confirm scope and timeline before any commitment.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center justify-center bg-brand-navy text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-brand-navy-dark transition-colors"
            >
              Discuss a Pilot
            </Link>
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-8">
            Common Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-brand-navy mb-2">{faq.question}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section contained className="bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Start with a conversation.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation ready to submit or want to understand
            how independent analysis applies to your scheduling environment, the first
            step is the same.
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
