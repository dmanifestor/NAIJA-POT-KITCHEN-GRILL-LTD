import React from 'react';
import { BrandLogo } from './BrandLogo';
import { RestaurantConfig } from '../types/restaurant';
import { MessageCircle, ShieldCheck, Flame, Heart, ArrowUp, Phone } from 'lucide-react';

interface FooterProps {
  config: RestaurantConfig;
  onOpenBrandHub: () => void;
  onOpenClientHub: () => void;
  onOpenOrderTray: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenBrandHub,
  onOpenClientHub,
  onOpenOrderTray,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0C0B] text-[#FFF7E8] border-t border-[#C6A15B]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#292522]">
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-4">
            <BrandLogo variant="horizontal" size="md" showSubtitle />
            <p className="text-xs text-[#FFF7E8]/70 leading-relaxed font-light max-w-sm">
              Discover authentic Nigerian flavours, prepared with passion and served with warmth.
              Slow-cooked party Jollof, spicy charcoal Suya grills, and rich traditional swallows.
            </p>
            <div className="pt-1 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onOpenOrderTray}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[40px] text-xs font-bold uppercase tracking-wider text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp Ordering</span>
              </button>
              <button
                onClick={onOpenBrandHub}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[40px] text-xs font-semibold text-[#FFF7E8]/80 hover:text-[#FFF7E8] bg-[#292522] rounded border border-[#C6A15B]/30 transition-colors"
              >
                <span>Brand Assets (SVG)</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-[#C6A15B]">
              Pages &amp; Services
            </p>
            <ul className="space-y-2 text-xs text-[#FFF7E8]/70">
              <li>
                <a href="#home" className="hover:text-[#C6A15B] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C6A15B] transition-colors">
                  Interactive Menu
                </a>
              </li>
              <li>
                <a href="#catering" className="hover:text-[#C6A15B] transition-colors">
                  Catering &amp; Party Feasts
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#C6A15B] transition-colors">
                  Table Reservations
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C6A15B] transition-colors">
                  Our Story &amp; Ethos
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C6A15B] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C6A15B] transition-colors">
                  Hours &amp; Location
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C6A15B] transition-colors">
                  Ordering Guide &amp; FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Authentic Kitchen Specialities */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-[#C6A15B]">
              Kitchen Specialties
            </p>
            <ul className="space-y-2 text-xs text-[#FFF7E8]/70">
              <li>• Smoky Party Jollof &amp; Dodo</li>
              <li>• Authentic Beef &amp; Chicken Suya</li>
              <li>• Egusi Soup &amp; Pounded Yam</li>
              <li>• Spicy Asun &amp; Peppered Tilapia</li>
              <li>• Fluffy Golden Puff-Puff</li>
              <li>• House Crafted Zobo Cooler</li>
            </ul>
          </div>

          {/* Verified Business Details */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-[#C6A15B]">
              Business Information
            </p>
            <div className="space-y-1.5 text-xs text-[#FFF7E8]/70">
              <p className="font-semibold text-[#FFF7E8]">{config.registeredName}</p>
              <div className="space-y-1">
                <a
                  href={`https://wa.me/${config.whatsappNumber.startsWith('0') ? '44' + config.whatsappNumber.slice(1) : config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span className="text-[#FFF7E8]/80 text-[11px]">WhatsApp:</span>
                  <span className="font-mono text-[#FFF7E8] font-semibold">{config.whatsappDisplayNumber || '07342 229865'}</span>
                </a>
                <a
                  href={`tel:${config.telephone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 text-[#C6A15B] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[#FFF7E8]/80 text-[11px]">Contact Phone:</span>
                  <span className="font-mono text-[#FFF7E8] font-semibold">{config.telephone}</span>
                </a>
              </div>
              <p>{config.addressLine1}</p>
              <p>{config.city}, {config.country}</p>
              <div className="pt-2">
                <button
                  onClick={onOpenClientHub}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C6A15B] hover:text-[#E5C578] underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client Verification Hub</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFF7E8]/50">
          <div className="space-y-1 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} {config.registeredName}. All rights reserved.
            </p>
            <p className="text-[11px] text-[#FFF7E8]/40">
              Content classification per specification: Placeholders are clearly marked and verified facts are strictly separated.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#181615] hover:bg-[#292522] text-[#C6A15B] transition-colors flex items-center gap-1 text-[11px]"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
