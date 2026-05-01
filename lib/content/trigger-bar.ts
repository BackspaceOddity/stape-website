/**
 * TriggerBar (pain-point sticky notes) content.
 */

export interface Situation {
  id: string;
  text: string;
  reactions: {
    yes: number;
    no: number;
    fire: number;
  };
}

export const triggerBarContent = {
  headline: 'Any of this sound painfully familiar?',
  subheadline: "Say it as it is. We're curious, not judgemental.",
  engagementCta: {
    text: "More than one? That's a pattern.",
    linkText: 'We built Kleos for exactly this →',
    href: '/demo',
  },
  minReactionsForCta: 2,
  situations: [
    {
      id: 'keep-running',
      text: "Your payment provider just froze payouts. Your team still needs to get paid on Friday. You have no Plan B.",
      reactions: { yes: 304, no: 42, fire: 128 },
    },
    {
      id: 'hire-anywhere',
      text: "You found the perfect engineer in São Paulo. Now you're stuck figuring out how to pay them in reais — legally, on time, and without losing on conversion.",
      reactions: { yes: 267, no: 58, fire: 94 },
    },
    {
      id: 'mental-drain',
      text: "Your finance team is sending 200 contractor payments manually. CSV uploads, bank transfers, payment confirmations. It takes two days. Every month.",
      reactions: { yes: 412, no: 31, fire: 189 },
    },
    {
      id: 'patchwork',
      text: "Wise for EU. Local transfers for LATAM. A spreadsheet to track it all. You know this won't survive 50 people.",
      reactions: { yes: 378, no: 39, fire: 167 },
    },
    {
      id: 'compliance-blind',
      text: "You pay contractors in 12 countries. If an auditor asked for proof of compliance today, you'd panic.",
      reactions: { yes: 289, no: 63, fire: 112 },
    },
    {
      id: 'provider-roulette',
      text: "Your provider just raised prices mid-contract. Now you're explaining budget overruns you never planned for.",
      reactions: { yes: 341, no: 44, fire: 143 },
    },
    {
      id: 'risky-geos',
      text: "Your best developers are in places most providers won't touch. You need someone who actually operates there.",
      reactions: { yes: 198, no: 89, fire: 67 },
    },
    {
      id: 'hostage',
      text: "You can't hire who you want, where you want, because payroll complexity is making decisions for you.",
      reactions: { yes: 356, no: 47, fire: 156 },
    },
  ] satisfies Situation[],
};
