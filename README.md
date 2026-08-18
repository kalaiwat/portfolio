# portfolio — kareem alaiwat

a dense, technical, brutalist-minimal portfolio. Vite + React + TypeScript, plain CSS
with custom properties, no UI kit.

```bash
npm install
npm run dev
```

`npm run build` typechecks (`tsc -b`) and bundles to `dist/`. `npm run lint` runs oxlint.

## the rules this codebase enforces

these are not stylistic preferences — the signature interaction depends on them.

- **three colors only**: `#000000`, `#FFFFFF`, `#555555` (captions/meta only, never body
  copy). no tints, no opacity-based grays, no fourth color. the cursor's
  `mix-blend-mode: difference` only produces a clean invert because the palette is pure.
- **no shadows, no gradients, no border-radius** — the one `border-radius` in the
  codebase is the `50%` on the cursor dot.
- **lowercase is authored, never `text-transform`** — proper nouns keep their
  capitalization (GitHub, Georgia Tech, PyTorch, GetPaid). every other word, including
  sentence starts, is written lowercase in the source.
- **hover is a hard cut**, `transition: none`. elements resting inverted use
  `.invert-hover--inverse` so hover always snaps to the opposite of the resting state.
- **fluid, edge-aware layout** — no fixed-width centered column. `--gutter` scales with
  the viewport and every section is `padding-inline: var(--gutter)`. list rows bleed past
  the gutter so hairlines and the hovered invert terminate at the same edge.

## structure

```
src/
  styles/tokens.css     design tokens — the only place raw values live
  styles/global.css     reset, base elements, .invert-hover, .cursor-dot
  layouts/RootLayout.tsx  Nav + Cursor + Outlet + Footer, persists across routes
  components/           Cursor, Nav, Footer, ProjectCard, TimelineItem, PostCard
  routes/               one file per route + shared page.css
  content/              projects.ts, experience.ts, posts.ts — all copy lives here
```

content is data, not markup: edit `src/content/*.ts` to change what the site says.

## writing

`content/posts.ts` is a typed empty array on purpose — the routes and `PostCard` are
already wired, so publishing means appending one `Post` object. `WritingPost` looks it up
by slug. if posts get long or frequent, upgrade to `react-markdown` + `import.meta.glob`
then; not worth the dependency weight for a placeholder.

## accessibility

- semantic landmarks, heading hierarchy in order, skip link as the first tab stop
- `:focus-visible` outlines on every interactive element — the cursor is a pointer-only
  enhancement, never a substitute for focus indication
- the cursor is gated behind `(hover: hover) and (pointer: fine)`; coarse pointers get the
  normal system cursor and no overlay
- under `prefers-reduced-motion: reduce` the rAF loop is never started — the dot snaps on
  the pointer event
- verified no horizontal scroll at 360 / 768 / 1440 / 1920

## deploying

client-side routing means the host must rewrite unknown paths to `/index.html`, or a
direct hit on `/projects/getpaid` 404s. netlify: a `_redirects` with `/* /index.html 200`.
vercel: a rewrite rule. static nginx/S3: point the 404 handler at `index.html`.
