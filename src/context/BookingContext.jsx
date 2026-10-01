import { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

// Frontend-only booking state — never sent to a server
export function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    serviceId: null,
    hairstyleId: null,
    barberId: null,
    date: null,
    time: null,
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [confirmed, setConfirmed] = useState(null);

  const updateBooking = useCallback((patch) => {
    setBooking((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking({
      serviceId: null,
      hairstyleId: null,
      barberId: null,
      date: null,
      time: null,
      name: '',
      phone: '',
      email: '',
      notes: '',
    });
    setConfirmed(null);
  }, []);

  const confirmBooking = useCallback(() => {
    setConfirmed({ ...booking, ref: `BB-${Date.now().toString(36).toUpperCase()}` });
  }, [booking]);

  return (
    <BookingContext.Provider
      value={{ booking, updateBooking, resetBooking, confirmBooking, confirmed }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
