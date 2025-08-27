"use client";

import { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Users } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  link: string;
  image: string;
}

interface PublicationCardProps {
  publication: Publication;
}

export const PublicationCard = ({ publication }: PublicationCardProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullAuthorList = publication.authors.join(', ');

  useLayoutEffect(() => {
    if (textRef.current && containerRef.current) {
      const isOverflow = textRef.current.scrollWidth > containerRef.current.offsetWidth;
      setIsOverflowing(isOverflow);
    }
  }, [publication.authors]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] transition-all duration-300 hover:border-cyan-400/50 flex flex-col group">
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg">
        <Image src={publication.image} alt={publication.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {/* --- UPDATED AUTHOR LIST OVERLAY --- */}
        <div 
          ref={containerRef}
          className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-2 bg-gradient-to-t from-black/80 to-transparent"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <Users className="h-4 w-4 flex-shrink-0 text-slate-300" />
          <div className="overflow-hidden whitespace-nowrap">
            <p 
              ref={textRef}
              className={`inline-block text-xs text-slate-300 ${isOverflowing ? 'animate-marquee' : ''}`}
            >
              {/* Duplicate the text for a seamless loop if it's overflowing */}
              {isOverflowing ? `${fullAuthorList} \u00A0\u00A0•\u00A0\u00A0 ${fullAuthorList}` : fullAuthorList}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        <p className="mb-2 font-semibold text-cyan-400 font-heading">Published: {publication.year}</p>
        <h3 className="mb-4 text-lg font-bold text-white line-clamp-3 font-heading">{publication.title}</h3>
      </div>
      <div className="mt-auto">
        <Button href={publication.link} variant="secondary" className="inline-flex w-full justify-center">
          View Publication
        </Button>
      </div>
    </div>
  );
};