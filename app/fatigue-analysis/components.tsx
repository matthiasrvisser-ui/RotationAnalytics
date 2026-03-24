'use client'

/* ── Why It Matters Callout ── */

export function WhyItMatters() {
  const points = [
    {
      label: 'Compliant ≠ Safe',
      text: 'A rotation can satisfy every collective agreement provision and still produce a worker operating at fatigue levels comparable to those documented in occupational health literature.',
    },
    {
      label: 'Fatigue Is Measurable',
      text: 'Fatigue is not a feeling. It is a physiological state driven by sleep pressure and circadian rhythm. These are predictable, quantifiable, and specific to the schedule.',
    },
    {
      label: 'Full Rotation Visibility',
      text: 'A single shift may appear acceptable in isolation. The cumulative effect of consecutive short-rest periods, night shift blocks, and compressed recovery windows only becomes visible when the entire rotation is modelled end-to-end.',
    },
  ]

  return (
    <div className="space-y-4">
      {points.map((p, i) => (
        <div key={i} className="bg-brand-navy/5 border border-brand-navy/10 rounded-lg p-5">
          <p className="text-sm font-semibold text-brand-navy mb-1">{p.label}</p>
          <p className="text-sm text-slate-700 leading-relaxed">{p.text}</p>
        </div>
      ))}
    </div>
  )
}

/* ── How It Works (Three Processes + Formula in plain English) ── */

export function HowItWorks() {
  const processes = [
    {
      id: 'S',
      name: 'Sleep Pressure',
      description:
        'The longer a person is awake, the more their body builds pressure to sleep. This is a real neurochemical process. Sleep pressure builds exponentially during every hour awake (time constant of 18.2 hours) and dissipates during sleep in two phases: rapid initial recovery followed by slower deep-sleep recovery. A worker who gets shortened sleep carries a residual load into their next shift.',
      color: 'border-blue-400 bg-blue-50',
      accent: 'text-blue-700',
      impact: 'Contributes the largest component of the fatigue score. Peak sleep pressure during the shift is converted to a 0\u2013100 base score.',
    },
    {
      id: 'C',
      name: 'Circadian Rhythm',
      description:
        'The human body runs on an internal 24-hour clock that governs alertness independently of how much sleep a person has had. Even a fully rested worker experiences reduced alertness in the early morning hours (trough at approximately 04:48). Alertness peaks in the late afternoon (approximately 16:48). This cycle runs continuously regardless of sleep history.',
      color: 'border-amber-400 bg-amber-50',
      accent: 'text-amber-700',
      impact: 'Night shifts (23:00\u201307:00) receive a circadian penalty of approximately +7 points. Evening shifts receive a benefit of approximately \u22127 points.',
    },
    {
      id: 'D',
      name: 'Sleep Debt',
      description:
        'When actual sleep falls short of the 8-hour daily requirement, the deficit accumulates as sleep debt. When sleep exceeds the requirement, debt recovers at 50% efficiency, reflecting that recovery sleep is less efficient than preventive sleep. This captures the compounding effect of consecutive short-rest shifts.',
      color: 'border-purple-400 bg-purple-50',
      accent: 'text-purple-700',
      impact: 'Adds 0.5 points per hour of accumulated debt.',
    },
  ]

  return (
    <>
      <div className="space-y-4 mb-8">
        {processes.map((p) => (
          <div key={p.id} className={`border-l-4 ${p.color} rounded-r-lg p-5`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${p.accent} mb-1`}>
              {p.name}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">{p.description}</p>
            <p className="text-xs font-medium text-slate-500">{p.impact}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          The Fatigue Score
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          The three components combine into a single score on a 0&ndash;100 scale:
        </p>
        <div className="bg-white border border-slate-200 rounded px-4 py-3 mb-3">
          <p className="text-sm font-mono text-brand-navy text-center">
            Fatigue Score = Sleep Pressure Base + Circadian Modifier + Sleep Debt Modifier
          </p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sleep Pressure Base is the peak homeostatic value during the shift, scaled to 0&ndash;100.
          The Circadian Modifier is the average circadian effect across the shift, weighted by a factor of 25 (approximately &minus;7 for evening shifts to +7 for night shifts).
          The Sleep Debt Modifier adds 0.5 points per hour of accumulated deficit. The score is bounded to 0&ndash;100.
        </p>
      </div>
    </>
  )
}

/* ── Risk Classification ── */

export function RiskClassification() {
  const risks = [
    {
      range: '0 – 44',
      level: 'Low',
      color: 'bg-green-50 border-green-400 text-green-800',
      dot: 'bg-green-400',
      description:
        'Worker is operating within optimal physiological parameters for a standard shift.',
    },
    {
      range: '45 – 59',
      level: 'Moderate',
      color: 'bg-amber-50 border-amber-400 text-amber-800',
      dot: 'bg-amber-400',
      description:
        'Slightly elevated fatigue. Typical of evening shifts and consecutive day shifts with mildly shortened sleep. Performance may be subtly degraded. This is the expected baseline result for shift workers.',
    },
    {
      range: '60 – 74',
      level: 'High',
      color: 'bg-red-50 border-red-400 text-red-800',
      dot: 'bg-red-400',
      description:
        'Significant fatigue. Typical of night shifts and extended shifts, where the circadian trough compounds sleep pressure. Meaningful degradation in reaction time and decision-making expected.',
    },
    {
      range: '75 – 84',
      level: 'Very High',
      color: 'bg-red-100 border-red-500 text-red-900',
      dot: 'bg-red-500',
      description:
        'High fatigue consistent with extended 12-hour night shifts and consecutive night shift blocks. The circadian trough and cumulative sleep restriction compound to produce sustained performance impairment.',
    },
    {
      range: '85 – 100',
      level: 'Critical',
      color: 'bg-red-200 border-red-600 text-red-900',
      dot: 'bg-red-600',
      description:
        'Severe fatigue. Occurs with extended wakefulness, deep circadian trough, and compounding sleep debt. Performance impairment is comparable to levels documented in occupational health fatigue literature. Immediate schedule review required.',
    },
  ]

  return (
    <div className="space-y-3">
      {risks.map((r) => (
        <div
          key={r.level}
          className={`flex items-start gap-4 border-l-4 rounded-r-lg px-5 py-4 ${r.color}`}
        >
          <div className="flex-shrink-0 pt-0.5">
            <span className={`inline-block w-3 h-3 rounded-full ${r.dot}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <p className="text-sm font-bold">{r.level}</p>
              <p className="text-xs font-mono opacity-70">Score {r.range}</p>
            </div>
            <p className="text-sm opacity-80">{r.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
