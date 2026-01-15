export enum NameStyle {
  COOL = 'Cool',
  FUNNY = 'Funny',
  CUTE = 'Cute',
  EDGY = 'Edgy',
  AESTHETIC = 'Aesthetic',
  OG = 'Short/OG',
  MIXED = 'Mixed / All' // New Discovery Mode
}

export enum LengthPreference {
  ANY = 'Any',
  SHORT = 'Short (< 8)',
  MEDIUM = 'Medium (8-12)',
  LONG = 'Long (> 12)'
}

export interface GeneratorOptions {
  keyword: string;
  style: NameStyle;
  length: LengthPreference;
  includeNumbers: boolean;
  includeUnderscore: boolean;
  useLeet: boolean; // New: Leet speak toggle
  prefix?: string; 
  suffix?: string; 
  useExactMatch?: boolean; // New: Disable synonyms
  forDisplayName?: boolean; // New: Optimize for Display Names (allows spaces/symbols)
}

export interface GeneratedName {
  id: string;
  name: string;
  isAvailable?: boolean; 
}