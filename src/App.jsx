import { useState, useRef, useEffect, useMemo } from "react";

// ================= GAME DATA =================
const ELEMENTS = {
  fire:   { name: "Fire",   color: "#FF6B3D", icon: "▲" },
  ice:    { name: "Ice",    color: "#5FC1E8", icon: "◆" },
  nature: { name: "Nature", color: "#72C063", icon: "❋" },
  arcane: { name: "Arcane", color: "#B07FF5", icon: "✶" },
};

const SKIN_TONES = [
  { id: "skin_fair",  name: "Fair",  skin: "#F3C79E", skinD: "#DBA97D" },
  { id: "skin_tan",   name: "Tan",   skin: "#E0A874", skinD: "#C08A55" },
  { id: "skin_olive", name: "Olive", skin: "#C68642", skinD: "#A66A2E" },
  { id: "skin_deep",  name: "Deep",  skin: "#8D5524", skinD: "#6E3F16" },
  { id: "skin_ebony", name: "Ebony", skin: "#5C3A21", skinD: "#432A17" },
];
const HAIR_COLORS = [
  { id: "hair_white",   name: "White",   hair: "#F4F1EA", hairD: "#D9D2C2" },
  { id: "hair_gray",    name: "Gray",    hair: "#B9B4A8", hairD: "#96917F" },
  { id: "hair_brown",   name: "Brown",   hair: "#6B4A2F", hairD: "#4E3520" },
  { id: "hair_black",   name: "Black",   hair: "#2B2622", hairD: "#1A1714" },
  { id: "hair_ginger",  name: "Ginger",  hair: "#B5602E", hairD: "#8C441E" },
  { id: "hair_blonde",  name: "Blonde",  hair: "#E8C86A", hairD: "#BF9F43" },
  { id: "hair_crimson", name: "Crimson", hair: "#962338", hairD: "#661322" },
  { id: "hair_violet",  name: "Violet",  hair: "#7C3AED", hairD: "#5B21B6" },
];
const HAIR_STYLES = [
  { id: "hair_wavy",    name: "Wavy Locks" },
  { id: "hair_short",   name: "Mage Crop" },
  { id: "hair_long",    name: "Flowing Long" },
  { id: "hair_topknot", name: "Scholar Knot" },
  { id: "hair_wild",    name: "Arcane Wild" },
  { id: "hair_braids",  name: "Twin Braids" },
  { id: "hair_bob",     name: "Mystic Bob" },
];
const BEARD_STYLES = [
  { id: "beard_long",    name: "Elder Long" },
  { id: "beard_short",   name: "Boxed Short" },
  { id: "beard_stubble", name: "Stubble" },
  { id: "beard_braided", name: "Twin Braided" },
  { id: "beard_goatee",  name: "Goatee" },
  { id: "beard_none",    name: "Clean Shaven" },
];
const EYE_COLORS = [
  { id: "eye_dark",   name: "Dark",    color: "#2B2430" },
  { id: "eye_blue",   name: "Blue",    color: "#3D6B8A" },
  { id: "eye_green",  name: "Green",   color: "#4A7A4A" },
  { id: "eye_amber",  name: "Amber",   color: "#A8712E" },
  { id: "eye_violet", name: "Violet",  color: "#8E5FD1" },
  { id: "eye_ruby",   name: "Crimson", color: "#B91C1C" },
];
const GENDERS = [
  { id: "gender_male",   name: "Male" },
  { id: "gender_female", name: "Female" },
];
const FACES = [
  { id: "face_round", name: "Round", noseRx: 11, noseRy: 9,  eyeR: 7.2, chinWidth: 30, jawDrop: 0 },
  { id: "face_slim",  name: "Slim",  noseRx: 8,  noseRy: 11, eyeR: 6.5, chinWidth: 20, jawDrop: 3 },
  { id: "face_soft",  name: "Soft",  noseRx: 9.5,noseRy: 8.5,eyeR: 7.8, chinWidth: 26, jawDrop: -1 },
  { id: "face_sharp", name: "Sharp", noseRx: 7.5,noseRy: 12, eyeR: 6.2, chinWidth: 16, jawDrop: 4 },
];
const EARRINGS = [
  { id: "earring_none",   name: "None" },
  { id: "earring_gold",   name: "Gold Studs",   color: "#E8B44F", hoop: false },
  { id: "earring_silver", name: "Silver Hoops", color: "#C9CDD6", hoop: true },
  { id: "earring_ruby",   name: "Ruby Drops",   color: "#E11D48", drop: true },
];
const NOSE_RINGS = [
  { id: "nosering_none",   name: "None" },
  { id: "nosering_gold",   name: "Gold Stud",   color: "#E8B44F", ring: false },
  { id: "nosering_silver", name: "Silver Ring", color: "#C9CDD6", ring: true },
];

const RARITY = {
  common:    { label: "Common",    color: "#9AA0B4", glow: "none" },
  rare:      { label: "Rare",      color: "#4FA3E8", glow: "0 0 10px #4FA3E855" },
  epic:      { label: "Epic",      color: "#B07FF5", glow: "0 0 12px #B07FF566" },
  legendary: { label: "Legendary", color: "#E8B44F", glow: "0 0 16px #E8B44F77" },
};

const SKILLS = [
  { id: "fireball",  name: "Fireball",    el: "fire",   dmg: 26, mana: 18, cd: 0, desc: "Heavy. May Burn." },
  { id: "emberjab",  name: "Ember Jab",   el: "fire",   dmg: 13, mana: 8,  cd: 0, desc: "Cheap fire strike." },
  { id: "frostlance",name: "Frost Lance", el: "ice",    dmg: 26, mana: 18, cd: 0, desc: "Heavy. May Chill." },
  { id: "iceshard",  name: "Ice Shard",   el: "ice",    dmg: 13, mana: 8,  cd: 0, desc: "Cheap ice strike." },
  { id: "thorns",    name: "Wild Thorns", el: "nature", dmg: 26, mana: 18, cd: 0, desc: "Heavy. May Entangle." },
  { id: "saplife",   name: "Sap Life",    el: "nature", dmg: 12, mana: 14, cd: 0, heal: 12, desc: "Drain 12 HP, heal 12." },
  { id: "bolt",      name: "Arcane Bolt", el: "arcane", dmg: 17, mana: 10, cd: 0, desc: "Reliable neutral hit." },
  { id: "ward",      name: "Runic Ward",  el: "arcane", dmg: 0,  mana: 12, cd: 3, shield: 22, desc: "Shield 22 dmg. CD 3." },
  { id: "surge",     name: "Mana Surge",  el: "arcane", dmg: 0,  mana: 0,  cd: 3, restore: 26, desc: "Restore 26 mana. CD 3." },
];
const FOCUS = { id: "focus", name: "Focus", el: "arcane", dmg: 0, mana: 0, cd: 0, restore: 14, desc: "Recover 14 mana." };

const STAFFS = [
  { id: "ashwood",    name: "Ashwood Staff",     rarity: "common",    el: "fire",   elBonus: 0.12, desc: "+12% Fire damage" },
  { id: "frostbound", name: "Frostbound Rod",    rarity: "rare",      el: "ice",    elBonus: 0.15, regen: 2, desc: "+15% Ice dmg · +2 mana/turn" },
  { id: "verdant",    name: "Verdant Branch",    rarity: "rare",      el: "nature", elBonus: 0.12, healBonus: 0.35, desc: "+12% Nature dmg · +35% healing" },
  { id: "voidglass",  name: "Voidglass Scepter", rarity: "epic",      el: "arcane", allDmg: 0.10, crit: 8, desc: "+10% all damage · +8% crit" },
  { id: "sunfire",    name: "Sunfire Relicstaff",rarity: "legendary", el: "fire",   elBonus: 0.22, burnChance: 25, desc: "+22% Fire dmg · +25% Burn chance" },
];
const RELICS = [
  { id: "none",      name: "No relic",       rarity: "common", desc: "—" },
  { id: "manapearl", name: "Mana Pearl",     rarity: "common",    regen: 3, desc: "+3 mana per turn" },
  { id: "foxcharm",  name: "Foxfire Charm",  rarity: "rare",      crit: 10, desc: "+10% critical chance" },
  { id: "wardsigil", name: "Ward Sigil",     rarity: "rare",      startShield: 12, desc: "Begin duels with a 12 shield" },
  { id: "phoenix",   name: "Phoenix Feather",rarity: "legendary", revive: true, desc: "Survive a fatal blow once (20 HP)" },
];
const HATS = [
  { id: "hat_pointed", name: "Pointed Hat",       rarity: "common" },
  { id: "hat_hood",    name: "Mystic Hood",       rarity: "rare" },
  { id: "hat_wide",    name: "Starfall Brim",     rarity: "epic" },
  { id: "hat_crown",   name: "Archon Crown",      rarity: "legendary" },
  { id: "hat_circlet", name: "Enchanted Circlet", rarity: "rare" },
];
const AURAS = [
  { id: "aura_none",    name: "No aura",       rarity: "common",    color: null },
  { id: "aura_ember",   name: "Ember Aura",    rarity: "rare",      color: "#FF6B3D" },
  { id: "aura_frost",   name: "Frost Aura",    rarity: "rare",      color: "#5FC1E8" },
  { id: "aura_void",    name: "Void Aura",     rarity: "epic",      color: "#B07FF5" },
  { id: "aura_radiant", name: "Radiant Aura",  rarity: "legendary", color: "#E8B44F" },
];
const CAPES = [
  { id: "cape_none",   name: "No cape",           rarity: "common",    color: null, desc: "—" },
  { id: "cape_travel", name: "Traveler's Cloak",  rarity: "rare",      color: "#7A6A52", dark: "#5E5140" },
  { id: "cape_shadow", name: "Shadowweave Drape", rarity: "rare",      color: "#3D3466", dark: "#28223F" },
  { id: "cape_star",   name: "Starweave Mantle",  rarity: "epic",      color: "#8E5FD1", dark: "#5F3F94" },
  { id: "cape_phoenix",name: "Phoenixwing Cloak", rarity: "legendary", color: "#E85A3D", dark: "#B03D24" },
  { id: "wings_angel", name: "Angel Wings",       rarity: "legendary", color: "#F5F0E6", dark: "#D9CFC0", desc: "Seraphic plumage radiating divine starlight" },
  { id: "wings_demon", name: "Demon Wings",       rarity: "legendary", color: "#4A1F1F", dark: "#240D0D", desc: "Draconic bone and leathery infernal membranes" },
  { id: "wings_phoenix",name: "Phoenix Wings",    rarity: "legendary", color: "#FF5722", dark: "#991B1B", desc: "Blazing solar plumage forged in primal fire" },
  { id: "wings_fae",   name: "Prismatic Fae Wings", rarity: "legendary", color: "#38BDF8", dark: "#7C3AED", desc: "Gossamer crystal wings humming with wild magic" },
];
const ROBES = [
  { id: "robe_classic",  name: "Classic Robe",  rarity: "common",    colors: null, desc: "—" },
  { id: "robe_midnight", name: "Midnight Robe", rarity: "rare",      colors: { robe: "#2B2447", dark: "#1C1833", light: "#4A4488" } },
  { id: "robe_ivory",    name: "Ivory Robe",    rarity: "rare",      colors: { robe: "#EDE6D6", dark: "#C9BFA8", light: "#FFFBF0" } },
  { id: "robe_crimson",  name: "Crimson Robe",  rarity: "epic",      colors: { robe: "#8B1E3F", dark: "#5C1329", light: "#C44368" } },
  { id: "robe_gilded",   name: "Gilded Robe",   rarity: "legendary", colors: { robe: "#3A2E1A", dark: "#241A0D", light: "#E8B44F" } },
  { id: "robe_celestial", name: "Celestial Robe", rarity: "legendary", colors: { robe: "#181B34", dark: "#0F1224", light: "#2C3259" } },
];
const OFFHANDS = [
  { id: "offhand_none",      name: "Empty Hand",      rarity: "common",    color: null, desc: "—" },
  { id: "offhand_tome",      name: "Apprentice Tome", rarity: "common",    color: "#8B5A33", crit: 3, desc: "+3% crit chance · Weathered leather binding" },
  { id: "offhand_grimoire",  name: "Arcane Grimoire", rarity: "rare",      color: "#5F3F94", allDmg: 0.06, desc: "+6% all damage · Hum of raw arcane power" },
  { id: "offhand_codex",     name: "Codex of Embers", rarity: "epic",      color: "#B03D24", allDmg: 0.08, crit: 5, desc: "+8% all damage · +5% crit · Volcanic dragonhide" },
  { id: "offhand_orb",       name: "Celestial Orb",   rarity: "epic",      color: "#38BDF8", allDmg: 0.05, crit: 6, desc: "+5% all damage · +6% crit · Levitating starlight sphere" },
  { id: "offhand_forbidden", name: "Forbidden Tome",  rarity: "legendary", color: "#241C3D", allDmg: 0.12, crit: 8, desc: "+12% all damage · +8% crit · Eldritch void chains" },
];
const ARMORS = [
  { id: "armor_none",   name: "No armor",          rarity: "common",    desc: "—" },
  { id: "armor_padded", name: "Padded Robe",       rarity: "common",    maxHpBonus: 10, desc: "+10 Max HP" },
  { id: "armor_chain",  name: "Chainweave Vest",   rarity: "rare",      dmgReduction: 0.08, desc: "-8% damage taken" },
  { id: "armor_void",   name: "Voidplate Harness", rarity: "epic",      maxHpBonus: 10, dmgReduction: 0.06, desc: "+10 Max HP · -6% damage taken" },
  { id: "armor_dragon", name: "Dragonscale Plate", rarity: "legendary", dmgReduction: 0.15, desc: "-15% damage taken" },
];
const PETS = [
  { id: "pet_none",   name: "No companion", rarity: "common",    kind: null },
  { id: "pet_imp",    name: "Ember Imp",    rarity: "rare",      kind: "imp",    color: "#FF6B3D", dark: "#C4451D", light: "#FFB27A" },
  { id: "pet_sprite", name: "Frost Sprite", rarity: "rare",      kind: "sprite", color: "#5FC1E8", dark: "#3A8FBD", light: "#D6F3FF" },
  { id: "pet_fox",    name: "Leaf Fox",     rarity: "epic",      kind: "fox",    color: "#72C063", dark: "#4F8F45", light: "#DCF0C8" },
  { id: "pet_wisp",   name: "Star Wisp",    rarity: "legendary", kind: "wisp",   color: "#E8B44F", dark: "#B07FF5", light: "#FFF3C4" },
];

const GLOVES = [
  { id: "gloves_arcane",  name: "Arcane Spellweaver", rarity: "legendary", desc: "Midnight velvet gauntlets with gold trim & glowing affinity gem" },
  { id: "gloves_leather", name: "Battlemage Leather", rarity: "rare",      desc: "Reinforced saddle leather with brass buckle & riveted knuckles" },
  { id: "gloves_wraps",   name: "Runic Handwraps",   rarity: "epic",      desc: "Mystic channeled linen wraps pulsing with elemental mana" },
  { id: "gloves_bare",    name: "Stylized Mage Hands", rarity: "common",   desc: "Clean minimalist hands without glove armor" },
];

const START_OWNED = ["ashwood", "frostbound", "manapearl", "wardsigil", "none", "hat_pointed", "hat_hood", "hat_circlet", "aura_none", "aura_ember", "cape_none", "cape_travel", "wings_angel", "wings_demon", "wings_phoenix", "wings_fae", "armor_none", "armor_padded", "pet_none", "pet_imp", "robe_classic", "robe_midnight", "wings_none", "offhand_none", "offhand_tome", "gloves_arcane", "gloves_leather", "gloves_wraps", "gloves_bare"];
const LOOTABLE = ["verdant", "voidglass", "sunfire", "foxcharm", "phoenix", "hat_wide", "hat_crown", "hat_circlet", "aura_frost", "aura_void", "aura_radiant", "cape_shadow", "cape_star", "cape_phoenix", "wings_angel", "wings_demon", "wings_phoenix", "wings_fae", "armor_chain", "armor_void", "armor_dragon", "pet_sprite", "pet_fox", "pet_wisp", "robe_ivory", "robe_crimson", "robe_gilded", "robe_celestial", "offhand_grimoire", "offhand_codex", "offhand_orb", "offhand_forbidden"];
const ALL_ITEMS = [...STAFFS, ...RELICS, ...HATS, ...AURAS, ...CAPES, ...ARMORS, ...PETS, ...ROBES, ...OFFHANDS, ...GLOVES];
const findItem = (id) => ALL_ITEMS.find(i => i.id === id);
// DEV: everything unlocked for now so all equipment/cosmetics are viewable. Swap back to START_OWNED before shipping progression.
const DEV_UNLOCK_ALL = true;

const SAVE_KEY = "mageDuelSave_v1";
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const FRIENDS_KEY = "mageDuelFriends_v1";
function loadFriends() {
  try {
    const raw = localStorage.getItem(FRIENDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const NPC_BIOS = {
  fire: ["Forged in the ash of a hundred duels.", "Burns bright, fights brighter.", "Never lost a duel it can remember."],
  ice: ["Cold in battle, colder in conversation.", "Trained in the frostspire academies.", "Patient. Precise. Merciless."],
  nature: ["Grew up talking to trees, apparently.", "Believes every duel teaches something.", "Rarely angry. Often deadly."],
  arcane: ["Speaks mostly in riddles.", "Studies magic nobody else will touch.", "Not entirely sure what plane it's from."],
};
const PLAYER_LINES = {
  greet: "Well met! Ready for a duel?",
  taunt: "You don't scare me, mage.",
  compliment: "That's a fine staff you've got.",
  farewell: "Until we meet again.",
};
const NPC_REPLIES = {
  greet: ["Well met, traveler.", "Ah, a challenger approaches.", "Greetings. Shall we begin?", "You have my attention."],
  taunt: ["We shall see about that.", "Bold words, for now.", "Ha! We'll see who's laughing.", "Big talk from small mana."],
  compliment: ["Why, thank you.", "I forged it myself, actually.", "You have good taste.", "Flattery won't save you, but thanks."],
  farewell: ["Farewell, for now.", "Until next time.", "Safe travels, mage.", "May your mana regen swiftly."],
};

const MAX_HP = 100, MAX_MANA = 60, REGEN = 6, BASE_CRIT = 8;
const AFFINITY_BONUS = 1.25;
const ENEMY_NAMES = ["Morwen the Ashen", "Sylra Frostcall", "Bramblewick", "Vex of the Veil", "Ondrel Pyre", "Nissa Thornheart"];

const rand = (a, b) => Math.random() * (b - a) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const chance = (pct) => Math.random() * 100 < pct;

function computeDamage(skill, atk, def) {
  let mult = skill.el === atk.affinity ? AFFINITY_BONUS : 1;
  if (atk.staffGear) {
    if (atk.staffGear.el === skill.el && atk.staffGear.elBonus) mult *= 1 + atk.staffGear.elBonus;
    if (atk.staffGear.allDmg) mult *= 1 + atk.staffGear.allDmg;
  }
  if (atk.offhand?.allDmg) mult *= 1 + atk.offhand.allDmg;
  let chilled = false;
  if (atk.status.chill) { mult *= 0.7; chilled = true; }
  const critChance = BASE_CRIT + (atk.staffGear?.crit || 0) + (atk.relic?.crit || 0) + (atk.offhand?.crit || 0);
  const crit = chance(critChance);
  if (crit) mult *= 1.6;
  if (def.armor?.dmgReduction) mult *= 1 - def.armor.dmgReduction;
  const dmg = Math.round(skill.dmg * mult * rand(0.92, 1.08));
  return { dmg, crit, chilled };
}

function makeMage(name, affinity, skills, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, look, offhandId, glovesId) {
  const armor = ARMORS.find(a => a.id === armorId && a.id !== "armor_none") || null;
  const maxHp = MAX_HP + (armor?.maxHpBonus || 0);
  return {
    name, affinity, skills,
    staffGear: STAFFS.find(s => s.id === staffId) || null,
    relic: RELICS.find(r => r.id === relicId && r.id !== "none") || null,
    armor,
    cape: CAPES.find(c => c.id === capeId && c.id !== "cape_none") || null,
    offhand: OFFHANDS.find(o => o.id === offhandId && o.id !== "offhand_none") || null,
    pet: PETS.find(p => p.id === petId && p.id !== "pet_none") || null,
    hat: hatId, aura: auraId, robe: robeId || "robe_classic",
    gloves: glovesId || look?.gloves || "gloves_arcane",
    skinTone: look?.skinTone || "skin_fair", hairColor: look?.hairColor || "hair_white",
    hairStyle: look?.hairStyle || (look?.gender === "gender_female" ? "hair_long" : "hair_wavy"),
    beardStyle: look?.beardStyle || "beard_long", eyeColor: look?.eyeColor || "eye_dark",
    gender: look?.gender || "gender_male",
    face: look?.face || "face_round", earrings: look?.earrings || "earring_none", noseRing: look?.noseRing || "nosering_none",
    maxHp, hp: maxHp, mana: MAX_MANA, shield: 0, cds: {},
    status: { burn: 0, chill: false }, phoenixUsed: false,
  };
}

function makeEnemy() {
  const affinity = pick(Object.keys(ELEMENTS));
  const own = SKILLS.filter(s => s.el === affinity && s.dmg > 0);
  const loadout = [...own.slice(0, 2)];
  while (loadout.length < 4) { const s = pick(SKILLS); if (!loadout.includes(s)) loadout.push(s); }
  const e = makeMage(pick(ENEMY_NAMES), affinity, loadout, pick(STAFFS).id,
    Math.random() < 0.6 ? pick(RELICS.filter(r => r.id !== "none")).id : "none",
    pick(HATS).id, pick(AURAS).id,
    Math.random() < 0.5 ? pick(CAPES.filter(c => c.id !== "cape_none")).id : "cape_none",
    "armor_none", // armor hidden from the game for now
    Math.random() < 0.4 ? pick(PETS.filter(p => p.id !== "pet_none")).id : "pet_none",
    "robe_classic", // keep enemy robe tied to their affinity color so it reads clearly
    {
      skinTone: pick(SKIN_TONES).id, hairColor: pick(HAIR_COLORS).id, hairStyle: pick(HAIR_STYLES).id, beardStyle: pick(BEARD_STYLES).id, eyeColor: pick(EYE_COLORS).id, gender: pick(GENDERS).id,
      face: pick(FACES).id, earrings: Math.random() < 0.3 ? pick(EARRINGS.filter(x => x.id !== "earring_none")).id : "earring_none",
      noseRing: Math.random() < 0.15 ? pick(NOSE_RINGS.filter(x => x.id !== "nosering_none")).id : "nosering_none",
    },
    Math.random() < 0.5 ? pick(OFFHANDS.filter(o => o.id !== "offhand_none")).id : "offhand_none",
    pick(["gloves_arcane", "gloves_leather", "gloves_wraps"]));
  if (e.relic?.startShield) e.shield = e.relic.startShield;
  return e;
}

// ================= CHARACTER ART (modular parts, viewBox 400x500) =================
const ART = {
  fire:   { robe: "#D64933", dark: "#A93425", light: "#EF7A5A" },
  ice:    { robe: "#4FA3D1", dark: "#35789F", light: "#7EC3E8" },
  nature: { robe: "#5FA85A", dark: "#427A3E", light: "#83C77E" },
  arcane: { robe: "#8E5FD1", dark: "#67419C", light: "#AC85E6" },
};
const SKIN = "#F3C79E", SKIN_D = "#DBA97D", BEARD = "#F4F1EA", BEARD_D = "#D9D2C2";
const GOLD = "#E8B44F", GOLD_D = "#C08A2E";
const DEFAULT_LOOK = { skin: SKIN, skinD: SKIN_D, hair: BEARD, hairD: BEARD_D, eye: "#2B2430", beardStyle: "beard_long", hairStyle: "hair_wavy", face: FACES[0], earrings: EARRINGS[0], noseRing: NOSE_RINGS[0] };

function Beard({ style, hair, hairD }) {
  if (!style || style === "beard_none") return null;
  if (style === "beard_stubble") {
    return (
      <g opacity="0.65">
        <path d="M156 186 C 154 216 168 232 200 234 C 232 232 246 216 244 186 C 232 206 216 214 200 214 C 184 214 168 206 156 186 Z" fill={hairD} opacity="0.4" />
        {[[-22, 196], [-16, 206], [-10, 218], [0, 224], [10, 218], [16, 206], [22, 196], [-6, 228], [6, 228], [-14, 192], [14, 192], [-4, 216], [4, 216], [-10, 202], [10, 202]].map(([dx, y], i) => (
          <circle key={i} cx={200 + dx} cy={y} r="0.95" fill={hair} opacity="0.75" />
        ))}
      </g>
    );
  }
  if (style === "beard_short") {
    return (
      <g>
        <path d="M152 182 C 148 222 164 246 200 250 C 236 246 252 222 248 182 C 236 202 218 210 200 210 C 182 210 164 202 152 182 Z" fill={hair} />
        <path d="M200 250 C 226 244 240 228 244 204 C 238 232 222 244 200 244 Z" fill={hairD} />
        <path d="M192 222 Q200 238 200 248 Q200 238 208 222" stroke={hairD} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M166 195 C 176 188 193 187 200 194 C 207 187 224 188 234 195 C 227 207 208 208 200 202 C 192 208 173 207 166 195 Z" fill={hair} />
        <path d="M172 197 C 180 192 194 191 200 196 C 206 191 220 192 228 197" stroke={hairD} strokeWidth="1.6" fill="none" opacity="0.4" />
        <circle cx="200" cy="214" r="2" fill={hairD} opacity="0.6" />
      </g>
    );
  }
  if (style === "beard_braided") {
    return (
      <g>
        {/* Twin braided plaits */}
        <path d="M188 214 C 186 230 184 250 186 270 C 188 274 193 274 194 270 C 196 250 194 230 192 214 Z" fill={hair} />
        <path d="M212 214 C 214 230 216 250 214 270 C 212 274 207 274 206 270 C 204 250 206 230 208 214 Z" fill={hair} />
        {/* Braided segments */}
        {[224, 238, 252].map((y, i) => (
          <g key={i}>
            <path d={`M186 ${y} Q190 ${y + 6} 194 ${y}`} stroke={hairD} strokeWidth="1.5" fill="none" />
            <path d={`M206 ${y} Q210 ${y + 6} 214 ${y}`} stroke={hairD} strokeWidth="1.5" fill="none" />
          </g>
        ))}
        {/* Gold carved rune bands */}
        <rect x="183" y="266" width="10" height="6" rx="1.5" fill={GOLD} />
        <line x1="183" y1="269" x2="193" y2="269" stroke={GOLD_D} strokeWidth="1" />
        <circle cx="188" cy="269" r="1" fill="#FFF" />
        <rect x="207" y="266" width="10" height="6" rx="1.5" fill={GOLD} />
        <line x1="207" y1="269" x2="217" y2="269" stroke={GOLD_D} strokeWidth="1" />
        <circle cx="212" cy="269" r="1" fill="#FFF" />
        {/* Soul patch & mustache */}
        <ellipse cx="200" cy="216" rx="2.5" ry="3.5" fill={hair} />
        <path d="M166 195 C 176 188 193 187 200 194 C 207 187 224 188 234 195 C 226 206 208 206 200 201 C 192 206 174 206 166 195 Z" fill={hair} />
      </g>
    );
  }
  if (style === "beard_goatee") {
    return (
      <g>
        {/* Pointed imperial chin beard */}
        <path d="M190 216 C 188 232 192 248 200 258 C 208 248 212 232 210 216 C 204 220 196 220 190 216 Z" fill={hair} />
        <path d="M200 258 C 204 248 208 234 208 218 C 204 226 202 242 200 258 Z" fill={hairD} />
        <ellipse cx="200" cy="213" rx="2.8" ry="3" fill={hair} />
        {/* Curved mustache */}
        <path d="M162 194 C 175 186 193 186 200 195 C 207 186 225 186 238 194 C 230 208 208 208 200 201 C 192 208 170 208 162 194 Z" fill={hair} />
        <path d="M162 194 Q154 196 150 201" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M238 194 Q246 196 250 201" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  // Default: beard_long (Elder Long Wizard Beard)
  return (
    <g>
      <path d="M146 178 C 140 236 154 274 196 298 C 198 300 202 300 204 298 C 246 274 260 236 254 178 C 238 198 222 206 200 206 C 178 206 162 198 146 178 Z" fill={hair} />
      <path d="M200 298 C 236 282 250 250 254 212 C 248 258 228 282 200 290 Z" fill={hairD} />
      <path d="M146 178 C 156 230 172 268 200 292 C 174 264 160 228 152 186 Z" fill={hairD} opacity="0.25" />
      <path d="M182 216 Q186 256 196 292" stroke={hairD} strokeWidth="1.8" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M218 216 Q214 256 204 292" stroke={hairD} strokeWidth="1.8" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M200 220 L200 294" stroke={hair} strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* Upper gold rune ring */}
      <rect x="193" y="258" width="14" height="5" rx="1.5" fill={GOLD} />
      <line x1="193" y1="260.5" x2="207" y2="260.5" stroke={GOLD_D} strokeWidth="1" />
      <circle cx="200" cy="260.5" r="1.2" fill="#FFF" />
      {/* Lower gold rune ring */}
      <rect x="194" y="286" width="12" height="5.5" rx="1.5" fill={GOLD} />
      <line x1="194" y1="288.5" x2="206" y2="288.5" stroke={GOLD_D} strokeWidth="1" />
      {/* Majestic mustache */}
      <path d="M162 194 C 175 185 193 184 200 193 C 207 184 225 185 238 194 C 228 210 208 211 200 203 C 192 211 172 210 162 194 Z" fill={hair} />
      <path d="M168 196 Q184 188 200 195 Q216 188 232 196" stroke={hairD} strokeWidth="1.6" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M162 194 Q152 198 147 206" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M238 194 Q248 198 253 206" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="193" r="1.5" fill={hairD} opacity="0.5" />
    </g>
  );
}

function HairBack({ style, hair, hairD }) {
  if (style === "hair_short") {
    return (
      <g>
        {/* Tapered neat nape shadow behind head and neck */}
        <path d="M148 152 C 146 116 168 106 200 106 C 232 106 254 116 252 152 C 254 186 244 216 230 224 C 220 228 210 230 200 230 C 190 230 180 228 170 224 C 156 216 146 186 148 152 Z" fill={hairD} opacity="0.45" />
      </g>
    );
  }

  if (style === "hair_bob") {
    return (
      <g>
        {/* Full solid rounded bob mantle behind neck and ears */}
        <path d="M138 135 C 138 98 165 90 200 90 C 235 90 262 98 262 135 C 276 160 278 198 268 238 C 256 248 230 250 200 250 C 170 250 144 248 132 238 C 122 198 124 160 138 135 Z" fill={hair} />
        <path d="M132 238 C 122 198 124 160 138 135 C 142 165 140 205 152 242 C 144 244 138 242 132 238 Z" fill={hairD} opacity="0.6" />
        <path d="M268 238 C 278 198 276 160 262 135 C 258 165 260 205 248 242 C 256 244 262 242 268 238 Z" fill={hairD} opacity="0.6" />
      </g>
    );
  }

  if (style === "hair_braids") {
    return (
      <g>
        {/* Solid base mass gathered behind head */}
        <path d="M138 135 C 138 96 165 90 200 90 C 235 90 262 96 262 135 C 272 158 270 190 264 222 C 250 232 228 236 200 236 C 172 236 150 232 136 222 C 130 190 128 158 138 135 Z" fill={hair} />
        <path d="M136 222 C 150 232 172 236 200 236 C 228 236 250 232 264 222 C 256 238 230 242 200 242 C 170 242 144 238 136 222 Z" fill={hairD} opacity="0.5" />
      </g>
    );
  }

  if (style === "hair_long") {
    return (
      <g>
        {/* Solid continuous curtain behind head, neck, and mantle down to y=355 */}
        <path d="M136 128 C 136 94 164 86 200 86 C 236 86 264 94 264 128 C 280 145 296 180 300 220 C 308 270 306 315 294 355 C 282 365 264 352 258 335 C 248 310 236 295 200 295 C 164 295 152 310 142 335 C 136 352 118 365 106 355 C 94 315 92 270 100 220 C 104 180 120 145 136 128 Z" fill={hair} />
        {/* Deep shadow contours on sides and base */}
        <path d="M100 220 C 92 270 94 315 106 355 C 118 365 136 352 142 335 C 130 310 120 265 120 220 C 120 180 128 150 136 128 C 120 145 104 180 100 220 Z" fill={hairD} opacity="0.65" />
        <path d="M300 220 C 308 270 306 315 294 355 C 282 365 264 352 258 335 C 270 310 280 265 280 220 C 280 180 272 150 264 128 C 280 145 296 180 300 220 Z" fill={hairD} opacity="0.65" />
        {/* Flowing hair lock texture lines */}
        <path d="M116 230 C 114 275 122 315 130 345" stroke={hairD} strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M284 230 C 286 275 278 315 270 345" stroke={hairD} strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M126 210 C 126 255 132 295 138 335" stroke={hair} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M274 210 C 274 255 268 295 262 335" stroke={hair} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      </g>
    );
  }

  if (style === "hair_wavy") {
    return (
      <g>
        {/* Solid wavy curtain behind head and shoulders down to y=290 */}
        <path d="M138 135 C 138 96 164 88 200 88 C 236 88 262 96 262 135 C 276 155 292 190 288 240 C 284 270 274 290 258 292 C 244 272 230 256 200 256 C 170 256 156 272 142 292 C 126 290 116 270 112 240 C 108 190 124 155 138 135 Z" fill={hair} />
        <path d="M112 240 C 108 190 124 155 138 135 C 142 170 140 215 152 260 C 140 270 126 275 112 240 Z" fill={hairD} opacity="0.6" />
        <path d="M288 240 C 292 190 276 155 262 135 C 258 170 260 215 248 260 C 260 270 274 275 288 240 Z" fill={hairD} opacity="0.6" />
        {/* Wavy tumbling lock lines */}
        <path d="M124 180 Q118 215 130 255" stroke={hairD} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M276 180 Q282 215 270 255" stroke={hairD} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>
    );
  }

  if (style === "hair_topknot") {
    return (
      <g>
        {/* Clean nape underlayer behind neck */}
        <path d="M148 152 C 148 116 168 106 200 106 C 232 106 252 116 252 152 C 254 186 244 216 230 224 C 220 228 210 230 200 230 C 190 230 180 228 170 224 C 156 216 146 186 148 152 Z" fill={hairD} opacity="0.35" />
        {/* High topknot bun */}
        <circle cx="200" cy="94" r="16" fill={hair} />
        <ellipse cx="200" cy="98" rx="14" ry="9" fill={hairD} opacity="0.45" />
        <ellipse cx="200" cy="92" rx="11" ry="6" fill={hair} />
        {/* Gold ornamental hairpin */}
        <line x1="176" y1="98" x2="224" y2="88" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <circle cx="176" cy="98" r="3" fill={GOLD} />
        <circle cx="176" cy="98" r="1.5" fill="#FFF" />
        {/* Hanging silk tassels */}
        <path d="M178 100 Q174 114 176 126" stroke="#C02626" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M180 100 Q182 114 180 124" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="176" cy="126" r="1.5" fill={GOLD} />
      </g>
    );
  }

  if (style === "hair_wild") {
    return (
      <g>
        {/* Solid lion mane flaring outward behind neck and shoulders */}
        <path d="M136 130 C 136 94 164 86 200 86 C 236 86 264 94 264 130 C 285 138 306 170 296 225 C 286 260 268 275 252 270 C 236 250 220 245 200 245 C 180 245 164 250 148 270 C 132 275 114 260 104 225 C 94 170 115 138 136 130 Z" fill={hair} />
        <path d="M104 225 C 94 170 115 138 136 130 C 140 160 134 200 148 240 C 134 255 116 250 104 225 Z" fill={hairD} opacity="0.6" />
        <path d="M296 225 C 306 170 285 138 264 130 C 260 160 266 200 252 240 C 266 255 284 250 296 225 Z" fill={hairD} opacity="0.6" />
        {/* Wild jagged spikes */}
        <polygon points="106,180 84,196 114,208" fill={hair} />
        <polygon points="294,180 316,196 286,208" fill={hair} />
        <polygon points="112,145 92,156 122,168" fill={hair} />
        <polygon points="288,145 308,156 278,168" fill={hair} />
      </g>
    );
  }

  return null;
}

function HairFront({ style, hair, hairD, isFemale, hasHat, hatId }) {
  const isTallHat = hasHat && (hatId === "hat_pointed" || hatId === "hat_hood" || hatId === "hat_wide");

  return (
    <g>
      {/* 1. Main Crown Dome (rendered when no hat or open hat like crown/circlet) */}
      {!isTallHat && (
        <g>
          {/* Full sculpted crown dome */}
          <path d="M142 154 C 142 94 168 86 200 86 C 232 86 258 94 258 154 C 246 136 224 126 200 126 C 176 126 154 136 142 154 Z" fill={hair} />
          {/* Hair volume shine */}
          <path d="M164 116 C 176 104 190 100 206 100 C 220 100 232 103 242 108 C 228 105 216 104 204 104 C 188 104 174 108 164 116 Z" fill={hairD} opacity="0.45" />

          {/* Style-specific crown flair */}
          {style === "hair_wild" && (
            <g fill={hair}>
              <polygon points="184,102 192,72 200,98" />
              <polygon points="198,96 208,68 216,98" />
              <polygon points="168,114 174,82 182,106" />
              <polygon points="218,106 226,82 232,114" />
            </g>
          )}
          {style === "hair_bob" && (
            <path d="M148 140 C 158 114 186 104 204 104 C 226 104 248 114 252 144 C 240 124 218 116 196 122 Z" fill={hairD} opacity="0.35" />
          )}
        </g>
      )}

      {/* 2. Forehead Hairline / Bangs (visible under ANY hat or crown, so forehead never has a bald gap!) */}
      {style === "hair_long" && (
        <g>
          {/* Soft parted curtain bangs blending smoothly into temples */}
          <path d="M146 148 C 160 134 182 130 198 136 C 180 134 162 140 150 152 Z" fill={hair} />
          <path d="M254 148 C 240 134 218 130 202 136 C 220 134 238 140 250 152 Z" fill={hair} />
          <path d="M146 148 C 160 134 182 130 198 136" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M254 148 C 240 134 218 130 202 136" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />
          {/* Elegant front shoulder tresses draped in front of robe */}
          <path d="M140 170 C 132 205 132 248 138 282 C 142 284 147 280 148 274 C 144 242 146 205 152 176 Z" fill={hair} />
          <path d="M140 170 C 133 205 133 248 139 280" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="138" cy="282" r="2.2" fill={GOLD} />
          <path d="M260 170 C 268 205 268 248 262 282 C 258 284 253 280 252 274 C 256 242 254 205 248 176 Z" fill={hair} />
          <path d="M260 170 C 267 205 267 248 261 280" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="262" cy="282" r="2.2" fill={GOLD} />
        </g>
      )}

      {style === "hair_wavy" && (
        <g>
          {/* Tumbling wavy bangs sweeping softly across brow */}
          <path d="M148 146 C 164 134 188 134 198 142 C 184 136 168 138 152 150 Z" fill={hair} />
          <path d="M252 146 C 236 134 212 134 202 142 C 216 136 232 138 248 150 Z" fill={hair} />
          {/* Soft wavy side locks falling over front shoulders */}
          <path d="M142 174 C 136 206 138 238 146 264 C 150 262 153 258 152 250 C 148 230 148 204 154 180 Z" fill={hair} />
          <path d="M142 174 Q136 210 146 260" stroke={hairD} strokeWidth="1.4" fill="none" opacity="0.5" />
          <path d="M258 174 C 264 206 262 238 254 264 C 250 262 247 258 248 250 C 252 230 252 204 246 180 Z" fill={hair} />
          <path d="M258 174 Q264 210 254 260" stroke={hairD} strokeWidth="1.4" fill="none" opacity="0.5" />
        </g>
      )}

      {style === "hair_bob" && (
        <g>
          {/* Chic arched fringe across forehead */}
          <path d="M152 148 C 168 136 200 134 248 148 C 234 140 200 138 166 146 Z" fill={hair} />
          <path d="M152 148 C 168 136 200 134 248 148" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.4" />
        </g>
      )}

      {style === "hair_short" && (
        <g>
          {/* Textured cropped fringe */}
          <path d="M154 144 C 168 136 186 136 196 142 C 182 138 168 139 156 147 Z" fill={hair} />
          <path d="M246 144 C 232 136 214 136 204 142 C 218 138 232 139 244 147 Z" fill={hair} />
        </g>
      )}

      {style === "hair_topknot" && (
        <g>
          {/* Clean sleek hairline with delicate peak */}
          <path d="M150 148 C 166 138 188 134 200 138 C 212 134 234 138 250 148 C 238 142 216 138 200 142 C 184 138 162 142 150 148 Z" fill={hair} />
        </g>
      )}

      {style === "hair_braids" && (
        <g>
          {/* Parted bangs */}
          <path d="M148 146 C 164 136 184 132 198 138 C 182 134 166 138 152 148 Z" fill={hair} />
          <path d="M252 146 C 236 136 216 132 202 138 C 218 134 234 138 248 148 Z" fill={hair} />
          {/* Left thick braid draped in front of robe and shoulder */}
          <path d="M136 156 C 122 188 120 236 128 316 C 134 320 142 318 144 310 C 140 240 142 190 150 162 Z" fill={hair} />
          <path d="M136 156 C 124 190 122 238 129 314 L 128 316 C 122 240 125 188 136 156 Z" fill={hairD} opacity="0.55" />
          {[184, 210, 236, 262, 288].map((y, i) => (
            <path key={`lbf${i}`} d={`M125 ${y} Q133 ${y + 8} 141 ${y + 2}`} stroke={hairD} strokeWidth="1.6" fill="none" />
          ))}
          <rect x="125" y="304" width="10" height="5" rx="1.2" fill={GOLD} />
          {/* Right thick braid draped in front of robe and shoulder */}
          <path d="M264 156 C 278 188 280 236 272 316 C 266 320 258 318 256 310 C 260 240 258 190 250 162 Z" fill={hair} />
          <path d="M264 156 C 276 190 278 238 271 314 L 272 316 C 278 240 275 188 264 156 Z" fill={hairD} opacity="0.55" />
          {[184, 210, 236, 262, 288].map((y, i) => (
            <path key={`rbf${i}`} d={`M275 ${y} Q267 ${y + 8} 259 ${y + 2}`} stroke={hairD} strokeWidth="1.6" fill="none" />
          ))}
          <rect x="265" y="304" width="10" height="5" rx="1.2" fill={GOLD} />
        </g>
      )}

      {style === "hair_wild" && (
        <g>
          {/* Jagged spikes over forehead */}
          <polygon points="172,136 180,148 186,134" fill={hair} />
          <polygon points="214,134 220,148 228,136" fill={hair} />
          <polygon points="192,132 200,144 208,132" fill={hair} />
        </g>
      )}

      {/* 3. Temple Wisps framing the face (seamless transition between crown and jaw) */}
      <path d="M146 144 C 140 166 142 188 152 202 C 148 186 148 168 152 152 Z" fill={hair} />
      <path d="M146 144 C 141 162 143 182 149 194" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M254 144 C 260 166 258 188 248 202 C 252 186 252 168 248 152 Z" fill={hair} />
      <path d="M254 144 C 259 162 257 182 251 194" stroke={hairD} strokeWidth="1.2" fill="none" opacity="0.5" />

    </g>
  );
}

function getGloveColors(gloves = "gloves_arcane", look, affinity = "arcane") {
  const gemColor = affinity === "fire" ? "#E11D48" : affinity === "ice" ? "#0284C7" : affinity === "nature" ? "#16A34A" : "#9333EA";
  const gemGlow = affinity === "fire" ? "#F87171" : affinity === "ice" ? "#38BDF8" : affinity === "nature" ? "#4ADE80" : "#C084FC";

  if (gloves === "gloves_leather") {
    return {
      type: "leather",
      main: "#3A2416",
      dark: "#20120A",
      light: "#5A3A24",
      trim: "#D97706",
      gem: "#D97706",
      gemGlow: "#FBBF24",
      hasGem: false,
      hasStuds: true,
    };
  }

  if (gloves === "gloves_wraps") {
    return {
      type: "wraps",
      main: "#E8DFCF",
      dark: "#C5B8A3",
      light: "#FAF5EC",
      trim: gemColor,
      gem: gemColor,
      gemGlow: gemGlow,
      hasGem: false,
      hasRune: true,
    };
  }

  if (gloves === "gloves_bare") {
    return {
      type: "bare",
      main: look?.skin || "#F3C79E",
      dark: look?.skinD || "#DBA97D",
      light: "#FFFFFF",
      trim: look?.skinD || "#DBA97D",
      gem: null,
      gemGlow: null,
      hasGem: false,
    };
  }

  // Default: gloves_arcane (Arcane Spellweaver Gauntlets)
  return {
    type: "arcane",
    main: "#221A34",
    dark: "#120D1E",
    light: "#3A2E54",
    trim: "#F59E0B",
    trimLight: "#FEF08A",
    gem: gemColor,
    gemGlow: gemGlow,
    hasGem: true,
  };
}

function Base({ p, look = DEFAULT_LOOK, hasHat = false, affinity = "arcane", hatId = "", robeTrim = null, armor = null, hasOffhand = false, gloves = "gloves_arcane" }) {
  const { skin, skinD, hair, hairD, eye } = look;
  const beardStyle = look.beardStyle || "beard_long";
  const hairStyle = look.hairStyle || (look.gender === "gender_female" ? "hair_long" : "hair_wavy");
  const isFemale = look.gender === "gender_female";
  const face = look.face || FACES[0];
  const earrings = look.earrings || EARRINGS[0];
  const noseRing = look.noseRing || NOSE_RINGS[0];
  const eyeR = face.eyeR ?? 7.2;
  const noseRx = face.noseRx ?? 10, noseRy = face.noseRy ?? 9;
  const nosePX = 192, nosePY = 189;
  const chinW = face.chinWidth ?? 26;
  const jawDrop = face.jawDrop ?? 0;
  const chinY = 224 + jawDrop;

  const gemColor = affinity === "fire" ? "#E11D48" : affinity === "ice" ? "#0284C7" : affinity === "nature" ? "#16A34A" : "#9333EA";

  return (
    <g>
      {/* Hair back layer - drawn behind boots, robe, sleeves, belt, and body */}
      <HairBack style={hairStyle} hair={hair} hairD={hairD} />

      {/* Pointed wizard boots */}
      <g>
        {/* Left boot */}
        <path d="M152 448 C 150 456 142 460 138 464 C 134 468 140 470 156 468 C 172 466 182 462 184 454 C 184 448 174 446 152 448 Z" fill="#261A12" />
        <path d="M142 463 C 146 461 162 460 178 456" stroke="#4D3422" strokeWidth="1.2" fill="none" />
        <rect x="156" y="452" width="6" height="5" rx="1" fill={GOLD} />
        {/* Right boot */}
        <path d="M248 448 C 250 456 258 460 262 464 C 266 468 260 470 244 468 C 228 466 218 462 216 454 C 216 448 226 446 248 448 Z" fill="#261A12" />
        <path d="M258 463 C 254 461 238 460 222 456" stroke="#4D3422" strokeWidth="1.2" fill="none" />
        <rect x="238" y="452" width="6" height="5" rx="1" fill={GOLD} />
      </g>

      {/* Main robe silhouette - well-balanced heroic taper: broad shoulders framing the head down to a firm athletic waist and majestic A-line skirt */}
      <path d="M200 210 C 158 214 134 230 132 242 C 132 260 144 276 148 288 C 142 340 132 400 122 456 C 160 468 240 468 278 456 C 268 400 258 340 252 288 C 256 276 268 260 268 242 C 266 230 242 214 200 210 Z" fill={p.robe} />

      {/* Robe side drapery and shadow folds contouring the waist and hips */}
      <path d="M148 288 C 142 340 132 400 122 456 C 138 462 156 464 168 462 C 152 440 152 362 156 290 Z" fill={p.dark} opacity="0.65" />
      <path d="M252 288 C 258 340 268 400 278 456 C 262 462 244 464 232 462 C 248 440 248 362 244 290 Z" fill={p.dark} opacity="0.65" />
      <path d="M122 456 C 160 468 240 468 278 456 C 270 449 258 448 200 452 C 142 448 130 449 122 456 Z" fill={p.dark} />

      {/* Tailored vertical fabric pleats enhancing elegant height */}
      <path d="M174 294 C 170 350 162 410 156 458" stroke={p.light} strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M226 294 C 230 350 238 410 244 458" stroke={p.dark} strokeWidth="1.2" fill="none" opacity="0.4" />

      {/* Center ceremonial stole / front panel */}
      <path d="M200 230 C 188 236 184 280 184 350 C 184 410 186 446 200 454 C 214 446 216 410 216 350 C 216 280 212 236 200 230 Z" fill={p.light} opacity="0.95" />
      {/* Gold embroidery piping along stole */}
      <path d="M185 236 C 183 282 183 408 198 452" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M215 236 C 217 282 217 408 202 452" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Noble left sleeve draping gracefully from broad shoulder */}
      <path d="M132 240 C 120 256 112 286 110 320 C 118 334 138 336 148 326 C 146 294 144 268 144 254 Z" fill={p.dark} />
      <path d="M110 320 C 118 334 136 336 148 326 C 140 318 130 314 120 314 Z" fill="#140E1C" opacity="0.75" />
      <path d="M112 322 C 120 334 136 336 146 327" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.85" />

      {/* Free, relaxed left hand in idle position */}
      <RestingLeftHand look={look} gloves={gloves} affinity={affinity} />

      {/* Noble right sleeve draping gracefully in symmetrical idle stance */}
      <path d="M268 240 C 280 256 288 286 290 320 C 282 334 262 336 252 326 C 254 294 256 268 256 254 Z" fill={p.dark} />
      <path d="M290 320 C 282 334 264 336 252 326 C 260 318 270 314 280 314 Z" fill="#140E1C" opacity="0.75" />
      <path d="M288 322 C 280 334 264 336 254 327" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.85" />

      {/* Free, relaxed right hand in idle position */}
      <RestingRightHand look={look} gloves={gloves} affinity={affinity} />

      {/* Firm athletic waist belt - taut horizontal cut */}
      <path d="M148 284 C 174 282 226 282 252 284 L 252 300 C 226 298 174 298 148 300 Z" fill="#2B1D14" />
      <path d="M148 285 C 174 283 226 283 252 285" stroke={GOLD} strokeWidth="1.2" fill="none" opacity="0.75" />
      <path d="M148 299 C 174 297 226 297 252 299" stroke={GOLD} strokeWidth="1.2" fill="none" opacity="0.75" />
      {/* Hanging sash tail on left */}
      <path d="M166 300 C 164 324 160 352 162 374 L 174 372 C 172 350 174 324 176 300 Z" fill="#2B1D14" />
      <line x1="162" y1="374" x2="174" y2="372" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />

      {/* Proportioned aristocratic belt buckle */}
      <rect x="188" y="282" width="24" height="20" rx="3.5" fill={GOLD} />
      <rect x="191" y="285" width="18" height="14" rx="2" fill="#1C1424" />
      <rect x="194" y="287" width="12" height="10" rx="1.5" fill={gemColor} />
      <circle cx="197.5" cy="289.5" r="1.3" fill="#FFFFFF" opacity="0.85" />

      {/* Robe Trim layer (drawn onto robe before neck, face, beard, and front hair) */}
      {robeTrim}

      {/* Armor layer (drawn onto robe before neck, face, beard, and front hair) */}
      {armor}

      {/* Neck & throat */}
      <polygon points={`186,204 214,204 ${212 + chinW * 0.2},234 ${188 - chinW * 0.2},234`} fill={skinD} />
      <path d="M186 206 Q200 214 214 206" stroke={skinD} strokeWidth="2.2" fill="none" opacity="0.6" />

      {/* High collar / mantle framing neck */}
      <path d="M166 230 C 174 216 186 212 200 216 C 214 212 226 216 234 230 C 220 238 180 238 166 230 Z" fill={p.dark} />
      <circle cx="200" cy="226" r="4.5" fill={GOLD} />
      <circle cx="200" cy="226" r="2.2" fill={gemColor} />

      {/* Ears with realistic cartilage folds */}
      <g>
        {/* Left ear */}
        <path d="M148 164 C 138 164 134 172 136 184 C 138 192 146 195 149 190 Z" fill={skin} />
        <path d="M144 170 C 141 172 140 180 144 184" stroke={skinD} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="145" cy="176" rx="2" ry="3" fill={skinD} opacity="0.3" />
        {/* Right ear */}
        <path d="M252 164 C 262 164 266 172 264 184 C 262 192 254 195 251 190 Z" fill={skin} />
        <path d="M256 170 C 259 172 260 180 256 184" stroke={skinD} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="255" cy="176" rx="2" ry="3" fill={skinD} opacity="0.3" />
      </g>

      {/* Head & chin contour */}
      <path d={`M148 158 C 146 200 ${200 - chinW} ${chinY} 200 ${chinY} C ${200 + chinW} ${chinY} 254 200 252 158 C 252 118 230 112 200 112 C 170 112 148 118 148 158 Z`} fill={skin} />
      {/* Jawline shadow */}
      <path d={`M${200 - chinW * 0.6} ${chinY - 1} Q 200 ${chinY + 4} ${200 + chinW * 0.6} ${chinY - 1}`} stroke={skinD} strokeWidth="2.2" fill="none" opacity="0.45" strokeLinecap="round" />

      {/* Soft cheek blush */}
      <ellipse cx="166" cy="177" rx="11" ry="5" fill="#E86B6B" opacity="0.18" />
      <ellipse cx="234" cy="177" rx="11" ry="5" fill="#E86B6B" opacity="0.18" />

      {/* Earrings */}
      {earrings.id !== "earring_none" && (
        earrings.drop ? (
          <>
            <circle cx="145" cy="189" r="1.8" fill={GOLD} />
            <polygon points="145,191 143,197 145,200 147,197" fill="#E11D48" />
            <circle cx="255" cy="189" r="1.8" fill={GOLD} />
            <polygon points="255,191 253,197 255,200 257,197" fill="#E11D48" />
          </>
        ) : earrings.hoop ? (
          <>
            <circle cx="145" cy="190" r="4.5" fill="none" stroke={earrings.color} strokeWidth="1.8" />
            <circle cx="255" cy="190" r="4.5" fill="none" stroke={earrings.color} strokeWidth="1.8" />
          </>
        ) : (
          <>
            <circle cx="145" cy="188" r="2.6" fill={earrings.color} />
            <circle cx="255" cy="188" r="2.6" fill={earrings.color} />
          </>
        )
      )}

      {/* Left eye */}
      <g>
        <path d="M167 167 C 170 159 186 159 189 167 C 186 173 170 173 167 167 Z" fill="#FCFAF5" />
        <path d="M167 167 C 170 161 186 161 189 167 C 187 164 169 164 167 167 Z" fill="#000000" opacity="0.14" />
        <circle cx="178" cy="166.5" r={eyeR * 0.72} fill={eye} />
        <path d="M174 168 A 4 4 0 0 0 182 168" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="178" cy="166.5" r={eyeR * 0.42} fill="#120E18" />
        <circle cx="180.2" cy="164.5" r="1.8" fill="#FFFFFF" />
        <circle cx="176.2" cy="168" r="0.9" fill="#FFFFFF" opacity="0.75" />
        <path d="M166 167 C 170 158 186 158 190 167" stroke="#1C1424" strokeWidth={isFemale ? "2.6" : "2"} fill="none" strokeLinecap="round" />
        <path d="M169 158 Q178 155 187 158" stroke={skinD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        {isFemale && <path d="M167 167 Q163 164 160 163" stroke="#1C1424" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
      </g>

      {/* Right eye */}
      <g>
        <path d="M211 167 C 214 159 230 159 233 167 C 230 173 214 173 211 167 Z" fill="#FCFAF5" />
        <path d="M211 167 C 214 161 230 161 233 167 C 231 164 213 164 211 167 Z" fill="#000000" opacity="0.14" />
        <circle cx="222" cy="166.5" r={eyeR * 0.72} fill={eye} />
        <path d="M218 168 A 4 4 0 0 0 226 168" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="222" cy="166.5" r={eyeR * 0.42} fill="#120E18" />
        <circle cx="224.2" cy="164.5" r="1.8" fill="#FFFFFF" />
        <circle cx="220.2" cy="168" r="0.9" fill="#FFFFFF" opacity="0.75" />
        <path d="M210 167 C 214 158 230 158 234 167" stroke="#1C1424" strokeWidth={isFemale ? "2.6" : "2"} fill="none" strokeLinecap="round" />
        <path d="M213 158 Q222 155 231 158" stroke={skinD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        {isFemale && <path d="M233 167 Q237 164 240 163" stroke="#1C1424" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
      </g>

      {/* Eyebrows */}
      {isFemale ? (
        <g fill={hair}>
          <path d="M166 153 C 172 147 182 147 190 152 C 182 149 172 150 166 153 Z" />
          <path d="M234 153 C 228 147 218 147 210 152 C 218 149 228 150 234 153 Z" />
        </g>
      ) : (
        <g fill={hair}>
          <path d="M165 154 C 172 146 184 146 192 152 C 183 148 172 149 165 154 Z" />
          <path d="M235 154 C 228 146 216 146 208 152 C 217 148 228 149 235 154 Z" />
        </g>
      )}

      {/* Nose */}
      <line x1="200" y1="172" x2="200" y2="185" stroke={skinD} strokeWidth="1.6" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="200" cy="188" rx={noseRx * 0.72} ry={noseRy * 0.58} fill={skinD} opacity="0.65" />
      <ellipse cx="198" cy="186.5" rx={noseRx * 0.35} ry={noseRy * 0.28} fill={skin} opacity="0.95" />
      <circle cx="200" cy="186.8" r="1.4" fill="#FFFFFF" opacity="0.4" />
      <path d={`M${200 - noseRx * 0.65} 189 Q${200 - noseRx * 0.8} 191 ${200 - noseRx * 0.5} 192`} stroke={skinD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d={`M${200 + noseRx * 0.65} 189 Q${200 + noseRx * 0.8} 191 ${200 + noseRx * 0.5} 192`} stroke={skinD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* Nose piercing */}
      {noseRing.id !== "nosering_none" && (
        noseRing.ring
          ? <circle cx={nosePX} cy={nosePY} r="3" fill="none" stroke={noseRing.color} strokeWidth="1.5" />
          : <circle cx={nosePX} cy={nosePY} r="1.8" fill={noseRing.color} />
      )}

      {/* Mouth and lips (if no beard covering mouth) */}
      {(beardStyle === "beard_none" || beardStyle === "beard_stubble") && (
        isFemale ? (
          <g>
            <path d="M192 204 Q196 202 200 203.5 Q204 202 208 204 Q200 205.5 192 204 Z" fill="#D97076" opacity="0.75" />
            <path d="M193 204.5 Q200 206 207 204.5" stroke="#9E4048" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M194 205 Q200 210 206 205 Q200 208.5 194 205 Z" fill="#E2848A" opacity="0.85" />
            <ellipse cx="200" cy="207" rx="2.5" ry="0.8" fill="#FFFFFF" opacity="0.4" />
            <path d="M196 211 Q200 213 204 211" stroke={skinD} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M192 205 Q200 209 208 205" stroke={skinD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <ellipse cx="200" cy="208" rx="3.5" ry="1.2" fill={skinD} opacity="0.55" />
            <path d="M198 196 L198 201 M202 196 L202 201" stroke={skinD} strokeWidth="0.8" opacity="0.3" />
          </g>
        )
      )}

      {/* Facial hair */}
      <Beard style={beardStyle} hair={hair} hairD={hairD} />

      {/* Hair front layer */}
      <HairFront style={hairStyle} hair={hair} hairD={hairD} isFemale={isFemale} hasHat={hasHat} hatId={hatId} />
    </g>
  );
}

function IdleHand({ look, gloves = "gloves_arcane", affinity = "arcane", side = "left" }) {
  const g = getGloveColors(gloves, look, affinity);
  const gemColor = affinity === "fire" ? "#E11D48" : affinity === "ice" ? "#0284C7" : affinity === "nature" ? "#16A34A" : "#9333EA";
  const isRight = side === "right";
  const tx = isRight ? 271 : 129;
  const ty = 324;
  const sx = isRight ? -1 : 1;

  return (
    <g transform={`translate(${tx} ${ty}) scale(${sx} 1)`}>
      {/* Wrist entering dark sleeve opening */}
      <path d="M -8 -2 L 8 -2 L 7.5 3 L -7.5 3 Z" fill={g.dark} />

      {/* Main contoured idle hand silhouette - noble, proportionate hand resting naturally at side */}
      <path
        d="M -8 0
           C -10.5 4, -11.5 10, -10.5 16
           C -9.5 21, -7.5 25, -4 27
           C -1 28.5, 3 28, 6 25
           C 8.5 22, 9.5 18, 8.5 13
           C 7.5 10, 6 8, 6.5 5
           C 7 2.5, 8 0, 8 0 Z"
        fill={g.main}
        stroke={g.type === "arcane" ? g.trim : g.dark}
        strokeWidth={g.type === "arcane" ? "1.3" : "1.0"}
      />

      {/* Subtle inner thumb crease defining relaxed thumb resting against palm */}
      <path
        d="M 4.5 9 C 5.5 13, 4.5 17, 2 20"
        stroke={g.type === "arcane" ? g.trim : g.dark}
        strokeWidth="1"
        fill="none"
        opacity="0.38"
      />

      {/* Subtle finger division grooves at fingertips */}
      <line x1="2.5" y1="21" x2="2.5" y2="27" stroke={g.type === "arcane" ? g.trim : g.dark} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <line x1="-1.5" y1="20" x2="-1.5" y2="26.5" stroke={g.type === "arcane" ? g.trim : g.dark} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />

      {/* Glove Details */}
      {g.type === "arcane" && (
        <g>
          {/* Gold cuff rim at sleeve opening */}
          <path d="M -8 1 Q 0 3.5 8 1" stroke={g.trim} strokeWidth="1.8" fill="none" />
          {/* Articulated dorsal plate chevron */}
          <polygon points="0,5 5.5,10.5 0,16 -5.5,10.5" fill="#2D2148" stroke={g.trim} strokeWidth="1.1" />
          {/* Radiant dorsal focal gem */}
          <circle cx="0" cy="10.5" r="2.2" fill={g.gem} stroke={g.trim} strokeWidth="0.8" />
          <circle cx="-0.7" cy="9.8" r="0.7" fill="#FFFFFF" opacity="0.85" />
          {/* Gold knuckle guard arc */}
          <path d="M -6 18 Q 0 21 5 18" stroke={g.trim} strokeWidth="1.1" fill="none" opacity="0.85" />
        </g>
      )}

      {g.type === "leather" && (
        <g>
          <path d="M -7 1.5 Q 0 3.5 7 1.5" stroke={g.trim} strokeWidth="1.2" strokeDasharray="1.8 1.5" fill="none" />
          <circle cx="-4" cy="18" r="1.3" fill={g.trim} />
          <circle cx="0" cy="19" r="1.3" fill={g.trim} />
          <circle cx="4" cy="17.5" r="1.3" fill={g.trim} />
        </g>
      )}

      {g.type === "wraps" && (
        <g stroke={g.trim} strokeWidth="1.1" opacity="0.75">
          <line x1="-7" y1="6" x2="5" y2="10" />
          <line x1="-8" y1="12" x2="4" y2="16" />
          <line x1="-6" y1="18" x2="3" y2="22" />
          <circle cx="-0.5" cy="10" r="1.4" fill={g.gem || gemColor} opacity="0.85" />
        </g>
      )}

      {g.type === "bare" && (
        <g>
          <ellipse cx="-1" cy="10" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.18" />
          <path d="M -5 18 Q 0 20.5 4 17.5" stroke={look.skinD} strokeWidth="0.9" fill="none" opacity="0.4" />
        </g>
      )}
    </g>
  );
}

function RestingLeftHand(props) {
  return <IdleHand {...props} side="left" />;
}

function RestingRightHand(props) {
  return <IdleHand {...props} side="right" />;
}

function HandGrip() {
  // Scepters and offhand relics now float telekinetically; hands remain in clean idle position
  return null;
}

function HatPointed({ p }) {
  return (
    <g>
      {/* Underside shadow */}
      <ellipse cx="200" cy="126" rx="90" ry="22" fill="#000000" opacity="0.2" />
      {/* Wizard hat cone with crumpled fabric folds */}
      <path d="M144 122 C 154 74 182 38 224 24 C 254 14 276 26 268 40 C 260 48 244 44 232 52 C 248 76 256 98 258 122 Z" fill={p.robe} />
      <path d="M144 122 C 154 84 172 54 200 38 C 190 64 186 92 188 122 Z" fill={p.light} opacity="0.6" />
      {/* Fabric wrinkle folds */}
      <path d="M174 88 Q196 94 218 82" stroke={p.dark} strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M166 106 Q194 112 230 100" stroke={p.dark} strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* Undulating wide brim */}
      <ellipse cx="200" cy="124" rx="92" ry="22" fill={p.dark} />
      <ellipse cx="200" cy="118" rx="92" ry="20" fill={p.robe} />
      <path d="M112 118 C 140 134 260 134 288 118" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.75" />
      {/* Velvet hat band with gold buckle & moon talisman */}
      <path d="M148 111 C 182 102 222 102 254 111 L 254 121 C 222 112 182 112 148 121 Z" fill="#181324" />
      <path d="M148 111 C 182 102 222 102 254 111" stroke={GOLD} strokeWidth="1.2" fill="none" />
      <path d="M148 121 C 182 112 222 112 254 121" stroke={GOLD} strokeWidth="1.2" fill="none" />
      {/* Gold buckle */}
      <rect x="194" y="108" width="14" height="12" rx="2.5" fill={GOLD} />
      <rect x="197" y="111" width="8" height="6" rx="1.5" fill="#181324" />
      <rect x="200" y="109" width="2.5" height="10" rx="0.5" fill={GOLD} />
      {/* Hanging crescent moon talisman */}
      <path d="M194 121 Q192 128 193 133" stroke={GOLD} strokeWidth="1" fill="none" />
      <path d="M195 133 C 192 133 190 137 193 140 C 195 140 197 137 197 135 C 196 136 194 136 193 135 Z" fill={GOLD} />
    </g>
  );
}

function HatHood({ p }) {
  return (
    <g>
      {/* Main cowl silhouette */}
      <path fillRule="evenodd" d="M200 58 C 144 58 116 104 120 178 C 122 214 136 238 154 246 C 148 218 144 194 148 172 A 58 58 0 0 1 252 172 C 256 194 252 218 246 246 C 264 238 278 214 280 178 C 284 104 256 58 200 58 Z" fill={p.robe} />
      {/* Soft cowl highlight & cowl peak */}
      <path d="M200 58 C 166 58 142 80 130 116 C 150 90 174 76 200 76 C 226 76 250 90 270 116 C 258 80 234 58 200 58 Z" fill={p.light} opacity="0.6" />
      <path d="M196 50 C 198 38 208 34 214 38 C 210 44 208 50 208 58 C 204 56 200 54 196 50 Z" fill={p.robe} />
      {/* Shoulder draping shadow */}
      <path d="M132 162 C 128 190 134 214 150 230 C 144 206 144 184 148 166 Z" fill={p.dark} />
      <path d="M268 162 C 272 190 266 214 250 230 C 256 206 256 184 252 166 Z" fill={p.dark} />
      {/* Gold-embroidered cowl rim */}
      <path d="M150 172 A 58 58 0 0 1 250 172" stroke={GOLD} strokeWidth="2.2" fill="none" opacity="0.8" />
      <path d="M148 172 L154 246 M252 172 L246 246" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.75" />
      {/* Atmospheric eye shadow */}
      <path d="M148 134 A 62 32 0 0 0 252 134 L 252 146 A 62 26 0 0 1 148 146 Z" fill="#000000" opacity="0.16" />
    </g>
  );
}

function HatWide() {
  const starPts = "M0 -10 L2.9 -3.1 L10 -3.1 L4.5 1.8 L6.9 9 L0 4.9 L-6.9 9 L-4.5 1.8 L-10 -3.1 L-2.9 -3.1 Z";
  const stars = [[138, 116, 7], [264, 114, 8], [200, 130, 5], [166, 128, 4.5], [236, 128, 4.5], [182, 92, 4], [218, 92, 4]];
  return (
    <g>
      {/* Ambient underside shadow */}
      <ellipse cx="200" cy="128" rx="114" ry="26" fill="#000000" opacity="0.25" />
      {/* Crown cone */}
      <path d="M158 116 C 164 74 180 46 202 38 C 228 46 240 76 244 116 Z" fill="#1C1838" />
      <path d="M158 116 C 164 80 178 56 198 44 C 188 68 184 92 184 116 Z" fill="#3D3466" opacity="0.75" />
      {/* Sweeping peacock / astral feather */}
      <path d="M236 112 C 256 94 274 74 296 68 C 286 86 270 102 244 116 Z" fill="#5CE1E6" opacity="0.9" />
      <path d="M240 110 C 258 96 272 80 290 74" stroke="#FFE680" strokeWidth="1.2" fill="none" />
      <circle cx="288" cy="72" r="3" fill="#E8B44F" />
      <circle cx="288" cy="72" r="1.5" fill="#FFF" />
      {/* Undulating wide celestial brim */}
      <ellipse cx="200" cy="124" rx="114" ry="24" fill="#120E26" />
      <ellipse cx="200" cy="118" rx="114" ry="22" fill="#241E46" />
      <path d="M90 118 C 130 138 270 138 310 118" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.85" />
      {/* Gold star constellation map */}
      {stars.map(([sx, sy, s], i) => (
        <path key={i} transform={`translate(${sx} ${sy}) scale(${s / 10})`} d={starPts} fill={GOLD} />
      ))}
      <line x1="182" y1="92" x2="200" y2="130" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
      <line x1="218" y1="92" x2="200" y2="130" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
    </g>
  );
}

function HatCrown() {
  return (
    <g>
      {/* Crown base band */}
      <path d="M152 142 C 182 132 218 132 248 142 L 248 150 C 218 140 182 140 152 150 Z" fill={GOLD_D} />
      {/* 5 Imperial Gothic filigree spires */}
      <path d="M152 142 L 152 100 L 174 120 L 200 76 L 226 120 L 248 100 L 248 142 C 218 132 182 132 152 142 Z" fill={GOLD} />
      {/* Filigree facet highlights */}
      <path d="M152 100 L 174 120 L 200 76 L 200 90 L 180 126 L 158 108 Z" fill="#FFF3C4" opacity="0.75" />
      <path d="M200 76 L 226 120 L 248 100 L 242 108 L 220 126 L 200 90 Z" fill="#C08A2E" opacity="0.5" />
      {/* Inset radiant elemental cabochon gemstones */}
      <circle cx="200" cy="112" r="6" fill="#E11D48" />
      <circle cx="198.5" cy="110" r="1.8" fill="#FFF" opacity="0.8" />
      <circle cx="172" cy="124" r="4.2" fill="#0284C7" />
      <circle cx="170.8" cy="122.5" r="1.3" fill="#FFF" opacity="0.8" />
      <circle cx="228" cy="124" r="4.2" fill="#16A34A" />
      <circle cx="226.8" cy="122.5" r="1.3" fill="#FFF" opacity="0.8" />
      <circle cx="156" cy="136" r="3" fill="#9333EA" />
      <circle cx="244" cy="136" r="3" fill="#F59E0B" />
      {/* Central hovering diamond star crest */}
      <polygon points="200,60 203,70 212,72 203,74 200,84 197,74 188,72 197,70" fill="#FFF" opacity="0.9" />
    </g>
  );
}

function HatCirclet() {
  return (
    <g>
      {/* Platinum/silver winged brow band */}
      <path d="M152 148 Q200 134 248 148 L 248 153 Q200 139 152 153 Z" fill="#CBD5E1" />
      <path d="M152 148 Q200 134 248 148" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
      {/* Left winged filigree */}
      <path d="M152 150 C 142 142 138 134 142 126 C 146 136 150 144 154 148 Z" fill="#E2E8F0" />
      <path d="M152 150 C 144 146 140 140 142 134" stroke="#94A3B8" strokeWidth="1" fill="none" />
      {/* Right winged filigree */}
      <path d="M248 150 C 258 142 262 134 258 126 C 254 136 250 144 246 148 Z" fill="#E2E8F0" />
      <path d="M248 150 C 256 146 260 140 258 134" stroke="#94A3B8" strokeWidth="1" fill="none" />
      {/* Center teardrop celestial gemstone */}
      <circle cx="200" cy="138" r="4.5" fill={GOLD} />
      <path d="M200 136 C 196 138 196 145 200 149 C 204 145 204 138 200 136 Z" fill="#38BDF8" />
      <circle cx="199" cy="142" r="1.2" fill="#FFFFFF" opacity="0.9" />
    </g>
  );
}

function CapeTravel({ color, dark }) {
  return (
    <g opacity="0.96">
      {/* Heavy billowing wool cape flanks */}
      <path d="M156 226 C 114 248 92 318 96 432 C 96 448 104 460 116 464 C 124 422 118 340 142 268 C 150 248 156 236 156 226 Z" fill={color} />
      <path d="M244 226 C 286 248 308 318 304 432 C 304 448 296 460 284 464 C 276 422 282 340 258 268 C 250 248 244 236 244 226 Z" fill={color} />
      {/* Deep inner fold shading */}
      <path d="M116 464 C 124 422 118 340 142 268 L 152 274 C 130 342 134 418 128 458 Z" fill={dark} opacity="0.6" />
      <path d="M284 464 C 276 422 282 340 258 268 L 248 274 C 270 342 266 418 272 458 Z" fill={dark} opacity="0.6" />
      {/* Leather hem border & stitching */}
      <path d="M96 432 C 100 452 110 462 116 464" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.75" />
      <path d="M304 432 C 300 452 290 462 284 464" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.75" />
      {/* Textured fur shoulder mantle */}
      <path d="M146 228 C 136 232 128 244 134 256 C 142 258 148 250 156 244 Z" fill="#423527" />
      <path d="M254 228 C 264 232 272 244 266 256 C 258 258 252 250 244 244 Z" fill="#423527" />
      {/* Brass brooches with connecting chain */}
      <circle cx="152" cy="236" r="4.5" fill={GOLD} />
      <circle cx="152" cy="236" r="2.2" fill="#24170D" />
      <circle cx="248" cy="236" r="4.5" fill={GOLD} />
      <circle cx="248" cy="236" r="2.2" fill="#24170D" />
      <path d="M154 238 Q200 250 246 238" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.9" />
    </g>
  );
}

function CapeShadow({ color, dark }) {
  return (
    <g opacity="0.96">
      {/* Ethereal living shadow tendrils */}
      <path d="M156 226 C 110 250 84 316 92 418 L 106 456 L 114 426 L 120 458 L 132 434 L 120 466 C 126 422 118 336 142 268 C 148 250 156 236 156 226 Z" fill={color} />
      <path d="M244 226 C 290 250 316 316 308 418 L 294 456 L 286 426 L 280 458 L 268 434 L 280 466 C 274 422 282 336 258 268 C 252 250 244 236 244 226 Z" fill={color} />
      {/* Dissolving phantom smoke folds */}
      <path d="M92 418 C 98 376 106 316 130 276" stroke={dark} strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M308 418 C 302 376 294 316 270 276" stroke={dark} strokeWidth="2.5" fill="none" opacity="0.7" />
      {/* Floating purple void motes */}
      <circle cx="84" cy="402" r="2.2" fill="#C084FC" opacity="0.8" />
      <circle cx="98" cy="442" r="1.6" fill="#A855F7" opacity="0.7" />
      <circle cx="316" cy="402" r="2.2" fill="#C084FC" opacity="0.8" />
      <circle cx="302" cy="442" r="1.6" fill="#A855F7" opacity="0.7" />
      <path d="M88 424 Q82 436 90 446" stroke="#C084FC" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M312 424 Q318 436 310 446" stroke="#C084FC" strokeWidth="1" fill="none" opacity="0.6" />
    </g>
  );
}

function CapeStar({ color, dark }) {
  const starPts = "M0 -8 L2.2 -2.5 L8 -2.5 L3.6 1.4 L5.4 7.2 L0 4 L-5.4 7.2 L-3.6 1.4 L-8 -2.5 L-2.2 -2.5 Z";
  const stars = [[126, 316, 1], [274, 336, 0.9], [132, 396, 0.85], [266, 398, 1], [118, 436, 0.7], [282, 436, 0.75]];
  return (
    <g opacity="0.97">
      {/* Deep space blue velvet mantle */}
      <path d="M158 226 C 116 250 94 318 98 432 C 98 448 104 460 116 464 C 124 422 118 340 142 268 C 150 248 158 236 158 226 Z" fill={color} />
      <path d="M242 226 C 284 250 306 318 302 432 C 302 448 296 460 284 464 C 276 422 282 340 258 268 C 250 248 242 236 242 226 Z" fill={color} />
      {/* Scalloped gold lace hem */}
      <path d="M98 432 C 104 452 112 462 116 464" stroke={GOLD} strokeWidth="2.2" fill="none" opacity="0.9" />
      <path d="M302 432 C 296 452 288 462 284 464" stroke={GOLD} strokeWidth="2.2" fill="none" opacity="0.9" />
      {/* Inner shadow */}
      <path d="M116 464 C 124 422 118 340 142 268 L 152 274 C 130 342 134 418 128 458 Z" fill={dark} opacity="0.55" />
      <path d="M284 464 C 276 422 282 340 258 268 L 248 274 C 270 342 266 418 272 458 Z" fill={dark} opacity="0.55" />
      {/* Constellation line connections */}
      <line x1="126" y1="316" x2="132" y2="396" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
      <line x1="132" y1="396" x2="118" y2="436" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
      <line x1="274" y1="336" x2="266" y2="398" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
      <line x1="266" y1="398" x2="282" y2="436" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
      {/* Gold star nodes */}
      {stars.map(([x, y, s], i) => (
        <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d={starPts} fill={GOLD} opacity="0.95" />
      ))}
    </g>
  );
}

function CapePhoenix({ color, dark }) {
  return (
    <g opacity="0.98">
      {/* Fiery wing-feather tiers */}
      <path d="M150 228 C 106 250 82 310 88 400 C 74 410 64 428 68 450 C 90 442 106 426 116 406 C 108 442 110 460 120 466 C 130 442 136 402 148 352 C 154 300 156 260 150 228 Z" fill={color} />
      <path d="M250 228 C 294 250 318 310 312 400 C 326 410 336 428 332 450 C 310 442 294 426 284 406 C 292 442 290 460 280 466 C 270 442 264 402 252 352 C 246 300 244 260 250 228 Z" fill={color} />
      {/* Flame tip contrasts */}
      <path d="M88 400 C 74 410 64 428 68 450 C 90 442 106 426 116 406 Z" fill="#F59E0B" opacity="0.9" />
      <path d="M312 400 C 326 410 336 428 332 450 C 310 442 294 426 284 406 Z" fill="#F59E0B" opacity="0.9" />
      {/* Inner fiery feathers */}
      <path d="M116 340 C 106 358 100 376 100 394 M284 340 C 294 358 300 376 300 394" stroke="#FEF08A" strokeWidth="2.5" opacity="0.85" fill="none" />
      {/* Floating ember sparks */}
      <circle className="wingEmber" cx="62" cy="428" r="2.2" fill="#F59E0B" />
      <circle className="wingEmber" style={{ animationDelay: "0.7s" }} cx="76" cy="458" r="1.5" fill="#FEF08A" />
      <circle className="wingEmber" style={{ animationDelay: "1.2s" }} cx="338" cy="428" r="2.2" fill="#F59E0B" />
      <circle className="wingEmber" style={{ animationDelay: "0.4s" }} cx="324" cy="458" r="1.5" fill="#FEF08A" />
      {/* Phoenix gold brooch */}
      <circle cx="200" cy="234" r="5" fill={GOLD} />
      <polygon points="200,228 203,235 200,240 197,235" fill="#E11D48" />
    </g>
  );
}

function WingsAngel({ color, dark }) {
  const leftWing = (
    <>
      {/* Left Wing Under-feathers (Depth layer) */}
      <g fill="url(#angelFeatherUnder)" stroke="#B5A48B" strokeWidth={0.8} opacity={0.92}>
        <path d="M132 198 C 104 162 68 132 38 128 C 32 140 44 162 70 186 C 94 208 120 216 132 198 Z" />
        <path d="M124 218 C 92 190 48 170 20 180 C 16 194 30 216 60 232 C 86 244 112 238 124 218 Z" />
        <path d="M122 240 C 90 222 46 218 18 248 C 18 264 38 278 68 280 C 94 280 114 264 122 240 Z" />
        <path d="M126 260 C 102 250 56 260 36 302 C 38 316 58 324 84 312 C 106 300 120 282 126 260 Z" />
        <path d="M134 278 C 114 274 76 298 62 354 C 68 364 88 362 108 340 C 122 322 130 300 134 278 Z" />
      </g>

      {/* Main Primary Flight Feathers (Front outer layer) */}
      {/* Feather 1 (High Scapular Crest) */}
      <path d="M146 200 C 134 146 108 98 76 78 C 70 88 78 110 98 138 C 116 162 136 188 146 200 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M144 198 C 132 148 110 106 82 86" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M146 200 C 134 146 108 98 76 78" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 2 (Upper Primary) */}
      <path d="M136 204 C 112 148 74 108 38 98 C 32 110 46 134 72 164 C 96 190 122 210 136 204 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M134 202 C 112 152 80 118 44 106" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M136 204 C 112 148 74 108 38 98" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 3 (Apex Primary - Maximum Wingspan) */}
      <path d="M128 214 C 98 168 52 136 16 142 C 12 158 28 182 58 204 C 86 222 114 226 128 214 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M126 212 C 98 172 58 146 24 150" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M128 214 C 98 168 52 136 16 142" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 4 (Mid Primary) */}
      <path d="M124 228 C 92 196 42 180 12 204 C 10 220 28 240 60 248 C 88 252 112 244 124 228 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M122 226 C 92 198 48 186 20 210" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M124 228 C 92 196 42 180 12 204" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 5 (Mid-Lower Primary) */}
      <path d="M126 246 C 96 226 46 224 18 256 C 18 272 38 286 70 286 C 98 282 118 266 126 246 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M124 244 C 96 228 52 230 26 262" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M126 246 C 96 226 46 224 18 256" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 6 (Lower Primary) */}
      <path d="M132 264 C 106 252 58 264 34 310 C 36 324 58 332 86 318 C 110 304 124 284 132 264 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M130 262 C 106 254 64 268 42 314" stroke="url(#angelGoldQuill)" strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <path d="M132 264 C 106 252 58 264 34 310" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 7 (Trailing Primary) */}
      <path d="M138 282 C 118 278 78 300 62 356 C 68 366 88 366 110 342 C 126 324 136 302 138 282 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M136 280 C 118 280 84 304 70 358" stroke="url(#angelGoldQuill)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <path d="M138 282 C 118 278 78 300 62 356" stroke="#FFFFFF" strokeWidth={1.2} fill="none" opacity={0.9} />

      {/* Feather 8 (Bottom Inward Feather) */}
      <path d="M144 296 C 132 298 100 324 90 384 C 96 392 112 390 128 366 C 140 348 146 322 144 296 Z" fill="url(#angelFeatherPrimary)" stroke="#C2B6A3" strokeWidth={1} />
      <path d="M142 294 C 132 302 106 328 98 382" stroke="url(#angelGoldQuill)" strokeWidth={1.3} strokeLinecap="round" fill="none" />

      {/* Secondary Feathers (Mid-depth body plumage) */}
      <g fill="url(#angelFeatherSecondary)" stroke="#C9BFB0" strokeWidth={1}>
        <path d="M142 196 C 126 158 98 128 76 118 C 72 128 82 146 100 170 C 118 190 134 202 142 196 Z" />
        <path d="M138 210 C 116 178 82 154 52 158 C 48 168 62 188 86 206 C 108 220 128 222 138 210 Z" />
        <path d="M134 226 C 110 204 74 192 46 210 C 44 222 58 236 86 242 C 110 246 126 238 134 226 Z" />
        <path d="M136 244 C 112 228 76 226 52 250 C 50 262 66 272 92 272 C 114 270 128 258 136 244 Z" />
        <path d="M140 260 C 120 250 84 258 64 292 C 66 304 82 308 106 298 C 124 288 136 274 140 260 Z" />
        <path d="M144 276 C 128 274 98 290 84 332 C 90 340 106 338 122 322 C 134 308 142 292 144 276 Z" />
      </g>

      {/* Covert Feathers (Upper Scapular Down) */}
      <g fill="url(#angelFeatherCovert)" stroke="#D4CABE" strokeWidth={0.9}>
        <path d="M150 212 C 140 180 120 150 100 138 C 94 146 102 164 116 182 C 132 200 146 216 150 212 Z" />
        <path d="M146 225 C 130 198 104 176 82 178 C 78 186 90 200 108 212 C 126 224 142 228 146 225 Z" />
        <path d="M144 238 C 126 218 100 206 78 218 C 76 226 88 238 108 244 C 126 248 140 244 144 238 Z" />
        <path d="M146 250 C 128 236 102 234 84 254 C 84 262 98 270 114 268 C 130 266 142 258 146 250 Z" />
      </g>

      {/* Wing Upper Bone Spar & Gold Filigree */}
      <path d="M152 228 C 146 182 128 138 102 114" stroke="url(#angelGoldQuill)" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M152 228 C 146 182 128 138 102 114" stroke="#FFFFFF" strokeWidth={1.2} strokeLinecap="round" fill="none" opacity={0.8} />

      {/* Shoulder Attachment Brooch */}
      <circle cx="152" cy="228" r="5.5" fill={GOLD} stroke={GOLD_D} strokeWidth={1.2} />
      <circle cx="152" cy="228" r="3" fill="#FFFFFF" />
      <polygon points="152,223 154,228 152,233 150,228" fill="#FEF08A" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="angelHaloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#FDE047" stopOpacity="0.16" />
          <stop offset="85%" stopColor="#E8B44F" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#E8B44F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="angelFeatherPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FCFAF5" />
          <stop offset="85%" stopColor={color || "#F2E9D8"} />
          <stop offset="100%" stopColor={dark || "#E6D9C2"} />
        </linearGradient>
        <linearGradient id="angelFeatherSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8F3E8" />
          <stop offset="100%" stopColor={dark || "#E5D8C0"} />
        </linearGradient>
        <linearGradient id="angelFeatherCovert" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FAF5EC" />
          <stop offset="100%" stopColor="#EFE4D2" />
        </linearGradient>
        <linearGradient id="angelFeatherUnder" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE2D0" />
          <stop offset="60%" stopColor="#DDCDB6" />
          <stop offset="100%" stopColor="#CBB79C" />
        </linearGradient>
        <linearGradient id="angelGoldQuill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FDE047" />
          <stop offset="75%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_D} />
        </linearGradient>
      </defs>

      {/* Divine Radiant Glow Behind Wings */}
      <ellipse cx="200" cy="210" rx="140" ry="110" fill="url(#angelHaloGlow)" opacity={0.35} />
      <circle cx="200" cy="180" r="90" fill="#FEF08A" opacity="0.08" />

      {/* Left Wing */}
      <g className="angelWingL">{leftWing}</g>

      {/* Right Wing (Mirrored cleanly across X=200 with isolated animation) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="angelWingL">{leftWing}</g>
      </g>

      {/* Floating Sacred Sparkles */}
      <g fill="#FFFBEB">
        <path className="holySparkle" d="M36 100 L38 94 L40 100 L46 102 L40 104 L38 110 L36 104 L30 102 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "0.8s" }} d="M14 148 L15.5 143 L17 148 L22 149.5 L17 151 L15.5 156 L14 151 L9 149.5 Z" fill="#FFFFFF" />
        <path className="holySparkle" style={{ animationDelay: "1.4s" }} d="M12 210 L13.5 205 L15 210 L20 211.5 L15 213 L13.5 218 L12 213 L7 211.5 Z" fill="#FDE047" />
        <path className="holySparkle" style={{ animationDelay: "0.4s" }} d="M66 360 L67.5 355 L69 360 L74 361.5 L69 363 L67.5 368 L66 363 L61 361.5 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "0.5s" }} d="M364 100 L362 94 L360 100 L354 102 L360 104 L362 110 L364 104 L370 102 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "1.2s" }} d="M386 148 L384.5 143 L383 148 L378 149.5 L383 151 L384.5 156 L386 151 L391 149.5 Z" fill="#FFFFFF" />
        <path className="holySparkle" style={{ animationDelay: "0.2s" }} d="M388 210 L386.5 205 L385 210 L380 211.5 L385 213 L386.5 218 L388 213 L393 211.5 Z" fill="#FDE047" />
        <path className="holySparkle" style={{ animationDelay: "1.6s" }} d="M334 360 L332.5 355 L331 360 L326 361.5 L331 363 L332.5 368 L334 363 L339 361.5 Z" fill="#FEF08A" />
      </g>
    </g>
  );
}

function WingsDemon({ color, dark }) {
  const leftWing = (
    <>
      {/* Infernal Leathery Webbed Membranes (Curved organic scalloping) */}
      <g stroke="#140306" strokeWidth={1.4}>
        <path d="M102 118 L 38 122 C 40 148 32 168 20 185 L 102 118 Z" fill="url(#demonMembrane)" />
        <path d="M102 118 L 20 185 C 38 220 36 250 32 275 L 102 118 Z" fill="url(#demonMembrane)" />
        <path d="M102 118 L 32 275 C 58 310 62 332 70 350 L 102 118 Z" fill="url(#demonMembrane)" />
        <path d="M102 118 L 70 350 C 104 340 128 320 146 290 L 152 238 Z" fill="url(#demonMembrane)" />
      </g>

      {/* Translucent crimson leathery rim glow on scalloped borders */}
      <path d="M38 122 C 40 148 32 168 20 185 M20 185 C 38 220 36 250 32 275 M32 275 C 58 310 62 332 70 350 M70 350 C 104 340 128 320 146 290" stroke="#EF4444" strokeWidth={1.6} fill="none" opacity={0.65} />
      <path d="M38 122 C 40 148 32 168 20 185 M20 185 C 38 220 36 250 32 275 M32 275 C 58 310 62 332 70 350" stroke="#FDE047" strokeWidth={0.8} fill="none" opacity={0.4} />

      {/* Leathery tension shadows / stretch folds */}
      <g stroke="#0D0204" strokeWidth={1.8} fill="none" opacity={0.65}>
        <path d="M100 122 C 75 140 50 152 28 162" />
        <path d="M98 126 C 72 165 52 205 30 238" />
        <path d="M96 130 C 82 190 70 250 48 305" />
        <path d="M102 134 C 105 190 108 260 96 325" />
      </g>

      {/* Pulsing Molten Lava Veins */}
      <g stroke="url(#demonLavaVein)" fill="none" opacity={0.88}>
        <path d="M98 124 Q 68 132 46 138 Q 38 148 28 160" strokeWidth={1.3} />
        <path d="M68 132 Q 52 126 40 128" strokeWidth={0.8} />
        <path d="M96 128 Q 62 170 36 215 Q 28 238 26 255" strokeWidth={1.6} />
        <path d="M72 160 Q 50 185 30 198" strokeWidth={1.0} />
        <path d="M52 195 Q 40 220 32 240" strokeWidth={0.9} />
        <path d="M94 132 Q 74 195 56 265 Q 52 295 56 320" strokeWidth={1.4} />
        <path d="M76 210 Q 64 245 44 285" strokeWidth={0.9} />
        <path d="M98 136 Q 106 200 102 270 Q 112 295 125 315" strokeWidth={1.2} />
      </g>

      {/* Articulated Draconic Finger Struts (Heavy bone phalanges) */}
      {/* Digit 1 (Top strut) */}
      <path d="M102 118 C 76 114 54 116 38 122" stroke="url(#demonBone)" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M102 118 C 76 114 54 116 38 122" stroke="url(#demonBoneHighlight)" strokeWidth={1.4} strokeLinecap="round" fill="none" />
      <path d="M38 122 C 30 120 24 116 18 114 C 22 122 28 126 38 124 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={0.8} />
      <circle cx="68" cy="116" r={2.2} fill="#22080D" />

      {/* Digit 2 (Main outward strut - Longest reach) */}
      <path d="M102 118 C 66 142 38 162 20 185" stroke="url(#demonBone)" strokeWidth={3.6} strokeLinecap="round" fill="none" />
      <path d="M102 118 C 66 142 38 162 20 185" stroke="url(#demonBoneHighlight)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <path d="M20 185 C 14 186 10 184 6 182 C 9 190 15 194 20 187 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={0.8} />
      <circle cx="56" cy="152" r={2.4} fill="#22080D" />

      {/* Digit 3 (Mid-lower strut) */}
      <path d="M102 118 C 72 170 48 225 32 275" stroke="url(#demonBone)" strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <path d="M102 118 C 72 170 48 225 32 275" stroke="url(#demonBoneHighlight)" strokeWidth={1.4} strokeLinecap="round" fill="none" />
      <path d="M32 275 C 26 280 20 284 16 290 C 23 290 28 286 34 277 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={0.8} />
      <circle cx="64" cy="200" r={2.2} fill="#22080D" />

      {/* Digit 4 (Bottom trailing strut) */}
      <path d="M102 118 C 92 195 82 275 70 350" stroke="url(#demonBone)" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M102 118 C 92 195 82 275 70 350" stroke="url(#demonBoneHighlight)" strokeWidth={1.3} strokeLinecap="round" fill="none" />
      <path d="M70 350 C 66 360 62 368 58 376 C 66 372 70 364 72 352 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={0.8} />
      <circle cx="84" cy="245" r={2.2} fill="#22080D" />

      {/* Heavy Muscular Forearm Bone (Shoulder to Wrist) */}
      <path d="M152 238 C 146 195 132 152 102 118 C 96 122 108 160 136 244 Z" fill="url(#demonBone)" stroke="#120306" strokeWidth={1.5} />
      <path d="M150 236 C 144 196 130 155 102 118" stroke="url(#demonBoneHighlight)" strokeWidth={2.2} strokeLinecap="round" fill="none" />

      {/* Forearm Spikes / Horns */}
      <path d="M128 162 L 120 144 L 134 156 Z" fill="url(#demonClawGrad)" stroke="#120306" strokeWidth={0.8} />
      <path d="M116 138 L 106 122 L 122 132 Z" fill="url(#demonClawGrad)" stroke="#120306" strokeWidth={0.8} />

      {/* Apex Wrist Raptor Talon Hook */}
      <path d="M104 120 C 100 96 88 82 74 78 C 80 92 90 106 100 122 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={1.0} />
      <path d="M102 118 L 110 110 L 108 122 Z" fill="url(#demonClawGrad)" stroke="#0F172A" strokeWidth={0.8} />

      {/* Wrist Joint Armored Sphere & Demonic Eye Core */}
      <circle cx="102" cy="120" r={5} fill="#22080D" stroke="#5A121A" strokeWidth={1.2} />
      <circle cx="102" cy="120" r={3} fill="#DC2626" />
      <circle cx="102" cy="120" r={1.4} fill="#FDE047" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="demonAbyssGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.32" />
          <stop offset="50%" stopColor="#7F1D1D" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E0A0F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="demonMembrane" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#180508" />
          <stop offset="35%" stopColor={dark || "#320C13"} />
          <stop offset="75%" stopColor={color || "#4C131D"} />
          <stop offset="100%" stopColor="#751A27" />
        </linearGradient>
        <linearGradient id="demonBone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A121A" />
          <stop offset="60%" stopColor="#22080D" />
          <stop offset="100%" stopColor="#140306" />
        </linearGradient>
        <linearGradient id="demonBoneHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="70%" stopColor="#65151D" />
          <stop offset="100%" stopColor="#320A0E" />
        </linearGradient>
        <linearGradient id="demonClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="45%" stopColor="#CBD5E1" />
          <stop offset="85%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="demonLavaVein" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Abyssal Crimson Glow */}
      <ellipse cx="200" cy="220" rx="140" ry="110" fill="url(#demonAbyssGlow)" opacity={0.45} />

      {/* Left Wing */}
      <g className="demonWingL">{leftWing}</g>

      {/* Right Wing (Mirrored cleanly across X=200 with isolated animation) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="demonWingL">{leftWing}</g>
      </g>

      {/* Rising Infernal Embers */}
      <g fill="#EF4444">
        <circle className="wingEmber" cx="24" cy="175" r={2.2} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "0.7s" }} cx="44" cy="245" r={1.8} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.3s" }} cx="76" cy="325" r={2} fill="#EF4444" />
        <circle className="wingEmber" style={{ animationDelay: "0.3s" }} cx="18" cy="120" r={1.6} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "0.9s" }} cx="376" cy="175" r={2.2} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "1.5s" }} cx="356" cy="245" r={1.8} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "0.5s" }} cx="324" cy="325" r={2} fill="#EF4444" />
        <circle className="wingEmber" style={{ animationDelay: "1.1s" }} cx="382" cy="120" r={1.6} fill="#FDE047" />
      </g>
    </g>
  );
}

function WingsPhoenix({ color, dark }) {
  const leftWing = (
    <>
      {/* Left Wing Fiery Under-Plumage */}
      <g fill="url(#phoenixFlame2)" stroke="#7F1D1D" strokeWidth={0.8} opacity={0.9}>
        <path d="M134 200 C 104 162 68 132 38 128 C 32 140 44 162 70 186 C 94 208 120 216 134 200 Z" />
        <path d="M124 218 C 92 190 48 170 20 180 C 16 194 30 216 60 232 C 86 244 112 238 124 218 Z" />
        <path d="M122 240 C 90 222 46 218 18 248 C 18 264 38 278 68 280 C 94 280 114 264 122 240 Z" />
        <path d="M126 260 C 102 250 56 260 36 302 C 38 316 58 324 84 312 C 106 300 120 282 126 260 Z" />
        <path d="M134 278 C 114 274 76 298 62 354 C 68 364 88 362 108 340 C 122 322 130 300 134 278 Z" />
      </g>

      {/* Primary Solar Flame Feathers */}
      <path d="M146 200 C 134 146 108 98 76 78 C 70 88 78 110 98 138 C 116 162 136 188 146 200 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M144 198 C 132 148 110 106 82 86" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      <path d="M136 204 C 112 148 74 108 38 98 C 32 110 46 134 72 164 C 96 190 122 210 136 204 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M134 202 C 112 152 80 118 44 106" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      <path d="M128 214 C 98 168 52 136 16 142 C 12 158 28 182 58 204 C 86 222 114 226 128 214 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M126 212 C 98 172 58 146 24 150" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      <path d="M124 228 C 92 196 42 180 12 204 C 10 220 28 240 60 248 C 88 252 112 244 124 228 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M122 226 C 92 198 48 186 20 210" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      <path d="M126 246 C 96 226 46 224 18 256 C 18 272 38 286 70 286 C 98 282 118 266 126 246 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M124 244 C 96 228 52 230 26 262" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      <path d="M132 264 C 106 252 58 264 34 310 C 36 324 58 332 86 318 C 110 304 124 284 132 264 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M130 262 C 106 254 64 268 42 314" stroke="url(#phoenixGoldSpine)" strokeWidth={1.6} strokeLinecap="round" fill="none" />

      <path d="M138 282 C 118 278 78 300 62 356 C 68 366 88 366 110 342 C 126 324 136 302 138 282 Z" fill="url(#phoenixFlame1)" stroke="#B91C1C" strokeWidth={1} />
      <path d="M136 280 C 118 280 84 304 70 358" stroke="url(#phoenixGoldSpine)" strokeWidth={1.5} strokeLinecap="round" fill="none" />

      {/* Inner Leaping Flame Tongues */}
      <g fill="url(#phoenixFlameCore)" opacity={0.95}>
        <path d="M148 214 C 132 176 108 142 86 130 C 84 140 94 158 112 180 C 128 200 142 216 148 214 Z" />
        <path d="M142 228 C 122 195 92 172 66 174 C 64 184 76 198 98 210 C 118 222 136 226 142 228 Z" />
        <path d="M138 244 C 118 218 88 210 66 228 C 66 238 78 248 100 252 C 120 254 134 248 138 244 Z" />
        <path d="M142 260 C 122 242 94 246 76 274 C 78 284 94 288 114 278 C 128 272 138 264 142 260 Z" />
      </g>

      {/* Solar Wing Crest Spar */}
      <path d="M152 228 C 146 182 128 138 102 114" stroke="#FEF08A" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M152 228 C 146 182 128 138 102 114" stroke="#FFFFFF" strokeWidth={1.4} strokeLinecap="round" fill="none" />

      {/* Solar Core Brooch */}
      <circle cx="152" cy="228" r="6" fill="#EA580C" stroke="#FEF08A" strokeWidth={1.4} />
      <circle cx="152" cy="228" r="3.2" fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="phoenixSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#EA580C" stopOpacity="0.2" />
          <stop offset="85%" stopColor="#991B1B" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="phoenixFlame1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor={color || "#F97316"} />
          <stop offset="100%" stopColor={dark || "#DC2626"} />
        </linearGradient>
        <linearGradient id="phoenixFlame2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor={color || "#F97316"} />
          <stop offset="80%" stopColor="#C2410C" />
          <stop offset="100%" stopColor={dark || "#991B1B"} />
        </linearGradient>
        <linearGradient id="phoenixFlameCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="phoenixGoldSpine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Solar Halo Glow */}
      <ellipse cx="200" cy="210" rx="140" ry="110" fill="url(#phoenixSunGlow)" opacity={0.4} />

      {/* Left Wing */}
      <g className="phoenixWingL">{leftWing}</g>

      {/* Right Wing (Mirrored cleanly across X=200 with isolated animation) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="phoenixWingL">{leftWing}</g>
      </g>

      {/* Floating Solar Flame Embers */}
      <g fill="#F59E0B">
        <circle className="wingEmber" cx="28" cy="165" r={2.2} fill="#FEF08A" />
        <circle className="wingEmber" style={{ animationDelay: "0.8s" }} cx="48" cy="235" r={1.8} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.2s" }} cx="72" cy="315" r={2} fill="#EA580C" />
        <circle className="wingEmber" style={{ animationDelay: "0.4s" }} cx="20" cy="115" r={1.6} fill="#FFFFFF" />
        <circle className="wingEmber" style={{ animationDelay: "0.6s" }} cx="372" cy="165" r={2.2} fill="#FEF08A" />
        <circle className="wingEmber" style={{ animationDelay: "1.4s" }} cx="352" cy="235" r={1.8} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.0s" }} cx="328" cy="315" r={2} fill="#EA580C" />
        <circle className="wingEmber" style={{ animationDelay: "0.2s" }} cx="380" cy="115" r={1.6} fill="#FFFFFF" />
      </g>
    </g>
  );
}

function WingsFae({ color, dark }) {
  const leftWing = (
    <>
      {/* Upper Large Gossamer Wing */}
      <g>
        <path d="M150 224 C 136 170 105 105 56 74 C 44 86 38 120 44 165 C 50 205 75 235 146 230 Z" fill="url(#faeGlass1)" stroke="#38BDF8" strokeWidth={1.2} />
        <path d="M144 220 C 132 172 104 116 62 88 C 66 110 74 145 92 180 C 110 210 130 222 144 220 Z" fill="#FFFFFF" opacity={0.38} />

        <g stroke="url(#faeVein)" strokeWidth={0.9} fill="none" opacity={0.85}>
          <path d="M150 224 C 128 178 94 130 56 74" strokeWidth={1.6} />
          <path d="M148 226 C 118 190 82 155 44 165" strokeWidth={1.3} />
          <path d="M146 228 C 114 218 86 215 50 205" strokeWidth={1.2} />

          <line x1="120" y1="172" x2="105" y2="188" />
          <line x1="96" y1="134" x2="78" y2="152" />
          <line x1="74" y1="102" x2="58" y2="122" />
          <line x1="108" y1="202" x2="94" y2="216" />
          <line x1="82" y1="176" x2="68" y2="194" />
          <line x1="62" y1="145" x2="48" y2="162" />
          <line x1="126" y1="192" x2="118" y2="214" />
          <line x1="100" y1="156" x2="90" y2="182" />
          <line x1="76" y1="124" x2="66" y2="152" />
        </g>

        <g fill="#FFFFFF">
          <circle cx="56" cy="74" r={2.2} />
          <circle cx="44" cy="165" r={1.8} />
          <circle cx="96" cy="134" r={1.4} />
          <circle cx="78" cy="152" r={1.4} />
          <circle cx="120" cy="172" r={1.5} />
        </g>
      </g>

      {/* Lower Secondary Gossamer Wing */}
      <g>
        <path d="M148 234 C 130 248 100 278 68 335 C 72 344 86 345 106 330 C 130 308 144 275 150 238 Z" fill="url(#faeGlass2)" stroke="#A855F7" strokeWidth={1.2} />
        <g stroke="url(#faeVein)" strokeWidth={0.8} fill="none" opacity={0.8}>
          <path d="M148 234 C 122 268 96 302 68 335" strokeWidth={1.4} />
          <path d="M148 236 C 134 275 118 310 106 330" />
          <line x1="124" y1="270" x2="134" y2="288" />
          <line x1="104" y1="298" x2="116" y2="315" />
          <line x1="88" y1="322" x2="96" y2="332" />
        </g>
        <circle cx="68" cy="335" r={1.8} fill="#FFFFFF" />
        <circle cx="106" cy="330" r={1.5} fill="#FFFFFF" />
      </g>

      {/* Wing Base Crystal Jewel */}
      <polygon points="150,224 154,230 150,236 146,230" fill="#67E8F9" stroke="#FFFFFF" strokeWidth={0.8} />
      <circle cx="150" cy="230" r={1.5} fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="faePrismGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#C084FC" stopOpacity="0.18" />
          <stop offset="85%" stopColor="#F472B6" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="faeGlass1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
          <stop offset="35%" stopColor={color || "#BAE6FD"} stopOpacity="0.82" />
          <stop offset="70%" stopColor="#DDD6FE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="faeGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor={dark || "#C4B5FD"} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="faeVein" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Prismatic Fae Aura */}
      <ellipse cx="200" cy="210" rx="140" ry="110" fill="url(#faePrismGlow)" opacity={0.45} />

      {/* Left Wing */}
      <g className="faeWingL">{leftWing}</g>

      {/* Right Wing (Mirrored cleanly across X=200 with isolated animation) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="faeWingL">{leftWing}</g>
      </g>

      {/* Shimmering Starlight Sparkles */}
      <g fill="#BAE6FD">
        <circle className="holySparkle" cx="50" cy="70" r={2.2} fill="#FFFFFF" />
        <circle className="holySparkle" style={{ animationDelay: "0.6s" }} cx="38" cy="160" r={1.8} fill="#67E8F9" />
        <circle className="holySparkle" style={{ animationDelay: "1.1s" }} cx="64" cy="330" r={2} fill="#C084FC" />
        <circle className="holySparkle" style={{ animationDelay: "0.3s" }} cx="350" cy="70" r={2.2} fill="#FFFFFF" />
        <circle className="holySparkle" style={{ animationDelay: "0.9s" }} cx="362" cy="160" r={1.8} fill="#67E8F9" />
        <circle className="holySparkle" style={{ animationDelay: "1.4s" }} cx="336" cy="330" r={2} fill="#C084FC" />
      </g>
    </g>
  );
}

const CAPE_COMPONENTS = {
  cape_travel: CapeTravel,
  cape_shadow: CapeShadow,
  cape_star: CapeStar,
  cape_phoenix: CapePhoenix,
  wings_angel: WingsAngel,
  wings_demon: WingsDemon,
  wings_phoenix: WingsPhoenix,
  wings_fae: WingsFae,
};

function RobeMidnightTrim() {
  const stars = [[156, 270, 2.5], [244, 270, 2.5], [174, 340, 2], [226, 340, 2], [158, 410, 2.2], [242, 410, 2.2], [195, 320, 1.8], [205, 420, 2]];
  return (
    <g>
      {/* Silver filigree lunar crescent on chest */}
      <path d="M200 256 C 193 256 193 274 200 274 C 195 270 195 260 200 256 Z" fill="#E2E8F0" opacity="0.95" />
      <circle cx="200" cy="265" r="1.5" fill="#FFFFFF" />
      {/* Lunar phase sequence down stole */}
      <circle cx="200" cy="340" r="3.5" fill="#E2E8F0" opacity="0.85" />
      <circle cx="200" cy="370" r="3" fill="#CBD5E1" opacity="0.8" />
      <circle cx="200" cy="400" r="2.5" fill="#94A3B8" opacity="0.75" />
      {/* Twinkling star field */}
      {stars.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#FFF3C4" opacity="0.9" />
          <line x1={x - r * 1.8} y1={y} x2={x + r * 1.8} y2={y} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.75" />
          <line x1={x} y1={y - r * 1.8} x2={x} y2={y + r * 1.8} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.75" />
        </g>
      ))}
      {/* Silver scalloped hem border */}
      <path d="M122 452 Q200 466 278 452" stroke="#CBD5E1" strokeWidth="2.2" fill="none" opacity="0.85" />
    </g>
  );
}

function RobeIvoryTrim() {
  return (
    <g>
      {/* High-priest sacred solar medallion on chest */}
      <circle cx="200" cy="266" r="9" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <circle cx="200" cy="266" r="5" fill="#FFFBEB" stroke={GOLD} strokeWidth="1" />
      {[...Array(8)].map((_, i) => {
        const rad = (i * 45 * Math.PI) / 180;
        const x1 = 200 + 7 * Math.sin(rad), y1 = 266 - 7 * Math.cos(rad);
        const x2 = 200 + 12 * Math.sin(rad), y2 = 266 - 12 * Math.cos(rad);
        return <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />;
      })}
      {/* Sacred geometric lattice embroidery down stole */}
      <g stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M190 330 L200 342 L210 330 L200 318 Z" />
        <path d="M190 366 L200 378 L210 366 L200 354 Z" />
        <path d="M190 402 L200 414 L210 402 L200 390 Z" />
        <circle cx="200" cy="330" r="1.8" fill={GOLD} />
        <circle cx="200" cy="366" r="1.8" fill={GOLD} />
        <circle cx="200" cy="402" r="1.8" fill={GOLD} />
      </g>
      {/* Scalloped gold lace hem */}
      <path d="M122 450 Q200 466 278 450" stroke={GOLD} strokeWidth="2.8" fill="none" />
      <path d="M126 444 Q200 460 274 444" stroke={GOLD_D} strokeWidth="1.2" fill="none" opacity="0.75" />
    </g>
  );
}

function RobeCrimsonTrim() {
  return (
    <g>
      {/* Royal flame embroidery on chest */}
      <path d="M200 250 C 205 258 210 262 208 270 C 206 276 200 278 196 272 C 194 268 196 262 200 250 Z" fill={GOLD} />
      <path d="M198 258 C 200 264 202 268 200 272" stroke="#B91C1C" strokeWidth="1.2" fill="none" />
      {/* Imperial filigree stole borders */}
      <g fill="none" stroke={GOLD} strokeWidth="1.8" opacity="0.9">
        <path d="M178 280 L184 298 L178 316" />
        <path d="M222 280 L216 298 L222 316" />
        <path d="M180 340 L188 370 L180 400" />
        <path d="M220 340 L212 370 L220 400" />
      </g>
      {/* Heraldic fleur-de-lis on lower skirt */}
      <g transform="translate(200 410) scale(0.85)">
        <path d="M0 -12 C 3 -6 5 -2 0 6 C -5 -2 -3 -6 0 -12 Z" fill={GOLD} />
        <path d="M-2 0 C -8 -4 -12 2 -4 6 C -2 6 -1 4 -2 0 Z" fill={GOLD} />
        <path d="M2 0 C 8 -4 12 2 4 6 C 2 6 1 4 2 0 Z" fill={GOLD} />
        <rect x="-6" y="5" width="12" height="2.5" rx="1" fill={GOLD_D} />
      </g>
      {/* Gold bullion fringe along hem */}
      <path d="M122 450 Q200 466 278 450" stroke={GOLD} strokeWidth="2.8" fill="none" />
      {[...Array(15)].map((_, i) => {
        const x = 128 + i * 10.3;
        const y = 452 + Math.sin((i / 14) * Math.PI) * 10;
        return <line key={i} x1={x} y1={y} x2={x} y2={y + 4.5} stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />;
      })}
    </g>
  );
}

function RobeGildedTrim() {
  return (
    <g>
      {/* Opulent Byzantine gold leaf chest emblem */}
      <path d="M186 264 L200 250 L214 264 L200 278 Z" fill={GOLD} />
      <path d="M190 264 L200 254 L210 264 L200 274 Z" fill="#FFF3C4" />
      <circle cx="200" cy="264" r="3" fill="#E11D48" />
      {/* Hanging gold cord tassels */}
      <line x1="196" y1="278" x2="194" y2="292" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="194" cy="292" r="1.5" fill={GOLD} />
      <line x1="204" y1="278" x2="206" y2="292" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="206" cy="292" r="1.5" fill={GOLD} />
      {/* Gilded diamond trellis down stole */}
      <g stroke={GOLD} strokeWidth="1.8" fill="none">
        <path d="M190 330 L200 344 L210 330" />
        <path d="M190 366 L200 380 L210 366" />
        <path d="M190 402 L200 416 L210 402" />
      </g>
      {/* Opulent baroque scrollwork hem */}
      <path d="M122 450 Q200 466 278 450" stroke={GOLD} strokeWidth="3.5" fill="none" />
      <path d="M126 444 Q200 460 274 444" stroke="#FFE28A" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function RobeCelestialTrim() {
  return (
    <g>
      {/* Lower hem celestial arches */}
      <path d="M122 448 Q200 466 278 448" stroke="#5CE1E6" strokeWidth="3" fill="none" opacity="0.95" />
      <path d="M126 441 Q200 458 274 441" stroke="#FFE680" strokeWidth="1.4" fill="none" opacity="0.75" />
      {/* Upper chest starlight trim above belt */}
      <path d="M160 282 Q200 276 240 282" stroke="#FFE680" strokeWidth="1.8" fill="none" opacity="0.85" />
      {/* Astral star emblem on chest */}
      <polygon points="200,258 203,267 212,270 203,273 200,282 197,273 188,270 197,267" fill="#5CE1E6" />
      <circle cx="200" cy="270" r="2.2" fill="#FFFFFF" />
      {/* Starlight stole borders running down the robe */}
      <path d="M184 324 L184 426 M216 324 L216 426" stroke="#5CE1E6" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" fill="none" />
      {/* Constellation line work on skirt */}
      <g stroke="#5CE1E6" strokeWidth="1.2" opacity="0.7" fill="none">
        <path d="M164 362 L182 396 L200 372 L218 396 L236 362" />
        <path d="M200 372 L200 342" />
      </g>
      {/* Constellation star nodes */}
      <circle cx="200" cy="342" r="3" fill="#FFFFFF" />
      <circle cx="200" cy="372" r="3.2" fill="#5CE1E6" />
      <circle cx="164" cy="362" r="2.2" fill="#FFE680" />
      <circle cx="236" cy="362" r="2.2" fill="#FFE680" />
      <circle cx="182" cy="396" r="2" fill="#FFFFFF" />
      <circle cx="218" cy="396" r="2" fill="#FFFFFF" />
      {/* Crescent moon charm near bottom center */}
      <path d="M200 412 C 191 412 191 430 200 430 C 195 426 195 416 200 412 Z" fill="#FFE680" opacity="0.95" />
      <circle cx="204" cy="415" r="1.5" fill="#FFFFFF" />
      {/* Sleeve cuff starlight trim */}
      <path d="M116 322 Q128 330 142 324" stroke="#5CE1E6" strokeWidth="1.8" fill="none" opacity="0.7" />
      <path d="M276 312 Q288 318 300 304" stroke="#5CE1E6" strokeWidth="1.8" fill="none" opacity="0.7" />
    </g>
  );
}
const ROBE_COMPONENTS = { robe_midnight: RobeMidnightTrim, robe_ivory: RobeIvoryTrim, robe_crimson: RobeCrimsonTrim, robe_gilded: RobeGildedTrim, robe_celestial: RobeCelestialTrim };

function ArmorPadded() {
  return (
    <g>
      {/* Quilted diamond-stitched gambeson chestpiece */}
      <path d="M174 242 C 182 236 218 236 226 242 L 230 286 C 214 290 186 290 170 286 Z" fill="#5C3D24" />
      <g stroke="#3D2614" strokeWidth="1" opacity="0.8">
        <line x1="172" y1="250" x2="218" y2="286" />
        <line x1="178" y1="242" x2="228" y2="282" />
        <line x1="228" y1="250" x2="182" y2="286" />
        <line x1="222" y1="242" x2="172" y2="282" />
      </g>
      {/* Leather pauldrons with brass dome rivets */}
      <path d="M130 240 C 144 230 166 232 174 246 C 168 266 142 272 130 258 Z" fill="#754E2E" />
      <path d="M270 240 C 256 230 234 232 226 246 C 232 266 258 272 270 258 Z" fill="#754E2E" />
      {[140, 150, 160].map((x, i) => (
        <circle key={`pr${i}`} cx={x} cy={246 + (i === 1 ? -2 : 2)} r="2" fill={GOLD} />
      ))}
      {[240, 250, 260].map((x, i) => (
        <circle key={`pl${i}`} cx={x} cy={246 + (i === 1 ? -2 : 2)} r="2" fill={GOLD} />
      ))}
    </g>
  );
}

function ArmorChain() {
  return (
    <g>
      {/* Mithril mail hauberk */}
      <path d="M174 240 C 184 234 216 234 226 240 L 232 286 C 214 292 186 292 168 286 Z" fill="#718096" />
      {/* Interlocking ring pattern texture */}
      {[248, 258, 268, 278].map((y, row) => (
        <g key={row} opacity="0.65">
          {[178, 188, 198, 208, 218].map((x, col) => (
            <circle key={col} cx={x + (row % 2 ? 4 : 0)} cy={y} r="2.2" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          ))}
        </g>
      ))}
      {/* Polished steel pauldrons with gold-embossed trim */}
      <path d="M128 238 C 146 226 168 230 176 246 C 168 266 142 272 128 256 Z" fill="#A0AEC0" />
      <path d="M128 238 C 146 226 168 230 176 246" stroke={GOLD} strokeWidth="1.8" fill="none" />
      <path d="M272 238 C 254 226 232 230 224 246 C 232 266 258 272 272 256 Z" fill="#A0AEC0" />
      <path d="M272 238 C 254 226 232 230 224 246" stroke={GOLD} strokeWidth="1.8" fill="none" />
      {/* Steel gorget around neck */}
      <path d="M182 236 C 192 232 208 232 218 236 L 216 244 C 206 242 194 242 184 244 Z" fill="#CBD5E0" stroke="#4A5568" strokeWidth="0.8" />
      <circle cx="200" cy="239" r="1.5" fill={GOLD} />
    </g>
  );
}

function ArmorVoid() {
  return (
    <g>
      {/* Segmented obsidian breastplate with purple glowing runes */}
      <path d="M172 242 C 184 234 216 234 228 242 L 232 284 C 214 290 186 290 168 284 Z" fill="#1C142E" stroke="#3B2660" strokeWidth="1.2" />
      {/* Spiked angular abyss pauldrons */}
      <path d="M124 242 L150 220 L180 242 L164 270 L126 264 Z" fill="#291A44" stroke="#4C2E7C" strokeWidth="1.5" />
      <path d="M276 242 L250 220 L220 242 L236 270 L274 264 Z" fill="#291A44" stroke="#4C2E7C" strokeWidth="1.5" />
      {/* Glowing violet rune channels */}
      <path d="M144 236 L154 246 L148 260" stroke="#C084FC" strokeWidth="1.5" fill="none" opacity="0.9" />
      <path d="M256 236 L246 246 L252 260" stroke="#C084FC" strokeWidth="1.5" fill="none" opacity="0.9" />
      <path d="M192 250 L200 262 L208 250 L200 274" stroke="#C084FC" strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Floating dark amethyst crystal shards above shoulders */}
      <polygon points="144,216 148,224 144,232 140,224" fill="#E879F9" />
      <circle cx="144" cy="224" r="1" fill="#FFF" />
      <polygon points="256,216 260,224 256,232 252,224" fill="#E879F9" />
      <circle cx="256" cy="224" r="1" fill="#FFF" />
    </g>
  );
}

function ArmorDragon() {
  return (
    <g>
      {/* Overlapping crimson dragon scales on chest */}
      <path d="M172 240 C 184 234 216 234 228 240 L 234 286 C 216 292 184 292 166 286 Z" fill="#7F1D1D" />
      {[248, 260, 272].map((y, row) => (
        <g key={row}>
          {[178, 190, 202, 214].map((x, col) => (
            <path key={col} d={`M${x} ${y} C ${x + 6} ${y - 4} ${x + 12} ${y - 4} ${x + 12} ${y + 4} C ${x + 6} ${y + 8} ${x} ${y + 4} Z`} fill="#991B1B" stroke="#450A0A" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      {/* Carved golden dragon horn pauldrons */}
      <path d="M118 244 C 130 220 158 214 182 242 L 166 272 L 122 264 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="1.5" />
      <path d="M282 244 C 270 220 242 214 218 242 L 234 272 L 278 264 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="1.5" />
      {/* Golden horn tips */}
      <polygon points="128,228 140,212 148,228" fill={GOLD} stroke={GOLD_D} strokeWidth="1" />
      <polygon points="272,228 260,212 252,228" fill={GOLD} stroke={GOLD_D} strokeWidth="1" />
      {/* Molten dragon-hearth furnace core in chest */}
      <circle cx="200" cy="264" r="7" fill="#F59E0B" />
      <circle cx="200" cy="264" r="4" fill="#FEF08A" />
      <circle cx="200" cy="264" r="2" fill="#FFFFFF" />
      <circle cx="200" cy="264" r="8.5" fill="none" stroke={GOLD} strokeWidth="1.5" />
    </g>
  );
}
const ARMOR_COMPONENTS = { armor_padded: ArmorPadded, armor_chain: ArmorChain, armor_void: ArmorVoid, armor_dragon: ArmorDragon };

function PetImp({ color, dark, light }) {
  return (
    <g>
      {/* 1. Fiery spirit heat aura */}
      <circle cx="0" cy="2" r="34" fill="#EA580C" opacity="0.22" />
      <circle cx="0" cy="2" r="22" fill="#F59E0B" opacity="0.15" />

      {/* 2. Sinuous demon tail with blazing spade tip */}
      <path d="M8 12 C 22 16 34 8 28 -6 C 26 -14 18 -14 20 -6 C 22 2 14 10 4 10 Z" fill={dark} />
      <path d="M28 -6 C 36 -16 26 -22 32 -30 C 36 -22 46 -16 34 -6 Z" fill="#EF4444" />
      <path d="M29 -8 C 34 -14 28 -18 32 -24 C 35 -18 41 -14 34 -8 Z" fill="#F59E0B" />
      <circle cx="32" cy="-14" r="2.2" fill="#FEF08A" />
      <circle cx="32" cy="-14" r="1" fill="#FFFFFF" />
      {/* Floating fire sparks */}
      <circle cx="38" cy="-24" r="1.5" fill="#F59E0B" />
      <circle cx="28" cy="-32" r="1.2" fill="#FEF08A" />
      <circle cx="42" cy="-12" r="1" fill="#FF6B3D" />

      {/* 3. Left Bat Wing (behind body) */}
      <g>
        <path d="M-8 4 C -18 -4 -28 -20 -18 -30 C -16 -16 -12 -2 -4 8 Z" fill={dark} />
        <path d="M-18 -30 C -32 -18 -30 -4 -16 6 C -20 -2 -18 -14 -18 -30 Z" fill={color} opacity="0.9" />
        <path d="M-18 -30 C -26 -16 -24 -2 -14 4" stroke="#7C2D12" strokeWidth="1.2" fill="none" />
        <polygon points="-18,-30 -22,-32 -19,-28" fill="#1C1008" />
      </g>

      {/* 4. Right Bat Wing (behind body) */}
      <g>
        <path d="M8 4 C 18 -4 28 -20 18 -30 C 16 -16 12 -2 4 8 Z" fill={dark} />
        <path d="M18 -30 C 32 -18 30 -4 16 6 C 20 -2 18 -14 18 -30 Z" fill={color} opacity="0.9" />
        <path d="M18 -30 C 26 -16 24 -2 14 4" stroke="#7C2D12" strokeWidth="1.2" fill="none" />
        <polygon points="18,-30 22,-32 19,-28" fill="#1C1008" />
      </g>

      {/* 5. Plump chibi dragon body */}
      <path d="M-14 2 C -17 12 -12 24 0 24 C 12 24 17 12 14 2 C 10 -2 -10 -2 -14 2 Z" fill={color} />
      {/* Peach underbelly scales */}
      <path d="M-8 2 C -10 10 -6 20 0 20 C 6 20 10 10 8 2 Z" fill={light} />
      <path d="M-5 6 Q0 8 5 6 M-5 11 Q0 13 5 11 M-4 16 Q0 18 4 16" stroke={dark} strokeWidth="1" fill="none" opacity="0.45" />

      {/* 6. Chubby little feet / claws */}
      <ellipse cx="-8" cy="22" rx="4.5" ry="3" fill={dark} />
      <ellipse cx="8" cy="22" rx="4.5" ry="3" fill={dark} />
      <circle cx="-10.5" cy="23" r="0.9" fill="#FFFFFF" />
      <circle cx="-8" cy="24" r="0.9" fill="#FFFFFF" />
      <circle cx="-5.5" cy="23" r="0.9" fill="#FFFFFF" />
      <circle cx="5.5" cy="23" r="0.9" fill="#FFFFFF" />
      <circle cx="8" cy="24" r="0.9" fill="#FFFFFF" />
      <circle cx="10.5" cy="23" r="0.9" fill="#FFFFFF" />

      {/* 7. Distinct chibi dragon head */}
      <path d="M-13 -8 C -16 -18 -8 -24 0 -24 C 8 -24 16 -18 13 -8 C 14 -1 9 4 0 4 C -9 4 -14 -1 -13 -8 Z" fill={color} />

      {/* 8. Pointed gargoyle ears */}
      <polygon points="-12,-12 -24,-16 -15,-6" fill={color} />
      <polygon points="-12,-11 -21,-15 -15,-7" fill={light} opacity="0.75" />
      <polygon points="12,-12 24,-16 15,-6" fill={color} />
      <polygon points="12,-11 21,-15 15,-7" fill={light} opacity="0.75" />

      {/* 9. Obsidian curved horns with gold bands */}
      <path d="M-6 -20 C -13 -34 -6 -40 -2 -28 C -4 -24 -5 -21 -6 -20 Z" fill="#1C1008" />
      <line x1="-7" y1="-26" x2="-4" y2="-24" stroke={GOLD} strokeWidth="1.5" />
      <line x1="-5" y1="-30" x2="-3" y2="-29" stroke={GOLD} strokeWidth="1.2" />
      <path d="M6 -20 C 13 -34 6 -40 2 -28 C 4 -24 5 -21 6 -20 Z" fill="#1C1008" />
      <line x1="7" y1="-26" x2="4" y2="-24" stroke={GOLD} strokeWidth="1.5" />
      <line x1="5" y1="-30" x2="3" y2="-29" stroke={GOLD} strokeWidth="1.2" />

      {/* 10. Muzzle & cute snout */}
      <ellipse cx="0" cy="-4" rx="6.5" ry="4.5" fill={light} opacity="0.75" />
      <circle cx="-2" cy="-5" r="0.8" fill={dark} />
      <circle cx="2" cy="-5" r="0.8" fill={dark} />

      {/* 11. Large expressive dragon eyes */}
      <ellipse cx="-5.5" cy="-9" rx="4.5" ry="5.5" fill="#1C1008" />
      <ellipse cx="5.5" cy="-9" rx="4.5" ry="5.5" fill="#1C1008" />
      <ellipse cx="-5.5" cy="-9" rx="3.5" ry="4.5" fill="#F59E0B" />
      <ellipse cx="5.5" cy="-9" rx="3.5" ry="4.5" fill="#F59E0B" />
      <ellipse cx="-5.5" cy="-9" rx="1.3" ry="3.5" fill="#1C1008" />
      <ellipse cx="5.5" cy="-9" rx="1.3" ry="3.5" fill="#1C1008" />
      <circle cx="-4.2" cy="-11" r="1.4" fill="#FFFFFF" />
      <circle cx="6.8" cy="-11" r="1.4" fill="#FFFFFF" />
      <circle cx="-6.2" cy="-7.5" r="0.7" fill="#FFFFFF" opacity="0.8" />
      <circle cx="4.8" cy="-7.5" r="0.7" fill="#FFFFFF" opacity="0.8" />

      {/* 12. Cute fanged grin */}
      <path d="M-5 -1 Q0 3.5 5 -1" stroke="#451A0A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <polygon points="-3,-1 -1.5,1.8 -0.5,-1" fill="#FFFFFF" />
      <polygon points="0.5,-1 1.5,1.8 3,-1" fill="#FFFFFF" />

      {/* 13. Gold studded collar with ruby */}
      <path d="M-9 1 Q0 4.5 9 1" stroke={GOLD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="3" r="2.8" fill="#DC2626" />
      <circle cx="-0.6" cy="2.3" r="0.9" fill="#FFFFFF" />

      {/* 14. Cute dragon arms holding a floating spark */}
      <path d="M-8 6 C -11 11 -6 14 -2 11" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M8 6 C 11 11 6 14 2 11" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="0" cy="11" r="3.2" fill="#F59E0B" />
      <circle cx="0" cy="11" r="1.8" fill="#FEF08A" />
      <circle cx="0" cy="10" r="0.9" fill="#FFFFFF" />
    </g>
  );
}

function PetSprite({ color, dark, light }) {
  return (
    <g>
      {/* 1. Ambient frosty aura & icy glow */}
      <circle cx="0" cy="2" r="36" fill="#38BDF8" opacity="0.22" />
      <circle cx="0" cy="2" r="22" fill="#E0F2FE" opacity="0.32" />

      {/* 2. 4 Faceted crystalline ice wings (behind body) */}
      {/* Upper left wing */}
      <polygon points="0,-4 -36,-30 -30,-8 -14,2" fill={light} opacity="0.88" stroke="#BAE6FD" strokeWidth="1" />
      <polygon points="0,-4 -30,-26 -24,-8" fill="#FFFFFF" opacity="0.65" />
      <line x1="0" y1="-4" x2="-30" y2="-8" stroke="#7DD3FC" strokeWidth="0.8" />
      {/* Upper right wing */}
      <polygon points="0,-4 36,-30 30,-8 14,2" fill={light} opacity="0.88" stroke="#BAE6FD" strokeWidth="1" />
      <polygon points="0,-4 30,-26 24,-8" fill="#FFFFFF" opacity="0.65" />
      <line x1="0" y1="-4" x2="30" y2="-8" stroke="#7DD3FC" strokeWidth="0.8" />
      {/* Lower left wing */}
      <polygon points="0,2 -28,20 -18,8 -4,2" fill={light} opacity="0.75" stroke="#7DD3FC" strokeWidth="0.8" />
      <polygon points="0,2 -22,16 -14,6" fill="#FFFFFF" opacity="0.5" />
      {/* Lower right wing */}
      <polygon points="0,2 28,20 18,8 4,2" fill={light} opacity="0.75" stroke="#7DD3FC" strokeWidth="0.8" />
      <polygon points="0,2 22,16 14,6" fill="#FFFFFF" opacity="0.5" />

      {/* 3. Petite fairy body & scalloped frost gown */}
      <path d="M-6 0 C -7 6 -5 12 0 12 C 5 12 7 6 6 0 Z" fill={color} />
      {/* Layered frosted petal skirt */}
      <path d="M-6 8 C -16 16 -12 25 0 25 C 12 25 16 16 6 8 Z" fill={light} opacity="0.9" />
      <path d="M-4 10 C -10 18 -6 23 0 23 C 6 23 10 18 4 10 Z" fill="#FFFFFF" opacity="0.8" />

      {/* Dainty fairy legs/feet */}
      <ellipse cx="-2.5" cy="26" rx="1.5" ry="3" fill={color} />
      <ellipse cx="2.5" cy="26" rx="1.5" ry="3" fill={color} />

      {/* 4. Cute chibi fairy head */}
      <circle cx="0" cy="-10" r="11" fill={light} />
      {/* Frost-spun crystal hair framing face */}
      <path d="M-10 -12 C -8 -6 -4 -6 -3 -9 C -2 -6 2 -6 3 -9 C 4 -6 8 -6 10 -12 C 8 -21 -8 -21 -10 -12 Z" fill={color} />
      {/* Side hair wisps */}
      <path d="M-10 -10 C -14 -2 -13 6 -10 12 C -11 5 -11 0 -8 -8 Z" fill={color} />
      <path d="M10 -10 C 14 -2 13 6 10 12 C 11 5 11 0 8 -8 Z" fill={color} />

      {/* 5. Pointed fairy elf ears */}
      <polygon points="-10,-11 -19,-14 -11,-7" fill={light} />
      <polygon points="-10,-10 -16,-13 -11,-8" fill="#BAE6FD" opacity="0.7" />
      <polygon points="10,-11 19,-14 11,-7" fill={light} />
      <polygon points="10,-10 16,-13 11,-8" fill="#BAE6FD" opacity="0.7" />

      {/* 6. Big anime sapphire eyes with specular glints */}
      <ellipse cx="-4.5" cy="-9.5" rx="3.6" ry="4.6" fill="#0C4A6E" />
      <ellipse cx="4.5" cy="-9.5" rx="3.6" ry="4.6" fill="#0C4A6E" />
      <ellipse cx="-4.5" cy="-9.5" rx="2.6" ry="3.6" fill="#0284C7" />
      <ellipse cx="4.5" cy="-9.5" rx="2.6" ry="3.6" fill="#0284C7" />
      <circle cx="-3.4" cy="-11.5" r="1.4" fill="#FFFFFF" />
      <circle cx="5.6" cy="-11.5" r="1.4" fill="#FFFFFF" />
      <circle cx="-5.5" cy="-7.8" r="0.8" fill="#BAE6FD" />
      <circle cx="3.5" cy="-7.8" r="0.8" fill="#BAE6FD" />

      {/* Rosy icy cheeks & cute gentle smile */}
      <ellipse cx="-6.5" cy="-5" rx="2.2" ry="1.1" fill="#38BDF8" opacity="0.55" />
      <ellipse cx="6.5" cy="-5" rx="2.2" ry="1.1" fill="#38BDF8" opacity="0.55" />
      <path d="M-2 -4 Q0 -2.5 2 -4" stroke="#0369A1" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* 7. Floating snowflake diadem crown */}
      <g transform="translate(0 -23)">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#FFFFFF" />
        <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#38BDF8" />
        <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
      </g>

      {/* 8. Delicate fairy hands holding floating ice prism */}
      <path d="M-6 4 Q0 9 -1 5" stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M6 4 Q0 9 1 5" stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <polygon points="0,-1 2.5,4 6,5 2.5,6 0,11 -2.5,6 -6,5 -2.5,4" fill="#E0F2FE" />
      <polygon points="0,1 1.8,4 4,5 1.8,6 0,9 -1.8,6 -4,5 -1.8,4" fill="#FFFFFF" />
      <circle cx="0" cy="5" r="1.5" fill="#38BDF8" />

      {/* 9. Floating ice rime diamond sparkles */}
      <polygon points="-24,-16 -22,-12 -20,-16 -22,-20" fill="#FFFFFF" opacity="0.9" />
      <polygon points="24,-12 26,-8 28,-12 26,-16" fill="#FFFFFF" opacity="0.9" />
      <circle cx="18" cy="20" r="1.5" fill="#BAE6FD" />
      <circle cx="-18" cy="22" r="1.5" fill="#BAE6FD" />
      <circle cx="0" cy="-28" r="1" fill="#FFFFFF" />
    </g>
  );
}

function PetFox({ color, dark, light }) {
  return (
    <g>
      {/* 1. Ambient nature spirit aura */}
      <circle cx="0" cy="4" r="36" fill="#4ADE80" opacity="0.18" />
      <circle cx="0" cy="4" r="22" fill="#86EFAC" opacity="0.22" />

      {/* 2. 3 Lush Kitsune Plume Tails (behind body) */}
      {/* Center high-arching plume tail */}
      <path d="M0 6 C 14 -6 16 -26 6 -38 C 22 -22 20 2 5 20 Z" fill={color} />
      <path d="M6 -38 C 14 -28 12 -20 6 -16 C 3 -22 1 -28 6 -38 Z" fill={light} />
      {/* Left plume tail */}
      <path d="M-8 6 C -26 -4 -38 -16 -30 -32 C -20 -16 -12 2 -4 18 Z" fill={color} />
      <path d="M-30 -32 C -30 -22 -25 -16 -20 -14 C -20 -20 -23 -26 -30 -32 Z" fill={light} />
      <path d="M-9 4 C -22 -6 -28 -18 -26 -30" stroke={dark} strokeWidth="1" fill="none" opacity="0.45" />
      {/* Right plume tail */}
      <path d="M8 6 C 26 -4 38 -16 30 -32 C 20 -16 12 2 4 18 Z" fill={color} />
      <path d="M30 -32 C 30 -22 25 -16 20 -14 C 20 -20 23 -26 30 -32 Z" fill={light} />
      <path d="M9 4 C 22 -6 28 -18 26 -30" stroke={dark} strokeWidth="1" fill="none" opacity="0.45" />

      {/* 3. Seated fox body & haunches */}
      <path d="M-15 0 C -18 9 -14 20 0 20 C 14 20 18 9 15 0 C 12 -5 -12 -5 -15 0 Z" fill={color} />
      {/* Seated hind paws */}
      <ellipse cx="-13" cy="18" rx="4.5" ry="3" fill={dark} />
      <ellipse cx="13" cy="18" rx="4.5" ry="3" fill={dark} />
      {/* Front legs planted firmly */}
      <rect x="-6" y="7" width="4.5" height="12" rx="2" fill={color} />
      <rect x="1.5" y="7" width="4.5" height="12" rx="2" fill={color} />
      {/* White front paws */}
      <ellipse cx="-3.8" cy="18.5" rx="3" ry="2.2" fill={light} />
      <ellipse cx="3.8" cy="18.5" rx="3" ry="2.2" fill={light} />

      {/* 4. White fluffy chest ruff mane */}
      <path d="M-9 -2 C -13 7 -6 15 0 15 C 6 15 13 7 9 -2 C 6 -6 -6 -6 -9 -2 Z" fill={light} />
      <path d="M-4 3 L0 7 L4 3 L0 12 Z" fill="#FFFFFF" opacity="0.75" />

      {/* 5. Alert pointed fox ears */}
      <path d="M-7 -16 C -16 -34 -24 -32 -16 -12 Z" fill={color} />
      <polygon points="-16,-34 -24,-32 -20,-26" fill={dark} />
      <path d="M-9 -16 C -14 -28 -18 -26 -14 -16" stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M7 -16 C 16 -34 24 -32 16 -12 Z" fill={color} />
      <polygon points="16,-34 24,-32 20,-26" fill={dark} />
      <path d="M9 -16 C 14 -28 18 -26 14 -16" stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* 6. Fox head & fluffy cheeks */}
      <path d="M-13 -10 C -17 -6 -15 0 -8 4 C -4 6 4 6 8 4 C 15 0 17 -6 13 -10 C 12 -18 -12 -18 -13 -10 Z" fill={color} />
      {/* White cheek ruffs */}
      <path d="M-14 -7 C -18 -3 -12 2 -8 3 Z" fill={light} />
      <path d="M14 -7 C 18 -3 12 2 8 3 Z" fill={light} />

      {/* 7. Muzzle & cute snout */}
      <ellipse cx="0" cy="-3.5" rx="6" ry="5" fill={light} />
      <polygon points="-2,-5.5 2,-5.5 0,-3.8" fill="#141E12" />
      <path d="M-2.5 -3 Q0 -1.5 2.5 -3" stroke="#141E12" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* 8. Expressive emerald Kitsune eyes */}
      <ellipse cx="-5.5" cy="-9" rx="3.8" ry="4.5" fill="#141E12" />
      <ellipse cx="5.5" cy="-9" rx="3.8" ry="4.5" fill="#141E12" />
      <ellipse cx="-5.5" cy="-9" rx="2.8" ry="3.5" fill="#22C55E" />
      <ellipse cx="5.5" cy="-9" rx="2.8" ry="3.5" fill="#22C55E" />
      <circle cx="-4.3" cy="-10.8" r="1.3" fill="#FFFFFF" />
      <circle cx="6.7" cy="-10.8" r="1.3" fill="#FFFFFF" />
      <circle cx="-6.3" cy="-7.5" r="0.7" fill="#DCFCE7" />
      <circle cx="4.7" cy="-7.5" r="0.7" fill="#DCFCE7" />

      {/* 9. Sacred golden clover forehead crest */}
      <circle cx="0" cy="-15" r="2.2" fill={GOLD} />
      <circle cx="-2.6" cy="-17" r="2" fill={GOLD} />
      <circle cx="2.6" cy="-17" r="2" fill={GOLD} />
      <circle cx="0" cy="-16" r="1.2" fill="#FFFFFF" />

      {/* 10. Shinto vermilion cord collar with golden bell */}
      <path d="M-9 0 Q0 3.5 9 0" stroke="#DC2626" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="3.5" r="3.2" fill={GOLD} />
      <circle cx="0" cy="4.8" r="0.9" fill="#141E12" />
      <line x1="-1.5" y1="3" x2="1.5" y2="3" stroke="#B45309" strokeWidth="0.8" />

      {/* 11. Floating leaf motes & golden pollen */}
      <circle cx="-22" cy="2" r="2" fill="#86EFAC" opacity="0.85" />
      <circle cx="24" cy="12" r="1.8" fill="#86EFAC" opacity="0.85" />
      <circle cx="18" cy="-18" r="1.4" fill="#FEF08A" opacity="0.9" />
      <circle cx="-20" cy="-14" r="1.2" fill="#FEF08A" opacity="0.9" />
    </g>
  );
}

function PetWisp({ color, dark, light }) {
  return (
    <g>
      {/* 1. Deep cosmic nebula aura */}
      <circle cx="0" cy="0" r="38" fill={dark} opacity="0.2" />
      <circle cx="0" cy="0" r="26" fill={color} opacity="0.28" />
      <circle cx="0" cy="0" r="16" fill="#FDE047" opacity="0.38" />

      {/* 2. Interlocking Gyroscopic Armillary Astrolabe Rings */}
      <ellipse cx="0" cy="0" rx="32" ry="11" fill="none" stroke={GOLD} strokeWidth="2.4" opacity="0.9" transform="rotate(-28)" />
      <circle cx="-28" cy="0" r="1.8" fill={GOLD} transform="rotate(-28)" />
      <circle cx="28" cy="0" r="1.8" fill={GOLD} transform="rotate(-28)" />
      <circle cx="0" cy="-11" r="1.8" fill={GOLD} transform="rotate(-28)" />
      <circle cx="0" cy="11" r="1.8" fill={GOLD} transform="rotate(-28)" />

      <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#DDD6FE" strokeWidth="1.8" opacity="0.8" transform="rotate(42)" />

      {/* 3. Swirling celestial stardust tail */}
      <path d="M-6 10 C -18 20 -14 34 -4 42 C 2 44 8 38 4 30 C 0 22 -4 16 2 10 Z" fill={color} opacity="0.75" />
      <path d="M-3 12 C -12 22 -8 32 -1 36" stroke="#FEF08A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
      <circle cx="-10" cy="28" r="1.5" fill="#FEF08A" />
      <circle cx="2" cy="38" r="1.2" fill="#FFFFFF" />
      <circle cx="-2" cy="46" r="0.9" fill="#FDE047" />

      {/* 4. Radiant Starburst Corona */}
      <polygon points="0,-22 4,-6 20,-1 4,4 0,20 -4,4 -20,-1 -4,-6" fill={color} opacity="0.85" />
      <polygon points="0,-15 3,-4 14,-1 3,3 0,14 -3,3 -14,-1 -3,-4" fill="#FEF08A" opacity="0.95" />
      <polygon points="0,-18 3.5,-5 17,-1 3.5,3 0,17 -3.5,3 -17,-1 -3.5,-5" fill="#FDE047" opacity="0.6" transform="rotate(45)" />

      {/* 5. Glowing crystal spirit core */}
      <circle cx="0" cy="0" r="12" fill="#FFFFFF" />
      <circle cx="-1.5" cy="-1.5" r="10" fill="#FFFBEB" opacity="0.9" />

      {/* 6. Adorable starry cosmic eyes */}
      <ellipse cx="-4.2" cy="-1.5" rx="2.6" ry="3.2" fill="#1E1B4B" />
      <ellipse cx="4.2" cy="-1.5" rx="2.6" ry="3.2" fill="#1E1B4B" />
      <circle cx="-3.4" cy="-2.5" r="1.2" fill="#FFFFFF" />
      <circle cx="5" cy="-2.5" r="1.2" fill="#FFFFFF" />
      <circle cx="-4.6" cy="0.2" r="0.6" fill="#C7D2FE" />
      <circle cx="3.8" cy="0.2" r="0.6" fill="#C7D2FE" />

      {/* Rosy blush & happy curved smile */}
      <ellipse cx="-6" cy="1.5" rx="2" ry="0.8" fill="#F59E0B" opacity="0.45" />
      <ellipse cx="6" cy="1.5" rx="2" ry="0.8" fill="#F59E0B" opacity="0.45" />
      <path d="M-1.8 1.5 Q0 3 1.8 1.5" stroke="#1E1B4B" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* 7. Orbiting planetary satellites */}
      <g transform="translate(-25 -9)">
        <circle cx="0" cy="0" r="3.5" fill="#A855F7" />
        <ellipse cx="0" cy="0" rx="5.5" ry="1.8" fill="none" stroke="#E9D5FF" strokeWidth="0.8" transform="rotate(-15)" />
        <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" />
      </g>
      <g transform="translate(24 -13)">
        <circle cx="0" cy="0" r="2.8" fill="#F59E0B" />
        <circle cx="-0.8" cy="-0.8" r="0.9" fill="#FFFFFF" />
      </g>
      <g transform="translate(22 17)">
        <circle cx="0" cy="0" r="2.4" fill="#38BDF8" />
        <circle cx="-0.7" cy="-0.7" r="0.8" fill="#FFFFFF" />
      </g>

      {/* 8. Twinkling cross-flares */}
      <line x1="-15" y1="-18" x2="-9" y2="-18" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
      <line x1="-12" y1="-21" x2="-12" y2="-15" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="24" x2="16" y2="24" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
      <line x1="13" y1="21" x2="13" y2="27" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

const PET_COMPONENTS = { imp: PetImp, sprite: PetSprite, fox: PetFox, wisp: PetWisp };

function Pet({ pet }) {
  if (!pet?.kind) return null;
  const Component = PET_COMPONENTS[pet.kind];
  if (!Component) return null;

  const isGround = pet.kind === "fox";

  return isGround ? (
    <g transform="translate(82 414) scale(1.28)">
      {/* Ground contact shadow */}
      <ellipse cx="0" cy="20" rx="25" ry="7" fill="#000000" className="petShadow" />
      <g className="petGround">
        <Component color={pet.color} dark={pet.dark} light={pet.light} />
      </g>
    </g>
  ) : (
    <g transform="translate(78 344) scale(1.28)">
      {/* Projected ground floor shadow below hovering familiar */}
      <ellipse cx="0" cy="74" rx="22" ry="5.5" fill="#000000" className="petShadow" />
      <g className="petHover">
        <Component color={pet.color} dark={pet.dark} light={pet.light} />
      </g>
    </g>
  );
}

function TomeHolderHand() {
  // Offhand items now float telekinetically beside the mage; hands remain free
  return null;
}

function OffhandTome() {
  return (
    <g transform="translate(94 315) rotate(-10)">
      {/* Arcane Telekinetic Levitation Circle */}
      <ellipse cx="0" cy="28" rx="28" ry="7.5" fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <ellipse cx="0" cy="28" rx="16" ry="4.5" fill="none" stroke="#F59E0B" strokeWidth="0.9" opacity="0.6" />
      <circle cx="0" cy="28" r="2.2" fill={GOLD} opacity="0.8" />
      {/* Floating Magic Sparks */}
      <circle className="holySparkle" cx="-18" cy="18" r="1.5" fill={GOLD} opacity="0.8" />
      <circle className="holySparkle" style={{ animationDelay: "0.9s" }} cx="22" cy="14" r="1.7" fill="#FEF08A" opacity="0.9" />

      {/* Weathered Parchment Pages Block */}
      <rect x="-27" y="-21" width="54" height="41" rx="4" fill="#452310" />
      <rect x="-23" y="-19" width="47" height="36" rx="2" fill="#EFE8D6" stroke="#D1C3A5" strokeWidth="1" />
      <line x1="-22" y1="14" x2="21" y2="14" stroke="#BAAA88" strokeWidth="0.8" opacity="0.6" />
      <line x1="21" y1="-17" x2="21" y2="13" stroke="#BAAA88" strokeWidth="0.8" opacity="0.6" />

      {/* Red Satin Bookmark Ribbon with Golden Bead */}
      <path d="M-3 14 L-3 33 L2 29 L7 33 L7 14 Z" fill="#B91C1C" />
      <path d="M-3 14 L1 27 L1 31 L-3 33 Z" fill="#991B1B" />
      <circle cx="2" cy="31" r="1.4" fill={GOLD} />

      {/* Rich Aged Leather Cover */}
      <rect x="-26" y="-20" width="47" height="37" rx="3.5" fill="#7A4522" />
      <rect x="-24.5" y="-18.5" width="43.5" height="34" rx="2.5" fill="none" stroke="#9C5D33" strokeWidth="1.2" opacity="0.85" />
      <rect x="-23" y="-17" width="40.5" height="31" rx="2" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.5" />

      {/* Leather Spine with 4 Gilded Ribs */}
      <path d="M-26 -20 L-16 -20 L-16 17 L-26 17 Z" fill="#582F15" />
      <line x1="-16" y1="-20" x2="-16" y2="17" stroke="#3D1E0B" strokeWidth="1" />
      <line x1="-24" y1="-10" x2="-18" y2="-10" stroke={GOLD} strokeWidth="1.4" opacity="0.85" />
      <line x1="-24" y1="-2" x2="-18" y2="-2" stroke={GOLD} strokeWidth="1.4" opacity="0.85" />
      <line x1="-24" y1="6" x2="-18" y2="6" stroke={GOLD} strokeWidth="1.4" opacity="0.85" />
      <line x1="-24" y1="13" x2="-18" y2="13" stroke={GOLD} strokeWidth="1.4" opacity="0.85" />

      {/* Antique Brass Corner Brackets */}
      <polygon points="-26,-20 -18,-20 -26,-12" fill={GOLD} />
      <polygon points="21,-20 13,-20 21,-12" fill={GOLD} />
      <polygon points="21,17 13,17 21,9" fill={GOLD} />

      {/* Ornate Brass Clasp */}
      <rect x="15" y="-5" width="8" height="8" rx="1.5" fill={GOLD} />
      <circle cx="19" cy="-1" r="1.6" fill={GOLD_D} />

      {/* Embossed Golden Star Medallion */}
      <circle cx="3" cy="-2" r="7.5" fill="none" stroke={GOLD} strokeWidth="1.4" opacity="0.9" />
      <polygon points="3,-8 4.6,-3.5 9,-3 5.4,-0.5 6.8,4 3,1.2 -0.8,4 0.6,-0.5 -3,-3 1.4,-3.5" fill={GOLD} />
      <circle cx="3" cy="-2" r="1.8" fill="#B91C1C" />
    </g>
  );
}

function OffhandGrimoire() {
  return (
    <g transform="translate(94 315) rotate(-10)">
      {/* Floating Arcane Radiance & Runes */}
      <circle cx="0" cy="0" r="38" fill="#8B5CF6" opacity="0.22" />
      <polygon className="holySparkle" points="-22,-30 -19,-25 -25,-25" fill="#C084FC" opacity="0.85" />
      <circle className="holySparkle" style={{ animationDelay: "0.6s" }} cx="28" cy="-22" r="2.2" fill="#38BDF8" opacity="0.9" />
      <circle className="holySparkle" style={{ animationDelay: "1.2s" }} cx="-30" cy="16" r="2" fill="#C084FC" opacity="0.8" />
      <polygon className="holySparkle" style={{ animationDelay: "1.8s" }} points="28,22 31,17 25,18" fill="#818CF8" opacity="0.75" />

      {/* Arcane Telekinetic Levitation Circle */}
      <ellipse cx="0" cy="28" rx="28" ry="7.5" fill="none" stroke="#C084FC" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <ellipse cx="0" cy="28" rx="16" ry="4.5" fill="none" stroke="#38BDF8" strokeWidth="0.9" opacity="0.6" />
      <circle cx="0" cy="28" r="2.2" fill="#C084FC" opacity="0.8" />

      {/* Enchanted Silver-Leaf Page Block */}
      <rect x="-28" y="-22" width="56" height="43" rx="4.5" fill="#1E1236" />
      <rect x="-24" y="-20" width="49" height="38" rx="2" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1" />
      <line x1="-23" y1="15" x2="22" y2="15" stroke="#A78BFA" strokeWidth="0.8" opacity="0.8" />
      <line x1="22" y1="-18" x2="22" y2="14" stroke="#A78BFA" strokeWidth="0.8" opacity="0.8" />

      {/* Imperial Purple Silk Ribbon with Rune */}
      <path d="M-3 15 L-3 35 L2 31 L7 35 L7 15 Z" fill="#8B5CF6" />
      <path d="M-3 15 L1 29 L1 33 L-3 35 Z" fill="#6D28D9" />
      <circle cx="2" cy="33" r="1.3" fill="#E2E8F0" />

      {/* Midnight Purple Velvet Cover */}
      <rect x="-27" y="-21" width="49" height="39" rx="3.5" fill="#3B1F69" />
      <rect x="-25.5" y="-19.5" width="45.5" height="35.5" rx="2.5" fill="none" stroke="#5B21B6" strokeWidth="1.2" />

      {/* Spine with Silver Runes */}
      <path d="M-27 -21 L-17 -21 L-17 18 L-27 18 Z" fill="#251244" />
      <line x1="-17" y1="-21" x2="-17" y2="18" stroke="#6D28D9" strokeWidth="1.2" />
      <circle cx="-22" cy="-11" r="2" fill="#A78BFA" />
      <circle cx="-22" cy="-2" r="2" fill="#38BDF8" />
      <circle cx="-22" cy="7" r="2" fill="#A78BFA" />

      {/* Polished Moon-Silver Filigree Corners */}
      <path d="M-27 -14 L-27 -21 L-20 -21 Q-21 -17 -27 -14 Z" fill="#E2E8F0" />
      <path d="M22 -14 L22 -21 L15 -21 Q16 -17 22 -14 Z" fill="#E2E8F0" />
      <path d="M22 11 L22 18 L15 18 Q16 14 22 11 Z" fill="#E2E8F0" />

      {/* The All-Seeing Arcane Eye of Nethys */}
      <circle cx="3" cy="-2" r="12" fill="none" stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="4 3" />
      <path d="M-7 -2 Q3 -10 13 -2 Q3 6 -7 -2 Z" fill="#1E1236" stroke="#C084FC" strokeWidth="1.4" />
      <circle cx="3" cy="-2" r="4.2" fill="#38BDF8" />
      <circle cx="3" cy="-2" r="2" fill="#FFFFFF" />
    </g>
  );
}

function OffhandCodex() {
  return (
    <g transform="translate(94 315) rotate(-10)">
      {/* Volcanic Heat Aura & Drifting Fire Embers */}
      <circle cx="0" cy="0" r="38" fill="#FF5722" opacity="0.22" />
      <circle className="wingEmber" cx="-24" cy="-28" r="2.2" fill="#FF8C00" opacity="0.9" />
      <circle className="wingEmber" style={{ animationDelay: "0.6s" }} cx="-18" cy="-34" r="1.6" fill="#FFD700" opacity="0.85" />
      <circle className="wingEmber" style={{ animationDelay: "1.2s" }} cx="28" cy="-22" r="2" fill="#FF4500" opacity="0.9" />
      <circle className="wingEmber" style={{ animationDelay: "1.8s" }} cx="24" cy="-30" r="1.5" fill="#FFA500" opacity="0.95" />

      {/* Arcane Telekinetic Levitation Circle */}
      <ellipse cx="0" cy="28" rx="28" ry="7.5" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <ellipse cx="0" cy="28" rx="16" ry="4.5" fill="none" stroke="#EF4444" strokeWidth="0.9" opacity="0.6" />
      <circle cx="0" cy="28" r="2.2" fill="#F59E0B" opacity="0.8" />

      {/* Dragonfire Scorched Page Block */}
      <rect x="-28" y="-22" width="56" height="43" rx="4.5" fill="#240808" />
      <rect x="-24" y="-20" width="49" height="38" rx="2" fill="#FEF3C7" stroke="#EA580C" strokeWidth="1.2" />
      <line x1="-23" y1="15" x2="22" y2="15" stroke="#DC2626" strokeWidth="1" opacity="0.85" />
      <line x1="22" y1="-18" x2="22" y2="14" stroke="#F97316" strokeWidth="1" opacity="0.9" />

      {/* Flame Ribbon Bookmark */}
      <path d="M-3 15 L-3 35 L2 31 L7 35 L7 15 Z" fill="#EA580C" />
      <path d="M-3 15 L1 29 L1 33 L-3 35 Z" fill="#9A3412" />
      <circle cx="2" cy="33" r="1.4" fill="#F59E0B" />

      {/* Volcanic Dragonhide Cover with Magma Fissures */}
      <rect x="-27" y="-21" width="49" height="39" rx="3.5" fill="#601212" />
      <rect x="-25.5" y="-19.5" width="45.5" height="35.5" rx="2.5" fill="none" stroke="#991B1B" strokeWidth="1.2" />
      <path d="M-14 -19 L-9 -11 L-11 -3 L-5 6 L-7 15" stroke="#FF6B3D" strokeWidth="1.6" fill="none" opacity="0.9" />
      <path d="M5 -19 L9 -12 L6 -5 L12 4 L11 15" stroke="#FF9800" strokeWidth="1.6" fill="none" opacity="0.85" />

      {/* Dragon Bone Vertebrae Spine */}
      <path d="M-27 -21 L-17 -21 L-17 18 L-27 18 Z" fill="#380A0A" />
      <line x1="-17" y1="-21" x2="-17" y2="18" stroke="#B91C1C" strokeWidth="1.4" />
      <circle cx="-22" cy="-11" r="2.2" fill="#F59E0B" />
      <circle cx="-22" cy="-2" r="2.2" fill="#EA580C" />
      <circle cx="-22" cy="7" r="2.2" fill="#F59E0B" />

      {/* Horned Dragon Claws Corner Guards */}
      <polygon points="-27,-21 -18,-21 -27,-12" fill="#F59E0B" />
      <polygon points="22,-21 13,-21 22,-12" fill="#F59E0B" />
      <polygon points="22,18 13,18 22,9" fill="#F59E0B" />

      {/* Sculpted Primal Flame Insignia */}
      <path d="M3 -13 C 8 -8 11 -3 7 3 C 10 -1 10 5 4 8 C 0 11 -5 8 -5 3 C -5 -3 0 -8 3 -13 Z" fill="#F59E0B" />
      <path d="M3 -8 C 6 -4 7 0 5 4 C 3 7 1 7 1 3 C 1 0 3 -4 3 -8 Z" fill="#FEF08A" />
      <rect x="15" y="-5" width="8" height="8" rx="1.5" fill="#F59E0B" />
      <circle cx="19" cy="-1" r="1.6" fill="#78350F" />
    </g>
  );
}

function OffhandForbidden() {
  return (
    <g transform="translate(94 315) rotate(-10)">
      {/* Abyssal Void & Crimson Ruin Aura */}
      <circle cx="0" cy="0" r="42" fill="#A855F7" opacity="0.22" />
      <circle cx="0" cy="0" r="26" fill="#E11D48" opacity="0.15" />
      <polygon className="holySparkle" points="-26,-28 -21,-32 -24,-24" fill="#F43F5E" opacity="0.85" />
      <polygon className="holySparkle" style={{ animationDelay: "0.8s" }} points="29,-25 26,-32 23,-27" fill="#C084FC" opacity="0.85" />
      <circle className="holySparkle" style={{ animationDelay: "1.4s" }} cx="31" cy="18" r="2" fill="#E879F9" opacity="0.8" />

      {/* Arcane Telekinetic Levitation Circle */}
      <ellipse cx="0" cy="28" rx="28" ry="7.5" fill="none" stroke="#A855F7" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <ellipse cx="0" cy="28" rx="16" ry="4.5" fill="none" stroke="#F43F5E" strokeWidth="0.9" opacity="0.6" />
      <circle cx="0" cy="28" r="2.2" fill="#A855F7" opacity="0.8" />

      {/* Cursed Black Page Block with Eldritch Violet Veins */}
      <rect x="-29" y="-22" width="58" height="44" rx="5" fill="#0D0717" stroke="#3B0764" strokeWidth="1" />
      <rect x="-25" y="-20" width="51" height="39" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="1.2" />
      <line x1="-24" y1="16" x2="23" y2="16" stroke="#334155" strokeWidth="1" />
      <line x1="23" y1="-18" x2="23" y2="15" stroke="#334155" strokeWidth="1" />

      {/* Tattered Torn Void Ribbon */}
      <path d="M-3 16 L-4 35 L1 31 L6 36 L5 16 Z" fill="#18181B" />
      <path d="M-3 16 L1 27 L1 32 L-4 35 Z" fill="#27272A" />

      {/* Void Leather Cover */}
      <rect x="-28" y="-21" width="51" height="40" rx="4" fill="#1A102E" />
      <rect x="-26.5" y="-19.5" width="47.5" height="36.5" rx="2.5" fill="none" stroke="#2E1065" strokeWidth="1.5" />

      {/* Iron Spine */}
      <path d="M-28 -21 L-18 -21 L-18 19 L-28 19 Z" fill="#0B0514" />
      <line x1="-18" y1="-21" x2="-18" y2="19" stroke="#6B21A8" strokeWidth="1.4" />
      <circle cx="-23" cy="-11" r="2.2" fill="#A855F7" />
      <circle cx="-23" cy="-2" r="2.5" fill="#F43F5E" />
      <circle cx="-23" cy="7" r="2.2" fill="#A855F7" />

      {/* Heavy Spiked Cursed Iron Chains Binding the Book */}
      <line x1="-26" y1="-19" x2="21" y2="17" stroke="#334155" strokeWidth="3.6" strokeLinecap="round" />
      <line x1="-26" y1="-19" x2="21" y2="17" stroke="#64748B" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
      <line x1="-26" y1="17" x2="21" y2="-19" stroke="#334155" strokeWidth="3.6" strokeLinecap="round" />
      <line x1="-26" y1="17" x2="21" y2="-19" stroke="#64748B" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />

      {/* Giant Living Demonic Eye */}
      <circle cx="-1" cy="-1" r="11" fill="#090511" stroke="#7C3AED" strokeWidth="2" />
      <ellipse cx="-1" cy="-1" rx="8.5" ry="6" fill="#E879F9" />
      <path d="M-1 -6.5 C 1.2 -2.5 1.2 0 -1 4 C -3.2 0 -3.2 -2.5 -1 -6.5 Z" fill="#18042B" />
      <circle cx="1" cy="-2.5" r="1.5" fill="#FFFFFF" />
    </g>
  );
}

function OffhandOrb() {
  return (
    <g transform="translate(94 300)">
      {/* Radiant Magic Aura behind orb */}
      <circle cx="0" cy="-6" r="38" fill="#38BDF8" opacity="0.25" />
      <circle cx="0" cy="-6" r="25" fill="#A7F3D0" opacity="0.3" />

      {/* Floating Arcane Levitation Focus Ring below celestial orb */}
      <ellipse cx="0" cy="26" rx="25" ry="7" fill="none" stroke="#E8B44F" strokeWidth="1.6" strokeDasharray="5 3" opacity="0.85" />
      <ellipse cx="0" cy="26" rx="15" ry="4.2" fill="none" stroke="#5CE1E6" strokeWidth="1" opacity="0.75" />
      <circle cx="0" cy="26" r="2.5" fill="#5CE1E6" />
      {/* Upward Energy Pillars / Channeling Beams */}
      <line x1="-8" y1="24" x2="-3" y2="10" stroke="#5CE1E6" strokeWidth="1.2" opacity="0.75" strokeDasharray="2 3" />
      <line x1="0" y1="24" x2="0" y2="10" stroke="#FFE680" strokeWidth="1.8" opacity="0.85" />
      <line x1="8" y1="24" x2="3" y2="10" stroke="#5CE1E6" strokeWidth="1.2" opacity="0.75" strokeDasharray="2 3" />

      {/* Outer Planetary Orbital Ring (Back layer) */}
      <ellipse cx="0" cy="-6" rx="29" ry="9.5" fill="none" stroke="#E8B44F" strokeWidth="2.2" opacity="0.55" strokeDasharray="22 22" transform="rotate(-20 0 -6)" />

      {/* Core Sphere (Substantial, impressive 36px diameter) */}
      <circle cx="0" cy="-6" r="18" fill="#0A192F" />
      <path d="M-15 -6 C -9 -17 6 -17 14 -9 C 17 -1 8 8 -3 8 C -12 8 -16 2 -15 -6 Z" fill="#0284C7" opacity="0.85" />
      <path d="M-9 -9 C -4 -15 8 -14 11 -8 C 12 -2 5 4 -1 3 Z" fill="#38BDF8" opacity="0.9" />
      <circle cx="-2" cy="-7" r="5" fill="#BAE6FD" />
      <circle cx="-3" cy="-8" r="2.5" fill="#FFFFFF" />

      {/* Forefront Planetary Orbital Ring */}
      <ellipse cx="0" cy="-6" rx="29" ry="9.5" fill="none" stroke="#F59E0B" strokeWidth="2.8" opacity="0.95" transform="rotate(-20 0 -6)" />
      {/* Inner Tilted Armillary Ring */}
      <ellipse cx="0" cy="-6" rx="25" ry="8" fill="none" stroke="#FEF08A" strokeWidth="1.4" opacity="0.8" transform="rotate(40 0 -6)" />

      {/* Orbiting Star Satellites */}
      <circle cx="-24" cy="2" r="3.2" fill="#FFE680" />
      <circle cx="24" cy="-14" r="2.5" fill="#5CE1E6" />
      <circle cx="-18" cy="-26" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="20" cy="-24" r="2.2" fill="#FDE047" opacity="0.85" />
      <polygon points="0,-29 2,-24 6,-24 3,-21 4.5,-17 0,-20 -4.5,-17 -3,-21 -6,-24 -2,-24" fill="#5CE1E6" opacity="0.9" />
    </g>
  );
}

function OffhandGeneric(props) {
  return <OffhandTome {...props} />;
}

const OFFHAND_COMPONENTS = {
  offhand_tome: OffhandTome,
  offhand_grimoire: OffhandGrimoire,
  offhand_codex: OffhandCodex,
  offhand_forbidden: OffhandForbidden,
  offhand_orb: OffhandOrb,
};

function StaffAshwood() {
  return (
    <g>
      <defs>
        {/* Ashwood Wood Grain 3D Cylindrical Gradient */}
        <linearGradient id="ashwoodShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E0E06" />
          <stop offset="18%" stopColor="#3E1C0A" />
          <stop offset="45%" stopColor="#78350F" />
          <stop offset="70%" stopColor="#A14E1B" />
          <stop offset="85%" stopColor="#5A260D" />
          <stop offset="100%" stopColor="#220D04" />
        </linearGradient>
        {/* Rawhide Leather Wrap */}
        <linearGradient id="ashwoodGripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1C0F08" />
          <stop offset="25%" stopColor="#3F200F" />
          <stop offset="65%" stopColor="#6C391B" />
          <stop offset="88%" stopColor="#4A2411" />
          <stop offset="100%" stopColor="#1E0D05" />
        </linearGradient>
        {/* Forged Iron Banding */}
        <linearGradient id="ashwoodIronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E1B18" />
          <stop offset="30%" stopColor="#38332E" />
          <stop offset="60%" stopColor="#5E5852" />
          <stop offset="85%" stopColor="#302B26" />
          <stop offset="100%" stopColor="#151210" />
        </linearGradient>
        {/* Antique Bronze Ring Collar */}
        <linearGradient id="ashwoodBronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="35%" stopColor="#B45309" />
          <stop offset="65%" stopColor="#F59E0B" />
          <stop offset="90%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#2D1102" />
        </linearGradient>
        {/* Primal Flame Geode Heart Radial */}
        <radialGradient id="ashwoodFlameCore" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="15%" stopColor="#FEF08A" />
          <stop offset="38%" stopColor="#F59E0B" />
          <stop offset="68%" stopColor="#DC2626" />
          <stop offset="90%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </radialGradient>
        {/* Warm Ember Crown Glow */}
        <radialGradient id="ashwoodEmberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#F97316" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#EF4444" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Fiery Heat Haze behind Crown */}
      <circle cx="317" cy="132" r="28" fill="url(#ashwoodEmberGlow)" />

      {/* 1. Base Iron Ferrule & Ground Spike (Y: 438 to 456) */}
      <polygon points="314,456 317,458 320,456 322,442 312,442" fill="url(#ashwoodIronGrad)" stroke="#110E0C" strokeWidth="0.8" />
      <rect x="311.5" y="438" width="11" height="5" rx="1" fill="url(#ashwoodBronzeGrad)" stroke="#451A03" strokeWidth="0.6" />
      <line x1="317" y1="442" x2="317" y2="456" stroke="#888179" strokeWidth="0.8" opacity="0.6" />

      {/* 2. Main Ancient Gnarled Ashwood Shaft (Y: 146 to 440) */}
      <path
        d="M318 146 
           C321 175, 314 210, 319 250 
           C323 285, 314 320, 318 360 
           C321 395, 314 420, 317 440
           L313 440
           C310 420, 316 395, 312 360
           C308 320, 317 285, 313 250
           C309 210, 315 175, 313 146 Z"
        fill="url(#ashwoodShaftGrad)"
        stroke="#190A03"
        strokeWidth="1"
      />
      {/* Wood bark grain striations and knots */}
      <path d="M315 158 Q313 185 316 215" stroke="#260F05" strokeWidth="1.2" fill="none" opacity="0.75" />
      <path d="M317 195 Q319 225 316 255" stroke="#A14E1B" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M314 330 Q317 365 314 400" stroke="#260F05" strokeWidth="1.2" fill="none" opacity="0.75" />
      <path d="M316 345 Q318 380 315 415" stroke="#A14E1B" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Subterranean burning ember fissure through wood */}
      <path d="M316 168 Q314 190 316.5 210" stroke="#F97316" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="316" cy="188" r="1" fill="#FEF08A" opacity="0.85" />
      <path d="M315 365 Q317 385 315.5 405" stroke="#F97316" strokeWidth="0.7" fill="none" opacity="0.6" />

      {/* Decorative Bronze Ring Collar below crown */}
      <rect x="311" y="152" width="12" height="4.5" rx="1.2" fill="url(#ashwoodBronzeGrad)" stroke="#451A03" strokeWidth="0.7" />
      <rect x="312" y="153.2" width="10" height="2" rx="0.5" fill="#FEF08A" opacity="0.35" />

      {/* 3. Dangling Shamanic Bone Rune & Raven Feather (Y: 168 to 226) */}
      <path d="M312 156 C304 165 303 178 305 192" stroke="#451A03" strokeWidth="1.2" fill="none" />
      <circle cx="304.5" cy="176" r="2.6" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="303.8" cy="175.2" r="0.9" fill="#FFFFFF" opacity="0.9" />
      <polygon points="303,184 307,184 308,198 302,198" fill="#F5F0E6" stroke="#A89F91" strokeWidth="0.7" />
      <line x1="305" y1="187" x2="305" y2="195" stroke="#78350F" strokeWidth="0.8" />
      <line x1="303.5" y1="191" x2="306.5" y2="191" stroke="#78350F" strokeWidth="0.8" />
      <path d="M305 198 C300 206 301 222 306 232 C309 224 308 208 305 198 Z" fill="#0F172A" stroke="#020617" strokeWidth="0.8" />
      <line x1="305" y1="198" x2="305" y2="230" stroke="#F59E0B" strokeWidth="0.7" opacity="0.8" />

      {/* 4. Rawhide Leather Grip Wrapping (Y: 274 to 324) - Matching HandGrip */}
      <rect x="309.5" y="274" width="15" height="50" rx="2.5" fill="url(#ashwoodGripGrad)" stroke="#190A03" strokeWidth="0.9" />
      {[0, 8, 16, 24, 32, 40].map((yOff, i) => (
        <g key={i}>
          <line x1="310" y1={278 + yOff} x2="324" y2={283 + yOff} stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="310" y1={283 + yOff} x2="324" y2={278 + yOff} stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <circle cx="310.5" cy={280.5 + yOff} r="1.1" fill="#F59E0B" />
          <circle cx="323.5" cy={280.5 + yOff} r="1.1" fill="#F59E0B" />
        </g>
      ))}
      <rect x="309" y="272" width="16" height="3" rx="0.8" fill="url(#ashwoodBronzeGrad)" stroke="#451A03" strokeWidth="0.6" />
      <rect x="309" y="323" width="16" height="3" rx="0.8" fill="url(#ashwoodBronzeGrad)" stroke="#451A03" strokeWidth="0.6" />

      {/* 5. Gnarled Root-Claw Crown Socket (Back Talons) */}
      <path d="M312 144 C307 132 308 116 314 110 C313 124 316 136 317 146 Z" fill="#2C1205" stroke="#120702" strokeWidth="0.9" />
      <path d="M322 144 C327 132 326 116 320 110 C321 124 318 136 317 146 Z" fill="#2C1205" stroke="#120702" strokeWidth="0.9" />

      {/* 6. Multi-Faceted Igneous Flame Geode Crystal (Y: 110 to 142) */}
      <polygon points="317,112 328,122 329,136 317,144 305,136 306,122" fill="url(#ashwoodFlameCore)" stroke="#991B1B" strokeWidth="1" />
      <polygon points="317,112 306,122 312,126 317,120" fill="#EF4444" opacity="0.6" />
      <polygon points="317,112 328,122 322,126 317,120" fill="#FEF08A" opacity="0.75" />
      <polygon points="317,144 329,136 322,132 317,136" fill="#7F1D1D" opacity="0.8" />
      <polygon points="317,144 305,136 312,132 317,136" fill="#991B1B" opacity="0.7" />
      <polygon points="317,120 322,126 322,132 317,136 312,132 312,126" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="0.8" />
      <ellipse cx="317" cy="128" rx="3.5" ry="4.5" fill="#FFFFFF" />

      {/* 7. Front Root-Claws Clutching the Geode */}
      <path d="M309 146 C303 138 305 125 311 122 C308 130 312 138 316 146 Z" fill="url(#ashwoodShaftGrad)" stroke="#190A03" strokeWidth="0.8" />
      <path d="M325 146 C331 138 329 125 323 122 C326 130 322 138 318 146 Z" fill="url(#ashwoodShaftGrad)" stroke="#190A03" strokeWidth="0.8" />
      <circle cx="317" cy="145" r="4.5" fill="url(#ashwoodBronzeGrad)" stroke="#451A03" strokeWidth="0.8" />
      <circle cx="317" cy="145" r="2.2" fill="#FEF08A" />

      {/* 8. Floating Rising Flame Embers */}
      <circle className="wingEmber" cx="312" cy="116" r="2.2" fill="#FEF08A" />
      <circle className="wingEmber" style={{ animationDelay: "0.6s" }} cx="324" cy="112" r="1.8" fill="#F97316" />
      <circle className="wingEmber" style={{ animationDelay: "1.2s" }} cx="317" cy="104" r="2.4" fill="#FFFFFF" />
      <circle className="wingEmber" style={{ animationDelay: "1.8s" }} cx="308" cy="124" r="1.5" fill="#F59E0B" />
      <circle className="wingEmber" style={{ animationDelay: "0.9s" }} cx="327" cy="122" r="1.6" fill="#EF4444" />
    </g>
  );
}

function StaffFrostbound() {
  return (
    <g>
      <defs>
        {/* Hexagonal Glacial Crystal Pillar Gradient */}
        <linearGradient id="frostShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#082F49" />
          <stop offset="20%" stopColor="#0369A1" />
          <stop offset="48%" stopColor="#38BDF8" />
          <stop offset="72%" stopColor="#BAE6FD" />
          <stop offset="86%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>
        {/* Trapped Blizzard Mist Core */}
        <linearGradient id="frostMistCore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
        </linearGradient>
        {/* Polished Moon-Silver Filigree Gradient */}
        <linearGradient id="frostSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="65%" stopColor="#94A3B8" />
          <stop offset="85%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        {/* Midnight Blue Velvet Grip */}
        <linearGradient id="frostVelvetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="25%" stopColor="#0F172A" />
          <stop offset="60%" stopColor="#1E293B" />
          <stop offset="85%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        {/* Faceted Star Shard Gradient */}
        <linearGradient id="frostStarShardLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="frostStarShardDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        {/* Glacial Aura Halo */}
        <radialGradient id="frostAuraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#0284C7" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glacial Cold Aura behind Crown */}
      <circle cx="317" cy="122" r="32" fill="url(#frostAuraGlow)" />

      {/* 1. Base Silver Ferrule & Chiseled Ice Spike (Y: 438 to 456) */}
      <polygon points="314,456 317,458 320,456 322,442 312,442" fill="url(#frostStarShardLight)" stroke="#0369A1" strokeWidth="0.8" />
      <polygon points="317,442 317,458 320,456 322,442" fill="url(#frostStarShardDark)" opacity="0.7" />
      <rect x="311" y="438" width="12" height="5" rx="1.2" fill="url(#frostSilverGrad)" stroke="#475569" strokeWidth="0.6" />
      <circle cx="317" cy="440.5" r="1.4" fill="#38BDF8" />

      {/* 2. Hexagonal Glacial Permafrost Shaft (Y: 148 to 438) */}
      <rect x="312" y="148" width="10" height="290" rx="2" fill="url(#frostShaftGrad)" stroke="#082F49" strokeWidth="1" />
      <line x1="316.5" y1="152" x2="316.5" y2="434" stroke="url(#frostMistCore)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="317.8" y1="156" x2="317.8" y2="430" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.9" />

      {/* Silver Filigree Collar Bands with Carved Runic Ice Glyphs */}
      <g>
        <rect x="310.5" y="174" width="13" height="5" rx="1.2" fill="url(#frostSilverGrad)" stroke="#334155" strokeWidth="0.7" />
        <line x1="312" y1="176.5" x2="322" y2="176.5" stroke="#0284C7" strokeWidth="0.9" />
        <circle cx="317" cy="176.5" r="1.2" fill="#BAE6FD" />
        <rect x="310.5" y="348" width="13" height="5" rx="1.2" fill="url(#frostSilverGrad)" stroke="#334155" strokeWidth="0.7" />
        <line x1="312" y1="350.5" x2="322" y2="350.5" stroke="#0284C7" strokeWidth="0.9" />
        <circle cx="317" cy="350.5" r="1.2" fill="#BAE6FD" />
      </g>

      {/* 3. Midnight-Blue Velvet Grip with Silver Wire Filigree (Y: 274 to 324) */}
      <rect x="309.5" y="274" width="15" height="50" rx="2" fill="url(#frostVelvetGrad)" stroke="#0369A1" strokeWidth="0.9" />
      {[0, 8, 16, 24, 32, 40].map((yOff, i) => (
        <g key={i}>
          <line x1="310" y1={278 + yOff} x2="324" y2={283 + yOff} stroke="url(#frostSilverGrad)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="310" y1={283 + yOff} x2="324" y2={278 + yOff} stroke="url(#frostSilverGrad)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="317" cy={280.5 + yOff} r="1.3" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.5" />
        </g>
      ))}
      <rect x="309" y="272" width="16" height="3" rx="0.8" fill="url(#frostSilverGrad)" stroke="#334155" strokeWidth="0.6" />
      <rect x="309" y="323" width="16" height="3" rx="0.8" fill="url(#frostSilverGrad)" stroke="#334155" strokeWidth="0.6" />

      {/* 4. Moon-Silver Crescent Bracket Prongs (Y: 108 to 154) */}
      <path
        d="M304 154 
           C296 138, 298 116, 310 106 
           C306 122, 308 142, 315 154 Z"
        fill="url(#frostSilverGrad)"
        stroke="#475569"
        strokeWidth="0.8"
      />
      <path
        d="M330 154 
           C338 138, 336 116, 324 106 
           C328 122, 326 142, 319 154 Z"
        fill="url(#frostSilverGrad)"
        stroke="#475569"
        strokeWidth="0.8"
      />
      <rect x="310" y="151" width="14" height="6" rx="1.5" fill="url(#frostSilverGrad)" stroke="#334155" strokeWidth="0.8" />
      <circle cx="317" cy="154" r="2.6" fill="#0284C7" stroke="#BAE6FD" strokeWidth="0.8" />
      <circle cx="316.2" cy="153.2" r="0.9" fill="#FFFFFF" />

      {/* 5. Suspended Faceted 8-Pointed Diamond Snowflake Star (Centered at X=317, Y=122) */}
      {/* Cardinal Points */}
      <polygon points="317,92 314,122 317,122" fill="url(#frostStarShardLight)" />
      <polygon points="317,92 320,122 317,122" fill="url(#frostStarShardDark)" />
      <polygon points="317,150 314,122 317,122" fill="url(#frostStarShardLight)" />
      <polygon points="317,150 320,122 317,122" fill="url(#frostStarShardDark)" />
      <polygon points="345,122 317,119 317,122" fill="url(#frostStarShardLight)" />
      <polygon points="345,122 317,125 317,122" fill="url(#frostStarShardDark)" />
      <polygon points="289,122 317,119 317,122" fill="url(#frostStarShardLight)" />
      <polygon points="289,122 317,125 317,122" fill="url(#frostStarShardDark)" />

      {/* Diagonal Points */}
      <polygon points="335,104 317,122 320,119" fill="url(#frostStarShardLight)" />
      <polygon points="335,104 317,122 323,122" fill="url(#frostStarShardDark)" />
      <polygon points="335,140 317,122 323,122" fill="url(#frostStarShardLight)" />
      <polygon points="335,140 317,122 320,125" fill="url(#frostStarShardDark)" />
      <polygon points="299,104 317,122 314,119" fill="url(#frostStarShardLight)" />
      <polygon points="299,104 317,122 311,122" fill="url(#frostStarShardDark)" />
      <polygon points="299,140 317,122 311,122" fill="url(#frostStarShardLight)" />
      <polygon points="299,140 317,122 314,125" fill="url(#frostStarShardDark)" />

      {/* Center Faceted Diamond Octagon */}
      <polygon points="317,113 323,117 326,122 323,127 317,131 311,127 308,122 311,117" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="317" cy="122" r="4.2" fill="#FFFFFF" />
      <circle cx="317" cy="122" r="2.2" fill="#7DD3FC" />

      {/* 6. Floating Rime Ice Needle Shards & Glacial Sparkles */}
      <polygon className="holySparkle" points="298,100 302,106 300,110 296,104" fill="#BAE6FD" />
      <polygon className="holySparkle" style={{ animationDelay: "0.8s" }} points="336,100 332,106 334,110 338,104" fill="#BAE6FD" />
      <path className="holySparkle" style={{ animationDelay: "0.4s" }} d="M317,82 L318.5,86 L323,87.5 L318.5,89 L317,93 L315.5,89 L311,87.5 L315.5,86 Z" fill="#FFFFFF" />
      <path className="holySparkle" style={{ animationDelay: "1.2s" }} d="M344,138 L345,141 L348,142 L345,143 L344,146 L343,143 L340,142 L343,141 Z" fill="#7DD3FC" />
      <path className="holySparkle" style={{ animationDelay: "1.6s" }} d="M292,136 L293,139 L296,140 L293,141 L292,144 L291,141 L288,140 L291,139 Z" fill="#E0F2FE" />
    </g>
  );
}

function StaffVerdant() {
  return (
    <g>
      <defs>
        {/* Ancient Living Ironwood Bough Gradient */}
        <linearGradient id="verdantWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#142306" />
          <stop offset="22%" stopColor="#2D480E" />
          <stop offset="50%" stopColor="#4D7C0F" />
          <stop offset="78%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#1F3609" />
        </linearGradient>
        {/* Lush Spiraling Ivy Vine */}
        <linearGradient id="verdantVineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="50%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        {/* Veined Botanical Leaves */}
        <linearGradient id="verdantLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="60%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        {/* Sacred Tear of Yggdrasil Emerald Radial */}
        <radialGradient id="verdantEmeraldCore" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="22%" stopColor="#86EFAC" />
          <stop offset="52%" stopColor="#22C55E" />
          <stop offset="82%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#052E16" />
        </radialGradient>
        {/* Radiant Emerald Life Aura */}
        <radialGradient id="verdantLifeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#22C55E" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#16A34A" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#052E16" stopOpacity="0" />
        </radialGradient>
        {/* Forest Grip Leather */}
        <linearGradient id="verdantGripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#142608" />
          <stop offset="30%" stopColor="#283E11" />
          <stop offset="65%" stopColor="#48691F" />
          <stop offset="100%" stopColor="#1B2D0A" />
        </linearGradient>
      </defs>

      {/* Emerald Life Essence Aura behind Crown */}
      <circle cx="317" cy="128" r="30" fill="url(#verdantLifeGlow)" />

      {/* 1. Base Living Roots & Polished River Jade Stone (Y: 442 to 458) */}
      <ellipse cx="317" cy="454" rx="7" ry="4.5" fill="#065F46" stroke="#042F2E" strokeWidth="0.8" />
      <ellipse cx="316" cy="452.5" rx="3.5" ry="2" fill="#34D399" opacity="0.6" />
      <path d="M312 438 C310 446 312 452 314 456" stroke="#2D480E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M322 438 C324 446 322 452 320 456" stroke="#2D480E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M317 438 C317 448 318 454 317 457" stroke="#4D7C0F" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* 2. Main Living World-Tree Bough (Y: 148 to 442) */}
      <path
        d="M317 148 
           C323 210, 311 280, 318 360 
           C322 400, 315 425, 317 442
           L312 442
           C310 425, 317 400, 313 360
           C306 280, 318 210, 312 148 Z"
        fill="url(#verdantWoodGrad)"
        stroke="#142306"
        strokeWidth="1"
      />
      <path d="M314 156 C319 214 309 282 315 362" stroke="#84CC16" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M316 162 C321 218 311 286 317 366" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* 3. Spiraling Ivy Vine Coiling up the Shaft */}
      <path
        d="M314 436 
           Q324 395 314 360 
           Q324 315 315 270 
           Q325 220 315 175"
        stroke="url(#verdantVineGrad)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M314 436 
           Q324 395 314 360 
           Q324 315 315 270 
           Q325 220 315 175"
        stroke="#86EFAC"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />

      {/* Sculpted Ivy Leaves with Golden Veins */}
      <g transform="translate(322 345) rotate(24)">
        <path d="M0 0 C 8 -5 14 0 16 8 C 8 10 2 6 0 0 Z" fill="url(#verdantLeafGrad)" stroke="#14532D" strokeWidth="0.7" />
        <line x1="0" y1="0" x2="13" y2="7" stroke="#FEF08A" strokeWidth="0.6" opacity="0.8" />
      </g>
      <g transform="translate(310 245) rotate(-32)">
        <path d="M0 0 C -8 -5 -14 0 -16 8 C -8 10 -2 6 0 0 Z" fill="url(#verdantLeafGrad)" stroke="#14532D" strokeWidth="0.7" />
        <line x1="0" y1="0" x2="-13" y2="7" stroke="#FEF08A" strokeWidth="0.6" opacity="0.8" />
      </g>
      <g transform="translate(323 185) rotate(18)">
        <path d="M0 0 C 8 -5 14 0 16 8 C 8 10 2 6 0 0 Z" fill="url(#verdantLeafGrad)" stroke="#14532D" strokeWidth="0.7" />
        <line x1="0" y1="0" x2="13" y2="7" stroke="#FEF08A" strokeWidth="0.6" opacity="0.8" />
      </g>

      {/* Blossoming Star-Jasmine Florets */}
      <g transform="translate(325 228)">
        <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="1.3" fill="#FBBF24" />
      </g>
      <g transform="translate(308 305)">
        <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="1.3" fill="#FBBF24" />
      </g>

      {/* 4. Forest Tanned-Hide & Braided Reed Grip (Y: 274 to 324) */}
      <rect x="309.5" y="274" width="15" height="50" rx="2" fill="url(#verdantGripGrad)" stroke="#142306" strokeWidth="0.9" />
      {[0, 8, 16, 24, 32, 40].map((yOff, i) => (
        <g key={i}>
          <line x1="310" y1={278 + yOff} x2="324" y2={283 + yOff} stroke="#EAB308" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="310" y1={283 + yOff} x2="324" y2={278 + yOff} stroke="#65A30D" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <circle cx="317" cy={280.5 + yOff} r="1.2" fill="#34D399" />
        </g>
      ))}
      <rect x="309" y="272" width="16" height="3" rx="0.8" fill="#4D7C0F" stroke="#142306" strokeWidth="0.6" />
      <rect x="309" y="323" width="16" height="3" rx="0.8" fill="#4D7C0F" stroke="#142306" strokeWidth="0.6" />

      {/* 5. Blooming Lotus Calyx Cradle (Back Petals) */}
      <path d="M308 152 C298 136 300 118 311 110 C310 128 314 142 317 150 Z" fill="#1B380A" stroke="#0E1E05" strokeWidth="0.8" />
      <path d="M326 152 C336 136 334 118 323 110 C324 128 320 142 317 150 Z" fill="#1B380A" stroke="#0E1E05" strokeWidth="0.8" />

      {/* 6. The Sacred Tear of Yggdrasil (Luminous Teardrop Emerald) */}
      <path
        d="M317 104 
           C304 124, 305 142, 317 146 
           C329 142, 330 124, 317 104 Z"
        fill="url(#verdantEmeraldCore)"
        stroke="#15803D"
        strokeWidth="1"
      />
      <path d="M317 106 C308 123 309 138 317 141" stroke="#86EFAC" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M317 106 C326 123 325 138 317 141" stroke="#042F2E" strokeWidth="1.2" fill="none" opacity="0.6" />
      <ellipse cx="315.5" cy="128" rx="4" ry="7" fill="#FFFFFF" opacity="0.55" />
      <circle cx="315" cy="123" r="2" fill="#FFFFFF" />

      {/* 7. Blooming Lotus Calyx Front Petals */}
      <path d="M311 154 C304 142 306 130 312 126 C310 136 313 146 317 154 Z" fill="url(#verdantLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M323 154 C330 142 328 130 322 126 C324 136 321 146 317 154 Z" fill="url(#verdantLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <circle cx="317" cy="153" r="3.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
      <circle cx="317" cy="153" r="1.6" fill="#FEF08A" />

      {/* 8. Floating Golden Pollen & Life Spores */}
      <circle className="holySparkle" cx="308" cy="100" r="2" fill="#FEF08A" />
      <circle className="holySparkle" style={{ animationDelay: "0.7s" }} cx="328" cy="96" r="2.2" fill="#86EFAC" />
      <circle className="holySparkle" style={{ animationDelay: "1.3s" }} cx="317" cy="86" r="2.5" fill="#FEF08A" />
      <circle className="holySparkle" style={{ animationDelay: "0.4s" }} cx="334" cy="116" r="1.6" fill="#FDE047" />
      <circle className="holySparkle" style={{ animationDelay: "1.7s" }} cx="301" cy="118" r="1.7" fill="#86EFAC" />
    </g>
  );
}

function StaffVoidglass() {
  return (
    <g>
      <defs>
        {/* Fluted Obsidian Voidglass Pillar Gradient */}
        <linearGradient id="voidglassShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#05030A" />
          <stop offset="16%" stopColor="#160B29" />
          <stop offset="45%" stopColor="#2E1065" />
          <stop offset="70%" stopColor="#4C1D95" />
          <stop offset="85%" stopColor="#1E0A3A" />
          <stop offset="100%" stopColor="#05030A" />
        </linearGradient>
        {/* Pulsing Void Singularity Channel */}
        <linearGradient id="voidChannelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        {/* Astrolabe Brass / Solarite Gold Gradient */}
        <linearGradient id="voidglassGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FDE68A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="82%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        {/* Dark Matter Tesseract Prism Facets */}
        <linearGradient id="voidTesseractLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E9D5FF" />
          <stop offset="75%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id="voidTesseractDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="45%" stopColor="#581C87" />
          <stop offset="85%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#0F051D" />
        </linearGradient>
        {/* Singularity Aura Glow */}
        <radialGradient id="voidCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#E9D5FF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#9333EA" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#581C87" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
        </radialGradient>
        {/* Royal Violet Velvet Grip */}
        <linearGradient id="voidglassVelvetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B0516" />
          <stop offset="25%" stopColor="#240E42" />
          <stop offset="60%" stopColor="#3B1266" />
          <stop offset="85%" stopColor="#240E42" />
          <stop offset="100%" stopColor="#0B0516" />
        </linearGradient>
      </defs>

      {/* Cosmic Singularity Aura behind Crown */}
      <circle cx="317" cy="126" r="34" fill="url(#voidCoreGlow)" />

      {/* 1. Base Astrolabe Cage & Void Cone Finial (Y: 438 to 458) */}
      <polygon points="314,456 317,458 320,456 322,442 312,442" fill="url(#voidTesseractDark)" stroke="#C084FC" strokeWidth="0.8" />
      <path d="M312 442 C312 450 315 456 317 458" stroke="url(#voidglassGoldGrad)" strokeWidth="1" fill="none" />
      <path d="M322 442 C322 450 319 456 317 458" stroke="url(#voidglassGoldGrad)" strokeWidth="1" fill="none" />
      <rect x="311" y="438" width="12" height="5" rx="1.2" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.7" />
      <circle cx="317" cy="440.5" r="1.4" fill="#C084FC" />

      {/* 2. Fluted Obsidian Voidglass Column (Y: 148 to 438) */}
      <rect x="312" y="148" width="10" height="290" rx="2" fill="url(#voidglassShaftGrad)" stroke="#05030A" strokeWidth="1" />
      <line x1="317" y1="152" x2="317" y2="434" stroke="url(#voidChannelGrad)" strokeWidth="1.8" />
      <g stroke="#E9D5FF" strokeWidth="1.2" fill="none" opacity="0.85">
        <path d="M315 170 L318 176 L315 182" />
        <circle cx="318" cy="176" r="1.2" fill="#FFFFFF" />
        <path d="M319 230 L315 237 L318 244" />
        <circle cx="315" cy="237" r="1.2" fill="#FFFFFF" />
        <path d="M315 350 L318 358 L316 366" />
        <circle cx="318" cy="358" r="1.2" fill="#FFFFFF" />
      </g>

      {/* Astronomical Brass Collars with Degree Hash Marks */}
      <g>
        <rect x="310.5" y="196" width="13" height="5" rx="1" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />
        <line x1="313" y1="198.5" x2="321" y2="198.5" stroke="#451A03" strokeWidth="0.8" />
        <rect x="310.5" y="380" width="13" height="5" rx="1" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />
        <line x1="313" y1="382.5" x2="321" y2="382.5" stroke="#451A03" strokeWidth="0.8" />
      </g>

      {/* 3. Royal Violet Velvet Grip with Gold Filigree Braiding (Y: 274 to 324) */}
      <rect x="309.5" y="274" width="15" height="50" rx="2" fill="url(#voidglassVelvetGrad)" stroke="#7C3AED" strokeWidth="0.9" />
      {[0, 8, 16, 24, 32, 40].map((yOff, i) => (
        <g key={i}>
          <line x1="310" y1={278 + yOff} x2="324" y2={283 + yOff} stroke="url(#voidglassGoldGrad)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="310" y1={283 + yOff} x2="324" y2={278 + yOff} stroke="url(#voidglassGoldGrad)" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="317" cy={280.5 + yOff} r="1.3" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="0.5" />
        </g>
      ))}
      <rect x="309" y="272" width="16" height="3" rx="0.8" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />
      <rect x="309" y="323" width="16" height="3" rx="0.8" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />

      {/* 4. Astrolabe Crown Mounting Socket */}
      <rect x="310" y="148" width="14" height="6" rx="1.5" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.8" />
      <circle cx="317" cy="151" r="2.2" fill="#7C3AED" stroke="#E9D5FF" strokeWidth="0.8" />

      {/* 5. Outer Astronomical Gyroscopic Gold Ring (Tilted -26 deg) */}
      <g transform="rotate(-26 317 126)">
        <ellipse cx="317" cy="126" rx="27" ry="9.5" fill="none" stroke="url(#voidglassGoldGrad)" strokeWidth="2.8" />
        <ellipse cx="317" cy="126" rx="27" ry="9.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
        <circle cx="290" cy="126" r="2.2" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="344" cy="126" r="2.2" fill="url(#voidglassGoldGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="290" cy="126" r="1.1" fill="#C084FC" />
        <circle cx="344" cy="126" r="1.1" fill="#C084FC" />
      </g>

      {/* 6. Floating Faceted Void Tesseract / Octahedron Prism */}
      <polygon points="317,100 304,126 317,126" fill="url(#voidTesseractLight)" stroke="#C084FC" strokeWidth="0.6" />
      <polygon points="317,100 330,126 317,126" fill="url(#voidTesseractDark)" stroke="#C084FC" strokeWidth="0.6" />
      <polygon points="317,152 304,126 317,126" fill="url(#voidTesseractDark)" stroke="#C084FC" strokeWidth="0.6" />
      <polygon points="317,152 330,126 317,126" fill="url(#voidTesseractLight)" stroke="#C084FC" strokeWidth="0.6" />
      <polygon points="317,112 325,126 317,140 309,126" fill="url(#voidTesseractLight)" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="317" cy="126" r="4.2" fill="#FFFFFF" />
      <circle cx="317" cy="126" r="2" fill="#E9D5FF" />

      {/* 7. Inner Astronomical Gyroscopic Gold Ring (Tilted +42 deg) */}
      <g transform="rotate(42 317 126)">
        <ellipse cx="317" cy="126" rx="22" ry="7.5" fill="none" stroke="url(#voidglassGoldGrad)" strokeWidth="2.2" />
        <ellipse cx="317" cy="126" rx="22" ry="7.5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />
        <circle cx="295" cy="126" r="1.6" fill="#FDE68A" />
        <circle cx="339" cy="126" r="1.6" fill="#FDE68A" />
      </g>

      {/* 8. Orbiting Cosmic Stardust Motes & Arcane Sparks */}
      <circle className="holySparkle" cx="292" cy="112" r="2" fill="#E9D5FF" />
      <circle className="holySparkle" style={{ animationDelay: "0.6s" }} cx="342" cy="116" r="2.2" fill="#C084FC" />
      <circle className="holySparkle" style={{ animationDelay: "1.2s" }} cx="328" cy="94" r="2.4" fill="#FFFFFF" />
      <circle className="holySparkle" style={{ animationDelay: "1.8s" }} cx="304" cy="144" r="1.8" fill="#F472B6" />
      <path className="holySparkle" style={{ animationDelay: "0.9s" }} d="M340,140 L341.5,143 L345,144 L341.5,145 L340,148 L338.5,145 L335,144 L338.5,143 Z" fill="#E9D5FF" />
    </g>
  );
}

function StaffSunfire() {
  return (
    <g>
      <defs>
        {/* Archon Solarite Gold Shaft Gradient */}
        <linearGradient id="sunfireGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="18%" stopColor="#B45309" />
          <stop offset="42%" stopColor="#F59E0B" />
          <stop offset="68%" stopColor="#FEF08A" />
          <stop offset="85%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        {/* Polished Imperial Ruby Cabochons */}
        <radialGradient id="sunfireRubyGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FDA4AF" />
          <stop offset="55%" stopColor="#E11D48" />
          <stop offset="82%" stopColor="#9F1239" />
          <stop offset="100%" stopColor="#4C0519" />
        </radialGradient>
        {/* Captive Miniature Sun Radial Photosphere */}
        <radialGradient id="sunfireSunCore" cx="48%" cy="46%" r="54%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#F97316" />
          <stop offset="88%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
        {/* Solar Corona Flare */}
        <radialGradient id="sunfireCoronaFlare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.28" />
          <stop offset="78%" stopColor="#DC2626" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>
        {/* Imperial Crimson Silk Grip */}
        <linearGradient id="sunfireSilkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4C0519" />
          <stop offset="25%" stopColor="#881337" />
          <stop offset="60%" stopColor="#BE123C" />
          <stop offset="85%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>
        {/* Solar Flare Blade Shading */}
        <linearGradient id="sunfireBladeLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="sunfireBladeDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="60%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Massive Radiant Solar Corona behind Crown */}
      <circle cx="317" cy="122" r="38" fill="url(#sunfireCoronaFlare)" />

      {/* 1. Base Archon Spearhead Pommel & Ground Spike (Y: 438 to 458) */}
      <polygon points="314,456 317,458 320,456 323,442 311,442" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.8" />
      <polygon points="317,442 317,458 320,456 323,442" fill="url(#sunfireBladeDark)" opacity="0.8" />
      <rect x="310.5" y="438" width="13" height="5" rx="1.2" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
      <circle cx="317" cy="440.5" r="1.6" fill="url(#sunfireRubyGrad)" />

      {/* 2. Archon Solarite Gold Column (Y: 152 to 438) */}
      <rect x="311.5" y="152" width="11" height="286" rx="2" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="1" />
      <path
        d="M317 156 
           C310 180, 324 205, 317 230 
           C310 255, 324 280, 317 305 
           C310 330, 324 355, 317 380 
           C310 405, 324 430, 317 436"
        stroke="#FFFBEB"
        strokeWidth="1.8"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M316 158 
           C309 182, 323 207, 316 232 
           C309 257, 323 282, 316 307 
           C309 332, 323 357, 316 382 
           C309 407, 323 432, 316 438"
        stroke="#BE123C"
        strokeWidth="0.9"
        fill="none"
        opacity="0.6"
      />

      {/* Ornate Gold Collar Rings with Polished Ruby Cabochons */}
      <g>
        <rect x="310" y="184" width="14" height="6" rx="1.5" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
        <circle cx="317" cy="187" r="2.2" fill="url(#sunfireRubyGrad)" stroke="#78350F" strokeWidth="0.6" />
        <rect x="310" y="360" width="14" height="6" rx="1.5" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
        <circle cx="317" cy="363" r="2.2" fill="url(#sunfireRubyGrad)" stroke="#78350F" strokeWidth="0.6" />
      </g>

      {/* Twin Suspended Gold Chains & Hanging Sunburst Medallions (Y: 156 to 226) */}
      <g>
        <path d="M310 156 Q303 172 305 192" stroke="url(#sunfireGoldGrad)" strokeWidth="1.2" fill="none" />
        <circle cx="305" cy="195" r="4.2" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
        <polygon points="305,191 306.5,194 309,195 306.5,196 305,199 303.5,196 301,195 303.5,194" fill="#FFFBEB" />
        <circle cx="305" cy="195" r="1.6" fill="url(#sunfireRubyGrad)" />
        <path d="M305 200 C303 205 303 214 305 218 C307 214 307 205 305 200 Z" fill="url(#sunfireRubyGrad)" stroke="#78350F" strokeWidth="0.6" />

        <path d="M324 156 Q330 172 328 190" stroke="url(#sunfireGoldGrad)" strokeWidth="1.2" fill="none" />
        <circle cx="328" cy="193" r="3.6" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
        <circle cx="328" cy="193" r="1.4" fill="url(#sunfireRubyGrad)" />
        <path d="M328 198 C326.5 202 326.5 210 328 214 C329.5 210 329.5 202 328 198 Z" fill="url(#sunfireRubyGrad)" stroke="#78350F" strokeWidth="0.6" />
      </g>

      {/* 3. Imperial Crimson Silk Ribbon Grip (Y: 274 to 324) */}
      <rect x="309.5" y="274" width="15" height="50" rx="2" fill="url(#sunfireSilkGrad)" stroke="#78350F" strokeWidth="0.9" />
      {[0, 8, 16, 24, 32, 40].map((yOff, i) => (
        <g key={i}>
          <line x1="310" y1={278 + yOff} x2="324" y2={283 + yOff} stroke="url(#sunfireGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="310" y1={283 + yOff} x2="324" y2={278 + yOff} stroke="url(#sunfireGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="317" cy={280.5 + yOff} r="1.4" fill="url(#sunfireRubyGrad)" stroke="#FEF08A" strokeWidth="0.5" />
        </g>
      ))}
      <rect x="309" y="271" width="16" height="3.5" rx="0.8" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />
      <rect x="309" y="323" width="16" height="3.5" rx="0.8" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.7" />

      {/* 4. Grand Archon Solar Crown Mounting Bracket (Y: 146 to 154) */}
      <polygon points="317,146 328,154 306,154" fill="url(#sunfireGoldGrad)" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="317" cy="152" r="2.8" fill="url(#sunfireRubyGrad)" stroke="#FEF08A" strokeWidth="0.6" />

      {/* 5. Majestic 12-Pointed Solar Crown Halo (Centered at X=317, Y=122) */}
      {/* 4 Primary Cardinal Solar Lances */}
      <polygon points="317,72 313,106 317,112" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.7" />
      <polygon points="317,72 321,106 317,112" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.7" />
      <polygon points="317,72 317,112 313,106" fill="#FFFBEB" opacity="0.5" />

      <polygon points="317,156 313,136 317,132" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.7" />
      <polygon points="317,156 321,136 317,132" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.7" />

      <polygon points="354,122 332,118 328,122" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.7" />
      <polygon points="354,122 332,126 328,122" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.7" />

      <polygon points="280,122 302,118 306,122" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.7" />
      <polygon points="280,122 302,126 306,122" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.7" />

      {/* 4 Secondary Diagonal Solar Lances */}
      <polygon points="343,96 328,114 322,118" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.6" />
      <polygon points="343,96 322,118 326,112" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.6" />

      <polygon points="343,148 328,130 322,126" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.6" />
      <polygon points="343,148 322,126 326,132" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.6" />

      <polygon points="291,96 306,114 312,118" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.6" />
      <polygon points="291,96 312,118 308,112" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.6" />

      <polygon points="291,148 306,130 312,126" fill="url(#sunfireBladeLight)" stroke="#78350F" strokeWidth="0.6" />
      <polygon points="291,148 312,126 308,132" fill="url(#sunfireBladeDark)" stroke="#78350F" strokeWidth="0.6" />

      {/* 4 Curving Molten Flame Tongues */}
      <path d="M317 106 C326 92 334 94 336 86 C332 94 326 102 317 106 Z" fill="url(#sunfireBladeLight)" opacity="0.85" />
      <path d="M317 106 C308 92 300 94 298 86 C302 94 308 102 317 106 Z" fill="url(#sunfireBladeLight)" opacity="0.85" />
      <path d="M317 138 C326 152 334 150 336 158 C332 150 326 142 317 138 Z" fill="url(#sunfireBladeDark)" opacity="0.85" />
      <path d="M317 138 C308 152 300 150 298 158 C302 150 308 142 317 138 Z" fill="url(#sunfireBladeDark)" opacity="0.85" />

      {/* Interlocking Outer Solar Ring */}
      <circle cx="317" cy="122" r="18" fill="none" stroke="url(#sunfireGoldGrad)" strokeWidth="2.5" />
      <circle cx="317" cy="122" r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

      {/* 6. Living Captive Miniature Sun Core */}
      <circle cx="317" cy="122" r="14" fill="url(#sunfireSunCore)" stroke="#F59E0B" strokeWidth="1" />
      <ellipse cx="317" cy="122" rx="16" ry="7" fill="none" stroke="#FEF08A" strokeWidth="1.2" opacity="0.8" transform="rotate(30 317 122)" />
      <ellipse cx="317" cy="122" rx="16" ry="7" fill="none" stroke="#F97316" strokeWidth="1.2" opacity="0.75" transform="rotate(-40 317 122)" />
      <circle cx="317" cy="122" r="7.5" fill="#FFFFFF" />
      <circle cx="317" cy="122" r="4" fill="#FEF08A" />

      {/* 7. Floating Radiant Flares, Embers & Sacred Sparkles */}
      <circle className="wingEmber" cx="310" cy="94" r="2.2" fill="#FEF08A" />
      <circle className="wingEmber" style={{ animationDelay: "0.7s" }} cx="328" cy="90" r="2.4" fill="#FFFFFF" />
      <circle className="wingEmber" style={{ animationDelay: "1.4s" }} cx="317" cy="80" r="2" fill="#F97316" />
      <path className="holySparkle" style={{ animationDelay: "0.5s" }} d="M346,104 L347.5,108 L351,109.5 L347.5,111 L346,115 L344.5,111 L341,109.5 L344.5,108 Z" fill="#FEF08A" />
      <path className="holySparkle" style={{ animationDelay: "1.1s" }} d="M288,104 L289.5,108 L293,109.5 L289.5,111 L288,115 L286.5,111 L283,109.5 L286.5,108 Z" fill="#FFFFFF" />
      <circle className="holySparkle" style={{ animationDelay: "1.8s" }} cx="348" cy="136" r="1.8" fill="#FDE047" />
      <circle className="holySparkle" style={{ animationDelay: "0.3s" }} cx="286" cy="136" r="1.8" fill="#FDE047" />
    </g>
  );
}

function AuraVisual({ aura }) {
  if (!aura || !aura.color || aura.id === "aura_none") return null;

  if (aura.id === "aura_ember") {
    return (
      <g className="auraPulse">
        {/* Floating fiery sparks & ember wisps */}
        <circle cx="120" cy="410" r="3.5" fill="#FF6B3D" opacity="0.8" />
        <circle cx="120" cy="410" r="1.5" fill="#FEF08A" />
        <circle cx="280" cy="390" r="4" fill="#EA580C" opacity="0.85" />
        <circle cx="280" cy="390" r="2" fill="#FEF08A" />
        <circle cx="105" cy="320" r="2.8" fill="#FF6B3D" opacity="0.75" />
        <circle cx="295" cy="270" r="3.2" fill="#F97316" opacity="0.8" />
        <circle cx="295" cy="270" r="1.2" fill="#FFFFFF" />
        <circle cx="140" cy="210" r="2.5" fill="#FF8C42" opacity="0.7" />
        <circle cx="260" cy="180" r="2.5" fill="#FF8C42" opacity="0.7" />
        <path d="M125 350 Q120 340 126 332 Q130 342 125 350" fill="#FF6B3D" opacity="0.7" />
        <path d="M272 320 Q278 310 273 302 Q268 312 272 320" fill="#F97316" opacity="0.7" />
      </g>
    );
  }

  if (aura.id === "aura_frost") {
    return (
      <g className="auraPulse">
        {/* Floating ice crystals and frost sparkles */}
        {[[115, 380, 5], [285, 370, 6], [108, 290, 4.5], [292, 250, 5], [130, 190, 4], [270, 170, 4.5]].map(([cx, cy, r], i) => (
          <g key={i}>
            <polygon points={`${cx},${cy - r} ${cx + r * 0.6},${cy} ${cx},${cy + r} ${cx - r * 0.6},${cy}`} fill="#5FC1E8" opacity="0.85" />
            <circle cx={cx} cy={cy} r={r * 0.3} fill="#FFFFFF" />
          </g>
        ))}
        {/* Cold air swirl */}
        <path d="M100 430 C 130 450 170 455 200 450" stroke="#7DD3FC" strokeWidth="1.5" fill="none" strokeDasharray="4 6" opacity="0.5" />
        <path d="M200 450 C 230 455 270 450 300 430" stroke="#7DD3FC" strokeWidth="1.5" fill="none" strokeDasharray="4 6" opacity="0.5" />
      </g>
    );
  }

  if (aura.id === "aura_void") {
    return (
      <g className="auraPulse">
        {/* Orbiting void glyphs and ethereal amethyst motes */}
        {[[112, 360], [288, 350], [105, 270], [295, 230], [135, 170], [265, 160]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill="#B07FF5" opacity="0.8" />
            <circle cx={cx} cy={cy} r="2" fill="#2E1065" />
            <circle cx={cx} cy={cy} r="0.8" fill="#F3E8FF" />
          </g>
        ))}
        {/* Void orbit rings */}
        <ellipse cx="200" cy="420" rx="110" ry="16" stroke="#A855F7" strokeWidth="1.2" fill="none" strokeDasharray="8 8" opacity="0.6" />
        <ellipse cx="200" cy="280" rx="118" ry="22" stroke="#7E22CE" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.4" />
      </g>
    );
  }

  if (aura.id === "aura_radiant") {
    return (
      <g className="auraPulse">
        {/* Sacred starlight cross flares & golden solar motes */}
        {[[110, 360, 7], [290, 340, 8], [102, 260, 6], [298, 220, 7], [132, 170, 6], [268, 150, 6.5], [200, 80, 8]].map(([cx, cy, s], i) => (
          <g key={i}>
            <line x1={cx - s} y1={cy} x2={cx + s} y2={cy} stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            <circle cx={cx} cy={cy} r={1.8} fill="#FFFFFF" />
          </g>
        ))}
        {/* Heavenly halo arc above shoulders */}
        <ellipse cx="200" cy="100" rx="44" ry="10" stroke="#FDE047" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.75" />
      </g>
    );
  }

  return null;
}

const HAT_COMPONENTS = { hat_pointed: HatPointed, hat_hood: HatHood, hat_wide: HatWide, hat_crown: HatCrown, hat_circlet: HatCirclet };
const STAFF_COMPONENTS = { ashwood: StaffAshwood, frostbound: StaffFrostbound, verdant: StaffVerdant, voidglass: StaffVoidglass, sunfire: StaffSunfire };

function MageSprite({ mage, facing, hurt, casting, size = 1 }) {
  const robeSkin = ROBES.find(r => r.id === mage.robe);
  const p = robeSkin?.colors || ART[mage.affinity];
  const skinTone = SKIN_TONES.find(s => s.id === mage.skinTone) || SKIN_TONES[0];
  const hairColor = HAIR_COLORS.find(h => h.id === mage.hairColor) || HAIR_COLORS[0];
  const eyeColor = EYE_COLORS.find(e => e.id === mage.eyeColor) || EYE_COLORS[0];
  const face = FACES.find(f => f.id === mage.face) || FACES[0];
  const earrings = EARRINGS.find(e => e.id === mage.earrings) || EARRINGS[0];
  const noseRing = NOSE_RINGS.find(n => n.id === mage.noseRing) || NOSE_RINGS[0];
  const look = {
    skin: skinTone.skin, skinD: skinTone.skinD,
    hair: hairColor.hair, hairD: hairColor.hairD,
    eye: eyeColor.color, beardStyle: mage.beardStyle || "beard_long",
    hairStyle: mage.hairStyle || (mage.gender === "gender_female" ? "hair_long" : "hair_wavy"),
    gender: mage.gender || "gender_male",
    face, earrings, noseRing,
  };
  const aura = AURAS.find(a => a.id === mage.aura);
  const Hat = HAT_COMPONENTS[mage.hat];
  const Staff = mage.staffGear ? STAFF_COMPONENTS[mage.staffGear.id] : null;
  const Armor = mage.armor ? ARMOR_COMPONENTS[mage.armor.id] : null;
  const Cape = mage.cape ? CAPE_COMPONENTS[mage.cape.id] : null;
  const RobeTrim = ROBE_COMPONENTS[mage.robe];
  const Offhand = mage.offhand ? (OFFHAND_COMPONENTS[mage.offhand.id] || OffhandGeneric) : null;
  const w = 96 * size, h = 120 * size;

  return (
    <div className={hurt ? "shake" : casting ? "cast" : ""} style={{ position: "relative", width: w, height: h, flexShrink: 0 }}>
      {aura?.color && (
        <div className="auraPulse" style={{
          position: "absolute", inset: `${4 * size}px`, borderRadius: "50%",
          background: `radial-gradient(circle, ${aura.color}66 0%, ${aura.color}22 55%, transparent 75%)`,
        }} />
      )}
      <svg width={w} height={h} viewBox="0 0 400 500" style={{ position: "relative", transform: facing === "left" ? "scaleX(-1)" : "none", filter: casting ? "brightness(1.25)" : "none" }}>
        {/* Floor Ground Shadow - stays anchored to the ground plane */}
        <ellipse cx="200" cy="466" rx="68" ry="13" fill="#000000" className="groundShadow" />
        {Staff && <ellipse cx="317" cy="466" rx="15" ry="4.5" fill="#000000" className="groundShadow" opacity="0.35" />}
        {Offhand && <ellipse cx="94" cy="466" rx="16" ry="4.8" fill="#000000" className="groundShadow" opacity="0.3" />}

        {/* Floating Mage Group */}
        <g className={hurt || casting ? "" : "mageFloatGroup"}>
          <AuraVisual aura={aura} />
          {Cape && mage.cape?.color && <Cape color={mage.cape.color} dark={mage.cape.dark} />}
          <Base p={p} look={look} hasHat={!!Hat} affinity={mage.affinity} hatId={mage.hat} robeTrim={RobeTrim && <RobeTrim />} armor={Armor && <Armor />} gloves={mage.gloves} hasOffhand={!!Offhand} />
          {Staff && (
            <g className="staffFloat">
              {/* Telekinetic Levitation Seal beneath hovering staff */}
              <ellipse cx="317" cy="454" rx="20" ry="6" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
              <ellipse cx="317" cy="454" rx="12" ry="3.6" fill="none" stroke="#FEF08A" strokeWidth="0.9" opacity="0.6" />
              <circle cx="317" cy="454" r="2.2" fill="#F59E0B" opacity="0.85" />
              <circle className="holySparkle" cx="306" cy="448" r="1.4" fill="#FEF08A" opacity="0.8" />
              <circle className="holySparkle" style={{ animationDelay: "0.8s" }} cx="328" cy="446" r="1.4" fill="#FEF08A" opacity="0.8" />
              <Staff />
            </g>
          )}
          {Offhand && (
            <g className="offhandFloat">
              <Offhand look={look} offhand={mage.offhand} gloves={mage.gloves} affinity={mage.affinity} />
            </g>
          )}
          {Hat && <Hat p={p} />}
        </g>

        {/* Pet sits outside mageFloatGroup so ground pets stay grounded and floating pets hover independently */}
        <Pet pet={mage.pet} />
      </svg>
    </div>
  );
}

// ================= UI BITS =================
function Bar({ value, max, color, label }) {
  const pct = Math.max(0, (value / max) * 100);
  return (
    <div className="mb-1">
      <div className="flex justify-between text-xs font-mono" style={{ color: "#B7AE95" }}>
        <span>{label}</span><span>{Math.max(0, Math.round(value))}/{max}</span>
      </div>
      <div className="h-3 rounded-sm overflow-hidden border" style={{ background: "#0B0A16", borderColor: "#3A3356" }}>
        <div className="h-full rounded-sm" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}CC)`, transition: "width 0.5s ease", boxShadow: `0 0 8px ${color}66` }} />
      </div>
    </div>
  );
}

function ElementBadge({ el }) {
  const e = ELEMENTS[el];
  return <span className="text-xs font-mono px-1.5 py-0.5 rounded-sm border" style={{ color: e.color, borderColor: e.color + "66", background: e.color + "1A" }}>{e.icon} {e.name}</span>;
}

function StatusIcons({ mage }) {
  return (
    <span className="flex gap-1 text-xs font-mono">
      {mage.shield > 0 && <span title="Shield" style={{ color: "#5FC1E8" }}>🛡{mage.shield}</span>}
      {mage.status.burn > 0 && <span title="Burning" style={{ color: "#FF6B3D" }}>🔥{mage.status.burn}</span>}
      {mage.status.chill && <span title="Chilled: -30% next attack" style={{ color: "#5FC1E8" }}>❄</span>}
      {mage.relic?.revive && !mage.phoenixUsed && <span title="Phoenix Feather ready" style={{ color: "#E8B44F" }}>✧</span>}
    </span>
  );
}

function RarityCard({ item, selected, locked, onClick, subtitle }) {
  const r = RARITY[item.rarity];
  return (
    <button onClick={onClick} disabled={locked}
      className="rounded-md border p-2 text-left w-full"
      style={{
        borderColor: selected ? r.color : "#3A3356",
        background: selected ? r.color + "1C" : "#1C1833",
        boxShadow: selected ? r.glow : "none",
        opacity: locked ? 0.55 : 1,
      }}>
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm" style={{ color: "#F2EAD8" }}>{locked && "🔒 "}{item.name}</span>
        <span className="text-xs font-mono" style={{ color: r.color }}>{r.label}</span>
      </div>
      <div className="text-xs font-mono" style={{ color: "#B7AE95" }}>{locked ? "Win duels or trade to unlock" : subtitle || item.desc || ""}</div>
    </button>
  );
}

// ================= MAIN =================
export default function MageDuel() {
  const [saved] = useState(() => loadSave());
  const [phase, setPhase] = useState(saved ? "loadout" : "create");
  const [tab, setTab] = useState(null);
  const [mageName, setMageName] = useState(saved?.mageName ?? "");
  const [affinity, setAffinity] = useState(saved?.affinity ?? "fire");
  const [chosen, setChosen] = useState(saved?.chosen ?? ["fireball", "emberjab", "ward", "surge"]);
  const [staffId, setStaffId] = useState(saved?.staffId ?? "ashwood");
  const [relicId, setRelicId] = useState(saved?.relicId ?? "wardsigil");
  const [hatId, setHatId] = useState(saved?.hatId ?? "hat_pointed");
  const [auraId, setAuraId] = useState(saved?.auraId ?? "aura_ember");
  const [capeId, setCapeId] = useState(saved?.capeId ?? "cape_travel");
  const armorId = "armor_none"; // armor UI hidden for now, kept dormant for later
  const [petId, setPetId] = useState(saved?.petId ?? "pet_imp");
  const [robeId, setRobeId] = useState(saved?.robeId ?? "robe_midnight");
  const [skinToneId, setSkinToneId] = useState(saved?.skinToneId ?? "skin_fair");
  const [hairColorId, setHairColorId] = useState(saved?.hairColorId ?? "hair_white");
  const [hairStyleId, setHairStyleId] = useState(saved?.hairStyleId ?? (saved?.genderId === "gender_female" ? "hair_long" : "hair_wavy"));
  const [beardStyleId, setBeardStyleId] = useState(saved?.beardStyleId ?? "beard_long");
  const [eyeColorId, setEyeColorId] = useState(saved?.eyeColorId ?? "eye_dark");
  const [genderId, setGenderId] = useState(saved?.genderId ?? "gender_male");
  const [faceId, setFaceId] = useState(saved?.faceId ?? "face_round");
  const [earringId, setEarringId] = useState(saved?.earringId ?? "earring_none");
  const [noseRingId, setNoseRingId] = useState(saved?.noseRingId ?? "nosering_none");
  const [offhandId, setOffhandId] = useState(saved?.offhandId ?? "offhand_tome");
  const [glovesId, setGlovesId] = useState(saved?.glovesId ?? "gloves_arcane");
  const [createTab, setCreateTab] = useState("body");
  const [owned, setOwned] = useState(new Set(DEV_UNLOCK_ALL ? ALL_ITEMS.map(i => i.id) : (saved?.owned ?? START_OWNED)));

  useEffect(() => {
    const data = { mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, skinToneId, hairColorId, hairStyleId, beardStyleId, eyeColorId, genderId, faceId, earringId, noseRingId, offhandId, glovesId, owned: [...owned] };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }, [mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, skinToneId, hairColorId, hairStyleId, beardStyleId, eyeColorId, genderId, faceId, earringId, noseRingId, offhandId, glovesId, owned]);

  const [friends, setFriends] = useState(() => loadFriends());
  const [showFriends, setShowFriends] = useState(false);
  const [chatWith, setChatWith] = useState(null);
  const [chatLog, setChatLog] = useState([]);

  const [matchmaking, setMatchmaking] = useState(false);
  const [matchTimer, setMatchTimer] = useState(0);
  const [matchStatus, setMatchStatus] = useState("Scanning arcane leylines for duelists...");
  const matchIntervalRef = useRef(null);
  const matchTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (matchIntervalRef.current) clearInterval(matchIntervalRef.current);
      if (matchTimeoutRef.current) clearTimeout(matchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  }, [friends]);

  function isFriend(mage) {
    return mage && friends.some(f => f.name === mage.name);
  }
  function addFriend(mage) {
    if (!mage || isFriend(mage)) return;
    setFriends(f => [...f, mage]);
  }
  function removeFriend(name) {
    setFriends(f => f.filter(x => x.name !== name));
  }
  function openChat(mage) {
    setChatWith(mage);
    setChatLog([{ from: "them", text: pick(NPC_REPLIES.greet) }]);
  }
  function sendChat(category) {
    if (!chatWith) return;
    const reply = pick(NPC_REPLIES[category]);
    setChatLog(log => [...log, { from: "you", text: PLAYER_LINES[category] }, { from: "them", text: reply }]);
  }
  function duelFriend(mage) {
    const fresh = { ...mage, hp: mage.maxHp, mana: MAX_MANA, shield: mage.relic?.startShield || 0, cds: {}, status: { burn: 0, chill: false }, phoenixUsed: false };
    setEnemy(fresh);
    setShowFriends(false);
    setPhase("scout");
  }

  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const [hurtP, setHurtP] = useState(false);
  const [hurtE, setHurtE] = useState(false);
  const [castP, setCastP] = useState(false);
  const [castE, setCastE] = useState(false);
  const [floats, setFloats] = useState([]);
  const [projectiles, setProjectiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loot, setLoot] = useState(null);
  const [confirmSurrender, setConfirmSurrender] = useState(false);
  const logRef = useRef(null);
  const floatId = useRef(0);
  const projId = useRef(0);

  const stars = useMemo(() => Array.from({ length: 45 }, () => ({
    left: Math.random() * 100, top: Math.random() * 100,
    size: rand(1, 2.5), delay: rand(0, 4), dur: rand(2.5, 5),
  })), []);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);
  const addLog = (line) => setLog(l => [...l, line]);

  function addFloat(side, text, color, big) {
    const id = ++floatId.current;
    setFloats(f => [...f, { id, side, text, color, big, left: rand(20, 60) }]);
    setTimeout(() => setFloats(f => f.filter(x => x.id !== id)), 1000);
  }

  function fireProjectile(el, fromSide) {
    const id = ++projId.current;
    setProjectiles(pr => [...pr, { id, el, fromSide }]);
    setTimeout(() => setProjectiles(pr => pr.filter(x => x.id !== id)), 520);
  }

  function toggleSkill(id) {
    setChosen(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 4 ? [...c, id] : c);
  }

  function findOpponent() {
    setMatchmaking(true);
    setMatchTimer(0);
    setMatchStatus("Scanning arcane leylines for duelists...");
    if (matchIntervalRef.current) clearInterval(matchIntervalRef.current);
    if (matchTimeoutRef.current) clearTimeout(matchTimeoutRef.current);

    let elapsed = 0;
    matchIntervalRef.current = setInterval(() => {
      elapsed += 1;
      setMatchTimer(elapsed);
      if (elapsed === 1) setMatchStatus("Evaluating rating & power (Bot Queue)...");
      else if (elapsed === 2) setMatchStatus("Duelist located! Synchronizing arena...");
    }, 1000);

    matchTimeoutRef.current = setTimeout(() => {
      if (matchIntervalRef.current) clearInterval(matchIntervalRef.current);
      setEnemy(makeEnemy());
      setMatchStatus("Match Found! Teleporting to faceoff...");
      setTimeout(() => {
        setMatchmaking(false);
        setPhase("scout");
      }, 450);
    }, 2100);
  }

  function cancelMatchmaking() {
    if (matchIntervalRef.current) clearInterval(matchIntervalRef.current);
    if (matchTimeoutRef.current) clearTimeout(matchTimeoutRef.current);
    setMatchmaking(false);
  }

  function confirmDuel() {
    const p = makeMage(mageName.trim() || "You", affinity, chosen.map(id => SKILLS.find(s => s.id === id)), staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId,
      { skinTone: skinToneId, hairColor: hairColorId, hairStyle: hairStyleId, beardStyle: beardStyleId, eyeColor: eyeColorId, gender: genderId, face: faceId, earrings: earringId, noseRing: noseRingId }, offhandId, glovesId);
    if (p.relic?.startShield) p.shield = p.relic.startShield;
    setPlayer(p); setResult(null); setLoot(null); setConfirmSurrender(false);
    setLog([
      `${enemy.name} challenges you!`,
      `Foe: ${ELEMENTS[enemy.affinity].name} affinity · ${enemy.staffGear.name}${enemy.relic ? " · " + enemy.relic.name : ""}`,
    ]);
    setPhase("battle"); setBusy(false);
  }

  function applySkill(skill, attacker, defender, side) {
    const lines = [];
    const a = { ...attacker, status: { ...attacker.status }, cds: { ...attacker.cds } };
    const d = { ...defender, status: { ...defender.status }, cds: { ...defender.cds } };
    a.mana -= skill.mana;
    if (skill.cd) a.cds[skill.id] = skill.cd + 1;
    lines.push(`${side === "p" ? "You cast" : a.name + " casts"} ${skill.name}!`);

    if (skill.restore) { a.mana = Math.min(MAX_MANA, a.mana + skill.restore); lines.push(`+${skill.restore} mana.`); }
    if (skill.shield) { a.shield += skill.shield; lines.push(`A ward absorbs the next ${skill.shield} damage.`); }

    let didDamage = false;
    if (skill.dmg) {
      const { dmg, crit, chilled } = computeDamage(skill, a, d);
      if (chilled) { a.status.chill = false; lines.push("The chill dampens the spell..."); }
      let remaining = dmg;
      if (d.shield > 0) {
        const absorbed = Math.min(d.shield, remaining);
        d.shield -= absorbed; remaining -= absorbed;
        lines.push(`The ward absorbs ${absorbed}!`);
      }
      d.hp -= remaining;
      didDamage = true;
      lines.push(`${crit ? "CRITICAL HIT! " : ""}${remaining} damage.`);
      addFloat(side === "p" ? "e" : "p", `-${remaining}`, crit ? "#E8B44F" : "#F2EAD8", crit);

      const heavy = skill.dmg >= 20;
      if (heavy && skill.el === "fire" && chance(25 + (a.staffGear?.burnChance || 0))) {
        d.status.burn = 3; lines.push(`${side === "p" ? "The foe is" : "You are"} Burning! (4 dmg × 3 turns)`);
      }
      if (heavy && skill.el === "ice" && chance(30)) {
        d.status.chill = true; lines.push("Chilled! Next attack weakened 30%.");
      }
      if (heavy && skill.el === "nature" && chance(30)) {
        d.mana = Math.max(0, d.mana - 8); lines.push("Entangled! Foe loses 8 mana.");
      }
      if (skill.heal) {
        const h = Math.round(skill.heal * (1 + (a.staffGear?.healBonus || 0)));
        a.hp = Math.min(a.maxHp, a.hp + h);
        lines.push(`Drained ${h} HP.`);
        addFloat(side, `+${h}`, "#72C063", false);
      }
      if (d.hp <= 0 && d.relic?.revive && !d.phoenixUsed) {
        d.hp = 20; d.phoenixUsed = true;
        lines.push(`${side === "p" ? "The foe's" : "Your"} Phoenix Feather blazes — risen at 20 HP!`);
      }
    }
    return { a, d, lines, didDamage };
  }

  function tickTurnEnd(m) {
    const n = { ...m, status: { ...m.status }, cds: {} };
    for (const k in m.cds) if (m.cds[k] - 1 > 0) n.cds[k] = m.cds[k] - 1;
    if (n.status.burn > 0) { n.hp -= 4; n.status.burn -= 1; }
    n.mana = Math.min(MAX_MANA, n.mana + REGEN + (n.staffGear?.regen || 0) + (n.relic?.regen || 0));
    return n;
  }

  function aiChoose(e, p) {
    const usable = e.skills.filter(s => e.mana >= s.mana && !e.cds[s.id]);
    const heal = usable.find(s => s.heal);
    if (e.hp < 30 && heal) return heal;
    const surge = usable.find(s => s.restore);
    const attacks = usable.filter(s => s.dmg > 0);
    if (attacks.length === 0) return surge || FOCUS;
    let best = attacks[0], bestVal = -1;
    for (const s of attacks) {
      let v = s.dmg * (s.el === e.affinity ? AFFINITY_BONUS : 1);
      if (e.staffGear?.el === s.el && e.staffGear.elBonus) v *= 1 + e.staffGear.elBonus;
      if (v > bestVal) { bestVal = v; best = s; }
    }
    const ward = usable.find(s => s.shield);
    if (ward && e.shield === 0 && e.hp < 55 && Math.random() < 0.35) return ward;
    if (surge && e.mana < 20 && Math.random() < 0.5) return surge;
    return best;
  }

  function rollLoot() {
    const locked = LOOTABLE.filter(id => !owned.has(id));
    if (locked.length === 0) return null;
    const roll = Math.random() * 100;
    const tier = roll < 10 ? "legendary" : roll < 30 ? "epic" : roll < 62 ? "rare" : "common";
    const order = ["legendary", "epic", "rare", "common"];
    const start = order.indexOf(tier);
    for (let i = start; i < order.length; i++) {
      const pool = locked.filter(id => findItem(id).rarity === order[i]);
      if (pool.length) return pick(pool);
    }
    return pick(locked);
  }

  function finishBattle(win) {
    setResult(win ? "win" : "lose");
    if (win) {
      const drop = rollLoot();
      if (drop) { setLoot(findItem(drop)); setOwned(o => new Set([...o, drop])); }
    }
    setTimeout(() => setPhase("result"), 1200);
  }

  function surrender() {
    if (phase !== "battle" || busy) return;
    setBusy(true);
    addLog(`${player.name} surrenders the duel.`);
    finishBattle(false);
  }

  function playerAction(skill) {
    if (busy || phase !== "battle") return;
    setBusy(true);
    let p = player, e = enemy;

    setCastP(true); setTimeout(() => setCastP(false), 600);
    if (skill.dmg > 0) fireProjectile(skill.el, "p");
    const r1 = applySkill(skill, p, e, "p");
    p = r1.a; e = r1.d;
    let delay = 0;
    r1.lines.forEach(line => setTimeout(() => addLog(line), delay += 420));
    if (r1.didDamage) setTimeout(() => { setHurtE(true); setTimeout(() => setHurtE(false), 500); }, delay);
    setTimeout(() => { setPlayer({ ...p }); setEnemy({ ...e }); }, delay);

    setTimeout(() => {
      if (e.hp <= 0) { addLog(`${e.name} collapses. Victory!`); setEnemy({ ...e }); finishBattle(true); return; }

      const eSkill = aiChoose(e, p);
      setCastE(true); setTimeout(() => setCastE(false), 600);
      if (eSkill.dmg > 0) fireProjectile(eSkill.el, "e");
      const r2 = applySkill(eSkill, e, p, "e");
      e = r2.a; p = r2.d;
      let d2 = 0;
      r2.lines.forEach(line => setTimeout(() => addLog(line), d2 += 420));
      if (r2.didDamage) setTimeout(() => { setHurtP(true); setTimeout(() => setHurtP(false), 500); }, d2);

      setTimeout(() => {
        p = tickTurnEnd(p); e = tickTurnEnd(e);
        setPlayer({ ...p }); setEnemy({ ...e });
        if (p.hp <= 0) { addLog("You fall... Defeat."); finishBattle(false); }
        else if (e.hp <= 0) { addLog(`${e.name} succumbs to their wounds. Victory!`); finishBattle(true); }
        else setBusy(false);
      }, d2 + 500);
    }, delay + 700);
  }

  // ================= STYLES / BG =================
  const styles = (
    <style>{`
      @keyframes shakeAnim {
        0% { transform: translate3d(0, 0, 0) rotate(0deg); filter: none; }
        15% { transform: translate3d(-14px, -6px, 0) rotate(-6deg) scale(0.93); filter: saturate(2.4) brightness(1.35) drop-shadow(0 0 16px #EF4444); }
        35% { transform: translate3d(12px, 3px, 0) rotate(4deg) scale(1.04); filter: drop-shadow(0 0 12px #EF444488); }
        55% { transform: translate3d(-7px, -2px, 0) rotate(-2.5deg) scale(0.98); filter: drop-shadow(0 0 6px #EF444444); }
        75% { transform: translate3d(4px, 1px, 0) rotate(1.2deg); filter: none; }
        100% { transform: translate3d(0, 0, 0) rotate(0deg); filter: none; }
      }
      .shake { animation: shakeAnim 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97); will-change: transform, filter; }

      @keyframes castAnim {
        0% { transform: translate3d(0, 0, 0) scale(1); filter: brightness(1); }
        22% { transform: translate3d(0, 6px, 0) scale(0.96) rotate(-3deg); filter: brightness(1.2) drop-shadow(0 0 14px #9333EA88); }
        48% { transform: translate3d(0, -18px, 0) scale(1.12) rotate(4deg); filter: brightness(1.75) drop-shadow(0 0 24px #F59E0B) drop-shadow(0 0 36px #FFFFFF); }
        72% { transform: translate3d(0, -5px, 0) scale(1.03) rotate(-1deg); filter: brightness(1.25) drop-shadow(0 0 10px #F59E0B66); }
        100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); filter: brightness(1); }
      }
      .cast { animation: castAnim 0.65s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform, filter; }

      @keyframes mageBodyFloat {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(0, -8px, 0) rotate(0.4deg); }
      }
      .mageFloatGroup { animation: mageBodyFloat 3.8s ease-in-out infinite; transform-origin: 200px 350px; will-change: transform; }

      @keyframes staffLevitate {
        0%, 100% { transform: translate3d(0, -8px, 0) rotate(0.8deg); }
        50% { transform: translate3d(0, -22px, 0) rotate(-1.2deg); }
      }
      .staffFloat { animation: staffLevitate 3.4s ease-in-out infinite; transform-origin: 317px 300px; transform-box: view-box; will-change: transform; }

      @keyframes offhandLevitate {
        0%, 100% { transform: translate3d(0, -6px, 0) rotate(-1.5deg); }
        50% { transform: translate3d(0, -20px, 0) rotate(1.2deg); }
      }
      .offhandFloat { animation: offhandLevitate 3.0s ease-in-out infinite; transform-origin: 94px 315px; transform-box: view-box; will-change: transform; }

      @keyframes groundShadowPulse {
        0%, 100% { transform: scale(1); opacity: 0.38; }
        50% { transform: scale(0.91); opacity: 0.22; }
      }
      .groundShadow { transform-box: fill-box; transform-origin: center; animation: groundShadowPulse 3.8s ease-in-out infinite; will-change: transform, opacity; }

      @keyframes idleAnim {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1, 1); }
        25% { transform: translate3d(0, -3px, 0) rotate(-0.8deg) scale(1.005, 1.01); }
        50% { transform: translate3d(0, -7px, 0) rotate(0deg) scale(1.01, 1.015); }
        75% { transform: translate3d(0, -3.5px, 0) rotate(0.8deg) scale(1.005, 1.008); }
      }
      .idle { animation: idleAnim 3.6s ease-in-out infinite; will-change: transform; backface-visibility: hidden; }

      @keyframes auraAnim {
        0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
        50% { opacity: 0.5; transform: scale(1.14) rotate(8deg); }
      }
      .auraPulse { animation: auraAnim 2.8s ease-in-out infinite; will-change: transform, opacity; }

      @keyframes petHoverSway {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(0, -9px, 0) rotate(2.5deg); }
      }
      .petHover { animation: petHoverSway 2.9s ease-in-out infinite; will-change: transform; }

      @keyframes petShadowPulse {
        0%, 100% { transform: scale(1); opacity: 0.28; }
        50% { transform: scale(0.82); opacity: 0.16; }
      }
      .petShadow { transform-origin: center; animation: petShadowPulse 2.9s ease-in-out infinite; will-change: transform, opacity; }

      @keyframes foxIdle {
        0%, 100% { transform: scale(1, 1); }
        50% { transform: scale(1.025, 0.975) translateY(-1px); }
      }
      .petGround { animation: foxIdle 3.4s ease-in-out infinite; transform-origin: 0 20px; will-change: transform; }

      @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.8} }

      @keyframes floatUp {
        0% { opacity: 0; transform: translate3d(0, 10px, 0) scale(0.3); }
        20% { opacity: 1; transform: translate3d(0, -14px, 0) scale(1.35); }
        45% { transform: translate3d(0, -26px, 0) scale(1.05); }
        75% { opacity: 0.9; transform: translate3d(0, -42px, 0) scale(1); }
        100% { opacity: 0; transform: translate3d(0, -62px, 0) scale(0.85); }
      }
      .dmgFloat { animation: floatUp 0.95s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; will-change: transform, opacity; }

      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      .lootShine { background: linear-gradient(110deg, transparent 35%, #FFFFFF22 50%, transparent 65%); background-size: 200% 100%; animation: shimmer 2.2s linear infinite; }

      @keyframes projectileUp {
        0% { top: 76%; opacity: 0; transform: translate3d(-50%, -50%, 0) scale(0.4, 0.4); }
        14% { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1, 1.5); }
        75% { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1.2, 1.7); }
        92% { top: 22%; opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1.8, 1.8); }
        100% { top: 20%; opacity: 0; transform: translate3d(-50%, -50%, 0) scale(2.8, 2.8); }
      }
      @keyframes projectileDown {
        0% { top: 22%; opacity: 0; transform: translate3d(-50%, -50%, 0) scale(0.4, 0.4); }
        14% { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1, 1.5); }
        75% { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1.2, 1.7); }
        92% { top: 76%; opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1.8, 1.8); }
        100% { top: 78%; opacity: 0; transform: translate3d(-50%, -50%, 0) scale(2.8, 2.8); }
      }
      .projectile { position: absolute; left: 50%; width: 24px; height: 24px; border-radius: 50%; z-index: 6; pointer-events: none; will-change: top, transform, opacity; }
      .projectile-up { animation: projectileUp 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .projectile-down { animation: projectileDown 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

      @keyframes angelWingLeft {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-3.5deg) translateY(-2px) scale(1.015); }
      }
      @keyframes angelWingRight {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(3.5deg) translateY(-2px) scale(1.015); }
      }
      .angelWingL { animation: angelWingLeft 3.6s ease-in-out infinite; transform-origin: 152px 230px; transform-box: view-box; will-change: transform; }
      .angelWingR { animation: angelWingRight 3.6s ease-in-out infinite; transform-origin: 248px 230px; transform-box: view-box; will-change: transform; }

      @keyframes demonWingLeft {
        0%, 100% { transform: rotate(0deg); }
        42% { transform: rotate(-4.2deg) translateY(-2px) scale(1.02, 0.98); }
        75% { transform: rotate(1deg) translateY(1px); }
      }
      @keyframes demonWingRight {
        0%, 100% { transform: rotate(0deg); }
        42% { transform: rotate(4.2deg) translateY(-2px) scale(1.02, 0.98); }
        75% { transform: rotate(-1deg) translateY(1px); }
      }
      .demonWingL { animation: demonWingLeft 4.2s ease-in-out infinite; transform-origin: 152px 235px; transform-box: view-box; will-change: transform; }
      .demonWingR { animation: demonWingRight 4.2s ease-in-out infinite; transform-origin: 248px 235px; transform-box: view-box; will-change: transform; }

      @keyframes phoenixWingLeft {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-3.8deg) translateY(-3px) scale(1.025); }
      }
      @keyframes phoenixWingRight {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(3.8deg) translateY(-3px) scale(1.025); }
      }
      .phoenixWingL { animation: phoenixWingLeft 3.2s ease-in-out infinite; transform-origin: 152px 230px; transform-box: view-box; will-change: transform; }
      .phoenixWingR { animation: phoenixWingRight 3.2s ease-in-out infinite; transform-origin: 248px 230px; transform-box: view-box; will-change: transform; }

      @keyframes faeWingLeft {
        0%, 100% { transform: rotate(0deg) scaleX(1); }
        30% { transform: rotate(-3deg) scaleX(0.97); }
        60% { transform: rotate(-5deg) scaleX(1.03); }
      }
      @keyframes faeWingRight {
        0%, 100% { transform: rotate(0deg) scaleX(1); }
        30% { transform: rotate(3deg) scaleX(0.97); }
        60% { transform: rotate(5deg) scaleX(1.03); }
      }
      .faeWingL { animation: faeWingLeft 2.4s ease-in-out infinite; transform-origin: 150px 228px; transform-box: view-box; will-change: transform; }
      .faeWingR { animation: faeWingRight 2.4s ease-in-out infinite; transform-origin: 250px 228px; transform-box: view-box; will-change: transform; }

      @keyframes holySparkle {
        0%, 100% { opacity: 0.25; transform: scale(0.7); }
        50% { opacity: 1; transform: scale(1.25); }
      }
      .holySparkle { animation: holySparkle 2.4s ease-in-out infinite; transform-origin: center; }

      @keyframes emberRise {
        0% { opacity: 0; transform: translateY(6px) scale(0.6); }
        40% { opacity: 0.95; transform: translateY(-10px) scale(1.15); }
        100% { opacity: 0; transform: translateY(-24px) scale(0.4); }
      }
      .wingEmber { animation: emberRise 2.2s ease-out infinite; }

      @keyframes matchSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .matchSpin { animation: matchSpin 6s linear infinite; transform-origin: center; }

      @keyframes matchPulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      .matchPulse { animation: matchPulse 1.8s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) { .shake,.cast,.idle,.mageFloatGroup,.groundShadow,.petShadow,.auraPulse,.dmgFloat,.lootShine,.petHover,.petGround,.projectile-up,.projectile-down,.angelWingL,.angelWingR,.demonWingL,.demonWingR,.phoenixWingL,.phoenixWingR,.faeWingL,.faeWingR,.holySparkle,.wingEmber,.staffFloat,.offhandFloat,.matchSpin,.matchPulse { animation: none; } }
    `}</style>
  );

  const bg = (
    <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% -10%, #241E45 0%, #100E1F 55%, #0A0814 100%)", overflow: "hidden", zIndex: 0 }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          borderRadius: "50%", background: "#EFE7D2",
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  );

  // ================= CREATE MAGE =================
  if (phase === "create") {
    const previewMage = {
      affinity, hat: "hat_pointed", aura: "aura_ember", robe: "robe_classic",
      staffGear: STAFFS.find(s => s.id === "ashwood"), cape: CAPES.find(c => c.id === "cape_travel"), armor: null, pet: PETS.find(p => p.id === "pet_imp"),
      skinTone: skinToneId, hairColor: hairColorId, hairStyle: hairStyleId, beardStyle: beardStyleId, eyeColor: eyeColorId, gender: genderId,
      face: faceId, earrings: earringId, noseRing: noseRingId,
      status: {},
    };
    const trimmedName = mageName.trim();
    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex items-center justify-center p-2 sm:p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 w-full max-w-3xl max-h-[96dvh] flex flex-col md:flex-row gap-3 md:gap-5 bg-[#16122ACC] border border-[#3A3356] rounded-xl p-3 sm:p-5 backdrop-blur-md shadow-2xl overflow-hidden">
          
          {/* Left Column: Studio Preview, Name, Affinity, Launch */}
          <div className="md:w-5/12 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#3A3356] pb-3 md:pb-0 md:pr-4">
            <div className="w-full text-center">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-center" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>Create Your Mage</h1>
              <p className="text-center text-[11px] font-mono mb-1" style={{ color: "#B7AE95" }}>Affinity spells deal +25% damage</p>
            </div>

            <div className="flex justify-center my-1">
              <MageSprite mage={previewMage} facing="right" size={1.4} />
            </div>

            <div className="w-full">
              <p className="font-mono text-xs mb-1" style={{ color: "#E8B44F" }}>Mage Name</p>
              <input
                value={mageName}
                onChange={(e) => setMageName(e.target.value.slice(0, 18))}
                placeholder="Enter mage name"
                className="w-full rounded-md border px-2.5 py-1.5 font-mono text-xs md:text-sm mb-2 outline-none"
                style={{ borderColor: "#3A3356", background: "#1C1833", color: "#F2EAD8" }}
              />

              <p className="font-mono text-xs mb-1" style={{ color: "#E8B44F" }}>Affinity</p>
              <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                {Object.entries(ELEMENTS).map(([key, e]) => (
                  <button key={key} onClick={() => setAffinity(key)} className="rounded-md border py-1 px-1 text-center font-mono text-xs transition-colors"
                    style={{ borderColor: affinity === key ? e.color : "#3A3356", background: affinity === key ? e.color + "26" : "#1C1833", color: e.color, boxShadow: affinity === key ? `0 0 8px ${e.color}44` : "none" }}>
                    <div className="leading-none">{e.icon}</div>
                    <div className="text-[10px] leading-tight">{e.name}</div>
                  </button>
                ))}
              </div>

              <button onClick={() => setPhase("loadout")} disabled={!trimmedName}
                className="w-full rounded-md border py-2.5 font-serif text-base md:text-lg transition-all"
                style={{ borderColor: "#E8B44F", background: trimmedName ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: trimmedName ? "#100E1F" : "#3A3356", boxShadow: trimmedName ? "0 0 16px #E8B44F55" : "none" }}>
                Begin Your Journey
              </button>
            </div>
          </div>

          {/* Right Column: Customization with sub-tabs */}
          <div className="md:w-7/12 flex flex-col min-h-0 flex-1">
            {/* Sub-tabs header */}
            <div className="grid grid-cols-3 gap-1.5 mb-2 pb-2 border-b border-[#3A3356]">
              {[
                ["body", "Body & Skin", "👤"],
                ["hair", "Hair & Beard", "✂"],
                ["details", "Face & Piercing", "✨"],
              ].map(([t, label, icon]) => (
                <button key={t} onClick={() => setCreateTab(t)}
                  className="rounded-md border py-1 px-1 font-mono text-xs flex items-center justify-center gap-1 transition-all"
                  style={{ borderColor: createTab === t ? "#E8B44F" : "#3A3356", background: createTab === t ? "#E8B44F22" : "#1C1833", color: createTab === t ? "#E8B44F" : "#B7AE95" }}>
                  <span>{icon}</span><span className="truncate">{label}</span>
                </button>
              ))}
            </div>

            {/* Customizer tab content */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              {createTab === "body" && (
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Gender</p>
                    <div className="grid grid-cols-2 gap-2">
                      {GENDERS.map(g => (
                        <button key={g.id} onClick={() => setGenderId(g.id)} className="rounded-md border py-1.5 font-mono text-xs transition-colors"
                          style={{ borderColor: genderId === g.id ? "#E8B44F" : "#3A3356", background: genderId === g.id ? "#E8B44F1F" : "#1C1833", color: genderId === g.id ? "#E8B44F" : "#B7AE95" }}>
                          {g.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Skin Tone</p>
                    <div className="flex gap-2 flex-wrap">
                      {SKIN_TONES.map(s => (
                        <button key={s.id} onClick={() => setSkinToneId(s.id)} title={s.name}
                          className="rounded-full transition-transform"
                          style={{ width: 32, height: 32, background: s.skin, border: skinToneId === s.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: skinToneId === s.id ? "0 0 8px #E8B44F66" : "none", transform: skinToneId === s.id ? "scale(1.1)" : "none" }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Face Shape</p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {FACES.map(f => (
                        <button key={f.id} onClick={() => setFaceId(f.id)} className="rounded-md border py-1.5 font-mono text-xs transition-colors"
                          style={{ borderColor: faceId === f.id ? "#E8B44F" : "#3A3356", background: faceId === f.id ? "#E8B44F1F" : "#1C1833", color: faceId === f.id ? "#E8B44F" : "#B7AE95" }}>
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Gloves & Hands</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {GLOVES.map(gl => (
                        <button key={gl.id} onClick={() => setGlovesId(gl.id)} className="rounded-md border py-1.5 px-2 font-mono text-xs text-left transition-colors truncate"
                          style={{ borderColor: glovesId === gl.id ? "#E8B44F" : "#3A3356", background: glovesId === gl.id ? "#E8B44F1F" : "#1C1833", color: glovesId === gl.id ? "#E8B44F" : "#B7AE95" }}>
                          {gl.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {createTab === "hair" && (
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Hair Color</p>
                    <div className="flex gap-2 flex-wrap">
                      {HAIR_COLORS.map(h => (
                        <button key={h.id} onClick={() => setHairColorId(h.id)} title={h.name}
                          className="rounded-full transition-transform"
                          style={{ width: 32, height: 32, background: h.hair, border: hairColorId === h.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: hairColorId === h.id ? "0 0 8px #E8B44F66" : "none", transform: hairColorId === h.id ? "scale(1.1)" : "none" }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Hairstyle</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {HAIR_STYLES.map(hs => (
                        <button key={hs.id} onClick={() => setHairStyleId(hs.id)} className="rounded-md border py-1.5 font-mono text-xs truncate transition-colors"
                          style={{ borderColor: hairStyleId === hs.id ? "#E8B44F" : "#3A3356", background: hairStyleId === hs.id ? "#E8B44F1F" : "#1C1833", color: hairStyleId === hs.id ? "#E8B44F" : "#B7AE95" }}>
                          {hs.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Beard Style</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {BEARD_STYLES.map(b => (
                        <button key={b.id} onClick={() => setBeardStyleId(b.id)} className="rounded-md border py-1.5 font-mono text-xs truncate transition-colors"
                          style={{ borderColor: beardStyleId === b.id ? "#E8B44F" : "#3A3356", background: beardStyleId === b.id ? "#E8B44F1F" : "#1C1833", color: beardStyleId === b.id ? "#E8B44F" : "#B7AE95" }}>
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {createTab === "details" && (
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Eye Color</p>
                    <div className="flex gap-2 flex-wrap">
                      {EYE_COLORS.map(e => (
                        <button key={e.id} onClick={() => setEyeColorId(e.id)} title={e.name}
                          className="rounded-full transition-transform"
                          style={{ width: 32, height: 32, background: e.color, border: eyeColorId === e.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: eyeColorId === e.id ? "0 0 8px #E8B44F66" : "none", transform: eyeColorId === e.id ? "scale(1.1)" : "none" }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Earrings</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {EARRINGS.map(e => (
                        <button key={e.id} onClick={() => setEarringId(e.id)} className="rounded-md border py-1.5 font-mono text-xs truncate transition-colors"
                          style={{ borderColor: earringId === e.id ? "#E8B44F" : "#3A3356", background: earringId === e.id ? "#E8B44F1F" : "#1C1833", color: earringId === e.id ? "#E8B44F" : "#B7AE95" }}>
                          {e.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs mb-1.5" style={{ color: "#E8B44F" }}>Nose Piercing</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {NOSE_RINGS.map(n => (
                        <button key={n.id} onClick={() => setNoseRingId(n.id)} className="rounded-md border py-1.5 font-mono text-xs truncate transition-colors"
                          style={{ borderColor: noseRingId === n.id ? "#E8B44F" : "#3A3356", background: noseRingId === n.id ? "#E8B44F1F" : "#1C1833", color: noseRingId === n.id ? "#E8B44F" : "#B7AE95" }}>
                          {n.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ================= SHARED: character editor + gear modal =================
  function buildPreviewMage() {
    return {
      affinity, hat: hatId, aura: auraId, robe: robeId,
      staffGear: STAFFS.find(s => s.id === staffId),
      armor: ARMORS.find(a => a.id === armorId && a.id !== "armor_none") || null,
      cape: CAPES.find(c => c.id === capeId),
      pet: PETS.find(p => p.id === petId),
      offhand: OFFHANDS.find(o => o.id === offhandId && o.id !== "offhand_none") || null,
      gloves: glovesId,
      skinTone: skinToneId, hairColor: hairColorId, hairStyle: hairStyleId, beardStyle: beardStyleId, eyeColor: eyeColorId, gender: genderId,
      face: faceId, earrings: earringId, noseRing: noseRingId,
      status: {},
    };
  }

  function renderCharacterPreview(extra) {
    const previewMage = buildPreviewMage();
    const relic = RELICS.find(r => r.id === relicId);
    const hat = findItem(hatId), aura = findItem(auraId), robeSkin = findItem(robeId), cape = findItem(capeId), pet = findItem(petId), offhand = findItem(offhandId), gloves = findItem(glovesId);
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full">
        <div className="flex-1 min-h-0 flex items-center justify-center cursor-pointer group relative py-1" onClick={() => setTab("appearance")} title="Click to customize appearance">
          <MageSprite mage={previewMage} facing="right" size={2.2} />
          <div className="absolute bottom-0 bg-[#141126CC] px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-[#3A3356] text-[#B7AE95] group-hover:border-[#E8B44F] group-hover:text-[#E8B44F] transition-all flex items-center gap-1 shadow-md">
            <span>👤</span><span>Customize Look</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 items-center flex-wrap my-1">
          <ElementBadge el={affinity} />
          <button onClick={() => setGenderId(genderId === "gender_female" ? "gender_male" : "gender_female")} title="Click to switch gender" className="text-xs font-mono px-2 py-0.5 rounded-sm border hover:border-[#E8B44F] transition-colors flex items-center gap-1" style={{ borderColor: "#3A3356", background: "#1C1833", color: "#E8B44F" }}>
            <span>{genderId === "gender_female" ? "♀" : "♂"}</span>
            <span>{genderId === "gender_female" ? "Female" : "Male"}</span>
          </button>
          {relic && relic.id !== "none" && <span className="text-xs font-mono px-1.5 py-0.5 rounded-sm border" style={{ color: RARITY[relic.rarity].color, borderColor: RARITY[relic.rarity].color + "66", background: RARITY[relic.rarity].color + "1A" }}>{relic.name}</span>}
        </div>
        <div className="text-center text-xs font-mono" style={{ color: "#B7AE95" }}>
          {previewMage.staffGear?.name} · {offhand?.name}
        </div>
        <div className="text-center text-xs font-mono mb-2" style={{ color: "#B7AE95" }}>
          {hat?.name} · {robeSkin?.name} · {gloves?.name} · {cape?.name} · {aura?.name} · {pet?.name}
        </div>

        {extra}

        <div className="grid grid-cols-4 gap-1.5 w-full">
          {[
            ["skills", "Skills", "⚔"],
            ["gear", "Gear", "🪄"],
            ["style", "Style", "✨"],
            ["appearance", "Appearance", "👤"],
          ].map(([k, label, icon]) => (
            <button key={k} onClick={() => setTab(k)} className="rounded-md border py-2 px-1 font-serif text-center transition-colors hover:border-[#E8B44F]"
              style={{ borderColor: "#3A3356", background: "#1C1833", color: "#B7AE95" }}>
              <div className="text-base leading-none mb-0.5">{icon}</div>
              <div className="text-xs font-serif leading-tight">{label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function renderGearModal() {
    if (!tab) return null;
    const panelTitle = { skills: "Skills", gear: "Gear", style: "Style", appearance: "Appearance" }[tab];
    const previewMage = buildPreviewMage();
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "#000000B3" }} onClick={() => setTab(null)}>
        <div className="w-full max-w-md rounded-t-lg border-t" style={{ borderColor: "#3A3356", background: "#1A1630", maxHeight: "85vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex items-center gap-2 p-3 border-b" style={{ background: "#1A1630", borderColor: "#3A3356" }}>
            <div style={{ marginTop: -8, marginBottom: -8 }}>
              <MageSprite mage={previewMage} facing="right" size={1.15} />
            </div>
            <span className="font-serif text-lg flex-1" style={{ color: "#E8B44F" }}>{panelTitle}</span>
            <button onClick={() => setTab(null)} className="rounded-md border px-2.5 py-1 font-mono text-sm" style={{ borderColor: "#3A3356", color: "#B7AE95" }}>✕</button>
          </div>
          <div className="p-4 pt-3 pb-6">

          {tab === "skills" && (
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Affinity <span style={{ color: "#B7AE95" }}>(+25% matching dmg)</span></p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {Object.entries(ELEMENTS).map(([key, e]) => (
                  <button key={key} onClick={() => setAffinity(key)} className="rounded-md border p-2 text-sm font-mono"
                    style={{ borderColor: affinity === key ? e.color : "#3A3356", background: affinity === key ? e.color + "26" : "#1C1833", color: e.color, boxShadow: affinity === key ? `0 0 10px ${e.color}44` : "none" }}>
                    {e.icon}<br />{e.name}
                  </button>
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Skills <span style={{ color: "#B7AE95" }}>({chosen.length}/4)</span></p>
              <div className="grid grid-cols-1 gap-2">
                {SKILLS.map(s => {
                  const sel = chosen.includes(s.id);
                  const e = ELEMENTS[s.el];
                  return (
                    <button key={s.id} onClick={() => toggleSkill(s.id)} className="rounded-md border p-2 text-left flex items-center justify-between gap-2"
                      style={{ borderColor: sel ? "#E8B44F" : "#3A3356", background: sel ? "#E8B44F14" : "#1C1833" }}>
                      <div>
                        <div className="font-mono text-sm">{s.name} <span style={{ color: e.color }}>{e.icon}</span></div>
                        <div className="text-xs font-mono" style={{ color: "#B7AE95" }}>{s.desc} · {s.mana} mana</div>
                      </div>
                      <span className="font-mono text-lg" style={{ color: sel ? "#E8B44F" : "#3A3356" }}>{sel ? "◉" : "○"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "gear" && (
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Staff <span style={{ color: "#B7AE95" }}>(equip 1)</span></p>
              <div className="grid gap-2 mb-4">
                {STAFFS.map(s => (
                  <RarityCard key={s.id} item={s} selected={staffId === s.id} locked={!owned.has(s.id)} onClick={() => owned.has(s.id) && setStaffId(s.id)} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Relic <span style={{ color: "#B7AE95" }}>(equip 1)</span></p>
              <div className="grid gap-2 mb-4">
                {RELICS.map(r => (
                  <RarityCard key={r.id} item={r} selected={relicId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRelicId(r.id)} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Off-hand <span style={{ color: "#B7AE95" }}>(equip 1)</span></p>
              <div className="grid gap-2">
                {OFFHANDS.map(o => (
                  <RarityCard key={o.id} item={o} selected={offhandId === o.id} locked={!owned.has(o.id)} onClick={() => owned.has(o.id) && setOffhandId(o.id)} />
                ))}
              </div>
            </div>
          )}

          {tab === "style" && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b" style={{ borderColor: "#3A3356" }}>
                <span className="font-mono text-xs" style={{ color: "#E8B44F" }}>Gender / Body:</span>
                <div className="flex gap-2">
                  {GENDERS.map(g => (
                    <button key={g.id} onClick={() => setGenderId(g.id)} className="rounded px-3 py-1 font-mono text-xs border transition-colors"
                      style={{ borderColor: genderId === g.id ? "#E8B44F" : "#3A3356", background: genderId === g.id ? "#E8B44F26" : "#1C1833", color: genderId === g.id ? "#E8B44F" : "#B7AE95" }}>
                      {g.id === "gender_female" ? "♀ Female" : "♂ Male"}
                    </button>
                  ))}
                </div>
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Hat <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {HATS.map(h1 => (
                  <RarityCard key={h1.id} item={h1} selected={hatId === h1.id} locked={!owned.has(h1.id)} onClick={() => owned.has(h1.id) && setHatId(h1.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Robe Skin <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid gap-2 mb-4">
                {ROBES.map(r => (
                  <RarityCard key={r.id} item={r} selected={robeId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRobeId(r.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Cape & Wings <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid gap-2 mb-4">
                {CAPES.map(c => (
                  <RarityCard key={c.id} item={c} selected={capeId === c.id} locked={!owned.has(c.id)} onClick={() => owned.has(c.id) && setCapeId(c.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Aura <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {AURAS.map(a => (
                  <RarityCard key={a.id} item={a} selected={auraId === a.id} locked={!owned.has(a.id)} onClick={() => owned.has(a.id) && setAuraId(a.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Gloves & Gauntlets <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {GLOVES.map(gl => (
                  <RarityCard key={gl.id} item={gl} selected={glovesId === gl.id} locked={!owned.has(gl.id)} onClick={() => owned.has(gl.id) && setGlovesId(gl.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Companion <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2">
                {PETS.map(pt => (
                  <RarityCard key={pt.id} item={pt} selected={petId === pt.id} locked={!owned.has(pt.id)} onClick={() => owned.has(pt.id) && setPetId(pt.id)} subtitle=" " />
                ))}
              </div>
              <p className="text-xs font-mono mt-3" style={{ color: "#5A5478" }}>Locked items drop from victories. In the full game, they're tradeable with other players.</p>
            </div>
          )}

          {tab === "appearance" && (
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Gender</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {GENDERS.map(g => (
                  <button key={g.id} onClick={() => setGenderId(g.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: genderId === g.id ? "#E8B44F" : "#3A3356", background: genderId === g.id ? "#E8B44F1F" : "#1C1833", color: genderId === g.id ? "#E8B44F" : "#B7AE95" }}>
                    {g.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Skin Tone</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {SKIN_TONES.map(s => (
                  <button key={s.id} onClick={() => setSkinToneId(s.id)} title={s.name}
                    className="rounded-full transition-transform"
                    style={{ width: 34, height: 34, background: s.skin, border: skinToneId === s.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: skinToneId === s.id ? "0 0 10px #E8B44F88" : "none", transform: skinToneId === s.id ? "scale(1.1)" : "none" }} />
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Hair Color</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {HAIR_COLORS.map(h => (
                  <button key={h.id} onClick={() => setHairColorId(h.id)} title={h.name}
                    className="rounded-full transition-transform"
                    style={{ width: 34, height: 34, background: h.hair, border: hairColorId === h.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: hairColorId === h.id ? "0 0 10px #E8B44F88" : "none", transform: hairColorId === h.id ? "scale(1.1)" : "none" }} />
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Hairstyle</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {HAIR_STYLES.map(hs => (
                  <button key={hs.id} onClick={() => setHairStyleId(hs.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: hairStyleId === hs.id ? "#E8B44F" : "#3A3356", background: hairStyleId === hs.id ? "#E8B44F1F" : "#1C1833", color: hairStyleId === hs.id ? "#E8B44F" : "#B7AE95" }}>
                    {hs.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Beard</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {BEARD_STYLES.map(bs => (
                  <button key={bs.id} onClick={() => setBeardStyleId(bs.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: beardStyleId === bs.id ? "#E8B44F" : "#3A3356", background: beardStyleId === bs.id ? "#E8B44F1F" : "#1C1833", color: beardStyleId === bs.id ? "#E8B44F" : "#B7AE95" }}>
                    {bs.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Eye Color</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {EYE_COLORS.map(e => (
                  <button key={e.id} onClick={() => setEyeColorId(e.id)} title={e.name}
                    className="rounded-full transition-transform"
                    style={{ width: 34, height: 34, background: e.color, border: eyeColorId === e.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: eyeColorId === e.id ? "0 0 10px #E8B44F88" : "none", transform: eyeColorId === e.id ? "scale(1.1)" : "none" }} />
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Face Shape</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {FACES.map(f => (
                  <button key={f.id} onClick={() => setFaceId(f.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: faceId === f.id ? "#E8B44F" : "#3A3356", background: faceId === f.id ? "#E8B44F1F" : "#1C1833", color: faceId === f.id ? "#E8B44F" : "#B7AE95" }}>
                    {f.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Earrings</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {EARRINGS.map(e => (
                  <button key={e.id} onClick={() => setEarringId(e.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: earringId === e.id ? "#E8B44F" : "#3A3356", background: earringId === e.id ? "#E8B44F1F" : "#1C1833", color: earringId === e.id ? "#E8B44F" : "#B7AE95" }}>
                    {e.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Nose Piercing</p>
              <div className="grid grid-cols-3 gap-2">
                {NOSE_RINGS.map(n => (
                  <button key={n.id} onClick={() => setNoseRingId(n.id)} className="rounded-md border py-2 font-mono text-xs"
                    style={{ borderColor: noseRingId === n.id ? "#E8B44F" : "#3A3356", background: noseRingId === n.id ? "#E8B44F1F" : "#1C1833", color: noseRingId === n.id ? "#E8B44F" : "#B7AE95" }}>
                    {n.name}
                  </button>
                ))}
              </div>

              <p className="font-mono text-sm mb-2 mt-4" style={{ color: "#E8B44F" }}>Gloves & Hands</p>
              <div className="grid grid-cols-2 gap-2">
                {GLOVES.map(gl => (
                  <button key={gl.id} onClick={() => setGlovesId(gl.id)} className="rounded-md border py-2 px-2 font-mono text-xs text-left transition-colors truncate"
                    style={{ borderColor: glovesId === gl.id ? "#E8B44F" : "#3A3356", background: glovesId === gl.id ? "#E8B44F1F" : "#1C1833", color: glovesId === gl.id ? "#E8B44F" : "#B7AE95" }}>
                    {gl.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }

  function renderFriendsModal() {
    if (!showFriends) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "#000000B3" }} onClick={() => setShowFriends(false)}>
        <div className="w-full max-w-md rounded-t-lg border-t p-4 pb-6" style={{ borderColor: "#3A3356", background: "#1A1630", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-serif text-lg" style={{ color: "#E8B44F" }}>Friends</span>
            <button onClick={() => setShowFriends(false)} className="rounded-md border px-2.5 py-1 font-mono text-sm" style={{ borderColor: "#3A3356", color: "#B7AE95" }}>✕</button>
          </div>
          {friends.length === 0 && (
            <p className="text-xs font-mono" style={{ color: "#5A5478" }}>No friends yet. Add one from the Scouting Report before a duel.</p>
          )}
          <div className="grid gap-2">
            {friends.map(f => (
              <div key={f.name} className="rounded-md border p-2" style={{ borderColor: "#3A3356", background: "#1C1833" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-sm">{f.name}</span>
                  <ElementBadge el={f.affinity} />
                </div>
                <div className="text-xs font-mono mb-2" style={{ color: "#5A5478" }}>{f.staffGear?.name}</div>
                <div className="flex gap-2">
                  <button onClick={() => openChat(f)} className="flex-1 rounded-md border py-1.5 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#14112A" }}>
                    💬 Chat
                  </button>
                  <button onClick={() => duelFriend(f)} className="flex-1 rounded-md border py-1.5 font-mono text-xs" style={{ borderColor: "#E8B44F", color: "#E8B44F", background: "#14112A" }}>
                    ⚔ Duel
                  </button>
                  <button onClick={() => removeFriend(f.name)} className="rounded-md border px-2 py-1.5 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#5A5478", background: "#14112A" }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderChatModal() {
    if (!chatWith) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "#000000B3" }} onClick={() => setChatWith(null)}>
        <div className="w-full max-w-md rounded-t-lg border-t p-4 pb-6" style={{ borderColor: "#3A3356", background: "#1A1630" }} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-serif text-lg" style={{ color: "#E8B44F" }}>{chatWith.name}</span>
            <button onClick={() => setChatWith(null)} className="rounded-md border px-2.5 py-1 font-mono text-sm" style={{ borderColor: "#3A3356", color: "#B7AE95" }}>✕</button>
          </div>
          <div className="rounded-md border p-3 mb-3 font-mono text-sm overflow-y-auto" style={{ borderColor: "#3A3356", background: "#0B0A16DD", height: "160px" }}>
            {chatLog.map((m, i) => (
              <div key={i} className="mb-1" style={{ color: m.from === "you" ? "#E8B44F" : "#B7AE95" }}>
                <span className="opacity-70">{m.from === "you" ? "You: " : `${chatWith.name}: `}</span>{m.text}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button onClick={() => sendChat("greet")} className="rounded-md border py-2 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>Say hello</button>
            <button onClick={() => sendChat("compliment")} className="rounded-md border py-2 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>Compliment</button>
            <button onClick={() => sendChat("taunt")} className="rounded-md border py-2 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>Taunt</button>
            <button onClick={() => sendChat("farewell")} className="rounded-md border py-2 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>Say goodbye</button>
          </div>
          {!isFriend(chatWith) && (
            <button onClick={() => addFriend(chatWith)} className="w-full rounded-md border py-2 font-mono text-xs" style={{ borderColor: "#72C063", color: "#72C063", background: "#14112A" }}>
              + Add Friend
            </button>
          )}
        </div>
      </div>
    );
  }

  function renderMatchmakingModal() {
    if (!matchmaking) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10, 8, 20, 0.88)", backdropFilter: "blur(6px)" }}>
        <div className="relative w-full max-w-sm rounded-xl border p-6 text-center flex flex-col items-center shadow-2xl"
          style={{ borderColor: "#E8B44F66", background: "linear-gradient(180deg, #1D1836, #120F24)", boxShadow: "0 0 35px #E8B44F33" }}>
          
          {/* Animated Arcane Matchmaking Radar / Sigil */}
          <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full matchSpin">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#E8B44F" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#B07FF5" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              <polygon points="50,10 85,75 15,75" fill="none" stroke="#E8B44F" strokeWidth="1" opacity="0.4" />
              <polygon points="50,90 15,25 85,25" fill="none" stroke="#5FC1E8" strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center matchPulse">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, #E8B44F44 0%, transparent 70%)" }}>
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono border mb-2"
            style={{ borderColor: "#E8B44F44", background: "#E8B44F1A", color: "#E8B44F" }}>
            <span>🤖</span><span>Automated Matchmaking (Bot Queue)</span>
          </div>

          <h2 className="font-serif text-xl mb-1 text-[#F2EAD8]">
            Searching for Opponent...
          </h2>

          <p className="font-mono text-xs mb-3 text-[#B7AE95] min-h-[18px]">
            {matchStatus}
          </p>

          <div className="font-mono text-xs mb-4 px-3 py-1 rounded border" style={{ borderColor: "#3A3356", background: "#141126", color: "#E8B44F" }}>
            Time Elapsed: 0:0{matchTimer}
          </div>

          <button onClick={cancelMatchmaking} className="w-full rounded-md border py-2 font-serif text-sm transition-colors hover:border-[#EF4444] hover:text-[#EF4444]"
            style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#141126" }}>
            Cancel Search
          </button>
        </div>
      </div>
    );
  }

  // ================= LOADOUT =================
  if (phase === "loadout") {
    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-between p-3 sm:p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 w-full max-w-md h-full flex flex-col justify-between overflow-hidden">
          <div className="w-full flex items-center justify-between py-0.5">
            <div>
              <h1 className="font-serif text-2xl" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>{mageName.trim() || "Mage Duel"}</h1>
              <p className="text-xs font-mono" style={{ color: "#B7AE95" }}>Affinity spells deal +25% damage</p>
            </div>
            <button onClick={() => setShowFriends(true)} className="rounded-md border px-2 py-1 font-mono text-xs transition-colors hover:border-[#E8B44F]" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
              👥 {friends.length}
            </button>
          </div>

          {renderCharacterPreview(null)}

          <div className="w-full pt-1.5 pb-0.5">
            <button onClick={findOpponent} disabled={chosen.length !== 4}
              className="w-full rounded-md border py-2.5 font-serif text-lg md:text-xl transition-all"
              style={{ borderColor: "#E8B44F", background: chosen.length === 4 ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: chosen.length === 4 ? "#100E1F" : "#3A3356", boxShadow: chosen.length === 4 ? "0 0 20px #E8B44F55" : "none" }}>
              Find an Opponent
            </button>
          </div>
        </div>

        {renderGearModal()}
        {renderFriendsModal()}
        {renderChatModal()}
        {renderMatchmakingModal()}
      </div>
    );
  }

  // ================= SCOUT / MATCHUP SCREEN =================
  if (phase === "scout") {
    const previewMage = buildPreviewMage();
    const relic = RELICS.find(r => r.id === relicId);
    const foeSkills = enemy.skills;
    const bios = NPC_BIOS[enemy.affinity] || [];
    const bioHash = [...enemy.name].reduce((a, c) => a + c.charCodeAt(0), 0);
    const bio = bios.length ? bios[bioHash % bios.length] : "";
    const friended = isFriend(enemy);

    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-between p-2.5 sm:p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 w-full max-w-xl h-full flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="text-center py-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border mb-0.5"
              style={{ borderColor: "#72C06366", background: "#72C0631A", color: "#72C063" }}>
              <span>✓</span><span>Opponent Found · Bot Matchmaking</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>
              Duel Faceoff
            </h1>
          </div>

          {/* Center Matchup: Face-to-Face Mages */}
          <div className="flex-1 min-h-0 flex flex-col justify-center gap-2 my-1 overflow-hidden">
            
            {/* The Duelists Cards Side-by-Side */}
            <div className="grid grid-cols-2 gap-2 w-full items-stretch">
              
              {/* Player Card */}
              <div className="rounded-lg border p-2 sm:p-2.5 flex flex-col items-center justify-between text-center relative overflow-hidden"
                style={{ borderColor: "#3A3356", background: "linear-gradient(180deg, #1C1833, #141126)" }}>
                <div className="w-full flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#F2EAD8] truncate">{mageName.trim() || "You"}</span>
                  <ElementBadge el={affinity} />
                </div>
                <div className="my-0.5 flex justify-center items-center">
                  <MageSprite mage={previewMage} facing="right" size={1.15} />
                </div>
                <div className="w-full">
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#B7AE95] truncate">
                    {previewMage.staffGear?.name}
                  </div>
                  {relic && relic.id !== "none" && (
                    <div className="text-[9px] sm:text-[10px] font-mono truncate" style={{ color: RARITY[relic.rarity].color }}>
                      ✦ {relic.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Opponent Card */}
              <div className="rounded-lg border p-2 sm:p-2.5 flex flex-col items-center justify-between text-center relative overflow-hidden"
                style={{ borderColor: "#FF6B3D66", background: "linear-gradient(180deg, #241624, #161226)" }}>
                <div className="w-full flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-serif text-xs sm:text-sm font-bold truncate" style={{ color: "#FF6B3D" }}>{enemy.name}</span>
                  <ElementBadge el={enemy.affinity} />
                </div>
                <div className="my-0.5 flex justify-center items-center">
                  <MageSprite mage={enemy} facing="left" size={1.15} />
                </div>
                <div className="w-full">
                  <div className="text-[10px] sm:text-[11px] font-mono truncate" style={{ color: RARITY[enemy.staffGear.rarity].color }}>
                    {enemy.staffGear.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#8E87A5] italic truncate">
                    "{bio}"
                  </div>
                </div>
              </div>

            </div>

            {/* Tactical Intel: Opponent's 4 Spells Preview */}
            <div className="w-full rounded-md border p-1.5 sm:p-2" style={{ borderColor: "#3A3356", background: "#141126CC" }}>
              <div className="flex items-center justify-between mb-1 text-[10px] sm:text-[11px] font-mono">
                <span style={{ color: "#E8B44F" }}>⚔️ Opponent's Prepared Spells</span>
                <div className="flex gap-1.5">
                  <button onClick={() => openChat(enemy)} className="rounded border px-2 py-0.5 text-[10px] font-mono hover:border-[#E8B44F]" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
                    💬 Chat
                  </button>
                  <button onClick={() => addFriend(enemy)} disabled={friended} className="rounded border px-2 py-0.5 text-[10px] font-mono" style={{ borderColor: friended ? "#72C063" : "#3A3356", color: friended ? "#72C063" : "#B7AE95", background: "#1C1833" }}>
                    {friended ? "✓ Friend" : "+ Friend"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {foeSkills.map(s => {
                  const e = ELEMENTS[s.el];
                  return (
                    <div key={s.id} className="rounded border px-1.5 py-0.5 flex flex-col justify-between" style={{ borderColor: "#3A3356", background: "#1C1833" }}>
                      <div className="text-[10px] sm:text-[11px] font-mono flex items-center justify-between">
                        <span className="truncate">{s.name}</span>
                        <span style={{ color: e.color }}>{e.icon}</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-mono" style={{ color: "#8E87A5" }}>
                        {s.dmg ? `${s.dmg} dmg` : s.shield ? `Shield ${s.shield}` : s.restore ? `+${s.restore} mana` : s.heal ? `Heal ${s.heal}` : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="w-full flex gap-2 pt-1 pb-0.5">
            <button onClick={() => setPhase("loadout")}
              className="rounded-md border px-3 py-2.5 font-serif text-xs sm:text-sm transition-colors hover:border-[#E8B44F]"
              style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
              ← Loadout
            </button>
            <button onClick={findOpponent}
              className="flex-1 rounded-md border py-2.5 font-serif text-xs sm:text-sm transition-colors hover:border-[#E8B44F]"
              style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
              🔄 Re-Match (Bot)
            </button>
            <button onClick={confirmDuel}
              className="flex-2 rounded-md border py-2.5 px-4 sm:px-6 font-serif text-base sm:text-lg transition-all"
              style={{ borderColor: "#E8B44F", background: "linear-gradient(180deg, #E8B44F, #C9902E)", color: "#100E1F", boxShadow: "0 0 20px #E8B44F55" }}>
              Enter Arena ⚔️
            </button>
          </div>
        </div>

        {renderMatchmakingModal()}
        {renderChatModal()}
      </div>
    );
  }

  // ================= RESULT =================
  if (phase === "result") {
    return (
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex items-center justify-center p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 text-center max-w-sm w-full">
          <h1 className="font-serif text-4xl mb-2" style={{ color: result === "win" ? "#E8B44F" : "#FF6B3D", textShadow: result === "win" ? "0 0 24px #E8B44F55" : "none" }}>
            {result === "win" ? "Victory" : "Defeat"}
          </h1>
          <p className="font-mono text-sm mb-4" style={{ color: "#B7AE95" }}>
            {result === "win" ? `${enemy.name} yields.` : `${enemy.name} stands over you. Adjust your build and return.`}
          </p>

          {loot && (
            <div className="rounded-md border p-3.5 mb-4 relative overflow-hidden lootShine"
              style={{ borderColor: RARITY[loot.rarity].color, background: "#1C1833", boxShadow: RARITY[loot.rarity].glow }}>
              <div className="text-xs font-mono mb-1" style={{ color: RARITY[loot.rarity].color }}>✦ {RARITY[loot.rarity].label} drop ✦</div>
              <div className="font-serif text-2xl" style={{ color: "#F2EAD8" }}>{loot.name}</div>
              {loot.desc && <div className="text-xs font-mono mt-1" style={{ color: "#B7AE95" }}>{loot.desc}</div>}
              <div className="text-xs font-mono mt-2" style={{ color: "#5A5478" }}>Unlocked in your collection · tradeable in the full game</div>
            </div>
          )}
          {result === "win" && !loot && <p className="text-xs font-mono mb-4" style={{ color: "#5A5478" }}>Your collection is complete, Archmage.</p>}

          <div className="flex gap-2">
            <button onClick={findOpponent} className="flex-1 rounded-md border py-2.5 font-serif transition-colors hover:border-[#E8B44F]" style={{ borderColor: "#E8B44F", color: "#E8B44F", background: "#1C1833" }}>
              Next Foe
            </button>
            <button onClick={() => setPhase("loadout")} className="flex-1 rounded-md border py-2.5 font-serif transition-colors hover:border-[#E8B44F]" style={{ borderColor: "#3A3356", color: "#F2EAD8", background: "#1C1833" }}>
              Loadout
            </button>
          </div>
        </div>
        {renderMatchmakingModal()}
      </div>
    );
  }

  // ================= BATTLE =================
  const menuSkills = [...player.skills, FOCUS];
  const panel = { borderColor: "#3A3356", background: "linear-gradient(180deg, #221D3E, #1A1630)" };
  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-between p-2 sm:p-3 md:p-4" style={{ color: "#F2EAD8" }}>
      {styles}{bg}
      <div className="relative z-10 w-full max-w-4xl h-full flex flex-col justify-between overflow-hidden">
        
        {/* Arena Combatants Area (Side-by-Side on md+, Compact Stack on mobile) */}
        <div className="relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {/* Enemy Card */}
            <div className="rounded-md border p-2 sm:p-2.5 flex gap-2 sm:gap-3 items-center relative order-1 md:order-2" style={panel}>
              {floats.filter(f => f.side === "e").map(f => (
                <span key={f.id} className="dmgFloat font-mono absolute" style={{ left: `${f.left}%`, top: 6, color: f.color, fontSize: f.big ? 24 : 17, fontWeight: 700, textShadow: "0 1px 3px #000", zIndex: 5 }}>{f.text}</span>
              ))}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="font-serif text-sm md:text-base truncate">{enemy.name}</span>
                  <ElementBadge el={enemy.affinity} />
                  <StatusIcons mage={enemy} />
                  <button onClick={() => openChat(enemy)} title="Chat" className="rounded-sm border px-1.5 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#14112A" }}>💬</button>
                  <button onClick={() => addFriend(enemy)} disabled={isFriend(enemy)} title={isFriend(enemy) ? "Already a friend" : "Add friend"} className="rounded-sm border px-1.5 font-mono text-xs" style={{ borderColor: isFriend(enemy) ? "#72C063" : "#3A3356", color: isFriend(enemy) ? "#72C063" : "#B7AE95", background: "#14112A" }}>{isFriend(enemy) ? "✓" : "+👤"}</button>
                </div>
                <div className="text-[11px] font-mono mb-1 truncate" style={{ color: RARITY[enemy.staffGear.rarity].color }}>{enemy.staffGear.name}{enemy.relic ? ` · ${enemy.relic.name}` : ""}{enemy.offhand ? ` · ${enemy.offhand.name}` : ""}</div>
                <Bar value={enemy.hp} max={enemy.maxHp} color="#72C063" label="HP" />
                <Bar value={enemy.mana} max={MAX_MANA} color="#5FC1E8" label="Mana" />
              </div>
              <MageSprite mage={enemy} facing="left" hurt={hurtE} casting={castE} size={0.92} />
            </div>

            {/* Player Card */}
            <div className="rounded-md border p-2 sm:p-2.5 flex gap-2 sm:gap-3 items-center relative order-2 md:order-1" style={panel}>
              {floats.filter(f => f.side === "p").map(f => (
                <span key={f.id} className="dmgFloat font-mono absolute" style={{ right: `${f.left}%`, top: 6, color: f.color, fontSize: f.big ? 24 : 17, fontWeight: 700, textShadow: "0 1px 3px #000", zIndex: 5 }}>{f.text}</span>
              ))}
              <MageSprite mage={player} facing="right" hurt={hurtP} casting={castP} size={0.92} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="font-serif text-sm md:text-base truncate" style={{ color: "#E8B44F" }}>{player.name}</span>
                  <ElementBadge el={player.affinity} />
                  <StatusIcons mage={player} />
                </div>
                <div className="text-[11px] font-mono mb-1 truncate" style={{ color: player.staffGear ? RARITY[player.staffGear.rarity].color : "#5A5478" }}>{player.staffGear?.name || "No staff"}{player.relic ? ` · ${player.relic.name}` : ""}{player.offhand ? ` · ${player.offhand.name}` : ""}</div>
                <Bar value={player.hp} max={player.maxHp} color="#72C063" label="HP" />
                <Bar value={player.mana} max={MAX_MANA} color="#5FC1E8" label="Mana" />
              </div>
            </div>
          </div>

          {/* Projectile FX layer */}
          {projectiles.map(pr => {
            const c = ELEMENTS[pr.el].color;
            const grad = pr.el === "fire"
              ? "radial-gradient(circle, #FFFBEB 0%, #F59E0B 35%, #EF4444 70%, transparent 100%)"
              : pr.el === "ice"
              ? "radial-gradient(circle, #F0F9FF 0%, #38BDF8 35%, #0284C7 70%, transparent 100%)"
              : pr.el === "nature"
              ? "radial-gradient(circle, #F0FDF4 0%, #4ADE80 35%, #16A34A 70%, transparent 100%)"
              : "radial-gradient(circle, #FAF5FF 0%, #C084FC 35%, #7C3AED 70%, transparent 100%)";
            return (
              <span key={pr.id} className={`projectile ${pr.fromSide === "p" ? "projectile-up" : "projectile-down"}`}
                style={{ background: grad, boxShadow: `0 0 20px 6px ${c}DD, 0 0 36px 12px ${c}66` }} />
            );
          })}
        </div>

        {/* Duel Control Area: Desktop Split (Log left, Skills right) / Mobile Stack */}
        <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-12 md:gap-3 my-1.5 md:my-2">
          {/* Combat Log */}
          <div ref={logRef} className="rounded-md border p-2 font-mono text-xs flex-1 min-h-[56px] max-h-[84px] md:max-h-none md:h-full md:col-span-5 overflow-y-auto mb-1.5 md:mb-0"
            style={{ borderColor: "#E8B44F", background: "#0B0A16DD" }}>
            {log.map((l, i) => <div key={i} className={i === log.length - 1 ? "" : "opacity-60"}>▸ {l}</div>)}
          </div>

          {/* Skills Grid & Battle Actions */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {menuSkills.map(s => {
                const e = ELEMENTS[s.el];
                const onCd = player.cds[s.id] > 0;
                const noMana = player.mana < s.mana;
                const disabled = busy || onCd || noMana;
                return (
                  <button key={s.id} onClick={() => playerAction(s)} disabled={disabled}
                    className="rounded-md border p-1.5 md:p-2 text-left font-mono text-xs transition-all hover:brightness-110"
                    style={{ borderColor: disabled ? "#3A3356" : e.color, background: disabled ? "#14112A" : "#1C1833", color: disabled ? "#5A5478" : "#F2EAD8", opacity: busy ? 0.7 : 1 }}>
                    <div className="flex justify-between items-center">
                      <span className="font-serif md:font-mono text-xs md:text-sm truncate">{s.name}</span>
                      <span style={{ color: disabled ? "#5A5478" : e.color }}>{e.icon}</span>
                    </div>
                    <div className="text-[10px] md:text-xs truncate" style={{ color: "#B7AE95" }}>
                      {onCd ? `Cooldown ${player.cds[s.id]}` : noMana && s.mana > 0 ? "Not enough mana" :
                        s.dmg ? `${s.dmg} dmg · ${s.mana} mana` :
                        s.shield ? `Shield ${s.shield} · ${s.mana} mana` :
                        s.restore ? `+${s.restore} mana` : ""}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer row with mana tip and surrender button */}
            <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-[#3A335644] text-[11px] font-mono">
              <span style={{ color: "#5A5478" }} className="truncate">+{REGEN} mana/turn (+gear) · Burn 🔥 · Chill ❄ · Entangle</span>
              {confirmSurrender ? (
                <div className="flex gap-1.5 items-center flex-shrink-0 ml-2">
                  <span style={{ color: "#B7AE95" }}>Forfeit?</span>
                  <button onClick={surrender} disabled={busy} className="rounded-md border px-2 py-0.5 text-xs transition-colors" style={{ borderColor: "#FF6B3D", color: "#FF6B3D", background: "#1C1833" }}>
                    Surrender
                  </button>
                  <button onClick={() => setConfirmSurrender(false)} className="rounded-md border px-2 py-0.5 text-xs transition-colors" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmSurrender(true)} disabled={busy} className="underline transition-colors hover:text-[#FF6B3D] flex-shrink-0 ml-2" style={{ color: "#5A5478" }}>
                  Surrender
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
      {renderChatModal()}
    </div>
  );
}
