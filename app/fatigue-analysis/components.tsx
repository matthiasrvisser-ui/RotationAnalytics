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
      text: 'Fatigue is not a feeling — it is a physiological state driven by sleep pressure and circadian rhythm. These are predictable, quantifiable, and specific to the schedule.',
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
        'The longer a person is awake, the more their body builds pressure to sleep. This is a real neurochemical process — adenosine accumulates in the brain during wakefulness and clears during sleep. Sleep pressure builds gradually during every hour awake and dissipates during sleep, clearing roughly four times faster than it builds. A worker who gets shortened sleep carries a residual load into their next shift.',
      color: 'border-blue-400 bg-blue-50',
      accent: 'text-blue-700',
      impact: 'Contributes the largest component of the fatigue score.',
    },
    {
      id: 'C',
      name: 'Circadian Rhythm',
      description:
        'The human body runs on an internal 24-hour clock that governs alertness independently of how much sleep a person has had. Even a fully rested worker experiences reduced alertness in the early morning hours (approximately 03:00–05:00). Alertness peaks in the mid-to-late afternoon (around 16:00). This cycle runs continuously regardless of sleep history.',
      color: 'border-amber-400 bg-amber-50',
      accent: 'text-amber-700',
      impact: 'Night shifts receive a circadian penalty of up to +16 points. Day and evening shifts receive a benefit of up to −9 points.',
    },
    {
      id: 'D',
      name: 'Sleep Debt',
      description:
        'When predicted sleep falls below 6 hours and the gap between shifts is short, the shortfall accumulates as sleep debt. Sleep debt captures the compounding effect of consecutive short-rest shifts. It resets to zero when the worker achieves a full sleep period of 7 hours or more.',
      color: 'border-purple-400 bg-purple-50',
      accent: 'text-purple-700',
      impact: 'Adds 2 points per hour of accumulated debt.',
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
          The three components combine into a single score on a 0–100 scale:
        </p>
        <div className="bg-white border border-slate-200 rounded px-4 py-3 mb-3">
          <p className="text-sm font-mono text-brand-navy text-center">
            Fatigue Score = (Sleep Pressure × 100) + (Circadian Modifier) + (Sleep Debt × 2)
          </p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sleep Pressure is converted from a 0–1 value to a 0–100 base score.
          The Circadian Modifier ranges from approximately −9 (afternoon) to +16 (early morning).
          Sleep Debt adds 2 points per hour of accumulated shortfall. The score is clamped to 0–100.
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
        'Worker is operating within normal physiological parameters for a standard shift. No intervention indicated.',
    },
    {
      range: '45 – 59',
      level: 'Moderate',
      color: 'bg-amber-50 border-amber-400 text-amber-800',
      dot: 'bg-amber-400',
      description:
        'Elevated fatigue. Typical of evening shifts and consecutive day shifts with mildly shortened sleep. Performance may be subtly degraded. This is the expected baseline result for shift workers.',
    },
    {
      range: '60 – 74',
      level: 'High',
      color: 'bg-red-50 border-red-400 text-red-800',
      dot: 'bg-red-400',
      description:
        'Significant fatigue. Typical of night shifts, where the circadian trough compounds sleep pressure. Meaningful degradation in reaction time and decision-making expected.',
    },
    {
      range: '75 – 100',
      level: 'Critical',
      color: 'bg-red-100 border-red-600 text-red-900',
      dot: 'bg-red-600',
      description:
        'Severe fatigue. Occurs with extended wakefulness, deep circadian trough, and compounding sleep debt. Performance impairment comparable to levels documented in occupational health fatigue literature. Immediate schedule review required.',
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

/* ── Sample Report Table ── */

interface LineData {
  line: number
  avg: number
  min: number
  max: number
  riskAvg: string
  riskMax: string
  // Simulated weekly trend values for sparkline
  trend: number[]
}

const sampleData: LineData[] = [
  { line: 1,  avg: 45.9, min: 36.2, max: 55.9, riskAvg: 'Moderate', riskMax: 'Moderate', trend: [38, 52, 44, 56, 40, 48, 36, 54, 42, 50] },
  { line: 2,  avg: 46.0, min: 36.6, max: 55.9, riskAvg: 'Moderate', riskMax: 'Moderate', trend: [40, 54, 42, 56, 38, 50, 40, 52, 44, 48] },
  { line: 3,  avg: 49.1, min: 36.1, max: 66.9, riskAvg: 'Moderate', riskMax: 'High',     trend: [38, 56, 67, 42, 36, 52, 65, 40, 38, 54] },
  { line: 4,  avg: 52.1, min: 36.6, max: 66.9, riskAvg: 'Moderate', riskMax: 'High',     trend: [42, 58, 67, 44, 38, 56, 65, 42, 40, 56] },
  { line: 5,  avg: 46.1, min: 36.6, max: 55.9, riskAvg: 'Moderate', riskMax: 'Moderate', trend: [40, 52, 44, 56, 38, 50, 42, 54, 40, 48] },
  { line: 6,  avg: 49.5, min: 36.2, max: 67.6, riskAvg: 'Moderate', riskMax: 'High',     trend: [38, 54, 68, 44, 36, 52, 66, 40, 38, 56] },
  { line: 7,  avg: 44.5, min: 36.6, max: 55.8, riskAvg: 'Low',      riskMax: 'Moderate', trend: [38, 48, 42, 56, 40, 46, 38, 54, 40, 44] },
  { line: 8,  avg: 44.5, min: 36.6, max: 55.9, riskAvg: 'Low',      riskMax: 'Moderate', trend: [40, 46, 44, 56, 38, 48, 40, 54, 42, 46] },
  { line: 9,  avg: 49.2, min: 36.7, max: 65.8, riskAvg: 'Moderate', riskMax: 'High',     trend: [40, 54, 66, 42, 38, 52, 64, 40, 40, 54] },
  { line: 10, avg: 49.1, min: 36.6, max: 66.9, riskAvg: 'Moderate', riskMax: 'High',     trend: [38, 56, 67, 44, 36, 54, 65, 42, 38, 54] },
  { line: 11, avg: 44.3, min: 36.6, max: 55.8, riskAvg: 'Low',      riskMax: 'Moderate', trend: [38, 46, 44, 56, 40, 44, 38, 54, 40, 42] },
]

function riskColor(level: string): string {
  switch (level) {
    case 'Low': return 'text-green-700 bg-green-50'
    case 'Moderate': return 'text-amber-700 bg-amber-50'
    case 'High': return 'text-red-700 bg-red-50'
    case 'Critical': return 'text-red-900 bg-red-100'
    default: return 'text-slate-600'
  }
}

function Sparkline({ data }: { data: number[] }) {
  const max = 100
  const min = 0
  const w = 200
  const h = 32
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="#1B2D4F"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Threshold lines */}
      <line x1="0" y1={h - (45 / 100) * h} x2={w} y2={h - (45 / 100) * h} stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="4,3" opacity="0.5" />
      <line x1="0" y1={h - (60 / 100) * h} x2={w} y2={h - (60 / 100) * h} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="4,3" opacity="0.5" />
    </svg>
  )
}

export function SampleReportTable() {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="bg-brand-navy px-5 py-3 flex items-center justify-between">
        <p className="text-white text-sm font-semibold">
          Biomathematical Analysis of Rotation — Employee Fatigue While Working
        </p>
        <p className="text-white/60 text-xs">Sample Data</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" rowSpan={2}>Line</th>
              <th className="text-center py-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200" colSpan={3}>Fatigue Score</th>
              <th className="text-center py-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200" colSpan={2}>Fatigue Risk</th>
              <th className="text-center py-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider" rowSpan={2}>
                <span className="hidden sm:inline">Rotation Fatigue Score Trend</span>
                <span className="sm:hidden">Trend</span>
              </th>
            </tr>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-center py-2 px-2 text-xs text-slate-400 font-medium">Avg</th>
              <th className="text-center py-2 px-2 text-xs text-slate-400 font-medium">Min</th>
              <th className="text-center py-2 px-2 text-xs text-slate-400 font-medium">Max</th>
              <th className="text-center py-2 px-2 text-xs text-slate-400 font-medium">Avg</th>
              <th className="text-center py-2 px-2 text-xs text-slate-400 font-medium">Max</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((d) => (
              <tr key={d.line} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-brand-navy">{d.line}</td>
                <td className="py-2.5 px-2 text-center font-mono text-slate-700">{d.avg.toFixed(1)}</td>
                <td className="py-2.5 px-2 text-center font-mono text-slate-500">{d.min.toFixed(1)}</td>
                <td className="py-2.5 px-2 text-center font-mono text-slate-700">{d.max.toFixed(1)}</td>
                <td className="py-2.5 px-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${riskColor(d.riskAvg)}`}>
                    {d.riskAvg}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${riskColor(d.riskMax)}`}>
                    {d.riskMax}
                  </span>
                </td>
                <td className="py-2.5 px-3 min-w-[160px]">
                  <Sparkline data={d.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> 0–44 Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 45–59 Moderate
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> 60–74 High
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> 75–100 Critical
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-4 h-px bg-amber-500 opacity-50" style={{ borderTop: '1px dashed' }} /> Moderate threshold
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-px bg-red-500 opacity-50" style={{ borderTop: '1px dashed' }} /> High threshold
        </span>
      </div>
    </div>
  )
}
