import React, { useState } from 'react';
import { RestaurantConfig } from '../types/restaurant';
import { X, CheckCircle2, AlertTriangle, Shield, Settings, Save, RefreshCw, ExternalLink } from 'lucide-react';

interface ClientConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  onUpdateConfig: (updated: Partial<RestaurantConfig>) => void;
  showPlaceholderNotices: boolean;
  onTogglePlaceholderNotices: (show: boolean) => void;
}

export const ClientConfigDrawer: React.FC<ClientConfigDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  showPlaceholderNotices,
  onTogglePlaceholderNotices,
}) => {
  const [whatsappInput, setWhatsappInput] = useState(config.whatsappDisplayNumber || config.whatsappNumber);
  const [telephoneInput, setTelephoneInput] = useState(config.telephone);
  const [currencyInput, setCurrencyInput] = useState(config.currencySymbol);
  const [addressInput, setAddressInput] = useState(config.addressLine1);
  const [cityInput, setCityInput] = useState(config.city);
  const [isAddressVerifiedState, setIsAddressVerifiedState] = useState(config.isAddressVerified);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = whatsappInput.replace(/[^0-9]/g, '');
    const cleanNum = rawDigits.startsWith('0') ? '44' + rawDigits.slice(1) : rawDigits;
    onUpdateConfig({
      whatsappNumber: cleanNum,
      whatsappDisplayNumber: whatsappInput.trim() || '07342 229865',
      telephone: telephoneInput.trim() || '+44 7444 614764',
      isWhatsappConfigured: cleanNum.length >= 10,
      currencySymbol: currencyInput,
      addressLine1: addressInput,
      city: cityInput,
      isAddressVerified: isAddressVerifiedState,
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const checklistItems = [
    { label: 'Business Name', status: 'verified', note: 'NAIJA POT KITCHEN & GRILL LTD confirmed' },
    { label: 'Brand Positioning', status: 'verified', note: 'Authentic Nigerian cuisine & modern grill' },
    { label: 'Brand Colours', status: 'verified', note: 'Burgundy, Gold, Ivory, Charcoal, Terracotta' },
    { label: 'Ordering Channel', status: 'verified', note: 'WhatsApp Click-to-chat with message encoding' },
    {
      label: 'WhatsApp Phone Number',
      status: 'verified',
      note: config.whatsappDisplayNumber || '07342 229865',
    },
    {
      label: 'Contact Phone Number',
      status: 'verified',
      note: config.telephone || '+44 7444 614764',
    },
    {
      label: 'Restaurant Physical Address',
      status: config.isAddressVerified ? 'verified' : 'pending',
      note: config.isAddressVerified ? config.addressLine1 : 'Pending client location confirmation',
    },
    { label: 'Opening Hours Roster', status: 'pending', note: 'Standard draft schedule (client to sign off)' },
    { label: 'Menu Pricing & Portions', status: 'pending', note: 'Draft realistic values (client to sign off)' },
    { label: 'Customer Reviews & Testimonials', status: 'pending', note: 'Exempted per 2.2 until verified' },
    { label: 'Delivery Radius & Fees', status: 'pending', note: 'Configurable tier template' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md h-full bg-[#181615] border-l border-[#C6A15B]/30 flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#292522] bg-[#141211] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C6A15B] flex items-center justify-center text-[#141211] shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm sm:text-base text-[#FFF7E8]">
                Client Setup &amp; Verification Hub
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#C6A15B]">
                Section 2.2 Content Classification &amp; Settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522]"
            aria-label="Close Settings Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-xs">
          {/* Quick Notice */}
          <div className="p-3 bg-[#141211] border border-[#C6A15B]/30 rounded-lg">
            <p className="font-bold text-[#E5C578] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#C6A15B]" />
              Section 2.2 Specification Compliance
            </p>
            <p className="text-[#FFF7E8]/70 mt-1 leading-relaxed">
              This dashboard separates confirmed brand facts from placeholders requiring client approval. You can update
              your live WhatsApp number and currency here anytime.
            </p>
          </div>

          {/* Quick Settings Form */}
          <form onSubmit={handleSave} className="space-y-4 p-4 bg-[#141211] rounded-xl border border-[#292522]">
            <h3 className="font-display font-bold text-sm text-[#FFF7E8]">Live Configuration Inputs</h3>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-[11px] font-semibold text-[#FFF7E8]/90 mb-1">
                WhatsApp Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                  placeholder="e.g. 07342 229865 or 447342229865"
                  className="w-full px-3 py-2 bg-[#181615] border border-[#292522] rounded-md text-[#FFF7E8] font-mono focus:border-[#C6A15B] focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-[#FFF7E8]/50 mt-1">
                Active WhatsApp: <code className="text-[#25D366] font-semibold">{whatsappInput}</code>
              </p>
            </div>

            {/* Contact Telephone Number */}
            <div>
              <label className="block text-[11px] font-semibold text-[#FFF7E8]/90 mb-1">
                Restaurant Contact Phone Number (Direct Calls)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={telephoneInput}
                  onChange={(e) => setTelephoneInput(e.target.value)}
                  placeholder="e.g. +44 7444 614764"
                  className="w-full px-3 py-2 bg-[#181615] border border-[#292522] rounded-md text-[#FFF7E8] font-mono focus:border-[#C6A15B] focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-[#FFF7E8]/50 mt-1">
                Active Call Line: <code className="text-[#C6A15B] font-semibold">{telephoneInput}</code>
              </p>
            </div>

            {/* Currency Symbol */}
            <div>
              <label className="block text-[11px] font-semibold text-[#FFF7E8]/90 mb-1">
                Menu Currency Symbol
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { symbol: '£', label: 'GBP (£)' },
                  { symbol: '₦', label: 'NGN (₦)' },
                  { symbol: '$', label: 'USD ($)' },
                  { symbol: '€', label: 'EUR (€)' },
                ].map((cur) => (
                  <button
                    key={cur.symbol}
                    type="button"
                    onClick={() => setCurrencyInput(cur.symbol)}
                    className={`py-1.5 px-2 rounded font-bold text-center border transition-colors ${
                      currencyInput === cur.symbol
                        ? 'bg-[#C6A15B] text-[#141211] border-[#C6A15B]'
                        : 'bg-[#181615] text-[#FFF7E8]/80 border-[#292522] hover:border-[#C6A15B]/30'
                    }`}
                  >
                    {cur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Address & Verification Check */}
            <div>
              <label className="block text-[11px] font-semibold text-[#FFF7E8]/90 mb-1">
                Restaurant Address (Street &amp; City)
              </label>
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="e.g. 14 High Street"
                className="w-full px-3 py-2 bg-[#181615] border border-[#292522] rounded-md text-[#FFF7E8] focus:border-[#C6A15B] focus:outline-none"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="addrVerified"
                  checked={isAddressVerifiedState}
                  onChange={(e) => setIsAddressVerifiedState(e.target.checked)}
                  className="rounded border-[#292522] text-[#C6A15B] focus:ring-[#C6A15B]"
                />
                <label htmlFor="addrVerified" className="text-[11px] text-[#FFF7E8]/80 cursor-pointer">
                  Mark address as client-verified (enables live Google Map)
                </label>
              </div>
            </div>

            {/* Placeholder Notices Toggle */}
            <div className="pt-2 border-t border-[#292522]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#FFF7E8]">Show Section 2.2 Disclaimer Banners</p>
                  <p className="text-[10px] text-[#FFF7E8]/50">Displays compliance notices on menu &amp; about sections</p>
                </div>
                <button
                  type="button"
                  onClick={() => onTogglePlaceholderNotices(!showPlaceholderNotices)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showPlaceholderNotices ? 'bg-[#C6A15B]' : 'bg-[#292522]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      showPlaceholderNotices ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#C6A15B] hover:bg-[#E5C578] text-[#141211] font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Apply Settings</span>
            </button>

            {isSavedNotice && (
              <p className="text-center text-xs font-semibold text-[#E5C578] animate-fadeIn">
                ✓ Configuration updated successfully!
              </p>
            )}
          </form>

          {/* Missing Client Inputs Checklist (Section 9 Requirement) */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[#FFF7E8]">
              Client Onboarding Checklist (Section 2.2 / 9)
            </h3>
            <div className="space-y-2">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#141211] rounded-lg border border-[#292522] flex items-start justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-[#FFF7E8]">{item.label}</p>
                    <p className="text-[10px] text-[#FFF7E8]/60 mt-0.5">{item.note}</p>
                  </div>
                  {item.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E5C578] bg-[#6D1F2B]/50 px-2 py-0.5 rounded shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-[#C6A15B]" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C65D3B] bg-[#C65D3B]/10 px-2 py-0.5 rounded shrink-0">
                      <AlertTriangle className="w-3 h-3 text-[#C65D3B]" />
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141211] border-t border-[#292522] flex items-center justify-between text-xs">
          <span className="text-[#FFF7E8]/60">Naija Pot Setup Hub</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#292522] hover:bg-[#38332F] text-[#FFF7E8] rounded font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
