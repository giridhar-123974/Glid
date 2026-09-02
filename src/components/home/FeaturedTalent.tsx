'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  ArrowRight, 
  Lock,
  CheckCircle2
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional, Review } from '@/types';
import EscrowModal from '@/components/profile/EscrowModal';

export default function FeaturedTalent() {
  const [selectedProForEscrow, setSelectedProForEscrow] = useState<Professional | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return '4.98';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };

  const toggleSave = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !savedIds[id];
    setSavedIds(prev => ({ ...prev, [id]: nextState }));
    setToastMessage(nextState ? `Saved ${name} to Wishlist` : `Removed ${name}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = (e: React.MouseEvent, name: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/profile/${id}`);
      setToastMessage(`Copied ${name}'s verified link!`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Top Rated Specialists
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Top 1% verified talent with 98%+ Trust Scores & verified client reviews
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-bold text-gray-900 hover:text-[#F97316] flex items-center gap-1 group transition-colors"
          >
            <span>Show all 18,540+ talent</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Airbnb-Grade Listing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROFESSIONALS.slice(0, 6).map((pro) => {
            const isSaved = !!savedIds[pro.id];
            const ratingScore = getRating(pro.reviews);

            return (
              <div 
                key={pro.id} 
                className="group flex flex-col justify-between"
              >
                {/* Image Container with Sleek Compact Aspect Ratio */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-3 border border-gray-100 shadow-2xs">
                  <Link href={`/profile/${pro.id}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pro.portfolio[0]?.imageUrl || pro.coverUrl || pro.avatarUrl}
                      alt={pro.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Top Status & Save Buttons */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-2xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {pro.liveStatus === 'available_now' ? 'Available Today' : 'Tomorrow'}
                    </span>

                    <div className="pointer-events-auto flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleShare(e, pro.name, pro.id)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 flex items-center justify-center transition-transform hover:scale-110 shadow-2xs"
                        title="Share Profile"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => toggleSave(e, pro.id, pro.name)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 flex items-center justify-center transition-transform hover:scale-110 shadow-2xs"
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Trust Score Badge at Bottom Left */}
                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                      Trust {pro.trustScore}%
                    </span>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="space-y-1">
                  {/* Name and Rating Row */}
                  <div className="flex items-center justify-between">
                    <Link href={`/profile/${pro.id}`} className="hover:underline">
                      <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                        {pro.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{ratingScore}</span>
                      <span className="text-gray-400 font-normal">({pro.completedProjectsCount || 42})</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <p className="text-xs text-gray-500 truncate font-medium">
                    {pro.headline}
                  </p>

                  {/* Location */}
                  <p className="text-xs text-gray-400 font-normal">
                    {pro.location} • {pro.cityArea}
                  </p>

                  {/* Price and Instant Action Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-gray-900">
                        ₹{pro.hourlyRateINR.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 font-normal"> / hr</span>
                    </div>

                    <button
                      onClick={() => setSelectedProForEscrow(pro)}
                      className="px-3.5 py-1.5 rounded-full bg-gray-900 hover:bg-[#F97316] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Escrow Modal */}
      {selectedProForEscrow && (
        <EscrowModal
          professional={selectedProForEscrow}
          isOpen={true}
          onClose={() => setSelectedProForEscrow(null)}
        />
      )}

    </section>
  );
}
