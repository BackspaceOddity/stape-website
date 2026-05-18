'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const pillars = [
  {
    label: 'Pillar 1',
    title: 'Game-changing',
    aside:
      'We don’t iterate on the category — we argue with it. Every feature passes one test: does it move the line on whether payroll exists as a task you do, or does it just decorate the dashboard? If it’s the second one, we don’t ship it.',
  },
  {
    label: 'Pillar 2',
    title: 'Dependable',
    aside:
      '€50, exactly. On the day we said. In the currency we said. Every cycle. We are deliberately, unglamorously boring on this dimension — it’s the most respectful thing infrastructure can be.',
  },
  {
    label: 'Pillar 3',
    title: 'Exceptional',
    aside:
      'We work the geographies mainstream providers quietly stop covering. CIS, LATAM, Central Asia, parts of Africa — not as a brave gesture, as a baseline. If it works where it’s hardest, your country is easy.',
  },
];

const receipts = [
  {
    quote:
      'We had a contractor in a corridor three providers had quietly dropped. They got paid on schedule, with documents the local bank accepted. No call, no escalation.',
    author: 'Head of Finance',
    detail: 'EU-based marketplace',
  },
  {
    quote:
      'Our first audit since switching. The auditor asked for the payment chain. We forwarded one folder. No back-and-forth.',
    author: 'CFO',
    detail: 'US-incorporated startup',
  },
  {
    quote: 'I never know when something arrived at Kleos because I never have to.',
    author: 'Founder',
    detail: 'distributed SaaS team',
  },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroAbout() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow — etymology */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm text-foreground-muted italic">
            κλέος · /ˈkleɪɒs/ — ancient Greek for reputation earned through action.
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          We&apos;re here until payroll isn&apos;t on your calendar.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Most of our category sells contractor payments, payroll, and compliance infrastructure. Accurate &mdash; and incomplete. The clients who get the most from us stopped thinking about payroll entirely. Not cheaper transfers. Gone. We&apos;re built around that one outcome and we measure ourselves against it every cycle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            See how we run a cycle
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors whitespace-nowrap"
          >
            Talk to a human
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Three pillars (HowItWorks clone, 3 cards) ─────────────────── */

function ThreePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            The standard we hold ourselves to
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Progress dots and line */}
          <div className="relative flex items-center justify-between mb-6 px-4 max-w-[900px] mx-auto">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {pillars.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {pillars.map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm text-white rounded-xl p-5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-xs font-semibold text-white/60">{p.label}</p>
                </div>
                <h3 className="text-base font-semibold leading-snug text-white mb-2">{p.title}</h3>
                <p className="text-xs text-white/40 italic leading-relaxed">{p.aside}</p>
              </motion.div>
            ))}
          </div>

          {/* Result badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-center mt-6"
          >
            <div className="bg-accent text-primary text-sm font-semibold rounded-lg px-5 py-2.5">
              What you measure us on: what stopped happening on your side.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Receipts (SocialProof clone) ──────────────────────────────── */

function Receipts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The receipts are already in your inbox
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {receipts.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-border flex flex-col">
              <p className="text-base text-primary leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-primary">{t.author}</p>
                {t.detail && <p className="text-xs text-foreground-muted">{t.detail}</p>}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">8 yrs</p>
            <p className="text-xs text-foreground-muted">Live in production, under our previous name</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$40M+</p>
            <p className="text-xs text-foreground-muted">Paid out without a missed cycle</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">242</p>
            <p className="text-xs text-foreground-muted">Countries we cover, including the ones others quietly stopped supporting</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Final CTA ─────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Same standard. New name. A reputation that was already in your inbox.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Kleos is the name. The standard is older than the name and outlasts whatever we ship next. If you&apos;ve been with us &mdash; your contract, your prices, your account manager don&apos;t change. If you haven&apos;t &mdash; the product, pricing, and a demo are one click away.
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
            See how we run a cycle
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            Talk to a human
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroAbout />
      <ThreePillars />
      <Receipts />
      <FinalCTA />
      <Footer />
    </main>
  );
}
