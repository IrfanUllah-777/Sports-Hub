import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageId, StakeholderRole } from '../../types';
import { FadeIn, StaggerContainer, StaggerItem } from '../MotionTransitions';
import { FaqAccordion, FaqItem } from '../FaqAccordion';
import { 
  Eye, 
  Unlock, 
  FolderGit2, 
  TrendingUp, 
  Building, 
  Users, 
  ArrowRight, 
  Check, 
  Sparkles,
  Milestone
} from 'lucide-react';

interface VisionPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

const PHASES = [
  {
    phase: 'PHASE 01',
    name: 'DISCOVER',
    subtitle: 'Digital Sports Discovery',
    description: 'Establish unified, verified directories of sports grounds, courts, academies, and open tournaments across initial pilot cities.',
    milestones: [
      'Comprehensive ground & facility indexing',
      'Accurate geo-mapping & verified amenity lists',
      'Centralized tournament calendar listings',
    ],
  },
  {
    phase: 'PHASE 02',
    name: 'CONNECT',
    subtitle: 'Stakeholder Linkage',
    description: 'Build direct, transparent communication channels linking athletes, facility managers, coaching academies, and community organizers.',
    milestones: [
      'Direct inquiries and slot notifications',
      'Team & pickup player recruitment tools',
      'Coach credentials and parent consultations',
    ],
  },
  {
    phase: 'PHASE 03',
    name: 'PARTICIPATE',
    subtitle: 'Operational Access',
    description: 'Support real-time digital booking, streamlined team registration, secure payment handling, and attendance check-in.',
    milestones: [
      'Live facility slot booking & availability syncing',
      'Instant squad roster submissions for cups',
      'Cancellation and automated reschedule flows',
    ],
  },
  {
    phase: 'PHASE 04',
    name: 'DEVELOP',
    subtitle: 'Athletic Ecosystem Growth',
    description: 'Support athlete development pathways, verified skills training, grassroots community cups, and performance benchmarks.',
    milestones: [
      'Structured clinic and camp listings',
      'Team fixture tables and verified statistics',
      'Community sports leagues and seasonal rankings',
    ],
  },
  {
    phase: 'PHASE 05',
    name: 'SCALE',
    subtitle: 'Regional & Multi-City Expansion',
    description: 'Expand the open digital sports ecosystem across additional metro hubs, regional areas, and diverse multi-sport disciplines.',
    milestones: [
      'Inter-city tournament brackets & showcases',
      'Institutional & municipal facility integrations',
      'Standardized open sports data infrastructure',
    ],
  },
];

const IMPACT_BLOCKS = [
  {
    title: 'Greater Visibility',
    description: 'Make sports facilities, emerging academies, and grassroots tournaments easier to discover for everyday players.',
    icon: Eye,
    metric: 'Zero Hidden Gems',
  },
  {
    title: 'Better Accessibility',
    description: 'Reduce the excessive friction and time required to locate open courts, compatible match partners, or verified coaches.',
    icon: Unlock,
    metric: 'Instant Clear Data',
  },
  {
    title: 'Digital Organization',
    description: 'Move fragmented information from forgotten chat groups and paper schedules toward a structured, modern digital environment.',
    icon: FolderGit2,
    metric: 'Structured Records',
  },
  {
    title: 'Increased Participation',
    description: 'Create easier, predictable pathways that turn sports interest into active, recurring physical participation.',
    icon: TrendingUp,
    metric: 'Frictionless Play',
  },
  {
    title: 'Better Facility Utilization',
    description: 'Help participating facilities improve visibility, fill idle daylight or late-evening slots, and manage reservations efficiently.',
    icon: Building,
    metric: 'Optimized Slots',
  },
  {
    title: 'Connected Communities',
    description: 'Create stronger, enduring connections between players, local clubs, facilities, and regional sporting organizations.',
    icon: Users,
    metric: 'Unified Grassroots',
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'eco-difference',
    category: 'Ecosystem Concept',
    question: 'Is Sports Hub simply a ground-booking tool or something broader?',
    answer: 'Sports Hub is fundamentally a multi-sided sports ecosystem, not just a standalone venue checkout utility. While facility slot discovery and digital booking are core capabilities, the platform bridges all key stakeholders: athletes finding open teams, coaches showcasing accredited clinics, organizers publishing tournament brackets, and local communities coordinating grassroots games.',
    details: [
      'Facilities gain slot visibility and management without requiring siloed software.',
      'Athletes and enthusiasts discover competitions, training, and teammates in one unified directory.',
      'Grassroots communities transition away from chaotic, unstructured chat groups.',
    ],
  },
  {
    id: 'community-benefits',
    category: 'Community Benefits',
    question: 'How does the platform directly benefit grassroots clubs and informal sports communities?',
    answer: 'Local recreational clubs and social teams frequently face fragmented communication when finding spare players, scheduling friendly matches, or finding reliable turf. Sports Hub provides community squad boards, verified pickup match listings, and substitute player callout alerts that keep weekend games fully staffed and organized.',
    details: [
      'Eliminates last-minute player shortages through local substitute callouts.',
      'Enables friendly cross-club matchmaking across neighborhoods and leagues.',
      'Provides public directories for open pickup games welcoming new and casual players.',
    ],
  },
  {
    id: 'facility-operators',
    category: 'Facilities & Venues',
    question: 'What advantages do facility owners gain by participating in the Sports Hub network?',
    answer: 'Independent sports grounds, turf complexes, and indoor courts gain centralized digital discovery without paying for heavy bespoke software. Operators can publicize verified amenities, manage real-time availability calendars, fill off-peak daylight or late-evening hours, and eliminate telephone tag and double-bookings.',
    details: [
      'Dynamic slot calendars with instant confirmation and automated booking policies.',
      'Higher off-peak utilization through community-wide search visibility.',
      'Full operator ownership of facility rules, surface specifications, and pricing tiers.',
    ],
  },
  {
    id: 'academy-coaches',
    category: 'Academies & Training',
    question: 'How can certified coaches and training academies engage with emerging talent?',
    answer: 'Academies and independent coaches receive dedicated profile hubs to display certified credentials, curriculum modules, age-group programs, and seasonal camps. This allows parents and aspiring players to compare coaching philosophies and submit assessment trial requests directly through transparent channels.',
    details: [
      'Verified coaching badges and curriculum transparency.',
      'Centralized registration for seasonal bootcamps and assessment clinics.',
      'Direct inquiries from players seeking structured development pathways.',
    ],
  },
  {
    id: 'athlete-pathways',
    category: 'Athlete Development',
    question: 'Does Sports Hub promise professional sports contracts or elite scout selection?',
    answer: 'No. Sports Hub maintains strict integrity by focusing on verifiable access and discovery. We do not claim guaranteed professional drafts, contracts, or agency representation. Instead, we empower athletes by giving them transparent visibility into sanctioned tournaments, trial dates, accredited coaching, and structured competition history.',
    details: [
      'Transparent access to open tournaments, leagues, and tryout dates.',
      'Verified match and competition logs without misleading promises or paywalls.',
      'Equitable opportunity for emerging athletes to be seen within their regional leagues.',
    ],
  },
  {
    id: 'organizers-tournaments',
    category: 'Competitions & Events',
    question: 'How do tournament organizers list competitions and manage team entries?',
    answer: 'Tournament directors can publish official fixtures, eligibility rules, entry fee deadlines, and bracket formats. Teams and captains can submit verified squad rosters directly, reducing the administrative burden of chasing paper waivers and manual bank transfers.',
    details: [
      'Structured bracket publishing and live schedule tracking.',
      'Clear entry criteria and roster submission protocols.',
      'Promotional reach across the entire local sporting community.',
    ],
  },
  {
    id: 'pilot-rollout',
    category: 'Roadmap & Rollout',
    question: 'What is the expected progression for platform rollout across pilot regions?',
    answer: 'Following our five-phase roadmap (Discover, Connect, Participate, Develop, Scale), rollout commences with comprehensive facility and tournament indexing in target pilot metro areas. Stakeholders who register early interest via the Get Involved portal receive priority onboarding and early configuration access.',
    details: [
      'Phase 01 begins with comprehensive local ground and tournament directory building.',
      'Subsequent phases activate real-time slot syncing and registration management.',
      'Early partner feedback directly informs custom operational tools.',
    ],
  },
];

export const VisionPage: React.FC<VisionPageProps> = ({ onNavigate, onOpenGetInvolved }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

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
            <span>Long-Term Horizon</span>
            <span className="text-[#9ECC00]">·</span>
            <span>Sports Hub Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#222222] font-display text-balance leading-tight">
            Building a More Connected{' '}
            <span className="bg-[#CDFF00] px-2 py-0.5 rounded-md inline-block">
              Future for Sports
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Where geographic boundaries and communication silos no longer prevent people from
            discovering sports opportunities, facilities, and communities.
          </p>
        </FadeIn>
      </motion.section>

      {/* 2. OUR VISION (Streamlined & Cleaned Size) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-12 sm:py-16 border-b border-[#E5EAED]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="bg-[#F8FFD9] border-2 border-[#CDFF00] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#222222] text-[#CDFF00] px-2.5 py-1 rounded-md">
                Official Vision Statement
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#222222] font-display leading-snug sm:leading-tight">
              &ldquo;We envision a future where{' '}
              <span className="bg-[#CDFF00] px-1.5 py-0.5 rounded">
                every athlete, sports enthusiast, facility owner, academy, organizer, and sports community
              </span>{' '}
              can more easily{' '}
              <span className="underline decoration-[#9ECC00] decoration-4 underline-offset-4">
                discover, access, and participate
              </span>{' '}
              in sports opportunities through a{' '}
              <span className="bg-[#222222] text-white px-2 py-0.5 rounded inline-block mt-1">
                connected digital ecosystem
              </span>
              .&rdquo;
            </blockquote>

            <div className="mt-6 pt-4 border-t border-[#CDFF00]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4B5563] gap-2">
              <span>Grounding our product roadmap in accessibility and shared value.</span>
              <span className="font-bold text-[#222222]">The Sports Hub Guiding Principle</span>
            </div>
          </FadeIn>
        </div>
      </motion.section>

      {/* 3. LONG-TERM JOURNEY (Premium 5-Phase Timeline) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Strategic Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              The Long-Term Journey
            </h2>
            <p className="text-base text-[#6B7280]">
              How Sports Hub advances systematically from initial discovery to a regional,
              multi-sport digital network.
            </p>
          </FadeIn>

          {/* Phase selector tabs */}
          <FadeIn delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
            {PHASES.map((p, idx) => {
              const isSelected = activePhaseIndex === idx;
              return (
                <button
                  key={p.phase}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#222222] ring-2 ring-[#CDFF00] shadow-sm'
                      : 'bg-white/70 border-[#E5EAED] hover:bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#6B7280]">
                      {p.phase}
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]" />
                    )}
                  </div>
                  <div className="font-black text-sm text-[#222222] tracking-tight">{p.name}</div>
                  <div className="text-xs text-[#6B7280] truncate mt-0.5">{p.subtitle}</div>
                </button>
              );
            })}
          </FadeIn>

          {/* Detailed Phase Spotlight Card */}
          <FadeIn delay={0.15} className="bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-[#222222] text-[#CDFF00]">
                    {PHASES[activePhaseIndex].phase}
                  </span>
                  <span className="text-xs font-bold text-[#9ECC00] uppercase tracking-wider">
                    {PHASES[activePhaseIndex].subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#222222] font-display">
                  {PHASES[activePhaseIndex].name}: {PHASES[activePhaseIndex].subtitle}
                </h3>

                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {PHASES[activePhaseIndex].description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-2">
                    Key Execution Targets:
                  </div>
                  {PHASES[activePhaseIndex].milestones.map((milestone, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#222222]">
                      <div className="w-4 h-4 rounded-full bg-[#CDFF00] flex items-center justify-center text-[#222222] shrink-0 font-bold text-[10px]">
                        ✓
                      </div>
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress timeline indicator graphic */}
              <div className="lg:col-span-5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#222222] flex items-center justify-between">
                  <span>Implementation Stage</span>
                  <span className="font-mono text-[#9ECC00]">
                    0{activePhaseIndex + 1} / 05
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#E5EAED] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#CDFF00] h-full transition-all duration-300"
                    style={{ width: `${((activePhaseIndex + 1) / 5) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Each phase builds directly upon the verified data and trusted user base of the
                  preceding milestone, maintaining reliability at every step.
                </p>

                <div className="pt-2 border-t border-[#E5EAED] flex items-center justify-between">
                  <button
                    disabled={activePhaseIndex === 0}
                    onClick={() => setActivePhaseIndex((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-semibold text-[#6B7280] hover:text-[#222222] disabled:opacity-30 cursor-pointer"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    disabled={activePhaseIndex === PHASES.length - 1}
                    onClick={() => setActivePhaseIndex((prev) => Math.min(PHASES.length - 1, prev + 1))}
                    className="text-xs font-bold text-[#222222] hover:text-[#9ECC00] disabled:opacity-30 cursor-pointer"
                  >
                    Next Phase →
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </motion.section>

      {/* 4. DESIGNED FOR MEANINGFUL IMPACT (6 Impact Blocks) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Societal &amp; Sports Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              Designed for Meaningful Impact
            </h2>
            <p className="text-base text-[#6B7280]">
              Measuring success not merely by app activity, but by genuine improvements in athletic
              participation and facility vitality.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_BLOCKS.map((block) => {
              const Icon = block.icon;
              return (
                <StaggerItem key={block.title}>
                  <div
                    className="bg-white border border-[#E5EAED] rounded-xl p-6 hover:border-[#CDFF00] hover:shadow-xs transition-all flex flex-col justify-between h-full"
                  >
                    <div className="space-y-4">
                      <div className="w-11 h-11 rounded-lg bg-[#F8FFD9] border border-[#CDFF00]/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#222222]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#222222] font-display mb-1.5">
                          {block.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                          {block.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#E5EAED] flex items-center justify-between text-xs">
                      <span className="text-[#6B7280]">Focus Indicator</span>
                      <span className="font-bold text-[#222222]">{block.metric}</span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </motion.section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Community &amp; Ecosystem Dialogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#6B7280]">
              Clear answers to common questions about platform mechanisms, stakeholder integration,
              and community impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <FaqAccordion items={FAQ_ITEMS} onOpenGetInvolved={onOpenGetInvolved} />
          </FadeIn>
        </div>
      </motion.section>

      {/* 6. BIG VISION SECTION (#222222) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#222222] text-white py-24 relative overflow-hidden bg-dark-grid-pattern"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-[#CDFF00] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#CDFF00]" />
            Beyond Standalone Booking
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-balance leading-tight text-white">
            Sports Hub is more than a{' '}
            <span className="text-[#CDFF00]">booking platform</span>.
          </h2>

          <p className="text-base sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            It is a vision for a{' '}
            <span className="text-[#CDFF00] font-semibold">connected digital sports ecosystem</span>{' '}
            where opportunities become easier to discover, participation becomes easier to access,
            and the people and organizations that make sports possible become more connected.
          </p>
        </FadeIn>
      </motion.section>

      {/* 7. FINAL CTA (Background #CDFF00, Text #222222) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#CDFF00] text-[#222222] py-20"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#222222] text-balance">
            The future of sports is connected.
          </h2>
          <p className="text-lg sm:text-xl font-medium text-[#222222]/90 max-w-xl mx-auto">
            Let&apos;s make every opportunity easier to discover.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo(0, 0);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Explore Sports Hub
            </button>
            <button
              onClick={() => onOpenGetInvolved('enthusiast')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/90 hover:bg-white text-[#222222] border-2 border-[#222222] font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Get Involved
            </button>
          </div>
        </FadeIn>
      </motion.section>
    </div>
  );
};
