'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const avatars = [
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
];

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProductPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-44 md:pb-20 bg-white overflow-hidden">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          {/* Social proof */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <Image
                  key={i}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-foreground-muted">Trusted by 600+ teams getting their headspace back</span>
          </motion.div>

          <motion.h1
            className="font-display font-extrabold text-[36px] md:text-[52px] lg:text-[64px] text-primary leading-[1.08] mb-5 tracking-[-0.025em]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Stop juggling tools.{' '}
            <span className="text-foreground-muted">Start paying people.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-foreground-secondary leading-relaxed max-w-lg mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Kleos is your Contractor of Record. We sign the contracts, handle KYC, manage compliance, and pay your team in 242 locations. You get one invoice.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
            >
              Book a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Feature sections ── */}
      <section id="features" className="scroll-mt-16">

        {/* Section 1 — Company Onboarding */}
        <div className="bg-background-secondary">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <AnimatedSection>
              <h2 className="text-[24px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
                Get your company set up in under 24 hours.
              </h2>
              <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mb-8 md:mb-12">
                Create your company profile, sign a single service agreement with Kleos, and you&apos;re ready to pay contractors worldwide. No legal legwork on your end.
              </p>

              <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
                <Image
                  src={`${basePath}/product-onboarding2.png`}
                  alt="Kleos dashboard — Company Profile setup"
                  width={2400}
                  height={1400}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Section 2 — Contractor Management */}
        <div className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <AnimatedSection>
              <h2 className="text-[24px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
                Add your contractors. We handle the rest.
              </h2>
              <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mb-8 md:mb-12">
                Add contractors in bulk or one by one. Kleos handles contract signing, KYC verification, and onboarding — so you&apos;re never chasing paperwork across time zones.
              </p>

              <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
                <Image
                  src={`${basePath}/product-contractors2.png`}
                  alt="Kleos dashboard — Contractor import with validation"
                  width={2400}
                  height={1400}
                  className="w-full h-auto block"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Section 3 — Payouts */}
        <div className="bg-background-secondary">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <AnimatedSection>
              <div className="max-w-3xl">
                <h2 className="text-[24px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
                  Pay your entire team from a single balance.
                </h2>
                <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mb-8 md:mb-12">
                  Create payouts in a few clicks or schedule them to run automatically. Hold and exchange multiple currencies with fixed FX rates — so your payments are predictable, every cycle. Full transaction history and reports for your finance team.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
                <Image
                  src={`${basePath}/product-payout.png`}
                  alt="Kleos dashboard — Payouts with multi-currency balance"
                  width={2400}
                  height={1400}
                  className="w-full h-auto block"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Section 4 — Compliance (Beta) */}
        <div className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <AnimatedSection>
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-accent/20 text-primary rounded-full mb-4">
                  Beta
                </span>
                <h2 className="text-[24px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
                  Compliance that handles itself.
                </h2>
                <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mb-8 md:mb-12">
                  Upload a payroll file or salary sheet — Kleos cross-checks amounts, flags discrepancies, and generates the compliance documents you need. Contracts, invoices, tax forms, and work completion reports — verified and ready for your auditor. Skip the manual cross-checking. Close every payroll cycle with confidence.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
                <Image
                  src={`${basePath}/compl.png`}
                  alt="Kleos — Payroll verification and compliance document generation (Beta)"
                  width={2400}
                  height={1400}
                  className="w-full h-auto block"
                />
              </div>
              <p className="mt-6 text-sm text-foreground-muted">
                Currently in limited beta. <a href="#" className="underline hover:text-primary transition-colors">Book a demo</a> to get early access.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '1 day', label: 'Company setup' },
                { value: '1 invoice', label: 'For your books' },
                { value: '242', label: 'Locations covered' },
                { value: '€50', label: 'Flat fee per payout' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 p-6 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <span className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[700px] mx-auto px-6 md:px-12">
          <AnimatedSection className="flex flex-col items-center text-center">
            <h2 className="text-[28px] md:text-[40px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1]">
              See how Kleos works for your team.
            </h2>
            <p className="mt-4 text-base text-foreground-secondary leading-relaxed max-w-md">
              Book a 15-minute walkthrough. We&apos;ll show you the platform with your specific setup — countries, currencies, team size.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Book a Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
