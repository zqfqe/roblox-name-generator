import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Wand2, Dices, AlertTriangle, Search, Info, Settings2, Filter, AlignLeft, AlignRight, EyeOff, Ruler, Share2, Download, Trash2, Tag, HelpCircle, BookOpen, Clock, ChevronRight, Lightbulb, Zap, ArrowRight } from 'lucide-react';
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
  { label: 'Sweaty PvP', emoji: '⚔️', style: NameStyle.COOL, link: '/sweaty-roblox-names', desc: 'For Da Hood & Bedwars' },
  { label: 'Aesthetic', emoji: '✨', style: NameStyle.AESTHETIC, link: '/aesthetic-roblox-usernames', desc: 'Soft, Y2K & Cottagecore' },
  { label: 'Rare OG', emoji: '💎', style: NameStyle.OG, link: '/rare-og-roblox-names', desc: 'Short 4-Letter Names' },
  { label: 'Anime', emoji: '⛩️', style: NameStyle.COOL, link: '/sweaty-roblox-names?keyword=Anime', desc: 'Japanese & Manga Styles' },
  { label: 'Cute', emoji: '🌸', style: NameStyle.CUTE, link: '/cute-roblox-names', desc: 'Kawaii & Pastel Vibes' },
  { label: 'Funny', emoji: '🤡', style: NameStyle.FUNNY, link: '/funny-roblox-names', desc: 'Troll & Meme Names' },
];

const STYLE_DESCRIPTIONS: Record<NameStyle, string> = {
  [NameStyle.COOL]: "Sweaty / PvP / Edgy",
  [NameStyle.AESTHETIC]: "Soft / Y2K / Dreamy",
  [NameStyle.EDGY]: "Dark / Goth / Emo",
  [NameStyle.FUNNY]: "Troll / Meme / Alt",
  [NameStyle.CUTE]: "Kawaii / Pastel / Sweet",
  [NameStyle.OG]: "Short / Clean / Rare",
  [NameStyle.MIXED]: "Mixed / Random Styles"
};

const FEATURED_EXAMPLES: GeneratedName[] = [
  { id: 'ex1', name: 'VelvetViper' },
  { id: 'ex2', name: 'NeonGhost' },
  { id: 'ex3', name: 'CyberSoul' },
  { id: 'ex4', name: 'PureVibes' },
  { id: 'ex5', name: 'ToxicLegend' },
  { id: 'ex6', name: 'DreamyCloud' },
];

const generateFAQs = (style: NameStyle, keyword: string) => {
  if (style === NameStyle.COOL) {
    return [
      { question: "Are these names actually 'Sweaty'?", answer: "Yes. Our algorithm prioritizes 'clean' naming conventions (no excessive numbers) and uses competitive vocabulary (e.g. 'Soul', 'Viper', 'Void') popular in BedWars and Da Hood." },
      { question: "How do I check availability?", answer: "Click on any generated name to check if it's taken on Roblox. If it is, try using the 'Leet Speak' toggle in Advanced Options to find a variation." },
      { question: "What if the name gets tagged?", answer: "We filter out inappropriate words, but Roblox's filter is strict. If a name turns into hashtags (###), try a different variation or add an underscore." }
    ];
  }
  if (style === NameStyle.AESTHETIC) {
    return [
      { question: "Can I use these for Display Names?", answer: "Absolutely! Since Display Names don't need to be unique, you can pick any aesthetic name (like 'soft.cloud') even if the username is taken." },
      { question: "What makes a name 'Aesthetic'?", answer: "Aesthetic names often use lowercase letters, periods, or nature-themed words. Enable the 'Aesthetic' preset to generate these styles automatically." },
    ];
  }
  return [
    { question: "Is this tool safe to use?", answer: "Yes. This generator runs 100% in your browser. We do not ask for your password or personal info." },
    { question: "Why generate a random name?", answer: "Using a random name protects your real identity. It prevents online predators from knowing your name, age, or location." },
    { question: "Does it cost Robux?", answer: "Generating names is free! However, changing your Roblox username costs 1,000 Robux. Changing your Display Name is free." }
  ];
};

const getRandom = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Premium Select Component
const StyleSelect = ({ value, onChange, disabled }: { value: NameStyle, onChange: (val: NameStyle) => void, disabled?: boolean }) => {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as NameStyle)}
        disabled={disabled}
        aria-label="Select Name Style"
        className={`appearance-none bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium py-3 pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all cursor-pointer disabled:opacity-50`}
      >
         {Object.values(NameStyle).map((styleOption) => (
            <option key={styleOption} value={styleOption} className="bg-gray-900 text-white">
               {styleOption}
            </option>
         ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
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

  // State initialization
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

  // Data Persistence logic
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>(() => {
    try {
      const saved = sessionStorage.getItem('bloxname_current_results');
      return saved ? JSON.parse(saved) : [];
    } catch(e) { return []; }
  });
  const [history, setHistory] = useState<GeneratedName[]>(() => {
     try { const saved = localStorage.getItem('bloxname_history'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });
  const [favorites, setFavorites] = useState<GeneratedName[]>(() => {
    try { const saved = localStorage.getItem('bloxname_favorites'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });

  // Effects
  useEffect(() => { if (generatedNames.length > 0) sessionStorage.setItem('bloxname_current_results', JSON.stringify(generatedNames)); }, [generatedNames]);
  useEffect(() => { localStorage.setItem('bloxname_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('bloxname_favorites', JSON.stringify(favorites)); }, [favorites]);

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

  // Synonyms suggestion logic
  useEffect(() => {
    if (!keyword || keyword.length < 2) { setSuggestions([]); return; }
    const lowerKey = keyword.toLowerCase().trim();
    if (SYNONYMS[lowerKey]) setSuggestions(SYNONYMS[lowerKey].slice(0, 5));
    else setSuggestions([]);
  }, [keyword]);

  // Handlers
  const handleGenerate = async (overrideKeyword?: string, overrideStyle?: NameStyle) => {
    const k = overrideKeyword !== undefined ? overrideKeyword : keyword;
    const s = overrideStyle !== undefined ? overrideStyle : style;

    if (k && BAD_WORDS.some(bad => k.toLowerCase().includes(bad))) {
      setError("Restricted keyword detected.");
      setToastMsg("Inappropriate Keyword");
      setIsToastVisible(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setFilterText('');
    
    if (overrideKeyword !== undefined) setKeyword(overrideKeyword);
    if (overrideStyle !== undefined && !forcedStyle) setInternalStyle(overrideStyle);

    try {
      if (soundEnabled) audioService.playGenerate();
      const names = await generateRobloxNames({
        keyword: k, style: s, length, includeNumbers, includeUnderscore, useLeet, prefix, suffix, useExactMatch, forDisplayName
      });
      const newGeneratedNames = names.map(n => ({ id: Math.random().toString(36).substr(2, 9), name: n }));
      setGeneratedNames(newGeneratedNames);
      setHistory(prev => [...newGeneratedNames.slice(0, 4), ...prev].slice(0, 50));
      
      setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      console.error(err);
      setError("Generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemix = (name: string) => {
    let clean = name.replace(/[0-9]+$/, '').replace(/_+$/, '').replace(/^_+/, ''); 
    setKeyword(clean);
    handleGenerate(clean);
  };

  const handleFavoriteToggle = (name: GeneratedName) => {
    if (favorites.some(f => f.id === name.id)) {
      setFavorites(prev => prev.filter(f => f.id !== name.id));
      setToastMsg("Removed");
    } else {
      setFavorites(prev => [name, ...prev]);
      setToastMsg("Saved");
    }
    setIsToastVisible(true);
  };

  const getFilteredNames = () => {
    let list: GeneratedName[] = [];
    if (activeTab === 'results') list = generatedNames;
    else if (activeTab === 'history') list = history;
    else if (activeTab === 'favorites') list = favorites;

    if (!filterText) return list;
    
    const lowerFilter = filterText.toLowerCase();
    return list.filter(item => item.name.toLowerCase().includes(lowerFilter));
  };

  const filteredNames = getFilteredNames();
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
       <SchemaMarkup data={{ "@type": "SoftwareApplication", "name": "Roblox Name Generator" }} />

       {/* HERO SECTION */}
       <div className="text-center mb-20 animate-fade-in relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-slide-up">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
             </span>
             <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Updated for 2026</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            {forcedStyle ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{forcedStyle}</span>
            ) : "BloxName"}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            The next-generation <strong className="text-white">Roblox Name Generator</strong>. <br className="hidden md:block" />
            Craft rare, sweaty, and aesthetic identities in milliseconds.
          </p>

          {/* MAIN INTERFACE CARD */}
          <div className="glass-card max-w-4xl mx-auto rounded-3xl p-2 animate-slide-up relative z-20">
             <div className="bg-[#0b0c15]/90 rounded-[20px] p-6 md:p-10 border border-white/5 backdrop-blur-3xl">
                
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                   <div className="relative flex-grow group">
                      <div className="absolute inset-0 bg-brand-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      <div className="relative flex items-center h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl px-6 transition-all group-focus-within:border-brand-primary/50 group-focus-within:bg-black/40">
                         <Search className="w-6 h-6 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
                         <input 
                           type="text"
                           value={keyword}
                           onChange={(e) => setKeyword(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                           placeholder="Enter a keyword (e.g. Ghost, Star)..."
                           className="w-full bg-transparent border-none outline-none text-xl md:text-2xl text-white font-medium placeholder-gray-600 ml-4 h-full"
                         />
                      </div>
                      
                      {/* Floating suggestions */}
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 mt-3 flex gap-2 flex-wrap px-2 animate-fade-in z-50">
                           {suggestions.map(s => (
                             <button key={s} onClick={() => { setKeyword(s); handleGenerate(s); }} className="px-3 py-1 bg-black/60 border border-white/10 rounded-lg text-xs text-gray-300 hover:text-white hover:border-brand-primary/50 transition-colors backdrop-blur-md">
                               {s}
                             </button>
                           ))}
                        </div>
                      )}
                   </div>

                   <div className="flex-shrink-0 flex items-center gap-3">
                      <div className="h-16 md:h-20 flex items-center bg-white/5 border border-white/10 rounded-2xl px-2">
                         <StyleSelect 
                           value={style} 
                           onChange={(val) => {
                             if (forcedStyle) { navigate('/'); setTimeout(() => setInternalStyle(val), 50); }
                             else setInternalStyle(val);
                           }} 
                           disabled={!!forcedStyle}
                         />
                      </div>
                      
                      <Button 
                        onClick={() => handleGenerate()}
                        isLoading={isLoading}
                        className="h-16 md:h-20 px-8 rounded-2xl text-lg shadow-glow-primary bg-brand-primary hover:bg-indigo-500"
                      >
                        <Wand2 className="w-6 h-6" />
                      </Button>
                   </div>
                </div>

                {/* Advanced Options Toggle */}
                <div className="border-t border-white/5 pt-6">
                   <button 
                     onClick={() => setShowAdvanced(!showAdvanced)}
                     className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mb-6 group w-full justify-center"
                   >
                     {showAdvanced ? 'Collapse Config' : 'Advanced Configuration'}
                     <ChevronRight className={`w-3 h-3 transition-transform ${showAdvanced ? '-rotate-90' : 'rotate-90'}`} />
                   </button>

                   {showAdvanced && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-400 font-medium">Use Leet Speak</span>
                              <button onClick={() => setUseLeet(!useLeet)} className={`w-12 h-6 rounded-full transition-colors ${useLeet ? 'bg-brand-primary' : 'bg-gray-700'} relative`}>
                                 <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${useLeet ? 'translate-x-6' : ''}`}></div>
                              </button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-400 font-medium">Include Numbers</span>
                              <button onClick={() => setIncludeNumbers(!includeNumbers)} className={`w-12 h-6 rounded-full transition-colors ${includeNumbers ? 'bg-brand-primary' : 'bg-gray-700'} relative`}>
                                 <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${includeNumbers ? 'translate-x-6' : ''}`}></div>
                              </button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-400 font-medium">Allow Underscores</span>
                              <button onClick={() => setIncludeUnderscore(!includeUnderscore)} className={`w-12 h-6 rounded-full transition-colors ${includeUnderscore ? 'bg-brand-primary' : 'bg-gray-700'} relative`}>
                                 <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${includeUnderscore ? 'translate-x-6' : ''}`}></div>
                              </button>
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                           <div>
                              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Max Length</label>
                              <div className="flex gap-2">
                                 {[LengthPreference.ANY, LengthPreference.SHORT, LengthPreference.MEDIUM].map(opt => (
                                    <button 
                                      key={opt}
                                      onClick={() => setLength(opt)}
                                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${length === opt ? 'bg-white text-black' : 'bg-black/30 text-gray-500 hover:text-white'}`}
                                    >
                                      {opt.split(' ')[0]}
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="Prefix" value={prefix} onChange={e => setPrefix(e.target.value)} className="glass-input px-3 py-2 rounded-lg text-sm" />
                              <input type="text" placeholder="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} className="glass-input px-3 py-2 rounded-lg text-sm" />
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>

       {/* QUICK ACCESS GRID */}
       <div className="mb-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {PRESET_CATEGORIES.map((cat, i) => (
            <Link 
              key={i}
              to={cat.link}
              className="interactive-card p-6 rounded-2xl flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">{cat.emoji}</span>
              <span className="text-sm font-bold text-white mb-1">{cat.label}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wide group-hover:text-gray-300 transition-colors">{cat.desc}</span>
            </Link>
          ))}
       </div>

       {/* RESULTS AREA */}
       <div id="results-section" className="min-h-[600px] mb-20">
          {(generatedNames.length > 0 || history.length > 0) && (
             <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 animate-fade-in">
                <div className="flex p-1 bg-white/5 rounded-xl backdrop-blur-md border border-white/10">
                   {(['results', 'history', 'favorites'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                      >
                        {tab}
                      </button>
                   ))}
                </div>
                
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text"
                        placeholder="Filter..."
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-brand-primary/50 outline-none w-40 md:w-64"
                      />
                   </div>
                </div>
             </div>
          )}

          <NameList 
            names={filteredNames.length > 0 ? filteredNames : FEATURED_EXAMPLES} 
            onFavoriteToggle={handleFavoriteToggle}
            onRemix={handleRemix}
            onPreview={(name) => setPreviewName(name)}
            onDecorate={(name) => setDecoratorName(name)}
            isLoading={isLoading}
            title={activeTab === 'favorites' ? "Saved Names" : activeTab === 'history' ? "History Log" : "Generated Output"}
            onCopyAll={() => {
              navigator.clipboard.writeText(filteredNames.map(n => n.name).join('\n'));
              setToastMsg("All Copied");
              setIsToastVisible(true);
            }}
            allowDelete={activeTab === 'history'}
            onDeleteName={activeTab === 'history' ? (id) => setHistory(h => h.filter(i => i.id !== id)) : undefined}
          />
       </div>

       {/* SECONDARY SECTIONS */}
       <div className="grid md:grid-cols-2 gap-12 mb-24">
          <RatingWidget />
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-center">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               <Zap className="w-5 h-5 text-yellow-400" /> Pro Tips
             </h3>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-brand-primary shrink-0" /> Use <strong>Leet Speak</strong> to bypass "Name Taken" errors.</li>
               <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-brand-primary shrink-0" /> Sweaty names usually have <strong>No Numbers</strong>.</li>
               <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-brand-primary shrink-0" /> Check "Display Name" mode if you just want a cool label.</li>
             </ul>
          </div>
       </div>

       <RarityGuide />

       {/* SEO Content */}
       <div className="mt-32 max-w-4xl mx-auto prose prose-invert prose-lg text-gray-400">
          <section className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
             <div className="grid md:grid-cols-2 gap-6 text-left">
                {generateFAQs(style, keyword).map((q, i) => (
                   <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <h4 className="text-white font-bold mb-2">{q.question}</h4>
                      <p className="text-sm">{q.answer}</p>
                   </div>
                ))}
             </div>
          </section>
       </div>

       <Toast message={toastMsg} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
       {previewName && <PreviewModal name={previewName} isOpen={true} onClose={() => setPreviewName(null)} />}
       {decoratorName && <DecoratorModal name={decoratorName} isOpen={true} onClose={() => setDecoratorName(null)} />}
    </div>
  );
};