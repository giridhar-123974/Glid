'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Zap, 
  Navigation, 
  CheckCircle2, 
  Lock, 
  MessageSquare, 
  ArrowRight, 
  Layers, 
  Plus, 
  Minus,
  Crosshair
} from 'lucide-react';
import { Professional } from '@/types';
import { formatINR } from '@/lib/utils';

interface InteractiveMapViewProps {
  professionals: Professional[];
  userLocationName?: string;
  selectedPro: Professional | null;
  onSelectPro: (pro: Professional | null) => void;
  radiusKm?: number;
}

const CATEGORY_EMOJI: Record<string, string> = {
  'Software & Technology': '💻',
  'Design & Creative': '🎨',
  'Photography & Videography': '📷',
  'Marketing & Growth': '📈',
  'Business Services': '💼',
  'Education & Coaching': '🎓',
  'Media & Content': '🎬',
  'Audio & Music': '🎵',
};

export default function InteractiveMapView({
  professionals,
  userLocationName = 'Hitech City, Hyderabad',
  selectedPro,
  onSelectPro,
  radiusKm = 10,
}: InteractiveMapViewProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'standard' | 'satellite' | 'heatmap'>('standard');

  // Simulated GPS relative placement points on map canvas (normalized percentages)
  const pinPositions = [
    { top: 48, left: 45 },
    { top: 38, left: 52 },
    { top: 56, left: 38 },
    { top: 32, left: 42 },
    { top: 62, left: 58 },
    { top: 44, left: 66 },
    { top: 68, left: 34 },
  ];

  return (
    <div className="relative w-full h-[600px] lg:h-[720px] rounded-3xl overflow-hidden border border-[#0F5132]/20 shadow-premium bg-[#0c1f17] select-none">
      
      {/* MAP BACKGROUND CANVAS (Uber/Rapido Dark-Emerald Styled Map Grid) */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Vector Grid Road Network Overlay */}
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#16A34A" strokeWidth="0.7" opacity="0.35" />
            </pattern>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0F5132" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#071810" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Arterial Highway Lines (Simulating Hyderabad ORR / Hitech City corridor) */}
          <path d="M 0,200 Q 300,320 600,280 T 1200,450" fill="none" stroke="url(#roadGrad)" strokeWidth="6" />
          <path d="M 200,0 Q 380,300 450,700" fill="none" stroke="#14532D" strokeWidth="4" />
          <path d="M 700,50 Q 620,380 900,650" fill="none" stroke="#16A34A" strokeWidth="3" opacity="0.7" />
          <path d="M 0,550 Q 500,480 1100,580" fill="none" stroke="#14532D" strokeWidth="5" />
        </svg>

        {/* User Current Location Radar / Pulsing Ring */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative flex items-center justify-center">
            {/* Radius Coverage Circle */}
            <div className="w-72 h-72 rounded-full border border-emerald-500/30 bg-emerald-500/10 animate-ping duration-1000 opacity-30" />
            <div className="absolute w-44 h-44 rounded-full border-2 border-emerald-400/40 bg-emerald-500/15" />
            
            {/* User Blue/Emerald Dot */}
            <div className="absolute w-6 h-6 rounded-full bg-emerald-400 border-3 border-white shadow-glow flex items-center justify-center animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0F5132]" />
            </div>
          </div>
        </div>

        {/* Dynamic Professional Markers */}
        {professionals.map((pro, idx) => {
          const pos = pinPositions[idx % pinPositions.length];
          const isSelected = selectedPro?.id === pro.id;
          const emoji = CATEGORY_EMOJI[pro.category] || '⚡';

          return (
            <div
              key={pro.id}
              onClick={() => onSelectPro(pro)}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-transform duration-200 hover:scale-125"
            >
              {/* Marker Pin */}
              <div className={`relative flex flex-col items-center ${isSelected ? 'scale-125 z-30' : ''}`}>
                
                {/* Price / Subcategory Badge on Top */}
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-md mb-1 whitespace-nowrap flex items-center gap-1 transition-all ${
                  isSelected 
                    ? 'bg-white text-[#0F5132] ring-2 ring-emerald-400'
                    : 'bg-[#0F5132] text-white group-hover:bg-white group-hover:text-[#0F5132]'
                }`}>
                  <span>{formatINR(pro.startingPriceINR)}</span>
                  {pro.liveStatus === 'emergency' && <span className="text-amber-400">⚡</span>}
                </div>

                {/* Pin Circle with Category Emoji & Live Status Border */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xl relative transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-br from-emerald-400 to-[#16A34A] text-white ring-4 ring-emerald-300'
                    : 'bg-white text-gray-900 border-2 border-emerald-500'
                }`}>
                  <span>{emoji}</span>

                  {/* Live Status indicator dot */}
                  <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    pro.liveStatus === 'available_now' ? 'bg-emerald-500 animate-pulse' :
                    pro.liveStatus === 'emergency' ? 'bg-amber-500 animate-bounce' :
                    'bg-blue-500'
                  }`} />
                </div>

                {/* Pin Pointer Arrow */}
                <div className={`w-2 h-2 rotate-45 -mt-1 ${isSelected ? 'bg-emerald-400' : 'bg-emerald-500'}`} />

              </div>
            </div>
          );
        })}

      </div>

      {/* TOP CONTROLS BAR (Overlay) */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        
        {/* User Location Radar Badge */}
        <div className="px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-emerald-500/40 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-300">Searching within {radiusKm} KM of:</span>
          <strong className="text-white">{userLocationName}</strong>
        </div>

        {/* Live Active Nearby Pros Counter */}
        <div className="px-4 py-2 rounded-2xl bg-[#0F5132]/90 backdrop-blur-md border border-emerald-400/40 text-white text-xs font-bold flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{professionals.length} Verified Pros Nearby</span>
        </div>
      </div>

      {/* MAP FLOATING CONTROLS (Zoom & Recenter) */}
      <div className="absolute right-4 bottom-24 sm:bottom-6 z-30 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
          className="w-10 h-10 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 text-white hover:bg-emerald-600 flex items-center justify-center shadow-lg transition-colors"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
          className="w-10 h-10 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 text-white hover:bg-emerald-600 flex items-center justify-center shadow-lg transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="w-10 h-10 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 flex items-center justify-center shadow-lg transition-colors"
          title="Recenter Map"
        >
          <Crosshair className="w-5 h-5" />
        </button>
      </div>

      {/* RAPIDO / AIRBNB FLOATING PRO DETAIL CARD (When Pin is Clicked) */}
      {selectedPro && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-40 animate-in slide-in-from-bottom duration-200">
          <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-emerald-500 shadow-2xl text-gray-900 space-y-3">
            
            {/* Header with Avatar, Name, and Distance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedPro.avatarUrl} alt={selectedPro.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-extrabold text-gray-900">{selectedPro.name}</h4>
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-800">{selectedPro.subcategory}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold bg-[#DCFCE7] text-[#0F5132] px-2 py-0.5 rounded-full block">
                  {selectedPro.trustScore}% Trust
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">
                  📍 {selectedPro.distanceKm || 2.4} km away
                </span>
              </div>
            </div>

            {/* Live Availability Status Strip */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  selectedPro.liveStatus === 'emergency' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'
                }`} />
                <span className="font-semibold text-gray-800">
                  {selectedPro.liveStatus === 'available_now' && '🟢 Available Right Now'}
                  {selectedPro.liveStatus === 'emergency' && '⚡ Emergency Dispatch Ready'}
                  {selectedPro.liveStatus === 'available_tomorrow' && '📅 Book for Tomorrow'}
                  {selectedPro.liveStatus === 'busy' && '🟡 In Project (Book Ahead)'}
                </span>
              </div>

              <span className="text-emerald-700 font-medium text-[11px]">
                ⚡ Replies in {selectedPro.responseTime}
              </span>
            </div>

            {/* Rate & Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Starting At</span>
                <span className="text-base font-extrabold text-[#0F5132] font-mono">
                  {formatINR(selectedPro.startingPriceINR)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/profile/${selectedPro.id}`}
                  className="px-4 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Book with Escrow</span>
                </Link>
                <button
                  onClick={() => onSelectPro(null)}
                  className="px-2.5 py-2.5 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
