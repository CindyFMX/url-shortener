// POST /api/shorten-url  body: { url }  ->  { shortUrl, originalUrl }
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)
  const url = body?.url?.trim()

  if (!isValidUrl(url)) {
    throw createError({ 
      statusCode: 400,
      message: 'Please enter a valid URL, e.g. https://example.com/my-long-url'
    })
  }

  // Requirement 4a: the short URL must be shorter than the long one.
  const origin = getRequestURL(event).origin // e.g. http://localhost:3000
  const shortLength = origin.length + 1 + KEY_LENGTH
  if (url.length <= shortLength) {
    throw createError({ 
      statusCode: 400,
      message: 'This URL is already short enough.'
    })
  }

  const key = saveUrl(url)
  return { 
    shortUrl: `${origin}/${key}`,
    originalUrl: url
  }
})