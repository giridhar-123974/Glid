export type UserRole = 'customer' | 'professional' | 'business' | 'agency' | 'admin' | 'student';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: string[];
  talentCount: number;
  count?: string;
  popularSkills: string[];
}

export interface VerificationBadges {
  isIdentityVerified: boolean; // Aadhaar/Passport/Govt ID
  isGithubVerified?: boolean;
  isLinkedinVerified?: boolean;
  isBehanceVerified?: boolean;
  isPortfolioVerified: boolean;
  isTopRated: boolean;
  isStudentFriendly?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  tags: string[];
  metrics?: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  priceINR: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export interface Review {
  id: string;
  clientName: string;
  clientCompany?: string;
  clientRole?: string;
  clientAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
  verifiedPayment: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type LiveAvailabilityStatus = 'available_now' | 'busy' | 'offline' | 'emergency' | 'available_tomorrow';

export interface Professional {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  cityArea: string; // e.g., 'Hitech City', 'Gachibowli', 'Koramangala', 'Indiranagar'
  landmark?: string;
  coordinates: Coordinates;
  country: string;
  isRemoteAvailable: boolean;
  isOnsiteAvailable: boolean;
  liveStatus: LiveAvailabilityStatus;
  distanceKm?: number; // calculated relative to user position
  etaMinutes?: number;
  transportMode?: 'bike' | 'cab' | 'walk';
  serviceRadiusKm?: number;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  category: string;
  subcategory: string;
  skills: string[];
  hourlyRateINR: number;
  startingPriceINR: number;
  trustScore: number; // 0 - 100
  opportunityScore: number; // 0 - 100
  responseTime: string;
  repeatClientRate: number; // percentage
  jobSuccessRate: number; // percentage
  completedProjectsCount: number;
  verifications: VerificationBadges;
  portfolio: PortfolioItem[];
  services: ServicePackage[];
  reviews: Review[];
  languages: string[];
  experienceYears: number;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
}

export interface AITeamRole {
  roleTitle: string;
  category: string;
  skills: string[];
  recommendedProfessional: Professional;
  estimatedBudgetINR: number;
  timelineWeeks: number;
}

export interface AITeamSuggestion {
  projectTitle: string;
  projectDescription: string;
  totalEstimatedBudgetINR: number;
  estimatedDurationWeeks: number;
  squad: AITeamRole[];
}

export interface EscrowMilestone {
  id: string;
  title: string;
  amountINR: number;
  status: 'funded' | 'in_progress' | 'submitted' | 'approved' | 'released';
  dueDate: string;
}

export interface ProjectContract {
  id: string;
  title: string;
  clientName: string;
  professionalName: string;
  professionalAvatar: string;
  totalAmountINR: number;
  platformFeeINR: number;
  escrowStatus: 'held_in_escrow' | 'partially_released' | 'fully_released' | 'disputed';
  milestones: EscrowMilestone[];
  createdAt: string;
}

export interface PlatformStats {
  verifiedProfessionals: string;
  disbursedEscrowINR: string;
  escrowSuccessRate: string;
  averageMatchTime: string;
  activeContracts: number;
  citiesActive: number;
}

