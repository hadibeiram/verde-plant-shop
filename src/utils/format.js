// Currency + small display helpers. Centralised so prices read identically
// everywhere on the site (Consistency & Standards).

export const money = (n) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(n)

export const effectivePrice = (p) => p.salePrice ?? p.price

export const discountPct = (p) =>
  p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0

// A short, human sentence describing a plant's care load, used in specs.
export const careBlurb = {
  Easy: 'Very forgiving',
  Moderate: 'A little routine',
  Expert: 'Rewards attention',
}
