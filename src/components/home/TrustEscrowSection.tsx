'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Fingerprint,
  Cpu,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { calculateEscrowFee, formatINR } from '@/lib/utils';

export default function TrustEscrowSection() {
  const [projectAmount, setProjectAmount] = useState<number>(50000);
  const feeDetails = calculateEscrowFee(projectAmount);

  const trustPillars = [
    {
      icon: Fingerprint,
      title: 'Aadhaar & DigiLocker KYC',
      desc: '100% of professionals are identity-verified via Govt DigiLocker, PAN, and address compliance checks.'
    },
    {
      icon: Lock,
      title: 'RBI-Compliant Bank Escrow',
      desc: 'Funds are securely locked in institutional trustee escrow accounts until milestones are explicitly approved.'
    },
    {
      icon: KeyRound,
      title: 'OTP Service Release Protocol',
      desc: 'Milestone disbursements require authenticated cryptographic OTP approval from both parties upon delivery.'
    },
    {
      icon: Cpu,
      title: 'AI Code & Work Audit',
      desc: 'Our AI engine analyzes GitHub repositories and media deliverables to verify authenticity before handover.'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-[#ECECEC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-[#EA580C] text-xs font-black uppercase tracking-wider border border-orange-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
            Institutional Trust Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            100% Escrow & Identity Protection
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Eliminating freelancer ghosting and unpaid client invoices through programmatic bank escrow.
          </p>
        </div>

        {/* 4 Trust Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] shadow-card hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#ECECEC] text-[#EA580C] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-subtle">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-[#EA580C] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECECEC] flex items-center gap-1.5 text-[11px] font-bold text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed by GLID</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Escrow Fee Calculator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black text-[#EA580C] uppercase tracking-wider">
                  Transparent Tiered Commission
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Calculate Your Escrow Payout
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Traditional platforms take 20% flat. GLID charges a tiered rate as low as 8% for high-value enterprise contracts.
                </p>
              </div>

              {/* Slider Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-700">Contract Value:</span>
                  <span className="text-xl font-black text-gray-900 font-mono bg-white border border-[#ECECEC] px-3 py-1 rounded-xl shadow-subtle">
                    {formatINR(projectAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={projectAmount}
                  onChange={(e) => setProjectAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                  <span>₹5,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#ECECEC] shadow-subtle space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-100">
                <span className="text-gray-600">Platform Escrow Fee ({feeDetails.feePercentage}%)</span>
                <span className="font-mono font-bold text-gray-900">₹{feeDetails.platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-100">
                <span className="text-gray-600">GST (18% on Fee)</span>
                <span className="font-mono font-bold text-gray-900">₹{feeDetails.gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                    Talent Net Take-Home
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#111827] font-mono">
                    ₹{feeDetails.talentPayout.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-[#EA580C] text-xs font-black border border-orange-200">
                    Saved ₹{(projectAmount * 0.20 - feeDetails.totalFee).toLocaleString()} vs Fiverr
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
