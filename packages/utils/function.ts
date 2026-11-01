export type Debounced<Args extends readonly unknown[]> = ((...args: Args) => void) & {
  readonly cancel: () => void
}

/**
 * Delays invoking `fn` until `waitMs` have elapsed since the last call.
 *
 * @example const onInput = debounce((value: string) => search(value), 250)
 */
export function debounce<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): Debounced<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const cancel = () => {
    clearTimeout(timer)
    timer = undefined
  }

  const debounced = (...args: Args) => {
    cancel()
    timer = setTimeout(() => fn(...args), waitMs)
  }

  return Object.assign(debounced, { cancel })
}

/**
 * Invokes `fn` at most once per `intervalMs`; calls inside the interval are dropped.
 *
 * @example window.addEventListener('scroll', throttle(updateHeader, 100))
 */
export function throttle<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  intervalMs: number,
): (...args: Args) => void {
  let last = -Infinity
  return (...args: Args) => {
    const now = Date.now()
    if (now - last < intervalMs) return
    last = now
    fn(...args)
  }
}

/**
 * Resolves after `ms` milliseconds.
 *
 * @example await sleep(300)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
