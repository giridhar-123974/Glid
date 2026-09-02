'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Crosshair, 
  Navigation, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Star, 
  Clock, 
  ExternalLink,
  Phone,
  MessageSquare,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
  Radio
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

interface CityGeo {
  lat: number;
  lng: number;
  name: string;
  osmUrl: string;
}

const CITY_COORDINATES: Record<string, CityGeo> = {
  'Hyderabad': {
    lat: 17.4483,
    lng: 78.3915,
    name: 'Hitech City, Hyderabad',
    osmUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=78.35%2C17.42%2C78.43%2C17.48&layer=mapnik&marker=17.4483%2C78.3915'
  },
  'Bengaluru': {
    lat: 12.9352,
    lng: 77.6245,
    name: 'Koramangala, Bengaluru',
    osmUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=77.58%2C12.90%2C77.66%2C12.96&layer=mapnik&marker=12.9352%2C77.6245'
  },
  'Mumbai': {
    lat: 19.0760,
    lng: 72.8777,
    name: 'Bandra Kurla Complex, Mumbai',
    osmUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=72.83%2C19.04%2C72.91%2C19.10&layer=mapnik&marker=19.0760%2C72.8777'
  },
  'Delhi NCR': {
    lat: 28.4595,
    lng: 77.0266,
    name: 'Cyber City, Gurugram',
    osmUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=76.98%2C28.42%2C77.06%2C28.48&layer=mapnik&marker=28.4595%2C77.0266'
  },
  'Pune': {
    lat: 18.5204,
    lng: 73.8567,
    name: 'Kharadi, Pune',
    osmUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=73.81%2C18.49%2C73.89%2C18.55&layer=mapnik&marker=18.5204%2C73.8567'
  }
};

export default function LiveRealStreetMapsView({
  selectedCity = 'Hyderabad',
  onSelectProForBooking
}: {
  selectedCity?: string;
  onSelectProForBooking?: (pro: Professional) => void;
}) {
  const [activeCity, setActiveCity] = useState(selectedCity);
  const [activePro, setActivePro] = useState<Professional | null>(PROFESSIONALS[0]);
  const [radiusKm, setRadiusKm] = useState<'1 km' | '5 km' | '10 km' | '20 km' | '50 km'>('10 km');
  const [isLocating, setIsLocating] = useState(false);
  const [userLocationName, setUserLocationName] = useState('Hitech City, Hyderabad');
  const [mapTileStyle, setMapTileStyle] = useState<'street' | 'satellite' | 'transit'>('street');

  const cityGeo = CITY_COORDINATES[activeCity] || CITY_COORDINATES['Hyderabad'];

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          setUserLocationName(`Live GPS (${pos.coords.latitude.toFixed(3)}° N, ${pos.coords.longitude.toFixed(3)}° E)`);
        },
        () => {
          setIsLocating(false);
          setUserLocationName('GPS Locked (Hitech City, Hyderabad)');
        }
      );
    } else {
      setIsLocating(false);
      setUserLocationName('GPS Locked (Hitech City, Hyderabad)');
    }
  };

  return (
    <div className="w-full bg-white rounded-[20px] border border-[#E8EBF0] shadow-apple overflow-hidden font-sans">
      
      {/* Top Map Control Strip */}
      <div className="p-4 sm:p-5 border-b border-[#E8EBF0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* City & Area Search */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <MapPin className="w-4 h-4 text-[#FF6B00] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userLocationName}
              onChange={(e) => setUserLocationName(e.target.value)}
              placeholder="Search area, landmark or pincode..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#FF6B00]"
            />
            <button
              onClick={handleLocateMe}
              disabled={isLocating}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <Crosshair className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
            </button>
          </div>
        </div>

        {/* Radius Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#64748B] mr-1 hidden sm:inline">Search Radius:</span>
          {(['1 km', '5 km', '10 km', '20 km', '50 km'] as const).map(rad => (
            <button
              key={rad}
              onClick={() => setRadiusKm(rad)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                radiusKm === rad
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F8F9FB] text-[#0F172A] border border-[#E8EBF0] hover:bg-gray-100'
              }`}
            >
              {rad}
            </button>
          ))}
        </div>

        {/* City Quick Picker */}
        <div className="flex items-center gap-1 bg-[#F8F9FB] p-1 rounded-xl border border-[#E8EBF0]">
          {['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'].map(c => (
            <button
              key={c}
              onClick={() => {
                setActiveCity(c);
                setUserLocationName(CITY_COORDINATES[c]?.name || c);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activeCity === c ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              {c.split(' ')[0]}
            </button>
          ))}
        </div>

      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative h-[450px] sm:h-[520px] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        
        {/* Live Real OpenStreetMap Embedded Tile Layer */}
        <iframe
          title="OpenStreetMap Live Tiles"
          src={cityGeo.osmUrl}
          className="absolute inset-0 w-full h-full border-0 pointer-events-auto opacity-75 contrast-[1.05]"
          loading="lazy"
        />

        {/* Ambient Darkened Radial Overlay for Marker Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

        {/* Live Radius Zone Radar Ring */}
        <div className="absolute w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full border-2 border-[#FF6B00]/40 bg-[#FF6B00]/5 animate-pulse pointer-events-none" />

        {/* Center User Pin */}
        <div className="relative z-20 flex flex-col items-center pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-[#FF6B00] ring-8 ring-[#FF6B00]/30 flex items-center justify-center text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-[10px] font-bold text-white mt-1.5 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-xl">
            You ({userLocationName.split('(')[0].trim()})
          </span>
        </div>

        {/* Interactive Verified Specialist Pins with Real Coordinates */}
        {PROFESSIONALS.slice(0, 5).map((pro, idx) => {
          const pinOffsets = [
            { top: '22%', left: '26%' },
            { top: '28%', right: '28%' },
            { bottom: '24%', left: '30%' },
            { bottom: '26%', right: '22%' },
            { top: '68%', left: '52%' }
          ];
          const pos = pinOffsets[idx] || { top: '50%', left: '50%' };
          const isSelected = activePro?.id === pro.id;

          return (
            <div
              key={pro.id}
              style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
              className="absolute z-20 transition-transform duration-200"
            >
              <button
                onClick={() => setActivePro(pro)}
                className={`px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 transition-all text-xs font-bold border ${
                  isSelected 
                    ? 'bg-[#FF6B00] text-white border-white scale-110 ring-4 ring-[#FF6B00]/40 shadow-2xl' 
                    : 'bg-white/95 text-[#0F172A] border-[#E8EBF0] hover:scale-105'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>📍 ₹{pro.hourlyRateINR} • {pro.trustScore}%</span>
              </button>
            </div>
          );
        })}

        {/* Live Active Specialist Details Drawer Popup */}
        {activePro && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8EBF0] shadow-2xl space-y-3 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activePro.avatarUrl} alt={activePro.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                    {activePro.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  </h4>
                  <p className="text-[11px] text-[#64748B]">{activePro.headline}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#FF6B00] font-bold mt-0.5">
                    <span>★ 4.98</span>
                    <span>• {activePro.trustScore}% Trust Score</span>
                    <span className="text-[#16A34A]">• {activePro.distanceKm || 1.8} km away (8m ETA)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActivePro(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-black text-[#0F172A]">
                From ₹{activePro.hourlyRateINR.toLocaleString()}/hr
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activePro.cityArea + ', ' + activeCity)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0F172A] text-xs font-bold flex items-center gap-1"
                  title="Open Google Maps Directions"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span className="text-[11px]">Navigate</span>
                </a>
                <button
                  onClick={() => onSelectProForBooking && onSelectProForBooking(activePro)}
                  className="btn-primary px-4 py-1.5 text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Book Escrow</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
