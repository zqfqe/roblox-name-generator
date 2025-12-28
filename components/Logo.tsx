import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-5xl' : 'text-3xl';
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      <div className={`${iconSize} relative flex items-center justify-center`}>
         <div className="absolute inset-0 bg-brand-primary blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-400 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-xl"></div>
         <div className="absolute inset-2 bg-brand-dark rounded-md rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
      </div>
      <div className={`font-display font-bold ${textSize} tracking-tight text-white`}>
        Blox<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Name</span>
      </div>
    </div>
  );
};