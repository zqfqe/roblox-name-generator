import { GeneratorOptions, NameStyle, LengthPreference } from "../types";
import { 
  ADJECTIVES, NOUNS, VERBS, ACCOUNT_STATUS, COLORS, PVP_TERMS, TITLES, LEET_MAP, 
  JAPANESE_TERMS, FOODS, ANIMALS, ELEMENTS, WEAPONS, Y2K_SUFFIXES, EMOTIONS,
  MYTHICAL, TECH, ASTRO, SYNONYMS, CLEAN_SUFFIXES,
  HARD_SOUNDS, SOFT_SOUNDS, LATIN_ROOTS, FOREIGN_COOL, OPIUM_VAMP, BLOKECORE, 
  ACUBI_Y2K, PSEUDO_PREFIX, PSEUDO_SUFFIX, ORG_SUFFIXES, STATE_SUFFIXES
} from "../data/wordLists";

// --- Utility Functions ---

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const oneIn = (chance: number) => Math.random() < (1 / chance);

const capitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Modern Roblox "Sweat" capitalization (e.g., "vIper", "nINJA")
// UPDATED: Smarter logic to avoid breaking CamelCase names like "FuryCpu" -> "fUryCpu"
const sweatCapitalize = (str: string) => {
  if (str.length < 3) return str.toLowerCase();
  
  // If the string contains uppercase letters after index 1 (e.g. "FuryCpu"), 
  // do NOT apply sweat caps as it breaks the word boundary readability.
  const restOfString = str.slice(1);
  if (/[A-Z]/.test(restOfString)) {
     return str; 
  }

  // Pattern: vIper (Lowers first char, Uppers second char, PRESERVES the rest)
  return str.charAt(0).toLowerCase() + str.charAt(1).toUpperCase() + str.slice(2);
};

const applyLeetSpeak = (str: string): string => {
  return str.split('').map(char => {
    const lower = char.toLowerCase();
    // 50% chance to convert character if mapping exists, to keep it readable but cool
    if (LEET_MAP[lower] && Math.random() > 0.3) {
      return LEET_MAP[lower];
    }
    return char;
  }).join('');
};

const getRobloxNumber = (style: NameStyle) => {
  const r = Math.random();
  
  if (style === NameStyle.COOL || style === NameStyle.EDGY) {
    if (r < 0.2) return '999'; // Juice WRLD reference / Evil
    if (r < 0.4) return '777'; // Lucky
    if (r < 0.6) return '000'; // Clean
    if (r < 0.8) return '444'; // Angel number / sweat
    return getRandom(['1', '101', '11', '01', '99']);
  }
  
  if (style === NameStyle.CUTE || style === NameStyle.AESTHETIC) {
    if (r < 0.5) return '123';
    if (r < 0.7) return '222';
    return Math.floor(Math.random() * 30).toString(); 
  }

  if (style === NameStyle.OG) return Math.floor(Math.random() * 9).toString();
  
  // Year shorthand (24, 25, 26)
  if (r > 0.8) return '25'; 
  if (r > 0.9) return '26';

  return Math.floor(Math.random() * 900 + 100).toString();
};

const replaceSwithZ = (str: string): string => {
  if (str.endsWith('s') || str.endsWith('S')) {
    return str.slice(0, -1) + 'z';
  }
  return str;
};

// Repeat the last character (e.g., "Darkkk")
// UPDATED: Stricter logic. Don't repeat vowels on long words (e.g. "Drakee" looks like a typo).
const repeatEndChar = (str: string, count: number = 1): string => {
  if (str.length === 0) return str;
  const lastChar = str.charAt(str.length - 1);
  const isVowel = /[aeiouAEIOU]/.test(lastChar);
  
  // If it's a vowel, ONLY repeat if the word is very short (e.g. "Kye" -> "Kyee" is ok, "Drake" -> "Drakee" is bad)
  if (isVowel && str.length > 4) {
      return str;
  }

  // Only repeat z, x, s, or vowels. Repeating 'd', 't', 'r' usually looks like a mistake.
  if (/[zxsZXSaeiou]/.test(lastChar)) {
     return str + lastChar.repeat(count);
  }
  return str;
};

// --- Template Engine tailored for Roblox Archetypes ---

type TemplateFn = (
  k: string, a: string, n: string, v: string, s: string, c: string, p: string, t: string, 
  j: string, f: string, an: string, e: string, w: string, y: string, em: string,
  myth: string, tech: string, astro: string, suff: string,
  // New Params
  hard: string, soft: string, latin: string, foreign: string, opium: string, bloke: string, 
  acubi: string, pPre: string, pSuf: string, org: string, state: string
) => string;

interface StyleStrategy {
  templates: TemplateFn[];
  transform?: (name: string) => string;
}

const STRATEGIES: Record<string, StyleStrategy> = {
  [NameStyle.COOL]: {
    templates: [
      // Direct Prefix/Suffix (Classic)
      (k, a, n) => k ? `Itz${k}` : `Itz${n}`,
      (k, a, n) => k ? `Not${k}` : `Not${n}`,
      (k, a, n) => k ? `iAm${k}` : `iAm${capitalize(a)}`,
      
      // Combinations (Adjective + Keyword)
      (k, a, n) => k ? `${a}${k}` : `${a}${n}`, // e.g. ToxicNebula
      
      // Keyword + Noun/Role
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth) => k ? `${k}${myth}` : `${n}${myth}`, // e.g. NebulaHydra
      (k, a, n, v, s, c, p, t, j, f, an, e, w) => k ? `${k}${w}` : `${n}${w}`, // e.g. NebulaSniper
      (k, a, n, v, s, c) => k ? `${c}${k}` : `${c}${n}`, // Color + Keyword e.g. RedNebula
      
      // Suffixes
      (k, a, n) => k ? `${k}PvP` : `${n}PvP`,
      (k, a, n) => k ? `${k}Fn` : `${n}Fn`,
      (k, a, n) => k ? `${k}Sz` : `${n}Sz`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech) => k ? `${k}${tech}` : `${n}${tech}`, // NebulaSystem
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff) => k ? `${k}${suff}` : `${n}${suff}`, // NEW: NebulaMode / BeautyFlow

      // Sweaty/PVP
      (k, a, n, v, s, c, p) => k ? `${k}${p}` : `${n}${p}`, // NebulaClutch
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth) => k ? `${k}Slayer` : `${myth}Slayer`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech) => k ? `${k}God` : `${tech}God`,

      // NEW LISTS INTEGRATION
      // Hard Sounds (PvP)
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard) => k ? `${k}${hard}` : `${hard}${n}`, // e.g. StarVex
      // Latin Flair (Status)
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin) => k ? `${latin}${k}` : `${latin}${n}`, // e.g. LuxViper
      // Opium/Vamp Style
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium) => k ? `${k}${opium}` : `${n}${opium}`, // e.g. StarCarti
      // Org Suffixes
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium, bloke, acubi, pPre, pSuf, org) => k ? `${k}${org}` : `${n}${org}`, // e.g. ViperCult
    ],
    transform: (name) => {
      let n = name;
      
      // Apply style transforms probabilistically
      if (oneIn(8) && n.length > 3 && n.length <= 8) {
         n = sweatCapitalize(n);
      }
      else if (oneIn(4)) n = replaceSwithZ(n); 
      else if (oneIn(10)) n = repeatEndChar(n, 1); // Reduced frequency of repeated char
      return n;
    }
  },
  [NameStyle.FUNNY]: {
    templates: [
      (k, a, n) => k ? `CEOof${k}` : `CEOof${n}`,
      (k, a, n) => k ? `UrMomHates${k}` : `UrMomHates${n}`,
      (k, a, n) => k ? `${k}GoBrrr` : `${n}GoBrrr`,
      (k, a, n) => k ? `Professional${k}` : `Professional${n}`,
      (k, a, n) => k ? `I_Eat_${k}` : `I_Eat_${n}`,
      (k, a, n) => k ? `Loading_${k}` : `Loading_${n}`,
      (k, a, n, v, s, c, p, t, j, f) => k ? `${f}${k}` : `${f}${n}`, // Food + Keyword
      (k, a, n, v, s, c, p, t, j, f, an) => k ? `${an}${k}` : `${an}${n}`, // Animal + Keyword e.g. PandaNebula
      (k, a, n, v, s, c, p, t, j, f, an) => k ? `${k}The${an}` : `${a}The${an}`,
    ]
  },
  [NameStyle.CUTE]: {
    templates: [
      (k, a, n) => k ? `ii${k}ii` : `ii${n}ii`,
      (k, a, n) => k ? `${k}xo` : `${n}xo`,
      (k, a, n) => k ? `Miss${k}` : `Miss${n}`,
      (k, a, n) => k ? `${k}Vibes` : `${n}Vibes`,
      (k, a, n) => k ? `Its${k}` : `Its${n}`,
      (k, a, n) => k ? `Lil${k}` : `Lil${n}`,
      (k, a, n, v, s, c) => k ? `${c}${k}` : `${c}${n}`, // Color
      (k, a, n, v, s, c, p, t, j, f) => k ? `${f}${k}` : `${f}${n}`, // Food
      (k, a, n, v, s, c, p, t, j, f, an) => k ? `${k}${an}` : `${n}${an}`, // Keyword + Animal
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro) => k ? `${astro}${k}` : `${astro}${n}`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff) => k ? `${k}${suff}` : `${n}${suff}`,
      // NEW: Soft sounds
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft) => k ? `${k}${soft}` : `${soft}${n}`,
    ],
    transform: (name) => name 
  },
  [NameStyle.EDGY]: {
    templates: [
      (k, a, n) => {
        // Fix for "BrokeBroken" -> Check if suffix already exists in keyword
        const lowerK = k.toLowerCase();
        if (lowerK.endsWith('broken') || lowerK.endsWith('broke')) return k; // Don't append
        
        if (lowerK.includes('broken')) return `${k}Heart`;
        if (lowerK.includes('dead')) return `${k}Soul`;
        return k ? `${k}Broken` : `${n}Broken`;
      },
      (k, a, n) => k ? `DontTalkTo${k}` : `DontTalkTo${n}`,
      (k, a, n) => k ? `${k}WasTaken` : `${n}WasTaken`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em) => k ? `${em}${k}` : `${em}${n}`, // Emotion + Keyword e.g. SadNebula
      (k, a, n) => k ? `kxll${k}` : `kxll${n}`,
      (k, a, n) => k ? `${k}Silent` : `${n}Silent`,
      (k, a, n) => k ? `${k}Rage` : `${n}Rage`,
      (k, a, n, v, s, c, p, t, j) => k ? `${j}${k}` : `${j}${n}`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em) => k ? `${em}${k}` : `${em}${n}`,
      // NEW: Opium/Vamp integration
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium) => k ? `${k}${opium}` : `${opium}${n}`,
    ],
    transform: (name) => {
      // Standardized to lower case for Edgy to look cleaner, mixed caps looks messy often
      if (Math.random() > 0.3) return name.toLowerCase(); 
      if (oneIn(3)) return name.replace(/[aeiou]/gi, 'x');
      return name;
    }
  },
  [NameStyle.AESTHETIC]: {
    templates: [
      (k, a, n) => k ? `${k}.pov` : `${n}.pov`,
      (k, a, n) => k ? `luv${k}` : `luv${n}`,
      (k, a, n) => k ? `${k}.xyz` : `${n}.xyz`,
      (k, a, n) => k ? `whos${k}` : `whos${n}`,
      (k, a, n) => k ? `just${k}` : `just${a}`,
      (k, a, n) => k ? `${k}core` : `${n}core`,
      (k, a, n) => k ? `not${k}` : `not${n}`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y) => k ? `${k}${y}` : `${n}${y}`, // Keyword + Y2K Suffix
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro) => k ? `${astro}${k}` : `${astro}${n}`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff) => k ? `${k}${suff}` : `${n}${suff}`,
      // NEW: Acubi / Foreign Cool
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign) => k ? `${foreign}${k}` : `${foreign}${n}`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium, bloke, acubi) => k ? `${k}${acubi}` : `${acubi}${n}`,
    ],
    transform: (name) => name.toLowerCase()
  },
  [NameStyle.OG]: {
    templates: [
      (k, a, n) => k ? `${k}` : `${n}`,
      (k, a, n) => k ? `${k}RBX` : `${n}RBX`,
      (k, a, n) => k ? `Real${k}` : `Real${n}`,
      (k, a, n) => k ? `${k}1` : `${n}1`,
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech) => k ? `${tech}${k}` : `${tech}${n}`,
      // NEW: Pseudo-Word Construction (The "Fake Word" Engine)
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium, bloke, acubi, pPre, pSuf) => `${pPre}${pSuf}`, // e.g. "Zax", "Krix"
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin) => `${latin}`, // Just the latin root
      (k, a, n, v, s, c, p, t, j, f, an, e, w, y, em, myth, tech, astro, suff, hard, soft, latin, foreign, opium, bloke) => k ? `${k}${bloke}` : `${bloke}${n}`, // Blokecore (FC, City)
    ]
  }
};

const ALL_STYLES = [NameStyle.COOL, NameStyle.FUNNY, NameStyle.CUTE, NameStyle.EDGY, NameStyle.AESTHETIC, NameStyle.OG];

export const generateRobloxNames = async (options: GeneratorOptions): Promise<string[]> => {
  const { keyword, style, length, includeNumbers, includeUnderscore, prefix, suffix, useExactMatch, useLeet, forDisplayName } = options;
  
  // Reduced delay to make the UI feel snappier, now that we have the Decrypt animation
  await new Promise(resolve => setTimeout(resolve, 200));

  const results: Set<string> = new Set();
  const lowerResults: Set<string> = new Set(); // Track lowercase versions for strict deduplication
  const targetCount = 12; 
  
  let baseKeywords: string[] = [];
  
  if (keyword && keyword.trim().length > 0) {
    const cleanKey = keyword.trim().replace(/\s+/g, '');
    baseKeywords.push(cleanKey);
    
    // Improved Synonym Logic
    if (!useExactMatch) {
      const lowerKey = cleanKey.toLowerCase();
      if (SYNONYMS[lowerKey]) {
        // Add all synonyms to the pool
        baseKeywords = [...baseKeywords, ...SYNONYMS[lowerKey]];
      }
    }
  } else {
    baseKeywords.push("");
  }
  
  let safetyCounter = 0;

  while (results.size < targetCount && safetyCounter < 500) {
    safetyCounter++;

    // MIXED MODE LOGIC: Randomly pick a style for this iteration
    const currentStyle = style === NameStyle.MIXED 
      ? getRandom(ALL_STYLES) 
      : style;

    const strategy = STRATEGIES[currentStyle] || STRATEGIES[NameStyle.COOL];
    const adjList = ADJECTIVES[currentStyle] || ADJECTIVES[NameStyle.COOL];
    const nounList = NOUNS[currentStyle] || NOUNS[NameStyle.COOL];

    let currentKeyword = getRandom(baseKeywords);
    const originalKeyword = currentKeyword;
    
    if (currentKeyword) {
        if (currentStyle === NameStyle.AESTHETIC || (currentStyle === NameStyle.EDGY && Math.random() > 0.5)) {
            currentKeyword = currentKeyword.toLowerCase();
        } else if (currentStyle === NameStyle.COOL && oneIn(10)) {
            // Apply sweat capitalization to keyword ONLY if safe
            const sweated = sweatCapitalize(currentKeyword);
            if (sweated.length < 8 && !/[A-Z]/.test(sweated.slice(1))) {
              currentKeyword = sweated;
            } else {
              currentKeyword = capitalize(currentKeyword);
            }
        } else {
            currentKeyword = capitalize(currentKeyword);
        }
    }

    let template = getRandom(strategy.templates);
    
    const args = [
        currentKeyword, getRandom(adjList), getRandom(nounList), getRandom(VERBS), 
        getRandom(ACCOUNT_STATUS), getRandom(COLORS), getRandom(PVP_TERMS), getRandom(TITLES),
        getRandom(JAPANESE_TERMS), getRandom(FOODS), getRandom(ANIMALS), getRandom(ELEMENTS),
        getRandom(WEAPONS), getRandom(Y2K_SUFFIXES), getRandom(EMOTIONS), getRandom(MYTHICAL),
        getRandom(TECH), getRandom(ASTRO), getRandom(CLEAN_SUFFIXES),
        // NEW ARGS
        getRandom(HARD_SOUNDS), getRandom(SOFT_SOUNDS), getRandom(LATIN_ROOTS), getRandom(FOREIGN_COOL),
        getRandom(OPIUM_VAMP), getRandom(BLOKECORE), getRandom(ACUBI_Y2K), getRandom(PSEUDO_PREFIX),
        getRandom(PSEUDO_SUFFIX), getRandom(ORG_SUFFIXES), getRandom(STATE_SUFFIXES)
    ] as const;

    let name = template(...args);

    if (includeNumbers && currentStyle !== NameStyle.OG) {
      const chance = currentStyle === NameStyle.AESTHETIC ? 0.2 : 0.5;
      if (Math.random() < chance) {
         name += getRobloxNumber(currentStyle);
      }
    }

    if (includeUnderscore) {
      if (!name.includes('_') && !name.includes('.')) {
         if (name.match(/[a-z][A-Z]/)) {
            name = name.replace(/([a-z])([A-Z])/, '$1_$2');
         } 
         else if (currentStyle === NameStyle.EDGY || currentStyle === NameStyle.COOL) {
           const rand = Math.random();
           if (rand < 0.2) name = `_${name}`;
           else if (rand < 0.4) name = `${name}_`;
           else name = `_${name}_`; 
         }
       }
    }

    // Apply Style Transform First
    if (strategy.transform) {
      name = strategy.transform(name);
    }
    
    // Apply Leet Speak if Enabled (Higher Priority than some transforms)
    if (useLeet) {
      name = applyLeetSpeak(name);
    }

    if (prefix && prefix.trim() !== '') {
      const p = prefix.trim();
      if (!name.toLowerCase().startsWith(p.toLowerCase())) {
        name = `${p}${name}`;
      }
    }

    if (suffix && suffix.trim() !== '') {
       const s = suffix.trim();
       if (!name.toLowerCase().endsWith(s.toLowerCase())) {
         name = `${name}${s}`;
       }
    }

    // Display Name Logic: Allow Spaces!
    if (forDisplayName) {
        // Randomly introduce spaces between CamelCase words if not already present
        if (!name.includes(' ') && Math.random() > 0.3) {
            name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
            name = name.replace(/_/g, ' '); // Replace underscores with spaces for cleaner look
        }
    } else {
        // Strict Username Logic
        name = name.replace(/__+/g, '_').replace(/\.\.+/g, '.');
        name = name.replace(/[^a-zA-Z0-9_\.]/g, ''); 
    }

    // --- QUALITY CHECKS ---
    const lowerName = name.toLowerCase();
    const lowerK = originalKeyword.toLowerCase();

    // 1. Dedup Check (Case Insensitive)
    if (lowerResults.has(lowerName)) continue;

    // 2. Repetition Check (Echo Effect)
    // Prevent "brokenbroken" (direct repeat)
    if (lowerName === lowerK + lowerK) continue;
    
    // Prevent "BrokenBroken" (if keyword is broken and template adds broken)
    // If the name ends with the keyword AND starts with the keyword, and is just the keyword twice
    if (lowerName.length === lowerK.length * 2 && lowerName.startsWith(lowerK) && lowerName.endsWith(lowerK)) continue;

    let isValidLength = true;
    const len = name.length;
    if (length === LengthPreference.SHORT && len >= 8) isValidLength = false;
    else if (length === LengthPreference.MEDIUM && (len < 8 || len > 12)) isValidLength = false;
    else if (length === LengthPreference.LONG && len <= 12) isValidLength = false;

    if (len >= 3 && len <= 20 && isValidLength) {
      results.add(name);
      lowerResults.add(lowerName);
    }
  }

  return Array.from(results);
};
