import { motion } from 'framer-motion';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { barbers } from '@/data/barbers';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function Barbers() {
  useDocumentTitle('Our Barbers');
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Our Barbers</h1>
        <p className="text-sm text-gray-500 mb-6">Meet the craftspeople behind the chair</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {barbers.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card-surface overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="sm:w-40 flex-shrink-0">
                <img src={b.image} alt={b.name} loading="lazy" className="w-full h-48 sm:h-full object-cover" />
              </div>
              <div className="p-5 flex-1">
                <h3 className="font-display text-lg font-semibold text-gray-50">{b.name}</h3>
                <p className="text-sm text-gold-300 mb-1">{b.role}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-ink-700 text-xs text-gray-300">{b.specialization}</span>
                  <span className="px-2 py-0.5 rounded-full bg-ink-700 text-xs text-gray-300">{b.experience}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{b.bio}</p>
                <button
                  onClick={() => navigate('/book')}
                  className="btn-outline px-4 py-2 text-xs flex items-center gap-2"
                >
                  <Calendar size={14} />
                  Book with {b.name.split(' ')[0]}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
