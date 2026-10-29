import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionTransitions';
import {
  Search,
  EyeOff,
  PhoneCall,
  Network,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ChallengeCardData {
  id: string;
  number: string;
  problemLabel: string;
  category: string;
  title: string;
  description: string;
  impact: string;
  solutionLink: string;
  icon: React.ElementType;
}

const CATEGORIES = [
  { id: 'all', label: 'All Challenges', count: 4 },
  { id: 'discovery', label: '01 Discovery', count: 1 },
  { id: 'visibility', label: '02 Grounds & Access', count: 1 },
  { id: 'booking', label: '03 Booking Friction', count: 1 },
  { id: 'network', label: '04 Disconnected Silos', count: 1 },
];

const CHALLENGES: ChallengeCardData[] = [
  {
    id: 'discovery',
    number: '01',
    problemLabel: 'Problem 01',
    category: 'Discovery & Search',
    title: 'Scattered Across Channels',
    description:
      'Match schedules, venue rates, and team tryouts remain fragmented across private messaging groups, ephemeral social stories, and unindexed websites.',
    impact: 'No centralized directory to compare verified options',
    solutionLink: 'Unified Discovery & Search',
    icon: Search,
  },
  {
    id: 'visibility',
    number: '02',
    problemLabel: 'Problem 02',
    category: 'Grounds & Access',
    title: 'Hidden Grounds & Leagues',
    description:
      'High-grade local grounds, weekend tournaments, and certified coaching academies stay hidden without direct personal insider connections.',
    impact: 'Facilities sit underutilized while eager athletes miss competition',
    solutionLink: 'Verified Venue Directory',
    icon: EyeOff,
  },
  {
    id: 'booking',
    number: '03',
    problemLabel: 'Problem 03',
    category: 'Booking & Operations',
    title: 'High-Friction Coordination',
    description:
      'Reserving a pitch or entering a tournament requires unconfirmed phone calls, delayed chat responses, and unstructured manual wire transfers.',
    impact: 'Delayed confirmations, lost slots & double-booking risks',
    solutionLink: 'Real-Time Direct Reservations',
    icon: PhoneCall,
  },
  {
    id: 'network',
    number: '04',
    problemLabel: 'Problem 04',
    category: 'Ecosystem Architecture',
    title: 'Isolated Sporting Silos',
    description:
      'Facility bookings, competitive leagues, coaching academies, and community clubs operate in disjointed silos with zero shared digital infrastructure.',
    impact: 'Absence of an integrated foundation for local sports',
    solutionLink: 'Interlinked Digital Substrate',
    icon: Network,
  },
];

export const ChallengeSection: React.FC<{ onNavigateToSolution: () => void }> = ({
  onNavigateToSolution,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const displayedChallenges =
    selectedFilter === 'all'
      ? CHALLENGES
      : CHALLENGES.filter((c) => c.id === selectedFilter);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      id="challenge-section"
      className="bg-white dark:bg-[#161B22] py-14 sm:py-20 border-b border-[#E5EAED] dark:border-[#2A313C] relative overflow-hidden transition-colors duration-200"
    >
      {/* Subtle background ambient lighting accent */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#CDFF00]/10 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block with enhanced typography & eyebrow badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl space-y-3">
            {/* Top eyebrow badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F5F7] dark:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] text-sports-badge text-[#222222] dark:text-[#F3F4F6]">
                <span className="w-2 h-2 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/30 dark:ring-white/30" />
                <span>Current Landscape Analysis</span>
                <span className="text-[#9CA3AF] dark:text-[#A4ABB6] font-normal">|</span>
                <span className="text-[#6B7280] dark:text-[#D5D8DD] font-sports text-xs font-bold uppercase tracking-wider">
                  4 friction points
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <FadeIn delay={0.04}>
              <h2 className="text-heading-2 font-display text-[#222222] dark:text-[#F3F4F6] tracking-tight text-balance leading-tight">
                Sports opportunities exist.{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#222222] dark:text-[#F3F4F6]">Finding them</span>
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#CDFF00] -z-0 rounded-xs" />
                </span>{' '}
                shouldn&apos;t be the challenge.
              </h2>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.08}>
              <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#D5D8DD] font-body leading-relaxed max-w-2xl">
                High coordination friction, unlisted schedules, and scattered channels prevent athletes,
                facilities, and communities from finding each other effortlessly.
              </p>
            </FadeIn>
          </div>

          {/* Quick link button to solution - Prominently visible and styled */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={onNavigateToSolution}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#11161B] bg-[#CDFF00] hover:bg-[#D6FF33] active:bg-[#B8E600] border-2 border-[#9ECC00] hover:border-[#CDFF00] rounded-xl shadow-[0_2px_12px_rgba(205,255,0,0.30)] hover:shadow-[0_4px_20px_rgba(205,255,0,0.45)] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] dark:focus-visible:ring-[#CDFF00] active:scale-[0.98] select-none z-10"
              style={{ display: 'inline-flex', opacity: 1, visibility: 'visible' }}
            >
              <span>Explore Our Solution</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0 text-[#11161B]" />
            </button>
          </div>
        </div>

        {/* Enhanced Interactive Filter Menu / Segmented Pills Bar (Request 9) */}
        <FadeIn delay={0.14} className="mb-8">
          <div className="p-1.5 bg-[#F4F5F7] dark:bg-[#1F2530] rounded-2xl border border-[#E5EAED] dark:border-[#2A313C] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#6B7280] dark:text-[#D5D8DD] border-r border-[#E5EAED] dark:border-[#2A313C] shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#222222] dark:text-[#F3F4F6]" />
              <span className="uppercase tracking-wider text-[11px]">Filter:</span>
            </div>

            <div className="flex items-center gap-1.5 min-w-max w-full sm:w-auto">
              {CATEGORIES.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] dark:focus-visible:ring-[#CDFF00] ${
                      isActive
                        ? 'text-[#222222] dark:text-[#F3F4F6] shadow-sm'
                        : 'text-[#6B7280] dark:text-[#D5D8DD] hover:text-[#222222] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeChallengeFilterPill"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        className="absolute inset-0 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl -z-0"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] ring-1 ring-[#222222]/20 dark:ring-white/30" />
                      )}
                      <span>{tab.label}</span>
                    </span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-md font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#CDFF00] text-[#11161B]'
                          : 'bg-[#E5EAED]/80 dark:bg-[#2A313C] text-[#6B7280] dark:text-[#D5D8DD]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* 4 Cards Grid: Polished, responsive, high-end interactive cards (Request 10) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`grid gap-4 sm:gap-6 ${
              displayedChallenges.length === 1
                ? 'grid-cols-1 max-w-xl mx-auto'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {displayedChallenges.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredCardId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                  }}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={onNavigateToSolution}
                  className="group relative bg-white dark:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-2xl p-5 sm:p-6 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] dark:hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.4),0_0_0_1px_#CDFF00] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
                >
                  {/* Animated top lime highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Corner ambient glow on hover */}
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 bg-[#CDFF00]/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Card Main Body */}
                  <div className="relative z-10">
                    {/* Top Row: Icon Container & Problem Label */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Polished layered icon container */}
                      <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] dark:bg-[#161B22] group-hover:bg-[#222222] dark:group-hover:bg-[#CDFF00] border border-[#E5EAED] dark:border-[#2A313C] group-hover:border-[#222222] dark:group-hover:border-[#CDFF00] flex items-center justify-center text-[#222222] dark:text-[#F3F4F6] group-hover:text-[#CDFF00] dark:group-hover:text-[#11161B] group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                        <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Problem Number badge */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-sports font-bold tracking-wider uppercase text-[#6B7280] dark:text-[#D5D8DD] group-hover:text-[#11161B] bg-[#F4F5F7] dark:bg-[#161B22] group-hover:bg-[#CDFF00] px-2 py-0.5 rounded-md border border-[#E5EAED] dark:border-[#2A313C] group-hover:border-[#CDFF00] transition-all duration-200">
                          {item.problemLabel}
                        </span>
                      </div>
                    </div>

                    {/* Category micro-tag */}
                    <div className="text-sports-tag text-[11px] text-[#9CA3AF] dark:text-[#A4ABB6] group-hover:text-[#6B7280] dark:group-hover:text-[#D5D8DD] mb-1.5 transition-colors">
                      {item.category}
                    </div>

                    {/* Headline */}
                    <h3 className="text-card-title font-display text-[#11161B] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white tracking-tight mb-2 leading-snug transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-xs sm:text-[13px] text-[#6B7280] dark:text-[#D5D8DD] group-hover:text-[#374151] dark:group-hover:text-white leading-relaxed transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom: Takeaway / Impact Capsule */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-[#F4F5F7] dark:border-[#2A313C] group-hover:border-[#E5EAED] dark:group-hover:border-white/20 transition-colors space-y-2.5">
                    {/* Impact capsule */}
                    <div className="bg-[#F9FAFB] dark:bg-[#161B22] group-hover:bg-[#F4F5F7] dark:group-hover:bg-[#1C222C] rounded-xl p-2.5 border border-[#E5EAED]/80 dark:border-[#2A313C] group-hover:border-[#CDFF00]/60 transition-all flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover:border-[#222222] group-hover:scale-110 transition-all duration-200 mt-1 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#A4ABB6] group-hover:text-[#6B7280] dark:group-hover:text-[#D5D8DD]">
                          Direct Impact
                        </div>
                        <div className="text-[11.5px] font-semibold text-[#1F2937] dark:text-[#F3F4F6] leading-tight mt-0.5">
                          {item.impact}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Solution Hint Link */}
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#6B7280] dark:text-[#D5D8DD] group-hover:text-[#11161B] dark:group-hover:text-[#CDFF00] pt-0.5 transition-colors">
                      <span className="flex items-center gap-1 text-[#222222] dark:text-[#F3F4F6] font-semibold">
                        <Sparkles className="w-3 h-3 text-[#9ECC00] group-hover:text-[#7EA600]" />
                        <span>{item.solutionLink}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#222222] dark:text-[#F3F4F6]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
