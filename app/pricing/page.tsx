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

        <motion.p
          className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Most payroll providers hide pricing behind a &ldquo;Book a Demo&rdquo; button. We&apos;d rather just tell you.
        </motion.p>

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
  'FX conversion no more than 3.5% \u2014 locked at signing',
  'Wire fees included',
  'Off-cycle payments included',
  'Full compliance & audit trail',
  'Auto-generated tax documents',
  'KYC handling',
  '24h onboarding',
  'One B2B invoice for your books',
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
];

function PricingCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background-secondary">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Card 1: Contractor of Record */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card flex flex-col">
            <h3 className="text-lg font-display font-bold text-primary mb-6">Contractor of Record</h3>

            <div className="mb-1">
              <span className="text-[40px] md:text-[48px] font-display font-extrabold text-primary tracking-tight leading-none align-baseline">&euro;50</span>
            </div>
            <p className="text-base text-foreground-secondary mb-1">/ per payout</p>
            <p className="text-sm text-foreground-muted mb-8">Fixed. No monthly fee.</p>

            <a
              href="#"
              className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 border border-border text-primary font-semibold text-sm rounded-md hover:bg-background-secondary transition-colors mb-8"
            >
              Book a Demo
            </a>

            <ul className="space-y-3 flex-1">
              {corFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Employer of Record */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card flex flex-col">
            <h3 className="text-lg font-display font-bold text-primary mb-6">Employer of Record</h3>

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

            <ul className="space-y-3 flex-1">
              {eorFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                  <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
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

/* ─── Section 4: FAQ ─────────────────────────────────────────────────────── */

const pricingFaqs = [
  {
    question: 'What does \u20AC50 per payout cover?',
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
      <PricingFAQ />
      <BottomCTA />
      <Footer />
    </main>
  );
}
