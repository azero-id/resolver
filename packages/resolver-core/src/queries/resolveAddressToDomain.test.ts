import { describe, expect, it } from 'vitest'
import { SupportedChainId } from '../constants'
import { resolveAddressToDomain } from './resolveAddressToDomain'

describe('resolveAddressToDomain', () => {
  it('should resolve address to primary domain on Aleph Zero mainnet', async () => {
    const address = '5EeBxqQ7Kz6hcchEgkBn9ybBS4UaqGggi2Rq5weNyEZ9DjAK'
    const expectedDomain = 'domains.azero'

    const result = await resolveAddressToDomain(address, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeUndefined()
    expect(result.primaryDomain).toBe(expectedDomain)
    expect(result.allPrimaryDomains).toEqual([expectedDomain])
  })

  it('should handle invalid address format', async () => {
    const invalidAddress = 'invalid-address'

    const result = await resolveAddressToDomain(invalidAddress, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeDefined()
    expect(result.error?.name).toBe('INVALID_ADDRESS_FORMAT')
    expect(result.primaryDomain).toBeUndefined()
    expect(result.allPrimaryDomains).toBeUndefined()
  })

  it('should handle address without primary domain', async () => {
    const addressWithoutDomain = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

    const result = await resolveAddressToDomain(addressWithoutDomain, {
      chainId: SupportedChainId.AlephZero,
    })

    expect(result.error).toBeUndefined()
    expect(result.primaryDomain).toBeNull()
    expect(result.allPrimaryDomains).toEqual([])
  })
})
