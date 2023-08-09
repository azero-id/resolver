/**
 * Sanitizes a given domain string (e.g. `Name.azero  ` → `name.azero`).
 * By default, the domain will be trimmed and converted to lowercase.
 */
export interface SanitizeDomainOptions {
  trim?: boolean
  lowercase?: boolean
  replaceUnderscores?: boolean
  removeOuterNonAlphanumeric?: boolean
  removeDots?: boolean
}
export const sanitizeDomain = (value?: string, options?: SanitizeDomainOptions): string => {
  if (!value || typeof value !== 'string') return ''

  // Merge default options
  const _o = Object.assign(
    {
      trim: true,
      lowercase: true,
    } satisfies SanitizeDomainOptions,
    options,
  )

  // Sanitize value
  let _value = value
  if (_o.trim) _value = _value.trim()
  if (_o.lowercase) _value = _value.toLowerCase()
  if (_o.replaceUnderscores) _value = _value.replaceAll('_', '-')
  if (_o.removeOuterNonAlphanumeric)
    _value = _value = _value.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '')

  return _value
}
