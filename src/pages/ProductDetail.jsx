import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBySlug, products } from '../data/products.js'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Rating from '../components/Rating.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { money, discountPct, careBlurb } from '../utils/format.js'
import {
  IconSun,
  IconDrop,
  IconPaw,
  IconRuler,
  IconCheck,
  IconArrowLeft,
  IconInfo,
} from '../components/icons.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getBySlug(slug)
  const { addItem } = useCart()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container page center">
        <h1>We couldn’t find that plant.</h1>
        <Link className="btn mt-4" to="/shop">
          Back to the shop
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const add = () => {
    addItem(product, qty)
    notify(`${qty} × ${product.name} added to your cart 🌱`)
  }

  const specs = [
    { icon: <IconSun size={18} />, k: 'Light', v: product.light },
    { icon: <IconDrop size={18} />, k: 'Care level', v: `${product.care} · ${careBlurb[product.care]}` },
    { icon: <IconRuler size={18} />, k: 'Mature height', v: product.height },
    { icon: <IconPaw size={18} />, k: 'Pet-safe', v: product.petFriendly ? 'Yes, safe for cats & dogs' : 'No, keep away from pets' },
  ]

  return (
    <div className="container page">
      {/* Breadcrumb, Recognition rather than Recall (where am I / how to go back) */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--forest)' }}>{product.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp__media">
          <div className="product-card__badges">
            {product.salePrice && (
              <span className="badge badge--deal">Save {discountPct(product)}%</span>
            )}
            {product.isNew && <span className="badge badge--new">New</span>}
          </div>
          <ProductImage product={product} />
        </div>

        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            {product.category}
          </p>
          <h1 style={{ marginBottom: 8 }}>{product.name}</h1>
          <p className="muted" style={{ fontStyle: 'italic', marginBottom: 12 }}>
            {product.botanical}
          </p>
          <Rating value={product.rating} count={product.reviews} size={18} />

          <div className="flex items-center gap-3" style={{ margin: '18px 0' }}>
            <span className="price__now" style={{ fontSize: '2rem' }}>
              {money(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <>
                <span className="price__was" style={{ fontSize: '1.1rem' }}>
                  {money(product.price)}
                </span>
                <span className="badge badge--deal">
                  You save {money(product.price - product.salePrice)}
                </span>
              </>
            )}
          </div>

          {/* Inform: clear, honest description of the plant's characteristics */}
          <p style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
            {product.description}
          </p>

          <div className="specs">
            {specs.map((s) => (
              <div className="spec" key={s.k}>
                <div className="spec__k flex items-center gap-2">{s.icon} {s.k}</div>
                <div className="spec__v">{s.v}</div>
              </div>
            ))}
          </div>

          {/* Add-to-cart with quantity, start of the buying process */}
          <div className="flex items-center gap-3 wrap" style={{ margin: '8px 0 18px' }}>
            <div className="qty" role="group" aria-label="Quantity">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="btn btn--lg" onClick={add}>
              Add to cart · {money((product.salePrice ?? product.price) * qty)}
            </button>
            <button
              className="btn btn--lg btn--accent"
              onClick={() => {
                add()
                navigate('/cart')
              }}
            >
              Buy it now
            </button>
          </div>

          <div className="notice">
            <IconInfo size={20} />
            <span>
              Free carbon-neutral delivery on orders over $60. Not thriving in 30
              days? We’ll replace it, no questions asked.
            </span>
          </div>

          {/* Care guide, the "Inform" purpose in its most useful form */}
          <h3 style={{ marginTop: 28, marginBottom: 4 }}>How to keep it happy</h3>
          <ul className="care-list">
            {[
              ['Water', product.careNotes.water],
              ['Light', product.careNotes.light],
              ['Humidity', product.careNotes.humidity],
              ['Pro tip', product.careNotes.tip],
            ].map(([k, v]) => (
              <li key={k}>
                <IconCheck size={18} />
                <span>
                  <strong style={{ color: 'var(--forest)' }}>{k}:</strong> {v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Pairs well with</h2>
            <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} className="link-underline">
              More {product.category.toLowerCase()}
            </Link>
          </div>
          <div className="grid grid--products">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-5">
        <Link to="/shop" className="link-underline flex items-center gap-2" style={{ display: 'inline-flex' }}>
          <IconArrowLeft /> Back to all plants
        </Link>
      </div>
    </div>
  )
}
