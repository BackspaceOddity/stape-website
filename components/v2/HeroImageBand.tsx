'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function HeroImageBand() {
  return (
    <section data-component="HeroImageBand" className="w-full overflow-hidden bg-[#141414]">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full"
        style={{ aspectRatio: '1860/1038' }}
      >
        <Image
          src={`${BASE}/kleos-v3/images/hero-wide.png`}
          alt="Kleos platform — global team payroll"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          unoptimized
        />
      </motion.div>
    </section>
  );
}
