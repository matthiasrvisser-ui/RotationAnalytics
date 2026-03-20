'use client'

import 'katex/dist/katex.min.css'
import { Math, MathBlock } from '@/components/Math'

/* ── Fatigue Model Diagram ── */

interface FatigueModelDiagramProps {
  title: string
  description: string
  equation: string
  parameters: { symbol: string; value: string; description: string }[]
}

export function FatigueModelDiagram({
  title,
  description,
  equation,
  parameters,
}: FatigueModelDiagramProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden my-6">
      <div className="px-5 py-3 border-b border-slate-200">
        <p className="text-sm font-semibold text-brand-navy">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="px-5 py-4">
        <MathBlock tex={equation} />
        {parameters.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Parameters
            </p>
            {parameters.map((param, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-16 text-right">
                  <Math tex={param.symbol} />
                  {param.value && (
                    <>
                      {' = '}
                      <Math tex={param.value} />
                    </>
                  )}
                </span>
                <span className="text-slate-600">{param.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Process Cards ── */

export function ProcessCards() {
  const processes = [
    {
      id: 'S',
      name: 'Process S',
      title: 'Homeostatic Sleep Pressure',
      description:
        'The biological drive to sleep. Increases during wakefulness, decreases during sleep. Determines how fatigued a person becomes over time.',
      color: 'border-blue-400 bg-blue-50',
      accent: 'text-blue-700',
    },
    {
      id: 'C',
      name: 'Process C',
      title: 'Circadian Rhythm',
      description:
        'The internal 24-hour clock. Creates predictable peaks and troughs in alertness regardless of sleep history. Lowest at 03:00–05:00, highest at 16:00–18:00.',
      color: 'border-amber-400 bg-amber-50',
      accent: 'text-amber-700',
    },
    {
      id: 'W',
      name: 'Process W',
      title: 'Sleep Inertia',
      description:
        'Temporary impairment after waking. Performance is reduced for 30–60 minutes following sleep, regardless of sleep quality or duration.',
      color: 'border-purple-400 bg-purple-50',
      accent: 'text-purple-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {processes.map((p) => (
        <div
          key={p.id}
          className={`border-l-4 ${p.color} rounded-r-lg p-5`}
        >
          <p className={`text-xs font-bold uppercase tracking-widest ${p.accent} mb-1`}>
            {p.name}
          </p>
          <p className="text-sm font-semibold text-brand-navy mb-2">{p.title}</p>
          <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Risk Table ── */

export function RiskTable() {
  const risks = [
    {
      range: '< 30',
      level: 'Low',
      color: 'bg-green-50 border-green-400 text-green-800',
      dot: 'bg-green-400',
      description: 'Parameters met. Documented for completeness and ongoing record.',
    },
    {
      range: '30 – 50',
      level: 'Moderate',
      color: 'bg-amber-50 border-amber-400 text-amber-800',
      dot: 'bg-amber-400',
      description: 'Elevated fatigue exposure warranting attention and monitoring.',
    },
    {
      range: '50 – 70',
      level: 'High',
      color: 'bg-red-50 border-red-400 text-red-800',
      dot: 'bg-red-400',
      description:
        'Significant fatigue risk. Schedule design may require review.',
    },
    {
      range: '> 70',
      level: 'Critical',
      color: 'bg-red-100 border-red-600 text-red-900',
      dot: 'bg-red-600',
      description:
        'Severe fatigue exposure. Immediate review of rotation design recommended.',
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
              <p className="text-xs font-mono opacity-70">
                Score {r.range}
              </p>
            </div>
            <p className="text-sm opacity-80">{r.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Pipeline Diagram ── */

export function PipelineDiagram() {
  const steps = [
    { label: 'Shift Schedule', sub: 'Submitted rotation data' },
    { label: 'Timeline Generator', sub: '15-minute resolution grid' },
    { label: 'Sleep Opportunity Model', sub: 'When can the worker sleep?' },
    { label: 'Sleep Prediction', sub: 'When will the worker sleep?' },
    { label: 'Fatigue Model', sub: 'Three-process computation' },
    { label: 'Fatigue Scoring', sub: 'Alertness → 0–100 score' },
    { label: 'Risk Classification', sub: 'Low / Moderate / High / Critical' },
    { label: 'Report & Findings', sub: 'Integrated with compliance results' },
  ]

  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i}>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center">
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-navy">{step.label}</p>
              <p className="text-xs text-slate-500">{step.sub}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-4 border-l-2 border-brand-navy/20 h-4" />
          )}
        </div>
      ))}
    </div>
  )
}
