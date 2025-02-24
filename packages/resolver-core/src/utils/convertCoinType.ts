/**
 * Source: https://docs.ens.domains/ensip/11#specification (ENSIP-11 Specification)
 */

export const convertEVMChainIdToCoinType = (chainId: number) => {
  if (chainId === 1) return 60 // Ethereum Mainnet

  return (0x80000000 | chainId) >>> 0
}

export const convertCoinTypeToEVMChainId = (coinType: number) => {
  if (coinType === 60) return 1 // Ethereum Mainnet

  return (0x7fffffff & coinType) >> 0
}
