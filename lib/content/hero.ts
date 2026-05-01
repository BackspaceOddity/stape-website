/**
 * Hero section content — editable by client without touching component code.
 */

export const heroContent = {
  socialProof: {
    avatars: [
      {
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
        alt: 'Customer',
      },
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        alt: 'Customer',
      },
      {
        src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face',
        alt: 'Customer',
      },
    ],
    label: 'Trusted by 100+ teams getting their headspace back',
  },
  headline: 'Payroll was never the job you signed up for. We make it disappear',
  subheadline:
    "Kleos is an AI-powered platform for global contractor payroll: compliance, fixed FX rates, tax handling in 240+ countries — we've got it sorted, so you don't have to.",
  cta: {
    primary: {
      label: 'Book a Demo',
      href: '/demo',
    },
    emailPlaceholder: 'Enter your email',
  },
  badges: [
    { label: '242 Countries Covered', icon: 'check-circle' as const },
    { label: 'ISO/IEC 27001 Certified', icon: 'shield' as const },
    { label: '€50 Fixed Per Payout', icon: 'currency' as const },
  ],
};
