# AZERO Domains – Resolver

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Typescript](https://img.shields.io/badge/TypeScript-red)
![React](https://img.shields.io/badge/React-gray)

This repository contains JS/TS libraries to resolve domains & addresses registered with [AZERO Domains](https://azero.domains/).

It's built as a monorepo and contains the following packages:

- [x] `@azns/resolver-core` – Vanilla JS/TS Library
- [ ] `@azns/resolver-react` – React-Hooks Library (uses `@azns/resolver-core`)

Additionally, multiple working examples are provided for both packages.

📃 **Integration Guide:** https://docs.azero.domains/integration

👩‍💻 **Interface Documentation:** https://azero-domains.github.io/resolver/

## Testnet Disclaimer 🚨

Currently, this package is not production-ready and only works on the [Aleph Zero Testnet](https://testnet.alephzero.org/). Aleph Zero Mainnet contract addresses are provided as soon as our contracts are deployed there.

## Getting Started

Install the package from the npm registry:

```bash
npm install @azns/resolver-core
# or
pnpm add @azns/resolver-core
# or
yarn add @azns/resolver-core
```

Resolve domain → address via [`resolveDomainToAddress`](https://azero-domains.github.io/resolver/functions/resolveDomainToAddress.html):

```ts
import { SupportedChainId, resolveDomainToAddress } from '@azns/resolver-core'

const address = await resolveDomainToAddress('domains.azero', {
  chainId: SupportedChainId.AlephZeroTestnet,
})
```

Resolve address → primary domain(s) via [`resolveAddressToDomain`](https://azero-domains.github.io/resolver/functions/resolveAddressToDomain.html):

```ts
import { SupportedChainId, resolveAddressToDomain } from '@azns/resolver-core'

const address = await resolveAddressToDomain('5GgzS1G34d2wRxtVBnSkA8GQBj4ySnGqQb34ix2ULwVzKdWQ', {
  chainId: SupportedChainId.AlephZeroTestnet,
})
```

## Run Example

```bash
# Setup Node.js (recommended via nvm)
# Install pnpm: https://pnpm.io/installation (recommended via node corepack)

# Clone this repository

# Install dependencies
pnpm i

# Build packages & Run vanilla-example via Vite
pnpm run dev:vanilla-example
```

<img src="vanilla-example.png" width="500" height="auto" alt="Vanilla JS/TS Library Example Frontend" />
