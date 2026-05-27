# Shakthi Monorepo

## Critical: Package Manager Rules

**Never run `pnpm install` or `pnpm approve-builds`** — these commands cause conflicts in this environment. When package.json changes require an install, tell the user to run it themselves.

## Project Structure

```
shakthi/
├── apps/               # Web applications (pnpm workspace)
│   ├── nari/           # Main consumer web app (Next.js) — package: web-nari
│   ├── admin/          # Admin portal (Next.js) — package: web-admin
│   └── marketplace/    # Marketplace web app (Next.js) — package: web-marketplace
├── packages/           # Shared packages (pnpm workspace)
│   ├── firebase/       # Shared Firebase client init — @shakthi/firebase
│   ├── protocols/      # Protobuf generated types — @shakthi/protocols
│   ├── tsconfig/       # Shared TypeScript configs — @shakthi/tsconfig
│   └── ui/             # Design system (Tailwind v4 + DaisyUI) — @shakthi/ui
├── services/           # Backend services (pnpm workspace)
│   ├── functions/      # Firebase Cloud Functions
│   └── ai/             # AI/Genkit services
├── mobile/             # Mobile apps (Flutter — not in pnpm workspace)
│   ├── nari/
│   └── marketplace/
├── firebase.json       # Firebase project config
├── firestore.rules     # Firestore security rules
└── storage.rules       # Firebase Storage security rules
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 (App Router, Turbopack, React Compiler)
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Backend**: Firebase (App Hosting, Firestore, Functions, Storage, Auth)
- **TypeScript**: 6.0.x across all packages, target ES2022
- **Testing**: Vitest + React Testing Library

## Shared Packages

- `@shakthi/firebase` — singleton Firebase app init; import instead of calling `initializeApp` directly
- `@shakthi/tsconfig` — extend in tsconfig.json via `./nextjs.json` or `./node.json`
- `@shakthi/protocols` — protobuf-generated types (buf generate)
- `@shakthi/ui` — CSS exports: `@shakthi/ui/globals.css`, `@shakthi/ui/themes.css`, etc.

## Firebase

- Project: `nari-shakthi-dev`
- App Hosting backends: `nari-web-dev`, `admin-web-dev`, `marketplace-web-dev`
- Firebase secrets set with: `firebase apphosting:secrets:set <VAR> --backend <backendId>`
- Firebase config lives in each app's `.env.local` (gitignored); see `.env.example` for keys
- Functions source: `services/functions/`

## Turbo Tasks

| Task | Description |
|---|---|
| `build` | Full monorepo build (respects `^build` deps) |
| `dev` | Persistent dev server (not cached) |
| `lint` | Lint all packages (parallelized via `^lint`) |
| `test` | Run tests (cached, parallelized via `^test`) |
| `proto:generate` | Generate protobuf types |
| `mobile:build` | Build mobile apps |
| `rust:build` | Build Rust targets |
