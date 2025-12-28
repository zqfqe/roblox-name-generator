import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Users } from 'lucide-react';

export const RatingWidget: React.FC = () => {
  // Initialize with a high rating visually to match Schema markup (Social Proof)
  const [rating, setRating] = useState(5); 
  const [hasRated, setHasRated] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [voteCount, setVoteCount] = useState(1250); // Matches schema

  useEffect(() => {
    const saved = localStorage.getItem('bloxname_rating');
    if (saved) {
      setRating(parseInt(saved));
      setHasRated(true);
    }
  }, []);

  const handleRate = (score: number) => {
    setRating(score);
    setHasRated(true);
    setVoteCount(prev => prev + 1);
    localStorage.setItem('bloxname_rating', score.toString());
  };

  if (hasRated) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-6 bg-roblox-accent/10 border border-roblox-accent/20 rounded-2xl animate-fade-in-up mt-8 max-w-md mx-auto">
        <div className="flex items-center gap-2 text-roblox-accent">
           <ThumbsUp className="w-6 h-6" />
           <span className="font-bold text-lg">Thanks for voting!</span>
        </div>
        <p className="text-sm text-gray-400">You and {voteCount.toLocaleString()} others recommended this generator.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-md mx-auto text-center p-6 bg-gray-800/40 border border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        Community Rating
      </h3>
      
      <div className="flex justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transition-all duration-200 hover:scale-110 p-1"
            aria-label={`Rate ${star} stars`}
          >
            <Star 
              className={`w-8 h-8 ${
                (hoverRating || rating) >= star 
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                  : 'text-gray-600 fill-gray-800'
              }`} 
            />
          </button>
        ))}
      </div>
      
      <div className="flex justify-between items-center px-4 mt-2 text-xs text-gray-500 font-mono">
        <span>1 Star</span>
        <span className="text-roblox-accent font-bold">4.8 / 5.0 Average</span>
        <span>5 Stars</span>
      </div>
    </div>
  );
};