'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Briefcase, 
  CreditCard, 
  DollarSign, 
  Users, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  FileText, 
  Check, 
  ArrowUpRight,
  Eye,
  Video,
  Download,
  Award,
  Radio
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';
import RealtimeChatWindow from '@/components/chat/RealtimeChatWindow';
import RazorpayEscrowGatewayModal from '@/components/payments/RazorpayEscrowGatewayModal';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as any) || 'customer';
  const initialTab = (searchParams.get('tab') as any) || 'overview';
  
  const [currentRole, setCurrentRole] = useState<'customer' | 'professional' | 'business' | 'admin'>(initialRole);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'wallet' | 'messages' | 'verifications'>(
    initialTab === 'messages' ? 'messages' : initialTab === 'bookings' ? 'projects' : 'overview'
  );

  // Escrow Release State
  const [milestones, setMilestones] = useState([
    { id: 'm1', title: 'Phase 1: Architecture & UI Prototype', amount: 25000, status: 'approved', pro: PROFESSIONALS[0] },
    { id: 'm2', title: 'Phase 2: Next.js 15 Backend & DB Schema', amount: 35000, status: 'submitted', pro: PROFESSIONALS[0] },
    { id: 'm3', title: 'Phase 3: Production Security & Release', amount: 15000, status: 'funded', pro: PROFESSIONALS[0] },
  ]);

  const [selectedProForPayment, setSelectedProForPayment] = useState<any | null>(null);

  const handleApproveAndRelease = (milestoneId: string) => {
    setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, status: 'approved' } : m));
    alert("Milestone approved! ₹35,000 released from Trustee Escrow with GST Tax Invoice generated.");
  };

  return (
    <div className="py-10 bg-[#F8F9FB] min-h-screen text-[#0F172A] font-sans">
      
      {/* Razorpay Escrow Modal */}
      {selectedProForPayment && (
        <RazorpayEscrowGatewayModal
          professional={selectedProForPayment}
          contractAmountINR={selectedProForPayment.hourlyRateINR * 4}
          onClose={() => setSelectedProForPayment(null)}
          onPaymentSuccess={(txId) => {
            alert(`Escrow Deposit ${txId} confirmed in Trustee Account!`);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Role Switcher Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00]">
              INTERACTIVE MULTI-ROLE DASHBOARD
            </div>
            <div className="text-xl font-black text-[#0F172A]">
              GLID Command Center
            </div>
          </div>

          {/* Role selector buttons */}
          <div className="flex items-center gap-1 bg-[#F8F9FB] p-1 rounded-xl border border-[#E8EBF0]">
            {(['customer', 'professional', 'business'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  currentRole === role
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8EBF0] pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: TrendingUp },
            { id: 'projects', label: 'Active Deals & Bookings', icon: Briefcase },
            { id: 'wallet', label: 'Escrow Wallet & Invoices', icon: CreditCard },
            { id: 'messages', label: 'Real-Time Chat & Calls', icon: MessageSquare },
            { id: 'verifications', label: 'DigiLocker KYC & Trust', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#FF6B00] text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E8EBF0] hover:text-[#0F172A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & STATS                                           */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-2">
                <span className="text-xs font-bold text-[#64748B]">Escrow Balance</span>
                <div className="text-2xl font-black text-[#FF6B00]">₹75,000.00</div>
                <span className="text-[10px] text-[#16A34A] font-bold block">🔒 100% Bank Protected</span>
              </div>

              <div className="p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-2">
                <span className="text-xs font-bold text-[#64748B]">Active Projects</span>
                <div className="text-2xl font-black text-[#0F172A]">3 Ongoing</div>
                <span className="text-[10px] text-gray-500 font-bold block">⚡ 1 Pending Milestone Release</span>
              </div>

              <div className="p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-2">
                <span className="text-xs font-bold text-[#64748B]">Trust Score</span>
                <div className="text-2xl font-black text-[#16A34A]">99 / 100</div>
                <span className="text-[10px] text-[#16A34A] font-bold block">✓ Government KYC Verified</span>
              </div>

              <div className="p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-2">
                <span className="text-xs font-bold text-[#64748B]">Lifetime Payouts</span>
                <div className="text-2xl font-black text-[#0F172A]">₹3,40,000</div>
                <span className="text-[10px] text-gray-500 font-bold block">📄 18 GST Invoices</span>
              </div>
            </div>

            {/* Recent Milestones List */}
            <div className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#0F172A]">Live Milestone Escrow Pipeline</h3>
                <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Institutional Bank Escrow Active
                </span>
              </div>

              <div className="space-y-3">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0F172A]">{m.title}</h4>
                        <span className="text-[11px] text-[#64748B]">Assigned to {m.pro.name} • 📍 {m.pro.cityArea}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-xs font-black text-[#0F172A]">₹{m.amount.toLocaleString()}</span>
                        <span className={`text-[10px] font-bold block ${
                          m.status === 'approved' ? 'text-[#16A34A]' : m.status === 'submitted' ? 'text-[#FF6B00]' : 'text-gray-400'
                        }`}>
                          {m.status === 'approved' ? '✓ Released to Bank' : m.status === 'submitted' ? '⏳ Work Submitted (Review)' : '🔒 Locked in Escrow'}
                        </span>
                      </div>

                      {m.status === 'submitted' && (
                        <button
                          onClick={() => handleApproveAndRelease(m.id)}
                          className="btn-primary px-3.5 py-1.5 text-xs font-bold shadow-xs whitespace-nowrap"
                        >
                          Approve & Release (OTP: 7492)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 4: REAL-TIME MESSAGING & VIDEO CALL                           */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Encrypted Messages & Video Calls</h3>
                <p className="text-xs text-[#64748B]">Real-time discussions with milestone lock triggers</p>
              </div>
            </div>

            <RealtimeChatWindow
              professional={PROFESSIONALS[0]}
            />
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 3: WALLET & INVOICES                                          */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-4 lg:col-span-1">
              <span className="text-xs font-bold text-[#64748B] uppercase">Institutional Escrow Balance</span>
              <div className="text-3xl font-black text-[#FF6B00]">₹75,000.00</div>
              <p className="text-xs text-[#64748B]">Funds are stored in a dedicated RBI-regulated trustee escrow bank account.</p>
              <button
                onClick={() => setSelectedProForPayment(PROFESSIONALS[0])}
                className="w-full btn-primary py-3 text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>Deposit to Escrow (Razorpay)</span>
              </button>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-4 lg:col-span-2">
              <h3 className="text-base font-black text-[#0F172A]">Tax Invoices (GST 18%)</h3>
              <div className="space-y-3">
                {[
                  { inv: 'INV-2026-09-8472', pro: 'Rahul Sharma', amt: '₹29,500', date: '01 Sep 2026' },
                  { inv: 'INV-2026-08-1194', pro: 'Priya Menon', amt: '₹17,700', date: '28 Aug 2026' }
                ].map((inv, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#0F172A] block">{inv.inv}</span>
                      <span className="text-[11px] text-[#64748B]">{inv.pro} • {inv.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xs text-[#0F172A]">{inv.amt}</span>
                      <button
                        onClick={() => alert(`Downloading ${inv.inv}.pdf...`)}
                        className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-xs font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 5: DIGILOCKER KYC & VERIFICATIONS                             */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'verifications' && (
          <div className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#16A34A] uppercase">GOVERNMENT INTEGRATION</span>
              <h3 className="text-lg font-black text-[#0F172A]">DigiLocker Aadhaar & GST Identity Radar</h3>
              <p className="text-xs text-[#64748B]">Every professional on GLID undergoes biometric facial verification & Aadhaar KYC.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Aadhaar KYC
                </span>
                <p className="text-[11px] text-emerald-800">Biometrically authenticated via UIDAI DigiLocker node.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Bank Account Escrow Verification
                </span>
                <p className="text-[11px] text-emerald-800">Penny-drop verified for instant automated milestone disbursement.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Police & Background Check
                </span>
                <p className="text-[11px] text-emerald-800">Clean legal record certified across Indian national databases.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading GLID Multi-Role Command Center...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
