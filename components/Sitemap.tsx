import React from 'react';
import { Map as MapIcon, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';

export const Sitemap: React.FC = () => (
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
            { path: '/', label: 'Home / Generator' },
            { path: '/analyzer', label: 'Username Rater' },
            { path: '/blog', label: 'Blog & Guides' },
            { path: '/about', label: 'About Us' },
            { path: '/contact', label: 'Contact Support' },
            { path: '/privacy', label: 'Privacy Policy' },
            { path: '/terms', label: 'Terms of Service' }
          ].map(page => (
            <li key={page.path}>
              <Link 
                to={page.path}
                className="flex items-center gap-3 text-gray-300 hover:text-roblox-accent transition-colors group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-roblox-accent transition-colors"></div>
                {page.label}
              </Link>
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
              <Link 
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <span className="text-gray-300 group-hover:text-white font-medium transition-colors block mb-0.5">
                  {post.title}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-roblox-accent transition-colors">
                  {post.tags[0]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);