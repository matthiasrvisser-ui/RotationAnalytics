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
        headline="Hidden Risks Live Inside Complex Rotation Schedules"
        subheadline="We reveal them before they become costly problems. Independent, expert-led analysis of unionized shift rotations — powered by purpose-built compliance tools."
        cta={{ label: 'View Example Rotation', href: '/example-rotation' }}
        secondaryCta={{ label: 'View Sample Report', href: '/sample-report' }}
      />

      {/* Credential line */}
      <div className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Built by former unionized healthcare workers with over a decade of frontline rotation experience. We have lived the schedules we now analyze &mdash; and we bring that firsthand understanding to every engagement.
          </p>
        </div>
      </div>

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
              Unionized rotations can appear acceptable during cursory review while quietly creating fatigue, worker dissatisfaction, and failing to meet collective agreement obligations. Most of these problems only emerge after a grievance is filed, because schedules are rarely subjected to structured, independent analysis before implementation.
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

      {/* Why Rotation Analytics */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Why Rotation Analytics
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Manual review doesn&rsquo;t scale. Purpose-built analysis does.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            You know the reality: collective agreements contain hundreds of scheduling provisions. Rotations span weeks. A single schedule can generate thousands of individual compliance checkpoints. Manual review — no matter how experienced the reviewer — misses more as complexity increases.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-10">
            Rotation Analytics was built for exactly this problem.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Purpose-Built Compliance Tools</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our proprietary analysis engine was engineered specifically for rotation compliance — evaluating every shift against every applicable provision across the full rotation cycle.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Domain Expertise</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Decades of real-world experience in unionized shift environments inform every parameter we evaluate. The tool is powerful because the expertise behind it knows what to look for.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Pre-Grievance Identification</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Issues identified before implementation cost a fraction of what they cost after a grievance is filed. Structured analysis turns potential disputes into documented, addressable findings.
              </p>
            </div>
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

      {/* What You Receive */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            What You Receive
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Documented findings, delivered confidentially.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-3xl">
            Every engagement produces two core deliverables. A third is available when fatigue analysis is elected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-2xl font-bold text-slate-200 mb-4">01</p>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Annotated Rotation Schedule</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your rotation returned with all identified non-conformances flagged and annotated directly in the file.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-2xl font-bold text-slate-200 mb-4">02</p>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Executive Findings Report</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Risk-classified findings with collective agreement citations and supporting explanation for internal review.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <p className="text-2xl font-bold text-slate-200 mb-4">03</p>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Fatigue Risk Analysis Report <span className="text-xs font-normal text-slate-400">(add-on)</span></h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Per-line fatigue scores, risk classifications, and trend visualisations across the full rotation cycle. Elected at submission.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Where Rotation Analysis Applies */}
      <Section title="Where Rotation Analysis Applies" divider>
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

      {/* See It In Action */}
      <Section divider>
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            See It In Action
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            From rotation to documented findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Walk through a real analysis — from a rotation that passed manual review to the structured report that revealed what was missed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <Link href="/example-rotation" className="group border border-slate-200 rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">01</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">Example Rotation</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              See how a rotation can appear compliant at first glance while containing hidden rest period violations, weekend non-compliance, and on-call scheduling issues.
            </p>
            <span className="text-sm font-medium text-brand-navy">
              View the rotation &rarr;
            </span>
          </Link>
          <Link href="/sample-report" className="group border border-slate-200 rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">02</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">Sample Report</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Review the executive report that analysis produced — 15 parameters evaluated, 5 findings documented with risk classifications and agreement references.
            </p>
            <span className="text-sm font-medium text-brand-navy">
              View the report &rarr;
            </span>
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
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
