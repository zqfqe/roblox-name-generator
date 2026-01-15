import React from 'react';
import { TrendingUp, Copy, Check } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  // Try to hydrate data injected by prerender.js
  const trendingNames = typeof window !== 'undefined' && (window as any).__TRENDING_DATA__ 
    ? (window as any).__TRENDING_DATA__ 
    : [
        // Fallback data if window var isn't set (e.g. dev mode)
        'VelvetViper', 'NeonSoul', 'DarkEcho', 'PureVibes', 
        'CyberMist', 'VoidWalker', 'SoftCloud', 'RetroHaze'
      ];

  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-20 mb-12 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="p-2 bg-roblox-accent/10 rounded-lg">
           <TrendingUp className="w-6 h-6 text-roblox-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Trending Today</h2>
          <p className="text-sm text-gray-400">Most generated styles by the community in the last 24h.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingNames.map((name: string, idx: number) => (
          <button
            key={idx}
            onClick={() => handleCopy(name, idx)}
            className="group relative flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700/50 hover:border-roblox-accent/50 hover:bg-gray-800/80 rounded-xl transition-all duration-300 text-left"
          >
            <span className="font-mono font-bold text-gray-200 group-hover:text-white truncate pr-2">
              {name}
            </span>
            <div className="text-gray-500 group-hover:text-roblox-accent transition-colors">
              {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};