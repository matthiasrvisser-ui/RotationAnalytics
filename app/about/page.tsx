import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Rotation Analytics Inc, an independent analytical firm providing third-party review of rotation schedules for any organization requiring expert, non-affiliated rotation analysis.',
}

const commitments = [
  {
    title: 'Independence',
    body: 'No ownership, financial, or contractual relationship with any employer, employer association, or management body.',
  },
  {
    title: 'Confidentiality',
    body: 'Findings released only to the client as defined in the service agreement.',
  },
  {
    title: 'Accuracy',
    body: 'All findings documented with specific data references, applicable provisions, and methodological basis.',
  },
  {
    title: 'Scope Integrity',
    body: 'We produce what is commissioned. We do not advise on bargaining strategy or substitute for the client\u2019s own authority.',
  },
]

export default function About() {
  return (
    <>
      <Hero
        headline="About Rotation Analytics Inc"
        subheadline="An independent analytical firm providing third-party review of rotation schedules. Analysis conducted without alignment to any party to the scheduling arrangement."
      />

      {/* Why We Exist */}
      <Section divider>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Why We Exist
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Rotation schedules are too complex and too consequential for manual review alone.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-5">
            Rotation Analytics Inc was founded on a simple observation: the people reviewing rotation schedules (schedulers, labour relations professionals, union representatives) are doing critical work with inadequate tools. A single rotation can contain hundreds of shift assignments governed by intersecting rules from collective agreements, employment standards, and occupational health guidelines. Manual review cannot reliably hold all of those parameters in view.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            We built a firm and a methodology to close that gap. Independent, evidence-based analysis that documents what the schedule actually contains, so every party to the arrangement can make informed decisions.
          </p>
        </div>
      </Section>

      {/* Leadership — the trust anchor */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Leadership
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-8">
            Built by people who have lived the schedules.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white text-sm font-bold">
                  KV
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Kristy Visser</p>
                  <p className="text-xs text-slate-500">Principal Analyst</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Kristy started on the front line as a unionized healthcare worker who lived the rotations herself. Over the past decade she moved to the other side of the table: building rotation schedules, auditing them for compliance, training consultants on how to do it correctly, and advising enterprise-level workforce technology platforms on rotation compliance logic.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                That complete operational picture, from working the shifts to constructing the schedules to validating them at scale, is what she built the proprietary analysis engine from. Kristy doesn&rsquo;t study rotations from the outside. She has done every part of the work.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white text-sm font-bold">
                  MV
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Matthias Visser</p>
                  <p className="text-xs text-slate-500">Founder &amp; CEO</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Matthias is an operational leader and business owner who founded{' '}
                <a href="https://www.frontierhsa.ca" target="_blank" rel="noopener noreferrer" className="text-brand-navy font-medium hover:underline">Frontier HSA</a>,
                a Health Spending Account provider serving Canadian small businesses. That experience building compliant, regulated financial products from the ground up shaped how he approaches new ventures: get the infrastructure right, document everything, and let the work speak for itself.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                He married Kristy in 2025, and together they built Rotation Analytics Inc. Matthias is responsible for the commercial operations, strategic direction, and client engagement that enable the firm to deliver independent analysis at scale.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 leading-relaxed">
            Rotation Analytics Inc is a division of Visser Ventures Corp., incorporated under the laws of the Province of Alberta, Canada.
          </p>
        </div>
      </Section>

      {/* Commitments */}
      <Section divider>
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Our Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commitments.map((c) => (
              <div key={c.title} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{c.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-brand-navy">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Ready to discuss an engagement?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have a specific rotation in mind or want to understand what independent analysis would reveal, we are available to discuss your requirements.
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
