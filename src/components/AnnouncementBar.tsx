import React from 'react';
import { Sparkles, MessageCircle, AlertCircle, Phone } from 'lucide-react';

interface AnnouncementBarProps {
  isConfigured: boolean;
  whatsappDisplayNumber?: string;
  telephone?: string;
  onOpenClientHub: () => void;
  onOpenOrderTray: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  isConfigured,
  whatsappDisplayNumber = '07342 229865',
  telephone = '+44 7444 614764',
  onOpenClientHub,
  onOpenOrderTray,
}) => {
  return (
    <aside aria-label="Restaurant Notice" className="bg-[#6D1F2B] text-[#FFF7E8] border-b border-[#C6A15B]/20 py-1.5 sm:py-2 px-3 sm:px-4 text-[11px] sm:text-xs font-medium relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
          <span className="text-[#C6A15B] font-semibold flex items-center gap-1 shrink-0 text-[10px] sm:text-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5C578]" />
            <span>NAIJA POT</span>
          </span>
          <span className="hidden xs:inline text-[#FFF7E8]/40">|</span>
          <span className="truncate text-[#FFF7E8]/90 text-[10px] sm:text-xs">
            Wood-Smoked Suya, Party Jollof &amp; Soups Fresh Daily
          </span>
          <span className="hidden lg:inline text-[#FFF7E8]/40">•</span>
          <a
            href={`tel:${telephone.replace(/[^0-9+]/g, '')}`}
            className="hidden lg:inline-flex items-center gap-1 text-[#FFF7E8]/90 hover:text-[#C6A15B] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C6A15B]" />
            <span>Call: <span className="font-mono text-[#FFF7E8]">{telephone}</span></span>
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenOrderTray}
            className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#141211] bg-[#C6A15B] hover:bg-[#E5C578] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3 h-3 text-[#141211]" />
            <span className="hidden sm:inline">WhatsApp: {whatsappDisplayNumber}</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
