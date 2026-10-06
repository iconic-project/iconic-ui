#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

url="${API_OPENAPI_URL:-http://localhost:8000/docs/api.json}"
committed="app/types/api.d.ts"
fresh="$(mktemp)"

pnpm dlx openapi-typescript@7.13.0 "$url" -o "$fresh"

header='/**
 * Generated from the API OpenAPI spec. Committed. Do not edit by hand.
 * Regenerate with: pnpm types:api
 */'

if ! grep -q 'Regenerate with: pnpm types:api' "$fresh"; then
  tmp="$(mktemp)"
  {
    printf '%s\n\n' "$header"
    cat "$fresh"
  } > "$tmp"
  mv "$tmp" "$fresh"
fi

if [ -x node_modules/.bin/eslint ]; then
  node_modules/.bin/eslint --fix "$fresh"
fi

if ! diff -q "$committed" "$fresh" >/dev/null; then
  echo "app/types/api.d.ts drifted from ${url}. Run pnpm types:api." >&2
  diff -u "$committed" "$fresh" | head -n 80 >&2 || true
  rm -f "$fresh"
  exit 1
fi

rm -f "$fresh"
