import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Independent Rotation Assurance™ — Third-party rotation schedule analysis for healthcare and shift-based operations'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1B2D4F',
          padding: '72px 80px',
          justifyContent: 'space-between',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            IR
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '16px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Independent Rotation Assurance™
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: '700',
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-1px',
            }}
          >
            Independent rotation schedule analysis for healthcare and shift-based operations.
          </div>
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: '300',
              lineHeight: 1.5,
            }}
          >
            Independent validation of rest periods, fatigue exposure, and scheduling risk.
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          />
          <div
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.04em',
            }}
          >
            Analytically independent. Released to the commissioning party only.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
