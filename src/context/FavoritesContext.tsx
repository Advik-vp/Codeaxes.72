import { createContext, useCallback, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.ts'
import { STORAGE_KEYS } from '../utils/storage.ts'

export interface FavoritesContextValue {
  favorites: string[]
  toggleFavorite: (projectId: string) => void
  isFavorite: (projectId: string) => boolean
  clearFavorites: () => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function sanitizeFavoriteIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter((item): item is string => typeof item === 'string' && item.length > 0)
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [rawFavorites, setFavorites] = useLocalStorage<string[]>(STORAGE_KEYS.favorites, [])
  const favorites = useMemo(() => sanitizeFavoriteIds(rawFavorites), [rawFavorites])

  const toggleFavorite = useCallback(
    (projectId: string) => {
      setFavorites((current) => {
        const safe = sanitizeFavoriteIds(current)
        return safe.includes(projectId)
          ? safe.filter((id) => id !== projectId)
          : [...safe, projectId]
      })
    },
    [setFavorites],
  )

  const isFavorite = useCallback(
    (projectId: string) => favorites.includes(projectId),
    [favorites],
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [setFavorites])

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [favorites, toggleFavorite, isFavorite, clearFavorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
