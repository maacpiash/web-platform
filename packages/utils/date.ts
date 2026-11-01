export type DateInput = Date | string | number

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input)
}

/**
 * Returns true when the input resolves to a valid date.
 */
export function isValidDate(input: DateInput): boolean {
  return !Number.isNaN(toDate(input).getTime())
}

/**
 * Formats a date as a full ISO 8601 string in UTC.
 * Throws a RangeError for invalid input.
 *
 * @example toISODateTime(new Date(0)) // '1970-01-01T00:00:00.000Z'
 */
export function toISODateTime(input: DateInput): string {
  return toDate(input).toISOString()
}

/**
 * Returns true when `timeZone` is an IANA time zone the runtime recognises.
 *
 * @example isValidTimeZone('Australia/Sydney') // true
 * @example isValidTimeZone('Mars/Olympus_Mons') // false
 */
export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat(undefined, { timeZone })
    return true
  } catch {
    return false
  }
}

/**
 * Formats a date as an ISO 8601 string in the given IANA time zone, with its UTC offset.
 * Falls back to `toISODateTime` (UTC) when the time zone is not recognised.
 * Throws a RangeError for an invalid date.
 *
 * @example toZonedISODateTime('2026-11-01T00:00:00Z', 'Australia/Sydney') // '2026-11-01T11:00:00.000+11:00'
 * @example toZonedISODateTime('2026-11-01T00:00:00Z', 'Not/AZone') // '2026-11-01T00:00:00.000Z'
 */
export function toZonedISODateTime(input: DateInput, timeZone: string): string {
  if (!isValidTimeZone(timeZone)) return toISODateTime(input)

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    timeZoneName: 'longOffset',
  }).formatToParts(toDate(input))

  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  // Engines render a zero offset as either 'GMT' or 'GMT+00:00'.
  const rawOffset = part('timeZoneName').replace('GMT', '')
  const offset = rawOffset === '' || rawOffset === '+00:00' ? 'Z' : rawOffset

  return `${part('year').padStart(4, '0')}-${part('month')}-${part('day')}T${part('hour')}:${part('minute')}:${part('second')}.${part('fractionalSecond')}${offset}`
}

/**
 * Formats a date as an ISO 8601 calendar date (YYYY-MM-DD) in UTC.
 * Suitable for `<time datetime>` attributes and sitemap `lastmod` values.
 *
 * @example toISODate('2026-11-01T15:30:00Z') // '2026-11-01'
 */
export function toISODate(input: DateInput): string {
  return toISODateTime(input).slice(0, 10)
}

/**
 * Formats a date for human display using `Intl.DateTimeFormat`.
 *
 * @example formatDate('2026-11-01', 'en-GB') // '1 November 2026'
 */
export function formatDate(
  input: DateInput,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeZone: 'UTC' },
): string {
  return new Intl.DateTimeFormat(locale, options).format(toDate(input))
}

const RELATIVE_UNITS: ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
]

/**
 * Describes a date relative to `now`, e.g. "3 days ago" or "in 2 hours".
 * Month and year lengths are approximated (30 and 365 days).
 *
 * @example formatRelative(Date.now() - 86_400_000, 'en') // 'yesterday'
 */
export function formatRelative(input: DateInput, locale?: string, now: DateInput = Date.now()): string {
  const diffSeconds = Math.round((toDate(input).getTime() - toDate(now).getTime()) / 1000)
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const [unit, seconds] = RELATIVE_UNITS.find(([, size]) => Math.abs(diffSeconds) >= size) ?? ['second', 1]
  return formatter.format(Math.round(diffSeconds / seconds), unit)
}
