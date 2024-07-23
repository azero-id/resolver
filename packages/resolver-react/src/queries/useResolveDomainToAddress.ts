import {
  type ResolveDomainError,
  type ResolveDomainOptions,
  resolveDomainToAddress,
} from '@azns/resolver-core'
import { useEffect, useState } from 'react'

/**
 * Resolves a given domain to the assigned address.
 * See `resolveDomainToAddress` from `@azns/resolver-core` for more details.
 */
export const useResolveDomainToAddress = (
  domain: string | undefined,
  options?: Partial<ResolveDomainOptions>,
) => {
  const [address, setAddress] = useState<string | null | undefined>()
  const [isLoading, setIsLoading] = useState(!!domain)
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<ResolveDomainError>()

  useEffect(() => {
    ;(async () => {
      if (!domain) {
        setAddress(undefined)
        setHasError(false)
        setError(undefined)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setHasError(false)
      setError(undefined)

      const { address, error } = await resolveDomainToAddress(domain, options)
      if (error) {
        setHasError(true)
        setError(error)
        setAddress(undefined)
      } else {
        setAddress(address)
      }
      setIsLoading(false)
    })()
  }, [domain, options?.chainId, options?.customContractAddresses?.azns_router])

  return {
    address,
    isLoading,
    hasError,
    error,
  }
}
