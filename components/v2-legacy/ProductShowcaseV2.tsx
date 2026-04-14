'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProductShowcaseV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section data-component="ProductShowcaseV2" ref={ref} className="py-24 md:py-36 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]">
            See how your team gets paid — while you do nothing
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-background-secondary p-3 md:p-4">
            <video
              src={`${basePath}/video-main.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
