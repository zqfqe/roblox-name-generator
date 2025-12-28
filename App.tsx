import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Wand2, RefreshCw, Zap, Heart, Copy, History, Settings2, ChevronDown, ChevronUp, Sparkles, Fingerprint, Download, Hash, Dices, HelpCircle, X, Tag, Volume2, VolumeX, ArrowUp, Share2, Trash2, BookOpen, Shield, Mail, FileText, Info, Map as MapIcon, ChevronRight, Home, AlertTriangle, Search, CalendarCheck, Sword, Castle, Ghost, Lightbulb, Clock, Compass, Check, Lightbulb as IdeaIcon, Filter, AlignLeft, AlignCenter, AlignRight, Shuffle, Layers, EyeOff, Ruler, Activity } from 'lucide-react';
import { NameStyle, GeneratorOptions, GeneratedName, LengthPreference } from './types';
import { generateRobloxNames } from './services/localNameService';
import { audioService } from './services/audioService';
import { Button } from './components/Button';
import { NameList } from './components/NameList';
import { Toast } from './components/Toast';
import { LegalPage } from './components/LegalPages';
import { Blog } from './components/Blog';
import { RatingWidget } from './components/RatingWidget';
import { RarityGuide } from './components/RarityGuide';
import { Logo } from './components/Logo';
import { PreviewModal } from './components/PreviewModal';
import { NameAnalyzer } from './components/NameAnalyzer';
import { DecoratorModal } from './components/DecoratorModal';
import { BLOG_POSTS } from './data/blogPosts';
import { SYNONYMS } from './data/wordLists';

const CURRENT_YEAR = new Date().getFullYear();

// Basic client-side safety filter
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

const STYLE_ICONS: Record<NameStyle, React.ReactNode> = {
  [NameStyle.COOL]: <Sword className="w-4 h-4 text-red-400" />,
  [NameStyle.AESTHETIC]: <Sparkles className="w-4 h-4 text-purple-400" />,
  [NameStyle.EDGY]: <Ghost className="w-4 h-4 text-gray-400" />,
  [NameStyle.FUNNY]: <Dices className="w-4 h-4 text-yellow-400" />,
  [NameStyle.CUTE]: <Heart className="w-4 h-4 text-pink-400" />,
  [NameStyle.OG]: <Fingerprint className="w-4 h-4 text-blue-400" />,
  [NameStyle.MIXED]: <Layers className="w-4 h-4 text-teal-400" />,
};

const STATIC_POPULAR_NAMES = {
  [NameStyle.COOL]: ['ShadowViper', 'ToxicLegend', 'NotNinja', 'HyperGod', 'StormRider'],
  [NameStyle.AESTHETIC]: ['cloud.vibes', 'pure.soul', 'soft.tear', 'lunar.sky', 'star.dust'],
  [NameStyle.CUTE]: ['BunnyXo', 'CookieBear', 'PinkMochi', 'LilPanda', 'HoneyBee'],
  [NameStyle.OG]: ['RealBox', 'Guy1', 'BotSz', 'RedDog', 'AceRBX']
};

// --- SEO HELPER COMPONENTS ---

// Dynamically updates <head> tags
const SEOHead = ({ title, description, url, image }: { title: string, description: string, url: string, image?: string }) => {
  useEffect(() => {
    document.title = title;
    
    // Update Meta Tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('twitter:title', title, 'property');
    updateMeta('twitter:description', description, 'property');
    
    // Default fallback image if none provided
    const ogImage = image || 'https://bloxname.com/apple-touch-icon.png';
    updateMeta('og:image', ogImage, 'property');
    updateMeta('twitter:image', ogImage, 'property');

    // Update Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

  }, [title, description, url, image]);

  return null;
};

// Injects JSON-LD Structure Data
const SchemaMarkup = ({ data }: { data: object }) => {
  useEffect(() => {
    const scriptId = 'json-ld-data';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data); // Fixed: use textContent instead of text
    document.head.appendChild(script);
    
    return () => {
      const s = document.getElementById(scriptId);
      if(s) s.remove();
    }
  }, [data]);
  return null;
};

// --- CUSTOM UI COMPONENTS ---

const GamingSelect = ({ value, onChange }: { value: NameStyle, onChange: (val: NameStyle) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative h-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-between pl-4 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl outline-none text-white font-medium transition-all duration-200 ${isOpen ? 'ring-2 ring-roblox-accent border-transparent' : 'hover:border-gray-500'}`}
        aria-label="Select Style"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {STYLE_ICONS[value]}
          <span className="truncate">{value === NameStyle.MIXED ? 'Mixed Mode' : `${value} Mode`}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-down origin-top">
          <ul role="listbox" className="py-1">
            {Object.values(NameStyle).map((styleOption) => (
              <li key={styleOption}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(styleOption);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between text-sm transition-colors ${value === styleOption ? 'bg-roblox-accent/20 text-roblox-accent' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`}
                  role="option"
                  aria-selected={value === styleOption}
                >
                  <div className="flex items-center gap-3">
                    {STYLE_ICONS[styleOption]}
                    <span className="font-medium">{styleOption === NameStyle.MIXED ? 'Mixed / All' : styleOption}</span>
                  </div>
                  {value === styleOption && <Check className="w-3 h-3" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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

type TabType = 'results' | 'history' | 'favorites';
type ViewType = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog' | 'sitemap' | 'analyzer';

const LOADING_PHRASES = [
  'Synthesizing...',
  'Checking availability...',
  'Applying aesthetics...',
  'Mixing patterns...',
  'Polishing...'
];

const Breadcrumbs = ({ view, slug, onNavigate, currentStyle }: { view: ViewType, slug: string | null, onNavigate: (v: ViewType, s?: string | null) => void, currentStyle?: NameStyle }) => {
  let items = [{ label: 'Home', view: 'home' as ViewType, slug: null }];
  
  if (view === 'home' && currentStyle && currentStyle !== NameStyle.COOL) {
    items.push({ label: `${currentStyle === NameStyle.MIXED ? 'Mixed' : currentStyle} Names`, view: 'home', slug: null });
  } else if (view === 'blog') {
    items.push({ label: 'Blog', view: 'blog', slug: null });
    if (slug) {
      const post = BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
        items.push({ label: post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title, view: 'blog', slug: slug });
      } else {
        items.push({ label: 'Not Found', view: 'blog', slug: null });
      }
    }
  } else if (view !== 'home') {
    items.push({ label: view.charAt(0).toUpperCase() + view.slice(1), view: view, slug: null });
  }

  if (items.length === 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-600" />}
              {isLast ? (
                <span className="text-roblox-accent font-medium" aria-current="page">{item.label}</span>
              ) : (
                <a 
                  href={`?view=${item.view}${item.slug ? `&slug=${item.slug}` : ''}`}
                  onClick={(e) => { e.preventDefault(); onNavigate(item.view, item.slug); }}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  {item.view === 'home' && <Home className="w-3 h-3" />}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

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
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
        <Compass className="w-3 h-3" /> Related Searches
      </div>
      <div className="flex flex-wrap gap-2">
        {related.slice(0, 6).map(term => (
          <a 
            key={term}
            href={`?style=${style}&keyword=${term}`}
            onClick={(e) => { e.preventDefault(); onSelect(term); }}
            className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:text-white rounded-lg border border-gray-700/50 transition-colors"
          >
            {term} Names
          </a>
        ))}
      </div>
    </div>
  );
};

const Sitemap = ({ onNavigate }: { onNavigate: (view: ViewType, slug?: string | null) => void }) => (
  <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in-up">
    <div className="text-center mb-12">
      <MapIcon className="w-12 h-12 text-roblox-accent mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Sitemap</h1>
      <p className="text-gray-400">Overview of all pages and articles on BloxName.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" /> Main Pages
        </h2>
        <ul className="space-y-4">
          {[
            { id: 'home', label: 'Home / Generator' },
            { id: 'analyzer', label: 'Username Rater' },
            { id: 'blog', label: 'Blog & Guides' },
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Contact Support' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms of Service' }
          ].map(page => (
            <li key={page.id}>
              <a 
                href={`?view=${page.id}`}
                onClick={(e) => { e.preventDefault(); onNavigate(page.id as ViewType); }}
                className="flex items-center gap-3 text-gray-300 hover:text-roblox-accent transition-colors group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-roblox-accent transition-colors"></div>
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" /> Blog Articles
        </h2>
        <ul className="space-y-4">
          {BLOG_POSTS.map(post => (
            <li key={post.slug}>
              <a 
                href={`?view=blog&slug=${post.slug}`}
                onClick={(e) => { e.preventDefault(); onNavigate('blog', post.slug); }}
                className="block group"
              >
                <span className="text-gray-300 group-hover:text-white font-medium transition-colors block mb-0.5">
                  {post.title}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-roblox-accent transition-colors">
                  {post.tags[0]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// New Component: Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 rounded-full bg-roblox-accent shadow-lg text-white transition-all duration-300 z-40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

const App: React.FC = () => {
  const getInitialParam = (key: string, defaultVal: string) => {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(key) || defaultVal;
    } catch (e) {
      return defaultVal;
    }
  };

  const getInitialBool = (key: string, defaultVal: boolean) => {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const params = new URLSearchParams(window.location.search);
      const val = params.get(key);
      if (val === 'true') return true;
      if (val === 'false') return false;
      return defaultVal;
    } catch (e) {
      return defaultVal;
    }
  };

  const [currentView, setCurrentView] = useState<ViewType>(() => getInitialParam('view', 'home') as ViewType);
  const [blogSlug, setBlogSlug] = useState<string | null>(() => getInitialParam('slug', ''));

  const [keyword, setKeyword] = useState(() => getInitialParam('keyword', ''));
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const [style, setStyle] = useState<NameStyle>(() => getInitialParam('style', NameStyle.COOL) as NameStyle);
  const [length, setLength] = useState<LengthPreference>(() => getInitialParam('length', LengthPreference.ANY) as LengthPreference);
  const [includeNumbers, setIncludeNumbers] = useState(() => getInitialBool('numbers', true));
  const [includeUnderscore, setIncludeUnderscore] = useState(() => getInitialBool('underscore', false));
  const [useExactMatch, setUseExactMatch] = useState(() => getInitialBool('exact', false));
  const [useLeet, setUseLeet] = useState(() => getInitialBool('leet', false));
  const [forDisplayName, setForDisplayName] = useState(() => getInitialBool('displayname', false));
  const [prefix, setPrefix] = useState(() => getInitialParam('prefix', ''));
  const [suffix, setSuffix] = useState(() => getInitialParam('suffix', ''));
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loadingText, setLoadingText] = useState('Generating...');

  // --- Live Result Filters State ---
  const [filterText, setFilterText] = useState('');
  const [filterHideNumbers, setFilterHideNumbers] = useState(false);
  const [filterShortOnly, setFilterShortOnly] = useState(false);

  // --- Persistent Generated Names Logic ---
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>(() => {
    try {
      // Restore from Session Storage if available to prevent data loss on refresh
      const saved = sessionStorage.getItem('bloxname_current_results');
      return saved ? JSON.parse(saved) : [];
    } catch(e) {
      return [];
    }
  });

  // Save generated names to session storage whenever they change
  useEffect(() => {
    if (generatedNames.length > 0) {
      sessionStorage.setItem('bloxname_current_results', JSON.stringify(generatedNames));
    }
  }, [generatedNames]);

  const [history, setHistory] = useState<GeneratedName[]>(() => {
     try {
       const saved = localStorage.getItem('bloxname_history');
       return saved ? JSON.parse(saved) : [];
     } catch (e) {
       return [];
     }
  });
  const [favorites, setFavorites] = useState<GeneratedName[]>(() => {
    try {
      const saved = localStorage.getItem('bloxname_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('results');
  const [previewName, setPreviewName] = useState<GeneratedName | null>(null);
  const [decoratorName, setDecoratorName] = useState<string | null>(null); // New state for modal
  
  const hasInitialized = useRef(false);

  const getRandom = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Smart Suggestion Logic
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
    overrideStyle?: NameStyle,
    isInitialLoad: boolean = false
  ) => {
    const k = overrideKeyword !== undefined ? overrideKeyword : keyword;
    const s = overrideStyle !== undefined ? overrideStyle : style;

    // Safety Filter
    if (k && BAD_WORDS.some(bad => k.toLowerCase().includes(bad))) {
      setError("Let's keep it appropriate! 🚫");
      setToastMsg("Restricted keyword detected.");
      setIsToastVisible(true);
      return;
    }

    if (!k && !isInitialLoad && s === NameStyle.OG) {
       // Allow empty keyword for OG/Random styles if needed
    }

    setIsLoading(true);
    setError(null);
    setLoadingText(getRandom(LOADING_PHRASES));
    setShowScrollButton(false);
    
    // Reset filters on new generation to show all results initially
    setFilterText('');
    setFilterHideNumbers(false);
    setFilterShortOnly(false);
    
    if (!isInitialLoad) {
       if (overrideKeyword !== undefined) setKeyword(overrideKeyword);
       if (overrideStyle !== undefined) setStyle(overrideStyle);
    }

    try {
      if (soundEnabled && !isInitialLoad) audioService.playGenerate();

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
      
      if (!isInitialLoad && newGeneratedNames.length > 0) {
        setHistory(prev => {
           const newHist = [...newGeneratedNames.slice(0, 4), ...prev];
           return newHist.slice(0, 50); 
        });
      }

      setTimeout(() => {
        if (!isInitialLoad) {
             const resultsEl = document.getElementById('results-section');
             if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      setError("Failed to generate names. The algorithm got confused.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemix = (name: string) => {
    let clean = name.replace(/[0-9]+$/, ''); 
    clean = clean.replace(/_+$/, '').replace(/^_+/, ''); 
    
    setKeyword(clean);
    setToastMsg(`Remixing "${clean}"...`);
    setIsToastVisible(true);
    handleGenerate(clean);
    window.scrollTo(0, 0); 
  };

  const handleShareList = (list: GeneratedName[]) => {
    if (list.length === 0) return;
    
    const header = "🔥 BloxName Generator Results:\n";
    const body = list.map((n, i) => `${i + 1}. ${n.name}`).join('\n');
    const footer = "\n\nGenerate yours at: bloxname.com";
    
    const fullText = header + body + footer;
    navigator.clipboard.writeText(fullText);
    setToastMsg("List copied for sharing!");
    setIsToastVisible(true);
    if (soundEnabled) audioService.playSuccess();
  };

  const handleDownload = (list: GeneratedName[], filename: string) => {
    if (list.length === 0) return;
    const content = list.map(n => n.name).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (soundEnabled) audioService.playSuccess();
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your history?")) {
      setHistory([]);
      localStorage.removeItem('bloxname_history');
      setToastMsg("History cleared");
      setIsToastVisible(true);
      if (soundEnabled) audioService.playClick();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  useEffect(() => {
    localStorage.setItem('bloxname_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('bloxname_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (currentView !== 'home') {
      params.set('view', currentView);
      if (currentView === 'blog' && blogSlug) {
        params.set('slug', blogSlug);
      }
    }

    if (currentView === 'home') {
      if (keyword) params.set('keyword', keyword);
      if (style !== NameStyle.COOL) params.set('style', style);
      if (length !== LengthPreference.ANY) params.set('length', length);
      if (includeNumbers !== true) params.set('numbers', 'false');
      if (includeUnderscore !== false) params.set('underscore', 'true');
      if (useExactMatch !== false) params.set('exact', 'true');
      if (useLeet !== false) params.set('leet', 'true');
      if (forDisplayName !== false) params.set('displayname', 'true');
      if (prefix) params.set('prefix', prefix);
      if (suffix) params.set('suffix', suffix);
    }

    try {
      if (window.location.protocol !== 'blob:') {
         const newUrl = `${window.location.pathname}?${params.toString()}`;
         window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {
      // Ignore
    }
  }, [keyword, style, length, includeNumbers, includeUnderscore, useExactMatch, useLeet, forDisplayName, prefix, suffix, currentView, blogSlug]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (currentView === 'home') {
      const initialKeyword = getInitialParam('keyword', '');
      // Only auto-generate if we don't have persisted results from session
      if (initialKeyword && generatedNames.length === 0) {
        handleGenerate(initialKeyword, undefined, true);
      } 
    }
  }, []);

  // --- Dynamic SEO Logic (Replaces the old useEffect title updater) ---
  const activeBlogPost = currentView === 'blog' && blogSlug 
    ? BLOG_POSTS.find(p => p.slug === blogSlug) 
    : null;

  const getPageTitle = () => {
    if (currentView === 'analyzer') return `Roblox Name Rater & Analyzer - Is Your Name Rare?`;
    if (currentView === 'about') return `About Us - BloxName Generator`;
    if (currentView === 'contact') return `Contact Support - BloxName`;
    if (currentView === 'blog') {
      return activeBlogPost ? activeBlogPost.title : `Roblox Username Guides & Blog - BloxName`;
    }
    // Dynamic Home Title
    if (keyword) return `${keyword} Roblox Names - Free Generator ${CURRENT_YEAR}`;
    if (style && style !== NameStyle.COOL) return `${style} Roblox Name Generator ${CURRENT_YEAR}`;
    return `Roblox Name Generator & Username Creator ${CURRENT_YEAR} - BloxName`;
  };

  const getPageDescription = () => {
    if (currentView === 'analyzer') return "Check if your Roblox username is rare, sweaty, or OG. Get a rarity score and tier analysis instantly.";
    if (activeBlogPost) return activeBlogPost.excerpt;
    if (keyword) return `Generate unique ${keyword} usernames for Roblox. Check availability for ${keyword} names instantly.`;
    return "The ultimate Roblox Name Generator. Create unique, aesthetic, sweaty, and OG names instantly with our advanced Roblox Username Generator.";
  };

  const getPageUrl = () => {
    const base = 'https://bloxname.com/';
    if (currentView === 'blog' && blogSlug) return `${base}?view=blog&slug=${blogSlug}`;
    if (currentView !== 'home') return `${base}?view=${currentView}`;
    return base;
  };

  // --- Schema Generator ---
  const getSchema = () => {
    const baseSchema: any = {
      "@context": "https://schema.org",
      "@graph": []
    };

    // Breadcrumbs Logic
    const breadcrumbList: any = {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bloxname.com"
        }
      ]
    };

    if (activeBlogPost) {
      // Blog Post Schema
      baseSchema["@graph"].push({
        "@type": "BlogPosting",
        "headline": activeBlogPost.title,
        "image": activeBlogPost.imageUrl,
        "datePublished": new Date(activeBlogPost.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": activeBlogPost.author
        },
        "description": activeBlogPost.excerpt
      });

      // Update Breadcrumbs for Blog Post
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://bloxname.com/?view=blog"
      });
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": activeBlogPost.title,
        "item": getPageUrl()
      });

    } else if (currentView === 'blog') {
      // Blog Index Breadcrumb
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://bloxname.com/?view=blog"
      });
    } else if (currentView === 'home' && style !== NameStyle.COOL) {
      // Filtered Home Breadcrumb
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": `${style} Names`,
        "item": getPageUrl()
      });
    }

    // Add BreadcrumbList to Graph
    baseSchema["@graph"].push(breadcrumbList);

    if (currentView === 'home') {
      // 1. WebApplication Schema
      baseSchema["@graph"].push({
        "@type": "WebApplication",
        "name": "BloxName",
        "url": "https://bloxname.com",
        "description": "AI-powered Roblox username generator for sweaty, aesthetic, and OG names.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      });

      // 2. FAQPage Schema (Dynamic based on current state)
      const faqs = generateFAQs(style, keyword);
      baseSchema["@graph"].push({
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      });
    }
    
    return baseSchema;
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

  const getRelatedBlogPost = () => {
    if (style === NameStyle.COOL) return BLOG_POSTS.find(p => p.slug.includes('sweaty-pvp'));
    if (style === NameStyle.AESTHETIC) return BLOG_POSTS.find(p => p.slug.includes('aesthetic'));
    if (style === NameStyle.OG) return BLOG_POSTS.find(p => p.slug.includes('rare-og'));
    if (style === NameStyle.CUTE) return BLOG_POSTS.find(p => p.slug.includes('display-name')); 
    return null;
  };

  const relatedPost = getRelatedBlogPost();

  // --- Filtering Logic ---
  const getFilteredNames = () => {
    let source = activeTab === 'results' ? generatedNames : activeTab === 'history' ? history : favorites;
    
    return source.filter(item => {
      // Text Filter
      if (filterText && !item.name.toLowerCase().includes(filterText.toLowerCase())) return false;
      // No Numbers Filter
      if (filterHideNumbers && /\d/.test(item.name)) return false;
      // Short Only Filter (< 10 chars)
      if (filterShortOnly && item.name.length >= 10) return false;
      return true;
    });
  };

  const filteredNames = getFilteredNames();

  const renderHome = () => (
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
             <div 
               key={style}
               className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-400 animate-fade-in-up"
             >
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
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter a keyword (e.g. 'Shadow', 'Vibe')"
                  aria-label="Enter a keyword"
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-roblox-accent focus:border-transparent outline-none text-white font-medium placeholder-gray-600 transition-all shadow-[0_0_0_0_rgba(0,176,111,0)] focus:shadow-[0_0_20px_rgba(0,176,111,0.2)]"
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
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
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
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          <AlignLeft className="w-3 h-3" /> Prefix
                        </label>
                        <input 
                          type="text" 
                          value={prefix} 
                          onChange={(e) => setPrefix(e.target.value)}
                          placeholder="e.g. Itz"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-roblox-accent outline-none transition-colors"
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
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-roblox-accent outline-none transition-colors"
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
               aria-label="Generate Roblox names"
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
               aria-label="Randomize names"
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
               <a 
                 href={`?view=blog&slug=${relatedPost.slug}`}
                 onClick={(e) => { e.preventDefault(); setCurrentView('blog'); setBlogSlug(relatedPost.slug); window.scrollTo(0,0); }}
                 className="hidden sm:flex items-center gap-1 text-sm font-bold text-roblox-accent hover:text-white transition-colors whitespace-nowrap"
               >
                 Read Guide <ChevronRight className="w-4 h-4" />
               </a>
            </div>
         </div>
       )}

       <div id="results-section" className="min-h-[400px]">
          <div className="flex flex-col items-center justify-center mb-6 gap-4">
             {/* Tabs */}
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

             {/* Live Filter Bar */}
             {(generatedNames.length > 0 || history.length > 0 || favorites.length > 0) && (
               <div className="w-full max-w-2xl flex flex-wrap items-center gap-2 bg-gray-800/30 p-2 rounded-xl border border-gray-700/30 animate-fade-in-up">
                  <div className="relative flex-grow min-w-[150px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
                    <input 
                      type="text" 
                      placeholder="Filter list..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-xs text-white focus:ring-1 focus:ring-roblox-accent outline-none placeholder-gray-600"
                    />
                  </div>
                  
                  <button 
                    onClick={() => setFilterHideNumbers(!filterHideNumbers)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${filterHideNumbers ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:text-white'}`}
                  >
                    <EyeOff className="w-3.5 h-3.5" /> No Numbers
                  </button>

                  <button 
                    onClick={() => setFilterShortOnly(!filterShortOnly)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${filterShortOnly ? 'bg-roblox-accent/20 text-roblox-accent border-roblox-accent/50' : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:text-white'}`}
                  >
                    <Ruler className="w-3.5 h-3.5" /> &lt; 10 Chars
                  </button>
               </div>
             )}
          </div>

          {activeTab === 'results' && (
             <div className="flex flex-col">
                <NameList 
                  names={filteredNames.length > 0 ? filteredNames : (filterText || filterHideNumbers || filterShortOnly) ? [] : FEATURED_EXAMPLES} 
                  onFavoriteToggle={handleFavoriteToggle}
                  onRemix={handleRemix}
                  onPreview={(name) => setPreviewName(name)}
                  onDecorate={(name) => setDecoratorName(name)} // Trigger decorator
                  isLoading={isLoading}
                  title={filteredNames.length > 0 ? "Generated Results" : "Featured Examples"}
                  onCopyAll={() => {
                    const allNames = filteredNames.map(n => n.name).join('\n');
                    navigator.clipboard.writeText(allNames);
                    setToastMsg("All names copied to clipboard!");
                    setIsToastVisible(true);
                    if (soundEnabled) audioService.playSuccess();
                  }}
                />
                
                {filteredNames.length === 0 && (filterText || filterHideNumbers || filterShortOnly) && (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    No names match your filters. Try adjusting them or generating more!
                  </div>
                )}
                
                {filteredNames.length > 0 && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleShareList(filteredNames)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-roblox-accent transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share formatted list
                    </button>
                  </div>
                )}
                
                <div className="max-w-2xl mx-auto w-full">
                   <RelatedKeywords 
                     keyword={keyword} 
                     style={style} 
                     onSelect={(k) => {
                       setKeyword(k);
                       handleGenerate(k);
                       window.scrollTo(0,0);
                     }}
                   />
                </div>
             </div>
          )}
          {activeTab === 'history' && (
             <div>
               <div className="flex justify-end mb-4 gap-2">
                 {history.length > 0 && (
                   <>
                     <button
                       onClick={() => handleDownload(history, 'history')}
                       className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                     >
                       <Download className="w-3.5 h-3.5" /> Export TXT
                     </button>
                     <button
                       onClick={handleClearHistory}
                       className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-900/20 border border-red-900/30 hover:bg-red-900/40 px-3 py-1.5 rounded-lg transition-colors"
                     >
                       <Trash2 className="w-3.5 h-3.5" /> Clear All
                     </button>
                   </>
                 )}
               </div>
               <NameList 
                 names={filteredNames} 
                 onFavoriteToggle={handleFavoriteToggle}
                 onRemix={handleRemix}
                 onPreview={(name) => setPreviewName(name)}
                 onDecorate={(name) => setDecoratorName(name)}
                 title="Recent History"
                 onCopyAll={() => {
                    const allNames = filteredNames.map(n => n.name).join('\n');
                    navigator.clipboard.writeText(allNames);
                    setToastMsg("History copied to clipboard!");
                    setIsToastVisible(true);
                    if (soundEnabled) audioService.playSuccess();
                 }}
               />
             </div>
          )}
          {activeTab === 'favorites' && (
             <div>
               <div className="flex justify-end mb-4 gap-2">
                 {favorites.length > 0 && (
                   <button
                     onClick={() => handleDownload(favorites, 'favorites')}
                     className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                   >
                     <Download className="w-3.5 h-3.5" /> Export TXT
                   </button>
                 )}
               </div>
               <NameList 
                 names={filteredNames} 
                 onFavoriteToggle={handleFavoriteToggle}
                 onRemix={handleRemix}
                 onPreview={(name) => setPreviewName(name)}
                 onDecorate={(name) => setDecoratorName(name)}
                 title="Your Favorites"
                 onCopyAll={() => {
                    const allNames = filteredNames.map(n => n.name).join('\n');
                    navigator.clipboard.writeText(allNames);
                    setToastMsg("Favorites copied to clipboard!");
                    setIsToastVisible(true);
                    if (soundEnabled) audioService.playSuccess();
                 }}
               />
             </div>
          )}
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
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                 
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
           
           {/* --- NEW SEO CONTENT SECTION (Content Density) --- */}
           <div className="mt-20 border-t border-gray-800 pt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Why use BloxName?</h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Advanced Naming Algorithms</h3>
                  <p className="mb-4">
                    Unlike basic randomizers, BloxName understands Roblox culture. Our algorithms are tuned to generate names that fit specific subcultures like "Sweaty PvP", "Aesthetic/Soft", "Da Hood", and "OG". We use sophisticated logic to combine prefixes, suffixes, and leet speak to find available usernames in {CURRENT_YEAR}.
                  </p>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Safety & Privacy First</h3>
                  <p>
                    Using your real name online is a security risk. A random username generator helps protect your identity by creating a unique digital persona. Our tool ensures all generated names are safe, appropriate, and filtered against bad words, making it perfect for users of all ages.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Display Names vs. Usernames</h3>
                  <p className="mb-4">
                    Did you know you can change your Display Name for free every 7 days? BloxName is perfect for generating creative Display Names using special characters and spaces, even if the base username is taken. Use our "Aesthetic" mode to find the perfect look for your profile.
                  </p>
                  <h3 className="text-lg font-semibold text-roblox-accent mb-2">Check Availability Instantly</h3>
                  <p>
                    Stop wasting time typing names into the signup page. Our generator provides instant availability estimates based on character patterns and allows you to one-click check names directly on Roblox. Save your favorites, track your history, and find that rare 5-letter gem.
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
               <a 
                 key={post.slug}
                 href={`?view=blog&slug=${post.slug}`}
                 onClick={(e) => { e.preventDefault(); setCurrentView('blog'); setBlogSlug(post.slug); window.scrollTo(0,0); }}
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
               </a>
             ))}
          </div>
       </div>

       <div className="mt-24 pt-12 border-t border-gray-800">
          <h3 className="text-lg font-bold text-white mb-8 text-center uppercase tracking-widest">Popular Roblox Name Ideas {CURRENT_YEAR}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
             <div>
                <h4 className="text-roblox-accent font-bold mb-4 text-sm">🔥 Cool Names</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   {STATIC_POPULAR_NAMES[NameStyle.COOL].map(n => (
                     <li key={n} className="hover:text-white transition-colors">{n}</li>
                   ))}
                </ul>
             </div>
             <div>
                <h4 className="text-fuchsia-400 font-bold mb-4 text-sm">✨ Aesthetic Names</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   {STATIC_POPULAR_NAMES[NameStyle.AESTHETIC].map(n => (
                     <li key={n} className="hover:text-white transition-colors">{n}</li>
                   ))}
                </ul>
             </div>
             <div>
                <h4 className="text-pink-400 font-bold mb-4 text-sm">💖 Cute Usernames</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   {STATIC_POPULAR_NAMES[NameStyle.CUTE].map(n => (
                     <li key={n} className="hover:text-white transition-colors">{n}</li>
                   ))}
                </ul>
             </div>
             <div>
                <h4 className="text-blue-400 font-bold mb-4 text-sm">🧢 Rare OG Names</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   {STATIC_POPULAR_NAMES[NameStyle.OG].map(n => (
                     <li key={n} className="hover:text-white transition-colors">{n}</li>
                   ))}
                </ul>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-[#00b06f] selection:text-white overflow-x-hidden">
      {/* Dynamic SEO Components */}
      <SEOHead 
        title={getPageTitle()}
        description={getPageDescription()}
        url={getPageUrl()}
        image={activeBlogPost?.imageUrl}
      />
      <SchemaMarkup data={getSchema()} />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-roblox-accent text-white px-4 py-2 rounded-lg z-50 font-bold shadow-xl transition-all">
        Skip to content
      </a>

      <nav className="border-b border-gray-800 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setCurrentView('home'); setKeyword(''); window.scrollTo(0,0); }}
          >
            <Logo size="sm" />
          </div>

          <div className="flex items-center gap-1 sm:gap-6">
            <button onClick={() => setCurrentView('home')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentView === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Generator</button>
            <button onClick={() => setCurrentView('analyzer')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentView === 'analyzer' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Rate Name</button>
            <button onClick={() => setCurrentView('blog')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentView === 'blog' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Blog</button>
            
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors ml-2 hidden sm:block"
              title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="mt-4">
        {currentView !== 'analyzer' && (
          <Breadcrumbs 
            view={currentView} 
            slug={blogSlug} 
            onNavigate={(v, s) => { setCurrentView(v); if(s) setBlogSlug(s); }} 
            currentStyle={style}
          />
        )}
      </div>

      <main id="main-content" className="pb-20">
        {currentView === 'home' && renderHome()}
        {currentView === 'analyzer' && <NameAnalyzer />}
        {currentView === 'blog' && <Blog currentSlug={blogSlug} onNavigate={(slug) => { setBlogSlug(slug); if (!slug) setCurrentView('blog'); }} />}
        {currentView === 'about' && <LegalPage type="about" onBack={() => setCurrentView('home')} />}
        {currentView === 'contact' && <LegalPage type="contact" onBack={() => setCurrentView('home')} />}
        {currentView === 'privacy' && <LegalPage type="privacy" onBack={() => setCurrentView('home')} />}
        {currentView === 'terms' && <LegalPage type="terms" onBack={() => setCurrentView('home')} />}
        {currentView === 'sitemap' && <Sitemap onNavigate={(v, s) => { setCurrentView(v); if(s) setBlogSlug(s); }} />}
      </main>

      <footer className="border-t border-gray-800 bg-[#0a0c0f] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The #1 Roblox Username Generator. Create aesthetic, sweaty, and rare names instantly. Not affiliated with Roblox Corporation.
            </p>
            <p className="text-gray-600 text-xs pt-2">
              © {CURRENT_YEAR} BloxName. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a 
                  href="?style=Cool" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('home'); setStyle(NameStyle.COOL); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Sweaty Name Generator
                </a>
              </li>
              <li>
                <a 
                  href="?view=analyzer" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('analyzer'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Rate My Username
                </a>
              </li>
              <li>
                <a 
                  href="?style=Aesthetic"
                  onClick={(e) => { e.preventDefault(); setCurrentView('home'); setStyle(NameStyle.AESTHETIC); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Aesthetic Name Generator
                </a>
              </li>
              <li>
                <a 
                  href="?style=Cute"
                  onClick={(e) => { e.preventDefault(); setCurrentView('home'); setStyle(NameStyle.CUTE); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Cute Username Ideas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Generators by Game</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: 'Da Hood Names', key: 'Da Hood' },
                { label: 'BedWars Names', key: 'BedWars' },
                { label: 'Blox Fruits Names', key: 'Blox Fruits' },
                { label: 'Pet Sim 99 Names', key: 'Pet Sim' },
                { label: 'Murder Mystery 2 Names', key: 'MM2' }
              ].map(game => (
                <li key={game.key}>
                  <a 
                    href={`?style=Cool&keyword=${game.key}`}
                    onClick={(e) => { 
                      e.preventDefault();
                      setCurrentView('home');
                      setKeyword(game.key);
                      setStyle(NameStyle.COOL);
                      handleGenerate(game.key, NameStyle.COOL);
                      window.scrollTo(0,0);
                    }}
                    className="hover:text-roblox-accent transition-colors block"
                  >
                    {game.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a 
                  href="?view=about" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="?view=contact" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('contact'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a 
                  href="?view=privacy" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('privacy'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="?view=terms" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('terms'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="?view=sitemap" 
                  onClick={(e) => { e.preventDefault(); setCurrentView('sitemap'); window.scrollTo(0,0); }} 
                  className="hover:text-roblox-accent transition-colors block"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <Toast message={toastMsg} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
      
      {/* Preview Modal Rendered Globally to ensure it can overlay everything */}
      {previewName && (
         <PreviewModal 
           name={previewName} 
           isOpen={true} 
           onClose={() => setPreviewName(null)} 
         />
      )}

      {/* Decorator Modal (New Integration) */}
      {decoratorName && (
        <DecoratorModal
          name={decoratorName}
          isOpen={true}
          onClose={() => setDecoratorName(null)}
        />
      )}

      {/* Floating Scroll To Top */}
      <ScrollToTop />
    </div>
  );
};

export default App;