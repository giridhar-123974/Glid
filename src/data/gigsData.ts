export interface GigItem {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  sellerInitial: string;
  sellerLevel?: string;
  isPro?: boolean;
  hasVideoConsultation?: boolean;
  isOnline?: boolean;
  coverImage: string;
  title: string;
  rating: number;
  reviewsCount: number;
  startingPriceINR: number;
  category: string;
  subcategory: string;
}

export const GIGS_DATA: GigItem[] = [
  {
    id: 'gig-1',
    sellerName: 'Fernando',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'F',
    isPro: true,
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    title: 'I will build a high-performance Next.js 15 and AI web application',
    rating: 5.0,
    reviewsCount: 420,
    startingPriceINR: 4007,
    category: 'Programming & Tech',
    subcategory: 'Web Development'
  },
  {
    id: 'gig-2',
    sellerName: 'Jacob Paulsen',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'J',
    isPro: true,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    title: 'I will craft your original about us, brand story, mission statement in 24 hours',
    rating: 5.0,
    reviewsCount: 407,
    startingPriceINR: 14023,
    category: 'Writing & Translation',
    subcategory: 'Brand Voice'
  },
  {
    id: 'gig-3',
    sellerName: 'Georgia Austin',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'G',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
    title: 'I will write your brand story and tone of voice guidelines',
    rating: 4.7,
    reviewsCount: 183,
    startingPriceINR: 14524,
    category: 'Writing & Translation',
    subcategory: 'Brand Voice'
  },
  {
    id: 'gig-4',
    sellerName: 'Tiffany R',
    sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'T',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    title: 'I will shoot and direct a 4K studio-level or Netflix-ready pitch deck commercial',
    rating: 4.8,
    reviewsCount: 24,
    startingPriceINR: 17529,
    category: 'Video & Animation',
    subcategory: 'Commercial Video'
  },
  {
    id: 'gig-5',
    sellerName: 'Demi',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'D',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    title: 'I will design a modern UI/UX design system and mobile app wireframe in Figma',
    rating: 4.8,
    reviewsCount: 760,
    startingPriceINR: 15025,
    category: 'Graphics & Design',
    subcategory: 'UI/UX Design'
  },
  {
    id: 'gig-6',
    sellerName: 'Jamila H',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'J',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    title: 'I will craft a captivating brand story that elevates your ecommerce store',
    rating: 4.9,
    reviewsCount: 10,
    startingPriceINR: 6511,
    category: 'Digital Marketing',
    subcategory: 'E-commerce'
  },
  {
    id: 'gig-7',
    sellerName: 'Gabrielle',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'G',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    title: 'I will build your brand message and investor elevator pitch deck',
    rating: 4.5,
    reviewsCount: 398,
    startingPriceINR: 10017,
    category: 'Business',
    subcategory: 'Pitch Decks'
  },
  {
    id: 'gig-8',
    sellerName: 'Jennifer Braun',
    sellerAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'J',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    title: 'I will write your brand story, mission, and company core values',
    rating: 4.9,
    reviewsCount: 171,
    startingPriceINR: 15025,
    category: 'Writing & Translation',
    subcategory: 'Brand Voice'
  },
  {
    id: 'gig-9',
    sellerName: 'Basit Graphics',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'B',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    title: 'I will do modern book cover design, ebook cover, and Kindle cover for Amazon KDP',
    rating: 4.9,
    reviewsCount: 40,
    startingPriceINR: 1002,
    category: 'Graphics & Design',
    subcategory: 'Book Design'
  },
  {
    id: 'gig-10',
    sellerName: 'Amber Johnson',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'A',
    hasVideoConsultation: true,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    title: 'I will create your brand story and customer persona guidelines',
    rating: 4.9,
    reviewsCount: 353,
    startingPriceINR: 10017,
    category: 'Writing & Translation',
    subcategory: 'Brand Voice'
  },
  {
    id: 'gig-11',
    sellerName: 'Akanksha',
    sellerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'A',
    isPro: true,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    title: 'I will create a brand mission statement, brand story, and brand strategy',
    rating: 4.9,
    reviewsCount: 33,
    startingPriceINR: 38063,
    category: 'Business',
    subcategory: 'Brand Strategy'
  },
  {
    id: 'gig-12',
    sellerName: 'Chamal',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    sellerInitial: 'C',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    title: 'I will design a professional logo and brand identity for your business',
    rating: 5.0,
    reviewsCount: 7,
    startingPriceINR: 5510,
    category: 'Graphics & Design',
    subcategory: 'Logo Design'
  }
];
