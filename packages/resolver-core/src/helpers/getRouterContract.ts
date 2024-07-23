import type { ApiPromise } from '@polkadot/api'
import type { ContractPromise } from '@polkadot/api-contract'
import { type ContractAddresses, ContractId, type SupportedChainId } from '../constants'
import { getContract, getContractAddress } from '../deployments'

let _routerContract: ContractPromise | undefined = undefined
let _routerContractAddress: string | undefined = undefined

/**
 * Helper to initialize & cache `ContractPromise` for `azns_router`.
 */
export const getRouterContract = async (
  api: ApiPromise,
  chainId: SupportedChainId,
  customContractAddresses?: ContractAddresses,
) => {
  const contractAddress = getContractAddress(chainId, ContractId.Router, customContractAddresses)

  // Return cached object if possible
  if (_routerContract && _routerContractAddress && contractAddress === _routerContractAddress) {
    return _routerContract
  }

  const { contract } = await getContract(api, chainId, ContractId.Router, customContractAddresses)

  // Cache objects
  _routerContract = contract
  _routerContractAddress = contractAddress

  return _routerContract
}
