export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does GLID differ from Fiverr or Upwork?",
    answer: "GLID is not an open, unverified bidding site. We are India's first AI-powered verified opportunity network. Every professional undergoes DigiLocker Aadhaar KYC, code repository audits, and portfolio authentication. Additionally, funds are held in RBI-compliant trustee bank escrow with milestone-based OTP release.",
    category: "General"
  },
  {
    question: "How does the Bank Escrow Protection work?",
    answer: "When you hire a professional on GLID, your payment is deposited into an independent institutional trustee escrow account. The professional begins work immediately, but funds are only released after you inspect and approve each milestone with an OTP verification code.",
    category: "Payments"
  },
  {
    question: "How does the Google Maps / Rapido style discovery work?",
    answer: "You can type in natural language (e.g. 'Need an electrician in Kondapur today under ₹1500' or 'Wedding cinematographer in Hyderabad'). GLID uses real-time geolocation to match you with nearby available professionals, calculating distance, live availability, and estimated arrival or delivery time.",
    category: "Search"
  },
  {
    question: "What are the platform commission fees?",
    answer: "Traditional freelancing platforms charge up to 20% flat. GLID uses a transparent tiered pricing structure starting at 8% down to 3% for high-value enterprise contracts. Zero hidden fees, with complete GST invoicing.",
    category: "Pricing"
  },
  {
    question: "What if there is a dispute or delay with a deliverable?",
    answer: "Because funds remain in escrow, you have zero chargeback or fraud risk. You can request unlimited milestone revisions within the agreed scope. In the rare case of a dispute, GLID's AI audit and dedicated dispute resolution team review deliverables against the contract terms.",
    category: "Trust & Safety"
  }
];
