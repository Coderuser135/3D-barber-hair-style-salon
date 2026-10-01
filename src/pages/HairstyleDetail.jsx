import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Calendar, GitCompare, Check, Clock, Droplets, Scissors, Sparkles, Info } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { getHairstyleById } from '@/data/hairstyles';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';
import { useBooking } from '@/context/BookingContext';
import HairstyleImage from '@/components/hairstyle/HairstyleImage';

export default function HairstyleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hairstyle = getHairstyleById(id);
  useDocumentTitle(hairstyle ? hairstyle.name : 'Hairstyle');

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, canAddMore } = useCompare();
  const { updateBooking } = useBooking();

  if (!hairstyle) {
    return (
      <PageTransition>
        <div className="px-5 pt-20 text-center">
          <h1 className="font-display text-2xl text-gray-50 mb-2">Hairstyle not found</h1>
          <Link to="/hairstyles" className="btn-gold px-5 py-3 text-sm inline-block mt-4">
            Back to Hairstyles
          </Link>
        </div>
      </PageTransition>
    );
  }

  const fav = isFavorite(hairstyle.id);
  const inCompare = isInCompare(hairstyle.id);

  const specs = [
    { label: 'Top', value: hairstyle.topLength, icon: Scissors },
    { label: 'Sides', value: hairstyle.sideLength, icon: Scissors },
    { label: 'Back', value: hairstyle.backLength, icon: Scissors },
    { label: 'Fade', value: hairstyle.fadeType, icon: Sparkles },
    { label: 'Texture', value: hairstyle.texture, icon: Droplets },
    { label: 'Maintenance', value: hairstyle.maintenance, icon: Clock },
    { label: 'Styling Time', value: hairstyle.stylingTime, icon: Clock },
    { label: 'Hair Type', value: hairstyle.hairType.join(', '), icon: Info },
  ];

  const handleBook = () => {
    updateBooking({ hairstyleId: hairstyle.id });
    navigate('/book');
  };

  return (
    <PageTransition>
      {/* Mobile back header */}
      <div className="lg:hidden sticky top-14 z-30 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center text-gray-300" aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-base font-semibold text-gray-50 flex-1 truncate">{hairstyle.name}</h1>
        <button
          onClick={() => toggleFavorite(hairstyle.id)}
          className="w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center"
          aria-label={fav ? 'Remove from saved' : 'Add to saved'}
        >
          <Heart size={18} className={fav ? 'text-gold-400' : 'text-gray-400'} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="lg:max-w-7xl lg:mx-auto lg:px-12 lg:pt-24 pb-10">
        {/* Desktop back button */}
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-2 text-sm text-gray-400 hover:text-gold-300 transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 lg:items-start gap-8 lg:gap-10">
          {/* HD hairstyle photo */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl card-surface"
            >
              <HairstyleImage hairstyle={hairstyle} size="detail" alt={`${hairstyle.name} hairstyle reference`} className="w-full object-contain" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
                <span className="inline-flex items-center rounded-full bg-black/45 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  HD Hairstyle Reference
                </span>
              </div>
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 px-1">
              Photo reference for this hairstyle. The 3D viewer has been replaced with the supplied 50-style HD reference catalog.
            </p>
          </div>

          {/* Details */}
          <div className="px-5 lg:px-0 lg:pt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-400/10 text-xs font-medium text-gold-300 mb-3">
              {hairstyle.category}
            </span>
            <h1 className="hidden lg:block font-display text-3xl font-bold text-gray-50 mb-2">{hairstyle.name}</h1>
            <p className="text-gray-400 mb-5">{hairstyle.description}</p>

            {/* Action buttons */}
            <div className="flex gap-2 mb-6">
              <button onClick={handleBook} className="btn-gold flex-1 py-3 text-sm flex items-center justify-center gap-2">
                <Calendar size={16} />
                Book This Style
              </button>
              <button
                onClick={() => toggleFavorite(hairstyle.id)}
                className="btn-outline px-4 py-3 flex items-center justify-center gap-2 text-sm"
              >
                <Heart size={16} className={fav ? 'text-gold-400' : ''} fill={fav ? 'currentColor' : 'none'} />
                <span className="hidden lg:inline">{fav ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={() => canAddMore || inCompare ? toggleCompare(hairstyle.id) : null}
                disabled={!canAddMore && !inCompare}
                className={`btn-outline px-4 py-3 flex items-center justify-center gap-2 text-sm ${
                  !canAddMore && !inCompare ? 'opacity-30 cursor-not-allowed' : ''
                }`}
              >
                {inCompare ? <Check size={16} className="text-gold-400" /> : <GitCompare size={16} />}
                <span className="hidden lg:inline">{inCompare ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>

            {/* Specifications */}
            <div className="mb-6">
              <h2 className="font-display text-lg font-semibold text-gray-50 mb-3">Cut Specifications</h2>
              <div className="grid grid-cols-2 gap-2">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="card-surface p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <Icon size={12} />
                        {spec.label}
                      </div>
                      <p className="text-sm font-medium text-gray-200">{spec.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hair details */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Suitable Hair Type</h3>
                <div className="flex flex-wrap gap-2">
                  {hairstyle.hairType.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-ink-700 text-xs text-gray-300">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Styling Difficulty</h3>
                <p className="text-sm text-gray-400">{hairstyle.difficulty}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Recommended Products</h3>
                <div className="flex flex-wrap gap-2">
                  {hairstyle.products.map((p) => (
                    <span key={p} className="px-3 py-1 rounded-full bg-ink-700 text-xs text-gray-300">{p}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Recommended Frequency</h3>
                <p className="text-sm text-gray-400">{hairstyle.frequency}</p>
              </div>

              <div className="card-surface p-4 border-l-2 border-l-gold-400/40">
                <h3 className="text-sm font-semibold text-gold-300 mb-1">Barber Notes</h3>
                <p className="text-sm text-gray-400">{hairstyle.barberNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
