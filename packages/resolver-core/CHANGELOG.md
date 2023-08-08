# @azns/resolver-core

## 1.1.0

### Minor Changes

- [`4beafea`](https://github.com/azero-id/resolver/commit/4beafea400fd76d284755d9ba698f9c6cbb899e1) Thanks [@wottpal](https://github.com/wottpal)! - When resolving an address, check its format beforehand and add custom error `INVALID_ADDRESS_FORMAT` for invalid SS58 address formats.

## 1.0.0

### Major Changes

- Release 1.0.0 as `changeset` incorrectly released @azns/resolver-react@1.0.0 to first major release.

## 0.1.0

### Minor Changes

- [#13](https://github.com/azero-id/resolver/pull/13) [`31acda3`](https://github.com/azero-id/resolver/commit/31acda37409cdd945fa12669bac364e3eb312990) Thanks [@wottpal](https://github.com/wottpal)! - Add `customApi` to `ResolveOptions` to allow for a custom `ApiPromise` instance, instead of creating a new default one. This approach is way more performant and memory efficient, if you have an already existing `ApiPromise` anyways. – Make sure to always initialize the chain and rpc correctly, though.

- [#12](https://github.com/azero-id/resolver/pull/12) [`47bf6f0`](https://github.com/azero-id/resolver/commit/47bf6f0a42e4a8e837be0812e0a65a7089687f3c) Thanks [@wottpal](https://github.com/wottpal)! - Transform all function interfaces to be safe (non-throwing) with typed errors

### Patch Changes

- [#14](https://github.com/azero-id/resolver/pull/14) [`bf374da`](https://github.com/azero-id/resolver/commit/bf374daa0e7405c38f1dbe64e4f4e31f592dc751) Thanks [@wottpal](https://github.com/wottpal)! - Update testnet router address to new deploment

## 0.0.5

### Patch Changes

- [#7](https://github.com/azero-id/resolver/pull/7) [`8bfe137`](https://github.com/azero-id/resolver/commit/8bfe1374a22c10986340621dff36bbafbf45431b) Thanks [@wottpal](https://github.com/wottpal)! - Update testnet deployments

## 0.0.4

### Patch Changes

- [`8243d86`](https://github.com/azero-id/resolver/commit/8243d8648b6e8bfcbe88b00e8f0b4cd65eae6e5e) - Update brand & domains to "AZERO.ID"

## 0.0.3

### Patch Changes

- [#3](https://github.com/azero-id/resolver/pull/3) [`06b67c4`](https://github.com/azero-id/resolver/commit/06b67c4cc2ec2131e9743bd3719b127ca0c92168) Thanks [@wottpal](https://github.com/wottpal)! - Minor README update to test release pipeline

## 0.0.2

### Patch Changes

- [#1](https://github.com/azero-id/resolver/pull/1) [`06b4660`](https://github.com/azero-id/resolver/commit/06b466022a9f517bdc073e46b24def2265be0347) Thanks [@wottpal](https://github.com/wottpal)! - Update deployment addresses, testnet-tld, and implement `resolver-react`.
