import { Link } from 'react-router-dom'
import { IconLeaf } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="brand" style={{ color: '#fff', marginBottom: 12 }}>
              <IconLeaf size={22} /> Verdé
            </div>
            <p style={{ color: '#bcd0bd', maxWidth: '34ch' }}>
              We grow easy-going houseplants and send them your way with clear
              care advice, because every home deserves a little more green.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All plants</Link></li>
              <li><Link to="/shop">This week’s deals</Link></li>
              <li><Link to="/shop">Pet-safe picks</Link></li>
              <li><Link to="/shop">Beginner-friendly</Link></li>
            </ul>
          </div>

          <div>
            <h4>Help</h4>
            <ul>
              <li><Link to="/care">Care guides &amp; FAQ</Link></li>
              <li><Link to="/care">Shipping &amp; returns</Link></li>
              <li><Link to="/survey">Share your feedback</Link></li>
              <li><Link to="/cart">Your cart</Link></li>
            </ul>
          </div>

          <div>
            <h4>Our promise</h4>
            <ul>
              <li>30-day happy-plant guarantee</li>
              <li>Carbon-neutral delivery</li>
              <li>Plastic-free packaging</li>
              <li>Grown in Ontario 🇨🇦</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Verdé, Indoor Plant Co. A student prototype for SEG3125.</span>
          <span>Made with care in Ottawa.</span>
        </div>
      </div>
    </footer>
  )
}
