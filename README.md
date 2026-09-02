# GLID. — The Trusted Marketplace to Hire Verified Specialists & Talent Near You

<div align="center">

![GLID Platform Banner](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80)

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Discover DigiLocker-authenticated engineers, creators, technicians, and consultants — dispatched with real-time tracking and bank-grade escrow security.**

[Live Demo](http://localhost:3000) • [Explore Map](http://localhost:3000/explore) • [AI Tools](http://localhost:3000/ai-tools) • [Escrow Guarantee](http://localhost:3000/escrow-guarantee)

</div>

---

## 🚀 Overview

**GLID** is a next-generation hyper-local and digital talent platform designed to bridge the gap between verified specialists and clients. Combining live street map radar with secure milestone escrow payments, DigiLocker identity authentication, and AI proposal matching, GLID delivers an unmatched freelancing and on-demand hiring experience.

---

## ✨ Key Features

### 📍 1. Google Maps Talent Radar (`/explore`)
- **Single-Input Unified Search**: Search by specialty, skill, or keyword.
- **Dynamic Radius Filtering**: Quick toggle between `2 km`, `5 km`, `10 km`, `20 km`, and `50 km`.
- **Live Specialist Markers**: Interactive map pins showing hourly rates, ratings, DigiLocker badges, and distance.
- **Route Tracking**: Instant distance and dispatch routing simulation.

### 🛡️ 2. Bank-Grade Milestone Escrow & Security (`/escrow-guarantee`)
- **Zero-Risk Transactions**: Client funds are held in secure escrow and released only upon satisfactory milestone completion.
- **Instant Dispute Resolution**: Multi-tier mediation with 100% money-back guarantee.
- **DigiLocker & Aadhaar KYC**: Every professional is identity-verified before accepting work.

### 👤 3. Authentication & Profile Experience
- **Top-Right Profile Pill**: Shows verified avatar, user display name, trust rating, and verification badge.
- **Interactive Quick Menu**: Fast navigation to Dashboard, Orders, Escrow Wallet, and Settings.
- **Multi-Role Onboarding**: Seamless registration flows for Customers, Freelancers/Professionals, and Businesses.

### ⚡ 4. AI Studio Suite (`/ai-tools`)
- **AI Proposal Generator**: Generate structured milestone-based proposals in seconds.
- **Smart Skill Matching**: Automatic matching of client project briefs with local top-rated talent.
- **Contract Assistant**: AI-generated service-level agreements and scope estimation.

### 💬 5. Real-Time Chat & Collaboration
- Direct client-to-freelancer messaging with milestone negotiation and quote attachments.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS animations
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps Engine**: Custom Interactive OpenStreetMap / Google Maps integration
- **State Management**: React Context API (`AuthContext`) with persistent LocalStorage

---

## 📂 Project Structure

```bash
Gfree/
├── public/                     # Static assets & branding SVG/images
├── src/
│   ├── app/                    # Next.js 15 App Router Pages
│   │   ├── ai-tools/           # AI Studio suite
│   │   ├── dashboard/          # User analytics & orders
│   │   ├── escrow-guarantee/   # Escrow protection details
│   │   ├── explore/            # Map radar & geo search
│   │   ├── profile/[id]/       # Specialist profile view
│   │   ├── services/           # Services directory
│   │   ├── globals.css         # Design system tokens & styles
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   └── page.tsx            # Main homepage
│   ├── components/
│   │   ├── account/            # Onboarding & Auth Modals
│   │   ├── ai/                 # AI Proposal Generator
│   │   ├── chat/               # Live Messaging
│   │   ├── home/               # Homepage sections & flows
│   │   ├── layout/             # Navbar & Footer
│   │   ├── maps/               # Interactive map & tracking modals
│   │   ├── payments/           # Escrow & Razorpay simulations
│   │   └── ui/                 # Reusable buttons, badges, counters
│   ├── context/
│   │   └── AuthContext.tsx     # Session management & user state
│   ├── data/                   # Mock specialists, FAQs, and categories
│   ├── lib/                    # Helper utilities & AI query parsers
│   └── types/                  # TypeScript interfaces
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/giridhar-123974/Glid.git
   cd Glid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Deployment

To build and run the optimized production bundle:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <b>Built with ❤️ by Giridhar Naik</b>
</div>
