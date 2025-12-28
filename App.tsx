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
      className={`fixed bottom-6 right-6 p-4 rounded-full bg-roblox-accent hover:bg-emerald-400 shadow-glow text-black transition-all duration-300 z-40 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
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
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 mt-4 animate-fade-in-up">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-medium">
        <li className="flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
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
                <span className="text-roblox-accent">{label}</span>
              ) : (
                <Link to={to} className="hover:text-white transition-colors">
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
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] perspective-grid opacity-30 pointer-events-none z-0"></div>

      <SEOHead 
        title={meta.title}
        description={meta.description}
        url={`https://robloxnamegenerator.org${location.pathname}`}
        image={meta.image}
      />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-roblox-accent text-black px-4 py-2 rounded-lg z-50 font-bold shadow-xl transition-all">
        Skip to content
      </a>

      {/* Floating Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-roblox-dark/80 backdrop-blur-md border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 cursor-pointer">
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-roblox-accent ${location.pathname === '/' ? 'text-white' : 'text-gray-400'}`}>Generator</Link>
            <Link to="/analyzer" className={`text-sm font-medium transition-colors hover:text-roblox-accent ${location.pathname === '/analyzer' ? 'text-white' : 'text-gray-400'}`}>Rater</Link>
            <Link to="/blog" className={`text-sm font-medium transition-colors hover:text-roblox-accent ${location.pathname.startsWith('/blog') ? 'text-white' : 'text-gray-400'}`}>Blog</Link>
            
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors hidden sm:block"
              title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24">
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

      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The premier destination for Roblox identity creation. Precision engineered algorithms for the modern metaverse.
            </p>
            <p className="text-gray-700 text-xs font-mono">
              © {CURRENT_YEAR} BloxName.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Generators</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/sweaty-roblox-names" className="hover:text-roblox-accent transition-colors">Sweaty Names</Link></li>
              <li><Link to="/aesthetic-roblox-usernames" className="hover:text-roblox-accent transition-colors">Aesthetic Usernames</Link></li>
              <li><Link to="/rare-og-roblox-names" className="hover:text-roblox-accent transition-colors">Rare/OG Names</Link></li>
              <li><Link to="/cute-roblox-names" className="hover:text-roblox-accent transition-colors">Cute Names</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Trending</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: 'Da Hood Names', key: 'Da Hood' },
                { label: 'BedWars Names', key: 'BedWars' },
                { label: 'Blox Fruits Names', key: 'Blox Fruits' },
                { label: 'Pet Sim 99 Names', key: 'Pet Sim' }
              ].map(game => (
                <li key={game.key}>
                  <Link 
                    to={`/sweaty-roblox-names?keyword=${encodeURIComponent(game.key)}`}
                    className="hover:text-roblox-accent transition-colors"
                  >
                    {game.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-roblox-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-roblox-accent transition-colors">Support</Link></li>
              <li><Link to="/privacy" className="hover:text-roblox-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-roblox-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default App;