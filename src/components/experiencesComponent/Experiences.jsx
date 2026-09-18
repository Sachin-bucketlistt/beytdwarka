import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import './Experiences.css'

const img = (path) =>
  /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`
const EASE = [0.22, 1, 0.36, 1]

const PHOTOS = {
  island: img('Images/beytdwarka-hero-background-image.png'),
  harbour: img('Images/ShowcaseImages/image.png'),
  beach: img(`Images/ShowcaseImages/${encodeURIComponent('image copy.png')}`),
  boats: img(
    'https://images.unsplash.com/photo-1644647840725-5218072147b7?q=80&w=1600&auto=format&fit=crop',
  ),
  shore: img(
    'https://images.unsplash.com/photo-1661287416385-5c18354886ee?q=80&w=1600&auto=format&fit=crop',
  ),
  dusk: img(
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1600&auto=format&fit=crop',
  ),
  creeks: img(
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop',
  ),
}

const EXPERIENCES = [
  {
    id: 'dolphin',
    number: '01',
    name: 'Dolphin Safari',
    place: 'Gulf of Kutch',
    tease: 'A quiet boat hour on open water, watching for fins off the island coast.',
    src: PHOTOS.boats,
    position: '78% 70%',
    points: [
      { icon: 'boat', label: 'Boat outing' },
      { icon: 'wave', label: 'Open water' },
      { icon: 'leaf', label: 'Marine life' },
    ],
  },
  {
    id: 'beach',
    number: '02',
    name: 'Padam Beach',
    place: 'Beyt Dwarka',
    tease: 'The island’s easy shore — sand, shade, and a slow half-day by the sea.',
    src: PHOTOS.shore,
    position: '42% 58%',
    points: [
      { icon: 'wave', label: 'Mud bath' },
      { icon: 'leaf', label: 'Sand therapy' },
      { icon: 'sun', label: 'Beach day' },
    ],
  },
  {
    id: 'darshan',
    number: '03',
    name: 'Temple Darshan',
    place: 'Dwarkadhish Temple',
    tease: 'Guided temple time, prasad, and the quiet pull of Dwarka’s island shrine.',
    src: PHOTOS.island,
    position: '50% 38%',
    points: [
      { icon: 'temple', label: 'Guided visit' },
      { icon: 'leaf', label: 'Prasad' },
      { icon: 'pin', label: 'Hanuman Dandi' },
    ],
  },
  {
    id: 'marine',
    number: '04',
    name: 'Marine Walk',
    place: 'Reefs & mangroves',
    tease: 'A coastal trail through mangroves, tidal flats, and island flora.',
    src: PHOTOS.island,
    position: '82% 68%',
    points: [
      { icon: 'pin', label: 'Coastal trail' },
      { icon: 'leaf', label: 'Mangroves' },
      { icon: 'wave', label: 'Island flora' },
    ],
  },
  {
    id: 'therapy',
    number: '05',
    name: 'Mud & sand therapy',
    place: 'Padam Beach',
    tease: 'Warm mineral mud and a sand bath — the island’s slow wellness hour.',
    src: PHOTOS.beach,
    position: '62% 72%',
    points: [
      { icon: 'leaf', label: 'Mud therapy' },
      { icon: 'wave', label: 'Sand bath' },
      { icon: 'sun', label: 'Shore rest' },
    ],
  },
  {
    id: 'mangrove',
    number: '06',
    name: 'Mangrove coast',
    place: 'Tidal creeks',
    tease: 'A short walk where the island meets saltwater woods and birdlife.',
    src: PHOTOS.creeks,
    position: '40% 60%',
    points: [
      { icon: 'leaf', label: 'Mangroves' },
      { icon: 'pin', label: 'Creek edge' },
      { icon: 'walk', label: 'Easy trail' },
    ],
  },
  {
    id: 'ferry',
    number: '07',
    name: 'Harbour crossing',
    place: 'Okha to Beyt',
    tease: 'The two-kilometre crossing — boats, flags, and the first view of the island.',
    src: PHOTOS.harbour,
    position: '70% 80%',
    points: [
      { icon: 'boat', label: 'Ferry ride' },
      { icon: 'pin', label: '2 km off Okha' },
      { icon: 'wave', label: 'Arrival' },
    ],
  },
  {
    id: 'dandi',
    number: '08',
    name: 'Hanuman Dandi',
    place: 'Island temples',
    tease: 'A second shrine stop — quieter, coastal, and part of the darshan loop.',
    src: PHOTOS.island,
    position: '72% 48%',
    points: [
      { icon: 'temple', label: 'Temple stop' },
      { icon: 'pin', label: 'Island trail' },
      { icon: 'leaf', label: 'Prasad' },
    ],
  },
  {
    id: 'museum',
    number: '09',
    name: 'Golden Dwarka Museum',
    place: 'Island heritage',
    tease: 'A compact museum hour for the stories behind the temples and the coast.',
    src: PHOTOS.island,
    position: '36% 30%',
    points: [
      { icon: 'camera', label: 'Exhibits' },
      { icon: 'temple', label: 'Heritage' },
      { icon: 'pin', label: 'Ticketed' },
    ],
  },
  {
    id: 'sunset',
    number: '10',
    name: 'Island sunset',
    place: 'Arabian Sea',
    tease: 'Last light on the water — the quiet close to a day on Beyt Dwarka.',
    src: PHOTOS.dusk,
    position: '48% 42%',
    points: [
      { icon: 'sunset', label: 'Golden hour' },
      { icon: 'wave', label: 'Sea view' },
      { icon: 'sun', label: 'Evening' },
    ],
  },
]

const FEATURED = EXPERIENCES.slice(0, 2)
const MOSAIC = EXPERIENCES.slice(2)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
}

function Experiences() {
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
    <section
      className="experiences section"
      id="experiences"
      aria-labelledby="experiences-title"
    >
      <motion.div className="experiences__wrap container" {...motionProps}>
        <motion.header className="experiences__header" variants={fadeUp}>
          <div>
            <p className="experiences__kicker">
              Island log
              <span>{String(EXPERIENCES.length).padStart(2, '0')} moments</span>
            </p>
            <h2 className="experiences__title" id="experiences-title">
              Incredible <em>experience</em>
            </h2>
          </div>
          <p className="experiences__lead">
            Two openers, then eight more island hours — each a short look,
            ready for its own page.
          </p>
        </motion.header>

        <motion.div className="experiences__featured" variants={stagger}>
          {FEATURED.map((item) => (
            <Print key={item.id} item={item} size="lead" />
          ))}
        </motion.div>

        <motion.div className="experiences__mosaic" variants={stagger}>
          {MOSAIC.map((item) => (
            <Print key={item.id} item={item} size="tile" />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function Print({ item, size }) {
  return (
    <motion.article className={`print print--${size}`} variants={fadeUp}>
      <img src={item.src} alt="" style={{ objectPosition: item.position }} />
      <p className="print__chip">
        <MapPin size={11} strokeWidth={1.75} aria-hidden="true" />
        {item.place}
      </p>
      <p className="print__mark" aria-hidden="true">
        {item.number}
      </p>
      <div className="print__copy">
        <p className="print__no">{item.number}</p>
        <h3>{item.name}</h3>
        {size === 'lead' ? <p className="print__tease">{item.tease}</p> : null}
        <Button
          href="#packages"
          arrow
          size="sm"
          tone="on-dark"
          aria-label={`Explore ${item.name}`}
        >
          Explore
        </Button>
      </div>
    </motion.article>
  )
}

export default Experiences
