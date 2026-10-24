import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { logoImage } from '../assets/images';
import { X, Download, Copy, Check, Palette, Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

interface BrandAssetHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetHubModal: React.FC<BrandAssetHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  const brandColors = [
    { name: 'Burgundy', hex: '#6D1F2B', role: 'Primary Accent & Action Highlights' },
    { name: 'Gold', hex: '#C6A15B', role: 'Metallic Brand Crest, Emblems & Framing' },
    { name: 'Ivory', hex: '#FFF7E8', role: 'Display Typography & Light Surfaces' },
    { name: 'Charcoal', hex: '#292522', role: 'Base Structural Canvas & Card Borders' },
    { name: 'Terracotta', hex: '#C65D3B', role: 'Flame, Grill & Ember Energy' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Helper to trigger SVG download of the emblem
  const downloadSvgAsset = (variantName: string) => {
    const svgData = `<svg width="800" height="800" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D6"/>
      <stop offset="25%" stop-color="#C6A15B"/>
      <stop offset="50%" stop-color="#F9E2AF"/>
      <stop offset="75%" stop-color="#9E7B35"/>
      <stop offset="100%" stop-color="#E2BD75"/>
    </linearGradient>
    <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#C65D3B"/>
      <stop offset="40%" stop-color="#E67E22"/>
      <stop offset="80%" stop-color="#F1C40F"/>
      <stop offset="100%" stop-color="#FFF7E8"/>
    </linearGradient>
    <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A322C"/>
      <stop offset="50%" stop-color="#1E1916"/>
      <stop offset="100%" stop-color="#120E0D"/>
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0E3D1E"/>
      <stop offset="50%" stop-color="#165B2E"/>
      <stop offset="100%" stop-color="#0A2814"/>
    </linearGradient>
  </defs>
  <circle cx="200" cy="200" r="192" fill="#141211" stroke="url(#goldGrad)" stroke-width="6"/>
  <circle cx="200" cy="200" r="183" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M130 195 Q145 160 160 185 Q175 145 190 180 Q200 135 210 180 Q225 145 240 185 Q255 160 270 195 Q200 215 130 195 Z" fill="url(#fireGrad)"/>
  <path d="M130 140 C120 180, 130 205, 200 205 C270 205, 280 180, 270 140 Z" fill="url(#potGrad)" stroke="url(#goldGrad)" stroke-width="3.5"/>
  <ellipse cx="200" cy="138" rx="72" ry="14" fill="#25201C" stroke="url(#goldGrad)" stroke-width="3"/>
  <path d="M150 136 C165 105, 235 105, 250 136 Z" fill="url(#potGrad)" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <circle cx="200" cy="106" r="9" fill="url(#goldGrad)"/>
  <text x="200" y="256" text-anchor="middle" font-family="Georgia, serif" font-weight="800" font-size="48" fill="url(#goldGrad)">NAIJA POT</text>
  <line x1="45" y1="274" x2="115" y2="274" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="200" y="278" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="17" letter-spacing="4" fill="url(#goldGrad)">KITCHEN &amp; GRILL LTD</text>
  <line x1="285" y1="274" x2="355" y2="274" stroke="url(#goldGrad)" stroke-width="2"/>
  <text x="200" y="300" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="10" letter-spacing="2.5" fill="#E5C578">GOOD FOOD • GREAT PEOPLE • A TASTE OF NAIJA</text>
  <path d="M100 330 Q200 352 300 330 L290 354 Q200 376 110 354 Z" fill="url(#ribbonGrad)" stroke="url(#goldGrad)" stroke-width="1.5"/>
  <text x="200" y="347" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="600" font-size="13" fill="#FFF7E8">More Than a Meal — It's Home</text>
</svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `naija-pot-${variantName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#141211] border border-[#C6A15B]/30 rounded-xl sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#292522] flex items-center justify-between bg-[#181615]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#6D1F2B] flex items-center justify-center text-[#E5C578] shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-xl text-[#FFF7E8]">
                Brand Identity &amp; Logo Suite
              </h2>
              <p className="text-[10px] sm:text-xs text-[#C6A15B]">
                Delivering Section 3.2 deliverables for NAIJA POT KITCHEN &amp; GRILL LTD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522] transition-colors"
            aria-label="Close Brand Asset Hub"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          {/* Exact Canva Logo Hero Banner */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#181615] via-[#201C1A] to-[#181615] rounded-xl border border-[#C6A15B]/40 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7B35] via-[#E5C578] to-[#C6A15B] shadow-md shrink-0 overflow-hidden">
                <img
                  src={logoImage}
                  alt="Official NAIJA POT Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A15B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exact Canva Brand Asset</span>
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#FFF7E8]">
                  Official NAIJA POT Emblem
                </h3>
                <p className="text-xs text-[#FFF7E8]/70">
                  Full 1254 x 1254 HD Master Artwork in official Burgundy, Gold, Ivory &amp; Charcoal.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <a
                href={logoImage}
                download="naija-pot-logo-official.png"
                className="flex-1 md:flex-initial py-2.5 px-4 text-xs font-bold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded-md shadow flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Master PNG</span>
              </a>
              <a
                href="https://canva.link/bib1hol0ltsreay"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 text-xs font-semibold text-[#FFF7E8] bg-[#292522] hover:bg-[#38332F] border border-[#C6A15B]/30 rounded-md transition-colors whitespace-nowrap"
              >
                Canva Source ↗
              </a>
            </div>
          </div>

          {/* Section 1: Logo Deliverable Matrix */}
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[#FFF7E8] mb-1">
              Logo Deliverable Variants (SVG &amp; Vector)
            </h3>
            <p className="text-xs text-[#FFF7E8]/70 mb-4">
              All 6 formats specified in Section 3.2 for signage, packaging, uniforms, social media, and digital platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Variant 1: Compact Square Emblem */}
              <div className="p-5 bg-[#181615] rounded-xl border border-[#292522] flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full flex items-center justify-center py-2">
                  <BrandLogo variant="emblem" size="lg" theme="dark" />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#FFF7E8]">Square Crest Emblem</p>
                  <p className="text-[10px] text-[#C6A15B] mt-0.5">Uniforms, Packaging &amp; Signage</p>
                  <button
                    onClick={() => downloadSvgAsset('Square-Emblem')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>

              {/* Variant 2: Primary Horizontal Lockup */}
              <div className="p-5 bg-[#181615] rounded-xl border border-[#292522] flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full flex items-center justify-center py-6">
                  <BrandLogo variant="horizontal" size="sm" theme="dark" showSubtitle />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#FFF7E8]">Primary Horizontal Lockup</p>
                  <p className="text-[10px] text-[#C6A15B] mt-0.5">Website Header &amp; Letterhead</p>
                  <button
                    onClick={() => downloadSvgAsset('Horizontal-Lockup')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>

              {/* Variant 3: Light Background Version */}
              <div className="p-5 bg-[#FFF7E8] text-[#141211] rounded-xl border border-[#C6A15B]/40 flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full flex items-center justify-center py-2">
                  <BrandLogo variant="emblem" size="lg" theme="light" />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#141211]">Light Background Version</p>
                  <p className="text-[10px] text-[#6D1F2B] font-medium mt-0.5">Receipts &amp; Light Stationery</p>
                  <button
                    onClick={() => downloadSvgAsset('Light-Background-Emblem')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#FFF7E8] bg-[#6D1F2B] hover:bg-[#852535] rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>

              {/* Variant 4: Favicon & App Icon */}
              <div className="p-5 bg-[#181615] rounded-xl border border-[#292522] flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-[#141211] border border-[#C6A15B]/50 flex items-center justify-center p-2 shadow-inner">
                  <BrandLogo variant="compact" size="sm" />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#FFF7E8]">Favicon &amp; App Icon</p>
                  <p className="text-[10px] text-[#C6A15B] mt-0.5">32x32px &amp; 64x64px Browser Icon</p>
                  <button
                    onClick={() => downloadSvgAsset('Favicon-Icon')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#FFF7E8] bg-[#292522] hover:bg-[#38332F] rounded border border-[#C6A15B]/30 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>

              {/* Variant 5: Social Media Avatar / Square */}
              <div className="p-5 bg-[#181615] rounded-xl border border-[#292522] flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#141211] border-2 border-[#C6A15B] flex items-center justify-center p-1">
                  <BrandLogo variant="emblem" size="md" />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#FFF7E8]">Social Profile Avatar</p>
                  <p className="text-[10px] text-[#C6A15B] mt-0.5">Instagram, WhatsApp &amp; TikTok</p>
                  <button
                    onClick={() => downloadSvgAsset('Social-Profile-Avatar')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#FFF7E8] bg-[#292522] hover:bg-[#38332F] rounded border border-[#C6A15B]/30 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>

              {/* Variant 6: Dark Luxury Background Lockup */}
              <div className="p-5 bg-[#0D0B0A] rounded-xl border border-[#C6A15B]/40 flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full flex items-center justify-center py-4">
                  <BrandLogo variant="horizontal" size="sm" theme="dark" showSubtitle={false} />
                </div>
                <div className="w-full">
                  <p className="font-bold text-xs text-[#FFF7E8]">Dark Luxury Mode</p>
                  <p className="text-[10px] text-[#C6A15B] mt-0.5">Menus, Menuboards &amp; TV Screens</p>
                  <button
                    onClick={() => downloadSvgAsset('Dark-Luxury-Lockup')}
                    className="mt-3 w-full py-1.5 px-3 text-[11px] font-semibold text-[#FFF7E8] bg-[#6D1F2B] hover:bg-[#852535] rounded flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Verified Brand Colour Specification */}
          <div className="pt-4 border-t border-[#292522]">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-[#C6A15B]" />
              <h3 className="font-display font-bold text-base text-[#FFF7E8]">
                Official Brand Color Palette (Hex &amp; Roles)
              </h3>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {brandColors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopyHex(c.hex)}
                  className="p-3 bg-[#181615] rounded-lg border border-[#292522] cursor-pointer hover:border-[#C6A15B]/50 transition-colors group"
                >
                  <div
                    className="w-full h-12 rounded mb-2 border border-black/30 shadow-inner flex items-center justify-center text-xs font-mono font-bold"
                    style={{ backgroundColor: c.hex, color: c.hex === '#FFF7E8' ? '#141211' : '#FFF7E8' }}
                  >
                    {copiedColor === c.hex ? <Check className="w-4 h-4" /> : null}
                  </div>
                  <p className="font-bold text-xs text-[#FFF7E8]">{c.name}</p>
                  <p className="font-mono text-[11px] text-[#C6A15B] mt-0.5 flex items-center justify-between">
                    <span>{c.hex}</span>
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[9px] text-[#FFF7E8]/60 mt-1 leading-tight">{c.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Typography System */}
          <div className="pt-4 border-t border-[#292522] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#181615] rounded-xl border border-[#292522]">
              <p className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">
                Headings &amp; Display Typography
              </p>
              <p className="font-display text-xl text-[#FFF7E8] mt-2 font-bold">
                Playfair Display (Serif)
              </p>
              <p className="text-[#FFF7E8]/70 mt-1">
                Conveys culinary prestige, warmth, and classic editorial elegance for restaurant banners and section titles.
              </p>
            </div>

            <div className="p-4 bg-[#181615] rounded-xl border border-[#292522]">
              <p className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">
                Body &amp; Interface Typography
              </p>
              <p className="font-sans text-xl text-[#FFF7E8] mt-2 font-semibold">
                Plus Jakarta Sans &amp; Inter
              </p>
              <p className="text-[#FFF7E8]/70 mt-1">
                Optimized for ultra-crisp legibility across mobile displays, WhatsApp message previews, and menu listings.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#181615] border-t border-[#292522] flex items-center justify-between text-xs">
          <span className="text-[#FFF7E8]/60">
            NAIJA POT KITCHEN &amp; GRILL LTD • Brand Deliverable Pack
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#292522] text-[#FFF7E8] hover:bg-[#38332F] rounded font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
