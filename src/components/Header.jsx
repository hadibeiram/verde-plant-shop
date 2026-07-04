import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { IconCart, IconLeaf, IconMenu } from './icons.jsx'

// Persistent top navigation. The cart pill shows a live item count so the
// user always knows the state of their basket (Visibility of System Status),
// and the same nav appears on every page (Consistency & Standards).
export default function Header() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const close = () => setOpen(false)

  return (
    <header className="header">
      {/* Promotional strip, an "Incite to Action" touchpoint on every page */}
      <div className="promo-strip">
        🌿 Spring Refresh: <strong>20% off</strong> when you buy 3+ plants, this
        week only!
        <Link to="/shop" onClick={close}>
          Shop the deals
        </Link>
      </div>

      <div className="container header__bar">
        <Link to="/" className="brand" onClick={close} aria-label="Verdé home">
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'var(--forest)',
              color: '#cbe0c9',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <IconLeaf size={20} />
          </span>
          Verdé
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={close}>
            Shop
          </NavLink>
          <NavLink to="/care" onClick={close}>
            Care Guides
          </NavLink>
          <NavLink to="/survey" onClick={close}>
            Share Feedback
          </NavLink>
        </nav>

        <div className="header__actions">
          <button
            className="cart-btn"
            onClick={() => {
              close()
              navigate('/cart')
            }}
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <IconCart size={20} />
            <span className="cart-btn__label">Cart</span>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <button
            className="cart-btn menu-toggle"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <IconMenu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
