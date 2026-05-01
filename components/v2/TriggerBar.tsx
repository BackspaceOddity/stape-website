'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Situation {
  id: string;
  text: string;
  reactions: {
    yes: number;
    no: number;
    fire: number;
  };
}

const initialSituations: Situation[] = [
  {
    id: 'keep-running',
    text: 'Your payment provider just froze payouts. Your team still needs to get paid on Friday. You have no Plan B.',
    reactions: { yes: 304, no: 42, fire: 128 },
  },
  {
    id: 'hire-anywhere',
    text: "You found the perfect engineer in São Paulo. Now you're stuck figuring out how to pay them in reais — legally, on time, and in full.",
    reactions: { yes: 267, no: 58, fire: 94 },
  },
  {
    id: 'mental-drain',
    text: "Your finance team is sending 200 contractor payments manually. CSV uploads, bank transfers, payment confirmations. It takes two days. Every month.",
    reactions: { yes: 412, no: 31, fire: 189 },
  },
  {
    id: 'patchwork',
    text: 'Wise for EU. Local transfers for LATAM. A spreadsheet to track it all. You know this won\u2019t survive 50 people.',
    reactions: { yes: 378, no: 39, fire: 167 },
  },
  {
    id: 'compliance-blind',
    text: 'You pay contractors in 12 countries. If an auditor asked for proof of compliance today, you\u2019d panic.',
    reactions: { yes: 289, no: 63, fire: 112 },
  },
  {
    id: 'provider-roulette',
    text: "Your provider just raised prices mid-contract. Now you're explaining budget overruns you never planned for.",
    reactions: { yes: 341, no: 44, fire: 143 },
  },
  {
    id: 'risky-geos',
    text: 'Your best developers are in places most platforms don\u2019t reach. You need someone who actually operates there.',
    reactions: { yes: 198, no: 89, fire: 67 },
  },
  {
    id: 'hostage',
    text: 'You can\u2019t hire who you want, where you want, because the back-office complexity is making decisions for you.',
    reactions: { yes: 356, no: 47, fire: 156 },
  },
];

type ReactionType = 'yes' | 'no' | 'fire';

export default function TriggerBar() {
  const [userReactions, setUserReactions] = useState<Record<string, Set<ReactionType>>>({});
  const [situations, setSituations] = useState<Situation[]>(initialSituations);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleReaction = useCallback((id: string, reaction: ReactionType) => {
    setUserReactions((prev) => {
      const current = prev[id] || new Set<ReactionType>();
      const updated = new Set(current);

      if (updated.has(reaction)) {
        // Toggle off
        updated.delete(reaction);
        setSituations((prevSituations) =>
          prevSituations.map((s) =>
            s.id === id
              ? { ...s, reactions: { ...s.reactions, [reaction]: s.reactions[reaction] - 1 } }
              : s
          )
        );
      } else {
        // Toggle on
        updated.add(reaction);
        setSituations((prevSituations) =>
          prevSituations.map((s) =>
            s.id === id
              ? { ...s, reactions: { ...s.reactions, [reaction]: s.reactions[reaction] + 1 } }
              : s
          )
        );
      }

      return { ...prev, [id]: updated };
    });
  }, []);

  const totalUserYes = Object.values(userReactions).filter((set) => set.has('yes')).length;

  // Miro-style random rotations and shadow variations for each sticky note
  const stickyStyles = [
    { rotate: -1.5, shadow: '2px 3px 8px rgba(0,0,0,0.08)' },
    { rotate: 0.8, shadow: '3px 2px 6px rgba(0,0,0,0.06)' },
    { rotate: -0.5, shadow: '1px 4px 10px rgba(0,0,0,0.07)' },
    { rotate: 1.2, shadow: '4px 2px 8px rgba(0,0,0,0.09)' },
    { rotate: 0.3, shadow: '2px 4px 6px rgba(0,0,0,0.06)' },
    { rotate: -1.0, shadow: '3px 3px 10px rgba(0,0,0,0.08)' },
    { rotate: 1.5, shadow: '1px 3px 8px rgba(0,0,0,0.07)' },
    { rotate: -0.7, shadow: '4px 1px 6px rgba(0,0,0,0.06)' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1] mb-3">
            Any of this sound painfully familiar?
          </h2>
          <p className="text-foreground-muted text-sm max-w-md">
            Say it as it is. We&apos;re curious, not judgemental.
          </p>
        </motion.div>

        {/* Sticky note grid */}
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
                  hasAnyReaction
                    ? 'bg-[#FFF3A0]'
                    : 'bg-[#FFF9DB]'
                }`}
              >
                {/* Situation text */}
                <p className="text-[13px] text-primary leading-relaxed mb-5 font-medium">
                  {situation.text}
                </p>

                {/* Emoji reactions row — Miro style */}
                <div className="mt-auto flex items-center gap-2 flex-wrap">
                  {/* 👋 YES — "That's me" */}
                  <button
                    onClick={() => handleReaction(situation.id, 'yes')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      userSet.has('yes')
                        ? 'bg-primary text-white shadow-sm scale-105'
                        : 'bg-white/80 text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    <span className="text-sm">👋</span>
                    <span>{situation.reactions.yes}</span>
                  </button>

                  {/* 🔥 — "This is painful" */}
                  <button
                    onClick={() => handleReaction(situation.id, 'fire')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      userSet.has('fire')
                        ? 'bg-primary text-white shadow-sm scale-105'
                        : 'bg-white/80 text-primary/70 hover:bg-white hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    <span className="text-sm">🔥</span>
                    <span>{situation.reactions.fire}</span>
                  </button>

                  {/* 🤷 NO — "Not me" */}
                  <button
                    onClick={() => handleReaction(situation.id, 'no')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      userSet.has('no')
                        ? 'bg-primary/20 text-primary shadow-sm scale-105'
                        : 'bg-white/80 text-primary/40 hover:bg-white hover:text-primary/60 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-sm">🤷</span>
                    <span>{situation.reactions.no}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Soft CTA — appears after engagement */}
        <AnimatePresence>
          {totalUserYes >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-primary font-medium text-center mt-8"
            >
              More than one? That&apos;s a pattern.{' '}
              <a href="#" className="text-accent font-semibold hover:underline">
                We built Kleos for exactly this &rarr;
              </a>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
