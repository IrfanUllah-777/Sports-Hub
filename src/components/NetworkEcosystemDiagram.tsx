import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  GraduationCap, 
  Users2, 
  Activity, 
  CalendarDays,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export interface NetworkNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  // Coordinates as percentage in a 100x100 space
  x: number;
  y: number;
  description: string;
  badge: string;
}

// Custom Facility SVG icon matching the exact rounded building outline in the image
const FacilityIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M9 10h1.5" />
    <path d="M13.5 10H15" />
    <path d="M9 14h1.5" />
    <path d="M13.5 14H15" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
  </svg>
);

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: 'facilities',
    name: 'Facilities',
    category: 'Places to Play',
    icon: FacilityIcon,
    x: 50,
    y: 12,
    description: 'Grounds, turf pitches, indoor courts & sports arenas gain verified visibility, slot booking, and utilization tools.',
    badge: 'Active Spotlight',
  },
  {
    id: 'competitions',
    name: 'Competitions',
    category: 'Tournaments & Leagues',
    icon: Trophy,
    x: 82,
    y: 30,
    description: 'Structured brackets, entry fee management, verified fixtures, and team registration for local and regional cups.',
    badge: 'Competitive Brackets',
  },
  {
    id: 'academies',
    name: 'Academies',
    category: 'Coaching & Training',
    icon: GraduationCap,
    x: 78,
    y: 74,
    description: 'Accredited academies, personal coaches, and developmental clinics with direct access to young aspiring athletes.',
    badge: 'Talent Pathways',
  },
  {
    id: 'communities',
    name: 'Communities',
    category: 'Clubs & Pickups',
    icon: Users2,
    x: 50,
    y: 88,
    description: 'Local recreational clubs, open pickup games, and substitute player callouts without chaotic group chats.',
    badge: 'Grassroots Network',
  },
  {
    id: 'athletes',
    name: 'Athletes',
    category: 'Players & Seekers',
    icon: Activity,
    x: 22,
    y: 74,
    description: 'Frictionless discovery of open matches, court bookings, coaching sessions, and competitive trials nearby.',
    badge: 'Player Access',
  },
  {
    id: 'events',
    name: 'Events',
    category: 'Showcases & Programs',
    icon: CalendarDays,
    x: 18,
    y: 30,
    description: 'Sports showcases, weekend youth jamborees, multi-sport festivals, and public community athletic announcements.',
    badge: 'Live Schedules',
  },
];

interface NetworkEcosystemDiagramProps {
  onNavigateToSolution?: () => void;
  className?: string;
}

export const NetworkEcosystemDiagram: React.FC<NetworkEcosystemDiagramProps> = ({
  onNavigateToSolution,
  className = '',
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('facilities');

  const activeNode = NETWORK_NODES.find((n) => n.id === activeNodeId) || NETWORK_NODES[0];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Visual Canvas Area with exact radial arrangement */}
      <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-2 sm:p-4 select-none">
        
        {/* SVG Connectors Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glow filter for active connector */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#CDFF00" floodOpacity="0.8" />
            </filter>
            
            {/* Linear gradient along active line */}
            <linearGradient id="active-beam-gradient" x1="50%" y1="50%" x2={`${activeNode.x}%`} y2={`${activeNode.y}%`}>
              <stop offset="0%" stopColor="#CDFF00" />
              <stop offset="100%" stopColor="#9ECC00" />
            </linearGradient>
          </defs>

          {NETWORK_NODES.map((node) => {
            const isActive = node.id === activeNodeId;

            if (isActive) {
              return (
                <g key={`active-line-${node.id}`}>
                  {/* Outer soft glow beam */}
                  <line
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="#CDFF00"
                    strokeWidth="5"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />
                  {/* Main solid neon beam matching the image exactly */}
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="#8DBF00"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Inner vibrant accent line */}
                  <line
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="#CDFF00"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Energy packet pulsing along the active beam */}
                  <motion.circle
                    r="1.8"
                    fill="#FFFFFF"
                    stroke="#222222"
                    strokeWidth="0.6"
                    animate={{
                      cx: [50, node.x],
                      cy: [50, node.y],
                      opacity: [0.2, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            }

            return (
              <motion.line
                key={`dash-line-${node.id}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="#D1D5DB"
                strokeWidth="1.2"
                strokeDasharray="2.5 2.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Central Core Box: THE DIGITAL CORE / SPORTS HUB */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl bg-[#1E2023] border-[2.5px] border-[#CDFF00] p-3 sm:p-4 text-center flex flex-col items-center justify-center shadow-xl select-none"
        >
          {/* Subtle neon glow back-layer */}
          <div className="absolute inset-0 rounded-2xl bg-[#CDFF00]/10 blur-md pointer-events-none -z-10" />

          {/* Green dot */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2.5 h-2.5 rounded-full bg-[#CDFF00] mb-2 sm:mb-2.5 shadow-[0_0_8px_#CDFF00]" 
          />

          {/* Core label */}
          <span className="text-[9.5px] sm:text-[11px] font-black tracking-widest text-[#CDFF00] uppercase block">
            THE DIGITAL CORE
          </span>

          {/* Brand headline */}
          <h3 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight font-display mt-0.5 sm:mt-1">
            SPORTS HUB
          </h3>

          {/* Subtitle */}
          <span className="text-[10px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 font-medium leading-tight">
            Interconnected Network
          </span>
        </motion.div>

        {/* 6 Satellite Node Cards */}
        {NETWORK_NODES.map((node, index) => {
          const Icon = node.icon;
          const isActive = node.id === activeNodeId;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.7, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20"
            >
              <motion.button
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3.5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] ${
                  isActive
                    ? 'w-24 sm:w-28 md:w-32 bg-[#F8FFD9] border-2 border-[#CDFF00] shadow-md ring-4 ring-[#CDFF00]/20'
                    : 'w-22 sm:w-26 md:w-28 bg-[#F2F4F7] border border-[#E2E6EA] hover:bg-white hover:border-[#9ECC00] shadow-xs'
                }`}
              >
                {/* White inner rounded square container for icon */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-white text-[#222222] shadow-xs'
                      : 'bg-white text-[#4B5563] group-hover:text-[#222222]'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[#222222]' : 'text-[#4B5563]'}`} />
                </div>

                {/* Node Label */}
                <span
                  className={`text-[11px] sm:text-xs font-bold mt-1.5 sm:mt-2 tracking-tight transition-colors ${
                    isActive ? 'text-[#222222]' : 'text-[#4B5563]'
                  }`}
                >
                  {node.name}
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Active Node Detail Callout */}
      <motion.div
        layout
        className="w-full max-w-3xl mt-6 p-4 sm:p-5 rounded-2xl bg-[#F8FFD9] border-2 border-[#CDFF00] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#222222]" />
            <h4 className="text-sm font-extrabold text-[#222222] font-display uppercase tracking-wide">
              {activeNode.name}
            </h4>
            <span className="text-xs text-[#6B7280]">·</span>
            <span className="text-xs font-bold text-[#8DBF00]">{activeNode.category}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-xl">
            {activeNode.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {onNavigateToSolution && (
            <button
              onClick={onNavigateToSolution}
              className="px-4 py-2 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              Explore Pillar
              <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
