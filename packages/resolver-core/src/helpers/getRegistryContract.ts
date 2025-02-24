import type { ApiPromise } from '@polkadot/api'
import type { ContractPromise } from '@polkadot/api-contract'
import {
  type ContractAddresses,
  ContractId,
  type SupportedChainId,
  SupportedTLD,
} from '../constants'
import { getContract, getContractAddress } from '../deployments'

let _registryContract: ContractPromise | undefined = undefined
let _registryContractAddress: string | undefined = undefined
const _registryContractTld: SupportedTLD | undefined = undefined

/**
 * Helper to initialize & cache `ContractPromise` for `azns_router`.
 */
export const getRegistryContract = async (
  api: ApiPromise,
  chainId: SupportedChainId,
  tld: SupportedTLD,
  customContractAddresses?: ContractAddresses,
) => {
  const _tld = tld === SupportedTLD.A0 ? SupportedTLD.AZERO : tld
  const contractId =
    `${ContractId.Registry}_${_tld}`.toLowerCase() as `${ContractId.Registry}_${SupportedTLD}`
  const contractAddress = getContractAddress(chainId, contractId, customContractAddresses)

  // Return cached object if possible
  if (
    _registryContract &&
    _registryContractAddress &&
    contractAddress === _registryContractAddress &&
    tld === _registryContractTld
  ) {
    return _registryContract
  }

  const { contract } = await getContract(api, chainId, contractId, customContractAddresses)

  // Cache objects
  _registryContract = contract
  _registryContractAddress = contractAddress

  return _registryContract
}
