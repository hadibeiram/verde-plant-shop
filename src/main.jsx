import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import './index.css'

// ---------------------------------------------------------------------------
// DOM hardening.
// Browser features and extensions (Google Translate, reader modes, AI
// helpers) rewrite text nodes under React's feet. React then calls
// removeChild/insertBefore on nodes that were silently moved, which throws
// NotFoundError and takes the whole app down. These guards make those calls
// tolerate a moved node instead of crashing. This is the standard fix for
// the well-known "Google Translate crashes React" failure.
// ---------------------------------------------------------------------------
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      return child
    }
    return originalRemoveChild.apply(this, arguments)
  }

  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null)
    }
    return originalInsertBefore.apply(this, arguments)
  }
}

// If anything still crashes a render, recover in place instead of leaving a
// blank page: show nothing for a beat, then remount the tree with a fresh
// key. Router state lives in the URL hash and the cart in localStorage, so a
// remount loses nothing. Only if crashes repeat back-to-back do we fall back
// to a single clean reload.
class RecoveryBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, generation: 0 }
    this.lastCrash = 0
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    const now = Date.now()
    if (now - this.lastCrash < 4000) {
      window.location.reload()
      return
    }
    this.lastCrash = now
    // Give React a clean commit with the fallback, then remount fresh.
    setTimeout(() => {
      this.setState((s) => ({ hasError: false, generation: s.generation + 1 }))
    }, 30)
  }

  render() {
    if (this.state.hasError) return null
    return (
      <React.Fragment key={this.state.generation}>
        {this.props.children}
      </React.Fragment>
    )
  }
}

// HashRouter (not BrowserRouter) so deep links and page refreshes work on any
// static host — GitHub Pages, Netlify, or the file system — without a server
// rewrite rule.
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoveryBoundary>
    <HashRouter>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </HashRouter>
  </RecoveryBoundary>
)
