import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function Hero({ headline, subheadline, cta, secondaryCta }: HeroProps) {
  return (
    <section className="bg-brand-cream border-b border-slate-200 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Rotation Analytics
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight tracking-tight mb-7">
            {headline}
          </h1>
          <p className="text-lg text-slate-500 font-light leading-[1.8] mb-10 max-w-2xl">
            {subheadline}
          </p>
          {(cta || secondaryCta) && (
            <div className="flex flex-wrap gap-5 items-center">
              {cta && (
                <Link
                  href={cta.href}
                  className="inline-block bg-brand-navy text-white px-7 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-block text-brand-navy text-sm font-medium hover:underline underline-offset-4 transition-colors"
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
