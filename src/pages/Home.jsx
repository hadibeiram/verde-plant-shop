import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { products, getDeals, getCategoryCounts } from '../data/products.js'
import {
  IconTruck,
  IconShield,
  IconPaw,
  IconChat,
  IconChevron,
} from '../components/icons.jsx'

// Category tile background colours (Gestalt: similarity keeps the set cohesive)
const CAT_BG = {
  Foliage: 'linear-gradient(160deg,#2f5d3f,#4a7c59)',
  Flowering: 'linear-gradient(160deg,#8a4a63,#c15b7c)',
  'Succulent & Cactus': 'linear-gradient(160deg,#5c7a3f,#8bbf6a)',
  'Trees & Palms': 'linear-gradient(160deg,#1f4534,#3c7150)',
  'Trailing & Hanging': 'linear-gradient(160deg,#3a6a5a,#6aa58f)',
  'Herbs & Edible': 'linear-gradient(160deg,#5a6a2f,#9bb84a)',
}

export default function Home() {
  const deals = getDeals().slice(0, 4)
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)
  const cats = getCategoryCounts()
  const heroPlant = products.find((p) => p.slug === 'monstera-deliciosa')

  return (
    <div className="page">
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="container">
        <div className="hero">
          <div>
            <span className="badge" style={{ marginBottom: 16 }}>
              🌱 Fresh arrivals every week
            </span>
            {/* Writer/Reader model: warm, knowledgeable "we" speaking to "you" */}
            <h1>Plants that make your home feel alive.</h1>
            <p className="lead" style={{ margin: '16px 0 26px' }}>
              We hand-pick easy-going houseplants, pack them with love, and send
              them to your door with care advice you’ll actually use. Let’s find
              the one that fits your space.
            </p>
            <div className="flex gap-3 wrap">
              <Link to="/shop" className="btn btn--lg">
                Shop all plants <IconChevron />
              </Link>
              <Link to="/shop?deal=1" className="btn btn--lg btn--ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}>
                See this week’s deals
              </Link>
            </div>
            <div className="flex gap-4 wrap" style={{ marginTop: 28, color: '#cfe0cf' }}>
              <span className="flex items-center gap-2 text-sm">
                <IconTruck size={20} /> Free delivery over $60
              </span>
              <span className="flex items-center gap-2 text-sm">
                <IconShield size={20} /> 30-day guarantee
              </span>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__blob">
              <div
                style={{
                  width: '78%',
                  maxWidth: 320,
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '6px solid rgba(255,255,255,.14)',
                }}
              >
                <ProductImage product={heroPlant} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Value props -------------------------- */}
      <section className="container section">
        <div className="features">
          {[
            { icon: <IconTruck size={26} />, t: 'Delivered with care', d: 'Cushioned, plastic-free boxes so your plant arrives happy.' },
            { icon: <IconShield size={26} />, t: '30-day guarantee', d: 'If it doesn’t thrive in the first month, we’ll replace it.' },
            { icon: <IconPaw size={26} />, t: 'Pet-safe options', d: 'Filter for plants that are safe around cats and dogs.' },
            { icon: <IconChat size={26} />, t: 'Real care advice', d: 'Clear, jargon-free guidance for every plant.' },
          ].map((f) => (
            <div className="feature card" key={f.t}>
              <div className="feature__icon">{f.icon}</div>
              <h3>{f.t}</h3>
              <p className="text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ Deals (Incite to Action) --------------- */}
      <section className="container section">
        <div
          className="card"
          style={{
            background: 'var(--terracotta-soft)',
            border: '1px solid #ecc9b6',
            borderRadius: 'var(--r-lg)',
            padding: 'clamp(1.5rem,4vw,2.5rem)',
          }}
        >
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--terracotta-dark)' }}>
                Limited time
              </span>
              {/* Incite to action: exclamatory, promotional, urgency */}
              <h2>Spring deals are blooming, save up to 25%!</h2>
              <p className="lead">
                These prices won’t last long. Treat yourself (or a friend) before
                they’re gone!
              </p>
            </div>
            <Link to="/shop?deal=1" className="btn btn--accent">
              Shop all deals <IconChevron />
            </Link>
          </div>
          <div className="grid grid--products">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Categories --------------------------- */}
      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Browse by type</span>
            <h2>Shop by category</h2>
          </div>
          <Link to="/shop" className="link-underline">
            View everything
          </Link>
        </div>
        <div className="cat-grid">
          {cats.map((c) => (
            <Link
              key={c.name}
              to={`/shop?cat=${encodeURIComponent(c.name)}`}
              className="cat-tile"
              style={{ background: CAT_BG[c.name] }}
            >
              <span>
                {c.name}
                <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, opacity: 0.85 }}>
                  {c.count} plants
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------- Best sellers ------------------------- */}
      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Loved by our community</span>
            <h2>This month’s favourites</h2>
          </div>
          <Link to="/shop?sort=rating" className="link-underline">
            See all
          </Link>
        </div>
        <div className="grid grid--products">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ---------------------- Engage (survey teaser) -------------------- */}
      <section className="container section">
        <div
          className="card center"
          style={{
            background: 'linear-gradient(160deg,var(--forest),var(--green-600))',
            color: '#fff',
            borderRadius: 'var(--r-lg)',
            padding: 'clamp(2rem,5vw,3.5rem)',
            border: 'none',
          }}
        >
          {/* Engage in a connection: warm, inviting, low-pressure */}
          <h2 style={{ color: '#fff' }}>We’d love to hear from you 🌿</h2>
          <p className="lead" style={{ color: '#d7e7d7', margin: '14px auto 26px' }}>
            Your thoughts help us grow. Tell us how your visit went, it takes
            about 30 seconds, and every answer shapes what we build next.
          </p>
          <Link to="/survey" className="btn btn--lg btn--accent">
            Share your feedback
          </Link>
        </div>
      </section>
    </div>
  )
}
