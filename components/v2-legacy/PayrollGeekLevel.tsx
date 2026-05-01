'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const characters = [
  {
    id: 'founder',
    role: 'Founder / CEO',
    level: 'I don\u2019t want to know',
    tagline: 'Just tell me everyone got paid',
    description:
      'Your contractors get legalized income for residence permits and Digital Nomad visas \u2014 automatically. Your investors see a clean audit trail. Your team grows from 15 to 70, and the payment process stays invisible. You never open a spreadsheet again.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    accent: 'bg-accent',
  },
  {
    id: 'hiring',
    role: 'Hiring Manager',
    level: 'Slack ping when it\u2019s done',
    tagline: 'One notification. Zero spreadsheets.',
    description:
      'Your candidate in Tbilisi doesn\u2019t wait 3 weeks for a contract. Your senior engineer in Buenos Aires stops DMing you about late payments. You get a Slack notification that everyone\u2019s paid, and you go back to building product.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    accent: 'bg-blue-100',
  },
  {
    id: 'cfo',
    role: 'CFO / Finance',
    level: 'Show me everything',
    tagline: 'Full dashboard, every currency, every audit line',
    description:
      'One B2B invoice instead of hundreds of contracts. VAT offset works in your favor. Fixed FX rates \u2014 no surprises, no hidden margins. Complete audit trail. When the auditor asks how you pay people in 23 countries, you show them one vendor relationship.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    accent: 'bg-emerald-100',
  },
  {
    id: 'hr',
    role: 'HR Manager',
    level: 'Auto-pilot mode',
    tagline: 'Contracts, docs, compliance — all handled',
    description:
      'You stop managing a zoo of 4 providers across 12 countries. Every contractor gets paid on the promised day, in the promised amount. Compliance documents generate automatically. You go from \u2018payroll specialist who also does HR\u2019 back to \u2018HR leader.\u2019',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'bg-violet-100',
  },
];

export default function PayrollGeekLevel() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activeCharacter = characters.find((c) => c.id === selected);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] md:text-[40px] font-display font-extrabold text-primary tracking-[-0.02em] leading-[1.1]">
            How deep do you want to go?
          </h2>
        </motion.div>
        <motion.p
          className="text-foreground-muted text-center mb-12 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Choose your payroll involvement level
        </motion.p>

        {/* Character Select Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelected(selected === char.id ? null : char.id)}
              className={`relative text-left rounded-2xl p-5 md:p-6 transition-all duration-300 border-2 flex flex-col ${
                selected === char.id
                  ? 'border-primary bg-white shadow-lg scale-[1.02]'
                  : 'border-transparent bg-white hover:border-primary/20 hover:shadow-md'
              }`}
            >
              {/* Icon avatar — fixed height row */}
              <div className="h-14 flex items-start">
                <div className={`w-11 h-11 rounded-xl ${char.accent} flex items-center justify-center text-primary`}>
                  {char.icon}
                </div>
              </div>

              {/* Role — fixed height row to keep alignment across cards */}
              <div className="h-10 flex items-start">
                <p className="text-sm font-display font-bold text-primary leading-tight">{char.role}</p>
              </div>

              {/* Level label */}
              <p className="text-xs font-mono text-foreground-muted leading-snug mb-2">
                &ldquo;{char.level}&rdquo;
              </p>

              {/* Tagline */}
              <p className="text-xs text-foreground-secondary leading-relaxed">{char.tagline}</p>

              {/* Selection indicator */}
              {selected === char.id && (
                <motion.div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          {activeCharacter && (
            <motion.div
              key={activeCharacter.id}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${activeCharacter.accent} flex items-center justify-center text-primary flex-shrink-0`}>
                    {activeCharacter.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-primary">{activeCharacter.role}</h3>
                    <p className="text-xs font-mono text-foreground-muted">{activeCharacter.level}</p>
                  </div>
                </div>
                <p className="text-sm text-primary leading-relaxed mb-6">{activeCharacter.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
                >
                  See how this works for me
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
