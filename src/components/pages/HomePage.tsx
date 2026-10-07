import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PageId, StakeholderRole } from '../../types';
import { EcosystemInteractive } from '../EcosystemInteractive';
import { ChallengeSection } from '../ChallengeSection';
import { TestimonialsSection } from '../TestimonialsSection';
import { FloatingCommunityButton } from '../FloatingCommunityButton';
import { FadeIn } from '../MotionTransitions';
import { 
  ArrowRight, 
  Search, 
  EyeOff, 
  PhoneCall, 
  Network, 
  Layers, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  CalendarCheck,
  Users
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenGetInvolved: (role?: StakeholderRole) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenGetInvolved }) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isSlowConnection, setIsSlowConnection] = React.useState(false);

  // Check connection speed (Save-Data or 2G)
  React.useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (conn?.saveData || conn?.effectiveType === '2g') {
        setIsSlowConnection(true);
      }
    }
  }, []);

  // Autoplay safety fallback + Pause when tab hidden or hero scrolled off-screen
  React.useEffect(() => {
    if (shouldReduceMotion || isSlowConnection) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;
    videoEl.defaultMuted = true;

    // Autoplay safety with error rejection catch
    const attemptPlay = () => {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked by browser policy; poster image gracefully displays
        });
      }
    };

    attemptPlay();

    // Pause video when browser tab is hidden to conserve GPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoEl.pause();
      } else {
        attemptPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause video when hero section scrolls out of view using IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            videoEl.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [shouldReduceMotion, isSlowConnection]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION WITH FULL-BLEED BACKGROUND VIDEO */}
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        /* Compact controlled height: clamp(600px, 74vh, 720px) on desktop; content-driven on mobile/tablet */
        className="relative overflow-hidden bg-[#0A0D14] text-white min-h-[560px] lg:min-h-[600px] lg:h-[clamp(600px,74vh,720px)] flex items-center py-10 md:py-12 lg:py-0 border-b border-neutral-800"
      >
        {/* Full-bleed background video container */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          {/* Static poster image (displays instantly without CLS, and for reduced-motion or slow connections) */}
          <img
            src="/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: 'var(--hero-focus, center 35%)' }}
          />

          {/* Native <video> element (No CSS filters, scaling transforms, or blur applied) */}
          {!shouldReduceMotion && !isSlowConnection && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              controls={false}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: 'var(--hero-focus, center 35%)' }}
            >
              {/* 1. Modern VP9 WebM */}
              <source src="/videos/sports-hub-hero.webm" type="video/webm" />
              {/* 2. Universal H.264 MP4 production video */}
              <source src="/videos/sports-hub-hero.mp4" type="video/mp4" />
              <img src="/hero-poster.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </video>
          )}

          {/* Layered directional gradient overlay: Strong on left (text readability), moderate center, lighter right (visible athlete) */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(10, 13, 20, 0.93) 0%, rgba(10, 13, 20, 0.88) 32%, rgba(10, 13, 20, 0.55) 58%, rgba(10, 13, 20, 0.20) 100%), linear-gradient(to top, rgba(10, 13, 20, 0.85) 0%, transparent 45%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Global centered container: max-w-7xl aligned with page grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Content Column: Compact left-aligned column */}
          <div className="max-w-[660px] lg:max-w-[680px] py-3 sm:py-5 lg:py-6">
            
            {/* Hero Main Content */}
            <div className="space-y-4 sm:space-y-5">
              {/* 1. Top Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-xs select-none"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#CDFF00] shadow-[0_0_8px_#CDFF00]" />
                <span className="text-[#CDFF00] font-bold text-[10px] sm:text-[11px] tracking-[0.06em] uppercase leading-none">
                  PLAY. COMPETE. CONNECT.
                </span>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/35" />
                <span className="text-neutral-300 font-semibold text-[10px] sm:text-[11px] tracking-[0.04em] uppercase leading-none">
                  DIGITAL SPORTS ECOSYSTEM
                </span>
              </motion.div>

              {/* 2. Main Headline: Scaled slightly smaller for a tighter, more compact look */}
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.2rem] font-extrabold sm:font-black tracking-[-0.03em] text-white font-display leading-[1.05] sm:leading-[1.08] lg:leading-[1.1] max-w-[620px] text-balance"
              >
                <span className="block">Connecting People, Places</span>
                <span className="block mt-1 sm:mt-1.5 text-white">
                  &amp;{' '}
                  <span className="inline-flex items-baseline px-2 sm:px-2.5 py-[0.06em] rounded-[5px] bg-[#CDFF00] text-[#11161B] font-black tracking-[-0.02em] shadow-xs align-baseline">
                    Opportunities
                  </span>{' '}
                  in Sports.
                </span>
              </motion.h1>

              {/* 3. Supporting Description: Compact proportion */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
                className="text-[14px] sm:text-[16px] text-neutral-300/90 leading-[1.58] max-w-[540px] font-normal antialiased"
              >
                Sports Hub brings facilities, events, competitions, training, communities, and opportunities together in one connected sports ecosystem.
              </motion.p>

              {/* 4. Action Buttons: 44-46px height */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
                className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <button
                  onClick={() => onNavigate('solution')}
                  className="h-[44px] sm:h-[46px] px-5 sm:px-6 bg-[#CDFF00] hover:bg-[#b8e600] text-[#11161B] font-extrabold text-sm rounded-lg transition-all shadow-[0_4px_14px_rgba(205,255,0,0.18)] hover:shadow-[0_6px_18px_rgba(205,255,0,0.28)] flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00]"
                >
                  Explore Our Solution
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="h-[44px] sm:h-[46px] px-5 sm:px-6 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 font-bold text-sm rounded-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Discover Opportunities
                </button>
              </motion.div>

              {/* 5. Key Metrics: Compact divider and labels */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.32, ease: 'easeOut' }}
                className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-6 max-w-[580px]"
              >
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-[15px] tracking-tight leading-tight">6 Pillars</div>
                  <div className="text-neutral-400 text-[11px] sm:text-xs font-medium leading-normal mt-0.5">Unified Network</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-[15px] tracking-tight leading-tight">Open Access</div>
                  <div className="text-neutral-400 text-[11px] sm:text-xs font-medium leading-normal mt-0.5">Direct Connections</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-[15px] tracking-tight leading-tight">Real Visibility</div>
                  <div className="text-neutral-400 text-[11px] sm:text-xs font-medium leading-normal mt-0.5">For Facilities &amp; Teams</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. THE CHALLENGE */}
      <ChallengeSection onNavigateToSolution={() => onNavigate('solution')} />

      {/* 3. HOME — TRANSITION FULL WIDTH SECTION (#222222) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#222222] text-white py-20 relative overflow-hidden bg-dark-grid-pattern"
      >
        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-[#CDFF00] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#CDFF00]" />
            The Architectural Shift
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-balance leading-tight text-white">
            A fragmented sports ecosystem needs a{' '}
            <span className="text-[#CDFF00] underline decoration-[#CDFF00]/40 decoration-4 underline-offset-6">
              connected digital solution
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Instead of separate isolated portals for turf bookings, standalone tournament flyers,
            and private chat groups, Sports Hub acts as a unified digital substrate.
          </p>
          <div className="pt-2 flex justify-center">
            <div 
              style={{ backgroundColor: '#9cff5c', color: '#1c1c1c' }}
              className="h-1 w-24 rounded-full" 
            />
          </div>
        </FadeIn>
      </motion.section>

      {/* 4. HOME — INTERACTIVE ECOSYSTEM MAP (Second Last Section) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white py-20 border-b border-[#E5EAED]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FFD9] border border-[#CDFF00] text-xs font-bold text-[#222222]">
              <span className="w-2 h-2 rounded-full bg-[#CDFF00]" />
              <span>Interactive Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              Explore the Connected Sports Ecosystem
            </h2>
            <p className="text-base text-[#6B7280]">
              Click or hover any node below to inspect how Sports Hub interlinks facilities,
              competitions, training academies, and communities under a single digital roof.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="max-w-4xl mx-auto">
            <EcosystemInteractive
              onNavigateToOpportunities={() => onNavigate('opportunities')}
              onOpenGetInvolved={onOpenGetInvolved}
            />
          </FadeIn>
        </div>
      </motion.section>

      {/* 5. HOME — SOCIAL PROOF & TESTIMONIALS */}
      <TestimonialsSection
        onOpenGetInvolved={onOpenGetInvolved}
        onNavigateToOpportunities={() => onNavigate('opportunities')}
      />

      {/* 6. HOME — SOLUTION PREVIEW (Last Section) */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#F2F3F7] py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#6B7280]">
              The Unified Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] font-display">
              One connected platform for the sports ecosystem.
            </h2>
            <p className="text-base text-[#6B7280]">
              Sports Hub bridges the divide between people seeking sports opportunities and the
              organizations and facilities that provide them.
            </p>
          </FadeIn>

          {/* Interactive Visual Ecosystem flow */}
          <FadeIn delay={0.1} className="max-w-4xl mx-auto bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              
              {/* Left participants */}
              <div className="md:col-span-2 space-y-3">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-4 bg-[#F2F3F7] hover:bg-white rounded-xl border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-bold text-[#222222] group-hover:text-black text-sm transition-colors flex items-center justify-between">
                    <span>Athletes &amp; Players</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 group-hover:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] group-hover:text-[#4B5563] mt-0.5 transition-colors">
                    Discover facilities, events, trials &amp; teams
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-4 bg-[#F2F3F7] hover:bg-white rounded-xl border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-bold text-[#222222] group-hover:text-black text-sm transition-colors flex items-center justify-between">
                    <span>Sports Communities</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 group-hover:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] group-hover:text-[#4B5563] mt-0.5 transition-colors">
                    Organize weekly pickups &amp; coordinate clubs
                  </div>
                </motion.div>
              </div>

              {/* Center Platform Hub */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-4">
                <motion.div
                  whileHover={{ scale: 1.06, y: -4, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  whileTap={{ scale: 0.96 }}
                  className="group w-full py-6 px-3 bg-[#222222] text-white rounded-xl border-2 border-[#CDFF00] shadow-[0_4px_20px_rgba(205,255,0,0.20)] hover:shadow-[0_8px_28px_rgba(205,255,0,0.35)] text-center flex flex-col items-center cursor-pointer transition-all duration-300"
                >
                  <span className="text-[10px] font-bold text-[#CDFF00] tracking-wider uppercase group-hover:tracking-widest transition-all">
                    Platform
                  </span>
                  <span className="font-black text-sm tracking-tight text-white mt-0.5 group-hover:text-[#CDFF00] transition-colors">
                    SPORTS HUB
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] mt-1.5 animate-pulse shadow-[0_0_8px_#CDFF00]" />
                </motion.div>
              </div>

              {/* Right participants */}
              <div className="md:col-span-2 space-y-3">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-4 bg-[#F2F3F7] hover:bg-white rounded-xl border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-bold text-[#222222] group-hover:text-black text-sm transition-colors flex items-center justify-between">
                    <span>Facilities &amp; Grounds</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 group-hover:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] group-hover:text-[#4B5563] mt-0.5 transition-colors">
                    Digital profile, slot booking &amp; visibility
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-4 bg-[#F2F3F7] hover:bg-white rounded-xl border border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_#CDFF00] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-bold text-[#222222] group-hover:text-black text-sm transition-colors flex items-center justify-between">
                    <span>Academies &amp; Organizers</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] border border-[#222222]/30 group-hover:scale-125 transition-transform duration-200 shrink-0" />
                  </div>
                  <div className="text-xs text-[#6B7280] group-hover:text-[#4B5563] mt-0.5 transition-colors">
                    Tournaments, coaching clinics &amp; talent pathways
                  </div>
                </motion.div>
              </div>

            </div>

            {/* CTA bar */}
            <div className="mt-8 pt-6 border-t border-[#E5EAED] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6B7280] text-center sm:text-left">
                Every stakeholder gains a direct, transparent digital touchpoint.
              </div>
              <button
                onClick={() => onNavigate('solution')}
                className="group px-5 py-2.5 bg-[#CDFF00] hover:bg-[#b8e600] text-[#11161B] font-extrabold text-xs rounded-lg transition-all shadow-xs hover:shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                See How It Works
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeIn>
        </div>
      </motion.section>

      {/* Floating 'Join Our Community' call-to-action button */}
      <FloatingCommunityButton
        onClick={() => onOpenGetInvolved('community_leader')}
      />
    </div>
  );
};
