# Contributing to Beyt Dwarka

Thanks for helping improve this project. This site is a Vite + React app about Beyt Dwarka (Bet Dwarka), Gujarat.

## Development

1. Fork the repository and clone your fork.
2. Install Node.js 22 or later.
3. Install dependencies and start the app:

```bash
npm install
npm run dev
```

4. Create a branch for your change:

```bash
git checkout -b feature/short-description
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local Vite server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |

## Pull requests

- Keep changes focused. Prefer small PRs over mixed refactors.
- Run `npm run lint` and `npm run build` before you open a PR.
- If you add a public page, also add it to `public/sitemap.xml` and the routes list in `src/site.config.js`.
- Do not commit `.env` files, API keys, or `node_modules`.

## Issue reports

Use the GitHub issue templates for bugs and feature requests. Include the page URL, browser, and steps to reproduce when reporting a bug.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
