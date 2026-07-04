import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import {
  products,
  CATEGORIES,
  LIGHT_LEVELS,
  CARE_LEVELS,
  SIZES,
} from '../data/products.js'
import { effectivePrice } from '../utils/format.js'
import { IconSearch, IconPaw } from '../components/icons.jsx'

const PRICE_MIN = 10
const PRICE_MAX = 100

// The facet groups, declared as data so the sidebar, the counts and the active
// filter chips all stay in sync automatically (single source of truth).
const GROUPS = [
  { key: 'category', title: 'Category', options: CATEGORIES, field: (p) => p.category },
  { key: 'light', title: 'Light needs', options: LIGHT_LEVELS, field: (p) => p.light },
  { key: 'care', title: 'Care level', options: CARE_LEVELS, field: (p) => p.care },
  { key: 'size', title: 'Size', options: SIZES, field: (p) => p.size },
]

const emptySelection = { category: [], light: [], care: [], size: [] }

// Facets are stored in the URL as comma-separated lists so a narrowed view is
// fully shareable and survives a reload (Recognition rather than Recall).
const parseList = (v) => (v ? v.split(',').filter(Boolean) : [])

export default function Shop() {
  const [params, setParams] = useSearchParams()

  // Seed the filters from the URL so deep links from the home page
  // ("Shop the deals", a category tile) land on a pre-filtered view.
  const [selection, setSelection] = useState(() => ({
    category: parseList(params.get('cat')),
    light: parseList(params.get('light')),
    care: parseList(params.get('care')),
    size: parseList(params.get('size')),
  }))
  const [petOnly, setPetOnly] = useState(params.get('pet') === '1')
  const [saleOnly, setSaleOnly] = useState(params.get('deal') === '1')
  const [beginner, setBeginner] = useState(params.get('beginner') === '1')
  const [maxPrice, setMaxPrice] = useState(
    params.get('price') ? Number(params.get('price')) : PRICE_MAX
  )
  const [query, setQuery] = useState(params.get('q') || '')
  const [sort, setSort] = useState(params.get('sort') || 'featured')

  // Keep the URL shareable/bookmarkable as the shopper narrows things down -
  // every active filter round-trips through the query string.
  useEffect(() => {
    const next = {}
    if (selection.category.length) next.cat = selection.category.join(',')
    if (selection.light.length) next.light = selection.light.join(',')
    if (selection.care.length) next.care = selection.care.join(',')
    if (selection.size.length) next.size = selection.size.join(',')
    if (petOnly) next.pet = '1'
    if (saleOnly) next.deal = '1'
    if (beginner) next.beginner = '1'
    if (maxPrice < PRICE_MAX) next.price = String(maxPrice)
    if (query) next.q = query
    if (sort !== 'featured') next.sort = sort
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, petOnly, saleOnly, beginner, maxPrice, query, sort])

  const toggle = (group, value) => {
    setSelection((s) => {
      const has = s[group].includes(value)
      return {
        ...s,
        [group]: has ? s[group].filter((v) => v !== value) : [...s[group], value],
      }
    })
  }

  const clearAll = () => {
    setSelection(emptySelection)
    setPetOnly(false)
    setSaleOnly(false)
    setBeginner(false)
    setMaxPrice(PRICE_MAX)
    setQuery('')
  }

  // Predicate helpers so filtering and per-option counts share one definition.
  const passGroups = (p, exclude) =>
    GROUPS.every((g) => {
      if (g.key === exclude) return true
      const vals = selection[g.key]
      return vals.length === 0 || vals.includes(g.field(p))
    })

  // `skip` lets a facet's own count ignore that one filter, so the number next
  // to each option reflects the result the user gets by toggling it.
  const passGlobalsExcept = (p, skip) =>
    (skip === 'pet' || !petOnly || p.petFriendly) &&
    (skip === 'sale' || !saleOnly || !!p.salePrice) &&
    (skip === 'beginner' || !beginner || p.care === 'Easy') &&
    (skip === 'price' || effectivePrice(p) <= maxPrice) &&
    (skip === 'query' ||
      query.trim() === '' ||
      (p.name + ' ' + p.botanical + ' ' + p.short)
        .toLowerCase()
        .includes(query.trim().toLowerCase()))

  const passGlobals = (p) => passGlobalsExcept(p, null)

  const filtered = useMemo(() => {
    const list = products.filter((p) => passGroups(p, null) && passGlobals(p))
    const byPrice = (a, b) => effectivePrice(a) - effectivePrice(b)
    switch (sort) {
      case 'price-low':
        return [...list].sort(byPrice)
      case 'price-high':
        return [...list].sort((a, b) => byPrice(b, a))
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      case 'newest':
        return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew))
      default:
        // "Featured": deals first, then best rated.
        return [...list].sort(
          (a, b) => Number(!!b.salePrice) - Number(!!a.salePrice) || b.rating - a.rating
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, petOnly, saleOnly, beginner, maxPrice, query, sort])

  // Count for a single facet option, honouring every OTHER active filter.
  const optionCount = (group, value) =>
    products.filter(
      (p) => GROUPS.find((g) => g.key === group).field(p) === value &&
        passGroups(p, group) &&
        passGlobals(p)
    ).length

  // Active filter chips (Recognition rather than Recall).
  const chips = []
  GROUPS.forEach((g) =>
    selection[g.key].forEach((v) =>
      chips.push({ label: v, clear: () => toggle(g.key, v) })
    )
  )
  if (petOnly) chips.push({ label: 'Pet-safe only', clear: () => setPetOnly(false) })
  if (saleOnly) chips.push({ label: 'On sale', clear: () => setSaleOnly(false) })
  if (beginner) chips.push({ label: 'Beginner-friendly', clear: () => setBeginner(false) })
  if (maxPrice < PRICE_MAX)
    chips.push({ label: `Under $${maxPrice}`, clear: () => setMaxPrice(PRICE_MAX) })

  return (
    <div className="container page">
      <div className="section-head">
        <div>
          <span className="eyebrow">Explore the collection</span>
          <h1>Find your next plant</h1>
          {/* Inform: neutral, helpful guidance on how to use the tool */}
          <p className="lead">
            Filter by the things that actually matter for your space, how much
            light you get, whether you have curious pets, and how much fuss you
            want. Mix and match as many filters as you like.
          </p>
        </div>
      </div>

      <div className="shop">
        {/* ------------------------- Faceted sidebar -------------------- */}
        <aside className="facets" aria-label="Filter products">
          <div className="facets__head">
            <h2>Filters</h2>
            <button className="link-underline" onClick={clearAll} type="button">
              Clear all
            </button>
          </div>

          {/* Keyword search */}
          <div className="facet-group" style={{ borderTop: 'none', paddingTop: 0 }}>
            <label className="facet-group__title" htmlFor="q">
              Search
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted-soft)',
                }}
              >
                <IconSearch size={18} />
              </span>
              <input
                id="q"
                className="input"
                style={{ paddingLeft: 38 }}
                type="search"
                placeholder="e.g. monstera, palm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick toggles */}
          <div className="facet-group">
            <div className="facet-group__title">Quick filters</div>
            <label className="check">
              <input
                type="checkbox"
                checked={saleOnly}
                onChange={(e) => setSaleOnly(e.target.checked)}
              />
              On sale
              <span className="count">
                {products.filter((p) => p.salePrice && passGroups(p, null) && passGlobalsExcept(p, 'sale')).length}
              </span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={petOnly}
                onChange={(e) => setPetOnly(e.target.checked)}
              />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <IconPaw size={16} /> Pet-safe only
              </span>
              <span className="count">
                {products.filter((p) => p.petFriendly && passGroups(p, null) && passGlobalsExcept(p, 'pet')).length}
              </span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={beginner}
                onChange={(e) => setBeginner(e.target.checked)}
              />
              Beginner-friendly
              <span className="count">
                {products.filter((p) => p.care === 'Easy' && passGroups(p, null) && passGlobalsExcept(p, 'beginner')).length}
              </span>
            </label>
          </div>

          {/* Multi-select facet groups */}
          {GROUPS.map((g) => (
            <fieldset className="facet-group" key={g.key} style={{ border: 0, borderTop: '1px solid var(--sand-line)' }}>
              <legend className="facet-group__title">{g.title}</legend>
              {g.options.map((opt) => {
                const n = optionCount(g.key, opt)
                return (
                  <label className="check" key={opt}>
                    <input
                      type="checkbox"
                      checked={selection[g.key].includes(opt)}
                      onChange={() => toggle(g.key, opt)}
                      disabled={n === 0 && !selection[g.key].includes(opt)}
                    />
                    {opt}
                    <span className="count">{n}</span>
                  </label>
                )
              })}
            </fieldset>
          ))}

          {/* Price range */}
          <div className="facet-group range">
            <div className="facet-group__title">Max price</div>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price"
            />
            <div className="range__out">
              <span>${PRICE_MIN}</span>
              <span>{maxPrice >= PRICE_MAX ? 'No limit' : `Up to $${maxPrice}`}</span>
            </div>
          </div>
        </aside>

        {/* --------------------------- Results -------------------------- */}
        <section aria-label="Products">
          <div className="shop__toolbar">
            {/* Live result count, Visibility of System Status */}
            <span className="result-count">
              {filtered.length} {filtered.length === 1 ? 'plant' : 'plants'}
            </span>
            <span className="muted text-sm">of {products.length} in the shop</span>
            <label style={{ marginLeft: 'auto' }} className="flex items-center gap-2">
              <span className="text-sm muted" style={{ fontWeight: 700 }}>
                Sort
              </span>
              <select
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="chips" aria-label="Active filters">
              {chips.map((c, i) => (
                <span className="chip" key={i}>
                  {c.label}
                  <button onClick={c.clear} aria-label={`Remove filter ${c.label}`}>
                    ✕
                  </button>
                </span>
              ))}
              <button className="link-underline" onClick={clearAll} type="button">
                Clear all
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="empty">
              <h3>No plants match those filters, yet.</h3>
              <p style={{ margin: '10px 0 18px' }}>
                Try loosening a filter or two. Every plant we grow is out there
                somewhere!
              </p>
              <button className="btn" onClick={clearAll}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid--products">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
