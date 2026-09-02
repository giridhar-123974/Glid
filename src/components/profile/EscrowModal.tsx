'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  X, 
  Calendar, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Professional } from '@/types';
import { calculateEscrowFee, formatINR } from '@/lib/utils';

interface EscrowModalProps {
  professional: Professional;
  isOpen: boolean;
  onClose: () => void;
}

export default function EscrowModal({ professional, isOpen, onClose }: EscrowModalProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectAmount, setProjectAmount] = useState(professional.hourlyRateINR * 20);
  const [milestones, setMilestones] = useState([
    { name: 'Phase 1: Architecture & UI Prototype (40%)', percentage: 40 },
    { name: 'Phase 2: Core Development & Integration (40%)', percentage: 40 },
    { name: 'Phase 3: QA, Staging Test & Final Handover (20%)', percentage: 20 },
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const feeDetails = calculateEscrowFee(projectAmount);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#0F5132] mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Escrow Deposited Successfully!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your funds of <strong className="text-[#0F5132]">{formatINR(projectAmount)}</strong> are locked safely with the RBI Trustee. {professional.name} has been notified to begin work.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-[#0F5132] text-white font-extrabold text-xs shadow-md hover:bg-[#14532D]"
              >
                Go to Project Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#0F5132]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-1.5">
                  Hire {professional.name}
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                </h3>
                <p className="text-xs text-gray-500 font-semibold">
                  100% Protected by GLID Bank Escrow Guarantee
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">
                  Project Title / Scope
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 Web Application & Stripe Escrow Integration"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">
                  Total Contract Budget (INR)
                </label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={projectAmount}
                  onChange={(e) => setProjectAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm font-black font-mono"
                />
              </div>
            </div>

            {/* Milestones Preview */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-500 block">
                Protected Milestone Distribution
              </label>
              <div className="space-y-2">
                {milestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{m.name}</span>
                    <span className="font-mono font-black text-[#0F5132]">
                      {formatINR((projectAmount * m.percentage) / 100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Breakdown Summary */}
            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-gray-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Contract Amount:</span>
                <span className="font-mono font-bold text-gray-900">{formatINR(projectAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Escrow Fee ({feeDetails.feePercentage}%):</span>
                <span className="font-mono font-bold text-gray-900">{formatINR(feeDetails.platformFee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-extrabold text-gray-900 text-sm">
                <span>Total Escrow Deposit:</span>
                <span className="font-mono text-[#0F5132]">{formatINR(projectAmount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 btn-magnetic"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Escrow Funds</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
