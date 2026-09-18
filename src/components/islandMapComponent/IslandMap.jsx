import { motion, useReducedMotion } from 'framer-motion'
import './IslandMap.css'

const ISLAND =
  'M102 352 C88 322 80 278 78 232 C76 188 88 152 112 126 C128 104 140 76 158 52 C180 22 226 18 258 38 C280 52 292 76 282 100 C274 120 250 130 230 142 C212 154 202 176 198 208 C194 242 180 280 160 312 C140 340 118 352 102 352 Z'

const COAST =
  'M102 352 C88 322 80 278 78 232 C76 188 88 152 112 126 C128 104 140 76 158 52 C180 22 226 18 258 38 C280 52 292 76 282 100 C274 120 250 130 230 142 C212 154 202 176 198 208 C194 242 180 280 160 312 C140 340 118 352 102 352'

const BRIDGE = 'M24 168 C48 158 66 154 82 158'

const PINS = [
  { name: 'Okha', x: 18, y: 172, anchor: 'start', dy: 16 },
  { name: 'Sudarshan Setu', x: 56, y: 150, anchor: 'middle', dy: -12 },
  { name: 'Nilkanth', x: 90, y: 286, anchor: 'end', dy: -10 },
  { name: 'Beyt Dwarka', x: 126, y: 148, anchor: 'start', dy: -10, featured: true },
  { name: 'Dunny Point', x: 248, y: 148, anchor: 'start', dy: -10 },
  { name: 'Hanuman Dandi', x: 262, y: 46, anchor: 'end', dy: -12 },
]

function IslandMap() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="island-map">
      <p className="island-map__kicker">Island map</p>
      <svg
        className="island-map__svg"
        viewBox="0 0 320 380"
        fill="none"
        role="img"
        aria-label="Map of Beyt Dwarka with Okha, Sudarshan Setu, Nilkanth, Dunny Point and Hanuman Dandi"
      >
        <motion.path
          d={ISLAND}
          className="island-map__land"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={COAST}
          className="island-map__coast"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <motion.path
          d={BRIDGE}
          className="island-map__bridge"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {PINS.map((pin, index) => (
          <motion.g
            key={pin.name}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : 1.1 + index * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {pin.featured ? (
              <>
                <circle cx={pin.x} cy={pin.y} r="10" className="island-map__pulse" />
                <circle cx={pin.x} cy={pin.y} r="4.5" className="island-map__pin island-map__pin--featured" />
              </>
            ) : (
              <circle cx={pin.x} cy={pin.y} r="3.5" className="island-map__pin" />
            )}
            <text
              x={pin.x + (pin.anchor === 'start' ? 9 : pin.anchor === 'end' ? -9 : 0)}
              y={pin.y + (pin.dy ?? -10)}
              textAnchor={pin.anchor}
              className="island-map__label"
            >
              {pin.name}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default IslandMap
