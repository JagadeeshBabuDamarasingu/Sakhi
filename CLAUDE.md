# Shakthi Monorepo

## Critical: Package Manager Rules

**Never run `pnpm install` or `pnpm approve-builds`** — these commands cause conflicts in this environment. When package.json changes require an install, tell the user to run it themselves.

## Project Structure

```
shakthi/
├── apps/               # Web applications (pnpm workspace)
│   ├── nari/           # Main consumer web app (Next.js) — package: web-nari
│   ├── admin/          # Admin portal (placeholder)
│   └── marketplace/    # Marketplace web app (placeholder)
├── packages/
│   ├── protocols/      # Protobuf generated types — @shakthi/protocols
│   └── tsconfig/       # Shared TypeScript configs — @shakthi/tsconfig
├── functions/          # Firebase Cloud Functions (pnpm workspace)
├── mobile/             # Mobile apps (Flutter)
│   ├── nari/
│   └── marketplace/
├── ai/                 # AI/Genkit services
├── firebase.json       # Firebase project config
├── apphosting.yaml     # Firebase App Hosting (Cloud Run) config
├── firestore.rules     # Firestore security rules
└── storage.rules       # Firebase Storage security rules
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 (App Router, Turbopack, React Compiler)
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Backend**: Firebase (App Hosting, Firestore, Functions, Storage, Auth)
- **TypeScript**: 6.0.x across all packages
- **Testing**: Vitest + React Testing Library

## Shared Packages

- `@shakthi/tsconfig` — extend in tsconfig.json via `./nextjs.json` or `./node.json`
- `@shakthi/protocols` — protobuf-generated types (buf generate)

## Firebase

- Project: `nari-shakthi-dev`
- App Hosting backend: `nari-web-dev` → deploys `apps/nari`
- Firebase config lives in `apps/nari/.env.local` (gitignored); see `.env.example` for keys

## Turbo Tasks

| Task | Description |
|---|---|
| `build` | Full monorepo build (respects `^build` deps) |
| `dev` | Persistent dev server (not cached) |
| `lint` | Lint all packages |
| `test` | Run tests (cached) |
| `proto:generate` | Generate protobuf types |
| `mobile:build` | Build mobile apps |
| `rust:build` | Build Rust targets |
