import React, { useState } from 'react';
import { StakeholderRole } from '../types';
import { 
  Building2, 
  Trophy, 
  GraduationCap, 
  Users, 
  Activity, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EcosystemNodeItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  xPercent: number; // percentage in coordinate space
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
}

const NODES: EcosystemNodeItem[] = [
  {
    id: 'facilities',
    name: 'Facilities',
    category: 'Places to Play',
    icon: Building2,
    xPercent: 50,
    yPercent: 12,
    highlightText: 'Grounds, turf pitches, courts & arenas',
    valueProp: 'Centralized discovery, transparent slot availability, and digital bookings.',
  },
  {
    id: 'competitions',
    name: 'Competitions',
    category: 'Tournaments & Cups',
    icon: Trophy,
    xPercent: 86,
    yPercent: 30,
    highlightText: 'Leagues, knockouts & local cups',
    valueProp: 'Streamlined team registration, verified fixtures, and community championship brackets.',
  },
  {
    id: 'academies',
    name: 'Academies',
    category: 'Coaching & Training',
    icon: GraduationCap,
    xPercent: 82,
    yPercent: 74,
    highlightText: 'Youth academies, clinics & certified coaches',
    valueProp: 'Direct visibility for coaching programs, skill clinics, and athlete development tracks.',
  },
  {
    id: 'communities',
    name: 'Communities',
    category: 'Grassroots & Clubs',
    icon: Users,
    xPercent: 50,
    yPercent: 88,
    highlightText: 'Recreational clubs, pickups & social squads',
    valueProp: 'Player networking, open slot alerts, and effortless team squad management.',
  },
  {
    id: 'athletes',
    name: 'Athletes',
    category: 'Players & Talent',
    icon: Activity,
    xPercent: 18,
    yPercent: 74,
    highlightText: 'Players of all skill levels & emerging athletes',
    valueProp: 'Frictionless discovery of open matches, coaching, facilities, and competitive trials.',
  },
  {
    id: 'events',
    name: 'Events',
    category: 'Showcases & Programs',
    icon: Calendar,
    xPercent: 14,
    yPercent: 30,
    highlightText: 'Sports clinics, trials, weekend jams & camps',
    valueProp: 'Real-time calendar updates, ticketed access, and multi-sport community happenings.',
  },
];

export const EcosystemInteractive: React.FC<EcosystemInteractiveProps> = ({
  onNavigateToOpportunities,
  onOpenGetInvolved,
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('facilities');

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="w-full bg-white border-2 border-[#E5EAED] hover:border-[#CDFF00]/80 rounded-2xl p-6 sm:p-10 shadow-sm transition-all duration-300 flex flex-col items-center relative">
      {/* Subtle top indicator label */}
      <div className="w-full flex items-center justify-between text-xs text-[#6B7280] border-b border-[#E5EAED] pb-3 mb-2">
        <span className="font-bold text-[#222222] uppercase tracking-wider text-[11px]">
          Multi-Node Ecosystem Map
        </span>
        <span className="text-[11px] font-semibold text-[#9ECC00] bg-[#F8FFD9] px-2 py-0.5 rounded">
          Click or Hover Any Node
        </span>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full max-w-xl aspect-square sm:aspect-16/10 flex items-center justify-center my-4">
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {NODES.map((node) => {
            const isSelected = node.id === activeNodeId;
            return (
              <g key={`line-${node.id}`}>
                {/* Subtle base line */}
                <line
                  x1="50"
                  y1="50"
                  x2={node.xPercent}
                  y2={node.yPercent}
                  stroke={isSelected ? '#9ECC00' : '#E5EAED'}
                  strokeWidth={isSelected ? '1.5' : '0.8'}
                  strokeDasharray={isSelected ? 'none' : '2,2'}
                  className="transition-colors duration-300"
                />
                {/* Active node neon ping indicator */}
                {isSelected && (
                  <circle
                    cx={node.xPercent}
                    cy={node.yPercent}
                    r="2.5"
                    fill="#CDFF00"
                    stroke="#222222"
                    strokeWidth="0.8"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Hub Block */}
        <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-[#222222] border-2 border-[#CDFF00] p-3 text-center flex flex-col items-center justify-center shadow-lg transition-transform">
          <div className="w-2 h-2 rounded-full bg-[#CDFF00] mb-1.5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#CDFF00]">
            The Digital Core
          </span>
          <h4 className="text-base sm:text-lg font-black text-white tracking-tight font-display">
            SPORTS HUB
          </h4>
          <span className="text-[10px] text-[#9CA3AF] mt-1 text-balance leading-tight">
            Interconnected Network
          </span>
        </div>

        {/* Satellite Nodes */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNodeId;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              style={{
                left: `${node.xPercent}%`,
                top: `${node.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-20 group flex flex-col items-center p-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] ${
                isSelected
                  ? 'bg-white border-2 border-[#CDFF00] shadow-md scale-105'
                  : 'bg-[#F2F3F7] border border-[#E5EAED] hover:border-[#9ECC00] hover:bg-white'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#F8FFD9] text-[#222222]' : 'bg-white text-[#6B7280]'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-[#222222]' : ''}`} />
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-1 tracking-tight ${
                  isSelected ? 'text-[#222222]' : 'text-[#6B7280]'
                }`}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Node Detail Callout Bar */}
      <div className="w-full mt-4 p-4.5 rounded-xl bg-[#F8FFD9] border border-[#CDFF00]/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#222222] tracking-wide uppercase">
              {activeNode.name}
            </span>
            <span className="text-xs text-[#6B7280]">·</span>
            <span className="text-xs font-semibold text-[#222222]">{activeNode.highlightText}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-xl">
            {activeNode.valueProp}
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-2">
          {onOpenGetInvolved && (
            <button
              onClick={() => onOpenGetInvolved(NODE_ROLE_MAP[activeNode.id])}
              className="px-4 py-2 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Inquire as {activeNode.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
            </button>
          )}

          {onNavigateToOpportunities && (
            <button
              onClick={onNavigateToOpportunities}
              className="px-3.5 py-2 bg-white hover:bg-[#F2F3F7] text-[#222222] border border-[#E5EAED] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Opportunities</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
