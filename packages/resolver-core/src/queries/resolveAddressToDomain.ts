import { hexToU8a, isHex } from '@polkadot/util'
import { checkAddress, decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import log from 'loglevel'
import { SupportedChainId, allSupportedChainIds } from '../constants'
import { ErrorBase } from '../helpers/ErrorBase'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { getRouterContract } from '../helpers/getRouterContract'
import type { BaseResolveOptions } from '../types'

export type ResolveAddressErrorName =
  | 'UNSUPPORTED_NETWORK'
  | 'INVALID_ADDRESS_FORMAT'
  | 'CONTRACT_ERROR'
  | 'OTHER_ERROR'
export class ResolveAddressError extends ErrorBase<ResolveAddressErrorName> {}

/**
 * @param ignoreAddressPrefix If true, the current chain ss58 prefix will be ignored and the address will be decoded with any prefix
 */
export type ResolveAddressOptions = BaseResolveOptions & {
  ignoreAddressPrefix?: boolean
}

/**
 * Resolves a given address to the assigned primary domain(s).
 * NOTE: When an address holds primary domains within multiple registries (TLDs),
 *       all primary domains will be returned. This case is currently not possible,
 *       so `allPrimaryDomains` will always return an array with 0 or 1 primary domain.
 * @param address Address to resolve (e.g. `5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Primary domain(s) as string (null, if no primary domain found) or error
 */
export const resolveAddressToDomain = async (
  address: string,
  options?: Partial<ResolveAddressOptions>,
): Promise<
  | { primaryDomain: string | null; allPrimaryDomains: string[]; error: undefined }
  | { primaryDomain: undefined; allPrimaryDomains: undefined; error: ResolveAddressError }
> => {
  try {
    // Merge default options
    const _o: ResolveAddressOptions = Object.assign(
      {
        chainId: SupportedChainId.AlephZero,
      },
      options,
    )
    log.setLevel(_o.debug ? 'DEBUG' : 'WARN')

    // Check if given chainId is supported
    if (!allSupportedChainIds.includes(_o.chainId)) {
      return {
        primaryDomain: undefined,
        allPrimaryDomains: undefined,
        error: new ResolveAddressError({
          name: 'UNSUPPORTED_NETWORK',
          message: `Unsupported chainId '${
            _o.chainId
          }' (must be one of: ${allSupportedChainIds.join(', ')})`,
        }),
      }
    }

    // Initialize API & contract
    const api = _o?.customApi || (await getApi(_o.chainId))
    const routerContract = await getRouterContract(api, _o.chainId, _o.customContractAddresses)

    // Check address validity and convert if necessary
    let _address = (address || '').trim()
    const prefix = api.registry.chainSS58 || 42
    try {
      if (!_o.ignoreAddressPrefix) {
        // Strictly check validity with chain prefix
        const isValid = checkAddress(_address, prefix)[0]
        if (!isValid) throw new Error()
      } else {
        // Try to decode address with any prefix (and encode with chain prefix)
        _address = encodeAddress(
          isHex(address) ? hexToU8a(address) : decodeAddress(address),
          prefix,
        )
      }
    } catch (_) {
      return {
        primaryDomain: undefined,
        allPrimaryDomains: undefined,
        error: new ResolveAddressError({
          name: 'INVALID_ADDRESS_FORMAT',
          message: `Address must have valid SS58 format`,
        }),
      }
    }

    // Query contract
    const response = await routerContract.query.getPrimaryDomains(
      '',
      { gasLimit: getMaxGasLimit(api) },
      _address,
      null,
    )

    let allPrimaryDomains: string[] = []
    const { output, isError, decodedOutput } = decodeOutput(
      response,
      routerContract,
      'get_primary_domains',
    )
    if (isError) {
      const message = decodedOutput
        ? `Contract error while resolving address '${_address}': ${decodedOutput}`
        : `Contract failed while resolving address '${_address}' without error message`
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
    }

    allPrimaryDomains = (output || []).map(([, domain]: string[]) => domain)
    const primaryDomain = allPrimaryDomains?.length ? allPrimaryDomains[0] : null

    log.debug(
      primaryDomain
        ? `Resolved primary domain for address '${_address}': ${primaryDomain}`
        : `No primary domain found for address '${_address}'`,
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
