// Rarity Logic for Roblox Names
// Returns both UI labels and CSS classes

export interface RarityData {
  label: string;
  color: string;
  cardClass: string;
  score: number;
}

export interface AnalysisResult {
  score: number;
  tier: string;
  tierColor: string;
  feedback: { text: string; score: number; type: 'good' | 'bad' | 'neutral' }[];
  summary: string;
}

export const getRarity = (name: string): RarityData | null => {
  const len = name.length;
  const hasNumbers = /\d/.test(name);
  const hasUnderscore = /_|\./.test(name);
  const isClean = !hasNumbers && !hasUnderscore;

  if (len <= 4) return { 
    label: 'MYTHIC', 
    color: 'text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/10',
    cardClass: 'mythic-card',
    score: 5
  };
  
  if (len <= 6 && isClean) return { 
    label: 'LEGENDARY', 
    color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    cardClass: 'legendary-card',
    score: 4
  };
  
  if (isClean && len <= 8) return { 
    label: 'EPIC', 
    color: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    cardClass: '',
    score: 3
  };
  
  if (isClean) return { 
    label: 'RARE', 
    color: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    cardClass: '',
    score: 2
  };
  
  if (!hasNumbers && hasUnderscore) return { 
    label: 'UNCOMMON', 
    color: 'text-green-400 border-green-400/30 bg-green-400/10',
    cardClass: '',
    score: 1
  };
  
  return null; // Common
};

export const analyzeName = (name: string): AnalysisResult => {
  let score = 50; // Base score
  const feedback = [];
  const cleanName = name.trim();
  const len = cleanName.length;
  
  // 1. Length Analysis
  if (len <= 4) {
    score += 30;
    feedback.push({ text: "Ultra Short (Rare)", score: 30, type: 'good' });
  } else if (len <= 6) {
    score += 15;
    feedback.push({ text: "Short & Clean", score: 15, type: 'good' });
  } else if (len > 15) {
    score -= 10;
    feedback.push({ text: "Too Long", score: -10, type: 'bad' });
  }

  // 2. Composition Analysis
  const hasNumbers = /\d/.test(cleanName);
  const hasLetters = /[a-zA-Z]/.test(cleanName);
  const hasUnderscore = cleanName.includes('_');
  
  if (!hasNumbers && hasLetters) {
    score += 15;
    feedback.push({ text: "No Numbers (Clean)", score: 15, type: 'good' });
  } else if (hasNumbers && !hasLetters) {
    score -= 20;
    feedback.push({ text: "Barcode / Bot Name", score: -20, type: 'bad' });
  } else if (hasNumbers) {
    // Check for "Good" numbers vs "Bad" numbers
    if (name.endsWith('999') || name.endsWith('777') || name.endsWith('000') || name.endsWith('444')) {
      score += 5;
      feedback.push({ text: "Aesthetic Numbers", score: 5, type: 'neutral' });
    } else {
      score -= 10;
      feedback.push({ text: "Random Numbers detected", score: -10, type: 'bad' });
    }
  }

  // 3. Trends & Style
  const lower = cleanName.toLowerCase();
  
  // Sweaty Suffixes
  if (lower.endsWith('fn') || lower.endsWith('sz') || lower.endsWith('xo') || lower.endsWith('pvp') || lower.endsWith('q')) {
    score += 10;
    feedback.push({ text: "Sweaty Suffix Detected", score: 10, type: 'good' });
  }

  // OG Prefixes
  if (lower.startsWith('itz') || lower.startsWith('not') || lower.startsWith('iam')) {
    score += 5;
    feedback.push({ text: "Classic Prefix", score: 5, type: 'good' });
  }

  // Mixed Caps (Sweaty Style: vIper)
  if (cleanName.length > 2 && /^[a-z][A-Z]/.test(cleanName)) {
    score += 10;
    feedback.push({ text: "Sweaty Capitalization", score: 10, type: 'good' });
  }

  // Noob Checks
  if (lower.includes('pro') || lower.includes('gamer') || lower.includes('king') || lower.includes('super')) {
    score -= 5;
    feedback.push({ text: "Generic Keyword used", score: -5, type: 'neutral' });
  }
  
  // Aesthetic Check (lowercase with dots or underscores)
  if (cleanName === lower && (cleanName.includes('.') || cleanName.includes('_'))) {
    score += 10;
    feedback.push({ text: "Soft/Aesthetic Vibe", score: 10, type: 'good' });
  }

  // Clamp Score
  score = Math.max(0, Math.min(100, score));

  // Determine Tier
  let tier = 'NOOB';
  let tierColor = 'text-gray-500';
  let summary = 'Time to reroll. This name needs work.';

  if (score >= 95) {
    tier = 'GODLIKE (OG)';
    tierColor = 'text-fuchsia-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]';
    summary = 'Incredible. This looks like a 2010 account or a top-tier sweat.';
  } else if (score >= 80) {
    tier = 'SWEATY / PRO';
    tierColor = 'text-yellow-400';
    summary = 'Intimidating. People will assume you are good at PvP.';
  } else if (score >= 60) {
    tier = 'DECENT';
    tierColor = 'text-blue-400';
    summary = 'Solid choice. Clean enough to be respected.';
  } else if (score >= 40) {
    tier = 'CASUAL';
    tierColor = 'text-green-400';
    summary = 'Average. Not bad, but not memorable.';
  }

  return { score, tier, tierColor, feedback, summary };
};

// NEW: Availability Heuristics
export const estimateAvailability = (name: string): { color: string; text: string; probability: 'low' | 'med' | 'high' } => {
  const len = name.length;
  
  // High Risk (Red)
  if (len <= 4) return { color: 'bg-red-500', text: 'Likely Taken (Rare)', probability: 'low' };
  if (!/\d/.test(name) && !/_/.test(name) && len <= 6) return { color: 'bg-red-400', text: 'Hard to Find', probability: 'low' };
  
  // Medium Risk (Yellow/Orange)
  if (!/\d/.test(name) && len <= 8) return { color: 'bg-orange-500', text: '50/50 Chance', probability: 'med' };
  
  // Good Chance (Green)
  if (/_/.test(name)) return { color: 'bg-green-500', text: 'Likely Available', probability: 'high' };
  if (/\d{2,}/.test(name)) return { color: 'bg-green-500', text: 'High Chance', probability: 'high' };
  if (len > 10) return { color: 'bg-emerald-400', text: 'Very Likely Free', probability: 'high' };

  return { color: 'bg-yellow-500', text: 'Moderate Chance', probability: 'med' };
};