# mr-frontend-portfolio

React 19 + TypeScript starter: Vite, Chakra UI v3, TanStack Query, Zustand, React Hook Form + Zod, React Router v7 (data router). See `CLAUDE.md` for the full set of coding conventions used in this repo.

## Stack

| Concern       | Library                                    |
| ------------- | ------------------------------------------- |
| UI components | Chakra UI v3                                |
| Styling       | SCSS + BEM (`src/styles/`)                  |
| Data fetching | TanStack React Query v5                     |
| Global state  | Zustand v5                                  |
| Forms         | react-hook-form + zod + @hookform/resolvers |
| Routing       | react-router v8 (data router)               |
| Testing       | Vitest + React Testing Library              |
| Build         | Vite 7, TypeScript 5.9 (strict mode)         |

## Getting started

```sh
bun install
cp .env.example .env.local   # fill in VITE_API_URL
bun dev                      # http://localhost:3000
```

## Scripts

| Script               | Description                              |
| --------------------- | ---------------------------------------- |
| `bun dev`             | Start the Vite dev server                |
| `bun run build`       | Type-check (`tsc -b`) and build for prod |
| `bun run preview`     | Preview the production build             |
| `bun run lint`        | Run ESLint                               |
| `bun run lint:fix`    | Run ESLint with `--fix`                  |
| `bun run format`      | Run Prettier (write)                     |
| `bun run format:check`| Run Prettier (check only)                |
| `bun run test`        | Run the Vitest suite once                |
| `bun run test:watch`  | Run Vitest in watch mode                 |

A Husky pre-commit hook runs `lint`, `format:check`, and `build` before every commit.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values. Env vars are declared and validated in `src/lib/env.ts` (zod) — add new keys to both `src/vite-env.d.ts` (`ImportMetaEnv`) and the zod schema there.

| Variable         | Description               |
| ---------------- | -------------------------- |
| `VITE_API_URL`   | Base URL of the backend API |

## Project structure

```
src/
  components/       # rev-frontend-style per-component folders (ui/ = Chakra-based primitives)
  lib/
    api/            # fetchWithAuth + one domain per subfolder (HTTP fns + use-queries/)
    env.ts           # zod-validated env vars
  store/            # Zustand stores (ui/, auth/) — see CLAUDE.md for naming conventions
  routes/           # createBrowserRouter setup, ROUTES constants, ProtectedRoute
  pages/            # one folder per route
  styles/           # SCSS: abstracts/ (tokens+mixins), base/ (reset), blocks/ (BEM blocks)
```

## Deployment note

This app uses a client-side data router (`createBrowserRouter`). Any static host needs an SPA rewrite-to-`index.html` rule (Netlify `_redirects`, Vercel `vercel.json`, nginx `try_files`, etc.) or deep links (e.g. `/about`) will 404.
