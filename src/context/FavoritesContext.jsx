import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'bb_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const persist = useCallback((next) => {
    setFavorites(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage may be full or unavailable
    }
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      persist(favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]);
    },
    [favorites, persist]
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const clearFavorites = useCallback(() => persist([]), [persist]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
