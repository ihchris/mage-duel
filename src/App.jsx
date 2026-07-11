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
  { id: "hair_white",  name: "White",  hair: "#F4F1EA", hairD: "#D9D2C2" },
  { id: "hair_gray",   name: "Gray",   hair: "#B9B4A8", hairD: "#96917F" },
  { id: "hair_brown",  name: "Brown",  hair: "#6B4A2F", hairD: "#4E3520" },
  { id: "hair_black",  name: "Black",  hair: "#2B2622", hairD: "#1A1714" },
  { id: "hair_ginger", name: "Ginger", hair: "#B5602E", hairD: "#8C441E" },
];
const BEARD_STYLES = [
  { id: "beard_long",    name: "Long Beard" },
  { id: "beard_short",   name: "Short Beard" },
  { id: "beard_stubble", name: "Stubble" },
  { id: "beard_none",    name: "Clean Shaven" },
];
const EYE_COLORS = [
  { id: "eye_dark",  name: "Dark",  color: "#2B2430" },
  { id: "eye_blue",  name: "Blue",  color: "#3D6B8A" },
  { id: "eye_green", name: "Green", color: "#4A7A4A" },
  { id: "eye_amber", name: "Amber", color: "#A8712E" },
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
  { id: "hat_pointed", name: "Pointed Hat",   rarity: "common" },
  { id: "hat_hood",    name: "Mystic Hood",   rarity: "rare" },
  { id: "hat_wide",    name: "Starfall Brim", rarity: "epic" },
  { id: "hat_crown",   name: "Archon Crown",  rarity: "legendary" },
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
  { id: "wings_angel", name: "Angel Wings",       rarity: "legendary", color: "#F5F0E6", dark: "#D9CFC0" },
  { id: "wings_demon", name: "Demon Wings",       rarity: "legendary", color: "#4A1F1F", dark: "#240D0D" },
];
const ROBES = [
  { id: "robe_classic",  name: "Classic Robe",  rarity: "common",    colors: null, desc: "—" },
  { id: "robe_midnight", name: "Midnight Robe", rarity: "rare",      colors: { robe: "#2B2447", dark: "#1C1833", light: "#4A4488" } },
  { id: "robe_ivory",    name: "Ivory Robe",    rarity: "rare",      colors: { robe: "#EDE6D6", dark: "#C9BFA8", light: "#FFFBF0" } },
  { id: "robe_crimson",  name: "Crimson Robe",  rarity: "epic",      colors: { robe: "#8B1E3F", dark: "#5C1329", light: "#C44368" } },
  { id: "robe_gilded",   name: "Gilded Robe",   rarity: "legendary", colors: { robe: "#3A2E1A", dark: "#241A0D", light: "#E8B44F" } },
];
const OFFHANDS = [
  { id: "offhand_none",      name: "Empty Hand",      rarity: "common",    color: null, desc: "—" },
  { id: "offhand_tome",      name: "Apprentice Tome", rarity: "common",    color: "#8B5A33", crit: 3, desc: "+3% crit chance" },
  { id: "offhand_grimoire",  name: "Arcane Grimoire", rarity: "rare",      color: "#5F3F94", allDmg: 0.06, desc: "+6% all damage" },
  { id: "offhand_codex",     name: "Codex of Embers", rarity: "epic",      color: "#B03D24", allDmg: 0.08, crit: 5, desc: "+8% all damage · +5% crit" },
  { id: "offhand_forbidden", name: "Forbidden Tome",  rarity: "legendary", color: "#241C3D", allDmg: 0.12, crit: 8, desc: "+12% all damage · +8% crit" },
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
  { id: "pet_imp",    name: "Ember Imp",    rarity: "rare",      kind: "imp",    color: "#FF6B3D" },
  { id: "pet_sprite", name: "Frost Sprite", rarity: "rare",      kind: "sprite", color: "#5FC1E8" },
  { id: "pet_fox",    name: "Leaf Fox",     rarity: "epic",      kind: "fox",    color: "#72C063" },
  { id: "pet_wisp",   name: "Star Wisp",    rarity: "legendary", kind: "wisp",   color: "#E8B44F" },
];

const START_OWNED = ["ashwood", "frostbound", "manapearl", "wardsigil", "none", "hat_pointed", "hat_hood", "aura_none", "aura_ember", "cape_none", "cape_travel", "armor_none", "armor_padded", "pet_none", "pet_imp", "robe_classic", "robe_midnight", "wings_none", "offhand_none", "offhand_tome"];
const LOOTABLE = ["verdant", "voidglass", "sunfire", "foxcharm", "phoenix", "hat_wide", "hat_crown", "aura_frost", "aura_void", "aura_radiant", "cape_shadow", "cape_star", "cape_phoenix", "wings_angel", "wings_demon", "armor_chain", "armor_void", "armor_dragon", "pet_sprite", "pet_fox", "pet_wisp", "robe_ivory", "robe_crimson", "robe_gilded", "offhand_grimoire", "offhand_codex", "offhand_forbidden"];
const ALL_ITEMS = [...STAFFS, ...RELICS, ...HATS, ...AURAS, ...CAPES, ...ARMORS, ...PETS, ...ROBES, ...OFFHANDS];
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

function makeMage(name, affinity, skills, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, look, offhandId) {
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
    skinTone: look?.skinTone || "skin_fair", hairColor: look?.hairColor || "hair_white",
    beardStyle: look?.beardStyle || "beard_long", eyeColor: look?.eyeColor || "eye_dark",
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
    { skinTone: pick(SKIN_TONES).id, hairColor: pick(HAIR_COLORS).id, beardStyle: pick(BEARD_STYLES).id, eyeColor: pick(EYE_COLORS).id },
    Math.random() < 0.5 ? pick(OFFHANDS.filter(o => o.id !== "offhand_none")).id : "offhand_none");
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
const DEFAULT_LOOK = { skin: SKIN, skinD: SKIN_D, hair: BEARD, hairD: BEARD_D, eye: "#2B2430", beardStyle: "beard_long" };

function Beard({ style, hair, hairD }) {
  if (style === "beard_none") return null;
  if (style === "beard_stubble") {
    return <path d="M160 195 C 158 212 168 224 200 228 C 232 224 242 212 240 195 C 228 204 216 208 200 208 C 184 208 172 204 160 195 Z" fill={hair} opacity="0.4" />;
  }
  if (style === "beard_short") {
    return (
      <>
        <path d="M155 190 C 152 220 165 240 200 246 C 235 240 248 220 245 190 C 232 202 218 208 200 208 C 182 208 168 202 155 190 Z" fill={hair} />
        <path d="M200 246 C 222 240 236 226 240 210 C 236 230 222 240 200 240 Z" fill={hairD} />
      </>
    );
  }
  return (
    <>
      <path d="M150 184 C 145 234 158 268 200 279 C 242 268 255 234 250 184 C 236 200 220 207 200 207 C 180 207 164 200 150 184 Z" fill={hair} />
      <path d="M200 279 C 228 270 244 246 249 214 C 246 250 230 268 200 272 Z" fill={hairD} />
    </>
  );
}

function Base({ p, look = DEFAULT_LOOK }) {
  const { skin, skinD, hair, hairD, eye } = look;
  const beardStyle = look.beardStyle || "beard_long";
  return (
    <g>
      <ellipse cx="200" cy="468" rx="96" ry="13" fill="#000" opacity="0.25" />
      <ellipse cx="168" cy="456" rx="21" ry="11" fill="#3A2C22" />
      <ellipse cx="232" cy="456" rx="21" ry="11" fill="#3A2C22" />
      <path d="M200 212 C 152 222 130 258 119 330 C 109 400 112 440 118 452 C 152 466 248 466 282 452 C 288 440 291 400 281 330 C 270 258 248 222 200 212 Z" fill={p.robe} />
      <path d="M119 396 C 152 414 248 414 281 396 C 283 422 284 444 282 452 C 248 466 152 466 118 452 C 116 444 117 422 119 396 Z" fill={p.dark} />
      <path d="M200 236 C 186 248 179 298 179 356 C 179 408 186 438 200 450 C 214 438 221 408 221 356 C 221 298 214 248 200 236 Z" fill={p.light} opacity="0.9" />
      <path d="M139 298 C 172 311 228 311 261 298 L 261 317 C 228 330 172 330 139 317 Z" fill="#6B4A2F" />
      <rect x="187" y="297" width="26" height="26" rx="5" fill={GOLD} />
      <rect x="192" y="302" width="16" height="16" rx="3" fill={GOLD_D} />
      <path d="M152 246 C 128 258 116 290 114 318 C 122 332 140 334 152 326 C 156 300 160 272 166 254 Z" fill={p.dark} />
      <circle cx="131" cy="330" r="13" fill={skin} />
      <path d="M248 246 C 274 258 298 280 310 300 C 306 316 290 322 276 318 C 262 298 250 272 240 256 Z" fill={p.dark} />
      <circle cx="146" cy="176" r="10" fill={skin} />
      <circle cx="254" cy="176" r="10" fill={skin} />
      <circle cx="200" cy="170" r="56" fill={skin} />
      <Beard style={beardStyle} hair={hair} hairD={hairD} />
      <ellipse cx="200" cy="189" rx="12" ry="10" fill={skinD} />
      <ellipse cx="197" cy="186" rx="5" ry="4" fill={skin} opacity="0.6" />
      {beardStyle !== "beard_none" && (
        <path d="M168 199 C 178 190 192 188 200 195 C 208 188 222 190 232 199 C 226 211 208 213 200 206 C 192 213 174 211 168 199 Z" fill={hair} />
      )}
      <circle cx="178" cy="165" r="7" fill="#FFFFFF" />
      <circle cx="222" cy="165" r="7" fill="#FFFFFF" />
      <circle cx="180" cy="166" r="3.8" fill={eye} />
      <circle cx="220" cy="166" r="3.8" fill={eye} />
      <circle cx="181.5" cy="164.5" r="1.3" fill="#FFFFFF" />
      <circle cx="221.5" cy="164.5" r="1.3" fill="#FFFFFF" />
      <rect x="166" y="149" width="26" height="8" rx="4" fill={hair} transform="rotate(-6 179 153)" />
      <rect x="208" y="149" width="26" height="8" rx="4" fill={hair} transform="rotate(6 221 153)" />
    </g>
  );
}

function HandGrip() {
  return (
    <g>
      <circle cx="309" cy="300" r="13" fill={SKIN} />
      <path d="M298 296 A 13 13 0 0 0 309 313" stroke={SKIN_D} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function HatPointed({ p }) {
  return (
    <g>
      <path d="M150 130 A 58 26 0 0 0 250 130 L 250 142 A 58 22 0 0 1 150 142 Z" fill="#000" opacity="0.12" />
      <path d="M146 120 C 158 74 184 40 224 26 C 252 16 274 28 266 40 C 260 48 244 44 232 52 C 246 74 254 96 258 120 Z" fill={p.robe} />
      <path d="M146 120 C 156 84 174 56 200 40 C 190 66 186 92 188 120 Z" fill={p.light} opacity="0.55" />
      <ellipse cx="202" cy="124" rx="86" ry="20" fill={p.dark} />
      <ellipse cx="202" cy="119" rx="86" ry="18" fill={p.robe} />
      <path d="M150 112 C 182 104 222 104 254 112 L 254 122 C 222 114 182 114 150 122 Z" fill={GOLD} />
    </g>
  );
}

function HatHood({ p }) {
  return (
    <g>
      <path fillRule="evenodd" d="M200 62 C 148 62 120 108 124 178 C 126 210 138 230 154 238 C 148 212 146 190 150 170 A 58 58 0 0 1 250 170 C 254 190 252 212 246 238 C 262 230 274 210 276 178 C 280 108 252 62 200 62 Z" fill={p.robe} />
      <path d="M200 62 C 168 62 146 82 134 116 C 152 92 174 80 200 80 C 226 80 248 92 266 116 C 254 82 232 62 200 62 Z" fill={p.light} opacity="0.55" />
      <path d="M196 54 C 198 44 206 40 212 44 C 208 48 206 54 206 62 C 202 60 198 58 196 54 Z" fill={p.robe} />
      <path d="M136 160 C 132 186 138 208 150 222 C 146 200 146 180 150 164 Z" fill={p.dark} />
      <path d="M264 160 C 268 186 262 208 250 222 C 254 200 254 180 250 164 Z" fill={p.dark} />
      <path d="M150 132 A 60 30 0 0 0 250 132 L 250 142 A 60 24 0 0 1 150 142 Z" fill="#000" opacity="0.10" />
    </g>
  );
}

function HatWide() {
  const starPts = "M0 -10 L2.9 -3.1 L10 -3.1 L4.5 1.8 L6.9 9 L0 4.9 L-6.9 9 L-4.5 1.8 L-10 -3.1 L-2.9 -3.1 Z";
  const stars = [[140, 118, 6], [262, 116, 7], [200, 132, 5], [168, 130, 4], [236, 130, 4]];
  return (
    <g>
      <path d="M150 130 A 58 26 0 0 0 250 130 L 250 142 A 58 22 0 0 1 150 142 Z" fill="#000" opacity="0.12" />
      <path d="M160 116 C 166 76 182 48 202 40 C 226 48 238 78 242 116 Z" fill="#2E2A5C" />
      <path d="M160 116 C 166 82 180 58 198 46 C 188 70 184 92 184 116 Z" fill="#4A4488" opacity="0.7" />
      <ellipse cx="200" cy="126" rx="112" ry="24" fill="#221F49" />
      <ellipse cx="200" cy="120" rx="112" ry="22" fill="#2E2A5C" />
      {stars.map(([sx, sy, s], i) => (
        <path key={i} transform={`translate(${sx} ${sy}) scale(${s / 10})`} d={starPts} fill={GOLD} />
      ))}
    </g>
  );
}

function HatCrown() {
  return (
    <g>
      <path d="M154 138 C 154 116 154 102 154 96 L 178 116 L 200 80 L 222 116 L 246 96 C 246 102 246 116 246 138 C 216 128 184 128 154 138 Z" fill={GOLD} />
      <path d="M154 138 C 184 128 216 128 246 138 L 246 146 C 216 136 184 136 154 146 Z" fill={GOLD_D} />
      <path d="M154 96 L 178 116 L 200 80 L 200 92 L 182 122 L 160 104 Z" fill="#FFE28A" opacity="0.8" />
      <circle cx="200" cy="112" r="6" fill="#D64933" />
      <circle cx="172" cy="124" r="4" fill="#4FA3D1" />
      <circle cx="228" cy="124" r="4" fill="#5FA85A" />
    </g>
  );
}

function CapeTravel({ color, dark }) {
  return (
    <g opacity="0.95">
      <path d="M158 226 C 118 250 96 320 100 430 C 100 444 106 456 116 460 C 122 420 118 340 140 270 C 148 250 158 236 158 226 Z" fill={color} />
      <path d="M242 226 C 282 250 304 320 300 430 C 300 444 294 456 284 460 C 278 420 282 340 260 270 C 252 250 242 236 242 226 Z" fill={color} />
      <path d="M116 460 C 122 420 118 340 140 270 L 150 275 C 130 340 132 415 126 455 Z" fill={dark} opacity="0.55" />
      <path d="M284 460 C 278 420 282 340 260 270 L 250 275 C 270 340 268 415 274 455 Z" fill={dark} opacity="0.55" />
      <circle cx="200" cy="234" r="5" fill="#8B6A45" />
      <path d="M116 380 L124 388 M280 380 L288 388" stroke={dark} strokeWidth="2" opacity="0.6" />
    </g>
  );
}
function CapeShadow({ color, dark }) {
  return (
    <g opacity="0.95">
      <path d="M156 226 C 112 252 88 320 96 418 L 110 452 L 116 424 L 122 456 L 132 432 L 122 462 C 128 420 120 336 144 268 C 150 250 156 236 156 226 Z" fill={color} />
      <path d="M244 226 C 288 252 312 320 304 418 L 290 452 L 284 424 L 278 456 L 268 432 L 278 462 C 272 420 280 336 256 268 C 250 250 244 236 244 226 Z" fill={color} />
      <path d="M96 418 C 100 380 108 320 132 280" stroke={dark} strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M304 418 C 300 380 292 320 268 280" stroke={dark} strokeWidth="2" fill="none" opacity="0.6" />
    </g>
  );
}
function CapeStar({ color, dark }) {
  const starPts = "M0 -7 L2 -2.2 L7 -2.2 L3.2 1.3 L4.8 6.3 L0 3.5 L-4.8 6.3 L-3.2 1.3 L-7 -2.2 L-2 -2.2 Z";
  const stars = [[128, 320, 1], [270, 340, 0.9], [136, 400, 0.8], [262, 400, 1]];
  return (
    <g opacity="0.96">
      <path d="M158 226 C 118 250 96 320 100 430 C 100 444 106 456 116 460 C 122 420 118 340 140 270 C 148 250 158 236 158 226 Z" fill={color} />
      <path d="M242 226 C 282 250 304 320 300 430 C 300 444 294 456 284 460 C 278 420 282 340 260 270 C 252 250 242 236 242 226 Z" fill={color} />
      <path d="M116 460 C 122 420 118 340 140 270 L 150 275 C 130 340 132 415 126 455 Z" fill={dark} opacity="0.5" />
      <path d="M284 460 C 278 420 282 340 260 270 L 250 275 C 270 340 268 415 274 455 Z" fill={dark} opacity="0.5" />
      {stars.map(([x, y, s], i) => (
        <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d={starPts} fill={GOLD} opacity="0.9" />
      ))}
    </g>
  );
}
function CapePhoenix({ color, dark }) {
  return (
    <g opacity="0.97">
      <path d="M150 228 C 108 250 84 310 90 400 C 76 410 66 428 70 448 C 92 440 108 424 118 404 C 110 440 112 458 122 464 C 132 440 138 400 150 350 C 156 300 156 260 150 228 Z" fill={color} />
      <path d="M250 228 C 292 250 316 310 310 400 C 324 410 334 428 330 448 C 308 440 292 424 282 404 C 290 440 288 458 278 464 C 268 440 262 400 250 350 C 244 300 244 260 250 228 Z" fill={color} />
      <path d="M90 400 C 76 410 66 428 70 448 C 92 440 108 424 118 404 Z" fill={dark} opacity="0.75" />
      <path d="M310 400 C 324 410 334 428 330 448 C 308 440 292 424 282 404 Z" fill={dark} opacity="0.75" />
      <path d="M118 340 C 108 356 102 374 102 392 M282 340 C 292 356 298 374 298 392" stroke={GOLD} strokeWidth="2" opacity="0.7" fill="none" />
    </g>
  );
}
function featherPath(cx, cy, angleDeg, len, width) {
  const rad = (angleDeg * Math.PI) / 180;
  const tipX = cx + len * Math.sin(rad), tipY = cy - len * Math.cos(rad);
  const nx = Math.cos(rad), ny = Math.sin(rad);
  const midLen = len * 0.55;
  const midX = cx + midLen * Math.sin(rad), midY = cy - midLen * Math.cos(rad);
  const leftX = midX - width * nx, leftY = midY + width * ny;
  const rightX = midX + width * nx, rightY = midY - width * ny;
  return `M${cx} ${cy} Q${leftX.toFixed(1)} ${leftY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q${rightX.toFixed(1)} ${rightY.toFixed(1)} ${cx} ${cy} Z`;
}
function WingsAngel({ color, dark }) {
  const feathers = [
    { a: 100, len: 100, w: 17 },
    { a: 80,  len: 122, w: 19 },
    { a: 60,  len: 112, w: 17 },
    { a: 42,  len: 92,  w: 14 },
    { a: 25,  len: 68,  w: 11 },
  ];
  const wing = (cx, sign, key) => feathers.map((f, i) => (
    <path key={`${key}${i}`} d={featherPath(cx, 235, sign * f.a, f.len, f.w)} fill={i % 2 ? color : "#FFFFFF"} stroke={dark} strokeWidth="1" opacity="0.97" />
  ));
  return <g>{wing(152, -1, "l")}{wing(248, 1, "r")}</g>;
}
function batWingPath(cx, cy, sign, angles, lengths) {
  const pt = (ang, len) => {
    const rad = (sign * ang * Math.PI) / 180;
    return [cx + len * Math.sin(rad), cy - len * Math.cos(rad)];
  };
  let d = `M${cx} ${cy}`;
  for (let i = 0; i < angles.length; i++) {
    const [tx, ty] = pt(angles[i], lengths[i]);
    d += ` L${tx.toFixed(1)} ${ty.toFixed(1)}`;
    if (i < angles.length - 1) {
      const midA = (angles[i] + angles[i + 1]) / 2;
      const webLen = Math.min(lengths[i], lengths[i + 1]) * 0.52;
      const [wx, wy] = pt(midA, webLen);
      d += ` L${wx.toFixed(1)} ${wy.toFixed(1)}`;
    }
  }
  return d + " Z";
}
function WingsDemon({ color, dark }) {
  const angles = [10, 40, 70, 98];
  const lengths = [140, 162, 142, 100];
  const strutColor = dark;
  const strutLine = (cx, sign) => angles.map((a, i) => {
    const rad = (sign * a * Math.PI) / 180;
    const x2 = cx + lengths[i] * Math.sin(rad), y2 = 235 - lengths[i] * Math.cos(rad);
    return <line key={i} x1={cx} y1={235} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke={strutColor} strokeWidth="2" opacity="0.6" />;
  });
  return (
    <g opacity="0.97">
      <path d={batWingPath(150, 235, -1, angles, lengths)} fill={color} stroke={dark} strokeWidth="2.5" />
      <path d={batWingPath(250, 235, 1, angles, lengths)} fill={color} stroke={dark} strokeWidth="2.5" />
      {strutLine(150, -1)}
      {strutLine(250, 1)}
    </g>
  );
}
const CAPE_COMPONENTS = { cape_travel: CapeTravel, cape_shadow: CapeShadow, cape_star: CapeStar, cape_phoenix: CapePhoenix, wings_angel: WingsAngel, wings_demon: WingsDemon };

function RobeMidnightTrim() {
  const stars = [[168, 270, 2.2], [228, 300, 1.8], [178, 360, 2], [222, 400, 2.4], [196, 330, 1.6], [205, 420, 2]];
  return <g>{stars.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#FFF3C4" opacity="0.85" />)}</g>;
}
function RobeIvoryTrim() {
  return (
    <g stroke="#C9BFA8" strokeWidth="3" fill="none" opacity="0.85">
      <path d="M160 292 Q200 284 240 292" />
      <path d="M122 448 Q200 464 278 448" />
      <path d="M170 300 L170 418 M230 300 L230 418" strokeWidth="1.5" opacity="0.5" />
    </g>
  );
}
function RobeCrimsonTrim() {
  return (
    <g fill="none" stroke="#FFD75E" strokeWidth="2.5" opacity="0.85">
      <path d="M160 280 L172 300 L160 320" />
      <path d="M240 280 L228 300 L240 320" />
      <path d="M182 400 L200 428 L218 400" />
    </g>
  );
}
function RobeGildedTrim() {
  return (
    <g stroke={GOLD} fill="none">
      <path d="M122 448 Q200 466 278 448" strokeWidth="4" />
      <path d="M160 292 Q200 284 240 292" strokeWidth="3" />
      <path d="M188 310 L200 298 L212 310 L200 322 Z" fill="#FFE28A" stroke="none" opacity="0.9" />
    </g>
  );
}
const ROBE_COMPONENTS = { robe_midnight: RobeMidnightTrim, robe_ivory: RobeIvoryTrim, robe_crimson: RobeCrimsonTrim, robe_gilded: RobeGildedTrim };

function ArmorPadded() {
  return (
    <g>
      <ellipse cx="150" cy="250" rx="25" ry="17" fill="#8B6A45" opacity="0.92" />
      <ellipse cx="250" cy="250" rx="25" ry="17" fill="#8B6A45" opacity="0.92" />
    </g>
  );
}
function ArmorChain() {
  return (
    <g>
      <ellipse cx="150" cy="248" rx="27" ry="19" fill="#7C8AA0" />
      <ellipse cx="250" cy="248" rx="27" ry="19" fill="#7C8AA0" />
      {[...Array(3)].map((_, i) => <circle key={`l${i}`} cx={140 + i * 10} cy={246} r="2.6" fill="#B7C4D6" />)}
      {[...Array(3)].map((_, i) => <circle key={`r${i}`} cx={240 + i * 10} cy={246} r="2.6" fill="#B7C4D6" />)}
    </g>
  );
}
function ArmorVoid() {
  return (
    <g>
      <path d="M122 236 L152 222 L182 244 L166 270 L126 264 Z" fill="#332752" />
      <path d="M278 236 L248 222 L218 244 L234 270 L274 264 Z" fill="#332752" />
      <circle cx="152" cy="246" r="3" fill="#B07FF5" />
      <circle cx="248" cy="246" r="3" fill="#B07FF5" />
    </g>
  );
}
function ArmorDragon() {
  return (
    <g>
      <path d="M118 234 L156 216 L186 244 L164 272 L122 264 Z" fill="#A93425" />
      <path d="M282 234 L244 216 L214 244 L236 272 L278 264 Z" fill="#A93425" />
      <path d="M148 220 l6 -10 l6 10 z" fill={GOLD} />
      <path d="M252 220 l6 -10 l6 10 z" fill={GOLD} />
    </g>
  );
}
const ARMOR_COMPONENTS = { armor_padded: ArmorPadded, armor_chain: ArmorChain, armor_void: ArmorVoid, armor_dragon: ArmorDragon };

function Pet({ pet }) {
  if (!pet?.kind) return null;
  const c = pet.color;
  return (
    <g transform="translate(58 420)">
      <ellipse cx="0" cy="36" rx="28" ry="7" fill="#000" opacity="0.2" />
      <circle cx="0" cy="16" r="22" fill={c} />
      {pet.kind === "imp" && (
        <>
          <path d="M-14 -4 L-22 -18 L-5 -10 Z" fill={c} />
          <path d="M14 -4 L22 -18 L5 -10 Z" fill={c} />
          <path d="M-4 -26 C -2 -33 4 -33 4 -26 C 2 -29 -2 -29 -4 -26 Z" fill="#FFD75E" />
        </>
      )}
      {pet.kind === "sprite" && (
        <>
          <path d="M0 -8 L4 -19 L8 -8 L0 -12 Z" fill="#E4F6FF" />
          <path d="M0 -8 L-4 -19 L-8 -8 L0 -12 Z" fill="#E4F6FF" />
        </>
      )}
      {pet.kind === "fox" && (
        <>
          <path d="M-12 -6 L-19 -20 L-3 -12 Z" fill={c} />
          <path d="M12 -6 L19 -20 L3 -12 Z" fill={c} />
          <path d="M14 16 C 26 18 32 12 34 20 C 26 26 14 24 14 16 Z" fill={c} />
        </>
      )}
      {pet.kind === "wisp" && (
        <>
          <circle cx="0" cy="16" r="22" fill={c} opacity="0.45" />
          <circle cx="-6" cy="10" r="2.6" fill="#FFF3C4" />
          <circle cx="7" cy="6" r="1.8" fill="#FFF3C4" />
        </>
      )}
      <circle cx="-6" cy="14" r="3.1" fill="#2B2430" />
      <circle cx="6" cy="14" r="3.1" fill="#2B2430" />
      <circle cx="-5" cy="12.6" r="1" fill="#FFF" />
      <circle cx="7" cy="12.6" r="1" fill="#FFF" />
    </g>
  );
}

function OffhandBook({ color }) {
  return (
    <g transform="translate(131 330)">
      <rect x="-15" y="-11" width="30" height="22" rx="3" fill={color} />
      <rect x="-15" y="-11" width="15" height="22" rx="3" fill="#000000" opacity="0.18" />
      <line x1="0" y1="-11" x2="0" y2="11" stroke="#000000" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="3.5" fill={GOLD} opacity="0.85" />
    </g>
  );
}

function StaffAshwood() {
  return (
    <g>
      <line x1="318" y1="150" x2="315" y2="452" stroke="#8B5A33" strokeWidth="10" strokeLinecap="round" />
      <line x1="316.5" y1="160" x2="314.5" y2="440" stroke="#A9743F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="319" cy="140" r="16" fill="#6E4526" />
      <circle cx="319" cy="138" r="11" fill="#FF8C42" />
      <circle cx="316" cy="135" r="4" fill="#FFC08A" />
    </g>
  );
}
function StaffFrostbound() {
  return (
    <g>
      <line x1="318" y1="150" x2="315" y2="452" stroke="#8FB6CC" strokeWidth="9" strokeLinecap="round" />
      <line x1="316.5" y1="160" x2="314.5" y2="440" stroke="#C4E0EF" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M319 92 L336 130 L319 154 L302 130 Z" fill="#9FD8F0" />
      <path d="M319 92 L336 130 L319 154 Z" fill="#6FBBDD" />
      <path d="M319 100 L328 128 L319 144 L310 128 Z" fill="#E4F6FF" opacity="0.8" />
    </g>
  );
}
function StaffVerdant() {
  return (
    <g>
      <path d="M318 150 C 323 220 313 300 316 452" stroke="#6B8F4E" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M317.5 160 C 322 220 314 300 315.5 440" stroke="#84AA62" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M318 176 C 300 168 292 152 296 138 C 312 142 320 158 318 176 Z" fill="#83C77E" />
      <path d="M321 206 C 339 200 348 186 345 172 C 329 175 320 190 321 206 Z" fill="#83C77E" />
      <circle cx="318" cy="136" r="12" fill="#8FD463" />
      <circle cx="315" cy="133" r="4.5" fill="#CFF0B8" />
    </g>
  );
}
function StaffVoidglass() {
  return (
    <g>
      <line x1="318" y1="152" x2="315" y2="452" stroke="#4A3E66" strokeWidth="9" strokeLinecap="round" />
      <line x1="316.5" y1="162" x2="314.5" y2="440" stroke="#6A5C92" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="318" cy="134" r="14" fill="#B07FF5" />
      <circle cx="314" cy="130" r="5" fill="#E2CDFF" />
      <ellipse cx="318" cy="136" rx="24" ry="7" fill="none" stroke={GOLD} strokeWidth="3" />
    </g>
  );
}
function StaffSunfire() {
  return (
    <g>
      <line x1="318" y1="152" x2="315" y2="452" stroke="#A33B2A" strokeWidth="10" strokeLinecap="round" />
      <path d="M318 170 C 308 190 328 210 318 230 C 308 250 328 270 318 290" stroke={GOLD} strokeWidth="3" fill="none" />
      {[...Array(8)].map((_, i) => (
        <path key={i} transform={`rotate(${i * 45} 318 130)`} d="M318 106 L324 116 L312 116 Z" fill="#FF8C42" />
      ))}
      <circle cx="318" cy="130" r="15" fill="#FFD75E" />
      <circle cx="314" cy="126" r="5" fill="#FFF3C4" />
    </g>
  );
}

const HAT_COMPONENTS = { hat_pointed: HatPointed, hat_hood: HatHood, hat_wide: HatWide, hat_crown: HatCrown };
const STAFF_COMPONENTS = { ashwood: StaffAshwood, frostbound: StaffFrostbound, verdant: StaffVerdant, voidglass: StaffVoidglass, sunfire: StaffSunfire };

function MageSprite({ mage, facing, hurt, casting, size = 1 }) {
  const robeSkin = ROBES.find(r => r.id === mage.robe);
  const p = robeSkin?.colors || ART[mage.affinity];
  const skinTone = SKIN_TONES.find(s => s.id === mage.skinTone) || SKIN_TONES[0];
  const hairColor = HAIR_COLORS.find(h => h.id === mage.hairColor) || HAIR_COLORS[0];
  const eyeColor = EYE_COLORS.find(e => e.id === mage.eyeColor) || EYE_COLORS[0];
  const look = {
    skin: skinTone.skin, skinD: skinTone.skinD,
    hair: hairColor.hair, hairD: hairColor.hairD,
    eye: eyeColor.color, beardStyle: mage.beardStyle || "beard_long",
  };
  const aura = AURAS.find(a => a.id === mage.aura);
  const Hat = HAT_COMPONENTS[mage.hat];
  const Staff = mage.staffGear ? STAFF_COMPONENTS[mage.staffGear.id] : null;
  const Armor = mage.armor ? ARMOR_COMPONENTS[mage.armor.id] : null;
  const Cape = mage.cape ? CAPE_COMPONENTS[mage.cape.id] : null;
  const RobeTrim = ROBE_COMPONENTS[mage.robe];
  const hasOffhand = !!mage.offhand;
  const w = 96 * size, h = 120 * size;
  const floatRef = useRef(null);

  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    if (hurt || casting) { el.style.transform = ""; return; }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const amplitude = 5, period = 3200;
    const start = performance.now();
    let raf;
    function tick(now) {
      const phase = ((now - start) % period) / period;
      const y = -amplitude * (0.5 - 0.5 * Math.cos(phase * Math.PI * 2));
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hurt, casting]);

  return (
    <div ref={floatRef} className={hurt ? "shake" : casting ? "cast" : ""} style={{ position: "relative", width: w, height: h, flexShrink: 0, willChange: "transform" }}>
      {aura?.color && (
        <div className="auraPulse" style={{
          position: "absolute", inset: `${4 * size}px`, borderRadius: "50%",
          background: `radial-gradient(circle, ${aura.color}66 0%, ${aura.color}22 55%, transparent 75%)`,
        }} />
      )}
      <svg width={w} height={h} viewBox="0 0 400 500" style={{ position: "relative", transform: facing === "left" ? "scaleX(-1)" : "none", filter: casting ? "brightness(1.25)" : "none" }}>
        {Cape && mage.cape?.color && <Cape color={mage.cape.color} dark={mage.cape.dark} />}
        <Base p={p} look={look} />
        {RobeTrim && <RobeTrim />}
        {Armor && <Armor />}
        {Staff && <Staff />}
        {Staff && <HandGrip />}
        {hasOffhand && <OffhandBook color={mage.offhand.color} />}
        {Hat && <Hat p={p} />}
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
  const [beardStyleId, setBeardStyleId] = useState(saved?.beardStyleId ?? "beard_long");
  const [eyeColorId, setEyeColorId] = useState(saved?.eyeColorId ?? "eye_dark");
  const [offhandId, setOffhandId] = useState(saved?.offhandId ?? "offhand_tome");
  const [owned, setOwned] = useState(new Set(DEV_UNLOCK_ALL ? ALL_ITEMS.map(i => i.id) : (saved?.owned ?? START_OWNED)));

  useEffect(() => {
    const data = { mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, skinToneId, hairColorId, beardStyleId, eyeColorId, offhandId, owned: [...owned] };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }, [mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, skinToneId, hairColorId, beardStyleId, eyeColorId, offhandId, owned]);

  const [friends, setFriends] = useState(() => loadFriends());
  const [showFriends, setShowFriends] = useState(false);
  const [chatWith, setChatWith] = useState(null);
  const [chatLog, setChatLog] = useState([]);

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
    setEnemy(makeEnemy());
    setPhase("scout");
  }

  function confirmDuel() {
    const p = makeMage(mageName.trim() || "You", affinity, chosen.map(id => SKILLS.find(s => s.id === id)), staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId,
      { skinTone: skinToneId, hairColor: hairColorId, beardStyle: beardStyleId, eyeColor: eyeColorId }, offhandId);
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
      @keyframes shakeAnim { 0%,100%{transform:translate3d(0,0,0)} 20%{transform:translate3d(-7px,0,0)} 40%{transform:translate3d(6px,0,0)} 60%{transform:translate3d(-4px,0,0)} 80%{transform:translate3d(3px,0,0)} }
      .shake { animation: shakeAnim 0.45s ease; will-change: transform; }
      @keyframes castAnim { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-8px,0)} }
      .cast { animation: castAnim 0.55s ease; will-change: transform; }
      @keyframes idleAnim { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-5px,0); } }
      .idle { animation: idleAnim 3.2s cubic-bezier(0.45,0,0.55,1) infinite; will-change: transform; backface-visibility: hidden; }
      @keyframes auraAnim { 0%,100%{opacity:0.9; transform:scale(1)} 50%{opacity:0.5; transform:scale(1.08)} }
      .auraPulse { animation: auraAnim 2.2s ease-in-out infinite; will-change: transform, opacity; }
      @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.8} }
      @keyframes floatUp { 0%{opacity:1; transform:translate3d(0,0,0)} 100%{opacity:0; transform:translate3d(0,-34px,0)} }
      .dmgFloat { animation: floatUp 0.95s ease-out forwards; will-change: transform, opacity; }
      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      .lootShine { background: linear-gradient(110deg, transparent 35%, #FFFFFF22 50%, transparent 65%); background-size: 200% 100%; animation: shimmer 2.2s linear infinite; }
      @keyframes projectileUp { 0%{ top:76%; opacity:0; transform:translate3d(-50%,-50%,0) scale(0.5); } 14%{ opacity:1; } 82%{ opacity:1; } 100%{ top:22%; opacity:0; transform:translate3d(-50%,-50%,0) scale(1.2); } }
      @keyframes projectileDown { 0%{ top:22%; opacity:0; transform:translate3d(-50%,-50%,0) scale(0.5); } 14%{ opacity:1; } 82%{ opacity:1; } 100%{ top:76%; opacity:0; transform:translate3d(-50%,-50%,0) scale(1.2); } }
      .projectile { position: absolute; left: 50%; width: 20px; height: 20px; border-radius: 50%; z-index: 6; pointer-events: none; will-change: top, transform, opacity; }
      .projectile-up { animation: projectileUp 0.5s ease-in forwards; }
      .projectile-down { animation: projectileDown 0.5s ease-in forwards; }
      @media (prefers-reduced-motion: reduce) { .shake,.cast,.idle,.auraPulse,.dmgFloat,.lootShine,.projectile-up,.projectile-down { animation: none; } }
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
      skinTone: skinToneId, hairColor: hairColorId, beardStyle: beardStyleId, eyeColor: eyeColorId,
      status: {},
    };
    const trimmedName = mageName.trim();
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 w-full max-w-md">
          <h1 className="font-serif text-3xl text-center mt-1" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>Create Your Mage</h1>
          <p className="text-center text-xs font-mono mb-3" style={{ color: "#B7AE95" }}>Spells matching your affinity deal +25% damage</p>

          <div className="flex justify-center mb-4">
            <MageSprite mage={previewMage} facing="right" size={1.5} />
          </div>

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Name</p>
          <input
            value={mageName}
            onChange={(e) => setMageName(e.target.value.slice(0, 18))}
            placeholder="Enter your mage's name"
            className="w-full rounded-md border p-2 font-mono text-sm mb-4 outline-none"
            style={{ borderColor: "#3A3356", background: "#1C1833", color: "#F2EAD8" }}
          />

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Affinity <span style={{ color: "#B7AE95" }}>(+25% matching dmg)</span></p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {Object.entries(ELEMENTS).map(([key, e]) => (
              <button key={key} onClick={() => setAffinity(key)} className="rounded-md border p-2 text-sm font-mono"
                style={{ borderColor: affinity === key ? e.color : "#3A3356", background: affinity === key ? e.color + "26" : "#1C1833", color: e.color, boxShadow: affinity === key ? `0 0 10px ${e.color}44` : "none" }}>
                {e.icon}<br />{e.name}
              </button>
            ))}
          </div>

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Skin</p>
          <div className="flex gap-2 mb-4">
            {SKIN_TONES.map(s => (
              <button key={s.id} onClick={() => setSkinToneId(s.id)} title={s.name}
                className="rounded-full"
                style={{ width: 34, height: 34, background: s.skin, border: skinToneId === s.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: skinToneId === s.id ? "0 0 8px #E8B44F66" : "none" }} />
            ))}
          </div>

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Hair</p>
          <div className="flex gap-2 mb-4">
            {HAIR_COLORS.map(h => (
              <button key={h.id} onClick={() => setHairColorId(h.id)} title={h.name}
                className="rounded-full"
                style={{ width: 34, height: 34, background: h.hair, border: hairColorId === h.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: hairColorId === h.id ? "0 0 8px #E8B44F66" : "none" }} />
            ))}
          </div>

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Beard</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {BEARD_STYLES.map(b => (
              <button key={b.id} onClick={() => setBeardStyleId(b.id)} className="rounded-md border py-2 font-mono text-xs"
                style={{ borderColor: beardStyleId === b.id ? "#E8B44F" : "#3A3356", background: beardStyleId === b.id ? "#E8B44F1F" : "#1C1833", color: beardStyleId === b.id ? "#E8B44F" : "#B7AE95" }}>
                {b.name}
              </button>
            ))}
          </div>

          <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Eyes</p>
          <div className="flex gap-2 mb-6">
            {EYE_COLORS.map(e => (
              <button key={e.id} onClick={() => setEyeColorId(e.id)} title={e.name}
                className="rounded-full"
                style={{ width: 34, height: 34, background: e.color, border: eyeColorId === e.id ? "3px solid #E8B44F" : "3px solid #3A3356", boxShadow: eyeColorId === e.id ? "0 0 8px #E8B44F66" : "none" }} />
            ))}
          </div>

          <button onClick={() => setPhase("loadout")} disabled={!trimmedName}
            className="w-full rounded-md border py-3 font-serif text-xl"
            style={{ borderColor: "#E8B44F", background: trimmedName ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: trimmedName ? "#100E1F" : "#3A3356", boxShadow: trimmedName ? "0 0 20px #E8B44F55" : "none" }}>
            Begin Your Journey
          </button>
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
      skinTone: skinToneId, hairColor: hairColorId, beardStyle: beardStyleId, eyeColor: eyeColorId,
      status: {},
    };
  }

  function renderCharacterPreview(extra) {
    const previewMage = buildPreviewMage();
    const relic = RELICS.find(r => r.id === relicId);
    const hat = findItem(hatId), aura = findItem(auraId), robeSkin = findItem(robeId), cape = findItem(capeId), pet = findItem(petId), offhand = findItem(offhandId);
    return (
      <>
        <div className="flex-1 flex items-center justify-center">
          <MageSprite mage={previewMage} facing="right" size={3.2} />
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-1">
          <ElementBadge el={affinity} />
          {relic && relic.id !== "none" && <span className="text-xs font-mono px-1.5 py-0.5 rounded-sm border" style={{ color: RARITY[relic.rarity].color, borderColor: RARITY[relic.rarity].color + "66", background: RARITY[relic.rarity].color + "1A" }}>{relic.name}</span>}
        </div>
        <div className="text-center text-xs font-mono" style={{ color: "#B7AE95" }}>
          {previewMage.staffGear?.name} · {offhand?.name}
        </div>
        <div className="text-center text-xs font-mono mb-3" style={{ color: "#B7AE95" }}>
          {hat?.name} · {robeSkin?.name} · {cape?.name} · {aura?.name} · {pet?.name}
        </div>

        {extra}

        <div className="grid grid-cols-3 gap-2">
          {[["skills", "Skills"], ["gear", "Gear"], ["style", "Style"]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className="rounded-md border py-3 font-serif"
              style={{ borderColor: "#3A3356", background: "#1C1833", color: "#B7AE95" }}>
              {label}
            </button>
          ))}
        </div>
      </>
    );
  }

  function renderGearModal() {
    if (!tab) return null;
    const panelTitle = { skills: "Skills", gear: "Gear", style: "Style" }[tab];
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
              <div className="grid gap-2 mb-4">
                {OFFHANDS.map(o => (
                  <RarityCard key={o.id} item={o} selected={offhandId === o.id} locked={!owned.has(o.id)} onClick={() => owned.has(o.id) && setOffhandId(o.id)} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Robe <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid gap-2 mb-4">
                {ROBES.map(r => (
                  <RarityCard key={r.id} item={r} selected={robeId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRobeId(r.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Cape <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid gap-2">
                {CAPES.map(c => (
                  <RarityCard key={c.id} item={c} selected={capeId === c.id} locked={!owned.has(c.id)} onClick={() => owned.has(c.id) && setCapeId(c.id)} subtitle=" " />
                ))}
              </div>
            </div>
          )}

          {tab === "style" && (
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Hat <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {HATS.map(h1 => (
                  <RarityCard key={h1.id} item={h1} selected={hatId === h1.id} locked={!owned.has(h1.id)} onClick={() => owned.has(h1.id) && setHatId(h1.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Robe <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid gap-2 mb-4">
                {ROBES.map(r => (
                  <RarityCard key={r.id} item={r} selected={robeId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRobeId(r.id)} subtitle=" " />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Cape <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
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
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Companion <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
              <div className="grid grid-cols-2 gap-2">
                {PETS.map(pt => (
                  <RarityCard key={pt.id} item={pt} selected={petId === pt.id} locked={!owned.has(pt.id)} onClick={() => owned.has(pt.id) && setPetId(pt.id)} subtitle=" " />
                ))}
              </div>
              <p className="text-xs font-mono mt-3" style={{ color: "#5A5478" }}>Locked items drop from victories. In the full game, they're tradeable with other players.</p>
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

  // ================= LOADOUT =================
  if (phase === "loadout") {
    return (
      <div className="min-h-screen relative flex flex-col" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 flex-1 flex flex-col items-center px-4 pt-4 pb-28">
          <div className="w-full max-w-md flex-1 flex flex-col">
            <div className="relative flex items-center justify-center mb-1">
              <h1 className="font-serif text-2xl text-center" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>{mageName.trim() || "Mage Duel"}</h1>
              <button onClick={() => setShowFriends(true)} className="absolute right-0 rounded-md border px-2 py-1 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
                👥 {friends.length}
              </button>
            </div>
            <p className="text-center text-xs font-mono mb-1" style={{ color: "#B7AE95" }}>Spells matching your affinity deal +25% damage</p>
            {renderCharacterPreview(null)}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 p-3 flex justify-center" style={{ background: "linear-gradient(transparent, #0A0814 40%)" }}>
          <button onClick={findOpponent} disabled={chosen.length !== 4}
            className="w-full max-w-md rounded-md border py-3 font-serif text-xl"
            style={{ borderColor: "#E8B44F", background: chosen.length === 4 ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: chosen.length === 4 ? "#100E1F" : "#3A3356", boxShadow: chosen.length === 4 ? "0 0 20px #E8B44F55" : "none" }}>
            Find an Opponent
          </button>
        </div>

        {renderGearModal()}
        {renderFriendsModal()}
        {renderChatModal()}
      </div>
    );
  }

  // ================= SCOUT =================
  if (phase === "scout") {
    const foeSkills = enemy.skills;
    const bios = NPC_BIOS[enemy.affinity] || [];
    const bioHash = [...enemy.name].reduce((a, c) => a + c.charCodeAt(0), 0);
    const bio = bios.length ? bios[bioHash % bios.length] : "";
    const friended = isFriend(enemy);
    const scoutCard = (
      <div className="rounded-md border p-3 mb-3" style={{ borderColor: "#3A3356", background: "#1C1833" }}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-serif" style={{ color: "#FF6B3D" }}>{enemy.name}</span>
          <ElementBadge el={enemy.affinity} />
        </div>
        <p className="text-xs font-mono mb-2 italic" style={{ color: "#5A5478" }}>"{bio}"</p>
        <div className="text-xs font-mono mb-2" style={{ color: RARITY[enemy.staffGear.rarity].color }}>
          {enemy.staffGear.name}{enemy.relic ? ` · ${enemy.relic.name}` : ""}{enemy.offhand ? ` · ${enemy.offhand.name}` : ""}
        </div>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {foeSkills.map(s => {
            const e = ELEMENTS[s.el];
            return (
              <div key={s.id} className="rounded-sm border px-2 py-1" style={{ borderColor: "#3A3356" }}>
                <div className="text-xs font-mono flex justify-between">
                  <span>{s.name}</span>
                  <span style={{ color: e.color }}>{e.icon}</span>
                </div>
                <div className="text-xs font-mono" style={{ color: "#5A5478" }}>
                  {s.dmg ? `${s.dmg} dmg` : s.shield ? `Shield ${s.shield}` : s.restore ? `+${s.restore} mana` : ""}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button onClick={() => openChat(enemy)} className="flex-1 rounded-md border py-1.5 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#14112A" }}>
            💬 Chat
          </button>
          <button onClick={() => addFriend(enemy)} disabled={friended} className="flex-1 rounded-md border py-1.5 font-mono text-xs" style={{ borderColor: friended ? "#72C063" : "#3A3356", color: friended ? "#72C063" : "#B7AE95", background: "#14112A" }}>
            {friended ? "✓ Friend" : "+ Add Friend"}
          </button>
        </div>
      </div>
    );
    return (
      <div className="min-h-screen relative flex flex-col" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 flex-1 flex flex-col items-center px-4 pt-4 pb-28">
          <div className="w-full max-w-md flex-1 flex flex-col">
            <h1 className="font-serif text-2xl text-center" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>Scouting Report</h1>
            <p className="text-center text-xs font-mono mb-1" style={{ color: "#B7AE95" }}>Adjust your loadout to counter what you see below</p>
            {renderCharacterPreview(scoutCard)}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 p-3 flex justify-center gap-2" style={{ background: "linear-gradient(transparent, #0A0814 40%)" }}>
          <div className="w-full max-w-md flex gap-2">
            <button onClick={findOpponent} className="flex-1 rounded-md border py-3 font-serif" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
              Seek Another Foe
            </button>
            <button onClick={confirmDuel} className="flex-1 rounded-md border py-3 font-serif text-lg"
              style={{ borderColor: "#E8B44F", background: "linear-gradient(180deg, #E8B44F, #C9902E)", color: "#100E1F", boxShadow: "0 0 20px #E8B44F55" }}>
              Engage
            </button>
          </div>
        </div>

        {renderGearModal()}
        {renderChatModal()}
      </div>
    );
  }

  // ================= RESULT =================
  if (phase === "result") {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 text-center max-w-sm w-full">
          <h1 className="font-serif text-4xl mb-2" style={{ color: result === "win" ? "#E8B44F" : "#FF6B3D", textShadow: result === "win" ? "0 0 24px #E8B44F55" : "none" }}>
            {result === "win" ? "Victory" : "Defeat"}
          </h1>
          <p className="font-mono text-sm mb-5" style={{ color: "#B7AE95" }}>
            {result === "win" ? `${enemy.name} yields.` : `${enemy.name} stands over you. Adjust your build and return.`}
          </p>

          {loot && (
            <div className="rounded-md border p-4 mb-5 relative overflow-hidden lootShine"
              style={{ borderColor: RARITY[loot.rarity].color, background: "#1C1833", boxShadow: RARITY[loot.rarity].glow }}>
              <div className="text-xs font-mono mb-1" style={{ color: RARITY[loot.rarity].color }}>✦ {RARITY[loot.rarity].label} drop ✦</div>
              <div className="font-serif text-2xl" style={{ color: "#F2EAD8" }}>{loot.name}</div>
              {loot.desc && <div className="text-xs font-mono mt-1" style={{ color: "#B7AE95" }}>{loot.desc}</div>}
              <div className="text-xs font-mono mt-2" style={{ color: "#5A5478" }}>Unlocked in your collection · tradeable in the full game</div>
            </div>
          )}
          {result === "win" && !loot && <p className="text-xs font-mono mb-5" style={{ color: "#5A5478" }}>Your collection is complete, Archmage.</p>}

          <div className="flex gap-2">
            <button onClick={findOpponent} className="flex-1 rounded-md border py-3 font-serif" style={{ borderColor: "#E8B44F", color: "#E8B44F", background: "#1C1833" }}>
              Next Foe
            </button>
            <button onClick={() => setPhase("loadout")} className="flex-1 rounded-md border py-3 font-serif" style={{ borderColor: "#3A3356", color: "#F2EAD8", background: "#1C1833" }}>
              Loadout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= BATTLE =================
  const menuSkills = [...player.skills, FOCUS];
  const panel = { borderColor: "#3A3356", background: "linear-gradient(180deg, #221D3E, #1A1630)" };
  return (
    <div className="min-h-screen relative flex justify-center p-3" style={{ color: "#F2EAD8" }}>
      {styles}{bg}
      <div className="relative z-10 w-full max-w-md flex flex-col">
        <div className="relative">
        {/* Enemy */}
        <div className="rounded-md border p-3 mb-2 flex gap-3 items-center relative" style={panel}>
          {floats.filter(f => f.side === "e").map(f => (
            <span key={f.id} className="dmgFloat font-mono absolute" style={{ left: `${f.left}%`, top: 8, color: f.color, fontSize: f.big ? 24 : 17, fontWeight: 700, textShadow: "0 1px 3px #000", zIndex: 5 }}>{f.text}</span>
          ))}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-serif">{enemy.name}</span>
              <ElementBadge el={enemy.affinity} />
              <StatusIcons mage={enemy} />
            </div>
            <div className="text-xs font-mono mb-1" style={{ color: RARITY[enemy.staffGear.rarity].color }}>{enemy.staffGear.name}{enemy.relic ? ` · ${enemy.relic.name}` : ""}{enemy.offhand ? ` · ${enemy.offhand.name}` : ""}</div>
            <Bar value={enemy.hp} max={enemy.maxHp} color="#72C063" label="HP" />
            <Bar value={enemy.mana} max={MAX_MANA} color="#5FC1E8" label="Mana" />
          </div>
          <MageSprite mage={enemy} facing="left" hurt={hurtE} casting={castE} size={1.05} />
        </div>

        {/* Player */}
        <div className="rounded-md border p-3 mb-2 flex gap-3 items-center relative" style={panel}>
          {floats.filter(f => f.side === "p").map(f => (
            <span key={f.id} className="dmgFloat font-mono absolute" style={{ right: `${f.left}%`, top: 8, color: f.color, fontSize: f.big ? 24 : 17, fontWeight: 700, textShadow: "0 1px 3px #000", zIndex: 5 }}>{f.text}</span>
          ))}
          <MageSprite mage={player} facing="right" hurt={hurtP} casting={castP} size={1.05} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-serif" style={{ color: "#E8B44F" }}>{player.name}</span>
              <ElementBadge el={player.affinity} />
              <StatusIcons mage={player} />
            </div>
            <div className="text-xs font-mono mb-1" style={{ color: player.staffGear ? RARITY[player.staffGear.rarity].color : "#5A5478" }}>{player.staffGear?.name || "No staff"}{player.relic ? ` · ${player.relic.name}` : ""}{player.offhand ? ` · ${player.offhand.name}` : ""}</div>
            <Bar value={player.hp} max={player.maxHp} color="#72C063" label="HP" />
            <Bar value={player.mana} max={MAX_MANA} color="#5FC1E8" label="Mana" />
          </div>
        </div>

        {projectiles.map(pr => {
          const c = ELEMENTS[pr.el].color;
          return (
            <span key={pr.id} className={`projectile ${pr.fromSide === "p" ? "projectile-up" : "projectile-down"}`}
              style={{ background: `radial-gradient(circle, #FFFFFF 0%, ${c} 55%, ${c}00 100%)`, boxShadow: `0 0 14px 4px ${c}AA` }} />
          );
        })}
        </div>

        {/* Log */}
        <div ref={logRef} className="rounded-md border p-3 mb-2 font-mono text-sm overflow-y-auto"
          style={{ borderColor: "#E8B44F", background: "#0B0A16DD", height: "104px" }}>
          {log.map((l, i) => <div key={i} className={i === log.length - 1 ? "" : "opacity-60"}>▸ {l}</div>)}
        </div>

        {/* Menu */}
        <div className="grid grid-cols-2 gap-2">
          {menuSkills.map(s => {
            const e = ELEMENTS[s.el];
            const onCd = player.cds[s.id] > 0;
            const noMana = player.mana < s.mana;
            const disabled = busy || onCd || noMana;
            return (
              <button key={s.id} onClick={() => playerAction(s)} disabled={disabled}
                className="rounded-md border p-2 text-left font-mono text-sm"
                style={{ borderColor: disabled ? "#3A3356" : e.color, background: disabled ? "#14112A" : "#1C1833", color: disabled ? "#5A5478" : "#F2EAD8", opacity: busy ? 0.7 : 1 }}>
                <div className="flex justify-between">
                  <span>{s.name}</span>
                  <span style={{ color: disabled ? "#5A5478" : e.color }}>{e.icon}</span>
                </div>
                <div className="text-xs" style={{ color: "#B7AE95" }}>
                  {onCd ? `Cooldown ${player.cds[s.id]}` : noMana && s.mana > 0 ? "Not enough mana" :
                    s.dmg ? `${s.dmg} dmg · ${s.mana} mana` :
                    s.shield ? `Shield ${s.shield} · ${s.mana} mana` :
                    s.restore ? `+${s.restore} mana` : ""}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs font-mono mt-2" style={{ color: "#5A5478" }}>+{REGEN} mana/turn (+gear) · heavy spells can Burn 🔥, Chill ❄ or Entangle</p>

        <div className="flex justify-center mt-2">
          {confirmSurrender ? (
            <div className="flex gap-2 items-center">
              <span className="text-xs font-mono" style={{ color: "#B7AE95" }}>Forfeit the duel?</span>
              <button onClick={surrender} disabled={busy} className="rounded-md border px-3 py-1 font-mono text-xs" style={{ borderColor: "#FF6B3D", color: "#FF6B3D", background: "#1C1833" }}>
                Yes, surrender
              </button>
              <button onClick={() => setConfirmSurrender(false)} className="rounded-md border px-3 py-1 font-mono text-xs" style={{ borderColor: "#3A3356", color: "#B7AE95", background: "#1C1833" }}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmSurrender(true)} disabled={busy} className="font-mono text-xs underline" style={{ color: "#5A5478" }}>
              Surrender
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
