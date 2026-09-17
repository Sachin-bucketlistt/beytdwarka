import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './RotatingWord.css'

function RotatingWord({
  words,
  interval = 2600,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = words[index]
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b))

  useEffect(() => {
    if (words.length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [interval, words.length])

  return (
    <span className={`rotating-word ${className}`.trim()}>
      <span className="rotating-word__sizer" aria-hidden="true">
        {longest}
      </span>
      <span className="rotating-word__viewport">
        {prefersReducedMotion ? (
          <span className="rotating-word__item">{current}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current}
              className="rotating-word__item"
              initial={{ y: '120%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-120%', opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  )
}

export default RotatingWord
