import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StakeholderRole } from '../types';
import { 
  Trophy, 
  GraduationCap, 
  Users2, 
  Activity, 
  CalendarDays, 
  ArrowRight
} from 'lucide-react';

// Custom Facility SVG icon matching the exact rounded building outline from the diagram
const FacilityIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M9 10h1.5" />
    <path d="M13.5 10H15" />
    <path d="M9 14h1.5" />
    <path d="M13.5 14H15" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
  </svg>
);

interface EcosystemNodeItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  xPercent: number; // percentage in coordinate space (matches diagram geometry)
  yPercent: number;
  highlightText: string;
  valueProp: string;
}

const NODE_ROLE_MAP: Record<string, StakeholderRole> = {
  facilities: 'facility_owner',
  competitions: 'organizer',
  academies: 'academy_coach',
  communities: 'community_leader',
  events: 'organizer',
  athletes: 'athlete',
};

interface EcosystemInteractiveProps {
  onNavigateToOpportunities?: () => void;
  onOpenGetInvolved?: (role?: StakeholderRole) => void;
  className?: string;
}

const NODES: EcosystemNodeItem[] = [
  {
    id: 'facilities',
    name: 'Facilities',
    category: 'Places to Play',
    icon: FacilityIcon,
    xPercent: 50,
    yPercent: 13,
    highlightText: 'Grounds, turf pitches, indoor courts & sports arenas',
    valueProp: 'Centralized discovery, verified visibility, transparent slot availability, and digital bookings.',
  },
  {
    id: 'competitions',
    name: 'Competitions',
    category: 'Tournaments & Leagues',
    icon: Trophy,
    xPercent: 82,
    yPercent: 30,
    highlightText: 'Leagues, knockouts, local cups & tournaments',
    valueProp: 'Streamlined team registration, verified fixtures, digital payments, and community championship brackets.',
  },
  {
    id: 'academies',
    name: 'Academies',
    category: 'Coaching & Training',
    icon: GraduationCap,
    xPercent: 78,
    yPercent: 74,
    highlightText: 'Youth academies, clinics & certified coaches',
    valueProp: 'Direct visibility for coaching programs, skill clinics, athlete development tracks, and tryouts.',
  },
  {
    id: 'communities',
    name: 'Communities',
    category: 'Grassroots & Clubs',
    icon: Users2,
    xPercent: 50,
    yPercent: 88,
    highlightText: 'Recreational clubs, pickups & social squads',
    valueProp: 'Player networking, open slot alerts, substitute callouts, and effortless team squad management.',
  },
  {
    id: 'athletes',
    name: 'Athletes',
    category: 'Players & Talent',
    icon: Activity,
    xPercent: 22,
    yPercent: 74,
    highlightText: 'Players of all skill levels & emerging athletes',
    valueProp: 'Frictionless discovery of open matches, court bookings, coaching sessions, and competitive trials nearby.',
  },
  {
    id: 'events',
    name: 'Events',
    category: 'Showcases & Programs',
    icon: CalendarDays,
    xPercent: 18,
    yPercent: 30,
    highlightText: 'Sports clinics, showcases, weekend jams & camps',
    valueProp: 'Real-time calendar updates, ticketed access, live schedules, and multi-sport community happenings.',
  },
];

export const EcosystemInteractive: React.FC<EcosystemInteractiveProps> = ({
  onNavigateToOpportunities,
  onOpenGetInvolved,
  className = '',
}) => {
  // Default to 'competitions' matching the reference spotlight
  const [activeNodeId, setActiveNodeId] = useState<string>('competitions');

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[1];

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-[var(--bg-surface)] dark:bg-[#0E1217] border border-[var(--border-default)] dark:border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col items-center relative overflow-hidden select-none ${className}`}
      style={{ color: 'var(--text-primary)' }}
    >
      {/* Background ambient lighting accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#CDFF00]/7 rounded-full blur-3xl pointer-events-none -z-0" 
        aria-hidden="true" 
      />

      {/* Top indicator bar - Spacious & clear */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm border-b border-[var(--border-default)] dark:border-white/10 pb-3 mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CDFF00] shadow-[0_0_8px_#CDFF00]" />
          <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-xs sm:text-sm">
            Connected Sports Ecosystem
          </span>
        </div>
        <span className="text-xs font-bold text-[var(--text-primary)] bg-[var(--accent-subtle)] dark:bg-[#CDFF00]/10 border border-[#CDFF00]/40 px-3 py-1 rounded-full">
          Click or Hover Any Node
        </span>
      </div>

      {/* Visual Canvas Area - Full generous scale matching older version */}
      <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center my-2 sm:my-4 relative z-10">
        
        {/* SVG connection beams and dashed lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="ecosystem-glow-compact" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#CDFF00" floodOpacity="0.8" />
            </filter>
          </defs>

          {NODES.map((node) => {
            const isSelected = node.id === activeNodeId;

            if (isSelected) {
              return (
                <g key={`beam-${node.id}`}>
                  {/* Outer vibrant soft glow beam */}
                  <line
                    x1="50"
                    y1="50"
                    x2={node.xPercent}
                    y2={node.yPercent}
                    stroke="#CDFF00"
                    strokeWidth="5"
                    strokeOpacity="0.35"
                    strokeLinecap="round"
                  />
                  {/* Main solid neon beam */}
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    x1="50"
                    y1="50"
                    x2={node.xPercent}
                    y2={node.yPercent}
                    stroke="#8DBF00"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Inner electric neon core line */}
                  <line
                    x1="50"
                    y1="50"
                    x2={node.xPercent}
                    y2={node.yPercent}
                    stroke="#CDFF00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Traveling pulse signal along active connector */}
                  <motion.circle
                    r="1.6"
                    fill="#FFFFFF"
                    stroke="#11161B"
                    strokeWidth="0.6"
                    animate={{
                      cx: [50, node.xPercent],
                      cy: [50, node.yPercent],
                      opacity: [0.3, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            }

            // Unselected nodes: crisp dashed connector line
            return (
              <line
                key={`dash-${node.id}`}
                x1="50"
                y1="50"
                x2={node.xPercent}
                y2={node.yPercent}
                stroke="var(--border-strong)"
                strokeWidth="1.2"
                strokeDasharray="2.5 2.5"
                strokeLinecap="round"
                strokeOpacity="0.65"
              />
            );
          })}
        </svg>

        {/* Central Core Box: THE DIGITAL CORE / SPORTS HUB - Older spacious sizing */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl bg-[var(--bg-elevated)] dark:bg-[#161B22] border-2 border-[#CDFF00] p-3 sm:p-4 text-center flex flex-col items-center justify-center shadow-[0_0_24px_rgba(205,255,0,0.25)] cursor-default select-none transition-shadow"
        >
          {/* Subtle green glowing dot */}
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#CDFF00] mb-1.5 sm:mb-2 shadow-[0_0_8px_#CDFF00] animate-pulse" />

          {/* Core label - Using --text-primary */}
          <span className="text-[9px] sm:text-[10.5px] font-black tracking-widest text-[var(--text-primary)] uppercase block leading-none mb-1">
            THE DIGITAL CORE
          </span>

          {/* Brand headline - Uses --text-primary */}
          <h3 className="text-sm sm:text-lg md:text-xl font-black text-[var(--text-primary)] tracking-tight font-display">
            SPORTS HUB
          </h3>

          {/* Subtitle - Uses --text-primary for high contrast */}
          <span className="text-[9.5px] sm:text-xs font-semibold text-[var(--text-primary)] mt-1 sm:mt-1.5 leading-tight">
            Interconnected Network
          </span>
        </motion.div>

        {/* 6 Satellite Nodes - Generous card proportions matching older version */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNodeId;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.xPercent}%`,
                top: `${node.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 pointer-events-auto"
            >
              <motion.button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  transition: { type: 'spring', stiffness: 400, damping: 22 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                }}
                className={`group relative flex flex-col items-center justify-center rounded-2xl p-2 sm:p-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] select-none ${
                  isSelected
                    ? 'w-22 sm:w-26 md:w-30 bg-[var(--bg-elevated)] dark:bg-[#161B22] border-2 border-[#CDFF00] shadow-[0_0_20px_rgba(205,255,0,0.40),0_4px_12px_rgba(0,0,0,0.3)] ring-2 ring-[#CDFF00]/25'
                    : 'w-20 sm:w-24 md:w-26 bg-[var(--bg-surface)] dark:bg-[#161B22]/90 border border-[var(--border-default)] dark:border-white/15 hover:border-[#CDFF00]/80 hover:bg-[var(--bg-elevated)] dark:hover:bg-[#1F2530] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2),0_0_10px_rgba(205,255,0,0.15)]'
                }`}
                aria-label={`Select ${node.name}`}
              >
                {/* Icon square */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-transparent text-[var(--text-primary)] scale-105'
                      : 'bg-[var(--bg-card-subtle)] dark:bg-[#1F2530] border border-[var(--border-subtle)] dark:border-white/10 text-[var(--text-primary)] group-hover:bg-[#222222] group-hover:text-[#CDFF00] group-hover:scale-105'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 text-[var(--text-primary)] ${isSelected ? 'drop-shadow-[0_0_6px_rgba(205,255,0,0.35)]' : 'group-hover:text-[#CDFF00]'}`} />
                </div>

                {/* Node Name Label - Strict --text-primary for guaranteed WCAG contrast */}
                <span
                  className={`text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-1.5 tracking-tight transition-colors whitespace-nowrap text-[var(--text-primary)] ${
                    isSelected
                      ? 'font-black'
                      : 'font-bold group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  {node.name}
                </span>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Active Node Detail Callout Bar: Spacious, clear, high-contrast */}
      <motion.div
        layout
        className="w-full max-w-3xl mt-4 sm:mt-5 p-3.5 sm:p-5 sm:px-6 rounded-2xl bg-[var(--bg-elevated)] dark:bg-[#161B22] border border-[var(--border-default)] dark:border-[#CDFF00]/60 hover:border-[#CDFF00] shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.16 }}
            className="space-y-1.5 text-left"
          >
            {/* Eyebrow category badge with --text-primary */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CDFF00] shadow-[0_0_6px_#CDFF00]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-primary)]">
                {activeNode.category}
              </span>
            </div>

            {/* Main title & highlight - Strictly mapped to --text-primary with full opacity */}
            <div className="text-sm sm:text-base font-black text-[var(--text-primary)] font-display flex flex-wrap items-center gap-2">
              <span>{activeNode.name}</span>
              <span className="text-[var(--text-secondary)] font-bold" aria-hidden="true">·</span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{activeNode.highlightText}</span>
            </div>

            {/* Description - Strictly mapped to --text-primary with full opacity */}
            <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed max-w-xl">
              {activeNode.valueProp}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons - Spacious, comfortable touch targets */}
        <div className="shrink-0 flex flex-wrap items-center gap-2 pt-1 md:pt-0">
          {onOpenGetInvolved && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
              onClick={() => onOpenGetInvolved(NODE_ROLE_MAP[activeNode.id])}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#CDFF00] hover:bg-[#D6FF33] active:bg-[#B8E600] text-[#11161B] font-extrabold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(205,255,0,0.25)] hover:shadow-[0_4px_14px_rgba(205,255,0,0.35)] select-none"
            >
              <span>Inquire as {activeNode.name}</span>
              <ArrowRight className="w-4 h-4 text-[#11161B]" />
            </motion.button>
          )}

          {onNavigateToOpportunities && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 } }}
              onClick={onNavigateToOpportunities}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 active:bg-black/15 text-[var(--text-primary)] border border-[var(--border-default)] dark:border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer select-none"
            >
              <span>Explore Opportunities</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EcosystemInteractive;
