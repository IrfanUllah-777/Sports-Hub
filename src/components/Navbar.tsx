import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId, NavItem, StakeholderRole } from '../types';
import { Menu, X, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

interface NavItemExtended extends NavItem {
  subtitle: string;
}

const NAV_ITEMS: NavItemExtended[] = [
  { id: 'home', label: 'Home', subtitle: 'Overview & Highlights' },
  { id: 'gap', label: 'The Gap', subtitle: 'Ecosystem Challenges' },
  { id: 'solution', label: 'Solution', subtitle: 'Unified Architecture' },
  { id: 'opportunities', label: 'Opportunities', subtitle: 'Value Across Roles' },
  { id: 'vision', label: 'Vision', subtitle: 'Milestones & Impact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenGetInvolved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll on small screens when mobile drawer is open
  useBodyScrollLock(mobileMenuOpen);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Auto-close drawer on viewport resize to tablet/desktop (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#161B22]/95 backdrop-blur-md border-b border-[#E5EAED] dark:border-[#2A313C] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] dark:focus-visible:ring-[#CDFF00] rounded-md px-1 py-0.5"
            aria-label="Sports Hub Home"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#222222] dark:text-[#F3F4F6] font-display flex items-center">
              SPORTS HUB
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#CDFF00] ml-1.5 ring-2 ring-[#222222]/10 dark:ring-white/20 border border-[#9ECC00]" />
            </span>
          </button>

          {/* Zone 2: 5 clean text navigation links (Desktop: >= 768px) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6B7280] dark:text-[#D5D8DD]">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] rounded ${
                    isActive
                      ? 'text-[#222222] dark:text-[#F3F4F6] font-bold'
                      : 'hover:text-[#222222] dark:hover:text-[#F3F4F6]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#222222] dark:bg-[#CDFF00] rounded-full shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Action & Theme Toggle in top right corner (Desktop: >= 768px) */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => onOpenGetInvolved('athlete')}
              whileHover={{ scale: 1.025, y: -1, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
              whileTap={{
                scale: 0.98,
                transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
              }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#11161B] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-lg transition-colors border border-[#9ECC00] shadow-xs cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] dark:focus-visible:ring-[#CDFF00]"
            >
              Get Involved
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls: ThemeToggle + Hamburger Button (< 768px) */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-haspopup="dialog"
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#222222] dark:text-[#F3F4F6] hover:bg-[#F2F3F7] dark:hover:bg-[#1F2530] active:scale-95 rounded-xl border border-transparent hover:border-[#E5EAED] dark:hover:border-[#2A313C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] cursor-pointer transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer & Backdrop (< 768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              key="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
              aria-hidden="true"
            />

            {/* Slide-Out Drawer Panel */}
            <motion.div
              key="mobile-drawer-panel"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-[min(340px,86vw)] h-full bg-white dark:bg-[#12171F] z-50 shadow-2xl flex flex-col border-l border-[#E5EAED] dark:border-[#2A313C] overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="h-16 sm:h-18 px-5 flex items-center justify-between border-b border-[#E5EAED] dark:border-[#2A313C] shrink-0 bg-white dark:bg-[#161B22]">
                <button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-1.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span className="text-xl font-black tracking-tight text-[#222222] dark:text-[#F3F4F6] font-display flex items-center">
                    SPORTS HUB
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#CDFF00] ml-1.5 ring-2 ring-[#222222]/10 dark:ring-white/20 border border-[#9ECC00]" />
                  </span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#6B7280] dark:text-[#D5D8DD] hover:text-[#222222] dark:hover:text-white hover:bg-[#F2F3F7] dark:hover:bg-[#1F2530] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-6">
                {/* Navigation Links */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6B7280] px-2 mb-2.5">
                    Navigation
                  </div>
                  <nav className="flex flex-col space-y-1.5">
                    {NAV_ITEMS.map((item) => {
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`group flex items-center justify-between px-3.5 py-3 min-h-[48px] rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#F8FFD9] dark:bg-[#CDFF00]/15 text-[#222222] dark:text-[#F3F4F6] font-bold border border-[#CDFF00]/60 dark:border-[#CDFF00]/40 shadow-xs'
                              : 'text-[#4B5563] dark:text-[#D5D8DD] hover:bg-[#F2F3F7] dark:hover:bg-[#1A212D] hover:text-[#222222] dark:hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold tracking-tight leading-snug">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-normal mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <span className="w-2 h-2 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/20 dark:ring-[#CDFF00]/40" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[#9CA3AF] dark:text-[#6B7280] group-hover:text-[#222222] dark:group-hover:text-[#CDFF00] group-hover:translate-x-0.5 transition-all" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Quick Actions & Get Involved */}
                <div className="pt-2 border-t border-[#E5EAED] dark:border-[#2A313C] space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6B7280] px-2">
                    Take Action
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenGetInvolved('athlete');
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                    }}
                    className="w-full py-3.5 min-h-[48px] px-4 text-xs font-bold uppercase tracking-wider text-[#11161B] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#CDFF00]/20 border border-[#9ECC00]"
                  >
                    <span>Get Involved with Sports Hub</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>

                  {/* Secondary Fast Action: Explore Ground Directory */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('solution')}
                    className="w-full py-2.5 min-h-[44px] px-3 rounded-lg text-xs font-medium text-[#4B5563] dark:text-[#D5D8DD] hover:bg-[#F2F3F7] dark:hover:bg-[#1A212D] text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E5EAED] dark:border-[#2A313C]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#9ECC00] dark:text-[#CDFF00]" />
                    <span>Explore Platform Infrastructure</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[#E5EAED] dark:border-[#2A313C] bg-[#FAFBFD] dark:bg-[#161B22] shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4B5563] dark:text-[#D5D8DD]">
                    Color Theme
                  </span>
                  <ThemeToggle />
                </div>
                <div className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] text-center font-medium">
                  Sports Hub • Digital Sports Infrastructure
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
