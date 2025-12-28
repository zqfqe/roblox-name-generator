import { useEffect } from 'react';

// Dynamically updates <head> tags
export const SEOHead = ({ title, description, url, image }: { title: string, description: string, url: string, image?: string }) => {
  useEffect(() => {
    document.title = title;
    
    // Update Meta Tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('twitter:title', title, 'property');
    updateMeta('twitter:description', description, 'property');
    
    // Default fallback image if none provided
    const ogImage = image || 'https://robloxnamegenerator.org/apple-touch-icon.png';
    updateMeta('og:image', ogImage, 'property');
    updateMeta('twitter:image', ogImage, 'property');

    // Update Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

  }, [title, description, url, image]);

  return null;
};

// Injects JSON-LD Structure Data
export const SchemaMarkup = ({ data }: { data: object }) => {
  useEffect(() => {
    const scriptId = 'json-ld-data';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    
    return () => {
      const s = document.getElementById(scriptId);
      if(s) s.remove();
    }
  }, [data]);
  return null;
};