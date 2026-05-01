import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Payroll for Web3 & Crypto Companies | Kleos",
  description: "Pay your distributed Web3 team from USDT. Kleos handles contracts, compliance, and crypto-to-fiat conversion across 40+ countries. $50 flat fee per payout.",
  keywords: [
    "web3 contractor payroll",
    "pay developers in crypto",
    "USDT to fiat payroll",
    "contractor of record crypto",
    "web3 team payments",
    "pay remote team USDT",
    "crypto company payroll compliance",
    "DeFi team payroll solution",
  ],
};

export default function Web3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
