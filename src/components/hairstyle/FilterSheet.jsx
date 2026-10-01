import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { hairTypes, fadeTypes, maintenanceLevels, lengthOptions } from '@/data/hairstyles';

export default function FilterSheet({ isOpen, onClose, filters, onApply, onClear }) {
  const update = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onApply({ ...filters, [key]: next });
  };

  const isChecked = (key, value) => (filters[key] || []).includes(value);

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
            className="fixed bottom-0 left-0 right-0 z-50 glass rounded-t-4xl border-t border-white/10 lg:hidden max-h-[85vh] overflow-y-auto safe-pb"
          >
            <div className="sticky top-0 glass px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/5">
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
              <h2 className="font-display text-lg font-semibold text-gray-50">Filters</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center text-gray-400"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-6">
              <FilterGroup title="Hair Type">
                {hairTypes.map((t) => (
                  <FilterCheck key={t} label={t} checked={isChecked('hairType', t)} onChange={() => update('hairType', t)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Fade Type">
                {fadeTypes.map((t) => (
                  <FilterCheck key={t} label={t} checked={isChecked('fadeType', t)} onChange={() => update('fadeType', t)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Maintenance">
                {maintenanceLevels.map((t) => (
                  <FilterCheck key={t} label={t} checked={isChecked('maintenance', t)} onChange={() => update('maintenance', t)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Length">
                {lengthOptions.map((t) => (
                  <FilterCheck key={t} label={t} checked={isChecked('length', t)} onChange={() => update('length', t)} />
                ))}
              </FilterGroup>
            </div>

            <div className="sticky bottom-0 glass px-5 py-4 flex gap-3 border-t border-white/5">
              <button
                onClick={onClear}
                className="flex-1 btn-outline py-3"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-gold py-3"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterCheck({ label, checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
        checked
          ? 'bg-gold-400/15 border border-gold-400/40 text-gold-300'
          : 'bg-ink-700 border border-white/5 text-gray-400'
      }`}
    >
      {checked && <Check size={14} />}
      {label}
    </button>
  );
}
