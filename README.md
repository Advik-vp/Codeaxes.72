# Codeaxes

Codeaxes is a production-ready frontend template for discovering software projects, inspecting their architecture, and turning those ideas into a next build.

The UI is a dark-first project showcase: searchable catalog, detailed system write-ups, local favorites, and a mock Codeaxes AI assistant that can later call a backend `/api/ai` route without rewriting the interface.

## Features

- Project discovery with instant search and technology/tag filters
- Featured home page and detailed project routes
- Architecture, features, and challenges presented as accessible expandable sections
- Favorites persisted in `localStorage` for guest users
- Context-aware Codeaxes AI sidebar with mock responses
- Light/dark theme persisted as `codeaxes:theme`
- Responsive layout from 320px through 1440px+
- WCAG-oriented keyboard support, focus states, and reduced-motion styles
- Vitest + React Testing Library coverage for filters, favorites, routing, and AI

## Technology stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- React Router
- Context API and hooks
- localStorage
- Lucide React
- Vitest and React Testing Library
- ESLint and Prettier

## Project structure

```text
src/
├── components/     # UI: layout, projects, search, AI, common
├── context/        # Project, favorites, theme, and AI state
├── data/           # Sample project catalog
├── hooks/          # useProjects, useFavorites, useLocalStorage
├── pages/          # Route-level screens
├── services/       # askCodeaxesAI abstraction
├── types/          # Project and AI contracts
└── utils/          # Filtering and storage helpers
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Testing

```bash
npm test
npm run test:ui
```

## Production build

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Environment variables

Copy `.env.example` to `.env` if you need a backend origin:

```text
VITE_API_BASE_URL=
```

`VITE_` variables are public. Never put private AI API keys in the frontend. Secrets belong on the server that implements `POST /api/ai`.

## AI architecture

Current MVP:

```text
React UI → aiService.ts → deterministic mock
```

Prepared path:

```text
React UI → /api/ai → Backend → AI provider
```

`askCodeaxesAI({ prompt, projectId })` is the only UI contract. When `VITE_API_BASE_URL` is set, the service posts to `${VITE_API_BASE_URL}/api/ai`. Otherwise it returns a mock, context-aware answer.

## Authentication roadmap

MVP:

```text
Guest → localStorage favorites (codeaxes:favorites)
```

Later:

```text
AuthContext → User → Favorites API → Database
```

Do not store passwords in the browser. The favorites hook can later swap `localStorage` for an authenticated API without changing card or page components.

## Accessibility

- Semantic landmarks and heading hierarchy
- Visible focus rings and skip link
- Keyboard-accessible navigation, filters, dialogs, and AI panel
- Escape closes menus, modal, and the assistant
- Alt text on project artwork
- Contrast-aware dark and light themes
- `prefers-reduced-motion` disables non-essential animation

## Performance

- Route-level code splitting
- Lazy-loaded project thumbnails with reserved aspect ratios
- Local filtering with `useMemo`
- No client-side private API SDKs
- SVG data-URI thumbnails instead of remote image requests

Targets: LCP under 2.5s, INP under 200ms, CLS under 0.1 on a typical catalog page.

## Future roadmap

- Authenticated favorites and project CRUD
- Backend rate limiting and analytics
- Real AI provider behind `/api/ai`
- Editorial CMS for the catalog
- Shareable saved searches

Explore. Build. Ship.
