/**
 * Pricing comparison section content.
 */

export const pricingContent = {
  headline: {
    before: 'What it costs vs what it ',
    highlight: 'costs',
  },
  currentSystem: {
    title: 'Your Current System',
    lineItems: [
      { label: 'Your time (hours × hourly rate)', value: '$___' },
      { label: 'Wire transfer fees (per transfer)', value: '$___' },
      { label: 'FX spread (hidden costs)', value: '$___' },
      { label: 'Failed payment recovery', value: '$___' },
      { label: 'Compliance consultant (annual)', value: '$___' },
      { label: 'Stress, weekends, sanity', value: 'Priceless', isItalic: true },
    ],
    footer: "Add it up. We'll wait.",
  },
  stape: {
    price: '€50',
    unit: 'per payout',
    benefits: [
      'Transparent forex (mid-market rate + 0.5%)',
      'All compliance included',
      '242 countries supported',
      'Same-day or next-day delivery',
      'Full audit trail',
      'No hidden fees. Ever.',
    ],
  },
  cta: {
    label: 'Calculate Your Real Cost',
    href: '/pricing',
  },
};
