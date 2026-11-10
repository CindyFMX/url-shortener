import { randomInt } from 'node:crypto'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
export const KEY_LENGTH = 6

export function generateKey() {
  let key = ''

  for (let i = 0; i < KEY_LENGTH; i++) {
    const randomIndex = randomInt(ALPHABET.length)
    key += ALPHABET[randomIndex]
  }

  return key
}