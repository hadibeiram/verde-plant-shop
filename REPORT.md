# SEG3125 Assignment 4 · E-Commerce Site
## Verdé, Indoor Plant Co.

---

## 1. Designer

| Field | Value |
| --- | --- |
| Name | Hadi Beiram |
| Student number | 300299908 |

---

## 2. E-Commerce Goal

**Name:** Verdé, Indoor Plant Co.

**Type:** A direct-to-consumer online plant shop. It sells indoor houseplants (foliage,
flowering plants, succulents and cacti, trees and palms, trailing plants and edible herbs)
along with plain-language care advice.

**Who it is for:** Home shoppers of every level, from complete beginners to confident plant
parents. Two groups are a particular focus: renters with low light and people with pets. The
faceted search is built with them in mind.

### Inspiration sites

| Site | Link | How it inspired Verdé |
| --- | --- | --- |
| The Sill | https://www.thesill.com | Its catalogue can be filtered by light, pet-friendliness and difficulty. That shaped the set of filters in our faceted search, and its plain care guides inspired the care notes on each product page. |
| Bloomscape | https://bloomscape.com | Its friendly voice and its guarantees (a 30-day promise, free shipping over a threshold) shaped our Writer/Reader model and the delivery and guarantee messaging. |

---

## 3. Reflection / Design

### (A) Interactive process / System Image design

**a. Follow-instructions process: showing progress**

The buying flow is a four-step checkout (Your details, Payment, Review, Confirmation) with a
progress stepper at the top of every step. The stepper answers three questions at a glance:

- **What is done:** completed steps turn green with a check mark, and the connector line fills in.
- **Where I am now:** the current step is enlarged, filled and ringed.
- **What is left:** upcoming steps stay dimmed and numbered.

The order summary stays beside the form the whole way through, each step has clear Back and
Continue buttons, and the final step shows a success mark, an order number, an estimated
delivery date and an email confirmation.

**b. Explore process: faceted-search filters**

Shoppers narrow the catalogue on the things that actually matter when picking a plant. The
filters map to how someone describes their situation ("I have a dark apartment, a cat, and no
time"):

- **Category:** Foliage, Flowering, Succulent & Cactus, Trees & Palms, Trailing & Hanging, Herbs & Edible
- **Light needs:** Low, Medium, Bright
- **Care level:** Easy, Moderate, Expert
- **Size:** Tabletop, Floor
- **Max price:** a slider
- **Quick filters:** On sale, Pet-safe only, Beginner-friendly
- **Keyword search:** by common or botanical name

All the filters are multi-select and can be combined. Each option shows a live count of matching
plants (and greys out options that would return nothing), the header reads "X of 30 plants", and
the active filters show up as chips you can remove one by one, plus a "Clear all" button.

**c. Communicate process: a short survey**

The survey is kept short on purpose, so it never feels like a chore:

- **Only one thing is required:** the star rating. Everything else is optional.
- Most answers are single taps on pill buttons (overall feeling, what stood out, whether they
  would return), with one optional comment box.
- It is offered, not forced. We point to it gently after a purchase, from a home-page invite and
  from the nav, but never as a pop-up that blocks the page.
- The intro sets expectations ("about 30 seconds, no wrong answers") and the thank-you message
  changes with the score.

### (B) Verbal communication design

**Writer / Reader model.** Verdé talks like a friendly, knowledgeable plant person rather than a
faceless store. It calls itself "we" and speaks to the shopper as "you" on every page, which keeps
one steady voice. The voice loosens up a little in small places for a more personal,
conversational effect: the toast messages, the empty-cart line ("your future jungle awaits") and
the survey thank-you ("You are a gem, thank you!"). These add character without changing who is
talking to whom.

**Three communicative purposes:**

| Purpose | Where | Example copy | Techniques |
| --- | --- | --- | --- |
| Incite to action | Promo bar, deals, buttons, free-shipping nudge | "Spring deals are blooming, save up to 25%!" / "These prices will not last long. Treat yourself before they are gone!" / "You are $8 away from free delivery. So close!" | Exclamations and commands, urgency, verbs that push a purchase. |
| Inform | Product text, spec tiles, care guides, FAQ | "Water when the top 3-4 cm of soil feels dry." / "Light: bright, indirect; avoid harsh midday sun." / spec tiles for Light, Care level, Mature height, Pet-safe. | Plain statements, specific numbers and units, little jargon. |
| Engage in a connection | Survey, home teaser, thank-you screens | "How was your visit?" / "We would love to know what you thought." / "Would you shop with us again?" | Questions and second-person address, a warm and encouraging tone. |

**Working with the visuals:** the sales copy always sits on the terracotta accent (deal badges,
the promo bar), the informative copy sits on calm greens and neutral cards, and the survey copy
sits on a warm green panel. The words and the colours push in the same direction.

---

## 4. High-Fidelity Prototype

### a. Visual design choices

- **Colour theme:** deep forest green and sage for the brand, cream and sand neutrals for a warm
  background, and one terracotta accent kept for deals and primary buttons. Every colour is a CSS
  variable, so the theme is the same on every page.
- **Typography:** Fraunces, a serif with character, for headings, and Nunito Sans, a clean
  sans-serif, for body text. The jump between them sets up the hierarchy.
- **Layout and negative space:** roomy padding, a capped page width and an open product grid give
  each plant space and keep pages easy to scan.
- **Contrast, scale, balance, hierarchy:** a repeating small-label, big-heading, then
  lead-paragraph pattern; filled primary buttons versus outlined secondary ones; large prices
  against small captions, all guiding the eye in order.
- **Gestalt principles:** Similarity (every card, badge and illustration shares one look),
  Proximity (related controls sit together), Continuity (a strict grid), Closure (rounded cards and
  circular icon chips), Figure and ground (white cards stand off the cream background).
- **Imagery:** each plant is drawn as an inline SVG rather than a stock photo, so the catalogue
  looks consistent, nothing ever loads as a broken image, and the site works anywhere, even
  offline.

### b. Portfolio and prototype links

- **Live prototype:** https://hadibeiram.github.io/verde-shop/
- **Portfolio:** https://hadibeiram.github.io/memory-game/

The prototype is reachable from the portfolio in the same way as the Assignment 2 service site and
the Assignment 3 memory game.

---

## 5. Code

- **GitHub repository:** https://github.com/hadibeiram/verde-shop

Built with React 18 and Vite, using react-router-dom with hash routing so every route works on
static hosting. The cart is saved to the browser so it survives a refresh. See `README.md` for how
to run and deploy it.

---

## 6. Heuristic Evaluation (Nielsen's 10)

For each heuristic: its name, the part of Verdé that follows it, and where to find it on the site.

1. **Visibility of system status.** The checkout stepper always shows what is done, current and
   left; the cart button carries a live item count; a toast confirms every add and remove; the shop
   shows a live "X of 30 plants" count; and the cart shows how close you are to free delivery.
2. **Match between the system and the real world.** The wording matches how people talk about
   plants (light needs, pet-safe, care level, mature height), it uses the familiar shopping-cart
   idea, and it reads top to bottom with no technical jargon.
3. **User control and freedom.** There is always a way out: Back and Back-to-cart in checkout, Edit
   links on the review step, Remove on cart items, remove-one or Clear all on the filters, and the
   cart is saved so a refresh loses nothing.
4. **Consistency and standards.** One set of CSS variables means the buttons, badges, cards and
   forms look and act the same everywhere; the header and footer never change; and it follows the
   usual shop conventions (cart at top right, sale price beside a struck-out original, breadcrumbs).
5. **Error prevention.** Fields are shaped as you type (the card number groups into fours, the
   expiry becomes MM/YY, the postal code auto-formats, the CVC takes digits only), quantity is
   capped at 1 to 99, the province is a dropdown, you cannot move on until the step is valid, and a
   note reminds you not to enter a real card.
6. **Recognition rather than recall.** You never have to remember anything: the cart count, the
   active filter chips, a breadcrumb and the order summary in checkout keep it all on screen, and
   the address and payment fields use the browser autofill.
7. **Flexibility and efficiency of use.** There is more than one way to do everything: a keyword box
   next to the filters, a Sort menu, quick-filter toggles, a one-click Add on cards or the full
   product page, a Buy it now shortcut, and shareable filtered links such as `/shop?deal=1`.
8. **Aesthetic and minimalist design.** Plenty of whitespace, a small palette, and only the
   essentials on each card (image, rating, name, one line, light and care, price) keep the pages
   calm and uncluttered.
9. **Help users recognise, diagnose and recover from errors.** Error messages are plain and
   specific ("Postal codes look like K1N 6N5"), attached to the field, read out to screen readers
   and shown in red with a prompting toast; an error clears the moment you start fixing it; and the
   404 page and the empty-search state each give a one-click way back.
10. **Help and documentation.** A Care Guides and FAQ page, a care guide on every product, hints
    under the form fields, tooltips (such as "Safe for cats and dogs") and the delivery and
    guarantee notes put help where it is needed.

---

## 7. Generative AI Acknowledgement

I used an AI coding assistant (Anthropic Claude) to help scaffold the React project and to help
draft and organise this report. The design choices, testing and final edits are my own.
