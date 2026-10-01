import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { services, serviceCategories } from '@/data/services';
import { useBooking } from '@/context/BookingContext';

export default function Services() {
  useDocumentTitle('Services');
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [expanded, setExpanded] = useState(null);

  const handleBook = (serviceId) => {
    updateBooking({ serviceId });
    navigate('/book');
  };

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Services</h1>
        <p className="text-sm text-gray-500 mb-5">Premium grooming tailored to you</p>

        {serviceCategories.map((cat) => {
          const catServices = services.filter((s) => s.category === cat);
          return (
            <div key={cat} className="mb-6">
              <h2 className="font-display text-lg font-semibold text-gold-300 mb-3">{cat}</h2>
              <div className="grid gap-3 lg:grid-cols-2">
                {catServices.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card-surface p-5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-50">{s.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock size={12} /> {s.duration}</span>
                          <span className="flex items-center gap-1 text-gold-300 font-semibold text-base">
                            <DollarSign size={14} />{s.price}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBook(s.id)}
                        className="btn-gold px-4 py-2 text-xs whitespace-nowrap"
                      >
                        Book
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{s.description}</p>
                    <button
                      onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gold-300 transition-colors"
                    >
                      What's included
                      <ChevronDown size={14} className={`transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
                    </button>
                    {expanded === s.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-2 space-y-1"
                      >
                        {s.includes.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <Check size={14} className="text-gold-400" />
                            {item}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}
