'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineSteps = [
  { time: 'Today, 2pm', title: 'Upload your payment list', aside: "You're not a tax expert. We are." },
  { time: 'Today, 2:15pm', title: 'We handle KYC, compliance, currency conversion', aside: null },
  { time: 'Tomorrow, 10am', title: 'Money lands in 242 locations, local currency', aside: 'No SWIFT limbo. No bank interrogations.' },
  { time: 'Tomorrow, 11am', title: 'Audit trail auto-generated. One B2B invoice for your books.', aside: null },
  { time: null, title: 'You: Back to building your product.', aside: null, highlight: true },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Get started in 4 simple steps
        </motion.h2>

        {/* Vertical timeline in a card */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 border border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-0">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    step.highlight
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background-secondary border border-border text-primary'
                  }`}>
                    {step.highlight ? '✓' : index + 1}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="w-px h-full min-h-[40px] bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-6 ${index === timelineSteps.length - 1 ? 'pb-0' : ''}`}>
                  {step.time && (
                    <p className="text-xs font-semibold text-accent mb-1">{step.time}</p>
                  )}
                  <h3 className={`text-sm font-semibold mb-0.5 ${step.highlight ? 'text-primary' : 'text-primary'}`}>
                    {step.title}
                  </h3>
                  {step.aside && (
                    <p className="text-xs text-foreground-muted italic">({step.aside})</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-10">
            <a
              href="#"
              className="flex items-center justify-center gap-1.5 w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
