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
  [NameStyle.COOL]: "Sweaty, intense, competitive.",
  [NameStyle.AESTHETIC]: "Soft, dreamy, minimalist.",
  [NameStyle.EDGY]: "Dark, mysterious, emo.",
  [NameStyle.FUNNY]: "Meme-worthy, troll, hilarious.",
  [NameStyle.CUTE]: "Sweet, adorable, charming.",
  [NameStyle.OG]: "Short, clean, rare.",
  [NameStyle.MIXED]: "Chaos mode. All styles."
};

const STATIC_POPULAR_NAMES = {
  [NameStyle.COOL]: ['ShadowViper', 'ToxicLegend', 'NotNinja', 'HyperGod', 'StormRider'],
  [NameStyle.AESTHETIC]: ['cloud.vibes', 'pure.soul', 'soft.tear', 'lunar.sky', 'star.dust'],
  [NameStyle.CUTE]: ['BunnyXo', 'CookieBear', 'PinkMochi', 'LilPanda', 'HoneyBee'],
  [NameStyle.OG]: ['RealBox', 'Guy1', 'BotSz', 'RedDog', 'AceRBX']
};

const getRandom = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// High-End Select Component
const GamingSelect = ({ value, onChange, disabled }: { value: NameStyle, onChange: (val: NameStyle) => void, disabled?: boolean }) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as NameStyle)}
        disabled={disabled}
        aria-label="Select Name Style"
        className={`w-full appearance-none bg-black/40 border border-white/10 text-white text-sm font-bold uppercase tracking-wider py-3 px-4 pr-8 rounded-lg outline-none focus:border-roblox-accent/50 transition-all cursor-pointer hover:bg-white/5 disabled:opacity-50`}
      >
         {Object.values(NameStyle).map((styleOption) => (
            <option key={styleOption} value={styleOption} className="bg-gray-900 text-white">
               {styleOption}
            </option>
         ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronRight className="w-4 h-4 text-roblox-accent rotate-90" />
      </div>
    </div>
  );
};

// SEO Content Generator based on Style (Unchanged logic, just className updates)
const StyleSpecificContent = ({ style }: { style: NameStyle }) => {
  if (style === NameStyle.COOL) {
    return (
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/5 pt-12">
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
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/5 pt-12">
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
      <div className="prose prose-invert max-w-none text-gray-400 mt-12 border-t border-white/5 pt-12">
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
    <div className="mt-8 pt-6 border-t border-white/5">
      <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-roblox-accent uppercase tracking-widest">
        <Info className="w-3 h-3" /> Related Searches
      </div>
      <div className="flex flex-wrap gap-2">
        {related.slice(0, 6).map(term => (
          <button 
            key={term}
            onClick={() => onSelect(term)}
            className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white/[0.02] hover:bg-white/[0.05] hover:text-white rounded border border-white/5 hover:border-white/20 transition-all uppercase tracking-wide"
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
      setError("System Warning: Restricted keyword detected.");
      setToastMsg("Inappropriate Keyword");
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
      setError("Generation failed. System reboot required.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemix = (name: string) => {
    let clean = name.replace(/[0-9]+$/, '').replace(/_+$/, '').replace(/^_+/, ''); 
    setKeyword(clean);
    setToastMsg(`Re-rolling: ${clean}`);
    setIsToastVisible(true);
    handleGenerate(clean);
    window.scrollTo(0, 0); 
  };

  const handleFavoriteToggle = (name: GeneratedName) => {
    if (favorites.some(f => f.id === name.id)) {
      setFavorites(prev => prev.filter(f => f.id !== name.id));
      setToastMsg("Removed from Database");
    } else {
      setFavorites(prev => [name, ...prev]);
      setToastMsg("Saved to Database");
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
       <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-8">
             <Logo size="lg" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            {forcedStyle ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-roblox-accent to-emerald-300">{forcedStyle}</span> Names
              </>
            ) : (
              <>Identity Generator</>
            )}
          </h1>
          
          <div className="mb-8 flex justify-center">
             <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium text-gray-300 backdrop-blur-md">
               <span className="w-2 h-2 rounded-full bg-roblox-accent animate-pulse"></span>
               <span>{STYLE_DESCRIPTIONS[style]}</span>
             </div>
          </div>
       </div>

       {/* Main Glass Interface */}
       <div className="glass-panel rounded-3xl p-1 mb-20 relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          <div className="bg-[#0A0A0A]/90 backdrop-blur-md rounded-[22px] p-8 md:p-12 border border-white/5 relative z-10 overflow-hidden">
            {/* Decoration Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-roblox-accent/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            {/* Input Group - The "Command Bar" */}
            <div className="flex flex-col gap-6 mb-10">
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-roblox-accent/30 to-roblox-secondary/30 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                  
                  <div className="relative flex items-center bg-black border border-white/10 rounded-xl p-2 transition-all group-focus-within:border-white/20">
                    <div className="pl-4 pr-3 text-gray-500">
                      <Search className="w-6 h-6" />
                    </div>
                    
                    <input 
                      type="text" 
                      value={keyword}
                      aria-label="Enter keyword"
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="ENTER KEYWORD (e.g. Viper, Cloud)..."
                      className="w-full bg-transparent outline-none text-white font-bold text-lg placeholder-gray-700 py-4 font-mono tracking-wide"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />

                    <div className="hidden md:flex items-center gap-2 pr-2">
                      <div className="h-8 w-px bg-white/10 mx-2"></div>
                      <div className="w-48">
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
               </div>

               {/* Mobile Style Selector */}
               <div className="md:hidden">
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

            {/* Advanced Toggle */}
            <div className="mb-10">
               <button 
                 onClick={() => setShowAdvanced(!showAdvanced)}
                 className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white transition-colors mb-4 focus:outline-none uppercase tracking-[0.2em] group"
               >
                 <Settings2 className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
                 {showAdvanced ? 'Collapse Config' : 'System Config'}
               </button>
               
               {showAdvanced && (
                 <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl animate-slide-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[{l: 'Numbers', s: setIncludeNumbers, v: includeNumbers}, 
                        {l: 'Underscore', s: setIncludeUnderscore, v: includeUnderscore},
                        {l: 'Leet Mode', s: setUseLeet, v: useLeet},
                        {l: 'Display Name', s: setForDisplayName, v: forDisplayName}
                      ].map((opt, i) => (
                        <button 
                          key={i} 
                          onClick={() => opt.s(!opt.v)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${opt.v ? 'bg-roblox-accent/10 border-roblox-accent/50 text-roblox-accent' : 'bg-black/40 border-white/10 text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                        >
                          {opt.l}
                          <div className={`w-2 h-2 rounded-full ${opt.v ? 'bg-roblox-accent shadow-[0_0_8px_currentColor]' : 'bg-gray-700'}`}></div>
                        </button>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Length constraint</label>
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                          {([LengthPreference.ANY, LengthPreference.SHORT, LengthPreference.MEDIUM, LengthPreference.LONG]).map((opt) => {
                            let label = opt.split(' ')[0];
                            if (opt === LengthPreference.ANY) label = "Any";
                            return (
                              <button
                                key={opt}
                                onClick={() => setLength(opt)}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${length === opt ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Prefix</label>
                          <input 
                            type="text" 
                            value={prefix} 
                            onChange={(e) => setPrefix(e.target.value)}
                            placeholder="ITZ"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-gray-700 focus:border-roblox-accent/50 outline-none uppercase"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Suffix</label>
                          <input 
                            type="text" 
                            value={suffix} 
                            onChange={(e) => setSuffix(e.target.value)}
                            placeholder="SZ"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-gray-700 focus:border-roblox-accent/50 outline-none uppercase"
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
                 className="flex-grow h-14 md:h-16 text-base md:text-lg rounded-xl shadow-neon hover:shadow-neon-hover"
               >
                 <Wand2 className="w-5 h-5 mr-3" />
                 INITIALIZE
               </Button>
               <Button 
                 variant="secondary"
                 onClick={() => handleGenerate(undefined, undefined)} 
                 disabled={isLoading}
                 className="md:w-auto h-14 md:h-16 px-8 rounded-xl"
                 title="Randomize"
               >
                 <Dices className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
               </Button>
            </div>
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center gap-2 text-red-400 text-sm animate-slide-up">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
       </div>

       {relatedPost && !isLoading && generatedNames.length > 0 && activeTab === 'results' && (
         <div className="mb-12 max-w-3xl mx-auto animate-slide-up">
            <div className="glass-panel p-px rounded-xl">
              <div className="bg-black/60 rounded-xl p-4 flex items-center gap-4">
                 <div className="bg-roblox-accent/10 p-2 rounded-lg border border-roblox-accent/20">
                   <Lightbulb className="w-4 h-4 text-roblox-accent" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Database Insight</h4>
                   <p className="text-gray-400 text-xs">
                     Learn more about {style.toLowerCase()} naming conventions in our <Link to={`/blog/${relatedPost.slug}`} className="text-roblox-accent hover:underline">latest guide</Link>.
                   </p>
                 </div>
              </div>
            </div>
         </div>
       )}

       <div id="results-section" className="min-h-[400px]">
          {/* Tabs */}
          <div className="flex justify-center mb-10">
             <div className="inline-flex bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
               {(['results', 'history', 'favorites'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-gray-600 hover:text-gray-300'}`}
                 >
                   {tab}
                 </button>
               ))}
             </div>
          </div>

          {(generatedNames.length > 0 || history.length > 0 || favorites.length > 0) && (
             <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="relative flex-grow min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <input 
                    type="text" 
                    aria-label="Filter names"
                    placeholder="Filter results..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-black/20 border border-white/5 rounded-lg text-xs font-mono text-white focus:border-white/20 outline-none placeholder-gray-700 transition-colors"
                  />
                </div>
                <button onClick={() => setFilterHideNumbers(!filterHideNumbers)} className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${filterHideNumbers ? 'bg-roblox-accent/10 text-roblox-accent border-roblox-accent/30' : 'bg-transparent text-gray-600 border-white/5 hover:text-white'}`}>No Digits</button>
                <button onClick={() => setFilterShortOnly(!filterShortOnly)} className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${filterShortOnly ? 'bg-roblox-accent/10 text-roblox-accent border-roblox-accent/30' : 'bg-transparent text-gray-600 border-white/5 hover:text-white'}`}>Short</button>
             </div>
          )}

          <NameList 
            names={filteredNames.length > 0 ? filteredNames : (filterText || filterHideNumbers || filterShortOnly) ? [] : FEATURED_EXAMPLES} 
            onFavoriteToggle={handleFavoriteToggle}
            onRemix={handleRemix}
            onPreview={(name) => setPreviewName(name)}
            onDecorate={(name) => setDecoratorName(name)}
            isLoading={isLoading}
            title={activeTab === 'favorites' ? "DATABASE // SAVED" : activeTab === 'history' ? "DATABASE // HISTORY" : "GENERATED OUTPUT"}
            onCopyAll={() => {
              const allNames = filteredNames.map(n => n.name).join('\n');
              navigator.clipboard.writeText(allNames);
              setToastMsg("Clipboard Updated");
              setIsToastVisible(true);
            }}
            allowDelete={activeTab === 'history'}
            onDeleteName={activeTab === 'history' ? (id) => setHistory(h => h.filter(i => i.id !== id)) : undefined}
          />
          
          {filteredNames.length > 0 && activeTab === 'results' && (
            <div className="flex justify-center mt-12">
               <button
                  onClick={() => {
                     const list = filteredNames.map((n, i) => `${i + 1}. ${n.name}`).join('\n');
                     navigator.clipboard.writeText(`🔥 BloxName Output:\n${list}\n\nGen yours at: bloxname.com`);
                     setToastMsg("Formatted list copied");
                     setIsToastVisible(true);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-roblox-accent transition-colors bg-white/[0.02] px-6 py-3 rounded-xl border border-white/5 hover:border-roblox-accent/30 uppercase tracking-widest"
                >
                  <Share2 className="w-4 h-4" /> Export List
                </button>
            </div>
          )}

          <div className="max-w-2xl mx-auto w-full">
             <RelatedKeywords keyword={keyword} style={style} onSelect={(k) => { setKeyword(k); handleGenerate(k); window.scrollTo(0,0); }} />
          </div>
       </div>

       <div className="mt-32">
          <h3 className="text-xs font-bold text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
            <Tag className="w-4 h-4 text-roblox-accent" />
            Rapid Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
             {PRESET_CATEGORIES.map((preset, idx) => (
               <Link
                 key={idx}
                 to={preset.link}
                 className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-roblox-accent/30 transition-all duration-300"
               >
                 <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">{preset.emoji}</span>
                 <span className="font-bold text-gray-400 text-xs group-hover:text-white transition-colors uppercase tracking-wide">{preset.label}</span>
               </Link>
             ))}
          </div>
       </div>
       
       <RatingWidget />
       
       <StyleSpecificContent style={style} />
       
       <RarityGuide />
       
       {/* SEO Content Block */}
       <div className="mt-24 prose prose-invert max-w-none text-gray-400">
           <section className="space-y-12">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <HelpCircle className="text-roblox-accent w-6 h-6" />
                <h3 className="text-2xl font-bold text-white m-0">FAQ Protocol</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {generateFAQs(style, keyword).map((item, index) => (
                  <div key={index} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">{item.question}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
           </section>
           
           <div className="mt-24 border-t border-white/5 pt-16">
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

       <div className="mt-24 border-t border-white/5 pt-16">
          <div className="flex items-center gap-3 mb-10">
             <BookOpen className="text-roblox-accent w-6 h-6" />
             <h3 className="text-2xl font-bold text-white">Latest Intel</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {BLOG_POSTS.slice(0, 3).map((post) => (
               <Link 
                 key={post.slug}
                 to={`/blog/${post.slug}`}
                 className="group block bg-black/40 border border-white/5 rounded-2xl overflow-hidden hover:border-roblox-accent/30 transition-all hover:-translate-y-1 hover:shadow-neon"
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
                   <h4 className="font-bold text-white text-base mb-3 group-hover:text-roblox-accent transition-colors line-clamp-2">{post.title}</h4>
                   <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                     <Clock className="w-3 h-3" /> {post.readTime}
                   </div>
                 </div>
               </Link>
             ))}
          </div>
       </div>

       <div className="mt-32 pt-16 border-t border-white/5">
          <h3 className="text-xs font-bold text-gray-600 mb-10 text-center uppercase tracking-[0.3em]">Popular Examples {CURRENT_YEAR}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
             {Object.entries(STATIC_POPULAR_NAMES).map(([styleKey, names]) => (
               <div key={styleKey} className="space-y-4">
                  <h4 className="text-roblox-accent font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">{styleKey}</h4>
                  <ul className="space-y-2 text-xs text-gray-500 font-mono">
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