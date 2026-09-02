export interface ExtractedFilterState {
  rawQuery: string;
  detectedCategory?: string;
  detectedSubcategory?: string;
  detectedLocation?: string;
  maxBudgetINR?: number;
  minBudgetINR?: number;
  availability?: 'available_now' | 'available_tomorrow' | 'emergency' | 'today' | 'this_week';
  radiusKm?: number;
  onlyRemote?: boolean;
  onlyOnsite?: boolean;
  preferredGender?: 'female' | 'male';
  isNearMe?: boolean;
  minTrustScore?: number;
}

export function parseNaturalLanguageQuery(query: string): ExtractedFilterState {
  const q = query.toLowerCase().trim();
  const result: ExtractedFilterState = {
    rawQuery: query,
  };

  // 1. Detect Budget (e.g. "under ₹12000", "under 8000", "below 5k", "under 5000", "budget 15000")
  const budgetMatch = q.match(/(?:under|below|budget|less than|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)(k)?/i);
  if (budgetMatch) {
    let amount = parseInt(budgetMatch[1], 10);
    if (budgetMatch[2]) {
      amount *= 1000;
    } else if (amount < 100) {
      // e.g. "under 50k" -> amount was 50, but if someone wrote "under 50" maybe 50k
      amount *= 1000;
    }
    result.maxBudgetINR = amount;
  }

  // 2. Detect Availability & Timing
  if (q.includes('emergency') || q.includes('urgent') || q.includes('right now') || q.includes('asap')) {
    result.availability = 'emergency';
  } else if (q.includes('tomorrow')) {
    result.availability = 'available_tomorrow';
  } else if (q.includes('today') || q.includes('tonight')) {
    result.availability = 'today';
  } else if (q.includes('available now') || q.includes('live now') || q.includes('now')) {
    result.availability = 'available_now';
  }

  // 3. Detect Locations (Specific Areas or Cities)
  const knownLocations = [
    'gachibowli', 'hitech city', 'madhapur', 'jubilee hills', 'kondapur', 
    'banjara hills', 'hyderabad', 'koramangala', 'indiranagar', 'hsr layout',
    'whitefield', 'bengaluru', 'bangalore', 'bandra', 'andheri', 'mumbai', 
    'cyberhub', 'gurgaon', 'noida', 'delhi', 'pune', 'kolkata', 'chennai'
  ];

  for (const loc of knownLocations) {
    if (q.includes(loc)) {
      result.detectedLocation = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  if (q.includes('near me') || q.includes('nearby') || q.includes('around me') || q.includes('closest')) {
    result.isNearMe = true;
    result.radiusKm = 10;
  }

  // 4. Detect Categories & Subcategories
  if (q.includes('wedding photographer') || (q.includes('wedding') && q.includes('photo'))) {
    result.detectedCategory = 'Photography & Videography';
    result.detectedSubcategory = 'Wedding Photographer';
  } else if (q.includes('drone') || q.includes('drone operator') || q.includes('drone videographer')) {
    result.detectedCategory = 'Photography & Videography';
    result.detectedSubcategory = 'Drone Photographer';
  } else if (q.includes('photographer') || q.includes('photoshoot') || q.includes('photography')) {
    result.detectedCategory = 'Photography & Videography';
    result.detectedSubcategory = 'Photographer';
  } else if (q.includes('video editor') || q.includes('reels editor') || q.includes('youtube editor') || q.includes('editing')) {
    result.detectedCategory = 'Photography & Videography';
    result.detectedSubcategory = 'Video Editor';
  } else if (q.includes('ui/ux') || q.includes('ui designer') || q.includes('ux designer') || q.includes('product designer')) {
    result.detectedCategory = 'Design & Creative';
    result.detectedSubcategory = 'UI/UX Designer';
  } else if (q.includes('logo') || q.includes('logo designer') || q.includes('brand designer') || q.includes('graphic designer')) {
    result.detectedCategory = 'Design & Creative';
    result.detectedSubcategory = 'Graphic Designer';
  } else if (q.includes('react') || q.includes('next.js') || q.includes('frontend') || q.includes('full stack') || q.includes('developer') || q.includes('coder')) {
    result.detectedCategory = 'Software & Technology';
    result.detectedSubcategory = 'Developer';
  } else if (q.includes('ai engineer') || q.includes('machine learning') || q.includes('prompt engineer') || q.includes('gemini')) {
    result.detectedCategory = 'Software & Technology';
    result.detectedSubcategory = 'AI Engineer';
  } else if (q.includes('ca') || q.includes('chartered accountant') || q.includes('gst') || q.includes('tax') || q.includes('accountant')) {
    result.detectedCategory = 'Business Services';
    result.detectedSubcategory = 'Chartered Accountant (CA)';
  } else if (q.includes('marketing') || q.includes('meta ads') || q.includes('google ads') || q.includes('seo') || q.includes('digital marketer')) {
    result.detectedCategory = 'Marketing & Growth';
    result.detectedSubcategory = 'Performance Marketer';
  } else if (q.includes('tutor') || q.includes('mentor') || q.includes('teacher') || q.includes('coaching')) {
    result.detectedCategory = 'Education & Coaching';
    result.detectedSubcategory = 'Tutor';
  }

  // 5. Detect Gender Preference
  if (q.includes('female') || q.includes('woman') || q.includes('girl')) {
    result.preferredGender = 'female';
  } else if (q.includes('male') || q.includes('man') || q.includes('boy')) {
    result.preferredGender = 'male';
  }

  // 6. Detect Remote vs Onsite
  if (q.includes('remote') || q.includes('online') || q.includes('work from home')) {
    result.onlyRemote = true;
  } else if (q.includes('onsite') || q.includes('in-person') || q.includes('offline') || q.includes('near')) {
    result.onlyOnsite = true;
  }

  return result;
}
