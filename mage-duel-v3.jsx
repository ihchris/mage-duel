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

// ================= SKINS COSMÉTICAS (100% ANTI PAY-TO-WIN) =================
// REGRAS INVIOLÁVEIS: NENHUMA skin possui atributos de combate (sem dano, sem bônus, sem crítico).
// O servidor autoritativo valida que o inventário cosmético não altera os atributos de combate.
const SKINS = [
  {
    id: "skin_emberjab_verdant",
    name: "Verdant Ember",
    rarity: "common",
    price: 0,
    priceType: "rewarded_ad",
    targetSkill: "emberjab",
    visual: {
      projectileColor: "#4ADE80",
      trailColor: "#15803D",
      impactColor: "#86EFAC",
      particleShape: "leaf",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="18" fill="#15803D" opacity="0.3" className="animate-pulse" />
        <circle cx="30" cy="30" r="10" fill="#4ADE80" opacity="0.7" />
        <path d="M30 18 C38 22 40 32 30 42 C20 32 22 22 30 18 Z" fill="#22C55E" />
        <path d="M30 20 L30 40" stroke="#DCFCE7" strokeWidth="1.5" />
      </svg>
    ),
    desc: "Faíscas verdes infundidas com a essência primal da floresta. Desbloqueável grátis via anúncio.",
  },
  {
    id: "skin_iceshard_amethyst",
    name: "Amethyst Shards",
    rarity: "common",
    price: 0,
    priceType: "rewarded_ad",
    targetSkill: "iceshard",
    visual: {
      projectileColor: "#C084FC",
      trailColor: "#7E22CE",
      impactColor: "#F3E8FF",
      particleShape: "star",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <polygon points="30,12 36,24 48,24 38,32 42,44 30,36 18,44 22,32 12,24 24,24" fill="#C084FC" className="animate-pulse" />
        <polygon points="30,18 34,26 42,26 36,31 38,39 30,34 22,39 24,31 18,26 26,26" fill="#F3E8FF" />
      </svg>
    ),
    desc: "Fragmentos de gelo cristalizados em ametista pura do submundo. Desbloqueável grátis via anúncio.",
  },
  {
    id: "skin_fireball_frostfire",
    name: "Frostfire Orb",
    rarity: "rare",
    price: 120,
    priceType: "premium",
    targetSkill: "fireball",
    visual: {
      projectileColor: "#38BDF8",
      trailColor: "#0284C7",
      impactColor: "#BAE6FD",
      particleShape: "spark",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="18" fill="url(#prevFrostFire)" className="animate-pulse" />
        <circle cx="30" cy="30" r="10" fill="#E0F2FE" opacity="0.7" />
        <defs>
          <radialGradient id="prevFrostFire">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
        </defs>
      </svg>
    ),
    desc: "Chamas azuis geladas que desafiam as leis elementais da termodinâmica.",
  },
  {
    id: "skin_frostlance_crimson",
    name: "Bloodfrost Lance",
    rarity: "rare",
    price: 150,
    priceType: "premium",
    targetSkill: "frostlance",
    visual: {
      projectileColor: "#EF4444",
      trailColor: "#991B1B",
      impactColor: "#FECACA",
      particleShape: "spark",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <polygon points="30,8 38,30 30,52 22,30" fill="#EF4444" stroke="#FCA5A5" strokeWidth="1.5" className="animate-pulse" />
        <line x1="30" y1="12" x2="30" y2="48" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    ),
    desc: "Gelo glacial rubi forjado nas geleiras carmesim do norte.",
  },
  {
    id: "skin_bolt_solar",
    name: "Solar Ray Bolt",
    rarity: "rare",
    price: 140,
    priceType: "premium",
    targetSkill: "bolt",
    visual: {
      projectileColor: "#F59E0B",
      trailColor: "#D97706",
      impactColor: "#FEF3C7",
      particleShape: "star",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="14" fill="#F59E0B" className="animate-pulse" />
        <polygon points="30,10 34,26 50,30 34,34 30,50 26,34 10,30 26,26" fill="#FEF3C7" className="animate-spin" style={{ animationDuration: "8s" }} />
      </svg>
    ),
    desc: "Disparo arcano banhado no brilho dourado de uma supernova solar.",
  },
  {
    id: "skin_fireball_void",
    name: "Void Fireball",
    rarity: "epic",
    price: 250,
    priceType: "premium",
    targetSkill: "fireball",
    visual: {
      projectileColor: "#A855F7",
      trailColor: "#581C87",
      impactColor: "#E9D5FF",
      particleShape: "star",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="18" fill="url(#prevVoidFire)" className="animate-pulse" />
        <circle cx="30" cy="30" r="12" fill="none" stroke="#E9D5FF" strokeWidth="1.5" strokeDasharray="4 3" className="animate-spin" />
        <circle cx="30" cy="30" r="5" fill="#FFFFFF" />
        <defs>
          <radialGradient id="prevVoidFire">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#C084FC" />
            <stop offset="90%" stopColor="#3B0764" />
          </radialGradient>
        </defs>
      </svg>
    ),
    desc: "Uma bola de fogo arcana que arde em tons misteriosos do vazio cósmico.",
  },
  {
    id: "skin_thorns_celestial",
    name: "Celestial Briar",
    rarity: "epic",
    price: 280,
    priceType: "premium",
    targetSkill: "thorns",
    visual: {
      projectileColor: "#38BDF8",
      trailColor: "#6366F1",
      impactColor: "#E0E7FF",
      particleShape: "star",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M18 42 Q30 18 42 42" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
        <circle cx="24" cy="28" r="3" fill="#818CF8" />
        <circle cx="36" cy="28" r="3" fill="#818CF8" />
        <circle cx="30" cy="22" r="4" fill="#FFFFFF" />
      </svg>
    ),
    desc: "Gavinhas etéreas tecidas com poeira estelar e luz zodiacal cintilante.",
  },
  {
    id: "skin_ward_chronos",
    name: "Chronos Temporal Ward",
    rarity: "epic",
    price: 300,
    priceType: "premium",
    targetSkill: "ward",
    visual: {
      projectileColor: "#EAB308",
      trailColor: "#854D0E",
      impactColor: "#FEF08A",
      particleShape: "circle",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <polygon points="30,12 48,22 48,42 30,52 12,42 12,22" fill="none" stroke="#EAB308" strokeWidth="2" className="animate-spin" style={{ animationDuration: "10s" }} />
        <circle cx="30" cy="30" r="10" fill="#FEF08A" opacity="0.6" className="animate-pulse" />
      </svg>
    ),
    desc: "Barreira temporal com runas douradas inspiradas em relógios cósmicos.",
  },
  {
    id: "skin_saplife_golden",
    name: "Gilded Transmutation",
    rarity: "legendary",
    price: 600,
    priceType: "premium",
    targetSkill: "saplife",
    visual: {
      projectileColor: "#FBBF24",
      trailColor: "#B45309",
      impactColor: "#FEF3C7",
      particleShape: "spark",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="16" fill="url(#prevGoldSap)" className="animate-pulse" />
        <text x="30" y="36" textAnchor="middle" fontSize="14" fill="#78350F" fontWeight="bold">✦</text>
        <defs>
          <radialGradient id="prevGoldSap">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
        </defs>
      </svg>
    ),
    desc: "Drena a essência vital em partículas de puro ouro alquímico resplandecente.",
  },
  {
    id: "skin_surge_starlight",
    name: "Cosmic Genesis Surge",
    rarity: "legendary",
    price: 750,
    priceType: "premium",
    targetSkill: "surge",
    visual: {
      projectileColor: "#EC4899",
      trailColor: "#831843",
      impactColor: "#FDF2F8",
      particleShape: "star",
    },
    preview: () => (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="18" fill="url(#prevPinkSurge)" className="animate-pulse" />
        <polygon points="30,8 35,25 52,30 35,35 30,52 25,35 8,30 25,25" fill="#FFFFFF" opacity="0.8" className="animate-spin" style={{ animationDuration: "6s" }} />
        <defs>
          <radialGradient id="prevPinkSurge">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#700738" />
          </radialGradient>
        </defs>
      </svg>
    ),
    desc: "Pilar de mana iridescente com constelações cósmicas e poeira nebulosa.",
  },
];

const STRIPE_PACKAGES = [
  { id: "pack_100", shards: 100, priceBRL: "R$ 4,99", badge: null },
  { id: "pack_500", shards: 500, priceBRL: "R$ 19,99", badge: "Mais Popular (+25% Bônus)" },
  { id: "pack_1200", shards: 1200, priceBRL: "R$ 39,99", badge: "Melhor Valor (+50% Bônus)" },
];

// ================= SERVIDOR AUTORITATIVO & API LAYER (MOCKADO) =================
// === SERVIDOR (fonte da verdade) ===
// Em produção com WebSocket + Node.js, este estado reside exclusivamente no Redis/Postgres
// do servidor. O cliente React apenas consome eventos de rede via websocket e REST.
const STORAGE_KEYS = {
  SHARDS: "mage_duel_shards_cache",
  OWNED_SKINS: "mage_duel_owned_skins",
  EQUIPPED_SKINS: "mage_duel_equipped_skins",
  STREAK: "mage_duel_win_streak",
};

const mockBackend = {
  getInventory: () => {
    try {
      const shardsRaw = localStorage.getItem(STORAGE_KEYS.SHARDS);
      const ownedRaw = localStorage.getItem(STORAGE_KEYS.OWNED_SKINS);
      const equippedRaw = localStorage.getItem(STORAGE_KEYS.EQUIPPED_SKINS);
      const streakRaw = localStorage.getItem(STORAGE_KEYS.STREAK);

      // Inicia com 600 shards conforme configurado para ambiente de teste
      const shards = shardsRaw !== null ? parseInt(shardsRaw, 10) : 600;
      const ownedSkins = ownedRaw ? JSON.parse(ownedRaw) : ["skin_emberjab_verdant"];
      const equippedSkins = equippedRaw ? JSON.parse(equippedRaw) : {};
      const winStreak = streakRaw ? parseInt(streakRaw, 10) : 0;

      return { shards, ownedSkins, equippedSkins, winStreak };
    } catch {
      return { shards: 600, ownedSkins: ["skin_emberjab_verdant"], equippedSkins: {}, winStreak: 0 };
    }
  },

  // POST /api/shop/purchase
  purchaseSkin: async (skinId) => {
    const inv = mockBackend.getInventory();
    const skin = SKINS.find(s => s.id === skinId);
    if (!skin) return { success: false, error: "Skin não encontrada." };
    if (inv.ownedSkins.includes(skinId)) return { success: false, error: "Skin já adquirida." };

    if (skin.priceType === "rewarded_ad") {
      const nextOwned = [...inv.ownedSkins, skinId];
      localStorage.setItem(STORAGE_KEYS.OWNED_SKINS, JSON.stringify(nextOwned));
      return { success: true, shards: inv.shards, ownedSkins: nextOwned, message: `${skin.name} desbloqueada com sucesso!` };
    }

    if (inv.shards < skin.price) {
      return { success: false, error: "Saldo insuficiente de Arcane Shards (✦)." };
    }

    const nextShards = inv.shards - skin.price;
    const nextOwned = [...inv.ownedSkins, skinId];
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(nextShards));
    localStorage.setItem(STORAGE_KEYS.OWNED_SKINS, JSON.stringify(nextOwned));

    return {
      success: true,
      shards: nextShards,
      ownedSkins: nextOwned,
      message: `${skin.name} comprada por ${skin.price} ✦!`,
    };
  },

  // POST /api/ads/reward
  claimAdReward: async () => {
    const inv = mockBackend.getInventory();
    const nextShards = inv.shards + 50;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(nextShards));
    return { success: true, shards: nextShards, message: "+50 ✦ Arcane Shards recebidos pelo anúncio!" };
  },

  // POST /api/stripe/checkout + webhook
  createStripeCheckoutSession: async (packId) => {
    // TODO: substituir mock por redirect real ao Stripe Checkout:
    // const res = await fetch("/api/stripe/checkout", { method: "POST", body: JSON.stringify({ packId }) });
    // const { checkoutUrl } = await res.json();
    // window.location.href = checkoutUrl;
    const pack = STRIPE_PACKAGES.find(p => p.id === packId);
    if (!pack) return { success: false, error: "Pacote inválido." };

    await new Promise(r => setTimeout(r, 1400)); // Simula latência de rede e confirmação webhook
    const inv = mockBackend.getInventory();
    const nextShards = inv.shards + pack.shards;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(nextShards));

    return { success: true, shards: nextShards, message: `Pagamento Stripe aprovado! +${pack.shards} ✦ adicionados.` };
  },

  // POST /api/me/loadout/cosmetics
  equipSkin: async (skillId, skinId) => {
    const inv = mockBackend.getInventory();
    const nextEquipped = { ...inv.equippedSkins };
    if (!skinId) {
      delete nextEquipped[skillId];
    } else {
      if (!inv.ownedSkins.includes(skinId)) {
        return { success: false, error: "Você não possui esta skin." };
      }
      nextEquipped[skillId] = skinId;
    }
    localStorage.setItem(STORAGE_KEYS.EQUIPPED_SKINS, JSON.stringify(nextEquipped));
    return { success: true, equippedSkins: nextEquipped };
  },

  // Rastreia vitórias e bônus de shards (+5 por vitória, +25 a cada streak de 5)
  recordBattleOutcome: async (won) => {
    const inv = mockBackend.getInventory();
    if (!won) {
      localStorage.setItem(STORAGE_KEYS.STREAK, "0");
      return { won: false, winStreak: 0, shards: inv.shards };
    }

    const nextStreak = inv.winStreak + 1;
    let earned = 5;
    let streakBonus = false;
    if (nextStreak % 5 === 0) {
      earned += 25;
      streakBonus = true;
    }

    const nextShards = inv.shards + earned;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(nextShards));
    localStorage.setItem(STORAGE_KEYS.STREAK, String(nextStreak));

    return { won: true, winStreak: nextStreak, earned, streakBonus, shards: nextShards };
  },
};

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

// VALIDAÇÃO ANTI-P2W: O cálculo de combate JAMAIS recebe ou considera skins cosméticas.
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

// TODO: substituir por matchmaking socket quando backend estiver pronto.
// No servidor autoritativo, o backend pareia dois jogadores reais via WebSocket:
// socket.emit("queue_ranked", { affinity, skills, staffId, relicId, hatId, auraId, equippedSkins })
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
      <circle cx="178" cy="165" r="4" fill="#2B2430" />
      <circle cx="222" cy="165" r="4" fill="#2B2430" />
      <circle cx="176" cy="163" r="1.5" fill="#FFFFFF" />
      <circle cx="220" cy="163" r="1.5" fill="#FFFFFF" />
      <path d="M164 150 C 172 144 186 146 190 152" stroke={BEARD_D} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M236 150 C 228 144 214 146 210 152" stroke={BEARD_D} strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  );
}

function HandGrip() {
  return (
    <g>
      <circle cx="316" cy="330" r="13" fill={SKIN} />
      <ellipse cx="312" cy="326" rx="4" ry="7" fill={SKIN_D} />
    </g>
  );
}

function HatPointed({ p }) {
  return (
    <g>
      <path d="M120 134 C 150 128 250 128 280 134 C 270 148 130 148 120 134 Z" fill={p.dark} />
      <path d="M136 132 C 160 80 190 32 200 12 C 210 32 240 80 264 132 Z" fill={p.robe} />
      <path d="M200 12 C 210 32 240 80 264 132 C 240 130 210 128 200 128 Z" fill={p.dark} />
      <path d="M144 126 C 170 120 230 120 256 126 L 258 132 C 230 126 170 126 142 132 Z" fill={GOLD} />
      <polygon points="200,6 204,14 196,14" fill={GOLD} />
    </g>
  );
}
function HatHood({ p }) {
  return (
    <g>
      <path d="M136 170 C 130 100 156 70 200 68 C 244 70 270 100 264 170 C 252 140 238 126 200 126 C 162 126 148 140 136 170 Z" fill={p.dark} />
      <path d="M144 148 C 162 132 182 126 200 126 C 218 126 238 132 256 148 C 248 136 226 130 200 130 C 174 130 152 136 144 148 Z" fill={GOLD} />
    </g>
  );
}
function HatWide() {
  return (
    <g>
      <ellipse cx="200" cy="132" rx="90" ry="18" fill="#1C1833" />
      <ellipse cx="200" cy="132" rx="84" ry="14" fill="#2B2447" />
      <path d="M148 130 C 160 88 174 62 200 58 C 226 62 240 88 252 130 Z" fill="#1C1833" />
      <ellipse cx="200" cy="126" rx="52" ry="7" fill={GOLD} />
      <circle cx="200" cy="90" r="6" fill="#B07FF5" />
    </g>
  );
}
function HatCrown() {
  return (
    <g>
      <path d="M148 142 L 156 104 L 176 126 L 200 94 L 224 126 L 244 104 L 252 142 Z" fill={GOLD} />
      <path d="M148 142 C 174 136 226 136 252 142 L 252 148 C 226 142 174 142 148 148 Z" fill={GOLD_D} />
      <circle cx="200" cy="116" r="5" fill="#EF4444" />
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

// ================= COMPONENTE VISUAL DE PROJÉTIL (SUPORTA SKINS COSMÉTICAS) =================
function ProjectileVisual({ projectile }) {
  if (!projectile) return null;
  const { skin, el, fromSide } = projectile;

  // Se o jogador tiver uma skin equipada, usa o visual cosmético da skin.
  // Caso contrário, cai nas cores padrões do elemento da skill.
  const pColor = skin?.visual?.projectileColor || ELEMENTS[el].color;
  const tColor = skin?.visual?.trailColor || ELEMENTS[el].color + "88";
  const shape = skin?.visual?.particleShape || "circle";

  return (
    <div
      className={`projectile ${fromSide === "p" ? "projectile-up" : "projectile-down"}`}
      style={{
        background: `radial-gradient(circle, #FFFFFF 0%, ${pColor} 45%, ${tColor} 85%, transparent 100%)`,
        boxShadow: `0 0 24px 6px ${pColor}, 0 0 42px 14px ${tColor}`,
      }}
    >
      {shape === "star" && (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-white animate-spin">
          ✦
        </div>
      )}
      {shape === "leaf" && (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-white animate-pulse">
          🍃
        </div>
      )}
      {shape === "spark" && (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-white animate-ping">
          ✧
        </div>
      )}
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
      className="rounded-md border p-2 text-left w-full transition-all"
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

// Ribbon Anti-P2W exibido na loja e telas de compra
function AntiP2WBanner() {
  return (
    <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-2.5 mb-3 flex items-center gap-2.5 text-xs font-mono text-emerald-300 shadow-[0_0_15px_#10B98122]">
      <span className="text-base flex-shrink-0">⚔️</span>
      <span className="leading-tight">
        <strong>100% Cosmético:</strong> Nenhuma skin ou compra concede qualquer bônus ou vantagem em combate. O servidor autoritativo valida que ambos os duelistas possuem os mesmos atributos base em partidas ranqueadas.
      </span>
    </div>
  );
}

// ================= MAIN COMPONENT =================
export default function MageDuel() {
  const [phase, setPhase] = useState("loadout");
  const [tab, setTab] = useState("skills"); // "skills" | "gear" | "style" | "shop"
  const [affinity, setAffinity] = useState("fire");
  const [chosen, setChosen] = useState(["fireball", "emberjab", "ward", "surge"]);
  const [staffId, setStaffId] = useState("ashwood");
  const [relicId, setRelicId] = useState("wardsigil");
  const [hatId, setHatId] = useState("hat_pointed");
  const [auraId, setAuraId] = useState("aura_ember");
  const [owned, setOwned] = useState(new Set(START_OWNED));

  // Estado da Loja & Economia (Sincronizado com o Mock Server)
  const [shards, setShards] = useState(() => mockBackend.getInventory().shards);
  const [ownedSkins, setOwnedSkins] = useState(() => mockBackend.getInventory().ownedSkins);
  const [equippedSkins, setEquippedSkins] = useState(() => mockBackend.getInventory().equippedSkins);
  const [winStreak, setWinStreak] = useState(() => mockBackend.getInventory().winStreak);
  const [displaySkins, setDisplaySkins] = useState(true); // Switch de acessibilidade competitiva
  const [shopFilter, setShopFilter] = useState("all"); // "all" | "promo" | "free" | "equipped"
  const [checkoutModal, setCheckoutModal] = useState({ open: false, pack: null, loading: false });
  const [adModal, setAdModal] = useState({ open: false, countdown: 3, loading: false });
  const [toast, setToast] = useState(null);

  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const [hurtP, setHurtP] = useState(false);
  const [hurtE, setHurtE] = useState(false);
  const [castP, setCastP] = useState(false);
  const [castE, setCastE] = useState(false);
  const [floats, setFloats] = useState([]);
  const [activeProjectile, setActiveProjectile] = useState(null);
  const [result, setResult] = useState(null);
  const [loot, setLoot] = useState(null);
  const [battleRewards, setBattleRewards] = useState(null);
  const logRef = useRef(null);
  const floatId = useRef(0);

  const stars = useMemo(() => Array.from({ length: 45 }, () => ({
    left: Math.random() * 100, top: Math.random() * 100,
    size: rand(1, 2.5), delay: rand(0, 4), dur: rand(2.5, 5),
  })), []);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);
  const addLog = (line) => setLog(l => [...l, line]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  function addFloat(side, text, color, big) {
    const id = ++floatId.current;
    setFloats(f => [...f, { id, side, text, color, big, left: rand(20, 60) }]);
    setTimeout(() => setFloats(f => f.filter(x => x.id !== id)), 1000);
  }

  function toggleSkill(id) {
    setChosen(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 4 ? [...c, id] : c);
  }

  // === HANDLERS DA LOJA & SERVIDOR ===
  async function handleBuySkin(skin) {
    const res = await mockBackend.purchaseSkin(skin.id);
    if (res.success) {
      setShards(res.shards);
      setOwnedSkins(res.ownedSkins);
      showToast(res.message);
    } else {
      showToast("❌ " + res.error);
    }
  }

  async function handleEquipSkin(skillId, skinId) {
    const res = await mockBackend.equipSkin(skillId, skinId);
    if (res.success) {
      setEquippedSkins(res.equippedSkins);
      showToast(skinId ? "Skin cosmética equipada!" : "Aparência padrão restaurada.");
    } else {
      showToast("❌ " + res.error);
    }
  }

  // Simula o fluxo de Checkout Stripe
  async function handleConfirmStripePayment() {
    if (!checkoutModal.pack) return;
    setCheckoutModal(m => ({ ...m, loading: true }));
    const res = await mockBackend.createStripeCheckoutSession(checkoutModal.pack.id);
    setCheckoutModal({ open: false, pack: null, loading: false });
    if (res.success) {
      setShards(res.shards);
      showToast(`🎉 ${res.message}`);
    } else {
      showToast("❌ Falha no pagamento: " + res.error);
    }
  }

  // Simula assistir um rewarded ad com countdown de 3s
  function startWatchRewardedAd() {
    setAdModal({ open: true, countdown: 3, loading: false });
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setAdModal(m => ({ ...m, countdown: count }));
      if (count <= 0) {
        clearInterval(interval);
        // Servidor valida o token e credita +50 Shards
        mockBackend.claimAdReward().then(res => {
          setShards(res.shards);
          setAdModal({ open: false, countdown: 3, loading: false });
          showToast(res.message);
        });
      }
    }, 1000);
  }

  function startBattle() {
    // === SERVIDOR: Validação Anti-Cheat Pré-Match ===
    // TODO: implementar validação server-side no handler startBattle():
    // Em produção, o servidor recebe apenas os IDs base { affinity, chosen, staffId, relicId }.
    // O servidor calcula os atributos (HP, Mana, Dano base) e ignora solenemente quaisquer modificadores cosméticos.
    // Skins vão num payload separado "cosmetics" apenas para os clientes renderizarem cores.
    const p = makeMage("You", affinity, chosen.map(id => SKILLS.find(s => s.id === id)), staffId, relicId, hatId, auraId);
    if (p.relic?.startShield) p.shield = p.relic.startShield;
    const e = makeEnemy();
    setPlayer(p); setEnemy(e); setResult(null); setLoot(null); setBattleRewards(null);
    setLog([
      `${e.name} challenges you! (Ranked Duel)`,
      `Foe: ${ELEMENTS[e.affinity].name} affinity · ${e.staffGear.name}${e.relic ? " · " + e.relic.name : ""}`,
    ]);
    setPhase("battle"); setBusy(false);
  }

  // A função applySkill utiliza as regras fixas de combate.
  // Nenhum atributo de skins é lido aqui, garantindo 100% integridade anti-p2w.
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

  async function finishBattle(win) {
    setResult(win ? "win" : "lose");
    if (win) {
      const drop = rollLoot();
      if (drop) { setLoot(findItem(drop)); setOwned(o => new Set([...o, drop])); }
    }

    // Servidor registra resultado ranqueado e credita Shards
    const rewardRes = await mockBackend.recordBattleOutcome(win);
    setBattleRewards(rewardRes);
    setShards(rewardRes.shards);
    setWinStreak(rewardRes.winStreak);

    setTimeout(() => setPhase("result"), 1200);
  }

  function playerAction(skill) {
    if (busy || phase !== "battle") return;
    setBusy(true);
    let p = player, e = enemy;

    setCastP(true); setTimeout(() => setCastP(false), 600);

    // Dispara projétil aplicando a skin equipada do jogador se displaySkins estiver ativo
    if (skill.dmg > 0) {
      const equippedSkinId = displaySkins ? equippedSkins[skill.id] : null;
      const skinObj = equippedSkinId ? SKINS.find(s => s.id === equippedSkinId) : null;
      setActiveProjectile({ skill, el: skill.el, fromSide: "p", skin: skinObj });
      setTimeout(() => setActiveProjectile(null), 500);
    }

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

      // Projétil do oponente (no multiplayer real, carrega a skin do oponente via websocket)
      if (eSkill.dmg > 0) {
        setActiveProjectile({ skill: eSkill, el: eSkill.el, fromSide: "e", skin: null });
        setTimeout(() => setActiveProjectile(null), 500);
      }

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

      /* Animações de Projétil a 60fps usando transform: translate3d */
      @keyframes projectileFlyUp {
        0% { transform: translate3d(-50%, 140px, 0) scale(0.5); opacity: 0; }
        20% { opacity: 1; transform: translate3d(-50%, 100px, 0) scale(1); }
        80% { opacity: 1; transform: translate3d(-50%, -100px, 0) scale(1.1); }
        100% { transform: translate3d(-50%, -140px, 0) scale(1.5); opacity: 0; }
      }
      @keyframes projectileFlyDown {
        0% { transform: translate3d(-50%, -140px, 0) scale(0.5); opacity: 0; }
        20% { opacity: 1; transform: translate3d(-50%, -100px, 0) scale(1); }
        80% { opacity: 1; transform: translate3d(-50%, 100px, 0) scale(1.1); }
        100% { transform: translate3d(-50%, 140px, 0) scale(1.5); opacity: 0; }
      }
      .projectile { position: absolute; left: 50%; top: 50%; width: 28px; height: 28px; border-radius: 50%; z-index: 30; pointer-events: none; will-change: transform, opacity; }
      .projectile-up { animation: projectileFlyUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .projectile-down { animation: projectileFlyDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

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

  // Filtra as skins na aba da loja
  const filteredSkins = SKINS.filter(skin => {
    if (shopFilter === "free") return skin.priceType === "rewarded_ad";
    if (shopFilter === "promo") return skin.rarity === "epic" || skin.rarity === "rare";
    if (shopFilter === "equipped") return Object.values(equippedSkins).includes(skin.id);
    return true;
  });

  // ================= LOADOUT =================
  if (phase === "loadout") {
    const previewMage = { affinity, hat: hatId, aura: auraId, staffGear: STAFFS.find(s => s.id === staffId), status: {} };
    return (
      <div className="min-h-screen relative" style={{ color: "#F2EAD8" }}>
        {styles}{bg}
        <div className="relative z-10 p-4 flex justify-center">
          <div className="w-full max-w-md pb-24">
            
            {/* Header da Loja / Topo com saldo de Arcane Shards */}
            <div className="flex justify-between items-center mb-2 px-1">
              <div>
                <h1 className="font-serif text-3xl" style={{ color: "#E8B44F", textShadow: "0 0 20px #E8B44F44" }}>Mage Duel</h1>
                <p className="text-[11px] font-mono text-[#B7AE95]">Arena de Magos Ranqueada Multiplayer</p>
              </div>

              {/* Saldo de Arcane Shards (✦) espelhado do servidor */}
              <div className="flex items-center gap-1.5 bg-[#141126] border border-[#E8B44F66] px-2.5 py-1 rounded-full shadow-[0_0_12px_#E8B44F22]">
                <span className="text-[#E8B44F] font-bold text-sm">✦</span>
                <span className="font-mono text-xs font-bold text-[#F2EAD8]">{shards}</span>
                <button
                  onClick={() => setCheckoutModal({ open: true, pack: STRIPE_PACKAGES[1], loading: false })}
                  title="Comprar Arcane Shards via Stripe"
                  className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#E8B44F] text-[#100E1F] hover:bg-amber-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-center text-xs font-mono mb-3" style={{ color: "#B7AE95" }}>Fire ▲ bate Nature ❋ bate Ice ◆ bate Fire</p>

            <div className="flex justify-center mb-3">
              <MageSprite mage={previewMage} facing="right" size={1.4} />
            </div>

            {/* Menu de Abas de Loadout: [Skills] [Gear] [Style] [Loja ✦] */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {[["skills", "Skills"], ["gear", "Gear"], ["style", "Style"], ["shop", "Loja ✦"]].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} className="rounded-md border py-2 font-serif text-xs sm:text-sm transition-all"
                  style={{ borderColor: tab === k ? "#E8B44F" : "#3A3356", background: tab === k ? "#E8B44F1F" : "#1C1833", color: tab === k ? "#E8B44F" : "#B7AE95" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ABA 1: SKILLS */}
            {tab === "skills" && (
              <div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Afinidade <span style={{ color: "#B7AE95" }}>(+25% dano elemental)</span></p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Object.entries(ELEMENTS).map(([key, e]) => (
                    <button key={key} onClick={() => setAffinity(key)} className="rounded-md border p-2 text-sm font-mono"
                      style={{ borderColor: affinity === key ? e.color : "#3A3356", background: affinity === key ? e.color + "26" : "#1C1833", color: e.color, boxShadow: affinity === key ? `0 0 10px ${e.color}44` : "none" }}>
                      {e.icon}<br />{e.name}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Magias Preparadas <span style={{ color: "#B7AE95" }}>({chosen.length}/4)</span></p>
                <div className="grid grid-cols-1 gap-2">
                  {SKILLS.map(s => {
                    const sel = chosen.includes(s.id);
                    const e = ELEMENTS[s.el];
                    const eqSkinId = equippedSkins[s.id];
                    const eqSkin = eqSkinId ? SKINS.find(sk => sk.id === eqSkinId) : null;
                    return (
                      <button key={s.id} onClick={() => toggleSkill(s.id)} className="rounded-md border p-2 text-left flex items-center justify-between gap-2"
                        style={{ borderColor: sel ? "#E8B44F" : "#3A3356", background: sel ? "#E8B44F14" : "#1C1833" }}>
                        <div>
                          <div className="font-mono text-sm flex items-center gap-1.5">
                            <span>{s.name}</span>
                            <span style={{ color: e.color }}>{e.icon}</span>
                            {eqSkin && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded border border-purple-400 bg-purple-950/60 text-purple-300">
                                ✦ {eqSkin.name}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-mono" style={{ color: "#B7AE95" }}>{s.desc} · {s.mana} mana</div>
                        </div>
                        <span className="font-mono text-lg" style={{ color: sel ? "#E8B44F" : "#3A3356" }}>{sel ? "◉" : "○"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ABA 2: GEAR */}
            {tab === "gear" && (
              <div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Cajado <span style={{ color: "#B7AE95" }}>(equipe 1)</span></p>
                <div className="grid gap-2 mb-4">
                  {STAFFS.map(s => (
                    <RarityCard key={s.id} item={s} selected={staffId === s.id} locked={!owned.has(s.id)} onClick={() => owned.has(s.id) && setStaffId(s.id)} />
                  ))}
                </div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Relíquia <span style={{ color: "#B7AE95" }}>(equipe 1)</span></p>
                <div className="grid gap-2">
                  {RELICS.map(r => (
                    <RarityCard key={r.id} item={r} selected={relicId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRelicId(r.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* ABA 3: STYLE (Cosméticos de Corpo & Magia) */}
            {tab === "style" && (
              <div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Chapéu <span style={{ color: "#B7AE95" }}>(cosmético)</span></p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {HATS.map(h1 => (
                    <RarityCard key={h1.id} item={h1} selected={hatId === h1.id} locked={!owned.has(h1.id)} onClick={() => owned.has(h1.id) && setHatId(h1.id)} subtitle=" " />
                  ))}
                </div>
                <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Aura <span style={{ color: "#B7AE95" }}>(cosmético)</span></p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {AURAS.map(a => (
                    <RarityCard key={a.id} item={a} selected={auraId === a.id} locked={!owned.has(a.id)} onClick={() => owned.has(a.id) && setAuraId(a.id)} subtitle=" " />
                  ))}
                </div>

                {/* Sub-seção de Skins de Magias equipadas */}
                <div className="border-t border-[#3A3356] pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-mono text-sm" style={{ color: "#E8B44F" }}>Skins de Magia Equipadas</p>
                    <button onClick={() => setTab("shop")} className="text-xs font-mono text-[#E8B44F] underline">
                      Abrir Loja ✦
                    </button>
                  </div>
                  <div className="space-y-2">
                    {SKILLS.map(skill => {
                      const curSkinId = equippedSkins[skill.id];
                      const curSkin = curSkinId ? SKINS.find(s => s.id === curSkinId) : null;
                      return (
                        <div key={skill.id} className="rounded-md border border-[#3A3356] p-2 bg-[#1C1833] flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="font-bold text-[#F2EAD8]">{skill.name}: </span>
                            <span style={{ color: curSkin ? RARITY[curSkin.rarity].color : "#B7AE95" }}>
                              {curSkin ? curSkin.name : "Padrão (Original)"}
                            </span>
                          </div>
                          {curSkin ? (
                            <button
                              onClick={() => handleEquipSkin(skill.id, null)}
                              className="px-2 py-0.5 rounded border border-[#3A3356] text-[#B7AE95] hover:border-red-400 hover:text-red-300"
                            >
                              Restaurar Padrão
                            </button>
                          ) : (
                            <button
                              onClick={() => setTab("shop")}
                              className="px-2 py-0.5 rounded border border-[#3A3356] text-[#E8B44F] hover:border-[#E8B44F]"
                            >
                              Trocar Skin
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ABA 4: LOJA DE SKINS COSMÉTICAS (ANTI PAY-TO-WIN) */}
            {tab === "shop" && (
              <div>
                <AntiP2WBanner />

                {/* Painel Superior da Loja: Saldo & Ações de Recarga */}
                <div className="rounded-lg border border-[#3A3356] bg-[#141126] p-3 mb-3">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono text-[#B7AE95]">Seu Saldo:</span>
                      <div className="text-xl font-mono font-bold text-[#E8B44F] flex items-center gap-1.5">
                        <span>✦</span>
                        <span>{shards} Arcane Shards</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setCheckoutModal({ open: true, pack: STRIPE_PACKAGES[1], loading: false })}
                        className="rounded border border-[#E8B44F] bg-amber-950/40 hover:bg-amber-900/60 text-[#E8B44F] px-2.5 py-1 text-xs font-mono font-bold transition-colors shadow-sm"
                      >
                        💳 Comprar Shards (R$)
                      </button>
                      <button
                        onClick={startWatchRewardedAd}
                        className="rounded border border-emerald-500/60 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 px-2.5 py-1 text-xs font-mono font-bold transition-colors shadow-sm"
                      >
                        🎬 +50 ✦ Grátis
                      </button>
                    </div>
                  </div>

                  {/* Toggle de Acessibilidade & Preferência Competitiva */}
                  <div className="pt-2 border-t border-[#3A335666] flex justify-between items-center text-xs font-mono">
                    <span className="text-[#B7AE95]">Exibir Skins em Duelo (Acessibilidade):</span>
                    <button
                      onClick={() => setDisplaySkins(d => !d)}
                      className="px-2 py-0.5 rounded border text-[11px] font-bold transition-colors"
                      style={{
                        borderColor: displaySkins ? "#72C063" : "#3A3356",
                        background: displaySkins ? "#72C06322" : "#1C1833",
                        color: displaySkins ? "#72C063" : "#B7AE95",
                      }}
                    >
                      {displaySkins ? "ON (Visual das Skins)" : "OFF (Visual Padrão)"}
                    </button>
                  </div>
                </div>

                {/* Filtros da Loja */}
                <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 text-xs font-mono">
                  {[
                    ["all", "Todas as Skins"],
                    ["free", "Grátis (Anúncios)"],
                    ["promo", "Em Destaque"],
                    ["equipped", "Equipadas"],
                  ].map(([fKey, label]) => (
                    <button
                      key={fKey}
                      onClick={() => setShopFilter(fKey)}
                      className="px-2.5 py-1 rounded-md border whitespace-nowrap transition-colors"
                      style={{
                        borderColor: shopFilter === fKey ? "#E8B44F" : "#3A3356",
                        background: shopFilter === fKey ? "#E8B44F22" : "#1C1833",
                        color: shopFilter === fKey ? "#E8B44F" : "#B7AE95",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Grid de Cards de Skins */}
                <div className="grid grid-cols-1 gap-2.5">
                  {filteredSkins.map(skin => {
                    const isOwned = ownedSkins.includes(skin.id);
                    const isEquipped = equippedSkins[skin.targetSkill] === skin.id;
                    const r = RARITY[skin.rarity];
                    const targetSkillObj = SKILLS.find(s => s.id === skin.targetSkill);
                    const Preview = skin.preview;

                    return (
                      <div
                        key={skin.id}
                        className="rounded-lg border p-3 bg-[#1C1833] flex gap-3 items-center relative overflow-hidden transition-all hover:border-[#E8B44F66]"
                        style={{ borderColor: isEquipped ? r.color : "#3A3356", boxShadow: isEquipped ? r.glow : "none" }}
                      >
                        {/* Mini Preview SVG animado da skin */}
                        <div
                          className="w-14 h-14 rounded-md border border-[#3A3356] bg-[#120F24] flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: r.color + "55" }}
                        >
                          <Preview />
                        </div>

                        {/* Dados da Skin */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-serif text-sm font-bold truncate text-[#F2EAD8]">{skin.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border" style={{ color: r.color, borderColor: r.color + "66", background: r.color + "1A" }}>
                              {r.label}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono text-[#B7AE95] mb-1">
                            Habilidade: <span className="text-[#F2EAD8]">{targetSkillObj?.name}</span>
                          </div>

                          <div className="text-[10px] font-mono text-[#8E87A5] mb-2 line-clamp-2">
                            {skin.desc}
                          </div>

                          {/* Botões de Ação Contextuais */}
                          <div className="flex items-center justify-between">
                            <div className="font-mono text-xs font-bold" style={{ color: isOwned ? "#72C063" : "#E8B44F" }}>
                              {isOwned ? (
                                <span>✓ Adquirida</span>
                              ) : skin.priceType === "rewarded_ad" ? (
                                <span className="text-emerald-300">🎬 Grátis (Anúncio)</span>
                              ) : (
                                <span>✦ {skin.price} Shards</span>
                              )}
                            </div>

                            <div className="flex gap-1.5">
                              {isOwned ? (
                                isEquipped ? (
                                  <button
                                    onClick={() => handleEquipSkin(skin.targetSkill, null)}
                                    className="px-2.5 py-1 rounded border border-[#3A3356] bg-[#120F24] text-[11px] font-mono text-[#B7AE95] hover:border-red-400 hover:text-red-300 transition-colors"
                                  >
                                    Remover
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleEquipSkin(skin.targetSkill, skin.id)}
                                    className="px-3 py-1 rounded border border-[#E8B44F] bg-amber-950/40 text-[11px] font-mono font-bold text-[#E8B44F] hover:bg-amber-900/60 transition-colors"
                                  >
                                    Equipar
                                  </button>
                                )
                              ) : (
                                <button
                                  onClick={() => handleBuySkin(skin)}
                                  className="px-3 py-1 rounded border text-[11px] font-mono font-bold transition-colors shadow-sm"
                                  style={{
                                    borderColor: skin.priceType === "rewarded_ad" ? "#10B981" : "#E8B44F",
                                    background: skin.priceType === "rewarded_ad" ? "#064E3B66" : "#78350F66",
                                    color: skin.priceType === "rewarded_ad" ? "#6EE7B7" : "#FDE047",
                                  }}
                                >
                                  {skin.priceType === "rewarded_ad" ? "Desbloquear" : "Comprar"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Botão de Iniciar Duelo */}
            <div className="fixed bottom-0 left-0 right-0 z-20 p-3 flex justify-center" style={{ background: "linear-gradient(transparent, #0A0814 40%)" }}>
              <button onClick={startBattle} disabled={chosen.length !== 4}
                className="w-full max-w-md rounded-md border py-3 font-serif text-xl transition-all"
                style={{ borderColor: "#E8B44F", background: chosen.length === 4 ? "linear-gradient(180deg, #E8B44F, #C9902E)" : "#1C1833", color: chosen.length === 4 ? "#100E1F" : "#3A3356", boxShadow: chosen.length === 4 ? "0 0 20px #E8B44F55" : "none" }}>
                Entrar no Duelo Ranqueado ⚔️
              </button>
            </div>
          </div>
        </div>

        {/* MODAL DE CHECKOUT STRIPE (SIMULADO) */}
        {checkoutModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-[#E8B44F66] bg-[#16122A] p-5 shadow-2xl text-left">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif text-xl font-bold text-[#E8B44F] flex items-center gap-1.5">
                  <span>💳</span>
                  <span>Adquirir Arcane Shards</span>
                </h3>
                <button
                  onClick={() => setCheckoutModal({ open: false, pack: null, loading: false })}
                  className="text-xs font-mono px-2 py-1 rounded border border-[#3A3356] text-[#B7AE95] hover:text-white"
                >
                  ✕
                </button>
              </div>

              <AntiP2WBanner />

              <p className="font-mono text-xs text-[#B7AE95] mb-3">
                Selecione o pacote de Shards desejado para checkout via Stripe:
              </p>

              <div className="space-y-2 mb-4">
                {STRIPE_PACKAGES.map(pack => {
                  const sel = checkoutModal.pack?.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setCheckoutModal(m => ({ ...m, pack }))}
                      className="w-full p-2.5 rounded-lg border text-left font-mono flex items-center justify-between transition-all"
                      style={{
                        borderColor: sel ? "#E8B44F" : "#3A3356",
                        background: sel ? "#E8B44F1F" : "#1C1833",
                        boxShadow: sel ? "0 0 10px #E8B44F33" : "none",
                      }}
                    >
                      <div>
                        <div className="font-bold text-sm text-[#F2EAD8] flex items-center gap-1.5">
                          <span>✦</span>
                          <span>{pack.shards} Shards</span>
                          {pack.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/70 border border-amber-500/50 text-amber-300">
                              {pack.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#B7AE95]">Processamento seguro com Stripe Checkout</div>
                      </div>
                      <div className="text-sm font-bold text-[#E8B44F]">{pack.priceBRL}</div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleConfirmStripePayment}
                  disabled={checkoutModal.loading || !checkoutModal.pack}
                  className="flex-1 py-2.5 rounded-md border border-[#E8B44F] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#100E1F] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {checkoutModal.loading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      <span>Processando no Stripe...</span>
                    </>
                  ) : (
                    <span>Pagar {checkoutModal.pack?.priceBRL || ""} com Cartão</span>
                  )}
                </button>
                <button
                  onClick={() => setCheckoutModal({ open: false, pack: null, loading: false })}
                  disabled={checkoutModal.loading}
                  className="px-4 py-2.5 rounded-md border border-[#3A3356] bg-[#120F24] font-mono text-xs text-[#B7AE95] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE ANÚNCIO RECOMPENSADO (SIMULADO) */}
        {adModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl border border-emerald-500/60 bg-[#121B24] p-5 shadow-2xl text-center">
              <div className="text-3xl mb-2 animate-bounce">🎬</div>
              <h3 className="font-serif text-lg font-bold text-[#F2EAD8] mb-1">
                Assistindo Anúncio Premiado
              </h3>
              <p className="font-mono text-xs text-[#B7AE95] mb-4">
                Aguarde o término para o servidor validar o token e creditar seus Shards.
              </p>
              <div className="text-2xl font-mono font-bold text-emerald-400 mb-2">
                ⏳ {adModal.countdown}s
              </div>
              <div className="w-full h-2 rounded-full bg-[#0A0E14] overflow-hidden border border-[#3A3356]">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${((3 - adModal.countdown) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TOAST DE NOTIFICAÇÃO */}
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg border border-[#E8B44F] bg-[#16122AEE] text-[#F2EAD8] font-mono text-xs shadow-2xl backdrop-blur-md flex items-center gap-2">
            <span>✦</span>
            <span>{toast}</span>
          </div>
        )}
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
          <p className="font-mono text-sm mb-4" style={{ color: "#B7AE95" }}>
            {result === "win" ? `${enemy.name} yields.` : `${enemy.name} stands over you. Adjust your build and return.`}
          </p>

          {/* Recompensa de Arcane Shards por Vitória Ranqueada */}
          {battleRewards?.won && (
            <div className="rounded-lg border border-amber-500/50 bg-[#1A1630] p-3 mb-4 shadow-[0_0_15px_#E8B44F22]">
              <div className="text-xs font-mono text-[#E8B44F] font-bold mb-1">
                ✦ Recompensa Ranqueada Validada pelo Servidor
              </div>
              <div className="text-base font-mono font-bold text-[#F2EAD8]">
                +{battleRewards.earned} Arcane Shards
              </div>
              {battleRewards.streakBonus && (
                <div className="text-xs font-mono text-emerald-300 mt-1">
                  🔥 Bônus de Vitória Consecutiva (Streak 5x)!
                </div>
              )}
              <div className="text-[11px] font-mono text-[#B7AE95] mt-1">
                Sequência de Vitórias Atual: {battleRewards.winStreak}
              </div>
            </div>
          )}

          {loot && (
            <div className="rounded-md border p-4 mb-4 relative overflow-hidden lootShine"
              style={{ borderColor: RARITY[loot.rarity].color, background: "#1C1833", boxShadow: RARITY[loot.rarity].glow }}>
              <div className="text-xs font-mono mb-1" style={{ color: RARITY[loot.rarity].color }}>✦ {RARITY[loot.rarity].label} drop ✦</div>
              <div className="font-serif text-2xl" style={{ color: "#F2EAD8" }}>{loot.name}</div>
              {loot.desc && <div className="text-xs font-mono mt-1" style={{ color: "#B7AE95" }}>{loot.desc}</div>}
              <div className="text-xs font-mono mt-2" style={{ color: "#5A5478" }}>Unlocked in your collection · tradeable in the full game</div>
            </div>
          )}
          {result === "win" && !loot && <p className="text-xs font-mono mb-4" style={{ color: "#5A5478" }}>Your collection is complete, Archmage.</p>}

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

        {/* Camada do Projétil Ativo (renderiza cores e partículas da skin cosmética) */}
        <ProjectileVisual projectile={activeProjectile} />

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

        {/* Menu de Magias com Indicadores de Skins */}
        <div className="grid grid-cols-2 gap-2">
          {menuSkills.map(s => {
            const e = ELEMENTS[s.el];
            const onCd = player.cds[s.id] > 0;
            const noMana = player.mana < s.mana;
            const disabled = busy || onCd || noMana;
            const eff = s.dmg ? effectiveness(s.el, enemy.affinity) : 1;
            const eqSkinId = equippedSkins[s.id];
            const eqSkin = eqSkinId ? SKINS.find(sk => sk.id === eqSkinId) : null;

            return (
              <button key={s.id} onClick={() => playerAction(s)} disabled={disabled}
                className="rounded-md border p-2 text-left font-mono text-sm transition-all relative overflow-hidden"
                style={{ borderColor: disabled ? "#3A3356" : e.color, background: disabled ? "#14112A" : "#1C1833", color: disabled ? "#5A5478" : "#F2EAD8", opacity: busy ? 0.7 : 1 }}>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>{s.name}</span>
                    {eqSkin && displaySkins && <span className="text-[10px] text-purple-300">✦</span>}
                  </span>
                  <span style={{ color: disabled ? "#5A5478" : e.color }}>{e.icon}</span>
                </div>
                <div className="text-xs truncate" style={{ color: "#B7AE95" }}>
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

/*
==================================================================================================
DOCUMENTAÇÃO TÉCNICA, ARQUITETURA MULTIPLAYER E INTEGRAÇÃO (STRIPE & WEBSOCKET)
==================================================================================================

1. CHECKLIST DO QUE FOI IMPLEMENTADO:
--------------------------------------------------------------------------------------------------
[x] Array SKINS dedicado com 10 skins cosméticas abrangendo rarity common, rare, epic, legendary.
[x] Regras Anti-Pay-to-Win rígidas: 0 atributos de combate em todas as skins (apenas cores, partículas e formas).
[x] Nova aba "Loja ✦" no menu de Loadout com filtros ("Todas", "Grátis", "Em Destaque", "Equipadas").
[x] Moeda premium "Arcane Shards" (✦) com saldo no topo e mock de servidor autoritativo.
[x] Ganho gratuito de Shards: +5 ✦ por vitória ranqueada, +25 ✦ por streak de 5 vitórias, +50 ✦ por anúncio.
[x] Modal de Checkout Stripe simulado com pacotes (R$ 4,99 / R$ 19,99 / R$ 39,99).
[x] Modal de Anúncio Recompensado simulado com contador de 3 segundos e validação de token.
[x] Selo Anti-P2W visível e permanente na loja e nos modais.
[x] Seção de equipar/desequipar skins na aba Style e na própria Loja, com opção "Restaurar Padrão".
[x] Projétil e impacto renderizados dinamicamente a 60fps usando transform: translate3d com as cores da skin.
[x] Switch de acessibilidade competitiva: "Exibir Skins em Duelo: ON / OFF".
[x] Fallback offline completo com IA (makeEnemy) mantido 100% funcional.

2. INSTRUÇÕES PARA INTEGRAR STRIPE CHECKOUT REAL (PASSO A PASSO):
--------------------------------------------------------------------------------------------------
Passo 1: Instale o SDK do Stripe no seu servidor Node.js/Next.js:
         npm install stripe

Passo 2: Crie a rota de checkout no backend (POST /api/stripe/checkout):
         import Stripe from "stripe";
         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

         export async function handler(req, res) {
           const { packId, userId } = req.body;
           const pack = STRIPE_PACKAGES.find(p => p.id === packId);
           const session = await stripe.checkout.sessions.create({
             payment_method_types: ["card"],
             line_items: [{
               price_data: {
                 currency: "brl",
                 product_data: { name: `${pack.shards} Arcane Shards` },
                 unit_amount: Math.round(pack.priceNumber * 100), // centavos
               },
               quantity: 1,
             }],
             mode: "payment",
             metadata: { userId, packId, shards: pack.shards },
             success_url: `${process.env.CLIENT_URL}/duel?status=success`,
             cancel_url: `${process.env.CLIENT_URL}/duel?status=cancel`,
           });
           res.json({ checkoutUrl: session.url });
         }

Passo 3: No cliente React (mage-duel-v3.jsx), substitua o mock por redirecionamento:
         const res = await fetch("/api/stripe/checkout", {
           method: "POST",
           headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
           body: JSON.stringify({ packId: pack.id })
         });
         const { checkoutUrl } = await res.json();
         window.location.href = checkoutUrl;

Passo 4: Implemente o Webhook do Stripe (POST /api/stripe/webhook):
         O servidor escuta o evento 'checkout.session.completed', valida a assinatura com
         stripe.webhooks.constructEvent(), extrai { userId, shards } de metadata e credita no DB.

3. INSTRUÇÕES PARA SUBSTITUIR makeEnemy() POR MATCHMAKING WEBSOCKET (SOCKET.IO / COLYSEUS):
--------------------------------------------------------------------------------------------------
Passo 1: Crie uma conexão WebSocket persistente no cliente React:
         import { io } from "socket.io-client";
         const socket = io("wss://arena.mageduel.com", { auth: { token: userAuthToken } });

Passo 2: Entrar na Fila de Matchmaking:
         Substitua startBattle() por:
         socket.emit("queue:join", {
           affinity,
           skills: chosen,
           staffId,
           relicId,
           equippedSkins, // Apenas IDs cosméticos para o oponente renderizar
         });

Passo 3: Receber partida encontrada e iniciar duelo autoritativo:
         socket.on("match:start", ({ matchId, opponent, yourStats, foeStats, turnPlayerId }) => {
           // O servidor envia os stats já computados para evitar adulteração client-side
           setPlayer(yourStats);
           setEnemy(opponent);
           setPhase("battle");
         });

Passo 4: Envio de Ações em Turno:
         socket.emit("turn:action", { matchId, skillId: s.id });
         socket.on("turn:resolve", ({ casterId, skillId, skinId, damage, nextTurnId }) => {
           // Renderiza animação do projétil com skinId recebido da rede
         });

4. DIAGRAMA ASCII DO FLUXO DE COMPRA E VALIDAÇÃO ANTI-P2W:
--------------------------------------------------------------------------------------------------
+------------------+             +----------------------+            +--------------------+
|  Cliente React   |             |   Servidor Node.js   |            |   Stripe Checkout  |
| (Mage Duel UI)   |             | (Fonte da Verdade)   |            |   (Gateway Pagto)  |
+--------+---------+             +----------+-----------+            +---------+----------+
         |                                  |                                  |
         | 1. Clica "Comprar Shards"        |                                  |
         +--------------------------------->|                                  |
         |    POST /api/stripe/checkout     |                                  |
         |                                  | 2. Cria Checkout Session         |
         |                                  +--------------------------------->|
         |                                  |    stripe.checkout.sessions()    |
         |                                  |<---------------------------------+
         | 3. Redireciona para Stripe       |    retorna session.url           |
         |<---------------------------------+                                  |
         |                                                                     |
         | 4. Jogador paga com cartão                                          |
         +-------------------------------------------------------------------->|
         |                                                                     | 5. Pagamento OK!
         |                                  | 6. Webhook (checkout.completed)  |
         |                                  |<---------------------------------+
         |                                  | 7. Valida assinatura HMAC        |
         |                                  | 8. Credita Shards no Banco (DB)  |
         |                                  |                                  |
         | 9. Atualiza cache via WebSocket  |                                  |
         |<---------------------------------+                                  |
         |                                                                     |
+--------v---------------------------------------------------------------------v------+
|                         PARTIDA RANQUEADA ANTI-CHEAT                                |
|                                                                                      |
|  [Cliente 1] (Skins equipadas)                    [Cliente 2] (Oponente)             |
|       |                                                |                             |
|       |---- envia { skillId, skinId } (cosmético) ---->| (Vê apenas animação)        |
|       |                                                |                             |
|       v                                                v                             |
|   +--------------------------------------------------------+                         |
|   |         SERVIDOR AUTORITATIVO (Socket.io)              |                         |
|   |  - Ignora skinId nos cálculos de dano e mana           |                         |
|   |  - Aplica estritamente a fórmula base fixa             |                         |
|   |  - Valida que cosmético tem ZERO bônus numérico        |                         |
|   +--------------------------------------------------------+                         |
+--------------------------------------------------------------------------------------+
==================================================================================================
*/
