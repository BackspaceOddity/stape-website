'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Section 1: Hero ──────────────────────────────────────────────────────── */

function CORHero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          You found the talent. Now someone has to deal with the paperwork.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A Contractor of Record handles the legal, tax, and compliance side of working with independent contractors&nbsp;&mdash; so you can focus on the work they&apos;re actually doing for you.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={() => scrollToSection('how-stape-does-cor')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            See How Stape Does It
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            onClick={() => scrollToSection('cor-vs-eor')}
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            Or skip ahead to COR vs. EOR&nbsp;&rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 2: The Plain-English Definition ──────────────────────────────── */

function PlainEnglishDefinition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-14 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What a Contractor of Record actually is
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Block 1 — The problem */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-display font-bold text-primary mb-3">You hire someone abroad. Now what?</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Someone needs to sign the contract, handle local tax rules, make sure it doesn&apos;t look like employment, and send the money. That someone isn&apos;t you.
            </p>
          </div>

          {/* Block 2 — The answer */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-display font-bold text-primary mb-3">That someone is a Contractor of Record.</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              A third party that handles compliant contracts, classification, cross-border payments, tax docs, and audit trails. You don&apos;t build this. You plug into it.
            </p>
          </div>

          {/* Block 3 — The division of labor */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-base font-display font-bold text-primary mb-5">You run the work. The COR runs the paperwork.</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5 mt-0.5 flex-shrink-0">You</span>
                <p className="text-sm text-foreground-secondary leading-relaxed">What gets built. When it ships. What &ldquo;done&rdquo; looks like.</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5 mt-0.5 flex-shrink-0">COR</span>
                <p className="text-sm text-foreground-secondary leading-relaxed">Contracts. Compliance. Payments. Tax docs. Audit trail.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing pull quote */}
        <motion.p
          className="text-center text-xl md:text-2xl font-display font-bold text-primary mt-12 max-w-2xl mx-auto tracking-[-0.01em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          You stay the boss. The COR becomes the back office you never wanted to build.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 3: The Problem It Solves ─────────────────────────────────────── */

const problemCards = [
  {
    title: 'Misclassification risk is real',
    body: 'Governments are cracking down. In 2023, the IRS found that 38% of audited contractors were misclassified. The EU Platform Work Directive is tightening definitions. Penalties can exceed $100K per worker. A COR ensures every engagement is classified correctly from day one.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    title: 'Every country has different rules',
    body: 'What\u2019s legal in the UK isn\u2019t legal in Brazil. Germany has a concept called \u201CScheinselbstst\u00e4ndigkeit\u201D \u2014 false self-employment \u2014 that can trigger retroactive social security payments going back years. A COR knows the local rules because they operate inside them.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Payments are more than bank transfers',
    body: 'You need to handle local tax withholding, currency conversion, invoicing formats, and delivery timelines \u2014 all of which vary by country. Get one wrong and your contractor doesn\u2019t get paid on time. Or you get audited. Or both.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'You don\u2019t want to build this in-house',
    body: 'Setting up legal entities in every country you hire is slow, expensive, and overkill if you have 3 contractors in 3 countries. A COR gives you compliant global reach without the overhead of doing it yourself.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function ProblemCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-14 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Why this exists (and why you&apos;re reading this page)
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {problemCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-background-secondary rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
                {card.icon}
              </div>
              <h3 className="text-base font-display font-bold text-primary mb-3">{card.title}</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: What a COR Actually Handles ───────────────────────────────── */

const corHandles = [
  'Locally compliant contractor agreements',
  'Worker classification and misclassification protection',
  'Cross-border payments in local currencies',
  'Tax documentation and withholding where required',
  'Invoice processing and payment reconciliation',
  'Audit-ready records and compliance reporting',
  'Onboarding and offboarding paperwork',
  'IP transfer clauses built into every contract',
];

const youKeep = [
  'Choosing who to work with',
  'Defining scope, deliverables, and timelines',
  'Day-to-day communication with your contractors',
  'Performance management and feedback',
  'Deciding when to scale up or wind down',
  'Full visibility into costs and payment status',
  'Your sanity',
];

function WhatCORHandles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            What you hand off. What you keep.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: COR handles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10"
          >
            <h3 className="text-lg font-display font-bold text-white mb-6">The COR handles:</h3>
            <ul className="space-y-3">
              {corHandles.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: You keep */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-accent/10 rounded-2xl p-8 md:p-10 border border-accent/20"
          >
            <h3 className="text-lg font-display font-bold text-white mb-6">You keep:</h3>
            <ul className="space-y-3">
              {youKeep.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: COR vs. EOR ──────────────────────────────────────────────── */

const comparisonRows = [
  {
    feature: 'Who it\u2019s for',
    cor: 'Independent contractors, freelancers, project-based talent',
    eor: 'Full-time employees you want on payroll abroad',
  },
  {
    feature: 'Legal relationship',
    cor: 'Contractor remains independent. COR is the contracting entity.',
    eor: 'EOR becomes the legal employer on your behalf.',
  },
  {
    feature: 'What\u2019s included',
    cor: 'Contracts, compliance, payments, tax docs',
    eor: 'Payroll, benefits, taxes, employment law compliance',
  },
  {
    feature: 'Best for',
    cor: 'Project work, specialist skills, flexible teams, cost control',
    eor: 'Long-term roles, deep team integration, employee protections',
  },
  {
    feature: 'Typical cost',
    cor: '$49\u201375 per contractor per payout',
    eor: '$400\u2013700 per employee per month',
  },
  {
    feature: 'Flexibility',
    cor: 'Scale up or down anytime. No employment obligations.',
    eor: 'Employment commitments, notice periods, severance rules apply.',
  },
  {
    feature: 'Risk it solves',
    cor: 'Misclassification, non-compliant contracts, payment failures',
    eor: 'Employment law violations in countries without your entity',
  },
  {
    feature: 'When to choose this',
    cor: 'You\u2019re working with contractors and want to stay compliant and fast',
    eor: 'You\u2019re hiring employees and need full legal employment infrastructure',
  },
];

function CORvsEOR() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cor-vs-eor" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          COR vs. EOR&nbsp;&mdash; same letters, very different things
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary text-center max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Both help you hire across borders without setting up a local entity. But they solve different problems for different types of workers. Here&apos;s the honest breakdown.
        </motion.p>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-background-secondary rounded-2xl p-6 md:p-8 min-w-[700px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-1/4"></th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-tl-xl">
                    Contractor of Record (COR)
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted rounded-tr-xl">
                    Employer of Record (EOR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className={`py-4 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === comparisonRows.length - 1 ? 'rounded-bl-xl' : ''}`}>
                      {row.cor}
                    </td>
                    <td className={`py-4 px-3 text-sm text-foreground-muted text-center ${index === comparisonRows.length - 1 ? 'rounded-br-xl' : ''}`}>
                      {row.eor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-foreground-secondary leading-relaxed">
            Many companies use both&nbsp;&mdash; COR for contractors, EOR for full-time hires. The mistake is using the wrong model for the wrong worker. That&apos;s where the real compliance risk lives.
          </p>
          <p className="text-sm text-foreground-secondary leading-relaxed font-semibold">
            Stape offers both COR and EOR services. Start with whichever fits your team today. Switch or combine as you grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 6: How Stape Does COR (Timeline) ────────────────────────────── */

const stapeSteps = [
  {
    title: 'Tell us who you\u2019re paying and where',
    description: 'Upload your contractor list or add them one by one. We handle the rest \u2014 contracts, classification, local compliance.',
  },
  {
    title: 'We generate compliant contracts',
    description: 'Locally valid agreements with proper IP transfer clauses, tax classification, and termination terms. Reviewed against the laws of each contractor\u2019s country.',
  },
  {
    title: 'Approve payments. We deliver them.',
    description: 'One invoice from Stape. We convert currencies, process payments to each contractor in their local currency, and generate all tax documentation.',
  },
  {
    title: 'Audit trail builds itself',
    description: 'Every payment, every contract, every document \u2014 stored, timestamped, and ready if anyone ever asks.',
  },
];

function HowStapeDoesIt() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-stape-does-cor" ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            How it works with Stape
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Progress dots and line */}
          <div className="relative flex items-center justify-between mb-6 px-4">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {stapeSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stapeSteps.map((step, index) => (
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
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-primary font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
          >
            Book a Demo
          </a>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors font-semibold"
          >
            See Pricing&nbsp;&rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 7: Who Uses a COR (Personas) ─────────────────────────────────── */

const personas = [
  {
    id: 'startups',
    role: 'Startups scaling fast',
    tagline: 'Onboarded and paid in under 24 hours',
    description:
      'You found a senior dev in Argentina and a designer in Poland. You need them working next week, not next quarter. A COR gets them onboarded and paid in under 24 hours.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    accent: 'bg-accent',
  },
  {
    id: 'remote-first',
    role: 'Remote-first companies',
    tagline: '15 countries, zero compliance headaches',
    description:
      'Your team is distributed across 15 countries. Managing 15 sets of contractor laws isn\u2019t a side project \u2014 it\u2019s a full-time job. Unless you hand it off.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'bg-blue-100',
  },
  {
    id: 'finance',
    role: 'Finance teams tired of the mess',
    tagline: 'One invoice. Fixed FX. Clean audit trail.',
    description:
      'One invoice instead of dozens. Fixed FX rates instead of surprise conversion fees. An audit trail that doesn\u2019t require a forensic accountant to reconstruct.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    accent: 'bg-emerald-100',
  },
];

function WhoUsesACOR() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activePersona = personas.find((p) => p.id === selected);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1]">
            Built for teams that hire talent, not headcount
          </h2>
        </motion.div>

        {/* Persona cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelected(selected === persona.id ? null : persona.id)}
              className={`relative text-left rounded-2xl p-5 md:p-6 transition-all duration-300 border-2 flex flex-col ${
                selected === persona.id
                  ? 'border-primary bg-white shadow-lg scale-[1.02]'
                  : 'border-transparent bg-white hover:border-primary/20 hover:shadow-md'
              }`}
            >
              <div className="h-14 flex items-start">
                <div className={`w-11 h-11 rounded-xl ${persona.accent} flex items-center justify-center text-primary`}>
                  {persona.icon}
                </div>
              </div>
              <div className="h-10 flex items-start">
                <p className="text-sm font-display font-bold text-primary leading-tight">{persona.role}</p>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">{persona.tagline}</p>

              {selected === persona.id && (
                <motion.div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Expanded detail */}
        <AnimatePresence mode="wait">
          {activePersona && (
            <motion.div
              key={activePersona.id}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${activePersona.accent} flex items-center justify-center text-primary flex-shrink-0`}>
                    {activePersona.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-primary">{activePersona.role}</h3>
                  </div>
                </div>
                <p className="text-sm text-primary leading-relaxed">{activePersona.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Section 8: FAQ ───────────────────────────────────────────────────────── */

const corFaqs = [
  {
    question: 'Is a COR the same as an AOR (Agent of Record)?',
    answer:
      'Practically, yes. \u201CAgent of Record\u201D is the older term. \u201CContractor of Record\u201D is more specific to how the model is used today. Some providers (like Deel) use them interchangeably. The function is the same: a third party manages your contractor relationships compliantly.',
  },
  {
    question: 'Do my contractors know they\u2019re going through a COR?',
    answer:
      'Yes. The COR is the entity that signs the contract with the contractor. Your company is referenced as the client, and the contractor works directly with your team day-to-day. It\u2019s transparent \u2014 not a shell game.',
  },
  {
    question: 'Does the COR change how I manage the work?',
    answer:
      'Not at all. You assign tasks, set deadlines, give feedback \u2014 everything stays the same. The COR handles the paperwork and payments. You handle the work.',
  },
  {
    question: 'What happens if a contractor should actually be an employee?',
    answer:
      'A good COR flags this before it becomes a problem. If the engagement starts looking like employment \u2014 fixed hours, deep integration, long-term dependence \u2014 the COR will recommend switching to an EOR model. That\u2019s the whole point of having a compliance partner.',
  },
  {
    question: 'How fast can I onboard a contractor through a COR?',
    answer:
      'With Stape, under 24 hours. Upload contractor details, we generate the contract, they sign it, you\u2019re live.',
  },
  {
    question: 'What about IP ownership?',
    answer:
      'COR contracts include IP transfer clauses by default. Everything your contractor creates belongs to you. This is actually one of the biggest hidden risks of direct contracting \u2014 without explicit IP assignment, the contractor may legally own their work in some jurisdictions.',
  },
];

function CORFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Everything else you&apos;re wondering
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {corFaqs.map((faq, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
              >
                <span className="text-base font-semibold text-primary">{faq.question}</span>
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
                      <p className="text-sm text-foreground-secondary leading-relaxed">{faq.answer}</p>
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

/* ─── Section 9: Bottom CTA ────────────────────────────────────────────────── */

function BottomCTA() {
  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          You hire the people. We&apos;ll handle the rest.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Pay contractors in 242 locations. Compliant contracts, locked FX rates, and an audit trail that builds itself. All for &euro;50 per payout.
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
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-white transition-colors"
          >
            See Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function ContractorOfRecordPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CORHero />
      <PlainEnglishDefinition />
      <ProblemCards />
      <WhatCORHandles />
      <CORvsEOR />
      <HowStapeDoesIt />
      <WhoUsesACOR />
      <CORFAQ />
      <BottomCTA />
      <Footer />
    </main>
  );
}
