import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Search } from 'lucide-react';
import { Logo } from '../components/Logo';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
      <div className="mb-8 opacity-50">
        <Logo size="lg" />
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700/50 p-8 rounded-3xl backdrop-blur-md max-w-lg w-full shadow-2xl">
        <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">404</h1>
        <h2 className="text-xl font-bold text-gray-300 mb-6">Username Not Found</h2>
        
        <p className="text-gray-400 mb-8">
          The page you are looking for has been banned, deleted, or never existed. 
          Don't worry, you can generate a new identity on our homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-glow-primary hover:shadow-glow-accent"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link 
            to="/blog"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
          >
            <Search className="w-4 h-4" />
            Read Guides
          </Link>
        </div>
      </div>
    </div>
  );
};