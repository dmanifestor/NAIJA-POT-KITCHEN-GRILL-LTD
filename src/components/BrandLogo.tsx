import React, { useState } from 'react';
import logoImage from '../assets/images/naija_pot_logo.png';

interface BrandLogoProps {
  variant?: 'emblem' | 'horizontal' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Responsive dimension mapping
  const dimension = {
    xs: { px: 36, textTitle: 'text-xs', textSub: 'text-[8px]' },
    sm: { px: 48, textTitle: 'text-sm sm:text-base', textSub: 'text-[9px] sm:text-[10px]' },
    md: { px: 64, textTitle: 'text-base sm:text-lg', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { px: 104, textTitle: 'text-xl sm:text-2xl', textSub: 'text-xs' },
    xl: { px: 200, textTitle: 'text-2xl sm:text-3xl', textSub: 'text-sm' },
  }[size];

  // Primary rendering using the exact Canva logo image
  const renderExactLogoImage = (imgSize: number) => (
    <div
      style={{ width: imgSize, height: imgSize }}
      className="relative shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7B35] via-[#E5C578] to-[#C6A15B] shadow-lg shadow-black/40 group overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-[#141211] flex items-center justify-center">
        {!imageError ? (
          <img
            src={logoImage}
            alt="NAIJA POT KITCHEN & GRILL LTD Logo"
            className="w-full h-full object-cover rounded-full"
            loading="eager"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-center p-2 text-[#C6A15B] font-display font-bold text-xs">
            NAIJA POT
          </div>
        )}
      </div>
    </div>
  );

  // 1. EMBLEM VARIANT (Circular complete seal)
  if (variant === 'emblem') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {renderExactLogoImage(dimension.px)}
        {showSubtitle && size !== 'xs' && size !== 'sm' && (
          <div className="mt-2 text-center">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#C6A15B]">
              A Taste of Naija
            </span>
            <span className="block text-[9px] italic text-[#FFF7E8]/70">
              More Than a Meal — It's Home
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. COMPACT VARIANT (Mobile & small badges)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {renderExactLogoImage(dimension.px)}
        <div className="flex flex-col">
          <span className="font-display font-bold text-sm tracking-tight text-[#FFF7E8] leading-tight">
            NAIJA POT
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#C6A15B] font-semibold">
            Kitchen &amp; Grill
          </span>
        </div>
      </div>
    );
  }

  // 3. HORIZONTAL LOCKUP (Header navbar & signature layouts)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {renderExactLogoImage(dimension.px)}

      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-black tracking-tight ${dimension.textTitle}`}
            style={{
              background: 'linear-gradient(135deg, #FFF7E8 0%, #F0D699 40%, #C6A15B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NAIJA POT
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
          <span
            className={`font-sans uppercase font-bold tracking-[0.16em] text-[#C6A15B] ${dimension.textSub}`}
          >
            KITCHEN &amp; GRILL LTD
          </span>
        </div>

        {showSubtitle && (
          <span className="hidden sm:inline-block text-[9px] italic text-[#FFF7E8]/60 mt-0.5 tracking-wide">
            Good Food · Great People · A Taste of Naija
          </span>
        )}
      </div>
    </div>
  );
};
