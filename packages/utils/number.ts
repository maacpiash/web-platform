/**
 * Restricts a number to the inclusive range [min, max].
 *
 * @example clamp(15, 0, 10) // 10
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formats a number with locale-aware grouping via `Intl.NumberFormat`.
 *
 * @example formatNumber(1234567.891, 'en-US') // '1,234,567.891'
 */
export function formatNumber(value: number, locale?: string, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

/**
 * Formats a number in compact notation.
 *
 * @example formatCompact(12_300, 'en') // '12K'
 */
export function formatCompact(value: number, locale?: string): string {
  return formatNumber(value, locale, { notation: 'compact' })
}

const BYTE_UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'] as const

/**
 * Formats a byte count using binary (1024) steps and localized unit names.
 *
 * @example formatBytes(1536, 'en') // '1.5 kB'
 */
export function formatBytes(bytes: number, locale?: string): string {
  const exponent = clamp(Math.floor(Math.log(Math.abs(bytes) || 1) / Math.log(1024)), 0, BYTE_UNITS.length - 1)
  return formatNumber(bytes / 1024 ** exponent, locale, {
    style: 'unit',
    unit: BYTE_UNITS[exponent],
    maximumFractionDigits: 1,
  })
}
