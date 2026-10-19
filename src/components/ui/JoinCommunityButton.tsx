import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { PageId, StakeholderRole } from '../../types';

export interface JoinCommunityButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenGetInvolved?: (role?: StakeholderRole) => void;
  onNavigate?: (page: PageId) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
  showIcon?: boolean;
}

/**
 * Premium Animated "Join Our Community" Button for Sports Hub.
 * Strictly adheres to the Sports Hub design tokens:
 * - Neon Lime: #CDFF00
 * - Dark Lime border/accent: #9ECC00
 * - High-contrast dark typography: #11161B (~16:1 WCAG AAA contrast)
 * - Viewport entrance, spring-based hover, subtle clipped light sweep, and tap feedback.
 * - Fully accessible, respecting prefers-reduced-motion and keyboard navigation.
 */
export const JoinCommunityButton: React.FC<JoinCommunityButtonProps> = ({
  onClick,
  onOpenGetInvolved,
  onNavigate,
  className = '',
  size = 'default',
  label = 'Join Our Community',
  ariaLabel = 'Join the Sports Hub community and connect with athletes, clubs, and sports leaders',
  disabled = false,
  showIcon = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isProcessing) return;
    setIsProcessing(true);

    if (onClick) {
      onClick(e);
    } else if (onOpenGetInvolved) {
      onOpenGetInvolved('community_leader');
    } else if (onNavigate) {
      onNavigate('opportunities');
    }

    setTimeout(() => {
      setIsProcessing(false);
    }, 550);
  };

  // Responsive size variants ensuring minimum touch target of 44px on mobile
  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2 text-xs sm:text-[13px] gap-2',
    default: 'min-h-[46px] sm:min-h-[48px] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm gap-2 sm:gap-2.5',
    lg: 'min-h-[50px] sm:min-h-[52px] px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base gap-2.5 sm:gap-3',
  }[size];

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || isProcessing}
      aria-label={ariaLabel}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={
        shouldReduceMotion || disabled
          ? {}
          : {
              scale: 1.025,
              y: -2,
              transition: { type: 'spring', stiffness: 420, damping: 24 },
            }
      }
      whileTap={
        shouldReduceMotion || disabled
          ? {}
          : {
              scale: 0.98,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 28,
                mass: 0.5,
              },
            }
      }
      transition={{
        duration: 0.58,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        group relative inline-flex items-center justify-center font-display font-black tracking-tight rounded-full cursor-pointer select-none overflow-hidden
        bg-[#CDFF00] hover:bg-[#d6ff33] active:bg-[#b8e600] text-[#11161B]
        border border-[#9ECC00] dark:border-[#CDFF00]/50
        shadow-[0_4px_16px_rgba(205,255,0,0.28)] hover:shadow-[0_8px_26px_rgba(205,255,0,0.42)] dark:shadow-[0_4px_22px_rgba(205,255,0,0.20)]
        transition-colors duration-200
        focus:outline-none focus-visible:ring-3 focus-visible:ring-[#CDFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161B] dark:focus-visible:ring-offset-[#0A0D14]
        disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
        ${sizeClasses}
        ${className}
      `}
    >
      {/* 1. Subtle clipped architectural light sweep highlight (Active on hover, non-distracting) */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        />
      )}

      {/* 2. Top-edge subtle reflective bevel */}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none opacity-80"
      />

      {/* 3. Community micro-badge or dot accent */}
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-[#11161B] shadow-[0_0_4px_rgba(17,22,27,0.4)] shrink-0 transition-transform duration-200 group-hover:scale-125"
      />

      {/* 4. Button label with ultra-crisp sports typography */}
      <span className="relative z-10 leading-none font-extrabold tracking-[-0.01em]">
        {label}
      </span>

      {/* 5. Connected Motion Arrow */}
      {showIcon && (
        <motion.span
          aria-hidden="true"
          className="relative z-10 shrink-0 inline-flex items-center justify-center"
          animate={
            shouldReduceMotion
              ? { x: 0 }
              : isHovered
              ? { x: 4 }
              : { x: 0 }
          }
          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
        >
          <ArrowRight className="w-4 h-4 text-[#11161B] stroke-[2.6]" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default JoinCommunityButton;
