// Encoding utilities. Do not edit unless you know what you're doing.

import {
  TIER1_PLAINTEXT,
  TIER2_PLAINTEXT,
  TIER3_PLAINTEXT,
} from '@/data/challenges'

export function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c < 'a' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

export function doubleBase64(str: string): string {
  const first = btoa(str)
  const second = btoa(first)
  return second
}

export function xorToHex(str: string, key: number = 0x42): string {
  return Array.from(str)
    .map((c) => (c.charCodeAt(0) ^ key).toString(16).padStart(2, '0'))
    .join(' ')
}

export function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

// Compute all ciphertexts from plaintexts at module load time
// Import this in challenge components — never hardcode ciphertext
export const TIER1_CIPHER = rot13(TIER1_PLAINTEXT.toUpperCase())
export const TIER2_CIPHER = doubleBase64(TIER2_PLAINTEXT)
export const TIER3_CIPHER = xorToHex(TIER3_PLAINTEXT)
