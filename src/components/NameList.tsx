import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Copy, Check, User, Sparkles, Heart, ExternalLink, RefreshCw, Wand2, LayoutGrid, List as ListIcon, SortAsc } from 'lucide-react';
import { GeneratedName } from '../types';
import { audioService } from '../services/audioService';
import { DecryptText } from './DecryptText';
import { getRarity, estimateAvailability } from '../utils/rarity';

interface NameListProps {
  names: GeneratedName[];
  onFavoriteToggle?: (name: GeneratedName) => void;
  onUpdateName?: (id: string, newName: string) => void;
  onDeleteName?: (id: string) => void;
  onRemix?: (name: string) => void;
  onPreview?: (name: GeneratedName) => void;
  onDecorate?: (name: string) => void;
  favorites?: GeneratedName[];
  title?: string;
  onCopy?: (text: string) => void;
  onCopyAll?: () => void;
  isLoading?: boolean;
  soundEnabled?: boolean;
  allowDelete?: boolean;
}

type SortOption = 'default' | 'shortest' | 'rarity';
type ViewMode = 'grid' | 'list';

const SkeletonCard: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => (
  <div className={`
    relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden animate-pulse
    ${viewMode === 'list' ? 'h-[72px] flex items-center p-3' : 'h-[104px] p-5'}
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

export const NameList: React.FC<NameListProps> = ({ 
  names, onFavoriteToggle, onUpdateName, onDeleteName, onRemix, onPreview, onDecorate, favorites = [], title = "Generated Results", onCopy, onCopyAll, isLoading, soundEnabled = true, allowDelete = false
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const sortedNames = useMemo(() => {
    let sorted = [...names];
    if (sortOption === 'shortest') sorted.sort((a, b) => a.name.length - b.name.length);
    else if (sortOption === 'rarity') sorted.sort((a, b) => (getRarity(a.name)?.score || 0) - (getRarity(b.name)?.score || 0)).reverse();
    return sorted;
  }, [names, sortOption]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onCopy) onCopy(text);
    if (soundEnabled) audioService.playSuccess();
    setTimeout(() => setCopiedId(null), 1000);
  };

  const isFavorited = (nameToCheck: string) => favorites.some(f => f.name === nameToCheck);

  // CLS FIX: Ensure container has min-height so page doesn't jump
  return (
    <div className="w-full min-h-[600px]"> 
      {names.length > 0 && (
         <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              {title} <span className="px-2 py-0.5 bg-white/10 rounded-md text-xs text-gray-300 font-mono">{names.length}</span>
            </h2>
            
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} 
                 className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                 aria-label={viewMode === 'grid' ? "Switch to List View" : "Switch to Grid View"}
               >
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
          // Render 12 Skeleton items while loading
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} viewMode={viewMode} />
          ))
        ) : (
          sortedNames.map((item, index) => {
            const rarity = getRarity(item.name);
            const availability = estimateAvailability(item.name);
            const isCopied = copiedId === item.id;
            const favorited = isFavorited(item.name);

            return (
              <div 
                key={item.id}
                className={`
                  group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all duration-300
                  hover:border-brand-primary/30 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg
                  ${viewMode === 'list' ? 'flex items-center justify-between p-3' : 'p-5'}
                `}
                onClick={() => handleCopy(item.id, item.name)}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleCopy(item.id, item.name); }}
                tabIndex={0}
                role="button"
                aria-label={`Copy username ${item.name}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                   <div className={`w-1 self-stretch rounded-full ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-700'}`}></div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         {rarity && <span className={`text-[10px] font-black uppercase tracking-wider ${rarity.color} px-1.5 py-0.5 rounded bg-black/30`}>{rarity.label}</span>}
                         <div className={`w-2 h-2 rounded-full ${availability.color}`} aria-label={`Availability: ${availability.text}`}></div>
                      </div>
                      <div className="font-mono text-xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-primary transition-all">
                         <DecryptText text={item.name} animateOnMount={true} />
                      </div>
                   </div>
                </div>

                <div className={`flex items-center gap-1 ${viewMode === 'list' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'} transition-opacity`}>
                   <button 
                     onClick={(e) => { e.stopPropagation(); onDecorate && onDecorate(item.name); }} 
                     className="p-2 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-lg focus:opacity-100"
                     aria-label="Decorate name"
                     title="Decorate Name"
                   >
                     <Wand2 className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); onPreview && onPreview(item); }} 
                     className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg focus:opacity-100"
                     aria-label="Preview name profile"
                     title="Preview Profile"
                   >
                     <User className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); onFavoriteToggle && onFavoriteToggle(item); }} 
                     className={`p-2 rounded-lg focus:opacity-100 ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-white/5'}`}
                     aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                     title={favorited ? "Unfavorite" : "Favorite"}
                   >
                     <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                   </button>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center bg-brand-primary text-white font-bold transition-opacity duration-200 pointer-events-none ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
                   <Check className="w-6 h-6 mr-2" /> Copied!
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
