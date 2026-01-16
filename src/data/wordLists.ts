import { NameStyle } from "../types";

// Smart Synonyms for better keyword integration
export const SYNONYMS: Record<string, string[]> = {
  // Elements & Nature
  'fire': ['Flame', 'Inferno', 'Pyro', 'Burn', 'Heat', 'Ash', 'Blaze', 'Ember', 'Ignis', 'Scorch', 'Flare', 'Magma', 'Cinder', 'Coal', 'Spark', 'Fuego', 'Solar', 'Arson'],
  'ice': ['Frost', 'Cold', 'Frozen', 'Chill', 'Glacier', 'Snow', 'Arctic', 'Cryo', 'Shiver', 'Hail', 'Sleet', 'Polar', 'Rime', 'Winter', 'Zero', 'Icey', 'Cool'],
  'dark': ['Shadow', 'Void', 'Night', 'Black', 'Abyss', 'Gloom', 'Obsidian', 'Dusk', 'Umbra', 'Shade', 'Eclipse', 'Pitch', 'Onyx', 'Grim', 'Murk', 'Noir', 'Null', 'Vantablack', 'Nox', 'Ebon'],
  'light': ['Sun', 'Ray', 'Bright', 'Glow', 'Shine', 'Solar', 'Lumen', 'Dawn', 'Lux', 'Flash', 'Beam', 'Radiance', 'Halo', 'Glory', 'Day', 'Spark', 'Volt', 'Prism'],
  'water': ['Aqua', 'Hydro', 'Tide', 'Wave', 'Ocean', 'Sea', 'Mist', 'Rain', 'Storm', 'Surge', 'Ripple', 'Flow', 'Drip', 'Soak', 'Liquid', 'Vapor', 'Fluid', 'Mar'],
  'earth': ['Terra', 'Gaia', 'Stone', 'Rock', 'Dust', 'Sand', 'Quake', 'Root', 'Geo', 'Fossil', 'Granite', 'Slate', 'Clay', 'Ores', 'Gem', 'Mud', 'Dirt'],
  'air': ['Wind', 'Aero', 'Sky', 'Breeze', 'Gust', 'Zephyr', 'Gale', 'Cloud', 'Mist', 'Vapor', 'Ether', 'Drift', 'Float', 'Soar', 'Oxygen', 'Ciel'],
  
  // Space & Sci-Fi
  'star': ['Astral', 'Cosmic', 'Nova', 'Nebula', 'Galaxy', 'Stellar', 'Comet', 'Orbit', 'Pulsar', 'Quasar', 'Zodiac', 'Astro', 'Spark', 'Wish', 'Constellation'],
  'nebula': ['Cosmic', 'Galaxy', 'Void', 'Star', 'Nova', 'Astro', 'Space', 'Orbit', 'Vortex', 'Quasar', 'Nebulous', 'Cluster', 'Dust', 'Helix'],
  'space': ['Cosmos', 'Galaxy', 'Universe', 'Void', 'Star', 'Astro', 'Lunar', 'Solar', 'Horizon', 'Infinity', 'Deep', 'Exo', 'Alien', 'Outer'],
  'cyber': ['Tech', 'Glitch', 'Digital', 'Neon', 'Bot', 'System', 'Data', 'Code', 'Binary', 'Net', 'Grid', 'Link', 'Node', 'Main', 'Root', 'Web', 'Synth', 'Mech', 'Chrome'],
  'system': ['OS', 'Root', 'Admin', 'Cyber', 'Core', 'Main', 'Bot', 'Glitch', 'Server', 'Node', 'Proxy', 'Terminal', 'Host', 'Bios', 'Kernel', 'Shell'],
  'magic': ['Spell', 'Hex', 'Rune', 'Mana', 'Arcane', 'Wiz', 'Mage', 'Charm', 'Curse', 'Mystic', 'Aura', 'Witch', 'Occult', 'Omen', 'Fate', 'Voodoo', 'Alchemy'],
  
  // Status & Power
  'god': ['Lord', 'King', 'Deity', 'Divine', 'Apex', 'Titan', 'Ruler', 'Zeus', 'Odin', 'Legend', 'Myth', 'Idol', 'Kami', 'Saint', 'Boss', 'Hero', 'Creator', 'Deus'],
  'king': ['Lord', 'God', 'Prince', 'Royal', 'Crown', 'Ruler', 'Boss', 'Chief', 'Emperor', 'Monarch', 'Sovereign', 'Rex', 'Heir', 'Duke', 'Baron'],
  'pro': ['Elite', 'Sweat', 'God', 'King', 'Chief', 'Main', 'Boss', 'Tryhard', 'Carry', 'Goat', 'Vet', 'Mvp', 'Comp', 'Ranked', 'Top', 'Peak', 'Cracked'],
  'noob': ['Bot', 'Guest', 'Bacon', 'Newb', 'Trash', 'Bad', 'Lag', 'Bronze', 'Scrub', 'Dogwater', 'Npc', 'Farm', 'Alt', 'Default'],
  'fast': ['Quick', 'Swift', 'Dash', 'Bolt', 'Flash', 'Speed', 'Turbo', 'Mach', 'Rapid', 'Sonic', 'Velocity', 'Haste', 'Rush', 'Zoom', 'Sprint'],
  'strong': ['Titan', 'Might', 'Power', 'Force', 'Heavy', 'Tank', 'Buff', 'Iron', 'Steel', 'Muscle', 'Giga', 'Bulk', 'Hard', 'Solid'],
  'rich': ['Lux', 'Gold', 'Cash', 'Rich', 'Wealth', 'Banks', 'Mint', 'Bill', 'Fund', 'Asset', 'Paid', 'Euro', 'Band'],
  
  // Gaming Roles & Genres
  'ninja': ['Shinobi', 'Shadow', 'Assassin', 'Rogue', 'Silent', 'Blade', 'Kage', 'Ronin', 'Samurai', 'Vanish', 'Stealth', 'Ghost', 'Kunai'],
  'knight': ['Warrior', 'Paladin', 'Guard', 'Hero', 'Blade', 'Sword', 'Lancer', 'Templar', 'Warden', 'Squire', 'Honor', 'Chevalier'],
  'wizard': ['Mage', 'Spell', 'Witch', 'Hex', 'Arcane', 'Mystic', 'Sorcerer', 'Warlock', 'Druid', 'Sage', 'Seer', 'Magus'],
  'horror': ['Fear', 'Scare', 'Creep', 'Spook', 'Grim', 'Terror', 'Haunt', 'Ghost', 'Entity', 'Cryptid', 'Panic', 'Evil', 'Dead', 'Scream'],
  'music': ['Bass', 'Beat', 'Audio', 'Sound', 'Vibe', 'Rhythm', 'Note', 'Tune', 'Track', 'Phonk', 'Song', 'Hype', 'Melody', 'Tempo'],
  
  // Aesthetics & Feminine Terms
  'beauty': ['Belle', 'Muse', 'Venus', 'Luxe', 'Glow', 'Grace', 'Vogue', 'Diva', 'Pure', 'Rose', 'Aura', 'Glam', 'Chic', 'Bae', 'Icon', 'Star', 'Charm', 'Angel', 'Lovely', 'Allure'],
  'pretty': ['Cute', 'Soft', 'Glow', 'Lovely', 'Sweet', 'Angel', 'Doll', 'Fair', 'Charm', 'Bloom', 'Petal', 'Honey'],
  'cute': ['Kawaii', 'Tiny', 'Soft', 'Sweet', 'Baby', 'Lil', 'Mini', 'Chibi', 'Pup', 'Kit', 'Bun', 'Bean'],
  'girl': ['Babe', 'Doll', 'Gal', 'Lass', 'Miss', 'Chick', 'Bae', 'Maid', 'Diva', 'Queen', 'Lady', 'Fem', 'Woman', 'Her'],
  'boy': ['Guy', 'Man', 'Lad', 'Bro', 'Dude', 'King', 'Prince', 'Him', 'Sir', 'Mr', 'Gent', 'Male'],
  'queen': ['Royal', 'Regal', 'Highness', 'Majesty', 'Empress', 'Reina', 'Monarch', 'Lady', 'Duchess', 'Princess', 'Ruler'],
  'love': ['Luv', 'Heart', 'Amour', 'Soul', 'Kiss', 'Xo', 'Bae', 'Dear', 'Wish', 'Hope', 'Crush', 'Feels'],

  // Common Search Terms
  'cool': ['Chill', 'Dope', 'Fresh', 'Icy', 'Lit', 'Rad', 'Sick', 'Fly', 'Cold', 'Based', 'Epic', 'Raw'],
  'gamer': ['Player', 'User', 'Pro', 'Noob', 'Sweat', 'Bot', 'Main', 'Alt', 'Grinder', 'Tryhard'],

  // Animals
  'cat': ['Kitty', 'Neko', 'Feline', 'Purr', 'Meow', 'Paws', 'Whiskers', 'Kitten', 'Tabby', 'Lynx', 'Mew', 'Kat', 'Mog'],
  'dog': ['Puppy', 'Inu', 'Wolf', 'Bark', 'Doge', 'Hound', 'K9', 'Pooch', 'Husky', 'Pug', 'Mutt', 'Pup', 'Canine'],
  'dragon': ['Wyvern', 'Drake', 'Draco', 'Fire', 'Beast', 'Hydra', 'Serpent', 'Scale', 'Breath', 'Wing', 'Fang', 'Ryu'],
  
  // Colors
  'red': ['Crimson', 'Ruby', 'Blood', 'Scarlet', 'Rose', 'Cherry', 'Mars', 'Rust', 'Maroon', 'Brick', 'Redd', 'Vermilion'],
  'blue': ['Azure', 'Cyan', 'Teal', 'Aqua', 'Sapphire', 'Sky', 'Ocean', 'Cobalt', 'Indigo', 'Navy', 'Denim', 'Bluey'],
  'green': ['Lime', 'Jade', 'Emerald', 'Toxic', 'Viper', 'Mint', 'Leaf', 'Sage', 'Olive', 'Fern', 'Pine', 'Moss', 'Verdant'],
  'black': ['Dark', 'Void', 'Shadow', 'Night', 'Ink', 'Coal', 'Onyx', 'Jet', 'Raven', 'Obsidian', 'Pitch', 'Noir', 'Ebony'],
  'white': ['Pale', 'Snow', 'Cloud', 'Pearl', 'Ivory', 'Ghost', 'Blank', 'Bone', 'Frost', 'Chalk', 'Milk', 'Blanc', 'Alabaster'],
  'gold': ['Midas', 'Rich', 'Lux', 'Royal', 'Gilded', 'Aura', 'Solar', 'Golden', 'Brass', 'Amber', 'Coin', 'Bullion'],
  'pink': ['Rose', 'Sakura', 'Coral', 'Blush', 'Peach', 'Magenta', 'Fuchsia', 'Berry', 'Cotton', 'Candy', 'Luv', 'Barbie'],
  'purple': ['Violet', 'Amethyst', 'Lavender', 'Grape', 'Royal', 'Lilac', 'Mauve', 'Plum', 'Indigo', 'Haze', 'Orchid'],
  
  // Actions
  'win': ['Victory', 'Champ', 'First', 'Top', 'Best', 'Clutch', 'W', 'Ez', 'Dub', 'Triumph', 'Peak', 'Gap'],
  'kill': ['Slay', 'Frag', 'Elim', 'End', 'Reap', 'Hunt', 'Hit', 'Drop', 'Wipe', 'Murk', 'Clip', 'Tap', 'Zap'],

  // --- Game Specific Synonyms ---
  'dahood': ['Hood', 'Rev', 'Macro', 'Aim', 'Cash', 'Street', 'Bank', 'Lock', 'Clip', 'Mod', 'Wanted', 'Gang', 'Drill', 'Opp', 'Spin'],
  'bedwars': ['Bed', 'Rush', 'Wool', 'Void', 'Clutch', 'Defense', 'Solo', 'Squad', 'Break', 'Gen', 'Rusher', 'Bridge', 'Tap'],
  'bloxfruits': ['Pirate', 'Marine', 'Devil', 'Fruit', 'Sea', 'King', 'Bounty', 'Haki', 'Leopard', 'Awaken', 'Dough', 'Rubber', 'Race', 'Kitsune', 'T-Rex', 'Mammoth', 'Sound', 'Spirit'],
  'murdermystery2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma', 'Godly', 'Seer', 'Luger', 'Ice', 'Radio'],
  'mm2': ['Sheriff', 'Murder', 'Knife', 'Gun', 'Mystery', 'Elite', 'Chroma', 'Godly', 'Seer', 'Luger', 'Ice', 'Radio'],
  'petsim99': ['Pet', 'Huge', 'Titan', 'Gem', 'Egg', 'Lucky', 'Shiny', 'Titanic', 'Hatch', 'Fuse', 'Rainbow', 'Trade'],
  'brookhaven': ['Roleplay', 'House', 'Rich', 'City', 'Vibe', 'Mom', 'Dad', 'Kid', 'Baby', 'Fam', 'Rp', 'Life'],
  'preppy': ['Xo', 'Prepp', 'Pink', 'Vibe', 'Luv', 'Heart', 'Star', 'Coco', 'Palm', 'Slay', 'Icon', 'Material', 'Glow'],
  'doors': ['Rush', 'Ambush', 'Figure', 'Seek', 'Eyes', 'Halt', 'Hotel', 'Room', 'Crucifix', 'Closet', 'Key'],
  
  // --- TRENDING 2025/2026 ---
  'aura': ['Soul', 'Spirit', 'Vibe', 'Energy', 'Power', 'Glow', 'Halo', 'Divine', 'Presence', 'Radiance', 'Chi'],
  'sigma': ['Alpha', 'Wolf', 'Lone', 'Chad', 'Based', 'Peak', 'Prime', 'Boss', 'Mogger', 'Grind', 'Hustle'],
  'coquette': ['Bow', 'Lace', 'Pearl', 'Doll', 'Pink', 'Soft', 'Girl', 'Angel', 'Ribbon', 'Ballet', 'Swan', 'Ballet'],
  'rng': ['Luck', 'Roll', 'Spin', 'Chance', 'Fate', 'Dice', 'Rare', 'Exotic', 'Jackpot', 'Gamble', 'Bet', 'Undefined', 'Arcane', 'Matrix', 'Glitch'],
};

// Character substitution map
export const LEET_MAP: Record<string, string> = {
  'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'b': '8', 'g': '9', 'z': '2'
};

export const TITLES = [
  'Sir', 'Dr', 'Mr', 'Mrs', 'Miss', 'Lord', 'King', 'Queen', 'Prince', 'Duke', 
  'Chief', 'Boss', 'Saint', 'Kami', 'Senpai', 'Sama', 'Don', 'Master', 'Sensei',
  'Emperor', 'Empress', 'Baron', 'Count', 'Viceroy', 'Warlord', 'Admin', 'CEO',
  'Coach', 'Agent', 'Officer', 'Warden', 'Mayor', 'Judge', 'Pilot', 'Capt',
  'Pre', 'Pro', 'Og', 'The', 'Da', 'El', 'La', 'Lil', 'Big', 'Young', 'Capn', 'Its'
];

export const ACCOUNT_STATUS = [
  'Main', 'Alt', 'Priv', 'Private', 'Acc', 'Backup', 'Only', 'Xo', 'Lol', 'Ez',
  'Test', 'Dev', 'Admin', 'Guest', 'Vip', 'Banned', 'Lost', 'Found', 'W', 'L',
  'Afk', 'Brb', 'Bot', 'Ai', 'Npc', 'Og', 'New', 'Old', 'Raw', 'Hub', 'Lab', 'Rbx'
];

export const CLEAN_SUFFIXES = [
  'Mode', 'Flow', 'State', 'Arc', 'Way', 'Path', 'Cast', 'Set', 'Rise', 'Fall',
  'Peak', 'Dash', 'Loop', 'Link', 'Sync', 'Grid', 'Node', 'Core', 'Base', 'Hub',
  'Zone', 'Area', 'Side', 'View', 'Vision', 'Mind', 'Soul', 'Pulse', 'Vibe',
  'Era', 'Age', 'Gen', 'Ops', 'Law', 'Rule', 'Code', 'Key', 'Ace', 'Mix', 'Log',
  'Dot', 'Net', 'Sys', 'Box', 'Bit', 'Byte', 'Tag', 'Var', 'Let', 'Run', 'Opt'
];

export const VERBS = [
  'Eat', 'Love', 'Hate', 'Chase', 'Miss', 'Drop', 'Kick', 'Ban', 'Scare', 
  'Fix', 'Break', 'Find', 'Lost', 'Need', 'Want', 'See', 'Hear',
  'Run', 'Walk', 'Jump', 'Fly', 'Swim', 'Sleep', 'Wake', 'Win', 'Lose',
  'Hunt', 'Seek', 'Catch', 'Throw', 'Keep', 'Hold', 'Hack', 'Mog',
  'Cook', 'Serve', 'Main', 'Diff', 'Gap', 'Carry', 'Feed', 'Rush',
  'Tap', 'Click', 'View', 'Watch', 'Read', 'Spin', 'Roll', 'Clip',
  'Lock', 'Peek', 'Swing', 'Beam', 'Wipe', 'Fold', 'Solo', 'Own',
  'Poke', 'Prod', 'Snap', 'Clap', 'Slap', 'Punch', 'Bite', 'Hide'
];

export const COLORS = [
  'Red', 'Blu', 'Blue', 'Gue', 'Blk', 'Black', 'Wht', 'White', 'Pnk', 'Pink', 
  'Purp', 'Gold', 'Slvr', 'Cyan', 'Lime', 'Rose', 'Jade', 'Onyx', 'Crim', 
  'Azure', 'Teal', 'Gray', 'Grey', 'Neon', 'Dark', 'Light', 'Pale', 'Void',
  'Silver', 'Golden', 'Emerald', 'Ruby', 'Noir', 'Blanc', 'Bleu', 'Verd',
  'Amber', 'Coral', 'Hazel', 'Ivory', 'Mauve', 'Navy', 'Olive', 'Rust',
  'Cream', 'Beige', 'Tan', 'Sage', 'Mint', 'Lilac', 'Plum', 'Iris', 'Zinc',
  'Copper', 'Bronze', 'Chrome', 'Metal', 'Ash', 'Coal', 'Snow', 'Ice'
];

export const PVP_TERMS = [
  'Combo', 'Reach', 'Velocity', 'Bridge', 'Rush', 'Clutch', 'Aim', 'Click', 
  'Strafe', 'Macro', 'Lag', 'Ping', 'Sweat', 'Tryhard', 'Carry', 'Diff',
  'Crit', 'Dmg', 'Hacks', 'Mode', 'God', 'Pvp', '1v1', 'Solo', 'Clip',
  'Buff', 'Nerf', 'Meta', 'Ranked', 'Elo', 'Smurf', 'Main',
  'Tap', 'Stomp', 'Wiped', 'Ez', 'Ratio', 'Gap', 'Peek', 'Hold', 'Push',
  'Trade', 'Feed', 'Throw', 'Tilt', 'Toxic', 'Clean', 'Washed', 'Peak',
  'Aim', 'Sens', 'Fov', 'Res', 'Hz', 'Fps', 'Ms', 'Tick',
  // EXPANDED PVP
  'Lock', 'Beam', 'Prefire', 'Jitter', 'Butterfly', 'Drag', 'Bhop',
  'Hit', 'Miss', 'Dodge', 'Block', 'Parry', 'Counter', 'Stun', 'Void',
  'Bed', 'Egg', 'Flag', 'Cap', 'Base', 'Mid', 'Top', 'Low', 'High',
  'Def', 'Atk', 'Hp', 'Xp', 'Lvl', 'Afk', 'Dc', 'Gg', 'Gf'
];

export const JAPANESE_TERMS = [
  'Kami', 'Yami', 'Kage', 'Tsuki', 'Hikari', 'Ryu', 'Akuma', 'Tenshi', 
  'Sora', 'Shiro', 'Kuro', 'Hoshi', 'Neko', 'Inu', 'Kitsune', 'Baka',
  'Ken', 'Shin', 'Kai', 'Jin', 'Ren', 'Yuki', 'Hana', 'Sakura', 'Mochi',
  'Rai', 'Mizu', 'Kaze', 'Honoo', 'Zen', 'Ronin', 'Chakra', 'Oni',
  'Yurei', 'Yokai', 'Samurai', 'Shogun', 'Dojo', 'Katana', 'Kunai', 'Senpai',
  'Chibi', 'Kawaii', 'Desu', 'San', 'Chan', 'Kun', 'Sama',
  // EXPANDED ANIME
  'Bankai', 'Haki', 'Nen', 'Quirk', 'Stand', 'Ghoul', 'Titan', 'Slayer',
  'Hashira', 'Hokage', 'Sensei', 'Genin', 'Jonnin', 'Anbu', 'Akatsuki',
  'Manga', 'Otaku', 'Weeb', 'Waifu', 'Husbando', 'Isekai'
];

export const FOODS = [
  'Mochi', 'Sushi', 'Boba', 'Toast', 'Waffle', 'Cookie', 'Taco', 'Pizza', 
  'Ramen', 'Noodle', 'Bean', 'Potato', 'Mango', 'Peach', 'Berry', 'Melon',
  'Milk', 'Tea', 'Coffee', 'Cake', 'Pie', 'Bread', 'Soup', 'Egg', 'Rice',
  'Donut', 'Chip', 'Soda', 'Fizz', 'Tofu', 'Bento', 'Curry', 'Bun',
  'Choco', 'Cocoa', 'Latte', 'Matcha', 'Taro', 'Ube', 'Kiwi', 'Lime',
  'Lemon', 'Grape', 'Pear', 'Fig', 'Date', 'Nut', 'Jam', 'Jelly',
  'Honey', 'Sugar', 'Salt', 'Pepper', 'Spice', 'Chili', 'Mint', 'Basil',
  'Oreo', 'Fries', 'Steak', 'Beef', 'Pork', 'Fish', 'Wings', 'Sauce'
];

export const ANIMALS = [
  'Panda', 'Koala', 'Axolotl', 'Capybara', 'Duck', 'Frog', 'Cat', 'Dog', 
  'Wolf', 'Fox', 'Bunny', 'Bear', 'Tiger', 'Lion', 'Dragon', 'Shark',
  'Doge', 'Shiba', 'Penguin', 'Owl', 'Bat', 'Snake', 'Rat', 'Mouse',
  'Crow', 'Raven', 'Eagle', 'Hawk', 'Swan', 'Dove', 'Deer', 'Fawn',
  'Sloth', 'Otter', 'Seal', 'Whale', 'Orca', 'Crab', 'Squid', 'Bee',
  'Wasp', 'Ant', 'Bug', 'Moth', 'Fly', 'Worm', 'Fish', 'Koi',
  'Viper', 'Cobra', 'Python', 'Mamba', 'Falcon', 'Crane', 'Stag', 'Boar',
  'Gecko', 'Toad', 'Newt', 'Lizard', 'Dino', 'Rex', 'Raptor'
];

export const ELEMENTS = [
  'Fire', 'Ice', 'Void', 'Volt', 'Wind', 'Terra', 'Aqua', 'Solar', 'Lunar', 
  'Plasma', 'Shadow', 'Light', 'Dark', 'Frost', 'Burn', 'Ash', 'Spark',
  'Thunder', 'Storm', 'Flame', 'Blaze', 'Frozen', 'Crystal', 'Metal',
  'Ether', 'Chaos', 'Order', 'Flux', 'Vapor', 'Mist', 'Fog', 'Dust',
  'Iron', 'Steel', 'Gold', 'Silver', 'Copper', 'Zinc', 'Neon', 'Argon',
  'Carbon', 'Ozone', 'Acid', 'Base', 'Salt', 'Lava', 'Magma',
  'Aero', 'Hydro', 'Pyro', 'Cryo', 'Geo', 'Electro', 'Dendro', 'Anemo'
];

export const WEAPONS = [
  'Katana', 'Scythe', 'Blade', 'Dagger', 'Glock', 'Sniper', 'Rifle', 'Bow', 
  'Arrow', 'Sword', 'Spear', 'Hammer', 'Axe', 'Mace', 'Staff', 'Wand',
  'Knife', 'Pistol', 'Revolver', 'Cannon', 'Bomb', 'Kunai', 'Shuriken',
  'Guns', 'Ammo', 'Clip', 'Mag', 'Scope', 'Sight', 'Trigger', 'Barrel',
  'Stock', 'Grip', 'Bolt', 'Pump', 'Auto', 'Semi', 'Burst',
  'Uzi', 'Ak47', 'M4', 'Scar', 'Deagle', 'Awp', 'Smg', 'Lmg', 'Rpg',
  'Shotty', 'Snipe', 'Melee', 'Fist', 'Claw', 'Taser', 'Nuke'
];

export const Y2K_SUFFIXES = [
  'Wrld', 'Szn', 'Zone', 'Boi', 'Gurl', 'Luv', 'Xo', 'K', 'Z', 'Vibe', 'Core',
  'Planet', 'Star', 'Club', 'House', 'Gang', 'Mob', 'Cartel', 'Inc', 'Corp',
  'Web', 'Net', 'Sys', 'Lyfe', 'Files', 'Archive', 'Domain', 'Link', 'Data',
  'Hub', 'Lab', 'Base', 'Pad', 'Box', 'Space', 'Room', 'Area',
  'Ware', 'Soft', 'Byte', 'Log', 'Exe', 'Png', 'Jpg', 'Mp3', 'Wav', 'Css',
  'Html', 'Xml', 'Php', 'Sql', 'Api', 'Sdk', 'Jar', 'Zip', 'Rar', 'Iso',
  'Dll', 'Bat', 'Cmd', 'Bin', 'Hex', 'Rgb', 'Hsv', 'Vhs', 'Dvd', 'Cd'
];

export const EMOTIONS = [
  'Sad', 'Mad', 'Hype', 'Numb', 'Chill', 'Vibe', 'Happy', 'Angry', 'Lost', 
  'Dead', 'Alive', 'Rich', 'Broke', 'Tired', 'Woke', 'Alone', 'Lonely',
  'Dizzy', 'Faded', 'Wasted', 'High', 'Low', 'Empty', 'Hurt', 'Luv',
  'Envy', 'Greed', 'Lust', 'Pride', 'Sloth', 'Wrath', 'Gluttony', 
  'Cold', 'Frozen', 'Salty', 'Bitter', 'Sweet', 'Sour', 'Nervous',
  'Calm', 'Safe', 'Warm', 'Soft', 'Hard', 'Rough', 'Smooth',
  'Manic', 'Panic', 'Quiet', 'Silent', 'Loud', 'Mute', 'Blind', 'Deaf',
  'Dumb', 'Smart', 'Wiz', 'Fool', 'Jolly', 'Grim', 'Stern'
];

export const MYTHICAL = [
  'Phoenix', 'Hydra', 'Griffin', 'Wyvern', 'Drake', 'Siren', 'Titan', 'Golem',
  'Valkyrie', 'Leviathan', 'Kraken', 'Cerberus', 'Chimera', 'Basilisk', 'Spirit',
  'Angel', 'Demon', 'Wraith', 'Specter', 'Ghoul', 'Ogre', 'Orc', 'Elf',
  'Fairy', 'Pixie', 'Nymph', 'Satyr', 'Djinn', 'Ifrit', 'Yeti', 'Sasquatch',
  'Banshee', 'Lich', 'Imp', 'Troll', 'Goblin', 'Dwarf', 'Giant',
  'Kami', 'Yokai', 'Oni', 'Tengu', 'Kappa', 'Kitsune', 'Ryu', 'Kirin',
  'Medusa', 'Pegasus', 'Sphinx', 'Cyclops', 'Minotaur', 'Dryad'
];

export const TECH = [
  'Glitch', 'System', 'Error', 'Cyber', 'Binary', 'Pixel', 'Data', 'Code',
  'Vector', 'Matrix', 'Logic', 'Bot', 'Admin', 'Root', 'Server', 'Proxy', 'Node',
  'Byte', 'Bit', 'Null', 'Void', 'Patch', 'Bug', 'Virus', '404', 'Hack',
  'Script', 'Java', 'Python', 'Html', 'Css', 'Sql', 'Bios', 'Dos',
  'Ram', 'Cpu', 'Gpu', 'Ping', 'Lan', 'Wan', 'Wifi', 'Sync',
  'Login', 'Logout', 'User', 'Pass', 'Key', 'Token', 'Auth', 'Hash',
  'Cookie', 'Cache', 'Stack', 'Heap', 'Queue', 'Array', 'Loop'
];

export const ASTRO = [
  'Nebula', 'Quasar', 'Pulsar', 'Eclipse', 'Zenith', 'Vortex', 'Cosmos', 
  'Gravity', 'Orbit', 'Comet', 'Meteor', 'Asteroid', 'Galaxy', 'Star', 'Moon',
  'Nova', 'Solar', 'Lunar', 'Astro', 'Space', 'Alien', 'UFO', 'Event',
  'Horizon', 'Parallax', 'Stardust', 'Void', 'Abyss', 'Cluster',
  'Mars', 'Venus', 'Pluto', 'Saturn', 'Jupiter', 'Mercury', 'Titan',
  'Orion', 'Lyra', 'Vega', 'Altair', 'Sirius', 'Rigel', 'Betel', 'Draco'
];

export const URBAN = [
  'Block', 'Hood', 'Street', 'Road', 'Ave', 'Lane', 'Way', 'Endz',
  'Opp', 'Drill', 'Trap', 'Plug', 'Gang', 'Mob', 'Crew', 'Set',
  'Cash', 'Money', 'Bill', 'Coin', 'Bag', 'Stack', 'Rack', 'Band',
  'Drip', 'Fit', 'Ice', 'Chain', 'Watch', 'Ring', 'Grill', 'Kicks',
  'Slime', 'Twin', 'Cuz', 'Fam', 'Bros', 'Homie', 'Gang', 'Squad'
];

export const MATH = [
  'Vertex', 'Apex', 'Axis', 'Grid', 'Plot', 'Graph', 'Point', 'Line',
  'Ray', 'Angle', 'Arc', 'Area', 'Vol', 'Mass', 'Atom', 'Cell',
  'Logic', 'Proof', 'Fact', 'Base', 'Root', 'Power', 'Exp', 'Log',
  'Sine', 'Cos', 'Tan', 'Limit', 'Delta', 'Sigma', 'Alpha', 'Beta',
  'Gamma', 'Omega', 'Theta', 'Zeta', 'Pi', 'Rho', 'Tau', 'Phi',
  'Sum', 'Add', 'Sub', 'Div', 'Mod', 'Calc', 'Stat', 'Mean'
];

export const FABRIC = [
  'Silk', 'Satin', 'Lace', 'Velvet', 'Linen', 'Cotton', 'Wool', 'Fur',
  'Leather', 'Denim', 'Mesh', 'Nylon', 'Cashmere', 'Tweed', 'Felt',
  'Soft', 'Smooth', 'Rough', 'Hard', 'Plush', 'Fluffy', 'Fuzzy',
  'Chiffon', 'Crepe', 'Rayon', 'Suede', 'Vinyl', 'Latex'
];

// Gen Alpha / Brainrot / Trending Slang
export const GEN_ALPHA = [
  'Rizz', 'Sigma', 'Alpha', 'Mew', 'Mog', 'Skibidi', 'Fanum', 'Ohio', 
  'Grimace', 'Gyatt', 'Bop', 'Cap', 'Bet', 'Drip', 'Sheesh', 'Based', 
  'Giga', 'Peak', 'Mid', 'Aura', 'Tax', 'Lock', 'Cook', 'Glaze', 'Crashout',
  'Edge', 'Goon', 'Yap', 'Gatekeep', 'Girlboss', 'Slay', 'Ratio', 'W', 'L'
];

export const COQUETTE = [
  'Bow', 'Lace', 'Pearl', 'Doll', 'Angel', 'Swan', 'Silk', 'Satin', 
  'Velvet', 'Lip', 'Gloss', 'Balm', 'Blush', 'Rose', 'Pink', 'Heart', 
  'Love', 'Kiss', 'Xo', 'Princess', 'Diva', 'Star', 'Glitter', 'Icon',
  'Bunny', 'Kitty', 'Ribbon', 'Dress', 'Skirt', 'Heel', 'Gown', 'Tiara',
  'Fairytale', 'Coquette', 'Dollette', 'Ballerina', 'Tutu', 'Sparkle'
];

export const PREPPY = [
  'Smile', 'Happy', 'Preppy', 'Glow', 'Bright', 'Sunny', 'Beach', 'Palm', 
  'Coco', 'Lulu', 'Skincare', 'Mask', 'Serum', 'Routine', 'Vibe', 'Clean',
  'Basic', 'Trendy', 'Style', 'Fit', 'Ootd', 'Grwm', 'Lemon', 'Aloe',
  'Hydro', 'Stanley', 'Ugg', 'Lululemon', 'Starbucks', 'Target', 'Sephora'
];

export const GRUNGE = [
  'Static', 'Noise', 'Blur', 'Grain', 'Dust', 'Rust', 'Pale', 'Dim', 
  'Grim', 'Rot', 'Ash', 'Bones', 'Skull', 'Chain', 'Spike', 'Wire', 
  'Bleach', 'Acid', 'Dirt', 'Mold', 'Scrap', 'Junk', 'Waste', 'Toxic',
  'Grunge', 'Punk', 'Emo', 'Goth', 'Alt', 'Dark', 'Core', 'Drain'
];

// --- NEW ADVANCED WORD LISTS FOR OPTIMIZATION ---

// 1. Phonetic Aesthetics
export const HARD_SOUNDS = ['Vex', 'Krix', 'Zot', 'Jinx', 'Flux', 'Tek', 'Rox', 'Koz', 'Dax', 'Trix', 'Grox', 'Vix', 'Bix', 'Qex', 'Zax', 'Kax'];
export const SOFT_SOUNDS = ['Lull', 'Sawn', 'Mellow', 'Willow', 'Halo', 'Aura', 'Muse', 'Lune', 'Sol', 'Vell', 'Lua', 'Noa', 'Ello', 'Amor', 'Fleur'];

// 2. Foreign Flair (Latin/French/German)
export const LATIN_ROOTS = ['Lux', 'Nox', 'Ignis', 'Aqua', 'Terra', 'Vita', 'Mors', 'Bellum', 'Rex', 'Pax', 'Umbra', 'Lumen', 'Astra', 'Volo', 'Sol'];
export const FOREIGN_COOL = ['Noir', 'Blanc', 'Nacht', 'Tot', 'Mort', 'Sang', 'Luz', 'Cielo', 'Rojo', 'Azul', 'Kuro', 'Shiro', 'Yami', 'Hana'];

// 3. Micro-Aesthetics
export const OPIUM_VAMP = ['Vamp', 'Carti', 'Opium', 'Narcist', 'Slay3r', 'Whole', 'Lotta', 'Red', 'Punk', 'Rock', 'Star', 'Vamps', 'Die', 'Lit'];
export const BLOKECORE = ['United', 'City', 'FC', 'Real', 'Inter', 'Sporting', 'Athletic', 'Goal', 'Kit', 'Jersey', 'Baller', 'Striker', 'Tekkers'];
export const ACUBI_Y2K = ['Chrome', 'Diesel', 'Basic', 'Archive', 'Sub', 'Liquid', 'Metal', 'Acid', 'Base', 'Layer', 'Mesh', 'Top', 'Wear'];

// 4. Pseudo-Word Components (CVC Construction)
export const PSEUDO_PREFIX = ['Br', 'Kr', 'St', 'Z', 'V', 'Tr', 'Gr', 'Ph', 'X', 'Qu', 'Dr', 'Kl', 'Pr', 'Sn', 'Sp'];
export const PSEUDO_SUFFIX = ['ax', 'ex', 'iz', 'oz', 'ux', 'ix', 'yr', 'or', 'aq', 'ez', 'ox', 'yx', 'io', 'ia'];

// 5. Suffix Engineering
export const ORG_SUFFIXES = ['Corp', 'Inc', 'Gang', 'Mob', 'Cult', 'Clan', 'Unit', 'Sect', 'Firm', 'Ltd', 'Co', 'Grp', 'Sys'];
export const STATE_SUFFIXES = ['Mode', 'Vibe', 'Era', 'Arc', 'Zone', 'Phase', 'Mood', 'Core', 'State', 'Verse', 'Land', 'Wrld'];

// EXPANDED: Short / Abstract (Crucial for "Sweaty" & "OG" Rarity)
export const SHORT_ABSTRACT = [
  'Vex', 'Zen', 'Kye', 'Lux', 'Jinx', 'Flux', 'Haze', 'Mist', 'Echo', 
  'Nova', 'Rift', 'Void', 'Arc', 'Era', 'Ion', 'Key', 'Law', 'Mix', 
  'Net', 'Orb', 'Pit', 'Raw', 'Set', 'Tag', 'Unit', 'Vet', 'War', 
  'Xray', 'Zone', 'Ace', 'Bit', 'Cpu', 'Dna', 'Ego', 'Fog', 'Gym',
  'Hex', 'Ink', 'Jet', 'Kit', 'Lab', 'Map', 'Nix', 'Opt', 'Pax',
  'Qat', 'Red', 'Spy', 'Tab', 'Urn', 'Van', 'Web', 'Yes', 'Zip',
  'Axe', 'Bow', 'Cry', 'Dry', 'Eye', 'Fly', 'Guy', 'Hue', 'Ice',
  'Joy', 'Key', 'Lie', 'Max', 'New', 'Old', 'Pie', 'Que', 'Run',
  'See', 'Tea', 'Use', 'Via', 'Way', 'Xis', 'Yet', 'Zoo',
  'Axel', 'Bane', 'Cole', 'Dusk', 'Edge', 'Faze', 'Grim', 'Hawk',
  'Iron', 'Jade', 'Kane', 'Link', 'Mace', 'Nero', 'Onyx', 'Pace',
  'Quake', 'Rain', 'Sage', 'Tale', 'Urge', 'Vain', 'Wake', 'Xeno',
  'Yolo', 'Zeal', 'Aris', 'Brix', 'Crux', 'Drax', 'Elex', 'Flyn',
  'Grix', 'Hylx', 'Irix', 'Jinx', 'Kryx', 'Lynx', 'Myrx', 'Nyx',
  'Orix', 'Pyrex', 'Qrix', 'Ryze', 'Synd', 'Trax', 'Urix', 'Vryx',
  'Wryx', 'Xyl', 'Yrix', 'Zyl', 'Kio', 'Zio', 'Rio', 'Vio', 'Neo',
  // HUGE EXPANSION FOR VARIETY
  'Vow', 'Oath', 'Plea', 'Debt', 'Loan', 'Wage', 'Gain', 'Loss', 'Cost', 
  'Fund', 'Cash', 'Coin', 'Gold', 'Luck', 'Fate', 'Doom', 'Wish', 'Hope', 
  'Plan', 'Idea', 'Mind', 'Soul', 'Guts', 'Bone', 'Skin', 'Face', 'Hand', 
  'Foot', 'Head', 'Eye', 'Ear', 'Nose', 'Vibe', 'Zest', 'Pulse', 'Rift',
  'Glow', 'Fame', 'Hype', 'Mood', 'Peak', 'Pure', 'Rare', 'Real', 'Safe', 
  'Sick', 'Solo', 'Vain', 'Warm', 'Wild', 'Zero', 'Ash', 'Dust', 'Mud',
  'Sand', 'Soil', 'Rock', 'Gem', 'Air', 'Sky', 'Sea', 'Sun', 'Moon',
  'Star', 'Mars', 'Zeus', 'Thor', 'Odin', 'Loki', 'Ra', 'Isis',
  'Ares', 'Hera', 'Eros', 'Pan', 'Sif', 'Tyr', 'Nox', 'Lux', 'Pax',
  // MORE RARE TERMS
  'Ion', 'Atom', 'Nucl', 'Cell', 'Volt', 'Watt', 'Ohm', 'Amp',
  'Byte', 'Bit', 'Baud', 'Ping', 'Lag', 'Net', 'Web', 'Sys',
  'Cmd', 'Exe', 'Bat', 'Dll', 'Rgb', 'Hsv', 'Cmy', 'Hex'
];

export const RNG_LUCK = [
  'Exotic', 'Rare', 'Divine', 'Celestial', 'Arcane', 'Matrix', 'Glitch', 
  'Unbound', 'Impeached', 'Archangel', 'Abyssal', 'Galaxy', 'Lunar', 
  'Solar', 'Eclipse', 'Comet', 'Undead', 'Immortal', 'Chromatic',
  'Heavenly', 'Hellish', 'Cursed', 'Blessed', 'Gilded', 'Starlight', 'Hades',
  'Zeus', 'Poseidon', 'Odin', 'Thor', 'Loki', 'Anubis', 'Ra', 'Osiris'
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
    'Grim', 'Vile', 'Dire', 'Null', 'Void', 'Blank', 'Raw', 'Pure',
    ...RNG_LUCK, ...MATH, 'Based', 'Sigma', 'Alpha', 'Lone', 'Cold',
    ...HARD_SOUNDS, ...OPIUM_VAMP
  ],
  [NameStyle.FUNNY]: [
    'Soggy', 'Spicy', 'Derpy', 'Chubby', 'Wobbly', 'Salty', 'Grumpy', 'Lazy', 
    'Dizzy', 'Crazy', 'Sneaky', 'Cheesy', 'Bumpy', 'Noodle', 'Potato', 'Angry',
    'Laggy', 'Bacon', 'Noob', 'Oof', 'Sus', 'Crunchy', 'Floppy', 'Glitchy',
    'Bald', 'Stinky', 'Wet', 'Raw', 'Fried', 'Sticky', 'Confused', 'Lost',
    'Thicc', 'Smelly', 'Greasy', 'Moldy', 'Broken', 'Ugly', 'Fat',
    'Moist', 'Dank', 'Cringe', 'Yeet', 'Goofy', 'Silly', 'Dumb', 'Wacky',
    'Tubby', 'Flabby', 'Hairy', 'Karen', 'Boomer', 'Zoomer', 
    'Skibidi', 'Ohio', 'Rizz', 'Fanum', 'Glazed', 'Cooked', 'Sus', 'Baka'
  ],
  [NameStyle.CUTE]: [
    'Fluffy', 'Soft', 'Pastel', 'Sweet', 'Happy', 'Tiny', 'Sparkly', 'Milky', 
    'Cozy', 'Sunny', 'Honey', 'Bubbly', 'Dreamy', 'Starry', 'Lovely', 'Puffy',
    'Peachy', 'Cherry', 'Vanilla', 'Sugar', 'Pink', 'Cotton', 'Daisy',
    'Baby', 'Lil', 'Chibi', 'Smol', 'Velvet', 'Silky', 'Kawaii', 'Fuzzy',
    'Warm', 'Icy', 'Minty', 'Berry', 'Creamy', 'Lucky',
    'Cute', 'Precious', 'Gentle', 'Kind', 'Shy', 'Quiet', 'Rosy',
    'Fruity', 'Flower', 'Little', 'Small', 'Petite', 'Mini',
    'Angel', 'Doll', 'Love', 'Heart', 'Kiss', 'Hug', 'Xo',
    ...COQUETTE, ...FABRIC, ...PREPPY, ...SOFT_SOUNDS
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
    'Deadly', 'Killer', 'Murder', 'Death', 'Die', 'Kill', 'End',
    ...GRUNGE, ...URBAN, ...OPIUM_VAMP
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
    'poet', 'art', 'film', 'cam', 'polaroid', 'vinyl', 'cd', 'tape',
    'Petal', 'Bloom', 'Leaf', 'Stem', 'Root', 'Seed', 'Soil', 'Dirt', 'Mud', 
    'Rock', 'Stone', 'Gem', 'Jewel', 'Opal', 'Ruby', 'Jade', 'Onyx', 'Pearl',
    ...FABRIC, ...SOFT_SOUNDS, ...ACUBI_Y2K, ...FOREIGN_COOL
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil',
    'Sky', 'Sea', 'Air', 'Ash', 'Ink', 'Oil', 'Gas', 'Gem', 'Orb', 'Arc', 'Era', 'Ego',
    'Run', 'Fly', 'Sit', 'Hit', 'Cut', 'Mix', 'Fix', 'Top', 'Pop', 'Win', 'Sin',
    ...SHORT_ABSTRACT, ...LATIN_ROOTS, ...FOREIGN_COOL
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
    'Ronin', 'Shogun', 'Sensei', 'Kage', 'Shinobi', 'Samurai', 'Yakuza',
    'Cobra', 'Python', 'Mamba', 'Serpent', 'Hydra', 'Drake', 'Wyvern',
    ...URBAN, ...MATH, ...SHORT_ABSTRACT, ...TECH, ...BLOKECORE, ...HARD_SOUNDS
  ],
  [NameStyle.FUNNY]: [
    'Potato', 'Banana', 'Noodle', 'Toaster', 'Fridge', 'Pickle', 'Waffle', 'Pancake',
    'Biscuit', 'Cookie', 'Muffin', 'Cupcake', 'Donut', 'Taco', 'Burrito', 'Pizza',
    'Burger', 'Sandwich', 'Hotdog', 'Chicken', 'Duck', 'Goose', 'Penguin', 'Panda',
    'Koala', 'Sloth', 'Llama', 'Alpaca', 'Goat', 'Sheep', 'Cow', 'Pig', 'Frog',
    'Toad', 'Turtle', 'Snail', 'Worm', 'Bug', 'Fly', 'Bee', 'Ant', 'Spider',
    'Clown', 'Joker', 'Meme', 'Noob', 'Bot', 'Glitch', 'Error', 'Fail', 'Trash',
    'Rizzler', 'Grimace', 'Ohio', 'Cap', 'Tax', 'Toilet', 'Skibidi',
    'Man', 'Dude', 'Bro', 'Guy', 'Karen', 'Kevin', 'Chad', 'Kyle'
  ],
  [NameStyle.CUTE]: [
    'Bunny', 'Kitty', 'Puppy', 'Panda', 'Koala', 'Bear', 'Fox', 'Wolf', 'Tiger',
    'Lion', 'Cat', 'Dog', 'Mouse', 'Hamster', 'Rabbit', 'Deer', 'Fawn', 'Duck',
    'Chick', 'Bird', 'Owl', 'Penguin', 'Seal', 'Whale', 'Dolphin', 'Fish',
    'Star', 'Moon', 'Sun', 'Cloud', 'Rain', 'Snow', 'Flower', 'Rose', 'Lily',
    'Tulip', 'Daisy', 'Lotus', 'Cherry', 'Berry', 'Peach', 'Apple', 'Cookie',
    'Cake', 'Pie', 'Candy', 'Sugar', 'Sweet', 'Honey', 'Love', 'Heart',
    'Bow', 'Pearl', 'Doll', 'Angel', 'Princess', 'Fairy', 'Pixie', 'Nymph',
    'Dream', 'Wish', 'Hope', 'Sky', 'Mist', 'Dew', 'Glow', 'Shine'
  ],
  [NameStyle.EDGY]: [
    'Pain', 'Hate', 'Fear', 'Sorrow', 'Grief', 'Despair', 'Agony', 'Misery', 'Torment',
    'Death', 'Life', 'Soul', 'Spirit', 'Ghost', 'Shadow', 'Darkness', 'Void', 'Abyss',
    'Hell', 'Demon', 'Devil', 'Satan', 'Lucifer', 'Evil', 'Sin', 'Blood', 'Gore',
    'Kill', 'Murder', 'Slaughter', 'Massacre', 'War', 'Battle', 'Fight', 'Conflict',
    'Chaos', 'Anarchy', 'Riot', 'Rebel', 'Outlaw', 'Criminal', 'Villain', 'Enemy',
    'Traitor', 'Liar', 'Cheat', 'Thief', 'Killer', 'Psycho', 'Maniac', 'Lunatic',
    'Vamp', 'Narcist', 'Rick', 'Raf', 'Carti', 'Goth', 'Scare', 'Fright',
    'Corpse', 'Skull', 'Bone', 'Grave', 'Tomb', 'Coffin', 'Crypt', 'Morgue',
    ...URBAN, ...GRUNGE, ...LATIN_ROOTS
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
    'poet', 'art', 'film', 'cam', 'polaroid', 'vinyl', 'cd', 'tape',
    'Petal', 'Bloom', 'Leaf', 'Stem', 'Root', 'Seed', 'Soil', 'Dirt', 'Mud', 
    'Rock', 'Stone', 'Gem', 'Jewel', 'Opal', 'Ruby', 'Jade', 'Onyx', 'Pearl',
    ...FABRIC, ...SOFT_SOUNDS
  ],
  [NameStyle.OG]: [
    'Guy', 'Boy', 'Man', 'Girl', 'God', 'Dog', 'Cat', 'Fox', 'Bot', 'Ace', 
    'King', 'Queen', 'Lord', 'Box', 'Hat', 'Cap', 'Cop', 'Dad', 'Mom',
    'Sir', 'Bro', 'Sis', 'Fam', 'Pal', 'Bud', 'Mate', 'Lad',
    'One', 'Two', 'Red', 'Blue', 'Big', 'Lil',
    'Sky', 'Sea', 'Air', 'Ash', 'Ink', 'Oil', 'Gas', 'Gem', 'Orb', 'Arc', 'Era', 'Ego',
    'Run', 'Fly', 'Sit', 'Hit', 'Cut', 'Mix', 'Fix', 'Top', 'Pop', 'Win', 'Sin',
    ...SHORT_ABSTRACT, ...LATIN_ROOTS, ...FOREIGN_COOL
  ],
  [NameStyle.MIXED]: []
};
