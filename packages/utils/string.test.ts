import { describe, expect, test } from 'bun:test'
import { capitalize, countWords, escapeHtml, normalizeWhitespace, readingTime, slugify, truncate } from './string.ts'

describe('slugify', () => {
  test('lowercases and hyphenates', () => expect(slugify('Hello, World!')).toBe('hello-world'))
  test('strips diacritics', () => expect(slugify('Crème Brûlée')).toBe('creme-brulee'))
  test('trims leading/trailing separators', () => expect(slugify('  --a  b--  ')).toBe('a-b'))
  test('handles empty input', () => expect(slugify('')).toBe(''))
})

describe('capitalize', () => {
  test('uppercases first char', () => expect(capitalize('hello world')).toBe('Hello world'))
  test('handles empty input', () => expect(capitalize('')).toBe(''))
})

describe('truncate', () => {
  test('leaves short strings untouched', () => expect(truncate('Hi', 5)).toBe('Hi'))
  test('appends suffix within maxLength', () => expect(truncate('Hello world', 8)).toBe('Hello w…'))
  test('respects tiny maxLength', () => expect(truncate('Hello', 1)).toBe('…'))
})

describe('whitespace and words', () => {
  test('normalizeWhitespace collapses runs', () => expect(normalizeWhitespace('  a \n\t b  ')).toBe('a b'))
  test('countWords', () => expect(countWords('Hello,  brave new world')).toBe(4))
  test('countWords on blank', () => expect(countWords('   ')).toBe(0))
  test('readingTime has a 1 minute floor', () => expect(readingTime('short')).toBe(1))
  test('readingTime rounds up', () => expect(readingTime('word '.repeat(201))).toBe(2))
})

describe('escapeHtml', () => {
  test('escapes special characters', () =>
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;',
    ))
})
