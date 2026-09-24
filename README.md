# ShizuTCG (repo: shizutcg)

The hub behind **https://shizukaziye.github.io/shizutcg/** — every trading-card tool I've built for Pokémon, Riftbound and One Piece, plus the shared chrome that ties them together. Lost Ark, League and finance tools live at [loseii.com](https://www.loseii.com/).

GitHub Pages deploys `main` on every push. No build step; the site is plain static files.

## Layout

- `index.html` — the hub landing page
- `nav.js`, `social-bar.js` — shared top nav + social bar; every tool page loads them from `https://shizukaziye.github.io/shizutcg/`
- `og.svg` / `og.png` — the link-preview image

Every tool has its own repo. This repo holds only the hub and the chrome.

## Tools

**Prices & Sourcing**
- [TCG Price Tracker](https://tcg-price-tracker.shizukaziye.workers.dev/) — sealed profit vs MSRP, Chinese and EU prices against the US market, pack and box EV, master-set cost; refreshed daily
- [CN Card Finder](https://shizukaziye.github.io/cn-card-finder/) — EN→CN card names + search strings for sourcing from China

**Riftbound**
- [Market Index](https://tcg-price-tracker.shizukaziye.workers.dev/rb-index.html) — SPY-style chain-linked index of every Riftbound single: total, per set, per tier (commons to signatures, overnumbered, promos), three weightings, volume, movers
- [Tier List Maker](https://shizukaziye.github.io/riftbound-tierlist/) — search every Riftbound card, drag into tiers, share link / PNG export
- [Nine-Legend Flex Sheet](https://shizukaziye.github.io/riftbound-flex-sheet/) — flex cards per legend from the Wuhan top 32 + Barcelona top 64, max copies any list ran

**Pokémon**
- [Michi Binder](https://shizukaziye.github.io/michi-binder/) — binder page designer: 21,000+ cards, blank-on-purpose pockets, your own inserts, print at true card size

## Adding a tool

1. Add an `<a class="card">` to the right section of `index.html` and bump the "N live tools" pill.
2. Add it to the `GROUPS` array in `nav.js`.
3. Add it to the list above.
4. Put the two chrome script tags at the end of the tool's page:

```html
<script src="https://shizukaziye.github.io/shizutcg/nav.js" defer></script>
<script src="https://shizukaziye.github.io/shizutcg/social-bar.js" defer></script>
```

Sticky headers on a tool page should sit at `top: var(--site-nav-offset, 0px)` so the fixed nav never covers them.

## Moving to a custom domain

Change `HOME` in `nav.js`, the canonical/og URLs in `index.html`, and the two script tags on every tool page. Add a `CNAME` file for GitHub Pages.
