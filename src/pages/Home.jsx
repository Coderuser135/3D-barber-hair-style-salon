import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import Hero from '@/components/home/Hero';
import QuickActions from '@/components/home/QuickActions';
import SectionHeader from '@/components/common/SectionHeader';
import HairstyleCard from '@/components/hairstyle/HairstyleCard';
import { Star, MapPin, Clock, ArrowRight, Scissors, ExternalLink } from 'lucide-react';
import { getFeaturedHairstyles } from '@/data/hairstyles';
import { services } from '@/data/services';
import { salon } from '@/data/salon';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import { transformations } from '@/data/transformations';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  useDocumentTitle(null);
  const navigate = useNavigate();
  const featured = getFeaturedHairstyles();

  return (
    <PageTransition>
      <Hero />
      <QuickActions />

      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Featured Hairstyles" subtitle="Explore hairstyle references and choose your next look" to="/hairstyles" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {featured.map((h, i) => <HairstyleCard key={h.id} hairstyle={h} index={i} />)}
        </div>
      </section>

      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Services" subtitle="Enquire about current services and pricing" to="/services" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {services.slice(0, 4).map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card-surface p-4 flex items-center justify-between gap-4">
              <div><h3 className="font-semibold text-gray-50">{s.name}</h3><p className="text-sm text-gray-400 line-clamp-2 mt-0.5">{s.description}</p><p className="text-xs text-gray-600 mt-2">Price: contact salon</p></div>
              <button onClick={() => { navigate('/book'); }} className="btn-gold px-4 py-2.5 text-xs whitespace-nowrap">Enquire</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Before & After" subtitle="Hairstyle inspiration" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {transformations.map((t, i) => <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><BeforeAfterSlider before={t.before} after={t.after} /><div className="mt-3"><h3 className="font-semibold text-gray-50">{t.style}</h3><p className="text-sm text-gray-400">{t.description}</p></div></motion.div>)}
        </div>
      </section>

      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Google Business Profile" subtitle="Public listing details supplied for this website" />
        <div className="card-surface p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">{salon.category}</p>
              <h2 className="font-display text-2xl font-semibold text-gray-50 mt-1">{salon.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{salon.hindiName}</p>
              <div className="flex items-center gap-2 mt-3"><span className="text-gold-300 font-semibold">{salon.googleRating.toFixed(1)}</span><div className="flex text-gold-400">{Array.from({length:5}).map((_,i)=><Star key={i} size={16} fill="currentColor" />)}</div><span className="text-sm text-gray-400">({salon.googleReviewCount} reviews)</span></div>
            </div>
            <a href={salon.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-3 text-sm inline-flex items-center justify-center gap-2"><ExternalLink size={16} /> View on Google Maps</a>
          </div>
        </div>
      </section>

      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6 pb-10">
        <SectionHeader title="Visit the Salon" to="/contact" toLabel="Contact details" />
        <div className="card-surface p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{salon.stats.map((s) => <div key={s.label} className="text-center"><p className="font-display text-2xl lg:text-3xl font-bold text-gold-300">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>)}</div>
          <div className="space-y-3 text-sm"><div className="flex items-start gap-3 text-gray-300"><MapPin size={18} className="text-gold-400 flex-shrink-0" />{salon.address}</div><div className="flex items-center gap-3 text-gray-300"><Clock size={18} className="text-gold-400 flex-shrink-0" />{salon.hoursSummary}</div></div>
          <div className="mt-5 flex gap-3"><a href={salon.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-2.5 text-sm flex-1 text-center">Directions</a><a href={`tel:${salon.phoneRaw}`} className="btn-gold px-5 py-2.5 text-sm flex-1 text-center">Call</a></div>
        </div>
      </section>
    </PageTransition>
  );
}
