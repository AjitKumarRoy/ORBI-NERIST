"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { FaBullhorn, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";

// Importing datas
import announcementsData from "@/data/Notices/announcements.json";
import recruitmentsData from "@/data/Notices/recruitments.json";

// Helper to automatically determine if an item is new (published in the last 30 days)
const isItemNew = (dateString: string): boolean => {
  if (!dateString) return false;
  const itemDate = new Date(dateString);
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 30);
  return itemDate > tenDaysAgo;
};

// Helper to format the date nicely
const formatPublishedDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function AnnouncementRecruitment() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null); // Ref for the scrollable panel

  // --- UPDATED LOGIC: Using separate data and slicing to get the latest 20 ---
  const announcements = useMemo(() =>
    announcementsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20),
    []
  );

  const recruitments = useMemo(() =>
    recruitmentsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20),
    []
  );

  const tabs = [
    { name: "Announcements", icon: FaBullhorn, data: announcements, link: "/announcements"  },
    { name: "Recruitment", icon: FaUserPlus, data: recruitments, link: "/recruitments" },
  ];

  const CurrentIcon = tabs[selectedIndex].icon;

  // --- FUNCTION TO HANDLE TAB CHANGE ---
  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    // Reset scroll to top
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  };


  return (
    <div className="relative h-full w-full rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] sm:p-6">
      <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Title icon={CurrentIcon} as="h3">
            {tabs[selectedIndex].name}
          </Title>
          <Tab.List className="flex items-center gap-2 mt-4 sm:mt-0">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.name}>
                <Tab
                  className={({ selected }) =>
                    `text-sm font-semibold py-3 focus:outline-none transition-colors duration-300 cursor-pointer ${
                      selected ? 'text-white' : 'text-white/60 hover:text-white'
                    }`
                  }
                >
                  {tab.name}
                </Tab>
                {/* Add a separator after each tab except the last one */}
                {index < tabs.length - 1 && (
                  <span className="text-slate-600">/</span>
                )}
              </React.Fragment>
            ))}
          </Tab.List>
        </div>



        {/* Divider */}
        <motion.div 
          className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        <Tab.Panels ref={panelRef} className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="focus:outline-none">
              <div className="space-y-2">
                {tab.data.length > 0 ? (
                  tab.data.map((item, index) => {
                    // --- APPLYING NEW LOGIC ---
                    const isNew = isItemNew(item.date);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={item.link} className="group flex items-start gap-4 rounded-lg p-3 transition-colors duration-300 hover:bg-white/10">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 mt-1">
                            <FiChevronsRight className="text-base text-cyan-400" />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center">
                              <p className="font-medium text-slate-300 transition-colors duration-300 group-hover:text-cyan-400 sm:text-base">{item.title}</p>
                              {isNew && (
                                <span className="ml-3 text-xs font-semibold bg-cyan-900/70 text-cyan-300 px-2 py-0.5 rounded-full">NEW</span>
                              )}
                            </div>
                            {item.date && (
                              <p className="text-sm text-slate-400 mt-1">
                                Published: {formatPublishedDate(item.date)}
                              </p>
                            )}
                          </div>
                          
                          <FaArrowRight className="mt-1 flex-shrink-0 text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="p-4 text-center text-slate-400">No {tab.name.toLowerCase()} found.</p>
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>

        {/* Divider */}
        <motion.div 
          className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* --- "VIEW ALL" BUTTON --- */}
        <div className="text-center mt-6">
            <Button
            href={tabs[selectedIndex].link}
            variant="secondary"
            className="inline-flex"
          >
            <span>View All {tabs[selectedIndex].name}</span>
            <FaArrowRight />
          </Button>
        </div>
        
      </Tab.Group>
    </div>
  );
}