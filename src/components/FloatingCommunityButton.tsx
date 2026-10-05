import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface FloatingCommunityButtonProps {
  onClick: () => void;
}

// Premium easing curve: cubic-bezier(0.22, 1, 0.36, 1)
const CUBIC_BEZIER_EASE = [0.22, 1, 0.36, 1] as const;

export const FloatingCommunityButton: React.FC<FloatingCommunityButtonProps> = ({ onClick }) => {
  // Hook detects scroll direction and position
  const { isCompact } = useScrollDirection();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-6 right-6 z-30 sm:bottom-7 sm:right-7 pointer-events-none">
      <motion.button
        type="button"
        onClick={onClick}
        aria-label="Join Our Community"
        animate={{
          padding: isCompact ? '8px 14px' : '12px 18px',
          scale: isCompact ? 0.94 : 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.32,
          ease: CUBIC_BEZIER_EASE,
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -2,
                scale: isCompact ? 0.96 : 1.02,
                transition: { duration: 0.2, ease: CUBIC_BEZIER_EASE },
              }
        }
        whileTap={
          shouldReduceMotion
            ? {}
            : {
                scale: isCompact ? 0.91 : 0.97,
                transition: { duration: 0.1, ease: 'easeOut' },
              }
        }
        className="pointer-events-auto origin-bottom-right group flex items-center gap-2.5 rounded-full bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm border border-neutral-700/80 hover:border-[#CDFF00] shadow-md hover:shadow-xl cursor-pointer backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] transition-colors duration-200 select-none min-h-[44px] will-change-transform"
      >
        {/* Neon-green glowing dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CDFF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CDFF00] group-hover:shadow-[0_0_8px_#CDFF00] transition-shadow duration-200"></span>
        </span>

        {/* Community / users icon */}
        <Users className="w-4 h-4 text-[#CDFF00] shrink-0 transition-transform duration-200 group-hover:scale-110" />

        {/* Button Text */}
        <span className="whitespace-nowrap tracking-tight">Join Our Community</span>

        {/* Right-facing arrow */}
        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#CDFF00] group-hover:translate-x-1 shrink-0 transition-all duration-200" />
      </motion.button>
    </div>
  );
};
