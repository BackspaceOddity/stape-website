'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  { value: '$40M+ paid', label: "In markets where 'just use Wise' doesn't work" },
  { value: 'Zero payment failures', label: 'In 12 months across 50+ markets' },
  { value: '6 hours → 6 minutes', label: 'Average time savings per payroll cycle' },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="proof" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          600+ of teams get their time and focus back
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.value}
              className="bg-background-secondary rounded-xl p-6 md:p-8"
            >
              <p className="text-xl md:text-2xl font-display font-extrabold text-primary mb-2">{metric.value}</p>
              <p className="text-xs text-foreground-muted italic">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <blockquote className="text-base text-primary leading-relaxed mb-4">
            &ldquo;I spent every other Friday reconciling payment exceptions. Now I don&apos;t think about it.&rdquo;
          </blockquote>
          <p className="text-xs text-foreground-muted">
            — Alina Khertek, Head of Product
          </p>
          <a href="#" className="text-sm text-accent font-semibold mt-2 inline-block hover:underline">
            Read full story
          </a>
        </motion.div>
      </div>
    </section>
  );
}
