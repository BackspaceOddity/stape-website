'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const paths = [
  {
    eyebrow: 'Already with us',
    image: `${basePath}/team/vlad.png`,
    name: 'Vlad',
    role: 'Customer Success',
    body: 'Payouts, contracts, onboarding a new person — anything already in motion.',
    primaryLabel: 'Open in-product chat',
    primaryHref: '#',
  },
  {
    eyebrow: 'Thinking about Kleos',
    image: `${basePath}/team/igor.png`,
    name: 'Igor',
    role: 'Sales',
    body: 'See the product, get pricing, run a comparison, or bring your team across.',
    primaryLabel: 'Book a call',
    primaryHref: '#',
  },
];

const extras = [
  { label: 'Compliance', href: 'mailto:compliance@kleos.io', email: 'compliance@kleos.io' },
  { label: 'Careers', href: '/careers', email: null },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroContact() {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-white">
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
          Real humans pick up &mdash; not a triage queue. Under an hour on weekdays, same day on weekends.
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
    <section ref={ref} className="pb-16 md:pb-24 bg-white">
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
              className="bg-background-secondary rounded-2xl p-8 md:p-10 border border-border text-center flex flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-5">
                {p.eyebrow}
              </p>
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-lg font-semibold text-primary mb-1">{p.name}</p>
              <p className="text-sm text-foreground-muted mb-5">{p.role}</p>
              <p className="text-base text-foreground-secondary leading-relaxed mb-8 flex-1">
                {p.body}
              </p>
              <div className="flex justify-center">
                <a
                  href={p.primaryHref}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  {p.primaryLabel}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-sm text-foreground-muted mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Or just write to <a href="mailto:support@kleos.io" className="text-primary font-semibold hover:underline">support@kleos.io</a> &mdash; we&apos;ll route it to the right person.
        </motion.p>
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
          {extras.map((x, i) =>
            x.email ? (
              <a key={i} href={x.href} className="hover:text-primary transition-colors">
                <span className="font-semibold text-primary">{x.label}</span>
                <span>: {x.email}</span>
              </a>
            ) : (
              <Link key={i} href={x.href} className="hover:text-primary transition-colors">
                <span className="font-semibold text-primary">{x.label}</span>
                <span aria-hidden> &rarr;</span>
              </Link>
            )
          )}
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
