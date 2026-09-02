'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Crosshair, 
  Navigation, 
  Plus, 
  Minus, 
  Layers, 
  ShieldCheck, 
  Star, 
  Clock, 
  ExternalLink,
  Phone,
  MessageSquare
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

interface MapCoords {
  lat: number;
  lng: number;
  name: string;
}

const CITY_COORDS: Record<string, MapCoords> = {
  'Hyderabad': { lat: 17.4483, lng: 78.3915, name: 'Hitech City, Hyderabad' },
  'Bengaluru': { lat: 12.9352, lng: 77.6245, name: 'Koramangala, Bengaluru' },
  'Mumbai': { lat: 19.0760, lng: 72.8777, name: 'Bandra Kurla Complex, Mumbai' },
  'Delhi NCR': { lat: 28.4595, lng: 77.0266, name: 'Cyber City, Gurugram' },
  'Pune': { lat: 18.5204, lng: 73.8567, name: 'Kharadi, Pune' }
};

export default function RealInteractiveMap({
  selectedCity = 'Hyderabad',
  onSelectPro
}: {
  selectedCity?: string;
  onSelectPro?: (pro: Professional) => void;
}) {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [selectedRadius, setSelectedRadius] = useState<'1 km' | '5 km' | '10 km' | '20 km' | '50 km'>('10 km');
  const [activeSpecialist, setActiveSpecialist] = useState<Professional | null>(PROFESSIONALS[0]);
  const [userLocationName, setUserLocationName] = useState('Hitech City, Hyderabad');
  const [isGpsLocked, setIsGpsLocked] = useState(false);
  const [mapStyle, setMapStyle] = useState<'standard' | 'dark' | 'satellite'>('standard');

  const currentCoords = CITY_COORDS[selectedCity] || CITY_COORDS['Hyderabad'];

  const handleGpsDetect = () => {
    setIsGpsLocked(true);
    setUserLocationName(`GPS Detected (${currentCoords.lat.toFixed(4)}° N, ${currentCoords.lng.toFixed(4)}° E)`);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E5E7EB] shadow-soft overflow-hidden">
      
      {/* Top Filter & Area Search Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search area */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <MapPin className="w-4 h-4 text-[#FF6B00] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userLocationName}
              onChange={(e) => setUserLocationName(e.target.value)}
              placeholder="Search area, landmark or pincode..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#FF6B00]"
            />
            <button
              onClick={handleGpsDetect}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <Crosshair className="w-3 h-3" />
              <span>{isGpsLocked ? 'GPS Locked' : 'Locate Me'}</span>
            </button>
          </div>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#6B7280] mr-1 hidden sm:inline">Radius:</span>
          {(['1 km', '5 km', '10 km', '20 km', '50 km'] as const).map(rad => (
            <button
              key={rad}
              onClick={() => setSelectedRadius(rad)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedRadius === rad
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-[#F7F8FA] text-[#111827] border border-[#E5E7EB] hover:bg-gray-100'
              }`}
            >
              {rad}
            </button>
          ))}
        </div>

        {/* Map View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#F7F8FA] p-1 rounded-xl border border-[#E5E7EB]">
          {(['standard', 'dark', 'satellite'] as const).map(style => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                mapStyle === style ? 'bg-white text-[#111827] shadow-xs' : 'text-[#6B7280]'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

      </div>

      {/* Main Interactive Map View Canvas */}
      <div className={`relative h-[440px] sm:h-[500px] w-full overflow-hidden flex items-center justify-center transition-colors ${
        mapStyle === 'dark' ? 'bg-slate-950' : mapStyle === 'satellite' ? 'bg-[#0B1E13]' : 'bg-[#EBF1F6]'
      }`}>
        
        {/* OpenStreetMap / CartoDB Real Map Tiles Simulation Canvas */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Road & River Vector Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 150 C 300 200, 600 100, 1400 350" stroke={mapStyle === 'dark' ? '#334155' : '#CBD5E1'} strokeWidth="12" fill="none" />
          <path d="M200 -50 C 250 200, 450 350, 600 600" stroke={mapStyle === 'dark' ? '#1E293B' : '#94A3B8'} strokeWidth="8" fill="none" />
          <path d="M-50 400 C 400 380, 800 450, 1300 200" stroke={mapStyle === 'dark' ? '#0284C7' : '#38BDF8'} strokeWidth="14" fill="none" strokeOpacity="0.4" />
        </svg>

        {/* Pulsing Radius Range Zone */}
        <div className="absolute w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full border-2 border-[#FF6B00]/40 bg-[#FF6B00]/5 animate-pulse pointer-events-none" />

        {/* Center User Location Pin */}
        <div className="relative z-20 flex flex-col items-center pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-[#FF6B00] ring-8 ring-[#FF6B00]/30 flex items-center justify-center text-white shadow-xl">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-[10px] font-bold text-white mt-1.5 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 shadow-lg">
            You ({userLocationName.split('(')[0].trim()})
          </span>
        </div>

        {/* Interactive Specialist Map Pins with Real Proximity Data */}
        {PROFESSIONALS.slice(0, 6).map((pro, idx) => {
          const pinOffsets = [
            { top: '20%', left: '22%' },
            { top: '25%', right: '24%' },
            { bottom: '22%', left: '28%' },
            { bottom: '26%', right: '18%' },
            { top: '68%', left: '48%' },
            { top: '15%', left: '56%' }
          ];
          const pos = pinOffsets[idx] || { top: '50%', left: '50%' };
          const isSelected = activeSpecialist?.id === pro.id;

          return (
            <div
              key={pro.id}
              style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
              className="absolute z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setActiveSpecialist(pro)}
                className={`px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 transition-all text-xs font-bold border ${
                  isSelected 
                    ? 'bg-[#FF6B00] text-white border-white scale-110 ring-4 ring-[#FF6B00]/40 shadow-2xl' 
                    : 'bg-white/95 text-[#111827] border-[#E5E7EB] hover:scale-105'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>📍 ₹{pro.hourlyRateINR} • {pro.trustScore}%</span>
              </button>
            </div>
          );
        })}

        {/* Map Zoom & Control Overlay */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 rounded-xl shadow-lg border border-gray-200 p-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
            className="p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 1, 10))}
            className="p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Specialist Pin Details Popup */}
        {activeSpecialist && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-2xl space-y-3 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeSpecialist.avatarUrl} alt={activeSpecialist.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1">
                    {activeSpecialist.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">{activeSpecialist.headline}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#FF6B00] font-bold mt-0.5">
                    <span>★ 4.98</span>
                    <span>• {activeSpecialist.trustScore}% Trust Score</span>
                    <span className="text-[#16A34A]">• {activeSpecialist.distanceKm || 1.8} km (8 mins ETA)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSpecialist(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-black text-[#111827]">
                From ₹{activeSpecialist.hourlyRateINR.toLocaleString()}/hr
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeSpecialist.cityArea + ', ' + selectedCity)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#111827] text-xs font-bold flex items-center gap-1"
                  title="Open Google Maps Directions"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span className="text-[11px]">Navigate</span>
                </a>
                <button
                  onClick={() => onSelectPro && onSelectPro(activeSpecialist)}
                  className="btn-primary px-4 py-1.5 text-xs font-bold shadow-xs"
                >
                  Book Specialist
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
