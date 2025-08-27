"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import teamData from '@/data/teamPage/coreMembers.json';
import { TeamCard } from '@/components/ui/TeamCard';
import { Users, ArrowRight } from 'lucide-react';
import { Carousel } from '@/components/ui/Carousel1'; // Import the Carousel

export function TeamSection() {
  const featuredMembers = useMemo(() => teamData.filter(member => member.featured), []);

  return (
    <Section>
      
      <div className="flex items-center justify-between">
        <Title icon={Users} as="h2" className="mb-0">
                Guidance & Mentorship
              </Title>

              <span className="hidden md:inline-flex">
                <Button href="/team" variant="secondary" >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              </span>
            </div>
      
      {/* --- The grid is now replaced with the Carousel --- */}
      <Carousel viewportClassName="embla">
        {featuredMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </Carousel>

      <div className="mt-20 text-center md:hidden">
        <Button href="/team" variant="secondary" className="inline-flex">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}