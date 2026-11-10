// Runs before every request. Only handles paths that look like a short code,
// e.g. /abc123. Anything else (like "/") passes through to the Vue page.
const SHORT_LINK = /^\/([a-z0-9]{6})$/

export default defineEventHandler((event) => {
  const match = SHORT_LINK.exec(getRequestURL(event).pathname)
  if (!match) return // not a short link, so let Nuxt show the page

  const url = getUrl(match[1])
  if (url) return sendRedirect(event, url, 302)
  // Unknown code: return nothing, and Nuxt shows its normal 404 page
})
