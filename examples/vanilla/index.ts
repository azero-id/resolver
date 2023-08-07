import { ContractId, resolveAddressToDomain, resolveDomainToAddress } from '@azns/resolver-core'

// Init chain select
const chain_select = document.querySelector<HTMLSelectElement>('#chain-select')
const input_router_address = document.querySelector<HTMLInputElement>('#input-router-address')

// Init `resolveDomainToAddress`
const input_1 = document.querySelector<HTMLInputElement>('#input-1')
const button_1 = document.querySelector<HTMLButtonElement>('#button-1')
const result_1 = document.querySelector<HTMLDivElement>('#result-1')
if (chain_select && input_router_address && input_1 && button_1 && result_1) {
  button_1.addEventListener('click', async () => {
    const domain = input_1.value
    const chainId = chain_select.value
    const customRouterAddress = input_router_address.value
    const customContractAddresses = {
      [ContractId.Router]: customRouterAddress,
    }

    const { address, error } = await resolveDomainToAddress(domain, {
      debug: true,
      chainId,
      ...(customRouterAddress && { customContractAddresses }),
    })

    if (error) {
      result_1.innerHTML = `<span style="color:red;">${error.message}</span>`
    } else {
      result_1.innerHTML = address
        ? `<span style="color:#E6FD3A;">${address}</span>`
        : 'No address found'
    }
  })
}

// Init `resolveAddressToDomain`
const input_2 = document.querySelector<HTMLInputElement>('#input-2')
const button_2 = document.querySelector<HTMLButtonElement>('#button-2')
const result_2 = document.querySelector<HTMLDivElement>('#result-2')
if (chain_select && input_router_address && input_2 && button_2 && result_2) {
  button_2.addEventListener('click', async () => {
    const address = input_2.value
    const chainId = chain_select.value
    const customRouterAddress = input_router_address.value
    const customContractAddresses = {
      [ContractId.Router]: customRouterAddress,
    }

    const { primaryDomain, error } = await resolveAddressToDomain(address, {
      debug: true,
      chainId,
      ...(customRouterAddress && { customContractAddresses }),
    })

    if (error) {
      result_2.innerHTML = `<span style="color:red;">${error.message}</span>`
    } else {
      result_2.innerHTML = primaryDomain
        ? `<span style="color:#E6FD3A;">${primaryDomain}</span>`
        : 'No primary domain found'
    }
  })
}
