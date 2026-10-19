import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RestaurantConfig } from '../types/restaurant';
import { MessageCircle, Users, Utensils, Calendar, Sparkles, CheckCircle2, Flame, Award, HeartHandshake, Phone } from 'lucide-react';

interface CateringSectionProps {
  config: RestaurantConfig;
  onOpenOrderTray: () => void;
}

export const CateringSection: React.FC<CateringSectionProps> = ({ config, onOpenOrderTray }) => {
  // Interactive Catering Quote Builder
  const [eventType, setEventType] = useState('Birthday / Family Celebration');
  const [guestCount, setGuestCount] = useState('50');
  const [eventDate, setEventDate] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([
    'Smoky Party Jollof Cooler',
    'Small Chops Feasting Platter',
  ]);
  const [customNotes, setCustomNotes] = useState('');

  const cateringPackages = [
    {
      id: 'jollof-cooler',
      title: 'Full Party Jollof Cooler',
      serves: 'Serves 40 - 50 guests',
      price: `${config.currencySymbol}140.00`,
      tag: 'Most Popular',
      description: 'Iconic Nigerian party Jollof rice prepared in traditional cast-iron pots with smoky bottom flavor, garnished with sweet fried plantains (Dodo).',
      highlights: ['Authentic Firewood Aroma', 'Deep Pepper Reduction', 'Includes Dodo Garnish'],
    },
    {
      id: 'fried-rice-cooler',
      title: 'Party Fried Rice Cooler',
      serves: 'Serves 40 - 50 guests',
      price: `${config.currencySymbol}150.00`,
      tag: 'Crowd Favourite',
      description: 'Fragrant Nigerian party fried rice infused with liver, sweet corn, green peas, carrots, and secret kitchen seasonings.',
      highlights: ['Diced Seasoned Liver', 'Fresh Crisp Vegetables', 'Rich Aromatics'],
    },
    {
      id: 'small-chops-platter',
      title: 'Grand Small Chops Platter (100 pcs)',
      serves: 'Serves 25 - 30 guests',
      price: `${config.currencySymbol}95.00`,
      tag: 'Event Essential',
      description: 'Golden fluffy Puff-Puff, spiced beef Samosas, crispy spring rolls, and succulent peppered gizzard bites.',
      highlights: ['Hot Fluffy Puff-Puff', 'Spiced Beef Samosas', 'Peppered Gizzard Skewers'],
    },
    {
      id: 'suya-grill-station',
      title: 'Live Charcoal Suya Grill Spread',
      serves: 'Serves 30 - 40 guests',
      price: `${config.currencySymbol}180.00`,
      tag: 'Signature Grill',
      description: 'Sizzling beef Suya, grilled peppered chicken quarters, and spicy Asun goat meat tossed in habanero peppers and sweet onions.',
      highlights: ['Authentic Yaji Spices', 'Sliced Red Onions & Tomatoes', 'Charcoal Grilling'],
    },
    {
      id: 'swallow-soup-buffet',
      title: 'Royal Swallow & Soups Buffet',
      serves: 'Serves 20 - 25 guests',
      price: `${config.currencySymbol}165.00`,
      tag: 'Traditional Royal',
      description: 'Rich Egusi and Okro soup loaded with assorted meats, shaki, cow leg, and smoked fish, served with smooth Pounded Yam.',
      highlights: ['Assorted Meats & Smoked Fish', 'Egusi & Rich Soups', 'Wrapped Warm Swallow'],
    },
    {
      id: 'drinks-chapman',
      title: 'Traditional Drinks & Chapman Keg',
      serves: 'Serves 30 - 40 glasses',
      price: `${config.currencySymbol}60.00`,
      tag: 'Refreshing',
      description: 'Refreshing Nigerian Chapman mocktail keg with aromatic Angostura bitters, fresh cucumber, oranges, and iced Zobo hibscus tea.',
      highlights: ['Classic Lagos Chapman', 'Chilled Zobo Berry Punch', 'Garnish Bar Included'],
    },
  ];

  const togglePackage = (pkgTitle: string) => {
    setSelectedPackages((prev) =>
      prev.includes(pkgTitle) ? prev.filter((p) => p !== pkgTitle) : [...prev, pkgTitle]
    );
  };

  const handleSendCateringInquiry = () => {
    let msg = `🎉 *NAIJA POT CATERING & FEAST INQUIRY*\n`;
    msg += `--------------------------------\n`;
    msg += `📅 *Event Date:* ${eventDate || 'To Be Confirmed'}\n`;
    msg += `👥 *Estimated Guests:* ${guestCount} People\n`;
    msg += `🎈 *Occasion:* ${eventType}\n`;
    msg += `\n*SELECTED PACKAGES & COOLERS:*\n`;
    if (selectedPackages.length === 0) {
      msg += `• General Catering Consultation\n`;
    } else {
      selectedPackages.forEach((p, idx) => {
        msg += `${idx + 1}. ${p}\n`;
      });
    }
    if (customNotes.trim()) {
      msg += `\n📝 *Special Requirements / Venue:* ${customNotes.trim()}\n`;
    }
    msg += `\n--------------------------------\n`;
    msg += `_Sent via Naija Pot Website Catering Portal. Please reply with availability and formal invoice._`;

    const rawDigits = config.whatsappNumber.replace(/[^0-9]/g, '');
    const cleanNum = rawDigits.startsWith('0') ? '44' + rawDigits.slice(1) : rawDigits;
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catering" className="py-16 sm:py-20 lg:py-24 bg-[#141211] text-[#FFF7E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            <Flame className="w-4 h-4 text-[#C65D3B]" />
            <span>Party Feasts &amp; Event Catering</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E8]">
            Bring Authentic Naija Flavour to Your Event
          </h1>
          <p className="text-sm sm:text-base text-[#FFF7E8]/75 leading-relaxed font-light">
            From bubbling coolers of firewood-smoked Party Jollof to sizzling Suya grill spreads and small chops platters.
            We cater birthdays, weddings, church celebrations, corporate events, and family reunions.
          </p>
        </motion.div>

        {/* Catering Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="p-5 sm:p-6 bg-[#181615] rounded-xl border border-[#292522] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#6D1F2B] flex items-center justify-center text-[#E5C578] shrink-0">
              <Flame className="w-5 h-5 text-[#C65D3B]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#FFF7E8]">Full Cooler Catering</h3>
              <p className="text-xs text-[#FFF7E8]/70 mt-1 leading-relaxed">
                Large insulated thermal coolers delivering piping hot party jollof, fried rice, or spicy porridge directly to your event venue.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-[#181615] rounded-xl border border-[#292522] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#292522] flex items-center justify-center text-[#C6A15B] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#FFF7E8]">Uncompromising Quality</h3>
              <p className="text-xs text-[#FFF7E8]/70 mt-1 leading-relaxed">
                Cooked with 100% authentic Nigerian spices, rich aromatics, and generous tender meat cuts that guests will rave about.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-[#181615] rounded-xl border border-[#292522] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#141211] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#FFF7E8]">Dedicated Coordination</h3>
              <p className="text-xs text-[#FFF7E8]/70 mt-1 leading-relaxed">
                Direct WhatsApp planning with our culinary team for portion advice, customized spice levels, and on-time delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Catering Packages Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#292522]">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                Party Coolers &amp; Catering Packages
              </h2>
              <p className="text-xs text-[#C6A15B] mt-1">Select items below to include in your WhatsApp inquiry</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cateringPackages.map((pkg) => {
              const isSelected = selectedPackages.includes(pkg.title);
              return (
                <div
                  key={pkg.id}
                  onClick={() => togglePackage(pkg.title)}
                  className={`p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181615] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10 ring-1 ring-[#C6A15B]'
                      : 'bg-[#141211] border-[#292522] hover:border-[#C6A15B]/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#6D1F2B] text-[#FFF7E8]">
                        {pkg.tag}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#E5C578]">{pkg.price}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#FFF7E8]">{pkg.title}</h3>
                    <p className="text-xs text-[#C6A15B] font-medium">{pkg.serves}</p>
                    <p className="text-xs text-[#FFF7E8]/70 leading-relaxed font-light">{pkg.description}</p>

                    <ul className="space-y-1.5 pt-2">
                      {pkg.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-[#FFF7E8]/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#292522] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FFF7E8]/80">
                      {isSelected ? '✓ Selected for Quote' : '+ Click to Select'}
                    </span>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border text-xs ${
                        isSelected
                          ? 'bg-[#C6A15B] border-[#C6A15B] text-[#141211] font-bold'
                          : 'border-[#FFF7E8]/30'
                      }`}
                    >
                      {isSelected && '✓'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Catering Quote & WhatsApp Builder */}
        <div className="bg-[#181615] rounded-2xl border border-[#C6A15B]/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Instant WhatsApp Catering Quote</span>
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                Plan Your Feast in 60 Seconds
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF7E8]/75 leading-relaxed font-light">
                Configure your event parameters and we'll immediately generate a formatted WhatsApp quote request with your chosen coolers and dishes for prompt confirmation.
              </p>

              <div className="p-4 bg-[#141211] rounded-xl border border-[#292522] space-y-2 text-xs">
                <p className="font-bold text-[#C6A15B]">Selected Items ({selectedPackages.length}):</p>
                {selectedPackages.length === 0 ? (
                  <p className="text-[#FFF7E8]/50 italic">No packages selected yet. Click any card above.</p>
                ) : (
                  <ul className="space-y-1">
                    {selectedPackages.map((p, i) => (
                      <li key={i} className="text-[#FFF7E8]/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 bg-[#141211] p-5 sm:p-6 rounded-xl border border-[#292522]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1.5">
                    Estimated Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#181615] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                  >
                    <option value="20 - 35">20 – 35 Guests</option>
                    <option value="40 - 60">40 – 60 Guests</option>
                    <option value="70 - 100">70 – 100 Guests</option>
                    <option value="100 - 150">100 – 150 Guests</option>
                    <option value="200+">200+ Large Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1.5">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#181615] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1.5">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#181615] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                >
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Wedding / Engagement">Wedding / Engagement</option>
                  <option value="Family Reunion / Feasting">Family Reunion / Feasting</option>
                  <option value="Church / Community Gathering">Church / Community Gathering</option>
                  <option value="Corporate Office Lunch">Corporate Office Lunch</option>
                  <option value="Naming Ceremony">Naming Ceremony</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1.5">
                  Venue Location &amp; Special Requests
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Venue postcode, delivery time, dietary restrictions..."
                  className="w-full px-3 py-2 bg-[#181615] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none placeholder-[#FFF7E8]/30"
                />
              </div>

              <button
                onClick={handleSendCateringInquiry}
                className="w-full py-3.5 px-4 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Catering Inquiry via WhatsApp</span>
              </button>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#FFF7E8]/70 border-t border-[#292522]">
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: <strong className="text-[#FFF7E8] font-mono">{config.whatsappDisplayNumber || '07342 229865'}</strong></span>
                </div>
                <a
                  href={`tel:${config.telephone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 text-[#C6A15B] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>Catering Call Line: <strong className="text-[#FFF7E8] font-mono">{config.telephone}</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
