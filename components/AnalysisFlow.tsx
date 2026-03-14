const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

const steps = [
  ['Rotation', 'Submitted'],
  ['Methodologic', 'Analysis'],
  ['Risk', 'Classification'],
  ['Executive', 'Summary'],
]

const NODE_W = 118
const NODE_H = 44
const GAP = 48
const NODE_Y = 8
const SVG_H = 60
const TOTAL_W = 616 // 4 nodes * 118 + 3 gaps * 48

export function AnalysisFlow() {
  return (
    <div className="overflow-x-auto">
      <svg
        width={TOTAL_W}
        height={SVG_H}
        viewBox="0 0 616 60"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Analysis flow: Rotation Submitted, Methodologic Analysis, Risk Classification, Executive Summary"
        className="min-w-[400px]"
      >
        <defs>
          <marker
            id="af-arrow"
            markerWidth="7"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 7 3, 0 6" fill="#1B2D4F" />
          </marker>
        </defs>

        {steps.map((lines, i) => {
          const x = i * (NODE_W + GAP)
          const cx = x + NODE_W / 2
          const cy = NODE_Y + NODE_H / 2

          return (
            <g key={i}>
              {i < steps.length - 1 && (
                <line
                  x1={x + NODE_W}
                  y1={cy}
                  x2={x + NODE_W + GAP}
                  y2={cy}
                  stroke="#1B2D4F"
                  strokeWidth="1.5"
                  markerEnd="url(#af-arrow)"
                />
              )}

              <rect
                x={x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="4"
                fill="white"
                stroke="#1B2D4F"
                strokeWidth="1.5"
              />

              <text
                x={x + 9}
                y={NODE_Y + 11}
                fontFamily={FONT}
                fontSize="7.5"
                fontWeight="600"
                fill="#94A3B8"
                letterSpacing="0.3"
              >
                {String(i + 1).padStart(2, '0')}
              </text>

              {lines.map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={NODE_Y + (li === 0 ? 26 : 37)}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize="10.5"
                  fontWeight="500"
                  fill="#1B2D4F"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}