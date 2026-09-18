import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaPlane, FaRoad, FaTrain } from 'react-icons/fa'
import ReachMap from './ReachMap.jsx'
import './HowToReach.css'

const EASE = [0.22, 1, 0.36, 1]

const MODES = [
  {
    id: 'air',
    number: '01',
    title: 'By Air',
    icon: FaPlane,
    hops: [
      { value: '145 km', label: 'Jamnagar Airport' },
      { value: 'Rajkot', label: 'Major cities' },
    ],
  },
  {
    id: 'train',
    number: '02',
    title: 'By Train',
    icon: FaTrain,
    hops: [
      { value: '~6 km', label: 'Okha Station' },
      { value: 'Sudarshan Setu', label: 'Auto or taxi' },
    ],
  },
  {
    id: 'road',
    number: '03',
    title: 'By Road',
    icon: FaRoad,
    hops: [
      { value: '31 km', label: 'Dwarka to Okha' },
      { value: '2 km', label: 'Ferry ride' },
      { value: '2.3 km', label: 'Sudarshan Setu' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

function HowToReach() {
  const [active, setActive] = useState('train')
  const prefersReducedMotion = useReducedMotion()
  const mode = MODES.find((item) => item.id === active) ?? MODES[1]
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <section
      className="reach section"
      id="reach"
      aria-labelledby="reach-title"
    >
      <motion.div className="reach__wrap container" {...motionProps}>
        <motion.header className="reach__header" variants={fadeUp}>
          <div>
            <p className="reach__kicker">Arrival</p>
            <h2 className="reach__title" id="reach-title">
              How to <em>Reach</em> Beyt Dwarka
            </h2>
          </div>

          <div className="reach__switch" role="tablist" aria-label="Travel mode">
            {MODES.map((item) => {
              const Icon = item.icon
              const on = item.id === active

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`reach-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="reach-hops"
                  className={`reach__tab${on ? ' is-on' : ''}`}
                  onClick={() => setActive(item.id)}
                >
                  <Icon aria-hidden="true" />
                  <span>
                    <b>{item.number}</b>
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.header>

        <motion.div className="reach__board" variants={fadeUp}>
          <div className="reach__stage">
            <div className="reach__map-pane">
              <ReachMap active={active} reduced={Boolean(prefersReducedMotion)} />
              <div className="reach__map-card">
                <strong>Beyt Dwarka</strong>
                <span>22.45°N · 69.12°E</span>
              </div>
            </div>

            <div
              className="reach__dock"
              id="reach-hops"
              role="tabpanel"
              aria-labelledby={`reach-tab-${mode.id}`}
            >
              <p className="reach__dock-mode">
                <b>{mode.number}</b>
                {mode.title}
              </p>

              <AnimatePresence mode="wait">
                <motion.ol
                  key={mode.id}
                  className="reach__hops"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {mode.hops.map((hop) => (
                    <li key={hop.value + hop.label}>
                      <strong>{hop.value}</strong>
                      <span>{hop.label}</span>
                    </li>
                  ))}
                  <li className="is-end">
                    <strong>Island</strong>
                    <span>Beyt Dwarka</span>
                  </li>
                </motion.ol>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowToReach
