import React, { useState, useMemo } from 'react';
import { Copy, Check, User, Sparkles, Heart, Wand2, LayoutGrid, List as ListIcon, ThumbsUp, ThumbsDown } from 'lucide-react';
import { GeneratedName } from '../types';
import { audioService } from '../services/audioService';
import { DecryptText } from './DecryptText';
import { getRarity, estimateAvailability } from '../utils/rarity';

interface NameListProps {
  names: GeneratedName[];
  onFavoriteToggle?: (name: GeneratedName) => void;
  onPreview?: (name: GeneratedName) => void;
  onDecorate?: (name: string) => void;
  favorites?: GeneratedName[];
  title?: string;
  onCopy?: (text: string) => void;
  onCopyAll?: () => void;
  isLoading?: boolean;
  soundEnabled?: boolean;
  allowDelete?: boolean;
  onDeleteName?: (id: string) => void;
  onRemix?: (name: string) => void; // Added missing prop def
}

type ViewMode = 'grid' | 'list';

const SkeletonCard: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => (
  <div className={`
    relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden animate-pulse
    ${viewMode === 'list' ? 'h-[72px] flex items-center p-3' : 'h-[120px] p-5'}
  `}>
    <div className="flex items-center gap-4 w-full h-full">
      <div className="w-1 h-full bg-gray-800 rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-2 w-16 bg-gray-800 rounded"></div>
        <div className="h-6 w-3/4 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

// Inner component for individual name card logic (Voting)
const NameCard: React.FC<{ 
  item: GeneratedName, 
  viewMode: ViewMode, 
  isFavorited: boolean,
  onCopy: (id: string, text: string) => void,
  copiedId: string | null,
  onDecorate?: (name: string) => void,
  onPreview?: (name: GeneratedName) => void,
  onFavoriteToggle?: (name: GeneratedName) => void
}> = ({ item, viewMode, isFavorited, onCopy, copiedId, onDecorate, onPreview, onFavoriteToggle }) => {
  const rarity = getRarity(item.name);
  const availability = estimateAvailability(item.name);
  const isCopied = copiedId === item.id;
  
  // Fake Voting Logic
  const [votes, setVotes] = useState(() => Math.floor(Math.random() * 200) + 12);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(() => {
    const saved = localStorage.getItem(`vote_${item.name}`);
    return saved as 'up' | 'down' | null;
  });

  const handleVote = (type: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (userVote === type) return; // Already voted this way

    const diff = type === 'up' ? 1 : -1;
    const reversal = userVote ? (userVote === 'up' ? -1 : 1) : 0; // If switching vote
    
    setVotes(v => v + diff + reversal);
    setUserVote(type);
    localStorage.setItem(`vote_${item.name}`, type);
    audioService.playClick();
  };

  return (
    <div 
      className={`
        group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all duration-300
        hover:border-brand-primary/30 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg
        ${viewMode === 'list' ? 'flex items-center justify-between p-3' : 'p-5'}
      `}
      onClick={() => onCopy(item.id, item.name)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-1 self-stretch rounded-full ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-700'}`}></div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                {rarity && <span className={`text-[10px] font-black uppercase tracking-wider ${rarity.color} px-1.5 py-0.5 rounded bg-black/30`}>{rarity.label}</span>}
                <div className={`w-2 h-2 rounded-full ${availability.color}`} title={availability.text}></div>
            </div>
            <div className="font-mono text-xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-primary transition-all">
                <DecryptText text={item.name} animateOnMount={true} />
            </div>
            
            {/* Voting Bar (Grid View Only for space) */}
            {viewMode === 'grid' && (
              <div className="flex items-center gap-3 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => handleVote('up', e)}
                  className={`flex items-center gap-1 text-xs font-bold hover:text-green-400 ${userVote === 'up' ? 'text-green-400' : 'text-gray-500'}`}
                >
                  <ThumbsUp className="w-3 h-3" /> {votes}
                </button>
                <button 
                  onClick={(e) => handleVote('down', e)}
                  className={`hover:text-red-400 ${userVote === 'down' ? 'text-red-400' : 'text-gray-500'}`}
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
      </div>

      <div className={`flex items-center gap-1 ${viewMode === 'list' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'} transition-opacity`}>
          <button onClick={(e) => { e.stopPropagation(); onDecorate && onDecorate(item.name); }} className="p-2 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-lg"><Wand2 className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onPreview && onPreview(item); }} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg"><User className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onFavoriteToggle && onFavoriteToggle(item); }} className={`p-2 rounded-lg ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-white/5'}`}><Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} /></button>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center bg-brand-primary text-white font-bold transition-opacity duration-200 pointer-events-none ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
          <Check className="w-6 h-6 mr-2" /> Copied!
      </div>
    </div>
  );
};

export const NameList: React.FC<NameListProps> = ({ 
  names, onFavoriteToggle, onUpdateName, onDeleteName, onRemix, onPreview, onDecorate, favorites = [], title = "Generated Results", onCopy, onCopyAll, isLoading, soundEnabled = true, allowDelete = false
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onCopy) onCopy(text);
    if (soundEnabled) audioService.playSuccess();
    setTimeout(() => setCopiedId(null), 1000);
  };

  const isFavorited = (nameToCheck: string) => favorites.some(f => f.name === nameToCheck);

  return (
    <div className="w-full min-h-[600px]"> 
      {names.length > 0 && (
         <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              {title} <span className="px-2 py-0.5 bg-white/10 rounded-md text-xs text-gray-300 font-mono">{names.length}</span>
            </h2>
            
            <div className="flex items-center gap-2">
               <button onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                  {viewMode === 'grid' ? <ListIcon className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
               </button>
               {onCopyAll && (
                 <button onClick={onCopyAll} className="px-3 py-1.5 text-xs font-bold bg-white/5 hover:bg-brand-primary hover:text-white rounded-lg transition-colors text-gray-300 hover:text-white">
                   Copy All
                 </button>
               )}
            </div>
         </div>
      )}

      <div className={`
        ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-2'}
      `}>
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)
        ) : (
          names.map((item) => (
            <NameCard 
              key={item.id}
              item={item}
              viewMode={viewMode}
              isFavorited={isFavorited(item.name)}
              onCopy={handleCopy}
              copiedId={copiedId}
              onDecorate={onDecorate}
              onPreview={onPreview}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};
