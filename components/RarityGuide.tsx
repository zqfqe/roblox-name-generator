import React from 'react';
import { Trophy, Star, Sparkles, Shield, Zap } from 'lucide-react';

export const RarityGuide: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-12 animate-fade-in-up">
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-700/50 pb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Roblox Username Rarity Tier List</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Mythic Tier */}
          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-colors">
            <div className="shrink-0 mt-1">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
            </div>
            <div>
              <h3 className="font-bold text-fuchsia-400 text-sm uppercase tracking-wider mb-1">Mythic Tier</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Extremely rare <strong>3-4 character names</strong> (e.g., "Kilo", "Zen"). These are the "Holy Grail" of Roblox identifiers. Our generator uses advanced logic to find these nearly-extinct combinations.
              </p>
            </div>
          </div>

          {/* Legendary Tier */}
          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <div className="shrink-0 mt-1">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 text-sm uppercase tracking-wider mb-1">Legendary Tier</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                <strong>Clean 5-6 letter words</strong> with NO numbers and NO underscores (e.g., "Viper", "Ghost"). Highly sought after for their clean aesthetic in leaderboards.
              </p>
            </div>
          </div>

          {/* Epic Tier */}
          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="shrink-0 mt-1">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-purple-400 text-sm uppercase tracking-wider mb-1">Epic Tier</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Clean names up to 8 characters OR high-tier "Sweaty" names with popular suffixes (e.g., "SoulSz", "DarkFn"). Perfect for competitive PvP players.
              </p>
            </div>
          </div>

          {/* Rare Tier */}
          <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <div className="shrink-0 mt-1">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-blue-400 text-sm uppercase tracking-wider mb-1">Rare Tier</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Two-word combinations or names with a single underscore (e.g., "Neon_Wolf"). These are statistically easier to find but still look professional and unique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};