/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem, OrderItem, RestaurantConfig } from './types/restaurant';
import { INITIAL_RESTAURANT_CONFIG, INITIAL_MENU_ITEMS } from './data/restaurantConfig';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { CateringSection } from './components/CateringSection';
import { ReservationSection } from './components/ReservationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderTrayModal } from './components/OrderTrayModal';
import { BrandAssetHubModal } from './components/BrandAssetHubModal';
import { ClientConfigDrawer } from './components/ClientConfigDrawer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Utensils, Users, Calendar, Sparkles, BookOpen, Image as ImageIcon, MapPin, HelpCircle, ArrowRight, Flame } from 'lucide-react';

export type PageId = 'home' | 'menu' | 'catering' | 'reservation' | 'about' | 'gallery' | 'contact' | 'faq';

export default function App() {
  const [config, setConfig] = useState<RestaurantConfig>(INITIAL_RESTAURANT_CONFIG);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderTrayOpen, setIsOrderTrayOpen] = useState(false);
  const [isBrandHubOpen, setIsBrandHubOpen] = useState(false);
  const [isClientHubOpen, setIsClientHubOpen] = useState(false);
  const [showPlaceholderNotices, setShowPlaceholderNotices] = useState(true);

  // Hash-based Page Navigation State
  const parsePageFromHash = (): PageId => {
    const raw = window.location.hash.toLowerCase().replace(/^[#/]+/, '');
    if (raw === 'menu') return 'menu';
    if (raw === 'catering' || raw === 'events') return 'catering';
    if (raw === 'reservation' || raw === 'book' || raw === 'dining') return 'reservation';
    if (raw === 'about' || raw === 'story') return 'about';
    if (raw === 'gallery') return 'gallery';
    if (raw === 'contact' || raw === 'location' || raw === 'hours') return 'contact';
    if (raw === 'faq' || raw === 'faqs' || raw === 'guide') return 'faq';
    return 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(parsePageFromHash);

  // Sync hash changes with state
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = parsePageFromHash();
      setActivePage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: string) => {
    window.location.hash = `#${page}`;
    setActivePage(page as PageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((oi) => oi.item.id === item.id);
      if (existing) {
        return prev.map((oi) =>
          oi.item.id === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsOrderTrayOpen(true);
  };

  const handleDirectWhatsAppOrder = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((oi) => oi.item.id === item.id);
      if (existing) {
        return prev;
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsOrderTrayOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((oi) => {
          if (oi.item.id === itemId) {
            const newQty = oi.quantity + delta;
            return newQty > 0 ? { ...oi, quantity: newQty } : null;
          }
          return oi;
        })
        .filter((oi): oi is OrderItem => oi !== null)
      );
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((oi) => oi.item.id !== itemId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleUpdateConfig = (updated: Partial<RestaurantConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Subpage Breadcrumb Banner
  const renderBreadcrumb = (pageTitle: string, subtitle: string) => (
    <div className="bg-[#181615] border-b border-[#292522] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-[#FFF7E8]/60 mb-2" aria-label="Breadcrumb">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('home');
            }}
            className="hover:text-[#C6A15B] transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <span className="text-[#C6A15B] font-semibold">{pageTitle}</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF7E8]">{pageTitle}</h1>
            <p className="text-xs sm:text-sm text-[#FFF7E8]/70 mt-1 font-light">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOrderTrayOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>View Order Tray</span>
              {totalOrderCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#6D1F2B] text-[#FFF7E8] rounded-full text-[10px] font-bold">
                  {totalOrderCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#141211] text-[#FFF7E8]">
      {/* Announcement Bar */}
      <AnnouncementBar
        isConfigured={config.isWhatsappConfigured}
        whatsappDisplayNumber={config.whatsappDisplayNumber}
        telephone={config.telephone}
        onOpenClientHub={() => setIsClientHubOpen(true)}
        onOpenOrderTray={() => setIsOrderTrayOpen(true)}
      />

      {/* Main Top Bar with Full Pages Navigation */}
      <Navbar
        orderCount={totalOrderCount}
        activePage={activePage}
        whatsappDisplayNumber={config.whatsappDisplayNumber}
        whatsappNumber={config.whatsappNumber}
        telephone={config.telephone}
        onOpenOrderTray={() => setIsOrderTrayOpen(true)}
        onOpenBrandHub={() => setIsBrandHubOpen(true)}
        onOpenClientHub={() => setIsClientHubOpen(true)}
        onNavigatePage={navigateToPage}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {/* ==================== 1. HOME PAGE ==================== */}
        {activePage === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <Hero
              onExploreMenu={() => navigateToPage('menu')}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            />

            {/* Quick Feature Navigation Strip */}
            <section className="bg-[#181615] border-b border-[#292522] py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#C6A15B] mb-4 text-center sm:text-left">
                  Explore Restaurant Services &amp; Portals
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { id: 'menu', title: 'Interactive Menu', icon: Utensils, desc: '8 Authentic Categories' },
                    { id: 'catering', title: 'Party Catering', icon: Flame, desc: 'Coolers & Small Chops' },
                    { id: 'reservation', title: 'Book a Table', icon: Calendar, desc: 'Dining Reservations' },
                    { id: 'about', title: 'Our Story & Ethos', icon: BookOpen, desc: 'Cast-Iron Tradition' },
                    { id: 'gallery', title: 'Visual Gallery', icon: ImageIcon, desc: 'Grills & Dining' },
                    { id: 'faq', title: 'Ordering FAQs', icon: HelpCircle, desc: 'WhatsApp & Delivery' },
                  ].map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <a
                        key={feat.id}
                        href={`#${feat.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToPage(feat.id);
                        }}
                        className="p-3.5 bg-[#141211] hover:bg-[#201C1A] border border-[#292522] hover:border-[#C6A15B]/50 rounded-xl transition-all duration-200 group flex flex-col justify-between"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#292522] group-hover:bg-[#6D1F2B] text-[#E5C578] flex items-center justify-center transition-colors mb-2">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-xs text-[#FFF7E8] group-hover:text-[#E5C578] transition-colors leading-tight">
                            {feat.title}
                          </p>
                          <p className="text-[10px] text-[#FFF7E8]/60 mt-0.5 truncate">{feat.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Featured Menu Teaser */}
            <div className="relative">
              <MenuSection
                menuItems={menuItems}
                currencySymbol={config.currencySymbol}
                onAddToCart={handleAddToCart}
                onDirectWhatsAppOrder={handleDirectWhatsAppOrder}
                showPlaceholderNotice={showPlaceholderNotices}
              />
              <div className="bg-[#181615] py-6 text-center border-b border-[#292522]">
                <button
                  onClick={() => navigateToPage('menu')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6A15B] hover:text-[#FFF7E8] transition-colors"
                >
                  <span>Open Dedicated Interactive Menu Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Catering & Feasts Highlight Banner */}
            <section className="py-16 bg-[#141211] border-b border-[#292522]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-[#181615] via-[#201C1A] to-[#181615] rounded-2xl border border-[#C6A15B]/40 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-2 text-center md:text-left max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] flex items-center justify-center md:justify-start gap-1.5">
                      <Flame className="w-4 h-4 text-[#C65D3B]" />
                      <span>Party Feasts &amp; Coolers</span>
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                      Hosting a Celebration, Birthday or Wedding?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#FFF7E8]/75 leading-relaxed font-light">
                      Order full coolers of smoky firewood Party Jollof, small chops platters, and live charcoal Suya grill stations.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      onClick={() => navigateToPage('catering')}
                      className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded-md transition-colors"
                    >
                      <span>Explore Catering Packages</span>
                    </button>
                    <button
                      onClick={() => navigateToPage('reservation')}
                      className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FFF7E8] bg-[#6D1F2B] hover:bg-[#852535] rounded-md border border-[#C6A15B]/30 transition-colors"
                    >
                      <span>Book a Dining Table</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* About & Culinary Ethos Section */}
            <AboutSection
              showPlaceholderNotice={showPlaceholderNotices}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            />

            {/* Visual Gallery Section */}
            <GallerySection />

            {/* Contact, Hours & Directions */}
            <ContactSection
              config={config}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
              onOpenClientHub={() => setIsClientHubOpen(true)}
            />
          </div>
        )}

        {/* ==================== 2. MENU PAGE ==================== */}
        {activePage === 'menu' && (
          <div>
            {renderBreadcrumb('Interactive Dining Menu', 'Browse all authentic dishes, customize spice levels, and order on WhatsApp.')}
            <MenuSection
              menuItems={menuItems}
              currencySymbol={config.currencySymbol}
              onAddToCart={handleAddToCart}
              onDirectWhatsAppOrder={handleDirectWhatsAppOrder}
              showPlaceholderNotice={showPlaceholderNotices}
            />
          </div>
        )}

        {/* ==================== 3. CATERING PAGE ==================== */}
        {activePage === 'catering' && (
          <div>
            {renderBreadcrumb('Party Feasts & Event Catering', 'Large party coolers, small chops boxes, and live charcoal grill catering.')}
            <CateringSection
              config={config}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            />
          </div>
        )}

        {/* ==================== 4. RESERVATION PAGE ==================== */}
        {activePage === 'reservation' && (
          <div>
            {renderBreadcrumb('Table Reservations & Dining', 'Book your table for an authentic West African dining experience.')}
            <ReservationSection config={config} />
          </div>
        )}

        {/* ==================== 5. ABOUT PAGE ==================== */}
        {activePage === 'about' && (
          <div>
            {renderBreadcrumb('Our Story & Culinary Ethos', 'The rich history, cast-iron cooking traditions, and hospitality promise.')}
            <AboutSection
              showPlaceholderNotice={showPlaceholderNotices}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            />
          </div>
        )}

        {/* ==================== 6. GALLERY PAGE ==================== */}
        {activePage === 'gallery' && (
          <div>
            {renderBreadcrumb('Visual Feast Gallery', 'Photographs of our sizzling grills, simmered pots, and dining atmosphere.')}
            <GallerySection />
          </div>
        )}

        {/* ==================== 7. CONTACT PAGE ==================== */}
        {activePage === 'contact' && (
          <div>
            {renderBreadcrumb('Hours, Location & Inquiries', 'Visit our restaurant, view opening schedule, or send us a message.')}
            <ContactSection
              config={config}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
              onOpenClientHub={() => setIsClientHubOpen(true)}
            />
          </div>
        )}

        {/* ==================== 8. FAQS PAGE ==================== */}
        {activePage === 'faq' && (
          <div>
            {renderBreadcrumb('Ordering Guide & FAQs', 'Answers to common questions regarding WhatsApp orders, spice levels, and delivery.')}
            <FaqSection
              config={config}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenBrandHub={() => setIsBrandHubOpen(true)}
        onOpenClientHub={() => setIsClientHubOpen(true)}
        onOpenOrderTray={() => setIsOrderTrayOpen(true)}
      />

      {/* Slide-over WhatsApp Order Tray Modal */}
      <OrderTrayModal
        isOpen={isOrderTrayOpen}
        onClose={() => setIsOrderTrayOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        config={config}
        onOpenClientHub={() => {
          setIsOrderTrayOpen(false);
          setIsClientHubOpen(true);
        }}
      />

      {/* Brand Asset Hub Modal (Delivering Section 3.2 deliverables) */}
      <BrandAssetHubModal
        isOpen={isBrandHubOpen}
        onClose={() => setIsBrandHubOpen(false)}
      />

      {/* Client Configuration & Onboarding Hub Drawer */}
      <ClientConfigDrawer
        isOpen={isClientHubOpen}
        onClose={() => setIsClientHubOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        showPlaceholderNotices={showPlaceholderNotices}
        onTogglePlaceholderNotices={setShowPlaceholderNotices}
      />

      {/* Floating WhatsApp Green Logo Button in Bottom-Right Corner */}
      <FloatingWhatsAppButton
        whatsappNumber={config.whatsappNumber}
        whatsappDisplayNumber={config.whatsappDisplayNumber}
        telephone={config.telephone}
      />
    </div>
  );
}
