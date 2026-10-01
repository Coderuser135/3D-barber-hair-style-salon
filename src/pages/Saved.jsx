import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Scissors, GitCompare, Check } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';
import { getHairstyleById } from '@/data/hairstyles';
import { useBooking } from '@/context/BookingContext';

export default function Saved() {
  useDocumentTitle('Saved Styles');
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { toggleCompare, isInCompare, canAddMore } = useCompare();
  const { updateBooking } = useBooking();

  const savedHairstyles = favorites.map((id) => getHairstyleById(id)).filter(Boolean);

  const handleBook = (hairstyleId) => {
    updateBooking({ hairstyleId });
    navigate('/book');
  };

  if (savedHairstyles.length === 0) {
    return (
      <PageTransition>
        <div className="px-5 pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-surface p-10 max-w-md mx-auto"
          >
            <span className="w-16 h-16 rounded-full bg-ink-700 flex items-center justify-center mx-auto mb-4">
              <Heart size={28} className="text-gray-500" />
            </span>
            <h1 className="font-display text-xl font-semibold text-gray-50 mb-2">No saved hairstyles yet</h1>
            <p className="text-sm text-gray-400 mb-6">Tap the heart on any hairstyle to save it here for later.</p>
            <Link to="/hairstyles" className="btn-gold px-6 py-3 text-sm inline-flex items-center gap-2">
              <Scissors size={16} />
              Explore Hairstyles
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Saved Styles</h1>
        <p className="text-sm text-gray-500 mb-5">{savedHairstyles.length} saved hairstyle{savedHairstyles.length !== 1 ? 's' : ''}</p>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
          {savedHairstyles.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-surface overflow-hidden group"
            >
              <Link to={`/hairstyles/${h.id}`} className="block relative aspect-[4/5] overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-medium text-gold-300">
                  {h.category}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); toggleFavorite(h.id); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center"
                  aria-label="Remove from saved"
                >
                  <Heart size={18} className="text-gold-400" fill="currentColor" />
                </button>
              </Link>
              <div className="p-4">
                <Link to={`/hairstyles/${h.id}`}>
                  <h3 className="font-semibold text-gray-50 mb-1 group-hover:text-gold-300 transition-colors">{h.name}</h3>
                </Link>
                <p className="text-xs text-gray-500 mb-3">{h.maintenance} · {h.stylingTime}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBook(h.id)}
                    className="btn-gold flex-1 py-2 text-xs"
                  >
                    Book
                  </button>
                  <button
                    onClick={() => (canAddMore || isInCompare(h.id)) && toggleCompare(h.id)}
                    disabled={!canAddMore && !isInCompare(h.id)}
                    className={`px-3 py-2 rounded-full text-xs border transition-colors ${
                      isInCompare(h.id)
                        ? 'bg-gold-400/15 border-gold-400/40 text-gold-300'
                        : 'border-white/10 text-gray-400 hover:text-gold-300'
                    } ${!canAddMore && !isInCompare(h.id) ? 'opacity-30 cursor-not-allowed' : ''}`}
                    aria-label="Toggle compare"
                  >
                    {isInCompare(h.id) ? <Check size={14} /> : <GitCompare size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
