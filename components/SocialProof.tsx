'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "We went from spending 2 days every month on contractor payroll to literally clicking a button. It's absurd how much time we got back.",
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

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          className="text-sm text-foreground-muted text-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
        >
          Case Study / Testimonial With Metrics
        </motion.p>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-border mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Quote */}
            <div className="flex flex-col justify-between">
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

            {/* Right: Product image */}
            <div className="bg-background-secondary rounded-xl overflow-hidden flex items-center justify-center min-h-[240px]">
              <Image
                src="/Images/SCR-20260209-bjhb.png"
                alt="Kleos dashboard — contractor management"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-xl"
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
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">#1</p>
            <p className="text-xs text-foreground-muted">Key metric</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$40MM+</p>
            <p className="text-xs text-foreground-muted">Key metric</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">20x</p>
            <p className="text-xs text-foreground-muted">Key metric</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
