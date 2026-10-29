import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageId, StakeholderRole } from '../../types';
import { FadeIn, StaggerContainer, StaggerItem } from '../MotionTransitions';
import { 
  ArrowDown, 
  ArrowRight, 
  HelpCircle, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface GapPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Seeking an Athletic Opportunity',
    desc: 'An athlete, recreational squad, or parent seeks to reserve a quality pitch, enter a sanctioned tournament, or find certified coaching.',
    friction: 'High motivation met with no unified, verified directory.',
  },
  {
    step: '02',
    title: 'Fragmented Information Channels',
    desc: 'Critical schedules, pricing sheets, and rules are scattered across unstructured message threads, ephemeral social posts, and outdated blogs.',
    friction: 'Inconsistent pricing, unverified venue details, and unlisted organizers.',
  },
  {
    step: '03',
    title: 'Restricted Facility & League Visibility',
    desc: 'High-quality community venues, grassroots leagues, and certified academies remain concealed without direct insider relationships.',
    friction: 'Underutilized grounds and eager participants sidelined.',
  },
  {
    step: '04',
    title: 'Manual Coordination Bottlenecks',
    desc: 'Confirming a pitch slot or tournament berth requires back-and-forth phone calls, waiting on messaging replies, and manual banking receipts.',
    friction: 'Administrative drag, double-booking disputes, and lost registrations.',
  },
  {
    step: '05',
    title: 'Exhausting Comparison & Due Diligence',
    desc: 'Comparing venues by turf quality, floodlighting, distance, and competitive tiers demands repetitive manual research across disparate sources.',
    friction: 'Friction and fatigue mount before a single ball is struck.',
  },
  {
    step: '06',
    title: 'Lost Athletic Momentum & Vacant Slots',
    desc: 'Squads miss registration cutoffs, courts sit unbooked in off-peak windows, and academies struggle to reach aspiring regional talent.',
    friction: 'A fragmented ecosystem where demand and infrastructure fail to synchronize.',
  },
];

export const GapPage: React.FC<GapPageProps> = ({ onNavigate, onOpenGetInvolved }) => {
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(0);

  return (
    <div className="w-full">
      {/* 1. HERO */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] dark:bg-[#0E1217] pt-14 pb-18 border-b border-[#E5EAED] dark:border-[#2A313C] transition-colors duration-200"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-sports-badge text-[#6B7280] dark:text-[#D5D8DD]">
            <span>Systemic Analysis</span>
            <span className="text-[#9ECC00]">·</span>
            <span>The Sports Disconnect</span>
          </div>

          <h1 className="text-heading-1 font-display text-[#222222] dark:text-[#F3F4F6] text-balance leading-tight">
            Bridging the Gap in the{' '}
            <span className="text-highlight-neon">
              Sports Ecosystem
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#D5D8DD] font-body max-w-3xl mx-auto leading-relaxed">
            The systemic issue is rarely a shortage of sporting desire. The core challenge is the
            structural friction preventing grounds, tournament leagues, and coaching academies from
            being easily discovered, verified, and booked.
          </p>
        </FadeIn>
      </motion.section>

      {/* 2. CURRENT JOURNEY FLOW */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white dark:bg-[#161B22] py-20 border-b border-[#E5EAED] dark:border-[#2A313C] transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-12">
            <span className="text-sports-badge text-[#6B7280] dark:text-[#D5D8DD]">
              Friction Funnel Analysis
            </span>
            <h2 className="text-heading-2 font-display text-[#222222] dark:text-[#F3F4F6] mt-2">
              The Current Fragmented Journey
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#D5D8DD] font-body mt-3">
              Follow the friction path athletes and organizers experience today when attempting to arrange a match or enter a competition. Notice how administrative drag compounds at every milestone.
            </p>
          </FadeIn>

          {/* Vertical / Horizontal Journey Connector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step list with #CDFF00 connectors */}
            <div className="lg:col-span-7 space-y-4">
              {JOURNEY_STEPS.map((step, idx) => {
                const isSelected = selectedJourneyIndex === idx;
                const isLast = idx === JOURNEY_STEPS.length - 1;

                return (
                  <FadeIn key={step.step} delay={idx * 0.05} direction="up" distance={12}>
                    <div className="relative">
                      {/* Connector line */}
                      {!isLast && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#CDFF00]" />
                      )}

                      <motion.div
                        onClick={() => setSelectedJourneyIndex(idx)}
                        whileHover={{
                          y: -3,
                          scale: 1.015,
                          transition: { type: 'spring', stiffness: 350, damping: 20 },
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                        }}
                        className={`group relative z-10 flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                          isSelected
                            ? 'bg-[#F8FFD9] dark:bg-[#CDFF00]/15 border-[#222222] dark:border-[#CDFF00] ring-2 ring-[#CDFF00] shadow-sm'
                            : 'bg-white dark:bg-[#1F2530] border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00]'
                        }`}
                      >
                        {/* Animated top lime highlight bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                        {/* Step Badge */}
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-300 group-hover:scale-105 ${
                            isSelected
                              ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#11161B]'
                              : 'bg-[#F2F3F7] dark:bg-[#161B22] text-[#222222] dark:text-[#F3F4F6] group-hover:bg-[#CDFF00] group-hover:text-[#11161B]'
                          }`}
                        >
                          {step.step}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white transition-colors">
                              {step.title}
                            </h3>
                            {isSelected && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDFF00] text-[#11161B] px-2 py-0.5 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#D5D8DD] group-hover:text-[#4B5563] dark:group-hover:text-white leading-relaxed transition-colors">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Stage Inspection Sidebar */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-5 sticky top-24">
              <div className="bg-[#222222] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#CDFF00] space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
                  <span className="text-xs font-bold text-[#CDFF00] uppercase tracking-wider">
                    Friction Analysis
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    STAGE {JOURNEY_STEPS[selectedJourneyIndex].step} / 06
                  </span>
                </div>

                <h4 className="text-xl font-bold font-display text-white">
                  {JOURNEY_STEPS[selectedJourneyIndex].title}
                </h4>

                <div className="space-y-2 text-sm text-neutral-300">
                  <p className="leading-relaxed">
                    {JOURNEY_STEPS[selectedJourneyIndex].desc}
                  </p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#CDFF00]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Impact of Friction
                  </div>
                  <p className="text-xs text-neutral-300">
                    {JOURNEY_STEPS[selectedJourneyIndex].friction}
                  </p>
                </div>

                <div className="pt-2 text-xs text-neutral-400">
                  Sports Hub eliminates this manual bottleneck by consolidating discovery, schedules, and direct access into one digital ecosystem.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </motion.section>

      {/* 3. DIGITAL GAP SPLIT-SCREEN LAYOUT */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] dark:bg-[#0E1217] py-20 border-b border-[#E5EAED] dark:border-[#2A313C] transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-sports-badge text-[#6B7280] dark:text-[#D5D8DD]">
              Market Topology
            </span>
            <h2 className="text-heading-2 font-display text-[#222222] dark:text-[#F3F4F6]">
              The Digital Divide
            </h2>
            <p className="text-base text-[#6B7280] dark:text-[#D5D8DD] font-body max-w-2xl mx-auto">
              High demand and quality supply exist in the same geography, yet remain walled off by
              the absence of a neutral digital fabric.
            </p>
          </FadeIn>

          {/* Split Screen container with Dark Center Block */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            
            {/* Left: PEOPLE LOOKING FOR OPPORTUNITIES */}
            <motion.div
              initial={{ opacity: 0, x: -8, rotateY: 2 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
              }}
              className="lg:col-span-4 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] dark:hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.4),0_0_0_1px_#CDFF00] transition-all duration-300 relative group overflow-hidden cursor-default"
            >
              {/* Animated top lime highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="flex items-center gap-2.5 border-b border-[#E5EAED] dark:border-[#2A313C] pb-3">
                <div className="w-9 h-9 rounded-lg bg-[#F8FFD9] dark:bg-[#CDFF00]/15 group-hover:bg-[#CDFF00] border border-[#CDFF00]/60 flex items-center justify-center text-[#222222] dark:text-[#CDFF00] group-hover:text-[#11161B] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-2xs">
                  <Users className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
                  Athletes &amp; Active Communities
                </h3>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Competitive Athletes</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Seeking verified open tryouts, sanctioned tournaments, and skill benchmarks.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Recreational Players</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Searching for available courts, premium floodlit turfs, and reliable match partners.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Fitness Enthusiasts</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Looking to participate in community 5Ks, cycling rides, and casual drop-in sessions.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Teams &amp; Squads</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Requiring consistent training pitches, friendly sparring fixtures, and league entry.
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Center: Strong Dark Block #222222 with Lime Accents #CDFF00 */}
            <FadeIn direction="up" delay={0.05} className="lg:col-span-3 bg-[#222222] dark:bg-[#0E1217] border-2 border-[#CDFF00] rounded-2xl p-6 text-center text-white space-y-4 shadow-xl flex flex-col items-center justify-center my-2 lg:my-0">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#CDFF00] text-[#11161B] font-black text-sm">
                SH
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#CDFF00] uppercase block">
                  The Connecting Bridge
                </span>
                <h4 className="text-xl font-black text-white font-display mt-0.5">
                  SPORTS HUB
                </h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                A shared, neutral digital ecosystem providing verified discovery, structured
                listings, and streamlined engagement between both sides.
              </p>
              <div className="w-full flex items-center justify-center gap-2 pt-2 border-t border-neutral-700 text-[11px] text-[#CDFF00] font-semibold">
                <span>Direct Digital Connection</span>
              </div>
            </FadeIn>

            {/* Right: PEOPLE PROVIDING OPPORTUNITIES */}
            <motion.div
              initial={{ opacity: 0, x: 8, rotateY: -2 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
              }}
              className="lg:col-span-4 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] dark:hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.4),0_0_0_1px_#CDFF00] transition-all duration-300 relative group overflow-hidden cursor-default"
            >
              {/* Animated top lime highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="flex items-center gap-2.5 border-b border-[#E5EAED] dark:border-[#2A313C] pb-3">
                <div className="w-9 h-9 rounded-lg bg-[#F8FFD9] dark:bg-[#CDFF00]/15 group-hover:bg-[#CDFF00] border border-[#CDFF00]/60 flex items-center justify-center text-[#222222] dark:text-[#CDFF00] group-hover:text-[#11161B] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-2xs">
                  <Building2 className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
                  Venues, Academies &amp; Organizers
                </h3>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Sports Facilities &amp; Grounds</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Wanting higher slot occupancy, digital bookings, and predictable revenue.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Academies &amp; Certified Coaches</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Seeking to reach prospective students and publicize training modules.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Tournament Organizers</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Promoting leagues, filling brackets, and publishing match schedules.
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  className="p-3 bg-[#F2F3F7] dark:bg-[#1F2530] hover:bg-white dark:hover:bg-[#27303E] border border-transparent hover:border-[#CDFF00] rounded-lg transition-all duration-200 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05),0_0_0_1px_#CDFF00] group/item cursor-default"
                >
                  <div className="font-bold text-xs text-[#222222] dark:text-[#F3F4F6] group-hover/item:text-black dark:group-hover/item:text-white transition-colors flex items-center justify-between">
                    <span>Sports Organizations</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 dark:border-white/30 group-hover/item:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD] group-hover/item:text-[#4B5563] dark:group-hover/item:text-white mt-0.5 transition-colors">
                    Fostering grassroots engagement, event participation, and sport growth.
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 4. BEFORE / WITH SPORTS HUB COMPARISON */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white dark:bg-[#161B22] py-20 transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-sports-badge text-[#6B7280] dark:text-[#D5D8DD]">
              Comparative Evaluation
            </span>
            <h2 className="text-heading-2 font-display text-[#222222] dark:text-[#F3F4F6]">
              A Clear Paradigm Shift
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#D5D8DD] font-body">
              Evaluating how Sports Hub is designed to transform daily interaction models across the
              entire sporting landscape.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Environment */}
            <FadeIn direction="up" className="bg-[#F2F3F7] dark:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5EAED] dark:border-[#2A313C] pb-4">
                <h3 className="text-lg font-bold text-[#222222] dark:text-[#F3F4F6]">Current Environment</h3>
                <span className="text-xs font-semibold text-[#6B7280] dark:text-[#D5D8DD] bg-white dark:bg-[#161B22] px-2.5 py-1 rounded border border-[#E5EAED] dark:border-[#2A313C]">
                  Fragmented
                </span>
              </div>

              <ul className="space-y-4 text-sm text-[#4B5563] dark:text-[#D5D8DD]">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] dark:bg-[#A4ABB6] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Information scattered</strong>
                    Vital schedule, pricing, and location details sit isolated across disparate chats,
                    word-of-mouth networks, and social pages.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] dark:bg-[#A4ABB6] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Manual communication</strong>
                    Every match slot or registration inquiry requires multiple calls, manual texts,
                    and waiting for replies.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] dark:bg-[#A4ABB6] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Difficult discovery</strong>
                    Finding high-quality facilities or open tournaments outside personal connections
                    is tedious and hit-or-miss.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] dark:bg-[#A4ABB6] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Limited visibility</strong>
                    Venues and coaches outside prime commercial districts struggle to surface their
                    offerings to relevant players.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] dark:bg-[#A4ABB6] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Separate channels</strong>
                    Ground bookings happen in one app, tournament brackets in another, and community
                    chats in yet another silo.
                  </div>
                </li>
              </ul>
            </FadeIn>

            {/* With Sports Hub */}
            <FadeIn direction="up" delay={0.1} className="bg-white dark:bg-[#1F2530] border-2 border-[#CDFF00] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative">
              <div className="flex items-center justify-between border-b border-[#E5EAED] dark:border-[#2A313C] pb-4">
                <h3 className="text-lg font-bold text-[#222222] dark:text-[#F3F4F6]">With Sports Hub</h3>
                <span className="text-xs font-bold text-[#11161B] bg-[#CDFF00] px-2.5 py-1 rounded">
                  Connected
                </span>
              </div>

              <ul className="space-y-4 text-sm text-[#4B5563] dark:text-[#D5D8DD]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] dark:text-[#CDFF00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Centralized discovery</strong>
                    Designed to enable rapid searching across sports, locations, turf types, pricing,
                    and participant skill levels.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] dark:text-[#CDFF00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Digital access</strong>
                    Designed to improve access by structuring real-time availability and verified
                    booking workflows without phone tag.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] dark:text-[#CDFF00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Better visibility</strong>
                    Aims to make independent grounds, emerging academies, and grassroots tournaments
                    discoverable by the entire community.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] dark:text-[#CDFF00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Connected stakeholders</strong>
                    Unites athletes, venues, organizers, and coaches under one transparent digital
                    interaction layer.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] dark:text-[#CDFF00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-[#F3F4F6] block font-semibold">Organized information</strong>
                    Structured profiles with clear photos, amenities, pricing, rules, and entry
                    deadlines all in one place.
                  </div>
                </li>
              </ul>
            </FadeIn>

          </div>

          {/* Bottom Next Step Callout */}
          <FadeIn className="mt-12 p-6 rounded-xl bg-[#F8FFD9] dark:bg-[#CDFF00]/10 border border-[#CDFF00] dark:border-[#CDFF00]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-[#222222] dark:text-[#F3F4F6]">
                Ready to examine the architectural solution in detail?
              </div>
              <div className="text-xs text-[#6B7280] dark:text-[#D5D8DD]">
                Explore how Sports Hub&apos;s 5-step process and 8 core capabilities operationalize this vision.
              </div>
            </div>
            <button
              onClick={() => onNavigate('solution')}
              className="px-5 py-2.5 bg-[#222222] dark:bg-[#CDFF00] hover:bg-neutral-800 dark:hover:bg-[#b8e600] text-white dark:text-[#11161B] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
            >
              Explore the Solution
              <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00] dark:text-[#11161B]" />
            </button>
          </FadeIn>
        </div>
      </motion.section>
    </div>
  );
};

