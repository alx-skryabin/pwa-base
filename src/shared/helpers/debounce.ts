type AnyFunction = (...args: never[]) => unknown

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void

  cancel: () => void
}

export function debounce<T extends AnyFunction>(func: T, timeout: number): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debouncedFn = ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => func(...args), timeout)
  }) as DebouncedFunction<T>

  debouncedFn.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  return debouncedFn
}
