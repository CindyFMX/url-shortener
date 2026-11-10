// Used by both the browser (instant feedback) and the server (real protection).
export function isValidUrl(input) {
  if (typeof input !== 'string') return false
  const text = input.trim()
  if (!text || /\s/.test(text)) return false // no empty input, no spaces in between

  try {
    const url = new URL(text) // throws if it's not a URL at all
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:'
    const hasDomain = /\.[a-z]{2,}$/i.test(url.hostname) // e.g. ".com", ".sg"
    return isHttp && hasDomain
  } catch {
    return false
  }
}