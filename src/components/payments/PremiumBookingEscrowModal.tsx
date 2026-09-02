'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Info,
  Building,
  Check
} from 'lucide-react';
import { Professional, ServicePackage } from '@/types';
import { formatINR } from '@/lib/utils';

interface PremiumBookingEscrowModalProps {
  professional: Professional;
  onClose: () => void;
  onBookingConfirmed: (bookingData: {
    professional: Professional;
    selectedPackage: ServicePackage | { title: string; priceINR: number; description: string };
    date: string;
    timeSlot: string;
  }) => void;
}

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:30 AM - 01:30 PM',
  '02:00 PM - 04:00 PM',
  '04:30 PM - 06:30 PM',
  '07:00 PM - 09:00 PM'
];

export default function PremiumBookingEscrowModal({
  professional,
  onClose,
  onBookingConfirmed
}: PremiumBookingEscrowModalProps) {
  const [step, setStep] = useState<'package' | 'slot' | 'payment' | 'success'>('package');
  
  // Default package or fallback
  const defaultPkg = professional.services[0] || {
    id: 'default-pkg',
    title: `Standard Service Session (4 Hours)`,
    description: `Dedicated 4-hour onsite / remote engagement with milestone escrow protection.`,
    priceINR: professional.hourlyRateINR * 4,
    deliveryDays: 1,
    revisions: 2,
    features: ['Direct 1-on-1 Access', 'Aadhaar Verified Talent', '100% Escrow Protection']
  };

  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | typeof defaultPkg>(defaultPkg);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:00 AM');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [upiId, setUpiId] = useState('user@okhdfcbank');

  const totalAmount = selectedPackage.priceINR;
  const platformFee = Math.round(totalAmount * 0.03); // 3%
  const gstAmount = Math.round(platformFee * 0.18);
  const grandTotal = totalAmount + platformFee + gstAmount;

  const handlePayAndConfirm = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep('success');
      setTimeout(() => {
        onBookingConfirmed({
          professional,
          selectedPackage,
          date: selectedDate,
          timeSlot: selectedSlot
        });
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-black">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">Book Verified Specialist</h3>
              <p className="text-xs text-gray-400 font-medium">100% RBI Trustee Escrow Protection</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Professional Header Preview */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={professional.avatarUrl}
              alt={professional.name}
              className="w-12 h-12 rounded-xl object-cover border border-white shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-[#0F172A] truncate">{professional.name}</h4>
                <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] text-[9px] font-black">
                  {professional.trustScore}% Trust
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{professional.headline}</p>
              <span className="text-[11px] text-gray-400 block">{professional.cityArea}, {professional.location} • ₹{professional.hourlyRateINR}/hr</span>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-bold">
            <button
              onClick={() => setStep('package')}
              className={`flex items-center gap-1 ${step === 'package' ? 'text-[#FF6B00]' : 'text-gray-400'}`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] flex items-center justify-center font-bold">1</span>
              <span>Package</span>
            </button>
            <span className="text-gray-300">→</span>
            <button
              onClick={() => setStep('slot')}
              className={`flex items-center gap-1 ${step === 'slot' ? 'text-[#FF6B00]' : 'text-gray-400'}`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Schedule</span>
            </button>
            <span className="text-gray-300">→</span>
            <button
              onClick={() => setStep('payment')}
              className={`flex items-center gap-1 ${step === 'payment' ? 'text-[#FF6B00]' : 'text-gray-400'}`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] flex items-center justify-center font-bold">3</span>
              <span>Escrow Pay</span>
            </button>
          </div>

          {/* STEP 1: Select Package */}
          {step === 'package' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Deliverable Package</div>
              
              <div className="space-y-2.5">
                {[...(professional.services || []), defaultPkg].map((pkg, idx) => {
                  const isSelected = selectedPackage.id === pkg.id || (idx === 0 && selectedPackage.id === defaultPkg.id);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#FF6B00] bg-orange-50/40 ring-2 ring-orange-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-bold text-sm text-[#0F172A]">{pkg.title}</h5>
                          <p className="text-xs text-gray-500 mt-0.5">{pkg.description}</p>
                        </div>
                        <span className="text-base font-black text-[#0F172A] whitespace-nowrap">
                          {formatINR(pkg.priceINR)}
                        </span>
                      </div>

                      {pkg.features && (
                        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                          {pkg.features.map((f, i) => (
                            <span key={i} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                              <Check className="w-2.5 h-2.5 text-[#16A34A]" /> {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep('slot')}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Select Date & Slot */}
          {step === 'slot' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Preferred Date & Time</div>
              
              {/* Date Pills */}
              <div className="grid grid-cols-3 gap-2">
                {['Today (Emergency)', 'Tomorrow (Recommended)', 'This Weekend'].map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      selectedDate === date
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-400">Available Slots</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        selectedSlot === slot
                          ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00] font-bold'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span>{slot}</span>
                      {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep('package')}
                  className="px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  className="flex-1 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Escrow Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Escrow Payment Breakdown */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secure Trustee Escrow Payment</div>

              {/* Amount Breakdown Card */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{selectedPackage.title}</span>
                  <span className="font-bold text-[#0F172A]">{formatINR(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform & Trustee Escrow Fee (3%)</span>
                  <span className="font-bold text-[#0F172A]">{formatINR(platformFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18% on platform fee)</span>
                  <span className="font-bold text-[#0F172A]">{formatINR(gstAmount)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-[#0F172A]">
                  <span>Total Escrow Deposit</span>
                  <span className="text-[#FF6B00] text-base">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-400">Select Payment Method</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    UPI Instant
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Cards / EMI
                  </button>
                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. yourname@upi)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                )}
              </div>

              {/* Trust Badge Guarantee */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">100% Milestone Escrow Guarantee</span>
                  <span className="text-[11px] text-emerald-700">
                    Your money is held in an RBI-regulated bank trustee account. It is only released after you share your OTP upon complete satisfaction.
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep('slot')}
                  className="px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handlePayAndConfirm}
                  disabled={isProcessingPayment}
                  className="flex-1 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessingPayment ? 'Securing Escrow Deposit...' : `Deposit ${formatINR(grandTotal)} to Escrow`}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success State */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#0F172A]">Booking & Escrow Confirmed!</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {formatINR(grandTotal)} is securely locked in RBI trustee escrow. Launching live tracking...
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
