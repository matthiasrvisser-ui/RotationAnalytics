interface LogoProps {
  color?: string
  className?: string
}

const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

function MarkSVGWhite() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path fill="white" opacity="0.55" d="M2.9 25.8A21 21 0 0 1 22.2 3.1L23 12A12 12 0 0 0 12.1 25Z"/>
      <path fill="white" d="M27.6 3.3A21 21 0 1 1 3.7 29.4L12.4 27.1A12 12 0 1 0 26.1 12.2Z"/>
    </svg>
  )
}

export function LogoMark({ color = '#1B2D4F', size = 32, className = '' }: LogoProps & { size?: number }) {
  if (color === '#FFFFFF') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="Rotation Analytics">
        <path fill="white" opacity="0.55" d="M2.9 25.8A21 21 0 0 1 22.2 3.1L23 12A12 12 0 0 0 12.1 25Z"/>
        <path fill="white" d="M27.6 3.3A21 21 0 1 1 3.7 29.4L12.4 27.1A12 12 0 1 0 26.1 12.2Z"/>
      </svg>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo/rotation-mark.png" alt="Rotation Analytics" width={size} height={size} className={`object-contain ${className}`} />
}

export function LogoHorizontal({ color = '#1B2D4F', className = '' }: LogoProps) {
  const isWhite = color === '#FFFFFF'
  return (
    <div className={`flex items-center gap-[10px] ${className}`} style={{ lineHeight: 1 }}>
      {isWhite ? (
        <MarkSVGWhite />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo/rotation-mark.png" alt="" width={24} height={24} className="object-contain" />
      )}
      <span style={{ fontFamily: FONT, fontSize: '15px', fontWeight: '600', color: color, letterSpacing: '-0.2px' }}>
        Rotation Analytics
      </span>
    </div>
  )
}

export function LogoMonogram({ color = '#1B2D4F', className = '' }: LogoProps) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rotation Analytics" className={className}>
      <title>Rotation Analytics</title>
      <rect width="28" height="28" rx="5" fill={color} />
      <text x="14" y="19" fontFamily={FONT} fontSize="11" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="0.5">RA</text>
    </svg>
  )
}
