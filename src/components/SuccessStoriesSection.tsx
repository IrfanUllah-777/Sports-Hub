import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './MotionTransitions';
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  CheckCircle2
} from 'lucide-react';
import { StakeholderRole } from '../types';

export interface SuccessStory {
  id: string;
  name: string;
  roleType: 'athlete' | 'facility_manager';
  roleTitle: string;
  organization: string;
  sport: string;
  location: string;
  metric: string;
  metricLabel: string;
  quote: string;
  beforeState: string;
  afterState: string;
  initials: string;
  targetRole: StakeholderRole;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'tariq',
    name: 'Tariq Al-Mansoor',
    roleType: 'facility_manager',
    roleTitle: 'General Manager',
    organization: 'Falcon Sports Arena & Turf Complex',
    sport: 'Multi-Court Turf Arena',
    location: 'Dallas, TX',
    metric: '+46%',
    metricLabel: 'Off-Peak Slot Utilization',
    quote:
      'Our weekday morning and late-night turf slots used to sit empty. On Sports Hub, local corporate squads and pickup clubs book open hours directly, turning dead time into steady revenue.',
    beforeState: 'Idle pitches on weekday mornings and manual paper logs.',
    afterState: 'Automated real-time slot bookings with 100% upfront digital payment.',
    initials: 'TA',
    targetRole: 'facility_owner',
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    roleType: 'athlete',
    roleTitle: 'Competitive Player & Club Captain',
    organization: 'Eastside Badminton Club',
    sport: 'Badminton',
    location: 'Seattle, WA',
    metric: 'Zero',
    metricLabel: 'Phone Tag Friction',
    quote:
      'Finding available indoor courts with reliable synthetic mats used to mean calling five venue managers every Monday evening. Now our squad checks live schedules, splits fees in-app, and plays without guesswork.',
    beforeState: 'Calling multiple venue operators and waiting hours for chat replies.',
    afterState: 'Verified court availability booked and fee-split in under 30 seconds.',
    initials: 'ER',
    targetRole: 'athlete',
  },
  {
    id: 'siddharth',
    name: 'Siddharth Mehta',
    roleType: 'facility_manager',
    roleTitle: 'Proprietor & Operator',
    organization: 'Baseline Arena & Floodlit Turf',
    sport: 'Football & Box Cricket',
    location: 'Phoenix, AZ',
    metric: '100%',
    metricLabel: 'Digital Automated Bookings',
    quote:
      'Double bookings and uncollected cash were our biggest headaches. Sports Hub removed the administrative chaos. Every reservation is verified in real-time and paid upfront directly to our bank account.',
    beforeState: 'Cash collection delays, WhatsApp message ping-pong, and scheduling clashes.',
    afterState: 'Zero operational overhead with instant digital booking confirmations.',
    initials: 'SM',
    targetRole: 'facility_owner',
  },
  {
    id: 'devon',
    name: 'Devon Washington',
    roleType: 'athlete',
    roleTitle: 'Club Captain',
    organization: 'Metro Hoops Basketball Club',
    sport: 'Basketball',
    location: 'Atlanta, GA',
    metric: '18 Fixtures',
    metricLabel: 'Competitive Matches Hosted',
    quote:
      'Setting up competitive scrimmages against other serious clubs was always chaotic. With Sports Hub, we broadcast an open challenge fixture and get matched with an equally ranked squad within hours.',
    beforeState: 'Begging opposing captains in DMs for weekend court time.',
    afterState: 'Direct club-to-club challenge fixtures on verified indoor wood courts.',
    initials: 'DW',
    targetRole: 'athlete',
  },
  {
    id: 'carla',
    name: 'Carla Mendes',
    roleType: 'facility_manager',
    roleTitle: 'Director of Operations',
    organization: 'Rio Grande Padel & Racquet Hub',
    sport: 'Padel & Racket Sports',
    location: 'Austin, TX',
    metric: '3.4x',
    metricLabel: 'New Player Inbound',
    quote:
      'When we opened four new padel courts, getting local players to discover us was our main priority. Having our facility featured on Sports Hub filled our introductory clinics and member leagues within 30 days.',
    beforeState: 'Relying solely on expensive local flyers and social media ads.',
    afterState: 'Direct discovery by thousands of active racket sports players in the city.',
    initials: 'CM',
    targetRole: 'facility_owner',
  },
  {
    id: 'aisha',
    name: 'Aisha Morales',
    roleType: 'athlete',
    roleTitle: 'Club Founder & Marathoner',
    organization: 'Harbor Community Runners',
    sport: 'Athletics & Road Running',
    location: 'San Diego, CA',
    metric: '850+',
    metricLabel: 'Active Community Runners',
    quote:
      'We started with 20 friends and scaled to hundreds. Because our weekly routes and pop-up 10K events are listed where runners already search, athletes visiting or moving to our city find us immediately.',
    beforeState: 'Word-of-mouth recommendations trapped in a private group chat.',
    afterState: 'A public, verified community calendar accessible to any runner.',
    initials: 'AM',
    targetRole: 'community_leader',
  },
];

interface SuccessStoriesSectionProps {
  onOpenGetInvolved: (role?: StakeholderRole) => void;
  onNavigateToOpportunities: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  onOpenGetInvolved,
  onNavigateToOpportunities,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'athlete' | 'facility_manager'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter stories based on role
  const stories = activeCategory === 'all'
    ? SUCCESS_STORIES
    : SUCCESS_STORIES.filter((s) => s.roleType === activeCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-advance carousel every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const currentStory = stories[currentIndex] || stories[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white dark:bg-[#0B0F14] py-16 sm:py-20 border-b border-[#E5EAED] dark:border-[#202731] relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with Segmented Category Filter & Carousel Nav */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <FadeIn className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/20 dark:ring-[#CDFF00]/40" />
              <span>Success Stories · Platform Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] dark:text-[#F3F4F6] font-display tracking-tight text-balance">
              Proven Impact for Athletes &amp; Facilities
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#D5D8DD] leading-relaxed">
              Read how players discover venues without phone tag, and facility operators turn idle courts
              into booked games.
            </p>
          </FadeIn>

          {/* Controls: Role Filter & Prev/Next Arrows */}
          <FadeIn delay={0.05} className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#F2F3F7] dark:bg-[#161B22] p-1 rounded-xl border border-[#E5EAED] dark:border-[#2A313C]">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#11161B] font-bold shadow-2xs'
                    : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white'
                }`}
              >
                All Stories ({SUCCESS_STORIES.length})
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={() => setActiveCategory('athlete')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'athlete'
                    ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#11161B] font-bold shadow-2xs'
                    : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Athletes</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={() => setActiveCategory('facility_manager')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'facility_manager'
                    ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#11161B] font-bold shadow-2xs'
                    : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Facility Managers</span>
              </motion.button>
            </div>

            {/* Play/Pause & Carousel Arrows */}
            <div className="flex items-center gap-1.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={() => setIsPaused((prev) => !prev)}
                title={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
                aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#1F2530] hover:bg-[#F2F3F7] dark:hover:bg-[#2A313C] border border-[#E5EAED] dark:border-[#2A313C] text-[#222222] dark:text-[#F3F4F6] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#1F2530] hover:bg-[#F2F3F7] dark:hover:bg-[#2A313C] border border-[#E5EAED] dark:border-[#2A313C] text-[#222222] dark:text-[#F3F4F6] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
                onClick={handleNext}
                aria-label="Next story"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#1F2530] hover:bg-[#F2F3F7] dark:hover:bg-[#2A313C] border border-[#E5EAED] dark:border-[#2A313C] text-[#222222] dark:text-[#F3F4F6] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </FadeIn>
        </div>

        {/* Featured Story Carousel Spotlight Card */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="bg-[#FBFBFC] dark:bg-[#12171F] border border-[#E5EAED] dark:border-[#2A313C] rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Author info, Metric & Quote */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Top persona bar */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#222222] dark:bg-[#1F2530] text-[#CDFF00] border border-[#CDFF00]/40 flex items-center justify-center font-bold text-sm shadow-xs">
                        {currentStory.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base sm:text-lg text-[#222222] dark:text-[#F3F4F6] font-display">
                            {currentStory.name}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F2F3F7] dark:bg-[#1F2530] text-[#6B7280] dark:text-[#D5D8DD] uppercase tracking-wider">
                            {currentStory.roleType === 'athlete' ? 'Athlete' : 'Facility Manager'}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] dark:text-[#A4ABB6]">
                          {currentStory.roleTitle} · {currentStory.organization}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-sm sm:text-base font-mono font-black px-2.5 py-1 rounded-lg bg-[#F8FFD9] dark:bg-[#CDFF00]/15 text-[#222222] dark:text-[#CDFF00] border border-[#CDFF00]/80 dark:border-[#CDFF00]/50">
                        {currentStory.metric}
                      </span>
                      <span className="block text-[10px] text-[#6B7280] dark:text-[#A4ABB6] uppercase tracking-wider font-semibold mt-0.5">
                        {currentStory.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="pl-4 border-l-3 border-[#CDFF00] space-y-2">
                    <p className="text-sm sm:text-base text-[#222222] dark:text-[#F3F4F6] font-medium leading-relaxed italic">
                      &ldquo;{currentStory.quote}&rdquo;
                    </p>
                    <div className="text-xs text-[#6B7280] dark:text-[#A4ABB6]">
                      {currentStory.sport} · {currentStory.location}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onOpenGetInvolved(currentStory.targetRole)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#222222] dark:bg-[#CDFF00] hover:bg-neutral-800 dark:hover:bg-[#B8E600] text-white dark:text-[#11161B] font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Join as {currentStory.roleType === 'athlete' ? 'an Athlete' : 'a Facility'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00] dark:text-[#11161B]" />
                    </button>
                    <button
                      type="button"
                      onClick={onNavigateToOpportunities}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Browse Opportunities</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Before vs After Platform Impact */}
                <div className="lg:col-span-5 bg-white dark:bg-[#161D26] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl p-5 sm:p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2F3F7] dark:border-[#2A313C]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6]">
                      Platform Impact Comparison
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#9ECC00]" />
                  </div>

                  {/* Before */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                      <span>Before Sports Hub</span>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-[#A4ABB6] leading-relaxed pl-3 border-l border-[#FEE2E2] dark:border-red-900/50">
                      {currentStory.beforeState}
                    </p>
                  </div>

                  {/* After */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>With Sports Hub</span>
                    </div>
                    <p className="text-xs text-[#222222] dark:text-[#F3F4F6] font-medium leading-relaxed pl-3 border-l border-[#DCFCE7] dark:border-emerald-900/50">
                      {currentStory.afterState}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots and Slide Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Quick Clickable Story Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {stories.map((story, idx) => (
              <motion.button
                key={story.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                whileHover={{ scale: 1.03, y: -1, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                whileTap={{
                  scale: 0.98,
                  transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  idx === currentIndex
                    ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#11161B] font-bold shadow-2xs'
                    : 'bg-[#F2F3F7] dark:bg-[#161B22] text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#1F2530]'
                }`}
              >
                <span>{story.name}</span>
                <span className="text-[10px] ml-1.5 opacity-70">
                  ({story.roleType === 'athlete' ? 'Athlete' : 'Facility'})
                </span>
              </motion.button>
            ))}
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-[#6B7280] dark:text-[#A4ABB6] mr-2">
              0{currentIndex + 1} / 0{stories.length}
            </span>
            {stories.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 bg-[#222222] dark:bg-[#CDFF00]'
                    : 'w-2 bg-[#CBD5E1] dark:bg-[#333C4D] hover:bg-[#9CA3AF] dark:hover:bg-[#64748B]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Platform Proof Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#E5EAED] dark:border-[#2A313C]">
          <motion.div
            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
            className="group relative bg-[#F2F3F7] dark:bg-[#161B22] hover:bg-white dark:hover:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-2xl font-black text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
              +46%
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#A4ABB6] group-hover:text-[#4B5563] dark:group-hover:text-[#D5D8DD] font-medium mt-0.5 transition-colors">
              Avg. Off-Peak Slot Utilization
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
            className="group relative bg-[#F2F3F7] dark:bg-[#161B22] hover:bg-white dark:hover:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-2xl font-black text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
              30 sec
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#A4ABB6] group-hover:text-[#4B5563] dark:group-hover:text-[#D5D8DD] font-medium mt-0.5 transition-colors">
              Verified Court Booking Time
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
            className="group relative bg-[#F2F3F7] dark:bg-[#161B22] hover:bg-white dark:hover:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-2xl font-black text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
              100%
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#A4ABB6] group-hover:text-[#4B5563] dark:group-hover:text-[#D5D8DD] font-medium mt-0.5 transition-colors">
              Digital Payment &amp; Roster Verification
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
            className="group relative bg-[#F2F3F7] dark:bg-[#161B22] hover:bg-white dark:hover:bg-[#1F2530] border border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00] rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-2xl font-black text-[#222222] dark:text-[#F3F4F6] group-hover:text-black dark:group-hover:text-white font-display transition-colors">
              Zero
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#A4ABB6] group-hover:text-[#4B5563] dark:group-hover:text-[#D5D8DD] font-medium mt-0.5 transition-colors">
              Phone Calls or Manual Double-Bookings
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};
