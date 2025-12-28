import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
      className={`fixed bottom-6 right-6 p-4 rounded-full bg-roblox-accent shadow-lg text-white transition-all duration-300 z-40 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const searchParams = new URLSearchParams(location.search);
  const style = searchParams.get('style');

  if (location.pathname === '/' && !style) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 mb-6 mt-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <li className="flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <HomeIcon className="w-3 h-3" /> Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = value.charAt(0).toUpperCase() + value.slice(1);
          
          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {isLast ? (
                <span className="text-roblox-accent font-medium">{label}</span>
              ) : (
                <Link to={to} className="hover:text-white transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
        {/* Special Case for Home Filters */}
        {location.pathname === '/' && style && (
          <li className="flex items-center gap-2">
             <ChevronRight className="w-4 h-4 text-gray-600" />
             <span className="text-roblox-accent font-medium">{style} Names</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const style = searchParams.get('style');

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
    if (path === '/about') return { title: 'About Us - BloxName Generator', description: 'Learn about BloxName and our mission to provide the best Roblox usernames.' };
    
    // Home Logic
    if (keyword) return { title: `${keyword} Roblox Names - Free Generator ${CURRENT_YEAR}`, description: `Generate unique ${keyword} usernames for Roblox. Check availability for ${keyword} names instantly.` };
    if (style && style !== NameStyle.COOL) return { title: `${style} Roblox Name Generator ${CURRENT_YEAR}`, description: `Create ${style} Roblox names instantly.` };
    
    return { title: `Roblox Name Generator & Username Creator ${CURRENT_YEAR} - BloxName`, description: 'Generate unique, aesthetic, sweaty, and OG names instantly with our advanced Roblox Name Generator.' };
  };

  const meta = getPageMeta();

  // Schema Generation
  const getSchema = () => {
     const base = { "@context": "https://schema.org", "@graph": [] };
     // Simplified schema injection for standard routes
     return base; 
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-[#00b06f] selection:text-white overflow-x-hidden">
      <SEOHead 
        title={meta.title}
        description={meta.description}
        url={`https://robloxnamegenerator.org${location.pathname}`}
        image={meta.image}
      />
      <SchemaMarkup data={getSchema()} />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-roblox-accent text-white px-4 py-2 rounded-lg z-50 font-bold shadow-xl transition-all">
        Skip to content
      </a>

      <nav className="border-b border-gray-800 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 cursor-pointer">
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-1 sm:gap-6">
            <Link to="/" className={`px-3 py-2 text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Generator</Link>
            <Link to="/analyzer" className={`px-3 py-2 text-sm font-medium transition-colors ${location.pathname === '/analyzer' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Rate Name</Link>
            <Link to="/blog" className={`px-3 py-2 text-sm font-medium transition-colors ${location.pathname.startsWith('/blog') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Blog</Link>
            
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

      <Breadcrumbs />

      <main id="main-content" className="pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
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

      <footer className="border-t border-gray-800 bg-[#0a0c0f] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
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
              <li><Link to="/?style=Cool" className="hover:text-roblox-accent transition-colors block">Sweaty Name Generator</Link></li>
              <li><Link to="/analyzer" className="hover:text-roblox-accent transition-colors block">Rate My Username</Link></li>
              <li><Link to="/?style=Aesthetic" className="hover:text-roblox-accent transition-colors block">Aesthetic Name Generator</Link></li>
              <li><Link to="/?style=Cute" className="hover:text-roblox-accent transition-colors block">Cute Username Ideas</Link></li>
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
                  <Link 
                    to={`/?style=Cool&keyword=${encodeURIComponent(game.key)}`}
                    className="hover:text-roblox-accent transition-colors block"
                  >
                    {game.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-roblox-accent transition-colors block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-roblox-accent transition-colors block">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-roblox-accent transition-colors block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-roblox-accent transition-colors block">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="hover:text-roblox-accent transition-colors block">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default App;