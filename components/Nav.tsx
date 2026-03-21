'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LogoHorizontal } from './Logo'

const navLinks = [
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/example-rotation', label: 'Example Rotation' },
  { href: '/sample-report', label: 'Sample Report' },
  { href: '/fatigue-analysis', label: 'Fatigue Analysis' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Rotation Analytics home">
            <LogoHorizontal />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-brand-navy font-semibold'
                    : 'text-slate-500 hover:text-brand-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/status"
              className={`text-sm px-4 py-1.5 rounded border transition-colors ${
                pathname.startsWith('/status')
                  ? 'border-brand-navy text-brand-navy font-semibold'
                  : 'border-slate-300 text-slate-600 hover:border-brand-navy hover:text-brand-navy'
              }`}
            >
              Client Portal
            </Link>
            <Link
              href="/engage"
              className={`text-sm px-4 py-1.5 rounded transition-colors ${
                pathname === '/engage'
                  ? 'bg-brand-navy text-white'
                  : 'bg-brand-navy text-white hover:bg-brand-navy-dark'
              }`}
            >
              Begin Engagement
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-500 hover:text-brand-navy transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav aria-label="Mobile navigation" className="md:hidden border-t border-slate-100 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm py-2 px-1 rounded transition-colors ${
                  pathname === link.href
                    ? 'text-brand-navy font-semibold'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/status"
              className="text-sm py-2 px-4 mt-2 rounded border border-slate-300 text-slate-600 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Client Portal
            </Link>
            <Link
              href="/engage"
              className="text-sm py-2 px-4 mt-1 rounded bg-brand-navy text-white text-center"
              onClick={() => setMobileOpen(false)}
            >
              Begin Engagement
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
