import React from 'react';
import { Link } from 'react-router-dom';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export const AZNav: React.FC = () => {
  return (
    <div className="w-full border-t border-white/5 pt-10 pb-4">
      <h4 className="text-center font-bold text-gray-500 uppercase tracking-widest text-xs mb-6">
        Browse Names by Letter
      </h4>
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
        {LETTERS.map(char => (
          <Link
            key={char}
            to={`/letter/${char.toLowerCase()}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-roblox-accent hover:text-white text-gray-400 font-mono text-sm transition-all border border-white/5 hover:border-roblox-accent/50"
          >
            {char}
          </Link>
        ))}
      </div>
    </div>
  );
};
