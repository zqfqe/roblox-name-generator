import React, { useState } from 'react';
import { Copy, Check, Star, Heart, ArrowRight, Smile } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SchemaMarkup } from '../components/SEO';
import { Toast } from '../components/Toast';

const SYMBOL_CATEGORIES = [
  {
    id: 'stars',
    title: 'Stars & Sparkles',
    icon: <Star className="w-5 h-5 text-yellow-400" />,
    items: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✨', '⁎', '∗', '⁂', '⁑', '✢', '✣', '✤', '✥', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺']
  },
  {
    id: 'hearts',
    title: 'Hearts & Love',
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    items: ['♥', '♡', '❥', '❣', '❦', '❧', 'ღ', '❤', '💓', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '🖤', '💝', '💞', '💟']
  },
  {
    id: 'arrows',
    title: 'Aesthetic Arrows',
    icon: <ArrowRight className="w-5 h-5 text-blue-400" />,
    items: ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '➫', '➬', '➩', '➪', '➭', '➮', '➯', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻', '➼', '➽', '➾']
  },
  {
    id: 'kaomoji',
    title: 'Kaomoji / Text Faces',
    icon: <Smile className="w-5 h-5 text-green-400" />,
    items: ['(◡‿◡✿)', '(◕‿◕✿)', '(◠﹏◠)', 'v( ‘.’ )v', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(づ｡◕‿‿◕｡)づ', '¯\\_(ツ)_/¯', 'ʕ•ᴥ•ʔ', '(▀̿Ĺ̯▀̿ ̿)', '(ง\'̀-\'́)ง', 'ಠ_ಠ', '(¬_¬)', '(;´༎ຶД༎ຶ`)', '♥‿♥', 'ᶘ ᵒᴥᵒᶅ', '(=^･^=)', '(>.<)']
  },
  {
    id: 'borders',
    title: 'Brackets & Borders',
    icon: <span className="font-mono text-purple-400 font-bold">[]</span>,
    items: ['『', '』', '【', '】', '〖', '〗', '〘', '〙', '〚', '〛', '「', '」', '『', '』', '⟨', '⟩', '«', '»', '‹', '›', '《', '》', '〈', '〉']
  },
  {
    id: 'math',
    title: 'Math & Tech',
    icon: <span className="font-mono text-cyan-400 font-bold">∑</span>,
    items: ['∞', '∑', '∏', '∆', '∇', '√', '∫', '≈', '≠', '≤', '≥', '±', '×', '÷', '¬', '∀', '∃', '∅', '∈', '∉', '⊂', '⊃', '∪', '∩', 'Ω', 'π', 'μ', 'λ', 'θ']
  }
];

export const Symbols: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedItem(symbol);
    setToastVisible(true);
    setTimeout(() => setCopiedItem(null), 1000);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Roblox Symbols & Kaomoji Copy Paste",
    "description": "The best collection of aesthetic symbols, stars, hearts, and kaomoji text faces for Roblox usernames and bios.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": SYMBOL_CATEGORIES.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": cat.title
      }))
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
      <SchemaMarkup data={schema} />
      <Breadcrumbs items={[{ label: 'Symbols' }]} />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          Roblox <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Symbols</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Copy and paste aesthetic stars, hearts, and text faces to customize your Roblox Display Name and Bio.
        </p>
      </div>

      <div className="grid gap-8">
        {SYMBOL_CATEGORIES.map((category) => (
          <section key={category.id} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
              <div className="p-2 bg-gray-900 rounded-lg shadow-inner">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{category.title}</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((symbol, idx) => (
                <button
                  key={`${category.id}-${idx}`}
                  onClick={() => handleCopy(symbol)}
                  className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-900/50 hover:bg-roblox-accent/20 border border-gray-700 hover:border-roblox-accent/50 rounded-xl transition-all duration-200 active:scale-95"
                  aria-label={`Copy ${symbol}`}
                >
                  <span className="text-xl md:text-2xl text-white font-mono">{symbol}</span>
                  
                  {/* Hover Copy Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedItem === symbol ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Toast message="Copied to clipboard!" isVisible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
};
