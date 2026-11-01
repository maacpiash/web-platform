import { describe, expect, test } from 'bun:test'
import {
  formatDate,
  formatRelative,
  isValidDate,
  isValidTimeZone,
  toISODate,
  toISODateTime,
  toZonedISODateTime,
} from './date.ts'

describe('ISO formatting', () => {
  test('toISODateTime', () => expect(toISODateTime(0)).toBe('1970-01-01T00:00:00.000Z'))
  test('toISODate accepts strings', () => expect(toISODate('2026-11-01T23:30:00Z')).toBe('2026-11-01'))
  test('toISODate accepts Date', () => expect(toISODate(new Date(Date.UTC(2026, 0, 5)))).toBe('2026-01-05'))
  test('throws on invalid input', () => expect(() => toISODate('nope')).toThrow(RangeError))
})

describe('isValidTimeZone', () => {
  test('valid IANA zone', () => expect(isValidTimeZone('Australia/Sydney')).toBe(true))
  test('UTC', () => expect(isValidTimeZone('UTC')).toBe(true))
  test('unknown zone', () => expect(isValidTimeZone('Mars/Olympus_Mons')).toBe(false))
  test('empty string', () => expect(isValidTimeZone('')).toBe(false))
})

describe('toZonedISODateTime', () => {
  const instant = '2026-11-01T00:00:00.123Z'
  test('Sydney during DST', () =>
    expect(toZonedISODateTime(instant, 'Australia/Sydney')).toBe('2026-11-01T11:00:00.123+11:00'))
  test('Sydney outside DST', () =>
    expect(toZonedISODateTime('2026-07-01T00:00:00Z', 'Australia/Sydney')).toBe('2026-07-01T10:00:00.000+10:00'))
  test('negative offset crossing midnight', () =>
    expect(toZonedISODateTime(instant, 'America/New_York')).toBe('2026-10-31T20:00:00.123-04:00'))
  test('half-hour offset', () =>
    expect(toZonedISODateTime(instant, 'Asia/Kolkata')).toBe('2026-11-01T05:30:00.123+05:30'))
  test('zero offset uses Z', () => expect(toZonedISODateTime(instant, 'UTC')).toBe('2026-11-01T00:00:00.123Z'))
  test('midnight renders as 00, not 24', () =>
    expect(toZonedISODateTime('2026-11-01T13:00:00Z', 'Australia/Sydney')).toBe('2026-11-02T00:00:00.000+11:00'))
  test('falls back to UTC for invalid zone', () =>
    expect(toZonedISODateTime(instant, 'Not/AZone')).toBe('2026-11-01T00:00:00.123Z'))
  test('throws on invalid date', () => expect(() => toZonedISODateTime('nope', 'Australia/Sydney')).toThrow(RangeError))
  test('represents the same instant', () => {
    const zoned = toZonedISODateTime(instant, 'Australia/Sydney')
    expect(new Date(zoned).getTime()).toBe(new Date(instant).getTime())
  })
})

describe('isValidDate', () => {
  test('valid', () => expect(isValidDate('2026-11-01')).toBe(true))
  test('invalid', () => expect(isValidDate('nope')).toBe(false))
})

describe('formatDate', () => {
  test('uses long date style in UTC by default', () => expect(formatDate('2026-11-01', 'en-GB')).toBe('1 November 2026'))
})

describe('formatRelative', () => {
  const now = Date.UTC(2026, 10, 1)
  const day = 86_400_000
  test('yesterday', () => expect(formatRelative(now - day, 'en', now)).toBe('yesterday'))
  test('future hours', () => expect(formatRelative(now + 2 * 3_600_000, 'en', now)).toBe('in 2 hours'))
  test('weeks ago', () => expect(formatRelative(now - 14 * day, 'en', now)).toBe('2 weeks ago'))
  test('now', () => expect(formatRelative(now, 'en', now)).toBe('now'))
})
