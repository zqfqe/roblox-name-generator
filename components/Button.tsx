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
  const baseStyles = "relative flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-roblox-accent hover:bg-[#009e63] text-white shadow-lg shadow-green-900/20 focus:ring-green-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    outline: "border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white bg-transparent focus:ring-gray-500"
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