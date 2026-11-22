# Design history

Every major visual era of the site is tagged in git. To view one locally:

```bash
git switch --detach <tag> && npm ci && npm run dev
git switch main   # come back
```

| Tag | Commit | Dates | Design |
|---|---|---|---|
| `v1` | `c56bb02` | Jan 2025 to Apr 2026 | Original site, ported from an older Vite/React project into Next.js. Light theme, slate `#2c3e50` / off-white `#fcf7f8`, skills carousel, project cards, contact form. |
| `v2` | `c93c501` | Apr 2026 to Oct 2026 | Terminal rebuild. Phosphor green `#4aff4a` on `#080c08`, amber `#ffaa00` accents, full-page scanlines, `THREAT_INTEL // SUBJECT` framing, three-tier cipher challenges on the homepage gating `/lab`, `/graveyard`, `/flag`. |
| `v2.1` | `38a4e2f` | Oct 1 to Oct 22, 2026 | Homepage revamp on the same palette: new hero, reworked project cards plus archive, expanded skills. The last state before it, `bb1a4a9` (`v2.1^`), is the reference for the Sep-era design. |
| `v2.2` | `fd4f10f` | Oct 22 to Nov 15, 2026 | Readability pass: softened palette (`#5cf55c`, `#ffb42e`, `#0a0f0a`), homepage challenge section and footer removed, puzzles moved into a bottom terminal drawer. Boundary is `c72924c`, which does not build alone; `fd4f10f` completes it. |
| `v3` | `58d0838` | Nov 15, 2026 to now | Restrained terminal: one green accent `#7ee787` on `#0e1110`, sans-serif body, stats strip, featured work on home, drawer becomes a working shell. |

## Build status

Checked with `npm ci && npm run build` on Node 24:

- `v2`, `v2.1`, `v2.2`, `v3`: build clean.
- `v1`: compiles, but fails ESLint on an unescaped `'` (`react/no-unescaped-entities`). Use `npx next build --no-lint`.
