import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Wand2, Dices, AlertTriangle, Search, Info, Settings2, Filter, AlignLeft, AlignRight, EyeOff, Ruler, Share2, Download, Trash2, Tag, HelpCircle, BookOpen, Clock, ChevronRight, Lightbulb as IdeaIcon, Lightbulb } from 'lucide-react';
import { NameStyle, LengthPreference, GeneratedName } from '../types';
import { generateRobloxNames } from '../services/localNameService';
import { audioService } from '../services/audioService';
import { Button } from '../components/Button';
import { NameList } from '../components/NameList';
import { Toast } from '../components/Toast';
import { RatingWidget } from '../components/RatingWidget';
import { RarityGuide } from '../components/RarityGuide';
import { Logo } from '../components/Logo';
import { PreviewModal } from '../components/PreviewModal';
import { DecoratorModal } from '../components/DecoratorModal';
import { BLOG_POSTS } from '../data/blogPosts';
import { SYNONYMS } from '../data/wordLists';

const CURRENT_YEAR = new Date().getFullYear();
const BAD_WORDS = ['fuck', 'shit', 'nigg', 'bitch', 'cunt', 'whore', 'dick', 'pussy', 'asshole', 'sex', 'porn', 'xxx'];

const PRESET_CATEGORIES = [
  { label: 'Sweaty PvP', emoji: '⚔️', style: NameStyle.COOL, keywords: ['Macro', 'Reach', 'Combo', 'Ping', 'God', 'Clutch'] },
  { label: 'Aesthetic', emoji: '✨', style: NameStyle.AESTHETIC, keywords: ['Cloud', 'Star', 'Moon', 'Angel', 'Pure', 'Soft'] },
  { label: 'Anime / Weeb', emoji: '⛩️', style: NameStyle.COOL, keywords: ['Kami', 'Ninja', 'Ghoul', 'Titan', 'Slayer', 'Senpai'] },
  { label: 'Y2K / Emo', emoji: '🖤', style: NameStyle.EDGY, keywords: ['Broken', 'Vamp', 'Goth', 'Web', 'Cyber', 'Toxic'] },
  { label: 'Og / Short', emoji: '🧢', style: NameStyle.OG, keywords: ['Guy', 'Bot', 'Man', 'Box', 'Dog', 'Cat'] },
  { label: 'Funny / Troll', emoji: '🤡', style: NameStyle.FUNNY, keywords: ['Noob', 'Bacon', 'Toilet', 'Sus', 'Meme', 'Burger'] },
];

const STYLE_DESCRIPTIONS: Record<NameStyle, React.ReactNode> = {
  [NameStyle.COOL]: "Generate sweaty, intense, and competitive names perfect for PvP games like BedWars and Da Hood.",
  [NameStyle.AESTHETIC]: "Create soft, dreamy, and minimalist usernames with a y2k or cottagecore vibe.",
  [NameStyle.EDGY]: "Find dark, mysterious, and emo-style names for a unique online persona.",
  [NameStyle.FUNNY]: "Make people laugh with meme-worthy, troll, and hilarious username combinations.",
  [NameStyle.CUTE]: "Sweet, adorable, and charming names featuring animals, foods, and happy vibes.",
  [NameStyle.OG]: "Get that rare, original account look with short, clean, and classic word combinations.",
  [NameStyle.MIXED]: "Can't decide? Generate a chaotic mix of all styles at once to find your unique vibe."
};

const STATIC_POPULAR_NAMES = {
  [NameStyle.COOL]: ['ShadowViper', 'ToxicLegend', 'NotNinja', 'HyperGod', 'StormRider'],
  [NameStyle.AESTHETIC]: ['cloud.vibes', 'pure.soul', 'soft.tear', 'lunar.sky', 'star.dust'],
  [NameStyle.CUTE]: ['BunnyXo', 'CookieBear', 'PinkMochi', 'LilPanda', 'HoneyBee'],
  [NameStyle.OG]: ['RealBox', 'Guy1', 'BotSz', 'RedDog', 'AceRBX']
};

const LOADING_PHRASES = ['Synthesizing...', 'Checking availability...', 'Applying aesthetics...', 'Mixing patterns...', 'Polishing...'];

const getRandom = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Reusable Components inside Home
const GamingSelect = ({ value, onChange }: { value: NameStyle, onChange: (val: NameStyle) => void }) => {
  return (
    <div className="relative h-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as NameStyle)}
        aria-label="Select Name Style"
        className="w-full h-full pl-4 pr-10 py-4 bg-gray-900/50 border border-gray-700 rounded-xl outline-none text-white font-medium transition-all duration-200 focus:ring-2 focus:ring-roblox-accent border-transparent hover:border-gray-500 appearance-none cursor-pointer"
      >
         {Object.values(NameStyle).map((styleOption) => (
            <option key={styleOption} value={styleOption} className="bg-gray-900 text-white">
               {styleOption === NameStyle.MIXED ? 'Mixed Mode' : `${styleOption} Mode`}
            </option>
         ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  );
};

const generateFAQs = (style: NameStyle, keyword: string) => {
  const cleanK = keyword.toLowerCase();
  
  const baseFAQs = [
    {
      question: "What if the name is taken?",
      answer: "Roblox has over 200 million users. Try turning on 'Leet Speak' (e.g., replace E with 3) in our settings or add a trendy prefix like 'Itz' or suffix like 'Sz' to find an open spot."
    },
    {
      question: "Are these names safe to use?",
      answer: "Yes! We filter our word lists to be appropriate. However, always double-check Roblox's official Community Standards before changing your username."
    }
  ];

  if (cleanK.includes('hood') || cleanK.includes('rev') || cleanK.includes('macro')) {
    return [
      {
        question: "What are good Da Hood usernames?",
        answer: "The best Da Hood usernames are short, intimidating, and often use mixed capitalization (e.g., 'vIper'). Keywords like 'Macro', 'Aim', and 'God' are popular. Use our 'Cool' or 'Edgy' mode with 'Leet Speak' enabled to generate them."
      },
      ...baseFAQs
    ];
  }

  if (style === NameStyle.AESTHETIC) {
    return [
      {
        question: "How do I make my Roblox name aesthetic?",
        answer: "Aesthetic names often use all lowercase letters, soft words (like 'cloud', 'tear', 'pure'), and avoid numbers. Use our 'Aesthetic' mode to automatically format names this way."
      },
      ...baseFAQs
    ];
  }

  return [
    {
      question: "How do I create a unique Roblox username?",
      answer: "The best way is to combine two unrelated cool words (like 'Neon' and 'Ninja'). Our generator automates this process, checking millions of combinations to find ones that stand out."
    },
    ...baseFAQs,
    {
      question: "Can I save my favorite names?",
      answer: "Absolutely. Click the Heart icon next to any result to save it to your Favorites tab. Your favorites are stored in your browser."
    }
  ];
};

const FEATURED_EXAMPLES: GeneratedName[] = [
  { id: 'ex1', name: 'ShadowViper' },
  { id: 'ex2', name: 'Neon_Wolf' },
  { id: 'ex3', name: 'CuteBunnyXo' },
  { id: 'ex4', name: 'SilentSoul' },
  { id: 'ex5', name: 'FrostBlade' },
  { id: 'ex6', name: 'HyperGlitch' }
];

const RelatedKeywords = ({ keyword, style, onSelect }: { keyword: string, style: NameStyle, onSelect: (k: string) => void }) => {
  if (!keyword) return null;
  
  const lowerKey = keyword.toLowerCase();
  let related: string[] = [];
  
  if (SYNONYMS[lowerKey]) {
    related = SYNONYMS[lowerKey];
  } else {
    if (style === NameStyle.COOL) related = ['Shadow', 'Viper', 'Ghost', 'Storm'];
    else if (style === NameStyle.CUTE) related = ['Bunny', 'Cookie', 'Star', 'Moon'];
    else if (style === NameStyle.AESTHETIC) related = ['Cloud', 'Soft', 'Pure', 'Sky'];
    else related = ['Bot', 'Noob', 'Pro', 'God'];
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-700/30">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <Info className="w-3 h-3" /> Related Searches
      </div>
      <div className="flex flex-wrap gap-2">
        {related.slice(0, 6).map(term => (
          <button 
            key={term}
            onClick={() => onSelect(term)}
            className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:text-white rounded-lg border border-gray-700/50 transition-colors"
          >
            {term} Names
          </button>
        ))}
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialization from URL params
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [style, setStyle] = useState<NameStyle>((searchParams.get('style') as NameStyle) || NameStyle.COOL);
  const [length, setLength] = useState<LengthPreference>((searchParams.get('length') as LengthPreference) || LengthPreference.ANY);
  const [includeNumbers, setIncludeNumbers] = useState(searchParams.get('numbers') !== 'false');
  const [includeUnderscore, setIncludeUnderscore] = useState(searchParams.get('underscore') === 'true');
  const [useExactMatch, setUseExactMatch] = useState(searchParams.get('exact') === 'true');
  const [useLeet, setUseLeet] = useState(searchParams.get('leet') === 'true');
  const [forDisplayName, setForDisplayName] = useState(searchParams.get('displayname') === 'true');
  const [prefix, setPrefix] = useState(searchParams.get('prefix') || '');
  const [suffix, setSuffix] = useState(searchParams.get('suffix') || '');

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [toastMsg, setToastMsg] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'history' | 'favorites'>('results');
  const [previewName, setPreviewName] = useState<GeneratedName | null>(null);
  const [decoratorName, setDecoratorName] = useState<string | null>(null);
  
  // Filters
  const [filterText, setFilterText] = useState('');
  const [filterHideNumbers, setFilterHideNumbers] = useState(false);
  const [filterShortOnly, setFilterShortOnly] = useState(false);

  // Data Persistence
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>(() => {
    try {
      const saved = sessionStorage.getItem('bloxname_current_results');
      return saved ? JSON.parse(saved) : [];
    } catch(e) { return []; }
  });

  const [history, setHistory] = useState<GeneratedName[]>(() => {
     try {
       const saved = localStorage.getItem('bloxname_history');
       return saved ? JSON.parse(saved) : [];
     } catch (e) { return []; }
  });
  
  const [favorites, setFavorites] = useState<GeneratedName[]>(() => {
    try {
      const saved = localStorage.getItem('bloxname_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // Effects
  useEffect(() => {
    if (generatedNames.length > 0) sessionStorage.setItem('bloxname_current_results', JSON.stringify(generatedNames));
  }, [generatedNames]);

  useEffect(() => { localStorage.setItem('bloxname_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('bloxname_favorites', JSON.stringify(favorites)); }, [favorites]);

  // Sync URL params
  useEffect(() => {
    const params: any = {};
    if (keyword) params.keyword = keyword;
    if (style !== NameStyle.COOL) params.style = style;
    if (length !== LengthPreference.ANY) params.length = length;
    if (!includeNumbers) params.numbers = 'false';
    if (includeUnderscore) params.underscore = 'true';
    if (useExactMatch) params.exact = 'true';
    if (useLeet) params.leet = 'true';
    if (forDisplayName) params.displayname = 'true';
    if (prefix) params.prefix = prefix;
    if (suffix) params.suffix = suffix;
    setSearchParams(params, { replace: true });
  }, [keyword, style, length, includeNumbers, includeUnderscore, useExactMatch, useLeet, forDisplayName, prefix, suffix, setSearchParams]);

  // Suggestion logic
  useEffect(() => {
    if (!keyword || keyword.length < 2) {
      setSuggestions([]);
      return;
    }
    const lowerKey = keyword.toLowerCase().trim();
    if (SYNONYMS[lowerKey]) {
      setSuggestions(SYNONYMS[lowerKey].slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  const handleGenerate = async (
    overrideKeyword?: string, 
    overrideStyle?: NameStyle
  ) => {
    const k = overrideKeyword !== undefined ? overrideKeyword : keyword;
    const s = overrideStyle !== undefined ? overrideStyle : style;

    if (k && BAD_WORDS.some(bad => k.toLowerCase().includes(bad))) {
      setError("Let's keep it appropriate! 🚫");
      setToastMsg("Restricted keyword detected.");
      setIsToastVisible(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setFilterText('');
    setFilterHideNumbers(false);
    setFilterShortOnly(false);
    
    if (overrideKeyword !== undefined) setKeyword(overrideKeyword);
    if (overrideStyle !== undefined) setStyle(overrideStyle);

    try {
      if (soundEnabled) audioService.playGenerate();

      const names = await generateRobloxNames({
        keyword: k,
        style: s,
        length,
        includeNumbers,
        includeUnderscore,
        useLeet,
        prefix,
        suffix,
        useExactMatch,
        forDisplayName
      });

      const newGeneratedNames = names.map(n => ({
        id: Math.random().toString(36).substr(2, 9),
        name: n
      }));

      setGeneratedNames(newGeneratedNames);
      setHistory(prev => [...newGeneratedNames.slice(0, 4), ...prev].slice(0, 50));

      const resultsEl = document.getElementById('results-section');
      if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      console.error(err);
      setError("Failed to generate names.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemix = (name: string) => {
    let clean = name.replace(/[0-9]+$/, '').replace(/_+$/, '').replace(/^_+/, ''); 
    setKeyword(clean);
    setToastMsg(`Remixing "${clean}"...`);
    setIsToastVisible(true);
    handleGenerate(clean);
    window.scrollTo(0, 0); 
  };

  const handleFavoriteToggle = (name: GeneratedName) => {
    if (favorites.some(f => f.id === name.id)) {
      setFavorites(prev => prev.filter(f => f.id !== name.id));
      setToastMsg("Removed from favorites");
    } else {
      setFavorites(prev => [name, ...prev]);
      setToastMsg("Saved to favorites");
    }
    setIsToastVisible(true);
  };

  const getFilteredNames = () => {
    let source = activeTab === 'results' ? generatedNames : activeTab === 'history' ? history : favorites;
    return source.filter(item => {
      if (filterText && !item.name.toLowerCase().includes(filterText.toLowerCase())) return false;
      if (filterHideNumbers && /\d/.test(item.name)) return false;
      if (filterShortOnly && item.name.length >= 10) return false;
      return true;
    });
  };

  const filteredNames = getFilteredNames();
  const relatedPost = BLOG_POSTS.find(p => p.slug.includes(style === NameStyle.COOL ? 'sweaty-pvp' : style === NameStyle.AESTHETIC ? 'aesthetic' : style === NameStyle.OG ? 'rare-og' : 'display-name'));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
       {/* Header */}
       <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
             <Logo size="lg" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-6 tracking-tight drop-shadow-sm">
            Roblox Name Generator
          </h1>
          
          <div className="mb-6 flex justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-400 animate-fade-in-up">
               <Info className="w-4 h-4 text-roblox-accent" />
               <span>{STYLE_DESCRIPTIONS[style]}</span>
             </div>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Create rare, sweaty, and aesthetic usernames for Roblox. <br className="hidden md:block" /> 
            Check availability, generate display names, and more.
          </p>
       </div>

       {/* Generator Card */}
       <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl mb-12 relative overflow-hidden">
          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
             <div className="flex-grow relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-roblox-accent transition-colors z-10" />
                <input 
                  type="text" 
                  value={keyword}
                  aria-label="Enter keyword"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter a keyword (e.g. 'Shadow', 'Vibe')"
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-roblox-accent focus:border-transparent outline-none text-white font-medium placeholder-gray-400 transition-all shadow-[0_0_0_0_rgba(0,176,111,0)] focus:shadow-[0_0_20px_rgba(0,176,111,0.2)]"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-3 flex flex-wrap gap-2 px-1 animate-fade-in-down z-20">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 mr-2">
                      <IdeaIcon className="w-3 h-3 text-yellow-400" /> Ideas:
                    </div>
                    {suggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => {
                          setKeyword(s);
                          handleGenerate(s); 
                        }}
                        className="px-3 py-1 bg-gray-800 border border-gray-600 hover:border-roblox-accent text-gray-300 hover:text-white rounded-full text-xs transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
             </div>
             <div className="md:w-1/3 relative z-20">
                <GamingSelect value={style} onChange={setStyle} />
             </div>
          </div>

          <div className="mb-8 mt-4">
             <button 
               onClick={() => setShowAdvanced(!showAdvanced)}
               className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4 focus:outline-none"
             >
               <Settings2 className="w-4 h-4" />
               {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
             </button>
             
             {showAdvanced && (
               <div className="space-y-6 p-6 bg-gray-900/40 border border-gray-700/50 rounded-2xl animate-fade-in-up">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded border-gray-700 bg-gray-800 text-roblox-accent focus:ring-offset-gray-900" />
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">Numbers</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={includeUnderscore} onChange={(e) => setIncludeUnderscore(e.target.checked)} className="rounded border-gray-700 bg-gray-800 text-roblox-accent focus:ring-offset-gray-900" />
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">Underscore (_)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={useLeet} onChange={(e) => setUseLeet(e.target.checked)} className="rounded border-gray-700 bg-gray-800 text-roblox-accent focus:ring-offset-gray-900" />
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">Leet Speak</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={forDisplayName} onChange={(e) => setForDisplayName(e.target.checked)} className="rounded border-gray-700 bg-gray-800 text-roblox-accent focus:ring-offset-gray-900" />
                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">Display Name</span>
                    </label>
                  </div>

                  <div className="h-px bg-gray-700/50"></div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        <Filter className="w-3 h-3" /> Max Length
                      </label>
                      <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700/50">
                        {([LengthPreference.ANY, LengthPreference.SHORT, LengthPreference.MEDIUM, LengthPreference.LONG]).map((opt) => {
                          let label = opt.split(' ')[0];
                          if (opt === LengthPreference.ANY) label = "Any";
                          return (
                            <button
                              key={opt}
                              onClick={() => setLength(opt)}
                              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${length === opt ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          <AlignLeft className="w-3 h-3" /> Prefix
                        </label>
                        <input 
                          type="text" 
                          value={prefix} 
                          aria-label="Prefix"
                          onChange={(e) => setPrefix(e.target.value)}
                          placeholder="e.g. Itz"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-roblox-accent outline-none transition-colors"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          <AlignRight className="w-3 h-3" /> Suffix
                        </label>
                        <input 
                          type="text" 
                          value={suffix} 
                          aria-label="Suffix"
                          onChange={(e) => setSuffix(e.target.value)}
                          placeholder="e.g. Sz"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-roblox-accent outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
               </div>
             )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             <Button 
               onClick={() => handleGenerate()} 
               isLoading={isLoading} 
               className="flex-grow text-lg h-14"
             >
               <Wand2 className="w-5 h-5 mr-2" />
               Generate Names
             </Button>
             <Button 
               variant="secondary"
               onClick={() => handleGenerate(undefined, undefined)} 
               disabled={isLoading}
               className="md:w-auto h-14"
               title="Randomize"
             >
               <Dices className="w-5 h-5" />
             </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center justify-center gap-2 text-red-400 text-sm animate-fade-in-up">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
       </div>

       {relatedPost && !isLoading && generatedNames.length > 0 && activeTab === 'results' && (
         <div className="mb-12 max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-roblox-accent/30 rounded-xl p-4 flex items-start sm:items-center gap-4 shadow-lg hover:border-roblox-accent/60 transition-colors">
               <div className="bg-roblox-accent/20 p-2 rounded-full shrink-0">
                 <Lightbulb className="w-6 h-6 text-roblox-accent" />
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Pro Tip: Mastering {style} Names</h4>
                 <p className="text-gray-400 text-sm">
                   Want to learn more about {style.toLowerCase()} trends? Read our guide: <span className="text-white font-medium">{relatedPost.title.split(':')[0]}</span>.
                 </p>
               </div>
               <Link 
                 to={`/blog/${relatedPost.slug}`}
                 className="hidden sm:flex items-center gap-1 text-sm font-bold text-roblox-accent hover:text-white transition-colors whitespace-nowrap"
               >
                 Read Guide <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
         </div>
       )}

       <div id="results-section" className="min-h-[400px]">
          <div className="flex flex-col items-center justify-center mb-6 gap-4">
             <div className="bg-gray-800/50 p-1 rounded-xl flex gap-1">
               {(['results', 'history', 'favorites'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-gray-700 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
                 >
                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
                 </button>
               ))}
             </div>

             {(generatedNames.length > 0 || history.length > 0 || favorites.length > 0) && (
               <div className="w-full max-w-2xl flex flex-wrap items-center gap-2 bg-gray-800/30 p-2 rounded-xl border border-gray-700/30 animate-fade-in-up">
                  <div className="relative flex-grow min-w-[150px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
                    <input 
                      type="text" 
                      aria-label="Filter names"
                      placeholder="Filter list..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-xs text-white focus:ring-1 focus:ring-roblox-accent outline-none placeholder-gray-400"
                    />
                  </div>
                  <button onClick={() => setFilterHideNumbers(!filterHideNumbers)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${filterHideNumbers ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:text-white'}`}><EyeOff className="w-3.5 h-3.5" /> No Numbers</button>
                  <button onClick={() => setFilterShortOnly(!filterShortOnly)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${filterShortOnly ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:text-white'}`}><Ruler className="w-3.5 h-3.5" /> &lt; 10 Chars</button>
               </div>
             )}
          </div>

          <NameList 
            names={filteredNames.length > 0 ? filteredNames : (filterText || filterHideNumbers || filterShortOnly) ? [] : FEATURED_EXAMPLES} 
            onFavoriteToggle={handleFavoriteToggle}
            onRemix={handleRemix}
            onPreview={(name) => setPreviewName(name)}
            onDecorate={(name) => setDecoratorName(name)}
            isLoading={isLoading}
            title={activeTab === 'favorites' ? "Your Favorites" : activeTab === 'history' ? "History" : "Generated Results"}
            onCopyAll={() => {
              const allNames = filteredNames.map(n => n.name).join('\n');
              navigator.clipboard.writeText(allNames);
              setToastMsg("All names copied!");
              setIsToastVisible(true);
            }}
            allowDelete={activeTab === 'history'}
            onDeleteName={activeTab === 'history' ? (id) => setHistory(h => h.filter(i => i.id !== id)) : undefined}
          />
          
          {filteredNames.length > 0 && activeTab === 'results' && (
            <div className="flex justify-center mt-4">
               <button
                  onClick={() => {
                     const list = filteredNames.map((n, i) => `${i + 1}. ${n.name}`).join('\n');
                     navigator.clipboard.writeText(`🔥 BloxName Results:\n${list}\n\nGen yours at: bloxname.com`);
                     setToastMsg("List copied!");
                     setIsToastVisible(true);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-roblox-accent transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share formatted list
                </button>
            </div>
          )}

          <div className="max-w-2xl mx-auto w-full">
             <RelatedKeywords keyword={keyword} style={style} onSelect={(k) => { setKeyword(k); handleGenerate(k); window.scrollTo(0,0); }} />
          </div>
       </div>

       <div className="mt-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-roblox-accent" />
            Quick Presets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
             {PRESET_CATEGORIES.map((preset, idx) => (
               <button
                 key={idx}
                 onClick={() => {
                   setKeyword(preset.keywords[0]);
                   setStyle(preset.style);
                   handleGenerate(preset.keywords[0], preset.style);
                 }}
                 className="relative group p-4 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,176,111,0.15)] bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700 hover:to-gray-800 hover:border-roblox-accent/50 text-left"
               >
                 <span className="text-2xl mb-2 block filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">{preset.emoji}</span>
                 <span className="font-bold text-gray-300 text-sm group-hover:text-white block relative z-10">{preset.label}</span>
               </button>
             ))}
          </div>
       </div>
       
       <RatingWidget />
       <RarityGuide />
       
       <div className="mt-20 prose prose-invert max-w-none text-gray-400">
           <section className="space-y-8 mt-12">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="text-gray-500 w-5 h-5" />
                <h3 className="text-xl font-bold text-gray-200">Frequently Asked Questions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {generateFAQs(style, keyword).map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="bg-gray-800/40 border border-gray-700/50 p-5 rounded-xl h-full">
                      <h4 className="font-semibold text-white mb-2">{item.question}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </section>
           
           <div className="mt-20 border-t border-gray-800 pt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Why use BloxName?</h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Advanced Naming Algorithms</h3>
                  <p className="mb-4">
                    Unlike basic randomizers, BloxName understands Roblox culture. Our algorithms are tuned to generate names that fit specific subcultures like "Sweaty PvP", "Aesthetic/Soft", "Da Hood", and "OG".
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Display Names vs. Usernames</h3>
                  <p className="mb-4">
                    Did you know you can change your Display Name for free every 7 days? BloxName is perfect for generating creative Display Names using special characters and spaces.
                  </p>
                </div>
              </div>
           </div>
       </div>

       <div className="mt-20 border-t border-gray-800 pt-12">
          <div className="flex items-center gap-2 mb-8">
             <BookOpen className="text-roblox-accent w-5 h-5" />
             <h3 className="text-xl font-bold text-gray-200">Latest Guides & Tips</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
             {BLOG_POSTS.slice(0, 3).map((post) => (
               <Link 
                 key={post.slug}
                 to={`/blog/${post.slug}`}
                 className="group block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-roblox-accent/30 transition-all"
               >
                 <div className="h-32 overflow-hidden">
                   <img 
                     src={post.imageUrl?.replace('w=1200', 'w=400') + '&fm=webp'} 
                     alt={post.imageAlt}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                 </div>
                 <div className="p-4">
                   <h4 className="font-bold text-white text-sm mb-2 group-hover:text-roblox-accent transition-colors line-clamp-2">{post.title}</h4>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                     <Clock className="w-3 h-3" /> {post.readTime}
                   </div>
                 </div>
               </Link>
             ))}
          </div>
       </div>

       <div className="mt-24 pt-12 border-t border-gray-800">
          <h3 className="text-lg font-bold text-white mb-8 text-center uppercase tracking-widest">Popular Roblox Name Ideas {CURRENT_YEAR}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
             {Object.entries(STATIC_POPULAR_NAMES).map(([styleKey, names]) => (
               <div key={styleKey}>
                  <h4 className="text-roblox-accent font-bold mb-4 text-sm">{styleKey} Names</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                     {names.map(n => <li key={n} className="hover:text-white transition-colors">{n}</li>)}
                  </ul>
               </div>
             ))}
          </div>
       </div>

       <Toast message={toastMsg} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
       {previewName && <PreviewModal name={previewName} isOpen={true} onClose={() => setPreviewName(null)} />}
       {decoratorName && <DecoratorModal name={decoratorName} isOpen={true} onClose={() => setDecoratorName(null)} />}
    </div>
  );
};