'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  User, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  X,
  CreditCard,
  MessageSquare,
  Calendar,
  Layers
} from 'lucide-react';
import { PROFESSIONALS, CATEGORIES } from '@/data/mockData';

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filteredPros = PROFESSIONALS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.headline.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCats = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-[20px] shadow-2xl border border-[#E8EBF0] overflow-hidden animate-in zoom-in-95">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8EBF0] gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command, search talent, services, or locations..."
            className="w-full bg-transparent text-sm font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 text-xs font-bold"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          
          {/* Quick Actions */}
          {!search && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick Actions</span>
              <button
                onClick={() => { router.push('/explore'); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FB] text-left font-semibold text-[#0F172A]"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#FF6B00]" />
                  <span>Explore All 200,000+ Verified Professionals</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <button
                onClick={() => { router.push('/dashboard?tab=messages'); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FB] text-left font-semibold text-[#0F172A]"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
                  <span>Open Real-Time Messages & Active Deals</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <button
                onClick={() => { router.push('/dashboard?tab=bookings'); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FB] text-left font-semibold text-[#0F172A]"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#16A34A]" />
                  <span>View Escrow Milestone Wallet & Invoices</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          )}

          {/* Professionals */}
          {filteredPros.length > 0 && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified Specialists</span>
              {filteredPros.slice(0, 4).map(pro => (
                <button
                  key={pro.id}
                  onClick={() => { router.push(`/profile/${pro.id}`); setIsOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FB] text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pro.avatarUrl} alt={pro.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0F172A] flex items-center gap-1">
                        {pro.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                      </h4>
                      <p className="text-[11px] text-[#64748B]">{pro.headline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#0F172A]">₹{pro.hourlyRateINR}/hr</span>
                    <span className="text-[10px] text-[#16A34A] block">{pro.trustScore}% Trust</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          {filteredCats.length > 0 && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Categories</span>
              {filteredCats.slice(0, 3).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { router.push(`/explore?category=${cat.id}`); setIsOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FB] text-left font-semibold text-[#0F172A]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{cat.count || `${cat.talentCount}+ Pros`}</span>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#F8F9FB] border-t border-[#E8EBF0] flex items-center justify-between text-[11px] text-gray-400">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate, <strong>ESC</strong> to close</span>
          <span className="text-[#FF6B00] font-bold">GLID AI Quick Search</span>
        </div>

      </div>
    </div>
  );
}
