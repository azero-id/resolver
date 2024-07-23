import type { Chain } from './types'

/**
 * Supported Chains
 */
export enum SupportedChainId {
  AlephZero = 'alephzero',
  AlephZeroTestnet = 'alephzero-testnet',
  Development = 'development',
}
export const allSupportedChainIds = Object.values(SupportedChainId)

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
    [ContractId.Router]: '5FfRtDtpS3Vcr7BTChjPiQNrcAKu3VLv4E1NGF6ng6j3ZopJ',
  },
  [SupportedChainId.AlephZeroTestnet]: {
    [ContractId.Router]: '5HXjj3xhtRMqRYCRaXTDcVPz3Mez2XBruyujw6UEkvn8PCiA',
  },
}
