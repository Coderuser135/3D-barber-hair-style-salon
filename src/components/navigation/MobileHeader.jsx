import { Link, useNavigate } from 'react-router-dom';
import { Heart, Info } from 'lucide-react';
import { salon } from '@/data/salon';

export default function MobileHeader({ onMore }) {
  const navigate = useNavigate();

  return (
    <header className="lg:hidden sticky top-0 z-40 glass border-b border-white/5 safe-pt">
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
          aria-label={`${salon.name} home`}
        >
          <span className="w-8 h-8 rounded-lg bg-gold-400 flex items-center justify-center">
            <span className="text-ink-950 font-display font-bold text-lg">B</span>
          </span>
          <span className="font-display font-semibold text-lg text-gray-50">{salon.name}</span>
        </button>

        <div className="flex items-center gap-2">
          <Link
            to="/saved"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-300 transition-colors"
            aria-label="Saved styles"
          >
            <Heart size={20} />
          </Link>
          <button
            onClick={onMore}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-300 transition-colors"
            aria-label="More information"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
