import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Compass, 
  Trophy, 
  GraduationCap, 
  Users2, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Calendar,
  Activity,
  SlidersHorizontal
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionTransitions';

export interface MilestoneItem {
  id: string;
  horizon: string;
  quarter: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'facilities' | 'athletes' | 'tournaments' | 'academies' | 'ecosystem';
  categoryLabel: string;
  status: 'operational' | 'in_progress' | 'target' | 'horizon';
  statusLabel: string;
  icon: React.ElementType;
  keyDeliverables: string[];
  systemMetric: string;
  architectureHighlight: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'm1',
    horizon: 'Horizon 01',
    quarter: 'Q1 2026',
    title: 'Verified Facility Indexing & Geo-Mapping',
    subtitle: 'High-Fidelity Physical Infrastructure Layer',
    description: 'Cataloging and auditing sports turfs, floodlit courts, and community grounds across initial metro regions with verified surface specs and geo-coordinates.',
    category: 'facilities',
    categoryLabel: 'Venues & Facilities',
    status: 'operational',
    statusLabel: 'Operational in Pilot',
    icon: Building2,
    keyDeliverables: [
      'Comprehensive ground & court surface categorization (Natural grass, FIFA-grade AstroTurf, Hardcourt)',
      'Floodlighting lux levels and changeroom amenity auditing',
      'High-resolution photographic dossiers and verified geo-location pins'
    ],
    systemMetric: '150+ Verified Pitches',
    architectureHighlight: 'Zero-unverified listing rule with dual-verification operator handshake.'
  },
  {
    id: 'm2',
    horizon: 'Horizon 02',
    quarter: 'Q2 2026',
    title: 'Real-Time Slot Engine & Digital Match Passes',
    subtitle: 'Frictionless Direct Access Protocol',
    description: 'Enabling direct digital slot reservations, live blackout schedule synchronization, and cryptographic digital entry passes for match leads and players.',
    category: 'athletes',
    categoryLabel: 'Athletes & Squads',
    status: 'in_progress',
    statusLabel: 'Active Rollout',
    icon: Clock,
    keyDeliverables: [
      'Real-time availability calendar with sub-second slot lock mechanism',
      'Automated QR match pass generation with unique verification hashes',
      'Ground owner dashboard with instant rate adjustments and maintenance blackouts'
    ],
    systemMetric: '0% Double-Booking Rate',
    architectureHighlight: 'Idempotent reservation ledger eliminating overlapping bookings.'
  },
  {
    id: 'm3',
    horizon: 'Horizon 03',
    quarter: 'Q3 2026',
    title: 'Sanctioned Tournament Hub & Squad Rostering',
    subtitle: 'Competitive Governance & Bracket Automation',
    description: 'A unified portal for tournament directors to publish cups and leagues with automatic single-elimination brackets, verified rosters, and transparent prize pools.',
    category: 'tournaments',
    categoryLabel: 'Tournaments & Leagues',
    status: 'in_progress',
    statusLabel: 'Active Rollout',
    icon: Trophy,
    keyDeliverables: [
      'Dynamic single-elimination and round-robin bracket visualization engine',
      'Digital captain roster submission with contact & player eligibility verification',
      'Live score tracking, match schedules, and official seed publishing'
    ],
    systemMetric: '64 Squads / Cup Capacity',
    architectureHighlight: 'Standardized knockout engine with deterministic bracket seeding.'
  },
  {
    id: 'm4',
    horizon: 'Horizon 04',
    quarter: 'Q4 2026',
    title: 'Accredited Academy Hubs & Skills Progression',
    subtitle: 'Structured Athletic Pathways',
    description: 'Providing accredited coaching clinics, independent trainers, and developmental youth academies with verifiable profile hubs and open trial booking.',
    category: 'academies',
    categoryLabel: 'Academies & Coaching',
    status: 'target',
    statusLabel: 'Target Milestone',
    icon: GraduationCap,
    keyDeliverables: [
      'Verified coach credentials, certifications, and philosophy portfolios',
      'Age-group cohort syllabi and seasonal bootcamp registration workflows',
      'Parent-coach inquiry and trial assessment booking channels'
    ],
    systemMetric: '50+ Verified Academies',
    architectureHighlight: 'Credential attestation ensuring only certified trainers hold verified badges.'
  },
  {
    id: 'm5',
    horizon: 'Horizon 05',
    quarter: 'Q1-Q2 2027',
    title: 'Community Matchmaking & Substitute Callout Ping',
    subtitle: 'Grassroots Community Coordination',
    description: 'Connecting recreational squads seeking last-minute substitute players, friendly sparring matches, or community weekend pickup games across nearby radius.',
    category: 'athletes',
    categoryLabel: 'Athletes & Squads',
    status: 'horizon',
    statusLabel: 'Future Horizon',
    icon: Users2,
    keyDeliverables: [
      'Instant substitute player callout alerts based on sport, position, and skill tier',
      'Neighborhood open pickup match boards welcoming recreational newcomers',
      'Cross-club sparring fixture arrangements and friendly match matchmaking'
    ],
    systemMetric: 'Zero Forfeited Matches',
    architectureHighlight: 'Radius-filtered real-time push routing for player substitute dispatch.'
  },
  {
    id: 'm6',
    horizon: 'Horizon 06',
    quarter: 'Q3-Q4 2027',
    title: 'Civic Infrastructure & Multi-City Sports Ledger',
    subtitle: 'Regional Scaled Ecosystem Integration',
    description: 'Integrating municipal sporting facilities, public school grounds, and regional inter-city championships into a federated, open digital sports substrate.',
    category: 'ecosystem',
    categoryLabel: 'Ecosystem Scale',
    status: 'horizon',
    statusLabel: 'Future Horizon',
    icon: Compass,
    keyDeliverables: [
      'Inter-city championship showcases and regional invitational tournaments',
      'Government sports department grants and municipal field integration',
      'Open sports data standard for grassroots athletic statistics and venue directories'
    ],
    systemMetric: '5+ Regional Metros',
    architectureHighlight: 'Multi-tenant federated API for institutional and civic sports partners.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Milestones' },
  { id: 'facilities', label: 'Facilities & Grounds' },
  { id: 'athletes', label: 'Athletes & Squads' },
  { id: 'tournaments', label: 'Tournaments & Cups' },
  { id: 'academies', label: 'Academies & Coaching' },
  { id: 'ecosystem', label: 'Ecosystem Scale' },
];

export const MilestonesTimeline: React.FC<{ onOpenGetInvolved?: () => void }> = ({ onOpenGetInvolved }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(MILESTONES[0].id);

  const filteredMilestones = selectedCategory === 'all'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === selectedCategory);

  const activeMilestone = MILESTONES.find((m) => m.id === activeMilestoneId) || MILESTONES[0];

  const getStatusBadge = (status: MilestoneItem['status'], label: string) => {
    switch (status) {
      case 'operational':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {label}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#F8FFD9] dark:bg-[#CDFF00]/15 text-[#11161B] dark:text-[#CDFF00] border border-[#CDFF00]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
            {label}
          </span>
        );
      case 'target':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            {label}
          </span>
        );
      case 'horizon':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-[#1E2530] text-[#6B7280] dark:text-[#A4ABB6] border border-[#E5EAED] dark:border-[#2A313C]">
            <Compass className="w-3 h-3 text-[#9CA3AF] dark:text-[#64748B]" />
            {label}
          </span>
        );
    }
  };

  return (
    <div className="space-y-10">
      {/* Track Filter Navigation */}
      <FadeIn delay={0.08}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-[#F2F3F7] dark:bg-[#12171F] border border-[#E5EAED] dark:border-[#2A313C] rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#222222] dark:text-[#CDFF00]" />
            <span>Filter Track:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0 w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] ${
                    isActive
                      ? 'bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#0A0D14] shadow-xs'
                      : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-white hover:bg-white dark:hover:bg-[#1A222D]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Interactive Milestone Cards Timeline Spine */}
      <div className="relative">
        {/* Continuous Architectural Spine Line */}
        <div 
          className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#CDFF00] via-[#CDFF00]/40 to-neutral-300 dark:to-neutral-800"
          aria-hidden="true" 
        />

        <div className="space-y-6 lg:space-y-12">
          {filteredMilestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isCurrentActive = activeMilestoneId === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`relative flex flex-col lg:flex-row items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Indicator (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                  <button
                    type="button"
                    onClick={() => setActiveMilestoneId(item.id)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      isCurrentActive
                        ? 'bg-[#0A0D14] dark:bg-[#161B22] border-[#CDFF00] scale-125 shadow-[0_0_16px_rgba(205,255,0,0.5)]'
                        : 'bg-white dark:bg-[#161B22] border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] hover:scale-110'
                    }`}
                    title={`Inspect ${item.title}`}
                  >
                    <span 
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isCurrentActive ? 'bg-[#CDFF00]' : 'bg-[#6B7280] dark:bg-[#A4ABB6]'
                      }`} 
                    />
                  </button>
                </div>

                {/* Milestone Content Card (Takes half-width on large screens) */}
                <div className="w-full lg:w-[calc(50%-2rem)]">
                  <motion.div
                    onClick={() => setActiveMilestoneId(item.id)}
                    whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden text-left ${
                      isCurrentActive
                        ? 'bg-white dark:bg-[#161B22] border-[#222222] dark:border-[#CDFF00] ring-2 ring-[#CDFF00]/40 shadow-lg'
                        : 'bg-white dark:bg-[#12171F] border-[#E5EAED] dark:border-[#2A313C] hover:border-[#CDFF00] dark:hover:border-[#CDFF00]/60 hover:shadow-md'
                    }`}
                  >
                    {/* Top Edge Lime Glow for active card */}
                    {isCurrentActive && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00]" />
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
                          {item.horizon} · {item.quarter}
                        </span>
                      </div>
                      <div>
                        {getStatusBadge(item.status, item.statusLabel)}
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isCurrentActive
                          ? 'bg-[#CDFF00] text-[#0A0D14]'
                          : 'bg-[#F2F3F7] dark:bg-[#1E2530] text-[#222222] dark:text-[#CDFF00]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black font-display text-[#222222] dark:text-[#F3F4F6] leading-tight">
                          {item.title}
                        </h3>
                        <div className="text-xs font-semibold text-[#9ECC00] dark:text-[#CDFF00] mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#D5D8DD] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Key Deliverables Bulleted List */}
                    <div className="space-y-2 border-t border-[#E5EAED] dark:border-[#2A313C] pt-3.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
                        Core Deliverables:
                      </div>
                      {item.keyDeliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#222222] dark:text-[#E2E8F0]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CDFF00] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Metric and Inspect Action */}
                    <div className="mt-4 pt-3 border-t border-[#E5EAED] dark:border-[#2A313C] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[#222222] dark:text-[#F3F4F6]">
                        <Activity className="w-3.5 h-3.5 text-[#CDFF00]" />
                        <span>Target: <strong className="text-[#9ECC00] dark:text-[#CDFF00]">{item.systemMetric}</strong></span>
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                        isCurrentActive ? 'text-[#CDFF00]' : 'text-[#6B7280] dark:text-[#A4ABB6]'
                      }`}>
                        <span>{isCurrentActive ? 'Active Inspection' : 'Select to Expand'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Empty opposite spacer for symmetrical 2-column layout on desktop */}
                <div className="hidden lg:block w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Milestone Focus Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMilestone.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8 bg-[#0A0D14] text-white rounded-2xl border-2 border-[#CDFF00] shadow-xl space-y-6 relative overflow-hidden"
        >
          {/* Subtle background ambient spotlight glow */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 bg-[#CDFF00]/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 relative z-10">
            <div>
              <div className="text-[10px] font-extrabold font-mono uppercase tracking-widest text-[#CDFF00]">
                Architecture Blueprint Spotlight · {activeMilestone.horizon} ({activeMilestone.quarter})
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                {activeMilestone.title}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(activeMilestone.status, activeMilestone.statusLabel)}
              <div className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-xs font-mono font-bold text-[#CDFF00]">
                {activeMilestone.categoryLabel}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs relative z-10">
            <div className="p-4 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Core Architectural Guarantee
              </span>
              <p className="text-sm font-bold text-white leading-snug">
                {activeMilestone.architectureHighlight}
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Primary Target Outcome
              </span>
              <p className="text-sm font-bold text-[#CDFF00] leading-snug">
                {activeMilestone.systemMetric}
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Stakeholder Track Participation
                </span>
                <p className="text-xs text-neutral-300 mt-1">
                  Ready to test or contribute data to this milestone?
                </p>
              </div>
              {onOpenGetInvolved && (
                <button
                  type="button"
                  onClick={onOpenGetInvolved}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#CDFF00] hover:text-[#b8e600] transition-colors cursor-pointer"
                >
                  <span>Participate in {activeMilestone.horizon}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
