import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Calendar, Sparkles, Heart } from 'lucide-react';

const actions = [
  { label: 'Explore Hairstyles', icon: Scissors, to: '/hairstyles', color: 'text-gold-300' },
  { label: 'Book Appointment', icon: Calendar, to: '/book', color: 'text-blue-300' },
  { label: 'Services', icon: Sparkles, to: '/services', color: 'text-emerald-300' },
  { label: 'Saved Styles', icon: Heart, to: '/saved', color: 'text-rose-300' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(action.to)}
              className="card-surface p-4 flex flex-col items-start gap-3 hover:border-gold-400/20 transition-colors text-left"
            >
              <span className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${action.color}`}>
                <Icon size={22} />
              </span>
              <span className="text-sm font-medium text-gray-200">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
