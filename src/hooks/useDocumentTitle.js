import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const full = title ? `${title} — Blade & Bone` : 'Blade & Bone — Premium Barber Salon';
    document.title = full;
  }, [title]);
}
