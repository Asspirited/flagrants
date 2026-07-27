#!/bin/bash
# deploy.sh — THE ONLY WAY TO DEPLOY FLAGRANTS
# Never run wrangler directly. This script has --config baked in.
# Requires CLOUDFLARE_API_TOKEN in environment or ~/.bashrc

set -e

cd "$(dirname "$0")/.."

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HOME/.bashrc" ]; then
  TOKEN_LINE=$(grep -E '^export CLOUDFLARE_API_TOKEN=' "$HOME/.bashrc" | tail -1)
  if [ -n "$TOKEN_LINE" ]; then
    eval "$TOKEN_LINE"
    export CLOUDFLARE_API_TOKEN
  fi
fi

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN not set. Get it from dash.cloudflare.com → My Profile → API Tokens."
  exit 1
fi

echo "Running pipeline before deploy..."
bash scripts/pipeline-report.sh
if [ $? -ne 0 ]; then
  echo "❌ Pipeline RED — deploy blocked."
  exit 1
fi

echo ""
echo "Deploying flagrants-api worker..."
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" npx wrangler deploy --config wrangler.toml

echo ""
echo "✅ Deployed. Worker: https://flagrants-api.leanspirited.workers.dev"
