import { IconCheck } from './icons.jsx'

// Visual progress tracker for the "follow instructions" buying process.
// It answers three questions at a glance (Visibility of System Status):
//   • what have I already done?  → steps with a check
//   • where am I now?            → the highlighted step
//   • what is left?              → the dimmed steps ahead
export default function Stepper({ steps, current }) {
  return (
    <ol className="stepper" aria-label="Checkout progress">
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'upcoming'
        return (
          <li
            className={`step ${state}`}
            key={s.key}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className="step__dot">
              {state === 'done' ? <IconCheck size={20} /> : i + 1}
            </span>
            <span className="step__label">{s.label}</span>
            <span className="step__sub">{s.sub}</span>
          </li>
        )
      })}
    </ol>
  )
}
