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

interface Web3PainCard {
  id: string;
  title: string;
  text: string;
  reactions: { fire: number; bang: number; skull: number };
}

type Web3ReactionType = 'fire' | 'bang' | 'skull';
const web3ReactionEmoji: Record<Web3ReactionType, string> = { fire: '\uD83D\uDD25', bang: '\uD83D\uDCA5', skull: '\uD83D\uDC80' };

const initialPainCards: Web3PainCard[] = [
  {
    id: 'card-frozen',
    title: '"My developer\'s card just got frozen. Again."',
    text: 'Your team converts USDT through P2P to pay rent. Their Revolut flags the incoming transfer as crypto without a clear source. Now they\'re locked out of their account and you\'re scrambling to find another way to send $4,000 to Tbilisi.',
    reactions: { fire: 412, bang: 189, skull: 31 },
  },
  {
    id: 'investor-trail',
    title: '"Our investors can see exactly where the money goes. That\'s the problem."',
    text: 'Your previous payment provider showed a direct trail from your entity to contractors in high-risk jurisdictions. Your investors flagged it. Now you need a structure that\'s compliant without being transparent in the wrong places.',
    reactions: { fire: 289, bang: 112, skull: 63 },
  },
  {
    id: 'payment-router',
    title: '"I spend two days a month being a human payment router."',
    text: 'You\'re a founder. You should be shipping product. Instead you\'re coordinating cold wallet transfers to 50 people across 8 countries, tracking who needs fiat vs. USDT, and praying nobody\'s bank bounces the funds.',
    reactions: { fire: 341, bang: 143, skull: 44 },
  },
  {
    id: 'no-crypto',
    title: '"The big platforms don\'t take crypto. And they blocked half my team anyway."',
    text: 'You tried the established payroll providers. They don\'t accept USDT as a funding source, and they\'ve stopped servicing contractors with certain passports. You need someone who actually works with how your company operates.',
    reactions: { fire: 304, bang: 128, skull: 42 },
  },
  {
    id: 'no-trail',
    title: '"We have no paper trail for any of this."',
    text: 'Your auditors want documentation. Your investors want clean books. Your contractors want proper contracts. If you\'re still running on wallet addresses and Telegram confirmations \u2014 it\'s time to set up a real process from day one.',
    reactions: { fire: 267, bang: 94, skull: 58 },
  },
];

const withoutStape = [
  'Check which contractors need fiat vs. crypto this month',
  'Buy USDT on an exchange (or move from treasury)',
  'Send individually from a cold wallet to 30+ addresses',
  'For fiat people: find a P2P route, hope their bank doesn\'t flag it',
  'Get a message: "my card got blocked, can you send to a different wallet?"',
  'Explain to your investors why there\'s no documentation',
  'Repeat next month',
];

const withStape = [
  'Fund your Stape balance in stablecoins (one transaction)',
  'Approve the monthly payout batch in the dashboard',
  'Each contractor chooses their own split: card, bank transfer, or USDT',
  'Stape handles service agreements, invoices, and compliance docs throughout the entire contractor lifecycle',
  'Your investors get a clean audit trail. Your team gets paid without drama.',
];

const howItWorksSteps = [
  {
    step: 'Step 1',
    title: 'Fund your balance in crypto',
    description: 'Send stablecoins from your verified corporate wallet. We run a standard KYT check (wallet cleanliness verification), convert to USD, and your Stape balance is ready. One transaction covers your entire team.',
  },
  {
    step: 'Step 2',
    title: 'We handle the contracts',
    description: 'Stape signs service agreements with each contractor through local entities. Contracts cover scope, IP assignment, and confidentiality \u2014 tailored to their role.',
  },
  {
    step: 'Step 3',
    title: 'Everyone gets paid how they want',
    description: 'Set up your payout list. Each contractor decides in their personal dashboard: bank card, local transfer, or stay in USDT. Flat fee: $50 per payout. Zero withdrawal fees for contractors.',
  },
];

const comparisonFeatures = [
  {
    feature: 'Accepts USDT funding',
    stape: '\u2705 Yes (fixed FX rate)',
    traditional: '\u274C No',
    percentage: '\u2705 Yes',
    diy: '\u2705 Yes (but manual)',
  },
  {
    feature: 'Monthly cost (50 people)',
    stape: '$50 × 50 = $2,500',
    traditional: 'N/A \u2014 no crypto accepted',
    percentage: '~$10,000 (5% of $200K)',
    diy: '$0 fees \u2014 but 2 days of your time',
  },
  {
    feature: 'Works with ex-CIS',
    stape: '\u2705 Yes',
    traditional: '\u274C Most have restricted',
    percentage: 'Partially',
    diy: '\u2705 Yes (until cards get blocked)',
  },
  {
    feature: 'Service agreements + IP',
    stape: '\u2705 Yes',
    traditional: '\u2705 Yes',
    percentage: 'Limited',
    diy: '\u274C No',
  },
  {
    feature: 'Contractor gets docs for visa/bank',
    stape: '\u2705 Yes',
    traditional: '\u2705 Yes',
    percentage: 'Limited',
    diy: '\u274C No',
  },
  {
    feature: 'Requires "tasks" each month',
    stape: '\u274C No',
    traditional: '\u2705 Yes',
    percentage: '\u2705 Yes',
    diy: '\u274C No',
  },
  {
    feature: 'Verifiable payment reports',
    stape: '\u2705 Full',
    traditional: '\u2705 Full',
    percentage: '\u2705 Partial',
    diy: '\u274C None',
  },
  {
    feature: 'Security & compliance',
    stape: '\u2705 ISO 27001 + GDPR',
    traditional: '—',
    percentage: '—',
    diy: '—',
  },
];

const statsBar = [
  { value: '1,200+', label: 'contractors paid monthly' },
  { value: '40+', label: 'countries active' },
  { value: '$50', label: 'flat per payout' },
  { value: 'USDT', label: 'accepted' },
];

const testimonials = [
  {
    quote: 'We had 50 people on crypto payroll. P2P transfers were eating two days a month, and our devs kept getting their cards blocked. Now it\'s one USDT transfer and everyone\'s sorted.',
    author: 'Founder, DeFi protocol',
    detail: '50+ contractors',
  },
  {
    quote: 'Our investors explicitly told us our previous payment provider was a problem \u2014 the payment trail was too visible. Stape\'s CoR structure solved the compliance issue overnight.',
    author: 'CFO, Web3 security audit firm',
    detail: '',
  },
  {
    quote: 'Half my team wants USDT, half wants bank transfers. The split payout feature was the thing that sold us \u2014 nobody else offered that.',
    author: 'Head of Operations',
    detail: 'Blockchain infrastructure company',
  },
];

const faqs = [
  {
    question: 'Can I fund my Stape balance directly with crypto?',
    answer: 'Yes. We accept USDT and USDC.',
  },
  {
    question: 'What if my contractors want to receive in USDT, not fiat?',
    answer: 'They can. Each contractor chooses their payout method independently \u2014 bank card, local transfer, or USDT. They can also split: part fiat, part crypto. Zero withdrawal fees either way.',
  },
  {
    question: 'Do you work with companies registered in Hong Kong / Caymans / UAE?',
    answer: 'Yes. These are the most common jurisdictions for our Web3 clients. We work with offshore structures as long as standard KYB verification passes.',
  },
  {
    question: 'What about source of funds documentation?',
    answer: 'We require KYB (Know Your Business) verification for your company and run KYT checks on incoming crypto transactions. If your funds come from a clean, verified corporate wallet, the process is straightforward. We cannot accept payments from personal wallets.',
  },
  {
    question: 'Can contractors in Georgia and Kazakhstan get paid?',
    answer: 'Yes. This is one of the core reasons Web3 companies come to us. We maintain legal payout channels while structuring payments through our CoR entities so there\'s no direct transfer trail from your company to restricted jurisdictions.',
  },
  {
    question: 'How does IP assignment work for smart contract code?',
    answer: 'Every service agreement includes IP assignment clauses. Rights transfer from the contractor through our local entity to your company. This holds up for investor due diligence and audit.',
  },
  {
    question: 'What\'s the minimum team size?',
    answer: 'No minimum. We work with teams from 5 to 150+ contractors. The $50 flat fee makes it economical even for smaller teams with high-value payouts.',
  },
];

/* ─── Section Components ──────────────────────────────────────────────────── */

function HeroWeb3() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-primary overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-[1000px] mx-auto px-6 md:px-12 text-center">
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
                className="w-8 h-8 rounded-full border-2 border-primary object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-white/60">Trusted by 600+ teams getting their headspace back</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="text-sm text-white/60 font-medium">For Web3 & Crypto Companies</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[36px] md:text-[52px] lg:text-[60px] text-white leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Your treasury is in USDT.{' '}
          <span className="text-accent">Your team needs real money to pay rent.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          You raised in crypto. Your contractors live in fiat. P2P and cold wallets worked at 5 people&nbsp;&mdash; not at 50. Stape accepts your USDT, handles contracts, and pays your team in local currency.
        </motion.p>

        {/* Flow diagram */}
        <motion.div
          className="flex items-center justify-center gap-3 md:gap-4 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-white">
            USDT / USDC
          </div>
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="bg-accent text-primary rounded-lg px-4 py-2.5 text-sm font-bold">
            Stape
          </div>
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="flex items-center gap-2">
            {['USD', 'EUR', 'GEL', 'ARS', 'RSD'].map((currency) => (
              <span key={currency} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-white/80">
                {currency}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-accent text-primary font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors whitespace-nowrap"
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
            'Stablecoins accepted',
            '$50 flat per payout',
            '0% for contractors',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-white/50 capitalize">
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [userReactions, setUserReactions] = useState<Record<string, Set<Web3ReactionType>>>({});
  const [painCards, setPainCards] = useState<Web3PainCard[]>(initialPainCards);

  const handleReaction = useCallback((id: string, reaction: Web3ReactionType) => {
    setUserReactions((prev) => {
      const current = prev[id] || new Set<Web3ReactionType>();
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

  const stickyStyles = [
    { rotate: -1.5, shadow: '2px 3px 8px rgba(0,0,0,0.08)' },
    { rotate: 0.8, shadow: '3px 2px 6px rgba(0,0,0,0.06)' },
    { rotate: -0.5, shadow: '1px 4px 10px rgba(0,0,0,0.07)' },
    { rotate: 1.2, shadow: '4px 2px 8px rgba(0,0,0,0.09)' },
    { rotate: -0.8, shadow: '2px 3px 7px rgba(0,0,0,0.07)' },
  ];

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
            The part of running a Web3 company nobody tweets about
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {painCards.map((card, i) => {
            const style = stickyStyles[i % stickyStyles.length];
            const userSet = userReactions[card.id] || new Set<Web3ReactionType>();
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
                <p className="text-[13px] font-bold text-primary leading-snug mb-2">
                  {card.title}
                </p>
                <p className="text-[12px] text-primary/70 leading-relaxed mb-5">
                  {card.text}
                </p>
                <div className="mt-auto flex items-center gap-2 flex-wrap">
                  {(['fire', 'bang', 'skull'] as Web3ReactionType[]).map((reaction) => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(card.id, reaction)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        userSet.has(reaction)
                          ? 'bg-primary text-white shadow-sm scale-105'
                          : 'bg-white/80 text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
                      }`}
                    >
                      <span className="text-sm">{web3ReactionEmoji[reaction]}</span>
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
          Two ways to pay a distributed Web3 team
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Without Stape */}
          <div className="bg-background-secondary rounded-2xl p-6 md:p-8 border border-border/50">
            <h3 className="text-sm font-bold text-foreground-muted mb-6 uppercase tracking-wide">Without Stape</h3>
            <ol className="space-y-4">
              {withoutStape.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-border/60 text-foreground-muted text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* With Stape */}
          <div className="bg-accent/20 rounded-2xl p-6 md:p-8 border border-accent/30">
            <h3 className="text-sm font-bold text-primary mb-6 uppercase tracking-wide">With Stape</h3>
            <ol className="space-y-4">
              {withStape.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-primary font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
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
            From USDT to payslips in 3&nbsp;steps
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
            {howItWorksSteps.map((_, i) => (
              <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-accent border-2 border-accent" />
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howItWorksSteps.map((step, index) => (
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
                  <p className="text-xs font-semibold text-white/60">{step.step}</p>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingComparison() {
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
          The math, for a team of 50
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          50 contractors, average payout $4,000/month, funded in USDT
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
                  <th className="text-left py-4 px-3 text-sm font-semibold text-primary w-[20%]"></th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">Stape</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Traditional EOR</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">%-fee payroll services</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">DIY (P2P + wallet)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className={`py-4 px-4 text-sm text-primary text-center font-semibold bg-accent/20 ${index === comparisonFeatures.length - 1 ? 'rounded-b-xl' : ''}`}>
                      {row.stape}
                    </td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.traditional}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.percentage}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Callout */}
        <motion.div
          className="mt-8 bg-accent rounded-xl p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-primary font-display font-bold text-lg md:text-xl">
            $50 per payout.
          </p>
          <p className="text-primary/80 text-sm mt-1">
            Whether your Software Developer earns $2,000 or $8,000. We don&apos;t charge more because your team is good at what they do.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CryptoFiatBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em] leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          You have USDT. Your team needs euros, zloty, and dollars.
        </motion.h2>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-sm text-foreground-secondary leading-relaxed">
            The Web3 payroll problem isn&apos;t paying people&nbsp;&mdash; it&apos;s bridging two financial systems that don&apos;t talk to each other. Your company holds USDT. Your smart contract auditor in Barcelona needs euros for rent. Your protocol researcher in Lisbon needs euros for a mortgage application&nbsp;&mdash; with a real employment contract attached. Your marketing lead in Warsaw wants half in zloty, half in USDT.
          </p>

          {/* Flow visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company side */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Company side</h3>
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                You send USDT (TRC-20) from a verified corporate wallet. We verify the transaction (KYT check for wallet cleanliness), convert at fixed rate, and credit your Stape balance in USD.
              </p>
            </div>

            {/* Contractor side */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Contractor side</h3>
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Each person chooses their own payout method in their dashboard. Bank card, local bank transfer, or USDT&nbsp;&mdash; their choice, every month. They can split: $3,000 to a Serbian bank account, $2,000 in USDT. Zero withdrawal fees.
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="bg-primary rounded-2xl p-6 md:p-8">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wide mb-3">The result</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Your books show a clean B2B service agreement. Your contractor&apos;s bank sees a legitimate international salary payment. Your investors see documented expenses for development services. Everyone&apos;s happy&nbsp;&mdash; and every audit is covered.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {statsBar.map((stat, i) => (
            <div key={i} className="bg-background-secondary rounded-xl p-6 md:p-8">
              <p className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-foreground-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background-secondary rounded-2xl p-8 border border-border flex flex-col">
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
      </div>
    </section>
  );
}

function Web3FAQ() {
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
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Questions Web3 teams actually ask
        </motion.h2>

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
          Your team builds protocols. They shouldn&apos;t have to navigate the banking system too.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Book a 15-minute call. We&apos;ll walk through your specific setup&nbsp;&mdash; jurisdiction, team size, crypto&#x2194;fiat split&nbsp;&mdash; and show you exactly how the transition works.
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
            Make a Test Payment ($0)
          </a>
        </motion.div>
        <motion.p
          className="text-xs text-foreground-muted italic mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Or make a test payment first&nbsp;&mdash; $0, just to see how it works.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function Web3Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroWeb3 />
      <TrustBadgeBar />
      <PainRecognition />
      <BeforeAfter />
      <HowItWorks />
      <PricingComparison />
      <CryptoFiatBridge />
      <SocialProof />
      <Web3FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
