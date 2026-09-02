'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  BadgePercent, 
  ArrowRight, 
  Building2, 
  UserCheck, 
  FileCheck2, 
  CreditCard,
  Scale,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { formatINR, calculateEscrowBreakdown } from '@/lib/utils';

export default function EscrowGuaranteePage() {
  const [sampleAmount, setSampleAmount] = useState<number>(50000);
  const breakdown = calculateEscrowBreakdown(sampleAmount);

  return (
    <div className="py-12 bg-[#F8FAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCFCE7] text-[#0F5132] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            100% RBI-Compliant Escrow Protection
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Trust & Escrow Infrastructure
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            GLID eliminates fraud, non-payment, and substandard deliverables through verified identity scoring and bank-held escrow milestones.
          </p>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#0F5132] flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Multi-Factor Identity KYC</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every talent profile undergoes Govt ID verification (PAN / Aadhaar / Passport) along with verified GitHub commits, LinkedIn profiles, and verified client history.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#0F5132] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Bank-Held Escrow Vault</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Client payments are held in an escrow trustee account. Funds are never released to the freelancer until the client tests, inspects, and approves deliverables.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#0F5132] flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Dispute Mediation Desk</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              If scope disagreements occur, GLID’s neutral technical review board audits original milestone specifications and code artifacts to ensure fair resolution with zero chargeback fraud.
            </p>
          </div>
        </div>

        {/* Interactive Fee Breakdown Calculator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F5132] to-[#14532D] text-white shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Platform Commission & Fee Simulator
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                GLID’s transparent tiered fee structure rewards high-value partnerships with lower rates. Test your project amount below:
              </p>

              <div className="pt-2 space-y-2">
                <label className="text-xs font-bold text-emerald-200 uppercase">Adjust Contract Amount:</label>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={sampleAmount}
                  onChange={(e) => setSampleAmount(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-emerald-300 font-mono">
                  <span>₹10,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl p-6 text-gray-900 shadow-xl space-y-3">
              <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
                <span className="text-gray-600">Contract Value:</span>
                <span className="font-extrabold text-gray-900 font-mono">{formatINR(breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tier Fee ({breakdown.platformFeeRate}%):</span>
                <span className="font-semibold text-gray-900 font-mono">{formatINR(breakdown.platformFee)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 text-xs">
                <span>GST (18% on platform fee):</span>
                <span className="font-mono">{formatINR(breakdown.gst)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-base">
                <span className="font-extrabold text-[#0F5132]">Freelancer Net Earnings:</span>
                <span className="text-xl font-extrabold text-[#0F5132] font-mono">{formatINR(breakdown.proEarnings)}</span>
              </div>

              <div className="pt-3">
                <Link
                  href="/explore"
                  className="w-full py-3 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Start Protected Milestone</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
