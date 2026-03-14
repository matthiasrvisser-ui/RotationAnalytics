interface LogoProps {
  color?: string
  className?: string
}

const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

function MarkSVGWhite() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <g fill="white">
        <path d="M24 6A18 18 0 0 1 41.7 27.1L29.4 26.5A6 6 0 0 0 25.6 18.2Z"/>
        <path d="M39.6 33A18 18 0 0 1 12.4 37.8L19.1 27.4A6 6 0 0 0 28.2 28.2Z"/>
        <path d="M8.4 33A18 18 0 0 1 17.8 7.1L23.5 18A6 6 0 0 0 18.2 25.6Z"/>
        <circle cx="24" cy="24" r="2.5"/>
      </g>
    </svg>
  )
}

export function LogoMark({ color = '#1B2D4F', size = 32, className = '' }: LogoProps & { size?: number }) {
  if (color === '#FFFFFF') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="Rotation Analytics">
        <g fill="white">
          <path d="M24 6A18 18 0 0 1 41.7 27.1L29.4 26.5A6 6 0 0 0 25.6 18.2Z"/>
          <path d="M39.6 33A18 18 0 0 1 12.4 37.8L19.1 27.4A6 6 0 0 0 28.2 28.2Z"/>
          <path d="M8.4 33A18 18 0 0 1 17.8 7.1L23.5 18A6 6 0 0 0 18.2 25.6Z"/>
          <circle cx="24" cy="24" r="2.5"/>
        </g>
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
