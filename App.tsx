import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, ArrowUp, Home as HomeIcon, ChevronRight } from 'lucide-react';
import { NameStyle } from './types';
import { Logo } from './components/Logo';
import { SEOHead, SchemaMarkup } from './components/SEO';
import { Home } from './pages/Home';
import { Blog } from './components/Blog';
import { NameAnalyzer } from './components/NameAnalyzer';
import { LegalPage } from './components/LegalPages';
import { Sitemap } from './components/Sitemap';
import { BLOG_POSTS } from './data/blogPosts';

const CURRENT_YEAR = new Date().getFullYear();

// --- Layout Components ---

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-roblox-accent text-black shadow-neon hover:shadow-neon-hover transition-all duration-500 z-50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (location.pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 mb-8 mt-4 animate-slide-up">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-500">
        <li className="flex items-center gap-2">
          <Link to="/" className="hover:text-roblox-accent transition-colors flex items-center gap-1">
            <HomeIcon className="w-3 h-3" /> Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          let label = value.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
          if (label.includes('Roblox')) label = label.replace('Roblox Usernames', 'Names').replace('Roblox Names', 'Names');

          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-gray-700" />
              {isLast ? (
                <span className="text-white">{label}</span>
              ) : (
                <Link to={to} className="hover:text-roblox-accent transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Dynamic SEO Logic based on Route
  const getPageMeta = () => {
    const path = location.pathname;
    
    if (path.startsWith('/blog/')) {
       const slug = path.split('/')[2];
       const post = BLOG_POSTS.find(p => p.slug === slug);
       if (post) return { title: post.title, description: post.excerpt, image: post.imageUrl };
    }
    if (path === '/blog') return { title: 'Roblox Username Guides & Blog - BloxName', description: 'Read our latest guides on Roblox naming trends, display name hacks, and aesthetic ideas.' };
    if (path === '/analyzer') return { title: 'Roblox Name Rater & Analyzer - Is Your Name Rare?', description: 'Check if your Roblox username is rare, sweaty, or OG. Get a rarity score instantly.' };
    
    // SEO Landing Pages
    if (path === '/sweaty-roblox-names') return { title: `Sweaty Roblox Name Generator (2026) - Cool PvP Usernames`, description: `Generate sweaty, tryhard, and cool Roblox usernames instantly. Perfect for Da Hood and BedWars players.` };
    if (path === '/aesthetic-roblox-usernames') return { title: `Aesthetic Roblox Username Generator (2026) - Soft & Y2K`, description: `Create soft, dreamy, and aesthetic Roblox usernames. The best aesthetic name generator for cottagecore and y2k styles.` };
    if (path === '/rare-og-roblox-names') return { title: `Rare OG Roblox Name Generator - Short 4 Letter Usernames`, description: `Generate rare, short, and OG style Roblox names. Find available 4 letter and 5 letter username ideas.` };
    if (path === '/cute-roblox-names') return { title: `Cute Roblox Username Generator - Kawaii Name Ideas`, description: `Generate cute, kawaii, and adorable Roblox usernames. Perfect for Royale High and Adopt Me.` };
    if (path === '/funny-roblox-names') return { title: `Funny Roblox Name Generator - Troll Username Ideas`, description: `Generate hilarious, funny, and troll Roblox usernames for your alt account.` };
    
    return { title: `Roblox Name Generator & Username Creator ${CURRENT_YEAR} - BloxName`, description: 'The #1 Roblox Name Generator. Generate unique, aesthetic, sweaty, and OG names instantly. Check availability for 2026.' };
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative bg-roblox-dark selection:bg-roblox-accent selection:text-black">
      {/* Background FX */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0"></div>
      
      <SEOHead 
        title={meta.title}
        description={meta.description}
        url={`https://robloxnamegenerator.org${location.pathname}`}
        image={meta.image}
      />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-roblox-accent text-black px-4 py-2 rounded-lg z-50 font-bold shadow-neon">
        Skip to content
      </a>

      {/* Floating Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 cursor-pointer group">
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-1 sm:gap-6 bg-black/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/5">
            <Link to="/" className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${location.pathname === '/' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white'}`}>Create</Link>
            <Link to="/analyzer" className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${location.pathname === '/analyzer' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white'}`}>Rate</Link>
            <Link to="/blog" className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${location.pathname.startsWith('/blog') ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white'}`}>Guide</Link>
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors hidden sm:block"
            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <div className="pt-32">
        <Breadcrumbs />

        <main id="main-content" className="pb-20 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/sweaty-roblox-names" element={<Home forcedStyle={NameStyle.COOL} />} />
            <Route path="/aesthetic-roblox-usernames" element={<Home forcedStyle={NameStyle.AESTHETIC} />} />
            <Route path="/rare-og-roblox-names" element={<Home forcedStyle={NameStyle.OG} />} />
            <Route path="/cute-roblox-names" element={<Home forcedStyle={NameStyle.CUTE} />} />
            <Route path="/funny-roblox-names" element={<Home forcedStyle={NameStyle.FUNNY} />} />
            
            <Route path="/analyzer" element={<NameAnalyzer />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/about" element={<LegalPage type="about" />} />
            <Route path="/contact" element={<LegalPage type="contact" />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </main>
      </div>

      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Precision engineered algorithms for the modern metaverse. Create your legacy.
            </p>
            <p className="text-gray-700 text-xs font-mono">
              © {CURRENT_YEAR} BloxName.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-[0.2em] text-roblox-accent">Tools</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link to="/sweaty-roblox-names" className="hover:text-white transition-colors">Sweaty Generator</Link></li>
              <li><Link to="/aesthetic-roblox-usernames" className="hover:text-white transition-colors">Aesthetic Generator</Link></li>
              <li><Link to="/rare-og-roblox-names" className="hover:text-white transition-colors">OG Name Generator</Link></li>
              <li><Link to="/analyzer" className="hover:text-white transition-colors">Name Rater</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-[0.2em] text-roblox-accent">Trending</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              {[
                { label: 'Da Hood', key: 'Da Hood' },
                { label: 'BedWars', key: 'BedWars' },
                { label: 'Blox Fruits', key: 'Blox Fruits' },
                { label: 'Pet Sim 99', key: 'Pet Sim' }
              ].map(game => (
                <li key={game.key}>
                  <Link 
                    to={`/sweaty-roblox-names?keyword=${encodeURIComponent(game.key)}`}
                    className="hover:text-white transition-colors"
                  >
                    {game.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-[0.2em] text-roblox-accent">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default App;