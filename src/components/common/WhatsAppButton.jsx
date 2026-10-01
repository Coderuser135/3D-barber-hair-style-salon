import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/data/salon';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink('Hello AG Luxurious Unisex Salon & Academy, I would like to enquire about your services and appointment availability.')} 
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 lg:bottom-6 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </motion.a>
  );
}
