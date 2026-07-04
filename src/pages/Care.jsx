import { Link } from 'react-router-dom'
import { IconSun, IconDrop, IconPaw, IconTruck, IconShield } from '../components/icons.jsx'

const GUIDES = [
  {
    icon: <IconDrop size={24} />,
    title: 'Watering, without the guesswork',
    body: 'The number-one cause of plant trouble is love, specifically, too much water. Feel the top few centimetres of soil: if it’s dry, water thoroughly until it drains from the bottom; if it’s damp, wait. When in doubt, wait a day.',
  },
  {
    icon: <IconSun size={24} />,
    title: 'Finding the right light',
    body: 'Bright, indirect light means a spot near a window that never gets direct sun on the leaves. Low-light plants cope with north-facing rooms; sun-lovers want a south window. If growth gets leggy and pale, your plant is asking to move closer to the light.',
  },
  {
    icon: <IconPaw size={24} />,
    title: 'Living with pets',
    body: 'Curious cats and dogs? Use the “Pet-safe only” filter in the shop. Spider plants, calatheas, parlour palms and most herbs are non-toxic and playful-paw friendly. When in doubt, keep new plants up high for the first week.',
  },
]

const FAQS = [
  {
    q: 'How are the plants shipped?',
    a: 'Each plant is watered, wrapped in a recyclable paper sleeve and cushioned in a plastic-free box so it arrives standing tall. We ship Monday to Wednesday to avoid weekend warehouse stays.',
  },
  {
    q: 'How long will delivery take?',
    a: 'Most orders arrive within 3-5 business days across Canada. You’ll get a tracking link by email the moment your box leaves our greenhouse. Delivery is free on orders over $60.',
  },
  {
    q: 'What if my plant arrives damaged?',
    a: 'It shouldn’t, but if it does, send us a photo within 7 days and we’ll ship a replacement right away. Every plant is also covered by our 30-day happy-plant guarantee.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes. If you change your mind, unopened orders can be returned within 30 days for a full refund. Because plants are living things, opened returns are handled through our guarantee instead.',
  },
  {
    q: 'I’m brand new to plants. Where do I start?',
    a: 'Welcome! Turn on the “Beginner-friendly” filter for our most forgiving plants. A Snake Plant, Pothos or ZZ Plant is nearly impossible to get wrong. Each product page also has a plain-language care guide.',
  },
  {
    q: 'How do I contact a real human?',
    a: 'This is a student prototype, so there’s no live support desk, but on a real Verdé you’d reach us here, and every product page and this FAQ are designed to answer the common questions on their own.',
  },
]

export default function Care() {
  return (
    <div className="container page">
      <div className="section-head">
        <div>
          <span className="eyebrow">Help &amp; care</span>
          <h1>Care guides &amp; answers</h1>
          {/* Inform: calm, reassuring, jargon-free */}
          <p className="lead">
            Everything you need to keep your plants thriving, plus quick answers
            to the questions we hear most. No green thumb required.
          </p>
        </div>
      </div>

      {/* Care basics */}
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="features">
          {GUIDES.map((g) => (
            <div className="feature card" key={g.title} style={{ textAlign: 'left' }}>
              <div className="feature__icon" style={{ margin: 0 }}>
                {g.icon}
              </div>
              <h3 style={{ marginTop: 12 }}>{g.title}</h3>
              <p className="text-sm">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping / guarantee callouts */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          <div className="notice">
            <IconTruck size={22} />
            <span>
              <strong>Free delivery over $60.</strong> Carbon-neutral, in
              plastic-free packaging.
            </span>
          </div>
          <div className="notice">
            <IconShield size={22} />
            <span>
              <strong>30-day happy-plant guarantee.</strong> Not thriving? We’ll
              make it right.
            </span>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="section" style={{ paddingTop: 0 }}>
        <h2 className="mb-4">Frequently asked questions</h2>
        <div className="accordion">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="acc-body">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="section center" style={{ paddingTop: 0 }}>
        <div
          className="card"
          style={{
            background: 'var(--sage-100)',
            border: 'none',
            padding: 'clamp(1.5rem,4vw,2.5rem)',
          }}
        >
          <h2>Ready to grow?</h2>
          <p className="lead" style={{ margin: '10px auto 20px' }}>
            Put these tips to work. Your next favourite plant is waiting.
          </p>
          <Link to="/shop" className="btn btn--lg">
            Explore the collection
          </Link>
        </div>
      </section>
    </div>
  )
}
