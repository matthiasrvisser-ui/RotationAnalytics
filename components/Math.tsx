'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathProps {
  /** LaTeX expression */
  tex: string
  /** Display mode (block) vs inline */
  display?: boolean
  className?: string
}

export function Math({ tex, display = false, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      })
    }
  }, [tex, display])

  if (display) {
    return (
      <div className={`overflow-x-auto py-3 ${className}`}>
        <span ref={ref} />
      </div>
    )
  }

  return <span ref={ref} className={className} />
}

export function MathBlock({
  tex,
  label,
  className = '',
}: {
  tex: string
  label?: string
  className?: string
}) {
  return (
    <div
      className={`bg-slate-50 border border-slate-200 rounded-lg px-6 py-4 my-4 ${className}`}
    >
      {label && (
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          {label}
        </p>
      )}
      <Math tex={tex} display />
    </div>
  )
}
