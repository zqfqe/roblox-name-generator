import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  // Size mapping
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-20 h-20' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-6xl' : 'text-3xl';
  const gap = size === 'sm' ? 'gap-2' : 'gap-4';

  return (
    <div className={`flex items-center ${gap} select-none group ${className}`}>
      {/* Modern Geometric Icon */}
      <div className={`relative ${dim} shrink-0`}>
         {/* Background Glow */}
         <div className="absolute inset-0 bg-roblox-accent/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
         
         <svg 
           viewBox="0 0 64 64" 
           fill="none" 
           className="w-full h-full drop-shadow-2xl" 
           xmlns="http://www.w3.org/2000/svg"
         >
           <defs>
             <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#00FFA3" /> 
               <stop offset="100%" stopColor="#00CC82" />
             </linearGradient>
           </defs>

           {/* Stylized 'B' / Block shape */}
           <path d="M12 12 L32 4 L52 12 V52 L32 60 L12 52 Z" stroke="url(#mainGrad)" strokeWidth="3" fill="rgba(0,0,0,0.5)" className="group-hover:stroke-white transition-colors duration-500" />
           <path d="M32 4 V60" stroke="url(#mainGrad)" strokeWidth="1" className="opacity-50" />
           <path d="M12 32 L52 32" stroke="url(#mainGrad)" strokeWidth="1" className="opacity-50" />
           
           {/* Center Core */}
           <rect x="24" y="24" width="16" height="16" fill="#00FFA3" className="opacity-80 group-hover:animate-pulse" />
         </svg>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <div className={`flex items-baseline ${textSize} font-black tracking-tighter`}>
          <span className="text-white drop-shadow-lg">BLOX</span>
          <span className="text-roblox-accent">NAME</span>
        </div>
      </div>
    </div>
  );
};