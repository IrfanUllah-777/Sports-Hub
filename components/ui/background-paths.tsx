"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Deterministic durations (20-30s) to eliminate Math.random() re-renders & hydration mismatch
const DETERMINISTIC_DURATIONS = [
  21.4, 25.8, 22.1, 28.3, 24.7, 26.5, 23.2, 29.1, 20.9, 27.4,
  22.8, 25.1, 28.7, 21.9, 24.3, 26.8, 23.7, 29.5, 22.4, 27.9,
  25.3, 21.1, 28.2, 23.9, 26.1, 24.8, 27.6, 22.3, 29.8, 21.6,
  25.5, 28.0, 23.4, 26.9, 24.1, 27.2,
];

interface FloatingPathsProps {
  position: 1 | -1;
}

export function FloatingPaths({ position }: FloatingPathsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reduce path count from 36 to 20 on mobile devices for performance
  const count = isMobile ? 20 : 36;

  const paths = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      duration: DETERMINISTIC_DURATIONS[i % DETERMINISTIC_DURATIONS.length],
    }));
  }, [count, position]);

  // Position 1: Primary Dark accent stroke (#9ECC00)
  // Position -1: Foreground stroke at very low opacity (0.05 to 0.12)
  const isPrimary = position === 1;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className={cn(
          "w-full h-full",
          isPrimary ? "text-primary-dark" : "text-foreground"
        )}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => {
          // Opacity mapping: position 1 between 0.10 and 0.22; position -1 between 0.05 and 0.12
          const strokeOpacity = isPrimary
            ? 0.1 + (path.id / count) * 0.12
            : 0.05 + (path.id / count) * 0.07;

          return (
            <motion.path
              key={`${position}-${path.id}`}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={strokeOpacity}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 0.6 }
                  : {
                      pathLength: 1,
                      opacity: [0.3, 0.6, 0.3],
                      pathOffset: [0, 1, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: path.duration,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }
              }
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Site-wide background layer export.
 * Mount once in the root layout (App.tsx / main.tsx).
 * Renders fixed, non-interactive animated SVG line paths across the whole app.
 */
export function BackgroundPathsLayer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none",
        className
      )}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

export interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * Standalone Hero component with animated typography and CTA button.
 * Has NO background of its own, allowing the global BackgroundPathsLayer to show through.
 */
export function BackgroundPaths({
  title = "Connecting People, Places & Opportunities",
  subtitle = "The unified digital sports ecosystem for athletes, facilities, academies, and communities.",
  buttonText = "Explore Ecosystem",
  onButtonClick,
  className,
}: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "relative min-h-[50vh] w-full flex items-center justify-center px-4 md:px-6 py-12 text-center",
        className
      )}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Animated letter-by-letter headline with gradient from foreground to foreground/70 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-balance leading-none">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-3 sm:mr-4 last:mr-0">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (wordIndex * 4 + letterIndex) * 0.02,
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button with gradient wrapper from-primary/30 to-transparent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-4 flex justify-center"
        >
          <div className="inline-block group relative bg-gradient-to-b from-primary/30 to-transparent p-px rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
            <Button
              variant="default"
              size="lg"
              onClick={onButtonClick}
              className="rounded-[1.15rem] px-7 py-6 text-base font-bold bg-primary text-primary-foreground border border-primary-dark hover:bg-primary-dark transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BackgroundPaths;
