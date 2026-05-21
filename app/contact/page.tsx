'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const paths = [
  {
    eyebrow: 'Already with us',
    body: 'Payouts, contracts, onboarding a new person, anything that’s already in motion.',
    primaryLabel: 'Open in-product chat',
    primaryHref: '#',
    secondaryLabel: 'support@kleos.io',
    secondaryHref: 'mailto:support@kleos.io',
  },
  {
    eyebrow: 'Thinking about Kleos',
    body: 'See the product, get pricing, run a comparison, or bring your team across.',
    primaryLabel: 'Book a call',
    primaryHref: '#',
    secondaryLabel: 'client@kleos.io',
    secondaryHref: 'mailto:client@kleos.io',
  },
];

const extras = [
  { label: 'Compliance', href: 'mailto:compliance@kleos.io', email: 'compliance@kleos.io' },
  { label: 'Careers', href: '/careers', email: null },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroContact() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Talk to us.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Real humans, fast. Under an hour on weekdays. Same day on weekends. Pick the path below and the right person picks up &mdash; not a triage queue.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section: Two paths ─────────────────────────────────────────────────── */

function TwoPaths() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="pb-16 md:pb-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {paths.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-background-secondary rounded-2xl p-8 md:p-10 border border-border flex flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-3">
                {p.eyebrow}
              </p>
              <p className="text-base md:text-lg text-primary leading-relaxed mb-8 flex-1">
                {p.body}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={p.primaryHref}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  {p.primaryLabel}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={p.secondaryHref}
                  className="text-sm text-foreground-muted hover:text-primary transition-colors"
                >
                  {p.secondaryLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Footer strip (extras) ─────────────────────────────────────── */

function FooterStrip() {
  return (
    <section className="py-10 bg-white border-t border-border">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-foreground-muted">
          {extras.map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="hover:text-primary transition-colors"
            >
              <span className="font-semibold text-primary">{x.label}</span>
              {x.email ? <span>: {x.email}</span> : <span aria-hidden> &rarr;</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroContact />
      <TwoPaths />
      <FooterStrip />
      <Footer />
    </main>
  );
}
