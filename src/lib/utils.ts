import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCommissionRate(amount: number): number {
  if (amount <= 10000) return 0.08;
  if (amount <= 50000) return 0.10;
  return 0.12;
}

export function calculateEscrowBreakdown(amount: number) {
  const rate = getCommissionRate(amount);
  const platformFee = Math.round(amount * rate);
  const gst = Math.round(platformFee * 0.18);
  const proEarnings = amount - platformFee;
  return {
    subtotal: amount,
    platformFeeRate: Math.round(rate * 100),
    platformFee,
    gst,
    totalClientPays: amount + gst,
    proEarnings,
  };
}

export function calculateEscrowFee(amount: number) {
  const breakdown = calculateEscrowBreakdown(amount);
  return {
    feePercentage: breakdown.platformFeeRate,
    platformFee: breakdown.platformFee,
    gst: breakdown.gst,
    totalFee: breakdown.platformFee + breakdown.gst,
    talentPayout: breakdown.proEarnings,
  };
}
