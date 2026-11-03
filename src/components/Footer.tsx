import React from 'react';
import { motion } from 'framer-motion';
import { PageId, StakeholderRole } from '../types';
import { ArrowUpRight, Mail, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGetInvolved }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-[#222222] text-[#FFFFFF] pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-neutral-800 bg-dark-grid-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid: 1-col on mobile (<768px), 2-col on tablet (768px-1023px), 4-col on desktop (1024px+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-8 sm:pb-12 border-b border-neutral-800">
          
          {/* 1. Brand Column (spans 2 columns on tablet & desktop) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                SPORTS HUB
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#CDFF00]" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-[#CDFF00]">
              Connecting People, Places &amp; Opportunities in Sports.
            </p>
            <p className="text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              Sports Hub is a unified digital sports infrastructure engineered to connect athletes,
              facilities, academies, tournament organizers, and active communities into one
              accessible, high-performance ecosystem.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-[#9CA3AF]">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#CDFF00] shrink-0" />
                Digital Sports Infrastructure
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#CDFF00] shrink-0" />
                Global Vision · Local Focus
              </span>
            </div>
          </div>

          {/* 2. Navigation Column (1 column) */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00]" />
              Ecosystem Navigation
            </h4>
            <ul className="space-y-1 text-sm text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="py-1.5 min-h-[38px] flex items-center hover:text-[#CDFF00] transition-colors cursor-pointer text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  Home &amp; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gap')}
                  className="py-1.5 min-h-[38px] flex items-center hover:text-[#CDFF00] transition-colors cursor-pointer text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  The Fragmented Gap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solution')}
                  className="py-1.5 min-h-[38px] flex items-center hover:text-[#CDFF00] transition-colors cursor-pointer text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  The Digital Solution
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('opportunities')}
                  className="py-1.5 min-h-[38px] flex items-center hover:text-[#CDFF00] transition-colors cursor-pointer text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  Sports Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vision')}
                  className="py-1.5 min-h-[38px] flex items-center hover:text-[#CDFF00] transition-colors cursor-pointer text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  Vision &amp; Impact
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Stakeholder Access & Action Column (1 column) */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00]" />
              Stakeholder Access
            </h4>
            <ul className="space-y-1 text-sm text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => onOpenGetInvolved('athlete')}
                  className="py-1.5 min-h-[38px] hover:text-[#CDFF00] transition-colors text-left flex items-center justify-between group cursor-pointer w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span>Athletes &amp; Players</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CDFF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('facility_owner')}
                  className="py-1.5 min-h-[38px] hover:text-[#CDFF00] transition-colors text-left flex items-center justify-between group cursor-pointer w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span>Facility Operators</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CDFF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('academy_coach')}
                  className="py-1.5 min-h-[38px] hover:text-[#CDFF00] transition-colors text-left flex items-center justify-between group cursor-pointer w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span>Coaching Academies</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CDFF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('organizer')}
                  className="py-1.5 min-h-[38px] hover:text-[#CDFF00] transition-colors text-left flex items-center justify-between group cursor-pointer w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span>Tournament Organizers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CDFF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('community_leader')}
                  className="py-1.5 min-h-[38px] hover:text-[#CDFF00] transition-colors text-left flex items-center justify-between group cursor-pointer w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDFF00] rounded"
                >
                  <span>Sports Communities</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CDFF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onOpenGetInvolved('athlete')}
                className="w-full py-2.5 min-h-[44px] px-4 text-xs sm:text-sm font-bold text-[#222222] bg-[#CDFF00] hover:bg-[#9ECC00] active:scale-[0.99] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Join Early Ecosystem</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Stacked on mobile (<640px), horizontal flex on tablet & desktop */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Sports Hub Concept Initiative. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-center sm:text-right">
            <span className="text-[#9CA3AF]">A digital sports ecosystem showcase</span>
            <span className="text-[#4B5563]" aria-hidden="true">·</span>
            <span className="text-[#CDFF00] font-medium">Design &amp; Innovation Framework</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
