"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from "@/components/ui/Section";
import newsData from '@/data/Notices/latestNewsTicker.json';
import { Newspaper, ChevronUp, ChevronDown } from 'lucide-react';

export function LatestNewsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex(prevIndex => (prevIndex - 1 + newsData.length) % newsData.length);
  };
  const handleNext = () => {
    setIndex(prevIndex => (prevIndex + 1) % newsData.length);
  };

  const currentNewsItem = newsData[index];

  return (
    <Section>
        <div className="flex items-center rounded-xl border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-3 sm:p-2 shadow-2xl backdrop-blur-md">
        
        <div className="flex-shrink-0 bg-cyan-500 text-white font-bold flex items-center justify-center rounded-lg px-4 py-3">
          <Newspaper className="h-6 w-6 sm:mr-3" />
          <span className="hidden sm:inline">Latest News</span>
        </div>

        {/* This container is now flexible in height */}
        <div className="flex-grow min-h-[2.5rem] flex items-center mx-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              // New fade animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Removed truncate class to allow wrapping */}
              <Link href={currentNewsItem.link} className="block text-slate-200 hover:text-white transition-colors text-sm sm:text-base" target='_blank'>
                {currentNewsItem.text}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-shrink-0 flex items-center gap-1">
          <button onClick={handlePrev} aria-label="Previous news item" className="p-2 rounded-md text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <ChevronUp className="h-5 w-5" />
          </button>
          <button onClick={handleNext} aria-label="Next news item" className="p-2 rounded-md text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

      </div>
    </Section>
  );
}