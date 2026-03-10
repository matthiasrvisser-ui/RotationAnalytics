type FatigueLevel = 'off' | 'low' | 'moderate' | 'high' | 'critical'

interface HeatmapPlaceholderProps {
  description?: string
}

const FATIGUE_COLORS: Record<FatigueLevel, string> = {
  off: 'bg-slate-100',
  low: 'bg-emerald-200',
  moderate: 'bg-amber-200',
  high: 'bg-orange-300',
  critical: 'bg-red-400',
}

const FATIGUE_LABELS: Record<FatigueLevel, string> = {
  off: 'Off',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  critical: 'Critical',
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Illustrative 4-week fatigue accumulation data
// Aligned with example rotation: quick returns in wk1/wk4, consecutive nights in wk2–3
const SAMPLE_DATA: FatigueLevel[][] = [
  ['low', 'low', 'low', 'moderate', 'high', 'off', 'off'],      // Week 1 — quick return Fri
  ['off', 'moderate', 'moderate', 'moderate', 'high', 'off', 'off'], // Week 2 — nights begin
  ['high', 'high', 'critical', 'critical', 'high', 'off', 'off'],   // Week 3 — consecutive nights
  ['low', 'low', 'moderate', 'moderate', 'moderate', 'off', 'low'],  // Week 4 — recovery
]

export function HeatmapPlaceholder({ description }: HeatmapPlaceholderProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      {/* Day labels */}
      <div className="grid grid-cols-8 gap-1.5 mb-1">
        <div />
        {DAYS.map((day) => (
          <div key={day} className="text-xs text-slate-400 text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-1.5">
        {SAMPLE_DATA.map((week, wi) => (
          <div key={wi} className="grid grid-cols-8 gap-1.5">
            <div className="text-xs text-slate-400 font-medium flex items-center">
              Wk {wi + 1}
            </div>
            {week.map((level, di) => (
              <div
                key={di}
                title={FATIGUE_LABELS[level]}
                className={`h-9 rounded ${FATIGUE_COLORS[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
        {(Object.entries(FATIGUE_LABELS) as [FatigueLevel, string][]).map(([level, label]) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${FATIGUE_COLORS[level]}`} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      {description && (
        <p className="text-xs text-slate-400 mt-3 leading-relaxed italic">{description}</p>
      )}
    </div>
  )
}
