import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api'
import { ApiOptions } from '@polkadot/api/types'
import log from 'loglevel'
import { SupportedChainId, allChains } from '../constants'
import { Chain } from '../types'

let _api: ApiPromise | undefined = undefined
let _chain: Chain | undefined = undefined

/**
 * Helper to initialize & cache `@polkadot/api`.
 */
export const getApi = async (chainId: SupportedChainId, options?: ApiOptions) => {
  if (_api && _chain?.network === chainId) {
    return _api
  }

  // Get chain
  const chain = allChains.find((c) => c.network === chainId)
  const rpcUrl = chain?.rpcUrls?.[0]
  if (!chain || !rpcUrl) {
    throw new Error(`Given chain '${chainId}' not supported.`)
  }

  // Initialize api
  const provider = rpcUrl.startsWith('http') ? new HttpProvider(rpcUrl) : new WsProvider(rpcUrl)
  const api = await ApiPromise.create({
    provider,
    noInitWarn: true,
    ...options,
  })
  await api.isReadyOrError
  log.debug(`Initialized API for chain '${chainId}'`)

  // Cache objects
  _api = api
  _chain = chain

  return api
}
