import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { services, serviceCategories } from '@/data/services';
import { useBooking } from '@/context/BookingContext';

export default function Pricing() {
  useDocumentTitle('Pricing');
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const handleBook = (serviceId) => {
    updateBooking({ serviceId });
    navigate('/book');
  };

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Pricing</h1>
        <p className="text-sm text-gray-500 mb-6">Transparent pricing for every service</p>

        {serviceCategories.map((cat) => {
          const catServices = services.filter((s) => s.category === cat);
          return (
            <div key={cat} className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gold-300 mb-4">{cat}</h2>
              <div className="card-surface overflow-hidden">
                {catServices.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`p-4 lg:p-5 flex items-center justify-between gap-4 ${
                      i < catServices.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-50">{s.name}</h3>
                        <span className="font-display text-lg font-bold text-gold-300 whitespace-nowrap">${s.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-1 mb-2">{s.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock size={12} /> {s.duration}</span>
                        <span className="flex items-center gap-1">
                          <Check size={12} className="text-gold-400" /> {s.includes.length} items included
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook(s.id)}
                      className="btn-gold px-4 py-2.5 text-xs whitespace-nowrap"
                    >
                      Book
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        <p className="text-center text-sm text-gray-500 mt-6">
          Prices are demo values and can be updated anytime.
        </p>
      </div>
    </PageTransition>
  );
}
