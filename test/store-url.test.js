import { describe, it, expect } from 'vitest'
import { generateKey, KEY_LENGTH } from '../server/utils/generate-key.js'
import { saveUrl, getUrl } from '../server/utils/store-url.js'

describe('generateKey', () => {
  it('has the right length and only letters/digits', () => {
    expect(generateKey()).toMatch(new RegExp(`^[a-z0-9]{${KEY_LENGTH}}$`))
  })

  it('creates different key', () => {
    const keys = new Set(Array.from({ length: 100 }, generateKey))
    expect(keys.size).toBe(100)
  })
})

describe('store-url', () => {
  it('saves a URL and finds it by code', () => {
    const url = 'https://example.com/some/long/path'
    const code = saveUrl(url)
    expect(getUrl(code)).toBe(url)
  })

  it('returns undefined for unknown codes', () => {
    expect(getUrl('nope00')).toBeUndefined()
  })
})