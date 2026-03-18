'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const badges = [
  {
    label: 'ISO/IEC 27001 Certified',
    icon: (
      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'GDPR Compliant',
    icon: (
      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function TrustBadgeBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-6 md:py-8 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          className="text-center text-sm md:text-base font-semibold tracking-[-0.01em] text-white/60 mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
        >
          Security you can trust. Execution you can count on.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm md:text-base text-white font-semibold"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent flex-shrink-0">
                {badge.icon}
              </span>
              {badge.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
