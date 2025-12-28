import { NameStyle } from "../types";

// Smart Synonyms for better keyword integration
export const SYNONYMS: Record<string, string[]> = {
  // Elements & Nature
  'fire': ['Flame', 'Inferno', 'Pyro', 'Burn', 'Heat', 'Ash', 'Blaze', 'Ember', 'Ignis', 'Scorch'],
  'ice': ['Frost', 'Cold', 'Frozen', 'Chill', 'Glacier', 'Snow', 'Arctic', 'Cryo', 'Shiver'],
  'dark': ['Shadow', 'Void', 'Night', 'Black', 'Abyss', 'Gloom', 'Obsidian', 'Dusk', 'Umbra', 'Shade'],
  'light': ['Sun', 'Ray', 'Bright', 'Glow', 'Shine', 'Solar', 'Lumen', 'Dawn', 'Lux', 'Flash'],
  'water': ['Aqua', 'Hydro', 'Tide', 'Wave', 'Ocean', 'Sea', 'Mist', 'Rain', 'Storm'],
  
  // Space & Sci-Fi (Fixing the Nebula issue)
  'star': ['Astral', 'Cosmic', 'Nova', 'Nebula', 'Galaxy', 'Stellar', 'Comet', 'Orbit'],
  'nebula': ['Cosmic', 'Galaxy', 'Void', 'Star', 'Nova', 'Astro', 'Space', 'Orbit', 'Vortex', 'Quasar'],
  'space': ['Cosmos', 'Galaxy', 'Universe', 'Void', 'Star', 'Astro', 'Lunar', 'Solar'],
  'cyber': ['Tech', 'Glitch', 'Digital', 'Neon', 'Bot', 'System', 'Data', 'Code', 'Binary', 'Net'],
  'system': ['OS', 'Root', 'Admin', 'Cyber', 'Core', 'Main', 'Bot', 'Glitch'],
  
  // Status & Power
  'god': ['Lord', 'King', 'Deity', 'Divine', 'Apex', 'Titan', 'Ruler', 'Zeus', 'Odin', 'Legend'],
  'king': ['Lord', 'God', 'Prince', 'Royal', 'Crown', 'Ruler', 'Boss', 'Chief', 'Emperor'],
  'pro': ['Elite', 'Sweat', 'God', 'King', 'Chief', 'Main', 'Boss', 'Tryhard', 'Carry'],
  'noob': ['Bot', 'Guest', 'Bacon', 'Newb', 'Trash', 'Bad', 'Lag'],
  
  // Gaming Roles
  'ninja': ['Shinobi', 'Shadow', 'Assassin', 'Rogue', 'Silent', 'Blade', 'Kage', 'Ronin'],
  'knight': ['Warrior', 'Paladin', 'Guard', 'Hero', 'Blade', 'Sword', 'Lancer'],
  'wizard': ['Mage', 'Spell', 'Witch', 'Hex', 'Arcane', 'Mystic', 'Sorcerer'],
  
  // Animals
  'cat': ['Kitty', 'Neko', 'Feline', 'Purr', 'Meow', 'Paws', 'Whiskers', 'Kitten'],
  'dog': ['Puppy', 'Inu', 'Wolf', 'Bark', 'Doge', 'Hound', 'K9', 'Pooch'],
  'dragon': ['Wyvern', 'Drake', 'Draco', 'Fire', 'Beast', 'Hydra', 'Serpent'],
  
  // Colors
  'red': ['Crimson', 'Ruby', 'Blood', 'Scarlet', 'Rose', 'Cherry', 'Mars'],
  'blue': ['Azure', 'Cyan', 'Teal', 'Aqua', 'Sapphire', 'Sky', 'Ocean', 'Cobalt'],
  'green': ['Lime', 'Jade', 'Emerald', 'Toxic', 'Viper', 'Mint', 'Leaf'],
  'black': ['Dark', 'Void', 'Shadow', 'Night', 'Ink', 'Coal', 'Onyx'],
  'white': ['Pale', 'Snow', 'Cloud', 'Pearl', 'Ivory', 'Ghost', 'Blank'],
  'gold': ['Midas', 'Rich', 'Lux', 'Royal', 'Gilded', 'Aura', 'Solar'],
  
  // Actions
  'win': ['Victory', 'Champ', 'First', 'Top', 'Best', 'Clutch', 'W', 'Ez'],
  'kill': ['Slay', 'Frag', 'Elim', 'End', 'Reap', 'Hunt', 'Hit', 'Drop'],

  // --- NEW: Game Specific Synonyms for Topic Clusters ---
  'dahood': ['Hood', 'Rev', 'Macro', 'Aim', 'Cash', 'Street', 'Bank', 'Lock', 'Clip', 'Mod'],
  'bedwars': ['Bed', 'Rush', 'Wool', 'Void', 'Clutch', 'Defense', 'Solo', 'Squad', 'Break'],
  'bloxfruits': ['Pirate', 'Marine', 'Devil', 'Fruit', 'Sea', 'King', 'Bounty', 'Haki', 'Leopard'],
  'murdermystery2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma'],
  'mm2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma'],
  'petsim99': ['Pet', 'Huge', 'Titan', 'Gem', 'Egg', 'Lucky', 'Shiny', 'Titanic'],
  'brookhaven': ['Roleplay', 'House', 'Rich', 'City', 'Vibe', 'Mom', 'Dad', 'Kid'],
  'preppy': ['Xo', 'Prepp', 'Pink', 'Vibe', 'Luv', 'Heart', 'Star', 'Coco', 'Palm'],
};

// Character substitution map
export const LEET_MAP: Record<string, string> = {
  'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'b': '8', 'g': '9'
};

// Prefixes tailored to Roblox clans and status
export const CLAN_PREFIXES = [
  'Itz', 'TheReal', 'Just', 'iAm', 'Not', 'Only', 'Official', 'Captain', 
  'Pro', 'Im', 'Da', 'Yo', 'Mr', 'Ms', 'Ur', 'MyNameIs', 'ItsMe', 'CallMe',
  'Real', 'True', 'Dat', 'Tha', 'Le', 'Team', 'Club', 'Skt', 'Op'
];

export const TITLES = [
  'Sir', 'Dr', 'Mr', 'Mrs', 'Miss', 'Lord', 'King', 'Queen', 'Prince', 'Duke', 
  'Chief', 'Boss', 'Saint', 'Kami', 'Senpai', 'Sama', 'Don', 'Master', 'Sensei',
  'Emperor', 'Empress', 'Baron', 'Count', 'Viceroy', 'Warlord', 'Admin'
];

// Suffixes for gaming identity
export const GAMING_SUFFIXES = [
  'Blox', 'Plays', 'Gaming', 'YT', 'TV', 'Live', 'Rbx', 'Dev', 
  'Obby', 'Builds', 'Script', 'God', 'King', 'Queen', 'Vibes', 'Zone',
  'Verse', 'Nation', 'Squad', 'Gang', 'Clan', 'Hub', 'Central',
  'Playz', 'Games', 'Tube', 'Stream', 'Cast', 'Hq', 'Lab', 'Studios'
];

export const ACCOUNT_STATUS = [
  'Main', 'Alt', 'Priv', 'Private', 'Acc', 'Backup', 'Only', 'Xo', 'Lol', 'Ez',
  'Test', 'Dev', 'Admin', 'Guest', 'Vip', 'Banned', 'Lost', 'Found'
];

export const VERBS = [
  'Eat', 'Love', 'Hate', 'Chase', 'Miss', 'Drop', 'Kick', 'Ban', 'Scare', 
  'Fix', 'Break', 'Find', 'Lost', 'Need', 'Want', 'See', 'Hear',
  'Run', 'Walk', 'Jump', 'Fly', 'Swim', 'Sleep', 'Wake', 'Win', 'Lose',
  'Hunt', 'Seek', 'Catch', 'Throw', 'Keep', 'Hold', 'Hack'
];

export const COLORS = [
  'Red', 'Blu', 'Blue', 'Gue', 'Blk', 'Black', 'Wht', 'White', 'Pnk', 'Pink', 
  'Purp', 'Gold', 'Slvr', 'Cyan', 'Lime', 'Rose', 'Jade', 'Onyx', 'Crim', 
  'Azure', 'Teal', 'Gray', 'Grey', 'Neon', 'Dark', 'Light', 'Pale', 'Void',
  'Silver', 'Golden', 'Emerald', 'Ruby'
];

export const PVP_TERMS = [
  'Combo', 'Reach', 'Velocity', 'Bridge', 'Rush', 'Clutch', 'Aim', 'Click', 
  'Strafe', 'Macro', 'Lag', 'Ping', 'Sweat', 'Tryhard', 'Carry', 'Diff',
  'Crit', 'Dmg', 'Hacks', 'Mode', 'God', 'Pvp', '1v1', 'Solo', 'Clip'
];

// New: Anime/Japanese terms (Very popular in Roblox)
export const JAPANESE_TERMS = [
  'Kami', 'Yami', 'Kage', 'Tsuki', 'Hikari', 'Ryu', 'Akuma', 'Tenshi', 
  'Sora', 'Shiro', 'Kuro', 'Hoshi', 'Neko', 'Inu', 'Kitsune', 'Baka',
  'Ken', 'Shin', 'Kai', 'Jin', 'Ren', 'Yuki', 'Hana', 'Sakura', 'Mochi',
  'Rai', 'Mizu', 'Kaze', 'Honoo'
];

// New: Foods (Great for Funny/Cute)
export const FOODS = [
  'Mochi', 'Sushi', 'Boba', 'Toast', 'Waffle', 'Cookie', 'Taco', 'Pizza', 
  'Ramen', 'Noodle', 'Bean', 'Potato', 'Mango', 'Peach', 'Berry', 'Melon',
  'Milk', 'Tea', 'Coffee', 'Cake', 'Pie', 'Bread', 'Soup', 'Egg', 'Rice',
  'Donut', 'Chip', 'Soda', 'Fizz'
];

// New: Animals (Great for all categories depending on context)
export const ANIMALS = [
  'Panda', 'Koala', 'Axolotl', 'Capybara', 'Duck', 'Frog', 'Cat', 'Dog', 
  'Wolf', 'Fox', 'Bunny', 'Bear', 'Tiger', 'Lion', 'Dragon', 'Shark',
  'Doge', 'Shiba', 'Penguin', 'Owl', 'Bat', 'Snake', 'Rat', 'Mouse',
  'Crow', 'Raven', 'Eagle', 'Hawk'
];

// New: Elements (Cool/Fantasy)
export const ELEMENTS = [
  'Fire', 'Ice', 'Void', 'Volt', 'Wind', 'Terra', 'Aqua', 'Solar', 'Lunar', 
  'Plasma', 'Shadow', 'Light', 'Dark', 'Frost', 'Burn', 'Ash', 'Spark',
  'Thunder', 'Storm', 'Flame', 'Blaze', 'Frozen', 'Crystal', 'Metal'
];

// New: Weapons (FPS/PVP)
export const WEAPONS = [
  'Katana', 'Scythe', 'Blade', 'Dagger', 'Glock', 'Sniper', 'Rifle', 'Bow', 
  'Arrow', 'Sword', 'Spear', 'Hammer', 'Axe', 'Mace', 'Staff', 'Wand',
  'Knife', 'Pistol', 'Revolver', 'Cannon', 'Bomb', 'Kunai', 'Shuriken'
];

// New: Y2K/Trendy Suffixes
export const Y2K_SUFFIXES = [
  'Wrld', 'Szn', 'Zone', 'Boi', 'Gurl', 'Luv', 'Xo', 'K', 'Z', 'Vibe', 'Core',
  'Planet', 'Star', 'Club', 'House', 'Gang', 'Mob', 'Cartel', 'Inc', 'Corp'
];

// New: Emotions (Edgy/Aesthetic)
export const EMOTIONS = [
  'Sad', 'Mad', 'Hype', 'Numb', 'Chill', 'Vibe', 'Happy', 'Angry', 'Lost', 
  'Dead', 'Alive', 'Rich', 'Broke', 'Tired', 'Woke', 'Alone', 'Lonely',
  'Dizzy', 'Faded', 'Wasted', 'High', 'Low', 'Empty', 'Hurt'
];

// NEW: Mythical Creatures
export const MYTHICAL = [
  'Phoenix', 'Hydra', 'Griffin', 'Wyvern', 'Drake', 'Siren', 'Titan', 'Golem',
  'Valkyrie', 'Leviathan', 'Kraken', 'Cerberus', 'Chimera', 'Basilisk', 'Spirit',
  'Angel', 'Demon', 'Wraith', 'Specter', 'Ghoul', 'Ogre', 'Orc', 'Elf'
];

// NEW: Tech/Glitch Terms
export const TECH = [
  'Glitch', 'System', 'Error', 'Cyber', 'Binary', 'Pixel', 'Data', 'Code',
  'Vector', 'Matrix', 'Logic', 'Bot', 'Admin', 'Root', 'Server', 'Proxy', 'Node',
  'Byte', 'Bit', 'Null', 'Void', 'Patch', 'Bug', 'Virus'
];

// NEW: Astro/Cosmic Terms
export const ASTRO = [
  'Nebula', 'Quasar', 'Pulsar', 'Eclipse', 'Zenith', 'Vortex', 'Cosmos', 
  'Gravity', 'Orbit', 'Comet', 'Meteor', 'Asteroid', 'Galaxy', 'Star', 'Moon',
  'Nova', 'Solar', 'Lunar', 'Astro', 'Space', 'Alien', 'UFO'
];

export const ADJECTIVES: Record<NameStyle, string[]> = {
  [NameStyle.COOL]: [
    'Toxic', 'Silent', 'Neon', 'Cyber', 'Crimson', 'Savage', 'Rogue', 'Elite', 
    'Frozen', 'Ghost', 'Viper', 'Omega', 'Hyper', 'Rapid', 'Fatal', 'Stormy',
    'Electric', 'Sonic', 'Zero', 'Dark', 'Azure', 'Iron', 'Steel', 'Venom',
    'Raging', 'Swift', 'Divine', 'Prime', 'Apex', 'Hollow', 'Nova', 'Flux',
    'Arcane', 'Mystic', 'Radical', 'Extreme', 'Ultra', 'Mega', 'Giga',
    'Supreme', 'Infinite', 'Chaos', 'Vivid', 'Grand', 'Royal', 'Noble',
    'Astral', 'Cosmic', 'Lunar', 'Solar', 'Stellar', 'Radiant', 'Lethal',
    'Phantom', 'Shadow', 'Crystal', 'Final', 'Last', 'First', 'Only'
  ],
  [NameStyle.FUNNY]: [
    'Soggy', 'Spicy', 'Derpy', 'Chubby', 'Wobbly', 'Salty', 'Grumpy', 'Lazy', 
    'Dizzy', 'Crazy', 'Sneaky', 'Cheesy', 'Bumpy', 'Noodle', 'Potato', 'Angry',
    'Laggy', 'Bacon', 'Noob', 'Oof', 'Sus', 'Crunchy', 'Floppy', 'Glitchy',
    'Bald', 'Stinky', 'Wet', 'Raw', 'Fried', 'Sticky', 'Confused', 'Lost',
    'Thicc', 'Smelly', 'Greasy', 'Moldy', 'Broken', 'Ugly', 'Fat',
    'Moist', 'Dank', 'Cringe', 'Yeet', 'Goofy', 'Silly', 'Dumb', 'Wacky',
    'Tubby', 'Flabby', 'Hairy', 'Karen', 'Boomer', 'Zoomer'
  ],
  [NameStyle.CUTE]: [
    'Fluffy', 'Soft', 'Pastel', 'Sweet', 'Happy', 'Tiny', 'Sparkly', 'Milky', 
    'Cozy', 'Sunny', 'Honey', 'Bubbly', 'Dreamy', 'Starry', 'Lovely', 'Puffy',
    'Peachy', 'Cherry', 'Vanilla', 'Sugar', 'Pink', 'Cotton', 'Daisy',
    'Baby', 'Lil', 'Chibi', 'Smol', 'Velvet', 'Silky', 'Kawaii', 'Fuzzy',
    'Warm', 'Icy', 'Minty', 'Berry', 'Creamy', 'Lucky',
    'Cute', 'Precious', 'Gentle', 'Kind', 'Shy', 'Quiet', 'Rosy',
    'Fruity', 'Flower', 'Little', 'Small', 'Petite', 'Mini'
  ],
  [NameStyle.EDGY]: [
    'Cursed', 'Broken', 'Lost', 'Dead', 'Grim', 'Fallen', 'Hollow', 'Void', 
    'Abyss', 'Evil', 'Pain', 'Sorrow', 'Fear', 'Doom', 'Hate', 'Lone',
    'Blood', 'Dark', 'Sad', 'Numb', 'Toxic', 'Rage', 'Cryptic',
    'Empty', 'Cold', 'Hurt', 'Gone', 'Away', 'Left', 'Right', 'Wrong',
    'Sick', 'Mad', 'Insane', 'Psycho', 'Demon', 'Devil', 'Hell',
    'Vile', 'Wicked', 'Cruel', 'Brutal', 'Savage', 'Fatal', 'Mortal',
    'Tragic', 'Gloom', 'Bleak', 'Dire', 'Sinister'
  ],
  [NameStyle.AESTHETIC]: [
    'pure', 'soft', 'calm', 'retro', 'vintage', 'lofi', 'pale', 'divine', 
    'rare', 'silk', 'velvet', 'dim', 'lost', 'fair', 'warm', 'luxe', 
    'bliss', 'haze', 'muse', 'nova', 'sol',
    'sage', 'teal', 'beige', 'fawn', 'dove', 'swan', 'mist', 'fog',
    'dew', 'rain', 'snow', 'wind', 'air', 'sky', 'cloud',
    'ethereal', 'serene', 'tranquil', 'lucid', 'dreamy', 'faded',
    'nostalgic', 'golden', 'silver', 'ivory', 'ebony', 'classic'
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil'
  ],
  [NameStyle.MIXED]: []
};

export const NOUNS: Record<NameStyle, string[]> = {
  [NameStyle.COOL]: [
    'Wolf', 'Shadow', 'Ghost', 'Storm', 'Viper', 'Sniper', 'Ninja', 'Rider',
    'Dragon', 'Flame', 'Blade', 'Soul', 'Reaper', 'Legend', 'Slayer', 'Knight',
    'Warrior', 'Hunter', 'Falcon', 'Eagle', 'Hawk', 'Raven', 'Titan', 'Soldier',
    'Merc', 'Killer', 'Assassin', 'Agent', 'Master', 'Chief', 'Captain', 'Boss',
    'King', 'Lord', 'God', 'Savage', 'Beast', 'Demon', 'Devil', 'Angel', 'Spirit',
    'Phantom', 'Specter', 'Wraith', 'Ghoul', 'Omen', 'Chaos', 'Havoc', 'Fury',
    'Rage', 'Doom', 'Fate', 'Destiny', 'Glory', 'Honor', 'Valor', 'Power'
  ],
  [NameStyle.FUNNY]: [
    'Potato', 'Banana', 'Noodle', 'Toaster', 'Fridge', 'Pickle', 'Waffle', 'Pancake',
    'Biscuit', 'Cookie', 'Muffin', 'Cupcake', 'Donut', 'Taco', 'Burrito', 'Pizza',
    'Burger', 'Sandwich', 'Hotdog', 'Chicken', 'Duck', 'Goose', 'Penguin', 'Panda',
    'Koala', 'Sloth', 'Llama', 'Alpaca', 'Goat', 'Sheep', 'Cow', 'Pig', 'Frog',
    'Toad', 'Turtle', 'Snail', 'Worm', 'Bug', 'Fly', 'Bee', 'Ant', 'Spider',
    'Clown', 'Joker', 'Meme', 'Noob', 'Bot', 'Glitch', 'Error', 'Fail', 'Trash'
  ],
  [NameStyle.CUTE]: [
    'Bunny', 'Kitty', 'Puppy', 'Panda', 'Koala', 'Bear', 'Fox', 'Wolf', 'Tiger',
    'Lion', 'Cat', 'Dog', 'Mouse', 'Hamster', 'Rabbit', 'Deer', 'Fawn', 'Duck',
    'Chick', 'Bird', 'Owl', 'Penguin', 'Seal', 'Whale', 'Dolphin', 'Fish',
    'Star', 'Moon', 'Sun', 'Cloud', 'Rain', 'Snow', 'Flower', 'Rose', 'Lily',
    'Tulip', 'Daisy', 'Lotus', 'Cherry', 'Berry', 'Peach', 'Apple', 'Cookie',
    'Cake', 'Pie', 'Candy', 'Sugar', 'Sweet', 'Honey', 'Love', 'Heart'
  ],
  [NameStyle.EDGY]: [
    'Pain', 'Hate', 'Fear', 'Sorrow', 'Grief', 'Despair', 'Agony', 'Misery', 'Torment',
    'Death', 'Life', 'Soul', 'Spirit', 'Ghost', 'Shadow', 'Darkness', 'Void', 'Abyss',
    'Hell', 'Demon', 'Devil', 'Satan', 'Lucifer', 'Evil', 'Sin', 'Blood', 'Gore',
    'Kill', 'Murder', 'Slaughter', 'Massacre', 'War', 'Battle', 'Fight', 'Conflict',
    'Chaos', 'Anarchy', 'Riot', 'Rebel', 'Outlaw', 'Criminal', 'Villain', 'Enemy',
    'Traitor', 'Liar', 'Cheat', 'Thief', 'Killer', 'Psycho', 'Maniac', 'Lunatic'
  ],
  [NameStyle.AESTHETIC]: [
    'Vibe', 'Mood', 'Soul', 'Mind', 'Thought', 'Dream', 'Wish', 'Hope', 'Faith',
    'Love', 'Life', 'World', 'Space', 'Time', 'Light', 'Dark', 'Night', 'Day',
    'Sky', 'Sea', 'Ocean', 'River', 'Lake', 'Forest', 'Tree', 'Leaf', 'Flower',
    'Garden', 'Field', 'Meadow', 'Mountain', 'Hill', 'Valley', 'Desert', 'Sand',
    'Dust', 'Wind', 'Breeze', 'Air', 'Cloud', 'Mist', 'Fog', 'Rain', 'Storm',
    'Thunder', 'Lightning', 'Star', 'Moon', 'Sun', 'Planet', 'Galaxy', 'Universe'
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil'
  ],
  [NameStyle.MIXED]: []
};