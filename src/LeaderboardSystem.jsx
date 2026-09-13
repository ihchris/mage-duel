import React, { useState } from "react";

// ================= LIGAS E TIERS ARCANOS =================
export const LEADERBOARD_TIERS = [
  {
    id: "novice",
    tier: 1,
    name_pt: "Noviço Arcano",
    name_en: "Arcane Novice",
    icon: "🥉",
    minTrophies: 0,
    maxTrophies: 499,
    color: "#94A3B8",
    border: "rgba(148, 163, 184, 0.45)",
    glow: "rgba(148, 163, 184, 0.2)",
    rewardShards: 25,
    title_pt: "Aprendiz",
    title_en: "Apprentice",
  },
  {
    id: "adept",
    tier: 2,
    name_pt: "Adepto Elemental",
    name_en: "Elemental Adept",
    icon: "🥈",
    minTrophies: 500,
    maxTrophies: 999,
    color: "#38BDF8",
    border: "rgba(56, 189, 248, 0.45)",
    glow: "rgba(56, 189, 248, 0.25)",
    rewardShards: 50,
    title_pt: "Adepto",
    title_en: "Adept",
  },
  {
    id: "magister",
    tier: 3,
    name_pt: "Magister de Duelos",
    name_en: "Duel Magister",
    icon: "🥇",
    minTrophies: 1000,
    maxTrophies: 1499,
    color: "#F59E0B",
    border: "rgba(245, 158, 11, 0.5)",
    glow: "rgba(245, 158, 11, 0.3)",
    rewardShards: 100,
    title_pt: "Magister",
    title_en: "Magister",
  },
  {
    id: "grandmaster",
    tier: 4,
    name_pt: "Grão-Mestre Arcano",
    name_en: "Arcane Grandmaster",
    icon: "💎",
    minTrophies: 1500,
    maxTrophies: 1999,
    color: "#C084FC",
    border: "rgba(192, 132, 252, 0.5)",
    glow: "rgba(192, 132, 252, 0.3)",
    rewardShards: 200,
    title_pt: "Grão-Mestre",
    title_en: "Grandmaster",
  },
  {
    id: "archmage",
    tier: 5,
    name_pt: "Arquimago Supremo",
    name_en: "Supreme Archmage",
    icon: "👑",
    minTrophies: 2000,
    maxTrophies: 2499,
    color: "#EC4899",
    border: "rgba(236, 72, 153, 0.55)",
    glow: "rgba(236, 72, 153, 0.35)",
    rewardShards: 350,
    title_pt: "Arquimago",
    title_en: "Archmage",
  },
  {
    id: "sovereign",
    tier: 6,
    name_pt: "Soberano do Éter",
    name_en: "Ethereal Sovereign",
    icon: "🌌",
    minTrophies: 2500,
    maxTrophies: 99999,
    color: "#FBBF24",
    border: "rgba(251, 191, 36, 0.7)",
    glow: "rgba(251, 191, 36, 0.45)",
    rewardShards: 500,
    title_pt: "Soberano",
    title_en: "Sovereign",
  },
];

export function getTierForTrophies(trophies = 1000) {
  const safeT = Math.max(0, trophies);
  for (let i = LEADERBOARD_TIERS.length - 1; i >= 0; i--) {
    if (safeT >= LEADERBOARD_TIERS[i].minTrophies) {
      return LEADERBOARD_TIERS[i];
    }
  }
  return LEADERBOARD_TIERS[0];
}

export function getNextTier(trophies = 1000) {
  const current = getTierForTrophies(trophies);
  const nextIdx = LEADERBOARD_TIERS.findIndex(t => t.id === current.id) + 1;
  if (nextIdx < LEADERBOARD_TIERS.length) {
    const nextTier = LEADERBOARD_TIERS[nextIdx];
    const needed = nextTier.minTrophies - trophies;
    const tierSpan = nextTier.minTrophies - current.minTrophies;
    const progressInTier = Math.max(0, trophies - current.minTrophies);
    const percent = Math.min(100, Math.round((progressInTier / tierSpan) * 100));
    return { nextTier, needed, percent };
  }
  return { nextTier: null, needed: 0, percent: 100 };
}

// ================= CÁLCULO DE TROFÉUS (SISTEMA DE INCENTIVO) =================
export function calculateTrophyDelta({
  isWin,
  playerTrophies = 1000,
  opponentTrophies = 1000,
  winStreak = 0,
  roundNum = 5,
  playerHp = 50,
}) {
  if (isWin) {
    // Vitória base: 26 a 34 troféus dependendo da diferença de troféus
    const diff = opponentTrophies - playerTrophies;
    let base = Math.round(28 + Math.max(-10, Math.min(12, diff / 50)));

    // Bônus por Sequência de Vitórias (Incentivo enorme para manter a streak!)
    let streakBonus = 0;
    if (winStreak >= 4) streakBonus = 12;
    else if (winStreak >= 3) streakBonus = 8;
    else if (winStreak >= 2) streakBonus = 5;

    // Bônus de Performance
    let performanceBonus = 0;
    if (playerHp >= 65) performanceBonus += 4; // Quase intacto
    if (roundNum <= 4) performanceBonus += 3;  // Duelo relâmpago

    const totalGain = base + streakBonus + performanceBonus;
    return {
      delta: totalGain,
      base,
      streakBonus,
      performanceBonus,
      isPromotion: getTierForTrophies(playerTrophies + totalGain).id !== getTierForTrophies(playerTrophies).id,
    };
  } else {
    // Derrota: perda reduzida com proteção para novatos
    if (playerTrophies < 1000) {
      // Proteção de ranking abaixo de Magister para não desencorajar iniciantes
      return { delta: 0, base: 0, streakBonus: 0, performanceBonus: 0, isPromotion: false };
    }
    const loss = Math.min(playerTrophies - 1000, 14);
    return {
      delta: -loss,
      base: -loss,
      streakBonus: 0,
      performanceBonus: 0,
      isPromotion: false,
    };
  }
}

// ================= RIVAIS ARCANOS PRÉ-CONFIGURADOS =================
export const INITIAL_LEADERBOARD_RIVALS = [
  {
    id: "rival_aurelius",
    name: "Aurelius, o Arauto Solar",
    title_pt: "Soberano do Sol Radiante",
    title_en: "Radiant Sun Sovereign",
    affinity: "fire",
    trophies: 2840,
    wins: 142,
    losses: 18,
    winStreak: 12,
    staffId: "sunfire",
    relicId: "phoenixash",
    hatId: "hat_laurel",
    auraId: "aura_sunburst",
    capeId: "wings_phoenix",
    robeId: "robe_sunburst",
    petId: "pet_dragon",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_blonde",
      hairStyle: "hair_wavy",
      beardStyle: "beard_short",
      eyeColor: "eye_ruby",
      gender: "gender_male",
      face: "face_sharp",
      earrings: "earring_gold",
      noseRing: "nosering_none",
    },
    skills: ["fireball", "inferno", "emberjab", "surge"],
    bio_pt: "Campeão supremo da Cidadela Solar. Jamais hesita em invocar o calor de mil estrelas.",
    bio_en: "Supreme Champion of the Sun Citadel. Never hesitates to call upon a thousand stars.",
    archetype: { id: "berserker", name: "Explosão Solar", icon: "☀️", color: "#F59E0B", tagline: "Dano Devastador" },
  },
  {
    id: "rival_sylra",
    name: "Sylra, Cantora da Nevasca",
    title_pt: "Arquimaga do Vento Polar",
    title_en: "Polar Wind Archmage",
    affinity: "ice",
    trophies: 2715,
    wins: 128,
    losses: 22,
    winStreak: 9,
    staffId: "frostbound",
    relicId: "cryoring",
    hatId: "hat_pointed",
    auraId: "aura_frost",
    capeId: "cape_fur",
    robeId: "robe_frostveil",
    petId: "pet_owl",
    look: {
      skinTone: "skin_pale",
      hairColor: "hair_white",
      hairStyle: "hair_long",
      beardStyle: "beard_none",
      eyeColor: "eye_ice",
      gender: "gender_female",
      face: "face_sharp",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["blizzard", "iceshard", "frostnova", "ward"],
    bio_pt: "Mestra gélida que congela as próprias leylines para sufocar o conjuramento inimigo.",
    bio_en: "Glacial master who freezes arcane leylines to suffocate enemy incantations.",
    archetype: { id: "control", name: "Congelamento Total", icon: "❄️", color: "#38BDF8", tagline: "Controle & Lentidão" },
  },
  {
    id: "rival_vex",
    name: "Vex, a Sombra do Vazio",
    title_pt: "Soberana da Singularidade",
    title_en: "Singularity Sovereign",
    affinity: "arcane",
    trophies: 2590,
    wins: 115,
    losses: 25,
    winStreak: 7,
    staffId: "voidglass",
    relicId: "voidcrystal",
    hatId: "hat_hood",
    auraId: "aura_arcane",
    capeId: "cape_void",
    robeId: "robe_midnight",
    petId: "pet_imp",
    look: {
      skinTone: "skin_dark",
      hairColor: "hair_purple",
      hairStyle: "hair_short",
      beardStyle: "beard_none",
      eyeColor: "eye_amethyst",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_ruby",
      noseRing: "nosering_silver",
    },
    skills: ["arcaneblast", "voidshift", "manaflare", "surge"],
    bio_pt: "Dobra as leis da gravidade e da magia pura com seu cajado de voidglass astronômico.",
    bio_en: "Bends the laws of gravity and pure mana with her astronomical voidglass staff.",
    archetype: { id: "burst", name: "Mana Cósmica", icon: "🕳️", color: "#C084FC", tagline: "Poder Arcano Puro" },
  },
  {
    id: "rival_morwen",
    name: "Morwen, o Cinzento",
    title_pt: "Veterano dos Cem Duelos",
    title_en: "Veteran of a Hundred Duels",
    affinity: "fire",
    trophies: 2470,
    wins: 104,
    losses: 30,
    winStreak: 5,
    staffId: "ashwood",
    relicId: "wardsigil",
    hatId: "hat_wide",
    auraId: "aura_ember",
    capeId: "cape_banner",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_grey",
      hairStyle: "hair_wavy",
      beardStyle: "beard_long",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["fireball", "emberjab", "ward", "surge"],
    bio_pt: "Erudito e duelista condecorado. Suas cicatrizes de fogo contam a história da arena.",
    bio_en: "Decorated duelist and scholar. His burn scars recount the history of the arena.",
    archetype: { id: "balanced", name: "Baluarte Antigo", icon: "🛡️", color: "#F97316", tagline: "Estratégia Imutável" },
  },
  {
    id: "rival_nissa",
    name: "Nissa Coração-de-Espinheiro",
    title_pt: "Arquidruidesa de Yggdrasil",
    title_en: "Archdruid of Yggdrasil",
    affinity: "nature",
    trophies: 2380,
    wins: 96,
    losses: 24,
    winStreak: 8,
    staffId: "verdant",
    relicId: "seedoflife",
    hatId: "hat_pointed",
    auraId: "aura_nature",
    capeId: "wings_angel",
    robeId: "robe_verdant",
    petId: "pet_mushroom",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_emerald",
      hairStyle: "hair_long",
      beardStyle: "beard_none",
      eyeColor: "eye_emerald",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["thornwhip", "entangle", "photosynthesis", "ward"],
    bio_pt: "Canaliza a vitalidade eterna das florestas ancestrais, curando dano enquanto enraíza oponentes.",
    bio_en: "Channels the eternal vigor of ancient woodlands, regenerating vitality while entangling foes.",
    archetype: { id: "sustain", name: "Regeneração Vital", icon: "🌿", color: "#22C55E", tagline: "Cura & Enraizamento" },
  },
  {
    id: "rival_kaelen",
    name: "Kaelen Tempestuoso",
    title_pt: "Senhor dos Trovões",
    title_en: "Lord of Tempests",
    affinity: "arcane",
    trophies: 2290,
    wins: 89,
    losses: 26,
    winStreak: 6,
    staffId: "stormcaller",
    relicId: "stormstone",
    hatId: "hat_warlord",
    auraId: "aura_sparkle",
    capeId: "cape_banner",
    robeId: "robe_midnight",
    petId: "pet_owl",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_blonde",
      hairStyle: "hair_short",
      beardStyle: "beard_short",
      eyeColor: "eye_ice",
      gender: "gender_male",
      face: "face_sharp",
      earrings: "earring_gold",
      noseRing: "nosering_none",
    },
    skills: ["lightningbolt", "stormsurge", "ward", "manaflare"],
    bio_pt: "Empunha o cajado da tempestade forjada, desferindo descargas críticas fulminantes.",
    bio_en: "Wields the forged stormcaller staff, unleashing devastating lightning crits.",
    archetype: { id: "crit", name: "Descarga Crítica", icon: "⚡", color: "#A855F7", tagline: "Alto Crítico" },
  },
  {
    id: "rival_valeria",
    name: "Valeria, a Lâmina Sanguínea",
    title_pt: "Senhora do Pacto Noturno",
    title_en: "Mistress of the Blood Pact",
    affinity: "fire",
    trophies: 2210,
    wins: 82,
    losses: 28,
    winStreak: 4,
    staffId: "bloodpact",
    relicId: "bloodring",
    hatId: "hat_hood",
    auraId: "aura_ember",
    capeId: "wings_demon",
    robeId: "robe_classic",
    petId: "pet_imp",
    look: {
      skinTone: "skin_pale",
      hairColor: "hair_black",
      hairStyle: "hair_wavy",
      beardStyle: "beard_none",
      eyeColor: "eye_ruby",
      gender: "gender_female",
      face: "face_sharp",
      earrings: "earring_ruby",
      noseRing: "nosering_silver",
    },
    skills: ["bloodstrike", "inferno", "combustion", "surge"],
    bio_pt: "Troca sua própria força vital por chamas sangrentas incontroláveis.",
    bio_en: "Trades her own life essence for unrelenting blood flames.",
    archetype: { id: "berserker", name: "Fúria do Sangue", icon: "🩸", color: "#DC2626", tagline: "Sacrifício por Dano" },
  },
  {
    id: "rival_coralia",
    name: "Coralia, Voz das Marés",
    title_pt: "Princesa do Abismo Oceânico",
    title_en: "Princess of the Oceanic Abyss",
    affinity: "ice",
    trophies: 2130,
    wins: 76,
    losses: 25,
    winStreak: 5,
    staffId: "coralscepter",
    relicId: "cryoring",
    hatId: "hat_pointed",
    auraId: "aura_frost",
    capeId: "wings_angel",
    robeId: "robe_frostveil",
    petId: "pet_none",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_blue",
      hairStyle: "hair_long",
      beardStyle: "beard_none",
      eyeColor: "eye_ice",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["tidalwave", "iceshard", "frostnova", "ward"],
    bio_pt: "Empunha o cetro vivo dos recifes de coral, invocando maremotos glaciais.",
    bio_en: "Wields the living coral scepter, commanding glacial tidal waves.",
    archetype: { id: "control", name: "Maré Glacial", icon: "🌊", color: "#0284C7", tagline: "Ondas & Congelamento" },
  },
  {
    id: "rival_thorne",
    name: "Thorne Raiz-de-Ferro",
    title_pt: "Guardião dos Bosques Pétreos",
    title_en: "Warden of Stonebough",
    affinity: "nature",
    trophies: 1940,
    wins: 68,
    losses: 31,
    winStreak: 3,
    staffId: "verdant",
    relicId: "wardsigil",
    hatId: "hat_wide",
    auraId: "aura_nature",
    capeId: "cape_fur",
    robeId: "robe_verdant",
    petId: "pet_mushroom",
    look: {
      skinTone: "skin_dark",
      hairColor: "hair_brown",
      hairStyle: "hair_short",
      beardStyle: "beard_braided",
      eyeColor: "eye_emerald",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["thornwhip", "entangle", "photosynthesis", "ward"],
    bio_pt: "Inquebrável como o carvalho secular. Absorve ataques enquanto sufoca inimigos com cipós.",
    bio_en: "Unshakable like ancient oak. Absorbs incoming blows while constricting foes.",
    archetype: { id: "tank", name: "Casca Pétrea", icon: "🛡️", color: "#15803D", tagline: "Defesa Inabalável" },
  },
  {
    id: "rival_darius",
    name: "Darius, Tecelão de Runas",
    title_pt: "Grão-Mestre da Geometria Arcana",
    title_en: "Grandmaster of Arcane Geometry",
    affinity: "arcane",
    trophies: 1820,
    wins: 62,
    losses: 30,
    winStreak: 4,
    staffId: "voidglass",
    relicId: "managem",
    hatId: "hat_pointed",
    auraId: "aura_sparkle",
    capeId: "cape_banner",
    robeId: "robe_midnight",
    petId: "pet_owl",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_grey",
      hairStyle: "hair_short",
      beardStyle: "beard_stubble",
      eyeColor: "eye_amethyst",
      gender: "gender_male",
      face: "face_sharp",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["arcaneblast", "voidshift", "manaflare", "ward"],
    bio_pt: "Calcula cada centímetro de mana com precisão matemática implacável.",
    bio_en: "Calculates every drop of mana with relentless mathematical precision.",
    archetype: { id: "tempo", name: "Ritmo Arcano", icon: "📐", color: "#8B5CF6", tagline: "Gestão Rúnica" },
  },
  {
    id: "rival_ondrel",
    name: "Ondrel Brasa Selvagem",
    title_pt: "Guerreiro do Fogo Primal",
    title_en: "Primal Fire Warrior",
    affinity: "fire",
    trophies: 1710,
    wins: 58,
    losses: 34,
    winStreak: 3,
    staffId: "ashwood",
    relicId: "phoenixash",
    hatId: "hat_warlord",
    auraId: "aura_ember",
    capeId: "wings_phoenix",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_crimson",
      hairStyle: "hair_wavy",
      beardStyle: "beard_short",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_gold",
      noseRing: "nosering_silver",
    },
    skills: ["fireball", "emberjab", "combustion", "surge"],
    bio_pt: "Ataca primeiro e pergunta depois. Aquece a arena até derreter a compostura adversária.",
    bio_en: "Strikes first, questions never. Turns the battlefield into a raging furnace.",
    archetype: { id: "berserker", name: "Fúria Ígnea", icon: "🔥", color: "#EA580C", tagline: "Ataque Furioso" },
  },
  {
    id: "rival_bramblewick",
    name: "Bramblewick, o Alquimista",
    title_pt: "Inventor de Esporos Elementais",
    title_en: "Brewer of Elemental Spores",
    affinity: "nature",
    trophies: 1610,
    wins: 52,
    losses: 33,
    winStreak: 2,
    staffId: "verdant",
    relicId: "seedoflife",
    hatId: "hat_jester",
    auraId: "aura_nature",
    capeId: "cape_fur",
    robeId: "robe_verdant",
    petId: "pet_mushroom",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_white",
      hairStyle: "hair_short",
      beardStyle: "beard_long",
      eyeColor: "eye_emerald",
      gender: "gender_male",
      face: "face_round",
      earrings: "earring_none",
      noseRing: "nosering_silver",
    },
    skills: ["thornwhip", "entangle", "ward", "photosynthesis"],
    bio_pt: "Excêntrico e imprevisível. Sempre tem um cogumelo mágico escondido na manga.",
    bio_en: "Eccentric and unpredictable. Always carries a trick mushroom up his sleeve.",
    archetype: { id: "tricky", name: "Esporos & Caos", icon: "🍄", color: "#16A34A", tagline: "Truques Alquímicos" },
  },
  {
    id: "rival_eldrin",
    name: "Eldrin, Andarilho do Gelo",
    title_pt: "Sentinela dos Picos Brancos",
    title_en: "Sentinel of the White Peaks",
    affinity: "ice",
    trophies: 1480,
    wins: 49,
    losses: 35,
    winStreak: 4,
    staffId: "frostbound",
    relicId: "wardsigil",
    hatId: "hat_wide",
    auraId: "aura_frost",
    capeId: "cape_fur",
    robeId: "robe_frostveil",
    petId: "pet_owl",
    look: {
      skinTone: "skin_pale",
      hairColor: "hair_silver",
      hairStyle: "hair_short",
      beardStyle: "beard_short",
      eyeColor: "eye_ice",
      gender: "gender_male",
      face: "face_sharp",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["iceshard", "frostnova", "blizzard", "ward"],
    bio_pt: "Habituado às tempestades mais cortantes do norte. Paciência congelante.",
    bio_en: "Accustomed to the biting blizzards of the north. Glacial composure.",
    archetype: { id: "control", name: "Guarda do Gelo", icon: "❄️", color: "#0284C7", tagline: "Controle Preciso" },
  },
  {
    id: "rival_selene",
    name: "Selene Estelar",
    title_pt: "Vidente da Lua Nova",
    title_en: "New Moon Seer",
    affinity: "arcane",
    trophies: 1390,
    wins: 44,
    losses: 32,
    winStreak: 3,
    staffId: "stormcaller",
    relicId: "managem",
    hatId: "hat_pointed",
    auraId: "aura_sparkle",
    capeId: "cape_void",
    robeId: "robe_midnight",
    petId: "pet_owl",
    look: {
      skinTone: "skin_dark",
      hairColor: "hair_white",
      hairStyle: "hair_long",
      beardStyle: "beard_none",
      eyeColor: "eye_amethyst",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_gold",
      noseRing: "nosering_none",
    },
    skills: ["arcaneblast", "manaflare", "ward", "surge"],
    bio_pt: "Lê o futuro nas estrelas cadentes antes de cada duelo na arena.",
    bio_en: "Reads the stars before stepping foot into the dueling grounds.",
    archetype: { id: "burst", name: "Estrela Guia", icon: "✨", color: "#C084FC", tagline: "Magia Celeste" },
  },
  {
    id: "rival_rowan",
    name: "Rowan da Chama Eterna",
    title_pt: "Cavaleiro do Fogo Rúnico",
    title_en: "Rune Fire Knight",
    affinity: "fire",
    trophies: 1290,
    wins: 41,
    losses: 35,
    winStreak: 2,
    staffId: "sunfire",
    relicId: "wardsigil",
    hatId: "hat_warlord",
    auraId: "aura_ember",
    capeId: "cape_banner",
    robeId: "robe_sunburst",
    petId: "pet_none",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_brown",
      hairStyle: "hair_short",
      beardStyle: "beard_short",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["fireball", "emberjab", "combustion", "ward"],
    bio_pt: "Combina honra e agressividade com o calor de suas espadas e cajados de ouro.",
    bio_en: "Combines martial honor with searing heat from radiant gold relics.",
    archetype: { id: "balanced", name: "Cavaleiro Ardente", icon: "🗡️", color: "#F59E0B", tagline: "Combate Nobre" },
  },
  {
    id: "rival_caelum",
    name: "Caelum, Mestre dos Ventos",
    title_pt: "Adepto do Ar Frio",
    title_en: "Cold Air Adept",
    affinity: "ice",
    trophies: 1190,
    wins: 37,
    losses: 33,
    winStreak: 2,
    staffId: "frostbound",
    relicId: "none",
    hatId: "hat_pointed",
    auraId: "aura_frost",
    capeId: "cape_fur",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_blonde",
      hairStyle: "hair_wavy",
      beardStyle: "beard_none",
      eyeColor: "eye_ice",
      gender: "gender_male",
      face: "face_round",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["iceshard", "frostnova", "ward", "focus"],
    bio_pt: "Ágil e esquivo. Mantém distância e ataca nos intervalos de recarga dos inimigos.",
    bio_en: "Agile and evasive. Exploits cooldown windows to pick enemies apart.",
    archetype: { id: "kiter", name: "Brisa Rápida", icon: "🌬️", color: "#38BDF8", tagline: "Mobilidade & Distância" },
  },
  {
    id: "rival_garrick",
    name: "Garrick Mão-de-Ferro",
    title_pt: "Baluarte da Floresta Negra",
    title_en: "Blackwood Bulwark",
    affinity: "nature",
    trophies: 1110,
    wins: 33,
    losses: 36,
    winStreak: 1,
    staffId: "ashwood",
    relicId: "wardsigil",
    hatId: "hat_wide",
    auraId: "aura_nature",
    capeId: "cape_none",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_black",
      hairStyle: "hair_short",
      beardStyle: "beard_short",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["thornwhip", "entangle", "ward", "photosynthesis"],
    bio_pt: "Resiste a tempestades de magia com sua couraça de madeira de ferro.",
    bio_en: "Shrugs off magic volleys behind his reinforced ironwood barrier.",
    archetype: { id: "tank", name: "Couraça Dura", icon: "🪵", color: "#15803D", tagline: "Defesa Sólida" },
  },
  {
    id: "rival_zephyr",
    name: "Zephyr, Aprendiz da Chama",
    title_pt: "Duelista Promissor",
    title_en: "Promising Duelist",
    affinity: "fire",
    trophies: 1040,
    wins: 29,
    losses: 32,
    winStreak: 2,
    staffId: "ashwood",
    relicId: "none",
    hatId: "hat_pointed",
    auraId: "aura_ember",
    capeId: "cape_none",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_crimson",
      hairStyle: "hair_short",
      beardStyle: "beard_none",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_round",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["fireball", "emberjab", "ward", "surge"],
    bio_pt: "Jovem mago ambicioso subindo as escadarias do ranking degrau a degrau.",
    bio_en: "Young ambitious caster climbing the ranked ladder rung by rung.",
    archetype: { id: "novice", name: "Chama Jovem", icon: "🔥", color: "#F97316", tagline: "Agressivo & Veloz" },
  },
  {
    id: "rival_mira",
    name: "Mira, Sentinela Esmeralda",
    title_pt: "Protetora do Bosque",
    title_en: "Grove Warden",
    affinity: "nature",
    trophies: 980,
    wins: 26,
    losses: 35,
    winStreak: 1,
    staffId: "verdant",
    relicId: "none",
    hatId: "hat_pointed",
    auraId: "aura_nature",
    capeId: "cape_none",
    robeId: "robe_classic",
    petId: "pet_mushroom",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_emerald",
      hairStyle: "hair_long",
      beardStyle: "beard_none",
      eyeColor: "eye_emerald",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_silver",
      noseRing: "nosering_none",
    },
    skills: ["thornwhip", "photosynthesis", "ward", "focus"],
    bio_pt: "Treina no santuário esmeralda para alcançar o escalão dos grandes magos.",
    bio_en: "Trains in the emerald grove striving to reach the upper echelons.",
    archetype: { id: "sustain", name: "Cura Esmeralda", icon: "🌱", color: "#22C55E", tagline: "Cura Constante" },
  },
  {
    id: "rival_lyra",
    name: "Lyra da Centelha",
    title_pt: "Noviça Fagulha",
    title_en: "Spark Novice",
    affinity: "fire",
    trophies: 880,
    wins: 22,
    losses: 38,
    winStreak: 1,
    staffId: "ashwood",
    relicId: "none",
    hatId: "hat_pointed",
    auraId: "aura_sparkle",
    capeId: "cape_none",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_fair",
      hairColor: "hair_blonde",
      hairStyle: "hair_wavy",
      beardStyle: "beard_none",
      eyeColor: "eye_ruby",
      gender: "gender_female",
      face: "face_round",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["fireball", "emberjab", "ward", "focus"],
    bio_pt: "Treinando para controlar a potência das suas primeiras bolas de fogo.",
    bio_en: "Honing control over her very first explosive fireballs.",
    archetype: { id: "novice", name: "Primeira Fagulha", icon: "✨", color: "#EF4444", tagline: "Aprendizado" },
  },
  {
    id: "rival_torin",
    name: "Torin da Pedra Fria",
    title_pt: "Guardião da Geada",
    title_en: "Frost Warder",
    affinity: "ice",
    trophies: 760,
    wins: 18,
    losses: 41,
    winStreak: 0,
    staffId: "frostbound",
    relicId: "none",
    hatId: "hat_wide",
    auraId: "aura_frost",
    capeId: "cape_none",
    robeId: "robe_classic",
    petId: "pet_none",
    look: {
      skinTone: "skin_tan",
      hairColor: "hair_grey",
      hairStyle: "hair_short",
      beardStyle: "beard_short",
      eyeColor: "eye_dark",
      gender: "gender_male",
      face: "face_square",
      earrings: "earring_none",
      noseRing: "nosering_none",
    },
    skills: ["iceshard", "frostnova", "ward", "focus"],
    bio_pt: "Constante e teimoso como uma geleira, não desiste de nenhum combate.",
    bio_en: "Persistent and steady as a glacier, never backs down from a challenge.",
    archetype: { id: "defense", name: "Barreira Fria", icon: "🧊", color: "#0284C7", tagline: "Resistência" },
  },
];

// ================= CONSTRUTOR DA LADDER COMPLETA =================
export function buildRankedLadder(playerData, rivals = INITIAL_LEADERBOARD_RIVALS) {
  const playerItem = {
    isPlayer: true,
    id: "player_me",
    name: playerData.name?.trim() || "Você",
    title_pt: playerData.tier?.name_pt || "Mago Duelista",
    title_en: playerData.tier?.name_en || "Dueling Mage",
    affinity: playerData.affinity || "fire",
    trophies: playerData.trophies || 1000,
    wins: playerData.rankedWins || 0,
    losses: playerData.rankedLosses || 0,
    winStreak: playerData.winStreak || 0,
    staffId: playerData.staffId || "ashwood",
    relicId: playerData.relicId || "wardsigil",
    hatId: playerData.hatId || "hat_pointed",
    auraId: playerData.auraId || "aura_ember",
    capeId: playerData.capeId || "wings_angel",
    robeId: playerData.robeId || "robe_midnight",
    petId: playerData.petId || "pet_imp",
    look: playerData.look || {},
    skills: playerData.chosen || [],
    bio_pt: "Seu mago lendário, forjando o caminho rumo ao trono de Soberano Arcano.",
    bio_en: "Your legendary mage carving a path toward the Ethereal Sovereign throne.",
    archetype: { id: "player", name: "Estilo Personalizado", icon: "⚡", color: "#F59E0B", tagline: "Seu Grimório" },
  };

  const list = [playerItem, ...rivals.map(r => ({ ...r, isPlayer: false }))];
  list.sort((a, b) => b.trophies - a.trophies);

  let playerRank = 1;
  const ladderWithRanks = list.map((item, index) => {
    const rank = index + 1;
    if (item.isPlayer) playerRank = rank;
    return { ...item, rank, tier: getTierForTrophies(item.trophies) };
  });

  return {
    ladder: ladderWithRanks,
    playerRank,
    playerTier: getTierForTrophies(playerData.trophies || 1000),
  };
}

// ================= HEADER PILL (COMPONENTE COMPACTO TOPO) =================
export function LeaderboardHeaderPill({ trophies = 1000, rank = 14, onClick, lang = "pt" }) {
  const tier = getTierForTrophies(trophies);
  return (
    <button
      onClick={onClick}
      title={lang === "pt" ? `Ranking Arcano: ${tier.name_pt} (Posição #${rank})` : `Arcane Leaderboard: ${tier.name_en} (Rank #${rank})`}
      className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-indigo-950/80 border hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1.5 flex-shrink-0 group"
      style={{
        borderColor: tier.border,
        boxShadow: `0 0 12px ${tier.glow}`,
      }}
    >
      <span className="text-xs sm:text-sm drop-shadow-[0_0_8px_currentColor] transition-transform group-hover:rotate-12" style={{ color: tier.color }}>
        {tier.icon}
      </span>
      <div className="flex items-baseline gap-1 font-mono">
        <span className="text-[10px] sm:text-xs font-bold" style={{ color: tier.color }}>
          {trophies}
        </span>
        <span className="text-[8.5px] sm:text-[10px] text-zinc-300 font-sans">
          #{rank}
        </span>
      </div>
    </button>
  );
}

// ================= MODAL COMPLETO DA LEADERBOARD =================
export function LeaderboardModal({
  isOpen,
  onClose,
  playerData,
  onChallengeRival,
  onClaimTierReward,
  claimedTierRewards = new Set(),
  lang = "pt",
  MageSprite,
  SKILLS = [],
  ELEMENTS = {},
  STAFFS = [],
  RELICS = [],
}) {
  const [activeTab, setActiveTab] = useState("division"); // 'division' | 'global' | 'streaks'
  const [inspectedMage, setInspectedMage] = useState(null);

  if (!isOpen) return null;

  const { ladder, playerRank, playerTier } = buildRankedLadder(playerData);
  const { nextTier, needed, percent } = getNextTier(playerData.trophies || 1000);

  // Filtros de visualização
  let displayedList = ladder;
  if (activeTab === "division") {
    // Mostra 4 rivais acima e 4 rivais abaixo do jogador
    const playerIndex = ladder.findIndex(x => x.isPlayer);
    const start = Math.max(0, playerIndex - 4);
    const end = Math.min(ladder.length, playerIndex + 5);
    displayedList = ladder.slice(start, end);
  } else if (activeTab === "streaks") {
    displayedList = [...ladder].sort((a, b) => (b.winStreak || 0) - (a.winStreak || 0));
  } else {
    // Global Top 50
    displayedList = ladder.slice(0, 50);
  }

  const canClaimReward = !claimedTierRewards.has(playerTier.id) && playerTier.rewardShards > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center safe-all p-2 sm:p-4 modal-backdrop" onClick={onClose}>
      <div
        className="w-full max-w-lg md:max-w-2xl modal-window max-h-[94dvh] md:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl rounded-2xl border"
        style={{ borderColor: playerTier.border }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/95 via-purple-950/90 to-indigo-950/95 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl sm:text-3xl drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">🏆</span>
            <div className="min-w-0">
              <h2 className="font-serif text-[17px] sm:text-[21px] font-bold text-amber-200 truncate">
                {lang === "pt" ? "Ranking Arcano · Hall da Fama" : "Arcane Leaderboard · Hall of Fame"}
              </h2>
              <p className="text-[9.5px] sm:text-[11px] font-sans text-indigo-200/80 truncate">
                {lang === "pt" ? "Temporada 1: Chamas da Glória · Fim em 4d 18h" : "Season 1: Flames of Glory · Ends in 4d 18h"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-400/20 text-zinc-200 hover:text-white transition-all text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Sticky Player Summary & Progression Card */}
        <div className="p-3 sm:p-3.5 bg-gradient-to-r from-indigo-950/90 via-purple-900/60 to-indigo-950/90 border-b border-indigo-500/20 flex-shrink-0">
          <div className="flex items-center justify-between gap-2.5 mb-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Tier Badge Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl border flex-shrink-0 shadow-md"
                style={{
                  backgroundColor: "rgba(30, 27, 75, 0.85)",
                  borderColor: playerTier.border,
                  boxShadow: `0 0 16px ${playerTier.glow}`,
                }}
              >
                {playerTier.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-sm sm:text-base font-black text-white truncate">
                    {playerData.name?.trim() || (lang === "pt" ? "Você" : "You")}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono font-bold text-amber-300">
                    #{playerRank}
                  </span>
                </div>
                <div className="text-[10.5px] sm:text-xs font-sans font-bold flex items-center gap-1.5" style={{ color: playerTier.color }}>
                  <span>{lang === "pt" ? playerTier.name_pt : playerTier.name_en}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="font-mono text-zinc-300">{playerData.trophies || 1000} 🏆</span>
                  {playerData.winStreak > 1 && (
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <span>🔥</span>
                      <span>{playerData.winStreak}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Claim Tier Reward Button */}
            {canClaimReward ? (
              <button
                onClick={() => onClaimTierReward(playerTier)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border border-amber-300 text-slate-950 font-bold text-[11px] font-sans shadow-lg flex items-center gap-1.5 animate-bounce"
              >
                <span>🎁</span>
                <span>{lang === "pt" ? `Resgatar ${playerTier.rewardShards}✦` : `Claim ${playerTier.rewardShards}✦`}</span>
              </button>
            ) : (
              <div className="text-right hidden xs:block">
                <span className="text-[9px] font-sans text-zinc-400 uppercase tracking-wider block">
                  {lang === "pt" ? "Recompensa da Liga" : "League Reward"}
                </span>
                <span className="font-mono text-xs font-bold text-amber-300">
                  {playerTier.rewardShards} ✦ Shards
                </span>
              </div>
            )}
          </div>

          {/* Tier Progress Bar to Next Rank */}
          {nextTier ? (
            <div className="w-full">
              <div className="flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-sans mb-1 text-zinc-400">
                <span>
                  {lang === "pt" ? `Rumo a ${nextTier.name_pt}` : `Path to ${nextTier.name_en}`} {nextTier.icon}
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {lang === "pt" ? `Faltam ${needed} troféus` : `${needed} trophies to rank up`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 border border-white/10 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    background: `linear-gradient(90deg, ${playerTier.color}, ${nextTier.color})`,
                    boxShadow: `0 0 10px ${nextTier.color}`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] font-sans font-bold text-amber-300 py-0.5">
              🌌 {lang === "pt" ? "Você alcançou a glória máxima do Soberano Arcano!" : "You reached the pinnacle of Ethereal Sovereignty!"}
            </div>
          )}
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-white/10 flex-shrink-0">
          <button
            onClick={() => setActiveTab("division")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "division"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 border border-transparent"
            }`}
          >
            <span>⚔️</span>
            <span>{lang === "pt" ? "Minha Divisão" : "My Division"}</span>
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "global"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 border border-transparent"
            }`}
          >
            <span>🏆</span>
            <span>{lang === "pt" ? "Top 50 Global" : "Top 50 Global"}</span>
          </button>
          <button
            onClick={() => setActiveTab("streaks")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "streaks"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 border border-transparent"
            }`}
          >
            <span>🔥</span>
            <span>{lang === "pt" ? "Sequências" : "Win Streaks"}</span>
          </button>
        </div>

        {/* Ladder Roster List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-3 space-y-1.5 min-h-[220px]">
          {displayedList.map(entry => {
            const isTop3 = entry.rank <= 3;
            const topBadge = entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : null;
            const el = ELEMENTS[entry.affinity] || ELEMENTS.fire;

            return (
              <div
                key={entry.id}
                className={`w-full rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 transition-all border ${
                  entry.isPlayer
                    ? "bg-amber-500/15 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : isTop3
                    ? "bg-slate-900/90 border-amber-500/30 shadow-md"
                    : "bg-slate-900/60 hover:bg-slate-850 border-white/5"
                }`}
              >
                {/* Left: Rank & Avatar */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {/* Rank Position */}
                  <div className="w-6 sm:w-7 text-center flex-shrink-0">
                    {topBadge ? (
                      <span className="text-base sm:text-lg">{topBadge}</span>
                    ) : (
                      <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Element Affinity Dot & Mini Badge */}
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-sm border flex-shrink-0 shadow-sm relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${el.color}33, rgba(15,23,42,0.9))`,
                      borderColor: `${el.color}66`,
                    }}
                  >
                    <span>{el.icon}</span>
                  </div>

                  {/* Name & Title */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-serif text-xs sm:text-sm font-bold truncate ${entry.isPlayer ? "text-amber-300" : "text-zinc-100"}`}>
                        {entry.name}
                      </span>
                      {entry.isPlayer && (
                        <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[8px] font-sans font-black uppercase tracking-wider">
                          {lang === "pt" ? "VOCÊ" : "YOU"}
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] sm:text-[10.5px] font-sans text-zinc-400 truncate flex items-center gap-1.5">
                      <span>{lang === "pt" ? entry.title_pt : entry.title_en}</span>
                      {entry.winStreak > 1 && (
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          <span>🔥</span>
                          <span>{entry.winStreak}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Trophies & Direct Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="text-right pr-1">
                    <div className="font-mono text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-end gap-1">
                      <span>{entry.trophies}</span>
                      <span className="text-[10px]">🏆</span>
                    </div>
                    <div className="text-[8.5px] sm:text-[9.5px] font-sans text-zinc-400">
                      {entry.tier?.icon} {lang === "pt" ? entry.tier?.title_pt : entry.tier?.title_en}
                    </div>
                  </div>

                  {!entry.isPlayer && (
                    <div className="flex items-center gap-1">
                      {/* Inspect Button */}
                      <button
                        onClick={() => setInspectedMage(entry)}
                        title={lang === "pt" ? "Inspecionar Mago" : "Inspect Mage"}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-zinc-300 hover:text-white transition-all text-xs"
                      >
                        🔍
                      </button>
                      {/* Challenge to Duel Button */}
                      <button
                        onClick={() => {
                          onClose();
                          onChallengeRival(entry);
                        }}
                        className="px-2 sm:px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 border border-amber-400/50 text-white font-serif font-bold text-[10px] sm:text-[11px] shadow-sm flex items-center gap-1 active:scale-95 transition-all"
                        title={lang === "pt" ? `Desafiar ${entry.name} para Duelo!` : `Challenge ${entry.name} to a Duel!`}
                      >
                        <span>⚔️</span>
                        <span className="hidden xs:inline">{lang === "pt" ? "Desafiar" : "Duel"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="p-2 sm:p-2.5 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-sans text-zinc-400 flex-shrink-0">
          <span className="flex items-center gap-1 text-amber-300">
            <span>✨</span>
            <span>{lang === "pt" ? "Vença duelos para subir na liga e ganhar Shards!" : "Win duels to climb the leagues & earn Shards!"}</span>
          </span>
          <span className="hidden xs:inline text-zinc-500">
            {lang === "pt" ? "Top 1 ganha título Soberano" : "Rank #1 earns Sovereign title"}
          </span>
        </div>

        {/* Rival Detail Inspect Modal (Nested overlay) */}
        {inspectedMage && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 modal-backdrop" onClick={() => setInspectedMage(null)}>
            <div
              className="w-full max-w-sm rounded-2xl bg-slate-950 border border-amber-500/40 p-4 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectedMage(null)}
                className="absolute top-3 right-3 p-1 rounded-lg bg-slate-800 border border-white/10 text-zinc-400 text-xs"
              >
                ✕
              </button>

              <div className="text-2xl mb-1">{ELEMENTS[inspectedMage.affinity]?.icon}</div>
              <h3 className="font-serif text-lg font-bold text-amber-200">
                {inspectedMage.name}
              </h3>
              <p className="text-xs font-sans text-amber-400/90 mb-2">
                {lang === "pt" ? inspectedMage.title_pt : inspectedMage.title_en}
              </p>

              {/* Bio */}
              <p className="text-[11px] font-sans text-zinc-300 bg-slate-900/80 p-2 rounded-xl border border-white/5 mb-3">
                {lang === "pt" ? inspectedMage.bio_pt : inspectedMage.bio_en}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-1.5 w-full mb-3 text-center">
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[9px] text-zinc-400">{lang === "pt" ? "Troféus" : "Trophies"}</div>
                  <div className="font-mono text-xs font-bold text-amber-300">{inspectedMage.trophies} 🏆</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[9px] text-zinc-400">{lang === "pt" ? "Sequência" : "Streak"}</div>
                  <div className="font-mono text-xs font-bold text-red-400">🔥 {inspectedMage.winStreak}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[9px] text-zinc-400">{lang === "pt" ? "Vitórias" : "Wins"}</div>
                  <div className="font-mono text-xs font-bold text-emerald-400">{inspectedMage.wins}V / {inspectedMage.losses}D</div>
                </div>
              </div>

              {/* Equipment summary */}
              <div className="w-full text-left bg-slate-900/60 p-2.5 rounded-xl border border-white/5 mb-3 text-[10.5px] space-y-1">
                <div className="text-zinc-400 flex justify-between">
                  <span>{lang === "pt" ? "Cajado:" : "Staff:"}</span>
                  <span className="text-amber-200 font-bold">{STAFFS.find(s => s.id === inspectedMage.staffId)?.name || inspectedMage.staffId}</span>
                </div>
                <div className="text-zinc-400 flex justify-between">
                  <span>{lang === "pt" ? "Relíquia:" : "Relic:"}</span>
                  <span className="text-sky-300 font-bold">{RELICS.find(r => r.id === inspectedMage.relicId)?.name || "Nenhuma"}</span>
                </div>
                <div className="text-zinc-400 flex justify-between">
                  <span>{lang === "pt" ? "Afinidade:" : "Affinity:"}</span>
                  <span style={{ color: ELEMENTS[inspectedMage.affinity]?.color }}>
                    {ELEMENTS[inspectedMage.affinity]?.name} (+25%)
                  </span>
                </div>
              </div>

              {/* Challenge Button */}
              <button
                onClick={() => {
                  setInspectedMage(null);
                  onClose();
                  onChallengeRival(inspectedMage);
                }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 font-serif font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>⚔️</span>
                <span>{lang === "pt" ? `Desafiar ${inspectedMage.name}` : `Duel ${inspectedMage.name}`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= RESULT BANNER (COMPONENTE PÓS-DUELO) =================
export function LeaderboardResultBanner({
  isWin,
  trophyDelta = 0,
  oldTrophies = 1000,
  newTrophies = 1000,
  oldRank = 14,
  newRank = 14,
  isPromotion = false,
  lang = "pt",
}) {
  const currentTier = getTierForTrophies(newTrophies);
  const rankImproved = newRank < oldRank;

  return (
    <div
      className="w-full rounded-xl p-2.5 sm:p-3 my-2 border text-left shadow-lg relative overflow-hidden"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        borderColor: isWin ? "rgba(245, 158, 11, 0.5)" : "rgba(239, 68, 68, 0.3)",
        boxShadow: isWin ? "0 0 20px rgba(245, 158, 11, 0.2)" : "none",
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-base sm:text-lg">{currentTier.icon}</span>
          <span className="font-serif text-xs sm:text-sm font-bold text-amber-200">
            {lang === "pt" ? "Classificação no Ranking Arcano" : "Arcane Leaderboard Standing"}
          </span>
        </div>
        <span
          className="font-mono text-xs sm:text-sm font-black flex items-center gap-1"
          style={{ color: isWin ? "#FBBF24" : "#F87171" }}
        >
          {trophyDelta > 0 ? `+${trophyDelta}` : `${trophyDelta}`} 🏆
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] font-sans">
        <div className="text-zinc-300">
          <span className="text-zinc-400">{lang === "pt" ? "Troféus:" : "Trophies:"} </span>
          <span className="font-mono font-bold text-white">{oldTrophies}</span>
          <span className="text-amber-400 mx-1">➔</span>
          <span className="font-mono font-bold text-amber-300">{newTrophies}</span>
        </div>

        <div>
          {rankImproved ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span>▲</span>
              <span>{lang === "pt" ? `Subiu para #${newRank}!` : `Climbed to #${newRank}!`}</span>
            </span>
          ) : (
            <span className="text-zinc-400">
              #{newRank} {lang === "pt" ? currentTier.name_pt : currentTier.name_en}
            </span>
          )}
        </div>
      </div>

      {isPromotion && (
        <div className="mt-2 pt-2 border-t border-amber-500/30 text-center text-xs font-serif font-black text-amber-300 animate-pulse">
          🎉 {lang === "pt" ? `PROMOVIDO A ${currentTier.name_pt.toUpperCase()}!` : `PROMOTED TO ${currentTier.name_en.toUpperCase()}!`}
        </div>
      )}
    </div>
  );
}
