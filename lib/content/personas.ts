/**
 * Persona / "How deep do you want to go?" section content.
 */

export const personasContent = {
  headline: 'How deep do you want to go?',
  subheadline: 'Choose your payroll involvement level',
  characters: [
    {
      id: 'founder',
      role: 'Founder / CEO',
      level: "I don't want to know",
      tagline: 'Just tell me everyone got paid',
      description:
        'Your contractors get legalized income for residence permits and Digital Nomad visas — automatically. Your investors see a clean audit trail. Your team grows from 15 to 70, and the payment process stays invisible. You never open a spreadsheet again.',
      iconName: 'rocket' as const,
      accent: 'bg-accent',
    },
    {
      id: 'hiring',
      role: 'Hiring Manager',
      level: "Slack ping when it's done",
      tagline: 'One notification. Zero spreadsheets.',
      description:
        "Your candidate in Tbilisi doesn't wait 3 weeks for a contract. Your senior engineer in Buenos Aires stops DMing you about late payments. You get a Slack notification that everyone's paid, and you go back to building product.",
      iconName: 'bell' as const,
      accent: 'bg-blue-100',
    },
    {
      id: 'cfo',
      role: 'CFO / Finance',
      level: 'Show me everything',
      tagline: 'Full dashboard, every currency, every audit line',
      description:
        "One B2B invoice instead of hundreds of contracts. VAT offset works in your favor. FX at mid-market + 0.5%, visible before you confirm. Complete audit trail. When the auditor asks how you pay people in 23 countries, you show them one vendor relationship.",
      iconName: 'chart' as const,
      accent: 'bg-emerald-100',
    },
    {
      id: 'hr',
      role: 'HR Manager',
      level: 'Auto-pilot mode',
      tagline: 'Contracts, docs, compliance — all handled',
      description:
        "You stop managing a zoo of 4 providers across 12 countries. Every contractor gets paid on the promised day, in the promised amount. Compliance documents generate automatically. You go from \"payroll specialist who also does HR\" back to \"HR leader.\"",
      iconName: 'settings' as const,
      accent: 'bg-violet-100',
    },
  ],
};
