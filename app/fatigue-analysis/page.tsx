import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { FatigueModelDiagram, ProcessCards, RiskTable, PipelineDiagram } from './components'

export const metadata: Metadata = {
  title: 'Fatigue Analysis',
  description:
    'Biomathematical fatigue risk analysis for rotation schedules. Rotation Analytics applies a three-process fatigue model — sleep pressure, circadian rhythm, and sleep inertia — to identify fatigue exposure across entire rotation cycles.',
  openGraph: {
    title: 'Fatigue Analysis | Rotation Analytics',
    description:
      'Biomathematical fatigue risk modeling integrated with collective agreement compliance analysis. Identify fatigue exposure that manual review cannot detect.',
  },
}

export default function FatigueAnalysisPage() {
  return (
    <>
      <Hero
        headline="Fatigue Risk Analysis"
        subheadline="Biomathematical fatigue modeling applied across entire rotation cycles — integrated with collective agreement compliance analysis."
      />

      {/* ── WHY FATIGUE ANALYSIS MATTERS ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Why Rotation Schedules Create Hidden Fatigue Risk
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            A rotation schedule may satisfy every provision in a collective agreement and still
            expose workers to significant fatigue risk. Compliance and fatigue are separate
            dimensions of the same problem — and most organisations only examine one.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Fatigue is not a feeling. It is a measurable physiological state driven by two
            biological systems: <strong>homeostatic sleep pressure</strong> (how long you have
            been awake) and the <strong>circadian rhythm</strong> (your internal clock). When
            shift schedules compress rest windows, force night-to-day transitions, or extend
            consecutive work periods, these systems are disrupted in ways that are predictable
            and quantifiable.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rotation Analytics applies a biomathematical fatigue model to every shift in a
            rotation — generating fatigue scores, alertness predictions, and risk
            classifications that manual review cannot produce. This analysis runs alongside our
            collective agreement compliance engine, producing a combined view of scheduling risk
            that is unique in the industry.
          </p>

          <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-lg p-6 mb-6">
            <p className="text-sm font-semibold text-brand-navy mb-2">
              The Rotation Analytics Difference
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Our fatigue analysis engine is coupled directly with our collective agreement
              compliance tooling. A single rotation submission produces both a compliance
              assessment and a fatigue risk profile — evaluated together, not in isolation.
              This integrated approach identifies risks that neither analysis would reveal on
              its own.
            </p>
          </div>
        </div>
      </Section>

      {/* ── THE ANALYSIS PIPELINE ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-3">
            How the Fatigue Engine Works
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            The fatigue model follows a structured processing pipeline. Each shift in the
            submitted rotation is expanded into a continuous timeline, then evaluated through
            three physiological models to produce fatigue scores at every point in the rotation
            cycle.
          </p>
          <PipelineDiagram />
        </div>
      </Section>

      {/* ── TIMELINE GENERATION ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Timeline Generation
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Fatigue modelling requires continuous time resolution, not just shift start and end
            times. The engine expands each submitted rotation into a time grid at 15-minute
            intervals across the full rotation cycle.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            A typical 14-day rotation produces 1,344 individual time steps. Each step records
            whether the worker is on shift, awake, or in a predicted sleep period — along with
            the computed fatigue metrics at that moment.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 my-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Timeline Resolution
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-brand-navy">15 min</p>
                <p className="text-xs text-slate-500 mt-1">Time step resolution</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-brand-navy">1,344</p>
                <p className="text-xs text-slate-500 mt-1">Steps per 14-day rotation</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-brand-navy">9</p>
                <p className="text-xs text-slate-500 mt-1">Metrics per time step</p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            At each time step, the engine computes and stores: work state, wake state, sleep
            opportunity, sleep prediction, homeostatic sleep pressure, circadian phase, sleep
            inertia, alertness index, and fatigue score.
          </p>
        </div>
      </Section>

      {/* ── THE THREE-PROCESS MODEL ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-3">
            The Three-Process Fatigue Model
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            The fatigue engine is grounded in established sleep science. Three physiological
            processes interact to determine alertness at any point in time. The model
            quantifies each process independently, then combines them to produce a composite
            fatigue score.
          </p>
          <ProcessCards />
        </div>
      </Section>

      {/* ── PROCESS S: SLEEP PRESSURE ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Process S — Homeostatic Sleep Pressure
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Sleep pressure is the biological drive to sleep. It increases continuously during
            wakefulness and decreases during sleep. The longer a person is awake, the greater
            the pressure — and the greater the impairment to alertness and cognitive
            performance.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The model tracks sleep pressure as a value between 0 and 1, updating at each
            15-minute time step. During wakefulness, pressure rises asymptotically toward 1.
            During sleep, it decays exponentially toward 0.
          </p>

          <FatigueModelDiagram
            title="During Wakefulness"
            description="Sleep pressure rises slowly — approaching maximum over approximately 18 hours of continuous wakefulness."
            equation="S(t) = S(t{-}1) + \bigl(1 - S(t{-}1)\bigr) \cdot \frac{\Delta t}{\tau_w}"
            parameters={[
              { symbol: '\\tau_w', value: '18 \\text{ hours}', description: 'Wake time constant — rate of pressure accumulation' },
              { symbol: '\\Delta t', value: '0.25 \\text{ hours}', description: 'Time step (15 minutes)' },
            ]}
          />

          <FatigueModelDiagram
            title="During Sleep"
            description="Sleep pressure drops rapidly — most recovery occurs within the first 4 hours of sleep."
            equation="S(t) = S(t{-}1) - S(t{-}1) \cdot \frac{\Delta t}{\tau_s}"
            parameters={[
              { symbol: '\\tau_s', value: '4 \\text{ hours}', description: 'Sleep time constant — rate of pressure dissipation' },
            ]}
          />

          <p className="text-slate-700 leading-relaxed mb-4">
            The asymmetry is deliberate and reflects human physiology: it takes far longer to
            accumulate fatigue than to recover from it — provided adequate sleep opportunity
            exists. When rotation schedules compress rest windows below 6-8 hours, the pressure
            never fully dissipates, and fatigue carries forward into subsequent shifts.
          </p>
        </div>
      </Section>

      {/* ── PROCESS C: CIRCADIAN RHYTHM ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Process C — Circadian Rhythm
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The circadian rhythm is the body&rsquo;s internal 24-hour clock. Independent of how
            much sleep a person has had, alertness naturally fluctuates throughout the day.
            Performance is lowest in the early morning hours and highest in the late afternoon.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The engine models this as a sinusoidal oscillator — a mathematical representation
            of the predictable rise and fall of alertness over a 24-hour period.
          </p>

          <FatigueModelDiagram
            title="Circadian Oscillator"
            description="A sine wave with a 24-hour period captures the predictable daily rhythm of human alertness."
            equation="C(t) = A \cdot \sin\!\left(\frac{2\pi\,(t - \varphi)}{24}\right)"
            parameters={[
              { symbol: 'A', value: '\\text{amplitude}', description: 'Strength of the circadian effect on alertness' },
              { symbol: '\\varphi', value: '\\text{phase offset}', description: 'Timing of the circadian nadir (lowest point)' },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-white border border-red-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">
                Circadian Low Point
              </p>
              <p className="text-lg font-semibold text-brand-navy">03:00 – 05:00</p>
              <p className="text-sm text-slate-600 mt-1">
                Lowest alertness. Night shifts during this window carry the highest fatigue
                exposure regardless of prior sleep.
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-2">
                Circadian Peak
              </p>
              <p className="text-lg font-semibold text-brand-navy">16:00 – 18:00</p>
              <p className="text-sm text-slate-600 mt-1">
                Highest alertness. Performance is naturally strongest in the late afternoon,
                independent of sleep history.
              </p>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            The circadian model explains why night shifts are inherently more fatiguing than day
            shifts — even when total sleep hours are identical. A worker on night duty is
            fighting their biological clock, and the fatigue engine captures this
            mathematically.
          </p>
        </div>
      </Section>

      {/* ── PROCESS W: SLEEP INERTIA ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Process W — Sleep Inertia
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Sleep inertia is the temporary period of reduced alertness immediately after waking.
            For the first 30 to 60 minutes after sleep ends, cognitive performance is impaired
            — even if the person slept well. This is the grogginess experienced upon waking.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The engine models sleep inertia as an exponential decay that begins at wake-up and
            diminishes over approximately 30 minutes.
          </p>

          <FatigueModelDiagram
            title="Sleep Inertia Decay"
            description="Performance impairment is strongest at wake-up and dissipates exponentially."
            equation="I(t) = I_0 \cdot e^{-t\,/\,\tau_i}"
            parameters={[
              { symbol: 'I_0', value: '0.3', description: 'Initial inertia magnitude at wake-up' },
              { symbol: '\\tau_i', value: '0.5 \\text{ hours}', description: 'Decay constant — inertia halves every ~20 minutes' },
            ]}
          />

          <p className="text-slate-700 leading-relaxed mb-4">
            Sleep inertia is particularly relevant for rotations that require workers to
            transition rapidly from rest to duty. When the gap between sleep end and shift start
            is short, workers begin their shift in a state of measurable impairment.
          </p>
        </div>
      </Section>

      {/* ── SLEEP PREDICTION ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Sleep Opportunity and Prediction
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The engine does not assume workers sleep for a fixed number of hours between
            shifts. Instead, it predicts when sleep is likely to occur based on two factors:
            whether a sleep opportunity exists, and whether the biological drive to sleep is
            sufficient.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            A sleep opportunity exists when:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>The worker is off shift</li>
            <li>The circadian time is within a sleep-favourable window (typically 20:00 – 10:00)</li>
            <li>Accumulated sleep pressure exceeds the sleep onset threshold</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            Sleep terminates when pressure has dissipated sufficiently or when the next shift
            approaches. This produces realistic sleep blocks of 6–8 hours under normal
            conditions — but shorter, fragmented sleep when rest windows are compressed by the
            schedule.
          </p>

          <h3 className="text-lg font-semibold text-brand-navy mt-8 mb-4">
            Sleep Debt Accumulation
          </h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            When predicted sleep falls below the 8-hour daily requirement, sleep debt
            accumulates. The engine tracks this deficit across the full rotation cycle and
            applies it as a fatigue modifier — meaning fatigue compounds over consecutive days
            of insufficient rest.
          </p>

          <FatigueModelDiagram
            title="Sleep Debt Modifier"
            description="Accumulated sleep debt increases the fatigue score proportionally."
            equation="\text{Fatigue}_{\text{adjusted}} = \text{Fatigue} + (\text{Sleep Debt} \times k)"
            parameters={[
              { symbol: 'k', value: '3', description: 'Debt coefficient — each hour of deficit adds 3 points to the fatigue score' },
              { symbol: '\\text{Sleep Debt}', value: '8 - \\text{Actual Sleep}', description: 'Hours below daily requirement' },
            ]}
          />

          <p className="text-slate-700 leading-relaxed mb-4">
            This is why multi-week rotation analysis is essential. A single shift may appear
            acceptable in isolation, but the cumulative effect of consecutive short rest
            periods produces compounding fatigue that only becomes visible when the full
            rotation is modelled end-to-end.
          </p>
        </div>
      </Section>

      {/* ── ALERTNESS AND FATIGUE SCORING ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Alertness Index and Fatigue Scoring
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The three processes combine into a single alertness index at each time step.
            Circadian rhythm contributes positively to alertness, while sleep pressure and
            sleep inertia subtract from it.
          </p>

          <FatigueModelDiagram
            title="Composite Alertness"
            description="Alertness is the net result of all three physiological processes, normalised to a 0–1 scale."
            equation="\text{Alertness} = \text{Base Level} + C(t) - S(t) - I(t)"
            parameters={[
              { symbol: '0', value: '', description: 'Extreme fatigue — severe impairment' },
              { symbol: '1', value: '', description: 'Fully alert — optimal performance' },
            ]}
          />

          <p className="text-slate-700 leading-relaxed mb-4">
            The alertness index is then converted to a fatigue score on a 0–100 scale for
            reporting and risk classification purposes.
          </p>

          <FatigueModelDiagram
            title="Fatigue Score"
            description="An inverted scale where higher values indicate greater fatigue."
            equation="\text{Fatigue Score} = 100 - (\text{Alertness} \times 100)"
            parameters={[]}
          />

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-2 pr-4 text-slate-500 font-semibold">
                    Alertness
                  </th>
                  <th className="text-left py-2 pr-4 text-slate-500 font-semibold">
                    Fatigue Score
                  </th>
                  <th className="text-left py-2 text-slate-500 font-semibold">
                    Interpretation
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4">0.9</td>
                  <td className="py-2 pr-4 font-medium">10</td>
                  <td className="py-2">Well-rested, optimal performance</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4">0.7</td>
                  <td className="py-2 pr-4 font-medium">30</td>
                  <td className="py-2">Mild fatigue, minor impairment onset</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4">0.5</td>
                  <td className="py-2 pr-4 font-medium">50</td>
                  <td className="py-2">Moderate fatigue, measurable performance degradation</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">0.3</td>
                  <td className="py-2 pr-4 font-medium">70</td>
                  <td className="py-2">Severe fatigue, significant impairment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── RISK CLASSIFICATION ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Risk Classification
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Fatigue scores are classified into four risk categories. These classifications
            appear in the executive report alongside compliance findings, giving the
            commissioning party a complete picture of scheduling risk.
          </p>
          <RiskTable />

          <h3 className="text-lg font-semibold text-brand-navy mt-8 mb-4">
            Additional Risk Flags
          </h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Beyond the fatigue score, the engine flags specific scheduling patterns known to
            elevate fatigue exposure:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>Night shift exposure during the circadian low point (03:00 – 05:00)</li>
            <li>Consecutive shifts exceeding threshold without adequate recovery</li>
            <li>Sleep opportunity windows shorter than 6 hours between duties</li>
            <li>Night-to-day transition sequences with insufficient adaptation time</li>
            <li>Cumulative sleep debt exceeding threshold across the rotation cycle</li>
          </ul>
        </div>
      </Section>

      {/* ── INTEGRATION WITH COMPLIANCE ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Integrated with Compliance Analysis
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The fatigue engine operates as an additional analysis layer alongside the
            collective agreement compliance engine. A single rotation submission flows through
            both systems, producing a combined risk report.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden my-6">
            <div className="bg-brand-navy px-5 py-3">
              <p className="text-white text-sm font-semibold">Combined Analysis Pipeline</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">
                  1
                </span>
                <p className="text-slate-700 text-sm">
                  <strong>Rotation Schedule</strong> submitted by the commissioning party
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">
                  2
                </span>
                <p className="text-slate-700 text-sm">
                  <strong>Collective Agreement Compliance</strong> — every shift evaluated against
                  every applicable provision
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">
                  3
                </span>
                <p className="text-slate-700 text-sm">
                  <strong>Fatigue Risk Analysis</strong> — biomathematical modelling across the
                  full rotation cycle
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-sm font-semibold text-brand-navy">
                  4
                </span>
                <p className="text-slate-700 text-sm">
                  <strong>Combined Risk Report</strong> — compliance findings and fatigue
                  classifications delivered together
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            This integrated approach is what distinguishes Rotation Analytics. Compliance
            analysis identifies what the schedule violates. Fatigue analysis identifies what
            the schedule does to the worker. Together, they provide the complete risk profile
            that informed decision-making requires.
          </p>
        </div>
      </Section>

      {/* ── ONGOING DEVELOPMENT ── */}
      <Section contained className="bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-brand-navy mb-6">
            Ongoing Development
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The fatigue analysis engine is under active development. The core three-process
            model is operational and integrated with the compliance analysis pipeline.
            Additional capabilities — including individual chronotype modelling, commute fatigue
            factors, and multi-worker roster simulation — are being developed to further
            strengthen the analytical depth of future engagements.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section contained>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-brand-navy mb-4">
            See It In Practice
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            View an example rotation analysis with compliance findings and risk
            classifications, or explore our full methodology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/example-rotation"
              className="inline-flex items-center justify-center bg-brand-navy text-white text-sm font-medium px-6 py-3 rounded hover:bg-brand-navy-dark transition-colors"
            >
              View Example Rotation
            </Link>
            <Link
              href="/methodology"
              className="text-sm font-medium text-brand-navy hover:text-brand-navy-dark transition-colors"
            >
              Explore Methodology &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
