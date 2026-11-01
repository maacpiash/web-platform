/**
 * Returns a new array with duplicate values removed, preserving first occurrence order.
 * Pass `key` to dedupe objects by a derived value.
 *
 * @example unique([1, 2, 2, 3]) // [1, 2, 3]
 * @example unique(posts, (post) => post.slug)
 */
export function unique<T>(items: readonly T[], key: (item: T) => unknown = (item) => item): T[] {
  const seen = new Set<unknown>()
  return items.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/**
 * Splits an array into consecutive chunks of `size`.
 *
 * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('chunk size must be a positive integer')
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

/**
 * Groups items into a record keyed by the result of `key`.
 *
 * @example groupBy(posts, (post) => post.year) // { '2025': [...], '2026': [...] }
 */
export function groupBy<T, K extends PropertyKey>(items: readonly T[], key: (item: T) => K): Record<K, T[]> {
  const groups = {} as Record<K, T[]>
  for (const item of items) {
    const k = key(item)
    ;(groups[k] ??= []).push(item)
  }
  return groups
}

/**
 * Returns a new array sorted by a derived value, without mutating the input.
 *
 * @example sortBy(posts, (post) => post.publishedAt, 'desc')
 */
export function sortBy<T>(
  items: readonly T[],
  key: (item: T) => number | string | Date,
  direction: 'asc' | 'desc' = 'asc',
): T[] {
  const sign = direction === 'asc' ? 1 : -1
  return [...items].sort((a, b) => {
    const ka = key(a)
    const kb = key(b)
    if (ka < kb) return -sign
    if (ka > kb) return sign
    return 0
  })
}
