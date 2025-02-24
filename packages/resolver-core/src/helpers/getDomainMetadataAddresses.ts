import type { ApiPromise } from '@polkadot/api'
import type { ContractPromise } from '@polkadot/api-contract'
import { hexAddPrefix } from '@polkadot/util'
import { decodeOutput } from './decodeOutput'
import { getMaxGasLimit } from './getGasLimit'

const LegacyCoinTypeMap = {
  dot: 354,
  ksm: 434,
  eth: 60,
  btc: 0,
  sol: 501,
}

export const getDomainMetadataAddresses = async (
  api: ApiPromise,
  contract: ContractPromise,
  domainName?: string,
): Promise<[[number, string][], null] | [null, Error]> => {
  try {
    if (!domainName) throw new Error('Missing required parameters')

    const response = await contract.query.getAllRecords(
      '',
      { gasLimit: getMaxGasLimit(api) },
      domainName,
    )

    const { isError, decodedOutput } = decodeOutput(response, contract, 'get_all_records')
    if (isError) throw new Error(decodedOutput)

    const records = (response.output?.toPrimitive() as any)?.ok as [string, string][]
    if (!records || !Array.isArray(records)) throw new Error('Invalid records format')
    if (records.some((r) => !r || !Array.isArray(r) || r.length !== 2))
      throw new Error('Invalid record format')

    // Extract address records from metadata
    const addresses: [number, string][] = records
      .filter(([key]) => {
        // Filter out only `address.<id>` records
        return /address\..+/.test(key)
      })
      .map(([key, value]) => {
        // Map legacy id's to their corresponding coin type
        const id = key.split('.')[1]
        const isLegacyId = Object.keys(LegacyCoinTypeMap).includes(id)
        if (isLegacyId) {
          // Ensure there is no newer record with actual coin type
          const coinType = LegacyCoinTypeMap[id as keyof typeof LegacyCoinTypeMap]
          const isNewerRecord = records.some(([key]) => key === `address.${coinType}`)
          if (isNewerRecord) return [key, value]
          return [`address.${coinType}`, value]
        }
        return [key, value]
      })
      .filter(([key]) => {
        // Filter out only `address.<coinType>` records
        return /address\.\d+/.test(key)
      })
      .map(([key, value]) => {
        // Map key to coin type
        const coinType = Number.parseInt(key.split('.')[1])
        // Add hex value prefix for all hexadecimal addresses
        const isHex = value.length === 40
        return [coinType, isHex ? hexAddPrefix(value) : value]
      })

    return [addresses, null]
  } catch (error: any) {
    return [null, error]
  }
}
