'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Long exhausting list — overflows the card, feels never-ending
const todayBullets = [
  'Cross-check three spreadsheets for contractor rates',
  'Google "how to pay someone in Colombia legally"',
  'Convert currencies manually and hope you got the rate right',
  'Send 47 individual payment instructions',
  'Realize you sent USD instead of EUR to two people',
  'Chase 12 people for missing tax documents',
  'Explain to your team why payments are late again',
  'Get a Slack DM: "hey, my payment didn\u2019t arrive?"',
  'Reconcile failed transactions across 3 tools',
  'Fill out a wire transfer form for the 9th time today',
  'Generate compliance reports for multiple jurisdictions',
  'Wonder if you\u2019re even withholding the right tax',
  'Answer "where\u2019s my money?" messages until 9pm',
  'Manually update your contractor tracking spreadsheet',
  'Discover Wise flagged a payment for review. Again.',
  'Email your accountant asking about Brazilian tax codes',
  'Apologize to your best developer for the late payment',
  'Open yet another tab to check FX rates',
  'Realize it\u2019s 7pm and you haven\u2019t done actual work',
  'Set a reminder to do all of this again next month',
];

// Each slide: portrait photo + the thing you could be doing instead
const slides = [
  {
    portrait: '/Images/portraits/2.png',
    phrase: 'Close the deal you\u2019ve been chasing for weeks',
  },
  {
    portrait: '/Images/portraits/3.png',
    phrase: 'Interview the senior engineer in S\u00e3o Paulo',
  },
  {
    portrait: '/Images/portraits/5.jpg',
    phrase: 'Launch the feature your users have been asking for',
  },
  {
    portrait: '/Images/portraits/4.png',
    phrase: 'Take a proper lunch break',
  },
  {
    portrait: '/Images/portraits/1.png',
    phrase: 'Leave at 6pm knowing everyone\u2019s paid',
  },
];

const CARD_HEIGHT = 580;

export default function WorkThatDisappearsV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [thingsCount, setThingsCount] = useState(167);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      setThingsCount((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(ticker);
  }, []);

  return (
    <section id="work-that-disappears" ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            Two ways to spend your Tuesday
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Left: Overwhelming static list — card clips it at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            style={{ maxHeight: CARD_HEIGHT }}
          >
            <div className="px-8 md:px-10 pt-8 md:pt-10">
              <h3 className="text-lg font-display font-bold text-white mb-6">Your Tuesday without Stape</h3>
            </div>
            <div className="px-8 md:px-10 pb-0">
              <ul className="space-y-3">
                {todayBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/55 text-[13px] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-white/25 mt-[7px] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="h-4" />
            </div>
          </motion.div>

          {/* Right: Portrait banner slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ height: CARD_HEIGHT }}
          >
            {/* Portrait photos — cross-fade */}
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}${slides[current].portrait}`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Top label */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-10" />
            <div className="absolute top-5 left-6 z-20">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                Your Tuesday with Stape
              </span>
            </div>

            {/* Bottom gradient + text */}
            <div className="absolute bottom-0 inset-x-0 h-[55%] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
            <div className="absolute bottom-0 inset-x-0 z-20 p-7 md:p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-[26px] md:text-[30px] font-display font-extrabold text-white leading-[1.15] tracking-[-0.02em] mb-5"
                >
                  {slides[current].phrase}
                </motion.p>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mb-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-6 bg-accent'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <p className="text-white/40 text-xs leading-relaxed">
                …and{' '}
                <span className="font-mono text-accent/70 text-sm font-semibold tabular-nums">
                  {thingsCount}
                </span>{' '}
                other things that actually move the needle
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-accent text-primary font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
          >
            Get your Tuesdays back
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
