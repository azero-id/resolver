---
'@azns/resolver-core': minor
---

Adds domain sanitization to `resolveDomainToAddress` which means, by default, domains get trimmed & lowercased before resolving now. The behavior can be disabled by passing `skipSanitization: true`. Also, the `sanitizeDomain` utility function was added and gets exported separately.
