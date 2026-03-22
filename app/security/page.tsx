import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Information Security',
  description:
    'How Rotation Analytics protects client data — infrastructure security, encryption, access controls, data residency, retention, and breach notification procedures.',
}

const infrastructure = [
  {
    title: 'Hosting & Network',
    items: [
      'Application hosted on Vercel — enterprise-grade edge network with automatic TLS/SSL encryption on all connections.',
      'All data transmitted between your browser and our servers is encrypted in transit using TLS 1.2 or higher.',
      'No client data is stored on local machines, personal devices, or removable media.',
    ],
  },
  {
    title: 'Database & Storage',
    items: [
      'Client data is stored in a dedicated PostgreSQL database hosted by Supabase on Amazon Web Services (AWS) infrastructure.',
      'All data is encrypted at rest using AES-256 encryption.',
      'Database access is restricted to authenticated server-side operations only — no direct client-side database access is permitted.',
      'Row-level security policies enforce data isolation between engagements.',
    ],
  },
  {
    title: 'Authentication & Access Control',
    items: [
      'Administrative access is protected by authenticated credentials and restricted to authorised personnel only.',
      'Client engagement data is accessed exclusively through unique, cryptographically generated status tokens — not through user accounts or passwords.',
      'API keys and service credentials are stored as encrypted environment variables, never committed to source code.',
    ],
  },
]

const policies = [
  {
    title: 'Data Residency',
    body: 'Client data is primarily stored and processed within North American data centres. Our database infrastructure is hosted on AWS through Supabase, with primary data centres in North America. Where required by contract, data residency provisions can be discussed during engagement onboarding.',
  },
  {
    title: 'Data Retention',
    body: 'Engagement data — including submitted rotation files, analytical deliverables, and communication records — is retained for seven (7) years from engagement completion in compliance with applicable Canadian tax and business record regulations. Upon request or at the end of the retention period, data is securely deleted.',
  },
  {
    title: 'Data Minimisation',
    body: 'Rotation Analytics collects only the information necessary to perform the commissioned analysis. We do not collect employee names, personal identifiers, or health information. Rotation data is processed in aggregate by line number. We do not use client data for any purpose beyond the scope defined in the service agreement.',
  },
  {
    title: 'Third-Party Processors',
    body: 'Rotation Analytics uses a limited number of third-party service providers to deliver its services. Each processor has been evaluated for security practices and data handling standards. A list of current sub-processors is available upon request.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <Hero
        headline="Information Security"
        subheadline="How Rotation Analytics protects the confidentiality, integrity, and availability of client data throughout every engagement."
      />

      {/* Overview */}
      <Section contained divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            Rotation Analytics handles sensitive operational scheduling data on behalf of our clients.
            We take this responsibility seriously. This page describes the technical and organisational
            measures we maintain to protect client data.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            Our security practices are designed to meet the expectations of enterprise clients operating
            in regulated, unionised environments where data confidentiality is not optional.
          </p>
        </div>
      </Section>

      {/* Infrastructure Security */}
      <Section contained className="bg-brand-cream" divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Infrastructure Security
          </p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-8">
            How Your Data Is Protected
          </h2>
          <div className="space-y-8">
            {infrastructure.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 flex-shrink-0" />
                      <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Data Handling Policies */}
      <Section contained divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Data Handling
          </p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-8">
            Policies Governing Client Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {policies.map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Breach Notification */}
      <Section contained className="bg-brand-cream" divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Incident Response
          </p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Breach Notification
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In the event of a data breach that poses a real risk of significant harm, Rotation Analytics will:
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Notify affected clients via their provided contact information within 72 hours of confirmed breach discovery.',
              'Report the breach to the Office of the Privacy Commissioner of Canada (OPC) as required under PIPEDA.',
              'Where the breach involves Alberta residents, notify the Information and Privacy Commissioner of Alberta as required under PIPA.',
              'Provide a written incident report describing the nature of the breach, data affected, containment measures taken, and remediation steps.',
              'Take immediate corrective actions to contain the breach and prevent recurrence.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4">
                <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand-navy">{i + 1}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Confidentiality Commitment */}
      <Section contained divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Confidentiality
          </p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Operational Confidentiality Commitments
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Engagement Isolation',
                body: 'Each client engagement is logically isolated. Data from one engagement is never accessible to, shared with, or visible to any other client or engagement.',
              },
              {
                title: 'Personnel Controls',
                body: 'Only authorised personnel with a direct operational need access client data. All personnel with data access are bound by confidentiality obligations.',
              },
              {
                title: 'No Secondary Use',
                body: 'Client data is never used for marketing, benchmarking, training, or any purpose beyond the scope of the commissioned analysis. We do not aggregate client data across engagements.',
              },
              {
                title: 'Deliverable Security',
                body: 'Completed deliverables are made available exclusively through authenticated, time-limited download links. Deliverable access tokens expire automatically. Deliverables are not transmitted via unencrypted email.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-brand-navy/20 pl-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Compliance Framework */}
      <Section contained className="bg-brand-cream" divider>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Compliance
          </p>
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Regulatory Alignment
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rotation Analytics operates in accordance with the following privacy and data protection frameworks:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: 'PIPEDA',
                detail: 'Personal Information Protection and Electronic Documents Act — federal Canadian privacy legislation governing commercial activity.',
              },
              {
                label: 'PIPA (Alberta)',
                detail: 'Personal Information Protection Act — Alberta\'s private-sector privacy legislation, substantially similar to PIPEDA.',
              },
              {
                label: 'Electronic Transactions Act',
                detail: 'Alberta\'s Electronic Transactions Act — governing the validity of electronic agreements, signatures, and records.',
              },
              {
                label: 'Employment Standards',
                detail: 'Analytical methodology references applicable provincial employment standards and peer-reviewed fatigue science.',
              },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-brand-navy mb-1">{item.label}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Enterprise Enquiries */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-lg p-6">
            <p className="text-sm font-semibold text-brand-navy mb-2">
              Enterprise Security Enquiries
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              For organisations with specific security requirements — including requests for our
              sub-processor list, data processing agreements, or security questionnaire completion —
              please contact us directly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@rotationanalytics.ca"
                className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
              >
                hello@rotationanalytics.ca
              </a>
              <a
                href="tel:+14035063636"
                className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
              >
                (403) 506-3636
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 leading-relaxed">
            This page describes Rotation Analytics&rsquo; current security practices as of March 2026.
            Security measures are reviewed and updated regularly. For the most current information,{' '}
            <Link href="/contact" className="text-brand-navy hover:underline">contact us</Link>.
            See also:{' '}
            <Link href="/privacy-policy" className="text-brand-navy hover:underline">Privacy Policy</Link>
            {' · '}
            <Link href="/terms-of-service" className="text-brand-navy hover:underline">Terms of Service</Link>
          </p>
        </div>
      </Section>
    </>
  )
}
