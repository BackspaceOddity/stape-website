'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    id: 'cascade-nobody',
    title: 'The \u201Ccascade\u201D nobody explained',
    body: 'Your developer works through an umbrella in the UAE. They wrote your core logic. But there\u2019s no direct contract \u2014 and no clear paper trail showing how IP passed from the individual to the intermediary to you.',
    reactions: { fire: 312, bang: 127, skull: 71 },
  },
  {
    id: 'invoice-problem',
    title: 'Invoice says \u201CSoftware development\u201D \u2014 that\u2019s it',
    body: 'No task breakdown, no Jira references, no mention of IP transfer. Your accountant can\u2019t put it on the balance sheet as an intangible asset. The work happened. The proof didn\u2019t.',
    reactions: { fire: 289, bang: 156, skull: 48 },
  },
  {
    id: 'github-ip',
    title: 'Your code lives on someone else\u2019s GitHub',
    body: 'The contractor pushed your module to a public repo. The NDA was signed with the intermediary, not with them. There\u2019s nothing legally binding the person who saw your source code.',
    reactions: { fire: 267, bang: 143, skull: 89 },
  },
  {
    id: 'invest-ip-chain',
    title: '\u201CShow us the IP chain\u201D',
    body: 'You\u2019re raising a Series A. The fund\u2019s lawyers trace your product back to 14 contractors across 6 countries \u2014 and find zero IP assignment agreements. The term sheet is suddenly conditional.',
    reactions: { fire: 341, bang: 112, skull: 63 },
  },
  {
    id: 'solar-staff-redoc',
    title: 'Solar Staff: re-document IP rights every single task',
    body: 'Every assignment means manually rewriting IP transfer clauses. Expensive, slow, and your team forgets to do it half the time anyway.',
    reactions: { fire: 198, bang: 174, skull: 52 },
  },
  {
    id: 'no-russian-footprint',
    title: '\u201CNo Russian footprint, please\u201D',
    body: 'Companies with CIS-based R&D want a clean rights chain routed through the UAE or US \u2014 no traces that could spook Western partners or investors.',
    reactions: { fire: 256, bang: 98, skull: 77 },
  },
  {
    id: 'gamedev-art',
    title: 'GameDev: the investor asks who owns the art',
    body: 'Code, design, music \u2014 all built by contractors. The institutional investor demands documentation for every asset. It doesn\u2019t exist.',
    reactions: { fire: 224, bang: 165, skull: 81 },
  },
  {
    id: 'nda-wrong-person',
    title: 'The NDA was signed. Just not with the right person.',
    body: 'Your confidentiality agreement is with the umbrella company. The developer who saw your entire codebase isn\u2019t legally bound by anything.',
    reactions: { fire: 303, bang: 139, skull: 94 },
  },
];

const stickyStyles = [
  { rotate: -1.5, shadow: '2px 3px 8px rgba(0,0,0,0.08)' },
  { rotate: 0.8, shadow: '3px 2px 6px rgba(0,0,0,0.06)' },
  { rotate: -0.5, shadow: '1px 4px 10px rgba(0,0,0,0.07)' },
  { rotate: 1.2, shadow: '4px 2px 8px rgba(0,0,0,0.09)' },
  { rotate: 0.6, shadow: '2px 2px 7px rgba(0,0,0,0.07)' },
  { rotate: -1.0, shadow: '3px 3px 9px rgba(0,0,0,0.08)' },
  { rotate: 1.0, shadow: '1px 3px 8px rgba(0,0,0,0.06)' },
  { rotate: -0.8, shadow: '4px 1px 7px rgba(0,0,0,0.08)' },
];

const steps = [
  {
    title: 'We structure the IP chain',
    body: 'Every contractor signs an agreement with Stape that includes full IP assignment \u2014 covering code, designs, models, and any work product. Rights transfer from contractor to Stape automatically. No manual addendums, no per-task paperwork.',
  },
  {
    title: 'Rights cascade to you',
    body: 'Your Master Service Agreement with Stape mirrors the contractor\u2019s IP assignment. Rights flow from contractor \u2192 Stape \u2192 your company. The chain is airtight, auditable, and designed for due diligence.',
  },
  {
    title: 'Documents your CFO will love',
    body: 'Every invoice comes with detailed descriptions tied to actual deliverables \u2014 not generic "development services." Ready for intangible asset recognition, tax reporting, and investor scrutiny.',
  },
];

const benefits = [
  { stat: 'Cascade IP transfer', desc: 'Contractor \u2192 Stape \u2192 You. Full assignment chain built into every contract. No gaps for due diligence to find.' },
  { stat: 'Detailed closing documents', desc: 'Invoices reference specific deliverables, not "services." Ready for balance sheet recognition as intangible assets.' },
  { stat: 'NDA & Non-compete support', desc: 'Sign NDAs directly with your contractors \u2014 separate from the financial relationship. We\u2019ll guide you through the structure.' },
  { stat: 'Intangible asset ready', desc: 'Documentation structured for your accountant to recognize IP on the balance sheet. Built for \u041D\u041C\u0410 / IAS 38 compliance.' },
  { stat: 'Jurisdiction-aware contracts', desc: 'Contracts tailored per contractor\u2019s location. IP clauses that hold up in UAE, US, EU, and 240+ other jurisdictions.' },
  { stat: 'Works with your tools', desc: 'Attach Jira exports, GitHub links, or SOW documents to invoices. Your paper trail matches your actual workflow.' },
];

const comparisonData = [
  {
    feature: 'IP assignment',
    diy: 'You draft it (and hope it holds)',
    competitors: 'Per-task manual assignment',
    stape: 'Built into every contract',
  },
  {
    feature: 'Cascade transfer',
    diy: 'Your lawyer\u2019s problem',
    competitors: 'Unclear chain',
    stape: 'Contractor \u2192 Stape \u2192 You',
  },
  {
    feature: 'Closing documents',
    diy: 'Generic invoices',
    competitors: 'Basic invoices',
    stape: 'Detailed, deliverable-linked',
  },
  {
    feature: 'NDA / Non-compete',
    diy: 'You handle separately',
    competitors: 'Limited support',
    stape: 'Direct contractor agreements supported',
  },
  {
    feature: 'Balance sheet ready',
    diy: 'Depends on your accountant',
    competitors: 'Not structured for it',
    stape: 'IAS 38 / \u041D\u041C\u0410 ready',
  },
  {
    feature: 'Setup time',
    diy: 'Weeks of legal work',
    competitors: 'Days + manual IP per task',
    stape: 'Under 24 hours',
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Use Case: IP Transfer
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Your contractors write the&nbsp;code. But who owns&nbsp;it?
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          When your team is distributed across borders, intellectual property doesn&apos;t transfer itself. Stape builds IP assignment into every contract&nbsp;&mdash; so the code, designs, and ideas your contractors create are legally yours. No&nbsp;gaps. No&nbsp;guesswork.
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
            'Full IP assignment in every contract',
            'Cascade transfer: contractor \u2192 Stape \u2192 you',
            'Audit-ready closing documents',
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
            You&apos;re paying for the work. But you might not own&nbsp;it.
          </h2>
          <p className="text-foreground-muted text-sm max-w-md">
            These aren&apos;t edge cases. They&apos;re the default when you hire contractors internationally without an IP framework.
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
          What if IP transfer was infrastructure, not&nbsp;paperwork?
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-foreground-secondary leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The companies that lose IP don&apos;t lose it in court. They lose it in the gap between &ldquo;we have a contract&rdquo; and &ldquo;the contract actually assigns rights.&rdquo; Every contractor engagement should have a clear, auditable chain: the person who wrote the code assigns rights to the legal entity that contracted them, and that entity assigns rights to you. Not as an afterthought. As architecture. That&apos;s what Stape builds into every engagement by default.
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
            Your code. Your rights. Your balance&nbsp;sheet.
          </h2>
        </motion.div>
        <motion.p
          className="text-white/60 text-center text-sm md:text-base max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Stape is your Contractor of Record&nbsp;&mdash; with IP assignment built into the legal architecture from day one. One platform, one chain of rights, zero&nbsp;ambiguity.
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
              You: Back to building your product.
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
          Built for companies where IP is the&nbsp;product.
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
            Let&apos;s talk about what happens without&nbsp;this.
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              A GameDev studio raises $5M. Half their codebase was written by contractors in three countries. During due diligence, the investor&apos;s legal team finds no IP assignment chain&nbsp;&mdash; just invoices saying &ldquo;development services.&rdquo; The round doesn&apos;t collapse. It just gets repriced. 20% lower. Because the IP risk becomes the investor&apos;s discount.
            </p>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
              A SaaS company gets acquired. The buyer&apos;s lawyers trace every line of code. Two contractors never signed IP agreements. The acquisition closes&nbsp;&mdash; but $800K goes into escrow &ldquo;until the IP situation is resolved.&rdquo; It never fully resolves.
            </p>
            <p className="mt-6 text-accent font-display font-bold text-lg">
              This isn&apos;t theoretical. This is what Stape prevents&nbsp;&mdash; by making IP transfer structural, not something you remember to add later.
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
          Three ways to handle contractor&nbsp;IP. Two of them are&nbsp;risky.
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
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">DIY (Manual contracts)</th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-foreground-muted">Competitors (Solar Staff, etc.)</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-primary bg-accent/20 rounded-t-xl">Stape</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-3 text-sm font-medium text-primary">{row.feature}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.diy}</td>
                    <td className="py-4 px-3 text-sm text-foreground-muted text-center">{row.competitors}</td>
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
          Your contractors build your product. Make sure you own&nbsp;it.
        </motion.h2>
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Book a 15-minute demo and see how Stape handles IP transfer&nbsp;&mdash; cascade assignment, detailed documentation, and audit-ready contracts&nbsp;&mdash; so your code, your designs, and your ideas are legally yours.
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
          Average time from first call to first contract with IP assignment: under 24 hours.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function IPTransferPage() {
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
