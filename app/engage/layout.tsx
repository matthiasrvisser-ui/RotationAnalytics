import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Begin Engagement',
  description:
    'Start your rotation analysis engagement with Rotation Analytics Review and accept the service agreement, then submit your rotation files for independent analysis.',
  openGraph: {
    title: 'Begin Engagement | Rotation Analytics',
    description:
      'Start your independent rotation schedule analysis engagement with Rotation Analytics',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function EngageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
