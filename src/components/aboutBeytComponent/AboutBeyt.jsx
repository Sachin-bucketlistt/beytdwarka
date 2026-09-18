import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import './AboutBeyt.css'

const img = (path) => `${import.meta.env.BASE_URL}${path}`
const EASE = [0.22, 1, 0.36, 1]

const TOPICS = [
  {
    number: '01',
    title: 'Mythology',
    copy: "Believed to be the location of Lord Shri Krishna's residential palace, and tied to the legendary story of his childhood friend Sudama.",
    src: img('Images/beytdwarka-hero-background-image.png'),
    position: '50% 40%',
    tag: 'Island heritage',
    caption: 'Where history meets serenity',
    sub: 'Dwarkadhish temple, Beyt Dwarka',
  },
  {
    number: '02',
    title: 'History',
    copy: "From Harappan-era and Mauryan artifacts to ancient shipwrecks, the island carries traces of India's maritime and cultural past.",
    src: img('Images/ShowcaseImages/image.png'),
    position: '82% 86%',
    tag: 'Maritime past',
    caption: 'Traces of an ancient trade coast',
    sub: 'Archaeological finds off the shore',
  },
  {
    number: '03',
    title: 'Geography',
    copy: 'Beaches, mangroves, marine life and the surrounding Arabian Sea make it a remarkable coastal destination.',
    src: img(`Images/ShowcaseImages/${encodeURIComponent('image copy.png')}`),
    position: '36% 58%',
    tag: 'Coast & sea',
    caption: 'Where the island meets the sea',
    sub: 'Padam Beach and the mangroves',
  },
]

const FACTS = [
  { label: 'Where', value: 'Beyt Dwarka, Gujarat', icon: MapPin },
  { label: 'When', value: 'Throughout the year', icon: CalendarDays },
  { label: 'For whom', value: 'All explorers', icon: Users },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function AboutBeyt() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const active = TOPICS[activeIndex]
  const motionProps = prefersReducedMotion
    ? {}
    : { variants: stagger, initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } }

  return (
    <section className="about-beyt section" id="about" aria-labelledby="about-title">
      <motion.div className="about-beyt__wrap container" {...motionProps}>
        <motion.header className="about-beyt__top" variants={fadeUp}>
          <p className="about-beyt__badge">Overview</p>
          <p>Shankhodhar · 2 km from Okha</p>
          <p>Arabian Sea</p>
        </motion.header>

        <div className="about-beyt__intro">
          <motion.div variants={fadeUp}>
            <h2 className="about-beyt__title" id="about-title">
              Discover the timeless essence of <em>Beyt Dwarka</em>
            </h2>
            <p className="about-beyt__lead">
              Also known as Shankhodhar, an island just 2 km from Okha in the
              Arabian Sea. Known for its connection to Lord Shri Krishna, ancient
              history, beaches, mangroves and marine life.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button href="#experiences" arrow tone="on-light">
              Explore Beyt Dwarka
            </Button>
          </motion.div>
        </div>

        <div className="about-beyt__board">
          <motion.div className="about-beyt__stage" variants={fadeUp}>
            {TOPICS.map((topic, index) => (
              <motion.img
                key={topic.number}
                src={topic.src}
                alt=""
                initial={false}
                animate={
                  prefersReducedMotion
                    ? { opacity: index === activeIndex ? 1 : 0 }
                    : {
                        opacity: index === activeIndex ? 1 : 0,
                        scale: index === activeIndex ? 1 : 1.06,
                      }
                }
                transition={{ duration: 0.8, ease: EASE }}
                style={{
                  objectPosition: topic.position,
                  zIndex: index === activeIndex ? 1 : 0,
                }}
              />
            ))}
            <motion.p
              key={`${active.number}-chip`}
              className="about-beyt__chip"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {active.tag}
            </motion.p>
            <div className="about-beyt__caption">
              <motion.div
                key={`${active.number}-caption`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <b>{active.number}</b>
                <strong>{active.caption}</strong>
                <span>{active.sub}</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="about-beyt__notes">
            {TOPICS.map((topic, index) => {
              const on = index === activeIndex

              return (
                <motion.button
                  key={topic.number}
                  type="button"
                  className={`about-beyt__note${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  variants={fadeUp}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => {
                    if (canHover()) setActiveIndex(index)
                  }}
                >
                  <span className="about-beyt__note-meta">
                    <span>{topic.number}</span>
                    <span>{topic.tag}</span>
                  </span>
                  <strong>{topic.title}</strong>
                  <p>{topic.copy}</p>
                </motion.button>
              )
            })}
            <p className="about-beyt__excerpt">{active.copy}</p>
          </div>
        </div>

        <motion.dl className="about-beyt__facts" variants={fadeUp}>
          {FACTS.map((fact) => {
            const Icon = fact.icon

            return (
              <div key={fact.label}>
                <dt>
                  <Icon size={13} strokeWidth={1.75} aria-hidden />
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            )
          })}
        </motion.dl>
      </motion.div>
    </section>
  )
}

export default AboutBeyt
