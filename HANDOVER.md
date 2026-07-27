# Flagrants — Full Project Handover
# Date: 2026-07-27
# Status: Live worker, local code, GitHub push blocked (2FA lockout)

---

## What this project is

**Flagrants** is a web app that generates coats of arms and flags for locations and families — depicting what they actually were, not what they claimed to be. The comedy comes from applying the full formal dignity of heraldry to the obscure misdemeanours, buried associations, and popularly held truths that official history quietly buried.

The name: flagrant + vagrants. Ennobling the disreputable.

---

## What is live right now

**Cloudflare Worker:** `https://flagrants-api.leanspirited.workers.dev`
- `POST /research` — takes a location or family name, returns structured research findings (3 tiers)
- `POST /design` — takes research findings + a Defence Lens, returns heraldic spec JSON + SVG + Herald's Commentary
- `GET /health` — returns 200

**Cloudflare account:** leanspirited@gmail.com
**Cloudflare account ID:** `ce5ebfc99d1b37a7537a039d0b09d0b6`
**Worker name:** `flagrants-api`
**ANTHROPIC_API_KEY:** set as Cloudflare Worker secret (do not store in code)
**Model:** claude-sonnet-4-6

**index.html** — open directly in browser, calls the live worker. Mode 1 (location flag) fully functional.

---

## Operating Directives & User Commands

- **"go cd3" Command:** Automatically calculates the CD3 score ($\text{Cost of Delay} / \text{Duration}$) for all outstanding backlog items, presents the prioritized order table, and executes step-by-step in rank order.
- **Stop Conditions:** Pause execution ONLY when explicit user input/decision is required or when Gherkin acceptance test scenarios require user review.

---

## What was built this session

### Founding documents (docs/)
- `founding-philosophy.md` — APPROVED. The constitution. Read this first.
- `architecture.md` — full system architecture, data flow, file structure, heraldic vocab
- `character-notes-raw.md` — Rod's verbatim memory captures (do not paraphrase)
- `design-principles.md` — The Grand Contradiction: app must look genuinely serious
- `waste-log.md` — FG-WL-001 (secret propagation), FG-WL-002 (GitHub 2FA lockout)

### Core comedy mechanics (all in founding-philosophy.md)
1. **The Dry Note** — neutral factual description with one barely-there moral observation. Default register.
2. **The Herald's Aside** — dash-interjection mid-clause. "The Earl — who was a man of considerable conviction, most of it misdirected — maintained this practice for eleven generations."
3. **The Modern Tariff** — escalation only. Translates historical atrocity to modern equivalent via understatement. "Today this would attract considerably more than a parking fine."
4. **The Defence Lenses** (7, user-selected): Proud of It / Full Cover-Up / Admit Faults / Blame Others / Deeply Sorry / Context Is Everything / Revisionist
5. **The Excuse Arsenal** — within each lens, the specific excuse is contextually derived from research. Same lens, different subject, different excuse. Aliens are valid under Revisionist.

### The ruling test
*Does this depict — with the dignity it never deserved — the deed, the cover-up, the deflection, or the indignant denial? Any of these will do. All four is better.*

### Code (code/)
- `worker.js` — Cloudflare Worker. Two AI calls (/research then /design). Inline SVG renderer. Full Herald's register in system prompt.
- `index.html` — Mode 1 UI. Dark grand aesthetic (Palatino, heraldic gold on near-black). 7 lens buttons. Output panel with SVG + commentary blocks.
- `wrangler.toml` — worker name: flagrants-api

### Source (src/)
- `src/data/heraldic-vocabulary.js` — controlled vocabulary. AI picks from this list only. 7 tinctures, 8 field divisions, 9 ordinaries, 20+ charges.
- `src/logic/svg-renderer.js` — pure function. Takes heraldic spec JSON → returns SVG string. All shapes inline, no external files needed.
- `src/svg/logo.svg` — St. George in full armour running away from a chicken that is breathing fire. Delivered completely straight.

### Tests (tests/)
- `tests/domain.test.js` — 12 unit tests, all green. Tests tincture(), shieldPath(), renderSpec().

### Scripts (scripts/)
- `scripts/pipeline-report.sh` — 6-layer pipeline (auth/unit/contract/acceptance/UI/OAT). Run: `bash scripts/pipeline-report.sh`
- `scripts/deploy.sh` — ONLY way to deploy. Runs pipeline first, then deploys.
- `scripts/check-auth.sh` — auth canary

---

## Deploy procedure

```bash
# ALWAYS use explicit account ID — wrangler has a stale cache bug
CF_TOKEN=$(cat ~/.cf-deploy-token)
CLOUDFLARE_API_TOKEN="$CF_TOKEN" CLOUDFLARE_ACCOUNT_ID=ce5ebfc99d1b37a7537a039d0b09d0b6 npx wrangler deploy --config wrangler.toml

# After setting a new secret, ALWAYS redeploy — secrets don't propagate without it
echo "sk-ant-..." | CLOUDFLARE_API_TOKEN="$CF_TOKEN" CLOUDFLARE_ACCOUNT_ID=ce5ebfc99d1b37a7537a039d0b09d0b6 npx wrangler secret put ANTHROPIC_API_KEY --config wrangler.toml
```

---

## Completed & Shipped Features

- ✅ **Mode I (Location Flag)** — 100% implemented & live
- ✅ **Mode II (Family / Group Crest)** — 100% implemented & live with Allied Houses UI
- ✅ **Mode III (Municipal Tourist Board & TripAdvisor Audit)** — 100% implemented & live with desperate brochure copy, acidic audit reviews, and 1–5 star customer reviews
- ✅ **GitHub Repo & Live Pages** — Live at `https://github.com/Asspirited/flagrants.git` & `https://asspirited.github.io/flagrants/`
- ✅ **3D Hybrid Layered Renderer** — Gold leaf emboss, metallic gradients, zero latency (<15ms)
- ✅ **Fast Lens Switcher** — Instant re-design without re-research
- ✅ **Crest Image Export** — Download as PNG or SVG
- ✅ **Automated Test Suite** — 36/36 tests pass green (across 6 test suites)
- ✅ **FG-008 Cutting Profanity Register** — Implemented in prompt system and founding philosophy

---

## Future Backlog / Enhancements

- **FG-009: Rule of Tincture & High-Contrast Field Engine** — Enforce classical contrast rules (Metal on Colour, Colour on Metal) in AI design prompt and validator (`validateSpec`). Prevent dark-on-dark split fields (e.g. `sable` + `azure`).
- **FG-010: Contextual Historical Tincture & Symbol Matching** — Systematically map research themes (maritime, industrial, agrarian, royal, scandal) to matching tinctures and charges for maximum historical resonance.
- **FG-011: Bayeux Tapestry & Medieval Marginalia Graphic Engine** — Replace 1980s-style geometric icons with hilarious, absurd Bayeux Tapestry embroidered depictions (fleeing knights, bizarre heraldic beasts, embroidered stitch textures, illuminated manuscript marginalia).
- **FG-012: Un-Censored Deep Dark Research & Absurdity Filter Expansion** — Un-constrain research prompt guidelines to unearth obscure dark folklore, bizarre historical court rolls, bestiality accusations, gallows lore, and absurd local scandals.
- **FG-013: Segment Picture Story-to-Artwork Correlation Contract** — Dynamically correlate the segment picture artwork with the specific story in the Herald's commentary (e.g. mayor escaping in a laundry basket depicted in tapestry style).
- Playwright E2E visual snapshot testing
- Mobile PWA offline caching

---

## The Slough test output (proof it works)

Motto: **Hic Manebimus Optime** — Here We Shall Remain, Excellently

Commentary on the tower: *"The tower is placed at the base of the arms, which heraldic convention associates with foundations. The commentary writes itself, and so the Herald shall refrain."*

Commentary on the motto: *"Hic Manebimus Optime — Here We Shall Remain, Excellently — was selected to address the town's curious administrative history, having been transferred from Buckinghamshire to Berkshire in 1974 in circumstances that suggested less a reorganisation of local government than an attempt by one county to return a gift."*

---

## Known issues / waste items

See `docs/waste-log.md` for full entries.

- **FG-WL-001:** Cloudflare secret propagation — always redeploy after secret put
- **FG-WL-002:** GitHub 2FA lockout — account recovery in progress, 1-3 days

---

## Handover file list

```
HANDOVER.md                    ← this file — start here
docs/
  founding-philosophy.md       ← constitution — read first
  architecture.md              ← system design
  design-principles.md         ← The Grand Contradiction
  character-notes-raw.md       ← Rod's verbatim notes
  waste-log.md                 ← known issues
code/
  worker.js                    ← Cloudflare Worker (deploy this)
  index.html                   ← frontend (open in browser)
  wrangler.toml                ← worker config
  package.json                 ← test scripts
src/
  data/heraldic-vocabulary.js  ← controlled vocab
  logic/svg-renderer.js        ← SVG generation (pure function)
  svg/logo.svg                 ← St George fleeing a chicken
scripts/
  pipeline-report.sh           ← run the pipeline
  deploy.sh                    ← deploy (runs pipeline first)
  check-auth.sh                ← auth canary
tests/
  domain.test.js               ← 12 unit tests (all green)
```
