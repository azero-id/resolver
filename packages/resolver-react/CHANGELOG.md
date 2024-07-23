# @azns/resolver-react

## 1.7.0

### Minor Changes

- [#60](https://github.com/azero-id/resolver/pull/60) [`b8c03a4`](https://github.com/azero-id/resolver/commit/b8c03a403a88d8133fba55d168a154baf2250ae9) Thanks [@wottpal](https://github.com/wottpal)! - Add basic unit tests for @azns/resolver-core

- [#59](https://github.com/azero-id/resolver/pull/59) [`cd5e568`](https://github.com/azero-id/resolver/commit/cd5e568b84d00b04d0fc718cab4a86c6513e0c63) Thanks [@wottpal](https://github.com/wottpal)! - - Update engine & package manager specifications
  - Switch partially to Biome for linting & formatting
  - Add new linting & typechecking workflows
  - Update dependencies

### Patch Changes

- Updated dependencies [[`b8c03a4`](https://github.com/azero-id/resolver/commit/b8c03a403a88d8133fba55d168a154baf2250ae9), [`cd5e568`](https://github.com/azero-id/resolver/commit/cd5e568b84d00b04d0fc718cab4a86c6513e0c63)]:
  - @azns/resolver-core@1.7.0

## 1.6.0

### Minor Changes

- [#49](https://github.com/azero-id/resolver/pull/49) [`059e321`](https://github.com/azero-id/resolver/commit/059e3215ebb54a830b088f80a0796a4c8d0ccda6) Thanks [@wottpal](https://github.com/wottpal)! - Dependency improvements

### Patch Changes

- Updated dependencies [[`059e321`](https://github.com/azero-id/resolver/commit/059e3215ebb54a830b088f80a0796a4c8d0ccda6)]:
  - @azns/resolver-core@1.6.0

## 1.5.0

### Minor Changes

- [#46](https://github.com/azero-id/resolver/pull/46) [`2c76bca`](https://github.com/azero-id/resolver/commit/2c76bcae642948bca86e85dc663f0440c31e2040) Thanks [@wottpal](https://github.com/wottpal)! - Better loading state defaults for hooks.

## 1.4.0

### Minor Changes

- [#43](https://github.com/azero-id/resolver/pull/43) [`710fb82`](https://github.com/azero-id/resolver/commit/710fb82c04a572c43a5fcacfc6de0f51c425696d) Thanks [@wottpal](https://github.com/wottpal)! - Added Aleph Zero mainnet deployment address for `azns_router` contract.

### Patch Changes

- Updated dependencies [[`710fb82`](https://github.com/azero-id/resolver/commit/710fb82c04a572c43a5fcacfc6de0f51c425696d)]:
  - @azns/resolver-core@1.4.0

## 1.3.1

### Patch Changes

- [#40](https://github.com/azero-id/resolver/pull/40) [`fbdc676`](https://github.com/azero-id/resolver/commit/fbdc67609cef2b49627ff8db58385d272b0e28c9) Thanks [@wottpal](https://github.com/wottpal)! - Added the new error `UNSUPPORTED_NETWORK` in the resolving functions, to indicate whenever an incorred `chainId` parameter was passed.

- Updated dependencies [[`fbdc676`](https://github.com/azero-id/resolver/commit/fbdc67609cef2b49627ff8db58385d272b0e28c9)]:
  - @azns/resolver-core@1.3.1

## 1.3.0

### Minor Changes

- [#37](https://github.com/azero-id/resolver/pull/37) [`bbcf22e`](https://github.com/azero-id/resolver/commit/bbcf22e4a28d92f7595b33993a4cded5c43bd547) Thanks [@wottpal](https://github.com/wottpal)! - Add optional `ignoreAddressPrefix` option when resolving addresses to domains for automatically converting any valid ss58 address and not strictly assuming the current chains prefix (42).

### Patch Changes

- Updated dependencies [[`bbcf22e`](https://github.com/azero-id/resolver/commit/bbcf22e4a28d92f7595b33993a4cded5c43bd547)]:
  - @azns/resolver-core@1.3.0

## 1.2.0

### Patch Changes

- Updated dependencies [[`6c5c1d1`](https://github.com/azero-id/resolver/commit/6c5c1d1801295a7e3e36b87db08ec35d3b4298f1), [`e672363`](https://github.com/azero-id/resolver/commit/e6723631a398d45bb8be0e72b793406cb724491d)]:
  - @azns/resolver-core@1.2.0

## 1.1.0

### Patch Changes

- Updated dependencies [[`4beafea`](https://github.com/azero-id/resolver/commit/4beafea400fd76d284755d9ba698f9c6cbb899e1)]:
  - @azns/resolver-core@1.1.0

## 1.0.0

### Minor Changes

- [#13](https://github.com/azero-id/resolver/pull/13) [`31acda3`](https://github.com/azero-id/resolver/commit/31acda37409cdd945fa12669bac364e3eb312990) Thanks [@wottpal](https://github.com/wottpal)! - Add `customApi` to `ResolveOptions` to allow for a custom `ApiPromise` instance, instead of creating a new default one. This approach is way more performant and memory efficient, if you have an already existing `ApiPromise` anyways. – Make sure to always initialize the chain and rpc correctly, though.

- [#12](https://github.com/azero-id/resolver/pull/12) [`47bf6f0`](https://github.com/azero-id/resolver/commit/47bf6f0a42e4a8e837be0812e0a65a7089687f3c) Thanks [@wottpal](https://github.com/wottpal)! - Transform all function interfaces to be safe (non-throwing) with typed errors

### Patch Changes

- [#14](https://github.com/azero-id/resolver/pull/14) [`bf374da`](https://github.com/azero-id/resolver/commit/bf374daa0e7405c38f1dbe64e4f4e31f592dc751) Thanks [@wottpal](https://github.com/wottpal)! - Update testnet router address to new deploment

- Updated dependencies [[`31acda3`](https://github.com/azero-id/resolver/commit/31acda37409cdd945fa12669bac364e3eb312990), [`bf374da`](https://github.com/azero-id/resolver/commit/bf374daa0e7405c38f1dbe64e4f4e31f592dc751), [`47bf6f0`](https://github.com/azero-id/resolver/commit/47bf6f0a42e4a8e837be0812e0a65a7089687f3c)]:
  - @azns/resolver-core@0.1.0

## 0.0.5

### Patch Changes

- [#7](https://github.com/azero-id/resolver/pull/7) [`8bfe137`](https://github.com/azero-id/resolver/commit/8bfe1374a22c10986340621dff36bbafbf45431b) Thanks [@wottpal](https://github.com/wottpal)! - Update testnet deployments

- Updated dependencies [[`8bfe137`](https://github.com/azero-id/resolver/commit/8bfe1374a22c10986340621dff36bbafbf45431b)]:
  - @azns/resolver-core@0.0.5

## 0.0.4

### Patch Changes

- [`8243d86`](https://github.com/azero-id/resolver/commit/8243d8648b6e8bfcbe88b00e8f0b4cd65eae6e5e) - Update brand & domains to "AZERO.ID"

- Updated dependencies [[`8243d86`](https://github.com/azero-id/resolver/commit/8243d8648b6e8bfcbe88b00e8f0b4cd65eae6e5e)]:
  - @azns/resolver-core@0.0.4

## 0.0.3

### Patch Changes

- [#3](https://github.com/azero-id/resolver/pull/3) [`06b67c4`](https://github.com/azero-id/resolver/commit/06b67c4cc2ec2131e9743bd3719b127ca0c92168) Thanks [@wottpal](https://github.com/wottpal)! - Minor README update to test release pipeline

- Updated dependencies [[`06b67c4`](https://github.com/azero-id/resolver/commit/06b67c4cc2ec2131e9743bd3719b127ca0c92168)]:
  - @azns/resolver-core@0.0.3

## 0.0.2

### Patch Changes

- [#1](https://github.com/azero-id/resolver/pull/1) [`06b4660`](https://github.com/azero-id/resolver/commit/06b466022a9f517bdc073e46b24def2265be0347) Thanks [@wottpal](https://github.com/wottpal)! - Update deployment addresses, testnet-tld, and implement `resolver-react`.

- Updated dependencies [[`06b4660`](https://github.com/azero-id/resolver/commit/06b466022a9f517bdc073e46b24def2265be0347)]:
  - @azns/resolver-core@0.0.2
