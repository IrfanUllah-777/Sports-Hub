import React, { useState, useEffect } from 'react';
import { PageId, StakeholderRole } from './types';
import { PageTransition } from './components/MotionTransitions';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GetInvolvedModal } from './components/GetInvolvedModal';
import { HomePage } from './components/pages/HomePage';
import { GapPage } from './components/pages/GapPage';
import { SolutionPage } from './components/pages/SolutionPage';
import { OpportunitiesPage } from './components/pages/OpportunitiesPage';
import { VisionPage } from './components/pages/VisionPage';
import { Demo } from '@/demo';

import { SportsStoreProvider } from './lib/sportsStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MyPassesModal } from './components/booking/MyPassesModal';
import { GroundOwnerDrawer } from './components/portals/GroundOwnerDrawer';
import { ToastContainer } from './components/ToastContainer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('athlete');
  const [isMyPassesOpen, setIsMyPassesOpen] = useState(false);
  const [isOwnerDrawerOpen, setIsOwnerDrawerOpen] = useState(false);

  // Ensure clean scroll behavior on refresh and initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top on fresh load unless navigating to a specific section anchor
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'home') {
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync with browser hash if present and restore scroll to top
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'gap', 'solution', 'opportunities', 'vision', 'demo'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo(0, 0);
  };

  const handleOpenGetInvolved = (role?: StakeholderRole) => {
    if (role) {
      setSelectedRole(role);
    }
    setIsGetInvolvedOpen(true);
  };

  const handleCloseGetInvolved = () => {
    setIsGetInvolvedOpen(false);
  };

  return (
    <ErrorBoundary>
      <SportsStoreProvider>
        <div className="min-h-screen flex flex-col bg-[#F2F3F7] dark:bg-[#0E1217] text-[#222222] dark:text-[#F3F4F6] font-sans antialiased selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden transition-colors duration-200">
          {/* Precision architectural sports tech background overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern dark:opacity-25 opacity-80" 
            aria-hidden="true" 
          />
          {/* Subtle top ambient stadium spotlight depth */}
          <div 
            className="fixed inset-x-0 top-0 h-96 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(205,255,0,0.06),transparent)]" 
            aria-hidden="true" 
          />

          {/* Sticky 3-Zone Navbar */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenGetInvolved={handleOpenGetInvolved}
          />

          {/* Main Page Content */}
          <main className="flex-1 w-full relative z-0">
            <PageTransition pageKey={currentPage}>
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onOpenGetInvolved={handleOpenGetInvolved}
                />
              )}
              {currentPage === 'gap' && (
                <GapPage
                  onNavigate={handleNavigate}
                  onOpenGetInvolved={handleOpenGetInvolved}
                />
              )}
              {currentPage === 'solution' && (
                <SolutionPage
                  onNavigate={handleNavigate}
                  onOpenGetInvolved={handleOpenGetInvolved}
                />
              )}
              {currentPage === 'opportunities' && (
                <OpportunitiesPage
                  onNavigate={handleNavigate}
                  onOpenGetInvolved={handleOpenGetInvolved}
                />
              )}
              {currentPage === 'vision' && (
                <VisionPage
                  onNavigate={handleNavigate}
                  onOpenGetInvolved={handleOpenGetInvolved}
                />
              )}
              {currentPage === 'demo' && (
                <Demo />
              )}
            </PageTransition>
          </main>

          {/* Brand Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenGetInvolved={handleOpenGetInvolved}
          />

          {/* Interactive Modals and Drawers */}
          <GetInvolvedModal
            isOpen={isGetInvolvedOpen}
            onClose={handleCloseGetInvolved}
            defaultRole={selectedRole}
          />

          <MyPassesModal
            isOpen={isMyPassesOpen}
            onClose={() => setIsMyPassesOpen(false)}
          />

          <GroundOwnerDrawer
            isOpen={isOwnerDrawerOpen}
            onClose={() => setIsOwnerDrawerOpen(false)}
          />

          {/* Global Toast Feedback Container */}
          <ToastContainer />

          {/* Floating Action / Back-to-Top Button */}
          <BackToTop />
        </div>
      </SportsStoreProvider>
    </ErrorBoundary>
  );
}
