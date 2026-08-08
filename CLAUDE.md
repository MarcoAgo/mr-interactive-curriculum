# mr-frontend-portfolio — Claude Rules

This is a React 19 + TypeScript app built with Vite, Chakra UI v3, TanStack Query, Zustand, react-hook-form + zod, and react-router v8 (data router). Read this file before writing any code.

---

## Stack at a glance

| Concern | Library |
|---|---|
| UI components | Chakra UI v3 |
| Data fetching | TanStack React Query v5 |
| Global state | Zustand v5 |
| Forms | react-hook-form + zod + @hookform/resolvers |
| Routing | react-router v8 (data router: `createBrowserRouter`) |
| Styling | SCSS + BEM (`src/styles/`) |
| Testing | Vitest + React Testing Library |
| Build | Vite 7, TypeScript 5.9 strict mode |

---

## Project structure

```
src/
  App.tsx                    # <RouterProvider router={router}/> only
  main.tsx                   # providers, global styles import, auth init
  routes/
    router.tsx                # createBrowserRouter — route tree lives here
    routes.constants.ts       # ROUTES object
    ProtectedRoute/            # layout-route auth guard (<Outlet/> or redirect)
  pages/
    <Page>/
      <Page>.tsx
      index.ts
  components/
    ui/                        # Chakra-based primitives (Provider, ColorMode, Toaster, Modal)
    ErrorBoundary/
    <ComponentName>/           # every other component — see "Component conventions"
  store/
    <domain>/
      <domain>.store.ts         # create<TStoreModel>()(...)
      <domain>.types.ts         # T-prefixed types
      <domain>.selectors.ts     # selector<Store><Slice> functions
      use-<domain>.ts           # public hook — mandatory selector arg
  lib/
    env.ts                     # zod-validated env vars
    api/
      _helpers/                 # buildQueryString, response helpers
      <domain>/
        <domain>.ts              # pure HTTP functions
        <domain>.types.ts
        use-queries/
          <domain>.ts            # useQuery / useMutation hooks
          index.ts
    storage/                    # localStorage helpers
  styles/
    abstracts/                  # SCSS variables (CSS custom properties) + mixins
    base/                       # reset, typography, scrollbar
    blocks/                     # one BEM block per partial (_button.scss, _card.scss, …)
    main.scss                   # @use/@forward entrypoint
  types/                       # shared cross-domain types
```

---

## Path aliases (always use these)

```ts
@/               → src/
@/components/    → src/components/
@/lib/           → src/lib/
@/store/         → src/store/
@/routes/        → src/routes/
@/pages/         → src/pages/
@/hooks/         → src/hooks/
@/types/         → src/types/
@/styles/        → src/styles/
```

Never use relative `../../` imports when a path alias covers the target. Aliases are defined once in `tsconfig.app.json` — `vite-tsconfig-paths` reads them, so there is no separate `resolve.alias` block in `vite.config.ts`.

---

## TypeScript rules

- Strict mode is on (`strict`, `noImplicitReturns`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`). Write code that satisfies all of them.
- Use `import type` for every type-only import.
- Never use `any`. Use type narrowing, `unknown`, or targeted casts only when unavoidable.
- Props interfaces live in `ComponentName.types.ts` and are named `ComponentNameProps` — always `interface`, not `type`. Derived unions (variants, actions) use `type`.
- Env vars declared in `src/vite-env.d.ts`'s `ImportMetaEnv` are known keys — use dot notation (`import.meta.env.VITE_API_URL`). Only use bracket notation for genuinely dynamic/untyped keys.
- Add JSDoc comments (`/** ... */`) only for non-obvious constraints or public-facing APIs.

---

## Component conventions

### File layout (every component)

```
ComponentName/
  ComponentName.tsx           # JSX + wiring only — no inline constants/logic
  ComponentName.types.ts      # Props interface (omit if props are trivial inline types)
  index.ts                    # Barrel export — component + props type only
  _partials/                  # Sub-components used only inside this component
  _helpers/                   # Pure helpers used only inside this component
  _constants/                 # Constants, default values (SCREAMING_SNAKE_CASE, `as const`)
```

Create files only as needed — never scaffold empty placeholder folders. `_partials/` filenames are the concatenation `ComponentName` + `SubPartName` (e.g. `CardHeader.tsx` inside `Card/_partials/`). If a partial becomes reusable elsewhere, promote it to a full top-level component. Generation order: `.types.ts` → `.constants.ts` → `.helpers.ts` → `_partials/` → main `.tsx` → `index.ts` → `.test.tsx`.

### Code rules

- **Named exports only.** Never use `export default` for components (the two Vite-required exceptions are `App.tsx` and `main.tsx`).
- Keep components presentational. Move data transformation / payload building to `_helpers`.
- Use `classnames` for conditional BEM class names — never inline style objects for layout/spacing.
- **Never nest conditionals for render branching in JSX.** Do not chain ternaries or nest `if`s inside the returned markup. Resolve each state (loading / empty / error) with an **early return** before the main `return`. A single, flat ternary for one either/or inside the final return is fine; anything deeper must be an early return.

### `components/ui/` vs everything else

`components/ui/` holds Chakra-based primitives that wrap the design system (`Provider`, `ColorMode`, `Toaster`, `Modal`) — these follow the same per-folder convention as any other component. Everything else (`Button`, `Card`, feature components) lives directly under `components/`.

---

## CSS / BEM conventions

- Plain SCSS + BEM — **not** CSS Modules. Naming: `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`.
- One partial file per block, `kebab-case`, underscore-prefixed: `src/styles/blocks/_card.scss`.
- Global structure: `styles/abstracts/` (design tokens as CSS custom properties + mixins) → `styles/base/` (reset, typography, scrollbar) → `styles/blocks/` (one BEM block per component family) → `styles/main.scss` (the only file that `@use`/`@forward`s everything; imported once in `main.tsx`).
- Use `@use`/`@forward`, never `@import`.
- Elements always reference the block, never each other (`.card__title`, not `.card__header__title`). Modifiers never stand alone in markup.
- Never set external margins/positioning inside a block — that belongs to the parent (use the "mix" technique: an element carries a second, layout-only class from its parent context).
- No tag/ID selectors, no `!important`, no descendant selectors between blocks.
- Design tokens (colors, spacing, radii, shadows, transitions) are CSS custom properties in `styles/abstracts/_variables.scss` — reference them (`var(--spacing-md)`), never hardcode raw values.

---

## Forms

1. Always use `react-hook-form` + `FormProvider` + `zodResolver`.
2. Put the validation schema and inferred form type in `_constants/validation-schema.constants.ts`:
   ```ts
   export const MY_VALIDATION_SCHEMA = z.object({ ... });
   export type MyFormData = z.infer<typeof MY_VALIDATION_SCHEMA>;
   ```
3. Put default values in `_constants/default-values.constants.ts` when non-trivial.
4. Split complex forms into `_partials/<Section>Fields.tsx` files.
5. Payload-building logic (form data → API request shape) goes in `_helpers/build-payload.helpers.ts` — never inline in `onSubmit`.
6. Always disable the submit button while the mutation is pending (`isPending`).
7. Show toast feedback on success/error via `useUiStore` (`selectorUiToastSuccess`/`selectorUiToastError`).
8. After success, navigate with `useNavigate`.

---

## API layer (`src/lib/api/<domain>/`)

### HTTP functions (`<domain>.ts`)

- One file per domain with pure async functions: `getX`, `createX`, `updateX`, `deleteX`.
- Always use `fetchWithAuth` (from `src/lib/api/auth/_helpers/auth.helpers.ts`) for authenticated endpoints.
- Always use `env.VITE_API_URL` (from `@/lib/env`) for the base URL — never read `import.meta.env` directly outside `lib/env.ts`.
- Build query strings with `buildQueryString` from `src/lib/api/_helpers/query-string-builder.ts`. Never concatenate params manually.
- Always check `response.ok` and throw a descriptive error when false.
- Always type the return value: `Promise<MyType>`.

### React Query hooks (`use-queries/<domain>.ts`)

- Naming: queries → `useGetXxx`, mutations → `useCreateXxx` / `useUpdateXxx` / `useDeleteXxx`.
- `queryKey` must be a stable, descriptive array: `["posts", params]`, `["post", id]`.
- Use `enabled` when a prerequisite value might be undefined.
- After mutations, invalidate related queries: `queryClient.invalidateQueries({ queryKey: ["posts"] })`.
- After delete mutations, also remove the detail cache: `queryClient.removeQueries({ queryKey: ["post", id] })`.
- Never import UI components or stores inside the API layer (the auth store is the one sanctioned exception, via `fetchWithAuth`).

---

## Zustand stores (`src/store/<domain>/`)

```
<domain>.store.ts       # create<TDomainStoreModel>()(...)  — state + actions
<domain>.types.ts       # T-prefixed types/interfaces
<domain>.selectors.ts   # selector<Domain><Slice> functions, one per state slice/action
use-<domain>.ts         # public hook — mandatory selector argument
```

- Type names are `T`-prefixed (`TUiStoreModel`, `TModalOptions`).
- Selector names are `selector<Store><Slice>` (e.g. `selectorUiIsSidebarOpen`, `selectorUiOpenModal`) — one per state slice and per action. Never a composite/object selector.
- The public hook takes a **mandatory selector argument** — components can never grab the whole store: `useUiStore(selectorUiIsSidebarOpen)`, never `useUiStore((s) => s)`.
- Use explicit named actions (`openModal`, `closeModal`, `setSidebarOpen`).
- Side effects (localStorage sync, toaster calls) are allowed inside store actions only.
- Use `create<T>()(...)` (curried form), even without middleware, for consistency.
- Only reach for `persist` when state genuinely needs to survive a refresh (e.g. auth tokens via `token-storage.ts`); the UI store is intentionally a plain in-memory singleton.
- Never put JSX or CSS inside `store/`.

---

## Routing

- **Package split (v8):** `react-router-dom` no longer exists. `RouterProvider`/`HydratedRouter` import from `react-router/dom`; everything else (`createBrowserRouter`, `Link`, `Navigate`, `Outlet`, `useNavigate`, `useRouteError`, …) imports from `react-router`.
- All route path strings live in `src/routes/routes.constants.ts`'s `ROUTES` object. Dynamic paths are functions: `POST_DETAIL: (id: string) => \`/posts/\${id}\``.
- The route tree is built with `createBrowserRouter` in `src/routes/router.tsx` and rendered via `<RouterProvider router={router} />` (from `react-router/dom`) in `App.tsx`.
- Every route gets an `errorElement` (see `pages/RouteError`) so a thrown error in one route doesn't blank the whole app.
- Code-split routes with React Router's native `lazy` API (`lazy: async () => { const { X } = await import("@/pages/X"); return { Component: X }; }`) — do not mix in `React.lazy`/`Suspense` for routes; that's a different pattern and the two should not be combined in this codebase.
- Gate authenticated routes with `<ProtectedRoute>` as a layout route (it renders `<Outlet/>` or redirects to `ROUTES.LOGIN`) — never a boolean check duplicated per page.
- Use `useNavigate` for imperative navigation — never `window.location`.

---

## Pages structure

Each route lives under `src/pages/<Page>/` as a single `<Page>.tsx` + `index.ts` (add `_partials/`/`_helpers/`/`_constants/` only once a page grows complex enough to need them — same rules as any other component).

- Pages are thin orchestrators: fetch data, handle navigation, wire callbacks. They delegate rendering to components.
- Resolve loading / empty / error states with early returns, same as any component.
- Open confirmation modals via `useUiStore` (`selectorUiOpenModal`) — never render modals inline with a boolean flag.

---

## Helpers

- Pure functions only: `input → output`, no side effects.
- Naming: `buildXPayload`, `mapXToY`, `normalizeX`, `formatX`.
- Fully type inputs and outputs.
- Never mutate input objects — always return a new object.
- Feature-specific helpers: `<component>/_helpers/` or `<page>/_helpers/`.
- Shared cross-domain helpers: `src/lib/api/_helpers/`.
- No UI, router, or fetch dependencies inside helpers.

---

## Testing (Vitest + React Testing Library)

- Always `test(...)`, **never** `it(...)`.
- **No** `describe(...)` blocks.
- **No** `data-testid` — query with `getByRole`, `getByText`, `getByLabelText`, `getByPlaceholderText`.
- `afterEach(() => cleanup())` in every test file that renders components.
- Repeated mock setup goes in `beforeEach`, never duplicated per test.
- Mock declarations (`vi.fn()`, `vi.mock()`) that are reused across tests go at the **bottom** of the file, after the last test. One-off `vi.fn()`s used inline in a single test may stay inline.
- No comments in test files.
- Test name format: `'<ComponentName /> should <expected behavior>'` or `'functionName() should <expected behavior>'`.
- Files: `ComponentName.test.tsx` (or `.test.ts` for pure functions), colocated in the component/helper's own folder.
- `src/setupTests.ts` polyfills `matchMedia`/`ResizeObserver` for Chakra under jsdom — do not remove.

---

## Anti-patterns — never do these

- No `export default` for components or hooks.
- No direct `fetch` calls inside JSX or components — only in `src/lib/api/<domain>/<domain>.ts`.
- No `any` type.
- No mixing of view + schema + helpers + types in a single file.
- No manual query string concatenation — always use `buildQueryString`.
- No relative `../../` imports when a path alias applies.
- No inline styles for layout/spacing — use SCSS/BEM.
- No CSS Modules, no Tailwind — this project is SCSS + BEM only.
- No boolean `showModal` state — use `useUiStore`'s `openModal`/`closeModal`.
- No store imports inside the API layer (except the auth store via `fetchWithAuth`).
- No JSX inside `store/` or `lib/`.
- No nested ternaries or nested `if`s for render branching in JSX — resolve loading/empty/error states with early returns.
- No `describe()` blocks or `data-testid` in tests.
- No mixing React Router's native `lazy` route API with `React.lazy`/`Suspense` for the same route.
