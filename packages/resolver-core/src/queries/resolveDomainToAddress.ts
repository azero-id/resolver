import log from 'loglevel'
import { ContractId, SupportedChainId, SupportedTLD } from '../constants'
import { getContract, getSupportedTLDs } from '../deployments'
import { ErrorBase } from '../helpers/ErrorBase'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { ResolveOptions } from '../types'

export type ResolveDomainErrorName =
  | 'UNSUPPORTED_TLD'
  | 'INVALID_DOMAIN_FORMAT'
  | 'CONTRACT_ERROR'
  | 'OTHER_ERROR'
export class ResolveDomainError extends ErrorBase<ResolveDomainErrorName> {}

/**
 * Resolves a given domain to the assigned address.
 * @param domain Domain to resolve (e.g. `domains.azero`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Address as string (null, if domain not found) or error
 */
export const resolveDomainToAddress = async (
  domain: string,
  options?: Partial<ResolveOptions>,
): Promise<
  { address: string | null; error: undefined } | { address: undefined; error: ResolveDomainError }
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

    // Check if domain format is valid
    const tld = domain.split('.').pop()
    if (domain.split('.').length < 2 || !tld)
      return {
        address: undefined,
        error: new ResolveDomainError({
          name: 'INVALID_DOMAIN_FORMAT',
          message: `Domain must be in format 'name.tld'`,
        }),
      }

    // Check if TLD is supported
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
    const { contract: routerContract } = await getContract(
      api,
      _o.chainId,
      ContractId.Router,
      _o.customContractAddresses,
    )

    // Query contract
    const response = await routerContract.query.getAddress(
      '',
      { gasLimit: getMaxGasLimit(api) },
      domain,
    )
    const { output, isError, decodedOutput } = decodeOutput(response, routerContract, 'get_address')
    let address: string | null = null
    if (isError && decodedOutput !== 'CouldNotResolveDomain') {
      const message = `Contract error while resolving domain '${domain}': ${decodedOutput}`
      log.error(message)
      return {
        address: undefined,
        error: new ResolveDomainError({
          name: 'CONTRACT_ERROR',
          message,
          cause: decodedOutput,
        }),
      }
    } else if (!isError) {
      address = output.Ok
    }

    log.debug(
      address
        ? `Resolved address for domain '${domain}': ${address}`
        : `Domain '${domain}' not found`,
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
