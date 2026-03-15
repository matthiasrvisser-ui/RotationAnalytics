interface LogoProps {
  color?: string
  className?: string
}

const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

export function LogoMark({ color = '#1B2D4F', size = 32, className = '' }: LogoProps & { size?: number }) {
  if (color === '#FFFFFF') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/logo/footer-mark.PNG" alt="Rotation Analytics" width={size} height={size} className={`object-contain ${className}`} />
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo/rotation-mark.png" alt="Rotation Analytics" width={size} height={size} className={`object-contain ${className}`} />
}

export function LogoHorizontal({ color = '#1B2D4F', className = '' }: LogoProps) {
  const isWhite = color === '#FFFFFF'
  return (
    <div className={`flex items-center gap-[10px] ${className}`} style={{ lineHeight: 1 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isWhite ? '/logo/footer-mark.PNG' : '/logo/rotation-mark.png'}
        alt=""
        width={24}
        height={24}
        className="object-contain"
      />
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
