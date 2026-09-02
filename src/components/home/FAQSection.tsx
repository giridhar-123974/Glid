'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/mockData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#DCFCE7] text-[#0F5132] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Everything You Need to Know About GLID
          </h2>
          <p className="text-gray-600 mt-2 text-base">
            Clear answers about identity verification, escrow protection, and AI matching.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left bg-white hover:bg-gray-50 flex items-center justify-between gap-4 font-bold text-gray-900 text-base transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0F5132]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 bg-white text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
