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
