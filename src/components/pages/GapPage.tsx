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
    title: 'Looking for a Sports Opportunity',
    desc: 'An athlete, recreational group, or student wants to book a court, join a weekend football tournament, or find an accredited coach.',
    friction: 'The intent is strong, but there is no singular directory to start.',
  },
  {
    step: '02',
    title: 'Scattered Information',
    desc: 'Details are fragmented across multiple messaging threads, private social media groups, word-of-mouth recommendations, and outdated websites.',
    friction: 'Uncertain schedules, unlisted phone numbers, and outdated fee sheets.',
  },
  {
    step: '03',
    title: 'Limited Visibility',
    desc: 'High-quality community grounds, emerging coaches, and sanctioned competitions remain hidden unless you already know the right insider.',
    friction: 'Underutilized facilities and players left on the sidelines.',
  },
  {
    step: '04',
    title: 'Manual Communication',
    desc: 'Booking a slot or confirming event entry requires back-and-forth phone calls, manual chat confirmations, and unstructured bank transfers.',
    friction: 'High coordination friction, double-booking risks, and delayed answers.',
  },
  {
    step: '05',
    title: 'Difficult Discovery',
    desc: 'Comparing options by distance, surface type, pricing, or skill level requires exhaustive manual research across multiple disconnected sources.',
    friction: 'Fatigue sets in before anyone touches a ball.',
  },
  {
    step: '06',
    title: 'Potentially Missed Opportunities',
    desc: 'Players miss registration cutoffs, courts remain empty during off-peak slots, and academies struggle to reach the youth talent who need them most.',
    friction: 'A fragmented ecosystem where demand and supply fail to synchronize.',
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
        className="bg-[#F2F3F7] pt-14 pb-18 border-b border-[#E5EAED]"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            <span>Systemic Analysis</span>
            <span className="text-[#9ECC00]">·</span>
            <span>The Sports Disconnect</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#222222] font-display text-balance leading-tight">
            Bridging the Gap in the{' '}
            <span className="bg-[#CDFF00] px-2 py-0.5 rounded-md inline-block">
              Sports Ecosystem
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            The challenge is not simply the absence of sports activities. The challenge is making
            facilities, activities, events, and opportunities easier to discover and access.
          </p>
        </FadeIn>
      </motion.section>

      {/* 2. CURRENT JOURNEY FLOW */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              The Friction Funnel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display mt-2">
              The Current Frustrated Journey
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3">
              Trace what happens today when someone seeks a place to play or an event to compete in.
              Notice how friction compounds at every step.
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

                      <div
                        onClick={() => setSelectedJourneyIndex(idx)}
                        className={`relative z-10 flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F8FFD9] border-[#222222] shadow-sm'
                            : 'bg-white border-[#E5EAED] hover:border-[#CBD5E1]'
                        }`}
                      >
                        {/* Step Badge */}
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#222222] text-[#CDFF00]'
                              : 'bg-[#F2F3F7] text-[#222222]'
                          }`}
                        >
                          {step.step}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-[#222222]">
                              {step.title}
                            </h3>
                            {isSelected && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDFF00] text-[#222222] px-2 py-0.5 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
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
        className="bg-[#F2F3F7] py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Market Topology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              The Digital Divide
            </h2>
            <p className="text-base text-[#6B7280]">
              High demand and quality supply exist in the same geography, yet remain walled off by
              the absence of a neutral digital fabric.
            </p>
          </FadeIn>

          {/* Split Screen container with Dark Center Block */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            
            {/* Left: PEOPLE LOOKING FOR OPPORTUNITIES */}
            <FadeIn direction="right" className="lg:col-span-4 bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#E5EAED] pb-3">
                <Users className="w-5 h-5 text-[#222222]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222]">
                  People Looking for Opportunities
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Athletes</div>
                  <div className="text-xs text-[#6B7280]">
                    Seeking open tryouts, tournaments, and competitive benchmarks.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Players &amp; Recreationalists</div>
                  <div className="text-xs text-[#6B7280]">
                    Searching for available courts, reliable surfaces, and match partners.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Sports Enthusiasts</div>
                  <div className="text-xs text-[#6B7280]">
                    Wanting to spectate or join community fun runs and local sporting events.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Teams &amp; Squads</div>
                  <div className="text-xs text-[#6B7280]">
                    Needing regular training grounds, friendly fixtures, and league entry.
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Center: Strong Dark Block #222222 with Lime Accents #CDFF00 */}
            <FadeIn direction="up" delay={0.05} className="lg:col-span-3 bg-[#222222] border-2 border-[#CDFF00] rounded-2xl p-6 text-center text-white space-y-4 shadow-xl flex flex-col items-center justify-center my-2 lg:my-0">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#CDFF00] text-[#222222] font-black text-sm">
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
            <FadeIn direction="left" delay={0.08} className="lg:col-span-4 bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#E5EAED] pb-3">
                <Building2 className="w-5 h-5 text-[#222222]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222]">
                  People Providing Opportunities
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Sports Facilities &amp; Grounds</div>
                  <div className="text-xs text-[#6B7280]">
                    Wanting higher slot occupancy, digital bookings, and predictable revenue.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Academies &amp; Certified Coaches</div>
                  <div className="text-xs text-[#6B7280]">
                    Seeking to reach prospective students and publicize training modules.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Tournament Organizers</div>
                  <div className="text-xs text-[#6B7280]">
                    Promoting leagues, filling brackets, and publishing match schedules.
                  </div>
                </div>
                <div className="p-3 bg-[#F2F3F7] rounded-lg">
                  <div className="font-bold text-xs text-[#222222]">Sports Organizations</div>
                  <div className="text-xs text-[#6B7280]">
                    Fostering grassroots engagement, event participation, and sport growth.
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </motion.section>

      {/* 4. BEFORE / WITH SPORTS HUB COMPARISON */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Comparative Evaluation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              A Clear Paradigm Shift
            </h2>
            <p className="text-sm text-[#6B7280]">
              Evaluating how Sports Hub is designed to transform daily interaction models across the
              entire sporting landscape.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Environment */}
            <FadeIn direction="up" className="bg-[#F2F3F7] border border-[#E5EAED] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5EAED] pb-4">
                <h3 className="text-lg font-bold text-[#222222]">Current Environment</h3>
                <span className="text-xs font-semibold text-[#6B7280] bg-white px-2.5 py-1 rounded border border-[#E5EAED]">
                  Fragmented
                </span>
              </div>

              <ul className="space-y-4 text-sm text-[#4B5563]">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Information scattered</strong>
                    Vital schedule, pricing, and location details sit isolated across disparate chats,
                    word-of-mouth networks, and social pages.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Manual communication</strong>
                    Every match slot or registration inquiry requires multiple calls, manual texts,
                    and waiting for replies.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Difficult discovery</strong>
                    Finding high-quality facilities or open tournaments outside personal connections
                    is tedious and hit-or-miss.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Limited visibility</strong>
                    Venues and coaches outside prime commercial districts struggle to surface their
                    offerings to relevant players.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-2 shrink-0" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Separate channels</strong>
                    Ground bookings happen in one app, tournament brackets in another, and community
                    chats in yet another silo.
                  </div>
                </li>
              </ul>
            </FadeIn>

            {/* With Sports Hub */}
            <FadeIn direction="up" delay={0.1} className="bg-white border-2 border-[#CDFF00] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative">
              <div className="flex items-center justify-between border-b border-[#E5EAED] pb-4">
                <h3 className="text-lg font-bold text-[#222222]">With Sports Hub</h3>
                <span className="text-xs font-bold text-[#222222] bg-[#CDFF00] px-2.5 py-1 rounded">
                  Connected
                </span>
              </div>

              <ul className="space-y-4 text-sm text-[#4B5563]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Centralized discovery</strong>
                    Designed to enable rapid searching across sports, locations, turf types, pricing,
                    and participant skill levels.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Digital access</strong>
                    Designed to improve access by structuring real-time availability and verified
                    booking workflows without phone tag.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Better visibility</strong>
                    Aims to make independent grounds, emerging academies, and grassroots tournaments
                    discoverable by the entire community.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Connected stakeholders</strong>
                    Unites athletes, venues, organizers, and coaches under one transparent digital
                    interaction layer.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9ECC00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] block font-semibold">Organized information</strong>
                    Structured profiles with clear photos, amenities, pricing, rules, and entry
                    deadlines all in one place.
                  </div>
                </li>
              </ul>
            </FadeIn>

          </div>

          {/* Bottom Next Step Callout */}
          <FadeIn className="mt-12 p-6 rounded-xl bg-[#F8FFD9] border border-[#CDFF00] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-[#222222]">
                Ready to examine the architectural solution in detail?
              </div>
              <div className="text-xs text-[#6B7280]">
                Explore how Sports Hub&apos;s 5-step process and 8 core capabilities operationalize this vision.
              </div>
            </div>
            <button
              onClick={() => onNavigate('solution')}
              className="px-5 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              Explore the Solution
              <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
            </button>
          </FadeIn>
        </div>
      </motion.section>
    </div>
  );
};

