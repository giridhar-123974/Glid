'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const POPULAR_CATEGORIES = [
  {
    title: 'Software & AI Engineering',
    tagline: 'Next.js 15, React 19, Python & LLMs',
    count: '4,850+ Pros',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=tech'
  },
  {
    title: 'Photography & 4K Cinema',
    tagline: 'Sony FX3/FX6, DGCA Drone & Events',
    count: '3,240+ Pros',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=creators'
  },
  {
    title: 'Product UI/UX & Brand Design',
    tagline: 'Figma Systems, Mobile Apps & 3D',
    count: '3,120+ Pros',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=design'
  },
  {
    title: 'On-Demand Home Services',
    tagline: 'Govt Certified Electricians & AC Repair',
    count: '3,820+ Pros',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=home_services'
  },
  {
    title: 'Chartered Accountants & Legal',
    tagline: 'Pvt Ltd Setup, GST Audit & Tax',
    count: '1,480+ Pros',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=business'
  },
  {
    title: '1-on-1 Tutors & Mentors',
    tagline: 'Coding Mentors, IIT Prep & Yoga',
    count: '1,950+ Pros',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
    href: '/explore?category=education'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Handpicked verified professionals across top disciplines
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs font-bold text-gray-900 hover:text-[#F97316] flex items-center gap-1 group transition-colors"
          >
            <span>View all 50+ sectors</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Clean Photo-First Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10] border border-gray-200/80 shadow-2xs hover:shadow-airbnb transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Photography with Zoom on Hover */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

              {/* Card Content */}
              <div className="relative z-10 space-y-1 text-white">
                <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block">
                  {cat.count}
                </span>
                <h3 className="text-lg font-black tracking-tight text-white group-hover:text-orange-200 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-300 font-normal">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
