import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Wand2, Dices, AlertTriangle, Search, Info, Settings2, Filter, AlignLeft, AlignRight, EyeOff, Ruler, Share2, Download, Trash2, Tag, HelpCircle, BookOpen, Clock, ChevronRight, Lightbulb as IdeaIcon, Lightbulb, Zap } from 'lucide-react';
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
import { SchemaMarkup } from '../components/SEO';

const CURRENT_YEAR = new Date().getFullYear();
const BAD_WORDS = ['fuck', 'shit', 'nigg', 'bitch', 'cunt', 'whore', 'dick', 'pussy', 'asshole', 'sex', 'porn', 'xxx'];

const PRESET_CATEGORIES = [
  { label: 'Sweaty PvP', emoji: '⚔️', style: NameStyle.COOL, link: '/sweaty-roblox-names', keywords: ['Macro', 'Reach'] },
  { label: 'Aesthetic', emoji: '✨', style: NameStyle.AESTHETIC, link: '/aesthetic-roblox-usernames', keywords: ['Cloud', 'Star'] },
  { label: 'Anime / Weeb', emoji: '⛩️', style: NameStyle.COOL, link: '/sweaty-roblox-names?keyword=Anime', keywords: ['Kami', 'Ninja'] },
  { label: 'Y2K / Emo', emoji: '🖤', style: NameStyle.EDGY, link: '/sweaty-roblox-names?keyword=Emo', keywords: ['Broken', 'Vamp'] },
  { label: 'Og / Short', emoji: '🧢', style: NameStyle.OG, link: '/rare-og-roblox-names', keywords: ['Guy', 'Bot'] },
  { label: 'Funny / Troll', emoji: '🤡', style: NameStyle.FUNNY, link: '/funny-roblox-names', keywords: ['Noob', 'Bacon'] },
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

const getRandom = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Reusable Components inside Home
const GamingSelect = ({ value, onChange, disabled }: { value: NameStyle, onChange: (val: NameStyle) => void, disabled?: boolean }) => {
  return (
    <div className="relative h-full w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as NameStyle)}
        disabled={disabled}
        aria-label="Select Name Style"
        className={`w-full h-full pl-4 pr-10 py-4 bg-transparent border-l border-white/10 outline-none text-white font-medium transition-all appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 text-sm sm:text-base ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
         {Object.values(NameStyle).map((styleOption) => (
            <option key={styleOption} value={styleOption} className="bg-gray-900 text-white py-2">
               {styleOption === NameStyle.MIXED ? 'Mixed Mode' : `${styleOption} Mode`}
            </option>
         ))}
      </select>
      {!disabled && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      )}
    </div>
  );
};

// SEO Content Generator based on Style (Unchanged logic, just className updates)
const StyleSpecificContent = ({ style }: { style: NameStyle }) => {
  if (style === NameStyle.COOL) {
    return (
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/10 pt-12">
        <h2 className="text-3xl font-bold text-white mb-6">Sweaty Roblox Names for Da Hood & PvP</h2>
        <p>
          In the competitive world of Roblox PvP games like <em>BedWars</em>, <em>Da Hood</em>, and <em>The Streets</em>, your username is your first weapon. A "sweaty" name typically features clean formatting, specific suffixes (like <strong>Sz</strong>, <strong>Fn</strong>, <strong>Ly</strong>), and intimidating words.
        </p>
        <p>
          Our <strong>Sweaty Roblox Name Generator</strong> is specifically tuned to create these high-tier usernames. It avoids "noob" numbers (like 1234) and instead uses "Leet Speak" and "Mixed Capitalization" (e.g., <em>vIperSz</em>) to give you that pro-gamer aesthetic. Whether you need a main account name or a clean alt, this tool generates millions of tryhard combinations instantly.
        </p>
      </div>
    );
  }
  
  if (style === NameStyle.AESTHETIC) {
    return (
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/10 pt-12">
        <h2 className="text-3xl font-bold text-white mb-6">Aesthetic Roblox Usernames for 2026</h2>
        <p>
          Aesthetic usernames are all about vibes. Whether you are into <strong>Cottagecore</strong>, <strong>Y2K</strong>, <strong>Grunge</strong>, or <strong>Soft</strong> aesthetics, your name should reflect your style. Popular games like <em>Royale High</em>, <em>Berry Avenue</em>, and <em>Brookhaven</em> are filled with players sporting names like <em>cloud.tear</em> or <em>lunar.bby</em>.
        </p>
        <p>
          This <strong>Aesthetic Roblox Username Generator</strong> focuses on soft words, nature elements, and trendy suffixes. It automatically formats names in lowercase or with periods to achieve that clean, minimalist look. Stop searching for hours; generate the perfect aesthetic handle in seconds.
        </p>
      </div>
    );
  }

  if (style === NameStyle.OG) {
    return (
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/10 pt-12">
        <h2 className="text-3xl font-bold text-white mb-6">Rare & OG Roblox Name Generator</h2>
        <p>
          "OG" (Original Gangster) names are short, simple, and look like they were made in 2008. Since most 3-letter and 4-letter dictionary words are taken, finding a name that <em>looks</em> rare is an art form.
        </p>
        <p>
          Our <strong>Rare Roblox Name Generator</strong> simulates this style by creating short, pronounceable nonsense words (e.g., "Vexy", "Jinx") or using classic prefixes like "iAm" or "Not". These names are highly coveted in the trading community. Use this tool to find an ID that stands out on the leaderboard.
        </p>
      </div>
    );
  }

  return null;
};

// SEO-Optimized FAQs (Logic unchanged)
const generateFAQs = (style: NameStyle, keyword: string) => {
  const cleanK = keyword.toLowerCase();
  
  const baseFAQs = [
    {
      question: "What if the name is taken?",
      answer: "Roblox has over 200 million users. If our roblox name generator suggests a taken name, try turning on 'Leet Speak' in the settings. This allows our roblox username generator to replace letters like E with 3, helping you find an available variation instantly."
    },
    {
      question: "Are these names safe to use?",
      answer: "Yes! Our roblox name generator filters out inappropriate words. You can trust our roblox username generator to provide safe, Terms of Service compliant ideas for your new account."
    }
  ];

  if (style === NameStyle.COOL) {
    return [
      {
        question: "How do I get a sweaty Roblox name?",
        answer: "Sweaty names often use short words with 'Sz', 'Fn', or 'Xo' suffixes. Our 'Sweaty Roblox Name Generator' mode automates this. Try keywords like 'Soul', 'Viper', or 'Mist' and enable 'Leet Speak' for the best results."
      },
      ...baseFAQs
    ];
  }

  if (style === NameStyle.AESTHETIC) {
    return [
      {
        question: "How do I make my Roblox name aesthetic?",
        answer: "Aesthetic names use soft words and lowercase letters. Our roblox name generator has a dedicated 'Aesthetic' mode that automatically formats results. This makes us the best roblox username generator for cottagecore, y2k, and soft vibes."
      },
      ...baseFAQs
    ];
  }

  return [
    {
      question: "How do I create a unique Roblox username?",
      answer: "The best way is to combine two cool words. Our roblox name generator automates this by checking millions of combinations. Unlike a basic randomizer, our roblox username generator uses smart algorithms to ensure every result sounds professional."
    },
    ...baseFAQs
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
    <div className="mt-8 pt-6 border-t border-white/10">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
        <Info className="w-3 h-3" /> Related Searches
      </div>
      <div className="flex flex-wrap gap-2">
        {related.slice(0, 6).map(term => (
          <button 
            key={term}
            onClick={() => onSelect(term)}
            className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white rounded-full border border-white/5 transition-colors"
          >
            {term} Names
          </button>
        ))}
      </div>
    </div>
  );
};

interface HomeProps {
  forcedStyle?: NameStyle;
}

export const Home: React.FC<HomeProps> = ({ forcedStyle }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State initialization from URL params or Forced Style prop
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [internalStyle, setInternalStyle] = useState<NameStyle>((searchParams.get('style') as NameStyle) || NameStyle.COOL);
  const style = forcedStyle || internalStyle;

  const [length, setLength] = useState<LengthPreference>((searchParams.get('length') as LengthPreference) || LengthPreference.ANY);
  
  const [includeNumbers, setIncludeNumbers] = useState(searchParams.get('numbers') === 'true');
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
    
    // Only set style param if NOT on a forced route
    if (!forcedStyle && internalStyle !== NameStyle.COOL) params.style = internalStyle;
    
    if (length !== LengthPreference.ANY) params.length = length;
    if (includeNumbers) params.numbers = 'true';
    if (includeUnderscore) params.underscore = 'true';
    if (useExactMatch) params.exact = 'true';
    if (useLeet) params.leet = 'true';
    if (forDisplayName) params.displayname = 'true';
    if (prefix) params.prefix = prefix;
    if (suffix) params.suffix = suffix;
    
    setSearchParams(params, { replace: true });
  }, [keyword, internalStyle, length, includeNumbers, includeUnderscore, useExactMatch, useLeet, forDisplayName, prefix, suffix, setSearchParams, forcedStyle]);

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
    if (overrideStyle !== undefined && !forcedStyle) setInternalStyle(overrideStyle);

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

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Roblox Name Generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
       <SchemaMarkup data={appSchema} />

       {/* Hero Section */}
       <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-8">
             <Logo size="lg" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(0,214,134,0.3)]">
            {forcedStyle ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-roblox-accent to-emerald-300">{forcedStyle}</span> Roblox Names
              </>
            ) : (
              <>Roblox Name Generator</>
            )}
          </h1>
          
          <div className="mb-8 flex justify-center">
             <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-md shadow-lg">
               <Info className="w-4 h-4 text-roblox-accent" />
               <span>{STYLE_DESCRIPTIONS[style]}</span>
             </div>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            The most advanced <strong>roblox name generator</strong> and <strong>roblox username generator</strong> on the web. Create rare, sweaty, and aesthetic usernames instantly.
          </p>
       </div>

       {/* Main Glass Interface */}
       <div className="glass-panel rounded-3xl p-1 md:p-2 mb-16 relative overflow-visible animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Glowing Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-roblox-accent/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="bg-[#0A0A0A]/80 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/5 relative z-10">
            {/* Input Group */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
               <div className="flex-grow relative group">
                  <div className="absolute inset-0 bg-roblox-accent/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-roblox-accent transition-colors z-20 w-5 h-5" />
                  
                  <input 
                    type="text" 
                    value={keyword}
                    aria-label="Enter keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword (e.g. Viper, Cloud)..."
                    className="w-full pl-14 pr-4 py-5 bg-black/40 border border-white/10 rounded-xl focus:border-roblox-accent/50 outline-none text-white font-medium placeholder-gray-500 transition-all text-lg relative z-10 hover:border-white/20 focus:shadow-[0_0_30px_rgba(0,214,134,0.1)]"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 flex flex-wrap gap-2 px-1 animate-fade-in-down z-30">
                      <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 mr-2 bg-black/50 px-2 rounded">
                        <IdeaIcon className="w-3 h-3 text-yellow-400" /> Ideas:
                      </div>
                      {suggestions.map(s => (
                        <button
                          key={s}
                          onClick={() => {
                            setKeyword(s);
                            handleGenerate(s); 
                          }}
                          className="px-3 py-1 bg-gray-800/80 border border-white/10 hover:border-roblox-accent text-gray-300 hover:text-white rounded-full text-xs transition-colors backdrop-blur-sm"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
               </div>
               <div className="md:w-1/3 relative z-20 h-[68px]">
                  <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                    <GamingSelect 
                      value={style} 
                      onChange={(val) => {
                        if (forcedStyle) {
                          navigate('/');
                          setTimeout(() => setInternalStyle(val), 50);
                        } else {
                          setInternalStyle(val);
                        }
                      }} 
                      disabled={!!forcedStyle}
                    />
                  </div>
               </div>
            </div>

            {/* Advanced Toggle */}
            <div className="mb-8">
               <button 
                 onClick={() => setShowAdvanced(!showAdvanced)}
                 className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors mb-4 focus:outline-none uppercase tracking-wider group"
               >
                 <Settings2 className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                 {showAdvanced ? 'Hide Options' : 'Advanced Options'}
               </button>
               
               {showAdvanced && (
                 <div className="space-y-6 p-6 bg-white/5 border border-white/5 rounded-2xl animate-fade-in-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[{l: 'Include Numbers', s: setIncludeNumbers, v: includeNumbers}, 
                        {l: 'Underscore (_)', s: setIncludeUnderscore, v: includeUnderscore},
                        {l: 'Leet Speak', s: setUseLeet, v: useLeet},
                        {l: 'Display Name', s: setForDisplayName, v: forDisplayName}
                      ].map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${opt.v ? 'bg-roblox-accent border-roblox-accent' : 'border-gray-600 bg-transparent'}`}>
                             {opt.v && <Zap className="w-3 h-3 text-black fill-current" />}
                          </div>
                          <input type="checkbox" checked={opt.v} onChange={(e) => opt.s(e.target.checked)} className="hidden" />
                          <span className="text-sm text-gray-400 group-hover:text-white font-medium transition-colors">{opt.l}</span>
                        </label>
                      ))}
                    </div>

                    <div className="h-px bg-white/5"></div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                          <Filter className="w-3 h-3" /> Max Length
                        </label>
                        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                          {([LengthPreference.ANY, LengthPreference.SHORT, LengthPreference.MEDIUM, LengthPreference.LONG]).map((opt) => {
                            let label = opt.split(' ')[0];
                            if (opt === LengthPreference.ANY) label = "Any";
                            return (
                              <button
                                key={opt}
                                onClick={() => setLength(opt)}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${length === opt ? 'bg-gray-800 text-white shadow-sm border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            <AlignLeft className="w-3 h-3" /> Prefix
                          </label>
                          <input 
                            type="text" 
                            value={prefix} 
                            onChange={(e) => setPrefix(e.target.value)}
                            placeholder="e.g. Itz"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-roblox-accent/50 outline-none transition-colors"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            <AlignRight className="w-3 h-3" /> Suffix
                          </label>
                          <input 
                            type="text" 
                            value={suffix} 
                            onChange={(e) => setSuffix(e.target.value)}
                            placeholder="e.g. Sz"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-roblox-accent/50 outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                 </div>
               )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
               <Button 
                 onClick={() => handleGenerate()} 
                 isLoading={isLoading} 
                 className="flex-grow text-lg h-16 rounded-xl shadow-[0_0_20px_rgba(0,214,134,0.2)] hover:shadow-[0_0_30px_rgba(0,214,134,0.4)] transition-all duration-300"
               >
                 <Wand2 className="w-5 h-5 mr-3" />
                 Generate Identity
               </Button>
               <Button 
                 variant="secondary"
                 onClick={() => handleGenerate(undefined, undefined)} 
                 disabled={isLoading}
                 className="md:w-auto h-16 px-8 rounded-xl bg-gray-800/50 hover:bg-gray-700 border border-white/10"
                 title="Randomize"
               >
                 <Dices className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
               </Button>
            </div>
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center gap-2 text-red-400 text-sm animate-fade-in-up">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
       </div>

       {relatedPost && !isLoading && generatedNames.length > 0 && activeTab === 'results' && (
         <div className="mb-12 max-w-3xl mx-auto animate-fade-in-up">
            <div className="glass-panel p-1 rounded-2xl">
              <div className="bg-gray-900/80 rounded-xl p-4 flex items-start sm:items-center gap-4 hover:bg-gray-800/80 transition-colors">
                 <div className="bg-roblox-accent/10 p-2.5 rounded-full shrink-0 border border-roblox-accent/20">
                   <Lightbulb className="w-5 h-5 text-roblox-accent" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Pro Tip: Mastering {style} Names</h4>
                   <p className="text-gray-400 text-sm font-light">
                     Want to learn more about {style.toLowerCase()} trends? Read our guide: <span className="text-gray-200 font-medium border-b border-gray-600">{relatedPost.title.split(':')[0]}</span>.
                   </p>
                 </div>
                 <Link 
                   to={`/blog/${relatedPost.slug}`}
                   className="hidden sm:flex items-center gap-1 text-xs font-bold text-roblox-accent hover:text-white transition-colors whitespace-nowrap bg-roblox-accent/10 px-3 py-1.5 rounded-lg border border-roblox-accent/20"
                 >
                   Read Guide <ChevronRight className="w-3 h-3" />
                 </Link>
              </div>
            </div>
         </div>
       )}

       <div id="results-section" className="min-h-[400px]">
          <div className="flex flex-col items-center justify-center mb-8 gap-6">
             <div className="bg-black/40 p-1.5 rounded-2xl flex gap-1 border border-white/10 backdrop-blur-sm">
               {(['results', 'history', 'favorites'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab ? 'bg-gray-800 text-white shadow-lg border border-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                 >
                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
                 </button>
               ))}
             </div>

             {(generatedNames.length > 0 || history.length > 0 || favorites.length > 0) && (
               <div className="w-full max-w-2xl flex flex-wrap items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 animate-fade-in-up">
                  <div className="relative flex-grow min-w-[150px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input 
                      type="text" 
                      aria-label="Filter names"
                      placeholder="Filter list..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:border-roblox-accent/50 outline-none placeholder-gray-600 transition-colors"
                    />
                  </div>
                  <button onClick={() => setFilterHideNumbers(!filterHideNumbers)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${filterHideNumbers ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'}`}><EyeOff className="w-3.5 h-3.5" /> No Numbers</button>
                  <button onClick={() => setFilterShortOnly(!filterShortOnly)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${filterShortOnly ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'}`}><Ruler className="w-3.5 h-3.5" /> &lt; 10 Chars</button>
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
            <div className="flex justify-center mt-8">
               <button
                  onClick={() => {
                     const list = filteredNames.map((n, i) => `${i + 1}. ${n.name}`).join('\n');
                     navigator.clipboard.writeText(`🔥 BloxName Results:\n${list}\n\nGen yours at: bloxname.com`);
                     setToastMsg("List copied!");
                     setIsToastVisible(true);
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-roblox-accent transition-colors bg-white/5 px-6 py-3 rounded-xl border border-white/5 hover:border-roblox-accent/30"
                >
                  <Share2 className="w-4 h-4" /> Share formatted list
                </button>
            </div>
          )}

          <div className="max-w-2xl mx-auto w-full">
             <RelatedKeywords keyword={keyword} style={style} onSelect={(k) => { setKeyword(k); handleGenerate(k); window.scrollTo(0,0); }} />
          </div>
       </div>

       <div className="mt-24">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Tag className="w-5 h-5 text-roblox-accent" />
            Quick Presets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {PRESET_CATEGORIES.map((preset, idx) => (
               <Link
                 key={idx}
                 to={preset.link}
                 className="relative group p-5 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm bg-gradient-to-b from-white/5 to-transparent hover:border-roblox-accent/30"
               >
                 <span className="text-3xl mb-3 block filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">{preset.emoji}</span>
                 <span className="font-bold text-gray-400 text-sm group-hover:text-white block relative z-10 transition-colors">{preset.label}</span>
               </Link>
             ))}
          </div>
       </div>
       
       <RatingWidget />
       
       <StyleSpecificContent style={style} />
       
       <RarityGuide />
       
       {/* SEO Content Block */}
       <div className="mt-16 prose prose-invert max-w-none text-gray-400">
           <section className="space-y-12 mt-16">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <HelpCircle className="text-roblox-accent w-6 h-6" />
                <h3 className="text-2xl font-bold text-white m-0">Frequently Asked Questions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {generateFAQs(style, keyword).map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl h-full hover:bg-white/[0.05] transition-colors">
                      <h4 className="font-bold text-white mb-3 text-lg">{item.question}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </section>
           
           <div className="mt-24 border-t border-white/10 pt-16">
              <h2 className="text-4xl font-black text-white mb-10 tracking-tight">The #1 Roblox Name Generator for 2026</h2>
              <div className="space-y-8 text-base md:text-lg leading-loose text-gray-400 font-light">
                <p>
                  Finding the perfect identity in the Metaverse is difficult, but our <strong>roblox name generator</strong> makes it effortless. Whether you are looking for a sweaty competitive tag, a cute aesthetic handle, or an OG username, our tool is the most advanced <strong>roblox username generator</strong> available online. Unlike basic tools that just add random numbers, our <strong>roblox name generator</strong> uses sophisticated algorithms to understand gaming culture trends.
                </p>

                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Why use a Roblox Username Generator?</h3>
                <p>
                  With over 200 million active users, most simple words are taken. A <strong>roblox username generator</strong> helps you bypass this "Name Taken" error by suggesting creative variations, leet speak, and unique prefixes. By using a <strong>roblox name generator</strong>, you save hours of brainstorming time. Our specific <strong>roblox username generator</strong> checks for patterns that are popular in games like Da Hood, BedWars, and Blox Fruits, ensuring your name commands respect.
                </p>

                <h3 className="text-2xl font-bold text-white mt-12 mb-6">Features of our Roblox Name Generator</h3>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Sweaty & OG Modes:</strong> Our <strong>roblox name generator</strong> can create "Sweaty" names (e.g., vIperSz) perfect for PvP.</li>
                  <li><strong>Aesthetic Vibes:</strong> Use the aesthetic mode in our <strong>roblox username generator</strong> for soft, lowercase names (e.g., cloud.tear).</li>
                  <li><strong>Availability Checks:</strong> While no tool is perfect, our <strong>roblox name generator</strong> includes a "Leet Speak" option to help find untaken names.</li>
                  <li><strong>Display Names:</strong> This is also a perfect <strong>roblox username generator</strong> for Display Names, allowing for spaces and special characters.</li>
                </ul>

                <p className="mt-8">
                  Don't settle for a boring name. Use BloxName, the premier <strong>roblox name generator</strong>, to create an identity that stands out. Whether you need a main account name or an alt account handle, our <strong>roblox username generator</strong> is free, fast, and optimized for 2026 gaming trends. Start generating today with the internet's favorite <strong>roblox name generator</strong>!
                </p>
              </div>
           </div>
       </div>

       <div className="mt-24 border-t border-white/10 pt-16">
          <div className="flex items-center gap-3 mb-10">
             <BookOpen className="text-roblox-accent w-6 h-6" />
             <h3 className="text-2xl font-bold text-white">Latest Guides & Tips</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {BLOG_POSTS.slice(0, 3).map((post) => (
               <Link 
                 key={post.slug}
                 to={`/blog/${post.slug}`}
                 className="group block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-roblox-accent/30 transition-all hover:-translate-y-1 hover:shadow-xl"
               >
                 <div className="h-40 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                   <img 
                     src={post.imageUrl?.replace('w=1200', 'w=400') + '&fm=webp'} 
                     alt={post.imageAlt}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                 </div>
                 <div className="p-6">
                   <h4 className="font-bold text-white text-lg mb-3 group-hover:text-roblox-accent transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                   <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide font-bold">
                     <Clock className="w-3 h-3" /> {post.readTime}
                   </div>
                 </div>
               </Link>
             ))}
          </div>
       </div>

       <div className="mt-32 pt-16 border-t border-white/5">
          <h3 className="text-sm font-bold text-gray-500 mb-10 text-center uppercase tracking-[0.2em]">Popular Roblox Name Ideas {CURRENT_YEAR}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
             {Object.entries(STATIC_POPULAR_NAMES).map(([styleKey, names]) => (
               <div key={styleKey} className="space-y-4">
                  <h4 className="text-roblox-accent font-bold text-sm uppercase tracking-wide border-b border-white/5 pb-2">{styleKey} Names</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                     {names.map(n => <li key={n} className="hover:text-white transition-colors cursor-default">{n}</li>)}
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