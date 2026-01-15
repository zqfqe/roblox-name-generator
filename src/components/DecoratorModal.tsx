import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Wand2 } from 'lucide-react';

interface DecoratorModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const DECORATION_STYLES = [
  { id: 'clean', label: 'Clean Star', format: (s: string) => `★ ${s} ★` },
  { id: 'stars_simple', label: 'Sparkles', format: (s: string) => `✨ ${s} ✨` },
  { id: 'heart_solid', label: 'Heart', format: (s: string) => `♥ ${s} ♥` },
  { id: 'aesthetic_clouds', label: 'Clouds', format: (s: string) => `☁ ${s} ☁` },
  { id: 'brackets_thick', label: 'Thick Brackets', format: (s: string) => `【${s}】` },
  { id: 'brackets_corner', label: 'Corner Brackets', format: (s: string) => `『 ${s} 』` },
  { id: 'arrows_wing', label: 'Winged', format: (s: string) => `꧁ ${s} ꧂` },
  { id: 'arrows_simple', label: 'Arrows', format: (s: string) => `↠ ${s} ↞` },
  { id: 'kaomoji_smile', label: 'Kaomoji Smile', format: (s: string) => `${s} (◡‿◡✿)` },
  { id: 'kaomoji_fight', label: 'Kaomoji Fight', format: (s: string) => `${s} (ง'̀-'́)ง` },
  { id: 'kaomoji_peace', label: 'Kaomoji Peace', format: (s: string) => `${s} ✌.ʕʘ‿ʘʔ.✌` },
  { id: 'box_text', label: 'Boxed', format: (s: string) => s.split('').map(c => `[${c}]`).join('') },
  { id: 'spaced_wide', label: 'Spaced', format: (s: string) => s.split('').join(' ') },
  { id: 'dot_aesthetic', label: 'Dot Aesthetic', format: (s: string) => `｡･:*:･ﾟ ${s} ｡･:*:･ﾟ` },
  { id: 'crosses', label: 'Crosses', format: (s: string) => `† ${s} †` },
  { id: 'music', label: 'Musical', format: (s: string) => `♫ ${s} ♫` },
];

export const DecoratorModal: React.FC<DecoratorModalProps> = ({ name, isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="decorator-title">
      <div className="bg-[#111827] w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gray-800/50">
          <div>
            <h3 id="decorator-title" className="text-white font-bold text-xl flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-400" />
              Name Decorator
            </h3>
            <p className="text-gray-400 text-xs mt-1">Perfect for Roblox <strong className="text-gray-300">Display Names</strong></p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Close decorator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DECORATION_STYLES.map((style) => {
              const decoratedText = style.format(name);
              const isCopied = copiedId === style.id;

              return (
                <button
                  key={style.id}
                  onClick={() => handleCopy(style.id, decoratedText)}
                  className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                    isCopied 
                      ? 'bg-green-900/20 border-green-500/50' 
                      : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0 pr-4">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider group-hover:text-purple-400 transition-colors">
                      {style.label}
                    </span>
                    <span className="text-white font-medium truncate text-sm sm:text-base font-sans">
                      {decoratedText}
                    </span>
                  </div>

                  <div className={`shrink-0 p-2 rounded-lg transition-all ${
                    isCopied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 group-hover:text-white group-hover:bg-purple-500'
                  }`}>
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-start gap-3 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-200 leading-relaxed">
              <strong>Tip:</strong> These symbols work best for your <strong>Display Name</strong>. Your login @Username usually cannot contain special characters like ★ or ♥.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};