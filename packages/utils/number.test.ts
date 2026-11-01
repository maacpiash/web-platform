import { describe, expect, test } from 'bun:test'
import { clamp, formatBytes, formatCompact, formatNumber } from './number.ts'

describe('clamp', () => {
  test('above max', () => expect(clamp(15, 0, 10)).toBe(10))
  test('below min', () => expect(clamp(-5, 0, 10)).toBe(0))
  test('within range', () => expect(clamp(5, 0, 10)).toBe(5))
})

describe('formatting', () => {
  test('formatNumber groups digits', () => expect(formatNumber(1234567, 'en-US')).toBe('1,234,567'))
  test('formatCompact', () => expect(formatCompact(12_300, 'en')).toBe('12K'))
  test('formatBytes zero', () => expect(formatBytes(0, 'en')).toBe('0 byte'))
  test('formatBytes kilobytes', () => expect(formatBytes(1536, 'en')).toBe('1.5 kB'))
  test('formatBytes megabytes', () => expect(formatBytes(5 * 1024 ** 2, 'en')).toBe('5 MB'))
})
