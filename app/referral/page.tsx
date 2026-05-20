'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const stats = [
  { value: '600+', label: 'Distributed teams using Kleos' },
  { value: '$60M+', label: 'Paid out, no missed cycles' },
  { value: '10,000+', label: 'Contractors paid through us' },
  { value: '242', label: 'Countries we cover' },
];

const steps = [
  {
    n: '1',
    title: 'Get your link',
    body: 'Register at partners.kleos.io, or copy your unique link from the dashboard.',
  },
  {
    n: '2',
    title: 'Invite the right teams',
    body: 'Companies hiring contractors across borders — the ones drowning in compliance, FX, and a zoo of providers.',
  },
  {
    n: '3',
    title: 'Earn for a year',
    body: '$10 from every payout they make through Kleos, for 12 months. Withdraw to a card, crypto wallet, or Wise.',
  },
];

const partnerTypes = [
  {
    title: 'HR consultancies',
    body: 'Add global hiring infrastructure to what you already offer. Revenue share or client discounts.',
  },
  {
    title: 'Accountants & tax firms',
    body: 'Give your clients a compliant way to scale across borders without papering over the structure later.',
  },
  {
    title: 'Distributed teams',
    body: 'Embed Kleos into your stack. Strengthen your product, earn from day one.',
  },
  {
    title: 'Affiliates & creators',
    body: 'Share your link with your audience. No sales calls, no commitments — just the link.',
  },
  {
    title: 'Law firms',
    body: 'Help clients reduce legal risk when going international. Revenue share or client discounts.',
  },
  {
    title: 'Venture funds',
    body: 'Accelerate your portfolio with exclusive terms on global hiring infrastructure.',
  },
];

const faqs = [
  {
    q: 'How does the referral program actually work?',
    a: 'You share your link, a company signs up through it, and you earn $10 from every contractor payout they make — for 12 months. Example: a team with 20 contractors paid twice a month = $400/month, $4,800/year from that one referral.',
  },
  {
    q: 'When can I withdraw my earnings?',
    a: 'Earnings accumulate in your partners.kleos.io balance. Once you cross the minimum threshold, withdraw anytime — to a card, crypto wallet, or Wise account.',
  },
  {
    q: 'Where do I see my referrals?',
    a: 'Sign in to partners.kleos.io — your dashboard shows every registered referral, their status, and your earnings to date.',
  },
  {
    q: 'Is there a cap on how many companies I can refer?',
    a: 'No. No cap on referrals, no expiry on payouts during the 12-month window.',
  },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroReferral() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Kleos Referral Program
          </span>
        </motion.div>

        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Refer a team. Get $10 from every payout. For 12 months.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          No cap on referrals. No expiry on earnings during the window. Withdraw to a card, crypto wallet, or Wise.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="https://partners.kleos.io"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Get your link
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors whitespace-nowrap"
          >
            See how it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Stats ─────────────────────────────────────────────────────── */

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-white border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-background-secondary rounded-xl p-6 md:p-8 text-center border border-border"
            >
              <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">
                {s.value}
              </p>
              <p className="text-xs text-foreground-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: How it works ──────────────────────────────────────────────── */

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="how-it-works" className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            Three steps. One link.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative flex items-center justify-between mb-6 px-4 max-w-[900px] mx-auto">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {steps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm text-white rounded-xl p-5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {s.n}
                  </span>
                  <p className="text-xs font-semibold text-white/60">Step {s.n}</p>
                </div>
                <h3 className="text-base font-semibold leading-snug text-white mb-2">{s.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Example ───────────────────────────────────────────────────── */

function Example() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
            One referral, real numbers
          </p>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary leading-[1.1] tracking-[-0.02em]">
            What this looks like in practice
          </h2>
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary leading-relaxed mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          You refer a team with <span className="font-semibold text-primary">20 contractors</span>, paid <span className="font-semibold text-primary">twice a month</span>.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-background-secondary rounded-xl p-6 md:p-8 text-center border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$400</p>
            <p className="text-xs text-foreground-muted">per month</p>
          </div>
          <div className="bg-background-secondary rounded-xl p-6 md:p-8 text-center border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$4,800</p>
            <p className="text-xs text-foreground-muted">over 12 months</p>
          </div>
          <div className="bg-background-secondary rounded-xl p-6 md:p-8 text-center border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">1</p>
            <p className="text-xs text-foreground-muted">referral</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Partner types ─────────────────────────────────────────────── */

function PartnerTypes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Built for partners who already serve the same teams.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {partnerTypes.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              className="bg-white rounded-2xl p-8 border border-border"
            >
              <p className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-2">{p.title}</p>
              <p className="text-sm text-foreground-secondary leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: FAQ ───────────────────────────────────────────────────────── */

function FAQReferral() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Common questions
        </motion.h2>

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
                <span className="text-base font-semibold text-primary">{faq.q}</span>
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
                      <p className="text-sm text-foreground-secondary leading-relaxed">{faq.a}</p>
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

/* ─── Section: Final CTA ─────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          One link. A year of payouts.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Sign up in under a minute. We&apos;ll handle the rest.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://partners.kleos.io"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Get your link
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ReferralPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroReferral />
      <Stats />
      <HowItWorks />
      <Example />
      <PartnerTypes />
      <FAQReferral />
      <FinalCTA />
      <Footer />
    </main>
  );
}
