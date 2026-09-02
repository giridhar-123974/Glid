'use client';

import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, ShieldCheck, Lock, Sparkles, TrendingUp } from 'lucide-react';

const LIVE_EVENTS = [
  {
    icon: Zap,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    title: 'Instant Booking',
    desc: 'Kabir Varma booked for 4K Drone Shoot in Hitech City, Hyderabad',
    time: 'Just now'
  },
  {
    icon: Lock,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: 'Escrow Released',
    desc: '₹1,20,000 Milestone disbursed safely to Arjun Swaminathan',
    time: '2m ago'
  },
  {
    icon: ShieldCheck,
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    title: 'Aadhaar Verified',
    desc: 'Dr. Priya Iyer completed 100% Identity & GST Compliance Audit',
    time: '5m ago'
  },
  {
    icon: Sparkles,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: 'AI Squad Assembled',
    desc: 'CloudPulse AI matched with 3 Full-Stack Engineers in 6.2 mins',
    time: '8m ago'
  },
  {
    icon: TrendingUp,
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    title: 'Trust Score 99%',
    desc: 'Neha Kulkarni reached 100+ flawless project reviews on GLID',
    time: '12m ago'
  }
];

export default function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const current = LIVE_EVENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-md transition-all duration-500 max-w-xl">
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 border ${current.color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-[#0F5132] uppercase tracking-wider">
            {current.title}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">• {current.time}</span>
        </div>
        <p className="text-xs font-semibold text-gray-800 truncate">
          {current.desc}
        </p>
      </div>
      <span className="flex h-2 w-2 relative flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
      </span>
    </div>
  );
}
