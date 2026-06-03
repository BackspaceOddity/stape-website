'use client';

import { motion } from 'framer-motion';

interface CTAV2Props {
  backgroundImage?: string;
}

export default function CTAV2({ backgroundImage }: CTAV2Props = {}) {
  return (
    <section
      data-component="CTAV2"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0" />
      )}
      <div className={`max-w-[700px] mx-auto px-6 md:px-12 text-center relative z-10`}>
        <motion.h2
          className={`text-[32px] md:text-[40px] font-display font-extrabold mb-6 tracking-[-0.02em] ${backgroundImage ? 'text-white' : 'text-primary'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Try one payment. You&apos;ll get it.
        </motion.h2>
        <motion.p
          className={`text-base leading-relaxed mb-10 ${backgroundImage ? 'text-white/80' : 'text-foreground-secondary'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Pay one contractor through Kleos this week. 60 seconds to onboard them. The audit trail generates itself.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Make a Test Payment
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border font-semibold text-sm rounded-md transition-colors ${backgroundImage ? 'border-white/40 text-white hover:bg-white/10' : 'border-border text-primary hover:bg-background-secondary'}`}
          >
            Talk to a Human First
          </a>
        </motion.div>
      </div>
    </section>
  );
}
