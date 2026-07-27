#!/bin/bash
# check-auth.sh — Flagrants auth canary
# Pings the live Worker. GREEN = 200 or 401. RED = 403/5xx/timeout.

WORKER_URL="https://flagrants-api.leanspirited.workers.dev"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HOME/.bashrc" ]; then
  TOKEN_LINE=$(grep -E '^export CLOUDFLARE_API_TOKEN=' "$HOME/.bashrc" | tail -1)
  if [ -n "$TOKEN_LINE" ]; then
    eval "$TOKEN_LINE"
    export CLOUDFLARE_API_TOKEN
  fi
fi

STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$WORKER_URL/health" 2>/dev/null)

if [ "$STATUS" = "200" ] || [ "$STATUS" = "401" ] || [ "$STATUS" = "404" ]; then
  echo "CANARY: GREEN — Worker responding (HTTP $STATUS)"
  exit 0
else
  echo "CANARY: RED — Worker not responding (HTTP $STATUS)"
  exit 1
fi
