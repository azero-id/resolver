import {
  type ResolveAddressError,
  type ResolveAddressOptions,
  resolveAddressToDomain,
} from '@azns/resolver-core'
import { useEffect, useState } from 'react'

/**
 * Resolves a given address to the assigned primary domain(s).
 * See `resolveAddressToDomain` from `@azns/resolver-core` for more details.
 */
export const useResolveAddressToDomain = (
  address: string | undefined,
  options?: Partial<ResolveAddressOptions>,
) => {
  const [primaryDomain, setPrimaryDomain] = useState<string | null | undefined>()
  const [allPrimaryDomains, setAllPrimaryDomains] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState(!!address)
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<ResolveAddressError>()

  useEffect(() => {
    ;(async () => {
      if (!address) {
        setPrimaryDomain(undefined)
        setAllPrimaryDomains(undefined)
        setHasError(false)
        setError(undefined)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setHasError(false)
      setError(undefined)

      const { primaryDomain, allPrimaryDomains, error } = await resolveAddressToDomain(
        address,
        options,
      )
      if (error) {
        setHasError(true)
        setError(error)
        setPrimaryDomain(undefined)
        setAllPrimaryDomains(undefined)
      } else {
        setPrimaryDomain(primaryDomain)
        setAllPrimaryDomains(allPrimaryDomains)
      }
      setIsLoading(false)
    })()
  }, [address, options?.chainId, options?.customContractAddresses?.azns_router])

  return {
    primaryDomain,
    allPrimaryDomains,
    isLoading,
    hasError,
    error,
  }
}
