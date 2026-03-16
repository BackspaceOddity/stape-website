'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-20 md:py-28 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

/* ─── 1. Hero ────────────────────────────────────────────────────────────── */

function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <motion.p
          className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Stape
        </motion.p>

        <motion.h1
          className="font-display font-extrabold text-[36px] md:text-[52px] lg:text-[60px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          We want borders and rules not to stand in the way of&nbsp;opportunities.
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

/* ─── 2. Mission ─────────────────────────────────────────────────────────── */

function Mission() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
          Our Mission
        </p>
        <h2 className="font-display font-extrabold text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.02em] mb-6">
          Make global payroll and compliance invisible&nbsp;&mdash; so companies hire for talent, not geography.
        </h2>
        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          The way Stripe made payments invisible, we want to make global employment invisible. One click to pay anyone, anywhere. No tax research. No compliance panic. No work that shouldn&apos;t exist.
        </p>
      </div>
    </Section>
  );
}

/* ─── 3. Social Proof / Numbers Bar ──────────────────────────────────────── */

const proofMetrics = [
  { value: '600+', label: 'Companies trust Stape' },
  { value: '150+', label: 'Countries covered' },
  { value: '$40M+', label: 'Paid to contractors' },
  { value: '0', label: 'Payment failures in 12 months' },
];

function SocialProofBar() {
  return (
    <Section className="bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {proofMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-1">
                {m.value}
              </p>
              <p className="text-sm text-foreground-muted">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Client logos placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-30">
          {['Vertex AI', 'Beacon Labs', 'Nexus Studios', 'Lightfold', 'Orbital', 'Basecamp'].map((name) => (
            <div
              key={name}
              className="h-8 flex items-center"
            >
              <span className="text-sm font-semibold text-foreground-muted tracking-wide uppercase">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 4. What We Do / Product Value ──────────────────────────────────────── */

const productValues = [
  {
    title: 'Contractor Payments',
    description: 'Pay contractors in 150+ countries with a single click. Local currency, compliant tax documents, transparent FX rates. No SWIFT limbo, no bank interrogations.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: 'Contractor of Record',
    description: 'We become the legal contracting party so you stay compliant without setting up local entities. Your contractors work for you, but the paperwork is on us.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Employer of Record',
    description: 'Hire full-time employees in new markets without incorporating. We handle employment contracts, benefits, tax withholding, and local labor law. You manage the work.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Compliance & Tax',
    description: 'Automated tax document generation, KYC verification, and audit trails for every transaction. Compliant in every jurisdiction we operate in. You learn nothing about tax law&nbsp;&mdash; and that&apos;s the point.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

function WhatWeDo() {
  return (
    <Section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="max-w-[600px] mb-14">
          <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] mb-4">
            The entire back-office for global teams&nbsp;&mdash; in one platform.
          </h2>
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
            From a single contractor payment to a full international roster, Stape handles the complexity that sits between &ldquo;we found the right person&rdquo; and &ldquo;they got paid on time, compliantly.&rdquo;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {productValues.map((item) => (
            <div
              key={item.title}
              className="bg-background-secondary rounded-2xl p-8 md:p-10"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-primary mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-base text-foreground-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Product screenshot */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-card">
          <Image
            src="/product-dashboard.png"
            alt="Stape platform — contractor management dashboard"
            width={1200}
            height={700}
            className="w-full h-auto"
          />
        </div>
      </div>
    </Section>
  );
}

/* ─── 5. Our Story — JNTBD Manifesto ─────────────────────────────────────── */

function OurStory() {
  return (
    <Section className="bg-background-secondary">
      <div className="max-w-[740px] mx-auto px-6 md:px-12">
        <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-5 text-center">
          Our Story
        </p>
        <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] mb-12 text-center">
          The job not to be done
        </h2>

        <div className="space-y-6 text-base md:text-lg text-foreground-secondary leading-relaxed">
          <p>
            Every industry has a category of work that people accept as necessary but secretly hate. Reconciling spreadsheets. Chasing tax documents. Explaining to a developer in Lagos why their payment is three days late. Nobody starts a company to do this work. Nobody&apos;s career goal is &ldquo;get really good at cross-border wire transfers.&rdquo;
          </p>

          <p>
            And yet, this is what global hiring looks like today. You find the perfect engineer, the ideal designer, the contractor who gets your product&nbsp;&mdash; and then you spend the next two weeks figuring out how to actually pay them. You Google tax codes at midnight. You set up accounts in three different payment systems. You become an unlicensed accountant.
          </p>

          <p>
            The entire payroll industry is built on the assumption that this work is inevitable. Better tools to manage the complexity. Nicer dashboards to watch the money move. Faster support for when things break.
          </p>

          <p className="text-primary font-medium">
            We think the premise is wrong. The best version of payroll isn&apos;t a better tool. It&apos;s no tool at all.
          </p>

          <p>
            That&apos;s the idea behind Stape. We don&apos;t optimize the work of paying people. We make it disappear. You click &ldquo;Pay Everyone&rdquo; and the money arrives, compliantly, in local currency, in 150+ countries. No dashboards to babysit. No exceptions to chase. No Slack messages asking &ldquo;where&apos;s my money?&rdquo;
          </p>

          <p>
            We call this a &ldquo;job not to be done.&rdquo; Not because the outcome doesn&apos;t matter&nbsp;&mdash; people getting paid matters enormously. But because the process of making it happen should require zero thought from you. Like electricity in a building. You flip the switch. The lights come on. You don&apos;t think about the grid.
          </p>

          <p>
            We started Stape because we lived this problem ourselves. We were a distributed team paying contractors in a dozen countries, and we couldn&apos;t believe how much time it consumed. So we built the thing we wished existed: infrastructure that makes global work just work.
          </p>

          <p>
            Today, 600+ companies run their contractor payroll on Stape. Most of them stopped thinking about payroll within two billing cycles. Not because we forced them. Because there was nothing left to think about.
          </p>

          <p className="text-primary font-medium">
            That&apos;s the goal. Not better payroll. Less payroll. Eventually, none.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── 6. Values ──────────────────────────────────────────────────────────── */

const values = [
  {
    title: 'Speed through honesty',
    description: 'We don\u2019t hide pricing behind a \u201CBook a Demo\u201D button. We don\u2019t pretend compliance is simple when it isn\u2019t. Transparency removes unnecessary steps. Fewer steps means faster\u2009\u2014\u2009for us and for you.',
  },
  {
    title: 'Invisible infrastructure',
    description: 'The best product is one you forget about. No dashboards to check, no exceptions to fix, no Slack messages asking \u201Cwhere\u2019s my money?\u201D If you\u2019re thinking about us, we\u2019ve failed.',
  },
  {
    title: 'Talent over geography',
    description: 'Your passport shouldn\u2019t determine who you can work with. If you found the right person, it shouldn\u2019t matter whether they\u2019re in Lisbon or Lagos. We remove that constraint.',
  },
  {
    title: 'Own the complexity',
    description: 'Compliance, currency conversion, KYC, tax forms\u2009\u2014\u2009we absorb all of it so you don\u2019t have to. You own the risk of building a great product. We own the risk of everything else.',
  },
  {
    title: 'Build for trust',
    description: '\u20AC50 per payout. No setup fees. No monthly minimums. No hidden spreads. When you trust the system, you stop checking on it. That\u2019s when payroll truly disappears.',
  },
  {
    title: 'Small team, big leverage',
    description: 'We\u2019re a distributed team ourselves\u2009\u2014\u2009our own payroll runs on Stape. High-agency people, minimal hierarchy, and the conviction that a small team can build something that makes a $50B industry irrelevant.',
  },
];

function Values() {
  return (
    <Section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
            Our Values
          </p>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em]">
            What drives us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="border border-border rounded-2xl p-8"
            >
              <h3 className="text-lg font-display font-bold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 7. Leadership Team ─────────────────────────────────────────────────── */

const team = [
  { name: '[Name]', role: 'CEO & Co-Founder' },
  { name: '[Name]', role: 'CTO & Co-Founder' },
  { name: '[Name]', role: 'Head of Operations' },
  { name: '[Name]', role: 'Head of Compliance' },
  { name: '[Name]', role: 'Head of Product' },
  { name: '[Name]', role: 'Head of Growth' },
];

function LeadershipTeam() {
  return (
    <Section className="bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
            Leadership
          </p>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em]">
            The team behind Stape
          </h2>
          <p className="text-base text-foreground-secondary mt-4 max-w-2xl mx-auto">
            A small, high-agency team spread across multiple countries. We practice what we preach&nbsp;&mdash; our own payroll runs on Stape.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((person) => (
            <div key={person.role} className="text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white border border-border mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-foreground-muted/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <p className="font-display font-bold text-primary text-base">
                {person.name}
              </p>
              <p className="text-sm text-foreground-muted">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 8. Careers / Join Us ───────────────────────────────────────────────── */

const openRoles = [
  { title: 'Senior Backend Engineer', location: 'Remote' },
  { title: 'Compliance Lead', location: 'Remote / EU' },
  { title: 'Product Designer', location: 'Remote' },
];

function Careers() {
  return (
    <Section className="bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
          Careers
        </p>
        <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] mb-4">
          Help us make payroll disappear
        </h2>
        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10">
          We&apos;re building the infrastructure layer for global work. If making a $50&nbsp;billion industry irrelevant sounds interesting, we&apos;d love to hear from you.
        </p>

        {/* Open positions */}
        <div className="max-w-[600px] mx-auto space-y-3 text-left mb-10">
          {openRoles.map((role) => (
            <a
              key={role.title}
              href="#"
              className="flex items-center justify-between p-4 bg-background-secondary rounded-xl hover:bg-border/30 transition-colors group"
            >
              <div>
                <p className="font-semibold text-primary text-sm group-hover:text-primary/80 transition-colors">{role.title}</p>
                <p className="text-xs text-foreground-muted">{role.location}</p>
              </div>
              <svg
                className="w-4 h-4 text-foreground-muted group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
        >
          View All Open Positions
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </Section>
  );
}

/* ─── 9. Bottom CTA ──────────────────────────────────────────────────────── */

function BottomCTA() {
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary-foreground mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to stop doing payroll?
        </motion.h2>
        <motion.p
          className="text-base text-white/60 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Pay one contractor through Stape this month. See how it feels. If it works, pay two next month. We&apos;re not trying to own your soul&nbsp;&mdash; we&apos;re trying to save your Saturdays.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-md hover:bg-accent-hover transition-colors"
          >
            Book a Demo
          </a>
          <a
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-white/20 text-primary-foreground font-semibold text-sm rounded-md hover:bg-white/10 transition-colors"
          >
            See Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AboutV2Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <Mission />
      <SocialProofBar />
      <WhatWeDo />
      <OurStory />
      <Values />
      <LeadershipTeam />
      <Careers />
      <BottomCTA />
      <Footer />
    </main>
  );
}
