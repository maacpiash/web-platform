/**
 * Converts a string into a URL-safe slug.
 * Strips diacritics, lowercases, and collapses non-alphanumerics into single hyphens.
 *
 * @example slugify('Héllo, World!') // 'hello-world'
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Uppercases the first character of a string, leaving the rest untouched.
 *
 * @example capitalize('hello world') // 'Hello world'
 */
export function capitalize(input: string): string {
  if (input.length === 0) return input
  return input.charAt(0).toUpperCase() + input.slice(1)
}

/**
 * Shortens a string to `maxLength` characters (including the suffix).
 *
 * @example truncate('Hello world', 8) // 'Hello w…'
 */
export function truncate(input: string, maxLength: number, suffix = '…'): string {
  if (input.length <= maxLength) return input
  if (maxLength <= suffix.length) return suffix.slice(0, maxLength)
  return input.slice(0, maxLength - suffix.length).trimEnd() + suffix
}

/**
 * Collapses runs of whitespace into a single space and trims both ends.
 *
 * @example normalizeWhitespace('  a \n\t b  ') // 'a b'
 */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim()
}

/**
 * Counts words in a string, ignoring surrounding and repeated whitespace.
 *
 * @example countWords('Hello,  brave new world') // 4
 */
export function countWords(input: string): number {
  const normalized = normalizeWhitespace(input)
  if (normalized.length === 0) return 0
  return normalized.split(' ').length
}

/**
 * Estimates reading time in whole minutes (minimum 1) for a block of text.
 *
 * @example readingTime(article.body) // 4
 */
export function readingTime(input: string, wordsPerMinute = 200): number {
  return Math.max(1, Math.ceil(countWords(input) / wordsPerMinute))
}

/**
 * Escapes the five HTML-significant characters so a string can be safely
 * interpolated into HTML text or attribute values.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
