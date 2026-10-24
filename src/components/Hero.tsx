import React from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';
import { heroFeast } from '../assets/images';
import { MessageCircle, Utensils, Flame, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenOrderTray: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenOrderTray }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#141211] pt-6 pb-16 lg:py-20 border-b border-[#292522]">
      {/* Subtle luxury ambient back-glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-96 h-96 bg-[#6D1F2B]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Brand & Verified Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6"
          >
            {/* Tagline kicker */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs md:text-sm font-semibold tracking-widest uppercase text-[#C6A15B]">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C65D3B]" />
                <span>NAIJA POT KITCHEN &amp; GRILL</span>
              </span>
              <span className="hidden xs:inline text-[#FFF7E8]/30">·</span>
              <span className="text-[#FFF7E8]/70 font-normal normal-case italic text-[11px] sm:text-xs">
                Good Food · Great People · A Taste of Naija
              </span>
            </div>

            {/* Verified Headline */}
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFF7E8] tracking-tight leading-[1.15] text-balance">
              Authentic Nigerian Flavours.{' '}
              <span
                className="block text-[#C6A15B]"
                style={{
                  background: 'linear-gradient(135deg, #FFF7E8 0%, #E5C578 45%, #C6A15B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Fresh From Our Kitchen.
              </span>
            </h1>

            {/* Verified Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#FFF7E8]/80 leading-relaxed max-w-2xl font-light">
              Discover the rich taste of Nigeria, prepared with passion and served with warmth.
              From wood-fired smoky party Jollof and succulent charcoal Suya skewers to hearty,
              slow-simmered Egusi soups with pillowy swallow.
            </p>

            {/* Verified Action CTAs (Stack on mobile, row on tablet/desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              {/* Primary CTA */}
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 min-h-[44px] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] rounded-lg shadow-lg shadow-[#C6A15B]/15 transition-all duration-200 active:scale-[0.98]"
              >
                <Utensils className="w-4 h-4 text-[#141211] shrink-0" />
                <span>Explore Our Menu</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onOpenOrderTray}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 min-h-[44px] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFF7E8] bg-[#6D1F2B] hover:bg-[#852535] border border-[#C6A15B]/40 rounded-lg shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#E5C578] shrink-0" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Subtle Brand Pillars (Responsive grid: 1 col on mobile, 3 cols on sm+) */}
            <div className="pt-4 sm:pt-6 border-t border-[#292522] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="p-2 sm:p-0">
                <p className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Slow Simmered</p>
                <p className="text-xs text-[#FFF7E8]/70 mt-0.5">Traditional cast-iron pots</p>
              </div>
              <div className="p-2 sm:p-0">
                <p className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Charcoal Grilled</p>
                <p className="text-xs text-[#FFF7E8]/70 mt-0.5">Authentic Yaji spice &amp; smoke</p>
              </div>
              <div className="p-2 sm:p-0">
                <p className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Naija Hospitality</p>
                <p className="text-xs text-[#FFF7E8]/70 mt-0.5">More Than a Meal — It's Home</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase & Brand Emblem Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-[#1C1917] group">
                {/* Culinary Hero Image */}
                <img
                  src={heroFeast}
                  alt="Authentic Nigerian feast at NAIJA POT KITCHEN & GRILL LTD with party jollof rice, grilled beef suya, plantains, and egusi soup"
                  className="w-full h-[260px] xs:h-[320px] sm:h-[420px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/30 to-transparent pointer-events-none" />

                {/* Floating Official Crest Emblem Badge */}
                <div className="absolute top-4 right-4 bg-[#141211]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#C6A15B]/40 shadow-xl hidden sm:block">
                  <BrandLogo variant="emblem" size="sm" showSubtitle={false} />
                </div>

                {/* Bottom Card Annotation */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#141211]/85 backdrop-blur-md p-4 rounded-xl border border-[#C6A15B]/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C6A15B]">
                        Chef's Feast Special
                      </p>
                      <p className="text-sm font-bold text-[#FFF7E8] font-display">
                        Smoky Party Jollof &amp; Suya Spread
                      </p>
                    </div>
                    <button
                      onClick={onExploreMenu}
                      className="px-3 py-1.5 text-xs font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded transition-colors"
                    >
                      View Items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
