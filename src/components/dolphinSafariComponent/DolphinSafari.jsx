import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { Check, Clock, Minus, Plus, Ship, Users, Waves } from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import './DolphinSafari.css'

const EASE = [0.22, 1, 0.36, 1]
const inr = new Intl.NumberFormat('en-IN')
const rupees = (value) => `₹${inr.format(value)}`

const img = (path) => `${import.meta.env.BASE_URL}${path}`
const DOLPHIN_CUTOUT = img('Images/Dolphinepng.png')
const DOLPHIN_SRC =
  'https://beytdwarka.com/assets/img/Home/gallery/20230201_170445_11zon.jpg'
const BOAT_SRC =
  'https://beytdwarka.com/assets/img/Home/gallery/IMG_2841_11zon.jpg'

const SHARED = {
  id: 'dolphin-shared',
  number: '01',
  name: 'Dolphin Safari',
  kind: 'Shared boat',
  tease: 'Common departure timings — 45 minutes on the Gulf of Kutch.',
  price: 1200,
  unit: 'per person',
  duration: '45 minutes',
  timing: 'Common departure',
  src: DOLPHIN_SRC,
  position: '50% 55%',
  includes: [
    'Pick-up and drop from Beyt Dwarka Parking',
    '1 L packaged mineral water per person',
    'Dolphin Safari for 45 minutes',
    'Inclusive of GST',
  ],
}

const CHARTERS = {
  exclusive: {
    id: 'dolphin-exclusive',
    name: 'Exclusive charter',
    tease: 'Private dolphin boat — min 1, max 30 guests.',
    price: 20000,
    duration: '45 minutes',
    guests: '1–30 guests',
    includes: [
      'Pick-up and drop from Beyt Dwarka Parking',
      '1 L packaged mineral water per person',
      'Dolphin Safari for 45 minutes',
      'Inclusive of GST',
    ],
  },
  normal: {
    id: 'boat-charter',
    name: 'Normal boat charter',
    tease: 'A private boat on the water — 30 minutes.',
    price: 10000,
    duration: '30 minutes',
    guests: 'Private boat',
    includes: ['Private boat for 30 minutes'],
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const GLIMPSES = [
  {
    id: 'top-right',
    from: { x: '10%', y: '0%', rotateY: -12, rotateX: 8, rotateZ: -1.2, scale: 0.97, z: -24 },
    to: { x: '-14%', y: '8%', rotateY: 6, rotateX: 4, rotateZ: 0.8, scale: 1.03, z: 12 },
  },
  {
    id: 'right',
    from: { x: '12%', y: '-2%', rotateY: -8, rotateX: 5, rotateZ: 0.4, scale: 0.96, z: -32 },
    to: { x: '-12%', y: '10%', rotateY: 8, rotateX: 2, rotateZ: -0.6, scale: 1.02, z: 8 },
  },
  {
    id: 'top',
    from: { x: '6%', y: '2%', rotateY: -10, rotateX: 10, rotateZ: -0.6, scale: 0.97, z: -16 },
    to: { x: '-16%', y: '12%', rotateY: 6, rotateX: 5, rotateZ: 1, scale: 1.03, z: 18 },
  },
  {
    id: 'mid-right',
    from: { x: '8%', y: '6%', rotateY: -11, rotateX: 3, rotateZ: 0.8, scale: 0.95, z: -28 },
    to: { x: '-14%', y: '-4%', rotateY: 7, rotateX: -1, rotateZ: -0.5, scale: 1.02, z: 10 },
  },
]

const GLIMPSE_DURATION = 1.7
const TRAVEL_EASE = [0.4, 0.0, 0.2, 1]

function nextGlimpse(prev) {
  let next = Math.floor(Math.random() * GLIMPSES.length)
  if (next === prev) next = (next + 1) % GLIMPSES.length
  return next
}

function DolphinScene({ src, reduced }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.12, margin: '12% 0px' })
  const [compact, setCompact] = useState(false)
  const [path, setPath] = useState(0)
  const [pass, setPass] = useState(0)
  const active = inView && !reduced
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const sync = () => setCompact(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const glimpse = GLIMPSES[path]
  const peak = compact ? 0.18 : 0.28

  useEffect(() => {
    if (!active) return undefined
    const timer = window.setTimeout(() => {
      if (!activeRef.current) return
      setPath((prev) => nextGlimpse(prev))
      setPass((n) => n + 1)
    }, GLIMPSE_DURATION * 1000)
    return () => window.clearTimeout(timer)
  }, [active, pass])

  return (
    <div className="safari__scene" aria-hidden="true" ref={ref}>
      <div className="safari__depth">
        {reduced ? (
          <div className="safari__dolphin safari__dolphin--top-right">
            <img src={src} alt="" decoding="async" draggable={false} style={{ opacity: peak * 0.7 }} />
          </div>
        ) : active ? (
          <motion.div
            key={pass}
            className={`safari__dolphin safari__dolphin--${glimpse.id}`}
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ y: 0, rotateZ: 0 }}
            animate={{ y: [0, 7, 0], rotateZ: [0, 0.7, 0] }}
            transition={{ duration: GLIMPSE_DURATION, ease: 'linear' }}
          >
            <motion.img
              src={src}
              alt=""
              decoding="async"
              draggable={false}
              style={{ transformPerspective: 1400, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, ...glimpse.from }}
              animate={{
                ...glimpse.to,
                opacity: [0, peak, peak, 0],
              }}
              transition={{
                duration: GLIMPSE_DURATION,
                ease: TRAVEL_EASE,
                opacity: {
                  duration: GLIMPSE_DURATION,
                  times: [0, 0.16, 0.7, 1],
                  ease: 'linear',
                },
              }}
            />
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

function DolphinSafari() {
  const [guests, setGuests] = useState(2)
  const [charter, setCharter] = useState('exclusive')
  const prefersReducedMotion = useReducedMotion()
  const boat = CHARTERS[charter]
  const sharedTotal = SHARED.price * guests
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <section className="safari section" id="dolphin" aria-labelledby="safari-title">
      <DolphinScene src={DOLPHIN_CUTOUT} reduced={Boolean(prefersReducedMotion)} />

      <motion.div className="safari__wrap container" {...motionProps}>
        <motion.header className="safari__header" variants={fadeUp}>
          <div>
            <p className="safari__kicker">Open water</p>
            <h2 className="safari__title" id="safari-title">
              Dolphin <em>Safari</em>
            </h2>
          </div>
          <p className="safari__lead">
            Two ways out on the Gulf of Kutch — a shared 45-minute safari, or a
            private boat of your own.
          </p>
        </motion.header>

        <div className="safari__deck">
          <motion.article className="safari__ticket" variants={fadeUp}>
            <div className="safari__shot">
              <img src={SHARED.src} alt="" style={{ objectPosition: SHARED.position }} />
              <p className="safari__chip">
                <Waves size={12} strokeWidth={1.8} aria-hidden />
                Gulf of Kutch
              </p>
            </div>

            <div className="safari__body">
              <p className="safari__no">{SHARED.number}</p>
              <p className="safari__kind">{SHARED.kind}</p>
              <h3>{SHARED.name}</h3>
              <p className="safari__tease">{SHARED.tease}</p>

              <p className="safari__price">
                <strong>{rupees(SHARED.price)}</strong>
                <span>{SHARED.unit}</span>
              </p>

              <p className="safari__meta">
                <span>
                  <Clock size={13} strokeWidth={1.75} aria-hidden />
                  {SHARED.duration}
                </span>
                <span>
                  <Ship size={13} strokeWidth={1.75} aria-hidden />
                  {SHARED.timing}
                </span>
              </p>

              <ul className="safari__includes">
                {SHARED.includes.map((item) => (
                  <li key={item}>
                    <Check size={12} strokeWidth={2.4} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="safari__foot">
                <GuestCounter
                  guests={guests}
                  min={1}
                  max={12}
                  onChange={setGuests}
                />
                <Button
                  href={`#book?plan=${SHARED.id}&guests=${guests}`}
                  arrow
                  size="sm"
                  tone="on-light"
                >
                  {`Book for ${guests} · ${rupees(sharedTotal)}`}
                </Button>
              </div>
            </div>
          </motion.article>

          <motion.article className="safari__ticket" variants={fadeUp}>
            <div className="safari__shot">
              <img src={BOAT_SRC} alt="" style={{ objectPosition: '50% 38%' }} />
              <p className="safari__chip">
                <Ship size={12} strokeWidth={1.8} aria-hidden />
                Private boat
              </p>
            </div>

            <div className="safari__body">
              <p className="safari__no">02</p>
              <p className="safari__kind">Charter</p>
              <h3>Private boat</h3>
              <p className="safari__tease">{boat.tease}</p>

              <div className="safari__switch" role="tablist" aria-label="Charter type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={charter === 'exclusive'}
                  className={charter === 'exclusive' ? 'is-on' : ''}
                  onClick={() => setCharter('exclusive')}
                >
                  Exclusive
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={charter === 'normal'}
                  className={charter === 'normal' ? 'is-on' : ''}
                  onClick={() => setCharter('normal')}
                >
                  Normal
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={boat.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <p className="safari__price">
                    <strong>{rupees(boat.price)}</strong>
                    <span>per boat</span>
                  </p>

                  <p className="safari__meta">
                    <span>
                      <Clock size={13} strokeWidth={1.75} aria-hidden />
                      {boat.duration}
                    </span>
                    <span>
                      <Users size={13} strokeWidth={1.75} aria-hidden />
                      {boat.guests}
                    </span>
                  </p>

                  <ul className="safari__includes">
                    {boat.includes.map((item) => (
                      <li key={item}>
                        <Check size={12} strokeWidth={2.4} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="safari__foot">
                <p className="safari__boat-note">{boat.name}</p>
                <Button
                  href={`#book?plan=${boat.id}`}
                  arrow
                  size="sm"
                  tone="on-light"
                >
                  {`Book boat · ${rupees(boat.price)}`}
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </motion.div>
    </section>
  )
}

function GuestCounter({ guests, min, max, onChange }) {
  return (
    <div className="safari__guests">
      <span>
        <Users size={14} strokeWidth={1.75} aria-hidden />
        Guests
      </span>
      <button
        type="button"
        aria-label="Remove a guest"
        disabled={guests <= min}
        onClick={() => onChange((count) => Math.max(min, count - 1))}
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <b>{guests}</b>
      <button
        type="button"
        aria-label="Add a guest"
        disabled={guests >= max}
        onClick={() => onChange((count) => Math.min(max, count + 1))}
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

export default DolphinSafari
