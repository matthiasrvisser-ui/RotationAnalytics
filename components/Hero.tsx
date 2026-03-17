import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Optional background image URL. When provided, a navy tint overlay is applied. */
  backgroundImage?: string
}

export function Hero({ headline, subheadline, cta, secondaryCta, backgroundImage }: HeroProps) {
  const hasImage = Boolean(backgroundImage)

  return (
    <section
      className={`relative py-24 md:py-32 ${
        hasImage ? 'overflow-hidden' : 'bg-brand-cream border-b border-slate-200'
      }`}
      style={
        hasImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Navy tint overlay — only rendered when backgroundImage is provided */}
      {hasImage && (
        <div
          className="absolute inset-0 bg-brand-navy"
          style={{ opacity: 0.82 }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${
              hasImage ? 'text-slate-300' : 'text-slate-400'
            }`}
          >
            Rotation Analytics
          </p>
          <p
            className={`text-sm font-light italic tracking-wide mb-7 ${
              hasImage ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            Clarity from Complexity.
          </p>
          <h1
            className={`text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-7 ${
              hasImage ? 'text-white' : 'text-brand-navy'
            }`}
          >
            {headline}
          </h1>
          <p
            className={`text-lg font-light leading-[1.8] mb-10 max-w-2xl ${
              hasImage ? 'text-slate-200' : 'text-slate-500'
            }`}
          >
            {subheadline}
          </p>
          {(cta || secondaryCta) && (
            <div className="flex flex-wrap gap-5 items-center">
              {cta && (
                <Link
                  href={cta.href}
                  className={`inline-block px-7 py-3 rounded font-medium text-sm transition-colors ${
                    hasImage
                      ? 'bg-white text-brand-navy hover:bg-brand-cream'
                      : 'bg-brand-navy text-white hover:bg-brand-navy-dark'
                  }`}
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={`inline-block text-sm font-medium hover:underline underline-offset-4 transition-colors ${
                    hasImage ? 'text-slate-200 hover:text-white' : 'text-brand-navy'
                  }`}
                >
                  {secondaryCta.label} →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
