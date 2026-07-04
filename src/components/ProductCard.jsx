import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import Rating from './Rating.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { money, discountPct } from '../utils/format.js'
import { IconPaw, IconSun } from './icons.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { notify } = useToast()

  const onAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    notify(`${product.name} is in your cart 🌱`)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} aria-label={`View details for ${product.name}`}>
        <div className="product-card__media">
          <div className="product-card__badges">
            {product.salePrice && (
              <span className="badge badge--deal">-{discountPct(product)}%</span>
            )}
            {product.isNew && <span className="badge badge--new">New</span>}
            {product.petFriendly && (
              <span className="badge badge--soft" title="Safe for cats and dogs">
                <IconPaw size={14} /> Pet-safe
              </span>
            )}
          </div>
          <ProductImage product={product} />
        </div>
      </Link>

      <div className="product-card__body">
        <Rating value={product.rating} count={product.reviews} />
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__meta">{product.short}</p>
        <p className="product-card__meta" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <IconSun size={15} /> {product.light.replace(' light', '')}
          </span>
          <span>·</span>
          <span>{product.care} care</span>
        </p>

        <div className="product-card__foot">
          <span className="price">
            <span className="price__now">{money(product.salePrice ?? product.price)}</span>
            {product.salePrice && <span className="price__was">{money(product.price)}</span>}
          </span>
          <button className="btn btn--sm" onClick={onAdd}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
