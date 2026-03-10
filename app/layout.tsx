import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Rotation Analytics',
    template: '%s | Rotation Analytics',
  },
  description:
    'Rotation Analytics provides independent analysis of rotational work schedules through its Independent Rotation Assurance™ methodology, identifying structural fatigue risk, agreement interpretation exposure, and rotation design vulnerabilities across shift-based operations.',
  openGraph: {
    type: 'website',
    siteName: 'Rotation Analytics',
    title: 'Rotation Analytics — Independent Rotation Assurance™',
    description:
      'Rotation Analytics provides independent analysis of rotational work schedules through its Independent Rotation Assurance™ methodology — identifying fatigue risk, agreement exposure, and scheduling vulnerabilities for union review.',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rotation Analytics — Independent Rotation Assurance™',
    description:
      'Rotation Analytics provides independent analysis of rotational work schedules through its Independent Rotation Assurance™ methodology — identifying fatigue risk, agreement exposure, and scheduling vulnerabilities for union review.',
  },
  metadataBase: new URL('https://rotation-analytics.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 flex flex-col min-h-screen font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-navy focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
