'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "We went from spending 2 days every month on contractor payroll to literally clicking a button. It\u2019s absurd how much time we got back.",
    author: "Sarah Chen",
    role: "CFO, Vertex AI",
    metric: "14 hours saved/month",
  },
  {
    quote: "No more chasing tax forms. No more failed wire transfers. No more explaining to contractors why they're paid late. Just done.",
    author: "Marcus Rodriguez",
    role: "Head of Finance, Beacon Labs",
    metric: "47 contractors paid instantly",
  },
  {
    quote: "The compliance piece alone is worth it. We pay people in 23 countries and I don't even think about tax codes anymore.",
    author: "Emily Watson",
    role: "Operations Lead, Nexus Studios",
    metric: "23 countries, zero headaches",
  },
];

export default function SocialProofV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section headline */}
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Teams that got their headspace back
        </motion.h2>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-border mb-8"
        >
          <div className="grid md:grid-cols-[1fr_340px] gap-8 md:gap-10 items-stretch">
            {/* Left: Quote */}
            <div className="flex flex-col justify-center py-2">
              <p className="text-lg md:text-xl text-primary leading-relaxed mb-8">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face"
                  alt={testimonials[0].author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-primary">{testimonials[0].author}</p>
                  <p className="text-xs text-foreground-muted">{testimonials[0].role}</p>
                </div>
              </div>
            </div>

            {/* Right: Contractors paid list */}
            <div className="rounded-xl overflow-hidden max-h-[360px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/all-contractors-paid.png`}
                alt="All contractors paid — Stape payout confirmation"
                width={340}
                height={640}
                className="w-full h-auto object-cover object-top rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">Zero</p>
            <p className="text-xs text-foreground-muted">Missed payouts since launch</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$40M+</p>
            <p className="text-xs text-foreground-muted">Processed across 80+ countries</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">20x</p>
            <p className="text-xs text-foreground-muted">Faster than manual payroll</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
