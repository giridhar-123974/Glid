'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  Cpu, 
  Zap,
  X
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

export default function AIProposalGeneratorModal({
  onClose,
  onSelectProForEscrow
}: {
  onClose: () => void;
  onSelectProForEscrow: (pro: Professional) => void;
}) {
  const [promptInput, setPromptInput] = useState('Need a wedding photographer and reels video editor in Hyderabad this Sunday under ₹20,000');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAnalysis, setGeneratedAnalysis] = useState<any | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedAnalysis(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAnalysis({
        projectCategory: 'Wedding Photography & Video Production',
        locationParsed: 'Hyderabad (Hitech City & Gachibowli)',
        estimatedDuration: '1 Day Shoot + 3 Days Post-Production',
        recommendedBudget: '₹16,000 – ₹19,500',
        milestones: [
          { name: 'Milestone 1: 4K Raw Shoot & Footage Handover', amount: '₹10,000', otpProtected: true },
          { name: 'Milestone 2: Final Edited Highlight Reel & Color Grade', amount: '₹7,500', otpProtected: true }
        ],
        topMatches: [
          { pro: PROFESSIONALS[1], matchScore: 99, reason: 'Specializes in 4K wedding shoots & licensed drone coverage with 99 Trust Score.' },
          { pro: PROFESSIONALS[0], matchScore: 96, reason: 'Available now with verified 5.0 rating across 45 projects.' }
        ]
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-[20px] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8EBF0] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors text-sm font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E8EBF0]">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
              GLID NEURAL OPPORTUNITY ENGINE
            </span>
            <h3 className="text-xl font-black text-[#0F172A]">
              AI Smart Proposal & Talent Matcher
            </h3>
          </div>
        </div>

        {/* Input Prompt Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0F172A]">
            Describe what you need in plain English:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Need a full stack Next.js 15 developer in Hyderabad for a fintech MVP in 2 weeks under ₹40,000..."
              className="w-full p-3.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#FF6B00] focus:bg-white resize-none"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full btn-primary py-3 text-xs font-bold shadow-sm flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Analyzing Scope & Matching Verified Specialists...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Smart Contract & Match Talent</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Analysis Results */}
        {generatedAnalysis && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 text-xs">
            
            {/* Scope Breakdown */}
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Category</span>
                <span className="font-bold text-[#0F172A]">{generatedAnalysis.projectCategory}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Timeline</span>
                <span className="font-bold text-[#0F172A]">{generatedAnalysis.estimatedDuration}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Fair Price</span>
                <span className="font-bold text-[#FF6B00]">{generatedAnalysis.recommendedBudget}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Security</span>
                <span className="font-bold text-[#16A34A]">100% Escrow</span>
              </div>
            </div>

            {/* Top Matched Professionals */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Top AI Matched Specialists in Your Area:
              </span>

              <div className="space-y-3">
                {generatedAnalysis.topMatches.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#E8EBF0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.pro.avatarUrl} alt={item.pro.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#0F172A]">{item.pro.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] font-black text-[10px]">
                            {item.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5">{item.reason}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProForEscrow(item.pro);
                      }}
                      className="btn-primary px-4 py-2 text-xs font-bold whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Lock Escrow (₹{item.pro.hourlyRateINR * 4})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
