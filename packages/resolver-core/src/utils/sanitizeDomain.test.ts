import { describe, expect, it } from 'vitest'
import { type SanitizeDomainOptions, sanitizeDomain } from './sanitizeDomain'

describe('sanitizeDomain', () => {
  it('should trim and lowercase by default', () => {
    expect(sanitizeDomain('  ExAmPlE.AzErO  ')).toBe('example.azero')
  })

  it('should handle undefined input', () => {
    expect(sanitizeDomain(undefined)).toBe('')
  })

  it('should replace underscores with hyphens when option is set', () => {
    const options: SanitizeDomainOptions = { replaceUnderscores: true }
    expect(sanitizeDomain('example_domain.azero', options)).toBe('example-domain.azero')
  })

  it('should remove outer non-alphanumeric characters when option is set', () => {
    const options: SanitizeDomainOptions = { removeOuterNonAlphanumeric: true }
    expect(sanitizeDomain('!!!example.azero!!!', options)).toBe('example.azero')
  })

  it('should not lowercase when option is set to false', () => {
    const options: SanitizeDomainOptions = { lowercase: false }
    expect(sanitizeDomain('ExAmPlE.AzErO', options)).toBe('ExAmPlE.AzErO')
  })

  it('should apply multiple options correctly', () => {
    const options: SanitizeDomainOptions = {
      trim: true,
      lowercase: true,
      replaceUnderscores: true,
      removeOuterNonAlphanumeric: true,
    }
    expect(sanitizeDomain('  ___ExAmPlE_DoMaIn.AzErO!!!  ', options)).toBe('example-domain.azero')
  })
})
