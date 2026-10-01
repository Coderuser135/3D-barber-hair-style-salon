import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 lg:left-6 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 lg:right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1.5">
          <span className="text-sm text-gray-300 font-medium">
            {index + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
