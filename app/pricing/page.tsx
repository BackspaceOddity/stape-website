'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Section 1: Compact Hero ────────────────────────────────────────────── */

function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-5 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Know what you&apos;ll pay before the call.
        </motion.h1>


        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: 'ISO 27001', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { label: 'GDPR', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            { label: '242 Locations', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-foreground-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
              </svg>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 2: Pricing Cards ───────────────────────────────────────────── */

const corFeatures = [
  'Compliant contractor contracts',
  'Payments in 120+ currencies',
  'Wire fees included',
  'Off-cycle payments included',
  'Full compliance & audit trail',
  'Auto-generated tax documents',
  'KYC handling',
  '60 seconds onboarding',
  'One B2B invoice for your books',
  'FX conversion no more than 3.5% — locked at signing',
];

const eorFeatures = [
  'Full legal employment without local entity',
  'Local labor law compliance',
  'Payroll processing & tax filings',
  'Benefits administration',
  'Employment contracts per jurisdiction',
  'Onboarding & offboarding managed',
  'IP protection provisions',
  'Ongoing HR & legal support',
  'One B2B invoice for your books',
  'FX conversion no more than 3.5% — locked at signing',
];

const employeeFeatures = [
  'Zero fees deducted from salary',
  'Full statutory benefits included',
  'Local employment contract',
  'Paid in local currency, on time',
  'Full visibility into payslips',
  'Same protections as any local employee',
];

const contractorFeatures = [
  'Zero platform fees',
  'Zero withdrawal commissions',
  'All payout methods free',
  'Get paid in your local currency',
  'On-time payments, every cycle',
  'Full visibility into payment status',
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
          <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingCards() {
  const [activeTab, setActiveTab] = useState<'cor' | 'eor'>('cor');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const tabs = [
    { id: 'cor' as const, label: 'Contractor of Record' },
    { id: 'eor' as const, label: 'Employer of Record' },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background-secondary">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex bg-white rounded-xl p-1.5 border border-border shadow-card">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground-muted hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {activeTab === 'cor' ? (
            <motion.div
              key="cor"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* For companies */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-primary/20 shadow-card flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">For companies</span>
                <div className="mb-1">
                  <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;50</span>
                </div>
                <p className="text-base text-foreground-secondary mb-1">/ per contractor</p>
                <p className="text-sm text-foreground-muted mb-8">Fixed. No monthly fee.</p>

                <a
                  href="#"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors mb-8"
                >
                  Book a Demo
                </a>

                <FeatureList features={corFeatures} />
              </div>

              {/* For contractors */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">For contractors</span>
                <div className="mb-1">
                  <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;0</span>
                </div>
                <p className="text-base text-foreground-secondary mb-1">/ always</p>
                <p className="text-sm text-foreground-muted mb-8">Your contractors never pay a cent.</p>

                <FeatureList features={contractorFeatures} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="eor"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* For companies */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-primary/20 shadow-card flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">For companies</span>
                <div className="mb-1">
                  <span className="text-base text-foreground-muted mr-1 align-baseline">From</span>
                  <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;200</span>
                </div>
                <p className="text-base text-foreground-secondary mb-1">/ per employee per month</p>
                <p className="text-sm text-foreground-muted mb-8">Depends on country. Get a quote.</p>

                <a
                  href="#"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors mb-8"
                >
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <FeatureList features={eorFeatures} />
              </div>

              {/* For employees */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">For employees</span>
                <div className="mb-1">
                  <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;0</span>
                </div>
                <p className="text-base text-foreground-secondary mb-1">/ always</p>
                <p className="text-sm text-foreground-muted mb-8">Your employees never pay a cent.</p>

                <FeatureList features={employeeFeatures} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Section 3: Comparison Row ──────────────────────────────────────────── */

function ComparisonRow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-background-secondary rounded-xl p-6">
            <h4 className="text-sm font-display font-bold text-primary mb-2">Contractor of Record</h4>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              You manage the relationship. We handle payments, compliance, and documents.
            </p>
          </div>
          <div className="bg-background-secondary rounded-xl p-6">
            <h4 className="text-sm font-display font-bold text-primary mb-2">Employer of Record</h4>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              We become the legal employer. You manage the work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: Multi-Step Pricing Wizard ─────────────────────────────────── */

const STEP_LABELS = ['Team', 'Money', 'You'] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Reusable chip components ── */

function SingleChip({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-4 py-2 text-sm rounded-lg border transition-all duration-150 ${
        selected
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'bg-white text-foreground-secondary border-border hover:border-primary/40 hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function MultiChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border transition-all duration-150 ${
        selected
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'bg-white text-foreground-secondary border-border hover:border-primary/40 hover:text-primary'
      }`}
    >
      {selected && (
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {label}
    </button>
  );
}

/* ── Progress indicator ── */

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = current > stepNum;
        const isCurrent = current === stepNum;
        const isFuture = current < stepNum;

        return (
          <div key={label} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'border-2 border-border text-foreground-muted bg-white'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span className={`text-[11px] mt-1.5 font-medium ${isFuture ? 'text-foreground-muted' : 'text-primary'}`}>
                {label}
              </span>
            </div>
            {/* Connecting line */}
            {i < STEP_LABELS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full transition-colors duration-300 ${
                current > stepNum ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main wizard ── */

function QuoteForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  /* Step 1 */
  const [contractors, setContractors] = useState('');
  const [countries, setCountries] = useState('');
  /* Step 2 */
  const [volume, setVolume] = useState('');
  const [payMethods, setPayMethods] = useState<string[]>([]);
  /* Step 3 */
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const togglePayMethod = (m: string) =>
    setPayMethods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const step1Valid = contractors !== '' && countries !== '';
  const step2Valid = volume !== '' && payMethods.length > 0;
  const step3Valid = isValidEmail(email) && role !== '';

  const handleSubmit = () => {
    console.log('Quote wizard submitted:', { contractors, countries, volume, payMethods, company, email, role });
    setSubmitted(true);
  };

  /* ── step content ── */

  const renderStep1 = () => (
    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-display font-bold text-primary mb-6">Your team</h3>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-primary mb-2.5">How many contractors do you pay?</label>
        <div className="flex flex-wrap gap-2">
          {['1–10', '11–50', '51–200', '200+'].map((v) => (
            <SingleChip key={v} label={v} selected={contractors === v} onSelect={() => setContractors(v)} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-primary mb-2.5">Paying into how many countries?</label>
        <div className="flex flex-wrap gap-2">
          {['1–3', '4–10', '11–25', '25+'].map((v) => (
            <SingleChip key={v} label={v} selected={countries === v} onSelect={() => setCountries(v)} />
          ))}
        </div>
      </div>

      <p className="text-xs text-foreground-muted leading-relaxed mb-6">
        No judgment. We&apos;ve seen 400 contractors across 60 countries managed in a spreadsheet.
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!step1Valid}
          onClick={() => setStep(2)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-display font-bold text-primary mb-6">Your money</h3>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-primary mb-2.5">Estimated monthly payout volume</label>
        <div className="flex flex-wrap gap-2">
          {['Under €25k', '€25k–100k', '€100k–500k', '€500k+'].map((v) => (
            <SingleChip key={v} label={v} selected={volume === v} onSelect={() => setVolume(v)} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-primary mb-2.5">How do you pay today?</label>
        <div className="flex flex-wrap gap-2">
          {['Bank transfers', 'Wise / Revolut', 'Payroll provider (Deel, Remote…)', 'Crypto', 'Vibes & prayers'].map((v) => (
            <MultiChip key={v} label={v} selected={payMethods.includes(v)} onToggle={() => togglePayMethod(v)} />
          ))}
        </div>
      </div>

      <p className="text-xs text-foreground-muted leading-relaxed mb-6">
        &ldquo;Vibes &amp; prayers&rdquo; is more common than you&apos;d think.
      </p>

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setStep(1)} className="text-sm text-foreground-secondary hover:text-primary transition-colors">
          ← Back
        </button>
        <button
          type="button"
          disabled={!step2Valid}
          onClick={() => setStep(3)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
      <h3 className="text-lg font-display font-bold text-primary mb-2">Get your estimate</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
        We&apos;ll send your custom estimate within 2 hours. Not a generic PDF&nbsp;&mdash; actual numbers for your setup.
      </p>

      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Company name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Work email <span className="text-foreground-muted">*</span></label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 text-sm border rounded-md bg-white text-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
              email && !isValidEmail(email) ? 'border-red-300' : 'border-border'
            }`}
            placeholder="you@company.com"
          />
          {email && !isValidEmail(email) && (
            <p className="text-xs text-red-400 mt-1">Please enter a valid email address.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2.5">Your role <span className="text-foreground-muted">*</span></label>
          <div className="flex flex-wrap gap-2">
            {['Founder / CEO', 'HR / People Ops', 'Finance / CFO', 'Other'].map((v) => (
              <SingleChip key={v} label={v} selected={role === v} onSelect={() => setRole(v)} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setStep(2)} className="text-sm text-foreground-secondary hover:text-primary transition-colors">
          ← Back
        </button>
        <button
          type="button"
          disabled={!step3Valid}
          onClick={handleSubmit}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send me the numbers
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </div>
    </motion.div>
  );

  /* ── confirmation screen ── */

  const renderConfirmation = () => (
    <motion.div
      key="confirmation"
      className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-display font-bold text-primary mb-2">Done. Check your inbox.</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed mb-1">
        We&apos;re building your custom estimate right now.
      </p>
      <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
        Expect it within 2&nbsp;hours. Not a template&nbsp;&mdash; real numbers based on what you told us.
      </p>
      <p className="text-xs text-foreground-muted">
        Want to talk to a human instead?{' '}
        <a href="#" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors">
          Book a call
        </a>.
      </p>
    </motion.div>
  );

  /* ── main render ── */

  return (
    <section id="quote-form" ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[560px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[28px] md:text-[36px] font-display font-extrabold text-primary text-center mb-3 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          What does your contractor setup look like?
        </motion.h2>
        <motion.p
          className="text-sm text-foreground-muted text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          3 questions. No sales call. No demo hostage situation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? renderConfirmation() : (
              <motion.div
                key="wizard"
                className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-card"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <StepIndicator current={step} />
                <AnimatePresence mode="wait">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 5: FAQ ─────────────────────────────────────────────────────── */

const pricingFaqs = [
  {
    question: 'What does \u20AC50 per contractor cover?',
    answer: 'Everything. Compliant contractor contracts, payment processing, FX conversion, wire fees, tax document generation, KYC handling, compliance audit trail, and delivery. No separate line items, no add-ons.',
  },
  {
    question: 'Why does EoR pricing vary by country?',
    answer: 'Each country has different labor laws, tax obligations, mandatory benefits, and statutory contributions. The cost of employing someone in Germany is structurally different from the Philippines. We price per country to keep it fair \u2014 you only pay for the complexity of the jurisdiction you\u2019re hiring in.',
  },
  {
    question: 'What\u2019s the minimum commitment?',
    answer: 'None for CoR. No annual contracts required \u2014 pay per payout, stop whenever you want. EoR contracts depend on the jurisdiction, but we keep terms as flexible as local law allows.',
  },
  {
    question: 'How does this compare to Deel or Remote?',
    answer: 'Deel charges $49/month per contractor as a platform fee \u2014 before FX, wire fees, and add-ons. Remote has a similar structure. We charge \u20AC50 per payout, all-in. For EoR, most competitors start around $599/month per employee. Our \u20AC200 starting point reflects our focus on cost-efficient jurisdictions and lean operations.',
  },
  {
    question: 'Can I use both CoR and EoR together?',
    answer: 'Yes. Many of our clients use CoR for their contractors and EoR for full-time hires. Both run through one dashboard with one B2B invoice.',
  },
  {
    question: 'What if I need to switch from CoR to EoR?',
    answer: 'It happens more than you\u2019d think \u2014 a contractor becomes a core team member and you need to convert them to full employment. We handle the transition end-to-end, including contract changes, compliance adjustments, and onboarding into the EoR structure.',
  },
];

function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-12 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {pricingFaqs.map((faq, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
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

/* ─── Section 5: Bottom CTA ──────────────────────────────────────────────── */

function BottomCTA() {
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
          Still comparing? Start with real numbers.
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Book a Demo
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PricingHero />
      <PricingCards />
      <ComparisonRow />
      <QuoteForm />
      <PricingFAQ />
      <BottomCTA />
      <Footer />
    </main>
  );
}
