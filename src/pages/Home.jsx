import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import Hero from '@/components/home/Hero';
import QuickActions from '@/components/home/QuickActions';
import SectionHeader from '@/components/common/SectionHeader';
import HairstyleCard from '@/components/hairstyle/HairstyleCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ArrowRight, Scissors } from 'lucide-react';
import { getFeaturedHairstyles } from '@/data/hairstyles';
import { services } from '@/data/services';
import { barbers } from '@/data/barbers';
import { reviews } from '@/data/reviews';
import { salon } from '@/data/salon';
import { transformations } from '@/data/transformations';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';

export default function Home() {
  useDocumentTitle(null);
  const navigate = useNavigate();
  const featured = getFeaturedHairstyles();
  const popularServices = services.slice(0, 4);

  return (
    <PageTransition>
      <Hero />
      <QuickActions />

      {/* Featured Hairstyles */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Featured Hairstyles" subtitle="Explore in 3D and find your next look" to="/hairstyles" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {featured.map((h, i) => (
            <HairstyleCard key={h.id} hairstyle={h} index={i} />
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Popular Services" subtitle="Quick, premium, and tailored to you" to="/services" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {popularServices.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card-surface p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-50">{s.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-1 mt-0.5">{s.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{s.duration}</span>
                  <span className="text-gold-300 font-semibold text-base">${s.price}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/book')}
                className="btn-gold px-4 py-2.5 text-xs whitespace-nowrap"
              >
                Book
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Find Your Style CTA */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-ink-800 to-ink-900 border border-gold-400/20 p-8 lg:p-12 text-center"
        >
          <Scissors className="mx-auto text-gold-400 mb-3" size={32} />
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-gray-50 mb-2">
            Find Your Style
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-5">
            Browse our full catalogue, filter by hair type and fade, and inspect every cut in 3D before you book.
          </p>
          <button
            onClick={() => navigate('/hairstyles')}
            className="btn-gold px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            Browse All Hairstyles
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      {/* Featured Barbers */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Our Barbers" subtitle="Meet the team behind the craft" to="/barbers" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {barbers.map((b, i) => (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate('/barbers')}
              className="flex-shrink-0 w-36 text-left"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                <img src={b.image} alt={b.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-sm text-gray-50">{b.name}</h3>
              <p className="text-xs text-gray-500">{b.specialization}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Before & After" subtitle="Demo transformations — drag to reveal" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {transformations.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <BeforeAfterSlider before={t.before} after={t.after} />
              <div className="mt-3">
                <h3 className="font-semibold text-gray-50">{t.style}</h3>
                <p className="text-sm text-gray-400">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6">
        <SectionHeader title="Reviews" subtitle="What our clients say" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-72 card-surface p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-50">{r.name}</h4>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < r.rating ? 'text-gold-400' : 'text-gray-600'}
                        fill={idx < r.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">{r.review}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Salon Information */}
      <section className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto py-6 pb-10">
        <SectionHeader title="Salon Information" to="/contact" toLabel="View details" />
        <div className="card-surface p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {salon.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl lg:text-3xl font-bold text-gold-300">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin size={18} className="text-gold-400 flex-shrink-0" />
              {salon.address}
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Clock size={18} className="text-gold-400 flex-shrink-0" />
              Mon–Fri: {salon.hours[0].time} · Sat: {salon.hours[5].time}
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <a href={`tel:${salon.phoneRaw}`} className="btn-outline px-5 py-2.5 text-sm flex-1 text-center">
              Call Us
            </a>
            <button onClick={() => navigate('/book')} className="btn-gold px-5 py-2.5 text-sm flex-1">
              Book Now
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
