import { ResolveOptions, resolveAddressToDomain } from '@azns/resolver-core'
import { useEffect, useState } from 'react'

/**
 * Resolves a given address to the assigned primary domain(s).
 * See `resolveAddressToDomain` from `@azns/resolver-core` for more details.
 */
export const useResolveAddressToDomain = (
  address: string | undefined,
  options?: Partial<ResolveOptions>,
) => {
  const [primaryDomains, setPrimaryDomains] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    ;(async () => {
      if (!address) {
        setPrimaryDomains([])
        setHasError(false)
        setErrorMessage(undefined)
        return
      }

      setIsLoading(true)
      setHasError(false)
      setErrorMessage(undefined)
      try {
        const domains = await resolveAddressToDomain(address, options)
        setPrimaryDomains(domains)
      } catch (e) {
        console.error(e)
        setHasError(true)
        setPrimaryDomains([])
        const errorMessage = (e as Error)?.message || 'Error'
        setErrorMessage(errorMessage)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [address, options?.chainId, options?.customContractAddresses?.azns_router])

  return {
    primaryDomain: primaryDomains?.length ? primaryDomains[0] : null,
    primaryDomains,
    isLoading,
    hasError,
    errorMessage,
  }
}
