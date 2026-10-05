import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface HeroBannerVideoProps {
  posterSrc?: string;
  webmSrc?: string;
  mp4Src?: string;
  className?: string;
  overlayClassName?: string;
}

export const HeroBannerVideo: React.FC<HeroBannerVideoProps> = ({
  posterSrc = '/images/hero-banner-poster.jpg',
  webmSrc = '/videos/hero-banner.webm',
  mp4Src = '/videos/hero-banner.mp4',
  className = '',
  overlayClassName = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion or video had an error, do not attempt autoplay
    if (shouldReduceMotion || hasError) return;

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy (e.g., low-power mode or data-saver)
          // Poster image automatically serves as the graceful fallback
        });
      }
    }
  }, [shouldReduceMotion, hasError]);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base Poster Image: guarantees instant paint without layout shift */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
          isVideoLoaded && !shouldReduceMotion ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectPosition: 'var(--hero-video-position, center 30%)',
        }}
      />

      {/* 2. Video Element: only active if user does not prefer reduced motion */}
      {!shouldReduceMotion && !hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          controls={false}
          aria-hidden="true"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectPosition: 'var(--hero-video-position, center 30%)',
          }}
        >
          {/* Primary modern WebM format */}
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {/* High-compatibility H.264 MP4 fallback */}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
          {/* Fallback visual for older browsers */}
          <img src={posterSrc} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </video>
      )}

      {/* 3. Subtle Dark Gradient Overlay: guarantees text and interactive card readability */}
      <div
        className={`absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-black/85 via-black/45 to-black/30 ${overlayClassName}`}
        aria-hidden="true"
      />

      {/* 4. Fine-grain radial depth overlay for sports stadium atmosphere */}
      <div
        className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />
    </div>
  );
};
