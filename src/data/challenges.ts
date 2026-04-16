// ============================================================
// EDIT THIS FILE to change challenge content.
// Ciphertext is computed automatically from these plaintexts.
// Do NOT edit the encoding functions in src/lib/crypto.ts.
// ============================================================

// TIER 1 — ROT13. Do not change this one.
export const TIER1_PLAINTEXT = 'arush bodla'

// TIER 2 — Double Base64. Change this to whatever you want.
// This phrase is what the analyst must decode to unlock /graveyard.
export const TIER2_PLAINTEXT = 'TODO: set your tier 2 phrase here'

// TIER 3 — XOR with key 0x42, output as spaced hex.
// This phrase unlocks /flag. Make it personal.
export const TIER3_PLAINTEXT = 'TODO: set your tier 3 phrase here'

// TIER 1 hint shown below the ciphertext
export const TIER1_HINT = 'HINT: Caesar cipher, shift = 13 (ROT13)'

// TIER 2 hint shown below the ciphertext
export const TIER2_HINT = 'HINT: Base64. Twice.'

// TIER 3 hint shown below the ciphertext
// Include the python decode snippet below the hint
export const TIER3_HINT = 'HINT: XOR, key 0x42. Hex encoded.'
export const TIER3_PYTHON_SNIPPET = "# python: bytes([b ^ 0x42 for b in bytes.fromhex('CIPHERTEXT_HERE')]).decode()"

// What gets displayed after each challenge is solved
export const TIER1_FLAG = 'FLAG{identity_confirmed}'
export const TIER2_FLAG = 'FLAG{graveyard_unlocked}'
export const TIER3_FLAG = 'FLAG{motivation_confirmed}'

// Unlock link labels
export const TIER1_UNLOCK_LABEL = 'UNLOCK THE LAB →'
export const TIER2_UNLOCK_LABEL = 'VIEW THE GRAVEYARD →'
export const TIER3_UNLOCK_LABEL = 'ACCESS THE FLAG →'

// localStorage keys — do not change these
export const TIER1_KEY = 'tier1'
export const TIER2_KEY = 'tier2'
export const TIER3_KEY = 'tier3'
