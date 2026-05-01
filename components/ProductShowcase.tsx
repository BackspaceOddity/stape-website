'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-8 md:py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="bg-background-secondary rounded-2xl overflow-hidden p-6 md:p-10"
        >
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary text-center mb-8 tracking-[-0.02em] leading-[1.1]">
            Experience how contractors get paid, but you didn&apos;t do anything
          </h2>
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Images/SCR-20260209-bjhb.png"
              alt="Kleos dashboard — contractor payment management"
              width={1600}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
