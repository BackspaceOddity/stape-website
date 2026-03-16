'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[36px] md:text-[52px] lg:text-[60px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We want borders and rules not to stand in the way of opportunities.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Stape is global work infrastructure. We make it possible to hire and pay anyone, anywhere&nbsp;&mdash; without the bureaucratic overhead that comes with it.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── The Problem ────────────────────────────────────────────────────────── */

function TheProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[740px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[28px] md:text-[36px] font-display font-extrabold text-primary mb-10 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Something is broken. Let&apos;s talk about it.
        </motion.h2>

        <motion.div
          className="space-y-6 text-base md:text-lg text-foreground-secondary leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            The best engineer for your company might live in a country where you can&apos;t easily send a payment. So you hire someone worse who happens to be in a convenient jurisdiction. That&apos;s not a hiring strategy. That&apos;s geography making decisions for you.
          </p>
          <p>
            Every day, companies choose who to work with based on where it&apos;s easy to pay&nbsp;&mdash; not who&apos;s actually best for the job. Entire careers don&apos;t happen because a wire transfer is too complicated. That&apos;s an absurd reason to lose talent.
          </p>
          <p>
            Meanwhile, your CFO spends Tuesday reconciling payments across three tools. Your HR lead is googling Brazilian labor law. Your founder is explaining to the team&nbsp;&mdash; again&nbsp;&mdash; why payroll is late. None of this is progress. It&apos;s failure-prevention disguised as work.
          </p>
          <p>
            Payroll and compliance aren&apos;t &ldquo;part of doing business.&rdquo; They&apos;re overhead that pretends to be work. Nobody got into entrepreneurship to chase tax documents across twelve jurisdictions. We&apos;re here to make that entire job disappear.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── What We Believe ────────────────────────────────────────────────────── */

const beliefs = [
  {
    statement: 'People should live where they want and work with who they want.',
    body: 'Your passport shouldn\u2019t determine who you can work with. If you found the right person, it shouldn\u2019t matter whether they\u2019re in Lisbon or Lagos. We\u2019re building the infrastructure that removes that constraint \u2014 so hiring decisions are based on talent, not on where the banking rails happen to reach.',
  },
  {
    statement: 'Payroll is a job not to be done.',
    body: 'We don\u2019t optimize payroll. We want it to not exist. The best product is the one you forget about because it just works. No dashboards to check, no exceptions to fix, no Slack messages asking \u201Cwhere\u2019s my money?\u201D Invisible infrastructure. That\u2019s what we\u2019re building.',
  },
  {
    statement: 'Speed through honesty.',
    body: 'We don\u2019t hide pricing behind a \u201CBook a Demo\u201D button. We don\u2019t pretend compliance is simple when it isn\u2019t. We say what things cost, how long they take, and what can go wrong. Honesty removes unnecessary steps. And fewer steps means moving faster \u2014 for us and for you.',
  },
];

function WhatWeBelieve() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[28px] md:text-[36px] font-display font-extrabold text-primary mb-14 tracking-[-0.02em] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What we believe
        </motion.h2>

        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {beliefs.map((belief, index) => (
            <div key={index} className="bg-background-secondary rounded-2xl p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-4 leading-snug">
                {belief.statement}
              </h3>
              <p className="text-base text-foreground-secondary leading-relaxed">
                {belief.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Where We're Going ──────────────────────────────────────────────────── */

function WhereWereGoing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[740px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[28px] md:text-[36px] font-display font-extrabold text-primary mb-8 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Where this is going
        </motion.h2>

        <motion.div
          className="bg-white rounded-2xl p-8 md:p-10 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
            We&apos;re not building another payroll provider. The world has enough of those. We&apos;re building the default infrastructure layer for global work&nbsp;&mdash; the thing that sits underneath and makes it possible for companies to hire anyone, pay anyone, and stay compliant everywhere, without thinking about it. The way Stripe made payments invisible, we want to make global employment invisible. We&apos;re not there yet. But that&apos;s where we&apos;re headed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────── */

function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[740px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[28px] md:text-[36px] font-display font-extrabold text-primary mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The team behind Stape
        </motion.h2>

        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A small, high-agency team spread across multiple countries. We practice what we preach&nbsp;&mdash; our own payroll runs on Stape. More here soon.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-border/60"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Bottom CTA ─────────────────────────────────────────────────────────── */

function BottomCTA() {
  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-8 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to stop doing payroll?
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Book a Demo
          </a>
          <a
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-white transition-colors"
          >
            See Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <TheProblem />
      <WhatWeBelieve />
      <WhereWereGoing />
      <Team />
      <BottomCTA />
      <Footer />
    </main>
  );
}
