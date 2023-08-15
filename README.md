![AZERO.ID Integration Guide Banner](integration-banner.png)

# AZERO.ID – Resolver

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Typescript](https://img.shields.io/badge/TypeScript-red)
![React](https://img.shields.io/badge/React-gray)

This repository contains JS/TS libraries to resolve domains & addresses registered with [AZERO.ID](https://azero.id).

It's built as a monorepo and contains the following packages:

- `@azns/resolver-core` – Vanilla JS/TS Library
- `@azns/resolver-react` – React-Hooks Library (depends on `@azns/resolver-core`)

Additionally, multiple working [examples](#run-examples) are provided for both packages.

## Integration Guide 📃

Get started by checking out our detailed integration guide:

**https://docs.azero.id/integration**

## Interface Documentation 👩‍💻

View the full interface documentation & types here:

**https://azero-id.github.io/resolver**

## Packages 🚢

- https://www.npmjs.com/package/@azns/resolver-core
- https://www.npmjs.com/package/@azns/resolver-react

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
