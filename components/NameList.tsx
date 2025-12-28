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
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 mt-8 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-roblox-accent" />
              {title} <span className="text-gray-500 text-sm font-normal">({names.length})</span>
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="relative group">
                <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-lg px-2 py-1.5">
                  <SortAsc className="w-4 h-4 text-gray-400 mr-2" />
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="bg-transparent text-xs font-bold text-white outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="default">Default</option>
                    <option value="shortest">Shortest First</option>
                    <option value="rarity">Rarity (Best)</option>
                  </select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-800/50 border border-gray-700 rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                  title="List View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>

              {onCopyAll && (
                <button 
                  onClick={onCopyAll}
                  className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-700 ml-auto md:ml-0"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  Copy All
                </button>
              )}
            </div>
         </div>
      )}

      <div className={`
        ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4' : 'flex flex-col gap-2'}
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
                className={`group relative flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700/50 hover:border-gray-500 rounded-lg transition-all ${isEdit ? 'ring-1 ring-roblox-accent' : ''}`}
                onClick={() => handleCopy(item.id, item.name)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3 flex-grow min-w-0">
                  <div className={`w-1 h-8 rounded-full ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-600'}`}></div>
                  
                  {isEdit ? (
                    <div className="flex items-center gap-2 flex-grow">
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={editValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white font-mono text-sm outline-none"
                      />
                      <button onClick={saveEdit} className="text-green-400"><Check className="w-4 h-4" /></button>
                      <button onClick={cancelEdit} className="text-red-400"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white text-lg truncate">{item.name}</span>
                      {rarity && (
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border hidden sm:inline-block ${rarity.color}`}>
                          {rarity.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                   <button onClick={(e) => handleDecorateClick(e, item.name)} className="p-1.5 text-purple-400 hover:bg-purple-900/30 rounded"><Wand2 className="w-3.5 h-3.5" /></button>
                   <button onClick={(e) => handlePreviewClick(e, item)} className="p-1.5 text-blue-400 hover:bg-blue-900/30 rounded"><User className="w-3.5 h-3.5" /></button>
                   <a href={`https://www.roblox.com/search/users?keyword=${item.name}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><ExternalLink className="w-3.5 h-3.5" /></a>
                   {onFavoriteToggle && (
                    <button onClick={(e) => { e.stopPropagation(); onFavoriteToggle(item); }} className={`p-1.5 rounded ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
                      <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                   )}
                </div>
                
                {isCopied && (
                  <div className="absolute right-4 bg-roblox-accent text-white text-xs font-bold px-2 py-1 rounded animate-fade-in-up flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied
                  </div>
                )}
              </div>
            );
          }

          // Grid View Render (Existing Card Style)
          return (
            <div 
              key={item.id}
              className={`holo-card group relative bg-gray-800/40 border transition-all duration-300 rounded-xl overflow-visible
                ${isEdit ? 'ring-2 ring-roblox-accent border-transparent z-10' : 'border-gray-700/50 hover:border-gray-500'}
                ${rarity?.cardClass || ''}
              `}
              onClick={() => handleCopy(item.id, item.name)}
              tabIndex={0}
              role="button"
              aria-label={`Copy ${item.name}`}
              onKeyDown={(e) => handleCardKeyDown(e, item.id, item.name)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative p-4 flex items-center justify-between gap-3">
                
                {/* Visual Indicator Line (Left) */}
                <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${rarity ? rarity.color.split(' ')[0].replace('text-', 'bg-') : 'bg-gray-600'}`}></div>

                {/* Content Area */}
                <div className="flex-grow min-w-0 pl-3">
                  {/* Tags / Rarity / Availability */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {rarity && (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${rarity.color}`}>
                        {rarity.label}
                      </span>
                    )}
                    {/* Availability Dot & Tooltip */}
                    <div className="group/tooltip relative flex items-center">
                        <div className={`w-2 h-2 rounded-full ${availability.color}`}></div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
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
                        className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white font-mono text-lg outline-none focus:border-roblox-accent"
                      />
                      <button onClick={saveEdit} className="p-1 text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
                      <button onClick={cancelEdit} className="p-1 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="font-mono text-xl md:text-2xl font-bold text-white tracking-tight truncate group-hover:text-roblox-accent transition-colors flex items-center gap-2">
                       {/* Only animate text on initial load if loading prop is true, otherwise static */}
                       {isLoading ? (
                          <DecryptText text={item.name} speed={30} className={rarity ? rarity.color.split(' ')[0] : ''} />
                       ) : (
                          <span className={rarity ? rarity.color.split(' ')[0] : ''}>{item.name}</span>
                       )}
                    </div>
                  )}
                </div>

                {/* Actions Toolbar (Visible on Hover/Focus) */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity duration-200">
                  
                  {/* Decorate */}
                  <button
                    onClick={(e) => handleDecorateClick(e, item.name)}
                    className="p-2 rounded-lg text-purple-400 hover:bg-purple-900/30 hover:text-purple-300 transition-colors"
                    title="Decorate Display Name"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>

                  {/* Preview */}
                  <button
                    onClick={(e) => handlePreviewClick(e, item)}
                    className="p-2 rounded-lg text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 transition-colors"
                    title="Preview Profile"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {/* Remix */}
                  <button
                    onClick={(e) => handleRemixClick(e, item.name)}
                    className="p-2 rounded-lg text-yellow-400 hover:bg-yellow-900/30 hover:text-yellow-300 transition-colors"
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
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    title="Check on Roblox"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Edit (Only if onUpdateName provided) */}
                  {onUpdateName && (
                    <button
                      onClick={(e) => startEditing(e, item)}
                      className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                      title="Edit Name"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Delete (Only if delete enabled) */}
                  {allowDelete && (
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
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
                          ? 'text-red-500 bg-red-500/10' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-red-400'
                      }`}
                      title={favorited ? "Unfavorite" : "Favorite"}
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Copy Feedback Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-roblox-accent/90 backdrop-blur-sm transition-opacity duration-200 rounded-xl z-20 pointer-events-none ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center gap-2 text-white font-bold text-lg animate-bounce">
                    <Check className="w-6 h-6" />
                    Copied!
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