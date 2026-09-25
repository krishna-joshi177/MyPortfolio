# Krishna Joshi — Portfolio

Zero dependencies, no build step. ES modules + modern CSS.
Deploys as-is to Vercel, Netlify, GitHub Pages or any static host.

## ⚠️ Add your resume first

The download buttons point to `resume.pdf` at the project root.
Copy your CV in and name it exactly that:

```
krishna-joshi-portfolio/resume.pdf
```

## Run locally

```bash
npx serve .          # or: python3 -m http.server 8000
```

ES modules need a server — opening `index.html` via `file://` shows a blank page.

## Structure

```
index.html            page shell, section surfaces, SEO, JSON-LD
styles/main.css       design system — dark + light surface tokens
js/data.js            ← ALL CONTENT (profile, experience, projects, skills, education)
js/visuals.js         per-project visuals
js/main.js            nav, hero panel, cursor, reveals, overlay, command palette
resume.pdf            ← you add this
```

## Section rhythm

Sections alternate dark / light so each one announces itself while scrolling.
Every section opens with a marker strip: `index — rule — label`.

| # | Section | Surface |
|---|---|---|
| — | Hero | dark |
| 01 | About | **light** |
| 02 | Project Scale | dark |
| 03 | Experience | **light** |
| 04 | Selected Work | dark |
| 05 | Stack | **light** |
| 06 | Learning | dark |
| 07 | Education | **light** |
| 08 | Contact | dark |

The navbar detects the surface beneath it and inverts automatically.

To change a section's surface, swap its class and attribute in `index.html`:

```html
<section class="section surface--light" data-surface="light">
<section class="section surface--dark"  data-surface="dark">
```

Both values must match — the class styles it, the attribute drives the navbar.

## Editing content

All text lives in `js/data.js`. Update it and the site follows.

```js
links: { linkedin: "", github: "" }   // empty = link hidden entirely
```

Also replace `canonical` / `og:url` in `index.html` with your real domain,
and drop an `og.png` (1200×630) at the root.

## Design tokens

| Token | Dark | Light |
|---|---|---|
| `--ink` (background) | `#0d0c0b` | `#f0ede5` |
| `--paper` (text) | `#f0ede5` | `#0d0c0b` |
| `--accent` | `#ff4a1c` | `#ff4a1c` |

Type: Archivo (display/UI), IBM Plex Mono (technical metadata).

## Interactions

- Split hero — oversized solid/outline name left, live "Engineering System" radar panel right with pointer parallax
- Scroll progress, active-section nav, self-inverting navbar
- Count-up metrics, self-drawing experience rail
- **Skill → project tracing**: hover/tap a technology and the projects using it stay lit
- Per-project visuals: canvas port/vessel network, product mock, ADF pipeline with travelling particles, RAG workflow
- Full-screen case-study overlay, command palette (`/`), logo triple-click accent switch

## Accessibility & performance

Semantic landmarks, skip link, focus rings, `aria-pressed`/`aria-modal`, focus restore.
`prefers-reduced-motion` disables grain, marquee, typing and count-ups.
Canvas loops are IntersectionObserver-gated; visuals mount lazily; transform/opacity only.

## Content integrity

Every fact comes from the resume. The 3,000+ / 100,000+ / 24×7 / ~70% figures are
labelled as C-Hub platform metrics, not personal statistics. Project visuals are marked
"design representation". No invented links, clients, testimonials or numbers.
