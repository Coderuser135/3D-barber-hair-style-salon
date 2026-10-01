import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CompareContext = createContext(null);

const STORAGE_KEY = 'bb_compare';
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((next) => {
    setCompareIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const toggleCompare = useCallback(
    (id) => {
      if (compareIds.includes(id)) {
        persist(compareIds.filter((c) => c !== id));
      } else if (compareIds.length < MAX_COMPARE) {
        persist([...compareIds, id]);
      }
    },
    [compareIds, persist]
  );

  const removeFromCompare = useCallback((id) => persist(compareIds.filter((c) => c !== id)), [compareIds, persist]);
  const clearCompare = useCallback(() => persist([]), [persist]);
  const isInCompare = useCallback((id) => compareIds.includes(id), [compareIds]);
  const canAddMore = compareIds.length < MAX_COMPARE;

  return (
    <CompareContext.Provider
      value={{ compareIds, toggleCompare, removeFromCompare, clearCompare, isInCompare, canAddMore, maxCompare: MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
