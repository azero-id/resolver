import log from 'loglevel'
import { SupportedChainId, type SupportedTLD, allSupportedChainIds } from '../constants'
import { getSupportedTLDs } from '../deployments'
import { ErrorBase } from '../helpers/ErrorBase'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { getRouterContract } from '../helpers/getRouterContract'
import type { BaseResolveOptions } from '../types'
import { sanitizeDomain } from '../utils/sanitizeDomain'

export type ResolveDomainErrorName =
  | 'UNSUPPORTED_NETWORK'
  | 'UNSUPPORTED_TLD'
  | 'INVALID_DOMAIN_FORMAT'
  | 'CONTRACT_ERROR'
  | 'OTHER_ERROR'
export class ResolveDomainError extends ErrorBase<ResolveDomainErrorName> {}

/**
 * @param skipSanitization Uses the exact given domain w/o sanitization like lowercasing (default: false)
 */
export type ResolveDomainOptions = BaseResolveOptions & {
  skipSanitization?: boolean
}

/**
 * Resolves a given domain to the assigned address.
 * @param domain Domain to resolve (e.g. `domains.azero`)
 * @param options Options (see `ResolveDomainOptions` definition)
 * @returns Address as string (null, if domain not found) or error
 */
export const resolveDomainToAddress = async (
  domain: string,
  options?: Partial<ResolveDomainOptions>,
): Promise<
  { address: string | null; error: undefined } | { address: undefined; error: ResolveDomainError }
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
        address: undefined,
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
        address: undefined,
        error: new ResolveDomainError({
          name: 'INVALID_DOMAIN_FORMAT',
          message: `Domain must be in format 'name.tld'`,
        }),
      }
    }

    // Check if TLD is supported
    const [, , tld] = regexResult
    const supportedTLDs = getSupportedTLDs(_o.chainId)
    if (!supportedTLDs.includes(tld as SupportedTLD) && _o.chainId !== SupportedChainId.Development)
      return {
        address: undefined,
        error: new ResolveDomainError({
          name: 'UNSUPPORTED_TLD',
          message: `Unsupported TLD '${tld}' on '${_o.chainId}'`,
        }),
      }

    // Initialize API & contract
    const api = _o?.customApi || (await getApi(_o.chainId))
    const routerContract = await getRouterContract(api, _o.chainId, _o.customContractAddresses)

    // Query contract
    const response = await routerContract.query.getAddress(
      '',
      { gasLimit: getMaxGasLimit(api) },
      _domain,
    )
    const { output, isError, decodedOutput } = decodeOutput(response, routerContract, 'get_address')
    let address: string | null = null
    if (isError && decodedOutput !== 'CouldNotResolveDomain') {
      const message = decodedOutput
        ? `Contract error while resolving domain '${_domain}': ${decodedOutput}`
        : `Contract failed while resolving domain '${_domain}' without error message`
      log.error(message)
      return {
        address: undefined,
        error: new ResolveDomainError({
          name: 'CONTRACT_ERROR',
          message,
          cause: decodedOutput,
        }),
      }
    }

    address = output.Ok ? output.Ok : null

    log.debug(
      address
        ? `Resolved address for domain '${_domain}': ${address}`
        : `Domain '${_domain}' not found`,
    )
    return { address, error: undefined }
  } catch (error) {
    log.debug(`Error while resolving domain '${domain}':`, error)
    return {
      address: undefined,
      error: new ResolveDomainError({
        name: 'OTHER_ERROR',
        message: (error as any)?.message || 'Unexpected error while resolving domain',
        cause: error,
      }),
    }
  }
}
