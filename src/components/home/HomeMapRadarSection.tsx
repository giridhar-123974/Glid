'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Navigation, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Lock, 
  Clock, 
  Radio,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';
import EscrowModal from '@/components/profile/EscrowModal';

export default function HomeMapRadarSection() {
  const [selectedPro, setSelectedPro] = useState<Professional>(PROFESSIONALS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'available_now' | 'emergency'>('all');
  const [selectedForEscrow, setSelectedForEscrow] = useState<Professional | null>(null);

  const filteredPros = PROFESSIONALS.filter(p => {
    if (filterMode === 'available_now') return p.liveStatus === 'available_now';
    if (filterMode === 'emergency') return p.liveStatus === 'emergency';
    return true;
  });

  return (
    <section className="py-24 bg-white border-b border-[#ECECEC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-[#EA580C] text-xs font-black uppercase tracking-wider border border-orange-200">
              <Navigation className="w-3.5 h-3.5 text-[#F97316]" />
              Rapido & Uber-Style Live Discovery
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Hyperlocal Live Radar & Instant Dispatch
            </h2>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed">
              Finding a verified specialist is as fast as booking a cab. Real-time GPS distance, live availability status, and zero upfront risk.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#FAFAFA] p-1.5 rounded-2xl border border-[#ECECEC]">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                filterMode === 'all' ? 'bg-[#111827] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Nearby ({PROFESSIONALS.length})
            </button>
            <button
              onClick={() => setFilterMode('available_now')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                filterMode === 'available_now' ? 'bg-[#111827] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available Now
            </button>
            <button
              onClick={() => setFilterMode('emergency')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                filterMode === 'emergency' ? 'bg-[#111827] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Emergency (1h)
            </button>
          </div>
        </div>

        {/* Interactive Map Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Vector Display (Left 7 Cols) */}
          <div className="lg:col-span-7 h-[460px] rounded-[24px] bg-[#071A12] border border-gray-800 relative overflow-hidden shadow-2xl p-6 flex flex-col justify-between select-none">
            
            {/* Grid Mesh Lines (Vector Map Illusion) */}
            <div className="absolute inset-0 bg-[radial-gradient(#16A34A_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
            
            {/* User Center Radar Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-emerald-500/20 animate-ping opacity-30" />
              <div className="w-32 h-32 rounded-full border border-emerald-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-[10px] shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ring-4 ring-orange-500/20">
                📍
              </div>
            </div>

            {/* Top Map Location Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold flex items-center gap-2 shadow-md">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Radar: Hitech City, Hyderabad (5 KM Radius)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                {filteredPros.length} Pros in Range
              </span>
            </div>

            {/* Interactive Animated Pin Markers on Canvas */}
            <div className="relative z-10 h-full w-full my-auto flex items-center justify-around">
              {filteredPros.slice(0, 4).map((pro, idx) => {
                const isSelected = selectedPro.id === pro.id;
                const emoji = 
                  pro.category === 'tech' ? '💻' :
                  pro.category === 'creators' ? '📷' :
                  pro.category === 'design' ? '🎨' :
                  pro.category === 'home_services' ? '⚡' : '💼';

                return (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedPro(pro)}
                    className={`transition-all duration-300 transform flex flex-col items-center gap-1.5 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className={`px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border ${
                      isSelected
                        ? 'bg-[#F97316] text-white border-white ring-4 ring-orange-500/30 font-black'
                        : 'bg-white text-gray-900 border-gray-200 font-bold'
                    }`}>
                      <span className="text-sm">{emoji}</span>
                      <span className="text-[11px] truncate max-w-[80px]">{pro.name.split(' ')[0]}</span>
                      <span className="text-[9px] opacity-80">{pro.distanceKm || 2.1}km</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-md" />
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Controls */}
            <div className="relative z-10 flex items-center justify-between text-xs text-gray-400 font-semibold pt-2 border-t border-white/10">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live GPS Coordinates Active
              </span>
              <Link href="/explore?view=map" className="text-white hover:text-[#F97316] font-bold flex items-center gap-1">
                Open Fullscreen Interactive Map <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

          {/* Selected Pro Interactive Card (Right 5 Cols) */}
          <div className="lg:col-span-5 p-8 rounded-[24px] bg-[#FAFAFA] border border-[#ECECEC] shadow-card space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-md flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedPro.avatarUrl} alt={selectedPro.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-black text-gray-900 truncate">{selectedPro.name}</h3>
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                </div>
                <p className="text-xs font-semibold text-gray-500 truncate mt-0.5">{selectedPro.headline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-black text-[#EA580C] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Trust Score {selectedPro.trustScore}%
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    4.98 (120+ reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#ECECEC] text-xs font-bold">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Arrival</span>
                <span className="text-sm font-black text-gray-900 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  {selectedPro.distanceKm ? Math.round(selectedPro.distanceKm * 4 + 10) : 20} mins
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Rate Card</span>
                <span className="text-sm font-black text-gray-900 mt-0.5 block">
                  ₹{selectedPro.hourlyRateINR.toLocaleString()}/hr
                </span>
              </div>
            </div>

            {/* Direct Escrow Actions */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={`/profile/${selectedPro.id}`}
                className="w-1/2 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-[#ECECEC] text-xs font-black text-center shadow-subtle transition-colors"
              >
                View Full Profile
              </Link>
              <button
                onClick={() => setSelectedForEscrow(selectedPro)}
                className="w-1/2 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-1.5 btn-magnetic"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Instant Escrow Hire</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Escrow Modal Trigger */}
      {selectedForEscrow && (
        <EscrowModal
          professional={selectedForEscrow}
          isOpen={true}
          onClose={() => setSelectedForEscrow(null)}
        />
      )}
    </section>
  );
}
