import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import HairstyleImage from './HairstyleImage';

export default function HairstyleCard({ hairstyle, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(hairstyle.id);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.3 }}
      className="card-surface overflow-hidden group">
      <Link to={`/hairstyles/${hairstyle.id}`} className="block">
        <div className="relative overflow-hidden">
          <HairstyleImage hairstyle={hairstyle} alt={hairstyle.name}
            className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-medium text-gold-300">
            {hairstyle.category}
          </span>
          <button onClick={(e) => { e.preventDefault(); toggleFavorite(hairstyle.id); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center"
            aria-label={fav ? 'Remove from saved' : 'Add to saved'}>
            <Heart size={18} className={fav ? 'text-gold-400' : 'text-gray-300'} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/hairstyles/${hairstyle.id}`}>
          <h3 className="font-display font-semibold text-gray-50 mb-1 group-hover:text-gold-300 transition-colors">{hairstyle.name}</h3>
        </Link>
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{hairstyle.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-0.5 rounded-full bg-ink-600">{hairstyle.maintenance}</span>
            <span>{hairstyle.stylingTime}</span>
          </div>
          <Link to={`/hairstyles/${hairstyle.id}`} className="flex items-center gap-1 text-sm font-medium text-gold-300 hover:text-gold-200 transition-colors">
            View Style <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
