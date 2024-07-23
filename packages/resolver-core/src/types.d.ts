import type { ApiPromise } from '@polkadot/api'
import type { ContractAddresses } from './constants'

export type Chain = {
  network: string
  name: string
  rpcUrls: [string, ...string[]]
  ss58Prefix?: number
  testnet?: boolean
}

/**
 * Custom options for `resolveAddressToDomain` and `resolveDomainToAddress`.
 * @param chainId Chain ID to use (default: `alephzero`, available: `alephzero`, `alephzero-testnet`, `development`).
 * @param customApi Custom API instance to use instead of creating the default one (faster and more memory efficient, if you already have an API instance)
 * @param customContractAddresses Custom contract addresses to overwrite the default ones. Mandatory for `development` network.
 * @param debug Enable debug logging.
 */
export type BaseResolveOptions = {
  chainId: SupportedChainIds
  customApi?: ApiPromise
  customContractAddresses?: ContractAddresses
  debug?: boolean
}
