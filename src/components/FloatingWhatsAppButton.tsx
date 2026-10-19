import React, { useState } from 'react';
import { Phone, X, MessageCircle, ChevronUp } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  whatsappNumber?: string;
  whatsappDisplayNumber?: string;
  telephone?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  whatsappNumber = '447342229865',
  whatsappDisplayNumber = '07342 229865',
  telephone = '+44 7444 614764',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Normalize WhatsApp number for wa.me URL
  const rawDigits = whatsappNumber.replace(/[^0-9]/g, '');
  const cleanNumber = rawDigits.startsWith('0') ? '44' + rawDigits.slice(1) : rawDigits;
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hello NAIJA POT KITCHEN & GRILL LTD, I would like to make an inquiry / place an order.'
  )}`;

  const cleanPhone = telephone.replace(/[^0-9+]/g, '');

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Quick Contact Card Popover */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-label="Direct restaurant lines"
          className="mb-3 w-72 sm:w-80 bg-[#181615] border border-[#25D366]/40 rounded-2xl shadow-2xl p-4 text-[#FFF7E8] animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#292522]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <div>
                <p className="text-xs font-bold text-[#FFF7E8]">NAIJA POT Kitchen</p>
                <p className="text-[10px] text-[#25D366] font-medium">Online • Order &amp; Enquiries</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#FFF7E8]/60 hover:text-[#FFF7E8] p-1 rounded-md transition-colors"
              aria-label="Close contact card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#FFF7E8]/70 my-2.5 leading-relaxed">
            Reach our chefs directly for food orders, table bookings, or party catering trays.
          </p>

          <div className="space-y-2">
            {/* Primary WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#22bf5b] text-white rounded-xl flex items-center justify-between text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp Kitchen</span>
              </div>
              <span className="font-mono text-[11px] bg-black/20 px-2 py-0.5 rounded text-white font-bold">
                {whatsappDisplayNumber}
              </span>
            </a>

            {/* Calling Number Action */}
            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-2.5 px-3 bg-[#201C1A] hover:bg-[#292522] border border-[#C6A15B]/40 text-[#E5C578] hover:text-[#FFF7E8] rounded-xl flex items-center justify-between text-xs font-bold transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Call Restaurant</span>
              </div>
              <span className="font-mono text-[11px] text-[#FFF7E8] font-bold">
                {telephone}
              </span>
            </a>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-[#FFF7E8]/50 text-center border-t border-[#292522]">
            International: +44 7342 229865
          </div>
        </div>
      )}

      {/* Floating Action Cluster */}
      <div className="flex items-center gap-2.5">
        {/* Toggle options mini-button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181615]/90 border border-[#25D366]/40 text-[#FFF7E8] text-xs font-semibold backdrop-blur-md shadow-lg hover:border-[#25D366] hover:bg-[#201C1A] transition-all"
          title="Click to view all contact lines"
          aria-expanded={isMenuOpen}
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat or Call</span>
          <ChevronUp className={`w-3.5 h-3.5 text-[#25D366] transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Main WhatsApp Green Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
          aria-label={`Chat on WhatsApp with NAIJA POT KITCHEN & GRILL LTD at ${whatsappDisplayNumber}`}
        >
          {/* Subtle Outer Ripple Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping duration-1000 -z-10" />

          {/* Official WhatsApp Logo SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white drop-shadow-sm transition-transform group-hover:rotate-6"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Online Indicator Green Dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#FFF7E8] border-2 border-[#25D366] rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          </span>
        </a>
      </div>
    </aside>
  );
};
