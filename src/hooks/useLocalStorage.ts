import { useCallback, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage.ts'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((previous: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readStorage(key, initialValue))

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStoredValue((previous) => {
        const next =
          typeof value === 'function' ? (value as (previous: T) => T)(previous) : value
        writeStorage(key, next)
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue]
}
