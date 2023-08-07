import log from 'loglevel'
import { ContractId, SupportedChainId } from '../constants'
import { getContract } from '../deployments'
import { decodeOutput } from '../helpers/decodeOutput'
import { getApi } from '../helpers/getApi'
import { getMaxGasLimit } from '../helpers/getGasLimit'
import { ResolveOptions } from '../types'

/**
 * Resolves a given address to the assigned primary domain(s).
 * When the address has multiple primary domains set at different tld-registries,
 * the returned array can hold multiple domains (edge case).
 * @param address Address to resolve (e.g. `5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Array of primary domains (e.g. `[]` or `['domains.azero', 'domains.other']`)
 */
export const resolveAddressToDomain = async (
  address: string,
  options?: Partial<ResolveOptions>,
): Promise<string[]> => {
  // Merge default options
  const _o: ResolveOptions = Object.assign(
    {
      chainId: SupportedChainId.AlephZero,
    },
    options,
  )
  log.setLevel(_o.debug ? 'DEBUG' : 'WARN')

  // Initialize API & contract
  const api = await getApi(_o.chainId)
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

  let primaryDomains: string[] = []
  const { output, isError, decodedOutput } = decodeOutput(
    response,
    routerContract,
    'get_primary_domains',
  )
  if (isError) {
    throw new Error(decodedOutput)
  } else if (!isError) {
    primaryDomains = (output || []).map(([, domain]: string[]) => domain)
  }

  log.debug(
    `Resolved primary domains for address '${address}' on chain '${_o.chainId}':`,
    primaryDomains,
  )

  return primaryDomains
}
