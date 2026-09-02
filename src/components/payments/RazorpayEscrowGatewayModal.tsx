'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Check, 
  Smartphone, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { Professional } from '@/types';

export default function RazorpayEscrowGatewayModal({
  professional,
  contractAmountINR = 4800,
  onClose,
  onPaymentSuccess
}: {
  professional: Professional;
  contractAmountINR?: number;
  onClose: () => void;
  onPaymentSuccess?: (txId: string) => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'cards' | 'netbanking' | 'wallet'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState('user@oksbi');
  const [cardHolder, setCardHolder] = useState('Giridhar Naik');
  const [cardNumber, setCardNumber] = useState('4532 8921 0042 7719');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('491');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Payment Status Lifecycle
  // 'configure' -> 'processing' -> 'escrow_locked' -> 'completed'
  const [paymentStatus, setPaymentStatus] = useState<'configure' | 'processing' | 'escrow_locked' | 'completed'>('configure');
  const [progressCount, setProgressCount] = useState(0);
  const [completionOtp, setCompletionOtp] = useState('7492');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpError, setIsOtpError] = useState(false);

  const gstAmount = Math.round(contractAmountINR * 0.18);
  const totalPayable = contractAmountINR + gstAmount;

  const handlePayNow = () => {
    setPaymentStatus('processing');
    setProgressCount(0);

    const interval = setInterval(() => {
      setProgressCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPaymentStatus('escrow_locked');
          if (onPaymentSuccess) onPaymentSuccess('TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase());
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleVerifyOtpAndRelease = () => {
    if (enteredOtp.trim() === completionOtp || enteredOtp.trim() === '7492') {
      setIsOtpError(false);
      setPaymentStatus('completed');
    } else {
      setIsOtpError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm font-bold"
        >
          ✕
        </button>

        {/* Header with Razorpay & Trustee Escrow Badges */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                100% Institutional Bank Escrow
              </span>
              <span className="text-[10px] font-bold text-gray-400">Powered by Razorpay</span>
            </div>
            <h3 className="text-xl font-black text-[#111827] mt-1">
              Secure Escrow Payment
            </h3>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* STAGE 1: CONFIGURE PAYMENT METHOD                                 */}
        {/* ----------------------------------------------------------------- */}
        {paymentStatus === 'configure' && (
          <div className="space-y-5 text-xs">
            
            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={professional.avatarUrl} alt={professional.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111827]">{professional.name}</h4>
                  <p className="text-[11px] text-[#6B7280]">{professional.headline}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Total Escrow</span>
                <span className="text-base font-black text-[#FF6B00]">₹{totalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'cards', label: 'Cards', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'wallet', label: 'Wallet', icon: Wallet }
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`py-2.5 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      selectedMethod === m.id
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-[#F7F8FA] text-[#111827] border border-[#E5E7EB] hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Details Pane */}
            {selectedMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-3">
                <div className="flex gap-2">
                  {(['gpay', 'phonepe', 'paytm', 'qr'] as const).map(app => (
                    <button
                      key={app}
                      onClick={() => setUpiApp(app)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize text-xs ${
                        upiApp === app ? 'bg-[#FF6B00] text-white' : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {app === 'qr' ? 'Scan QR' : app}
                    </button>
                  ))}
                </div>

                {upiApp !== 'qr' ? (
                  <div>
                    <label className="block font-bold text-[#111827] mb-1">Enter UPI VPA ID:</label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full p-2.5 rounded-xl bg-gray-50 border border-[#E5E7EB] font-mono text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center space-y-2">
                    <div className="w-28 h-28 bg-white border border-gray-300 p-2 mx-auto rounded-lg shadow-xs flex items-center justify-center font-mono text-2xl font-black text-gray-800">
                      QR CODE
                    </div>
                    <span className="text-[11px] text-gray-500 block">Scan with any UPI app (GPay, PhonePe, Paytm)</span>
                  </div>
                )}
              </div>
            )}

            {selectedMethod === 'cards' && (
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-3">
                <div>
                  <label className="block font-bold text-[#111827] mb-1">Card Number:</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-gray-50 border border-[#E5E7EB] font-mono text-xs font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#111827] mb-1">Expiry (MM/YY):</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-gray-50 border border-[#E5E7EB] font-mono text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#111827] mb-1">CVV:</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-gray-50 border border-[#E5E7EB] font-mono text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-2">
                <label className="block font-bold text-[#111827]">Choose Bank:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map(bank => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl font-bold text-left text-xs ${
                        selectedBank === bank ? 'bg-[#FF6B00] text-white' : 'bg-gray-50 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedMethod === 'wallet' && (
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-950">GLID Escrow Wallet Balance</span>
                  <span className="text-base font-black text-[#FF6B00]">₹18,450.00</span>
                </div>
                <p className="text-[11px] text-gray-600">Sufficient balance available for instant 1-click escrow locking.</p>
              </div>
            )}

            {/* Fee Breakdown */}
            <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Contract Deliverables Fee (Locked in Escrow)</span>
                <span className="font-bold text-gray-900">₹{contractAmountINR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST Tax (18% with input credit invoice)</span>
                <span className="font-bold text-gray-900">₹{gstAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              className="w-full btn-primary py-3.5 text-xs font-bold shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Pay & Lock ₹{totalPayable.toLocaleString()} in Escrow</span>
            </button>

          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STAGE 2: PROCESSING ANIMATION                                     */}
        {/* ----------------------------------------------------------------- */}
        {paymentStatus === 'processing' && (
          <div className="py-12 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] border-4 border-[#FF6B00] border-t-transparent animate-spin mx-auto" />
            <div>
              <h4 className="text-lg font-black text-[#111827]">Securing Funds in Bank Escrow...</h4>
              <p className="text-xs text-gray-500 mt-1">Connecting to Razorpay RBI-regulated trustee nodes ({progressCount}%)</p>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STAGE 3: FUNDS SAFELY LOCKED + OTP VERIFICATION SIMULATOR         */}
        {/* ----------------------------------------------------------------- */}
        {paymentStatus === 'escrow_locked' && (
          <div className="space-y-6 text-xs animate-in zoom-in-95">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">₹{totalPayable.toLocaleString()} Safely Locked in Escrow</h4>
                <p className="text-[11px] text-emerald-800">
                  {professional.name} has been notified and will begin work immediately.
                </p>
              </div>
            </div>

            {/* Cryptographic Completion OTP */}
            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 text-center space-y-2">
              <span className="text-[10px] font-black uppercase text-orange-950 tracking-wider">
                YOUR CRYPTOGRAPHIC MILESTONE OTP
              </span>
              <div className="text-4xl font-black text-[#FF6B00] font-mono tracking-widest">
                {completionOtp}
              </div>
              <p className="text-[11px] text-gray-600">
                Share this 4-digit OTP with {professional.name} <strong>ONLY after</strong> you inspect the completed deliverables.
              </p>
            </div>

            {/* Work Completion & OTP Simulation Form */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-3">
              <label className="block font-bold text-[#111827]">
                Simulate Payout Release (Enter OTP to release payment):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 7492"
                  className="flex-1 p-2.5 rounded-xl bg-white border border-[#E5E7EB] font-mono text-center text-sm font-bold focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  onClick={handleVerifyOtpAndRelease}
                  className="px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs"
                >
                  Verify & Release Payout
                </button>
              </div>
              {isOtpError && (
                <span className="text-[11px] text-red-500 font-bold block">Invalid OTP. Enter 7492.</span>
              )}
            </div>

          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STAGE 4: PAYMENT RELEASED & GST INVOICE DOWNLOAD                  */}
        {/* ----------------------------------------------------------------- */}
        {paymentStatus === 'completed' && (
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 text-xs">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-black text-[#111827]">Escrow Payout Complete!</h4>
              <p className="text-xs text-gray-600 mt-1">
                ₹{contractAmountINR.toLocaleString()} has been released to {professional.name}&apos;s verified bank account.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction Ref:</span>
                <span className="font-mono font-bold text-gray-900">GLID_TXN_99182390</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST Invoice Number:</span>
                <span className="font-mono font-bold text-gray-900">INV-2026-09-8472</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => alert("Downloading GST Invoice PDF (INV-2026-09-8472.pdf)...")}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary py-3 text-xs font-bold shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
