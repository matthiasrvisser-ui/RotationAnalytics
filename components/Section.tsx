interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  contained?: boolean
  divider?: boolean
}

export function Section({
  title,
  subtitle,
  children,
  className = '',
  contained = true,
  divider = false,
}: SectionProps) {
  const inner = (
    <>
      {(title || subtitle) && (
        <div className="mb-12">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed font-light">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  )

  return (
    <section
      className={`py-20 md:py-28 ${
        divider ? 'border-b border-slate-200' : ''
      } ${className}`}
    >
      {contained ? (
        <div className="max-w-6xl mx-auto px-6">{inner}</div>
      ) : (
        inner
      )}
    </section>
  )
}
