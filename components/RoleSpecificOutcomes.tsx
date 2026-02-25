'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const roles = [
  {
    id: 'founders',
    label: 'For Founders',
    content: "You stop being an unlicensed accountant. Your Saturdays are yours. When someone asks 'how do you handle payroll?' you say 'I don't' — and mean it as a good thing.",
  },
  {
    id: 'cfos',
    label: 'For CFOs',
    content: "You stop explaining payment delays. You stop reconciling exceptions. You stop briefing accountants. You get one B2B invoice. You get audit trails. You get your Fridays back.",
  },
  {
    id: 'hiring-managers',
    label: 'For Hiring Managers',
    content: "You stop being a payment processor. You stop answering 'where's my money?' DMs. You stop Googling tax codes. You click 'Pay Everyone' and move on.",
  },
  {
    id: 'hr-managers',
    label: 'For HR Managers',
    content: "You stop chasing documents. You stop explaining delays. You stop being the bottleneck. You get compliant payments in 242 locations without becoming a tax expert.",
  },
];

export default function RoleSpecificOutcomes() {
  const [activeTab, setActiveTab] = useState('founders');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activeContent = roles.find((r) => r.id === activeTab);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What actually changes
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveTab(role.id)}
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === role.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white text-primary border border-border hover:border-primary'
              }`}
            >
              {role.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-border"
          >
            <p className="text-base text-primary leading-relaxed mb-8">{activeContent?.content}</p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-border text-primary font-medium text-sm rounded-md hover:bg-background-secondary transition-colors"
            >
              See How This Works For Me
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
