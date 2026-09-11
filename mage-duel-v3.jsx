import { useState, useRef, useEffect, useMemo } from "react";

// ================= GAME DATA =================
const ELEMENTS = {
  fire:   { name: "Fire",   color: "#FF6B3D", icon: "▲" },
  ice:    { name: "Ice",    color: "#5FC1E8", icon: "◆" },
  nature: { name: "Nature", color: "#72C063", icon: "❋" },
  arcane: { name: "Arcane", color: "#B07FF5", icon: "✶" },
};
const STRONG_VS = { fire: "nature", nature: "ice", ice: "fire" };

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

const START_OWNED = ["ashwood", "frostbound", "manapearl", "wardsigil", "none", "hat_pointed", "hat_hood", "aura_none", "aura_ember"];
const LOOTABLE = ["verdant", "voidglass", "sunfire", "foxcharm", "phoenix", "hat_wide", "hat_crown", "aura_frost", "aura_void", "aura_radiant"];
const findItem = (id) => [...STAFFS, ...RELICS, ...HATS, ...AURAS].find(i => i.id === id);

const MAX_HP = 100, MAX_MANA = 60, REGEN = 6, BASE_CRIT = 8;
const AFFINITY_BONUS = 1.25, STRONG = 1.5, WEAK = 0.66;
const ENEMY_NAMES = ["Morwen the Ashen", "Sylra Frostcall", "Bramblewick", "Vex of the Veil", "Ondrel Pyre", "Nissa Thornheart"];

const rand = (a, b) => Math.random() * (b - a) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const chance = (pct) => Math.random() * 100 < pct;

function effectiveness(attackEl, defAffinity) {
  if (STRONG_VS[attackEl] === defAffinity) return STRONG;
  if (STRONG_VS[defAffinity] === attackEl) return WEAK;
  return 1;
}

function computeDamage(skill, atk, def) {
  const aff = skill.el === atk.affinity ? AFFINITY_BONUS : 1;
  const eff = effectiveness(skill.el, def.affinity);
  let mult = aff * eff;
  if (atk.staffGear) {
    if (atk.staffGear.el === skill.el && atk.staffGear.elBonus) mult *= 1 + atk.staffGear.elBonus;
    if (atk.staffGear.allDmg) mult *= 1 + atk.staffGear.allDmg;
  }
  let chilled = false;
  if (atk.status.chill) { mult *= 0.7; chilled = true; }
  const critChance = BASE_CRIT + (atk.staffGear?.crit || 0) + (atk.relic?.crit || 0);
  const crit = chance(critChance);
  if (crit) mult *= 1.6;
  const dmg = Math.round(skill.dmg * mult * rand(0.92, 1.08));
  return { dmg, eff, crit, chilled };
}

function makeMage(name, affinity, skills, staffId, relicId, hatId, auraId) {
  return {
    name, affinity, skills,
    staffGear: STAFFS.find(s => s.id === staffId) || null,
    relic: RELICS.find(r => r.id === relicId && r.id !== "none") || null,
    hat: hatId, aura: auraId,
    hp: MAX_HP, mana: MAX_MANA, shield: 0, cds: {},
    status: { burn: 0, chill: false }, phoenixUsed: false,
  };
}

function makeEnemy() {
  const affinity = pick(Object.keys(ELEMENTS));
  const own = SKILLS.filter(s => s.el === affinity && s.dmg > 0);
  const loadout = [...own.slice(0, 2)];
  while (loadout.length < 4) { const s = pick(SKILLS); if (!loadout.includes(s)) loadout.push(s); }
  const e = makeMage(pick(ENEMY_NAMES), affinity, loadout, pick(STAFFS).id, Math.random() < 0.6 ? pick(RELICS.filter(r => r.id !== "none")).id : "none", pick(HATS).id, pick(AURAS).id);
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

function Base({ p }) {
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
      <circle cx="131" cy="330" r="13" fill={SKIN} />
      <path d="M248 246 C 274 258 298 280 310 300 C 306 316 290 322 276 318 C 262 298 250 272 240 256 Z" fill={p.dark} />
      <circle cx="146" cy="176" r="10" fill={SKIN} />
      <circle cx="254" cy="176" r="10" fill={SKIN} />
      <circle cx="200" cy="170" r="56" fill={SKIN} />
      <path d="M150 184 C 145 234 158 268 200 279 C 242 268 255 234 250 184 C 236 200 220 207 200 207 C 180 207 164 200 150 184 Z" fill={BEARD} />
      <path d="M200 279 C 228 270 244 246 249 214 C 246 250 230 268 200 272 Z" fill={BEARD_D} />
      <ellipse cx="200" cy="189" rx="12" ry="10" fill={SKIN_D} />
      <ellipse cx="197" cy="186" rx="5" ry="4" fill={SKIN} opacity="0.6" />
      <path d="M168 199 C 178 190 192 188 200 195 C 208 188 222 190 232 199 C 226 211 208 213 200 206 C 192 213 174 211 168 199 Z" fill="#FFFFFF" />
      <circle cx="178" cy="165" r="7" fill="#FFFFFF" />
      <circle cx="222" cy="165" r="7" fill="#FFFFFF" />
      <circle cx="180" cy="166" r="3.8" fill="#2B2430" />
      <circle cx="220" cy="166" r="3.8" fill="#2B2430" />
      <circle cx="181.5" cy="164.5" r="1.3" fill="#FFFFFF" />
      <circle cx="221.5" cy="164.5" r="1.3" fill="#FFFFFF" />
      <rect x="166" y="149" width="26" height="8" rx="4" fill={BEARD} transform="rotate(-6 179 153)" />
      <rect x="208" y="149" width="26" height="8" rx="4" fill={BEARD} transform="rotate(6 221 153)" />
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
  const p = ART[mage.affinity];
  const aura = AURAS.find(a => a.id === mage.aura);
  const Hat = HAT_COMPONENTS[mage.hat];
  const Staff = mage.staffGear ? STAFF_COMPONENTS[mage.staffGear.id] : null;
  const w = 96 * size, h = 120 * size;
  return (
    <div className={hurt ? "shake" : casting ? "cast" : "idle"} style={{ position: "relative", width: w, height: h, flexShrink: 0 }}>
      {aura?.color && (
        <div className="auraPulse" style={{
          position: "absolute", inset: `${4 * size}px`, borderRadius: "50%",
          background: `radial-gradient(circle, ${aura.color}66 0%, ${aura.color}22 55%, transparent 75%)`,
        }} />
      )}
      <svg width={w} height={h} viewBox="0 0 400 500" style={{ position: "relative", transform: facing === "left" ? "scaleX(-1)" : "none", filter: casting ? "brightness(1.25)" : "none" }}>
        <Base p={p} />
        {Staff && <Staff />}
        {Staff && <HandGrip />}
        {Hat && <Hat p={p} />}
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
  const [phase, setPhase] = useState("loadout");
  const [tab, setTab] = useState("skills");
  const [affinity, setAffinity] = useState("fire");
  const [chosen, setChosen] = useState(["fireball", "emberjab", "ward", "surge"]);
  const [staffId, setStaffId] = useState("ashwood");
  const [relicId, setRelicId] = useState("wardsigil");
  const [hatId, setHatId] = useState("hat_pointed");
  const [auraId, setAuraId] = useState("aura_ember");
  const [owned, setOwned] = useState(new Set(START_OWNED));

  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const [hurtP, setHurtP] = useState(false);
  const [hurtE, setHurtE] = useState(false);
  const [castP, setCastP] = useState(false);
  const [castE, setCastE] = useState(false);
  const [floats, setFloats] = useState([]);
  const [result, setResult] = useState(null);
  const [loot, setLoot] = useState(null);
  const logRef = useRef(null);
  const floatId = useRef(0);

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

  function toggleSkill(id) {
    setChosen(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 4 ? [...c, id] : c);
  }

  function startBattle() {
    const p = makeMage("You", affinity, chosen.map(id => SKILLS.find(s => s.id === id)), staffId, relicId, hatId, auraId);
    if (p.relic?.startShield) p.shield = p.relic.startShield;
    const e = makeEnemy();
    setPlayer(p); setEnemy(e); setResult(null); setLoot(null);
    setLog([
      `${e.name} challenges you!`,
      `Foe: ${ELEMENTS[e.affinity].name} affinity · ${e.staffGear.name}${e.relic ? " · " + e.relic.name : ""}`,
    ]);
    setPhase("battle"); setBusy(false);
  }

  function applySkill(skill, attacker, defender, side) {
    const lines = [];
    const a = { ...attacker, status: { ...attacker.status }, cds: { ...attacker.cds } };
    const d = { ...defender, status: { ...defender.status }, cds: { ...defender.cds } };
    a.mana -= skill.mana;
    if (skill.cd) a.cds[skill.id] = skill.cd + 1;
    lines.push(`${a.name === "You" ? "You cast" : a.name + " casts"} ${skill.name}!`);

    if (skill.restore) { a.mana = Math.min(MAX_MANA, a.mana + skill.restore); lines.push(`+${skill.restore} mana.`); }
    if (skill.shield) { a.shield += skill.shield; lines.push(`A ward absorbs the next ${skill.shield} damage.`); }

    let didDamage = false;
    if (skill.dmg) {
      const { dmg, eff, crit, chilled } = computeDamage(skill, a, d);
      if (chilled) { a.status.chill = false; lines.push("The chill dampens the spell..."); }
      let remaining = dmg;
      if (d.shield > 0) {
        const absorbed = Math.min(d.shield, remaining);
        d.shield -= absorbed; remaining -= absorbed;
        lines.push(`The ward absorbs ${absorbed}!`);
      }
      d.hp -= remaining;
      didDamage = true;
      const effTxt = eff > 1 ? "Super effective! " : eff < 1 ? "Not very effective... " : "";
      lines.push(`${crit ? "CRITICAL HIT! " : ""}${effTxt}${remaining} damage.`);
      addFloat(side === "p" ? "e" : "p", `-${remaining}`, crit ? "#E8B44F" : eff > 1 ? "#FF6B3D" : "#F2EAD8", crit);

      const heavy = skill.dmg >= 20;
      if (heavy && skill.el === "fire" && chance(25 + (a.staffGear?.burnChance || 0))) {
        d.status.burn = 3; lines.push(`${d.name === "You" ? "You are" : "The foe is"} Burning! (4 dmg × 3 turns)`);
      }
      if (heavy && skill.el === "ice" && chance(30)) {
        d.status.chill = true; lines.push("Chilled! Next attack weakened 30%.");
      }
      if (heavy && skill.el === "nature" && chance(30)) {
        d.mana = Math.max(0, d.mana - 8); lines.push("Entangled! Foe loses 8 mana.");
      }
      if (skill.heal) {
        const h = Math.round(skill.heal * (1 + (a.staffGear?.healBonus || 0)));
        a.hp = Math.min(MAX_HP, a.hp + h);
        lines.push(`Drained ${h} HP.`);
        addFloat(side, `+${h}`, "#72C063", false);
      }
      if (d.hp <= 0 && d.relic?.revive && !d.phoenixUsed) {
        d.hp = 20; d.phoenixUsed = true;
        lines.push(`${d.name === "You" ? "Your" : "The foe's"} Phoenix Feather blazes — risen at 20 HP!`);
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
      let v = s.dmg * (s.el === e.affinity ? AFFINITY_BONUS : 1) * effectiveness(s.el, p.affinity);
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

  function playerAction(skill) {
    if (busy || phase !== "battle") return;
    setBusy(true);
    let p = player, e = enemy;

    setCastP(true); setTimeout(() => setCastP(false), 600);
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
      @keyframes shakeAnim { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(3px)} }
      .shake { animation: shakeAnim 0.45s ease; }
      @keyframes castAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .cast { animation: castAnim 0.55s ease; }
      @keyframes idleAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      .idle { animation: idleAnim 2.4s ease-in-out infinite; }
      @keyframes auraAnim { 0%,100%{opacity:0.9; transform:scale(1)} 50%{opacity:0.5; transform:scale(1.08)} }
      .auraPulse { animation: auraAnim 2.2s ease-in-out infinite; }
      @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.8} }
      @keyframes floatUp { 0%{opacity:1; transform:translateY(0)} 100%{opacity:0; transform:translateY(-34px)} }
      .dmgFloat { animation: floatUp 0.95s ease-out forwards; }
      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      .lootShine { background: linear-gradient(110deg, transparent 35%, #FFFFFF22 50%, transparent 65%); background-size: 200% 100%; animation: shimmer 2.2s linear infinite; }
      @media (prefers-reduced-motion: reduce) { .shake,.cast,.idle,.auraPulse,.dmgFloat,.lootShine { animation: none; } }
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

  // ================= LOADOUT =================
  if (phase === "loadout") {
    const previewMage = { affinity, hat: hatId, aura: auraId, staffGear: STAFFS.find(s => s.id === staffId), status: {} };
    return (
      <div className="min-h-screen relative" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 p-4 flex justify-center">
          <div className="w-full max-w-md pb-24">
            <h1 className="font-serif text-3xl text-center mt-1" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>Mage Duel</h1>
            <p className="text-center text-xs font-mono mb-3" style={{ color: "#B7AE95" }}>Fire ▲ beats Nature ❋ beats Ice ◆ beats Fire</p>

            <div className="flex justify-center mb-3">
              <MageSprite mage={previewMage} facing="right" size={1.5} />
            </div>

            <div className="grid grid-cols-3 gap-1 mb-3">
              {[["skills", "Skills"], ["gear", "Gear"], ["style", "Style"]].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} className="rounded-md border py-2 font-serif"
                  style={{ borderColor: tab === k ? "#E8B44F" : "#3A3356", background: tab === k ? "#E8B44F1F" : "#1C1833", color: tab === k ? "#E8B44F" : "#B7AE95" }}>
                  {label}
                </button>
              ))}
            </div>

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
                <div className="grid gap-2">
                  {RELICS.map(r => (
                    <RarityCard key={r.id} item={r} selected={relicId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRelicId(r.id)} />
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
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Aura <span style={{ color: "#B7AE95" }}>(cosmetic)</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {AURAS.map(a => (
                    <RarityCard key={a.id} item={a} selected={auraId === a.id} locked={!owned.has(a.id)} onClick={() => owned.has(a.id) && setAuraId(a.id)} subtitle=" " />
                  ))}
                </div>
                <p className="text-xs font-mono mt-3" style={{ color: "#5A5478" }}>Locked items drop from victories. In the full game, they're tradeable with other players.</p>
              </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 z-20 p-3 flex justify-center" style={{ background: "linear-gradient(transparent, #0A0814 40%)" }}>
              <button onClick={startBattle} disabled={chosen.length !== 4}
                className="w-full max-w-md rounded-md border py-3 font-serif text-xl"
                style={{ borderColor: "#E8B44F", background: chosen.length === 4 ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: chosen.length === 4 ? "#100E1F" : "#3A3356", boxShadow: chosen.length === 4 ? "0 0 20px #E8B44F55" : "none" }}>
                Begin the Duel
              </button>
            </div>
          </div>
        </div>
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
            <button onClick={startBattle} className="flex-1 rounded-md border py-3 font-serif" style={{ borderColor: "#E8B44F", color: "#E8B44F", background: "#1C1833" }}>
              Rematch
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
            <div className="text-xs font-mono mb-1" style={{ color: RARITY[enemy.staffGear.rarity].color }}>{enemy.staffGear.name}{enemy.relic ? ` · ${enemy.relic.name}` : ""}</div>
            <Bar value={enemy.hp} max={MAX_HP} color="#72C063" label="HP" />
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
              <span className="font-serif" style={{ color: "#E8B44F" }}>You</span>
              <ElementBadge el={player.affinity} />
              <StatusIcons mage={player} />
            </div>
            <div className="text-xs font-mono mb-1" style={{ color: player.staffGear ? RARITY[player.staffGear.rarity].color : "#5A5478" }}>{player.staffGear?.name || "No staff"}{player.relic ? ` · ${player.relic.name}` : ""}</div>
            <Bar value={player.hp} max={MAX_HP} color="#72C063" label="HP" />
            <Bar value={player.mana} max={MAX_MANA} color="#5FC1E8" label="Mana" />
          </div>
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
            const eff = s.dmg ? effectiveness(s.el, enemy.affinity) : 1;
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
                    s.dmg ? `${s.dmg} dmg · ${s.mana} mana${eff > 1 ? " · strong!" : eff < 1 ? " · weak" : ""}` :
                    s.shield ? `Shield ${s.shield} · ${s.mana} mana` :
                    s.restore ? `+${s.restore} mana` : ""}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs font-mono mt-2" style={{ color: "#5A5478" }}>+{REGEN} mana/turn (+gear) · heavy spells can Burn 🔥, Chill ❄ or Entangle</p>
      </div>
    </div>
  );
}
