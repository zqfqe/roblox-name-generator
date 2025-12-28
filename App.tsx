import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, ArrowUp, Loader2 } from 'lucide-react';
import { NameStyle } from './types';
import { Logo } from './components/Logo';
import { SEOHead } from './components/SEO';
import { Home } from './pages/Home'; // Critical Path: Keep static import for LCP
import { BLOG_POSTS } from './data/blogPosts';

// Lazy Load secondary pages to reduce initial bundle size and "Unused CSS"
const Blog = lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const NameAnalyzer = lazy(() => import('./components/NameAnalyzer').then(module => ({ default: module.NameAnalyzer })));
const LegalPage = lazy(() => import('./components/LegalPages').then(module => ({ default: module.LegalPage })));
const Sitemap = lazy(() => import('./components/Sitemap').then(module => ({ default: module.Sitemap })));

const CURRENT_YEAR = new Date().getFullYear();

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
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 z-50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
    <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
    <p className="text-gray-500 text-sm font-medium">Loading...</p>
  </div>
);

const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getPageMeta = () => {
    const path = location.pathname;
    
    if (path.startsWith('/blog/')) {
       const slug = path.split('/')[2];
       const post = BLOG_POSTS.find(p => p.slug === slug);
       if (post) return { title: post.title, description: post.excerpt, image: post.imageUrl };
    }
    if (path === '/blog') return { title: 'Roblox Username Guides & Blog - BloxName', description: 'Read our latest guides on Roblox naming trends, display name hacks, and aesthetic ideas.' };
    if (path === '/analyzer') return { title: 'Roblox Name Rater & Analyzer - Is Your Name Rare?', description: 'Check if your Roblox username is rare, sweaty, or OG. Get a rarity score instantly.' };
    
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
      {/* Dynamic Background */}
      <div className="mesh-bg">
        <div className="mesh-orb orb-1"></div>
        <div className="mesh-orb orb-2"></div>
        <div className="mesh-orb orb-3"></div>
      </div>
      
      <SEOHead 
        title={meta.title}
        description={meta.description}
        url={`https://robloxnamegenerator.org${location.pathname}`}
        image={meta.image}
      />

      {/* Floating Modern Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className={`
          flex items-center gap-2 sm:gap-8 px-6 py-3 rounded-full 
          backdrop-blur-xl border border-white/10 transition-all duration-500
          ${scrolled ? 'bg-black/60 shadow-glass' : 'bg-white/5'}
        `}>
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 mr-2" aria-label="Home">
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { to: '/', label: 'Generator' },
              { to: '/analyzer', label: 'Rater' },
              { to: '/blog', label: 'Blog' },
            ].map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  location.pathname === link.to 
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
            aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <div className="pt-32">
        <main id="main-content" className="relative z-10 pb-24">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </main>
      </div>

      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              &copy; {CURRENT_YEAR} BloxName.<br/>
              Next-gen identity tools for the Metaverse.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/sweaty-roblox-names" className="hover:text-white transition-colors">Sweaty Gen</Link></li>
              <li><Link to="/aesthetic-roblox-usernames" className="hover:text-white transition-colors">Aesthetic Gen</Link></li>
              <li><Link to="/rare-og-roblox-names" className="hover:text-white transition-colors">OG Names</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider">Support</h4>
             <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
             </ul>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default App;