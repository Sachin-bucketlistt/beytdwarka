import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import './SlidingCounter.css'

const EASE = [0.18, 0.72, 0.08, 1]
const STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function parseValue(value) {
  return String(value).split('').map((char, index) => ({
    key: `${index}-${char}`,
    char,
    digit: /\d/.test(char) ? Number(char) : null,
  }))
}

function SlidingCounter({ value, delay = 0, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const parts = useMemo(() => parseValue(value), [value])
  const digitCount = parts.filter((part) => part.digit !== null).length
  const [landed, setLanded] = useState(0)
  const isSet = prefersReducedMotion || landed >= digitCount
  let digitFromRight = digitCount

  return (
    <span
      className={`sliding-counter${isSet ? ' is-set' : ''} ${className}`.trim()}
      aria-label={value}
    >
      <span className="sliding-counter__row" aria-hidden="true">
        {parts.map((part) => {
          if (part.digit === null) {
            return (
              <span key={part.key} className="sliding-counter__mark">
                {part.char}
              </span>
            )
          }

          digitFromRight -= 1

          return (
            <SlidingDigit
              key={part.key}
              digit={part.digit}
              place={digitFromRight}
              delay={delay}
              reduced={prefersReducedMotion}
              onLand={() => setLanded((count) => count + 1)}
            />
          )
        })}
      </span>
    </span>
  )
}

function SlidingDigit({ digit, place, delay, reduced, onLand }) {
  const rung = Math.min(place, 2)
  const cycles = reduced ? 0 : 2 + Math.max(0, 2 - rung)
  const items = useMemo(() => {
    const list = []
    for (let cycle = 0; cycle <= cycles; cycle += 1) {
      list.push(...STRIP)
    }
    return list
  }, [cycles])

  const endIndex = cycles * 10 + digit
  const duration = 2.85 + Math.max(0, 2 - rung) * 0.55

  if (reduced) {
    return <span className="sliding-counter__digit">{digit}</span>
  }

  return (
    <span className="sliding-counter__window">
      <motion.span
        className="sliding-counter__reel"
        initial={{ y: '0em' }}
        animate={{ y: `${-endIndex}em` }}
        transition={{
          duration,
          ease: EASE,
          delay: delay + (2 - rung) * 0.12,
        }}
        onAnimationComplete={onLand}
      >
        {items.map((n, index) => (
          <span key={`${n}-${index}`} className="sliding-counter__digit">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export default SlidingCounter
