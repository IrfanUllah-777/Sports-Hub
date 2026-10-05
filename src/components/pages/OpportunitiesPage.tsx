import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageId, StakeholderRole, Facility, Tournament, GovernmentScheme } from '../../types';
import { FadeIn, StaggerContainer, StaggerItem } from '../MotionTransitions';
import { useSportsStore } from '../../lib/sportsStore';
import { FacilityBookingModal } from '../booking/FacilityBookingModal';
import { TournamentModal } from '../tournaments/TournamentModal';
import { GovernmentSchemeModal } from '../government/GovernmentSchemeModal';

// ESM image imports to ensure clean production Vite bundling
import sportsFacilityImg from '../../assets/images/sports_facility_arena_1790791938447.jpg';
import tournamentImg from '../../assets/images/tournament_competition_1790791950466.jpg';
import academyImg from '../../assets/images/academy_coaching_1790791963237.jpg';

import { 
  Building2, 
  Trophy, 
  CalendarDays, 
  GraduationCap, 
  TrendingUp, 
  Users2,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  Layers,
  Sparkles,
  Filter,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface OpportunitiesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

type OpportunityCategory = 'all' | 'facilities' | 'tournaments' | 'events' | 'academies' | 'development' | 'communities';

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  onNavigate,
  onOpenGetInvolved,
}) => {
  const { facilities, tournaments, schemes } = useSportsStore();
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory>('all');

  // Interactive Modals State
  const [activeFacility, setActiveFacility] = useState<Facility | null>(null);
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);
  const [activeScheme, setActiveScheme] = useState<GovernmentScheme | null>(null);

  const filterTabs: { id: OpportunityCategory; label: string; count: string }[] = [
    { id: 'all', label: 'All Pathways', count: '6' },
    { id: 'facilities', label: 'Facilities', count: '01' },
    { id: 'tournaments', label: 'Tournaments', count: '02' },
    { id: 'events', label: 'Sports Events', count: '03' },
    { id: 'academies', label: 'Academies', count: '04' },
    { id: 'development', label: 'Athlete Growth', count: '05' },
    { id: 'communities', label: 'Communities', count: '06' },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO (Dark #222222) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#222222] text-white pt-16 pb-20 border-b border-neutral-800 bg-dark-grid-pattern"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CDFF00]">
            <span className="w-2 h-2 rounded-full bg-[#CDFF00]" />
            Multi-Dimensional Access
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white text-balance leading-tight">
            More Than a{' '}
            <span className="text-[#CDFF00]">Place to Play</span>.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            A platform for discovering the opportunities that make sports participation possible.
            From recreational games to structured competitions and coaching academies.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenGetInvolved('athlete')}
              className="px-6 py-3.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#222222] font-bold text-sm rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              Get Involved in the Ecosystem
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('solution')}
              className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-bold text-sm rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              How the Platform Works
            </button>
          </div>
        </FadeIn>
      </motion.section>

      {/* 2. THE 6 OPPORTUNITY SECTIONS */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Header & Filter Controls Section */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <FadeIn className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white text-[11px] font-bold uppercase tracking-wider text-[#6B7280] border border-[#E5EAED] shadow-2xs w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/30" />
                  <span>Discoverable Assets</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display tracking-tight">
                  Six Pathways of Sports Opportunity
                </h2>
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                  Sports Hub structures disparate sports activities into transparent, searchable, and
                  actionable categories.
                </p>
              </FadeIn>

              {/* Status indicator badge */}
              <FadeIn delay={0.05} className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6B7280] bg-white border border-[#E5EAED] px-3.5 py-2 rounded-xl shadow-2xs shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#CDFF00] border border-[#222222]" />
                <span>Showing <strong className="text-[#222222]">{selectedCategory === 'all' ? '6 of 6' : '1 of 6'}</strong> Pathways</span>
              </FadeIn>
            </div>

            {/* Category Filter Bar — Clean Segmented Navigation (no awkward wrapping) */}
            <FadeIn delay={0.1} className="w-full">
              <div className="bg-white border border-[#E5EAED] p-1.5 rounded-2xl shadow-xs overflow-x-auto">
                <div className="flex items-center gap-1.5 min-w-max">
                  {filterTabs.map((tab) => {
                    const isActive = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-xs'
                            : 'text-[#6B7280] hover:text-[#222222] hover:bg-[#F2F3F7]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                            isActive
                              ? 'bg-neutral-800 text-[#CDFF00]'
                              : 'bg-[#F2F3F7] text-[#9CA3AF] group-hover:text-[#222222] group-hover:bg-[#E5EAED]'
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
          </div>

          <div className="space-y-12">
            {/* Section 01: Sports Facilities */}
            {(selectedCategory === 'all' || selectedCategory === 'facilities') && (
              <FadeIn className="bg-white border border-[#E5EAED] rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 p-8 sm:p-10 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-mono font-bold text-[#222222] bg-[#F2F3F7] px-2 py-0.5 rounded">01</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-bold uppercase tracking-wider">Places to Play</span>
                      <span aria-hidden="true">·</span>
                      <span>Sports Facilities</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-display">
                      Sports Facilities
                    </h3>

                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      Discover grounds, courts, sports complexes, and recreational venues with complete
                      confidence. Review exact geo-locations, daylight and artificial lighting quality,
                      verified pitch surfaces, and transparent hourly rates.
                    </p>

                    {/* Enhanced feature content cards with Lucide icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-[#F2F3F7] hover:bg-[#F8FFD9]/40 border border-[#E5EAED] rounded-xl transition-colors flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F8FFD9] border border-[#CDFF00] text-[#222222] flex items-center justify-center shrink-0 shadow-2xs">
                          <MapPin className="w-4 h-4 text-[#222222]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs text-[#222222]">
                            Discover Venues
                          </div>
                          <div className="text-[11px] text-[#6B7280] leading-snug">
                            Grounds, indoor courts, complexes &amp; rec centers
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#F2F3F7] hover:bg-[#F8FFD9]/40 border border-[#E5EAED] rounded-xl transition-colors flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F8FFD9] border border-[#CDFF00] text-[#222222] flex items-center justify-center shrink-0 shadow-2xs">
                          <Clock className="w-4 h-4 text-[#222222]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs text-[#222222]">
                            Real-Time Slot Data
                          </div>
                          <div className="text-[11px] text-[#6B7280] leading-snug">
                            Slot times, lighting quality, rates &amp; open hours
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specification badges */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#4B5563]">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9ECC00] shrink-0" />
                        <span>Verified pitch surfaces &amp; specs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9ECC00] shrink-0" />
                        <span>Direct hourly reservation</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAED] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9ECC00]" />
                      <span>{facilities[0]?.slots.filter(s => s.status === 'available').length || 7} open slots today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenGetInvolved('facility_owner')}
                        className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#222222] font-bold rounded-lg transition-colors cursor-pointer text-xs"
                      >
                        List a Facility
                      </button>
                      <button
                        onClick={() => setActiveFacility(facilities[0])}
                        className="px-4 py-2 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#0A0D14] font-extrabold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs group text-xs"
                      >
                        <span>Book Court / Check Slots</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0A0D14] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-neutral-900 relative min-h-72">
                  <img
                    src={sportsFacilityImg}
                    alt="Modern indoor multi-sport facility with wooden court"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/80 backdrop-blur-md rounded-xl border border-neutral-700 text-xs text-white flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#CDFF00]" />
                      <span className="font-medium">Verified Venue Specifications</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#CDFF00] font-semibold text-[11px] bg-neutral-900/80 px-2.5 py-1 rounded-md border border-[#CDFF00]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
                      <span>Live Availability Feed</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Section 02: Tournaments & Competitions */}
            {(selectedCategory === 'all' || selectedCategory === 'tournaments') && (
              <FadeIn className="bg-white border border-[#E5EAED] rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 bg-neutral-900 relative min-h-72 order-2 lg:order-1">
                  <img
                    src={tournamentImg}
                    alt="Community soccer and athletic tournament under evening floodlights"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/80 backdrop-blur-md rounded-xl border border-neutral-700 text-xs text-white flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#CDFF00]" />
                      <span className="font-medium">Structured Entry Brackets</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#CDFF00] font-semibold text-[11px] bg-neutral-900/80 px-2.5 py-1 rounded-md border border-[#CDFF00]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
                      <span>{tournaments[0]?.registeredTeams.length || 4} of {tournaments[0]?.squadCapacity || 16} Squads Seeded</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 p-8 sm:p-10 space-y-5 flex flex-col justify-between order-1 lg:order-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-mono font-bold text-[#222222] bg-[#F2F3F7] px-2 py-0.5 rounded">02</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-bold uppercase tracking-wider">Competitive Play</span>
                      <span aria-hidden="true">·</span>
                      <span>Tournaments &amp; Competitions</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#222222] font-display">
                      Tournaments &amp; Competitions
                    </h3>

                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      Discover local and regional tournaments, knockout cups, and team leagues. Never
                      miss a team registration deadline, eligibility rule, or fixture schedule published
                      by grassroots and sanctioned tournament directors.
                    </p>

                    {/* Enhanced feature content cards with Lucide icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-[#F2F3F7] hover:bg-[#F8FFD9]/40 border border-[#E5EAED] rounded-xl transition-colors flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F8FFD9] border border-[#CDFF00] text-[#222222] flex items-center justify-center shrink-0 shadow-2xs">
                          <Trophy className="w-4 h-4 text-[#222222]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs text-[#222222]">
                            Tournament Formats
                          </div>
                          <div className="text-[11px] text-[#6B7280] leading-snug">
                            Local knockouts, weekend cups &amp; league tiers
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#F2F3F7] hover:bg-[#F8FFD9]/40 border border-[#E5EAED] rounded-xl transition-colors flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F8FFD9] border border-[#CDFF00] text-[#222222] flex items-center justify-center shrink-0 shadow-2xs">
                          <CalendarCheck className="w-4 h-4 text-[#222222]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs text-[#222222]">
                            Rules &amp; Schedules
                          </div>
                          <div className="text-[11px] text-[#6B7280] leading-snug">
                            Live rosters, deadlines, brackets &amp; table standings
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specification badges */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#4B5563]">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9ECC00] shrink-0" />
                        <span>Sanctioned rules &amp; verified hosts</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9ECC00] shrink-0" />
                        <span>Direct squad registration</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAED] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9ECC00]" />
                      <span>{tournaments[0]?.registeredTeams.length || 4} squads currently registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenGetInvolved('organizer')}
                        className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#222222] font-bold rounded-lg transition-colors cursor-pointer text-xs"
                      >
                        Register Tournament
                      </button>
                      <button
                        onClick={() => setActiveTournament(tournaments[0])}
                        className="px-4 py-2 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#0A0D14] font-extrabold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs group text-xs"
                      >
                        <span>View Fixtures &amp; Register Squad</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0A0D14] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Section 03 & 04 Grid */}
            {(selectedCategory === 'all' || selectedCategory === 'events' || selectedCategory === 'academies') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 03: Sports Events */}
                {(selectedCategory === 'all' || selectedCategory === 'events') && (
                  <FadeIn direction="right" className="bg-white border border-[#E5EAED] rounded-2xl p-8 space-y-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[#222222] text-[#CDFF00]">
                          03
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                          Showcases &amp; Community
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-[#222222] font-display">
                        Sports Events
                      </h3>

                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Discover community sports events, open showcase days, multi-sport festivals, fun runs,
                        and official announcements. Connect with the social heartbeat of local athletics
                        without scouring fragmented message boards.
                      </p>

                      <ul className="space-y-2 text-xs text-[#222222] pt-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Community recreational sports programs &amp; clinics
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Weekend youth jamborees and skills challenges
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Centralized calendar for cross-sport happenings
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#6B7280]">Open showcase listings</span>
                      <button
                        onClick={() => onOpenGetInvolved('organizer')}
                        className="px-3.5 py-1.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>List an Event</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
                      </button>
                    </div>
                  </FadeIn>
                )}

                {/* Section 04: Training & Academies */}
                {(selectedCategory === 'all' || selectedCategory === 'academies') && (
                  <FadeIn direction="left" className="bg-white border border-[#E5EAED] rounded-2xl p-8 space-y-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[#222222] text-[#CDFF00]">
                          04
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                          Skill Development
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-[#222222] font-display">
                        Training &amp; Academies
                      </h3>

                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Discover accredited academies, verified coaches, developmental clinics, and seasonal
                        camps. Compare coaching philosophies, age curricula, and training schedules in one
                        clean, trusted directory.
                      </p>

                      <div className="rounded-xl overflow-hidden border border-[#E5EAED] h-32">
                        <img
                          src={academyImg}
                          alt="Sports coach and athletes strategizing during training session"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#6B7280]">Accredited coaching</span>
                      <button
                        onClick={() => onOpenGetInvolved('academy_coach')}
                        className="px-3.5 py-1.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>Join Academy Roster</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
                      </button>
                    </div>
                  </FadeIn>
                )}
              </div>
            )}

            {/* Section 05 & 06 Grid */}
            {(selectedCategory === 'all' || selectedCategory === 'development' || selectedCategory === 'communities') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 05: Athlete Development */}
                {(selectedCategory === 'all' || selectedCategory === 'development') && (
                  <FadeIn direction="right" className="bg-white border border-[#E5EAED] rounded-2xl p-8 space-y-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[#222222] text-[#CDFF00]">
                          05
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                          Progression &amp; Grants
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-[#222222] font-display">
                        Athlete Development &amp; Public Schemes
                      </h3>

                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Create greater visibility for emerging athletes, teams, and training
                        programs. Access verified government sports grants, equipment subsidies, and regional talent trials with transparent application review.
                      </p>

                      <div className="p-4 bg-[#F2F3F7] rounded-xl border border-[#E5EAED] text-xs text-[#4B5563] space-y-1">
                        <span className="font-bold text-[#222222] block">
                          Verified Department Programs:
                        </span>
                        <span>
                          {schemes[0]?.title} · {schemes[0]?.grantAmount}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#6B7280]">{schemes.length} Active Schemes</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenGetInvolved('athlete')}
                          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-[#222222] font-bold rounded-lg transition-colors cursor-pointer text-xs"
                        >
                          Join as Athlete
                        </button>
                        <button
                          onClick={() => setActiveScheme(schemes[0])}
                          className="px-3.5 py-1.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#0A0D14] font-extrabold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs text-xs"
                        >
                          <span>Apply for Scheme</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0A0D14]" />
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Section 06: Sports Communities */}
                {(selectedCategory === 'all' || selectedCategory === 'communities') && (
                  <FadeIn direction="left" className="bg-white border border-[#E5EAED] rounded-2xl p-8 space-y-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[#222222] text-[#CDFF00]">
                          06
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                          Grassroots Ecosystem
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-[#222222] font-display">
                        Sports Communities
                      </h3>

                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Help users discover local sports clubs, connect with pickup game groups, find spare
                        players when squads are short, and coordinate friendly matches without managing 10
                        different chaotic group chats.
                      </p>

                      <ul className="space-y-2 text-xs text-[#222222] pt-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Local team directories seeking new players
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Substitute player callout alerts for weekend matches
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]" />
                          Shared calendar for casual open pickup games
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#6B7280]">Grassroots club directory</span>
                      <button
                        onClick={() => onOpenGetInvolved('community_leader')}
                        className="px-3.5 py-1.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>Connect Your Club</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
                      </button>
                    </div>
                  </FadeIn>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 3. WHO BENEFITS (6 Professional Sections with Direct Role Onboarding) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Stakeholder Value Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              Who Benefits from a Connected Sports Hub
            </h2>
            <p className="text-base text-[#6B7280]">
              Every participant in the sports landscape gains concrete advantages through reduced
              friction, improved discoverability, and digital organization.
            </p>
          </FadeIn>

          {/* Varied Grid: Mixture of White Cards, Lime Accents, and Dark Sections */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. ATHLETES */}
            <StaggerItem>
              <div className="bg-white border-2 border-[#CDFF00] rounded-2xl p-7 space-y-4 shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Pillar 01
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CDFF00]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] font-display">
                    Athletes
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Discover opportunities and participate more easily. Access verified listings for
                    open competitions, training camps, trial days, and local teams without relying on
                    insider relationships.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#222222]">Discovery &amp; Entry</span>
                  <button
                    onClick={() => onOpenGetInvolved('athlete')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* 2. SPORTS ENTHUSIASTS */}
            <StaggerItem>
              <div className="bg-[#F8FFD9] border border-[#CDFF00] rounded-2xl p-7 space-y-4 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Pillar 02
                    </span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded text-[#222222] border border-[#E5EAED]">
                      Recreation
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] font-display">
                    Sports Enthusiasts
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Find places and activities to play with friends or connect with social sports
                    groups nearby. Discover recreational courts, booking availability, and casual
                    pickups in your free time.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#CDFF00]/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#222222]">Casual Play</span>
                  <button
                    onClick={() => onOpenGetInvolved('enthusiast')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* 3. FACILITY OWNERS */}
            <StaggerItem>
              <div className="bg-[#222222] text-white rounded-2xl p-7 space-y-4 shadow-md flex flex-col justify-between border border-neutral-800 h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#CDFF00]">
                      Pillar 03
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#CDFF00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Facility Owners
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Increase digital visibility and manage facility activity. Transform empty off-peak
                    slots into booked hours, automate reservation logistics, and eliminate booking
                    conflicts.
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#CDFF00]">Higher Occupancy</span>
                  <button
                    onClick={() => onOpenGetInvolved('facility_owner')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#CDFF00] hover:text-white cursor-pointer"
                  >
                    <span>List Venue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* 4. ACADEMIES & COACHES */}
            <StaggerItem>
              <div className="bg-white border border-[#E5EAED] rounded-2xl p-7 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#CDFF00] transition-colors h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Pillar 04
                    </span>
                    <span className="text-xs text-[#9ECC00] font-bold">Training</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] font-display">
                    Academies &amp; Coaches
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Improve visibility for training and development programs. Showcase certified coaching
                    credentials, curriculum modules, and open trial sessions to young talent and parents.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#222222]">Student Reach</span>
                  <button
                    onClick={() => onOpenGetInvolved('academy_coach')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                  >
                    <span>Join Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* 5. EVENT ORGANIZERS */}
            <StaggerItem>
              <div className="bg-[#F2F3F7] border border-[#E5EAED] rounded-2xl p-7 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#222222] transition-colors h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Pillar 05
                    </span>
                    <span className="text-xs text-[#222222] font-bold">Competitions</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] font-display">
                    Event Organizers
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Promote competitions and sporting activities. Attract full team rosters, automate
                    entry registrations, and publish transparent brackets, schedules, and official rulings.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#222222]">Full Brackets</span>
                  <button
                    onClick={() => onOpenGetInvolved('organizer')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                  >
                    <span>Publish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* 6. SPORTS ORGANIZATIONS */}
            <StaggerItem>
              <div className="bg-white border border-[#E5EAED] rounded-2xl p-7 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#CDFF00] transition-colors h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Pillar 06
                    </span>
                    <span className="text-xs text-[#9ECC00] font-bold">Ecosystem</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] font-display">
                    Sports Organizations
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Create a more connected digital environment for sports activities. Foster grassroots
                    engagement, monitor community sport trends, and promote long-term active lifestyles.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#222222]">Community Vitality</span>
                  <button
                    onClick={() => onOpenGetInvolved('community_leader')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>

          {/* Bottom CTA to Vision */}
          <FadeIn delay={0.15} className="mt-14 p-6 sm:p-8 bg-[#222222] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white">
                Learn how this scales into a long-term sporting impact.
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300">
                Explore our 5-phase growth journey and societal impact principles.
              </p>
            </div>
            <button
              onClick={() => onNavigate('vision')}
              className="px-6 py-3 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#222222] font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              Explore Vision &amp; Impact
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeIn>
        </div>
      </motion.section>

      {/* Interactive Portal Modals */}
      <FacilityBookingModal
        isOpen={Boolean(activeFacility)}
        onClose={() => setActiveFacility(null)}
        facility={activeFacility}
      />

      <TournamentModal
        isOpen={Boolean(activeTournament)}
        onClose={() => setActiveTournament(null)}
        tournament={activeTournament}
      />

      <GovernmentSchemeModal
        isOpen={Boolean(activeScheme)}
        onClose={() => setActiveScheme(null)}
        scheme={activeScheme}
      />
    </div>
  );
};
