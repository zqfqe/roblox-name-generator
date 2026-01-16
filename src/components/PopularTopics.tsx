import React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';

const TOPICS = [
  'Anime', 'Dark', 'Space', 'Girl', 'Boy', 'Soft', 'Emo', 'Y2K', 'Grunge', 
  'Preppy', 'Bedwars', 'Da Hood', 'Blox Fruits', 'Murder Mystery 2', 'Funny', 'Troll'
];

export const PopularTopics: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-6 px-4">
        <Hash className="w-5 h-5 text-gray-400" />
        <h2 className="text-xl font-bold text-white">Popular Topics</h2>
      </div>
      <div className="flex flex-wrap gap-3 px-4">
        {TOPICS.map(tag => (
          <Link 
            key={tag} 
            to={`/topic/${tag.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-brand-primary/50 transition-all text-sm font-medium"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};
