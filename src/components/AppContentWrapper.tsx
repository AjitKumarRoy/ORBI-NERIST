// FILE: src/components/AppContentWrapper.tsx
"use client"; // This component MUST be a client component

import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import InitialLoader from "@/components/InitialLoader";
import { NotificationBar } from "@/components/NotificationBar";
import { BannerSection } from "@/components/BannerSection";
import { useLoading } from "@/context/LoadingContext"; // Use the client hook here

interface AppContentWrapperProps {
  children: React.ReactNode;
}

// This component will conditionally render the main UI based on the loading state
export default function AppContentWrapper({ children }: AppContentWrapperProps) {
  const { isLoading } = useLoading(); // This hook requires the component to be a client component

  return (
    <>
      {/* Initial Loader - always rendered, but its visibility is controlled by its own internal state
          and the global isLoading state from context */}
      <InitialLoader />

      {/* Render the main application content only when isLoading is false */}
      {!isLoading && (
        <>
          <NotificationBar />
          <BannerSection />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
