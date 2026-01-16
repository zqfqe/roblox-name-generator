import React, { useMemo } from 'react';
import { ArrowLeft, Calendar, User, Clock, BookOpen, ChevronRight, Share2, Twitter, List, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Breadcrumbs } from './Breadcrumbs';
import { SchemaMarkup } from './SEO';

export const Blog: React.FC = () => {
  const { slug } = useParams();
  const activePost = slug ? BLOG_POSTS.find(p => p.slug === slug) : null;

  // Process content to inject IDs for Table of Contents AND detect Steps for Schema
  const { processedContent, toc, howToSteps } = useMemo(() => {
    if (!activePost) return { processedContent: '', toc: [], howToSteps: [] };

    const tocList: { id: string; text: string }[] = [];
    const steps: { name: string; text: string; url: string }[] = [];

    // Inject IDs into headers
    const contentWithIds = activePost.content.replace(/<h2>(.*?)<\/h2>/g, (match, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      tocList.push({ id, text });
      return `<h2 id="${id}">${text}</h2>`;
    });

    // Detect Steps for HowTo Schema (Looks for <h3>Step X: Title</h3>)
    // Simple regex to extract steps from HTML content
    const stepRegex = /<h3>(Step \d+:.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
    let match;
    while ((match = stepRegex.exec(activePost.content)) !== null) {
        steps.push({
            name: match[1].replace(/<[^>]*>?/gm, ''), // Clean tags
            text: match[2].replace(/<[^>]*>?/gm, ''), // Clean tags
            url: `https://robloxnamegenerator.org/blog/${activePost.slug}#${match[1].toLowerCase().substring(0, 6).replace(' ', '-')}`
        });
    }

    return { processedContent: contentWithIds, toc: tocList, howToSteps: steps };
  }, [activePost]);

  if (activePost) {
    const dateObj = new Date(activePost.date);
    const dateTimeStr = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : '';
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this guide: ${activePost.title}`);

    const baseImg = activePost.imageUrl ? `${activePost.imageUrl}&fm=webp` : '';
    const imgSrcSet = activePost.imageUrl ? `
      ${activePost.imageUrl.replace('w=1200', 'w=400')}&fm=webp 400w,
      ${activePost.imageUrl.replace('w=1200', 'w=800')}&fm=webp 800w,
      ${activePost.imageUrl.replace('w=1200', 'w=1200')}&fm=webp 1200w
    ` : '';

    // Standard Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://robloxnamegenerator.org/blog/${activePost.slug}`
      },
      "headline": activePost.title,
      "description": activePost.excerpt,
      "image": activePost.imageUrl ? [activePost.imageUrl] : [],
      "author": {
        "@type": "Person",
        "name": activePost.author.name,
        "url": "https://robloxnamegenerator.org"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BloxName",
        "logo": {
          "@type": "ImageObject",
          "url": "https://robloxnamegenerator.org/icon.svg"
        }
      },
      "datePublished": dateTimeStr,
      "dateModified": dateTimeStr 
    };

    // Advanced HowTo Schema (Rich Snippets)
    const howToSchema = howToSteps.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": activePost.title,
        "description": activePost.excerpt,
        "image": activePost.imageUrl ? {
            "@type": "ImageObject",
            "url": activePost.imageUrl
        } : undefined,
        "step": howToSteps.map(step => ({
            "@type": "HowToStep",
            "name": step.name,
            "text": step.text,
            "url": step.url
        }))
    } : null;

    return (
      <div className="min-h-screen pb-20 animate-fade-in-up">
        <SchemaMarkup data={articleSchema} />
        {howToSchema && <SchemaMarkup data={howToSchema} />}
        
        <div className="max-w-4xl mx-auto px-4 py-8">
           <Breadcrumbs items={[
             { label: 'Blog', path: '/blog' },
             { label: activePost.title }
           ]} />
        </div>

        <article className="max-w-4xl mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {activePost.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-roblox-accent/10 text-roblox-accent border border-roblox-accent/20">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-8 leading-tight tracking-tight">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <img src={activePost.author.avatar} alt={activePost.author.name} className="w-6 h-6 rounded-full border border-gray-600" />
                {activePost.author.name}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={dateTimeStr}>{activePost.date}</time>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {activePost.readTime}
              </div>
            </div>
          </header>

          {activePost.imageUrl && (
            <div className="relative w-full aspect-[21/9] md:aspect-[2/1] mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 group">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
              <img 
                src={baseImg}
                srcSet={imgSrcSet}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                alt={activePost.imageAlt || activePost.title}
                width="1200"
                height="600"
                loading="eager" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10 max-w-5xl mx-auto">
            <div className="lg:min-w-0">
               {toc.length > 0 && (
                <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6 mb-10 lg:hidden">
                  <div className="flex items-center gap-2 font-bold text-white mb-4 uppercase tracking-wider text-sm">
                    <List className="w-4 h-4 text-roblox-accent" /> Table of Contents
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {toc.map(item => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="hover:text-roblox-accent transition-colors block border-l-2 border-transparent hover:border-roblox-accent pl-3">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div 
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: processedContent }} 
              />

              {/* AUTHOR BIO - E-E-A-T */}
              <div className="mt-16 mb-8 p-8 bg-gray-900/50 border border-gray-700/50 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                 <div className="shrink-0">
                    <img src={activePost.author.avatar} alt={activePost.author.name} className="w-20 h-20 rounded-full border-2 border-roblox-accent shadow-lg" />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-lg mb-1 flex items-center justify-center sm:justify-start gap-2">
                      {activePost.author.name}
                      <span className="px-2 py-0.5 rounded text-[10px] bg-roblox-accent/20 text-roblox-accent uppercase tracking-wide">{activePost.author.role}</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{activePost.author.bio}</p>
                 </div>
              </div>

              {/* Post Footer / Share */}
              <div className="pt-10 border-t border-gray-800">
                <div className="bg-gray-800/30 rounded-2xl p-8 text-center border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">Did you find this guide helpful?</h3>
                  <p className="text-gray-400 mb-6">Share it with your Roblox squad or generate a new name now!</p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button 
                       onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                       }}
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all font-medium"
                    >
                      <Share2 className="w-5 h-5" />
                      Copy Link
                    </button>
                    <a 
                       href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 border border-gray-700 text-white rounded-xl transition-all font-medium"
                    >
                      <Twitter className="w-5 h-5" />
                      Tweet
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden lg:block relative">
              <div className="sticky top-24 space-y-6">
                {activePost.relatedPreset && (
                  <div className="bg-roblox-accent/10 backdrop-blur-sm border border-roblox-accent/30 rounded-2xl p-6 shadow-xl animate-fade-in-up">
                    <div className="flex items-center gap-2 font-bold text-white mb-3 uppercase tracking-wider text-xs">
                      <Zap className="w-4 h-4 text-roblox-accent" /> Try It Now
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Inspired by this guide? Generate <strong>{activePost.relatedPreset.keyword}</strong> names instantly!
                    </p>
                    <Link 
                      to={`/?style=${activePost.relatedPreset.style}&keyword=${activePost.relatedPreset.keyword}`}
                      className="block w-full py-3 text-center bg-roblox-accent hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg hover:scale-105"
                    >
                      {activePost.relatedPreset.ctaText}
                    </Link>
                  </div>
                )}

                {toc.length > 0 && (
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 font-bold text-white mb-4 uppercase tracking-wider text-xs">
                      <List className="w-4 h-4 text-roblox-accent" /> In this article
                    </div>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {toc.map(item => (
                        <li key={item.id}>
                          <a 
                            href={`#${item.id}`} 
                            className="hover:text-white transition-colors block leading-relaxed hover:translate-x-1 duration-200"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </article>

        <div className="max-w-6xl mx-auto px-4 mt-24">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px flex-1 bg-gray-800"></div>
             <h3 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">More to Read</h3>
             <div className="h-px flex-1 bg-gray-800"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {BLOG_POSTS.filter(p => p.slug !== activePost.slug).slice(0, 3).map(post => {
                const thumbUrl = post.imageUrl ? `${post.imageUrl.replace('w=1200', 'w=400')}&fm=webp` : '';
                return (
                  <Link 
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    onClick={() => window.scrollTo(0,0)}
                    className="group block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-roblox-accent/30 transition-all hover:transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    {post.imageUrl && (
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={thumbUrl} 
                          alt={post.imageAlt || post.title} 
                          loading="lazy" 
                          width="400" 
                          height="200" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                         {post.tags.slice(0,1).map(t => (
                           <span key={t} className="text-[10px] font-bold uppercase text-roblox-accent">{t}</span>
                         ))}
                      </div>
                      <h4 className="font-bold text-white text-lg mb-2 group-hover:text-roblox-accent transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                );
             })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="text-center mb-20 space-y-6">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gray-800/50 border border-gray-700 mb-2 shadow-lg">
          <BookOpen className="w-10 h-10 text-roblox-accent" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-roblox-accent to-emerald-400">BloxName</span> Blog
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
          Master the art of naming. Discover trends, naming strategies, and aesthetic guides for your Roblox journey.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => {
          const dateObj = new Date(post.date);
          const dateTimeStr = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : '';
          const thumbUrl = post.imageUrl ? `${post.imageUrl.replace('w=1200', 'w=500')}&fm=webp` : '';

          return (
            <Link 
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden hover:border-roblox-accent/50 hover:bg-gray-800/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {post.imageUrl && (
                <div className="w-full h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={thumbUrl} 
                    alt={post.imageAlt || post.title}
                    loading="lazy"
                    width="500"
                    height="224"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-gray-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                    <time dateTime={dateTimeStr}>{post.date}</time>
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50 group-hover:border-roblox-accent/30 group-hover:text-roblox-accent transition-colors">
                       {tag}
                     </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-roblox-accent transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm font-medium pt-6 border-t border-gray-700/50 mt-auto">
                   <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {post.readTime}
                   </span>
                   <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full border border-gray-600" />
                      <span className="text-gray-400 text-xs">{post.author.name}</span>
                   </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
