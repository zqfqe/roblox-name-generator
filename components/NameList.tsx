import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Copy, Check, User, Sparkles, Heart, ExternalLink, Trophy, Youtube, Video, Pencil, Trash2, X, Save, ClipboardCheck, RefreshCw, Eye, Wand2, ArrowDownAZ, ArrowUpNarrowWide, LayoutGrid, List as ListIcon, SortAsc } from 'lucide-react';
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

export const NameList: React.FC<NameListProps> = ({ 
  names, 
  onFavoriteToggle, 
  onUpdateName,
  onDeleteName,
  onRemix,
  onPreview,
  onDecorate, 
  favorites = [], 
  title = "Generated Results",
  onCopy,
  onCopyAll,
  isLoading,
  soundEnabled = true,
  allowDelete = false
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  // Sorting Logic
  const sortedNames = useMemo(() => {
    let sorted = [...names];
    if (sortOption === 'shortest') {
      sorted.sort((a, b) => a.name.length - b.name.length);
    } else if (sortOption === 'rarity') {
      sorted.sort((a, b) => {
        const scoreA = getRarity(a.name)?.score || 0;
        const scoreB = getRarity(b.name)?.score || 0;
        return scoreB - scoreA; // Descending rarity
      });
    }
    return sorted;
  }, [names, sortOption]);

  const handleCopy = (id: string, text: string) => {
    if (editingId) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onCopy) onCopy(text);
    if (soundEnabled) audioService.playSuccess();
    setTimeout(() => setCopiedId(null), 1000);
  };

  const startEditing = (e: React.MouseEvent, item: GeneratedName) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.name);
    if (soundEnabled) audioService.playClick();
  };

  const saveEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editingId && onUpdateName && editValue.trim()) {
      onUpdateName(editingId, editValue.trim());
      if (soundEnabled) audioService.playSuccess();
    }
    setEditingId(null);
  };

  const cancelEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
    e.stopPropagation();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, id: string, name: string) => {
    if (editingId) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy(id, name);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDeleteName) {
      onDeleteName(id);
      if (soundEnabled) audioService.playClick();
    }
  };

  const handleRemixClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (onRemix) {
      onRemix(name);
      if (soundEnabled) audioService.playGenerate();
    }
  };

  const handlePreviewClick = (e: React.MouseEvent, name: GeneratedName) => {
    e.stopPropagation();
    if (onPreview) {
        onPreview(name);
        if (soundEnabled) audioService.playClick();
    }
  };

  const handleDecorateClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (onDecorate) {
        onDecorate(name);
        if (soundEnabled) audioService.playClick();
    }
  };

  const isFavorited = (nameToCheck: string) => {
    return favorites.some(f => f.name === nameToCheck);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {names.length > 0 && (
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 mt-12 gap-4 animate-slide-up">
            <h2 className="text-xs font-bold text-gray-500 flex items-center gap-2 uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4 text-roblox-accent" />
              {title} <span className="text-gray-600">[{names.length}]</span>
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="relative group">
                <div className="flex items-center bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 hover:border-white/10 transition-colors">
                  <SortAsc className="w-3 h-3 text-gray-500 mr-2" />
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    aria-label="Sort names"
                    className="bg-transparent text-[10px] font-bold uppercase tracking-wider text-gray-400 outline-none appearance-none cursor-pointer pr-4 hover:text-white"
                  >
                    <option value="default" className="bg-black">Default</option>
                    <option value="shortest" className="bg-black">Length</option>
                    <option value="rarity" className="bg-black">Rarity</option>
                  </select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-black/40 border border-white/5 rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
                  title="Grid View"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
                  title="List View"
                  aria-label="List view"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {onCopyAll && (
                <button 
                  onClick={onCopyAll}
                  className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors bg-black/40 hover:bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 ml-auto md:ml-0"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  Copy All
                </button>
              )}
            </div>
         </div>
      )}

      <div className={`
        ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3' : 'flex flex-col gap-2'}
      `}>
        {sortedNames.map((item, index) => {
          const rarity = getRarity(item.name);
          const availability = estimateAvailability(item.name);
          const isCopied = copiedId === item.id;
          const isEdit = editingId === item.id;
          const favorited = isFavorited(item.name);

          // List View Render
          if (viewMode === 'list') {
            return (
              <div 
                key={item.id}
                className={`group relative flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-roblox-accent/30 rounded-xl transition-all hover:bg-white/[0.04] ${isEdit ? 'ring-1 ring-roblox-accent' : ''}`}
                onClick={() => handleCopy(item.id, item.name)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <div className={`w-1 h-6 rounded-full ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-800'}`}></div>
                  
                  {isEdit ? (
                    <div className="flex items-center gap-2 flex-grow">
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={editValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="w-full bg-black/50 border border-gray-600 rounded px-2 py-1 text-white font-mono text-sm outline-none"
                      />
                      <button onClick={saveEdit} className="text-green-400"><Check className="w-4 h-4" /></button>
                      <button onClick={cancelEdit} className="text-red-400"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white text-lg truncate tracking-tight">{item.name}</span>
                      {rarity && (
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border hidden sm:inline-block tracking-widest opacity-80 ${rarity.color}`}>
                          {rarity.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                   <button onClick={(e) => handleDecorateClick(e, item.name)} className="p-2 text-purple-400 hover:bg-white/10 rounded-lg"><Wand2 className="w-3.5 h-3.5" /></button>
                   <button onClick={(e) => handlePreviewClick(e, item)} className="p-2 text-blue-400 hover:bg-white/10 rounded-lg"><User className="w-3.5 h-3.5" /></button>
                   <a href={`https://www.roblox.com/search/users?keyword=${item.name}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><ExternalLink className="w-3.5 h-3.5" /></a>
                   {onFavoriteToggle && (
                    <button onClick={(e) => { e.stopPropagation(); onFavoriteToggle(item); }} className={`p-2 rounded-lg ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400 hover:bg-white/10'}`}>
                      <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                   )}
                </div>
                
                {isCopied && (
                  <div className="absolute right-4 bg-roblox-accent text-black text-xs font-bold px-2 py-1 rounded animate-slide-up flex items-center gap-1 shadow-neon">
                    <Check className="w-3 h-3" /> Copied
                  </div>
                )}
              </div>
            );
          }

          // Grid View Render (Refined Holo Card)
          return (
            <div 
              key={item.id}
              className={`holo-card group relative rounded-xl overflow-visible backdrop-blur-md
                ${isEdit ? 'ring-2 ring-roblox-accent border-transparent z-10' : ''}
                ${rarity?.cardClass || ''}
              `}
              onClick={() => handleCopy(item.id, item.name)}
              tabIndex={0}
              role="button"
              aria-label={`Copy ${item.name}`}
              onKeyDown={(e) => handleCardKeyDown(e, item.id, item.name)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative p-5 flex items-center justify-between gap-3">
                
                {/* Visual Indicator Line (Left) */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-70 ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-800'}`}></div>

                {/* Content Area */}
                <div className="flex-grow min-w-0 pl-2">
                  {/* Tags / Rarity / Availability */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {rarity && (
                      <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border backdrop-blur-md ${rarity.color}`}>
                        {rarity.label}
                      </span>
                    )}
                    {/* Availability Dot & Tooltip */}
                    <div className="group/tooltip relative flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] ${availability.color}`}></div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 uppercase tracking-wide">
                            {availability.text}
                        </div>
                    </div>
                  </div>

                  {/* Name Display / Edit Input */}
                  {isEdit ? (
                    <div className="flex items-center gap-2">
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={editValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="w-full bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-white font-mono text-xl outline-none focus:border-roblox-accent shadow-inner"
                      />
                      <button onClick={saveEdit} className="p-1 text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
                      <button onClick={cancelEdit} className="p-1 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="font-mono text-xl font-bold text-white tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 flex items-center gap-2">
                       {isLoading ? (
                          <DecryptText text={item.name} speed={30} className={rarity ? rarity.color.split(' ')[0] : ''} />
                       ) : (
                          <span className={rarity ? rarity.color.split(' ')[0] : ''}>{item.name}</span>
                       )}
                    </div>
                  )}
                </div>

                {/* Actions Toolbar (Visible on Hover/Focus) */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-all duration-300 transform sm:translate-x-4 sm:group-hover:translate-x-0">
                  
                  {/* Decorate */}
                  <button
                    onClick={(e) => handleDecorateClick(e, item.name)}
                    className="p-2 rounded-lg text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    title="Decorate Display Name"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>

                  {/* Preview */}
                  <button
                    onClick={(e) => handlePreviewClick(e, item)}
                    className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                    title="Preview Profile"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {/* Remix */}
                  <button
                    onClick={(e) => handleRemixClick(e, item.name)}
                    className="p-2 rounded-lg text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 transition-colors"
                    title="Remix this name"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  
                  {/* Availability Link */}
                  <a 
                    href={`https://www.roblox.com/search/users?keyword=${item.name}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                    title="Check on Roblox"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Edit (Only if onUpdateName provided) */}
                  {onUpdateName && (
                    <button
                      onClick={(e) => startEditing(e, item)}
                      className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                      title="Edit Name"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Delete (Only if delete enabled) */}
                  {allowDelete && (
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Favorite */}
                  {onFavoriteToggle && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle(item);
                        if (soundEnabled) audioService.playClick();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        favorited 
                          ? 'text-red-500 bg-red-500/10 shadow-glow-sm' 
                          : 'text-gray-400 hover:bg-white/10 hover:text-red-400'
                      }`}
                      title={favorited ? "Unfavorite" : "Favorite"}
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Copy Feedback Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-roblox-accent text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-xl z-20 pointer-events-none ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <div className="flex items-center gap-2 animate-bounce">
                    <Check className="w-5 h-5" />
                    Copied
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};