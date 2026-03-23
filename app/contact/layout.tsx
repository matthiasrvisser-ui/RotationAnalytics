import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Discuss an engagement for independent rotation schedule analysis. Contact Rotation Analytics for collective agreement compliance review, fatigue risk assessment, and shift schedule auditing.',
  openGraph: {
    title: 'Contact | Rotation Analytics',
    description:
      'Discuss an engagement for independent rotation schedule analysis with Rotation Analytics',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
