import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Calendar, Sparkles, Heart } from 'lucide-react';
import { salon } from '@/data/salon';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
      </div>

      <div className="relative px-5 pt-12 pb-10 lg:pt-24 lg:pb-16 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-3 py-1 rounded-full glass text-xs font-medium text-gold-300 mb-4">
            AG Luxurious Unisex Salon & Academy
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-gray-50 leading-tight text-balance text-shadow-lg">
            Salon Services.<br />Your Style.
          </h1>
          <p className="mt-4 text-base lg:text-lg text-gray-300 max-w-lg text-balance">
            {salon.description}
          </p>
          <p className="mt-3 text-sm text-gray-400 max-w-lg">
            Browse hairstyle references, choose a preferred style, and contact the salon for an appointment.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/hairstyles')}
              className="btn-gold px-6 py-3.5 text-sm flex items-center justify-center gap-2"
            >
              <Scissors size={18} />
              Explore Hairstyles
            </button>
            <button
              onClick={() => navigate('/book')}
              className="btn-outline px-6 py-3.5 text-sm flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
