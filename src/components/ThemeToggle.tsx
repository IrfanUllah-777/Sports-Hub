import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 0.98,
        transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
      }}
      className={`theme-toggle-btn relative inline-flex items-center justify-center w-9 h-9 rounded-xl border cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] focus-visible:ring-offset-2 transition-colors duration-200 overflow-hidden ${
        isDark
          ? 'bg-[#1F2530] text-[#CDFF00] border-[#2A313C] hover:bg-[#27303E] hover:border-[#CDFF00]/50 shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
          : 'bg-[#F2F3F7] text-[#222222] border-[#E5EAED] hover:bg-[#E2E8F0] hover:text-black shadow-xs'
      } ${className}`}
      style={{ willChange: 'transform' }}
      aria-label={
        isDark
          ? 'Switch to light mode (currently dark mode)'
          : 'Switch to dark mode (currently light mode)'
      }
      title={
        isDark
          ? 'Switch to light mode (currently dark mode)'
          : 'Switch to dark mode (currently light mode)'
      }
    >
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun-icon"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="theme-toggle-icon flex items-center justify-center relative z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <Sun className="w-4 h-4 text-[#CDFF00] drop-shadow-[0_0_6px_rgba(205,255,0,0.4)]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="theme-toggle-icon flex items-center justify-center relative z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <Moon className="w-4 h-4 text-[#222222]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
export default ThemeToggle;
