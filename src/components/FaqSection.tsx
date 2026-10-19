import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, Truck, Flame, ShieldAlert, Sparkles, CreditCard, Clock } from 'lucide-react';
import { RestaurantConfig } from '../types/restaurant';

interface FaqSectionProps {
  config: RestaurantConfig;
  onOpenOrderTray: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config, onOpenOrderTray }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does WhatsApp ordering work at Naija Pot?',
      answer:
        'Browsing our menu allows you to click "Add to Tray" or "Order" on any dish. When you are ready, your selected items, spice notes, and order type are automatically compiled into a clean, pre-filled WhatsApp message. Once you click "Open WhatsApp & Send", the message is sent directly to our kitchen staff who confirm current availability, turnaround time, and payment details.',
    },
    {
      question: 'How do I pay for my order?',
      answer:
        'Because authentic Nigerian cooking involves fresh daily preparation, our kitchen team first confirms that all chosen items are in stock and ready. We then provide our verified instant bank transfer or mobile payment details via WhatsApp. Once payment is confirmed, your order goes straight into preparation.',
    },
    {
      question: 'Can I customize the spice and pepper levels of my dishes?',
      answer:
        'Yes! While traditional Nigerian cuisine is celebrated for its vibrant scotch bonnet (Atarodo) and pepper base, our chefs are happy to cater to your palate. You can specify Mild, Medium, or Authentic Naija Hot in the notes for soups, jollof rice, and grilled meats.',
    },
    {
      question: 'Do you offer takeaway collection and home delivery?',
      answer:
        'We offer both warm in-store takeaway collection and local home delivery. When building your order tray, select "Home Delivery" to view estimated delivery radius details or choose "Takeaway Collection" for scheduled pickup.',
    },
    {
      question: 'How far in advance should I order party coolers or large catering?',
      answer:
        'For full and half coolers of Party Jollof, fried rice, or 100+ piece small chops platters, we recommend giving at least 24 to 48 hours notice. For urgent same-day catering, please message us directly on WhatsApp to check kitchen capacity.',
    },
    {
      question: 'Is your meat Halal certified?',
      answer:
        'All of our beef, goat meat (Asun), chicken, and turkey are sourced from certified Halal-compliant suppliers. You can also filter our interactive menu specifically by Halal, Vegetarian, or Vegan dishes.',
    },
    {
      question: 'What allergens should I be aware of?',
      answer:
        'Traditional Nigerian soups often include ground melon seeds (Egusi), dried ground crayfish, and fermented locust beans (Iru). Certain small chops contain wheat flour. Please inform us of any severe allergies in your WhatsApp order message so our kitchen can take special precautions.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-[#141211] text-[#FFF7E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            <HelpCircle className="w-4 h-4 text-[#C65D3B]" />
            <span>Ordering Guide &amp; FAQs</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF7E8]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#FFF7E8]/75 leading-relaxed font-light">
            Everything you need to know about ordering, spice customization, delivery, and catering at NAIJA POT KITCHEN &amp; GRILL LTD.
          </p>
        </motion.div>

        {/* 3 Step Ordering Guide Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 sm:p-5 bg-[#181615] rounded-xl border border-[#292522] text-center space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#6D1F2B] text-[#FFF7E8] font-bold text-xs inline-flex items-center justify-center">
              1
            </span>
            <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Choose Your Dishes</h3>
            <p className="text-xs text-[#FFF7E8]/70">Explore our interactive menu and add your favorite dishes to the order tray.</p>
          </div>

          <div className="p-4 sm:p-5 bg-[#181615] rounded-xl border border-[#292522] text-center space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#C6A15B] text-[#141211] font-bold text-xs inline-flex items-center justify-center">
              2
            </span>
            <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Send via WhatsApp</h3>
            <p className="text-xs text-[#FFF7E8]/70">Review formatted order summary and click to send directly to our team.</p>
          </div>

          <div className="p-4 sm:p-5 bg-[#181615] rounded-xl border border-[#292522] text-center space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#292522] border border-[#C6A15B]/40 text-[#E5C578] font-bold text-xs inline-flex items-center justify-center">
              3
            </span>
            <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Enjoy Hot Naija Food</h3>
            <p className="text-xs text-[#FFF7E8]/70">Confirm and enjoy fresh, piping hot authentic Nigerian delicacies.</p>
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#292522] bg-[#181615] overflow-hidden transition-colors hover:border-[#C6A15B]/30"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#FFF7E8]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6A15B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#FFF7E8]/75 leading-relaxed font-light border-t border-[#292522] pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA */}
        <div className="mt-12 p-6 bg-[#181615] rounded-2xl border border-[#C6A15B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-display font-bold text-base text-[#FFF7E8]">Have Another Question?</h3>
            <p className="text-xs text-[#FFF7E8]/70 mt-0.5">Our kitchen team is available on WhatsApp to answer any inquiries.</p>
          </div>
          <button
            onClick={onOpenOrderTray}
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded-md flex items-center gap-2 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
