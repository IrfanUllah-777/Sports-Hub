import { useState, useEffect, useRef } from 'react';

export type ScrollDirection = 'up' | 'down' | null;

export interface ScrollDirectionState {
  isCompact: boolean;
  scrollDirection: ScrollDirection;
  isAtTop: boolean;
  scrollY: number;
}

// Backward compatibility alias
export type ScrollState = ScrollDirectionState;

/**
 * Custom hook that monitors window scroll position and direction.
 *
 * @param threshold Scroll Y threshold in px past which compact state can activate (default: 100px)
 * @param sensitivity Minimum pixel delta required to detect a scroll direction change (default: 6px)
 * @returns State object containing { isCompact, scrollDirection, isAtTop, scrollY }
 */
export function useScrollDirection(
  threshold: number = 100,
  sensitivity: number = 6
): ScrollDirectionState {
  const [scrollState, setScrollState] = useState<ScrollDirectionState>({
    isCompact: false,
    scrollDirection: null,
    isAtTop: true,
    scrollY: 0,
  });

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const getScrollY = (): number => {
      if (typeof window === 'undefined') return 0;
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    lastScrollYRef.current = getScrollY();

    const updateScrollState = () => {
      const currentScrollY = Math.max(0, getScrollY());
      const lastScrollY = lastScrollYRef.current;
      const diff = currentScrollY - lastScrollY;
      const isAtTop = currentScrollY <= threshold;

      if (isAtTop) {
        // At or near the top of the page: always expanded
        setScrollState({
          isCompact: false,
          scrollDirection: currentScrollY < lastScrollY ? 'up' : null,
          isAtTop: true,
          scrollY: currentScrollY,
        });
        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
        return;
      }

      // Check if the scroll delta exceeds the sensitivity threshold
      if (Math.abs(diff) >= sensitivity) {
        const direction: ScrollDirection = diff > 0 ? 'down' : 'up';
        const isCompact = direction === 'down';

        setScrollState({
          isCompact,
          scrollDirection: direction,
          isAtTop: false,
          scrollY: currentScrollY,
        });
        lastScrollYRef.current = currentScrollY;
      }

      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateScrollState);
        tickingRef.current = true;
      }
    };

    // Listen to window and document scroll/wheel events to support all environments & iframes
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('wheel', handleScroll, { passive: true });

    // Initial check on mount
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [threshold, sensitivity]);

  return scrollState;
}
