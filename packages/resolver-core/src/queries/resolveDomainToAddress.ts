import log from 'loglevel'
import { ContractId, SupportedChainId, SupportedTLD } from '../constants'
import { getContract, getSupportedTLDs } from '../deployments'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { ResolveOptions } from '../types'

/**
 * Resolves a given domain to the assigned address.
 * @param domain Domain to resolve (e.g. `domains.azero`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Address as a string (e.g. `5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP`) or null if not found
 */
export const resolveDomainToAddress = async (
  domain: string,
  options?: Partial<ResolveOptions>,
): Promise<string | null> => {
  // Merge default options
  const _o: ResolveOptions = Object.assign(
    {
      chainId: SupportedChainId.AlephZero,
    },
    options,
  )
  log.setLevel(_o.debug ? 'DEBUG' : 'WARN')

  // Check if domain has a supported TLD
  const tld = domain.split('.').pop()
  if (domain.split('.').length < 2 || !tld) throw Error(`InvalidDomainFormat`)
  const supportedTLDs = getSupportedTLDs(_o.chainId)
  if (!supportedTLDs.includes(tld as SupportedTLD) && _o.chainId !== SupportedChainId.Development)
    throw Error(`UnsupportedTLD`)

  // Initialize API & contract
  const api = await getApi(_o.chainId)
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

  let address: string | null = null
  const { output, isError, decodedOutput } = decodeOutput(response, routerContract, 'get_address')
  if (isError && decodedOutput !== 'CouldNotResolveDomain') {
    throw new Error(decodedOutput)
  } else if (!isError) {
    address = output.Ok
  }

  log.debug(`Resolved address for domain '${domain}' on chain '${_o.chainId}':`, address)

  return address
}
