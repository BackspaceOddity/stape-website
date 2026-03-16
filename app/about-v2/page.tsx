'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.p
              className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Stape
            </motion.p>

            <motion.h1
              className="font-display font-extrabold text-[32px] md:text-[44px] lg:text-[52px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              We want borders and rules not to stand in the way of&nbsp;opportunities.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground-secondary leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Stape is global work infrastructure. We make payroll and compliance invisible&nbsp;&mdash; so companies hire for talent, not geography.
            </motion.p>
          </div>

          {/* Right — product photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-card">
              <Image
                src={`${basePath}/product-hero.png`}
                alt="Stape platform on a laptop"
                width={640}
                height={480}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Mission ─────────────────────────────────────────────────────────── */

function WhyWeExist() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
          Why We Exist
        </p>
        <h2 className="font-display font-extrabold text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.02em] mb-6">
          We see a world where hiring talent happens instantly.
        </h2>
        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          Where documents sign themselves. Where cross-border payments are fast, cheap, and guaranteed. Where a company never has to think about the fact that their team speaks different languages, lives under different laws, and uses different banks. A world where your team can focus on creating&nbsp;&mdash; not on paperwork or figuring out where the money went. That&apos;s not a dream. That&apos;s the spec.
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
    description: 'Pay contractors in 150+ countries with a single click. Local currency, compliant tax documents, transparent FX rates. No exceptions, no excuses.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: 'Contractor of Record',
    description: 'We become the legal contracting party so you stay compliant without setting up local entities. Our contract, our liability, your peace of mind.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Employer of Record',
    description: 'Hire full-time employees in new markets without incorporating. Because the best person for the job shouldn\u2019t have to wait for your legal team.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Compliance & Tax',
    description: 'Automated tax document generation, KYC verification, and audit trails for every transaction. Always ready. Always clean.',
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
            src={`${basePath}/product-dashboard.png`}
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
            Right now, somewhere, a founder is staring at a spreadsheet at 2&nbsp;AM. Not building. Not shipping. Not hiring. Reconciling payments to a developer in Tbilisi. Chasing an invoice from a designer in São Paulo. Googling tax residency rules for the third time this week. That&apos;s not work. That&apos;s work pretending to be work. We started Stape because we believe this entire category of work shouldn&apos;t exist. Not &ldquo;should be easier.&rdquo; Not &ldquo;should be faster.&rdquo; Should. Not. Exist.
          </p>

          <p>
            The global economy runs on talent that crosses borders&nbsp;&mdash; but the infrastructure acts like it&apos;s 1987. Between your company and the brilliant person who could change it, there&apos;s a wall of paperwork, payment rails, and compliance nobody fully understands. Other payroll companies see that wall and sell you a better shovel. We&apos;re trying to remove the need to dig. Payroll and compliance are jobs not to be done. We&apos;re here until they&apos;re not.
          </p>

          <p className="text-primary font-medium">
            One day, there will be no such thing as &ldquo;global payroll.&rdquo; It&apos;ll just be the way money moves&nbsp;&mdash; quietly, like electricity through a wall. We&apos;re building that day. And we&apos;ll keep going until the job is done&nbsp;&mdash; which is to say, until there&apos;s no job left at all.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── 6. Values ──────────────────────────────────────────────────────────── */

const values = [
  {
    title: 'Honesty',
    description: 'The market is full of hidden fees and fine print. We decided to go the other way. Transparent pricing. Straight answers. If we don\u2019t know something, we say so. Trust is not a feature\u2009\u2014\u2009it\u2019s a foundation.',
  },
  {
    title: 'Speed through high-agency',
    description: 'We don\u2019t wait for permission. We see a problem, we solve it. Decisions happen fast because the people closest to the work make them. Speed isn\u2019t a goal\u2009\u2014\u2009it\u2019s a byproduct of giving a damn.',
  },
  {
    title: 'Having fun',
    description: 'We\u2019re building infrastructure to change how the global economy works. If we can\u2019t enjoy that, something\u2019s wrong. We stay human. We keep it light. We build hard things without taking ourselves too seriously.',
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

        <div className="grid md:grid-cols-3 gap-6">
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
  { name: 'Alex Konovalov', role: 'CEO & Co-Founder', img: `${basePath}/team/alex.jpg` },
  { name: 'Daniil Kopilevych', role: 'CTO & Co-Founder', img: `${basePath}/team/daniil.jpg` },
  { name: 'Maria Shevchenko', role: 'Head of Operations', img: `${basePath}/team/maria.jpg` },
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

        <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-[900px] mx-auto">
          {team.map((person) => (
            <div key={person.role} className="text-center">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-2xl bg-white border border-border mx-auto mb-5 overflow-hidden">
                <Image
                  src={person.img}
                  alt={person.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-display font-bold text-primary text-lg">
                {person.name}
              </p>
              <p className="text-sm text-foreground-muted mt-1">{person.role}</p>
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
          We hire for talent, not passports. If that sounds like your kind of place&nbsp;&mdash; we&apos;re looking for people who want to make an entire category of work disappear.
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
      <SocialProofBar />
      <WhatWeDo />
      <OurStory />
      <Values />
      <LeadershipTeam />
      <Careers />
      <WhyWeExist />
      <BottomCTA />
      <Footer />
    </main>
  );
}
