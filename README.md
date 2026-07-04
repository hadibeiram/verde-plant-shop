# 🌿 Verdé, Indoor Plant Co.

A high-fidelity e-commerce prototype built for **SEG3125 - Assignment 4** (University of Ottawa, Summer 2026).
Verdé is a fictional indoor-plant shop. The prototype is fully interactive: browse a faceted catalogue,
add plants to a cart, complete a multi-step checkout, and leave feedback through a short survey.

> **Live demo:** https://hadibeiram.github.io/verde-shop/ · **Portfolio:** https://hadibeiram.github.io/memory-game/

---

## ✨ What it demonstrates

This prototype implements the three required **interactive processes**:

| Process | Where | What it does |
| --- | --- | --- |
| **Follow-instructions** | `/checkout` | A 4-step buying flow (Details → Payment → Review → Confirmation) with a progress **stepper** that always shows what is done, current, and remaining. |
| **Divergent/convergent explore** | `/shop` | A functional **faceted search**, filter by category, light, care level, size, price, pet-safety and keyword, with live result counts and removable filter chips. |
| **Communicate** | `/survey` | A short, low-pressure **feedback survey** with a star rating, quick pills and an optional comment. |

It also covers the three **verbal-communication purposes** (incite to action, inform, engage in a connection),
a consistent **Writer/Reader model**, a full **visual design system**, and all **10 Nielsen usability heuristics**.
See `REPORT.md` for the full write-up.

---

## 🛠️ Tech stack

- **React 18** + **Vite** (JavaScript framework requirement)
- **react-router-dom** with `HashRouter` (so every route works on static hosting and on refresh)
- Plain CSS design system (design tokens, no UI kit), one stylesheet, fully themeable
- **Zero external runtime assets**: product imagery is generated as inline SVG, so the site renders
  identically online or offline and never shows a broken image.

---

## 🚀 Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
```

Build for production:

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build
```

---

## 🌐 Deploy (pick one)

The app is a static bundle (`/dist`) and uses hash-based routing, so it works on any static host with no
server configuration.

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist        # or push /dist to a gh-pages branch
```
`vite.config.js` already sets `base: './'`, so it works from a project sub-path like
`https://<user>.github.io/verde-plant-shop/`.

### Netlify / Vercel
Drag-and-drop the `dist/` folder, or connect the repo with:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Then link the deployed URL from your portfolio.

---

## 📁 Project structure

```
src/
  main.jsx                # app entry, providers, HashRouter
  App.jsx                 # routes + layout
  index.css               # design system (tokens, components, responsive)
  context/
    CartContext.jsx       # cart state, persisted to localStorage
    ToastContext.jsx      # toast notifications (system status)
  data/products.js        # 30-item plant catalogue + facet vocabularies
  utils/format.js         # currency + display helpers
  components/
    Header.jsx  Footer.jsx
    ProductImage.jsx      # generative botanical SVG illustrations
    ProductCard.jsx  Rating.jsx  Stepper.jsx  icons.jsx
  pages/
    Home.jsx  Shop.jsx  ProductDetail.jsx
    Cart.jsx  Checkout.jsx  Survey.jsx  Care.jsx
```

---

## ♿ Accessibility notes

- Semantic landmarks (`header`, `main`, `nav`, `footer`), a skip-link, and labelled form controls.
- Visible keyboard focus rings, `aria-live` regions for toasts and result counts, `prefers-reduced-motion` support.
- Colour palette chosen for readable contrast on the cream background.

---

_Student prototype, not a real store. No real payments are processed._
