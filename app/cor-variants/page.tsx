'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const youItems = ['Who you hire', 'Scope & deliverables', 'Day-to-day comms', 'Performance calls', 'Your sanity'];
const corItems = ['Compliant contracts', 'Worker classification', 'Cross-border payments', 'Tax docs & audit trail', 'IP transfer clauses'];

const desc = 'A Contractor of Record sits between you and your contractors. You manage the work. Kleos manages contracts, classification, cross-border payments, tax docs, and the audit trail.';

/* ─── Variant A: Dark section ──────────────────────────────────────────────── */

function VariantA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-28 bg-primary">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.p
          className="text-base md:text-lg text-white/60 leading-relaxed text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {desc}
        </motion.p>
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/[0.07] rounded-xl p-7 border border-white/10">
            <h3 className="text-sm font-display font-bold mb-5 flex items-center gap-2">
              <span className="text-xs font-bold bg-accent text-primary rounded px-1.5 py-0.5">You</span>
              <span className="text-white">keep</span>
            </h3>
            <ul className="space-y-3">
              {youItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.07] rounded-xl p-7 border border-white/10">
            <h3 className="text-sm font-display font-bold mb-5 flex items-center gap-2">
              <span className="text-xs font-bold bg-white/15 text-white rounded px-1.5 py-0.5">COR</span>
              <span className="text-white">handles</span>
            </h3>
            <ul className="space-y-3">
              {corItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Variant B: Split columns ─────────────────────────────────────────────── */

function VariantB() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="overflow-hidden">
      <motion.div
        className="grid md:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Left: You keep — lime */}
        <div className="bg-accent px-10 md:px-16 py-20 md:py-28">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-primary/50 mb-1">You</p>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-8">keep</h3>
          <ul className="space-y-4">
            {youItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-base font-medium text-primary">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Right: COR handles — dark */}
        <div className="bg-primary px-10 md:px-16 py-20 md:py-28">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-white/40 mb-1">COR</p>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-accent mb-8">handles</h3>
          <ul className="space-y-4">
            {corItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-base font-medium text-white/80">
                <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Variant C: Elevated with headline ────────────────────────────────────── */

function VariantC() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-extrabold text-[28px] md:text-[36px] text-primary leading-[1.1] mb-4">
            What you own. What we own.
          </h2>
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto">
            {desc}
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-8 border border-border border-t-4 border-t-accent">
            <span className="inline-block text-xs font-bold bg-accent text-primary rounded px-2 py-0.5 mb-3">You</span>
            <p className="font-display font-extrabold text-xl text-primary mb-6">keep</p>
            <ul className="space-y-3">
              {youItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border border-t-4 border-t-primary">
            <span className="inline-block text-xs font-bold bg-primary text-white rounded px-2 py-0.5 mb-3">COR</span>
            <p className="font-display font-extrabold text-xl text-primary mb-6">handles</p>
            <ul className="space-y-3">
              {corItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

function Label({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="bg-white border-b border-border px-8 py-4 flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{letter}</span>
      <span className="text-sm font-semibold text-foreground-secondary">{title}</span>
    </div>
  );
}

export default function CORVariantsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="bg-primary/5 border-b border-border px-8 py-6">
          <h1 className="font-display font-extrabold text-xl text-primary">COR block — три варианта</h1>
          <p className="text-sm text-foreground-secondary mt-1">Временная страница для визуального сравнения. Выбери вариант — внедрим в COR-страницу.</p>
        </div>

        <Label letter="A" title="Тёмная секция — контраст на cream-фоне страницы" />
        <VariantA />

        <Label letter="B" title="Разделённые полосы — лайм + тёмный" />
        <VariantB />

        <Label letter="C" title="Заголовок + бордер-акцент на карточках" />
        <VariantC />
      </div>
      <Footer />
    </main>
  );
}
