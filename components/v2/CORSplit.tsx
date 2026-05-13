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

/* ─── Timeline list (vertical icons connected by a line) ───────────────────── */
// Pattern from Figma 59:3543:
// Each item: HORIZONTAL row, gap 16px
//   Icon column (20px wide, full height):
//     first item  → circle (20×20, #EBEBEB) + connector (1×62, #D0D0D0)
//     middle items → connector (top) + circle + connector (bottom)
//     last item   → connector (top) + circle
//   Text column: 20px Regular, lh 136%, padding-bottom 40px (except last)

function TimelineList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-stretch gap-4">
            {/* Icon column — 20px wide, stretches full item height */}
            <div className="flex flex-col items-center w-5 flex-shrink-0">
              {/* Top connector (all except first item) */}
              {!isFirst && (
                <div
                  className="w-px flex-none"
                  style={{ height: '12px', backgroundColor: '#D0D0D0' }}
                />
              )}
              {/* Circle */}
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#EBEBEB' }}
              />
              {/* Bottom connector (all except last item) */}
              {!isLast && (
                <div
                  className="w-px flex-1"
                  style={{ backgroundColor: '#D0D0D0', minHeight: '32px' }}
                />
              )}
            </div>

            {/* Text */}
            <p
              className="text-[20px] font-sans font-normal text-[#141414]"
              style={{
                lineHeight: '136%',
                paddingBottom: isLast ? '0' : '40px',
                paddingTop: isFirst ? '0' : '12px',
              }}
            >
              {item}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Pill label ───────────────────────────────────────────────────────────── */
// Pattern from Figma 212:1126:
// 164×32 container, but using fit-content width
// padding T:6 R:10 B:6 L:10, cornerRadius 8, 16px Regular, +1% tracking, 140% lh

function Pill({ text, green }: { text: string; green?: boolean }) {
  return (
    <span
      className="inline-flex items-center text-[16px] font-sans font-normal text-white"
      style={{
        backgroundColor: green ? '#00B887' : '#1A2F2B',
        borderRadius: '8px',
        padding: '6px 10px',
        letterSpacing: '0.01em',
        lineHeight: '140%',
      }}
    >
      {text}
    </span>
  );
}

/* ─── Card (dark green column with white inner overlay) ────────────────────── */
// Pattern from Figma 59:3543:
// Outer card: 665×710, bg #004310 → bg-primary, rounded-[20px], overflow-hidden
// Illustration area: top portion (above inner card)
// White inner card: absolute left-10 right-10, top-[100px] bottom-10
//   padding: 40px all sides, rounded-[20px]
// Inside: Pill + "keep"/"handles" title + timeline items

function CORCard({
  pill,
  pillGreen,
  title,
  items,
  delay,
}: {
  pill: string;
  pillGreen?: boolean;
  title: string;
  items: string[];
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex-1 rounded-[20px] bg-primary overflow-hidden"
      style={{ minHeight: '710px' }}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
    >
      {/* Top illustration zone — dark green, left visually open above inner card */}
      {/* (artwork goes here when assets are available) */}
      <div className="absolute inset-0 bg-primary" />

      {/* White inner card — inset 40px sides, starts 100px from top, 40px from bottom */}
      {/* Figma: x:40, y:100, width:585, padding:40px all, rounded-[20px] */}
      <div
        className="absolute left-10 right-10 rounded-[20px] bg-white overflow-y-auto"
        style={{ top: '100px', bottom: '40px', padding: '40px' }}
      >
        {/* Header row: pill + title */}
        <div className="flex items-baseline gap-3 mb-8">
          <Pill text={pill} green={pillGreen} />
          <span className="text-[32px] font-display font-normal text-primary leading-[104%] tracking-[-0.02em]">
            {title}
          </span>
        </div>

        {/* Timeline items */}
        <TimelineList items={items} />
      </div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
// Outer section: py-20 md:py-28, bg-background-secondary (cream)
// Container: max-w-[1440px] px-[50px] → 1340px content at full width
// Headline: 80px Medium, -2% tracking, 104% lh (Figma pattern from 59:951, 59:994)
// Column sub-labels: 32px Regular (above each card, pattern from 67:5146)
// Cards row: flex gap-[10px] — two equal columns

export default function CORSplit() {
  const headlineRef = useRef(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1440px] mx-auto px-[50px]">

        {/* Section headline — 80px Medium, -2% ls, 104% lh */}
        <motion.h2
          ref={headlineRef}
          className="font-display font-medium text-primary"
          style={{
            fontSize: '80px',
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

        {/* Column labels above cards — 32px Regular (pattern from 67:5146 column headings) */}
        <div className="flex gap-[10px] mb-2">
          <div className="flex-1">
            <span
              className="font-display font-normal text-foreground"
              style={{ fontSize: '32px', lineHeight: '120%' }}
            >
              You keep
            </span>
          </div>
          <div className="flex-1">
            <span
              className="font-display font-normal text-foreground"
              style={{ fontSize: '32px', lineHeight: '120%' }}
            >
              COR handles
            </span>
          </div>
        </div>

        {/* Two-column cards */}
        <div className="flex gap-[10px]">
          <CORCard
            pill="You"
            title="keep"
            items={youItems}
            delay={0.1}
          />
          <CORCard
            pill="COR"
            pillGreen
            title="handles"
            items={corItems}
            delay={0.2}
          />
        </div>

      </div>
    </section>
  );
}
