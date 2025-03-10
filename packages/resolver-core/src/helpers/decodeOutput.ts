import type { ContractPromise } from '@polkadot/api-contract'
import type { ContractExecResult } from '@polkadot/types/interfaces'
import type { AnyJson, TypeDef } from '@polkadot/types/types'
import { getAbiMessage } from './getAbiMessage'

/**
 * Helper types & functions
 * SOURCE: https://github.com/paritytech/contracts-ui (GPL-3.0-only)
 */
type ContractResultErr = {
  Err: AnyJson
}

interface ContractResultOk {
  Ok: AnyJson
}

function isErr(o: ContractResultErr | ContractResultOk | AnyJson): o is ContractResultErr {
  return typeof o === 'object' && o !== null && 'Err' in o
}

function isOk(o: ContractResultErr | ContractResultOk | AnyJson): o is ContractResultOk {
  return typeof o === 'object' && o !== null && 'Ok' in o
}

function getReturnTypeName(type: TypeDef | null | undefined) {
  return type?.lookupName || type?.type || ''
}

/**
 * Decodes & unwraps outputs and errors of a given result, contract, and method.
 * Parsed error message can be found in `decodedOutput` if `isError` is true.
 * SOURCE: https://github.com/paritytech/contracts-ui (GPL-3.0-only)
 */
export function decodeOutput(
  { result }: Pick<ContractExecResult, 'result' | 'debugMessage'>,
  contract: ContractPromise,
  method: string,
): {
  output: any
  decodedOutput: string
  isError: boolean
} {
  let output: any
  let decodedOutput = ''
  let isError = true

  if (result.isOk) {
    const flags = result.asOk.flags.toHuman()
    isError = flags.includes('Revert')
    const abiMessage = getAbiMessage(contract, method)
    const returnType = abiMessage.returnType
    const returnTypeName = getReturnTypeName(returnType)
    const registry = contract.abi.registry
    const r = returnType
      ? registry.createTypeUnsafe(returnTypeName, [result.asOk.data]).toHuman()
      : '()'
    output = isOk(r) ? r.Ok : isErr(r) ? r.Err : r

    const errorText = isErr(output)
      ? typeof output.Err === 'object'
        ? JSON.stringify(output.Err, null, 2)
        : (output.Err?.toString() ?? 'Error')
      : output !== 'Ok'
        ? output?.toString() || 'Error'
        : 'Error'

    const okText = isOk(r)
      ? typeof output === 'object'
        ? JSON.stringify(output, null, '\t')
        : (output?.toString() ?? '()')
      : (JSON.stringify(output, null, '\t') ?? '()')

    decodedOutput = isError ? errorText : okText
  }

  return {
    output,
    decodedOutput,
    isError,
  }
}
