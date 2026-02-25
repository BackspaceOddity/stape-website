'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const avatars = [
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face', alt: 'Customer' },
];

interface Situation {
  id: string;
  text: string;
  reactions: { fire: number; bang: number; skull: number };
}

const initialSituations: Situation[] = [
  {
    id: 'provider-cutoff',
    text: 'Your payment provider just cut off your entire region. Your devs haven\u2019t been paid in 3 weeks. You\u2019re Googling \u201Chow to send dollars to Serbia\u201D at midnight.',
    reactions: { fire: 412, bang: 189, skull: 31 },
  },
  {
    id: 'visa-threat',
    text: 'Your best engineer needs a local contract for their visa. Yesterday. You don\u2019t even have an entity in their country.',
    reactions: { fire: 304, bang: 128, skull: 42 },
  },
  {
    id: 'payout-time',
    text: 'You spent 6 hours yesterday on one payout run. Checking wallets, converting currencies, confirming receipts \u2014 instead of closing your Series A.',
    reactions: { fire: 341, bang: 143, skull: 44 },
  },
  {
    id: 'investor-ask',
    text: 'Your investor asks: \u201CCan you show me a clean audit trail for every cross-border payment?\u201D You can\u2019t.',
    reactions: { fire: 289, bang: 112, skull: 63 },
  },
];

type ReactionType = 'fire' | 'bang' | 'skull';
const reactionEmoji: Record<ReactionType, string> = { fire: '\uD83D\uDD25', bang: '\uD83D\uDCA5', skull: '\uD83D\uDC80' };

const beforeAfterData = [
  {
    before: '6 hours per payout run \u2014 reconciling spreadsheets, FX rates, stuck payments',
    after: 'One click. Upload a registry, everyone gets paid in the right currency.',
  },
  {
    before: 'Your provider stopped supporting your team\u2019s passports \u2014 scrambling for Plan B',
    after: 'We pay in 242 locations. Sanctions, corridor changes \u2014 that\u2019s our problem, not yours.',
  },
  {
    before: 'Investors see direct links to high-risk jurisdictions in your payment chain',
    after: 'Stape is your Contractor of Record. One agreement with us, compliant contracts with every hire. Your cap table stays clean.',
  },
  {
    before: 'Key developers can\u2019t get nomad docs \u2014 threatening to leave',
    after: 'Each contractor gets a named contract and proper invoices. Banks accept it.',
  },
  {
    before: 'Percentage fees eating 10\u201312% of payroll as salaries grow past $3\u20135k',
    after: 'Flat \u20AC50 per payout. $3k salary or $8k \u2014 same fee. You save thousands monthly.',
  },
];

const timelineSteps = [
  {
    time: 'Step 1',
    title: 'You talk to us (30 min)',
    aside: 'We map your team structure: who\u2019s where, what passports, what corridors. No forms, no \u201Csubmit a ticket.\u201D',
  },
  {
    time: 'Step 2',
    title: 'We set up the legal rails',
    aside: 'Stape creates a Contractor-of-Record structure. Your company signs one B2B agreement with our entity. We handle individual contracts with each team member.',
  },
  {
    time: 'Step 3',
    title: 'Your team onboards themselves',
    aside: 'Each contractor gets a personal dashboard to submit their details, KYC, and banking info. You don\u2019t touch any of it.',
  },
  {
    time: 'Step 4',
    title: 'You press \u201CPay all\u201D',
    aside: 'Upload your registry (Excel or API). Money hits contractor accounts. Invoices and compliance docs generate automatically. You\u2019re done.',
  },
];

const comparisonData = [
  {
    feature: 'Visa & income docs',
    eor: 'Only for supported countries',
    freelance: 'Basic',
    crypto: 'None',
    stape: 'Named contracts, invoices, certificates',
  },
  {
    feature: 'Compliance isolation',
    eor: 'Your entity is on record',
    freelance: 'Your entity is on record',
    crypto: 'Fully exposed',
    stape: 'Two-contract scheme, no direct link',
  },
  {
    feature: 'Underserved regions',
    eor: 'Stopped supporting',
    freelance: 'Limited, unreliable',
    crypto: 'Works until bank blocks you',
    stape: 'Active, with fallback routes',
  },
  {
    feature: 'Pricing model',
    eor: '% of salary + hidden FX + withdraw fee',
    freelance: '% of salary + \u201Ctasks\u201D overhead',
    crypto: '1\u20132% + your time',
    stape: '\u20AC50 flat + transparent FX',
  },
  {
    feature: 'Admin time per payout',
    eor: '2+ hours',
    freelance: 'Hours of manual work',
    crypto: '6+ hours at 30+ people',
    stape: 'Minutes. One upload.',
  },
  {
    feature: 'Scales past 30 people',
    eor: 'If you\u2019re in a supported country',
    freelance: 'Painful UX',
    crypto: 'Breaks down',
    stape: 'Built for 10\u2013200+ contractors',
  },
];

const testimonials = [
  {
    quote: 'Once we hit 50 people, crypto payouts became simply impossible to administer. It was taking a huge amount of time. Stape automated the whole thing.',
    author: 'Founder, SaaS company',
    detail: '50+ contractors',
  },
  {
    quote: 'It\u2019s extremely important for us not to show any payments from our US entity to Russia. Stape\u2019s structure solved that completely.',
    author: 'CEO, US-incorporated startup',
    detail: '',
  },
  {
    quote: 'My developers were nervous and anxious about unstable payouts. Now money just lands \u2014 and I don\u2019t think about it.',
    author: 'CTO / Co-founder',
    detail: 'distributed team',
  },
];

const faqs = [
  {
    question: 'How do I explain this structure to my investors / auditors?',
    answer: 'Your company has a standard B2B services agreement with a US LLC (Stape). You receive invoices from a US entity. There\u2019s no direct contractual or payment link between your company and individual contractors in sanctioned regions. We provide full documentation that satisfies audit requirements.',
  },
  {
    question: 'What happens if a payment corridor gets blocked?',
    answer: 'We maintain multiple routes per corridor. If one path closes, we switch \u2014 often before you even notice. Corridor resilience is core infrastructure, not a feature.',
  },
  {
    question: 'Can I start with just 1\u20132 people to test?',
    answer: 'Yes. Most founders do exactly this \u2014 a \u201Ctrial balloon\u201D with 1\u20132 contractors. You\u2019ll see the money land, check the documents, and decide.',
  },
  {
    question: 'My team members need documents for Digital Nomad visas \u2014 do you provide those?',
    answer: 'Yes. Each contractor gets a named contract and monthly invoices from a foreign legal entity. These are accepted by banks and immigration authorities in Spain, Portugal, Serbia, and other popular relocation destinations.',
  },
  {
    question: 'How is this different from global EOR platforms?',
    answer: 'Most global payroll platforms don\u2019t serve contractors with RU/BY passports and increasingly require excessive KYC. We specialize in complex corridors they won\u2019t touch. Our flat fee structure also means you don\u2019t get punished as salaries grow.',
  },
];

/* ─── Sticky note styles (from TriggerBar) ────────────────────────────────── */

const stickyStyles = [
  { rotate: -1.5, shadow: '2px 3px 8px rgba(0,0,0,0.08)' },
  { rotate: 0.8, shadow: '3px 2px 6px rgba(0,0,0,0.06)' },
  { rotate: -0.5, shadow: '1px 4px 10px rgba(0,0,0,0.07)' },
  { rotate: 1.2, shadow: '4px 2px 8px rgba(0,0,0,0.09)' },
];

/* ─── Section Components ──────────────────────────────────────────────────── */

function HeroFounders() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
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
          <span className="text-sm text-foreground-muted">Trusted by 100+ teams getting their headspace back</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          You didn&apos;t start a company to reconcile payroll spreadsheets at 2&nbsp;AM
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your team is in 6 countries. Your provider just froze payouts. Your lead developer needs income proof for a visa&nbsp;&mdash; yesterday. Stape takes the entire payout mess off your plate so you can get back to building.
        </motion.p>

        {/* CTA row: email input + button */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 text-sm border border-border rounded-md bg-white text-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
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
            '100+ teams switched',
            '\u20AC50 flat fee per payout',
            'Under 24hrs to first payment',
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

function PainRecognition() {
  const [userReactions, setUserReactions] = useState<Record<string, Set<ReactionType>>>({});
  const [situations, setSituations] = useState<Situation[]>(initialSituations);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleReaction = useCallback((id: string, reaction: ReactionType) => {
    setUserReactions((prev) => {
      const current = prev[id] || new Set<ReactionType>();
      const updated = new Set(current);
      if (updated.has(reaction)) {
        updated.delete(reaction);
        setSituations((s) => s.map((sit) => sit.id === id ? { ...sit, reactions: { ...sit.reactions, [reaction]: sit.reactions[reaction] - 1 } } : sit));
      } else {
        updated.add(reaction);
        setSituations((s) => s.map((sit) => sit.id === id ? { ...sit, reactions: { ...sit.reactions, [reaction]: sit.reactions[reaction] + 1 } } : sit));
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
            If this sounds like your Tuesday, we should talk
          </h2>
          <p className="text-foreground-muted text-sm max-w-md">
            These aren&apos;t edge cases. They&apos;re every founder&apos;s reality when the team goes global.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {situations.map((situation, i) => {
            const userSet = userReactions[situation.id] || new Set<ReactionType>();
            const hasAnyReaction = userSet.size > 0;
            const style = stickyStyles[i % stickyStyles.length];

            return (
              <motion.div
                key={situation.id}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: style.rotate } : { opacity: 0, y: 20, rotate: 0 }}
                whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                style={{ boxShadow: style.shadow }}
                className={`relative flex flex-col justify-between rounded-sm p-5 min-h-[210px] transition-colors duration-300 cursor-default ${
                  hasAnyReaction ? 'bg-[#FFF3A0]' : 'bg-[#FFF9DB]'
                }`}
              >
                <p className="text-[13px] text-primary leading-relaxed mb-5 font-medium">
                  {situation.text}
                </p>
                <div className="mt-auto flex items-center gap-2 flex-wrap">
                  {(['fire', 'bang', 'skull'] as ReactionType[]).map((reaction) => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(situation.id, reaction)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        userSet.has(reaction)
                          ? 'bg-primary text-white shadow-sm scale-105'
                          : 'bg-white/80 text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
                      }`}
                    >
                      <span className="text-sm">{reactionEmoji[reaction]}</span>
                      <span>{situation.reactions[reaction]}</span>
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

function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          From firefighting payroll to forgetting about it
        </motion.h2>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-background-secondary rounded-2xl p-6 md:p-8 min-w-[600px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-bold text-foreground-muted w-1/2">Your life now</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl w-1/2">Your life with Stape</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm text-foreground-secondary align-top">{row.before}</td>
                    <td className={`py-4 px-4 text-sm text-primary font-medium bg-accent/20 align-top ${index === beforeAfterData.length - 1 ? 'rounded-b-xl' : ''}`}>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
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
          className="mb-12 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            From &ldquo;we have a problem&rdquo; to &ldquo;wait, that was it?&rdquo; in 48&nbsp;hours
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
            {timelineSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {timelineSteps.map((step, index) => (
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
                  <p className="text-xs font-semibold text-white/60">{step.time}</p>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white mb-2">{step.title}</h3>
                {step.aside && (
                  <p className="text-xs text-white/40 italic leading-relaxed">{step.aside}</p>
                )}
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
              You: Back to building your product.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AlternativesComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          You&apos;ve already looked at alternatives. Here&apos;s the honest comparison.
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
          <div className="bg-background-secondary rounded-2xl p-6 md:p-8 min-w-[800px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-[18%]"></th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Global EOR</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Freelance Platforms</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Crypto / DIY</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">Stape</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.eor}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.freelance}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.crypto}</td>
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

function FoundersSocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-16 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Founders who stopped doing payroll
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-border flex flex-col">
              <p className="text-base text-primary leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-primary">{t.author}</p>
                {t.detail && <p className="text-xs text-foreground-muted">{t.detail}</p>}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Metric cards */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">Zero</p>
            <p className="text-xs text-foreground-muted">Missed payouts since launch</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">$40M+</p>
            <p className="text-xs text-foreground-muted">Processed across 80+ countries</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">20x</p>
            <p className="text-xs text-foreground-muted">Faster than manual payroll</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CostComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What payroll really <span className="relative"><span className="relative z-10">costs</span><span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -z-0 rounded-sm" /></span> you
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          The fee is just the start. Here&apos;s what you&apos;re actually spending.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Current System */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-display font-bold text-primary mb-6">Your Current System</h3>
            <ul className="space-y-4 text-sm text-foreground-secondary">
              <li className="flex items-center justify-between">
                <span>Your time (hours &times; hourly rate)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Wire transfer fees (per transfer)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>FX spread (hidden costs)</span>
                <span className="text-primary font-medium">$___</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Compliance &amp; legal risk</span>
                <span className="text-primary font-medium">$___</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Total (example for 30 people)</span>
                <span className="text-lg font-display font-extrabold text-primary">$10,200/mo</span>
              </div>
            </div>
          </div>

          {/* Stape */}
          <div className="bg-accent rounded-2xl p-8 text-primary">
            <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-1">&euro;50</h3>
            <p className="text-sm mb-6">per payout</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>Transparent forex (mid-market rate + 0.5%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>All compliance included</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>242 locations supported</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>Same-day or next-day delivery</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-primary/20">
              <p className="text-lg font-display font-extrabold">Save ~$97,200/year</p>
            </div>
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
            className="inline-flex items-center gap-1.5 px-8 py-3.5 bg-accent text-primary font-bold text-sm rounded-md hover:bg-accent/90 transition-colors uppercase tracking-wide"
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

function FoundersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The questions keeping you from clicking that button
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 -mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Fair questions, honest answers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() => toggleFAQ(index)}
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

function FinalCTA() {
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
          You don&apos;t have to fix payroll. You have to stop doing it.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Pay one contractor through Stape this week. See how it feels when the money lands in 48&nbsp;hours and the audit trail generates itself. If it works, pay two next month.
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
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
          Average time from first call to first payment: under 24 hours. 47 teams switched this month.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroFounders />
      <PainRecognition />
      <BeforeAfter />
      <HowItWorks />
      <AlternativesComparison />
      <FoundersSocialProof />
      <CostComparison />
      <FoundersFAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
