import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Images, DollarSign, Info, Users, Phone, Heart, Building2 } from 'lucide-react';

const sheetItems = [
  { to: '/gallery', label: 'Gallery', icon: Images },
  { to: '/pricing', label: 'Pricing', icon: DollarSign },
  { to: '/about', label: 'About', icon: Info },
  { to: '/barbers', label: 'Our Barbers', icon: Users },
  { to: '/contact', label: 'Contact', icon: Phone },
  { to: '/saved', label: 'Saved Styles', icon: Heart },
  { to: '/about', label: 'Salon Information', icon: Building2 },
];

export default function MoreSheet({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass rounded-t-4xl border-t border-white/10 lg:hidden safe-pb"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
              <h2 className="font-display text-lg font-semibold text-gray-50">More</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center text-gray-400 hover:text-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-4 pb-6 pt-2 grid grid-cols-2 gap-3">
              {sheetItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavigate(item.to)}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-ink-700/50 border border-white/5 hover:border-gold-400/30 transition-colors text-left"
                  >
                    <span className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
