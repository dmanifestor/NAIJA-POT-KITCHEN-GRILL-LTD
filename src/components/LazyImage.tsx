import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  showSkeleton?: boolean;
  aspectRatio?: string;
  fallbackIcon?: 'utensils' | 'image';
}

/**
 * High-performance, IntersectionObserver-based lazy loading image component.
 * - Defers downloading of offscreen images until they approach the viewport (improving LCP, FCP, & INP).
 * - Enforces zero layout shift (CLS = 0) with a styled skeleton placeholder.
 * - Decodes images asynchronously off the main thread (`decoding="async"`).
 * - Fades in smoothly once the image is completely loaded.
 * - Gracefully falls back if IntersectionObserver is not supported or if the image fails to load.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  containerClassName = '',
  className = '',
  rootMargin = '250px 0px',
  threshold = 0.01,
  showSkeleton = true,
  aspectRatio,
  fallbackIcon = 'utensils',
  ...restProps
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported in the environment, load immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentElement = containerRef.current;
    if (!currentElement) return;

    // Reset error & loaded status if src changes
    setIsLoaded(false);
    setHasError(false);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          // Once in view, we can disconnect this observer to free up resources
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [src, rootMargin, threshold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const IconComponent = fallbackIcon === 'image' ? ImageIcon : Utensils;

  return (
    <div
      ref={containerRef}
      style={aspectRatio ? { aspectRatio } : undefined}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Shimmer Skeleton Placeholder while loading or offscreen */}
      {showSkeleton && !isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1C1917] flex items-center justify-center animate-pulse z-0"
        >
          {/* Subtle gold-tinted shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A15B]/10 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
          <div className="text-[#C6A15B]/30 flex flex-col items-center gap-1.5 select-none">
            <IconComponent className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      )}

      {/* Error Fallback State */}
      {hasError ? (
        <div className="absolute inset-0 bg-[#1C1917] flex flex-col items-center justify-center p-3 text-center z-10">
          <IconComponent className="w-8 h-8 text-[#C6A15B]/50 mb-1" />
          <span className="text-[11px] font-medium text-[#FFF7E8]/60 line-clamp-1">{alt}</span>
          <span className="text-[9px] text-[#C6A15B]/80 uppercase tracking-wider mt-0.5 font-bold">
            NAIJA POT KITCHEN
          </span>
        </div>
      ) : (
        /* Actual Image (Only loaded when intersected) */
        isInView && (
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full transition-opacity duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...restProps}
          />
        )
      )}
    </div>
  );
};
