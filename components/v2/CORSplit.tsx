'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Content ──────────────────────────────────────────────────────────────── */

const youItems = [
  'Who you hire',
  'Scope & deliverables',
  'Day-to-day comms',
  'Performance calls',
  'Your sanity',
];

const corItems = [
  'Compliant contracts',
  'Worker classification',
  'Cross-border payments',
  'Tax docs & audit trail',
  'IP transfer clauses',
];

/* ─── Check icon ────────────────────────────────────────────────────────────── */
// Path mirrors DS canonical vector (620:3779): M 13.33 0 L 4.17 9.17 L 0 5
// translated to 20×20 viewBox with 3.33px offset

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path
        d="M16.67 5.42L7.5 14.58L3.33 10.42"
        stroke="currentColor"
        strokeWidth="2.08"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Checklist item ────────────────────────────────────────────────────────── */

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <CheckIcon />
      <span
        className="font-sans font-normal text-white"
        style={{ fontSize: '16px', lineHeight: '140%' }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── Pill tag ──────────────────────────────────────────────────────────────── */
// DS: #fefda8 bg, #141414 text, 20px border-radius, 6/14px padding, 14px Regular
// Web: bg-accent (#D4F651), text-accent-foreground (#1A2F2B) — brand accent tokens

function Pill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center bg-accent text-accent-foreground font-sans font-normal"
      style={{
        fontSize: '14px',
        lineHeight: '140%',
        borderRadius: '20px',
        padding: '6px 14px',
      }}
    >
      {label}
    </span>
  );
}

/* ─── Card ──────────────────────────────────────────────────────────────────── */
// DS: 588×359, padding 48px, cornerRadius 24px, gap 40px between header and list
// Layout: VERTICAL, gap 40px. Header row: pill + verb, gap 8px

function CORCard({
  pill,
  verb,
  items,
  bgClass,
  delay,
}: {
  pill: string;
  verb: string;
  items: string[];
  bgClass: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`flex-1 flex flex-col gap-10 rounded-[24px] text-white ${bgClass}`}
      style={{ padding: '48px' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
    >
      {/* Header row: pill + verb — DS HeaderRow, gap 8px, crossAlign CENTER */}
      <div className="flex items-center gap-2">
        <Pill label={pill} />
        <span
          className="font-display font-medium text-white"
          style={{ fontSize: '32px', lineHeight: '104%' }}
        >
          {verb}
        </span>
      </div>

      {/* Checklist — DS Checklist, VERTICAL gap 20px */}
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <ChecklistItem key={i} text={item} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────────── */
// DS root: 1440×735, VERTICAL, gap 80, padding 80/120/80/120
// Headline: 56px Medium, -2% ls, 104% lh (DS #Heading pattern)
// Cards row: HORIZONTAL gap 24px — two equal columns

export default function CORSplit() {
  const headlineRef = useRef(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1440px] mx-auto px-[120px]">

        {/* Section headline */}
        <motion.h2
          ref={headlineRef}
          className="font-display font-medium text-primary"
          style={{
            fontSize: '56px',
            lineHeight: '104%',
            letterSpacing: '-0.02em',
            marginBottom: '48px',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What you own.<br />What we own.
        </motion.h2>

        {/* Two-column cards — DS ComparisonGrid, HORIZONTAL gap 24px */}
        <div className="flex gap-6">
          <CORCard
            pill="You"
            verb="keep"
            items={youItems}
            bgClass="bg-primary"
            delay={0.1}
          />
          <CORCard
            pill="COR"
            verb="handles"
            items={corItems}
            bgClass="bg-cor-green"
            delay={0.2}
          />
        </div>

      </div>
    </section>
  );
}
