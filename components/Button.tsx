import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 rounded-lg focus:outline-none uppercase disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-roblox-accent hover:bg-[#00E090] text-black border border-transparent shadow-neon hover:shadow-neon-hover",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm",
    outline: "border border-white/20 hover:border-white/50 text-gray-300 hover:text-white bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};