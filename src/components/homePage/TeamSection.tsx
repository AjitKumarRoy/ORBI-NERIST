"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import teamData from '@/data/teamPage/team.json';
import { TeamCard } from '@/components/ui/TeamCard';
import { Users, ArrowRight } from 'lucide-react';
import { Carousel } from '@/components/ui/Carousel1'; // Import the Carousel

export function TeamSection() {
  const featuredMembers = useMemo(() => teamData.coreMembers.filter(member => member.featured), []);

  return (
    <Section>
      
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:text-left">
        <Title icon={Users} as="h2" className="mb-0">
                Guidance & Mentorship
              </Title>

              <Button href="/team" variant="secondary" className="hidden md:inline-flex">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
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