import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageId, StakeholderRole } from '../../types';
import { FadeIn, StaggerContainer, StaggerItem } from '../MotionTransitions';
import { 
  Compass, 
  MapPin, 
  CalendarCheck, 
  Trophy, 
  GraduationCap, 
  Users2, 
  LayoutDashboard, 
  Megaphone,
  ArrowRight,
  Check,
  Sparkles,
  SlidersHorizontal,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface SolutionPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    headline: 'Unified Directory & Search',
    description: 'Find verified sports facilities, competitive tournaments, training clinics, and active athletic clubs within your area without navigating disparate channels.',
    bullets: ['Filter by sport, geo-radius & surface specification', 'Real-time search across venues & upcoming events', 'Verified venue ratings & organizer credentials'],
  },
  {
    step: '02',
    title: 'EXPLORE',
    headline: 'Transparent Information',
    description: 'Inspect verified ground specifications, high-resolution photography, floodlighting standards, live slot timetables, and coach certifications.',
    bullets: ['High-res photography & court lighting specs', 'Accurate slot timetables & upfront pricing tiers', 'Tournament bracket formats & rulebook visibility'],
  },
  {
    step: '03',
    title: 'CONNECT',
    headline: 'Direct Communication',
    description: 'Communicate directly with venue managers, tournament directors, accredited coaches, and local grassroots clubs without intermediaries.',
    bullets: ['Direct stakeholder inquiries & slot notifications', 'Team captain recruitment & squad roster formation', 'Academy consultations & trial assessment requests'],
  },
  {
    step: '04',
    title: 'PARTICIPATE',
    headline: 'Frictionless Action',
    description: 'Streamline pitch reservations, submit verified squad rosters for championship cups, and confirm clinic attendance without phone tag or manual bank transfers.',
    bullets: ['Digital slot reservation & confirmation engine', 'One-click tournament roster submission', 'Automated reminders & calendar sync'],
  },
  {
    step: '05',
    title: 'GROW',
    headline: 'Ecosystem Continuity',
    description: 'Build enduring athletic momentum with verifiable match histories, skills development progression, and sustainable community sports leagues.',
    bullets: ['Track individual & club competition history', 'Advance through accredited academy tiers', 'Foster thriving grassroots leagues & club fixtures'],
  },
];

const CAPABILITIES = [
  {
    id: 'facility-discovery',
    title: 'Sports Facility Discovery',
    description: 'Locate premier sports grounds, indoor courts, and floodlit complexes matched precisely to your sport, radius, and schedule.',
    icon: Compass,
    details: 'Multi-criteria filtering including indoor/outdoor, natural turf, FIFA-grade synthetic turf, lighting lux levels, and locker facilities.',
  },
  {
    id: 'facility-profiles',
    title: 'Verified Venue Portfolios',
    description: 'Explore comprehensive venue profiles with geo-coordinates, high-res photography, surface specifications, and booking policies.',
    icon: MapPin,
    details: 'Full facility dossiers including pitch dimensions, parking capacity, changeroom amenities, and transparent cancellation terms.',
  },
  {
    id: 'digital-booking',
    title: 'Digital Booking Engine',
    description: 'Reserve participating sports facilities with live availability calendars, upfront rates, and instant digital confirmations.',
    icon: CalendarCheck,
    details: 'Dynamic slot scheduling that eliminates double-bookings, supports split fee coordination, and automates slot confirmations.',
  },
  {
    id: 'events-competitions',
    title: 'Tournaments & Leagues',
    description: 'Discover sanctioned cups, weekend knockout tournaments, and multi-week leagues tailored to your team’s competitive tier.',
    icon: Trophy,
    details: 'Browse active brackets, entry fees, eligibility guidelines, fixture schedules, and verified standings in one central hub.',
  },
  {
    id: 'academies-training',
    title: 'Academies & Coaching',
    description: 'Access accredited sports academies, certified personal coaches, and developmental clinics across all age cohorts.',
    icon: GraduationCap,
    details: 'Structured curriculum syllabi, coach credentials, seasonal bootcamps, and open talent assessment days.',
  },
  {
    id: 'sports-communities',
    title: 'Sports Communities & Clubs',
    description: 'Connect with local clubs and squads seeking substitute players, friendly sparring matches, or regular weekly pickups.',
    icon: Users2,
    details: 'Community squad boards, substitute callouts, friendly match matchmaking, and social sporting leagues.',
  },
  {
    id: 'facility-management',
    title: 'Facility Management Suite',
    description: 'Empower venue owners with intuitive digital tooling to manage bookings, optimize off-peak occupancy, and track schedules.',
    icon: LayoutDashboard,
    details: 'Central operator dashboard to eradicate double-bookings, publish maintenance closures, and analyze revenue trends.',
  },
  {
    id: 'sports-announcements',
    title: 'Sports Announcements Feed',
    description: 'A verified broadcast channel for league updates, open trial schedules, registration deadlines, and weather delay notices.',
    icon: Megaphone,
    details: 'Targeted broadcast feed delivering timely notifications for local tournament announcements and community fixtures.',
  },
];

export const SolutionPage: React.FC<SolutionPageProps> = ({ onNavigate, onOpenGetInvolved }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedCapability, setSelectedCapability] = useState<string>('facility-discovery');

  const currentCap = CAPABILITIES.find((c) => c.id === selectedCapability) || CAPABILITIES[0];

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
            <span>System Architecture</span>
            <span className="text-[#9ECC00]">·</span>
            <span>Sports Hub Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#222222] font-display text-balance leading-tight">
            A Digital Ecosystem Built Around{' '}
            <span className="bg-[#CDFF00] px-2 py-0.5 rounded-md inline-block">
              Sports
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            Sports Hub brings key parts of the sports ecosystem together in one connected digital
            environment. From discovering an open turf to registering for a regional championship.
          </p>
        </FadeIn>
      </motion.section>

      {/* 2. HOW IT WORKS (Desktop Horizontal / Mobile Vertical 5-Step Process) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Interaction Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display mt-2">
              How the Sports Hub Ecosystem Operates
            </h2>
            <p className="text-base text-[#6B7280] mt-3">
              A five-stage progression designed to move players and organizers from initial intent to
              sustainable participation.
            </p>
          </FadeIn>

          {/* Desktop Stepper Bar */}
          <FadeIn delay={0.1} className="hidden lg:grid grid-cols-5 gap-3 mb-8">
            {PROCESS_STEPS.map((item, index) => {
              const isActive = activeStep === index;
              return (
                <motion.button
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 350, damping: 20 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                  }}
                  className={`group relative text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-[#F8FFD9] border-[#222222] ring-2 ring-[#CDFF00] shadow-sm'
                      : 'bg-[#F2F3F7] border-[#E5EAED] hover:bg-white hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00]'
                  }`}
                >
                  {/* Animated top lime highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-black font-mono px-2 py-0.5 rounded transition-colors ${
                        isActive ? 'bg-[#222222] text-[#CDFF00]' : 'bg-white text-[#6B7280] group-hover:bg-[#222222] group-hover:text-[#CDFF00]'
                      }`}
                    >
                      {item.step}
                    </span>
                    {isActive ? (
                      <Sparkles className="w-3.5 h-3.5 text-[#9ECC00]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-[#CDFF00] transition-colors" />
                    )}
                  </div>
                  <div className="font-extrabold text-sm text-[#222222] tracking-wide group-hover:text-black transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#6B7280] group-hover:text-[#4B5563] mt-1 line-clamp-1 transition-colors">{item.headline}</div>
                </motion.button>
              );
            })}
          </FadeIn>

          {/* Step Detail Spotlight */}
          <FadeIn delay={0.15} className="bg-[#F2F3F7] border border-[#E5EAED] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-[#222222] text-[#CDFF00]">
                    STAGE {PROCESS_STEPS[activeStep].step}
                  </span>
                  <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                    {PROCESS_STEPS[activeStep].headline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#222222] font-display">
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                <div className="pt-2 space-y-2">
                  {PROCESS_STEPS[activeStep].bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#222222]">
                      <div className="w-5 h-5 rounded-full bg-[#CDFF00] flex items-center justify-center text-[#222222] shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual preview box for active step */}
              <div className="lg:col-span-5 bg-white border border-[#E5EAED] rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6B7280] border-b border-[#E5EAED] pb-3">
                  <span className="font-semibold text-[#222222]">System Output</span>
                  <span className="text-[#9ECC00] font-bold">Standardized Protocol</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F8FFD9] rounded-lg border border-[#CDFF00]/40 flex items-center justify-between">
                    <span className="font-bold text-[#222222]">Data Integrity</span>
                    <span className="text-[#6B7280]">Verified Entries</span>
                  </div>
                  <div className="p-3 bg-[#F2F3F7] rounded-lg border border-[#E5EAED] flex items-center justify-between">
                    <span className="font-bold text-[#222222]">Stakeholder Access</span>
                    <span className="text-[#6B7280]">Role-Specific View</span>
                  </div>
                  <div className="p-3 bg-[#F2F3F7] rounded-lg border border-[#E5EAED] flex items-center justify-between">
                    <span className="font-bold text-[#222222]">Friction Level</span>
                    <span className="font-bold text-emerald-700">Near Zero</span>
                  </div>
                </div>

                {/* Mobile Stepper pagination buttons */}
                <div className="flex lg:hidden items-center justify-between pt-3 border-t border-[#E5EAED]">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#F2F3F7] disabled:opacity-40"
                  >
                    Previous Step
                  </button>
                  <span className="text-xs font-mono font-bold">
                    {activeStep + 1} of {PROCESS_STEPS.length}
                  </span>
                  <button
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#CDFF00] text-[#222222] disabled:opacity-40"
                  >
                    Next Step
                  </button>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </motion.section>

      {/* 3. CORE PLATFORM CAPABILITIES (8 Feature Sections) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Modular Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              Core Platform Capabilities
            </h2>
            <p className="text-base text-[#6B7280]">
              Eight purpose-built modules working in concert to connect sports infrastructure,
              athletes, and organizations without administrative bloat.
            </p>
          </FadeIn>

          {/* 8 Feature Cards Grid with Staggered Entrance */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              const isSelected = selectedCapability === cap.id;

              return (
                <StaggerItem key={cap.id}>
                  <motion.div
                    onClick={() => setSelectedCapability(cap.id)}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 350, damping: 20 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                    }}
                    className={`group relative bg-white border rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full overflow-hidden ${
                      isSelected
                        ? 'border-[#222222] ring-2 ring-[#CDFF00] shadow-md -translate-y-1'
                        : 'border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00]'
                    }`}
                  >
                    {/* Animated top lime highlight bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    <div>
                      {/* Icon container: #CDFF00 on #F8FFD9 background with animated hover scale */}
                      <div className="w-12 h-12 rounded-xl bg-[#F8FFD9] border border-[#CDFF00]/60 group-hover:border-[#CDFF00] group-hover:scale-110 group-hover:-rotate-3 flex items-center justify-center mb-5 transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6 text-[#222222] transition-transform duration-300 group-hover:scale-105" />
                      </div>

                      <h3 className="text-base font-bold text-[#222222] group-hover:text-black mb-2 font-display transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] group-hover:text-[#4B5563] leading-relaxed transition-colors">
                        {cap.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E5EAED] flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-[#222222] font-bold' : 'text-[#6B7280] group-hover:text-[#222222] transition-colors'}>
                        {isSelected ? 'Active Spotlight' : 'View Spec'}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? 'translate-x-1 text-[#222222]' : 'text-[#9CA3AF] group-hover:translate-x-1 group-hover:text-[#222222]'}`} />
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Expanded Capability Detail Callout */}
          <FadeIn delay={0.2} className="mt-10 bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9ECC00]">
                  Deep Dive
                </span>
                <span className="text-xs text-[#6B7280]">·</span>
                <span className="text-xs font-bold text-[#222222]">{currentCap.title}</span>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentCap.details}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenGetInvolved('facility_owner')}
                className="px-4 py-2.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#222222] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                Get Involved
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('opportunities')}
                className="px-5 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                See Connected Opportunities
                <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
              </button>
            </div>
          </FadeIn>
        </div>
      </motion.section>
    </div>
  );
};
