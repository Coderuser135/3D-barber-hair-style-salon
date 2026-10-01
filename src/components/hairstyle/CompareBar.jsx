import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { getHairstyleById } from '@/data/hairstyles';

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareIds.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-auto z-40"
      >
        <div className="glass rounded-2xl border border-gold-400/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gold-300">
              <GitCompare size={18} />
              <span className="text-sm font-medium">Compare ({compareIds.length}/3)</span>
            </div>
            <button
              onClick={clearCompare}
              className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            {compareIds.map((id) => {
              const h = getHairstyleById(id);
              if (!h) return null;
              return (
                <div key={id} className="relative">
                  <img
                    src={h.image}
                    alt={h.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => removeFromCompare(id)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ink-700 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                    aria-label={`Remove ${h.name} from compare`}
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigate('/hairstyles?compare=1')}
            disabled={compareIds.length < 2}
            className="w-full btn-gold py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {compareIds.length < 2 ? 'Select at least 2 to compare' : 'Compare Now'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
