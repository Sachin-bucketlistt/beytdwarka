import RotatingWord from '../animatedTextComponent/RotatingWord.jsx'
import { site } from '../../site.config.js'
import './Hero.css'

const heroImage = `${import.meta.env.BASE_URL}Images/beytdwarka-hero-background-image.png`
const TIDE_WORDS = ['Story', 'Secret', 'Journey', 'Memory', 'Legend']

function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={heroImage}
          alt="Aerial view of Beyt Dwarka island at sunset, with temples, harbour, and the Arabian Sea"
          width="1672"
          height="941"
        />
      </div>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__tide" aria-live="polite">
          <span className="hero__tide-line">
            Beyt Dwarka, Where Every Tide Tells a —
          </span>
          <RotatingWord words={TIDE_WORDS} className="hero__tide-word" />
        </p>
        <h1 className="hero__title" id="hero-title">
          {site.name}
        </h1>
        <p className="hero__lead">
          Sacred island of Lord Krishna off Okha — temples, beaches, Sudarshan
          Setu, and the Arabian Sea.
        </p>
        <div className="hero__actions">
          <a className="hero__btn hero__btn--primary" href="#explore">
            Explore the island
          </a>
          <a className="hero__btn hero__btn--ghost" href="#visit">
            How to reach
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
