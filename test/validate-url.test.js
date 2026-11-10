import { describe, it, expect } from 'vitest'
import { isValidUrl } from '../shared/utils/validate-url.js'

describe('isValidUrl', () => {
  it.each([
    'https://example.com',
    'http://www.google.com/search?q=vue',
    'https://sub.domain.co.uk/a/b?x=1#top',
  ])('accepts %s', (url) => {
    expect(isValidUrl(url)).toBe(true)
  })

  it.each([
    '',
    'hello',
    'example.com',          // missing http(s)://
    'ftp://example.com',
    'javascript:alert(1)',
    'http://localhost',
    'https://exa mple.com',
    null,
  ])('rejects %s', (url) => {
    expect(isValidUrl(url)).toBe(false)
  })
})