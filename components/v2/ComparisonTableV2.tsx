'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const comparisonData = [
  {
    feature: 'Time per payroll cycle',
    diy: '6 hours every cycle',
    tool: '2 hours configuring',
    stape: '6 minutes total',
  },
  {
    feature: 'What\u2019s on your plate',
    diy: 'Compliance in every country',
    tool: 'A new tool to configure',
    stape: 'Building your product',
  },
  {
    feature: 'Risk ownership',
    diy: 'You own all the risk',
    tool: 'You still own the risk',
    stape: 'We own the risk',
  },
  {
    feature: 'Tools needed',
    diy: 'Excel + Wise + crypto + hope',
    tool: 'Dashboard + 5 integrations',
    stape: 'One click',
  },
  {
    feature: 'Support burden',
    diy: '"Where\'s my payment?" DMs',
    tool: '"How do I...?" tickets',
    stape: 'Radio silence (the good kind)',
  },
  {
    feature: 'Security & compliance',
    diy: '—',
    tool: '—',
    stape: '\u2705 ISO 27001 + GDPR',
  },
];

export default function ComparisonTableV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section data-component="ComparisonTableV2" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Three options. Two waste your time.
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Choose wisely.
        </motion.p>

        <motion.div
          ref={ref}
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-background-secondary rounded-2xl p-6 md:p-8 min-w-[700px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-1/4"></th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Keep DIY-ing It</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Better Payroll Tool</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">
                    Kleos
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.diy}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.tool}</td>
                    <td className={`py-4 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === comparisonData.length - 1 ? 'rounded-b-xl' : ''}`}>{row.stape}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-foreground-muted italic mb-6">
            We&apos;re not a better mousetrap. We&apos;re making mice irrelevant.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            See what Option C looks like
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
