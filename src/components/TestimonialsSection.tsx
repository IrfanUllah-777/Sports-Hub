import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './MotionTransitions';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Quote, 
  Pause, 
  Play, 
  Trophy, 
  Building2, 
  GraduationCap, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StakeholderRole } from '../types';

export interface TestimonialItem {
  id: string;
  name: string;
  roleTitle: string;
  roleCategory: 'athlete' | 'organizer' | 'facility' | 'academy';
  organization: string;
  sport: string;
  location: string;
  quote: string;
  metric: string;
  metricLabel: string;
  initials: string;
  targetRole: StakeholderRole;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    roleTitle: 'Tournament Director',
    roleCategory: 'organizer',
    organization: 'Apex Metro Football League',
    sport: '7-a-Side Soccer',
    location: 'Austin, TX',
    quote:
      'Before Sports Hub, filling our 32-team tournament bracket took three weeks of cold messaging across WhatsApp and Instagram. On Sports Hub, every team slot was filled in 48 hours with verified roster submissions and automated fee collection.',
    metric: '48hr',
    metricLabel: 'Bracket Fill Time',
    initials: 'MS',
    targetRole: 'organizer',
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    roleTitle: 'Competitive Player & Club Captain',
    roleCategory: 'athlete',
    organization: 'Eastside Badminton Club',
    sport: 'Badminton',
    location: 'Seattle, WA',
    quote:
      'Finding available indoor courts with reliable synthetic mats used to mean calling five venue managers every Monday evening. Now our squad checks live court availability, splits booking fees seamlessly, and plays without guesswork.',
    metric: 'Zero',
    metricLabel: 'Phone Tag Friction',
    initials: 'ER',
    targetRole: 'athlete',
  },
  {
    id: 'tariq',
    name: 'Tariq Al-Mansoor',
    roleTitle: 'General Manager',
    roleCategory: 'facility',
    organization: 'Falcon Sports Arena & Turf Complex',
    sport: 'Multi-Sport Turf',
    location: 'Dallas, TX',
    quote:
      'Our weekday morning and late-night slot occupancy surged by over 40%. Instead of turf sitting idle, local clubs and corporate leagues discover open slots directly on the portal and book instantly.',
    metric: '+41%',
    metricLabel: 'Off-Peak Slot Utilization',
    initials: 'TA',
    targetRole: 'facility_owner',
  },
  {
    id: 'chloe',
    name: 'Chloe Bennett',
    roleTitle: 'Head Performance Coach',
    roleCategory: 'academy',
    organization: 'Vanguard Youth Tennis Academy',
    sport: 'Tennis Coaching',
    location: 'Denver, CO',
    quote:
      'Listing our seasonal development clinics on Sports Hub opened an organic channel to local families. We doubled trial registrations in one season without having to rely on expensive social media ad campaigns.',
    metric: '240+',
    metricLabel: 'Junior Clinic Signups',
    initials: 'CB',
    targetRole: 'academy_coach',
  },
  {
    id: 'devon',
    name: 'Devon Washington',
    roleTitle: 'Club Captain',
    roleCategory: 'athlete',
    organization: 'Metro Hoops Basketball Club',
    sport: 'Basketball',
    location: 'Atlanta, GA',
    quote:
      'Arranging competitive weekend scrimmage fixtures against matched teams was always chaotic. With Sports Hub’s team directory, we publish an open challenge and match with a verified squad within hours.',
    metric: '18 Fixtures',
    metricLabel: 'Competitive Matches Hosted',
    initials: 'DW',
    targetRole: 'athlete',
  },
  {
    id: 'rajesh',
    name: 'Rajesh Nair',
    roleTitle: 'League Commissioner',
    roleCategory: 'organizer',
    organization: 'Tech City Corporate Cricket Cup',
    sport: 'Cricket Tournament',
    location: 'San Jose, CA',
    quote:
      'Managing ground assignments, player eligibility rosters, and schedule changes across eight turf facilities was our biggest operational hurdle. Having a single digital substrate made our entire cup transparent for players and captains.',
    metric: '64 Teams',
    metricLabel: 'Managed on Platform',
    initials: 'RN',
    targetRole: 'organizer',
  },
  {
    id: 'siddharth',
    name: 'Siddharth Mehta',
    roleTitle: 'Proprietor & Operator',
    roleCategory: 'facility',
    organization: 'Baseline Arena & Floodlit Turf',
    sport: 'Football & Box Cricket',
    location: 'Phoenix, AZ',
    quote:
      'Double bookings and uncollected cash were constant headaches. With Sports Hub, our operational overhead dropped to zero. Every slot is verified in real-time and paid upfront directly into our account.',
    metric: '100%',
    metricLabel: 'Digital Automated Bookings',
    initials: 'SM',
    targetRole: 'facility_owner',
  },
  {
    id: 'aisha',
    name: 'Aisha Morales',
    roleTitle: 'Run Club Founder & Marathoner',
    roleCategory: 'athlete',
    organization: 'Harbor Community Runners',
    sport: 'Athletics & Road Running',
    location: 'San Diego, CA',
    quote:
      'We started with 25 friends and expanded to over 800 members. Because our weekly community 5K and 10K meetups are listed on a dedicated sports discovery hub, runners visiting or moving to our city find us immediately.',
    metric: '850+',
    metricLabel: 'Active Community Runners',
    initials: 'AM',
    targetRole: 'community_leader',
  },
];

interface TestimonialsSectionProps {
  onOpenGetInvolved: (role?: StakeholderRole) => void;
  onNavigateToOpportunities: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenGetInvolved,
  onNavigateToOpportunities,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'athlete' | 'organizer' | 'facility' | 'academy'>('all');
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = activeCategory === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((item) => item.roleCategory === activeCategory);

  // Auto-scroll loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.6; // pixels per tick

    const step = () => {
      if (!isPaused && container) {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, filteredTestimonials.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 400;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'organizer':
        return <Trophy className="w-3.5 h-3.5 text-[#222222]" />;
      case 'facility':
        return <Building2 className="w-3.5 h-3.5 text-[#222222]" />;
      case 'academy':
        return <GraduationCap className="w-3.5 h-3.5 text-[#222222]" />;
      case 'athlete':
      default:
        return <Users className="w-3.5 h-3.5 text-[#222222]" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'organizer':
        return 'Tournament Organizer';
      case 'facility':
        return 'Facility Manager';
      case 'academy':
        return 'Academy Coach';
      case 'athlete':
      default:
        return 'Athlete & Player';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      id="testimonials-section"
      className="bg-white py-16 sm:py-20 border-b border-[#E5EAED] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header Section with Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <FadeIn className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F8FFD9] text-[11px] font-bold uppercase tracking-wider text-[#222222] border border-[#CDFF00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]/30" />
              <span>Real-World Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display tracking-tight">
              Trusted by Athletes, Organizers &amp; Facilities
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Read how grassroots competitors, league directors, academy coaches, and venue operators
              overcome sports fragmentation with Sports Hub.
            </p>
          </FadeIn>

          {/* Controls: Category Filter Tabs & Play/Pause/Scroll buttons */}
          <FadeIn delay={0.06} className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#F2F3F7] p-1 rounded-xl border border-[#E5EAED]">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#222222]'
                }`}
              >
                All Voices ({TESTIMONIALS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('athlete')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'athlete'
                    ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#222222]'
                }`}
              >
                Athletes
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('organizer')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'organizer'
                    ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#222222]'
                }`}
              >
                Organizers
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('facility')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'facility'
                    ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#222222]'
                }`}
              >
                Facilities
              </button>
            </div>

            {/* Manual controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
                className="w-8 h-8 rounded-lg bg-white hover:bg-[#F2F3F7] border border-[#E5EAED] text-[#222222] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll('left')}
                title="Scroll previous"
                aria-label="Scroll left"
                className="w-8 h-8 rounded-lg bg-white hover:bg-[#F2F3F7] border border-[#E5EAED] text-[#222222] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll('right')}
                title="Scroll next"
                aria-label="Scroll right"
                className="w-8 h-8 rounded-lg bg-white hover:bg-[#F2F3F7] border border-[#E5EAED] text-[#222222] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Scrolling Experiences Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 cursor-grab active:cursor-grabbing"
        >
          {filteredTestimonials.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -6,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className="w-[340px] sm:w-[380px] shrink-0 bg-[#FBFBFC] hover:bg-white border border-[#E5EAED] hover:border-[#CDFF00] rounded-2xl p-6 shadow-2xs hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-default"
            >
              {/* Animated top lime highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="space-y-4">
                {/* Card Top: Persona info & Metric */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#222222] text-[#CDFF00] border border-[#CDFF00]/40 flex items-center justify-center font-bold text-xs shadow-2xs group-hover:scale-105 group-hover:border-[#CDFF00] transition-all duration-300">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#222222] font-display leading-tight group-hover:text-black transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#6B7280]">
                        {item.roleTitle} · {item.organization}
                      </p>
                    </div>
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="text-right shrink-0">
                    <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F8FFD9] text-[#222222] border border-[#CDFF00]/70 group-hover:bg-[#CDFF00] transition-colors">
                      {item.metric}
                    </span>
                    <span className="block text-[9.5px] text-[#6B7280] mt-0.5 uppercase tracking-wider font-semibold">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Star rating indicator */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#CDFF00] text-[#9ECC00]"
                    />
                  ))}
                  <span className="text-[10px] font-semibold text-[#6B7280] ml-1.5">
                    {item.sport} · {item.location}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed relative pl-3 border-l-2 border-[#CDFF00]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Card Bottom: Role Tag & CTA trigger */}
              <div className="mt-5 pt-4 border-t border-[#E5EAED] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#4B5563]">
                  <span className="w-6 h-6 rounded-md bg-[#F2F3F7] group-hover:bg-[#F8FFD9] flex items-center justify-center transition-colors">
                    {getCategoryIcon(item.roleCategory)}
                  </span>
                  <span>{getCategoryLabel(item.roleCategory)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenGetInvolved(item.targetRole)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer transition-colors"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3 h-3 text-[#222222] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Social Proof Proofpoints Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
          <motion.div
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className="group relative bg-[#F2F3F7] hover:bg-white border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00] rounded-xl p-3.5 sm:p-4 text-center transition-all duration-300 overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-xl sm:text-2xl font-black text-[#222222] font-display">
              3,500+
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-0.5">
              Verified Sports Venues
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className="group relative bg-[#F2F3F7] hover:bg-white border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00] rounded-xl p-3.5 sm:p-4 text-center transition-all duration-300 overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-xl sm:text-2xl font-black text-[#222222] font-display">
              48 hrs
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-0.5">
              Avg. Tournament Roster Fill
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className="group relative bg-[#F2F3F7] hover:bg-white border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00] rounded-xl p-3.5 sm:p-4 text-center transition-all duration-300 overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-xl sm:text-2xl font-black text-[#222222] font-display">
              99.2%
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-0.5">
              Confirmed Booking Rate
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className="group relative bg-[#F2F3F7] hover:bg-white border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00] rounded-xl p-3.5 sm:p-4 text-center transition-all duration-300 overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="text-xl sm:text-2xl font-black text-[#222222] font-display">
              Zero
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-0.5">
              Manual Phone Tag &amp; Unlisted Pricing
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};
