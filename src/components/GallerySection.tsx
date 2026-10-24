import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { GalleryItem } from '../types/restaurant';
import { GALLERY_ITEMS } from '../data/restaurantConfig';
import { LazyImage } from './LazyImage';
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const filterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const filterItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const galleryGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const galleryItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'grill' | 'dining' | 'preparation'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-[#141211] border-b border-[#292522] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-3"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            Culinary &amp; Dining Gallery
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF7E8]">
            A Visual Feast of Naija Excellence
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF7E8]/70 font-light">
            Glimpses into our sizzling charcoal grills, slow-cooked pots, and cozy restaurant spaces.
          </p>
        </motion.div>

        {/* Staggered Gallery Filter Tabs */}
        <motion.div
          variants={filterContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
        >
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'food', label: 'Authentic Dishes' },
            { id: 'grill', label: 'Charcoal Grills' },
            { id: 'dining', label: 'Restaurant Interior' },
            { id: 'preparation', label: 'Kitchen & Fire' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              variants={filterItemVariants}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[40px] flex items-center shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-[#C6A15B] text-[#141211] font-bold shadow-md'
                  : 'bg-[#181615] text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522] border border-[#292522]'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with Staggered Fade-in-up animations */}
        <motion.div
          key={activeFilter}
          variants={galleryGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={galleryItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              onClick={() => setActiveLightboxIndex(index)}
              className="relative group rounded-xl overflow-hidden bg-[#181615] border border-[#292522] hover:border-[#C6A15B]/40 cursor-pointer shadow-md aspect-[4/3] transition-colors transform-gpu will-change-[opacity,transform]"
            >
              <LazyImage
                src={item.image}
                alt={item.alt}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                rootMargin="250px 0px"
                fallbackIcon="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/90 via-[#141211]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 sm:p-5">
                <div className="flex items-center justify-between text-[#E5C578]">
                  <p className="text-xs uppercase font-bold tracking-wider">{item.title}</p>
                  <Eye className="w-4 h-4 shrink-0" />
                </div>
                <p className="text-[11px] text-[#FFF7E8]/80 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/50 border border-white/10 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/50 border border-white/10 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full flex flex-col items-center space-y-4"
            >
              <div className="max-h-[75vh] overflow-hidden rounded-xl border border-[#C6A15B]/30 shadow-2xl">
                <img
                  src={filteredItems[activeLightboxIndex].image}
                  alt={filteredItems[activeLightboxIndex].alt}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center max-w-xl">
                <h3 className="font-display font-bold text-lg text-[#FFF7E8]">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-[#FFF7E8]/70 mt-1">
                  {filteredItems[activeLightboxIndex].description}
                </p>
                <p className="text-[10px] text-[#C6A15B] mt-2 font-mono tabular-nums">
                  {activeLightboxIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
