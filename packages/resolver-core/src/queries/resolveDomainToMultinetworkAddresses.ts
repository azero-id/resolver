import log from 'loglevel'
import {
  AlephZeroCoinTypes,
  SupportedChainId,
  type SupportedTLD,
  allSupportedChainIds,
} from '../constants'
import { getSupportedTLDs } from '../deployments'
import { ErrorBase } from '../helpers/ErrorBase'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getDomainMetadataAddresses } from '../helpers/getDomainMetadataAddresses'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { getRegistryContract } from '../helpers/getRegistryContract'
import { getRouterContract } from '../helpers/getRouterContract'
import type { BaseResolveOptions } from '../types'
import { sanitizeDomain } from '../utils/sanitizeDomain'
import {
  ResolveDomainError,
  type ResolveDomainOptions,
  resolveDomainToAddress,
} from './resolveDomainToAddress'

export type MultinetworkAddresses = Record<number, string>

/**
 * Resolves a given domain to all assigned multinetwork addresses by coin type.
 * @see https://docs.ens.domains/ensip/11
 * @param domain Domain to resolve (e.g. `domains.azero`)
 * @param options Options (see `ResolveDomainOptions` definition)
 * @returns Addresses as dictionary by coin type (empty, if domain not found) or error
 */
export const resolveDomainToMultinetworkAddresses = async (
  domain: string,
  options?: Partial<ResolveDomainOptions>,
): Promise<
  | { addresses: MultinetworkAddresses | {}; error: undefined }
  | { addresses: undefined; error: ResolveDomainError }
> => {
  try {
    // Merge default options
    const _o: ResolveDomainOptions = Object.assign(
      {
        chainId: SupportedChainId.AlephZero,
      },
      options,
    )
    log.setLevel(_o.debug ? 'DEBUG' : 'WARN')

    // Check if given chainId is supported
    if (!allSupportedChainIds.includes(_o.chainId)) {
      return {
        addresses: undefined,
        error: new ResolveDomainError({
          name: 'UNSUPPORTED_NETWORK',
          message: `Unsupported chainId '${
            _o.chainId
          }' (must be one of: ${allSupportedChainIds.join(', ')})`,
        }),
      }
    }

    // Sanitize domain & Check if format is valid
    const _domain = _o.skipSanitization ? domain : sanitizeDomain(domain)
    const regex = /^(?:([^.]+)\.)([^.]+)$/
    const regexResult = regex.exec(_domain)
    if (!regexResult || regexResult.length !== 3) {
      return {
        addresses: undefined,
        error: new ResolveDomainError({
          name: 'INVALID_DOMAIN_FORMAT',
          message: `Domain must be in format 'name.tld'`,
        }),
      }
    }

    // Check if TLD is supported
    const [, domainName, tld] = regexResult
    const supportedTLDs = getSupportedTLDs(_o.chainId)
    if (!supportedTLDs.includes(tld as SupportedTLD) && _o.chainId !== SupportedChainId.Development)
      return {
        addresses: undefined,
        error: new ResolveDomainError({
          name: 'UNSUPPORTED_TLD',
          message: `Unsupported TLD '${tld}' on '${_o.chainId}'`,
        }),
      }

    // Initialize API & contract
    const api = _o?.customApi || (await getApi(_o.chainId))

    // Fetch Azero L1 address (native)
    const addresses: MultinetworkAddresses = {}
    const { address: azeroL1Address, error: azeroL1Error } = await resolveDomainToAddress(_domain, {
      ..._o,
      customApi: api,
      skipSanitization: true,
    })
    if (azeroL1Error) {
      return {
        addresses: undefined,
        error: azeroL1Error,
      }
    }
    if (azeroL1Address) {
      addresses[AlephZeroCoinTypes.L1] = azeroL1Address
    }

    // Fetch other multinetwork addresses from metadata
    const registryContract = await getRegistryContract(
      api,
      _o.chainId,
      tld as SupportedTLD,
      _o.customContractAddresses,
    )
    const [metadataAddresses, error] = await getDomainMetadataAddresses(
      api,
      registryContract,
      domainName,
    )
    if (metadataAddresses && !error) {
      for (const [coinType, value] of metadataAddresses) {
        addresses[coinType] = value
      }
    }

    log.debug(`Resolved addresses for domain '${_domain}':`, addresses)
    return { addresses, error: undefined }
  } catch (error) {
    log.debug(`Error while resolving domain '${domain}':`, error)
    return {
      addresses: undefined,
      error: new ResolveDomainError({
        name: 'OTHER_ERROR',
        message: (error as any)?.message || 'Unexpected error while resolving domain',
        cause: error,
      }),
    }
  }
}
