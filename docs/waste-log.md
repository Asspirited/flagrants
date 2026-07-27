# Flagrants Waste Log

## FG-WL-001 — Cloudflare secret propagation requires redeploy
**Date:** 2026-07-27
**Cost:** ~5 min, one failed e2e test
**Symptom:** Worker returned 401 from Anthropic immediately after wrangler secret put.
**Root cause:** Cloudflare secrets do not propagate to running worker instances until redeploy.
**Fix:** Always redeploy after secret put. secret put + deploy are always a pair.

## FG-WL-002 — GitHub 2FA lockout
**Date:** 2026-07-27
**Cost:** TBD — blocking all pushes to github.com/Asspirited
**Symptom:** 2FA required, no authenticator app, recovery codes rejected.
**Root cause:** GitHub 2FA state drift — recovery codes either already used or mismatched.
**Fix options:**
  1. GitHub support (support.github.com) — account recovery with verified email leanspirited@gmail.com
  2. Check if any backup codes were saved elsewhere (Downloads, email)
  3. If SSH key is still registered on the account, GitHub may allow key-based recovery
**Immediate impact:** Cannot create new repos or push via HTTPS. SSH push works IF repo exists.
**Status:** OPEN — code committed locally, worker deployed, not blocked on product work.

## FG-WL-003 — Background task hung silently on permission error without cross-session reporting
**Date:** 2026-07-27
**Cost:** ~45 min developer delay & manual session status check
**Symptom:** Session reported initiating background `git push` task and promised notification on completion, but hung silently and never reported back.
**Root cause:**
  1. Fine-grained Personal Access Token lacked `Contents: Read and write` permission, causing background `git push` to fail with HTTP 403.
  2. Antigravity background task notifications are scoped to the originating conversation session (`f9731bbc-0519-44ed-9c74-f7f5c50557f5`); opening a new session prevented cross-thread completion/failure delivery.
**Fix:**
  1. Updated PAT scope on GitHub to include repository `Contents: Read and write`.
  2. Re-triggered `git push` synchronously in active session to verify tracking and completion.

## FG-WL-004 — Duplicate Inlined SVG Renderer in worker.js causing fix desynchronization
**Date:** 2026-07-27
**Cost:** ~30 min developer investigation & user frustration
**Symptom:** UI alignment fix for shield field double translation passed local unit tests on `src/logic/svg-renderer.js`, but live production API continued returning shifted half-fields on mobile.
**Root cause:** `code/worker.js` contained a legacy duplicate `buildSVG()` function (lines 162-180) that was not being updated by `scripts/build-rich-ui.js`. Fixing `src/logic/svg-renderer.js` left `code/worker.js` generating `clipPath` with `transform="translate(120,20)"`.
**Fix:**
  1. Updated `scripts/build-rich-ui.js` to compile `src/logic/svg-renderer.js` directly into `code/worker.js` and eliminate the duplicate `buildSVG()` definition.
  2. Added an automated bundle validation test in `tests/ui-alignment.test.js` asserting that `code/worker.js` contains 0 instances of double-translated `<clipPath>` transforms.

