import { describe, expect, it } from 'vitest'
import { SupportedChainId } from '../constants'
import { resolveDomainToAddress } from './resolveDomainToAddress'

describe('resolveDomainToAddress', () => {
  it('should resolve domain to address on Aleph Zero mainnet', async () => {
    const domain = 'domains.azero'
    const expectedAddress = '5EeBxqQ7Kz6hcchEgkBn9ybBS4UaqGggi2Rq5weNyEZ9DjAK'

    const result = await resolveDomainToAddress(domain, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeUndefined()
    expect(result.address).toBe(expectedAddress)
  })

  it('should handle invalid domain format', async () => {
    const invalidDomain = 'invalid-domain'

    const result = await resolveDomainToAddress(invalidDomain, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeDefined()
    expect(result.error?.name).toBe('INVALID_DOMAIN_FORMAT')
    expect(result.address).toBeUndefined()
  })

  it('should handle unsupported TLD', async () => {
    const unsupportedTLDDomain = 'example.unsupported'

    const result = await resolveDomainToAddress(unsupportedTLDDomain, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeDefined()
    expect(result.error?.name).toBe('UNSUPPORTED_TLD')
    expect(result.address).toBeUndefined()
  })

  it('should handle non-existent domain', async () => {
    const nonExistentDomain = 'nonexistent.azero'

    const result = await resolveDomainToAddress(nonExistentDomain, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeUndefined()
    expect(result.address).toBeNull()
  })
})
