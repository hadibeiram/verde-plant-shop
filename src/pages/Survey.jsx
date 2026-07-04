import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext.jsx'
import { IconStar, IconCheck, IconChat } from '../components/icons.jsx'

// The "communicate" interactive process. Kept short and low-pressure so it
// never feels intrusive: one required tap (a star rating), everything else
// optional. The copy uses warm, positive, engaging language (interrogative +
// second person) to "engage in a connection" with the visitor.
const FEELINGS = ['Loved it', 'Pretty good', 'It was fine', 'A bit tricky', 'Frustrating']
const TOPICS = [
  'Finding plants',
  'The filters',
  'Product info',
  'Checkout',
  'The look & feel',
  'Care guides',
]

export default function Survey() {
  const { notify } = useToast()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [feeling, setFeeling] = useState('')
  const [topics, setTopics] = useState([])
  const [comment, setComment] = useState('')
  const [wouldReturn, setWouldReturn] = useState(null)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const toggleTopic = (t) =>
    setTopics((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))

  const submit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Just tap a star to send, that’s the only bit we need!')
      return
    }
    setDone(true)
    notify('Thank you for the feedback! 🌿')
  }

  if (done) {
    return (
      <div className="container page">
        <div className="survey card center" style={{ padding: '44px 28px' }}>
          <div className="confirm-mark">
            <IconCheck size={44} />
          </div>
          <h1>You’re a gem, thank you! 🌱</h1>
          <p className="lead" style={{ margin: '12px auto 8px' }}>
            Feedback like yours is exactly how Verdé grows. We read every single
            response, and yours will help the next shopper have an even better
            visit.
          </p>
          {rating >= 4 && (
            <p className="muted">
              So glad you enjoyed it, come back soon, your plants will miss you!
            </p>
          )}
          {rating > 0 && rating < 4 && (
            <p className="muted">
              Thanks for being honest. We’re rolling up our sleeves to make it
              better.
            </p>
          )}
          <div className="flex gap-3 wrap mt-5" style={{ justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn--lg">
              Back to the shop
            </Link>
            <Link to="/" className="btn btn--lg btn--ghost">
              Return home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container page">
      <div className="survey">
        <div className="center" style={{ marginBottom: 24 }}>
          <span
            className="feature__icon"
            style={{ background: 'var(--sage-100)' }}
            aria-hidden="true"
          >
            <IconChat size={26} />
          </span>
          {/* Engage in a connection: inviting, second-person, reassuring */}
          <h1>How was your visit?</h1>
          <p className="lead" style={{ margin: '12px auto 0' }}>
            We’d love to know what you thought. It takes about 30
            seconds, and there are no wrong answers, just tap what feels right.
          </p>
        </div>

        <form className="card" style={{ padding: 28 }} onSubmit={submit} noValidate>
          {/* 1, star rating (the only required field) */}
          <div className="field">
            <label id="rating-label">
              Overall, how would you rate your experience?
            </label>
            <div
              className="stars-input"
              role="radiogroup"
              aria-labelledby="rating-label"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  type="button"
                  key={i}
                  className={i <= (hover || rating) ? 'on' : ''}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => {
                    setRating(i)
                    setError('')
                  }}
                  role="radio"
                  aria-checked={rating === i}
                  aria-label={`${i} star${i > 1 ? 's' : ''}`}
                >
                  <IconStar size={40} filled={i <= (hover || rating)} />
                </button>
              ))}
            </div>
            {error && (
              <p className="field__error" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* 2, single-pick feeling */}
          <div className="field">
            <label>Which of these fits best?</label>
            <div className="pill-group" role="radiogroup" aria-label="Overall feeling">
              {FEELINGS.map((f) => (
                <button
                  type="button"
                  key={f}
                  className={`pill-choice ${feeling === f ? 'on' : ''}`}
                  onClick={() => setFeeling(feeling === f ? '' : f)}
                  role="radio"
                  aria-checked={feeling === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 3, multi-pick topics */}
          <div className="field">
            <label>What stood out to you? (Pick any that apply)</label>
            <div className="pill-group">
              {TOPICS.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`pill-choice ${topics.includes(t) ? 'on' : ''}`}
                  onClick={() => toggleTopic(t)}
                  aria-pressed={topics.includes(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 4, would return */}
          <div className="field">
            <label>Would you shop with us again?</label>
            <div className="pill-group" role="radiogroup" aria-label="Would you return">
              {['Absolutely', 'Maybe', 'Probably not'].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`pill-choice ${wouldReturn === r ? 'on' : ''}`}
                  onClick={() => setWouldReturn(wouldReturn === r ? null : r)}
                  role="radio"
                  aria-checked={wouldReturn === r}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 5, free text */}
          <div className="field">
            <label htmlFor="comment">
              Anything you’d like to tell us? (Optional)
            </label>
            <textarea
              id="comment"
              className="input"
              rows={3}
              maxLength={400}
              placeholder="A kind word, a bug you spotted, a plant you wish we sold…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="hint" style={{ marginTop: 6 }}>
              {comment.length}/400
            </p>
          </div>

          <button className="btn btn--lg btn--block" type="submit">
            Send my feedback
          </button>
          <p className="text-sm muted center mt-3">
            No email or sign-up needed. Your answers are anonymous.
          </p>
        </form>
      </div>
    </div>
  )
}
