'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PricingComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What it costs vs what it <span className="relative"><span className="relative z-10">costs</span><span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -z-0 rounded-sm" /></span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Current System */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-display font-bold text-primary mb-6">Your Current System</h3>
            <ul className="space-y-4 text-sm text-foreground-secondary">
              <li className="flex items-center justify-between">
                <span>Your time (hours × hourly rate)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Wire transfer fees (per transfer)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>FX spread (hidden costs)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Failed payment recovery</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Compliance consultant (annual)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Platform fee (% of every top-up)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>What your contractors lose on withdrawal</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Stress, weekends, sanity</span>
                <span className="italic text-foreground-muted">Priceless</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground-muted italic">
                Add it up. We&apos;ll wait.
              </p>
            </div>
          </div>

          {/* Kleos */}
          <div className="bg-accent rounded-2xl p-8 text-primary">
            <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-1">€50</h3>
            <p className="text-sm mb-6">per contractor</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>Flat fee, zero fees from contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>All compliance included</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>242 locations supported</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>Delivery on the promised day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>Full audit trail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>No hidden fees. Ever.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>0% top-up fee</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">•</span>
                <span>Your contractors keep 100%</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-8 py-3.5 bg-accent text-primary font-bold text-sm rounded-md hover:bg-accent/90 transition-colors uppercase tracking-wide"
          >
            Calculate Your Real Cost
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
