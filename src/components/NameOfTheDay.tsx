import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Copy, Check, Flame } from 'lucide-react';
import { generateRobloxNames } from '../services/localNameService';
import { NameStyle, LengthPreference } from '../types';
import { audioService } from '../services/audioService';

// Simple Linear Congruential Generator for consistent daily randoms
const seededRandom = (seed: number) => {
  const m = 0x80000000;
  const a = 1103515245;
  const c = 12345;
  let state = seed ? seed : Math.floor(Math.random() * (m - 1));
  return () => {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
};

export const NameOfTheDay: React.FC = () => {
  const [name, setName] = useState<string>('Loading...');
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<string>('Mythic');
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const generateDailyName = async () => {
      // Create a seed from today's date (UTC to be global)
      const now = new Date();
      const seedString = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
      // Simple hash of the date string to get an integer seed
      let seed = 0;
      for (let i = 0; i < seedString.length; i++) {
        seed = ((seed << 5) - seed) + seedString.charCodeAt(i);
        seed |= 0;
      }
      
      const rng = seededRandom(Math.abs(seed));
      
      // Pick a style based on the seed
      const styles = [NameStyle.COOL, NameStyle.OG, NameStyle.AESTHETIC];
      const selectedStyle = styles[Math.floor(rng() * styles.length)];
      
      // Keywords pool
      const keywords = ['Star', 'Void', 'Soul', 'Viper', 'Echo', 'Flux', 'Zen', 'Sky', 'Mist', 'Rift', 'Nova'];
      const keyword = keywords[Math.floor(rng() * keywords.length)];

      // Generate names (we need to bypass the random logic in the service slightly, 
      // but for now we'll just generate a batch and pick the first one which is usually stable-ish 
      // or we just assume the user gets a unique one per day per session, 
      // actually let's hardcode the generation logic here to be truly seeded)
      
      const suffixes = ['Sz', 'Fn', 'Xo', 'Rbx', 'Ly', 'Qt'];
      const suffix = suffixes[Math.floor(rng() * suffixes.length)];
      
      const finalName = rng() > 0.5 ? `${keyword}${suffix}` : `Not${keyword}`;
      
      setName(finalName);
      setStyle(selectedStyle === NameStyle.COOL ? 'Sweaty' : selectedStyle === NameStyle.OG ? 'OG Rare' : 'Aesthetic');
      setLikes(Math.floor(rng() * 500) + 850); // Fake high engagement
    };

    generateDailyName();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    audioService.playSuccess();
    setLikes(prev => prev + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12 animate-slide-up">
      <div className="relative group cursor-pointer" onClick={handleCopy}>
        {/* Glowing Background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">
            <Calendar className="w-3 h-3" /> Name of the Day
          </div>
          
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2 font-mono tracking-tight">
            {name}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
            <span className="px-2 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">{style}</span>
            <span className="flex items-center gap-1 text-orange-400"><Flame className="w-3 h-3 fill-current" /> {likes}</span>
          </div>

          <div className="absolute top-4 right-4 text-gray-600 group-hover:text-white transition-colors">
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </div>
  );
};
