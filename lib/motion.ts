/**
 * Shared motion configuration for consistent animations across the site.
 *
 * Usage:
 *   import { fadeInUp, staggerContainer, sectionReveal } from '@/lib/motion';
 *   <motion.div variants={fadeInUp} initial="hidden" animate="visible" />
 */

import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
};

export const easeDefault: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

export const easeFast: Transition = {
  duration: 0.35,
  ease: 'easeInOut',
};

// ---------------------------------------------------------------------------
// Variants — entrance
// ---------------------------------------------------------------------------

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeDefault,
  },
};

export const fadeInUpLarge: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// ---------------------------------------------------------------------------
// Variants — stagger containers
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// ---------------------------------------------------------------------------
// Variants — content transitions (tabs, accordions)
// ---------------------------------------------------------------------------

export const contentSwap: Variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const accordionBody: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1 },
};

export const expandPanel: Variants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  expanded: { opacity: 1, height: 'auto', marginTop: 24 },
};

// ---------------------------------------------------------------------------
// Variants — hover / interactive
// ---------------------------------------------------------------------------

export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: easeFast,
};

export const hoverGlow = {
  scale: 1.03,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: easeFast,
};

// ---------------------------------------------------------------------------
// Viewport / useInView defaults
// ---------------------------------------------------------------------------

export const sectionReveal = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-100px' as const },
};

export const sectionRevealEarly = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-50px' as const },
};

// ---------------------------------------------------------------------------
// Helper — stagger delay for manual index-based delays
// ---------------------------------------------------------------------------

export function staggerDelay(index: number, base = 0.1, step = 0.1): Transition {
  return {
    ...easeDefault,
    delay: base + index * step,
  };
}
