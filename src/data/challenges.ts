// ============================================================
// EDIT THIS FILE to change challenge content.
// Ciphertext is computed automatically from these plaintexts.
// Do NOT edit the encoding functions in src/lib/crypto.ts.
// ============================================================

// TIER 1 — ROT13. Do not change this one.
export const TIER1_PLAINTEXT = 'arush bodla'

// TIER 2 — Double Base64. Change this to whatever you want.
// This phrase is what the analyst must decode to unlock /graveyard.
export const TIER2_PLAINTEXT = 'the dp demons'

// TIER 3 — XOR with key 0x42, output as spaced hex.
// This phrase unlocks /notes. Make it personal.
export const TIER3_PLAINTEXT = 'proof by ac'

// Hints, shown only when the visitor types `hint`
export const TIER1_HINT = 'Caesar cipher, shift = 13 (ROT13): every letter moves 13 places in the alphabet, so a↔n, b↔o, c↔p. Paste it into any ROT13 decoder.'
export const TIER2_HINT = 'Base64. Twice.'
export const TIER3_HINT = 'It always ends in (ac)cepted'
//export const TIER3_PYTHON_SNIPPET = "# python: bytes([b ^ 0x42 for b in bytes.fromhex('CIPHERTEXT_HERE')]).decode()"

// Named on solve, so each puzzle teaches the technique
export const TIER1_TECHNIQUE = 'ROT13: every letter shifted by 13.'
export const TIER2_TECHNIQUE = 'base64, decoded twice. base64 is an encoding, not encryption: anyone can reverse it.'
export const TIER3_TECHNIQUE = 'XOR with key 0x42, written as hex bytes. XOR the bytes with the same key again and the plaintext comes back.'

// What gets displayed after each challenge is solved
export const TIER1_FLAG = 'welcome!'
export const TIER2_FLAG = 'dp stands for dynamic programming, of course'
export const TIER3_FLAG = 'just use ternary search cheese'

// Unlock link labels
export const TIER1_UNLOCK_LABEL = 'NEXT: puzzle 2. OR READ THE LAB →'
export const TIER2_UNLOCK_LABEL = 'VIEW THE GRAVEYARD →'
export const TIER3_UNLOCK_LABEL = 'ACCESS THE FLAG →'

// localStorage keys — do not change these
export const TIER1_KEY = 'tier1'
export const TIER2_KEY = 'tier2'
export const TIER3_KEY = 'tier3'
