'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const whatYouGet = [
  {
    title: 'One invoice, one vendor',
    description:
      'One B2B invoice instead of hundreds of individual contracts. Your books show a single vendor relationship — clean, auditable, defensible.',
  },
  {
    title: 'Legal firewall',
    description:
      'A non-resident entity structure that separates your company from direct contractor relationships. Your compliance team sleeps better.',
  },
  {
    title: 'Auto-generated documents',
    description:
      'Tax forms, payment receipts, proof of income — generated per transaction. Your contractors get what they need for visas, residence permits, and tax filings.',
  },
];

const whatDisappears = [
  'Managing individual contracts per country',
  'Interpreting local tax codes you don\u2019t understand',
  'Fielding document requests from contractors',
  'Explaining your payment chain to auditors',
  'Worrying about reclassification risk',
];

export default function ComplianceFirewall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section data-component="ComplianceFirewall" ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-white text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The legal architecture your auditor will love
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: What you get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {whatYouGet.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
              >
                <h3 className="text-base font-display font-bold text-accent mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Right: What disappears */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-display font-bold text-white mb-6">
                What disappears
              </h3>
              <ul className="space-y-4">
                {whatDisappears.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/70 text-sm leading-relaxed"
                  >
                    <svg
                      className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-primary font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
              >
                See how the legal structure works
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
