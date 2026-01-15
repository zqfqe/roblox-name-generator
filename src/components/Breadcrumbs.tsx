import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SchemaMarkup } from './SEO';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Generate JSON-LD for Google
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://robloxnamegenerator.org/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.path ? `https://robloxnamegenerator.org${item.path}` : undefined
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
      <SchemaMarkup data={schemaData} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <li>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1" aria-label="Home">
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-gray-600" />
            {item.path ? (
              <Link to={item.path} className="hover:text-white transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-200 font-medium truncate max-w-[200px] md:max-w-none" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};