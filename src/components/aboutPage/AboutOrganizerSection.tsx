"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';


export const AboutOrganizersSection = () => {
  // Animation variants for the grid container to stagger its children
    const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

 const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };


  return (
    <Section>
      <SectionTitle>About the Organizers</SectionTitle>
      
      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
      </motion.div>
    </Section>
  );
};