import React from 'react';
import { Search, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Search & AI Match',
      desc: 'Find verified talent nearby with real-time GPS distance, verified DigiLocker Aadhaar KYC, and portfolio reviews.'
    },
    {
      num: '02',
      title: 'Fund Safe Bank Escrow',
      desc: 'Deposit milestone funds into an RBI-compliant trustee bank escrow account. Zero upfront release risk.'
    },
    {
      num: '03',
      title: 'Inspect, Approve & Release',
      desc: 'Review deliverables, request revisions if needed, and disburse funds with your authenticated cryptographic OTP.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How GLID Works
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Built for total trust between clients and independent professionals.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200/70 shadow-2xs space-y-4">
              <span className="text-xs font-mono font-black text-[#F97316]">
                STEP {step.num}
              </span>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/escrow-guarantee"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-[#F97316] transition-colors"
          >
            <span>Learn more about the 100% Escrow Guarantee</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
