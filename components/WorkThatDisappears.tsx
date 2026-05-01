'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const todayBullets = [
  'Cross-check three spreadsheets for contractor rates',
  'Convert currencies manually (hope you got the rate right)',
  'Send 47 individual payment instructions',
  'Chase 12 people for missing tax docs',
  'Explain to your team why payments are delayed',
  'Reconcile failed transactions',
  'Generate compliance reports for three countries',
  'Brief your accountant on what happened',
];

export default function WorkThatDisappears() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work-that-disappears" ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            Two options to direct your energy
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: What You Do Today */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10"
          >
            <h3 className="text-lg font-display font-bold text-white mb-6">What You Do Today</h3>
            <ul className="space-y-4">
              {todayBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: What You Do With Kleos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-accent/10 rounded-2xl p-8 md:p-10 border border-accent/20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-display font-bold text-white mb-6">What You Do With Kleos</h3>
              <ul className="space-y-4">
                {[
                  'Meeting new clients',
                  'Investing in your team development',
                  'Launching new features',
                  'Outpacing competitors',
                  'Getting your weekends back',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm leading-relaxed">
                We&apos;re excellent at work that shouldn&apos;t exist. It&apos;s the fastest way to make it disappear.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
