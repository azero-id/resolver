import log from 'loglevel'
import { ContractId, SupportedChainId } from '../constants'
import { getContract } from '../deployments'
import { ErrorBase } from '../helpers/ErrorBase'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { ResolveOptions } from '../types'

export type ResolveAddressErrorName = 'INVALID_ADDRESS_FORMAT' | 'CONTRACT_ERROR' | 'OTHER_ERROR'
export class ResolveAddressError extends ErrorBase<ResolveAddressErrorName> {}

/**
 * Resolves a given address to the assigned primary domain(s).
 * NOTE: When an address holds primary domains within multiple TLDs,
 *       all primary domains will be returned. This case is currently not possible,
 *       so `allPrimaryDomains` will always return an array with 0 or 1 primary domain.
 * @param address Address to resolve (e.g. `5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Primary domain(s) as string (null, if no primary domain found) or error
 */
export const resolveAddressToDomain = async (
  address: string,
  options?: Partial<ResolveOptions>,
): Promise<
  | { primaryDomain: string | null; allPrimaryDomains: string[]; error: undefined }
  | { primaryDomain: undefined; allPrimaryDomains: undefined; error: ResolveAddressError }
> => {
  try {
    // Merge default options
    const _o: ResolveOptions = Object.assign(
      {
        chainId: SupportedChainId.AlephZero,
      },
      options,
    )
    log.setLevel(_o.debug ? 'DEBUG' : 'WARN')

    // Initialize API & contract
    const api = _o?.customApi || (await getApi(_o.chainId))
    const { contract: routerContract } = await getContract(
      api,
      _o.chainId,
      ContractId.Router,
      _o.customContractAddresses,
    )

    // Query contract
    const response = await routerContract.query.getPrimaryDomains(
      '',
      { gasLimit: getMaxGasLimit(api) },
      address,
      null,
    )

    let allPrimaryDomains: string[] = []
    const { output, isError, decodedOutput } = decodeOutput(
      response,
      routerContract,
      'get_primary_domains',
    )
    if (isError) {
      const message = `Contract error while resolving address '${address}': ${decodedOutput}`
      log.error(message)
      return {
        primaryDomain: undefined,
        allPrimaryDomains: undefined,
        error: new ResolveAddressError({
          name: 'CONTRACT_ERROR',
          message,
          cause: decodedOutput,
        }),
      }
    } else if (!isError) {
      allPrimaryDomains = (output || []).map(([, domain]: string[]) => domain)
    }

    const primaryDomain = allPrimaryDomains?.length ? allPrimaryDomains[0] : null

    log.debug(
      primaryDomain
        ? `Resolved primary domain for address '${address}': ${primaryDomain}`
        : `No primary domain found for address '${address}'`,
    )
    return { primaryDomain, allPrimaryDomains, error: undefined }
  } catch (error) {
    log.debug(`Error while resolving address '${address}':`, error)
    return {
      primaryDomain: undefined,
      allPrimaryDomains: undefined,
      error: new ResolveAddressError({
        name: 'OTHER_ERROR',
        message: (error as any)?.message || 'Unexpected error while resolving address',
        cause: error,
      }),
    }
  }
}
