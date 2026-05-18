'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadgeBar from '@/components/TrustBadgeBar';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const avatars = [
  { src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face', alt: 'Worker' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', alt: 'Worker' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', alt: 'Worker' },
];

interface Situation {
  id: string;
  text: string;
  reactions: { fire: number; bang: number; skull: number };
}

const initialSituations: Situation[] = [
  {
    id: 'provider-cut',
    text: 'Your provider “investigated” your payout for 4 days. Twice this quarter. Your rent doesn’t investigate.',
    reactions: { fire: 387, bang: 162, skull: 41 },
  },
  {
    id: 'bank-asks-docs',
    text: 'Your bank asked for income confirmation. Your current setup gives you a screenshot of a crypto transfer.',
    reactions: { fire: 312, bang: 145, skull: 58 },
  },
  {
    id: 'fee-from-you',
    text: 'Your company sent \\$5,000. You received \\$4,860. Nobody told you about the 2.8%.',
    reactions: { fire: 421, bang: 178, skull: 34 },
  },
  {
    id: 'support-ghost',
    text: 'You opened a support ticket on a Friday. It’s Tuesday. You’re on hold with a chatbot named “Sky.”',
    reactions: { fire: 298, bang: 134, skull: 62 },
  },
];

type ReactionType = 'fire' | 'bang' | 'skull';
const reactionEmoji: Record<ReactionType, string> = { fire: '🔥', bang: '💥', skull: '💀' };

const beforeAfterData = [
  {
    before: '2–3% quietly taken from your side every payout',
    after: 'Zero fees from your side. You get every cent your company sent.',
  },
  {
    before: 'Money lands when the corridor allows — sometimes 3 days late',
    after: 'Visa / Mastercard same-day. SEPA next morning. USDT in minutes. You pick.',
  },
  {
    before: 'One method, one country, one currency — figure the rest out yourself',
    after: 'Split your payout across methods and accounts. Card for daily spend, SEPA for rent, USDT for savings.',
  },
  {
    before: 'No proper contract, no monthly invoice, nothing your bank will accept',
    after: 'A named contract from a foreign legal entity. Monthly invoices. Documents banks and tax offices treat as normal.',
  },
  {
    before: 'Support ticket Friday → human Tuesday, maybe',
    after: 'Real humans. Same-day reply, weekends included.',
  },
];

const timelineSteps = [
  {
    time: 'Step 1',
    title: 'Show your company this page',
    aside: 'Forward the link to whoever signs your contracts — founder, finance lead, hiring manager. They’ll find the founders page in one click. You don’t pitch anything.',
  },
  {
    time: 'Step 2',
    title: 'We talk to your company',
    aside: 'They sign one B2B agreement with Kleos. No new vendor procurement, no tax shock. One contract, clean structure.',
  },
  {
    time: 'Step 3',
    title: 'You set yourself up in 60 seconds',
    aside: 'KYC, payout method, account split — all from your phone. No forms emailed back and forth.',
  },
  {
    time: 'Step 4',
    title: 'Money lands. Documents generate themselves.',
    aside: 'Named contract in your inbox. Monthly invoice from a foreign legal entity. No more “where’s my salary?” messages to anyone.',
  },
];

const comparisonData = [
  {
    feature: 'Fee taken from you',
    eor: '1–3% per payout',
    freelance: '“Free” — until your bank charges \\$25',
    crypto: '1–2% gas + your time',
    stape: '0%',
  },
  {
    feature: 'Speed',
    eor: '2–5 business days',
    freelance: '3–7 business days',
    crypto: 'Minutes — until the bank freezes you',
    stape: 'Same-day on Visa/MC',
  },
  {
    feature: 'Income docs your bank accepts',
    eor: 'Sometimes',
    freelance: 'No',
    crypto: 'No',
    stape: 'Named contract + monthly invoices',
  },
  {
    feature: 'Method split across accounts',
    eor: 'No',
    freelance: 'No',
    crypto: 'DIY across wallets',
    stape: 'Card, SEPA, USDT — split as you like',
  },
  {
    feature: 'Crypto option',
    eor: 'Rarely',
    freelance: 'No',
    crypto: 'The whole game',
    stape: 'Optional, alongside fiat',
  },
  {
    feature: 'Legal status',
    eor: 'Contractor (your problem)',
    freelance: 'Contractor (your problem)',
    crypto: 'Informal (bigger problem)',
    stape: 'Contractor or EoR — your choice',
  },
  {
    feature: 'Support',
    eor: 'Tickets, 24h+',
    freelance: 'Bank’s call centre',
    crypto: 'Telegram strangers',
    stape: 'Dedicated human, under 1h',
  },
];

const testimonials = [
  {
    quote: 'My bank wanted an actual salary contract. I had a USDT transfer screenshot. Now I have a named contract from a US entity. They stopped asking.',
    author: 'Senior engineer',
    detail: 'EU-based, US SaaS',
  },
  {
    quote: 'On the old setup I was losing about \\$80 a month on FX and platform fees. I didn’t know until I switched. Now it’s zero from my side.',
    author: 'Product designer',
    detail: 'LATAM-based',
  },
  {
    quote: 'I asked another platform’s chat where my invoice was. Seven hours later a bot replied with a help article. Kleos’s human replied in twelve minutes.',
    author: 'Backend developer',
    detail: 'distributed team',
  },
];

const faqs = [
  {
    question: 'My company already has a payment provider. Why push for a switch?',
    answer: 'Because the provider takes 1–3% out of your side — quietly. Your company keeps paying the same. The fee moves from your pocket to nobody’s. We charge your company a flat €50, charge you zero, and the documents you get from us are the kind banks and tax offices treat as normal.',
  },
  {
    question: 'How do I bring this up without sounding like a salesperson?',
    answer: 'Forward this page. There’s a separate page for founders and finance leads — one click from here. The actual conversation happens between Kleos and your company, on a call. You don’t pitch anything.',
  },
  {
    question: 'What if my company won’t switch?',
    answer: 'Sign yourself up if you need a proper contract or income documents. Or share us with friends at other companies — the 20% referral works for those too. No company conversion required.',
  },
  {
    question: 'Are the documents you generate actually accepted by banks and tax offices?',
    answer: 'Yes. Named contract from a foreign legal entity. Monthly invoices with your name, your work, the amount, the currency. Used routinely for opening accounts, declaring income, and renewing residency abroad.',
  },
  {
    question: 'I work as a sole proprietor. Is something safer available?',
    answer: 'If your company hires you through Kleos as an Employer-of-Record employee, you get a real employment contract instead of contractor status. Taxes and social contributions are handled by the employer, not you. Worth bringing up if regulators in your country are getting active around contractor reclassification.',
  },
  {
    question: 'The referral — in plain numbers?',
    answer: '20% of what your company pays us, for the lifetime of that account. A 10-person team at €50 each is €500/month → €100/month to you, every month they stay. Paid through the partner dashboard after their first invoice.',
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

function HeroContractors() {
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
          <span className="text-sm text-foreground-muted">Used by people getting paid across 242 countries</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          You did the work. The paperwork shouldn&apos;t be yours.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your provider is taking 2&ndash;3% out of your salary before it lands. Your bank wants documents your current setup can&apos;t generate. Your company&apos;s accountant is one regulator email away from a problem.
        </motion.p>

        {/* CTA row: two buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Bring your company on a call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors whitespace-nowrap"
          >
            Already on Kleos? Sign in.
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
            '0% fees from your side',
            'Visa / Mastercard same-day payout',
            'Crypto, SEPA, SWIFT — your call',
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
            If this is your last quarter, we should talk
          </h2>
          <p className="text-foreground-muted text-sm max-w-md">
            Not edge cases. The standard story when you get paid across borders.
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
          From &ldquo;where did 3% go&rdquo; to &ldquo;all of it, on the day&rdquo;
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
                  <th className="text-left py-4 px-3 text-sm font-bold text-foreground-muted w-1/2">Your reality now</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl w-1/2">Your reality with Kleos</th>
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
            From &ldquo;I think there&apos;s something better&rdquo; to &ldquo;I get paid through Kleos&rdquo;
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
              You: paid clean. + 20% of our fee, lifetime, while your company stays.
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
          Your current setup, side by side with what could replace it
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          From your side of the table, not your company&apos;s.
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
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Other contractor platforms</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">SWIFT to your account</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Crypto / DIY</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">Kleos</th>
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
            Bring your company on a call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContractorsSocialProof() {
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
          People who stopped losing 3% of their salary
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
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">0%</p>
            <p className="text-xs text-foreground-muted">Fees taken from your side</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">&lt;1h</p>
            <p className="text-xs text-foreground-muted">Average human reply, weekdays and weekends</p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border">
            <p className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-2">242</p>
            <p className="text-xs text-foreground-muted">Countries you can be paid in, no exceptions</p>
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
          What your current setup is actually <span className="relative"><span className="relative z-10">costing</span><span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -z-0 rounded-sm" /></span> you
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Most of it is invisible until you do the math.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* What you lose now */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-display font-bold text-primary mb-6">What you lose now</h3>
            <ul className="space-y-4 text-sm text-foreground-secondary">
              <li className="flex items-center justify-between">
                <span>Platform fee from your side (~2% on \$4k)</span>
                <span className="text-primary font-medium">\$80/mo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>FX spread (hidden in bank or wallet)</span>
                <span className="text-primary font-medium">\$30/mo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>1&ndash;3 days of payout delay</span>
                <span className="text-primary font-medium">Your problem</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Accountant fee to reconstruct income docs</span>
                <span className="text-primary font-medium">\$50&ndash;150/mo</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Annual leak</span>
                <span className="text-lg font-display font-extrabold text-primary">~\$1,900/year</span>
              </div>
            </div>
          </div>

          {/* Kleos */}
          <div className="bg-accent rounded-2xl p-8 text-primary">
            <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-1">&euro;0</h3>
            <p className="text-sm mb-6">from your side, per payout</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>0% fee from you. Ever.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>Same-day on Visa / Mastercard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>Named contract + monthly invoices included.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-60">&bull;</span>
                <span>Dedicated human support &mdash; under an hour.</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-primary/20">
              <p className="text-lg font-display font-extrabold">Keep all of it. Every month.</p>
            </div>
          </div>
        </motion.div>

        {/* Referral callout strip */}
        <motion.div
          className="mt-8 rounded-2xl bg-primary text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <p className="text-lg md:text-xl font-display font-extrabold mb-1">Bring your company in &rarr; 20% of our fee, lifetime, while they stay.</p>
            <p className="text-sm text-white/70">Average contractor on a 10-person team: about &#36;100/month, paid to you. No cap. No expiry while they&apos;re a customer.</p>
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
            Bring your company on a call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContractorsFAQ() {
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
          The questions you&apos;d ask before forwarding this to your manager
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
          Stop paying to receive your salary.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Most contractors don&apos;t know what their payouts actually cost them. Once you do, the only fix is to move the contract &mdash; not negotiate the fee. Forward this page to whoever signs your contracts. We do the rest.
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
            Bring your company on a call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            Already with Kleos? Talk to support.
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ContractorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroContractors />
      <TrustBadgeBar />
      <PainRecognition />
      <BeforeAfter />
      <HowItWorks />
      <AlternativesComparison />
      <ContractorsSocialProof />
      <CostComparison />
      <ContractorsFAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
