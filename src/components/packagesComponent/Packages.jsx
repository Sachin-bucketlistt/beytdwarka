import { useEffect, useState } from 'react'
import {
  Check,
  Clock,
  Landmark,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Users,
  Waves,
} from 'lucide-react'
import Button from '../buttonComponent/Button.jsx'
import './Packages.css'

const img = (path) => `${import.meta.env.BASE_URL}${path}`
const inr = new Intl.NumberFormat('en-IN')
const rupees = (value) => `₹${inr.format(value)}`

const PHOTOS = {
  beach: img(`Images/ShowcaseImages/${encodeURIComponent('image copy.png')}`),
  harbour: img('Images/ShowcaseImages/image.png'),
  island: img('Images/beytdwarka-hero-background-image.png'),
}

const TIERS = [
  {
    name: 'Essentials',
    caption: 'Arrival & essentials',
    icon: 'pin',
    src: PHOTOS.harbour,
    items: [
      ['Pick-up & drop from parking', '1 L water · tea & cookies · GST'],
      ['Pick-up & drop from parking', '1 L water · tea & cookies · GST'],
      ['Pick-up by AC car', '1 L water · tea & cookies · GST'],
    ],
  },
  {
    name: 'Beach',
    caption: 'Padam Beach',
    icon: 'wave',
    src: PHOTOS.beach,
    items: [
      ['Exclusive beach access', 'Fresh & change facility', 'One hot snack'],
      ['Exclusive beach access', 'Fresh & change facility', 'One hot snack'],
      null,
    ],
  },
  {
    name: 'Wellness & meals',
    caption: 'Sand bath & meals',
    icon: 'leaf',
    src: PHOTOS.harbour,
    items: [
      null,
      [
        'Sand bath & mud therapy',
        'Guided marine / beach walk',
        'Veg lunch & evening hi-tea',
      ],
      null,
    ],
  },
  {
    name: 'Darshan',
    caption: 'Temple darshan',
    icon: 'temple',
    src: PHOTOS.island,
    items: [
      null,
      null,
      [
        'Temple darshan with guide & prasad',
        'Hanuman Dandi Temple',
        'Golden Dwarka Museum ticket',
      ],
    ],
  },
]

const PLANS = [
  {
    id: 'padam',
    name: 'Padam Beach',
    short: 'Padam',
    bestFor: 'A relaxed half-day on the beach',
    duration: '4 hours',
    timing: 'From 09:00 AM',
    price: 749,
    src: PHOTOS.beach,
    car: false,
  },
  {
    id: 'enjoy',
    name: 'Enjoy Beyt Dwarka',
    short: 'Enjoy',
    bestFor: 'A full day with meals & activities',
    duration: '8 hours',
    timing: '09:30 AM – 05:30 PM',
    price: 1499,
    src: PHOTOS.harbour,
    featured: true,
    car: false,
  },
  {
    id: 'darshan',
    name: 'Beyt Dwarka Darshan',
    short: 'Darshan',
    bestFor: 'Temple visits by car, with a guide',
    duration: 'Guided',
    timing: 'Min 2 · max 6 guests per car',
    price: 1999,
    src: PHOTOS.island,
    car: true,
  },
]

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getIstClock(stamp) {
  const date = new Date(stamp)
  const clock = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
  const hourParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const hour = Number(hourParts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(hourParts.find((part) => part.type === 'minute')?.value ?? 0)
  const minutes = hour * 60 + minute
  const open = minutes >= 9 * 60 && minutes <= 17 * 60 + 30

  return { clock, open }
}

function isDarshanBlocked(plan, guests) {
  return Boolean(plan.car && (guests < 2 || guests > 6))
}

function handleBook(event, { planId, guests, blocked }) {
  if (blocked) {
    event.preventDefault()
    return
  }

  event.currentTarget.setAttribute('href', `#book?plan=${planId}&guests=${guests}`)
}

function guestWord(count) {
  return count === 1 ? 'guest' : 'guests'
}

function Packages() {
  const [activePlan, setActivePlan] = useState(1)
  const [guests, setGuests] = useState(2)
  const [hoverTier, setHoverTier] = useState(null)
  const [now, setNow] = useState(() => Date.now())
  const active = PLANS[activePlan]

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30000)
    return () => window.clearInterval(id)
  }, [])

  const selectPlan = (index) => setActivePlan(index)

  const onEnter = (index) => {
    if (canHover()) setActivePlan(index)
  }

  return (
    <section className="packages section" id="packages" aria-labelledby="packages-title">
      <div className="packages__atmosphere" aria-hidden="true">
        <img src={PHOTOS.island} alt="" />
      </div>
      <div className="packages__wrap container">
        <div className="packages__header">
          <div className="packages__intro">
            <p className="packages__kicker">
              Packages
              <LiveChip now={now} compact />
            </p>
            <h2 className="packages__title" id="packages-title">
              Plan your day on{' '}
              <span className="packages__title-end">
                <em>the island</em>
              </span>
            </h2>
          </div>
          <div className="packages__tools">
            <LiveChip now={now} />
            <GuestCounter guests={guests} onChange={setGuests} />
          </div>
        </div>

        <div className="packages__desktop" onMouseLeave={() => setHoverTier(null)}>
          <p className="packages__included">What&apos;s included</p>

          {PLANS.map((plan, index) => (
            <PlanHeader
              key={plan.id}
              plan={plan}
              index={index}
              active={index === activePlan}
              guests={guests}
              hoverTier={hoverTier}
              onEnter={() => {
                setHoverTier(null)
                onEnter(index)
              }}
              onSelect={() => selectPlan(index)}
            />
          ))}

          {TIERS.map((tier, tierIndex) => (
            <TierRow
              key={tier.name}
              tier={tier}
              tierIndex={tierIndex}
              activePlan={activePlan}
              hoverTier={hoverTier}
              onEnter={(planIndex) => {
                setHoverTier(tierIndex)
                onEnter(planIndex)
              }}
              onSelect={selectPlan}
              onPreview={() => setHoverTier(tierIndex)}
              onClear={() => setHoverTier(null)}
            />
          ))}

          <p className="packages__grid-foot">
            Water sports chargeable. Darshan: 2–6 guests per car.
          </p>

          {PLANS.map((plan, index) => (
            <BookCell
              key={`${plan.id}-book`}
              plan={plan}
              index={index}
              active={index === activePlan}
              guests={guests}
              onEnter={() => {
                setHoverTier(null)
                onEnter(index)
              }}
              onSelect={() => selectPlan(index)}
            />
          ))}
        </div>

        <div className="packages__mobile">
          <GuestCounter guests={guests} onChange={setGuests} />

          <div className="packages__switch" role="tablist" aria-label="Choose a plan">
            {PLANS.map((plan, index) => (
              <button
                key={plan.short}
                type="button"
                role="tab"
                aria-selected={index === activePlan}
                className={`packages__tab${index === activePlan ? ' is-active' : ''}`}
                onClick={() => selectPlan(index)}
              >
                <span>{plan.short}</span>
                <small>{rupees(plan.price)}</small>
              </button>
            ))}
          </div>

          <MobileCard
            plan={active}
            planIndex={activePlan}
            guests={guests}
          />
        </div>
      </div>
    </section>
  )
}

function LiveChip({ now, compact = false }) {
  const { clock, open } = getIstClock(now)
  const status = open ? 'Beach open till 5:30 PM' : 'Opens 9:00 AM tomorrow'

  return (
    <p className={`packages__live${compact ? ' packages__live--kicker' : ''}`} aria-live="polite">
      <span className="packages__pulse" aria-hidden />
      <Clock size={14} strokeWidth={1.75} aria-hidden />
      <strong>{clock} IST</strong>
      <span aria-hidden>·</span>
      {status}
    </p>
  )
}

function GuestCounter({ guests, onChange }) {
  return (
    <div className="packages__guests">
      <span>
        <Users size={14} strokeWidth={1.75} aria-hidden />
        Guests
      </span>
      <button
        type="button"
        aria-label="Remove a guest"
        disabled={guests <= 1}
        onClick={() => onChange((count) => Math.max(1, count - 1))}
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <b style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{guests}</b>
      <button
        type="button"
        aria-label="Add a guest"
        disabled={guests >= 12}
        onClick={() => onChange((count) => Math.min(12, count + 1))}
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

function PlanHeader({
  plan,
  index,
  active,
  guests,
  hoverTier,
  onEnter,
  onSelect,
}) {
  const blocked = isDarshanBlocked(plan, guests)
  const total = plan.price * guests

  return (
    <article
      className={`colb top packages__col packages__head${active ? ' on' : ''}`}
      onMouseEnter={onEnter}
      onClick={onSelect}
    >
      <div className="packages__top">
        <PhotoStage plan={plan} hoverTier={hoverTier} />
        <div className="packages__copy">
          <h3>{plan.name}</h3>
          <p className="packages__blurb">{plan.bestFor}</p>
          <p className="packages__meta">
            <span>
              <Clock size={13} strokeWidth={1.75} aria-hidden />
              {plan.duration}
            </span>
            <span>
              <Users size={13} strokeWidth={1.75} aria-hidden />
              {plan.timing}
            </span>
          </p>
        </div>
      </div>
      <div className="packages__price">
        <p>
          <strong>{rupees(plan.price)}</strong>
          <span>/ person</span>
        </p>
        {blocked ? (
          <small className="packages__warn">Needs 2–6 guests per car</small>
        ) : (
          <small>
            {rupees(total)} total for {guests} {guestWord(guests)}
          </small>
        )}
      </div>
    </article>
  )
}

function PhotoStage({ plan, hoverTier, overlay }) {
  return (
    <div className="packages__stage">
      <img
        src={plan.src}
        alt=""
        className={hoverTier === null ? 'is-on' : ''}
      />
      {TIERS.map((tier, index) => (
        <img
          key={tier.caption}
          src={tier.src}
          alt=""
          className={hoverTier === index ? 'is-on' : ''}
        />
      ))}
      {plan.featured ? (
        <span className="packages__badge">Most chosen</span>
      ) : null}
      {overlay}
    </div>
  )
}

function TierRow({
  tier,
  tierIndex,
  activePlan,
  hoverTier,
  onEnter,
  onSelect,
  onPreview,
  onClear,
}) {
  const preview = hoverTier === tierIndex

  return (
    <>
      <div
        className={`trow packages__trow${preview ? ' is-preview' : ''}`}
        onMouseEnter={onPreview}
        onMouseLeave={onClear}
      >
        <span className="packages__ticon" aria-hidden>
          <TierIcon name={tier.icon} />
        </span>
        <strong className="packages__tname">{tier.name}</strong>
      </div>
      {PLANS.map((plan, index) => (
        <div
          key={`${plan.id}-${tier.name}`}
          className={`colb packages__col packages__cell${index === activePlan ? ' on' : ''}${preview ? ' lit' : ''}`}
          onMouseEnter={() => onEnter(index)}
          onClick={() => onSelect(index)}
        >
          <FeatureLine items={tier.items[index]} />
        </div>
      ))}
    </>
  )
}

function FeatureLine({ items }) {
  if (!items) {
    return (
      <p className="packages__empty">
        <span className="packages__mark packages__mark--off" aria-hidden>
          <Minus size={10} strokeWidth={2.4} />
        </span>
        Not included
      </p>
    )
  }

  return (
    <p className="packages__line">
      <span className="packages__mark" aria-hidden>
        <Check size={10} strokeWidth={2.6} />
      </span>
      {items.join(' · ')}
    </p>
  )
}

function BookCell({ plan, index, active, guests, onEnter, onSelect }) {
  const blocked = isDarshanBlocked(plan, guests)
  const total = plan.price * guests
  const label = blocked
    ? 'Adjust guests to book'
    : `Book for ${guests} · ${rupees(total)}`

  return (
    <div
      className={`colb bot packages__col packages__book${active ? ' on' : ''}`}
      onMouseEnter={onEnter}
      onClick={onSelect}
    >
      <Button
        className={`packages__cta${blocked ? ' is-blocked' : ''}`}
        href={`#book?plan=${plan.id}&guests=${guests}`}
        arrow
        block
        tone="on-light"
        size="sm"
        aria-disabled={blocked}
        onClick={(event) => handleBook(event, { planId: plan.id, guests, blocked })}
      >
        {label}
      </Button>
    </div>
  )
}

function MobileCard({ plan, planIndex, guests }) {
  const blocked = isDarshanBlocked(plan, guests)
  const total = plan.price * guests
  const label = blocked
    ? 'Adjust guests to book'
    : `Book for ${guests} · ${rupees(total)}`
  const included = TIERS.filter((tier) => tier.items[planIndex])
  const hops = included.flatMap((tier) =>
    tier.items[planIndex].map((item) => ({
      item,
      tier: tier.name,
    })),
  )
  const missing = TIERS.filter((tier) => !tier.items[planIndex]).map((tier) => tier.name)

  return (
    <article className="packages__card">
      <PhotoStage
        plan={plan}
        hoverTier={null}
        overlay={
          <div className="packages__overlay">
            <h3>{plan.name}</h3>
            <p>
              <Clock size={13} strokeWidth={1.75} aria-hidden />
              {plan.duration} · {plan.timing}
            </p>
            <strong>{rupees(plan.price)}</strong>
          </div>
        }
      />

      <div className="packages__includes">
        <p className="packages__card-blurb">{plan.bestFor}</p>

        <div className="packages__pills">
          {included.map((tier) => (
            <span key={tier.name}>
              <span className="packages__ticon" aria-hidden>
                <TierIcon name={tier.icon} />
              </span>
              {tier.name}
            </span>
          ))}
        </div>

        <ul className="packages__hops">
          {hops.map((hop) => (
            <li key={`${hop.tier}-${hop.item}`}>
              <span className="packages__mark" aria-hidden>
                <Check size={10} strokeWidth={2.6} />
              </span>
              <strong>{hop.item}</strong>
            </li>
          ))}
        </ul>

        {missing.length ? (
          <p className="packages__missing">Not in this plan: {missing.join(', ')}</p>
        ) : null}
      </div>

      <div className="packages__card-foot">
        <div className="packages__card-total">
          <span>{rupees(plan.price)} / person</span>
          {blocked ? (
            <small className="packages__warn">Needs 2–6 guests per car</small>
          ) : (
            <small>
              {rupees(total)} for {guests} {guestWord(guests)}
            </small>
          )}
        </div>

        <Button
          className={`packages__cta${blocked ? ' is-blocked' : ''}`}
          href={`#book?plan=${plan.id}&guests=${guests}`}
          arrow
          block
          tone="on-light"
          size="sm"
          aria-disabled={blocked}
          onClick={(event) => handleBook(event, { planId: plan.id, guests, blocked })}
        >
          {label}
        </Button>
        <p className="packages__hint">
          {blocked
            ? 'Darshan runs by AC car for 2–6 guests'
            : 'Water sports chargeable. Darshan: 2–6 guests per car.'}
        </p>
      </div>
    </article>
  )
}

const TIER_ICONS = {
  pin: MapPin,
  wave: Waves,
  leaf: Leaf,
  temple: Landmark,
}

function TierIcon({ name }) {
  const Icon = TIER_ICONS[name] ?? MapPin
  return <Icon size={15} strokeWidth={1.75} />
}

export default Packages
