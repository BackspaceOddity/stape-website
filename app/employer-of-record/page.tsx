'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Section 1: Hero ──────────────────────────────────────────────────────── */

function EORHero() {
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
          Hire full-time employees anywhere. Without &ldquo;anywhere&rdquo; becoming your problem.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          An Employer of Record lets you put people on payroll in countries where you don&apos;t have a legal entity&nbsp;&mdash; handling employment law, taxes, benefits, and compliance so you don&apos;t have to.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={() => scrollToSection('eor-faq')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Talk to Us About EOR
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
            onClick={() => scrollToSection('eor-vs-cor')}
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            How is this different from a COR?&nbsp;&rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 2: The Plain-English Definition ──────────────────────────────── */

function EORDefinition() {
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
          What an Employer of Record actually is
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
            <h3 className="text-base font-display font-bold text-primary mb-3">You want to hire someone in Germany. You don&apos;t have a German entity.</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Setting one up takes months, costs tens of thousands, and only makes sense if you&apos;re hiring a team. For one or two people, it&apos;s overkill.
            </p>
          </div>

          {/* Block 2 — The answer */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-display font-bold text-primary mb-3">An EOR becomes the legal employer on your behalf.</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              They put your hire on a local payroll, handle taxes, statutory benefits, and employment contracts. On paper, the EOR employs them. In practice, they work for you.
            </p>
          </div>

          {/* Block 3 — The division of labor */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-base font-display font-bold text-primary mb-5">You run the team. The EOR runs the employment.</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5 mt-0.5 flex-shrink-0">You</span>
                <p className="text-sm text-foreground-secondary leading-relaxed">Who to hire. What they work on. How they grow.</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-primary bg-accent/30 rounded px-1.5 py-0.5 mt-0.5 flex-shrink-0">EOR</span>
                <p className="text-sm text-foreground-secondary leading-relaxed">Payroll. Taxes. Benefits. Contracts. Termination law.</p>
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
          They&apos;re your people. The EOR just makes it legal.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 3: The Problem It Solves ─────────────────────────────────────── */

const eorProblemCards = [
  {
    title: 'Opening an entity is slow and expensive',
    body: 'Registering a company in a new country means lawyers, accountants, local directors, registered offices, and months of setup. If you just need to hire two engineers in Portugal, this isn\u2019t a business decision \u2014 it\u2019s a hostage situation.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Employment law is local. Very local.',
    body: 'Germany requires works councils. France mandates 25 days of paid leave. Brazil has a 13th-month salary. The Netherlands limits probation periods to two months. You can\u2019t Google your way through this. An EOR already knows.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Misclassifying employees as contractors is getting riskier',
    body: 'If your \u201Ccontractor\u201D works fixed hours, uses your tools, and reports to your manager \u2014 regulators may call them an employee. The penalties are retroactive: back-taxes, social security contributions, fines. An EOR removes the ambiguity by making them an actual employee.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    title: 'Your best candidate won\u2019t wait for your entity setup',
    body: 'Top talent has options. If your offer comes with \u201Cwe just need 4 months to set up our legal entity,\u201D they\u2019ll take the job that starts next Monday. An EOR lets you hire in days, not quarters.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

function EORProblemCards() {
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
          Why companies use an EOR (instead of the alternatives)
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {eorProblemCards.map((card, index) => (
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

/* ─── Section 4: What an EOR Handles ───────────────────────────────────────── */

const eorHandles = [
  'Locally compliant employment contracts',
  'Payroll processing and salary payments',
  'Income tax withholding and filing',
  'Statutory benefits (pension, healthcare, leave)',
  'Social security contributions',
  'Termination and severance compliance',
  'Work permits and visa support (where applicable)',
  'Ongoing employment law updates',
];

const eorYouKeep = [
  'Choosing who joins your team',
  'Defining roles, goals, and growth paths',
  'Daily management and mentorship',
  'Performance reviews and promotions',
  'Team culture and onboarding experience',
  'Compensation decisions (within local minimums)',
  'The decision to part ways (EOR handles the how)',
];

function WhatEORHandles() {
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
          {/* Left: EOR handles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10"
          >
            <h3 className="text-lg font-display font-bold text-white mb-6">The EOR handles:</h3>
            <ul className="space-y-3">
              {eorHandles.map((item, i) => (
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
              {eorYouKeep.map((item, i) => (
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

/* ─── Section 5: EOR vs. COR ──────────────────────────────────────────────── */

const eorVsCorRows = [
  {
    feature: 'Who it\u2019s for',
    eor: 'Full-time employees you want on local payroll',
    cor: 'Independent contractors and freelancers',
  },
  {
    feature: 'Legal relationship',
    eor: 'EOR is the legal employer. Worker is a salaried employee.',
    cor: 'Contractor stays independent. COR is the contracting entity.',
  },
  {
    feature: 'What\u2019s included',
    eor: 'Payroll, taxes, benefits, employment law, termination',
    cor: 'Contracts, compliance, payments, tax docs',
  },
  {
    feature: 'Best for',
    eor: 'Long-term roles, team integration, countries with strict labor law',
    cor: 'Project work, specialist skills, flexible scaling',
  },
  {
    feature: 'Typical cost',
    eor: '$400\u2013700/employee/month + statutory costs',
    cor: '\u20ac50 per payout (with Stape)',
  },
  {
    feature: 'Commitment',
    eor: 'Employment obligations: notice periods, severance, benefits',
    cor: 'No employment obligations. Scale up or down freely.',
  },
  {
    feature: 'When to choose',
    eor: 'The person is effectively full-time and embedded in your team',
    cor: 'The person works independently on defined deliverables',
  },
];

function EORvsCOR() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="eor-vs-cor" ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          EOR vs. COR&nbsp;&mdash; when to use which
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary text-center max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          If you&apos;ve read our <Link href="/contractor-of-record" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors">Contractor of Record page</Link>, you already know both models help you hire across borders. The difference is the type of worker and the type of relationship.
        </motion.p>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 min-w-[700px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-1/4"></th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-tl-xl">
                    Employer of Record (EOR)
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted rounded-tr-xl">
                    Contractor of Record (COR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {eorVsCorRows.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className={`py-4 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === eorVsCorRows.length - 1 ? 'rounded-bl-xl' : ''}`}>
                      {row.eor}
                    </td>
                    <td className={`py-4 px-3 text-sm text-foreground-muted text-center ${index === eorVsCorRows.length - 1 ? 'rounded-br-xl' : ''}`}>
                      {row.cor}
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
            The honest rule of thumb: if you&apos;re managing what they do, when they do it, and how they do it&nbsp;&mdash; that&apos;s employment. Use an EOR. If you&apos;re defining the outcome and they decide how to get there&nbsp;&mdash; that&apos;s contracting. Use a COR.
          </p>
          <p className="text-sm text-foreground-secondary leading-relaxed font-semibold">
            Stape offers both. Start where you are. We&apos;ll tell you if the model should change.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 6: When EOR Makes Sense ──────────────────────────────────────── */

const eorMakesSense = [
  'You\u2019re hiring full-time in a country where you have no entity',
  'The role is long-term and deeply integrated with your team',
  'Local labor law requires formal employment (not contracting)',
  'You need to offer benefits to attract top talent',
  'A contractor you\u2019ve been working with should really be an employee',
  'You want to test a market before committing to entity setup',
];

const eorNotNeeded = [
  'The work is project-based with a clear end date',
  'The person works independently and sets their own schedule',
  'You already have a legal entity in that country',
  'You\u2019re hiring for less than 6 months (a COR may be simpler)',
  'The person is genuinely self-employed and invoices multiple clients',
];

function WhenEORMakesSense() {
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
          Be honest about whether you need this
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* EOR makes sense */}
          <div className="bg-accent/10 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-base font-display font-bold text-primary mb-5">EOR makes sense when:</h3>
            <ul className="space-y-3">
              {eorMakesSense.map((item, i) => (
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

          {/* Probably don't need EOR */}
          <div className="bg-background-secondary rounded-2xl p-8 border border-border">
            <h3 className="text-base font-display font-bold text-primary mb-5">You probably don&apos;t need an EOR if:</h3>
            <ul className="space-y-3">
              {eorNotNeeded.map((item, i) => (
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
          We&apos;d rather tell you the right model than sell you the expensive one. That&apos;s why we offer both.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 7: How Stape Does EOR (Timeline) ────────────────────────────── */

const eorSteps = [
  {
    title: 'Tell us who you\u2019re hiring and where',
    description: 'Share the role, location, and compensation. We confirm EOR availability and walk you through local requirements.',
  },
  {
    title: 'We draft a compliant employment contract',
    description: 'Tailored to local labor law \u2014 including probation terms, notice periods, benefits, and any country-specific requirements. Your hire reviews and signs.',
  },
  {
    title: 'Your employee starts. We handle payroll.',
    description: 'Salary, tax withholding, social contributions, statutory benefits \u2014 paid on time, every month, in local currency.',
  },
  {
    title: 'You manage the work. We manage the compliance.',
    description: 'Employment law changes, annual filings, benefit adjustments, and if needed \u2014 compliant offboarding. You get a single monthly invoice.',
  },
];

function HowStapeDoesEOR() {
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
            {eorSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
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

        {/* CTA */}
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
            Stape EOR is currently available in 8 countries, with more being added. Contact us to check availability for your team.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 8: FAQ ───────────────────────────────────────────────────────── */

const eorFaqs = [
  {
    question: 'Which countries does Stape EOR cover?',
    answer: 'We currently support EOR in 8 countries. Coverage is expanding \u2014 reach out and we\u2019ll confirm availability for the specific locations you need.',
  },
  {
    question: 'How fast can I hire someone through EOR?',
    answer: 'Typically 5\u201310 business days from contract to first day, depending on the country and any work permit requirements.',
  },
  {
    question: 'What benefits do EOR employees get?',
    answer: 'Statutory benefits required by local law \u2014 pension, healthcare, paid leave, etc. We can also support supplementary benefits depending on the country.',
  },
  {
    question: 'Can I convert a contractor to an employee through EOR?',
    answer: 'Yes, and we recommend it when the engagement starts resembling employment. We handle the transition \u2014 new contract, proper classification, payroll setup \u2014 with minimal disruption.',
  },
  {
    question: 'Who decides compensation?',
    answer: 'You do. We advise on local minimums, market benchmarks, and mandatory benefits so your offer is competitive and compliant.',
  },
  {
    question: 'What happens if I need to terminate an EOR employee?',
    answer: 'We handle the process in full compliance with local labor law \u2014 notice periods, severance calculations, documentation. You make the decision; we execute it legally.',
  },
  {
    question: 'How does pricing work?',
    answer: 'EOR pricing depends on the country and scope. Contact us for a quote based on your specific situation.',
  },
  {
    question: 'What if I need EOR in a country you don\u2019t cover yet?',
    answer: 'Let us know. We\u2019re actively expanding, and in some cases we can fast-track availability for specific countries.',
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

/* ─── Section 9: Bottom CTA ────────────────────────────────────────────────── */

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
            Talk to Us About EOR
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/contractor-of-record"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            See How COR Works Instead&nbsp;&rarr;
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
      <EORDefinition />
      <EORProblemCards />
      <WhatEORHandles />
      <EORvsCOR />
      <WhenEORMakesSense />
      <HowStapeDoesEOR />
      <EORFAQ />
      <EORBottomCTA />
      <Footer />
    </main>
  );
}
