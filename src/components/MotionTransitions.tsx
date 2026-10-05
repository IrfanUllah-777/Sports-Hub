import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  distance = 8,
  duration = 0.26,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0, rotateX: 2 };
      case 'down':
        return { y: -distance, x: 0, rotateX: -2 };
      case 'left':
        return { x: distance, y: 0, rotateY: -2 };
      case 'right':
        return { x: -distance, y: 0, rotateY: 2 };
      case 'none':
      default:
        return { x: 0, y: 0, rotateX: 0, rotateY: 0 };
    }
  };

  const initialOffset = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  id?: string;
}> = ({ children, className = '', delay = 0, distance = 10, id }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: distance, rotateX: 2, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 100%',
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.04 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8, rotateX: 2 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.22,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CinematicCard3D: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        rotateX: 2,
        rotateY: -2,
        scale: 1.01,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition: React.FC<{
  children: React.ReactNode;
  pageKey: string;
}> = ({ children, pageKey }) => {
  return (
    <div className="w-full relative [perspective:1400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          initial={{
            opacity: 0,
            y: 16,
            rotateX: 3.5,
            scale: 0.985,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            y: -12,
            rotateX: -2.5,
            scale: 0.99,
            filter: 'blur(2px)',
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 25%',
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
