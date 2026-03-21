import Link from 'next/link'
import { LogoHorizontal } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <LogoHorizontal color="#FFFFFF" />
            </div>
            <p className="text-sm font-light text-white italic tracking-wide mb-3">
              Clarity from Complexity.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Structured independent analysis of rotation schedules, delivered exclusively to the commissioning party.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Analysis
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/methodology" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/example-rotation" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Example Rotation
                </Link>
              </li>
              <li>
                <Link href="/sample-report" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Sample Report
                </Link>
              </li>
              <li>
                <Link href="/fatigue-analysis" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Fatigue Analysis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/engage" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Begin Engagement
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+14035063636" className="text-sm text-slate-300 hover:text-white transition-colors">
                  (403) 506-3636
                </a>
              </li>
              <li>
                <a href="mailto:hello@rotationanalytics.ca" className="text-sm text-slate-300 hover:text-white transition-colors">
                  hello@rotationanalytics.ca
                </a>
              </li>
              <li className="text-sm text-slate-400 leading-relaxed pt-1">
                PO Box 2234<br />
                Crossfield, Alberta<br />
                Canada
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Rotation Analytics Inc conducts its methodology without structural alignment to any party to the scheduling arrangement. Findings are a systematic evaluation of the rotation record and are released exclusively to the commissioning party as defined in the service agreement.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-slate-500">
              &copy; {currentYear} Rotation Analytics Inc. All rights reserved.
            </p>
            <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
