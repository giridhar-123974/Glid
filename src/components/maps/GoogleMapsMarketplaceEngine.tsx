'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Crosshair, 
  Layers, 
  Plus, 
  Minus, 
  Maximize2, 
  Minimize2, 
  Navigation, 
  ShieldCheck, 
  Star, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  Bike, 
  Car, 
  Footprints, 
  ArrowRight,
  Phone,
  MessageSquare,
  Lock,
  Compass
} from 'lucide-react';
import { Professional } from '@/types';
import { PROFESSIONALS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';

export type MapLayerStyle = 'standard' | 'satellite' | 'dark';
export type RadiusOption = '2 km' | '5 km' | '10 km' | '20 km' | '50 km' | 'Anywhere';

interface GoogleMapsMarketplaceEngineProps {
  professionals?: Professional[];
  selectedPro?: Professional | null;
  onSelectPro?: (pro: Professional) => void;
  onBookPro?: (pro: Professional) => void;
  userCoords?: { lat: number; lng: number };
  userLocationName?: string;
  selectedRadius?: RadiusOption;
  onRadiusChange?: (radius: RadiusOption) => void;
  className?: string;
  heightClass?: string;
  showRadiusBar?: boolean;
}

export default function GoogleMapsMarketplaceEngine({
  professionals = PROFESSIONALS,
  selectedPro = null,
  onSelectPro,
  onBookPro,
  userCoords = { lat: 17.4435, lng: 78.3772 }, // Hitech City, Hyderabad
  userLocationName = 'Hitech City, Hyderabad',
  selectedRadius = '10 km',
  onRadiusChange,
  className = '',
  heightClass = 'h-[540px] sm:h-[620px]',
  showRadiusBar = true
}: GoogleMapsMarketplaceEngineProps) {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mapStyle, setMapStyle] = useState<MapLayerStyle>('standard');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredPro, setHoveredPro] = useState<Professional | null>(null);
  const [activePro, setActivePro] = useState<Professional | null>(selectedPro || professionals[0] || null);
  const [transportMode, setTransportMode] = useState<'bike' | 'cab' | 'walk'>('bike');
  const [isGpsLocked, setIsGpsLocked] = useState(true);
  const [isRadarScanning, setIsRadarScanning] = useState(true);

  // Sync selectedPro if changed from outside
  useEffect(() => {
    setActivePro(selectedPro || professionals[0] || null);
  }, [selectedPro, professionals]);

  // Radius filtering calculation
  const radiusKm = useMemo(() => {
    switch (selectedRadius) {
      case '2 km': return 2;
      case '5 km': return 5;
      case '10 km': return 10;
      case '20 km': return 20;
      case '50 km': return 50;
      default: return 999;
    }
  }, [selectedRadius]);

  const filteredPros = useMemo(() => {
    // If professionals is already passed in, render them (avoid over-filtering if already filtered)
    return professionals.length > 0 ? professionals : PROFESSIONALS.filter(p => (p.distanceKm || 2) <= radiusKm);
  }, [professionals, radiusKm]);

  const handleMarkerClick = (pro: Professional) => {
    setActivePro(pro);
    if (onSelectPro) onSelectPro(pro);
  };

  const handleGpsCenter = () => {
    setIsGpsLocked(true);
    setIsRadarScanning(true);
    setTimeout(() => setIsRadarScanning(false), 3000);
  };

  // Convert coordinates to visible radar positions
  const getMarkerPosition = (coords: { lat: number; lng: number }, index: number) => {
    const total = Math.max(1, filteredPros.length);
    const angle = ((index * 360) / total + 25) * (Math.PI / 180);
    const distFactor = Math.min(36, 16 + (index % 3) * 8);

    const latDelta = (coords.lat - userCoords.lat) * 500;
    const lngDelta = (coords.lng - userCoords.lng) * 500;

    let topPercent = 50 - latDelta;
    let leftPercent = 50 + lngDelta;

    if (isNaN(topPercent) || topPercent < 15 || topPercent > 82 || leftPercent < 12 || leftPercent > 88) {
      topPercent = 50 + Math.sin(angle) * distFactor;
      leftPercent = 50 + Math.cos(angle) * distFactor;
    }

    return { 
      top: `${Math.max(15, Math.min(82, topPercent))}%`, 
      left: `${Math.max(12, Math.min(88, leftPercent))}%` 
    };
  };

  // Format Google directions URL
  const googleDirectionsUrl = useMemo(() => {
    if (!activePro) return '';
    return `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${activePro.coordinates.lat},${activePro.coordinates.lng}&travelmode=driving`;
  }, [activePro, userCoords]);

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm bg-[#0F172A] ${heightClass} ${isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''} ${className}`}>
      
      {/* Dynamic Map Canvas Background */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-500 ${
        mapStyle === 'satellite'
          ? 'bg-gradient-to-tr from-[#1E293B] via-[#0F172A] to-[#1E3A8A]'
          : mapStyle === 'dark'
          ? 'bg-[#0B0F19]'
          : 'bg-[#F4F6F8]'
      }`}>
        
        {/* Realistic Interactive SVG Vector Street Grid with Landmarks */}
        <svg className="w-full h-full object-cover opacity-90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Grid Patterns */}
            <pattern id="streetGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke={mapStyle === 'standard' ? '#E2E8F0' : '#1E293B'} strokeWidth="1.5" />
              <path d="M 60 0 L 60 120 M 0 60 L 120 60" fill="none" stroke={mapStyle === 'standard' ? '#EDF2F7' : '#172033'} strokeWidth="1" strokeDasharray="4,4" />
            </pattern>
            {/* Radar glow */}
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </radialGradient>
            {/* Route glow */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#streetGrid)" />

          {/* Major Arterial Highways (Google Maps aesthetic) */}
          <path
            d="M -100 200 C 300 220, 600 180, 1400 350"
            fill="none"
            stroke={mapStyle === 'standard' ? '#FED7AA' : '#334155'}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 250 -100 C 280 300, 450 600, 600 1200"
            fill="none"
            stroke={mapStyle === 'standard' ? '#FEEBC8' : '#1E293B'}
            strokeWidth="6"
          />
          <path
            d="M 500 -50 C 520 250, 700 500, 950 1100"
            fill="none"
            stroke={mapStyle === 'standard' ? '#FED7AA' : '#334155'}
            strokeWidth="7"
          />

          {/* User Radius Pulse Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radiusKm === 2 ? "110" : radiusKm === 5 ? "180" : radiusKm === 10 ? "260" : "360"}
            fill="url(#radarPulse)"
            stroke="#FF6B00"
            strokeWidth="1.5"
            strokeDasharray="6,4"
            className="animate-pulse"
          />

          {/* Live Directions Route Polyline to Active Pro */}
          {activePro && (
            <path
              d="M 50% 50% Q 55% 42%, 62% 34%"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeDasharray="8,6"
              className="animate-[dash_1.5s_linear_infinite]"
            />
          )}
        </svg>

        {/* Floating City & Area Watermark Badges */}
        <div className="absolute top-20 left-6 pointer-events-none hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[11px] font-bold text-gray-700">{userLocationName}</span>
          </div>
        </div>
      </div>

      {/* Top Floating Control Bar: Radius Chips & Layer Switcher */}
      {showRadiusBar && (
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          
          {/* Radius Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/90 shadow-md overflow-x-auto no-scrollbar max-w-full">
            <div className="px-2.5 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">
              Radius:
            </div>
            {(['2 km', '5 km', '10 km', '20 km', '50 km', 'Anywhere'] as RadiusOption[]).map((rad) => (
              <button
                key={rad}
                type="button"
                onClick={() => onRadiusChange && onRadiusChange(rad)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedRadius === rad
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {rad}
              </button>
            ))}
          </div>

          {/* Quick Stats & Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-md flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              <span className="text-xs font-bold text-[#0F172A]">{filteredPros.length} Verified Pros</span>
            </div>
          </div>

        </div>
      )}

      {/* User Center GPS Pin (Blue Pulse) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 animate-ping absolute" />
          <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-black">
            You
          </div>
        </div>
      </div>

      {/* Custom GLID Orange Map Markers */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {filteredPros.map((pro, index) => {
          const pos = getMarkerPosition(pro.coordinates, index);
          const isSelected = activePro?.id === pro.id;
          const isHovered = hoveredPro?.id === pro.id;

          return (
            <div
              key={pro.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-300"
            >
              {/* Marker Capsule */}
              <button
                type="button"
                onClick={() => handleMarkerClick(pro)}
                onMouseEnter={() => setHoveredPro(pro)}
                onMouseLeave={() => setHoveredPro(null)}
                className={`group relative flex items-center gap-1.5 p-1 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#FF6B00] text-white ring-4 ring-[#FF6B00]/30 shadow-xl scale-110 z-30'
                    : isHovered
                    ? 'bg-[#0F172A] text-white shadow-lg scale-105 z-20'
                    : 'bg-white text-[#0F172A] border border-gray-200/90 shadow-md hover:scale-105 z-10'
                }`}
              >
                {/* Pro Avatar Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pro.avatarUrl}
                  alt={pro.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-white/80"
                />

                {/* Name & ETA */}
                <div className="pr-2 text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] sm:text-xs font-black tracking-tight truncate max-w-[70px]">
                      {pro.name.split(' ')[0]}
                    </span>
                    {pro.verifications.isIdentityVerified && (
                      <CheckCircle2 className={`w-3 h-3 ${isSelected || isHovered ? 'text-white' : 'text-[#FF6B00]'}`} />
                    )}
                  </div>
                  <span className={`text-[9px] font-bold block ${isSelected || isHovered ? 'text-white/80' : 'text-gray-400'}`}>
                    {pro.distanceKm} km • {pro.etaMinutes || 10}m
                  </span>
                </div>

                {/* Live Pulse Dot */}
                {pro.liveStatus === 'emergency' ? (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-white animate-bounce" />
                ) : (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16A34A] border border-white" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Map Controls (Right Side) */}
      <div className="absolute right-4 bottom-6 z-30 flex flex-col gap-2 pointer-events-auto">
        
        {/* GPS Locate Button */}
        <button
          type="button"
          onClick={handleGpsCenter}
          title="Center on My Location"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-gray-700 hover:text-[#FF6B00] border border-gray-200 shadow-md flex items-center justify-center transition-all active:scale-95"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col bg-white/95 rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(18, prev + 1))}
            className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-gray-200" />
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(8, prev - 1))}
            className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Layer Style Switcher */}
        <button
          type="button"
          onClick={() => {
            const next = mapStyle === 'standard' ? 'satellite' : mapStyle === 'satellite' ? 'dark' : 'standard';
            setMapStyle(next);
          }}
          title="Toggle Map Style (Standard / Satellite / Dark)"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-gray-700 hover:text-[#FF6B00] border border-gray-200 shadow-md flex items-center justify-center transition-all active:scale-95"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title="Toggle Fullscreen"
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-gray-700 hover:text-[#FF6B00] border border-gray-200 shadow-md flex items-center justify-center transition-all active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

      </div>

      {/* Floating Bottom Card: Selected Professional Preview & Instant Actions */}
      {activePro && (
        <div className="absolute left-4 right-4 sm:left-6 sm:right-auto sm:w-96 bottom-6 z-30 pointer-events-auto animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-gray-200/90 shadow-2xl space-y-3.5 relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePro(null)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center text-xs transition-colors"
              title="Close card"
            >
              ✕
            </button>

            {/* Header: Photo + Name + Badge */}
            <div className="flex items-start gap-3 pr-6">
              <div className="relative flex-shrink-0 w-12 h-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePro.avatarUrl}
                  alt={activePro.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-xs flex-shrink-0"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[9px] font-bold border border-white shadow-xs">
                  ✓
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-black text-[#0F172A] tracking-tight truncate">{activePro.name}</h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] text-[9px] font-black flex-shrink-0">
                    {activePro.trustScore}% Trust
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">{activePro.headline}</p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-[#FF6B00] flex-shrink-0" />
                  <span>{activePro.cityArea} • {activePro.distanceKm} km away</span>
                </div>
              </div>
            </div>

            {/* Transit ETA & Pricing Bar */}
            <div className="p-2 rounded-2xl bg-[#F8F9FB] border border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center bg-white rounded-xl border border-gray-200 p-0.5 shadow-2xs">
                  {(['bike', 'cab', 'walk'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTransportMode(mode)}
                      className={`p-1 rounded-lg transition-all ${
                        transportMode === mode
                          ? 'bg-[#0F172A] text-white'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {mode === 'bike' && <Bike className="w-3 h-3" />}
                      {mode === 'cab' && <Car className="w-3 h-3" />}
                      {mode === 'walk' && <Footprints className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
                <span className="text-gray-700 font-bold text-[11px]">
                  ~{activePro.etaMinutes || 10}m ETA
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-[#0F172A]">₹{activePro.hourlyRateINR.toLocaleString()}</span>
                <span className="text-[10px] text-gray-400 font-medium">/hr</span>
              </div>
            </div>

            {/* Action Buttons: Book Escrow + View Full Profile */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => onBookPro && onBookPro(activePro)}
                className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Book with Escrow</span>
              </button>

              <Link
                href={`/profile/${activePro.id}`}
                className="px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-[0.98] text-[#0F172A] font-bold text-xs transition-all flex items-center justify-center"
              >
                Profile
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
