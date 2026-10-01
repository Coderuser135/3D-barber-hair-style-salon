import { motion } from 'framer-motion';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { salon } from '@/data/salon';
import { MapPin, Phone, Star, ExternalLink } from 'lucide-react';

export default function About() {
  useDocumentTitle('About');

  return (
    <PageTransition>
      <div className="lg:max-w-7xl lg:mx-auto lg:px-12 lg:pt-24 pb-10">
        <div className="px-5 lg:px-0 py-8">
          <span className="text-xs font-medium text-gold-300">{salon.category}</span>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-gray-50 mt-2">{salon.name}</h1>
          <p className="text-gray-500 mt-2">{salon.hindiName}</p>
          <p className="text-lg text-gray-300 leading-relaxed mt-6 max-w-3xl">{salon.description}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8 mb-10">
            {salon.stats.map((s) => <div key={s.label} className="card-surface p-5 text-center"><p className="font-display text-2xl font-bold text-gold-300">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>)}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="card-surface p-6">
              <h2 className="font-display text-2xl font-semibold text-gray-50 mb-5">Business Details</h2>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><MapPin size={18} className="text-gold-400 flex-shrink-0" /><span className="text-gray-300">{salon.address}</span></div>
                <a href={`tel:${salon.phoneRaw}`} className="flex gap-3"><Phone size={18} className="text-gold-400 flex-shrink-0" /><span className="text-gray-300">{salon.phone}</span></a>
                <div className="flex gap-3"><Star size={18} className="text-gold-400 flex-shrink-0" fill="currentColor" /><span className="text-gray-300">{salon.googleRating.toFixed(1)} · {salon.googleReviewCount} Google reviews</span></div>
              </div>
            </div>
            <div className="card-surface p-6">
              <h2 className="font-display text-2xl font-semibold text-gray-50 mb-5">Find the Salon</h2>
              <p className="text-sm text-gray-400 mb-5">{salon.hoursSummary}</p>
              <a href={salon.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-gold px-5 py-3 text-sm inline-flex items-center gap-2"><ExternalLink size={16} /> Open Google Maps</a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
