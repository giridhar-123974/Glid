'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Crosshair, 
  Navigation, 
  Radio, 
  Star, 
  ShieldCheck, 
  Clock, 
  Layers, 
  List, 
  Map as MapIcon, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

export default function GoogleMapsRadarView({
  onSelectPro
}: {
  onSelectPro?: (pro: Professional) => void;
}) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedRadius, setSelectedRadius] = useState<'1 km' | '5 km' | '10 km' | '20 km' | '50 km' | '100 km'>('10 km');
  const [activePin, setActivePin] = useState<Professional | null>(PROFESSIONALS[0]);
  const [searchAreaInput, setSearchAreaInput] = useState('Hitech City, Hyderabad');
  const [isGpsActive, setIsGpsActive] = useState(false);

  const handleNearbyMe = () => {
    setIsGpsActive(true);
    setSearchAreaInput('Current Location (GPS: 17.4483° N, 78.3915° E)');
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E5E7EB] shadow-soft overflow-hidden">
      
      {/* Top Map Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Area / Landmark Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative w-full">
            <MapPin className="w-4 h-4 text-[#FF6B00] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchAreaInput}
              onChange={(e) => setSearchAreaInput(e.target.value)}
              placeholder="Search by city, area, pincode (e.g. Madhapur 500081)..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#FF6B00]"
            />
            <button
              onClick={handleNearbyMe}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <Crosshair className="w-3 h-3" />
              <span>Nearby Me</span>
            </button>
          </div>
        </div>

        {/* Center: Radius Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-[#6B7280] mr-1 hidden sm:inline">Radius:</span>
          {(['1 km', '5 km', '10 km', '20 km', '50 km', '100 km'] as const).map(rad => (
            <button
              key={rad}
              onClick={() => setSelectedRadius(rad)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedRadius === rad
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-[#F7F8FA] text-[#111827] border border-[#E5E7EB] hover:bg-gray-100'
              }`}
            >
              {rad}
            </button>
          ))}
        </div>

        {/* Right: Map / List Toggle */}
        <div className="flex items-center gap-1 bg-[#F7F8FA] p-1 rounded-xl border border-[#E5E7EB] self-start md:self-auto">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'map' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#6B7280]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map Radar</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'list' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#6B7280]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>

      </div>

      {/* Main Map View Canvas */}
      {viewMode === 'map' ? (
        <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-950 overflow-hidden flex items-center justify-center p-4">
          
          {/* Subtle Vector Street Grid Simulation */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Circular Radius Zone Ring */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/5 animate-pulse pointer-events-none" />

          {/* User Location Center Marker */}
          <div className="relative z-20 flex flex-col items-center pointer-events-none">
            <div className="w-6 h-6 rounded-full bg-[#FF6B00] ring-8 ring-[#FF6B00]/25 flex items-center justify-center text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
            <span className="text-[10px] font-bold text-white mt-1.5 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 shadow-lg">
              You ({searchAreaInput.split(',')[0]})
            </span>
          </div>

          {/* Interactive Professional Pins on Google Maps Radar */}
          {PROFESSIONALS.slice(0, 5).map((pro, idx) => {
            const positions = [
              { top: '22%', left: '26%' },
              { top: '30%', right: '28%' },
              { bottom: '26%', left: '32%' },
              { bottom: '24%', right: '22%' },
              { top: '65%', left: '55%' }
            ];
            const pos = positions[idx] || { top: '50%', left: '50%' };
            const isSelected = activePin?.id === pro.id;

            return (
              <div
                key={pro.id}
                style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
                className="absolute z-20 transition-transform duration-200"
              >
                <button
                  onClick={() => setActivePin(pro)}
                  className={`px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 transition-all text-xs font-bold border ${
                    isSelected 
                      ? 'bg-[#FF6B00] text-white border-white scale-110 ring-4 ring-[#FF6B00]/40' 
                      : 'bg-white/95 text-[#111827] border-[#E5E7EB] hover:scale-105'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <span>📍 ₹{pro.hourlyRateINR} • {pro.trustScore}%</span>
                </button>
              </div>
            );
          })}

          {/* Bottom Active Pin Popup Card */}
          {activePin && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-2xl space-y-3 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={activePin.avatarUrl} alt={activePin.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1">
                      {activePin.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">{activePin.headline}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#FF6B00] font-bold mt-0.5">
                      <span>★ 4.98</span>
                      <span>• {activePin.trustScore} Trust Score</span>
                      <span className="text-[#16A34A]">• {activePin.distanceKm || 1.8} km away (8m ETA)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePin(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#111827]">
                  From ₹{activePin.hourlyRateINR.toLocaleString()}/hr
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activePin.cityArea + ', Hyderabad')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#111827] text-xs font-bold"
                    title="Live Directions on Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onSelectPro && onSelectPro(activePin)}
                    className="btn-primary px-3.5 py-1.5 text-xs font-bold shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* List Mode View */
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto">
          {PROFESSIONALS.map((pro) => (
            <div
              key={pro.id}
              className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pro.avatarUrl} alt={pro.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1">
                    {pro.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">{pro.headline}</p>
                  <span className="text-[10px] text-[#16A34A] font-bold block mt-0.5">
                    {pro.distanceKm || 1.8} km away in {pro.cityArea}
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1.5">
                <span className="text-xs font-black text-[#111827]">₹{pro.hourlyRateINR}/hr</span>
                <button
                  onClick={() => onSelectPro && onSelectPro(pro)}
                  className="btn-primary px-3 py-1 text-[11px] font-bold"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
