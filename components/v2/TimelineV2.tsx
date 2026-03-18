'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineSteps = [
  {
    time: 'Today, 2pm',
    title: 'Upload your contractor list',
    aside: '(You upload the people. We handle the complexity.)',
  },
  {
    time: 'Today, 2:15pm',
    title: 'We handle KYC, tax classification, compliance, and currency conversion',
    aside: null,
  },
  {
    time: 'Tomorrow, 10am',
    title: 'Money lands in 242 locations, local currency',
    aside: '(No SWIFT limbo. No bank interrogations.)',
  },
  {
    time: 'Tomorrow, 11am',
    title: 'Audit trail auto-generated. One B2B invoice for your books.',
    aside: null,
  },
];

export default function TimelineV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            From payroll overwhelm to &ldquo;wait, that was it?&rdquo; in under 24 hours
          </h2>
        </motion.div>

        {/* Horizontal progress line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Progress dots and line */}
          <div className="relative flex items-center justify-between mb-6 px-4">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {timelineSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm text-white rounded-xl p-5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-xs font-semibold text-white/60">{step.time}</p>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white">{step.title}</h3>
                {step.aside && (
                  <p className="text-xs mt-2 text-white/40 italic">{step.aside}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Result badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-end mt-4"
          >
            <div className="bg-accent text-primary text-sm font-semibold rounded-lg px-5 py-2.5">
              You: Back to building your product.
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-primary font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
          >
            Make a test payment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
