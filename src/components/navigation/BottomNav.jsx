import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Scissors, Sparkles, Calendar, Menu } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/hairstyles', label: 'Styles', icon: Scissors },
  { to: '/services', label: 'Services', icon: Sparkles },
  { to: '/book', label: 'Book', icon: Calendar },
];

export default function BottomNav({ onMore }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 safe-pb"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[60px] transition-colors"
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <motion.div
                animate={{ scale: active ? 1.1 : 1, y: active ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={22}
                  className={active ? 'text-gold-400' : 'text-gray-500'}
                  strokeWidth={active ? 2.5 : 2}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  active ? 'text-gold-400' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-gold-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
        <button
          onClick={onMore}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[60px] transition-colors"
          aria-label="More options"
        >
          <Menu size={22} className="text-gray-500" strokeWidth={2} />
          <span className="text-[10px] font-medium text-gray-500">More</span>
        </button>
      </div>
    </nav>
  );
}
