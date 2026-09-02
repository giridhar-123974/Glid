'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Code, 
  Palette, 
  Camera, 
  Megaphone, 
  Film, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  HeartPulse, 
  Scissors, 
  PartyPopper, 
  Music, 
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  MapPin,
  Star,
  Clock,
  Heart,
  Lock,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Navigation
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';
import PremiumBookingEscrowModal from '@/components/payments/PremiumBookingEscrowModal';
import UberStyleLiveTrackerModal from '@/components/maps/UberStyleLiveTrackerModal';
import { formatINR } from '@/lib/utils';

interface ServiceCategory {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  description: string;
  talentCount: string;
  subcategories: {
    name: string;
    description: string;
    startingPriceINR: number;
    count: string;
  }[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'tech',
    name: 'Technology & AI',
    icon: Code,
    tagline: 'Software developers, AI engineers, DevOps & cloud architects',
    description: 'Hire vetted Next.js 15, React 19, Python, and mobile app engineers with verified GitHub portfolios and 100% milestone escrow.',
    talentCount: '4,850+ Pros',
    subcategories: [
      { name: 'Full Stack Developer', description: 'Next.js 15, React 19, TypeScript, Node.js & PostgreSQL', startingPriceINR: 1500, count: '1,420 Pros' },
      { name: 'Frontend Developer', description: 'React, Vue, Tailwind CSS, WebGL & Micro-frontends', startingPriceINR: 1200, count: '980 Pros' },
      { name: 'Backend Developer', description: 'Python FastAPI, Go, NestJS, GraphQL & Microservices', startingPriceINR: 1400, count: '890 Pros' },
      { name: 'Mobile Developer', description: 'React Native, Flutter, Swift iOS & Kotlin Android', startingPriceINR: 1600, count: '650 Pros' },
      { name: 'AI & LLM Engineer', description: 'OpenAI, LangChain, RAG Systems, Pinecone & Llama 3', startingPriceINR: 2500, count: '480 Pros' },
      { name: 'DevOps & Cloud Engineer', description: 'AWS, GCP, Kubernetes, Docker, Terraform & CI/CD', startingPriceINR: 1800, count: '390 Pros' },
      { name: 'Cloud Architect', description: 'Multi-cloud enterprise infrastructure & SOC2 compliance', startingPriceINR: 3000, count: '210 Pros' },
      { name: 'UI/UX Designer', description: 'Figma design systems, wireframes, user testing & prototypes', startingPriceINR: 1200, count: '740 Pros' },
      { name: 'Graphic Designer', description: 'Brand kits, vector illustration, packaging & motion design', startingPriceINR: 800, count: '620 Pros' }
    ]
  },
  {
    id: 'creative',
    name: 'Creative & Media',
    icon: Camera,
    tagline: 'Sony FX3 cinematographers, drone pilots & video editors',
    description: 'Discover certified commercial photographers, licensed drone operators, and DaVinci Resolve colorists nearby.',
    talentCount: '3,240+ Pros',
    subcategories: [
      { name: 'Photographer', description: 'Commercial fashion, product shoots, studio & portraiture', startingPriceINR: 2000, count: '940 Pros' },
      { name: 'Videographer', description: '4K commercial video production with Sony FX3 / FX6 rigs', startingPriceINR: 3500, count: '680 Pros' },
      { name: 'Drone Operator', description: 'DGCA licensed commercial aerial filming & mapping', startingPriceINR: 4000, count: '320 Pros' },
      { name: 'Video Editor', description: 'Premiere Pro, DaVinci Resolve color grading & reels editing', startingPriceINR: 1000, count: '780 Pros' },
      { name: 'Music Producer', description: 'Custom beats, audio mastering, mixing & soundtrack scoring', startingPriceINR: 2500, count: '290 Pros' },
      { name: 'Singer & Voice Artist', description: 'Studio voiceovers, commercial jingles & multi-lingual vocals', startingPriceINR: 1500, count: '210 Pros' },
      { name: 'Content Creator', description: 'UGC brand reels, product demos & social media campaigns', startingPriceINR: 1800, count: '540 Pros' }
    ]
  },
  {
    id: 'design',
    name: 'Design & UI/UX',
    icon: Palette,
    tagline: 'Design systems, branding, 3D art & mobile UX',
    description: 'Transform your brand with Figma UI/UX design systems, 3D motion design, and high-converting landing pages.',
    talentCount: '3,120+ Pros',
    subcategories: [
      { name: 'Figma UI/UX Design', description: 'End-to-end mobile & web app interfaces and design tokens', startingPriceINR: 1500, count: '1,120 Pros' },
      { name: 'Brand Identity & Logo', description: 'Minimalist vector logos, typography guides & brand kits', startingPriceINR: 1000, count: '890 Pros' },
      { name: '3D Blender & Motion', description: '3D product renders, spatial animations & promotional motion', startingPriceINR: 2200, count: '430 Pros' },
      { name: 'Landing Page Design', description: 'High-conversion SaaS web design & Webflow development', startingPriceINR: 1800, count: '680 Pros' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Legal',
    icon: Briefcase,
    tagline: 'Chartered Accountants, startup lawyers & tax consultants',
    description: 'Incorporate your private limited company, file GST & income tax returns, and protect IP with verified CAs and lawyers.',
    talentCount: '1,480+ Pros',
    subcategories: [
      { name: 'Chartered Accountant', description: 'Pvt Ltd incorporation, GST audits & statutory compliance', startingPriceINR: 2000, count: '580 Pros' },
      { name: 'Lawyer & Legal Advisory', description: 'Commercial contracts, founder agreements & trademark filing', startingPriceINR: 2500, count: '410 Pros' },
      { name: 'Tax Consultant', description: 'Corporate income tax planning & international remittances', startingPriceINR: 1800, count: '320 Pros' },
      { name: 'HR Consultant', description: 'Payroll structuring, employee handbooks & compliance', startingPriceINR: 1200, count: '170 Pros' }
    ]
  },
  {
    id: 'home_services',
    name: 'Home & Skilled Services',
    icon: Zap,
    tagline: 'Certified electricians, plumbers & maintenance experts',
    description: 'Book licensed electricians, AC technicians, carpenters, and plumbers arriving onsite in under 30 minutes with live GPS tracking.',
    talentCount: '3,820+ Pros',
    subcategories: [
      { name: 'Electrician', description: 'Emergency circuit diagnosis, high-voltage wiring & installations', startingPriceINR: 500, count: '1,320 Pros' },
      { name: 'Plumber', description: 'Sanitary pipe fittings, leakage detection & motor repair', startingPriceINR: 450, count: '980 Pros' },
      { name: 'Carpenter', description: 'Custom woodwork, modular furniture assembly & door repair', startingPriceINR: 600, count: '640 Pros' },
      { name: 'Painter', description: 'Interior texture painting, waterproof coating & wall prep', startingPriceINR: 700, count: '420 Pros' },
      { name: 'AC Repair Technician', description: 'Inverter AC gas refilling, jet cleaning & PCB repair', startingPriceINR: 800, count: '590 Pros' },
      { name: 'Mechanic', description: 'Onsite 2-wheeler & 4-wheeler roadside diagnostics', startingPriceINR: 600, count: '310 Pros' }
    ]
  },
  {
    id: 'education',
    name: 'Education & Mentors',
    icon: GraduationCap,
    tagline: '1-on-1 coding mentors, school tutors & competitive coaches',
    description: 'Book verified 1-on-1 tutors for school curricula, coding bootcamps, and IIT/NEET competitive preparation.',
    talentCount: '1,950+ Pros',
    subcategories: [
      { name: 'Coding & AI Mentors', description: '1-on-1 Python, JavaScript, DSA & System Design mentorship', startingPriceINR: 1200, count: '780 Pros' },
      { name: 'Academic Tutors (K-12)', description: 'CBSE, ICSE & IGCSE Math, Physics, Chemistry & Biology', startingPriceINR: 600, count: '820 Pros' },
      { name: 'Language Trainers', description: 'Spoken English, German, French & Japanese certifications', startingPriceINR: 800, count: '350 Pros' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: HeartPulse,
    tagline: 'Personal fitness trainers, yoga coaches & dietitians',
    description: 'Certified home & remote fitness coaches with customized workout plans and nutritional monitoring.',
    talentCount: '1,120+ Pros',
    subcategories: [
      { name: 'Personal Fitness Trainer', description: 'Strength conditioning, weight loss & personalized home workouts', startingPriceINR: 1000, count: '540 Pros' },
      { name: 'Yoga Instructor', description: 'Hatha, Ashtanga & therapeutic pranayama breathwork', startingPriceINR: 800, count: '390 Pros' },
      { name: 'Clinical Nutritionist', description: 'Macro meal planning, diabetic diets & athletic nutrition', startingPriceINR: 1200, count: '190 Pros' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Grooming',
    icon: Scissors,
    tagline: 'Bridal makeup artists, hair stylists & grooming pros',
    description: 'Verified bridal makeup artists and salon-grade hairstylists providing at-home luxury services.',
    talentCount: '1,680+ Pros',
    subcategories: [
      { name: 'Bridal Makeup Artist', description: 'HD & Airbrush bridal makeup with trial draping & styling', startingPriceINR: 3500, count: '890 Pros' },
      { name: 'Hair Stylist & Grooming', description: 'Creative haircuts, keratin treatments & beard styling', startingPriceINR: 800, count: '790 Pros' }
    ]
  },
  {
    id: 'events',
    name: 'Events & Experiences',
    icon: PartyPopper,
    tagline: 'DJs, wedding anchors, decorators & caterers',
    description: 'Hire verified sound engineers, professional event DJs, and floral decorators for corporate and private events.',
    talentCount: '1,340+ Pros',
    subcategories: [
      { name: 'Event DJ & Sound', description: 'Pioneer DJ setups, EDM, Bollywood & wedding sound mixes', startingPriceINR: 5000, count: '520 Pros' },
      { name: 'Event Planner & Anchor', description: 'Corporate emcees, wedding coordinators & stage management', startingPriceINR: 4000, count: '440 Pros' },
      { name: 'Decorator', description: 'Floral themes, LED stage lighting & wedding mandap decor', startingPriceINR: 6000, count: '380 Pros' }
    ]
  }
];

function ServicesDirectoryContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'tech';
  
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCat);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [proForBooking, setProForBooking] = useState<Professional | null>(null);
  const [proForLiveTracking, setProForLiveTracking] = useState<Professional | null>(null);

  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat && SERVICE_CATEGORIES.some(c => c.id === urlCat)) {
      setSelectedCatId(urlCat);
      setSelectedSubcategory(null);
    }
  }, [searchParams]);

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === selectedCatId) || SERVICE_CATEGORIES[0];

  // Filter professionals belonging to this category and subcategory
  const filteredProfessionals = PROFESSIONALS.filter(pro => {
    // Map category matching
    const catMatch = 
      (activeCategory.id === 'tech' && (pro.category === 'tech' || pro.category === 'technology' || pro.category === 'Tech')) ||
      (activeCategory.id === 'creative' && (pro.category === 'creators' || pro.category === 'media' || pro.category === 'Creative')) ||
      (activeCategory.id === 'design' && (pro.category === 'design' || pro.category === 'Design')) ||
      (activeCategory.id === 'business' && (pro.category === 'business' || pro.category === 'Business')) ||
      (activeCategory.id === 'home_services' && (pro.category === 'home_services' || pro.category === 'Home Services')) ||
      (activeCategory.id === 'education' && (pro.category === 'education' || pro.category === 'Education')) ||
      (activeCategory.id === 'health' && (pro.category === 'health' || pro.category === 'Health')) ||
      (activeCategory.id === 'beauty' && (pro.category === 'beauty' || pro.category === 'Beauty')) ||
      (activeCategory.id === 'events' && (pro.category === 'events' || pro.category === 'Events'));

    if (!catMatch && filteredProfessionalsFallback(pro, activeCategory.id)) {
      // Allow fallback match if broad
    }

    if (selectedSubcategory) {
      const subLower = selectedSubcategory.toLowerCase();
      const proHeadline = pro.headline.toLowerCase();
      const proSkills = pro.skills.map(s => s.toLowerCase()).join(' ');
      const proSub = pro.subcategory.toLowerCase();
      return proSub.includes(subLower) || proHeadline.includes(subLower) || proSkills.includes(subLower);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        pro.name.toLowerCase().includes(q) ||
        pro.headline.toLowerCase().includes(q) ||
        pro.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    return true;
  });

  function filteredProfessionalsFallback(pro: Professional, catId: string) {
    if (catId === 'tech' && pro.skills.some(s => ['React', 'Next.js', 'Python', 'AI'].includes(s))) return true;
    if (catId === 'creative' && pro.skills.some(s => ['Sony FX3', 'Drone', 'Video'].includes(s))) return true;
    return false;
  }

  // If specific filter returned 0, show category's available talent
  const displayPros = filteredProfessionals.length > 0 
    ? filteredProfessionals 
    : PROFESSIONALS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-orange-100 selection:text-[#FF6B00]">
      
      {/* Booking Checkout Modal */}
      {proForBooking && (
        <PremiumBookingEscrowModal
          professional={proForBooking}
          onClose={() => setProForBooking(null)}
          onBookingConfirmed={(data) => {
            setProForBooking(null);
            setProForLiveTracking(data.professional);
          }}
        />
      )}

      {/* Uber-Style Live Tracker Modal */}
      {proForLiveTracking && (
        <UberStyleLiveTrackerModal
          professional={proForLiveTracking}
          bookingTitle={`${proForLiveTracking.subcategory} Booking`}
          contractAmountINR={proForLiveTracking.hourlyRateINR * 4}
          onClose={() => setProForLiveTracking(null)}
        />
      )}

      {/* Page Header */}
      <div className="border-b border-gray-100 bg-[#F8F9FB] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLID Services & Subcategories Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
            Browse Services by Category
          </h1>

          <p className="text-xs sm:text-base text-[#6B7280] max-w-2xl leading-relaxed">
            Select a service category and subcategory to view transparent pricing, verified portfolios, and available specialists ready to book with 100% escrow protection.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-lg">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subcategories, skills, or specialist names..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B00] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs Strip */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCatId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSelectedSubcategory(null);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-[#F8F9FB] hover:bg-gray-200 text-[#111827]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* ===================================================================== */}
        {/* 1. SUBCATEGORIES SECTION */}
        {/* ===================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">
                {activeCategory.talentCount} Available
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mt-0.5">
                {activeCategory.name} Subcategories
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">{activeCategory.description}</p>
            </div>

            <Link
              href={`/explore?category=${activeCategory.id}`}
              className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>View On Live Map 📍</span>
            </Link>
          </div>

          {/* Subcategories Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.subcategories.map((sub, idx) => {
              const isSelected = selectedSubcategory === sub.name;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSubcategory(isSelected ? null : sub.name)}
                  className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-orange-50/50 border-[#FF6B00] ring-2 ring-orange-500/20 shadow-md'
                      : 'bg-[#F8F9FB] border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#111827]">{sub.name}</h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {sub.count}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{sub.description}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-500 font-semibold text-xs">
                      {sub.count} available
                    </span>
                    <span className={`text-[11px] font-bold flex items-center gap-1 ${isSelected ? 'text-[#FF6B00]' : 'text-gray-400 group-hover:text-black'}`}>
                      <span>{isSelected ? 'Selected' : 'View Specialists'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 2. AVAILABLE VERIFIED SPECIALISTS UNDER THIS (SUB)CATEGORY */}
        {/* ===================================================================== */}
        <section className="space-y-6 pt-4 border-t border-gray-100">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">
                Verified Available Talent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mt-0.5">
                {selectedSubcategory 
                  ? `Available Specialists for "${selectedSubcategory}"` 
                  : `Top Rated in ${activeCategory.name}`}
              </h2>
            </div>

            {selectedSubcategory && (
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="text-xs font-bold text-gray-500 hover:text-black underline"
              >
                Clear Subcategory Filter
              </button>
            )}
          </div>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPros.map((pro) => (
              <div
                key={pro.id}
                className="rounded-3xl border border-gray-200/80 bg-white p-5 hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0 w-12 h-12">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pro.avatarUrl}
                          alt={pro.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[8px] font-bold border border-white">
                          ✓
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm sm:text-base text-[#111827] truncate">{pro.name}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] text-[9px] font-black flex-shrink-0">
                            {pro.trustScore}% Trust
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] font-medium line-clamp-1 mt-0.5">{pro.headline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Distance & Availability */}
                  <div className="flex items-center gap-2 mt-3.5 text-[11px] font-bold">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      {pro.cityArea} • {pro.distanceKm} km
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Available Today
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pro.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#16A34A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Pro</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/profile/${pro.id}`}
                      className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={() => setProForBooking(pro)}
                      className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E85D00] text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-all"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

      </div>

    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-bold text-gray-400">Loading Services Directory...</p>
        </div>
      </div>
    }>
      <ServicesDirectoryContent />
    </Suspense>
  );
}
