import { ResolveOptions, resolveDomainToAddress } from '@azns/resolver-core'
import { useEffect, useState } from 'react'

/**
 * Resolves a given domain to the assigned address.
 * See `resolveDomainToAddress` from `@azns/resolver-core` for more details.
 */
export const useResolveDomainToAddress = (
  domain: string | undefined,
  options?: Partial<ResolveOptions>,
) => {
  const [address, setAddress] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    ;(async () => {
      if (!domain) {
        setAddress(undefined)
        setHasError(false)
        setErrorMessage(undefined)
        return
      }

      setIsLoading(true)
      setHasError(false)
      setErrorMessage(undefined)
      try {
        const address = await resolveDomainToAddress(domain, options)
        setAddress(address)
      } catch (e) {
        console.error(e)
        setHasError(true)
        setAddress(undefined)
        const errorMessage = (e as Error)?.message || 'Error'
        setErrorMessage(errorMessage)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [domain, options?.chainId, options?.customContractAddresses?.azns_router])

  return {
    address,
    isLoading,
    hasError,
    errorMessage,
  }
}
