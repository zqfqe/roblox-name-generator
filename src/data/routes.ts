import { NameStyle } from "../types";

export interface RouteConfig {
  path: string;
  style: NameStyle;
  title: string;
  subtitle: string; // Used in Home Hero
  description: string; // Used in SEO & Home Hero
  emoji: string;
  navLabel: string;
}

export const STYLE_ROUTES: Record<string, RouteConfig> = {
  [NameStyle.COOL]: {
    path: '/sweaty-roblox-names',
    style: NameStyle.COOL,
    navLabel: 'Sweaty PvP',
    emoji: '⚔️',
    title: "Sweaty Roblox Name Generator (2026) - Cool PvP Usernames",
    subtitle: "Tryhard, PvP & Edgy Usernames",
    description: "Generate sweaty, tryhard, and cool Roblox usernames instantly. Perfect for competitive players in BedWars, Da Hood, and Deepwoken who need a 'vIper' or 'Soul' style alias."
  },
  [NameStyle.AESTHETIC]: {
    path: '/aesthetic-roblox-usernames',
    style: NameStyle.AESTHETIC,
    navLabel: 'Aesthetic',
    emoji: '✨',
    title: "Aesthetic Roblox Username Generator (2026) - Soft & Y2K",
    subtitle: "Soft, Y2K & Cottagecore Ideas",
    description: "Create soft, dreamy, and aesthetic Roblox usernames. The best aesthetic name generator for cottagecore and y2k styles for Royale High and Brookhaven."
  },
  [NameStyle.OG]: {
    path: '/rare-og-roblox-names',
    style: NameStyle.OG,
    navLabel: 'Rare OG',
    emoji: '💎',
    title: "Rare OG Roblox Name Generator - Short 4 Letter Usernames",
    subtitle: "Short 4-Letter & Clean Usernames",
    description: "Generate rare-looking, short, and 'OG' style names. We use advanced algorithms to find clean combinations that look like they were created in 2010."
  },
  [NameStyle.CUTE]: {
    path: '/cute-roblox-names',
    style: NameStyle.CUTE,
    navLabel: 'Cute',
    emoji: '🌸',
    title: "Cute Roblox Username Generator - Kawaii Name Ideas",
    subtitle: "Kawaii, Pastel & Sweet Names",
    description: "Discover adorable and kawaii usernames inspired by anime, sweets, and nature. Perfect for players who want a charming and friendly identity."
  },
  [NameStyle.FUNNY]: {
    path: '/funny-roblox-names',
    style: NameStyle.FUNNY,
    navLabel: 'Funny',
    emoji: '🤡',
    title: "Funny Roblox Name Generator - Troll Username Ideas",
    subtitle: "Troll, Meme & Alt Account Names",
    description: "Generate hilarious, meme-worthy, and troll usernames for your alt account that are safe for Roblox but guaranteed to get a laugh."
  }
};

// Helper to look up route config by style
export const getRouteByStyle = (style: NameStyle) => Object.values(STYLE_ROUTES).find(r => r.style === style);

// Helper to look up route config by path
export const getRouteByPath = (path: string) => Object.values(STYLE_ROUTES).find(r => r.path === path);
