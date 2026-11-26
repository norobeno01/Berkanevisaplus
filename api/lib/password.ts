// Password hashing: PBKDF2-SHA256 with a random per-user salt (WebCrypto, works on edge runtimes).
// Stored format: pbkdf2$<iterations>$<saltB64>$<hashB64>
const PBKDF2_ITERATIONS = 100000
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u))
const unb64 = (s: string) => Uint8Array.from(atob(s), ch => ch.charCodeAt(0))

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: salt as BufferSource, iterations }, key, 256)
  return new Uint8Array(bits)
}

function safeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let d = 0
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]
  return d === 0
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS)
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64(salt)}$${b64(hash)}`
}

// Legacy format: hex SHA-256(password + old salt). Only checked if LEGACY_PASSWORD_SALT is set,
// and only to upgrade the hash on a successful login. Remove once all users have logged in or reset.
export async function legacyHash(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(password + salt)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, stored: string, legacySalt?: string): Promise<{ ok: boolean; needsUpgrade: boolean }> {
  if (stored.startsWith('pbkdf2$')) {
    const [, iter, salt, hash] = stored.split('$')
    const calc = await pbkdf2(password, unb64(salt), parseInt(iter, 10))
    return { ok: safeEqual(calc, unb64(hash)), needsUpgrade: false }
  }
  if (legacySalt) {
    const calc = new TextEncoder().encode(await legacyHash(password, legacySalt))
    if (safeEqual(calc, new TextEncoder().encode(stored))) return { ok: true, needsUpgrade: true }
  }
  return { ok: false, needsUpgrade: false }
}

