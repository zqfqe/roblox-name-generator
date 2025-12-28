import { NameStyle } from "../types";

// Smart Synonyms for better keyword integration
export const SYNONYMS: Record<string, string[]> = {
  // Elements & Nature
  'fire': ['Flame', 'Inferno', 'Pyro', 'Burn', 'Heat', 'Ash', 'Blaze', 'Ember', 'Ignis', 'Scorch', 'Flare', 'Magma', 'Cinder', 'Coal'],
  'ice': ['Frost', 'Cold', 'Frozen', 'Chill', 'Glacier', 'Snow', 'Arctic', 'Cryo', 'Shiver', 'Hail', 'Sleet', 'Polar', 'Rime'],
  'dark': ['Shadow', 'Void', 'Night', 'Black', 'Abyss', 'Gloom', 'Obsidian', 'Dusk', 'Umbra', 'Shade', 'Eclipse', 'Pitch', 'Onyx', 'Grim'],
  'light': ['Sun', 'Ray', 'Bright', 'Glow', 'Shine', 'Solar', 'Lumen', 'Dawn', 'Lux', 'Flash', 'Beam', 'Radiance', 'Halo', 'Glory'],
  'water': ['Aqua', 'Hydro', 'Tide', 'Wave', 'Ocean', 'Sea', 'Mist', 'Rain', 'Storm', 'Surge', 'Ripple', 'Flow', 'Drip', 'Soak'],
  'earth': ['Terra', 'Gaia', 'Stone', 'Rock', 'Dust', 'Sand', 'Quake', 'Root', 'Geo', 'Fossil', 'Granite', 'Slate', 'Clay'],
  'air': ['Wind', 'Aero', 'Sky', 'Breeze', 'Gust', 'Zephyr', 'Gale', 'Cloud', 'Mist', 'Vapor', 'Ether', 'Drift'],
  
  // Space & Sci-Fi
  'star': ['Astral', 'Cosmic', 'Nova', 'Nebula', 'Galaxy', 'Stellar', 'Comet', 'Orbit', 'Pulsar', 'Quasar', 'Zodiac'],
  'nebula': ['Cosmic', 'Galaxy', 'Void', 'Star', 'Nova', 'Astro', 'Space', 'Orbit', 'Vortex', 'Quasar', 'Nebulous', 'Cluster'],
  'space': ['Cosmos', 'Galaxy', 'Universe', 'Void', 'Star', 'Astro', 'Lunar', 'Solar', 'Horizon', 'Infinity', 'Deep'],
  'cyber': ['Tech', 'Glitch', 'Digital', 'Neon', 'Bot', 'System', 'Data', 'Code', 'Binary', 'Net', 'Grid', 'Link', 'Node'],
  'system': ['OS', 'Root', 'Admin', 'Cyber', 'Core', 'Main', 'Bot', 'Glitch', 'Server', 'Node', 'Proxy', 'Terminal'],
  'magic': ['Spell', 'Hex', 'Rune', 'Mana', 'Arcane', 'Wiz', 'Mage', 'Charm', 'Curse', 'Mystic', 'Aura', 'Witch', 'Occult'],
  
  // Status & Power
  'god': ['Lord', 'King', 'Deity', 'Divine', 'Apex', 'Titan', 'Ruler', 'Zeus', 'Odin', 'Legend', 'Myth', 'Idol', 'Kami'],
  'king': ['Lord', 'God', 'Prince', 'Royal', 'Crown', 'Ruler', 'Boss', 'Chief', 'Emperor', 'Monarch', 'Sovereign', 'Rex'],
  'pro': ['Elite', 'Sweat', 'God', 'King', 'Chief', 'Main', 'Boss', 'Tryhard', 'Carry', 'Goat', 'Vet', 'Mvp', 'Comp'],
  'noob': ['Bot', 'Guest', 'Bacon', 'Newb', 'Trash', 'Bad', 'Lag', 'Bronze', 'Scrub', 'Dogwater', 'Npc'],
  'fast': ['Quick', 'Swift', 'Dash', 'Bolt', 'Flash', 'Speed', 'Turbo', 'Mach', 'Rapid', 'Sonic', 'Velocity', 'Haste'],
  'strong': ['Titan', 'Might', 'Power', 'Force', 'Heavy', 'Tank', 'Buff', 'Iron', 'Steel', 'Muscle', 'Giga'],
  'rich': ['Lux', 'Gold', 'Cash', 'Rich', 'Wealth', 'Banks', 'Mint', 'Bill', 'Fund', 'Asset'],
  
  // Gaming Roles & Genres
  'ninja': ['Shinobi', 'Shadow', 'Assassin', 'Rogue', 'Silent', 'Blade', 'Kage', 'Ronin', 'Samurai', 'Vanish'],
  'knight': ['Warrior', 'Paladin', 'Guard', 'Hero', 'Blade', 'Sword', 'Lancer', 'Templar', 'Warden', 'Squire'],
  'wizard': ['Mage', 'Spell', 'Witch', 'Hex', 'Arcane', 'Mystic', 'Sorcerer', 'Warlock', 'Druid', 'Sage'],
  'horror': ['Fear', 'Scare', 'Creep', 'Spook', 'Grim', 'Terror', 'Haunt', 'Ghost', 'Entity', 'Cryptid', 'Panic'],
  'music': ['Bass', 'Beat', 'Audio', 'Sound', 'Vibe', 'Rhythm', 'Note', 'Tune', 'Track', 'Phonk'],
  
  // Animals
  'cat': ['Kitty', 'Neko', 'Feline', 'Purr', 'Meow', 'Paws', 'Whiskers', 'Kitten', 'Tabby', 'Lynx', 'Mew'],
  'dog': ['Puppy', 'Inu', 'Wolf', 'Bark', 'Doge', 'Hound', 'K9', 'Pooch', 'Husky', 'Pug', 'Mutt'],
  'dragon': ['Wyvern', 'Drake', 'Draco', 'Fire', 'Beast', 'Hydra', 'Serpent', 'Scale', 'Breath', 'Wing'],
  
  // Colors
  'red': ['Crimson', 'Ruby', 'Blood', 'Scarlet', 'Rose', 'Cherry', 'Mars', 'Rust', 'Maroon', 'Brick'],
  'blue': ['Azure', 'Cyan', 'Teal', 'Aqua', 'Sapphire', 'Sky', 'Ocean', 'Cobalt', 'Indigo', 'Navy', 'Denim'],
  'green': ['Lime', 'Jade', 'Emerald', 'Toxic', 'Viper', 'Mint', 'Leaf', 'Sage', 'Olive', 'Fern', 'Pine'],
  'black': ['Dark', 'Void', 'Shadow', 'Night', 'Ink', 'Coal', 'Onyx', 'Jet', 'Raven', 'Obsidian', 'Pitch'],
  'white': ['Pale', 'Snow', 'Cloud', 'Pearl', 'Ivory', 'Ghost', 'Blank', 'Bone', 'Frost', 'Chalk', 'Milk'],
  'gold': ['Midas', 'Rich', 'Lux', 'Royal', 'Gilded', 'Aura', 'Solar', 'Golden', 'Brass', 'Amber'],
  'pink': ['Rose', 'Sakura', 'Coral', 'Blush', 'Peach', 'Magenta', 'Fuchsia', 'Berry', 'Cotton', 'Candy'],
  'purple': ['Violet', 'Amethyst', 'Lavender', 'Grape', 'Royal', 'Lilac', 'Mauve', 'Plum', 'Indigo'],
  
  // Actions
  'win': ['Victory', 'Champ', 'First', 'Top', 'Best', 'Clutch', 'W', 'Ez', 'Dub', 'Triumph', 'Peak'],
  'kill': ['Slay', 'Frag', 'Elim', 'End', 'Reap', 'Hunt', 'Hit', 'Drop', 'Wipe', 'Murk', 'Clip'],

  // --- Game Specific Synonyms ---
  'dahood': ['Hood', 'Rev', 'Macro', 'Aim', 'Cash', 'Street', 'Bank', 'Lock', 'Clip', 'Mod', 'Wanted', 'Gang', 'Drill', 'Opp'],
  'bedwars': ['Bed', 'Rush', 'Wool', 'Void', 'Clutch', 'Defense', 'Solo', 'Squad', 'Break', 'Gen', 'Rusher', 'Bridge'],
  'bloxfruits': ['Pirate', 'Marine', 'Devil', 'Fruit', 'Sea', 'King', 'Bounty', 'Haki', 'Leopard', 'Awaken', 'Dough', 'Rubber'],
  'murdermystery2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma', 'Godly', 'Seer', 'Luger'],
  'mm2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma', 'Godly', 'Seer', 'Luger'],
  'petsim99': ['Pet', 'Huge', 'Titan', 'Gem', 'Egg', 'Lucky', 'Shiny', 'Titanic', 'Hatch', 'Fuse', 'Rainbow'],
  'brookhaven': ['Roleplay', 'House', 'Rich', 'City', 'Vibe', 'Mom', 'Dad', 'Kid', 'Baby', 'Fam', 'Rp'],
  'preppy': ['Xo', 'Prepp', 'Pink', 'Vibe', 'Luv', 'Heart', 'Star', 'Coco', 'Palm', 'Slay', 'Icon', 'Material'],
  'doors': ['Rush', 'Ambush', 'Figure', 'Seek', 'Eyes', 'Halt', 'Hotel', 'Room', 'Crucifix', 'Closet'],
  
  // --- TRENDING 2025/2026 ---
  'aura': ['Soul', 'Spirit', 'Vibe', 'Energy', 'Power', 'Glow', 'Halo', 'Divine', 'Presence', 'Radiance'],
  'sigma': ['Alpha', 'Wolf', 'Lone', 'Chad', 'Based', 'Peak', 'Prime', 'Boss', 'Mogger', 'Grind'],
  'coquette': ['Bow', 'Lace', 'Pearl', 'Doll', 'Pink', 'Soft', 'Girl', 'Angel', 'Ribbon', 'Ballet', 'Swan'],
  'rng': ['Luck', 'Roll', 'Spin', 'Chance', 'Fate', 'Dice', 'Rare', 'Exotic', 'Jackpot', 'Gamble'],
};

// Character substitution map
export const LEET_MAP: Record<string, string> = {
  'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'b': '8', 'g': '9', 'z': '2'
};

// Prefixes tailored to Roblox clans and status
export const CLAN_PREFIXES = [
  'Itz', 'TheReal', 'Just', 'iAm', 'Not', 'Only', 'Official', 'Captain', 
  'Pro', 'Im', 'Da', 'Yo', 'Mr', 'Ms', 'Ur', 'MyNameIs', 'ItsMe', 'CallMe',
  'Real', 'True', 'Dat', 'Tha', 'Le', 'Team', 'Club', 'Skt', 'Op',
  'Lil', 'Big', 'Fat', 'Bad', 'Sad', 'Mad', 'New', 'Old', 'Dr', 'Saint',
  'Chief', 'Boss', 'Main', 'Alt', 'Top', 'Low', 'High', 'Mid'
];

export const TITLES = [
  'Sir', 'Dr', 'Mr', 'Mrs', 'Miss', 'Lord', 'King', 'Queen', 'Prince', 'Duke', 
  'Chief', 'Boss', 'Saint', 'Kami', 'Senpai', 'Sama', 'Don', 'Master', 'Sensei',
  'Emperor', 'Empress', 'Baron', 'Count', 'Viceroy', 'Warlord', 'Admin', 'CEO',
  'Coach', 'Agent', 'Officer', 'Warden', 'Mayor', 'Judge', 'Pilot', 'Capt'
];

// Suffixes for gaming identity
export const GAMING_SUFFIXES = [
  'Blox', 'Plays', 'Gaming', 'YT', 'TV', 'Live', 'Rbx', 'Dev', 
  'Obby', 'Builds', 'Script', 'God', 'King', 'Queen', 'Vibes', 'Zone',
  'Verse', 'Nation', 'Squad', 'Gang', 'Clan', 'Hub', 'Central',
  'Playz', 'Games', 'Tube', 'Stream', 'Cast', 'Hq', 'Lab', 'Studios',
  'X', 'Z', 'V2', 'V3', 'Alt', 'Main', 'Base', 'Pro', 'Max', 'G', 'Gt',
  'O', 'A', 'Io', 'Ia', 'Iy', 'Yt', 'Ttv', 'W', 'L'
];

export const ACCOUNT_STATUS = [
  'Main', 'Alt', 'Priv', 'Private', 'Acc', 'Backup', 'Only', 'Xo', 'Lol', 'Ez',
  'Test', 'Dev', 'Admin', 'Guest', 'Vip', 'Banned', 'Lost', 'Found', 'W', 'L',
  'Afk', 'Brb', 'Bot', 'Ai', 'Npc', 'Og', 'New', 'Old', 'Raw'
];

export const VERBS = [
  'Eat', 'Love', 'Hate', 'Chase', 'Miss', 'Drop', 'Kick', 'Ban', 'Scare', 
  'Fix', 'Break', 'Find', 'Lost', 'Need', 'Want', 'See', 'Hear',
  'Run', 'Walk', 'Jump', 'Fly', 'Swim', 'Sleep', 'Wake', 'Win', 'Lose',
  'Hunt', 'Seek', 'Catch', 'Throw', 'Keep', 'Hold', 'Hack', 'Mog',
  'Cook', 'Serve', 'Main', 'Diff', 'Gap', 'Carry', 'Feed', 'Rush',
  'Tap', 'Click', 'View', 'Watch', 'Read', 'Spin', 'Roll'
];

export const COLORS = [
  'Red', 'Blu', 'Blue', 'Gue', 'Blk', 'Black', 'Wht', 'White', 'Pnk', 'Pink', 
  'Purp', 'Gold', 'Slvr', 'Cyan', 'Lime', 'Rose', 'Jade', 'Onyx', 'Crim', 
  'Azure', 'Teal', 'Gray', 'Grey', 'Neon', 'Dark', 'Light', 'Pale', 'Void',
  'Silver', 'Golden', 'Emerald', 'Ruby', 'Noir', 'Blanc', 'Bleu', 'Verd',
  'Amber', 'Coral', 'Hazel', 'Ivory', 'Mauve', 'Navy', 'Olive', 'Rust',
  'Cream', 'Beige', 'Tan', 'Sage', 'Mint', 'Lilac', 'Plum'
];

export const PVP_TERMS = [
  'Combo', 'Reach', 'Velocity', 'Bridge', 'Rush', 'Clutch', 'Aim', 'Click', 
  'Strafe', 'Macro', 'Lag', 'Ping', 'Sweat', 'Tryhard', 'Carry', 'Diff',
  'Crit', 'Dmg', 'Hacks', 'Mode', 'God', 'Pvp', '1v1', 'Solo', 'Clip',
  'Buff', 'Nerf', 'Meta', 'Ranked', 'Elo', 'Smurf', 'Main',
  'Tap', 'Stomp', 'Wiped', 'Ez', 'Ratio', 'Gap', 'Peek', 'Hold', 'Push',
  'Trade', 'Feed', 'Throw', 'Tilt', 'Toxic', 'Clean', 'Washed', 'Peak',
  'Aim', 'Sens', 'Fov', 'Res', 'Hz', 'Fps', 'Ms', 'Tick'
];

// New: Anime/Japanese terms (Very popular in Roblox)
export const JAPANESE_TERMS = [
  'Kami', 'Yami', 'Kage', 'Tsuki', 'Hikari', 'Ryu', 'Akuma', 'Tenshi', 
  'Sora', 'Shiro', 'Kuro', 'Hoshi', 'Neko', 'Inu', 'Kitsune', 'Baka',
  'Ken', 'Shin', 'Kai', 'Jin', 'Ren', 'Yuki', 'Hana', 'Sakura', 'Mochi',
  'Rai', 'Mizu', 'Kaze', 'Honoo', 'Zen', 'Ronin', 'Chakra', 'Oni',
  'Yurei', 'Yokai', 'Samurai', 'Shogun', 'Dojo', 'Katana', 'Kunai', 'Senpai',
  'Chibi', 'Kawaii', 'Desu', 'San', 'Chan', 'Kun', 'Sama'
];

// New: Foods (Great for Funny/Cute)
export const FOODS = [
  'Mochi', 'Sushi', 'Boba', 'Toast', 'Waffle', 'Cookie', 'Taco', 'Pizza', 
  'Ramen', 'Noodle', 'Bean', 'Potato', 'Mango', 'Peach', 'Berry', 'Melon',
  'Milk', 'Tea', 'Coffee', 'Cake', 'Pie', 'Bread', 'Soup', 'Egg', 'Rice',
  'Donut', 'Chip', 'Soda', 'Fizz', 'Tofu', 'Bento', 'Curry', 'Bun',
  'Choco', 'Cocoa', 'Latte', 'Matcha', 'Taro', 'Ube', 'Kiwi', 'Lime',
  'Lemon', 'Grape', 'Pear', 'Fig', 'Date', 'Nut', 'Jam', 'Jelly'
];

// New: Animals (Great for all categories depending on context)
export const ANIMALS = [
  'Panda', 'Koala', 'Axolotl', 'Capybara', 'Duck', 'Frog', 'Cat', 'Dog', 
  'Wolf', 'Fox', 'Bunny', 'Bear', 'Tiger', 'Lion', 'Dragon', 'Shark',
  'Doge', 'Shiba', 'Penguin', 'Owl', 'Bat', 'Snake', 'Rat', 'Mouse',
  'Crow', 'Raven', 'Eagle', 'Hawk', 'Swan', 'Dove', 'Deer', 'Fawn',
  'Sloth', 'Otter', 'Seal', 'Whale', 'Orca', 'Crab', 'Squid', 'Bee',
  'Wasp', 'Ant', 'Bug', 'Moth', 'Fly', 'Worm', 'Fish', 'Koi'
];

// New: Elements (Cool/Fantasy)
export const ELEMENTS = [
  'Fire', 'Ice', 'Void', 'Volt', 'Wind', 'Terra', 'Aqua', 'Solar', 'Lunar', 
  'Plasma', 'Shadow', 'Light', 'Dark', 'Frost', 'Burn', 'Ash', 'Spark',
  'Thunder', 'Storm', 'Flame', 'Blaze', 'Frozen', 'Crystal', 'Metal',
  'Ether', 'Chaos', 'Order', 'Flux', 'Vapor', 'Mist', 'Fog', 'Dust',
  'Iron', 'Steel', 'Gold', 'Silver', 'Copper', 'Zinc', 'Neon', 'Argon',
  'Carbon', 'Ozone', 'Acid', 'Base', 'Salt', 'Lava', 'Magma'
];

// New: Weapons (FPS/PVP)
export const WEAPONS = [
  'Katana', 'Scythe', 'Blade', 'Dagger', 'Glock', 'Sniper', 'Rifle', 'Bow', 
  'Arrow', 'Sword', 'Spear', 'Hammer', 'Axe', 'Mace', 'Staff', 'Wand',
  'Knife', 'Pistol', 'Revolver', 'Cannon', 'Bomb', 'Kunai', 'Shuriken',
  'Guns', 'Ammo', 'Clip', 'Mag', 'Scope', 'Sight', 'Trigger', 'Barrel',
  'Stock', 'Grip', 'Bolt', 'Pump', 'Auto', 'Semi', 'Burst'
];

// New: Y2K/Trendy Suffixes
export const Y2K_SUFFIXES = [
  'Wrld', 'Szn', 'Zone', 'Boi', 'Gurl', 'Luv', 'Xo', 'K', 'Z', 'Vibe', 'Core',
  'Planet', 'Star', 'Club', 'House', 'Gang', 'Mob', 'Cartel', 'Inc', 'Corp',
  'Web', 'Net', 'Sys', 'Lyfe', 'Files', 'Archive', 'Domain', 'Link', 'Data',
  'Hub', 'Lab', 'Base', 'Pad', 'Box', 'Space', 'Room', 'Area'
];

// New: Emotions (Edgy/Aesthetic)
export const EMOTIONS = [
  'Sad', 'Mad', 'Hype', 'Numb', 'Chill', 'Vibe', 'Happy', 'Angry', 'Lost', 
  'Dead', 'Alive', 'Rich', 'Broke', 'Tired', 'Woke', 'Alone', 'Lonely',
  'Dizzy', 'Faded', 'Wasted', 'High', 'Low', 'Empty', 'Hurt', 'Luv',
  'Envy', 'Greed', 'Lust', 'Pride', 'Sloth', 'Wrath', 'Gluttony', 
  'Cold', 'Frozen', 'Salty', 'Bitter', 'Sweet', 'Sour', 'Nervous',
  'Calm', 'Safe', 'Warm', 'Soft', 'Hard', 'Rough', 'Smooth'
];

// NEW: Mythical Creatures
export const MYTHICAL = [
  'Phoenix', 'Hydra', 'Griffin', 'Wyvern', 'Drake', 'Siren', 'Titan', 'Golem',
  'Valkyrie', 'Leviathan', 'Kraken', 'Cerberus', 'Chimera', 'Basilisk', 'Spirit',
  'Angel', 'Demon', 'Wraith', 'Specter', 'Ghoul', 'Ogre', 'Orc', 'Elf',
  'Fairy', 'Pixie', 'Nymph', 'Satyr', 'Djinn', 'Ifrit', 'Yeti', 'Sasquatch',
  'Banshee', 'Lich', 'Imp', 'Troll', 'Goblin', 'Dwarf', 'Giant'
];

// NEW: Tech/Glitch Terms
export const TECH = [
  'Glitch', 'System', 'Error', 'Cyber', 'Binary', 'Pixel', 'Data', 'Code',
  'Vector', 'Matrix', 'Logic', 'Bot', 'Admin', 'Root', 'Server', 'Proxy', 'Node',
  'Byte', 'Bit', 'Null', 'Void', 'Patch', 'Bug', 'Virus', '404', 'Hack',
  'Script', 'Java', 'Python', 'Html', 'Css', 'Sql', 'Bios', 'Dos',
  'Ram', 'Cpu', 'Gpu', 'Ping', 'Lan', 'Wan', 'Wifi', 'Sync'
];

// NEW: Astro/Cosmic Terms
export const ASTRO = [
  'Nebula', 'Quasar', 'Pulsar', 'Eclipse', 'Zenith', 'Vortex', 'Cosmos', 
  'Gravity', 'Orbit', 'Comet', 'Meteor', 'Asteroid', 'Galaxy', 'Star', 'Moon',
  'Nova', 'Solar', 'Lunar', 'Astro', 'Space', 'Alien', 'UFO', 'Event',
  'Horizon', 'Parallax', 'Stardust', 'Void', 'Abyss', 'Cluster',
  'Mars', 'Venus', 'Pluto', 'Saturn', 'Jupiter', 'Mercury', 'Titan'
];

// NEW: Urban / Street Terms (Da Hood Style)
export const URBAN = [
  'Block', 'Hood', 'Street', 'Road', 'Ave', 'Lane', 'Way', 'Endz',
  'Opp', 'Drill', 'Trap', 'Plug', 'Gang', 'Mob', 'Crew', 'Set',
  'Cash', 'Money', 'Bill', 'Coin', 'Bag', 'Stack', 'Rack', 'Band',
  'Drip', 'Fit', 'Ice', 'Chain', 'Watch', 'Ring', 'Grill', 'Kicks'
];

// NEW: Math / Geometry Terms (Sweaty Style)
export const MATH = [
  'Vertex', 'Apex', 'Axis', 'Grid', 'Plot', 'Graph', 'Point', 'Line',
  'Ray', 'Angle', 'Arc', 'Area', 'Vol', 'Mass', 'Atom', 'Cell',
  'Logic', 'Proof', 'Fact', 'Base', 'Root', 'Power', 'Exp', 'Log',
  'Sine', 'Cos', 'Tan', 'Limit', 'Delta', 'Sigma', 'Alpha', 'Beta'
];

// NEW: Fabric / Texture Terms (Aesthetic Style)
export const FABRIC = [
  'Silk', 'Satin', 'Lace', 'Velvet', 'Linen', 'Cotton', 'Wool', 'Fur',
  'Leather', 'Denim', 'Mesh', 'Nylon', 'Cashmere', 'Tweed', 'Felt',
  'Soft', 'Smooth', 'Rough', 'Hard', 'Plush', 'Fluffy', 'Fuzzy'
];

// --- TRENDS 2025/2026 ---

// Gen Alpha / Brainrot / Trending Slang (Use carefully)
export const GEN_ALPHA = [
  'Rizz', 'Sigma', 'Alpha', 'Mew', 'Mog', 'Skibidi', 'Fanum', 'Ohio', 
  'Grimace', 'Gyatt', 'Bop', 'Cap', 'Bet', 'Drip', 'Sheesh', 'Based', 
  'Giga', 'Peak', 'Mid', 'Aura', 'Tax', 'Lock', 'Cook', 'Glaze', 'Crashout',
  'Edge', 'Goon', 'Yap', 'Gatekeep', 'Girlboss', 'Slay'
];

// Coquette / Dollette / Fashion (Dress To Impress vibe)
export const COQUETTE = [
  'Bow', 'Lace', 'Pearl', 'Doll', 'Angel', 'Swan', 'Silk', 'Satin', 
  'Velvet', 'Lip', 'Gloss', 'Balm', 'Blush', 'Rose', 'Pink', 'Heart', 
  'Love', 'Kiss', 'Xo', 'Princess', 'Diva', 'Star', 'Glitter', 'Icon',
  'Bunny', 'Kitty', 'Ribbon', 'Dress', 'Skirt', 'Heel', 'Gown', 'Tiara'
];

// NEW: Preppy / Lifestyle (Berry Avenue vibe)
export const PREPPY = [
  'Smile', 'Happy', 'Preppy', 'Glow', 'Bright', 'Sunny', 'Beach', 'Palm', 
  'Coco', 'Lulu', 'Skincare', 'Mask', 'Serum', 'Routine', 'Vibe', 'Clean',
  'Basic', 'Trendy', 'Style', 'Fit', 'Ootd', 'Grwm', 'Lemon', 'Aloe'
];

// NEW: Grunge / Decay (Deepwoken vibe)
export const GRUNGE = [
  'Static', 'Noise', 'Blur', 'Grain', 'Dust', 'Rust', 'Pale', 'Dim', 
  'Grim', 'Rot', 'Ash', 'Bones', 'Skull', 'Chain', 'Spike', 'Wire', 
  'Bleach', 'Acid', 'Dirt', 'Mold', 'Scrap', 'Junk', 'Waste', 'Toxic'
];

// NEW: Short / Abstract (for OG Rarity)
export const SHORT_ABSTRACT = [
  'Vex', 'Zen', 'Kye', 'Lux', 'Jinx', 'Flux', 'Haze', 'Mist', 'Echo', 
  'Nova', 'Rift', 'Void', 'Arc', 'Era', 'Ion', 'Key', 'Law', 'Mix', 
  'Net', 'Orb', 'Pit', 'Raw', 'Set', 'Tag', 'Unit', 'Vet', 'War', 
  'Xray', 'Zone', 'Ace', 'Bit', 'Cpu', 'Dna', 'Ego', 'Fog', 'Gym'
];

// RNG / Luck Games (Sols RNG style)
export const RNG_LUCK = [
  'Exotic', 'Rare', 'Divine', 'Celestial', 'Arcane', 'Matrix', 'Glitch', 
  'Unbound', 'Impeached', 'Archangel', 'Abyssal', 'Galaxy', 'Lunar', 
  'Solar', 'Eclipse', 'Comet', 'Undead', 'Immortal', 'Chromatic',
  'Heavenly', 'Hellish', 'Cursed', 'Blessed', 'Gilded', 'Starlight', 'Hades'
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
    'Phantom', 'Shadow', 'Crystal', 'Final', 'Last', 'First', 'Only',
    'Mortal', 'Vital', 'Feral', 'Vicious', 'Brutal', 'Hostile', 'Wicked',
    ...RNG_LUCK, ...MATH, 'Based', 'Sigma' // Injecting new trends
  ],
  [NameStyle.FUNNY]: [
    'Soggy', 'Spicy', 'Derpy', 'Chubby', 'Wobbly', 'Salty', 'Grumpy', 'Lazy', 
    'Dizzy', 'Crazy', 'Sneaky', 'Cheesy', 'Bumpy', 'Noodle', 'Potato', 'Angry',
    'Laggy', 'Bacon', 'Noob', 'Oof', 'Sus', 'Crunchy', 'Floppy', 'Glitchy',
    'Bald', 'Stinky', 'Wet', 'Raw', 'Fried', 'Sticky', 'Confused', 'Lost',
    'Thicc', 'Smelly', 'Greasy', 'Moldy', 'Broken', 'Ugly', 'Fat',
    'Moist', 'Dank', 'Cringe', 'Yeet', 'Goofy', 'Silly', 'Dumb', 'Wacky',
    'Tubby', 'Flabby', 'Hairy', 'Karen', 'Boomer', 'Zoomer', 
    'Skibidi', 'Ohio', 'Rizz', 'Fanum', 'Glazed', 'Cooked' // Injecting Gen Alpha
  ],
  [NameStyle.CUTE]: [
    'Fluffy', 'Soft', 'Pastel', 'Sweet', 'Happy', 'Tiny', 'Sparkly', 'Milky', 
    'Cozy', 'Sunny', 'Honey', 'Bubbly', 'Dreamy', 'Starry', 'Lovely', 'Puffy',
    'Peachy', 'Cherry', 'Vanilla', 'Sugar', 'Pink', 'Cotton', 'Daisy',
    'Baby', 'Lil', 'Chibi', 'Smol', 'Velvet', 'Silky', 'Kawaii', 'Fuzzy',
    'Warm', 'Icy', 'Minty', 'Berry', 'Creamy', 'Lucky',
    'Cute', 'Precious', 'Gentle', 'Kind', 'Shy', 'Quiet', 'Rosy',
    'Fruity', 'Flower', 'Little', 'Small', 'Petite', 'Mini',
    ...COQUETTE, ...FABRIC, ...PREPPY // Injecting Coquette, Fabric and Preppy terms
  ],
  [NameStyle.EDGY]: [
    'Cursed', 'Broken', 'Lost', 'Dead', 'Grim', 'Fallen', 'Hollow', 'Void', 
    'Abyss', 'Evil', 'Pain', 'Sorrow', 'Fear', 'Doom', 'Hate', 'Lone',
    'Blood', 'Dark', 'Sad', 'Numb', 'Toxic', 'Rage', 'Cryptic',
    'Empty', 'Cold', 'Hurt', 'Gone', 'Away', 'Left', 'Right', 'Wrong',
    'Sick', 'Mad', 'Insane', 'Psycho', 'Demon', 'Devil', 'Hell',
    'Vile', 'Wicked', 'Cruel', 'Brutal', 'Savage', 'Fatal', 'Mortal',
    'Tragic', 'Gloom', 'Bleak', 'Dire', 'Sinister', 'Vamp', 'Opium',
    'Goth', 'Emo', 'Punk', 'Noir', 'Ash', 'Dust', 'Rot', 'Decay',
    ...GRUNGE, ...URBAN // Inject Grunge and Urban
  ],
  [NameStyle.AESTHETIC]: [
    'pure', 'soft', 'calm', 'retro', 'vintage', 'lofi', 'pale', 'divine', 
    'rare', 'silk', 'velvet', 'dim', 'lost', 'fair', 'warm', 'luxe', 
    'bliss', 'haze', 'muse', 'nova', 'sol',
    'sage', 'teal', 'beige', 'fawn', 'dove', 'swan', 'mist', 'fog',
    'dew', 'rain', 'snow', 'wind', 'air', 'sky', 'cloud',
    'ethereal', 'serene', 'tranquil', 'lucid', 'dreamy', 'faded',
    'nostalgic', 'golden', 'silver', 'ivory', 'ebony', 'classic',
    'coquette', 'dollette', 'angelic', 'iconic', 'floral', 'leafy',
    ...FABRIC, ...PREPPY, ...GRUNGE // Inject fabrics, preppy and grunge into Aesthetic
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil',
    'Sky', 'Sea', 'Air', 'Ash', 'Ink', 'Oil', 'Gas', 'Gem', 'Orb', 'Arc', 'Era', 'Ego',
    'Run', 'Fly', 'Sit', 'Hit', 'Cut', 'Mix', 'Fix', 'Top', 'Pop', 'Win', 'Sin'
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
    'Rage', 'Doom', 'Fate', 'Destiny', 'Glory', 'Honor', 'Valor', 'Power',
    'Aura', 'Sigma', 'Rizz', 'Lock', 'Vandal', 'Raider', 'Bandit', 'Revenant',
    ...URBAN, ...MATH, ...SHORT_ABSTRACT // Inject Urban, Math and Short Abstract nouns
  ],
  [NameStyle.FUNNY]: [
    'Potato', 'Banana', 'Noodle', 'Toaster', 'Fridge', 'Pickle', 'Waffle', 'Pancake',
    'Biscuit', 'Cookie', 'Muffin', 'Cupcake', 'Donut', 'Taco', 'Burrito', 'Pizza',
    'Burger', 'Sandwich', 'Hotdog', 'Chicken', 'Duck', 'Goose', 'Penguin', 'Panda',
    'Koala', 'Sloth', 'Llama', 'Alpaca', 'Goat', 'Sheep', 'Cow', 'Pig', 'Frog',
    'Toad', 'Turtle', 'Snail', 'Worm', 'Bug', 'Fly', 'Bee', 'Ant', 'Spider',
    'Clown', 'Joker', 'Meme', 'Noob', 'Bot', 'Glitch', 'Error', 'Fail', 'Trash',
    'Rizzler', 'Grimace', 'Ohio', 'Cap', 'Tax', 'Toilet', 'Skibidi'
  ],
  [NameStyle.CUTE]: [
    'Bunny', 'Kitty', 'Puppy', 'Panda', 'Koala', 'Bear', 'Fox', 'Wolf', 'Tiger',
    'Lion', 'Cat', 'Dog', 'Mouse', 'Hamster', 'Rabbit', 'Deer', 'Fawn', 'Duck',
    'Chick', 'Bird', 'Owl', 'Penguin', 'Seal', 'Whale', 'Dolphin', 'Fish',
    'Star', 'Moon', 'Sun', 'Cloud', 'Rain', 'Snow', 'Flower', 'Rose', 'Lily',
    'Tulip', 'Daisy', 'Lotus', 'Cherry', 'Berry', 'Peach', 'Apple', 'Cookie',
    'Cake', 'Pie', 'Candy', 'Sugar', 'Sweet', 'Honey', 'Love', 'Heart',
    'Bow', 'Pearl', 'Doll', 'Angel', 'Princess', 'Fairy', 'Pixie', 'Nymph'
  ],
  [NameStyle.EDGY]: [
    'Pain', 'Hate', 'Fear', 'Sorrow', 'Grief', 'Despair', 'Agony', 'Misery', 'Torment',
    'Death', 'Life', 'Soul', 'Spirit', 'Ghost', 'Shadow', 'Darkness', 'Void', 'Abyss',
    'Hell', 'Demon', 'Devil', 'Satan', 'Lucifer', 'Evil', 'Sin', 'Blood', 'Gore',
    'Kill', 'Murder', 'Slaughter', 'Massacre', 'War', 'Battle', 'Fight', 'Conflict',
    'Chaos', 'Anarchy', 'Riot', 'Rebel', 'Outlaw', 'Criminal', 'Villain', 'Enemy',
    'Traitor', 'Liar', 'Cheat', 'Thief', 'Killer', 'Psycho', 'Maniac', 'Lunatic',
    'Vamp', 'Narcist', 'Rick', 'Raf', 'Carti', 'Goth', 'Scare', 'Fright',
    ...URBAN // Inject Urban here too
  ],
  [NameStyle.AESTHETIC]: [
    'Vibe', 'Mood', 'Soul', 'Mind', 'Thought', 'Dream', 'Wish', 'Hope', 'Faith',
    'Love', 'Life', 'World', 'Space', 'Time', 'Light', 'Dark', 'Night', 'Day',
    'Sky', 'Sea', 'Ocean', 'River', 'Lake', 'Forest', 'Tree', 'Leaf', 'Flower',
    'Garden', 'Field', 'Meadow', 'Mountain', 'Hill', 'Valley', 'Desert', 'Sand',
    'Dust', 'Wind', 'Breeze', 'Air', 'Cloud', 'Mist', 'Fog', 'Rain', 'Storm',
    'Thunder', 'Lightning', 'Star', 'Moon', 'Sun', 'Planet', 'Galaxy', 'Universe',
    'Aura', 'Icon', 'Muse', 'Grace', 'Petal', 'Bloom', 'Blossom', 'Fern', 'Ivy', 'Moss', 'Willow'
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil',
    'Sky', 'Sea', 'Air', 'Ash', 'Ink', 'Oil', 'Gas', 'Gem', 'Orb', 'Arc', 'Era', 'Ego',
    'Run', 'Fly', 'Sit', 'Hit', 'Cut', 'Mix', 'Fix', 'Top', 'Pop', 'Win', 'Sin',
    ...SHORT_ABSTRACT // Inject Short Abstract into OG nouns
  ],
  [NameStyle.MIXED]: []
};