import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');

// Load the server entry module (which now exports BLOG_POSTS)
const { render, BLOG_POSTS } = await import('./dist/server/entry-server.js');

// Import Static Lists via dynamic import or define them here to match
// Note: In a real environment, we'd import { STATIC_LISTS } from data/staticLists, 
// but since this is JS running in Node, we might need to duplicate the config if not transpiled.
// For simplicity in this artifact, we will assume we can access them via an imported module or define them.
// Let's define the slugs to ensure build passes.
const STATIC_LIST_SLUGS = [
  'best-sweaty-roblox-names-2026',
  'cute-aesthetic-usernames-girls',
  'funny-troll-roblox-names-alt'
];

// Helper to generate fake "Trending" names for Social Proof (SEO Strategy #5)
// In a real app, this would query a DB. Here we simulate "fresh" content per build.
const generateTrendingNames = () => {
  const prefixes = ['Velvet', 'Neon', 'Dark', 'Pure', 'Cyber', 'Void', 'Soft', 'Retro', 'Toxic', 'Soul', 'Grim'];
  const suffixes = ['Viper', 'Soul', 'Echo', 'Vibes', 'Mist', 'Walker', 'Cloud', 'Haze', 'Legend', 'Ghost', 'Reaper'];
  const results = [];
  for (let i = 0; i < 8; i++) {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const s = suffixes[Math.floor(Math.random() * suffixes.length)];
    results.push(`${p}${s}`);
  }
  return JSON.stringify(results);
};

const TRENDING_DATA_JSON = generateTrendingNames();

// 1. Define Static Routes
const staticRoutes = [
  '/',
  '/sweaty-roblox-names',
  '/aesthetic-roblox-usernames',
  '/rare-og-roblox-names',
  '/cute-roblox-names',
  '/funny-roblox-names',
  '/analyzer',
  '/symbols',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/sitemap',
  '/404', 
];

// 2. Build Dynamic Routes (Blogs & Topic Clusters & Letters & Lists)
const blogRoutes = BLOG_POSTS.map(post => `/blog/${post.slug}`);
const listRoutes = STATIC_LIST_SLUGS.map(slug => `/lists/${slug}`);

// Extract unique tags for Topic Clusters (SEO Strategy #2)
const tags = new Set();
BLOG_POSTS.forEach(post => {
  post.tags.forEach(tag => tags.add(tag.toLowerCase()));
});
// Add specific hardcoded topics that correspond to our TopicHub config
['sweaty', 'pvp', 'aesthetic', 'cute', 'rare', 'display-names', 'funny', 'safety'].forEach(t => tags.add(t));

const topicRoutes = Array.from(tags).map(tag => `/topic/${tag}`);

// SEO STRATEGY #1: A-Z Index Pages
const letterRoutes = "abcdefghijklmnopqrstuvwxyz".split('').map(char => `/letter/${char}`);

const allRoutes = [...staticRoutes, ...blogRoutes, ...topicRoutes, ...letterRoutes, ...listRoutes];

// 3. Define Static Metadata
const STATIC_META = {
  '/': {
    title: 'Roblox Name Generator & Username Creator 2026 - BloxName',
    desc: 'The #1 Roblox Name Generator. Generate unique, aesthetic, sweaty, and OG names instantly. Check availability for 2026.'
  },
  '/sweaty-roblox-names': {
    title: 'Sweaty Roblox Name Generator (2026) - Cool PvP Usernames',
    desc: 'Generate sweaty, tryhard, and cool Roblox usernames instantly. Perfect for Da Hood and BedWars players.'
  },
  '/aesthetic-roblox-usernames': {
    title: 'Aesthetic Roblox Username Generator (2026) - Soft & Y2K',
    desc: 'Create soft, dreamy, and aesthetic Roblox usernames. The best aesthetic name generator for cottagecore and y2k styles.'
  },
  '/rare-og-roblox-names': {
    title: 'Rare OG Roblox Name Generator - Short 4 Letter Usernames',
    desc: 'Generate rare, short, and OG style Roblox names. Find available 4 letter and 5 letter username ideas.'
  },
  '/cute-roblox-names': {
    title: 'Cute Roblox Username Generator - Kawaii Name Ideas',
    desc: 'Generate cute, kawaii, and adorable Roblox usernames. Perfect for Royale High and Adopt Me.'
  },
  '/funny-roblox-names': {
    title: 'Funny Roblox Name Generator - Troll Username Ideas',
    desc: 'Generate hilarious, funny, and troll Roblox usernames for your alt account.'
  },
  '/analyzer': {
    title: 'Roblox Name Rater & Analyzer - Is Your Name Rare?',
    desc: 'Check if your Roblox username is rare, sweaty, or OG. Get a rarity score instantly.'
  },
  '/symbols': {
    title: 'Roblox Symbols Copy Paste (2026) - Aesthetic Stars & Kaomoji',
    desc: 'Copy and paste aesthetic stars, hearts, and text faces for your Roblox Display Name and Bio. The ultimate collection of Roblox symbols.'
  },
  '/blog': {
    title: 'Roblox Username Guides & Blog - BloxName',
    desc: 'Read our latest guides on Roblox naming trends, display name hacks, and aesthetic ideas.'
  },
  '/404': {
    title: 'Page Not Found - BloxName',
    desc: 'The requested page could not be found.'
  }
};

(async () => {
  console.log(`Starting prerender for ${allRoutes.length} routes...`);

  // --- HTML GENERATION ---
  for (const url of allRoutes) {
    const appHtml = render(url);

    let html = template.replace(`<!--app-html-->`, appHtml);
    
    // INJECT DYNAMIC TRENDING DATA (SEO Strategy #5)
    // This allows the client to hydrate with the same random names generated during build
    html = html.replace(
      `<script id="initial-data"></script>`, 
      `<script>window.__TRENDING_DATA__ = ${TRENDING_DATA_JSON};</script>`
    );

    // Determine Metadata
    let title = 'Roblox Name Generator & Username Creator 2026 - BloxName';
    let desc = 'The #1 Roblox Name Generator. Generate unique, aesthetic, sweaty, and OG names instantly.';

    // Check Static Map
    if (STATIC_META[url]) {
      title = STATIC_META[url].title;
      desc = STATIC_META[url].desc;
    } 
    // Check Dynamic Blog Map
    else if (url.startsWith('/blog/')) {
        const slug = url.split('/blog/')[1];
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
            title = post.title;
            // Strip HTML tags from excerpt if any, just in case
            desc = post.excerpt.replace(/<[^>]*>?/gm, ''); 
        }
    }
    // Check Topic Map
    else if (url.startsWith('/topic/')) {
       const tag = url.split('/topic/')[1];
       const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
       title = `${formattedTag} Roblox Names - Generator & Guide`;
       desc = `Generate unique ${formattedTag} Roblox usernames and read our latest guides on ${formattedTag} aesthetics.`;
    }
    // Check Letter Map
    else if (url.startsWith('/letter/')) {
       const char = url.split('/letter/')[1].toUpperCase();
       title = `Roblox Names Starting With "${char}" - Generator`;
       desc = `Generate unique, aesthetic, and cool Roblox usernames that start with the letter ${char}.`;
    }
    // Check List Map (Simple fallback logic for lists if not imported)
    else if (url.startsWith('/lists/')) {
       title = 'Best Roblox Names List (2026) - Curated Collection';
       desc = 'A curated list of the best Roblox usernames. Copy and paste sweaty, aesthetic, and rare names instantly.';
    }

    // Inject Meta Tags (RegEx replacement handles existing placeholder tags in index.html)
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${title}"`);

    html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${desc}"`);
    html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${desc}"`);
    html = html.replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${desc}"`);
    
    html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="https://robloxnamegenerator.org${url === '/' ? '' : url}"`);

    // SPECIAL HANDLING FOR 404
    // Cloudflare Pages / Netlify expects a '404.html' file at the root to handle unknown routes.
    let filePath;
    if (url === '/404') {
        filePath = 'dist/static/404.html';
    } else if (url === '/') {
        filePath = 'dist/static/index.html';
    } else {
        filePath = `dist/static${url}/index.html`;
    }

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(toAbsolute(filePath), html);
    console.log(`Prerendered: ${url} -> ${filePath}`);
  }

  // --- AUTOMATIC SITEMAP GENERATION ---
  console.log('Generating sitemap.xml...');
  
  const baseUrl = 'https://robloxnamegenerator.org';
  const today = new Date().toISOString().split('T')[0];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.filter(r => r !== '/404').map(route => {
  let priority = '0.8';
  let changefreq = 'weekly';
  let lastmod = today;

  // Custom priority logic
  if (route === '/') { priority = '1.0'; changefreq = 'daily'; }
  else if (route === '/analyzer') { priority = '0.9'; }
  else if (route === '/symbols') { priority = '0.9'; }
  else if (route === '/blog') { priority = '0.9'; }
  else if (route.startsWith('/lists/')) { priority = '0.85'; } // High priority for listicles
  else if (route.startsWith('/letter/')) { priority = '0.6'; changefreq = 'monthly'; } // Lower priority for A-Z
  else if (route.startsWith('/blog/')) {
     priority = '0.7';
     changefreq = 'monthly';
     // Try to find post date
     const slug = route.split('/blog/')[1];
     const post = BLOG_POSTS.find(p => p.slug === slug);
     if (post) {
        // Convert "January 12, 2026" to "2026-01-12"
        const d = new Date(post.date);
        if (!isNaN(d.getTime())) {
            lastmod = d.toISOString().split('T')[0];
        }
     }
  }

  return `  <url>
    <loc>${baseUrl}${route === '/' ? '' : route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
  <!-- High Value Query Params (Hardcoded as they are dynamic client-side) -->
  <url>
    <loc>https://robloxnamegenerator.org/?style=Cool&amp;keyword=Sweaty</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://robloxnamegenerator.org/?style=Aesthetic&amp;keyword=Aesthetic</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://robloxnamegenerator.org/?style=Short/OG&amp;keyword=Og</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemapContent);
  console.log('Sitemap generated at dist/static/sitemap.xml');

  console.log('Build complete.');
})();
