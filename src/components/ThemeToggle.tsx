import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 600, damping: 25 } }}
      className={`theme-toggle-btn relative inline-flex items-center justify-center ${
        showLabel ? 'h-9 px-3 gap-2' : 'w-9 h-9'
      } rounded-xl border cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] focus-visible:ring-offset-2 transition-colors duration-150 overflow-hidden ${
        isDark
          ? 'bg-[#1A222D] text-[#CDFF00] border-[#2A313C] hover:bg-[#222C3A] hover:border-[#CDFF00]/60 shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
          : 'bg-[#F2F3F7] text-[#11161B] border-[#E5EAED] hover:bg-[#E2E8F0] hover:text-black shadow-xs'
      } ${className}`}
      style={{ willChange: 'transform' }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>

      {/* Concurrent, instantaneous icon crossfade & spring rotation (130ms) without mode="wait" lag */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.div
              key="sun-icon"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0, position: 'absolute' }}
              transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
              className="theme-toggle-icon flex items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <Sun className="w-4 h-4 text-[#CDFF00] drop-shadow-[0_0_8px_rgba(205,255,0,0.6)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon-icon"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0, position: 'absolute' }}
              transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
              className="theme-toggle-icon flex items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <Moon className="w-4 h-4 text-[#11161B]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-bold uppercase tracking-wider">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
