import { motion } from 'framer-motion';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { salon } from '@/data/salon';
import { barbers } from '@/data/barbers';
import { Scissors, Award, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  useDocumentTitle('About');
  const navigate = useNavigate();

  const values = [
    { icon: Scissors, title: 'Craft', text: 'Every cut is executed with precision and intention. We treat barbering as an art form.' },
    { icon: Award, title: 'Quality', text: 'We use premium products and maintain the highest standards in every service.' },
    { icon: Users, title: 'Community', text: 'Our studio is a gathering place. We build relationships that go beyond the chair.' },
    { icon: Sparkles, title: 'Innovation', text: 'We blend traditional technique with modern tools, including 3D style previews.' },
  ];

  return (
    <PageTransition>
      <div className="lg:max-w-7xl lg:mx-auto lg:px-12 lg:pt-24 pb-10">
        {/* Hero */}
        <div className="relative overflow-hidden h-64 lg:h-96">
          <img
            src="https://images.pexels.com/photos/13058812/pexels-photo-13058812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Barber shop interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-medium text-gold-300">Est. {salon.founded}</span>
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-gray-50 mt-1">Our Story</h1>
            </motion.div>
          </div>
        </div>

        <div className="px-5 lg:px-0 py-8">
          {/* Story */}
          <div className="max-w-3xl mb-10">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              {salon.name} was founded with a simple belief: a great haircut is more than a service — it is a signature.
              We set out to create a space where modern craft meets timeless tradition, where every detail is intentional.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              From our studio in the Arts District, we have built a community of clients who expect more. More precision.
              More care. More personality. Our barbers are not just stylists — they are craftspeople who take pride in
              every fade, every beard sculpt, every line-up.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We introduced 3D hairstyle previews because we believe you should see your next look from every angle
              before you sit in the chair. It is part of our commitment to making great grooming accessible, transparent,
              and tailored to you.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {salon.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card-surface p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-gold-300">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Philosophy */}
          <h2 className="font-display text-2xl font-semibold text-gray-50 mb-5">Our Philosophy</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-10">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="card-surface p-5 flex gap-4"
                >
                  <span className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-50 mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-400">{v.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Team preview */}
          <h2 className="font-display text-2xl font-semibold text-gray-50 mb-5">The Team</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {barbers.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-surface overflow-hidden"
              >
                <img src={b.image} alt={b.name} loading="lazy" className="w-full aspect-[3/4] object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-50">{b.name}</h3>
                  <p className="text-xs text-gold-300">{b.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{b.specialization}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/book')} className="btn-gold px-6 py-3 text-sm">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
