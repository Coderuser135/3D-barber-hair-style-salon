import { motion } from 'framer-motion';
import { Check, ChevronDown, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { services, serviceCategories } from '@/data/services';
import { useBooking } from '@/context/BookingContext';
import { salon } from '@/data/salon';

export default function Services() {
  useDocumentTitle('Services');
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [expanded, setExpanded] = useState(null);

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Services</h1>
        <p className="text-sm text-gray-500 mb-2">Services and enquiries for {salon.name}</p>
        <p className="text-xs text-gray-600 mb-6">Pricing and availability should be confirmed directly with the salon.</p>

        {serviceCategories.map((cat) => {
          const catServices = services.filter((s) => s.category === cat);
          return (
            <div key={cat} className="mb-6">
              <h2 className="font-display text-lg font-semibold text-gold-300 mb-3">{cat}</h2>
              <div className="grid gap-3 lg:grid-cols-2">
                {catServices.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-50">{s.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Current price: contact salon</p>
                      </div>
                      <button onClick={() => { updateBooking({ serviceId: s.id }); navigate('/book'); }} className="btn-gold px-4 py-2 text-xs whitespace-nowrap">Enquire</button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{s.description}</p>
                    <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gold-300 transition-colors">
                      Details <ChevronDown size={14} className={`transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
                    </button>
                    {expanded === s.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-2 space-y-1">
                        {s.includes.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-gold-400" />{item}</div>)}
                        <a href={`tel:${salon.phoneRaw}`} className="mt-3 inline-flex items-center gap-2 text-xs text-gold-300"><Phone size={13} /> Call {salon.phone}</a>
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
