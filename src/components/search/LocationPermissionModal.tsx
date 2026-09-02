'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ShieldCheck, X } from 'lucide-react';

interface LocationPermissionModalProps {
  onLocationGranted: (locationName: string, coords: { lat: number; lng: number }) => void;
}

export default function LocationPermissionModal({ onLocationGranted }: LocationPermissionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if previously chosen
    const hasPrompted = localStorage.getItem('glid_location_prompted');
    if (!hasPrompted) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    setIsLoading(true);
    localStorage.setItem('glid_location_prompted', 'true');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Success
          setIsLoading(false);
          setIsVisible(false);
          onLocationGranted('Hitech City, Hyderabad', {
            lat: pos.coords.latitude || 17.4474,
            lng: pos.coords.longitude || 78.3762,
          });
        },
        (err) => {
          // Fallback to default high-density hub
          setIsLoading(false);
          setIsVisible(false);
          onLocationGranted('Hitech City, Hyderabad', { lat: 17.4474, lng: 78.3762 });
        },
        { timeout: 5000 }
      );
    } else {
      setIsLoading(false);
      setIsVisible(false);
      onLocationGranted('Hitech City, Hyderabad', { lat: 17.4474, lng: 78.3762 });
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('glid_location_prompted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-5 rounded-3xl bg-white border-2 border-emerald-500/80 shadow-2xl space-y-4">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#0F5132] flex items-center justify-center flex-shrink-0 animate-bounce">
              <Navigation className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                Enable Nearby Discovery
              </h4>
              <p className="text-xs text-gray-500">Discover verified professionals within 1–10 KM</p>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Allow GLID to use your current location to match you with nearby photographers, developers, and consultants ready for emergency or same-day booking.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAllow}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Locating...' : 'Allow Location'}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            Not Now
          </button>
        </div>

      </div>
    </div>
  );
}
