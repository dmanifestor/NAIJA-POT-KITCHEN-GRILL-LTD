import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MenuItem, MenuCategoryType } from '../types/restaurant';
import { MENU_CATEGORIES } from '../data/restaurantConfig';
import { MessageCircle, Search, Flame, Info, Check, Plus, AlertCircle } from 'lucide-react';

interface MenuSectionProps {
  menuItems: MenuItem[];
  currencySymbol: string;
  onAddToCart: (item: MenuItem) => void;
  onDirectWhatsAppOrder: (item: MenuItem) => void;
  showPlaceholderNotice: boolean;
}

// Staggered motion variants for smooth, lag-free entrance animations
const categoryContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const categoryItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const menuItemCardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  currencySymbol,
  onAddToCart,
  onDirectWhatsAppOrder,
  showPlaceholderNotice,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search query
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.localName && item.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filter
      const matchesDietary =
        selectedDietary === 'all' ||
        (item.dietary && item.dietary.some((d) => d.toLowerCase() === selectedDietary.toLowerCase()));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [menuItems, activeCategory, searchQuery, selectedDietary]);

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-24 bg-[#181615] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            <Flame className="w-4 h-4 text-[#C65D3B]" />
            <span>Interactive Dining Menu</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E8]">
            Crafted with Tradition, Fire &amp; Soul
          </h2>
          <p className="text-sm sm:text-base text-[#FFF7E8]/70 leading-relaxed font-light">
            Every dish is simmered with authentic Nigerian peppers, aromatic spices, and time-honoured techniques.
            Select your favourites to build your order and send directly via WhatsApp.
          </p>

          {/* Section 2.2 Client Placeholder Disclaimer Notice */}
          {showPlaceholderNotice && (
            <div className="mt-4 p-3.5 bg-[#292522]/90 border border-[#C6A15B]/30 rounded-lg text-left text-xs text-[#FFF7E8]/80 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#C6A15B]">Client Content Notice:</span> The menu items,
                sample prices ({currencySymbol}), and portion descriptions below represent authentic dishes curated for
                presentation. Final prices, availability, and specific dish rosters are editable in client configuration.
              </div>
            </div>
          )}
        </motion.div>

        {/* Search & Dietary Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8"
        >
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#C6A15B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jollof, suya, egusi, puff-puff..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-sm text-[#FFF7E8] rounded-lg placeholder-[#FFF7E8]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A15B] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#FFF7E8]/50 hover:text-[#FFF7E8]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs text-[#FFF7E8]/70 no-scrollbar">
            <span className="text-[11px] uppercase tracking-wider text-[#C6A15B] font-semibold mr-1 whitespace-nowrap">
              Dietary:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'halal', label: 'Halal' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedDietary === diet.id
                    ? 'bg-[#C6A15B] text-[#141211] font-bold'
                    : 'bg-[#141211] hover:bg-[#292522] text-[#FFF7E8]/80'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Staggered Fade-in-up Category Tabs */}
        <motion.div
          variants={categoryContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 border-b border-[#292522] -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                variants={categoryItemVariants}
                onClick={() => setActiveCategory(cat.id as MenuCategoryType)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-150 shrink-0 min-h-[40px] flex items-center ${
                  isActive
                    ? 'bg-[#6D1F2B] text-[#FFF7E8] shadow-md border border-[#C6A15B]/50'
                    : 'bg-[#141211] text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522] border border-transparent'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Menu Grid with Staggered Fade-in-up Animation (Lag-Free & GPU accelerated) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#141211] rounded-2xl border border-[#292522] px-4">
            <p className="text-lg font-serif text-[#FFF7E8]">No dishes found matching your criteria</p>
            <p className="text-xs text-[#FFF7E8]/60 mt-2">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedDietary('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#141211] bg-[#C6A15B] rounded hover:bg-[#E5C578] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            key={activeCategory + searchQuery + selectedDietary}
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                variants={menuItemCardVariants}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="bg-[#141211] rounded-xl overflow-hidden border border-[#292522] hover:border-[#C6A15B]/40 transition-colors duration-200 flex flex-col group shadow-md transform-gpu will-change-[transform,opacity]"
              >
                {/* Food Image Container */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-[#292522]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Clean unboxed metadata on image */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#FFF7E8] bg-[#141211]/85 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded max-w-[85%] truncate">
                    {item.isChefSpecial && (
                      <span className="text-[#E5C578] font-bold flex items-center gap-1 shrink-0">
                        <Flame className="w-3 h-3 text-[#C65D3B]" />
                        Chef's Special
                      </span>
                    )}
                    {item.isPopular && !item.isChefSpecial && (
                      <span className="text-[#C6A15B] shrink-0">Popular</span>
                    )}
                    {item.localName && (
                      <>
                        <span className="text-[#FFF7E8]/40">·</span>
                        <span className="italic font-serif text-[#FFF7E8]/90 truncate">{item.localName}</span>
                      </>
                    )}
                  </div>

                  {/* Price Tag in Gold */}
                  <div className="absolute bottom-2.5 right-2.5 bg-[#6D1F2B] text-[#FFF7E8] font-mono tabular-nums text-xs sm:text-sm font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded shadow-md border border-[#C6A15B]/30">
                    {currencySymbol}{item.price.toFixed(2)}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#FFF7E8] group-hover:text-[#E5C578] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#FFF7E8]/70 leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>

                    {/* Clean unboxed dietary & spice metadata with bullet separators */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-[#C6A15B]/90 pt-1">
                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <span>
                          {'🌶️'.repeat(item.spiceLevel)}{' '}
                          {item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Hot & Spicy'}
                        </span>
                      )}
                      {item.dietary && item.dietary.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.dietary.join(', ')}</span>
                        </>
                      )}
                      {item.portionInfo && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#FFF7E8]/50">{item.portionInfo}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions: Add to Order Tray + Direct WhatsApp */}
                  <div className="pt-3 border-t border-[#292522] flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2.5 sm:px-3 min-h-[40px] text-xs font-semibold rounded bg-[#292522] hover:bg-[#38332F] text-[#FFF7E8] border border-[#C6A15B]/30 transition-colors"
                      title="Add dish to your WhatsApp order summary"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Add to Tray</span>
                    </button>

                    <button
                      onClick={() => onDirectWhatsAppOrder(item)}
                      className="inline-flex items-center justify-center gap-1 py-2 sm:py-2.5 px-3 sm:px-3.5 min-h-[40px] text-xs font-bold rounded bg-[#6D1F2B] hover:bg-[#852535] text-[#FFF7E8] border border-[#C6A15B]/40 transition-colors whitespace-nowrap shrink-0"
                      title="Direct order this item on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#E5C578] shrink-0" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
