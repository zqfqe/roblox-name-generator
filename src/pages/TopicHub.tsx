import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home } from './Home';
import { NameStyle } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';
import { ArrowRight, Tag } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

// Map URL slugs to internal NameStyles and Keywords
const TOPIC_CONFIG: Record<string, { style: NameStyle; keyword: string; title: string }> = {
  'sweaty': { style: NameStyle.COOL, keyword: 'Sweaty', title: 'Sweaty PvP Names' },
  'pvp': { style: NameStyle.COOL, keyword: 'PvP', title: 'PvP & Combat Names' },
  'aesthetic': { style: NameStyle.AESTHETIC, keyword: 'Soft', title: 'Aesthetic Usernames' },
  'cute': { style: NameStyle.CUTE, keyword: 'Cute', title: 'Cute & Kawaii Names' },
  'rare': { style: NameStyle.OG, keyword: 'Rare', title: 'Rare OG Names' },
  'display-names': { style: NameStyle.AESTHETIC, keyword: 'Vibe', title: 'Display Name Ideas' },
  'funny': { style: NameStyle.FUNNY, keyword: 'Meme', title: 'Funny & Troll Names' },
  'safety': { style: NameStyle.COOL, keyword: 'Secure', title: 'Safe & Secure Usernames' },
};

export const TopicHub: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  
  // Default fallback
  const config = (tag && TOPIC_CONFIG[tag.toLowerCase()]) 
    ? TOPIC_CONFIG[tag.toLowerCase()] 
    : { style: NameStyle.COOL, keyword: 'Cool', title: 'Cool Roblox Names' };

  // Find relevant blog posts (Case insensitive partial match on tags)
  const relatedPosts = BLOG_POSTS.filter(post => 
    post.tags.some(t => t.toLowerCase().includes(tag?.toLowerCase() || '')) ||
    post.title.toLowerCase().includes(tag?.toLowerCase() || '')
  );

  return (
    <div className="animate-fade-in">
       {/* Breadcrumbs for structure */}
       <div className="max-w-7xl mx-auto px-4 pt-4">
         <Breadcrumbs items={[
           { label: 'Topics', path: '/blog' }, // Loosely linking to blog as the hub parent
           { label: config.title }
         ]} />
       </div>

      {/* Render the Main Generator with Forced Config */}
      <Home 
        forcedStyle={config.style} 
        initialKeyword={config.keyword} 
        topicTitle={config.title} // Pass custom title to override Home defaults
      />

      {/* The "Hub" Content Section - SEO Cluster */}
      {relatedPosts.length > 0 && (
        <div className="bg-black/20 border-t border-white/5 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-roblox-accent/20 rounded-xl">
                 <Tag className="w-6 h-6 text-roblox-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Guides for {config.title}</h2>
                <p className="text-gray-400">Read more about this naming style.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(post => {
                 const thumbUrl = post.imageUrl ? `${post.imageUrl.replace('w=1200', 'w=500')}&fm=webp` : '';
                 return (
                  <Link 
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-roblox-accent/50 transition-all hover:-translate-y-1"
                  >
                    {post.imageUrl && (
                      <div className="h-40 overflow-hidden relative">
                         <img 
                           src={thumbUrl} 
                           alt={post.imageAlt} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-roblox-accent transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-roblox-accent font-medium mt-4">
                        Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                 );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};