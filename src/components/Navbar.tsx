import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Menu as MenuIcon, X, ShoppingBag, ShieldCheck, Sparkles, Calendar, Utensils, HelpCircle, Phone } from 'lucide-react';

interface NavbarProps {
  orderCount: number;
  activePage: string;
  whatsappDisplayNumber?: string;
  whatsappNumber?: string;
  telephone?: string;
  onOpenOrderTray: () => void;
  onOpenBrandHub: () => void;
  onOpenClientHub: () => void;
  onNavigatePage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderCount,
  activePage,
  whatsappDisplayNumber = '07342 229865',
  whatsappNumber = '447342229865',
  telephone = '+44 7444 614764',
  onOpenOrderTray,
  onOpenBrandHub,
  onOpenClientHub,
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', hash: '#home' },
    { id: 'menu', label: 'Menu', hash: '#menu' },
    { id: 'catering', label: 'Catering & Events', hash: '#catering' },
    { id: 'reservation', label: 'Book Table', hash: '#reservation' },
    { id: 'about', label: 'Our Story', hash: '#about' },
    { id: 'gallery', label: 'Gallery', hash: '#gallery' },
    { id: 'contact', label: 'Contact', hash: '#contact' },
    { id: 'faq', label: 'FAQs', hash: '#faq' },
  ];

  const handleLinkClick = (hash: string, pageId: string) => {
    setMobileMenuOpen(false);
    onNavigatePage(pageId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#141211]/95 backdrop-blur-md border-b border-[#C6A15B]/25 transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark / Exact Logo Lockup */}
        <a
          href="#home"
          onClick={() => handleLinkClick('#home', 'home')}
          className="flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
          aria-label="NAIJA POT KITCHEN & GRILL LTD Homepage"
        >
          <BrandLogo variant="horizontal" size="sm" showSubtitle={false} />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-[#FFF7E8]/80"
          aria-label="Primary Navigation"
        >
          {navLinks.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={item.hash}
                onClick={() => handleLinkClick(item.hash, item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#E5C578] font-bold'
                    : 'hover:text-[#C6A15B] text-[#FFF7E8]/75'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C6A15B] to-[#E5C578] rounded-full" />
                )}
              </a>
            );
          })}

          <button
            onClick={onOpenBrandHub}
            className="text-[#C6A15B] hover:text-[#FFF7E8] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold border border-[#C6A15B]/30 px-2.5 py-1 rounded hover:bg-[#292522]"
          >
            <span>Brand Assets</span>
          </button>
        </nav>

        {/* Compact Nav for Large Screens (1024px to 1279px) */}
        <nav
          className="hidden lg:flex xl:hidden items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#FFF7E8]/80"
          aria-label="Primary Navigation Medium"
        >
          {navLinks.slice(0, 5).map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={item.hash}
                onClick={() => handleLinkClick(item.hash, item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#E5C578] font-bold'
                    : 'hover:text-[#C6A15B] text-[#FFF7E8]/75'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Tray Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Direct Call Line (Desktop) */}
          <a
            href={`tel:${telephone.replace(/[^0-9+]/g, '')}`}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#FFF7E8]/85 hover:text-[#E5C578] bg-[#181615] border border-[#292522] hover:border-[#C6A15B]/50 rounded-md transition-colors"
            title={`Direct Call: ${telephone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="font-mono font-medium">{telephone}</span>
          </a>

          <button
            onClick={onOpenOrderTray}
            className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[40px] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] rounded-md shadow-md transition-all duration-200 hover:shadow-[#C6A15B]/20 active:scale-[0.98] whitespace-nowrap shrink-0"
            aria-label={`Order on WhatsApp ${orderCount > 0 ? `(${orderCount} items in tray)` : ''}`}
          >
            <MessageCircle className="w-4 h-4 fill-current text-[#141211] shrink-0" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden text-[11px]">Order</span>
            {orderCount > 0 && (
              <span className="ml-0.5 sm:ml-1 px-1.5 py-0.5 text-[10px] font-black bg-[#6D1F2B] text-[#FFF7E8] rounded-full">
                {orderCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button (44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#FFF7E8] hover:text-[#C6A15B] hover:bg-[#292522] rounded-md transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#181615] border-b border-[#C6A15B]/30 px-5 py-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.hash}
                  onClick={() => handleLinkClick(item.hash, item.id)}
                  className={`py-2.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#6D1F2B] text-[#FFF7E8] font-bold border border-[#C6A15B]/40'
                      : 'text-[#FFF7E8]/80 hover:text-[#FFF7E8] hover:bg-[#292522]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[10px] text-[#E5C578] uppercase">Active</span>}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#292522] flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${whatsappNumber.startsWith('0') ? '44' + whatsappNumber.slice(1) : whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366]/15 border border-[#25D366]/40 hover:bg-[#25D366]/25 text-[#FFF7E8] rounded-lg flex items-center justify-between text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>WhatsApp Orders</span>
                </div>
                <span className="font-mono text-[#25D366] font-bold">{whatsappDisplayNumber}</span>
              </a>

              <a
                href={`tel:${telephone.replace(/[^0-9+]/g, '')}`}
                className="w-full py-2.5 px-3 bg-[#C6A15B]/15 border border-[#C6A15B]/40 hover:bg-[#C6A15B]/25 text-[#FFF7E8] rounded-lg flex items-center justify-between text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                  <span>Direct Call Line</span>
                </div>
                <span className="font-mono text-[#C6A15B] font-bold">{telephone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrandHub();
                }}
                className="w-full text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:bg-[#292522] rounded flex items-center justify-between"
              >
                <span>Brand Suite &amp; Canva Logo Assets</span>
                <span className="text-[10px] text-[#FFF7E8]/60">PNG &amp; SVG</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientHub();
                }}
                className="w-full text-left py-2 px-3 text-xs font-semibold text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522] rounded flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>Client Setup &amp; Verification Hub</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
