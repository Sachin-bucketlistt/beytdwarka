import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './Gallery.css'

const EASE = [0.22, 1, 0.36, 1]

const FRAMES = [
  {
    id: 'shore',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/DSC03900-min_11zon.webp',
    title: 'Shore run',
    place: 'Padam Beach',
    span: 'hero',
    position: '50% 62%',
  },
  {
    id: 'fire',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/camping11_11zon.webp',
    title: 'Night fire',
    place: 'Island camp',
    span: 'tall',
    position: '48% 42%',
  },
  {
    id: 'dusk',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/20231003_182210-min-min-min_11zon.webp',
    title: 'Last light',
    place: 'Arabian Sea',
    span: 'pair',
    position: '50% 40%',
  },
  {
    id: 'jump',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG-20240313-WA0054-min-min-min_11zon.webp',
    title: 'Tide jump',
    place: 'Golden hour',
    span: 'pair',
    position: '50% 45%',
  },
  {
    id: 'friends',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_6206_7_11zon_11zon.webp',
    title: 'Five on the shore',
    place: 'Padam Beach',
    span: 'pair',
    position: '50% 48%',
  },
  {
    id: 'hat',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_2511_4_11zon_11zon.webp',
    title: 'Looking out',
    place: 'Island edge',
    span: 'portrait',
    position: '50% 35%',
  },
  {
    id: 'swing',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_2932_11zon.jpg',
    title: 'Island swing',
    place: 'Padam Beach',
    span: 'portrait',
    position: '50% 42%',
  },
  {
    id: 'boat',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/IMG_2841_11zon.jpg',
    title: 'Harbour boat',
    place: 'Okha crossing',
    span: 'portrait',
    position: '50% 38%',
  },
  {
    id: 'dolphin',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/20230201_170445_11zon.jpg',
    title: 'Dolphin hour',
    place: 'Gulf of Kutch',
    span: 'wide',
    position: '50% 50%',
  },
  {
    id: 'mud',
    src: 'https://beytdwarka.com/assets/img/Home/gallery/20221227_164737_11zon.jpg',
    title: 'Mud day',
    place: 'Sand therapy',
    span: 'wide',
    position: '50% 48%',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

function Gallery() {
  const [open, setOpen] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <motion.div className="gallery__wrap container" {...motionProps}>
        <motion.header className="gallery__header" variants={fadeUp}>
          <div>
            <p className="gallery__kicker">
              Frames
              <span>{String(FRAMES.length).padStart(2, '0')} photographs</span>
            </p>
            <h2 className="gallery__title" id="gallery-title">
              Island in <em>pictures</em>
            </h2>
          </div>
          <p className="gallery__lead">
            Guests, tides, night fire and a dolphin hour — tap a frame to open
            the gallery and move through the set.
          </p>
        </motion.header>

        <motion.div className="gallery__wall" variants={stagger}>
          {FRAMES.map((frame, index) => (
            <motion.button
              key={frame.id}
              type="button"
              className={`gallery__frame gallery__frame--${frame.span}`}
              variants={fadeUp}
              onClick={() => setOpen(index)}
              aria-label={`Open ${frame.title}, ${frame.place}`}
            >
              <span className="gallery__shot">
                <img
                  src={frame.src}
                  alt=""
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ objectPosition: frame.position }}
                />
              </span>
              <span className="gallery__no" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="gallery__meta">
                <b>{frame.title}</b>
                <em>{frame.place}</em>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <Lightbox
        index={open}
        reduced={Boolean(prefersReducedMotion)}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </section>
  )
}

function Lightbox({ index, onClose, onChange, reduced }) {
  const startX = useRef(0)
  const active = index != null
  const frame = active ? FRAMES[index] : null
  const total = FRAMES.length

  const go = useCallback(
    (next) => {
      onChange((next + total) % total)
    },
    [onChange, total],
  )

  useEffect(() => {
    if (!active) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') go(index - 1)
      if (event.key === 'ArrowRight') go(index + 1)
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [active, go, index, onClose])

  useEffect(() => {
    if (!active) return undefined
    const next = FRAMES[(index + 1) % total]
    const prev = FRAMES[(index - 1 + total) % total]
    ;[next, prev].forEach((item) => {
      const image = new Image()
      image.src = item.src
    })
    return undefined
  }, [active, index, total])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {active && frame ? (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${frame.title} — ${frame.place}`}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <button
            type="button"
            className="lightbox__veil"
            aria-label="Close gallery"
            onClick={onClose}
          />

          <div className="lightbox__bar">
            <p>
              <b>{frame.title}</b>
              <span>{frame.place}</span>
            </p>
            <span className="lightbox__count">
              {String(index + 1).padStart(2, '0')}
              <i>/</i>
              {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="lightbox__icon"
              onClick={onClose}
              aria-label="Close gallery"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <div
            className="lightbox__stage"
            onPointerDown={(event) => {
              startX.current = event.clientX
            }}
            onPointerUp={(event) => {
              const dx = event.clientX - startX.current
              if (dx > 56) go(index - 1)
              if (dx < -56) go(index + 1)
            }}
          >
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} strokeWidth={1.6} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={frame.id}
                src={frame.src}
                alt={`${frame.title}, ${frame.place}`}
                className="lightbox__photo"
                initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.32, ease: EASE }}
                draggable={false}
              />
            </AnimatePresence>

            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
            >
              <ChevronRight size={22} strokeWidth={1.6} />
            </button>
          </div>

          <div className="lightbox__strip" role="tablist" aria-label="Photographs">
            {FRAMES.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                className={`lightbox__thumb${itemIndex === index ? ' is-on' : ''}`}
                onClick={() => onChange(itemIndex)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.src} alt="" />
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default Gallery
