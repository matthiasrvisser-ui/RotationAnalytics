import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { RotationTable } from '@/components/RotationTable'
import { HeatmapPlaceholder } from '@/components/HeatmapPlaceholder'
import type { ShiftEntry } from '@/components/RotationTable'

export const metadata: Metadata = {
  title: 'Example Rotation',
  description:
    'A representative Independent Rotation Assurance™ analysis excerpt, showing how Rotation Analytics identifies structural fatigue risk, consecutive sequence violations, and collective agreement exposure in rotation schedule data.',
}

const rotationEntries: ShiftEntry[] = [
  { date: 'Mon, Mar 3',  shift: 'Day',     start: '07:00', end: '15:00', hours: 8, restBefore: null, flags: [] },
  { date: 'Tue, Mar 4',  shift: 'Day',     start: '07:00', end: '15:00', hours: 8, restBefore: 16,   flags: [] },
  { date: 'Wed, Mar 5',  shift: 'Day',     start: '07:00', end: '15:00', hours: 8, restBefore: 16,   flags: [] },
  { date: 'Thu, Mar 6',  shift: 'Evening', start: '15:00', end: '23:00', hours: 8, restBefore: 16,   flags: [] },
  { date: 'Fri, Mar 7',  shift: 'Day',     start: '07:00', end: '15:00', hours: 8, restBefore: 8,    flags: ['quick-return'] },
  { date: 'Sat, Mar 8',  shift: 'OFF',     start: '—',     end: '—',     hours: 0, restBefore: null, flags: [] },
  { date: 'Sun, Mar 9',  shift: 'Night',   start: '23:00', end: '07:00', hours: 8, restBefore: null, flags: [] },
  { date: 'Mon, Mar 10', shift: 'Night',   start: '23:00', end: '07:00', hours: 8, restBefore: 16,   flags: [] },
  { date: 'Tue, Mar 11', shift: 'Night',   start: '23:00', end: '07:00', hours: 8, restBefore: 16,   flags: [] },
  { date: 'Wed, Mar 12', shift: 'Night',   start: '23:00', end: '07:00', hours: 8, restBefore: 16,   flags: ['consecutive-nights'] },
  { date: 'Thu, Mar 13', shift: 'Night',   start: '23:00', end: '07:00', hours: 8, restBefore: 16,   flags: ['consecutive-nights'] },
  { date: 'Fri, Mar 14', shift: 'OFF',     start: '—',     end: '—',     hours: 0, restBefore: null, flags: [] },
  { date: 'Sat, Mar 15', shift: 'Evening', start: '15:00', end: '23:00', hours: 8, restBefore: null, flags: [] },
  { date: 'Sun, Mar 16', shift: 'Day',     start: '07:00', end: '15:00', hours: 8, restBefore: 8,    flags: ['quick-return'] },
]

export default function ExampleRotation() {
  return (
    <>
      <Hero
        headline="Example Rotation Analysis"
        subheadline="A representative excerpt from a rotation analysis, illustrating how findings are identified and documented for union review."
      />

      <Section divider>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          <strong>Illustrative example only.</strong> This rotation uses anonymized schedule data.
          All names, facility identifiers, and dates are representative. Findings shown are for demonstration purposes.
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Period</p>
            <p className="text-sm font-medium text-slate-900">2-week excerpt (of 4-week rotation)</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Flagged entries</p>
            <p className="text-sm font-medium text-slate-900">3 findings across 14 shifts</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-xs text-red-500 uppercase tracking-wide font-semibold mb-1">Risk level</p>
            <p className="text-sm font-medium text-red-700">High — Quick Return × 2</p>
          </div>
        </div>

        <RotationTable
          entries={rotationEntries}
          title="Shift Record — Weeks 1–2"
          note="[Anonymized] Registered Nurse · [Anonymized Facility] · March 2025"
        />
      </Section>

      <Section
        title="Fatigue Accumulation Map"
        subtitle="Estimated fatigue exposure plotted across the full 4-week rotation period."
        className="bg-brand-cream"
        divider
      >
        <HeatmapPlaceholder
          description="Illustrative heatmap. Full analysis maps fatigue exposure across the complete rotation. Week 3 shows critical concentration aligned with the consecutive night shift sequence identified above."
        />
      </Section>

      {/* Findings summary */}
      <Section title="Findings Summary" subtitle="Identified scheduling irregularities for this rotation period.">
        <div className="space-y-5 max-w-3xl">
          <div className="bg-white border border-slate-200 border-l-4 border-l-red-400 rounded-lg p-6">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-red-100 text-red-700 border border-red-200 mb-4">
              High Risk
            </span>
            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              Quick Return — Inadequate Rest Period (× 2)
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Two instances identified where the interval between consecutive shifts falls below the 11-hour minimum.
              Mar 7 (8h rest following an Evening shift) and Mar 16 (8h rest following an Evening shift).
            </p>
            <div className="bg-red-50 border border-red-100 rounded p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Recommended Action</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Document both instances for grievance review. Cross-reference the applicable collective agreement provision for rest between shifts. Determine whether the pattern is recurring across the full 4-week rotation cycle or other rotation periods.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 border-l-4 border-l-amber-400 rounded-lg p-6">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-amber-100 text-amber-700 border border-amber-200 mb-4">
              Moderate Risk
            </span>
            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              Consecutive Night Shifts — Extended Sequence
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Five consecutive night shifts identified (Mar 9–13). Established occupational health guidelines
              recommend reviewing sequences of 4 or more consecutive nights for cumulative fatigue exposure
              and error risk.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Recommended Action</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Monitor for recurrence. Review collective agreement provisions governing consecutive night shift limits. Document under the Health & Safety file.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
