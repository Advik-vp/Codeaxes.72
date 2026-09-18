import { describe, expect, it } from 'vitest'
import { readStorage, writeStorage } from './storage.ts'

describe('storage helpers', () => {
  it('reads a fallback when JSON is invalid', () => {
    window.localStorage.setItem('broken', '{not-json')
    expect(readStorage('broken', ['ok'])).toEqual(['ok'])
  })

  it('writes and reads values', () => {
    expect(writeStorage('codeaxes:test', { a: 1 })).toBe(true)
    expect(readStorage('codeaxes:test', { a: 0 })).toEqual({ a: 1 })
  })
})
