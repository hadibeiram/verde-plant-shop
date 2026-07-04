import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { money } from '../utils/format.js'
import {
  IconArrowLeft,
  IconChevron,
  IconInfo,
  IconShield,
  IconCheck,
} from '../components/icons.jsx'

const STEPS = [
  { key: 'info', label: 'Your details', sub: 'Contact & address' },
  { key: 'payment', label: 'Payment', sub: 'Card information' },
  { key: 'review', label: 'Review', sub: 'Check & confirm' },
  { key: 'done', label: 'Confirmation', sub: 'All done!' },
]

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
  'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon',
]

const FREE_SHIP = 60
const SHIP_COST = 9.95
const TAX_RATE = 0.13 // Ontario HST

// ---- input formatters (Error Prevention: guide input into a valid shape) ----
const formatCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}
const formatPostal = (v) => {
  const s = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
  return s.length > 3 ? `${s.slice(0, 3)} ${s.slice(3)}` : s
}

export default function Checkout() {
  const { items, subtotal, savings, clearCart } = useCart()
  const { notify } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [order, setOrder] = useState(null)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', province: '', postal: '', notes: '',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  })
  const [errors, setErrors] = useState({})

  const shipping = subtotal >= FREE_SHIP ? 0 : SHIP_COST
  const tax = (subtotal + shipping) * TAX_RATE
  const total = subtotal + shipping + tax

  // If the cart empties before the order is placed, there is nothing to buy.
  if (items.length === 0 && step < 3) {
    return (
      <div className="container page">
        <div className="empty" style={{ maxWidth: 560, margin: '0 auto' }}>
          <h1>There’s nothing to check out yet</h1>
          <p style={{ margin: '10px 0 20px' }}>
            Add a plant or two to your cart and we’ll get you to the checkout.
          </p>
          <Link to="/shop" className="btn btn--lg">
            Browse plants
          </Link>
        </div>
      </div>
    )
  }

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    // Clear an error the moment the user starts fixing it (Error Recovery).
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e))
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = 'Please tell us who to address the plants to.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = 'Enter a valid email so we can send your confirmation.'
      if (!form.address.trim()) e.address = 'A street address is needed for delivery.'
      if (!form.city.trim()) e.city = 'Which city are we delivering to?'
      if (!form.province) e.province = 'Please choose a province.'
      if (!/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(form.postal))
        e.postal = 'Postal codes look like “K1N 6N5”.'
    }
    if (step === 1) {
      if (!form.cardName.trim()) e.cardName = 'Enter the name printed on the card.'
      if (form.cardNumber.replace(/\s/g, '').length !== 16)
        e.cardNumber = 'A card number has 16 digits.'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        e.expiry = 'Use MM/YY.'
      } else {
        const [mm, yy] = form.expiry.split('/').map(Number)
        const now = new Date()
        const curY = now.getFullYear() % 100
        const curM = now.getMonth() + 1
        if (mm < 1 || mm > 12) e.expiry = 'That month doesn’t exist.'
        else if (yy < curY || (yy === curY && mm < curM))
          e.expiry = 'This card looks expired.'
      }
      if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = '3 or 4 digits, on the back of the card.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) {
      notify('Please check the highlighted fields.', 'info')
      return
    }
    setStep((s) => s + 1)
  }
  const back = () => setStep((s) => Math.max(0, s - 1))

  const placeOrder = () => {
    const num =
      'VRD-' +
      Math.floor(100000 + Math.random() * 900000).toString()
    const eta = new Date(Date.now() + 4 * 864e5).toLocaleDateString('en-CA', {
      weekday: 'long', month: 'long', day: 'numeric',
    })
    setOrder({ num, eta, email: form.email, name: form.fullName, total })
    clearCart()
    setStep(3)
    notify('Order placed, your plants are on their way! 🌿')
  }

  const field = (name, label, opts = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {opts.hint && <p className="hint">{opts.hint}</p>}
      <input
        id={name}
        className={`input ${errors[name] ? 'input--error' : ''}`}
        type={opts.type || 'text'}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={form[name]}
        onChange={(e) =>
          set(name, opts.format ? opts.format(e.target.value) : e.target.value)
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-err` : undefined}
      />
      {errors[name] && (
        <p className="field__error" id={`${name}-err`} role="alert">
          <IconInfo size={15} /> {errors[name]}
        </p>
      )}
    </div>
  )

  // -------------------------- Confirmation step -------------------------
  if (step === 3 && order) {
    return (
      <div className="container page">
        <Stepper steps={STEPS} current={3} />
        <div className="card center" style={{ maxWidth: 640, margin: '0 auto', padding: '40px 28px' }}>
          <div className="confirm-mark">
            <IconCheck size={44} />
          </div>
          {/* Engage + inform: celebratory but clear about what happens next */}
          <h1>Thank you, {order.name.split(' ')[0]}! 🌿</h1>
          <p className="lead" style={{ margin: '12px auto 20px' }}>
            Your order is confirmed and our growers are already picking out your
            plants. A receipt is on its way to <strong>{order.email}</strong>.
          </p>
          <div className="card" style={{ background: 'var(--sage-100)', padding: 20, textAlign: 'left', border: 'none' }}>
            <div className="summary__line"><span>Order number</span><strong>{order.num}</strong></div>
            <div className="summary__line"><span>Estimated delivery</span><strong>{order.eta}</strong></div>
            <div className="summary__line"><span>Total paid</span><strong>{money(order.total)}</strong></div>
          </div>

          <div className="notice mt-4" style={{ textAlign: 'left' }}>
            <IconInfo size={20} />
            <span>
              You’ll get a tracking link as soon as your box ships. Keep an eye
              on your inbox!
            </span>
          </div>

          {/* Bridge into the "communicate" survey process */}
          <div className="mt-5">
            <p style={{ marginBottom: 14 }}>
              How was your shopping experience? We read every response.
            </p>
            <div className="flex gap-3 wrap" style={{ justifyContent: 'center' }}>
              <Link to="/survey" className="btn btn--lg btn--accent">
                Share your feedback
              </Link>
              <Link to="/shop" className="btn btn--lg btn--ghost">
                Keep shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ----------------------- Info / Payment / Review ----------------------
  return (
    <div className="container page">
      <h1 className="mb-4">Checkout</h1>
      <Stepper steps={STEPS} current={step} />

      <div className="checkout">
        <div>
          {/* Step 0, details */}
          {step === 0 && (
            <section className="card" style={{ padding: 28 }}>
              <h2 style={{ marginBottom: 4 }}>Where should your plants go?</h2>
              <p className="muted mb-4">
                We only use this to deliver your order and send your receipt.
              </p>
              {field('fullName', 'Full name', { autoComplete: 'name', placeholder: 'Alex Green' })}
              <div className="row">
                {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
                {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel', placeholder: 'For delivery updates' })}
              </div>
              {field('address', 'Street address', { autoComplete: 'address-line1', placeholder: '75 Laurier Ave E' })}
              <div className="row">
                {field('city', 'City', { autoComplete: 'address-level2', placeholder: 'Ottawa' })}
                <div className="field">
                  <label htmlFor="province">Province</label>
                  <select
                    id="province"
                    className={`input ${errors.province ? 'input--error' : ''}`}
                    value={form.province}
                    onChange={(e) => set('province', e.target.value)}
                    aria-invalid={!!errors.province}
                  >
                    <option value="">Choose…</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="field__error" role="alert">
                      <IconInfo size={15} /> {errors.province}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                {field('postal', 'Postal code', { format: formatPostal, placeholder: 'K1N 6N5', autoComplete: 'postal-code' })}
                <div />
              </div>
              <div className="field">
                <label htmlFor="notes">Delivery notes (optional)</label>
                <textarea
                  id="notes"
                  className="input"
                  rows={2}
                  placeholder="Leave at the side door, buzz 204…"
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                />
              </div>
            </section>
          )}

          {/* Step 1, payment */}
          {step === 1 && (
            <section className="card" style={{ padding: 28 }}>
              <h2 style={{ marginBottom: 4 }}>Payment details</h2>
              <div className="notice mb-4">
                <IconShield size={20} />
                <span>
                  This is a class prototype, please don’t enter a real card.
                  Any 16-digit number will do.
                </span>
              </div>
              {field('cardName', 'Name on card', { autoComplete: 'cc-name', placeholder: 'Alex Green' })}
              {field('cardNumber', 'Card number', {
                format: formatCard,
                inputMode: 'numeric',
                autoComplete: 'cc-number',
                placeholder: '4242 4242 4242 4242',
              })}
              <div className="row">
                {field('expiry', 'Expiry (MM/YY)', {
                  format: formatExpiry,
                  inputMode: 'numeric',
                  autoComplete: 'cc-exp',
                  placeholder: '08/28',
                })}
                {field('cvc', 'CVC', {
                  inputMode: 'numeric',
                  autoComplete: 'cc-csc',
                  placeholder: '123',
                  format: (v) => v.replace(/\D/g, '').slice(0, 4),
                })}
              </div>
            </section>
          )}

          {/* Step 2, review */}
          {step === 2 && (
            <section className="card" style={{ padding: 28 }}>
              <h2 style={{ marginBottom: 16 }}>Review your order</h2>

              <div className="flex justify-between items-center mb-4">
                <h3>Delivering to</h3>
                <button className="link-underline" onClick={() => setStep(0)}>
                  Edit
                </button>
              </div>
              <p className="muted" style={{ marginBottom: 20 }}>
                {form.fullName}
                <br />
                {form.address}, {form.city}, {form.province} {form.postal}
                <br />
                {form.email}
                {form.notes && (
                  <>
                    <br />
                    <em>Note: {form.notes}</em>
                  </>
                )}
              </p>

              <div className="flex justify-between items-center mb-4">
                <h3>Paying with</h3>
                <button className="link-underline" onClick={() => setStep(1)}>
                  Edit
                </button>
              </div>
              <p className="muted" style={{ marginBottom: 20 }}>
                Card ending in {form.cardNumber.replace(/\s/g, '').slice(-4)} ·
                expires {form.expiry}
              </p>

              <h3 style={{ marginBottom: 12 }}>Your plants</h3>
              {items.map((i) => (
                <div className="cart-line" key={i.id} style={{ gridTemplateColumns: '64px 1fr auto' }}>
                  <div className="cart-line__thumb" style={{ width: 64, height: 64 }}>
                    <ProductImage product={i} />
                  </div>
                  <div>
                    <strong>{i.name}</strong>
                    <div className="text-sm muted">Qty {i.qty}</div>
                  </div>
                  <div className="price__now" style={{ fontSize: '1.05rem' }}>
                    {money((i.salePrice ?? i.price) * i.qty)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Navigation, User Control & Freedom (always a way back / out) */}
          <div className="flex justify-between items-center mt-5 wrap gap-3">
            {step === 0 ? (
              <Link to="/cart" className="btn btn--ghost flex items-center gap-2">
                <IconArrowLeft /> Back to cart
              </Link>
            ) : (
              <button className="btn btn--ghost flex items-center gap-2" onClick={back}>
                <IconArrowLeft /> Back
              </button>
            )}

            {step < 2 ? (
              <button className="btn btn--lg" onClick={next}>
                Continue <IconChevron />
              </button>
            ) : (
              <button className="btn btn--lg btn--accent" onClick={placeOrder}>
                Place order · {money(total)}
              </button>
            )}
          </div>
        </div>

        {/* Persistent order summary, Recognition rather than Recall */}
        <aside className="summary" aria-label="Order summary">
          <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>Summary</h2>
          <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
            {items.map((i) => (
              <div className="summary__line" key={i.id}>
                <span>
                  {i.qty} × {i.name}
                </span>
                <span>{money((i.salePrice ?? i.price) * i.qty)}</span>
              </div>
            ))}
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
          <div className="summary__line">
            <span>HST (13%)</span>
            <span>{money(tax)}</span>
          </div>
          <div className="summary__total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <p className="text-sm muted center mt-3 flex items-center gap-2" style={{ justifyContent: 'center' }}>
            <IconShield size={16} /> Encrypted &amp; secure checkout
          </p>
        </aside>
      </div>
    </div>
  )
}
