"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import heroData from "@/data/homePage/hero.json";
import { FaArrowRight } from "react-icons/fa";

// Animation variants for the text content to stagger their appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" // Use a valid easing string like "easeOut"
    },
  },
};


export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="/images/video_poster.jpg" // Optional: A static image to show while the video loads
      >
        <source src={heroData.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 3. Foreground Content */}
      <div className="relative z-20 container mx-auto px-4 w-full">
        {/* UPDATED: Reduced the gap on smaller screens for a tighter layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          
          {/* Left Column: Breathing Satellite Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1], // The "breathing" effect
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={heroData.satelliteImage}
                alt={heroData.altText}
                width={500}
                height={500}
                // UPDATED: Made the image smaller on mobile and tablet
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Text & CTA */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              // UPDATED: Reduced font size on mobile and tablet
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-2"
            >
              {heroData.title}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              // UPDATED: Adjusted font size for better readability on smaller screens
              className="text-lg sm:text-xl md:text-2xl text-slate-200 font-light"
            >
              {heroData.subtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link
                href={heroData.ctaButton.link}
                className="group inline-flex items-center justify-center rounded-md bg-cyan-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:scale-105"
              >
                {heroData.ctaButton.text}
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};