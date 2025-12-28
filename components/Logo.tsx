import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  // Size mapping
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-5xl' : 'text-3xl';
  const gap = size === 'sm' ? 'gap-2' : 'gap-3';

  return (
    <div className={`flex items-center ${gap} select-none group ${className}`}>
      {/* Modern Neon Cube Icon */}
      <div className={`relative ${dim} shrink-0`}>
         {/* Background Glow */}
         <div className="absolute inset-0 bg-roblox-accent/30 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
         
         <svg 
           viewBox="0 0 64 64" 
           fill="none" 
           className="w-full h-full drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" 
           xmlns="http://www.w3.org/2000/svg"
         >
           <defs>
             <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#34d399" /> {/* Emerald 400 */}
               <stop offset="100%" stopColor="#059669" /> {/* Emerald 600 */}
             </linearGradient>
             <linearGradient id="darkSide" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#065f46" /> 
               <stop offset="100%" stopColor="#064e3b" /> 
             </linearGradient>
           </defs>

           {/* Main Cube Body - Isometric */}
           {/* Left Face (Dark) */}
           <path d="M4 16 L32 32 V60 L4 44 Z" fill="url(#darkSide)" className="opacity-90" />
           
           {/* Right Face (Medium) */}
           <path d="M32 32 L60 16 V44 L32 60 Z" fill="#10b981" className="opacity-80" />
           
           {/* Top Face (Bright) */}
           <path d="M4 16 L32 0 L60 16 L32 32 Z" fill="url(#cubeGradient)" />

           {/* Inner "Core" / Stud - Represents the 'Generation' spark */}
           <path d="M32 8 L48 16 L32 24 L16 16 Z" fill="#ecfdf5" className="opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
           
           {/* Tech Accents / Highlights */}
           <path d="M4 16 L32 32 L60 16" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
           <path d="M32 60 V32" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
         </svg>
      </div>

      <div className="flex flex-col justify-center leading-none">
        {/* Typography: Bold, Condensed, Modern */}
        <div className={`flex items-baseline ${textSize} font-black tracking-tight`}>
          <span className="text-white mr-[2px] drop-shadow-md">BLOX</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-roblox-accent to-emerald-200 relative">
            NAME
            {/* Small decorative dot */}
            <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse hidden md:block"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
