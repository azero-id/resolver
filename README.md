# AZERO.ID – Resolver

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Typescript](https://img.shields.io/badge/TypeScript-red)
![React](https://img.shields.io/badge/React-gray)

---

1. [Testnet Disclaimer 🚨](#testnet-disclaimer-)
2. [Getting Started](#getting-started)
   1. [Vanilla JS/TS](#vanilla-jsts)
   2. [React/Next.js Hooks](#reactnextjs-hooks)
3. [Run Examples](#run-examples)

---

This repository contains JS/TS libraries to resolve domains & addresses registered with [AZERO.ID](https://azero.id).

It's built as a monorepo and contains the following packages:

- `@azns/resolver-core` – Vanilla JS/TS Library
- `@azns/resolver-react` – React-Hooks Library (depends on `@azns/resolver-core`)

Additionally, multiple working examples are provided for both packages.

📃 **Integration Guide:** https://docs.azero.id/integration

👩‍💻 **Interface Documentation:** https://azero-id.github.io/resolver/

## Testnet Disclaimer 🚨

Currently, this package is not production-ready and only works on the [Aleph Zero Testnet](https://testnet.alephzero.org/). Aleph Zero Mainnet contract addresses are provided as soon as our contracts are deployed there.

## Getting Started

### Vanilla JS/TS

Install the package from the npm registry:

```bash
npm install @azns/resolver-core
# or
pnpm add @azns/resolver-core
# or
yarn add @azns/resolver-core
```

Resolve domain → address via [`resolveDomainToAddress`](https://azero-id.github.io/resolver/functions/_azns_resolver_core.resolveDomainToAddress.html):

```ts
import { SupportedChainId, resolveDomainToAddress } from '@azns/resolver-core'

const address = await resolveDomainToAddress('domains.tzero', {
  chainId: SupportedChainId.AlephZeroTestnet,
})
```

Resolve address → primary domain(s) via [`resolveAddressToDomain`](https://azero-id.github.io/resolver/functions/_azns_resolver_core.resolveAddressToDomain.html):

```ts
import { SupportedChainId, resolveAddressToDomain } from '@azns/resolver-core'

const primaryDomains = await resolveAddressToDomain(
  '5GgzS1G34d2wRxtVBnSkA8GQBj4ySnGqQb34ix2ULwVzKdWQ',
  {
    chainId: SupportedChainId.AlephZeroTestnet,
  },
)
```

### React/Next.js Hooks

Install the packages from the npm registry:

```bash
npm install @azns/resolver-core @azns/resolver-react
# or
pnpm add @azns/resolver-core @azns/resolver-react
# or
yarn add @azns/resolver-core @azns/resolver-react
```

Resolve domain → address via [`useResolveDomainToAddress`](https://azero-id.github.io/resolver/functions/_azns_resolver_react.useResolveDomainToAddress.html):

```ts
import { SupportedChainId } from '@azns/resolver-core'
import { useResolveDomainToAddress } from '@azns/resolver-react'

const { address } = useResolveDomainToAddress('domains.tzero', {
  chainId: SupportedChainId.AlephZeroTestnet,
})
```

Resolve address → primary domain(s) via [`useResolveAddressToDomain`](https://azero-id.github.io/resolver/functions/_azns_resolver_react.useResolveAddressToDomain.html):

```ts
import { SupportedChainId } from '@azns/resolver-core'
import { useResolveAddressToDomain } from '@azns/resolver-react'

const { primaryDomain } = useResolveAddressToDomain(
  '5GgzS1G34d2wRxtVBnSkA8GQBj4ySnGqQb34ix2ULwVzKdWQ',
  {
    chainId: SupportedChainId.AlephZeroTestnet,
  },
)
```

## Run Examples

```bash
# Setup Node.js (recommended via nvm)
# Install pnpm: https://pnpm.io/installation (recommended via node corepack)

# Clone this repository

# Install dependencies
pnpm i

# Build packages & Run examples:
#  - Vanilla Example starts on http://localhost:4000
#  - Next.js Example starts on http://localhost:3000
pnpm run dev:examples
```

<p align="middle">
  <img src="vanilla-example.png" width="600" height="auto" alt="Vanilla Example with `@azns/resolver-core`" />
</p>
