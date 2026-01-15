import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, isLoading, variant = 'primary', className = '', disabled, ...props 
}) => {
  const baseStyles = "relative flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-indigo-500 text-white shadow-glow-primary hover:shadow-glow-accent",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md",
    outline: "border border-white/20 hover:border-white/50 text-gray-300 hover:text-white"
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