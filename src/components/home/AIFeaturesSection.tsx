'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Users, 
  Search, 
  FileCheck, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Bot,
  BrainCircuit,
  Layers
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';

export default function AIFeaturesSection() {
  const [activeTab, setActiveTab] = useState<'team' | 'search' | 'proposal' | 'pricing'>('team');

  // AI Team Builder Demo State
  const [startupIdea, setStartupIdea] = useState('AI Legal Document Reviewer SaaS');

  return (
    <section className="py-20 bg-[#F8FAF8] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-200/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#0F5132] text-xs font-bold uppercase tracking-wider mb-3">
            <BrainCircuit className="w-4 h-4 text-[#16A34A]" />
            GLID AI Intelligence Core
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            AI-Powered Opportunity Operating System
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Move beyond manual searches. GLID automates talent matching, team formation, proposal writing, and smart escrow agreements.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { id: 'team', label: 'AI Startup Squad Builder', icon: Users },
            { id: 'search', label: 'AI Natural Language Search', icon: Search },
            { id: 'proposal', label: 'AI Proposal Generator', icon: FileCheck },
            { id: 'pricing', label: 'AI Market Rate Calculator', icon: Calculator },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 shadow-xs ${
                  isActive
                    ? 'bg-[#0F5132] text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-emerald-700'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Display Panel */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#0F5132]/20 shadow-premium">
          
          {/* TAB 1: AI Startup Squad Builder */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Instant Squad Assembly
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  Assemble a Complete Startup Team in 30 Seconds
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Provide your product vision or MVP requirements. GLID AI identifies the exact role matrix (UI Designer, Full Stack Dev, Cloud Architect, QA) and matches verified talent with a consolidated budget.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Sample Project Vision:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'AI Legal SaaS MVP',
                      'Fintech Neobank App',
                      'D2C Brand & Video Launch'
                    ].map((idea) => (
                      <button
                        key={idea}
                        onClick={() => setStartupIdea(idea)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          startupIdea === idea
                            ? 'bg-[#DCFCE7] text-[#0F5132] border-[#16A34A]'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/ai-tools"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white text-sm font-bold transition-all shadow-sm"
                  >
                    <span>Launch AI Team Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual Generated Team Simulation */}
              <div className="lg:col-span-7 bg-[#F8FAF8] p-5 sm:p-6 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Generated Squad for:</span>
                    <h4 className="text-base font-bold text-gray-900">{startupIdea}</h4>
                  </div>
                  <span className="text-xs font-bold bg-[#DCFCE7] text-[#0F5132] px-2.5 py-1 rounded-full">
                    Estimated Budget: ₹1,42,000 (3 Weeks)
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { role: 'Product UI/UX Designer', name: 'Priyanka Sen', match: '98% Match', price: '₹42,000', icon: '🎨' },
                    { role: 'Full Stack & AI Engineer', name: 'Arjun Swaminathan', match: '99% Match', price: '₹65,000', icon: '💻' },
                    { role: 'CA & Startup Advisor', name: 'CA Vikramaditya Rao', match: '97% Match', price: '₹15,000', icon: '💼' },
                    { role: 'Performance Marketer', name: 'Ananya Sharma', match: '96% Match', price: '₹20,000', icon: '📈' },
                  ].map((member, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between shadow-2xs hover:border-emerald-500 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{member.icon}</div>
                        <div>
                          <div className="text-xs font-bold text-[#0F5132]">{member.role}</div>
                          <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600 block">{member.match}</span>
                        <span className="text-xs text-gray-600 font-medium">{member.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All 4 profiles verified & available
                  </span>
                  <span className="font-mono text-[11px]">Consolidated Escrow Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI Natural Language Search */}
          {activeTab === 'search' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  Natural Intent Semantic Search
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Forget keyword guessing. State your business problem in conversational English or regional language and GLID AI extracts technical parameters, timeline requirements, and budget constraints automatically.
                </p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-bold block">Input query:</span>
                  <p className="italic">"We need a top-rated video editor who knows DaVinci Resolve and has edited tech YouTube videos for Indian channels."</p>
                </div>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5132] text-white text-sm font-bold"
                >
                  Try AI Search Live <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase">AI Extracted Filter Matrix</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-400 block">Primary Skill</span>
                    <span className="font-bold text-gray-800">DaVinci Resolve / 4K</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-400 block">Category</span>
                    <span className="font-bold text-gray-800">Photography & Video</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-400 block">Min Trust Score</span>
                    <span className="font-bold text-emerald-700">95%+ Verified</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-400 block">Portfolio Match</span>
                    <span className="font-bold text-gray-800">Tech & YouTube Content</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI Proposal Generator */}
          {activeTab === 'proposal' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  AI Winning Proposal Generator
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Save hours on drafting pitches. Professionals on GLID can generate tailored, value-first proposals that highlight their relevant portfolio case studies and milestone deliverables.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3.4x higher client response rate on verified bids
                </div>
              </div>
              <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-gray-200 font-mono text-xs text-gray-700 space-y-2">
                <div className="text-emerald-700 font-bold">✨ AI Drafted Milestone Proposal:</div>
                <div className="p-3 bg-white rounded border border-gray-200 space-y-1">
                  <p><strong>Milestone 1 (Day 1-4):</strong> Architecture, DB Schema & Next.js 15 App Scaffold (₹25,000)</p>
                  <p><strong>Milestone 2 (Day 5-10):</strong> Gemini AI Pipeline & Auth Integration (₹25,000)</p>
                  <p><strong>Milestone 3 (Day 11-14):</strong> Escrow Security Audit & Production Release (₹15,000)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI Pricing & Rate Assistant */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  Real-time Market Rate Intelligence
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  GLID AI benchmarks live market rates across 65+ Indian cities and remote standards so neither clients overpay nor professionals undervalue their craft.
                </p>
              </div>
              <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="text-xs font-bold text-gray-700">Market Rate Benchmark for: Full Stack Next.js (5+ yrs)</div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-300 w-1/3" title="Junior: ₹800-₹1500/hr" />
                  <div className="bg-emerald-600 w-1/3" title="Mid-Senior: ₹2000-₹3500/hr" />
                  <div className="bg-emerald-900 w-1/3" title="Lead/Architect: ₹3500-₹6000/hr" />
                </div>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>₹800/hr (Junior)</span>
                  <span className="font-bold text-[#0F5132]">₹2,500/hr (Median)</span>
                  <span>₹5,000+/hr (Elite)</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
