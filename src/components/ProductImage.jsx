// ============================================================================
//  ProductImage, generative botanical illustration
//  Rather than depend on external stock photos (which can fail to load and
//  break the "TA can test unassisted" requirement), every product is drawn as
//  a self-contained SVG. A shared pot + soft backdrop keeps the whole catalogue
//  visually consistent (Gestalt: Similarity), while `plantType` and `leafHue`
//  give each plant its own recognisable silhouette and colour.
// ============================================================================

const POTS = {
  terracotta: { body: '#c9764e', rim: '#b5623c', shade: '#a9542f' },
  stone: { body: '#b8ae9c', rim: '#a89d89', shade: '#988d79' },
  sage: { body: '#9bb88f', rim: '#88a97c', shade: '#79996d' },
  white: { body: '#eef0ea', rim: '#dfe2d9', shade: '#cfd3c8' },
  charcoal: { body: '#454f48', rim: '#39423c', shade: '#2e352f' },
}

const leaf = (hue, l = 38, s = 42) => `hsl(${hue}, ${s}%, ${l}%)`

function Pot({ color = 'terracotta' }) {
  const c = POTS[color] || POTS.terracotta
  return (
    <g>
      {/* soil */}
      <ellipse cx="200" cy="292" rx="52" ry="12" fill="#5b4632" />
      {/* pot body (tapered) */}
      <path d="M150 292 L160 372 H240 L250 292 Z" fill={c.body} />
      <path d="M205 292 L240 292 L232 372 H205 Z" fill={c.shade} opacity="0.35" />
      {/* rim */}
      <path d="M144 286 H256 L250 300 H150 Z" fill={c.rim} />
    </g>
  )
}

/* ----------------------------- Plant shapes ----------------------------- */

function Monstera({ hue }) {
  const a = leaf(hue, 34)
  const b = leaf(hue, 46)
  // Big fenestrated leaves radiating from the pot
  const Leaf = ({ x, y, r, s, fill }) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path
        d="M0 0 C-38 -20 -46 -70 -30 -104 C-14 -96 -6 -70 0 -60 C6 -70 14 -96 30 -104 C46 -70 38 -20 0 0 Z"
        fill={fill}
      />
      {/* splits */}
      <path d="M-16 -30 L-6 -44 M-18 -58 L-8 -66 M16 -30 L6 -44 M18 -58 L8 -66"
        stroke="#ffffff" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 -8 L0 -92" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" />
    </g>
  )
  return (
    <g>
      <path d="M200 288 V196" stroke={leaf(hue, 30)} strokeWidth="7" strokeLinecap="round" />
      <Leaf x={200} y={286} r={-34} s={1} fill={a} />
      <Leaf x={200} y={286} r={34} s={1} fill={a} />
      <Leaf x={200} y={286} r={-6} s={1.18} fill={b} />
    </g>
  )
}

function SnakePlant({ hue }) {
  const a = leaf(hue, 32)
  const b = leaf(hue, 44)
  const edge = leaf(60, 55, 60)
  const Blade = ({ x, r, h, fill }) => (
    <g transform={`translate(${x} 288) rotate(${r})`}>
      <path d={`M0 0 C-13 -${h * 0.5} -9 -${h} 0 -${h + 8} C9 -${h} 13 -${h * 0.5} 0 0 Z`} fill={fill} />
      <path d={`M0 -6 L0 -${h}`} stroke={edge} strokeWidth="3" opacity="0.5" />
    </g>
  )
  return (
    <g>
      <Blade x={182} r={-16} h={150} fill={a} />
      <Blade x={218} r={16} h={150} fill={a} />
      <Blade x={192} r={-6} h={186} fill={b} />
      <Blade x={208} r={6} h={172} fill={b} />
      <Blade x={200} r={0} h={200} fill={a} />
    </g>
  )
}

function Trailing({ hue }) {
  const a = leaf(hue, 40)
  const b = leaf(hue, 50)
  const Vine = ({ x, dir, len }) => {
    const hearts = []
    for (let i = 1; i <= len; i++) {
      const yy = 250 + i * 18
      const xx = x + dir * Math.sin(i * 0.9) * 16
      hearts.push(
        <path
          key={i}
          d={`M${xx} ${yy} c -6 -8 -18 -3 -18 6 c 0 8 12 14 18 20 c 6 -6 18 -12 18 -20 c 0 -9 -12 -14 -18 -6 Z`}
          fill={i % 2 ? a : b}
          transform={`scale(0.5)`}
          style={{ transformOrigin: `${xx}px ${yy}px` }}
        />
      )
    }
    return (
      <g>
        <path d={`M${x} 250 q ${dir * 20} 60 ${dir * 6} 130`} stroke={leaf(hue, 34)} strokeWidth="3" fill="none" />
        {hearts}
      </g>
    )
  }
  return (
    <g>
      {/* crown mound */}
      <ellipse cx="200" cy="256" rx="46" ry="26" fill={a} />
      <ellipse cx="186" cy="248" rx="24" ry="16" fill={b} />
      <Vine x={172} dir={-1} len={6} />
      <Vine x={200} dir={1} len={7} />
      <Vine x={228} dir={1} len={5} />
    </g>
  )
}

function Tree({ hue }) {
  const a = leaf(hue, 32)
  const b = leaf(hue, 44)
  const Big = ({ x, y, r, s, fill }) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C-34 -8 -40 -60 0 -96 C40 -60 34 -8 0 0 Z" fill={fill} />
      <path d="M0 -6 L0 -88" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="3" />
    </g>
  )
  return (
    <g>
      <path d="M200 288 C196 240 204 210 200 170" stroke="#6b513a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <Big x={200} y={210} r={-42} s={0.8} fill={a} />
      <Big x={200} y={196} r={42} s={0.8} fill={a} />
      <Big x={200} y={176} r={-14} s={0.95} fill={b} />
      <Big x={200} y={168} r={16} s={0.9} fill={b} />
      <Big x={200} y={150} r={0} s={1} fill={a} />
    </g>
  )
}

function Palm({ hue }) {
  const a = leaf(hue, 34)
  const b = leaf(hue, 46)
  const Frond = ({ r, len, fill }) => {
    const ticks = []
    for (let i = 1; i < 9; i++) {
      const t = i / 9
      ticks.push(
        <path key={`l${i}`} d={`M0 -${len * t} l -${16 * (1 - t) + 6} -${10}`} stroke={fill} strokeWidth="4" strokeLinecap="round" />
      )
      ticks.push(
        <path key={`r${i}`} d={`M0 -${len * t} l ${16 * (1 - t) + 6} -${10}`} stroke={fill} strokeWidth="4" strokeLinecap="round" />
      )
    }
    return (
      <g transform={`translate(200 286) rotate(${r})`}>
        <path d={`M0 0 Q4 -${len * 0.6} 0 -${len}`} stroke={fill} strokeWidth="4" fill="none" />
        {ticks}
      </g>
    )
  }
  return (
    <g>
      <Frond r={-40} len={150} fill={a} />
      <Frond r={-18} len={186} fill={b} />
      <Frond r={0} len={200} fill={a} />
      <Frond r={18} len={186} fill={b} />
      <Frond r={40} len={150} fill={a} />
    </g>
  )
}

function Succulent({ hue }) {
  const a = leaf(hue, 40, 30)
  const b = leaf(hue, 52, 32)
  const c = leaf(hue, 62, 34)
  const petals = (r, fill, ry) => {
    const arr = []
    for (let i = 0; i < 8; i++) {
      arr.push(
        <ellipse key={i} cx="200" cy={266 - r} rx="16" ry={ry} fill={fill}
          transform={`rotate(${i * 45} 200 266)`} />
      )
    }
    return arr
  }
  return (
    <g>
      {petals(0, a, 34)}
      {petals(10, b, 26)}
      {petals(18, c, 16)}
      <circle cx="200" cy="266" r="8" fill={leaf(hue, 70, 36)} />
    </g>
  )
}

function Cactus({ hue }) {
  const a = leaf(hue, 40, 30)
  const spines = []
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2
    spines.push(
      <line key={i} x1={200 + Math.cos(ang) * 44} y1={252 + Math.sin(ang) * 44}
        x2={200 + Math.cos(ang) * 54} y2={252 + Math.sin(ang) * 54}
        stroke="#d9a441" strokeWidth="2.5" strokeLinecap="round" />
    )
  }
  return (
    <g>
      <circle cx="200" cy="252" r="48" fill={a} />
      {[...Array(7)].map((_, i) => (
        <path key={i} d={`M${200 - 42 + i * 14} 210 q 0 42 0 84`} stroke={leaf(hue, 30, 30)} strokeWidth="3" fill="none" opacity="0.5" />
      ))}
      {spines}
      <path d="M186 236 q 6 -8 14 0" stroke="#fff" strokeOpacity="0.5" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Flowering({ hue }) {
  const g = leaf(140, 36)
  const g2 = leaf(140, 48)
  const Flower = ({ x, y, s }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[...Array(5)].map((_, i) => (
        <ellipse key={i} cx="0" cy="-14" rx="9" ry="15" fill={leaf(hue, 55, 55)} transform={`rotate(${i * 72})`} />
      ))}
      <circle r="7" fill={leaf(45, 60, 70)} />
    </g>
  )
  return (
    <g>
      {/* leaves */}
      <path d="M200 288 C150 270 150 214 176 196 C206 214 214 258 200 288 Z" fill={g} />
      <path d="M200 288 C250 270 250 214 224 196 C194 214 186 258 200 288 Z" fill={g2} />
      {/* stems */}
      <path d="M200 250 L182 176 M200 250 L218 168 M200 250 L200 150" stroke={leaf(140, 32)} strokeWidth="4" />
      <Flower x={182} y={176} s={0.9} />
      <Flower x={218} y={168} s={0.85} />
      <Flower x={200} y={150} s={1.1} />
    </g>
  )
}

function Fern({ hue }) {
  const a = leaf(hue, 36)
  const b = leaf(hue, 48)
  const Frond = ({ r, len, fill }) => {
    const leaflets = []
    for (let i = 1; i < 12; i++) {
      const t = i / 12
      const w = 14 * Math.sin(Math.PI * t)
      leaflets.push(
        <g key={i}>
          <path d={`M0 -${len * t} q -${w} -2 -${w + 4} -8`} stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M0 -${len * t} q ${w} -2 ${w + 4} -8`} stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )
    }
    return (
      <g transform={`translate(200 286) rotate(${r})`}>
        <path d={`M0 0 Q10 -${len * 0.6} 0 -${len}`} stroke={fill} strokeWidth="3" fill="none" />
        {leaflets}
      </g>
    )
  }
  return (
    <g>
      <Frond r={-38} len={150} fill={a} />
      <Frond r={-14} len={182} fill={b} />
      <Frond r={8} len={196} fill={a} />
      <Frond r={30} len={168} fill={b} />
      <Frond r={-2} len={175} fill={a} />
    </g>
  )
}

function Pilea({ hue }) {
  const a = leaf(hue, 40)
  const b = leaf(hue, 50)
  const Coin = ({ x, y, s, fill }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="22" fill={fill} />
      <circle r="3" fill="#ffffff" fillOpacity="0.4" />
    </g>
  )
  return (
    <g>
      <path d="M200 288 L176 226 M200 288 L224 220 M200 288 L200 200 M200 288 L156 246 M200 288 L244 240"
        stroke={leaf(hue, 32)} strokeWidth="3" />
      <Coin x={156} y={246} s={0.8} fill={a} />
      <Coin x={244} y={240} s={0.8} fill={a} />
      <Coin x={176} y={226} s={0.95} fill={b} />
      <Coin x={224} y={220} s={0.95} fill={b} />
      <Coin x={200} y={200} s={1.1} fill={a} />
    </g>
  )
}

function Herb({ hue }) {
  const a = leaf(hue, 36)
  const b = leaf(hue, 48)
  const sprigs = []
  for (let i = 0; i < 5; i++) {
    const x = 168 + i * 16
    const h = 60 + (i % 2) * 22
    sprigs.push(
      <g key={i}>
        <path d={`M${x} 288 L${x} ${288 - h}`} stroke={leaf(hue, 30)} strokeWidth="3" />
        {[...Array(4)].map((_, j) => {
          const yy = 288 - (h / 4) * (j + 1)
          return (
            <g key={j}>
              <ellipse cx={x - 8} cy={yy} rx="8" ry="5" fill={j % 2 ? a : b} transform={`rotate(-30 ${x - 8} ${yy})`} />
              <ellipse cx={x + 8} cy={yy} rx="8" ry="5" fill={j % 2 ? b : a} transform={`rotate(30 ${x + 8} ${yy})`} />
            </g>
          )
        })}
      </g>
    )
  }
  return <g>{sprigs}</g>
}

const SHAPES = {
  monstera: Monstera,
  snake: SnakePlant,
  trailing: Trailing,
  tree: Tree,
  palm: Palm,
  succulent: Succulent,
  cactus: Cactus,
  flowering: Flowering,
  fern: Fern,
  pilea: Pilea,
  herb: Herb,
}

export default function ProductImage({ product, className = '' }) {
  const Shape = SHAPES[product.plantType] || Foliage
  const gradId = `bg-${product.id}`
  return (
    <svg
      viewBox="0 0 400 340"
      className={className}
      width="100%"
      height="100%"
      role="img"
      aria-label={`Illustration of ${product.name}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#f3f7f0" />
          <stop offset="100%" stopColor="#e2ece0" />
        </radialGradient>
      </defs>
      <rect width="400" height="340" fill={`url(#${gradId})`} />
      <ellipse cx="200" cy="300" rx="96" ry="16" fill="#000000" opacity="0.06" />
      <Shape hue={product.leafHue} />
      <Pot color={product.potColor} />
    </svg>
  )
}

// Fallback if a plantType is ever mistyped, draws simple leaves.
function Foliage({ hue }) {
  return <Monstera hue={hue} />
}
