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
    default: 'Independent Rotation Assurance™',
    template: '%s | Independent Rotation Assurance™',
  },
  description:
    'Third-party analysis of healthcare rotation schedules for unions and labour relations leadership. Independent validation of rest periods, fatigue exposure, and scheduling irregularities.',
  openGraph: {
    type: 'website',
    siteName: 'Independent Rotation Assurance™',
    title: 'Independent Rotation Assurance™',
    description:
      'Third-party rotation schedule analysis for healthcare unions. Independent validation of rest periods, fatigue exposure, and scheduling risk.',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Independent Rotation Assurance™',
    description:
      'Third-party rotation schedule analysis for healthcare unions. Independent validation of rest periods, fatigue exposure, and scheduling risk.',
  },
  metadataBase: new URL('https://independent-rotation-assurance.vercel.app'),
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
