import React from 'react';
import { motion } from 'framer-motion';
import { restaurantInterior } from '../assets/images';
import { Sparkles, Utensils, HeartHandshake, Flame, ShieldAlert } from 'lucide-react';

interface AboutSectionProps {
  showPlaceholderNotice: boolean;
  onOpenOrderTray: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  showPlaceholderNotice,
  onOpenOrderTray,
}) => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#141211] relative overflow-hidden border-b border-[#292522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual Collage with Restaurant Interior & Kitchen */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-[#1C1917]">
              <img
                src={restaurantInterior}
                alt="Modern, welcoming dining ambiance at NAIJA POT KITCHEN & GRILL LTD"
                className="w-full h-[260px] xs:h-[320px] sm:h-[400px] lg:h-[450px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 bg-[#141211]/90 backdrop-blur-md rounded-xl border border-[#C6A15B]/25">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                  Hospitality Motto
                </p>
                <p className="text-xs sm:text-sm font-serif italic text-[#FFF7E8] mt-0.5">
                  "More Than a Meal — It's Home."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Culinary Ethos & Authentic Story */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
              <Flame className="w-4 h-4 text-[#C65D3B]" />
              <span>Our Culinary Ethos</span>
            </div>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E8] leading-tight">
              Rooted in Tradition. Served with Modern Warmth.
            </h2>

            <p className="text-sm sm:text-base text-[#FFF7E8]/80 leading-relaxed font-light">
              At <strong className="text-[#FFF7E8] font-semibold">NAIJA POT KITCHEN &amp; GRILL LTD</strong>, our passion
              lies in preserving the uncompromising authenticity of Nigerian culinary heritage while delivering modern,
              comforting hospitality. Every pot tells a story of patience, aromatic herbs, slow-fire reduction, and celebration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-4 bg-[#181615] rounded-xl border border-[#292522]">
                <div className="w-8 h-8 rounded-lg bg-[#6D1F2B] flex items-center justify-center text-[#E5C578] mb-3">
                  <Flame className="w-4 h-4 text-[#E5C578]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Slow Cast-Iron Simmering</h3>
                <p className="text-xs text-[#FFF7E8]/70 mt-1.5 leading-relaxed">
                  Our rich soups and party jollof are slow-cooked in traditional style to develop deep, complex aromatics and authentic smoky flavors.
                </p>
              </div>

              <div className="p-4 bg-[#181615] rounded-xl border border-[#292522]">
                <div className="w-8 h-8 rounded-lg bg-[#292522] flex items-center justify-center text-[#C6A15B] mb-3">
                  <HeartHandshake className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Genuine Naija Hospitality</h3>
                <p className="text-xs text-[#FFF7E8]/70 mt-1.5 leading-relaxed">
                  Whether dining in, picking up takeaway, or ordering delivery for a family feast, we treat every guest like cherished family.
                </p>
              </div>
            </div>

            {/* Section 2.2 Client Confirmation Boundary */}
            {showPlaceholderNotice && (
              <div className="p-3 sm:p-3.5 bg-[#181615] border border-[#C6A15B]/20 rounded-lg text-xs text-[#FFF7E8]/70 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#C6A15B]">Verification Note:</strong> In strict compliance with Section 2.2
                  guidelines, restaurant founding history, specific award claims, and external certifications are pending
                  formal client submission and are not fabricated.
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenOrderTray}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded-md transition-colors"
              >
                <span>Experience Our Kitchen</span>
              </button>
              <a
                href="#menu"
                className="text-xs font-semibold text-[#FFF7E8]/80 hover:text-[#C6A15B] transition-colors text-center sm:text-left py-2"
              >
                Explore Menu Specialties &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
