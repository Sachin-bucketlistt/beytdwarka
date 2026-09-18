import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import RotatingWord from '../animatedTextComponent/RotatingWord.jsx'
import SlidingCounter from '../animatedTextComponent/SlidingCounter.jsx'
import Button from '../buttonComponent/Button.jsx'
import { site } from '../../site.config.js'
import './Hero.css'

const img = (path) =>
  /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`
const EASE = [0.22, 1, 0.36, 1]
const TIDE_WORDS = ['Story', 'Secret', 'Journey', 'Memory', 'Legend']

const PHOTOS = {
  island: img('https://images.unsplash.com/photo-1558281050-4c33200099c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  harbour: img('https://images.unsplash.com/photo-1644647840725-5218072147b7?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  beach: img(`https://images.unsplash.com/photo-1661287416385-5c18354886ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`),
  temple: img('/Images/beytdwarka-hero-background-image.png'),
}

const TRIPS = [
  {
    id: 'dolphin',
    number: '01',
    name: 'Dolphin Safari',
    place: 'Gulf of Kutch',
    cue: 'Boat',
    href: '#dolphin',
    src: PHOTOS.harbour,
    position: '78% 70%',
    scene: '70% 82%',
  },
  {
    id: 'beach',
    number: '02',
    name: 'Padam Beach',
    place: 'Beyt Dwarka',
    cue: 'Shore',
    href: '#experiences',
    src: PHOTOS.beach,
    position: '42% 58%',
    scene: '48% 62%',
  },
  {
    id: 'darshan',
    number: '03',
    name: 'Temple Darshan',
    place: 'Dwarkadhish',
    cue: 'Temple',
    href: '#experiences',
    src: PHOTOS.temple,
    position: '50% 38%',
    scene: '50% 38%',
  },
  {
    id: 'marine',
    number: '04',
    name: 'Marine Walk',
    place: 'Mangrove coast',
    cue: 'Trail',
    href: '#experiences',
    src: PHOTOS.island,
    position: '82% 68%',
    scene: '80% 62%',
  },
]

const PROOF = [
  { value: '600+', label: 'Travelers' },
  { value: '100+', label: 'Reviews' },
  { value: '15,000+', label: 'Guests' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(null)
  const [paused, setPaused] = useState(false)
  const trip = TRIPS[active] ?? TRIPS[0]
  const shiftX = useMotionValue(0)
  const shiftY = useMotionValue(0)
  const mediaX = useSpring(shiftX, { stiffness: 50, damping: 22, mass: 0.8 })
  const mediaY = useSpring(shiftY, { stiffness: 50, damping: 22, mass: 0.8 })

  useEffect(() => {
    if (prefersReducedMotion || paused) return undefined
    const id = window.setInterval(() => {
      setActive((value) => ((value ?? -1) + 1) % TRIPS.length)
    }, 6400)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion])

  const onMove = (event) => {
    if (prefersReducedMotion) return
    const { innerWidth, innerHeight } = window
    shiftX.set((event.clientX / innerWidth - 0.5) * 18)
    shiftY.set((event.clientY / innerHeight - 0.5) * 12)
  }

  return (
    <section
      className="hero"
      id="hero"
      aria-labelledby="hero-title"
      onMouseMove={onMove}
    >
      <div className="hero__media">
        <HeroScene
          id="island"
          src={PHOTOS.island}
          position="center 42%"
          on={active === null}
          prefersReducedMotion={prefersReducedMotion}
          mediaX={mediaX}
          mediaY={mediaY}
        />
        {TRIPS.map((item, index) => (
          <HeroScene
            key={item.id}
            id={item.id}
            src={item.src}
            position={item.scene}
            on={index === active}
            prefersReducedMotion={prefersReducedMotion}
            mediaX={mediaX}
            mediaY={mediaY}
          />
        ))}
      </div>

      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__stage container">
        {/* <motion.header
          className="hero__top"
          variants={stagger}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.p className="hero__coords" variants={fadeUp}>
            <span className="hero__pin" aria-hidden="true" />
            {site.geo.lat.toFixed(2)}°N · {site.geo.lng.toFixed(2)}°E
          </motion.p>
          <motion.p className="hero__kicker" variants={fadeUp}>
            Devbhoomi Dwarka · Gujarat
          </motion.p>
          <motion.p className="hero__sea" variants={fadeUp}>
            Arabian Sea
          </motion.p>
        </motion.header> */}

        <div className="hero__body">
          <motion.div
            className="hero__copy"
            variants={stagger}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
          >
            <motion.p className="hero__badge" variants={fadeUp}>
              Island experiences
            </motion.p>

            <motion.h1 className="hero__title" id="hero-title" variants={fadeUp}>
              {site.name}
            </motion.h1>

            <motion.p className="hero__tide" variants={fadeUp} aria-live="polite">
              <span>Where every tide tells a</span>
              <RotatingWord words={TIDE_WORDS} className="hero__tide-word" />
            </motion.p>

            <motion.p className="hero__lead" variants={fadeUp}>
              Dolphins, darshan, mud therapy and mangrove walks — one island
              day off the Gujarat coast.
            </motion.p>

            <motion.div className="hero__actions" variants={fadeUp}>
              <Button href="#experiences" arrow>
                Explore experiences
              </Button>
              <Button href="#packages">Plan your day</Button>
            </motion.div>

            <motion.ul className="hero__proof" variants={fadeUp} aria-label="Community highlights">
              {PROOF.map((item, index) => (
                <li key={item.label} aria-label={`${item.value} ${item.label}`}>
                  <strong aria-hidden="true">
                    <SlidingCounter value={item.value} delay={0.28 + index * 0.16} />
                  </strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <Compass reduced={prefersReducedMotion} />
        </div>

        <motion.div
          className="hero__trips"
          variants={stagger}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero__trips-head">
            <p>Choose a way in</p>
            <p aria-live="polite">
              {active === null ? (
                'Open expedition · Beyt Dwarka'
              ) : (
                <>
                  <b>{trip.number}</b> {trip.name} · {trip.place}
                </>
              )}
            </p>
          </div>

          <div className="hero__trips-row">
            {TRIPS.map((item, index) => {
              const on = index === active

              return (
                <motion.a
                  key={item.id}
                  className={`hero__trip${on ? ' is-on' : ''}`}
                  href={item.href}
                  aria-current={on ? 'true' : undefined}
                  variants={fadeUp}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="hero__trip-media">
                    <img
                      src={item.src}
                      alt=""
                      style={{ objectPosition: item.position }}
                    />
                  </span>
                  <span className="hero__trip-meta">
                    <span className="hero__trip-no">{item.number}</span>
                    <span className="hero__trip-cue">{item.cue}</span>
                  </span>
                  <span className="hero__trip-copy">
                    <strong>{item.name}</strong>
                    <span>{item.place}</span>
                  </span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroScene({ id, src, position, on, prefersReducedMotion, mediaX, mediaY }) {
  if (prefersReducedMotion) {
    return on ? (
      <img key={id} src={src} alt="" style={{ objectPosition: position }} />
    ) : null
  }

  return (
    <motion.img
      key={id}
      src={src}
      alt=""
      initial={false}
      animate={{
        opacity: on ? 1 : 0,
        scale: on ? 1.06 : 1.12,
      }}
      transition={{ duration: 1.15, ease: EASE }}
      style={{
        x: mediaX,
        y: mediaY,
        objectPosition: position,
        zIndex: on ? 1 : 0,
      }}
    />
  )
}

function Compass({ reduced }) {
  return (
    <motion.div
      className="hero__compass"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: EASE }}
    >
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" />
        <circle cx="60" cy="60" r="40" />
        <path d="M60 14v10M60 96v10M14 60h10M96 60h10" />
        <text x="60" y="28">
          N
        </text>
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }
          }
        >
          <polygon points="60,26 64,60 60,54 56,60" />
          <polygon className="hero__compass-south" points="60,94 56,60 60,66 64,60" />
        </motion.g>
      </svg>
      <span>2 km off Okha</span>
    </motion.div>
  )
}

export default Hero
