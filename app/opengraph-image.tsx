import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rotation Analytics — Independent Rotation Analysis for Complex Shift Operations'
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
            RA
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '16px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Rotation Analytics
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
            Independent Rotation Analysis for Complex Shift Operations
          </div>
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: '300',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            Clarity from Complexity.
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
            Structured independent analysis. Released to the commissioning party only.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
