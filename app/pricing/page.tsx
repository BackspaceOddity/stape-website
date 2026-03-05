'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Section 1: Hero ──────────────────────────────────────────────────────── */

function PricingHero() {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="font-display font-extrabold text-[40px] md:text-[56px] lg:text-[64px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Know what you&apos;ll pay before the call.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Most payroll providers hide pricing behind a &ldquo;Book a Demo&rdquo; button and three weeks of back-and-forth. We&apos;d rather just tell you.
        </motion.p>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Get Your Custom Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { label: '€50 Fixed Per Payout', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'FX Rate Locked at Signing', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            { label: 'Zero Hidden Fees', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
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

/* ─── Section 2: The Real Cost Breakdown ───────────────────────────────────── */

function CostBreakdown() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const industryItems = [
    '$49/month per contractor platform fee',
    'Plus FX markup of 4–5% (hidden in "competitive rates")',
    'Plus wire transfer fees ($5–25 per payment)',
    'Plus off-cycle payment surcharges',
    'Plus compliance add-ons billed separately',
    'Plus "custom pricing" that changes every renewal',
  ];

  const stapeItems = [
    '€50 per payout. Period.',
    'FX conversion up to 3.5% — locked at signing',
    'Wire fees included',
    'Off-cycle payments included',
    'Full compliance included',
    'Price doesn\'t change on renewal day',
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          One number. No asterisks.
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary text-center max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every contractor payout costs &euro;50. That&apos;s it. No per-country surcharges, no monthly platform fees, no &ldquo;admin fees&rdquo; that mysteriously appear on invoice #3.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Industry Standard */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-display font-bold text-primary mb-6">The Industry Standard</h3>
            <ul className="space-y-3 text-sm text-foreground-secondary">
              {industryItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-foreground-muted mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground-muted">
                Your actual cost: &ldquo;we&apos;ll circle back on that&rdquo;
              </p>
            </div>
          </div>

          {/* Stape */}
          <div className="bg-accent rounded-2xl p-8 text-primary">
            <h3 className="text-lg font-display font-bold mb-6">Stape</h3>
            <ul className="space-y-3 text-sm">
              {stapeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-primary/20">
              <p className="text-sm font-semibold">
                Your actual cost: exactly what we told you
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 3: FX Conversion Deep-Dive ───────────────────────────────────── */

function FXDeepDive() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 'Up to 3.5%', label: 'Maximum FX conversion rate' },
    { value: 'Fixed at signing', label: 'Rate doesn\'t fluctuate' },
    { value: 'Often lower', label: 'Based on your actual payment profile' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-6 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Currency conversion that doesn&apos;t eat your margin
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary text-center max-w-2xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          When you pay contractors across borders, someone always takes a cut on the exchange rate. Banks mark up 4&ndash;5%. Payment platforms bury it in &ldquo;competitive FX rates&rdquo; you can&apos;t actually verify.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-foreground-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Stape locks your FX conversion rate at signing. Maximum 3.5%&nbsp;&mdash; often significantly lower depending on your volume, corridors, and payment frequency. The rate is fixed, so you can budget to the cent. No surprises on payday.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background-secondary rounded-xl p-6 md:p-8 flex flex-col"
            >
              <p className="text-sm font-semibold text-primary mb-8 md:mb-12">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl font-display font-extrabold text-primary tracking-tight mt-auto">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: Interactive Quote Form ────────────────────────────────────── */

const roleOptions = ['Founder/CEO', 'CFO/Finance', 'HR/People Ops', 'Operations', 'Other'];
const contractorOptions = ['1–10', '11–50', '51–200', '200+'];
const countryOptions = ['1–3', '4–10', '11–25', '25+'];
const volumeOptions = ['Under €10K', '€10K–€50K', '€50K–€200K', '€200K+'];
const paymentMethods = ['Bank transfers', 'Wise/Revolut', 'Payroll provider (Deel, Remote, etc.)', 'Crypto', 'Other'];

function QuoteForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    role: '',
    contractors: '',
    countries: '',
    volume: '',
    paymentMethods: [] as string[],
  });

  const handleCheckbox = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <section id="quote-form" ref={ref} className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-[640px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Your price in your inbox. No sales call required.
        </motion.h2>

        <motion.p
          className="text-base text-foreground-secondary text-center mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Fill in a few details about your team and payment setup. We&apos;ll calculate your custom rate and send it straight to your email&nbsp;&mdash; typically within 2 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="confirmation"
                className="bg-white rounded-2xl p-8 md:p-10 border border-border text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-3">Got it. Check your inbox.</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                  We&apos;re putting together your personalized pricing based on what you told us. Expect it within 2 hours. If you want to skip the wait and talk to a human&nbsp;&mdash;{' '}
                  <a href="#" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors">
                    book a call instead
                  </a>.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-10 border border-border space-y-5"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Company name */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Company name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Your work email <span className="text-foreground-muted">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Your role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select your role</option>
                    {roleOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Number of contractors */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Number of contractors</label>
                  <select
                    value={formData.contractors}
                    onChange={(e) => setFormData({ ...formData, contractors: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select range</option>
                    {contractorOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Countries */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Number of countries you pay into</label>
                  <select
                    value={formData.countries}
                    onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select range</option>
                    {countryOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1.5">Estimated monthly payout volume</label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-border rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select range</option>
                    {volumeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Payment methods */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">How do you pay today?</label>
                  <div className="space-y-2.5">
                    {paymentMethods.map((method) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={formData.paymentMethods.includes(method)}
                            onChange={() => handleCheckbox(method)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded border border-border bg-white peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                            {formData.paymentMethods.includes(method) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-foreground-secondary group-hover:text-primary transition-colors">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Get My Custom Quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 5: Why We Show Our Pricing ───────────────────────────────────── */

const whyBlocks = [
  {
    title: 'We\'ve done the math',
    body: 'If you\'re comparing us to Deel, Remote, or Papaya Global — we want you to compare with real numbers, not "contact sales" pages. When you see what others actually charge (platform fee + FX + wire fees + add-ons), our €50 flat rate looks different.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Custom ≠ hidden',
    body: 'Your FX rate depends on where you\'re sending money, how much, and how often. That\'s genuinely variable. But "variable" doesn\'t have to mean "opaque." We calculate your rate upfront and lock it in. You\'ll know your exact cost per payout before you sign anything.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Your price is your price',
    body: 'The quote we send you won\'t change at renewal. No bait-and-switch. No "adjusted pricing to reflect market conditions." Same contractors, same corridors, same price. Always.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

function WhyShowPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.h2
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-14 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Hiding prices is a strategy. It&apos;s just not ours.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {whyBlocks.map((block, index) => (
            <div key={index} className="bg-background-secondary rounded-xl p-6 md:p-8">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-5 text-primary">
                {block.icon}
              </div>
              <h3 className="text-base font-display font-bold text-primary mb-3">{block.title}</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">{block.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 6: FAQ ───────────────────────────────────────────────────────── */

const pricingFaqs = [
  {
    question: 'What does the €50 per payout cover?',
    answer: 'Everything. Compliance, contract generation, payment processing, document storage, audit trail, and delivery. No separate line items.',
  },
  {
    question: 'Why is FX conversion a separate rate?',
    answer: 'Because it\'s genuinely variable — it depends on the currency corridor, volume, and frequency. But we lock your rate at signing, so you always know what you\'re paying.',
  },
  {
    question: 'What\'s the minimum commitment?',
    answer: 'None. No annual contracts required. Pay per payout, stop whenever you want.',
  },
  {
    question: 'Can I see my rate before committing?',
    answer: 'Yes. Fill in the form above and we\'ll send your personalized quote. No strings, no follow-up calls unless you want them.',
  },
  {
    question: 'How does this compare to Deel\'s $49/month per contractor?',
    answer: 'Deel charges $49/month per contractor as a platform fee — before FX, wire fees, and add-ons. We charge €50 per payout, all-in. For teams paying contractors monthly, the math tends to favor us. For teams with different rhythms, use the form to get your exact comparison.',
  },
  {
    question: 'What if I need EOR, not just contractor payments?',
    answer: 'We offer EOR services as well. Pricing depends on the country and scope — reach out for a conversation and we\'ll break it down.',
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
          className="text-[32px] md:text-[40px] font-display font-extrabold text-primary text-center mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          The fine print (there isn&apos;t much)
        </motion.h2>
        <motion.p
          className="text-foreground-muted text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

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

/* ─── Section 7: Bottom CTA ────────────────────────────────────────────────── */

function BottomCTA() {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <motion.p
          className="text-base text-foreground-secondary leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get your custom quote. Then compare it to whatever your current provider charges. We&apos;ll wait.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Get My Custom Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors"
          >
            Book a Demo
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
      <CostBreakdown />
      <FXDeepDive />
      <QuoteForm />
      <WhyShowPricing />
      <PricingFAQ />
      <BottomCTA />
      <Footer />
    </main>
  );
}
