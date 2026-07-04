import { IconStar } from './icons.jsx'

// Read-only star rating with an accessible text label.
export default function Rating({ value, count, size = 15, showCount = true }) {
  const rounded = Math.round(value)
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} size={size} filled={i <= rounded} />
      ))}
      {showCount && (
        <span className="rating__count">
          {value.toFixed(1)}
          {count != null && ` (${count})`}
        </span>
      )}
    </span>
  )
}
