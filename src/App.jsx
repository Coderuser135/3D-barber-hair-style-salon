import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CompareProvider } from '@/context/CompareContext';
import { BookingProvider } from '@/context/BookingContext';
import Layout from '@/components/layout/Layout';

const Home = lazy(() => import('@/pages/Home'));
const Hairstyles = lazy(() => import('@/pages/Hairstyles'));
const HairstyleDetail = lazy(() => import('@/pages/HairstyleDetail'));
const Services = lazy(() => import('@/pages/Services'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const About = lazy(() => import('@/pages/About'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Barbers = lazy(() => import('@/pages/Barbers'));
const Contact = lazy(() => import('@/pages/Contact'));
const Book = lazy(() => import('@/pages/Book'));
const Saved = lazy(() => import('@/pages/Saved'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/hairstyles" element={<Hairstyles />} />
            <Route path="/hairstyles/:id" element={<HairstyleDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <BookingProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </BookingProvider>
      </CompareProvider>
    </FavoritesProvider>
  );
}
