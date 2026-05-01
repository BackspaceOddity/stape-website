'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadgeBar from '@/components/TrustBadgeBar';

const avatars = [
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
];

/* ─── Data ────────────────────────────────────────────────────────────────── */

interface PainCard {
  id: string;
  title: string;
  body: string;
  reactions: { fire: number; bang: number; skull: number };
}

type ReactionType = 'fire' | 'bang' | 'skull';
const reactionEmoji: Record<ReactionType, string> = { fire: '\uD83D\uDD25', bang: '\uD83D\uDCA5', skull: '\uD83D\uDC80' };

const initialPainCards: PainCard[] = [
  {
    id: 'talent-far',
    title: 'The talent you need doesn\u2019t live nearby',
    body: 'Your job post gets 200 applications. Three are qualified. Two want 30% more than your budget. The best engineer for the job is in Lisbon, Lagos, or Lahore \u2014 but you\u2019ve never hired internationally before.',
    reactions: { fire: 267, bang: 94, skull: 58 },
  },
  {
    id: 'love-to-hire',
    title: '\u201CWe\u2019d love to hire you, but\u2026\u201D',
    body: 'You found the perfect contractor in another country. Now what? Contracts, tax compliance, currency conversion, payment rails \u2014 suddenly you need a legal team, an accountant, and three new tools just to pay one person.',
    reactions: { fire: 341, bang: 143, skull: 44 },
  },
  {
    id: 'spreadsheet',
    title: 'The spreadsheet phase',
    body: 'Five contractors, four countries, three currencies, two invoicing formats, one very tired ops person. Every month. It doesn\u2019t scale, and it definitely doesn\u2019t spark joy.',
    reactions: { fire: 412, bang: 189, skull: 31 },
  },
  {
    id: 'tax-cert',
    title: '\u201CWe need your tax residency certificate\u201D',
    body: 'Your contractor just got an invoice approved. But your finance team won\u2019t process it without a tax residency certificate \u2014 and getting one costs your contractor $500 and three weeks of bureaucracy. So the payment sits. And sits. And your best people start looking elsewhere.',
    reactions: { fire: 289, bang: 112, skull: 63 },
  },
];

const stickyStyles = [
  { rotate: -1.5, shadow: '2px 3px 8px rgba(0,0,0,0.08)' },
  { rotate: 0.8, shadow: '3px 2px 6px rgba(0,0,0,0.06)' },
  { rotate: -0.5, shadow: '1px 4px 10px rgba(0,0,0,0.07)' },
  { rotate: 1.2, shadow: '4px 2px 8px rgba(0,0,0,0.09)' },
];

const steps = [
  {
    title: 'Find your person',
    body: 'Hire the best contractor for the role \u2014 regardless of where they live. You focus on skills and fit. We handle everything else.',
  },
  {
    title: 'We set it up',
    body: 'Kleos signs the contract, runs KYC, and handles local compliance. Your contractor is onboarded and ready to go \u2014 typically under 24 hours.',
  },
  {
    title: 'Pay with one click',
    body: 'Fund your balance, schedule payouts, and pay your entire global team from one dashboard. Compliant per jurisdiction, full audit trail, predictable cost.',
  },
];

const benefits = [
  { stat: '242 locations', desc: 'Pay contractors virtually anywhere. No entity setup required.' },
  { stat: 'One invoice', desc: '50 contractors, 12 countries, 1 invoice to your company. Your finance team will thank you.' },
  { stat: 'Compliant by default', desc: 'Contracts, KYC, tax documentation \u2014 handled. No reclassification risk.' },
  { stat: 'Predictable cost', desc: 'Flat \u20AC50 per contractor, every cycle. No percentage charges, no hidden fees. Cost doesn\u2019t scale with salary.' },
  { stat: '60 seconds contractor onboarding', desc: 'From \u201Cyou\u2019re hired\u201D to \u201Cyou\u2019re paid\u201D in 60 seconds. Not two months.' },
  { stat: 'Flexible withdrawals', desc: 'Your contractors choose how they get paid \u2014 bank transfer, card, local rails, or USDT.' },
];

const comparisonData = [
  {
    feature: 'Setup time',
    diy: 'Weeks of legal research',
    eor: 'Days to weeks',
    stape: '60 seconds',
  },
  {
    feature: 'Contracts',
    diy: 'You draft them (and pray)',
    eor: 'Provided, but rigid',
    stape: 'Handled \u2014 tailored per country',
  },
  {
    feature: 'Compliance',
    diy: 'Your problem',
    eor: 'Covered, at a premium',
    stape: 'Built in',
  },
  {
    feature: 'Cost per contractor',
    diy: '??? + legal fees',
    eor: '$300\u2013600/mo',
    stape: '\u20AC50/contractor/mo',
  },
  {
    feature: 'Payouts',
    diy: 'Wire transfers + manual tracking',
    eor: 'Through their platform',
    stape: 'One dashboard, multiple currencies',
  },
  {
    feature: 'Flexibility',
    diy: 'Maximum (and maximum risk)',
    eor: 'Limited to their entities',
    stape: '242 locations, contractor chooses withdrawal method',
  },
  {
    feature: 'Security & compliance',
    diy: '—',
    eor: 'Varies',
    stape: '\u2705 ISO 27001 + GDPR',
  },
];

/* ─── Section Components ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        {/* Social proof */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex -space-x-2">
            {avatars.map((avatar, i) => (
              <Image
                key={i}
                src={avatar.src}
                alt={avatar.alt}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-foreground-muted">Trusted by 600+ teams getting their headspace back</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 rounded-full text-sm text-primary font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Use Case: Global Hiring
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Your next best hire lives 5,000&nbsp;miles away.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The best person for the job isn&apos;t always in your timezone. Kleos makes it simple to hire, pay, and stay compliant with contractors anywhere in the world&nbsp;&mdash; so you can build the team you actually want.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            '242 Locations Supported',
            '€50 Flat Fee Per Contractor',
            '60 seconds contractor onboarding',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-foreground-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PainPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [userReactions, setUserReactions] = useState<Record<string, Set<ReactionType>>>({});
  const [painCards, setPainCards] = useState<PainCard[]>(initialPainCards);

  const handleReaction = useCallback((id: string, reaction: ReactionType) => {
    setUserReactions((prev) => {
      const current = prev[id] || new Set<ReactionType>();
      const updated = new Set(current);
      if (updated.has(reaction)) {
        updated.delete(reaction);
        setPainCards((s) => s.map((c) => c.id === id ? { ...c, reactions: { ...c.reactions, [reaction]: c.reactions[reaction] - 1 } } : c));
      } else {
        updated.add(reaction);
        setPainCards((s) => s.map((c) => c.id === id ? { ...c, reactions: { ...c.reactions, [reaction]: c.reactions[reaction] + 1 } } : c));
      }
      return { ...prev, [id]: updated };
    });
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
            Hiring locally is a ceiling, not a strategy.
          </h2>
          <p className="text-foreground-muted text-sm max-w-md">
            These aren&apos;t hypothetical problems. They&apos;re why great roles stay unfilled.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {painCards.map((card, i) => {
            const style = stickyStyles[i % stickyStyles.length];
            const userSet = userReactions[card.id] || new Set<ReactionType>();
            const hasAnyReaction = userSet.size > 0;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: style.rotate } : { opacity: 0, y: 20, rotate: 0 }}
                whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                style={{ boxShadow: style.shadow }}
                className={`relative flex flex-col rounded-sm p-5 min-h-[210px] transition-colors duration-300 cursor-default ${
                  hasAnyReaction ? 'bg-[#FFF3A0]' : 'bg-[#FFF9DB]'
                }`}
              >
                <h3 className="text-[13px] font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-[13px] text-primary leading-relaxed mb-5 font-medium">{card.body}</p>
                <div className="mt-auto flex items-center gap-2 flex-wrap">
                  {(['fire', 'bang', 'skull'] as ReactionType[]).map((reaction) => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(card.id, reaction)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        userSet.has(reaction)
                          ? 'bg-primary text-white shadow-sm scale-105'
                          : 'bg-white/80 text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
                      }`}
                    >
                      <span className="text-sm">{reactionEmoji[reaction]}</span>
                      <span>{card.reactions[reaction]}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function TheShift() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary mb-8 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What if geography was a feature, not a bug?
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-foreground-secondary leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The best teams in the world aren&apos;t built within commuting distance. They&apos;re built by finding the right person&nbsp;&mdash; wherever they are&nbsp;&mdash; and removing everything that makes it hard to work with them. Kleos handles the contracts, compliance, and payments so you can focus on the only thing that matters: is this person great at what they do?
        </motion.p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            Hire anywhere. Pay everyone. Stay compliant.
          </h2>
        </motion.div>
        <motion.p
          className="text-white/60 text-center text-sm md:text-base max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Kleos becomes the legal entity that contracts with your team worldwide. You get one platform, one invoice, and zero compliance headaches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Progress dots and line */}
          <div className="relative flex items-center justify-between mb-6 px-4 max-w-[600px] mx-auto">
            <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
            {steps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
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
                  <p className="text-xs font-semibold text-white/60">Step {index + 1}</p>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Result badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-end mt-4"
          >
            <div className="bg-accent text-primary text-sm font-semibold rounded-lg px-5 py-2.5">
              You: Back to building your team.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Built for teams that hire on talent, not on timezone.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              className="bg-white rounded-2xl p-8 border border-border"
            >
              <p className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-2">{b.stat}</p>
              <p className="text-sm text-foreground-secondary leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RealTalk() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white mb-8 tracking-[-0.02em] leading-[1.1]">
            Let&apos;s talk about what this really means.
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Senior engineers in Berlin bill &euro;120/hour. Equally talented engineers in Buenos Aires, Nairobi, or Krak&oacute;w bill &euro;35&ndash;60/hour&nbsp;&mdash; not because they&apos;re less skilled, but because cost of living is different. This isn&apos;t exploitation. It&apos;s access. Your contractor earns a strong local salary. You get world-class talent at a rate that lets you hire three people instead of one. Everyone wins&nbsp;&mdash; if the infrastructure is there to make it work.
            </p>
            <p className="mt-6 text-accent font-display font-bold text-lg">
              That&apos;s what Kleos does.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Three ways to hire globally. Two of them are painful.
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Choose wisely.
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
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-[20%]"></th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">DIY (Manual payouts)</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Traditional EOR</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">Kleos</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.diy}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.eor}</td>
                    <td className={`py-4 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === comparisonData.length - 1 ? 'rounded-b-xl' : ''}`}>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#00B887] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {row.stape}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

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
          Your team is out there. Let&apos;s go find them.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Book a 15-minute demo and see how Kleos handles global teams management&nbsp;&mdash; contracts, compliance, and payments&nbsp;&mdash; so you can hire the best people, wherever they are.
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
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-white transition-colors"
          >
            Talk to a Human First
          </a>
        </motion.div>
        <motion.p
          className="text-xs text-foreground-muted italic mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Average time from first call to first contractor onboarded: 60 seconds.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function GlobalHiringPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustBadgeBar />
      <PainPoints />
      <TheShift />
      <HowItWorks />
      <BenefitsGrid />
      <RealTalk />
      <Comparison />
      <BottomCTA />
      <Footer />
    </main>
  );
}
