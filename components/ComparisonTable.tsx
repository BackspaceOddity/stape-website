'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Time per payroll cycle',
    diy: '6 hours every payroll cycle',
    tool: '2 hours configuring',
    stape: '6 minutes total',
  },
  {
    feature: 'What you learn',
    diy: 'You learn tax law',
    tool: 'You learn their system',
    stape: 'You learn nothing',
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
    tool: 'Their dashboard + 5 integrations',
    stape: 'One click',
  },
  {
    feature: 'Support burden',
    diy: '"Where\'s my payment?" DMs',
    tool: '"How do I...?" tickets',
    stape: 'Radio silence (the good kind)',
  },
];

export default function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          You have three options. Two of them waste your life.
        </motion.h2>

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
                  <th className="text-center py-4 px-3 text-sm font-semibold text-primary">Keep DIY-ing It</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-primary">Better Payroll Tool</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-primary">Kleos</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className="py-4 px-3 text-sm text-foreground-secondary text-center">
                      <div className="flex items-center justify-center gap-2">
                        <X className="w-3.5 h-3.5 text-error flex-shrink-0" />
                        <span>{row.diy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-sm text-foreground-secondary text-center">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
                        <span>{row.tool}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-sm text-primary text-center font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                        <span>{row.stape}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p
          className="text-sm text-foreground-muted text-center mt-8 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We&apos;re not a better mousetrap. We&apos;re making mice irrelevant.
        </motion.p>
      </div>
    </section>
  );
}
