'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Crosshair, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Star, 
  Bike, 
  Car, 
  Footprints, 
  Search, 
  X, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles,
  History,
  Building,
  Home,
  Briefcase
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

interface AutocompletePlace {
  id: string;
  name: string;
  area: string;
  city: string;
  pincode: string;
  distanceKm: number;
  type: 'recent' | 'saved' | 'popular';
}

const POPULAR_HYDERABAD_PLACES: AutocompletePlace[] = [
  { id: '1', name: 'Inorbit Mall & Knowledge City', area: 'Hitech City', city: 'Hyderabad', pincode: '500081', distanceKm: 0.8, type: 'saved' },
  { id: '2', name: 'DLF Cyber City & Gate 1', area: 'Gachibowli', city: 'Hyderabad', pincode: '500032', distanceKm: 2.4, type: 'popular' },
  { id: '3', name: 'IKEA Hyderabad & Raidurg Metro', area: 'Raidurg', city: 'Hyderabad', pincode: '500032', distanceKm: 1.6, type: 'recent' },
  { id: '4', name: 'Sarath City Capital Mall', area: 'Kondapur', city: 'Hyderabad', pincode: '500084', distanceKm: 3.1, type: 'popular' },
  { id: '5', name: 'Jubilee Hills Check Post (Road No. 36)', area: 'Jubilee Hills', city: 'Hyderabad', pincode: '500033', distanceKm: 4.8, type: 'popular' },
  { id: '6', name: 'Banjara Hills Road No. 12', area: 'Banjara Hills', city: 'Hyderabad', pincode: '500034', distanceKm: 6.2, type: 'recent' }
];

export default function RapidoStyleLocationSearch({
  onSelectProForBooking
}: {
  onSelectProForBooking?: (pro: Professional) => void;
}) {
  const [pickupQuery, setPickupQuery] = useState('Inorbit Mall, Hitech City');
  const [isSearchingPickup, setIsSearchingPickup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePlace>(POPULAR_HYDERABAD_PLACES[0]);
  const [activeSpecialist, setActiveSpecialist] = useState<Professional>(PROFESSIONALS[0]);
  const [transitMode, setTransitMode] = useState<'bike' | 'car' | 'walk'>('bike');
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [trackingTimer, setTrackingTimer] = useState(8);

  const filteredPlaces = POPULAR_HYDERABAD_PLACES.filter(p =>
    p.name.toLowerCase().includes(pickupQuery.toLowerCase()) ||
    p.area.toLowerCase().includes(pickupQuery.toLowerCase()) ||
    p.pincode.includes(pickupQuery)
  );

  const handleSelectPlace = (place: AutocompletePlace) => {
    setSelectedPlace(place);
    setPickupQuery(`${place.name}, ${place.area}`);
    setIsSearchingPickup(false);
  };

  const handleStartDispatch = () => {
    setIsLiveTracking(true);
    setTrackingTimer(8);
  };

  useEffect(() => {
    let interval: any;
    if (isLiveTracking && trackingTimer > 0) {
      interval = setInterval(() => {
        setTrackingTimer(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLiveTracking, trackingTimer]);

  const etaMinutes = transitMode === 'bike' ? Math.round(selectedPlace.distanceKm * 2.8 + 3) :
                     transitMode === 'car' ? Math.round(selectedPlace.distanceKm * 4.2 + 5) :
                     Math.round(selectedPlace.distanceKm * 12 + 8);

  return (
    <div className="w-full bg-white rounded-[20px] border border-[#E8EBF0] shadow-2xl overflow-hidden font-sans text-[#0F172A]">
      
      {/* Top Rapido-Style Location Input Container */}
      <div className="p-4 sm:p-6 bg-white border-b border-[#E8EBF0] space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
            <h3 className="text-base font-black text-[#0F172A] tracking-tight">
              Rapido Hyperlocal Instant Radar
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            GPS Auto-Matched
          </span>
        </div>

        {/* Input Bar with Instant Autocomplete */}
        <div className="relative">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8F9FB] border border-[#E8EBF0] focus-within:border-[#FF6B00] focus-within:bg-white transition-all shadow-xs">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white ring-2 ring-emerald-500/20" />
              <span className="w-0.5 h-4 bg-gray-300" />
              <MapPin className="w-4 h-4 text-[#FF6B00]" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Your Pickup / Work Location
              </div>
              <input
                type="text"
                value={pickupQuery}
                onFocus={() => setIsSearchingPickup(true)}
                onChange={(e) => {
                  setPickupQuery(e.target.value);
                  setIsSearchingPickup(true);
                }}
                placeholder="Search area, landmark or metro station (e.g. Madhapur, Inorbit)..."
                className="w-full bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {pickupQuery && (
              <button
                onClick={() => {
                  setPickupQuery('');
                  setIsSearchingPickup(true);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Rapido-Style Live Autocomplete Dropdown List */}
          {isSearchingPickup && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E8EBF0] shadow-2xl z-50 overflow-hidden text-xs animate-in fade-in zoom-in-95">
              
              {/* GPS Auto-detect option */}
              <button
                onClick={() => {
                  setPickupQuery('Current GPS Location (Hitech City, Hyderabad)');
                  setIsSearchingPickup(false);
                }}
                className="w-full p-3.5 hover:bg-orange-50/70 border-b border-gray-100 flex items-center gap-3 text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                  <Crosshair className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="font-black text-[#FF6B00] block">Use Current Location</span>
                  <span className="text-[11px] text-gray-500">Auto-detect using device GPS & accuracy beacon</span>
                </div>
              </button>

              {/* Suggestions List */}
              <div className="max-h-60 overflow-y-auto p-1">
                {filteredPlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handleSelectPlace(place)}
                    className="w-full p-3 rounded-xl hover:bg-[#F8F9FB] flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-orange-50 text-gray-500 group-hover:text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                        {place.type === 'saved' ? <Home className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0F172A]">{place.name}</h4>
                        <span className="text-[11px] text-[#64748B]">
                          {place.area}, {place.city} - {place.pincode}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {place.distanceKm} km
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Transit Mode & ETA Switcher */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {[
              { id: 'bike', label: 'Bike ETA', icon: Bike, speed: 'Fastest' },
              { id: 'car', label: 'Car / Cab', icon: Car, speed: 'Comfort' },
              { id: 'walk', label: 'Walking', icon: Footprints, speed: 'Nearby' }
            ].map((mode) => {
              const Icon = mode.icon;
              const isSelected = transitMode === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => setTransitMode(mode.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8F9FB] text-[#64748B] border border-[#E8EBF0] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Estimated Arrival</span>
            <span className="text-sm font-black text-[#FF6B00]">⚡ {etaMinutes} Mins ETA</span>
          </div>
        </div>

      </div>

      {/* Rapido-Style Live Vector Map Route Display */}
      <div className="relative h-[380px] sm:h-[420px] w-full bg-slate-950 overflow-hidden flex items-center justify-center p-4">
        
        {/* Subtle Map Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* SVG Route Line Connecting User & Specialist */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF6B00" />
            </linearGradient>
          </defs>
          <path
            d="M 280 200 Q 420 120, 580 260"
            stroke="url(#routeGradient)"
            strokeWidth="6"
            strokeDasharray="8 6"
            fill="none"
            className="animate-pulse"
          />
        </svg>

        {/* User Pickup Marker */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="w-6 h-6 rounded-full bg-[#16A34A] ring-8 ring-emerald-500/25 flex items-center justify-center text-white font-bold text-xs shadow-xl">
            ✓
          </div>
          <span className="text-[10px] font-bold text-white mt-1 bg-black/85 px-2.5 py-0.5 rounded-full border border-white/10 shadow-lg">
            Pickup: {selectedPlace.name.split('&')[0].trim()}
          </span>
        </div>

        {/* Moving Specialist Captain Marker on Route */}
        <div className="absolute right-1/4 top-1/3 flex flex-col items-center z-20 animate-bounce">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B00] ring-8 ring-orange-500/30 overflow-hidden border-2 border-white shadow-2xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeSpecialist.avatarUrl} alt={activeSpecialist.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold text-white mt-1 bg-[#FF6B00] px-2.5 py-0.5 rounded-full shadow-lg">
            🏍️ {activeSpecialist.name} ({etaMinutes}m away)
          </span>
        </div>

        {/* Bottom Slide-up Dispatch Sheet */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8EBF0] shadow-2xl space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeSpecialist.avatarUrl} alt={activeSpecialist.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                  {activeSpecialist.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                </h4>
                <p className="text-[11px] text-[#64748B]">{activeSpecialist.headline}</p>
                <span className="text-[10px] text-[#16A34A] font-bold block">
                  ★ 4.98 • {selectedPlace.distanceKm} km away ({etaMinutes} mins ETA)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-[#0F172A]">₹{activeSpecialist.hourlyRateINR}/hr</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedPlace.name + ', ' + selectedPlace.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0F172A] text-xs font-bold flex items-center gap-1"
              title="Open Turn-by-Turn Google Navigation"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="text-[11px]">Navigate</span>
            </a>

            <button
              onClick={() => {
                if (onSelectProForBooking) {
                  onSelectProForBooking(activeSpecialist);
                } else {
                  handleStartDispatch();
                }
              }}
              className="btn-primary px-4 py-2 text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Book Instant Dispatch (₹{activeSpecialist.hourlyRateINR * 2})</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
