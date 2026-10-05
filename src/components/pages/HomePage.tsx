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
        /* Height: 100vh on desktop, 85svh on mobile to eliminate mobile browser URL-bar jump */
        className="relative overflow-hidden bg-[#0A0D14] text-white min-h-[85svh] lg:min-h-screen flex items-center py-16 md:py-24 border-b border-neutral-800"
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
              {/* 1. Primary modern VP9 WebM */}
              <source src="/hero.webm" type="video/webm" />
              {/* 2. Faststart H.264 MP4 fallback */}
              <source src="/hero.mp4" type="video/mp4" />
              <img src="/hero-poster.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </video>
          )}

          {/* Subtle dark gradient overlay (between 0.15 and 0.45 average, 0.85 behind text for WCAG AA) */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(7, 9, 14, 0.85) 0%, rgba(7, 9, 14, 0.55) 50%, rgba(7, 9, 14, 0.15) 100%), linear-gradient(to top, rgba(7, 9, 14, 0.70) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-4 sm:py-8 lg:py-12">
            
            {/* Hero Main Content */}
            <FadeIn direction="up" distance={8} className="space-y-6">
              {/* Editorial label */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider">
                <span className="text-[#CDFF00] font-extrabold">SPORTS TECHNOLOGY</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="text-neutral-300">DIGITAL ECOSYSTEM</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display text-balance leading-[1.08]">
                Connecting People, Places &amp;{' '}
                <span className="inline-block bg-[#CDFF00] px-2 py-0.5 rounded-md text-[#222222] mt-1 shadow-sm">
                  Opportunities
                </span>{' '}
                in Sports.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
                Sports Hub is a digital sports ecosystem designed to make sports facilities, events,
                competitions, training, communities, and opportunities easier to discover, access,
                and participate in.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('solution')}
                  className="px-6 py-3.5 bg-[#CDFF00] hover:bg-[#b8e600] text-[#222222] font-extrabold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] group"
                >
                  Explore Our Solution
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 font-bold text-sm rounded-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00]"
                >
                  Discover Opportunities
                </button>
              </div>

              {/* Ecosystem trust tags */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 text-xs max-w-xl">
                <div>
                  <div className="font-bold text-white text-sm">6 Pillars</div>
                  <div className="text-neutral-400">Unified Network</div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Open Access</div>
                  <div className="text-neutral-400">Direct Connections</div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Real Visibility</div>
                  <div className="text-neutral-400">For Facilities &amp; Teams</div>
                </div>
              </div>
            </FadeIn>
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
          <FadeIn delay={0.1} className="max-w-4xl mx-auto bg-white border border-[#E5EAED] rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              
              {/* Left participants */}
              <div className="md:col-span-2 space-y-3">
                <div className="p-4 bg-[#F2F3F7] rounded-xl border border-[#E5EAED]">
                  <div className="font-bold text-[#222222] text-sm">Athletes &amp; Players</div>
                  <div className="text-xs text-[#6B7280]">
                    Discover facilities, events, trials &amp; teams
                  </div>
                </div>
                <div className="p-4 bg-[#F2F3F7] rounded-xl border border-[#E5EAED]">
                  <div className="font-bold text-[#222222] text-sm">Sports Communities</div>
                  <div className="text-xs text-[#6B7280]">
                    Organize weekly pickups &amp; coordinate clubs
                  </div>
                </div>
              </div>

              {/* Center Platform Hub */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-4">
                <div className="w-full py-6 px-3 bg-[#222222] text-white rounded-xl border-2 border-[#CDFF00] shadow-md text-center flex flex-col items-center">
                  <span className="text-[10px] font-bold text-[#CDFF00] tracking-wider uppercase">
                    Platform
                  </span>
                  <span className="font-black text-sm tracking-tight text-white mt-0.5">
                    SPORTS HUB
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] mt-1" />
                </div>
              </div>

              {/* Right participants */}
              <div className="md:col-span-2 space-y-3">
                <div className="p-4 bg-[#F2F3F7] rounded-xl border border-[#E5EAED]">
                  <div className="font-bold text-[#222222] text-sm">Facilities &amp; Grounds</div>
                  <div className="text-xs text-[#6B7280]">
                    Digital profile, slot booking &amp; visibility
                  </div>
                </div>
                <div className="p-4 bg-[#F2F3F7] rounded-xl border border-[#E5EAED]">
                  <div className="font-bold text-[#222222] text-sm">Academies &amp; Organizers</div>
                  <div className="text-xs text-[#6B7280]">
                    Tournaments, coaching clinics &amp; talent pathways
                  </div>
                </div>
              </div>

            </div>

            {/* CTA bar */}
            <div className="mt-8 pt-6 border-t border-[#E5EAED] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6B7280] text-center sm:text-left">
                Every stakeholder gains a direct, transparent digital touchpoint.
              </div>
              <button
                onClick={() => onNavigate('solution')}
                className="px-5 py-2.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#222222] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                See How It Works
                <ArrowRight className="w-3.5 h-3.5" />
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
