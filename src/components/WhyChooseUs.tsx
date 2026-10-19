import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldCheck, Heart, Sparkles, Clock, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Charcoal & Woodfire Smoked',
      description: 'Authentic Nigerian party Jollof smoky bottom pot flavour and sizzling Suya grilled over live coals.',
    },
    {
      icon: Sparkles,
      title: 'Heritage Spices & Aromatics',
      description: 'Carefully sourced African peppers, Cameroonian peppers, locust beans (Iru), and aromatic herbs.',
    },
    {
      icon: Heart,
      title: 'Generous Feasting Portions',
      description: 'Hearty portions made for satisfying cravings, sharing with loved ones, and weekend celebrations.',
    },
    {
      icon: Truck,
      title: 'Seamless WhatsApp Ordering',
      description: 'Quick click-to-chat order submission directly to our kitchen team with custom spice adjustments.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#181615] border-b border-[#292522] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            Why Naija Pot Kitchen &amp; Grill
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF7E8]">
            The Taste You Know. The Quality You Deserve.
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF7E8]/70 font-light">
            Crafting memorable West African dining through culinary integrity and genuine hospitality.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="p-5 sm:p-6 bg-[#141211] rounded-xl border border-[#292522] hover:border-[#C6A15B]/40 transition-colors flex flex-col justify-between shadow-sm transform-gpu will-change-[transform,opacity]"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#292522] flex items-center justify-center text-[#E5C578] mb-3 sm:mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#FFF7E8]">{p.title}</h3>
                  <p className="text-xs text-[#FFF7E8]/70 mt-1.5 sm:mt-2 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
