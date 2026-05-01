'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Section 1: Hero ──────────────────────────────────────────────────────── */

function EORHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hire full-time employees anywhere. Without &ldquo;anywhere&rdquo; becoming your problem.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Kleos puts your people on local payroll in 15+ countries. Employment law, taxes, benefits, compliance — handled.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Talk to Us About EOR
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            See Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 2: Who This Is For ───────────────────────────────────────────── */

function WhoThisIsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const items = [
    'Companies with 50+ employees scaling internationally',
    'Established businesses with budget for full employment costs',
    'Teams converting key contractors to full-time employment',
    'Companies entering new markets without local entities',
  ];

  return (
    <section ref={ref} className="py-14 md:py-18 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border text-sm text-foreground-secondary">
              <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 3: What Kleos EOR Does ──────────────────────────────────────── */

function WhatEORDoes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.p
          className="text-base md:text-lg text-foreground-secondary leading-relaxed text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          An Employer of Record becomes the legal employer on your behalf. On paper, Kleos employs them. In practice, they work for you. Payroll, taxes, benefits, contracts — we run it. You run the team.
        </motion.p>

        {/* You / EOR split */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-background-secondary rounded-xl p-6 border border-border">
            <h3 className="text-sm font-display font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5">You</span>
              keep
            </h3>
            <ul className="space-y-2.5">
              {['Who you hire', 'Roles & goals', 'Daily management', 'Compensation decisions', 'Culture & growth'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background-secondary rounded-xl p-6 border border-border">
            <h3 className="text-sm font-display font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5">EOR</span>
              handles
            </h3>
            <ul className="space-y-2.5">
              {['Employment contracts', 'Payroll & tax filing', 'Benefits & social security', 'Termination compliance', 'Work permits'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: When You Actually Need This ───────────────────────────────── */

const triggerCards = [
  {
    title: 'Your best hire demands employment',
    body: 'A valuable specialist insists on being on payroll. They\u2019re worth the cost. You can\u2019t say no — and you shouldn\u2019t have to.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'You\u2019re restructuring',
    body: 'Closing a local entity, moving people to umbrella employment, reorganizing a distributed team. EOR absorbs the complexity.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: 'You\u2019re testing a new market',
    body: '2\u20133 people in a new country. Not enough to justify an entity. EOR lets you start now and figure out the structure later.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Your contractor should really be an employee',
    body: 'Fixed hours, your tools, your manager. The engagement has evolved. Time to make it official before a regulator does.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
];

function TriggerCards() {
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
          When you actually need an EOR
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {triggerCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 md:p-8 border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-4 text-primary">
                {card.icon}
              </div>
              <h3 className="text-base font-display font-bold text-primary mb-2">{card.title}</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 5: Be Honest About Whether You Need This ─────────────────────── */

function HonestyCheck() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-14 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Be honest about whether you need this
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-accent/10 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-base font-display font-bold text-primary mb-5">EOR makes sense when:</h3>
            <ul className="space-y-3">
              {[
                'The role is full-time and deeply integrated with your team',
                'Local law requires formal employment, not contracting',
                'A contractor needs to be converted before regulators notice',
                'You\u2019re testing a market with 2\u20133 hires, no entity',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background-secondary rounded-2xl p-8 border border-border">
            <h3 className="text-base font-display font-bold text-primary mb-5">You probably don&apos;t need EOR if:</h3>
            <ul className="space-y-3">
              {[
                'The work is project-based with a clear end date',
                'The person is genuinely independent and invoices multiple clients',
                'You already have a local entity in that country',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-foreground-muted">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-sm text-foreground-secondary mt-10 font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We&apos;d rather tell you the truth than sell you something you don&apos;t need.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 5b: EOR vs Local Entity ─────────────────────────────────────── */

const eorVsEntityRows = [
  { feature: 'Time to hire', eor: 'Days', entity: '3–6 months' },
  { feature: 'Setup cost', eor: 'Zero', entity: '€15k–50k+' },
  { feature: 'Ongoing overhead', eor: 'One monthly fee', entity: 'Accountants, lawyers, filings' },
  { feature: 'Minimum headcount needed', eor: '1 person', entity: 'Usually 5+ to justify' },
  { feature: 'Flexibility to exit', eor: 'End the agreement', entity: 'Liquidation process' },
];

function EORvsEntity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          EOR vs. opening your own entity
        </motion.h2>

        <motion.div
          className="bg-white rounded-2xl p-6 md:p-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-2/5"></th>
                <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-tl-xl">
                  EOR
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted rounded-tr-xl">
                  Local entity
                </th>
              </tr>
            </thead>
            <tbody>
              {eorVsEntityRows.map((row, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-3 text-sm font-medium text-primary">{row.feature}</td>
                  <td className={`py-3 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === eorVsEntityRows.length - 1 ? 'rounded-bl-xl' : ''}`}>
                    {row.eor}
                  </td>
                  <td className={`py-3 px-3 text-sm text-foreground-muted text-center ${index === eorVsEntityRows.length - 1 ? 'rounded-br-xl' : ''}`}>
                    {row.entity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          className="text-sm text-foreground-secondary text-center mt-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          An entity makes sense when you have 10+ people in one country and plan to stay. For everything else, there&apos;s EOR.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 6: How It Works (Timeline) ──────────────────────────────────── */

const eorSteps = [
  {
    title: 'Tell us who you\u2019re hiring and where',
    description: 'Share the role, location, and compensation — we confirm availability and local requirements.',
  },
  {
    title: 'We draft a compliant employment contract',
    description: 'Tailored to local labor law: probation, notice periods, benefits, country-specific clauses.',
  },
  {
    title: 'Your employee starts. We handle payroll.',
    description: 'Salary, tax withholding, social contributions, statutory benefits — paid on time, every month.',
  },
  {
    title: 'You manage the work. We manage the compliance.',
    description: 'Law changes, filings, benefit adjustments, and if needed — compliant offboarding.',
  },
];

function HowKleosDoesEOR() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-stape-does-eor" ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            How it works with Kleos
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative flex items-center justify-between mb-6 px-4">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {eorSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {eorSteps.map((step, index) => (
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

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-primary font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
          >
            Talk to Us About EOR
          </a>
          <p className="text-xs text-white/40 mt-4 max-w-md mx-auto">
            Available in 15+ countries. Tell us where you need to hire.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 6b: Pricing ─────────────────────────────────────────────────── */

const eorPricingFeatures = [
  'Full legal employment without local entity',
  'Local labor law compliance',
  'Payroll processing & tax filings',
  'Benefits administration',
  'Employment contracts per jurisdiction',
  'Onboarding & offboarding managed',
  'IP protection provisions',
  'Ongoing HR & legal support',
  'One B2B invoice for your books',
  'FX conversion no more than 3.5% — locked at signing',
];

const employeeFeatures = [
  'Zero fees deducted from salary',
  'Full statutory benefits included',
  'Local employment contract',
  'Paid in local currency, on time',
  'Full visibility into payslips',
  'Same protections as any local employee',
];

function EORPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          EOR pricing
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          One monthly fee per employee. Your employees pay nothing.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* For companies */}
          <div className="bg-background-secondary rounded-2xl p-8 md:p-10 border-2 border-primary/20 shadow-card flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">For companies</span>
            <div className="mb-1">
              <span className="text-base text-foreground-muted mr-1 align-baseline">From</span>
              <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;200</span>
            </div>
            <p className="text-base text-foreground-secondary mb-1">/ per employee per month</p>
            <p className="text-sm text-foreground-muted mb-8">Depends on country. Get a quote.</p>

            <a
              href="#"
              className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors mb-8"
            >
              Get a Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <ul className="space-y-3">
              {eorPricingFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For employees */}
          <div className="bg-background-secondary rounded-2xl p-8 md:p-10 border border-border shadow-card flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">For employees</span>
            <div className="mb-1">
              <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;0</span>
            </div>
            <p className="text-base text-foreground-secondary mb-1">/ always</p>
            <p className="text-sm text-foreground-muted mb-8">Your employees never pay a cent.</p>

            <ul className="space-y-3">
              {employeeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 7: FAQ ───────────────────────────────────────────────────────── */

const eorFaqs = [
  {
    question: 'How fast can I hire someone through EOR?',
    answer: '5\u201310 business days from contract to first day, depending on country and work permit requirements.',
  },
  {
    question: 'What benefits do EOR employees get?',
    answer: 'Statutory benefits required by local law — pension, healthcare, paid leave. We can support supplementary benefits depending on the country.',
  },
  {
    question: 'Can I convert a contractor to an employee?',
    answer: 'Yes. We handle the transition — new contract, proper classification, payroll setup — with minimal disruption.',
  },
  {
    question: 'Who decides compensation?',
    answer: 'You do. We advise on local minimums and market benchmarks so your offer is competitive and compliant.',
  },
  {
    question: 'What happens if I need to terminate someone?',
    answer: 'We handle it in full compliance with local labor law — notice periods, severance, documentation. You make the decision; we execute it legally.',
  },
  {
    question: 'What if you don\u2019t cover my country yet?',
    answer: 'Let us know. We\u2019re expanding and can sometimes fast-track availability for specific countries.',
  },
];

function EORFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="eor-faq" ref={ref} className="py-20 md:py-28 bg-background-secondary">
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
          {eorFaqs.map((faq, index) => (
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

/* ─── Section 8: Bottom CTA ────────────────────────────────────────────────── */

function EORBottomCTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Hire anywhere. Legally.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Full-time employees on local payroll, compliant from day one. No entity required.
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            See Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function EmployerOfRecordPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <EORHero />
      <WhoThisIsFor />
      <WhatEORDoes />
      <TriggerCards />
      <HonestyCheck />
      <EORvsEntity />
      <HowKleosDoesEOR />
      <EORPricing />
      <EORFAQ />
      <EORBottomCTA />
      <Footer />
    </main>
  );
}
