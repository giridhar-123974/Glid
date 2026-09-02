'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ShieldCheck, Zap, Building2, Users } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Student / Starter',
      badge: 'Free Forever',
      price: '₹0',
      period: 'lifetime',
      description: 'Ideal for university students, fresh grads, and entry-level freelancers building their identity.',
      features: [
        'Verified Student Badge',
        'Basic Portfolio Showcase (3 items)',
        'Apply to 5 jobs/month',
        'Standard Escrow Protection',
        'Access to Coding & Career Mentors'
      ],
      cta: 'Join as Student',
      href: '/dashboard?plan=student',
      popular: false,
    },
    {
      name: 'Professional',
      badge: 'Most Popular',
      price: billingCycle === 'monthly' ? '₹299' : '₹2,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For active freelancers and creators looking for verified trust, higher rankings, and AI assistance.',
      features: [
        'Official Green Verified Pro Badge',
        'Unlimited Portfolio Items & Media Gallery',
        '10 AI Proposal Drafts / month',
        'AI Bio & Rate Assistant',
        'Higher Search Ranking & Discovery',
        'Priority Dispute & Support Desk'
      ],
      cta: 'Get Verified Pro',
      href: '/dashboard?plan=pro',
      popular: true,
    },
    {
      name: 'Professional Plus',
      badge: 'Top 1% Tier',
      price: billingCycle === 'monthly' ? '₹699' : '₹6,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For seasoned consultants and high-volume freelancers seeking maximum reach.',
      features: [
        'Everything in Professional',
        'Unlimited AI Proposal Generation',
        'Featured Top-of-Search Placement',
        'Custom Portfolio Domain (glid.me/you)',
        'Detailed Profile Analytics & Viewers',
        'Direct Client Inquiries'
      ],
      cta: 'Upgrade to Pro Plus',
      href: '/dashboard?plan=pro-plus',
      popular: false,
    },
    {
      name: 'Business & Startup',
      badge: 'For Employers',
      price: billingCycle === 'monthly' ? '₹999' : '₹9,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For founders, companies, and product leaders hiring verified talent & assembling squads.',
      features: [
        'Unlimited Job Postings & Inquiries',
        'AI Startup Squad Builder',
        'Company Profile & Verified Employer Badge',
        'Consolidated Milestone Invoicing (GST)',
        'Dedicated Escrow Account Manager'
      ],
      cta: 'Start Hiring',
      href: '/dashboard?plan=business',
      popular: false,
    },
    {
      name: 'Agency Hub',
      badge: 'For Squads & Agencies',
      price: billingCycle === 'monthly' ? '₹4,999' : '₹49,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For creative studios, dev agencies, and consultancies managing multiple team members.',
      features: [
        'Unlimited Team Member Seats',
        'Agency Profile with Roster Management',
        'Recruitment Dashboard & Enterprise Leads',
        'Multi-Talent Escrow Routing',
        'Custom SLA & Legal Contracts'
      ],
      cta: 'Launch Agency Hub',
      href: '/dashboard?plan=agency',
      popular: false,
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAF8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#0F5132] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#16A34A]" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Plans for Every Career Stage & Business
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Invest in your verified identity. Zero hidden platform markups.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-[#DCFCE7] text-[#0F5132] px-1.5 py-0.5 rounded font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 5 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 ${
                plan.popular
                  ? 'bg-white border-2 border-[#16A34A] shadow-premium ring-4 ring-emerald-500/10 scale-105 z-10'
                  : 'bg-white border border-gray-200 hover:border-emerald-400 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0F5132] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                  Recommended
                </div>
              )}

              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {plan.badge}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#0F5132] font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2 min-h-[36px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.href}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center text-center ${
                    plan.popular
                      ? 'bg-[#0F5132] hover:bg-[#14532D] text-white shadow-sm'
                      : 'bg-[#DCFCE7] text-[#0F5132] hover:bg-[#0F5132] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
