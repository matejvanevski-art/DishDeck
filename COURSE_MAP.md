# DishDeck — Course Coverage Map (Sessions 01–25)

This document maps the techniques in the supplied React course archive to the DishDeck project. It is a study aid for the presentation; it is not a claim that every concept from every lesson is a separate app feature.

| Session | Course topic | Where it appears in DishDeck |
|---|---|---|
| 01 | How the web works | `index.html`, `main.jsx`, Vite/npm setup, browser rendering, module imports/exports |
| 02 | Modern JavaScript | Destructuring props, arrow functions, template literals, spread, `map`, `filter`, `some`, `async/await`, `fetch` |
| 03 | Vanilla JS + Fetch | The API request lifecycle and loading/error/success states are handled in React rather than manual DOM updates |
| 04 | React, JSX, props | Function components, JSX, `MealCard`, props, component tree, list keys |
| 05 | State, events, styling | `useState` in pages/forms, click/change/submit handlers, conditional UI, CSS Modules |
| 06 | Component-driven UI | Reusable components, state shared through context, callbacks passed to child components |
| 07 | `useEffect` and data fetching | `useApi`, effects, dependency arrays, cleanup, loading/error/empty states |
| 08 | Forms and custom hooks | Controlled `SearchBar`, validation of blank input, `useApi`, `useLocalStorage` |
| 09 | Capstone foundation | External API, recipe list, recipe detail, search, clean component/hook structure |
| 10 | React Router / SPA navigation | `BrowserRouter`, routes, `Link`, `NavLink`, `useParams`, `useSearchParams`, nested layout, 404 |
| 11 | Project architecture | `api/`, `components/`, `context/`, `hooks/`, `layouts/`, `pages/`, `utils/`, `.env.example`, constants |
| 12 | Routing in capstone | Home, Browse, Search, Recipe Detail, Favorites, About, and Not Found routes |
| 13 | Context API and `useReducer` | `FavoritesContext`, reducer actions, shared favourites state; `ThemeContext` |
| 14 | API layer patterns | `api/client.js`, `api/meals.js`, consistent errors, `AbortController` request cancellation |
| 15 | State/data layer | API → custom hook → page → reusable component; favourites are global, form/category state stays local |
| 16 | Styling and layout | Flexbox, CSS Grid, media queries, CSS variables, responsive navigation and cards |
| 17 | Accessibility and performance | Semantic HTML, labels, alt text, keyboard focus, `memo`, `useMemo`, `useCallback`, lazy-loaded routes |
| 18 | Style polish | Reusable Button, loading/error/empty states, consistent typography, spacing, hover/focus states, theme toggle |
| 19 | Git and GitHub Pages | GitHub Actions workflow, Vite base path for `PROJECT`, `public/404.html` route fallback |
| 20 | AI-assisted development | Use opencode as an assistant: ask for explanations, review diffs, understand changes before accepting them |
| 21 | Deploy with opencode | Production build, test/lint steps in deployment workflow, post-deployment verification |
| 22 | Debugging clinic | Effect cleanup, stable dependencies, AbortController, StrictMode-safe requests, no leftover `console.log` |
| 23 | Testing and error handling | Vitest, React Testing Library, user-event tests, ErrorBoundary |
| 24 | Free build / office hours | Final must-have checklist, mobile testing, tests, deployment and demo rehearsal |
| 25 | Demo Day | Three-minute demo outline and likely code-review questions in `PRESENTATION_GUIDE.md` |

## Important distinction

Some sessions teach development practices rather than requiring a visible feature. For example, Session 20 teaches how to use opencode responsibly and review diffs; that is a workflow skill, not something that needs to appear as a button in DishDeck.

The project should be run locally and its dependencies installed before presenting:

```bash
npm install
npm run lint
npm run test
npm run build
```

Do not say that a test or deployment succeeded until you have run it and seen the successful result.
