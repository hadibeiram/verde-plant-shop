// Small, consistent inline-SVG icon set. Using one stroke width and style
// throughout keeps the visual language uniform (Consistency & Standards) and
// avoids any external icon-font dependency (works fully offline).

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconLeaf = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 15-9 0 8-3 14-8 16Z" />
    <path d="M4 20c3-6 6-8 9-9" />
  </svg>
)

export const IconCart = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 12.3a2 2 0 0 0 2 1.7h8.2a2 2 0 0 0 2-1.6L23 7H6" />
  </svg>
)

export const IconSearch = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
)

export const IconSun = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const IconDrop = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  </svg>
)

export const IconPaw = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6" cy="11" r="2" />
    <circle cx="10" cy="7" r="2" />
    <circle cx="14" cy="7" r="2" />
    <circle cx="18" cy="11" r="2" />
    <path d="M12 12c3 0 5 2.4 5 4.6 0 1.7-1.5 2.4-3 2.4-1 0-1.5-.4-2-.4s-1 .4-2 .4c-1.5 0-3-.7-3-2.4C7 14.4 9 12 12 12Z" />
  </svg>
)

export const IconTruck = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
)

export const IconShield = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconChat = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M4 5h16v11H9l-4 3v-3H4Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
)

export const IconCheck = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
)

export const IconChevron = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const IconArrowLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const IconStar = ({ size = 16, filled = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
)

export const IconTrash = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
)

export const IconInfo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
)

export const IconMenu = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconRuler = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M3 8h18v8H3z" />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
  </svg>
)
