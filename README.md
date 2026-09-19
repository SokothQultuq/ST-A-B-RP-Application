# STAB — Portable Concept Demo

This is a **static, client-side-only** demo of the STAB (Star Trek RP App) concept, built to
show to potential players/GDs for feedback before further development. It needs **no backend,
no build step, and no server** — it's plain HTML, CSS, and vanilla JavaScript.

All data (ship stats, crew, NPC ships, etc.) is seeded example data and lives only in each
visitor's own browser (via `localStorage`). Nothing is shared between visitors, and nothing is
saved anywhere except the browser that's looking at it. Refreshing the page keeps most of what
you entered (thanks to `localStorage`); to fully reset a page, clear your browser's site data
for this domain, or open it in a private/incognito window.

## Pages

- `index.html` — landing page with links to everything below
- `character-sheet.html` — Character Sheet (Character Description, Family History, Starfleet Academy/Service/Medical Records)
- `character-screen.html` — Character Screen (location, health status, inventory, equipment-gated tools)
- `engineering.html` — Engineering Console (system status, shields, reactors, life support, RCS, Damage Control)
- `tactical.html` — Tactical Console (shields, phasers, torpedoes, tactical plot, comms, transporter)
- `gd-console.html` — Game Director Console (tabbed hub: quick-control panels + links to full consoles, player roster, NPC ships)
- `npc-ships.html` — NPC Ship Template Library (build templates, manage the active encounter)

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one) and push this folder's contents to it —
   for example:
   ```
   git init
   git add .
   git commit -m "STAB concept demo"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch," pick the `main`
   branch and the `/ (root)` folder, then save.
4. GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/` — that's
   your shareable demo link. It can take a minute or two to go live the first time.

That's it — no other setup, environment variables, or dependencies are needed.

## What this demo is (and isn't)

- It **is** a faithful, clickable recreation of the interactions and data model we've designed
  so far — the goal is to let people react to the actual concept, not a slideshow of pictures.
- It **is not** connected to Discord, a real database, or real user accounts. There's no
  authentication and no persistence beyond a single browser's local storage.
- Some deeper mechanics were simplified relative to the full design (e.g. exact damage numbers,
  power regeneration rates) since those are still open design questions — the point of this demo
  is to validate the overall shape of the experience, not to be balance-accurate.
- If this concept lands well, the next step is a real backend (the plan has been Convex) so that
  data is shared, persistent, and the same across every player's device — this static version is
  intentionally a stepping stone, not the final architecture.
