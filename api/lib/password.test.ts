import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hashPassword, verifyPassword, legacyHash } from './password'

test('new hashes verify and are salted per user', async () => {
  const a = await hashPassword('correct horse')
  const b = await hashPassword('correct horse')
  assert.notEqual(a, b)
  assert.match(a, /^pbkdf2\$\d+\$/)
  assert.equal((await verifyPassword('correct horse', a)).ok, true)
  assert.equal((await verifyPassword('wrong', a)).ok, false)
  assert.equal((await verifyPassword('correct horse', a)).needsUpgrade, false)
})

test('legacy hashes only verify when a legacy salt is configured, then ask for upgrade', async () => {
  const legacy = await legacyHash('hunter2', 'old-salt')
  assert.equal((await verifyPassword('hunter2', legacy)).ok, false)
  assert.equal((await verifyPassword('hunter2', legacy, 'other-salt')).ok, false)
  const r = await verifyPassword('hunter2', legacy, 'old-salt')
  assert.deepEqual(r, { ok: true, needsUpgrade: true })
  assert.equal((await verifyPassword('nope', legacy, 'old-salt')).ok, false)
})

test('plaintext stored passwords are not accepted', async () => {
  assert.equal((await verifyPassword('secret', 'secret', 'old-salt')).ok, false)
  assert.equal((await verifyPassword('secret', 'secret')).ok, false)
})
