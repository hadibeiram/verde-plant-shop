import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Survey from './pages/Survey.jsx'
import Care from './pages/Care.jsx'

// Reset scroll on every route change so a new page always starts at the top.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function NotFound() {
  return (
    <div className="container page center">
      <h1>This page has wandered off to be repotted.</h1>
      <p className="lead" style={{ margin: '16px auto 28px' }}>
        We couldn’t find what you were looking for, let’s get you back to the
        greenery.
      </p>
      <Link className="btn btn--lg" to="/shop">
        Back to the shop
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/care" element={<Care />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
