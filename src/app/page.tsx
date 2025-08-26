import { Metadata } from 'next';

// Import Section Components
import { HeroSection } from '@/components/homePage/HeroSection';
import { LatestNewsTicker } from '@/components/homePage/LatestNewsTicker';
import { Notices } from '@/components/homePage/Notices';
import { AboutSection } from '@/components/homePage/AboutSection';
import { ResearchThemes } from '@/components/homePage/ResearchThemes';
import { LatestNews } from '@/components/homePage/LatestNews';
import { TeamSection } from "@/components/homePage/TeamSection";
import { LatestProjects } from '@/components/homePage/LatestProjects';
import { RecentPublications } from '@/components/homePage/RecentPublications';
import { Collaborators } from '@/components/homePage/Collaborators';
import { FaqAndCTA } from '@/components/homePage/FaqAndCTA';



// --- SEO Optimization: Updated Metadata ---
export const metadata: Metadata = {
  title: "SMART-25 AI Conference | Sustainable Tech & SDGs | Nov 21-22, 2025",
  description: "Join SMART-25, the 4th International Conference on AI for Sustainable Development Goals. Submit your paper for this premier hybrid event at Villa College, Maldives.",
  keywords: ["Scopus indexed conference", "Scopus indexed journal", "AI conference 2025", "sustainable technology", "SDGs", "machine learning conference", "SMART-25", "SMART 25", "SMART 2025", "IIT Bhilai","Villa College", "St. Mother Theresa Engineering College", "international conference India", "paper submission", "AI research"],
  alternates: {
    canonical: "https://smart25.org/", // Replace with your actual domain
  },
  openGraph: {
    title: "SMART-25: Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations",
    description: "Join researchers and experts at SMART-25 to explore how AI can accelerate the UN's Sustainable Development Goals. Hybrid mode, November 21-22, 2025.",
    url: "https://smart25.org/", // Replace with your actual domain
    siteName: "SMART-25 Conference",
    images: [
      {
        url: 'https://smart25.org/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'SMART-25 AI Conference Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SMART-25 AI Conference | Sustainable Tech & SDGs | Nov 21-22, 2025",
    description: "Join SMART-25, the 4th International Conference on AI for Sustainable Development Goals. Submit your paper for this premier hybrid event.",
    images: ['https://smart25.org/og-image.jpg'], // IMPORTANT: Create and upload a Twitter-specific image
  },
};

export default function Homepage() {

   // --- SEO Optimization: JSON-LD Structured Data ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "SMART-25: Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations",
    "startDate": "2025-11-21T09:00",
    "endDate": "2025-11-22T17:00",
    "image": [
      "https://smart25.org/og-image.jpg" 
    ],
    "eventAttendanceMode": "https://schema.org/HybridEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Villa college, Maldives",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Male",
        "addressLocality": "Male",
        "addressRegion": "Male",
        "postalCode": "20373",
        "addressCountry": "MV"
      }
    },
    "description": "The 4th International Conference on AI for Sustainable Development Goals, accelerating SDGs through AI research and collaboration.",
    "organizer": {
      "@type": "Organization",
      "name": "IIT Bhilai, Villa College, Maldives and St. Mother Teresa Engineering College",
      "url": "https://www.iitbhilai.ac.in/" // Link to the primary organizer
    },
    "offers": {
      "@type": "Offer",
      "url": "https://smart25.org/registration", // Replace with your domain
      "price": "100", // Example price, update as needed
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-07-29"
    }
  };


  return (
    <>
     {/* This script injects the structured data into the page's <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    
    <div className="bg-slate-950 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]">
      <HeroSection />
      <LatestNewsTicker />
      <Notices />
      <AboutSection />
      <ResearchThemes />
      <LatestNews />
      <TeamSection />
      <LatestProjects />
      <RecentPublications />
      <Collaborators />
      <FaqAndCTA />
    </div>
    </>
  );
}