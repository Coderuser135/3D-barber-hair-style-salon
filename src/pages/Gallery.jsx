import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import Lightbox from '@/components/common/Lightbox';
import { gallery, galleryCategories } from '@/data/gallery';
import CategoryChips from '@/components/hairstyle/CategoryChips';

export default function Gallery() {
  useDocumentTitle('Gallery');
  const [category, setCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () => (category === 'All' ? gallery : gallery.filter((g) => g.category === category)),
    [category]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Gallery</h1>
        <p className="text-sm text-gray-500 mb-5">Sample hairstyle and salon inspiration images. These are reference images, not claimed as salon-owned photos.</p>

        <div className="mb-5">
          <CategoryChips categories={galleryCategories} active={category} onSelect={setCategory} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2 left-2 text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </PageTransition>
  );
}
