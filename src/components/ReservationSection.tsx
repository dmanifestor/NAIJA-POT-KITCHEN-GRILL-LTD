import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { restaurantInterior } from '../assets/images';
import { RestaurantConfig } from '../types/restaurant';
import { Calendar, Clock, Users, MessageCircle, CheckCircle2, Sparkles, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface ReservationSectionProps {
  config: RestaurantConfig;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ config }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:30');
  const [partySize, setPartySize] = useState('2');
  const [seatingType, setSeatingType] = useState('Standard Dining Table');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('Casual Dining');
  const [notes, setNotes] = useState('');
  const [isBookedLocally, setIsBookedLocally] = useState(false);

  const timeSlots = [
    '12:30 PM',
    '1:30 PM',
    '2:30 PM',
    '3:30 PM',
    '5:30 PM',
    '6:30 PM',
    '7:30 PM',
    '8:30 PM',
    '9:15 PM',
  ];

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !date) {
      alert('Please fill in your name, contact phone, and desired reservation date.');
      return;
    }

    let msg = `🍽️ *TABLE RESERVATION REQUEST*\n`;
    msg += `*NAIJA POT KITCHEN & GRILL LTD*\n`;
    msg += `--------------------------------\n`;
    msg += `👤 *Name:* ${fullName.trim()}\n`;
    msg += `📞 *Phone:* ${phone.trim()}\n`;
    msg += `📅 *Date:* ${date}\n`;
    msg += `⏰ *Time Slot:* ${time}\n`;
    msg += `👥 *Party Size:* ${partySize} Guest(s)\n`;
    msg += `🪑 *Seating Preference:* ${seatingType}\n`;
    msg += `🎉 *Occasion:* ${specialOccasion}\n`;
    if (notes.trim()) {
      msg += `📝 *Notes/Dietary:* ${notes.trim()}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `_Sent from Naija Pot Website Reservation Portal._`;

    const rawDigits = config.whatsappNumber.replace(/[^0-9]/g, '');
    const cleanNum = rawDigits.startsWith('0') ? '44' + rawDigits.slice(1) : rawDigits;
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsBookedLocally(true);
  };

  return (
    <section id="reservation" className="py-16 sm:py-20 lg:py-24 bg-[#141211] text-[#FFF7E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            <Calendar className="w-4 h-4 text-[#C65D3B]" />
            <span>Table Reservations</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E8]">
            Reserve Your Table for a Naija Feast
          </h1>
          <p className="text-sm sm:text-base text-[#FFF7E8]/75 leading-relaxed font-light">
            Whether an intimate dinner for two, a weekend family gathering, or a celebratory feast with friends.
            Secure your table and let us treat you to warm Nigerian hospitality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Dining Experience Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-xl bg-[#1C1917]">
              <img
                src={restaurantInterior}
                alt="NAIJA POT Dining Ambiance"
                className="w-full h-64 sm:h-72 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#141211]/90 backdrop-blur-md rounded-xl border border-[#C6A15B]/25">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C6A15B]">Atmosphere</p>
                <p className="text-xs text-[#FFF7E8]">Warm gold ambient lights, comfortable booth seating, and soothing Afro-fusion melodies.</p>
              </div>
            </div>

            <div className="p-5 bg-[#181615] rounded-xl border border-[#292522] space-y-3">
              <h3 className="font-display font-bold text-sm text-[#FFF7E8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span>Reservation Policies</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#FFF7E8]/70">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Tables are held for 15 minutes past the scheduled booking time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>For parties of 8 or more, please submit your request at least 24 hours in advance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>Special dietary requests or custom spice preferences can be added in the notes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7 bg-[#181615] rounded-2xl border border-[#C6A15B]/30 p-6 sm:p-8 shadow-xl">
            {isBookedLocally ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#6D1F2B] text-[#E5C578] flex items-center justify-center mx-auto border border-[#C6A15B]/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#FFF7E8]">Reservation Submitted!</h3>
                <p className="text-xs sm:text-sm text-[#FFF7E8]/80 max-w-md mx-auto">
                  Thank you, <strong className="text-[#C6A15B]">{fullName}</strong>! Your table reservation details for {date} at {time} have been prepared. If you opened WhatsApp, our host will reply with a confirmation.
                </p>
                <button
                  onClick={() => setIsBookedLocally(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded transition-colors"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amara Okafor"
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none placeholder-[#FFF7E8]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7000 000000"
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none placeholder-[#FFF7E8]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, '15+ Large Group'].map((num) => (
                        <option key={num} value={num}>
                          {num} {typeof num === 'number' && num > 1 ? 'Guests' : typeof num === 'number' ? 'Guest' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>
                          {ts}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Seating Preference
                    </label>
                    <select
                      value={seatingType}
                      onChange={(e) => setSeatingType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                    >
                      <option value="Standard Dining Table">Standard Dining Table</option>
                      <option value="Cozy Charcoal Booth">Cozy Charcoal Booth</option>
                      <option value="Center Feasting Table">Center Feasting Table</option>
                      <option value="Private Celebration Area">Private Celebration Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                      Occasion
                    </label>
                    <select
                      value={specialOccasion}
                      onChange={(e) => setSpecialOccasion(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none"
                    >
                      <option value="Casual Dining">Casual Dining</option>
                      <option value="Birthday Dinner">Birthday Dinner</option>
                      <option value="Anniversary / Date Night">Anniversary / Date Night</option>
                      <option value="Family Sunday Gathering">Family Sunday Gathering</option>
                      <option value="Business Meal">Business Meal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF7E8]/80 mb-1">
                    Special Notes or Dietary Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Mild pepper for kids, birthday cake presentation, allergy info..."
                    className="w-full px-3.5 py-2.5 bg-[#141211] border border-[#292522] focus:border-[#C6A15B] text-xs text-[#FFF7E8] rounded-lg focus:outline-none placeholder-[#FFF7E8]/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirm Reservation on WhatsApp</span>
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
                    <span>Call to Reserve: <strong className="text-[#FFF7E8] font-mono">{config.telephone}</strong></span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
