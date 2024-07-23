import type { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import log from 'loglevel'
import {
  CONTRACT_ADDRESSES,
  type ContractAddresses,
  ContractId,
  SupportedChainId,
  SupportedTLD,
} from './constants'

/**
 * Returns supported TLDs for a given chain.
 */
export const getSupportedTLDs = (chainId: SupportedChainId) => {
  const tlds: {
    [_ in SupportedChainId]?: SupportedTLD[]
  } = {
    [SupportedChainId.AlephZero]: [SupportedTLD.AZERO, SupportedTLD.A0],
    [SupportedChainId.AlephZeroTestnet]: [SupportedTLD.TZERO],
  }
  return tlds[chainId] || []
}

/**
 * Imports & returns metadata.json (abi) for a given contract.
 */
export const getContractAbi = async (contractId: ContractId) => {
  const abis: {
    [_ in ContractId]?: any
  } = {
    [ContractId.Router]: import(`./deployments/azns_router/metadata.json`),
    // NOTE: Redundant contracts are not included for now to reduce bundle size
    // [ContractId.Registry]: import(`./deployments/azns_registry/metadata.json`),
    // [ContractId.FeeCalculator]: import(`./deployments/azns_fee_calculator/metadata.json`),
    // [ContractId.MerkleVerifier]: import(`./deployments/azns_merkle_verifier/metadata.json`),
    // [ContractId.NameChecker]: import(`./deployments/azns_name_checker/metadata.json`),
  }
  return await abis[contractId]
}

/**
 * Returns contract address for a given chain & contract.
 * If `customContractAddresses` are provided, they will overwrite of the default ones.
 * NOTE: To use the local `development` network, `customContractAddresses` must be provided.
 */
export const getContractAddress = (
  chainId: SupportedChainId,
  contractId: ContractId,
  customContractAddresses?: ContractAddresses,
) => {
  return customContractAddresses?.[contractId] ?? CONTRACT_ADDRESSES[chainId]?.[contractId]
}

/**
 * Determines contract details based on chain & identifier, then returns a `ContractPromise` instance.
 */
export const getContract = async (
  api: ApiPromise,
  chainId: SupportedChainId,
  contractId: ContractId,
  customContractAddresses?: ContractAddresses,
) => {
  const abi = await getContractAbi(contractId)
  if (!abi) throw new Error(`No metadata found for contract '${contractId}'.`)

  const address = getContractAddress(chainId, contractId, customContractAddresses)
  if (!address)
    throw new Error(`No address found for contract '${contractId}' on chain '${chainId}'.`)

  const contract = new ContractPromise(api, abi, address)
  log.debug(`Initialized contract '${contractId}' at address '${address}'`)

  return {
    abi,
    address,
    contract,
  }
}
