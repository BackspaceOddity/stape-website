'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
          [Hero headline placeholder]
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          [Hero subheadline — 1-2 sentences about what Stape is and why it exists. Will be refined in the next step.]
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
          [Mission statement placeholder]
        </h2>
        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          [1-2 supporting sentences explaining the mission in more detail.]
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
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 bg-foreground-muted/20 rounded"
            />
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
    description: '[Placeholder — fast, compliant payments to contractors in 150+ countries.]',
  },
  {
    title: 'Contractor of Record',
    description: '[Placeholder — we become the legal employer so you stay compliant.]',
  },
  {
    title: 'Employer of Record',
    description: '[Placeholder — hire full-time employees anywhere without setting up entities.]',
  },
  {
    title: 'Compliance & Tax',
    description: '[Placeholder — automated tax document generation, local compliance handled.]',
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
            [Product value headline placeholder]
          </h2>
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
            [Brief description of the platform — what Stape does at a high level.]
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {productValues.map((item) => (
            <div
              key={item.title}
              className="bg-background-secondary rounded-2xl p-8 md:p-10"
            >
              <h3 className="text-xl font-display font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-base text-foreground-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 5. Our Story / How We Got Here ─────────────────────────────────────── */

const storyMilestones = [
  { year: '2021', text: '[Placeholder — founding story, first problem encountered.]' },
  { year: '2022', text: '[Placeholder — first customers, product-market fit.]' },
  { year: '2023', text: '[Placeholder — scaling, key milestone.]' },
  { year: '2024', text: '[Placeholder — expansion, new products.]' },
  { year: '2025', text: '[Placeholder — where we are today.]' },
];

function OurStory() {
  return (
    <Section className="bg-background-secondary">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em]">
            [How Stape came to be]
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {storyMilestones.map((milestone) => (
              <div key={milestone.year} className="flex gap-6 md:gap-8">
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-white border-2 border-primary flex items-center justify-center">
                    <span className="text-xs md:text-sm font-bold text-primary">
                      {milestone.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-3">
                  <p className="text-base text-foreground-secondary leading-relaxed">
                    {milestone.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── 6. Values ──────────────────────────────────────────────────────────── */

const values = [
  {
    title: 'Speed through honesty',
    description: '[Placeholder — transparency removes unnecessary steps.]',
  },
  {
    title: 'Invisible infrastructure',
    description: '[Placeholder — the best product is one you forget about.]',
  },
  {
    title: 'Talent over geography',
    description: '[Placeholder — hire based on skill, not passport.]',
  },
  {
    title: 'Own the complexity',
    description: '[Placeholder — we absorb compliance burden so you don\'t have to.]',
  },
  {
    title: 'Build for trust',
    description: '[Placeholder — no hidden fees, no surprises.]',
  },
  {
    title: 'Small team, big leverage',
    description: '[Placeholder — high-agency people, minimal hierarchy.]',
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
            [What drives us]
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
  { name: '[Name]', role: 'CEO & Co-Founder', photo: null },
  { name: '[Name]', role: 'CTO & Co-Founder', photo: null },
  { name: '[Name]', role: 'Head of Operations', photo: null },
  { name: '[Name]', role: 'Head of Compliance', photo: null },
  { name: '[Name]', role: 'Head of Product', photo: null },
  { name: '[Name]', role: 'Head of Growth', photo: null },
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
            A small, high-agency team spread across multiple countries. We practice what we preach — our own payroll runs on Stape.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((person) => (
            <div key={person.role} className="text-center">
              {/* Photo placeholder */}
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

function Careers() {
  return (
    <Section className="bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">
          Careers
        </p>
        <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-primary tracking-[-0.02em] mb-4">
          [Join us headline placeholder]
        </h2>
        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10">
          [Placeholder — we're building the infrastructure for global work. If that excites you, we'd love to hear from you.]
        </p>

        {/* Open positions placeholder */}
        <div className="max-w-[600px] mx-auto space-y-3 text-left mb-10">
          {['Senior Backend Engineer', 'Compliance Lead', 'Product Designer'].map(
            (role) => (
              <div
                key={role}
                className="flex items-center justify-between p-4 bg-background-secondary rounded-xl"
              >
                <div>
                  <p className="font-semibold text-primary text-sm">{role}</p>
                  <p className="text-xs text-foreground-muted">Remote</p>
                </div>
                <svg
                  className="w-4 h-4 text-foreground-muted"
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
              </div>
            )
          )}
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
          className="text-base text-white/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Pay one contractor through Stape. See how it feels.
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

export default function AboutPage() {
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
