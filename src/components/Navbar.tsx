import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId, NavItem, StakeholderRole } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'gap', label: 'The Gap' },
  { id: 'solution', label: 'Solution' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'vision', label: 'Vision' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenGetInvolved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5EAED] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded-md px-1 py-0.5"
          aria-label="Sports Hub Home"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#222222] font-display flex items-center">
            SPORTS HUB
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#CDFF00] ml-1.5 ring-2 ring-[#222222]/10 border border-[#9ECC00]"></span>
          </span>
        </button>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6B7280]">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] rounded ${
                  isActive ? 'text-[#222222] font-bold' : 'hover:text-[#222222]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#222222] rounded-full shadow-xs"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenGetInvolved('athlete')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#222222] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-lg transition-all border border-[#9ECC00] shadow-xs cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
          >
            Get Involved
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#222222] hover:bg-[#F2F3F7] rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="md:hidden border-b border-[#E5EAED] bg-white px-4 pt-2 pb-5 space-y-2 shadow-lg"
          >
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#F8FFD9] text-[#222222] font-bold border-l-4 border-[#CDFF00]'
                        : 'text-[#6B7280] hover:bg-[#F2F3F7] hover:text-[#222222]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#CDFF00] border border-[#222222]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 border-t border-[#E5EAED]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetInvolved('athlete');
                }}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#222222] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                Get Involved with Sports Hub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
