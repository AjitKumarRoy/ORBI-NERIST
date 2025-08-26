import Link from 'next/link';
import React from 'react';

// --- THIS IS THE UPDATED PROP TYPE ---
// It now accepts props for both button and anchor (link) elements.
type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
} & (React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>);


export const Button = ({ 
  children, 
  href, 
  variant = 'secondary',
  className = '', 
  ...rest 
}: ButtonProps) => {

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300";

  const variantClasses = {
    primary: "bg-cyan-600 text-white shadow-lg hover:bg-cyan-500 hover:scale-105",
    secondary: "border border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};