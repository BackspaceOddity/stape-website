'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const roles = [
  {
    id: 'founders',
    label: 'For Founders',
    content:
      "You stop being an unlicensed accountant running payments at midnight. Your contractors get legalized income for residence permits and Digital Nomad visas \u2014 automatically. Your US investors see a clean audit trail, not a maze of SWIFT transfers. And when your team grows from 15 to 70 people, the payment process doesn\u2019t grow with it. You delegate the operational hell. Permanently.",
  },
  {
    id: 'cfos',
    label: 'For CFOs / Finance',
    content:
      "You get one B2B invoice instead of hundreds of individual contracts. VAT offset works in your favor, not against it. FX is transparent \u2014 mid-market rate plus 0.5%, visible before you confirm. Failed payment recovery stops being your Thursday evening. And when the auditor asks how you pay people in 23 countries, you show them one vendor relationship and a complete audit trail.",
  },
  {
    id: 'hiring-managers',
    label: 'For Hiring Managers',
    content:
      "Your best candidate in Tbilisi doesn\u2019t wait 3 weeks for a contract. The senior engineer in Buenos Aires stops DMing you about late payments. You stop being the human bridge between accounting and your team. Payroll reliability becomes invisible \u2014 which means your retention problem becomes a non-problem. You focus on the product, not the payment.",
  },
  {
    id: 'hr-managers',
    label: 'For HR Managers',
    content:
      "You stop managing a zoo of 4 different providers across 12 countries. Every contractor gets paid on the promised day, in the promised amount \u2014 you can finally answer \u2018when and how much\u2019 in 5 seconds, not after checking 3 spreadsheets. Compliance documents generate automatically. You go from \u2018payroll specialist who also does HR\u2019 back to \u2018HR leader who never thinks about payroll.\u2019",
  },
];

export default function RoleSpecificOutcomesV2() {
  const [activeTab, setActiveTab] = useState('founders');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activeContent = roles.find((r) => r.id === activeTab);

  return (
    <section data-component="RoleSpecificOutcomesV2" ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What actually changes for you
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
