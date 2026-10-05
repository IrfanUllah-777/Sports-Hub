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
      className="bg-[#222222] text-[#FFFFFF] pt-16 pb-12 border-t border-neutral-800 bg-dark-grid-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                SPORTS HUB
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#CDFF00]" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-[#CDFF00]">
              Connecting People, Places &amp; Opportunities in Sports.
            </p>
            <p className="text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              Sports Hub is an emerging digital sports ecosystem concept designed to bring athletes,
              facilities, academies, tournament organizers, and local sports communities into one
              connected, accessible environment.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#9CA3AF]">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#CDFF00]" />
                Digital Sports Infrastructure
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#CDFF00]" />
                Global Vision · Local Focus
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ecosystem Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#CDFF00] transition-colors cursor-pointer text-left"
                >
                  Home &amp; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gap')}
                  className="hover:text-[#CDFF00] transition-colors cursor-pointer text-left"
                >
                  The Fragmented Gap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solution')}
                  className="hover:text-[#CDFF00] transition-colors cursor-pointer text-left"
                >
                  The Digital Solution
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('opportunities')}
                  className="hover:text-[#CDFF00] transition-colors cursor-pointer text-left"
                >
                  Sports Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vision')}
                  className="hover:text-[#CDFF00] transition-colors cursor-pointer text-left"
                >
                  Vision &amp; Impact
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholder Channels & Get Involved */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stakeholder Access
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => onOpenGetInvolved('athlete')}
                  className="hover:text-[#CDFF00] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  Athletes &amp; Players
                  <ArrowUpRight className="w-3 h-3 text-[#CDFF00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('facility_owner')}
                  className="hover:text-[#CDFF00] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  Facility Operators
                  <ArrowUpRight className="w-3 h-3 text-[#CDFF00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('academy_coach')}
                  className="hover:text-[#CDFF00] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  Coaching Academies
                  <ArrowUpRight className="w-3 h-3 text-[#CDFF00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('organizer')}
                  className="hover:text-[#CDFF00] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  Tournament Organizers
                  <ArrowUpRight className="w-3 h-3 text-[#CDFF00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGetInvolved('community_leader')}
                  className="hover:text-[#CDFF00] transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  Sports Communities
                  <ArrowUpRight className="w-3 h-3 text-[#CDFF00]" />
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={() => onOpenGetInvolved('athlete')}
                className="w-full py-2 px-3 text-xs font-bold text-[#222222] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                Join Early Ecosystem
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
          <p>© {new Date().getFullYear()} Sports Hub Concept Initiative. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#9CA3AF]">A digital sports ecosystem showcase</span>
            <span className="text-[#4B5563]">·</span>
            <span className="text-[#CDFF00] font-medium">Design &amp; Innovation Framework</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
