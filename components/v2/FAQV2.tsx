'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const faqs = [
  {
    question: 'What if our payment corridor gets disrupted?',
    answer:
      "We operate through multiple payment rails across multiple jurisdictions. If one corridor closes, others stay open. That\u2019s not a promise \u2014 it\u2019s the architecture. Your contractors get paid. Period.",
  },
  {
    question: 'What does \u20ac50 per payout actually cover?',
    answer:
      "Everything. KYC, compliance checks, fixed FX rate, local delivery, tax document generation, and the audit trail. No setup fees. No monthly minimums. No hidden FX spread.",
  },
  {
    question: 'What about documents \u2014 visas, tax forms, proof of income?',
    answer:
      "Provided by Stape. Tax forms, payment receipts, proof of income for residence permits and Digital Nomad visas. Your contractor gets what they need. You don\u2019t lift a finger.",
  },
  {
    question: 'How long does setup actually take?',
    answer:
      "Under 24 hours.",
  },
];

export default function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The questions keeping you from clicking that button
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 -mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          fair questions, honest answers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
              >
                <span className="text-base font-semibold text-primary">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-muted">
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">
                      <p className="text-sm text-foreground-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="border-t border-border" />
        </motion.div>

      </div>
    </section>
  );
}
