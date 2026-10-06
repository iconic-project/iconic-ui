# iconic-ui

Shared Nuxt 4 layer for **iconic-panel** (RMS + CRM) and **iconic-engine**. It owns the design tokens, Nuxt UI theme, fonts, `Ank*` components, and the API / money / date composables.

## What the layer provides

- **Tokens** in `app/assets/css/main.css` — the HILO brand book scale. Legacy names (`--forest`, `--coral`, `--ivory`, `--hair`…) alias those tokens. Light is the default; dark uses the brand book's dark tokens.
- **Nuxt UI theme** in `app/app.config.ts` — back-office sizes (RMS / CRM). The engine uses the same compact controls.
- **Font** Satoshi, from Fontshare.
- **Components** (`AnkLabel`, `AnkPill`, `AnkPanel`, `AnkKpi`, `AnkMoney`, `AnkThemeToggle`).
- **Composables:** `useApi()`, `useMoney()`, `useDates()`.
- **Generated API types** in `app/types/api.d.ts` (aliases in `app/types/index.ts`).
- **i18n** locale `en` for layer UI strings (theme toggle).

Nothing app-specific belongs here. If only one app uses it, it lives in that app.

## How apps consume it

Locally the sibling folder (A13). On Netlify, when that folder is missing, the apps extend the public GitHub `dev` branch. No release tag is on `iconic-project/iconic-ui` yet.

```ts
const localUi = resolve(import.meta.dirname, '../iconic-ui')

extends: [
  existsSync(localUi)
    ? '../iconic-ui'
    : 'github:iconic-project/iconic-ui#dev'
]
```

Pin a tag once one is pushed. Do not publish this package to npm.

`@nuxt/ui` and `tailwindcss` versions in the apps **must match** this layer. Today that is `@nuxt/ui` `^4.11.1` and `tailwindcss` `^4.3.3`. If you bump one, bump the others in the same change.

## API types

`app/types/api.d.ts` is generated from the API OpenAPI spec and committed. Do not edit it by hand.

Regenerate after every API change the apps consume, and before starting the frontend tasks of a sprint:

```bash
pnpm types:api
pnpm types:check
```

`types:check` fails when `app/types/api.d.ts` differs from a fresh generation of the same URL.

The script reads `${API_OPENAPI_URL:-http://localhost:8000/docs/api.json}` (API must be running). Convenient aliases live in `app/types/index.ts`. Hotel inventory is `Property`, `Room`, `RoomType`, and the night calendar. A stay is check-in and check-out. v0.18.0 removed the departure, cabin, itinerary, and manifest aliases. Engine aliases come only from `/api/engine` schemas. CRM aliases come only from `/api/crm` schemas. Privacy aliases come only from `/api/privacy` schemas.

## Style guide

The `.playground` app is the visual spec.

```bash
pnpm install
pnpm dev
```

http://localhost:3010 — port **3010** so it never collides with the engine on 3000. Light by default; use the header toggle for dark.

## Quality

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`build` builds the playground.

## How to release

Semantic version git tags (`v0.1.0`, `v0.2.0`…). Breaking changes bump the **minor** while the version is `< 1.0`. Write a line in `CHANGELOG.md` per release.

1. Bump `"version"` in `package.json`.
2. Add the release notes to `CHANGELOG.md`.
3. Commit.
4. Tag and push:

```bash
git tag v0.1.0
git push origin HEAD
git push origin v0.1.0
```
