import React from 'react';

// Define the props for our Title component
interface TitleProps {
  children: React.ReactNode;
  icon?: React.ElementType; // Allows passing an icon component (e.g., Layers)
  as?: 'h1' | 'h2' | 'h3' | 'h4'; // Allows setting the HTML tag for semantics
  className?: string;
}

export const Title = ({ 
  children, 
  icon: Icon,
  as: Tag = 'h2',
  className = '' 
}: TitleProps) => {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
      )}
      {/* Container for the text and its underline */}
      <div>
        <Tag className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 sm:text-4xl">
          {children}
        </Tag>
        {/* The new thin, premium underline */}
        <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0" />
      </div>
    </div>
  );
};