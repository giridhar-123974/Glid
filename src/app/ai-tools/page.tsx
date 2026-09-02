'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Users, 
  FileText, 
  Calculator, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Bot, 
  Layers,
  ShieldCheck
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<'squad' | 'proposal' | 'bio' | 'pricing'>('squad');

  // Tool 1: Squad Builder State
  const [startupPrompt, setStartupPrompt] = useState('AI Telemedicine & Prescription SaaS for Indian Tier-2 Clinics');
  const [isGeneratingSquad, setIsGeneratingSquad] = useState(false);
  const [generatedSquad, setGeneratedSquad] = useState<any[]>([
    { role: 'Senior Product UI/UX Designer', pro: PROFESSIONALS[1], budget: 42000, weeks: 2, tasks: 'User journey, doctor prescription flow, clinic dashboard Figma tokens' },
    { role: 'Full Stack & AI Engineer', pro: PROFESSIONALS[0], budget: 65000, weeks: 3, tasks: 'Next.js 15 app, FastAPI OCR prescription analyzer, Razorpay integration' },
    { role: 'CA & Compliance Advisor', pro: PROFESSIONALS[4], budget: 15000, weeks: 1, tasks: 'DISHA compliance audit, GST registration, Doctor agreement drafting' }
  ]);

  // Tool 2: Proposal Generator State
  const [clientRequirement, setClientRequirement] = useState('Looking for a Next.js 15 developer to build an escrow payment flow with Razorpay and Postgres database in 10 days.');
  const [generatedProposal, setGeneratedProposal] = useState(
    `Dear Client,\n\nI reviewed your requirement for the Next.js 15 escrow payment system. Having engineered production fintech microservices handling ₹18Cr+/mo with Razorpay, I can deliver a robust, idempotent solution well within your 10-day timeline.\n\nProposed 3-Phase Milestone Plan:\n• Milestone 1 (Day 1-3): Architecture, PostgreSQL schema & secure Auth\n• Milestone 2 (Day 4-7): Razorpay webhook state machine & Escrow Vault logic\n• Milestone 3 (Day 8-10): End-to-end testing, error recovery & production release\n\nAll deliverables include 100% test coverage and 30-day post-launch support.\n\nLooking forward to collaborating via GLID Escrow.\nBest regards,\nArjun Swaminathan (GLID Trust Score: 99%)`
  );
  const [copied, setCopied] = useState(false);

  const handleGenerateSquad = () => {
    setIsGeneratingSquad(true);
    setTimeout(() => {
      setIsGeneratingSquad(false);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-[#F8FAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCFCE7] text-[#0F5132] text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-[#16A34A]" />
            GLID AI Intelligence Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            AI-Driven Opportunity Engines
          </h1>
          <p className="text-gray-600 text-base">
            Enterprise-grade AI utilities designed to accelerate hiring, team assembly, proposals, and market rate discovery.
          </p>
        </div>

        {/* Tool Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { id: 'squad', label: 'Startup Squad Builder', icon: Users, desc: 'Assemble complete cross-functional teams' },
            { id: 'proposal', label: 'AI Proposal Writer', icon: FileText, desc: 'Generate winning client proposals' },
            { id: 'bio', label: 'Bio & Portfolio AI', icon: Sparkles, desc: 'Craft high-converting headlines' },
            { id: 'pricing', label: 'Market Rate Benchmarker', icon: Calculator, desc: 'Explore live Indian city rates' },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[#16A34A] shadow-premium ring-2 ring-emerald-500/20'
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-2xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isActive ? 'bg-[#0F5132] text-white' : 'bg-[#DCFCE7] text-[#0F5132]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{tool.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* TOOL 1: STARTUP SQUAD BUILDER */}
        {activeTool === 'squad' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-extrabold text-gray-900">
                AI Startup Squad Builder
              </h2>
              <p className="text-sm text-gray-600">
                Describe the product you want to build. GLID AI analyzes the required tech stack, legal constraints, and design complexity to assemble a pre-vetted squad.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  value={startupPrompt}
                  onChange={(e) => setStartupPrompt(e.target.value)}
                  placeholder="e.g. Fintech Quick Commerce app with Flutter and UPI payments..."
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#0F5132]"
                />
                <button
                  onClick={handleGenerateSquad}
                  disabled={isGeneratingSquad}
                  className="px-6 py-3 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isGeneratingSquad ? 'Synthesizing Squad...' : 'Generate Squad'}</span>
                </button>
              </div>
            </div>

            {/* Generated Squad Output */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Recommended Multi-Disciplinary Squad</span>
                  <span className="text-xs bg-[#DCFCE7] text-[#0F5132] font-bold px-2 py-0.5 rounded-full">
                    3 Verified Pros
                  </span>
                </h3>
                <div className="text-xs font-semibold text-gray-600">
                  Total Estimated Budget: <strong className="text-base text-[#0F5132]">₹1,22,000</strong> (3-Week Sprint)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedSquad.map((member, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#F8FAF8] border border-gray-200 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-extrabold text-[#0F5132] uppercase tracking-wider block">
                        {member.role}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={member.pro.avatarUrl} alt={member.pro.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{member.pro.name}</div>
                          <div className="text-xs text-emerald-700 font-semibold">{member.pro.trustScore}% Trust Score</div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        <strong>Key Focus:</strong> {member.tasks}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Allocation</span>
                        <span className="font-bold text-gray-900">{formatINR(member.budget)}</span>
                      </div>
                      <Link
                        href={`/profile/${member.pro.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#DCFCE7] text-[#0F5132] font-bold hover:bg-[#0F5132] hover:text-white transition-colors text-[11px]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>One-click consolidated escrow milestone contract available for this entire team.</span>
                </div>
                <Link
                  href="/explore?action=hire-squad"
                  className="px-6 py-2.5 rounded-xl bg-[#0F5132] text-white font-bold text-xs shadow-xs hover:scale-105 transition-all whitespace-nowrap"
                >
                  Initiate Squad Escrow (₹1,22,000)
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: PROPOSAL GENERATOR */}
        {activeTool === 'proposal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-extrabold text-gray-900">
                AI Winning Proposal Generator
              </h2>
              <p className="text-sm text-gray-600">
                Paste client requirements to generate high-converting, milestone-focused proposals with clear timelines and deliverables.
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                rows={3}
                value={clientRequirement}
                onChange={(e) => setClientRequirement(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#0F5132]"
                placeholder="Paste client project description here..."
              />

              <div className="p-6 rounded-2xl bg-gray-900 text-gray-100 font-mono text-xs relative space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                  <span className="text-emerald-400 font-bold">✨ Generated Pitch & Milestone Agreement</span>
                  <button
                    onClick={() => copyToClipboard(generatedProposal)}
                    className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Proposal'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-gray-300">{generatedProposal}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: BIO & PORTFOLIO AI */}
        {activeTool === 'bio' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-extrabold text-gray-900">
              AI Professional Bio & Headline Optimizer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Input Raw Notes</span>
                <p className="text-xs text-gray-600">"I do video editing, have cut 200+ youtube videos for tech creators, use DaVinci Resolve and After Effects."</p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> High-Converting AI Headline
                </span>
                <p className="text-sm font-bold text-[#0F5132]">
                  "Lead YouTube & Commercial Video Editor | 200M+ Views Driven | DaVinci Colorist & Motion Graphics"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 4: PRICING BENCHMARKER */}
        {activeTool === 'pricing' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Indian Market Rate Benchmarking Engine
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500">Tier-1 Metro (Bengaluru / Mumbai)</span>
                <div className="text-2xl font-extrabold text-[#0F5132]">₹2,500 – ₹4,500/hr</div>
                <p className="text-xs text-gray-500">Senior Engineers & Product Designers</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500">Tier-2 Cities (Pune / Hyderabad / Jaipur)</span>
                <div className="text-2xl font-extrabold text-[#0F5132]">₹1,500 – ₹2,800/hr</div>
                <p className="text-xs text-gray-500">Experienced Developers & Marketers</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500">Student / Junior Verified</span>
                <div className="text-2xl font-extrabold text-[#0F5132]">₹600 – ₹1,200/hr</div>
                <p className="text-xs text-gray-500">Entry-level verified portfolio talent</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
