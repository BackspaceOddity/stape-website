'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    label: 'Teams where payroll just happens',
    value: '600+',
  },
  {
    label: 'Paid worldwide',
    value: '$40M+',
  },
  {
    label: 'Contractor fee',
    value: 'Zero',
  },
  {
    label: 'From signup to first payment',
    value: '1 day',
  },
];

export default function MetricsV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-background-secondary rounded-xl p-6 md:p-8 flex flex-col"
            >
              <p className="text-sm font-semibold text-primary mb-8 md:mb-12">
                {metric.label}
              </p>
              <p className="text-2xl md:text-3xl font-display font-extrabold text-primary tracking-tight mt-auto">
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
