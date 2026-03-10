interface LogoProps {
  color?: string
  className?: string
}

const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

export function LogoHorizontal({ color = '#1B2D4F', className = '' }: LogoProps) {
  return (
    <svg
      width="162"
      height="20"
      viewBox="0 0 162 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rotation Analytics"
      className={className}
    >
      <title>Rotation Analytics</title>
      <text
        x="0"
        y="15"
        fontFamily={FONT}
        fontSize="15"
        fontWeight="600"
        fill={color}
        letterSpacing="-0.2"
      >
        Rotation Analytics
      </text>
    </svg>
  )
}

export function LogoMonogram({ color = '#1B2D4F', className = '' }: LogoProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rotation Analytics"
      className={className}
    >
      <title>Rotation Analytics</title>
      <rect width="28" height="28" rx="5" fill={color} />
      <text
        x="14"
        y="19"
        fontFamily={FONT}
        fontSize="11"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        RA
      </text>
    </svg>
  )
}
