import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { IndependenceSection } from '@/components/IndependenceSection'
import { ProcessOverview } from '@/components/ProcessOverview'

const primaryProblems = [
  {
    heading: 'Collective Agreement Compliance',
    body: 'Scheduling provisions within collective agreements create specific scheduling obligations. Without independent review, non-compliance may persist across rotation cycles without being identified.',
  },
  {
    heading: 'Lack of Documented Analysis',
    body: 'Grievance preparation is strengthened when supported by independently produced analysis. Informal review does not carry the same evidentiary weight. Rotation Analytics provides a documented analysis package for client use.',
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
      {/* §1 — Hero */}
      <Hero
        headline="Hidden Risks Live Inside Complex Rotation Schedules"
        subheadline="We reveal them before they become costly problems. Independent, expert-led analysis of unionized shift rotations, powered by purpose-built compliance tools."
        cta={{ label: 'Begin an Engagement', href: '/engage' }}
        secondaryCta={{ label: 'View Sample Report', href: '/sample-report' }}
        tertiaryCta={{ label: 'View Example Rotation', href: '/example-rotation' }}
      />

      {/* §2 — Credential line */}
      <div className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Led by a rotation specialist who has built, validated, and audited thousands of rotation schedules across healthcare — from frontline scheduling to advising enterprise workforce platforms on compliance tool construction.{' '}
            <Link href="/about" className="text-brand-navy font-medium hover:underline">Meet the team &rarr;</Link>
          </p>
        </div>
      </div>

      {/* §3 — Independence & Confidentiality (moved up) */}
      <IndependenceSection />

      {/* §4 — Problem framing */}
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

      {/* §5 — Why Rotation Analytics */}
      <Section className="bg-brand-cream" divider>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Why Rotation Analytics
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
            Manual review doesn&rsquo;t scale. Purpose-built analysis does.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            You know the reality: collective agreement scheduling provisions are extremely complex and difficult to decipher. Rotations span weeks. Manual review, no matter how experienced the reviewer, misses more as complexity increases.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            Rotation Analytics was built for exactly this problem. Issues identified before implementation cost a fraction of what they cost after a grievance is filed. Independent analysis turns potential disputes into documented, addressable findings.
          </p>

          <div className="bg-white border border-brand-navy/10 rounded-lg p-6">
            <p className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-2">
              Only Available Here
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">On-call shift validation</strong>: our engine validates on-call scheduling against collective agreement provisions, including placement relative to off-duty days, frequency, and rest period interactions. No other rotation analysis service provides this. Combined with our <strong className="text-slate-800">biomathematical fatigue modelling</strong>, this is the most complete rotation risk assessment available in Canada.
            </p>
          </div>
        </div>
      </Section>

      {/* §6 — See It In Action + What You Receive (merged) */}
      <Section divider>
        <div className="mb-12">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            See It In Action
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            From rotation to documented findings.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Walk through a real analysis, from a rotation that passed manual review to the report that revealed what was missed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
              Review the executive report that analysis produced. 15 parameters evaluated, 5 findings documented with risk classifications and agreement references.
            </p>
            <span className="text-sm font-medium text-brand-navy">
              View the report &rarr;
            </span>
          </Link>
          <Link href="/fatigue-analysis" className="group border border-slate-200 rounded-lg p-8 hover:border-brand-navy/30 transition-colors">
            <p className="text-2xl font-bold text-slate-200 mb-4">03</p>
            <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-navy transition-colors">Fatigue Analysis</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              A schedule can be fully compliant and still produce a fatigued worker. See how biomathematical fatigue modelling identifies where and when that happens.
            </p>
            <span className="text-sm font-medium text-brand-navy">
              Learn more &rarr;
            </span>
          </Link>
        </div>
      </Section>

      {/* §7 — Process overview + mid-page CTA */}
      <Section
        className="bg-brand-cream"
        title="The Analysis Process"
        subtitle="A rotation is a cyclical work plan where a pattern of shifts repeats over a set period, usually spanning weeks or months. Here is how an analysis is conducted from receipt to delivery."
        divider
      >
        <ProcessOverview />
        <div className="mt-8">
          <Link
            href="/getting-started"
            className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
          >
            View the full engagement pathway &rarr;
          </Link>
        </div>

      </Section>

      {/* §8 — Final CTA */}
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
              href="/getting-started"
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              See How It Works &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
