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
    description: 'Find sports facilities, activities, events, competitions, academies, and opportunities in your area without jumping through disparate channels.',
    bullets: ['Filter by sport, location & turf type', 'Real-time search across venues & events', 'Verified venue & organizer tags'],
  },
  {
    step: '02',
    title: 'EXPLORE',
    headline: 'Transparent Information',
    description: 'Review locations, verified photos, amenities, pricing, real-time availability slots, tournament rules, and coach credentials.',
    bullets: ['High-res photography & lighting specs', 'Accurate slot timetables & pricing tiers', 'Tournament bracket & rulebook visibility'],
  },
  {
    step: '03',
    title: 'CONNECT',
    headline: 'Direct Communication',
    description: 'Connect users with facility owners, event organizers, accredited academies, coaches, and local grassroots sports communities directly.',
    bullets: ['Direct stakeholder messaging', 'Team captain & squad recruitment', 'Academy consultations & trial requests'],
  },
  {
    step: '04',
    title: 'PARTICIPATE',
    headline: 'Frictionless Action',
    description: 'Make it easier to book slots, register tournament squads, attend training clinics, and participate in recreational or competitive fixtures.',
    bullets: ['Digital booking & reservation management', 'One-click tournament squad registration', 'Attendance confirmation & reminders'],
  },
  {
    step: '05',
    title: 'GROW',
    headline: 'Ecosystem Continuity',
    description: 'Create lasting pathways toward consistent participation, profile visibility, athletic development, and long-term community engagement.',
    bullets: ['Track personal & team match history', 'Progress into advanced academy cohorts', 'Foster sustainable community leagues'],
  },
];

const CAPABILITIES = [
  {
    id: 'facility-discovery',
    title: 'Sports Facility Discovery',
    description: 'Find sports grounds, courts, complexes, and recreational facilities tailored to your sport, radius, and timing.',
    icon: Compass,
    details: 'Multi-criteria filtering including indoor/outdoor, natural grass, synthetic turf, lighting conditions, and locker availability.',
  },
  {
    id: 'facility-profiles',
    title: 'Facility Profiles',
    description: 'View locations, photos, facilities, amenities, policies, and slot availability with transparent information.',
    icon: MapPin,
    details: 'Comprehensive venue portfolios with geo-coordinates, parking guidance, surface specifications, and booking policies.',
  },
  {
    id: 'digital-booking',
    title: 'Digital Booking',
    description: 'Provide a structured, predictable way to access and reserve participating sports facilities without telephone tag.',
    icon: CalendarCheck,
    details: 'Live slot calendar with instant slot confirmation, split payment coordination, and automated cancellation protocols.',
  },
  {
    id: 'events-competitions',
    title: 'Events & Competitions',
    description: 'Discover tournaments, knockout cups, weekend leagues, and sporting events tailored to all skill brackets.',
    icon: Trophy,
    details: 'Browse active brackets, entry fees, eligibility rules, fixture tables, and live standings in one centralized portal.',
  },
  {
    id: 'academies-training',
    title: 'Academies & Training',
    description: 'Discover certified sports academies, personal coaches, and structured training programs for all age cohorts.',
    icon: GraduationCap,
    details: 'Curriculum breakdowns, coach credentials, seasonal bootcamps, and open assessment trial days.',
  },
  {
    id: 'sports-communities',
    title: 'Sports Communities',
    description: 'Connect players, teams, and local sports clubs seeking spare players, friendly fixtures, or regular training squads.',
    icon: Users2,
    details: 'Community squad boards, substitute player callouts, friendly fixture matchmaking, and local social sports leagues.',
  },
  {
    id: 'facility-management',
    title: 'Facility Management',
    description: 'Give participating facility owners intuitive tools to manage bookings, track schedules, and maintain facility information.',
    icon: LayoutDashboard,
    details: 'Central operator dashboard to eliminate double-bookings, adjust dynamic pricing, and publish maintenance blackouts.',
  },
  {
    id: 'sports-announcements',
    title: 'Sports Announcements',
    description: 'Create a centralized place for relevant sports updates, trial dates, seasonal registrations, and community notices.',
    icon: Megaphone,
    details: 'Targeted broadcast feed for local league updates, venue weather delays, and championship announcements.',
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
                <button
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F8FFD9] border-[#222222] ring-2 ring-[#CDFF00]'
                      : 'bg-[#F2F3F7] border-[#E5EAED] hover:bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#222222] text-[#CDFF00]' : 'bg-white text-[#6B7280]'
                      }`}
                    >
                      {item.step}
                    </span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-[#9ECC00]" />}
                  </div>
                  <div className="font-extrabold text-sm text-[#222222] tracking-wide">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1 line-clamp-1">{item.headline}</div>
                </button>
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
                    whileTap={{ scale: 0.98 }}
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
