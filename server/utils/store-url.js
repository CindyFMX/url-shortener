import { generateKey } from './generate-key.js'

// In-memory storage: simple, but links are lost when the server restarts.
const links = new Map() // key -> long URL

export function saveUrl(url) {
  let key
  do {
    key = generateKey()
  } while (links.has(key)) // retry on the rare collision
  links.set(key, url)
  return key
}

export function getUrl(key) {
  return links.get(key)
}