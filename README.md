# Beyt Dwarka

Official web project for **Beyt Dwarka** (also spelled Bet Dwarka) — the sacred island of Lord Krishna off the coast of Okha in Devbhoomi Dwarka, Gujarat.

[![CI](https://github.com/Sachin-bucketlistt/beytdwarka/actions/workflows/ci.yml/badge.svg)](https://github.com/Sachin-bucketlistt/beytdwarka/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0e4d6c.svg)](LICENSE)

**Live site:** [sachin-bucketlistt.github.io/beytdwarka](https://sachin-bucketlistt.github.io/beytdwarka/)

## About

Beyt Dwarka, also known as Shankhodhar and mentioned in the Mahabharata as Antardvipa, is reached from Okha by ferry and by Sudarshan Setu. This repository is a Vite + React site for visitor information, with GitHub Pages hosting and search-engine metadata ready for indexing.

## Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- GitHub Actions CI and GitHub Pages deploy

## Getting started

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run lint` | ESLint |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## SEO and GitHub files

Public SEO files are copied into the production build as-is:

| File | Purpose |
| --- | --- |
| `public/sitemap.xml` | Search-engine sitemap |
| `public/robots.txt` | Crawler rules and sitemap location |
| `public/site.webmanifest` | Installable app metadata |
| `public/og-image.jpg` | Open Graph / social preview image |
| `public/llms.txt` | Short site summary for AI crawlers |
| `public/humans.txt` | Credits |
| `public/.well-known/security.txt` | Vulnerability contact |
| `index.html` | Title, description, canonical, Open Graph, Twitter, JSON-LD |

When you add a new public page, update `public/sitemap.xml` and `src/site.config.js`.

After the site is live, submit the sitemap in [Google Search Console](https://search.google.com/search-console):

`https://sachin-bucketlistt.github.io/beytdwarka/sitemap.xml`

## Deploy

Pushes to `main` build the app and publish `dist/` to GitHub Pages.

1. In the GitHub repo, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy GitHub Pages** workflow manually).

The Vite `base` path is `/beytdwarka/` so assets work on project Pages. If you later attach a custom domain at the site root, change `base` in `src/site.config.js` to `/` and update the canonical URLs in `index.html`, `public/sitemap.xml`, and `public/robots.txt`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow the [Code of Conduct](CODE_OF_CONDUCT.md). Security reports belong in [SECURITY.md](SECURITY.md), not in public issues.

## License

[MIT](LICENSE)
