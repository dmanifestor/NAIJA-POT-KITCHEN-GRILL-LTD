import React, { useState } from 'react';
import { RestaurantConfig } from '../types/restaurant';
import { Clock, MapPin, Phone, Mail, MessageCircle, AlertCircle, CheckCircle, Send, Calendar } from 'lucide-react';

interface ContactSectionProps {
  config: RestaurantConfig;
  onOpenOrderTray: () => void;
  onOpenClientHub: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  onOpenOrderTray,
  onOpenClientHub,
}) => {
  // Inquiry / Reservation form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Table Reservation',
    date: '',
    guests: '2',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      setFormError('Please provide your name and contact phone number.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#181615] border-b border-[#292522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
            Hospitality &amp; Inquiries
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF7E8]">
            Visit Us or Connect Directly
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF7E8]/70 font-light">
            We look forward to hosting you for dining, takeaways, celebrations, and Nigerian catering feasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Hours, Location, Contact Info */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Opening Hours Card */}
            <div className="p-4 sm:p-6 bg-[#141211] rounded-xl border border-[#292522]">
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#292522]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C6A15B]" />
                  <h3 className="font-display font-bold text-base text-[#FFF7E8]">Opening Hours</h3>
                </div>
                <span className="text-[10px] font-semibold text-[#FFF7E8]/50 uppercase tracking-wider">
                  Kitchen Schedule
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-xs">
                {config.openingHours.map((oh) => (
                  <div key={oh.day} className="flex items-center justify-between py-1 border-b border-[#292522]/50">
                    <span className="font-medium text-[#FFF7E8]/80">{oh.day}</span>
                    <span className="font-mono tabular-nums text-[#C6A15B] font-semibold">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Verification Notice */}
            <div className="p-4 sm:p-6 bg-[#141211] rounded-xl border border-[#292522] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C65D3B]" />
                  <h3 className="font-display font-bold text-base text-[#FFF7E8]">Location &amp; Address</h3>
                </div>
                {!config.isAddressVerified && (
                  <span className="text-[10px] bg-[#6D1F2B] text-[#FFF7E8] px-2 py-0.5 rounded font-medium">
                    Pending Client Input
                  </span>
                )}
              </div>

              <div className="text-xs text-[#FFF7E8]/80 space-y-1">
                <p className="font-semibold text-[#FFF7E8]">{config.businessName}</p>
                <p className="text-[#C6A15B]">{config.addressLine1}</p>
                <p>{config.addressLine2}</p>
                <p>{config.city}, {config.postcode}</p>
                <p>{config.country}</p>
              </div>

              {/* Requirement Section 4.5: Display a map ONLY after the address has been verified */}
              {config.isAddressVerified ? (
                <div className="rounded-lg overflow-hidden border border-[#292522] h-40 bg-[#1C1917] flex items-center justify-center text-xs text-[#FFF7E8]/60">
                  <iframe
                    title="Restaurant Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(config.addressLine1 + ' ' + config.city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              ) : (
                <div className="p-3 bg-[#1C1917] rounded-lg border border-dashed border-[#C6A15B]/30 text-xs text-[#FFF7E8]/70 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-[#FFF7E8]">Interactive Map Pending Address Verification</p>
                    <p className="text-[11px] text-[#FFF7E8]/60 mt-0.5">
                      Per Section 4.5 specification, the live embedded map is rendered once the client provides the confirmed address.
                    </p>
                    <button
                      onClick={onOpenClientHub}
                      className="text-[11px] font-bold text-[#C6A15B] underline hover:text-[#E5C578] mt-1.5 inline-block"
                    >
                      Update address in Client Hub &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Channels */}
              <div className="pt-3 border-t border-[#292522] space-y-3 text-xs">
                <a
                  href={`https://wa.me/${config.whatsappNumber.startsWith('0') ? '44' + config.whatsappNumber.slice(1) : config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#181615] border border-[#25D366]/30 hover:border-[#25D366] text-[#FFF7E8] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-[#141211] transition-colors">
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-[#25D366]">WhatsApp Direct</span>
                      <strong className="font-mono text-xs text-[#FFF7E8]">
                        {config.whatsappDisplayNumber || '07342 229865'}
                      </strong>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#25D366] group-hover:underline">Chat &rarr;</span>
                </a>

                <a
                  href={`tel:${config.telephone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#181615] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#FFF7E8] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B] shrink-0 group-hover:bg-[#C6A15B] group-hover:text-[#141211] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B]">Contact Phone</span>
                      <strong className="font-mono text-xs text-[#FFF7E8]">
                        {config.telephone}
                      </strong>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C6A15B] group-hover:underline">Call &rarr;</span>
                </a>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 text-[#FFF7E8]/80">
                  <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>Email: </span>
                  <a href={`mailto:${config.email}`} className="text-[#FFF7E8] hover:text-[#C6A15B] underline">
                    {config.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reservation / Catering Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-8 bg-[#141211] rounded-xl border border-[#292522] shadow-xl">
              <div className="mb-4 sm:mb-6">
                <h3 className="font-display font-bold text-xl text-[#FFF7E8]">
                  Table Reservation &amp; Event Catering
                </h3>
                <p className="text-xs text-[#FFF7E8]/70 mt-1">
                  Book a table, inquire about large family gatherings, or request a custom event catering quote.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-3 bg-[#181615] rounded-xl border border-[#C6A15B]/30 p-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#6D1F2B] flex items-center justify-center text-[#E5C578]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#FFF7E8]">Inquiry Received</h4>
                  <p className="text-xs text-[#FFF7E8]/80 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#C6A15B]">{formState.name}</strong>! Your inquiry for{' '}
                    <strong className="text-[#FFF7E8]">{formState.inquiryType}</strong> has been logged. For immediate
                    assistance or last-minute table confirmation, please connect via WhatsApp.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#FFF7E8]/70 bg-[#292522] rounded hover:text-white"
                    >
                      Send Another Inquiry
                    </button>
                    <button
                      onClick={onOpenOrderTray}
                      className="px-4 py-2 text-xs font-bold text-[#141211] bg-[#C6A15B] rounded hover:bg-[#E5C578] flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-[#6D1F2B]/30 border border-[#6D1F2B] text-xs text-[#FFF7E8] rounded-md">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                        Full Name <span className="text-[#C65D3B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Samuel Adeleke"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none placeholder-[#FFF7E8]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                        Phone Number <span className="text-[#C65D3B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="e.g. +44 7123 456789"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none placeholder-[#FFF7E8]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                        Inquiry Type
                      </label>
                      <select
                        value={formState.inquiryType}
                        onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none"
                      >
                        <option value="Table Reservation">Table Reservation</option>
                        <option value="Event Catering">Event Catering</option>
                        <option value="Takeaway Pickup">Takeaway Pickup</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formState.date}
                        onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                        Guests / Portions
                      </label>
                      <select
                        value={formState.guests}
                        onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none"
                      >
                        <option value="1-2">1 - 2 Guests</option>
                        <option value="3-4">3 - 4 Guests</option>
                        <option value="5-8">5 - 8 Guests</option>
                        <option value="10+">10+ Guests (Large Party)</option>
                        <option value="Catering">Event Catering (20+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                      Message / Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about special dietary needs, occasion (birthday, anniversary), or catering specifics..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[#181615] border border-[#292522] rounded-lg text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none placeholder-[#FFF7E8]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Hospitality Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
