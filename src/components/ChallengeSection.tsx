import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionTransitions';
import { Search, EyeOff, PhoneCall, Network } from 'lucide-react';

interface ChallengeCardData {
  number: string;
  problemLabel: string;
  title: string;
  description: string;
  impact: string;
  icon: React.ElementType;
}

const CHALLENGES: ChallengeCardData[] = [
  {
    number: '01',
    problemLabel: 'Problem 01',
    title: 'Scattered Across Apps',
    description:
      'Match schedules, venue rates, and team tryouts are scattered across private WhatsApp chats, Instagram stories, and outdated websites.',
    impact: 'No single place to search',
    icon: Search,
  },
  {
    number: '02',
    problemLabel: 'Problem 02',
    title: 'Hidden Grounds & Teams',
    description:
      'Great local grounds, weekend leagues, and coaching academies stay hidden unless you already know someone on the inside.',
    impact: 'Courts sit empty; players miss out',
    icon: EyeOff,
  },
  {
    number: '03',
    problemLabel: 'Problem 03',
    title: 'Endless Phone Tag',
    description:
      'Reserving a pitch or entering a tournament requires calling venue managers, waiting on chat replies, and manual bank transfers.',
    impact: 'Slow replies & double-bookings',
    icon: PhoneCall,
  },
  {
    number: '04',
    problemLabel: 'Problem 04',
    title: 'Everything Disconnected',
    description:
      'Turf bookings, leagues, youth academies, and local clubs all run in separate silos with zero connection between them.',
    impact: 'No unified home for local sports',
    icon: Network,
  },
];

export const ChallengeSection: React.FC<{ onNavigateToSolution: () => void }> = ({
  onNavigateToSolution,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      id="challenge-section"
      className="bg-white py-12 sm:py-16 border-b border-[#E5EAED] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple, clear Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2">
          <FadeIn>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/20" />
              <span>Current Landscape Analysis</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-display tracking-tight text-balance leading-tight">
              Sports opportunities exist.{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#222222]">Finding them</span>
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#CDFF00] -z-0 rounded-xs" />
              </span>{' '}
              shouldn&apos;t be the challenge.
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-xl">
              High coordination friction, unlisted schedules, and scattered channels prevent athletes,
              facilities, and communities from finding each other effortlessly.
            </p>
          </FadeIn>
        </div>

        {/* 4 Cards: Clean, animated interactive problem analysis cards */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {CHALLENGES.map((item, idx) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.number}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 350, damping: 20 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white border border-[#E5EAED] hover:border-[#CDFF00] rounded-xl p-5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
                >
                  {/* Animated top lime highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Top row: Animated Icon & Problem label */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-[#F2F3F7] group-hover:bg-[#CDFF00] flex items-center justify-center text-[#222222] group-hover:text-[#11161B] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
                        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#9CA3AF] group-hover:text-[#222222] px-2 py-0.5 rounded group-hover:bg-neutral-100 transition-colors">
                        {item.problemLabel}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-[#222222] group-hover:text-black font-display tracking-tight mb-2 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#6B7280] group-hover:text-[#4B5563] leading-relaxed transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Takeaway: What this means in real life */}
                  <div className="mt-5 pt-3.5 border-t border-[#F2F3F7] group-hover:border-[#E5EAED] flex items-center gap-1.5 text-[11px] text-[#4B5563] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 group-hover:border-[#222222] group-hover:scale-125 transition-all duration-200 shrink-0" />
                    <span className="font-medium text-[#222222] leading-snug group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.impact}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </motion.section>
  );
};
