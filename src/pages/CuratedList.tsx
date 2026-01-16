import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { STATIC_LISTS } from '../data/staticLists';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NameList } from '../components/NameList';
import { SchemaMarkup } from '../components/SEO';
import { GeneratedName } from '../types';
import { Calendar, User, Check, Zap } from 'lucide-react';

export const CuratedList: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const listConfig = STATIC_LISTS.find(l => l.slug === slug);

  if (!listConfig) {
    return <Navigate to="/404" replace />;
  }

  // Convert string array to GeneratedName objects for compatibility with NameList
  const nameObjects: GeneratedName[] = useMemo(() => {
    return listConfig.names.map((n, i) => ({
      id: `static-${slug}-${i}`,
      name: n
    }));
  }, [listConfig, slug]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": listConfig.title,
    "description": listConfig.description,
    "dateModified": listConfig.updatedAt,
    "author": { "@type": "Organization", "name": "BloxName Editors" }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
      <SchemaMarkup data={schema} />
      <Breadcrumbs items={[{ label: 'Lists', path: '/' }, { label: listConfig.title }]} />

      <header className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-6 border border-yellow-500/20">
          <Zap className="w-3 h-3" /> Curated Collection
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {listConfig.title}
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          {listConfig.description}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2"><User className="w-4 h-4" /> BloxName Team</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated {listConfig.updatedAt}</span>
        </div>
      </header>

      {/* Main List Display */}
      <div className="mb-20">
        <NameList 
          names={nameObjects} 
          title="Curated Names"
          onCopyAll={() => navigator.clipboard.writeText(listConfig.names.join('\n'))}
        />
      </div>

      {/* CTA to Generator */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-3xl p-8 md:p-12 text-center border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Didn't find the perfect name?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            These are just our top picks. Use our advanced generator to create billions of unique combinations tailored to your style.
          </p>
          <Link 
            to={`/?style=${listConfig.style}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Launch Generator
          </Link>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
      </div>
    </div>
  );
};
