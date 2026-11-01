import { describe, expect, test } from 'bun:test'
import { chunk, groupBy, sortBy, unique } from './array.ts'

describe('unique', () => {
  test('primitives', () => expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]))
  test('by key', () => expect(unique([{ id: 1 }, { id: 1 }, { id: 2 }], (x) => x.id)).toEqual([{ id: 1 }, { id: 2 }]))
})

describe('chunk', () => {
  test('splits evenly with remainder', () => expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]))
  test('rejects invalid size', () => expect(() => chunk([1], 0)).toThrow(RangeError))
})

describe('groupBy', () => {
  test('groups by key', () =>
    expect(groupBy(['apple', 'avocado', 'banana'], (s) => s.charAt(0))).toEqual({
      a: ['apple', 'avocado'],
      b: ['banana'],
    }))
})

describe('sortBy', () => {
  const input = [{ n: 2 }, { n: 3 }, { n: 1 }] as const
  test('ascending', () => expect(sortBy(input, (x) => x.n).map((x) => x.n)).toEqual([1, 2, 3]))
  test('descending', () => expect(sortBy(input, (x) => x.n, 'desc').map((x) => x.n)).toEqual([3, 2, 1]))
  test('does not mutate input', () => {
    sortBy(input, (x) => x.n)
    expect(input.map((x) => x.n)).toEqual([2, 3, 1])
  })
})
