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
    try {
      const chainId = chain_select.value
      const customRouterAddress = input_router_address.value
      const customContractAddresses = {
        [ContractId.Router]: customRouterAddress,
      }
      const address = await resolveDomainToAddress(domain, {
        chainId,
        ...(customRouterAddress && { customContractAddresses }),
        debug: true,
      })
      result_1.innerHTML = address
        ? `<span style="color:#E6FD3A;">${address}</span>`
        : 'No address found'
    } catch (error: any) {
      result_1.innerHTML = `<span style="color:red;">${error}</span>`
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
    try {
      const chainId = chain_select.value
      const customRouterAddress = input_router_address.value
      const customContractAddresses = {
        [ContractId.Router]: customRouterAddress,
      }
      const primaryDomains = await resolveAddressToDomain(address, {
        chainId,
        ...(customRouterAddress && { customContractAddresses }),
        debug: true,
      })
      result_2.innerHTML = primaryDomains?.length
        ? `<span style="color:#E6FD3A;">${primaryDomains}</span>`
        : 'No primary domain found'
    } catch (error: any) {
      result_2.innerHTML = `<span style="color:red;">${error}</span>`
    }
  })
}
