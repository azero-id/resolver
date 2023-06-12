import { Chain } from './types'

/**
 * Supported Chains
 */
export enum SupportedChainId {
  AlephZero = 'alephzero',
  AlephZeroTestnet = 'alephzero-testnet',
  Development = 'development',
}

/**
 * Chains
 */
export const alephzero: Chain = {
  network: SupportedChainId.AlephZero,
  name: 'Aleph Zero',
  ss58Prefix: 42,
  rpcUrls: ['wss://ws.azero.dev'],
}
export const alephzeroTestnet: Chain = {
  network: SupportedChainId.AlephZeroTestnet,
  name: 'Aleph Zero Testnet',
  ss58Prefix: 42,
  rpcUrls: ['wss://ws.test.azero.dev'],
  testnet: true,
}
export const development: Chain = {
  network: SupportedChainId.Development,
  name: 'Local Development',
  ss58Prefix: 42,
  rpcUrls: ['ws://127.0.0.1:9944'],
  testnet: true,
}

export const allChains: Chain[] = [alephzero, alephzeroTestnet, development]

/**
 * Supported TLDs
 */
export enum SupportedTLD {
  AZERO = 'azero',
  A0 = 'a0',
  TZERO = 'tzero',
}

/**
 * Contracts IDs & Addresses
 */
export enum ContractId {
  Router = 'azns_router',
  Registry = 'azns_registry',
  FeeCalculator = 'azns_fee_calculator',
  MerkleVerifier = 'azns_merkle_verifier',
  NameChecker = 'azns_name_checker',
}

export type ContractAddresses = { [_ in ContractId]?: string }

export const CONTRACT_ADDRESSES: {
  [_ in SupportedChainId]?: ContractAddresses
} = {
  [SupportedChainId.AlephZero]: {
    [ContractId.Router]: undefined, // TODO
  },
  [SupportedChainId.AlephZeroTestnet]: {
    [ContractId.Router]: '5HfQopC1yQSoG83auWgRLTxhWWFxiVQWT74LLXeXMLJDFBvP',
  },
}
