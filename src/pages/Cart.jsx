import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { money } from '../utils/format.js'
import { IconTrash, IconArrowLeft, IconTruck } from '../components/icons.jsx'

const FREE_SHIP = 60
const SHIP_COST = 9.95

export default function Cart() {
  const { items, setQty, removeItem, subtotal, savings, count } = useCart()
  const { notify } = useToast()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container page">
        <div className="empty" style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🪴</div>
          <h1>Your cart is empty</h1>
          <p style={{ margin: '10px 0 20px' }}>
            Nothing here yet, but your future jungle awaits. Let’s find
            something leafy.
          </p>
          <Link to="/shop" className="btn btn--lg">
            Start shopping
          </Link>
        </div>
      </div>
    )
  }

  const shipping = subtotal >= FREE_SHIP ? 0 : SHIP_COST
  const remaining = Math.max(0, FREE_SHIP - subtotal)
  const total = subtotal + shipping

  return (
    <div className="container page">
      <h1>Your cart</h1>
      <p className="muted mb-4">
        {count} {count === 1 ? 'item' : 'items'} ready to go.
      </p>

      <div className="checkout">
        <div>
          {/* Progress toward free shipping, gentle "incite to action" + status */}
          {remaining > 0 ? (
            <div className="notice mb-4">
              <IconTruck size={22} />
              <span>
                You’re <strong>{money(remaining)}</strong> away from{' '}
                <strong>free delivery</strong>. So close!
              </span>
            </div>
          ) : (
            <div className="notice mb-4" style={{ background: 'var(--success-soft)', borderColor: '#bfe2cb', color: 'var(--success)' }}>
              <IconTruck size={22} />
              <span>
                <strong>You’ve unlocked free delivery.</strong> Nice one! 🌿
              </span>
            </div>
          )}

          <div className="card" style={{ padding: '0 24px' }}>
            {items.map((item) => (
              <div className="cart-line" key={item.id}>
                <Link to={`/product/${item.slug}`} className="cart-line__thumb">
                  <ProductImage product={item} />
                </Link>
                <div>
                  <Link to={`/product/${item.slug}`}>
                    <h3 style={{ fontSize: '1.05rem' }}>{item.name}</h3>
                  </Link>
                  <p className="text-sm muted">{item.short}</p>
                  <div className="flex items-center gap-3 mt-3 wrap">
                    <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="icon-btn flex items-center gap-2"
                      onClick={() => {
                        removeItem(item.id)
                        notify(`${item.name} removed from your cart`, 'info')
                      }}
                    >
                      <IconTrash size={16} /> Remove
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="price__now">
                    {money((item.salePrice ?? item.price) * item.qty)}
                  </div>
                  {item.salePrice && (
                    <div className="price__was">{money(item.price * item.qty)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link to="/shop" className="link-underline flex items-center gap-2" style={{ display: 'inline-flex' }}>
              <IconArrowLeft /> Continue shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="summary" aria-label="Order summary">
          <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>Order summary</h2>
          <div className="summary__line">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          {savings > 0 && (
            <div className="summary__line" style={{ color: 'var(--terracotta)' }}>
              <span>Deal savings</span>
              <span>−{money(savings)}</span>
            </div>
          )}
          <div className="summary__line">
            <span>Delivery</span>
            <span>{shipping === 0 ? 'Free' : money(shipping)}</span>
          </div>
          <div className="summary__total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <button
            className="btn btn--block btn--lg mt-4"
            onClick={() => navigate('/checkout')}
          >
            Checkout securely
          </button>
          <p className="text-sm muted center mt-3">
            Taxes calculated at checkout. No account required.
          </p>
        </aside>
      </div>
    </div>
  )
}
