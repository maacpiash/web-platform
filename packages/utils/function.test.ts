import { describe, expect, mock, test } from 'bun:test'
import { debounce, sleep, throttle } from './function.ts'

describe('debounce', () => {
  test('only fires once after rapid calls, with the last args', async () => {
    const fn = mock((_value: number) => {})
    const debounced = debounce(fn, 20)
    debounced(1)
    debounced(2)
    debounced(3)
    await sleep(40)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith(3)
  })

  test('cancel prevents the pending call', async () => {
    const fn = mock(() => {})
    const debounced = debounce(fn, 20)
    debounced()
    debounced.cancel()
    await sleep(40)
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('throttle', () => {
  test('drops calls inside the interval', async () => {
    const fn = mock(() => {})
    const throttled = throttle(fn, 30)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(40)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
