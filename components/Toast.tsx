import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-full shadow-2xl animate-fade-in-up" role="alert">
      <CheckCircle className="w-5 h-5 text-roblox-accent" />
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white" aria-label="Close notification">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};