import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { salon, whatsappLink } from '@/data/salon';

export default function Contact() {
  useDocumentTitle('Contact');

  const socials = [
    { icon: Instagram, url: salon.socials.instagram, label: 'Instagram' },
    { icon: Facebook, url: salon.socials.facebook, label: 'Facebook' },
    { icon: Twitter, url: salon.socials.twitter, label: 'Twitter' },
  ];

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Contact</h1>
        <p className="text-sm text-gray-500 mb-6">Get in touch or visit us</p>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Contact info */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-surface p-5 flex items-start gap-4"
            >
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0">
                <MapPin size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-gray-50 mb-1">Address</h3>
                <p className="text-sm text-gray-400">{salon.address}</p>
              </div>
            </motion.div>

            <motion.a
              href={`tel:${salon.phoneRaw}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0">
                <Phone size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-gray-50 mb-1">Phone</h3>
                <p className="text-sm text-gray-400">{salon.phone}</p>
              </div>
            </motion.a>

            <motion.a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0">
                <MessageCircle size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-gray-50 mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-400">Chat with us and book instantly</p>
              </div>
            </motion.a>

            <motion.a
              href={`mailto:${salon.email}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card-surface p-5 flex items-start gap-4 hover:border-gold-400/20 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0">
                <Mail size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-gray-50 mb-1">Email</h3>
                <p className="text-sm text-gray-400">{salon.email}</p>
              </div>
            </motion.a>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="w-12 h-12 rounded-xl bg-ink-700 border border-white/5 flex items-center justify-center text-gray-400 hover:text-gold-300 hover:border-gold-400/20 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Hours + Map */}
          <div className="space-y-4">
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-gold-400" />
                <h3 className="font-semibold text-gray-50">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {salon.hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-gray-300">{h.day}</span>
                    <span className={`font-medium ${h.time === 'Closed' ? 'text-gray-600' : 'text-gold-300'}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface overflow-hidden">
              <iframe
                title="Salon location"
                src={salon.mapEmbed}
                className="w-full h-56 lg:h-64 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
