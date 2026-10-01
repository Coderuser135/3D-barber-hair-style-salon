import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Instagram, Star } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { salon } from '@/data/salon';

export default function Contact() {
  useDocumentTitle('Contact');

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Contact</h1>
        <p className="text-sm text-gray-500 mb-6">Visit or contact {salon.name}</p>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-5 flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0"><MapPin size={22} /></span>
              <div><h3 className="font-semibold text-gray-50 mb-1">Address</h3><p className="text-sm text-gray-400">{salon.address}</p></div>
            </motion.div>

            <motion.a href={`tel:${salon.phoneRaw}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors">
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0"><Phone size={22} /></span>
              <div><h3 className="font-semibold text-gray-50 mb-1">Phone</h3><p className="text-sm text-gray-400">{salon.phone}</p></div>
            </motion.a>

            <motion.a href={salon.mapsSearchUrl} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors">
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0"><ExternalLink size={22} /></span>
              <div><h3 className="font-semibold text-gray-50 mb-1">Directions</h3><p className="text-sm text-gray-400">Open the salon location in Google Maps</p></div>
            </motion.a>

            <motion.a href={salon.socials.instagram} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors">
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0"><Instagram size={22} /></span>
              <div><h3 className="font-semibold text-gray-50 mb-1">Instagram</h3><p className="text-sm text-gray-400">instagram.com</p></div>
            </motion.a>
          </div>

          <div className="space-y-4">
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-4"><Clock size={20} className="text-gold-400" /><h3 className="font-semibold text-gray-50">Business Hours</h3></div>
              <div className="rounded-2xl bg-ink-700 p-4">
                <p className="text-gold-300 font-semibold">{salon.hoursSummary}</p>
                <p className="text-xs text-gray-500 mt-1">Hours shown here are based on the supplied Google Business Profile screenshot.</p>
              </div>
            </div>
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-3"><Star size={20} className="text-gold-400" fill="currentColor" /><h3 className="font-semibold text-gray-50">Google Rating</h3></div>
              <div className="flex items-center gap-2"><span className="text-2xl font-bold text-gray-50">{salon.googleRating.toFixed(1)}</span><div className="flex text-gold-400">{Array.from({length:5}).map((_,i)=><Star key={i} size={16} fill="currentColor" />)}</div><span className="text-sm text-gray-400">({salon.googleReviewCount})</span></div>
            </div>
            <div className="card-surface overflow-hidden">
              <iframe title="Salon location" src={`https://www.google.com/maps?q=${encodeURIComponent(salon.address)}&output=embed`} className="w-full h-64 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
