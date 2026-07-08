# Krushnansh Meher — Notebook Portfolio

A personal portfolio styled as a live Jupyter notebook. Fully static, zero backend —
"running" a cell is a scripted animation, not a real kernel.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` folder
ready for Vercel, Netlify, or any static host.

## Editing content

Everything on the page comes from **`src/content/notebook.ts`** — an ordered array
of cell objects. To add a project:

1. Add a new JSON file under `src/content/outputs/` with the output data.
2. Import it in `notebook.ts` and append a new `{ type: "code", ... }` cell.
3. Pick an `output.kind`: `metrics`, `json`, `text`, `typewriter`, `iframe`, `image`,
   or `links` — each maps to a renderer in `src/lib/outputRenderers.tsx`.

No component code needs to change. Markdown cells (bio, closing section) are edited
the same way — just update the `content` string.

## Theme

Light/dark is a CSS-variable swap (`src/index.css`) toggled via the sun/moon button
in the toolbar; it respects system preference on first load and persists the choice.
Both themes share Jupyter's own signature orange as the accent color.

## Notes

- Respects `prefers-reduced-motion` (animations shorten to ~0).
- Code cells scroll horizontally on narrow screens instead of wrapping/breaking.
- Run buttons and collapse toggles are keyboard-accessible.
- The `uidai-360-dashboard.json` output has an empty `src` — drop in a real
  Looker Studio / Streamlit share link when you have one; until then it shows a
  clean placeholder instead of a broken iframe.
