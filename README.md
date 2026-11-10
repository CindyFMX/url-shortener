# URL Shortener

A small web app that turns long links into short ones. You paste a long URL and get back a link like `http://localhost:3000/abc123` that redirects to the original.

Built with [Nuxt 4](https://nuxt.com) and Vue 3.

## Features

- Shorten any `http` or `https` link
- The URL is checked in the browser for instant feedback and again on the server
- Rejects links that are already shorter than the short link would be
- Copy a short link with one click
- Short links redirect to the original page. Unknown codes show a 404 page.

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Running tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev) and are in the `test/` folder.

## How it works

| Part | File | What it does |
| --- | --- | --- |
| Page | `app/app.vue` | The form and the list of shortened links |
| API | `server/api/shorten-url.post.js` | `POST /api/shorten-url` with `{ "url": "..." }` returns `{ shortUrl, originalUrl }` |
| Redirect | `server/middleware/redirect.js` | Sends `/abc123`-style paths to the original URL |
| Short codes | `server/utils/generate-key.js` | Makes random 6-character codes from `a-z` and `0-9` |
| Storage | `server/utils/store-url.js` | Saves links and retries if a code is already taken |
| Validation | `shared/utils/validate-url.js` | URL check used by both the browser and the server |

### Example API call

```bash
curl -X POST http://localhost:3000/api/shorten-url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/some/very/long/path"}'
```

## Limitations

Links are kept in memory, so they are lost when the server restarts. A real deployment would store them in a database.
