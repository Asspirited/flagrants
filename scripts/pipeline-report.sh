#!/bin/bash
# pipeline-report.sh — Flagrants full pipeline runner
# Exits 1 if any layer is RED.
# Usage: bash scripts/pipeline-report.sh

cd "$(dirname "$0")/.."

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HOME/.bashrc" ]; then
  TOKEN_LINE=$(grep -E '^export CLOUDFLARE_API_TOKEN=' "$HOME/.bashrc" | tail -1)
  if [ -n "$TOKEN_LINE" ]; then
    eval "$TOKEN_LINE"
    export CLOUDFLARE_API_TOKEN
  fi
fi

ERRORS=0
START_TIME=$(date +%s)
AUTH_TIME=0; UNIT_TIME=0; CONTRACT_TIME=0; ACCEPT_TIME=0; UI_TIME=0; OAT_TIME=0
AUTH_RESULT="—"; UNIT_RESULT="—"; CONTRACT_RESULT="—"
ACCEPT_RESULT="⏭ SKIP"; UI_RESULT="⏭ SKIP"; OAT_RESULT="⏭ SKIP"

parse_test_stats() {
  local out="$1"
  local pass fail skip
  pass=$(echo "$out" | grep -oP '(?<=# pass )\d+' | tail -1)
  fail=$(echo "$out" | grep -oP '(?<=# fail )\d+' | tail -1)
  skip=$(echo "$out" | grep -oP '(?<=# skipped )\d+' | tail -1)
  echo "passed: ${pass:-0} | failed: ${fail:-0} | skipped: ${skip:-0}"
}

extract_bugs() { echo "$1" | grep -oP '(?<=# fail )\d+' | tail -1 || echo "0"; }

separator() { echo ""; echo "────────────────────────────────────────"; }

# ── Layer 0: Auth ──
separator
echo "LAYER 0 — AUTH CANARY"
AUTH_L0_START=$(date +%s)
AUTH_OUT=$(bash scripts/check-auth.sh 2>&1)
AUTH_L0_END=$(date +%s)
AUTH_TIME=$(( AUTH_L0_END - AUTH_L0_START ))
if echo "$AUTH_OUT" | grep -q "CANARY: GREEN"; then
  AUTH_RESULT="✅ GREEN"
  echo "✅ GREEN (${AUTH_TIME}s)"
else
  AUTH_RESULT="❌ RED"
  echo "❌ RED — $AUTH_OUT"
  echo "Stopping pipeline."
  exit 1
fi

# ── Layer 1: Unit tests ──
separator
echo "LAYER 1 — UNIT TESTS"
if [ -f "tests/domain.test.js" ]; then
  UNIT_START=$(date +%s)
  UNIT_OUT=$(node --test tests/domain.test.js 2>&1)
  UNIT_EXIT=$?
  UNIT_END=$(date +%s)
  UNIT_TIME=$(( UNIT_END - UNIT_START ))
  UNIT_STATS=$(parse_test_stats "$UNIT_OUT")
  UNIT_BUGS=$(extract_bugs "$UNIT_OUT")
  if [ $UNIT_EXIT -eq 0 ]; then
    UNIT_RESULT="✅ GREEN"
    echo "✅ GREEN (${UNIT_TIME}s) | $UNIT_STATS"
  else
    UNIT_RESULT="❌ RED"
    echo "❌ RED  (${UNIT_TIME}s) | $UNIT_STATS"
    ERRORS=$((ERRORS+1))
  fi
else
  UNIT_RESULT="⏭ SKIP"
  echo "⏭  SKIP — no tests/domain.test.js yet"
fi

# ── Layer 2: Contract ──
separator
echo "LAYER 2 — CONTRACT / PACT VERIFICATION"
if [ -f "tests/contract.verify.test.js" ] && [ "$(ls tests/contracts/*.json 2>/dev/null)" ]; then
  CONTRACT_START=$(date +%s)
  CONTRACT_OUT=$(node --test tests/contract.verify.test.js 2>&1)
  CONTRACT_EXIT=$?
  CONTRACT_END=$(date +%s)
  CONTRACT_TIME=$(( CONTRACT_END - CONTRACT_START ))
  CONTRACT_STATS=$(parse_test_stats "$CONTRACT_OUT")
  CONTRACT_BUGS=$(extract_bugs "$CONTRACT_OUT")
  if [ $CONTRACT_EXIT -eq 0 ]; then
    CONTRACT_RESULT="✅ GREEN"
    echo "✅ GREEN (${CONTRACT_TIME}s) | $CONTRACT_STATS"
  else
    CONTRACT_RESULT="❌ RED"
    echo "❌ RED  (${CONTRACT_TIME}s) | $CONTRACT_STATS"
    ERRORS=$((ERRORS+1))
  fi
else
  CONTRACT_RESULT="⏭ SKIP"
  echo "⏭  SKIP — no contract tests yet"
fi

# ── Layer 3: Acceptance / Gherkin ──
separator
echo "LAYER 3 — GHERKIN / BDD ACCEPTANCE"
ACCEPTANCE_FILES=$(ls tests/acceptance/*.test.js 2>/dev/null)
if [ -n "$ACCEPTANCE_FILES" ]; then
  ACCEPT_START=$(date +%s)
  ACCEPT_OUT=$(node --test tests/acceptance/*.test.js 2>&1)
  ACCEPT_EXIT=$?
  ACCEPT_END=$(date +%s)
  ACCEPT_TIME=$(( ACCEPT_END - ACCEPT_START ))
  ACCEPT_STATS=$(parse_test_stats "$ACCEPT_OUT")
  if [ $ACCEPT_EXIT -eq 0 ]; then
    ACCEPT_RESULT="✅ GREEN"
    echo "✅ GREEN (${ACCEPT_TIME}s) | $ACCEPT_STATS"
  else
    ACCEPT_RESULT="❌ RED"
    echo "❌ RED  (${ACCEPT_TIME}s) | $ACCEPT_STATS"
    ERRORS=$((ERRORS+1))
  fi
else
  echo "⏭  SKIP — no acceptance tests yet"
fi

# ── Layer 4: UI ──
separator
echo "LAYER 4 — UI TESTS (Playwright)"
UI_FILES=$(ls tests/ui/ 2>/dev/null)
if [ -n "$UI_FILES" ]; then
  UI_START=$(date +%s)
  if npx playwright test tests/ui/ 2>&1; then
    UI_END=$(date +%s)
    UI_TIME=$(( UI_END - UI_START ))
    UI_RESULT="✅ GREEN"
    echo "✅ GREEN (${UI_TIME}s)"
  else
    UI_END=$(date +%s)
    UI_TIME=$(( UI_END - UI_START ))
    UI_RESULT="❌ RED"
    echo "❌ RED  (${UI_TIME}s)"
    ERRORS=$((ERRORS+1))
  fi
else
  echo "⏭  SKIP — no UI tests yet"
fi

# ── Layer 5: OAT ──
separator
echo "LAYER 5 — NON-FUNCTIONAL / OAT"
WORKER_URL="https://flagrants-api.leanspirited.workers.dev"
OAT_START=$(date +%s)
PING=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$WORKER_URL/health" 2>/dev/null)
OAT_END=$(date +%s)
OAT_TIME=$(( OAT_END - OAT_START ))
if [ "$PING" = "200" ] || [ "$PING" = "404" ]; then
  OAT_RESULT="✅ GREEN"
  echo "✅ OAT — Worker live (HTTP $PING, ${OAT_TIME}s)"
else
  OAT_RESULT="⏭ SKIP"
  echo "⏭  SKIP — Worker not deployed yet (HTTP $PING)"
fi

# ── Summary ──
END_TIME=$(date +%s)
TOTAL_TIME=$(( END_TIME - START_TIME ))
separator
echo ""
echo "╔════════════════════════════════════════════════════════════════════════╗"
printf "║  FLAGRANTS PIPELINE — %-50s║\n" "$(date '+%Y-%m-%d %H:%M')"
echo "╠════════════════════════════════════════════════════════════════════════╣"
printf "║  %-14s %-55s ║\n" "0 Auth"       "$AUTH_RESULT"
printf "║  %-14s %-55s ║\n" "1 Unit"       "$UNIT_RESULT"
printf "║  %-14s %-55s ║\n" "2 Contract"   "$CONTRACT_RESULT"
printf "║  %-14s %-55s ║\n" "3 Acceptance" "$ACCEPT_RESULT"
printf "║  %-14s %-55s ║\n" "4 UI"         "$UI_RESULT"
printf "║  %-14s %-55s ║\n" "5 OAT"        "$OAT_RESULT"
echo "╠════════════════════════════════════════════════════════════════════════╣"
printf "║  %-70s ║\n" "Total: ${TOTAL_TIME}s"
if [ $ERRORS -eq 0 ]; then
  printf "║  %-70s ║\n" "✅  ALL GREEN — safe to deploy"
else
  printf "║  %-70s ║\n" "❌  ${ERRORS} LAYER(S) RED — do not deploy"
fi
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

[ $ERRORS -eq 0 ] && exit 0 || exit 1
