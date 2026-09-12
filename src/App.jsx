import { useState, useRef, useEffect, useMemo } from "react";
import {
  StaffStormcaller,
  StaffBloodpact,
  StaffCoralScepter,
  HatWarlord,
  HatLaurel,
  HatJester,
  CapeBanner,
  CapeFur,
  CapeVoid,
  RobeSunburstTrim,
  RobeFrostveilTrim,
  RobeVerdantTrim,
  OffhandBuckler,
  OffhandSkull,
  OffhandPrism,
  PetDragon,
  PetOwl,
  PetMushroom,
} from "./ItemsExtra.jsx";

import {
  TurnCountdownBar,
  CombatBar,
  StatusFXOverlay,
  SpellProjectile,
  ImpactFX,
  SelfCastFX,
  ModernSkillCard,
  ArcaneChronicle,
  SurrenderModal,
} from "./BattleFX.jsx";

// ================= DESIGN SYSTEM TOKENS =================
export const T = {
  // Backgrounds (hierarquia de profundidade)
  bgDeep:     "#08060F",   // fundo do jogo
  bgBase:     "#0F0C1F",   // painéis principais
  bgSurface:  "#1A1630",   // cards
  bgElevated: "#242043",   // cards destacados / hover
  bgOverlay:  "#0A0814EE", // modais

  // Borders
  borderSubtle:  "#2A2444",
  borderDefault: "#3A3356",
  borderStrong:  "#4A4270",

  // Text
  textPrimary:   "#F2EAD8",
  textSecondary: "#B7AE95",
  textTertiary:  "#8E87A5",
  textMuted:     "#5A5478",

  // Brand
  gold:      "#E8B44F",
  goldDark:  "#C08A2E",
  goldLight: "#FFE28A",

  // Feedback
  success: "#72C063",
  danger:  "#EF4444",
  warning: "#F59E0B",
  info:    "#5FC1E8",

  // Elementos (mantém os atuais)
  fire:   "#FF6B3D",
  ice:    "#5FC1E8",
  nature: "#72C063",
  arcane: "#B07FF5",

  // Raridades (mantém os atuais)
  common:    "#9AA0B4",
  rare:      "#4FA3E8",
  epic:      "#B07FF5",
  legendary: "#E8B44F",
};

// ================= LOCALIZATION (PT-BR / EN) =================
export const I18N = {
  pt: {
    // General
    langName: "Português (BR)",
    langFlag: "🇧🇷",
    level: "Nv.",
    xp: "XP",
    cancel: "Cancelar",
    confirm: "Confirmar",
    back: "Voltar",
    close: "Fechar",
    save: "Salvar",
    edit: "Editar",
    customize: "Personalizar",
    previewLive: "Prévia em Tempo Real",
    tapToEquip: "Toque para equipar",
    shards: "Shards",
    coins: "Moedas",

    // Creation Screen
    createTitle: "Crie seu Arquimago",
    createSubtitle: "Forje seu legado arcano e domine os elementos",
    createNameLabel: "Nome do Mago",
    createNamePlaceholder: "Ex: Ignis, Zephyr, Astraea...",
    createRandomName: "Gerar Nome",
    createRandomLook: "Aleatório",
    createRandomMage: "Sorteio Aleatório",
    createSuggestions: "Sugestões:",
    createAffinityLabel: "Afinidade Elemental",
    createAffinityDesc: "+25% dano nos feitiços do elemento",
    createGenderLabel: "Gênero do Personagem",
    male: "Masculino",
    female: "Feminino",
    maleSymbol: "♂ Masculino",
    femaleSymbol: "♀ Feminino",
    beginJourney: "⚔️ Iniciar Jornada",
    enterNamePrompt: "⚠️ Digite o nome do seu mago para iniciar a jornada",
    newMage: "Novo Mago",

    // Tabs
    tabIdentity: "Identidade",
    tabBody: "Rosto & Pele",
    tabHair: "Cabelo & Estilo",
    tabBodySkin: "Corpo & Pele",
    tabHairBeard: "Cabelo & Barba",
    tabFaceJewelry: "Rosto & Joias",

    // Customization Categories
    skinTone: "Tom de Pele",
    faceShape: "Formato do Rosto",
    eyeColor: "Cor dos Olhos",
    gloves: "Luvas & Manoplas",
    hairColor: "Cor do Cabelo",
    hairstyle: "Penteado",
    beardStyle: "Estilo de Barba",
    earrings: "Brincos",
    noseRing: "Piercing de Nariz",

    // Elements
    elFire: "Fogo",
    elIce: "Gelo",
    elNature: "Natureza",
    elArcane: "Arcano",
    fireRole: "Explosão & Queimadura",
    iceRole: "Controle & Congelamento",
    natureRole: "Cura Vital & Enraizamento",
    arcaneRole: "Mana & Feitiços Puros",

    // Hub Portals & Header
    grimoire: "Grimório",
    grimoireSub: "Magias",
    gear: "Equipamento",
    gearSub: "Cajado & Relíquia",
    style: "Cosméticos",
    styleSub: "Auras, Pets & Capas",
    shop: "Loja Arcana",
    pass: "Passe Batalha",
    appearance: "Aparência",
    appearanceSub: "Customizar Mago",
    findDuel: "ENCONTRAR OPONENTE",
    searchingOpponent: "Buscando oponente nos leylines...",
    matchFound: "Oponente Encontrado!",
    bossTrials: "Provas de Arquimagos",
    bossTrialsSub: "Treinamento de Mestres Elementais",
    tutorial: "Tutorial",
    dailyModifier: "Modificador Diário",
    spellSlots: "Slots de Feitiço",
    fullGrimoire: "📖 Grimório Completo",
    friends: "Amigos",
    settings: "Configurações",

    // Modals
    grimoireTitle: "Grimório de Feitiços",
    gearTitle: "Equipamentos de Combate",
    styleTitle: "Cosméticos & Estilo",
    appearanceTitle: "Aparência do Mago",
    shopTitle: "Loja Arcana",
    passTitle: "Passe de Batalha: Season of Embers",
    settingsTitle: "Configurações & Painel Administrativo",
    languageSection: "Idioma do Jogo",
    languageSectionSub: "Selecione o idioma de exibição do jogo",

    // Pre-Battle Scout
    duelConfrontation: "Confronto de Magos",
    duelMatchmaking: "Pareamento de Duelo",
    inspectSpells: "Ver Magias & Loadout",
    editDeck: "Ajustar meu Deck",
    enterCombat: "ENTRAR NA ARENA",
    newOpponent: "Novo Oponente",
    forfeit: "Render-se",
    viewBoth: "Ambos",
    viewYourLoadout: "Seu Loadout",
    viewEnemy: "Inimigo",
    backHub: "← Hub",

    // Combat
    yourTurn: "Seu Turno",
    enemyTurn: "Turno do Inimigo",
    focusAction: "Foco (+12 Mana) [Espaço]",
    surrenderConfirmTitle: "Deseja render-se do duelo?",
    surrenderConfirmText: "A rendição contará como derrota e encerrará a batalha imediatamente.",
    surrenderKeepFighting: "Continuar Lutando",
    surrenderYes: "Sim, Render-se",
    combatLogTitle: "Crônica Arcana",

    // Results
    gloriousVictory: "VITÓRIA GLORIOSA!",
    defeat: "DERROTA",
    victorySub: "Você dominou as artes arcanas e superou seu oponente!",
    defeatSub: "Seus feitiços falharam desta vez, mas a sabedoria vem do combate.",
    nextDuel: "Próximo Duelo",
    returnHub: "Voltar ao Hub",
    rewards: "Recompensas Obtidas",
    xpEarned: "XP do Mago",
    shardsEarned: "Shards Arcanos",
    trainingComplete: "Treinamento Concluído!",
    archmageDefeated: "Arquimago Derrotado!",
  },
  en: {
    // General
    langName: "English",
    langFlag: "🇺🇸",
    level: "Lv.",
    xp: "XP",
    cancel: "Cancel",
    confirm: "Confirm",
    back: "Back",
    close: "Close",
    save: "Save",
    edit: "Edit",
    customize: "Customize",
    previewLive: "Real-time Preview",
    tapToEquip: "Tap to equip",
    shards: "Shards",
    coins: "Coins",

    // Creation Screen
    createTitle: "Create your Archmage",
    createSubtitle: "Forge your arcane legacy and master the elements",
    createNameLabel: "Mage Name",
    createNamePlaceholder: "E.g. Ignis, Zephyr, Astraea...",
    createRandomName: "Random Name",
    createRandomLook: "Randomize",
    createRandomMage: "Randomize Look",
    createSuggestions: "Suggestions:",
    createAffinityLabel: "Elemental Affinity",
    createAffinityDesc: "+25% matching spell damage",
    createGenderLabel: "Character Gender",
    male: "Male",
    female: "Female",
    maleSymbol: "♂ Male",
    femaleSymbol: "♀ Female",
    beginJourney: "⚔️ Begin Journey",
    enterNamePrompt: "⚠️ Enter your mage's name to begin the journey",
    newMage: "New Mage",

    // Tabs
    tabIdentity: "Identity",
    tabBody: "Face & Skin",
    tabHair: "Hair & Style",
    tabBodySkin: "Body & Skin",
    tabHairBeard: "Hair & Beard",
    tabFaceJewelry: "Face & Jewelry",

    // Customization Categories
    skinTone: "Skin Tone",
    faceShape: "Face Shape",
    eyeColor: "Eye Color",
    gloves: "Gloves & Gauntlets",
    hairColor: "Hair Color",
    hairstyle: "Hairstyle",
    beardStyle: "Beard Style",
    earrings: "Earrings",
    noseRing: "Nose Ring",

    // Elements
    elFire: "Fire",
    elIce: "Ice",
    elNature: "Nature",
    elArcane: "Arcane",
    fireRole: "Burst & Burn",
    iceRole: "Control & Freeze",
    natureRole: "Vital Heal & Root",
    arcaneRole: "Pure Mana & Burst",

    // Hub Portals & Header
    grimoire: "Grimoire",
    grimoireSub: "Spells",
    gear: "Gear",
    gearSub: "Staff & Relic",
    style: "Cosmetics",
    styleSub: "Auras, Pets & Capes",
    shop: "Arcane Shop",
    pass: "Battle Pass",
    appearance: "Appearance",
    appearanceSub: "Customize Mage",
    findDuel: "FIND OPPONENT",
    searchingOpponent: "Searching arcane leylines for duelists...",
    matchFound: "Opponent Found!",
    bossTrials: "Archmage Trials",
    bossTrialsSub: "Master Training & Tier 3 Spells",
    tutorial: "Tutorial",
    dailyModifier: "Daily Leyline",
    spellSlots: "Spell Sockets",
    fullGrimoire: "📖 Full Grimoire",
    friends: "Friends",
    settings: "Settings",

    // Modals
    grimoireTitle: "Spell Grimoire",
    gearTitle: "Combat Gear",
    styleTitle: "Cosmetics & Style",
    appearanceTitle: "Mage Appearance",
    shopTitle: "Arcane Shop",
    passTitle: "Battle Pass: Season of Embers",
    settingsTitle: "Developer Tools & Settings",
    languageSection: "Game Language",
    languageSectionSub: "Select the display language for the game interface",

    // Pre-Battle Scout
    duelConfrontation: "Mage Confrontation",
    duelMatchmaking: "Duel Matchmaking",
    inspectSpells: "Inspect Spells & Loadout",
    editDeck: "Edit My Deck",
    enterCombat: "ENTER THE ARENA",
    newOpponent: "New Opponent",
    forfeit: "Forfeit",
    viewBoth: "Both",
    viewYourLoadout: "Your Loadout",
    viewEnemy: "Enemy",
    backHub: "← Hub",

    // Combat
    yourTurn: "Your Turn",
    enemyTurn: "Enemy Turn",
    focusAction: "Focus (+12 Mana) [Space]",
    surrenderConfirmTitle: "Surrender from duel?",
    surrenderConfirmText: "Surrendering counts as a defeat and ends the battle immediately.",
    surrenderKeepFighting: "Keep Fighting",
    surrenderYes: "Yes, Surrender",
    combatLogTitle: "Arcane Chronicle",

    // Results
    gloriousVictory: "GLORIOUS VICTORY!",
    defeat: "DEFEAT",
    victorySub: "You mastered the arcane arts and bested your opponent!",
    defeatSub: "Your spells fell short this time, but wisdom is forged in combat.",
    nextDuel: "Next Duel",
    returnHub: "Return to Hub",
    rewards: "Rewards Earned",
    xpEarned: "Mage XP",
    shardsEarned: "Arcane Shards",
    trainingComplete: "Training Completed!",
    archmageDefeated: "Archmage Defeated!",
  },
};

export const getElementName = (elKey, lang = "pt") => {
  const el = ELEMENTS[elKey];
  if (!el) return elKey;
  return lang === "pt" ? (el.ptName || el.name) : (el.enName || el.name);
};

// ================= GAME DATA =================
const ELEMENTS = {
  fire:   { name: "Fire", ptName: "Fogo", enName: "Fire", color: T.fire, icon: "▲" },
  ice:    { name: "Ice", ptName: "Gelo", enName: "Ice", color: T.ice, icon: "◆" },
  nature: { name: "Nature", ptName: "Natureza", enName: "Nature", color: T.nature, icon: "❋" },
  arcane: { name: "Arcane", ptName: "Arcano", enName: "Arcane", color: T.arcane, icon: "✶" },
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
  // FIRE (9 skills: 3 attack, 3 control, 3 support across 3 tiers)
  { id: "emberjab",       name: "Ember Jab",       el: "fire", tier: 1, role: "attack",  dmg: 13, mana: 6,  cd: 0, desc: "Cheap fire strike.", upgradeOf: null, unlock: { type: "starter" } },
  { id: "fireball",       name: "Fireball",        el: "fire", tier: 1, role: "control", dmg: 26, mana: 15, cd: 0, desc: "Heavy. Detonates Burn combos.", effect: { status: "burn", duration: 3, chance: 35 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "cauterize",      name: "Cauterize",       el: "fire", tier: 1, role: "support", dmg: 0,  mana: 9,  cd: 2, heal: 16, desc: "Heal 16 HP with flame. CD 2.", upgradeOf: null, unlock: { type: "level", value: 2 } },
  { id: "scorch",         name: "Scorch",          el: "fire", tier: 2, role: "attack",  dmg: 22, mana: 12, cd: 0, desc: "Ignite foe. 100% burn (2t).", effect: { status: "burn", duration: 2, chance: 100 }, upgradeOf: null, unlock: { type: "level", value: 6 } },
  { id: "firewall",       name: "Fire Wall",       el: "fire", tier: 2, role: "control", dmg: 14, mana: 13, cd: 2, shield: 14, desc: "Barricade: 14 dmg & 14 shield. CD 2.", effect: { status: "shield", amount: 14 }, upgradeOf: null, unlock: { type: "tome", value: "tome_firewall" } },
  { id: "combustion",     name: "Combustion",      el: "fire", tier: 2, role: "support", dmg: 20, mana: 10, cd: 1, desc: "Quick spark: 20 dmg. CD 1.", upgradeOf: "emberjab", unlock: { type: "mastery", value: "emberjab", casts: 8 } },
  { id: "inferno",        name: "Inferno",         el: "fire", tier: 3, role: "attack",  dmg: 38, mana: 18, cd: 2, desc: "Raging blaze: 38 dmg + 3t burn. CD 2.", effect: { status: "burn", duration: 3, chance: 75 }, upgradeOf: "fireball", unlock: { type: "mastery", value: "fireball", casts: 10 } },
  { id: "sunburst",       name: "Sunburst",        el: "fire", tier: 3, role: "control", dmg: 34, mana: 16, cd: 2, desc: "Solar flare: 34 dmg + Chills foe. CD 2.", effect: { status: "chill", chance: 80 }, upgradeOf: null, unlock: { type: "tome", value: "tome_sunburst" } },
  { id: "phoenix_flame",  name: "Phoenix Flame",   el: "fire", tier: 3, role: "support", dmg: 24, mana: 16, cd: 3, heal: 22, desc: "Sacred fire: 24 dmg + 22 HP heal. CD 3.", effect: { status: "drain", amount: 22 }, upgradeOf: null, unlock: { type: "boss", value: "Ignis the Pyromancer" } },

  // ICE (9 skills: 3 attack, 3 control, 3 support across 3 tiers)
  { id: "iceshard",       name: "Ice Shard",       el: "ice",  tier: 1, role: "attack",  dmg: 13, mana: 6,  cd: 0, desc: "Cheap ice strike.", upgradeOf: null, unlock: { type: "starter" } },
  { id: "frostlance",     name: "Frost Lance",     el: "ice",  tier: 1, role: "control", dmg: 26, mana: 15, cd: 0, desc: "Heavy. Shatters chilled foes.", effect: { status: "chill", chance: 40 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "glaze",          name: "Glaze",           el: "ice",  tier: 1, role: "support", dmg: 0,  mana: 8,  cd: 2, shield: 16, desc: "Frost coat: +16 shield. CD 2.", effect: { status: "shield", amount: 16 }, upgradeOf: null, unlock: { type: "level", value: 3 } },
  { id: "frostbite",      name: "Frostbite",       el: "ice",  tier: 2, role: "attack",  dmg: 20, mana: 11, cd: 0, desc: "Piercing cold: 20 dmg. 60% chill.", effect: { status: "chill", chance: 60 }, upgradeOf: null, unlock: { type: "level", value: 7 } },
  { id: "blizzard",       name: "Blizzard",        el: "ice",  tier: 2, role: "control", dmg: 28, mana: 14, cd: 2, desc: "Howling storm: 28 dmg + 100% chill. CD 2.", effect: { status: "chill", chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_blizzard" } },
  { id: "permafrost",     name: "Permafrost",      el: "ice",  tier: 2, role: "support", dmg: 18, mana: 10, cd: 1, shield: 10, desc: "Glacial strike: 18 dmg + 10 shield. CD 1.", effect: { status: "shield", amount: 10 }, upgradeOf: "iceshard", unlock: { type: "mastery", value: "iceshard", casts: 8 } },
  { id: "glacial_spike",  name: "Glacial Spike",   el: "ice",  tier: 3, role: "attack",  dmg: 38, mana: 18, cd: 2, desc: "Pillar of ice: 38 dmg + 100% chill. CD 2.", effect: { status: "chill", chance: 100 }, upgradeOf: "frostlance", unlock: { type: "mastery", value: "frostlance", casts: 10 } },
  { id: "absolute_zero",  name: "Absolute Zero",   el: "ice",  tier: 3, role: "control", dmg: 32, mana: 16, cd: 3, desc: "Deep freeze: 32 dmg, chills foe. CD 3.", effect: { status: "chill", chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_absolute_zero" } },
  { id: "ice_barrier",    name: "Ice Barrier",     el: "ice",  tier: 3, role: "support", dmg: 0,  mana: 15, cd: 3, shield: 35, desc: "Glacial fortress: +35 shield. CD 3.", effect: { status: "shield", amount: 35 }, upgradeOf: null, unlock: { type: "boss", value: "Kael the Frostweaver" } },

  // NATURE (9 skills: 3 attack, 3 control, 3 support across 3 tiers)
  { id: "saplife",        name: "Sap Life",        el: "nature", tier: 1, role: "attack",  dmg: 12, mana: 10, cd: 0, heal: 12, desc: "Drain 12 HP, heal 12.", effect: { status: "drain", amount: 12 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "thorns",         name: "Wild Thorns",     el: "nature", tier: 1, role: "control", dmg: 26, mana: 15, cd: 0, desc: "Heavy. Entangles & pierces roots.", effect: { status: "entangle", amount: 8, chance: 40 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "soothing_bloom", name: "Soothing Bloom",  el: "nature", tier: 1, role: "support", dmg: 0,  mana: 7,  cd: 2, heal: 15, desc: "Floral restorative: +15 HP. CD 2.", effect: { status: "heal", amount: 15 }, upgradeOf: null, unlock: { type: "level", value: 2 } },
  { id: "venom_strike",   name: "Venom Strike",    el: "nature", tier: 2, role: "attack",  dmg: 18, mana: 11, cd: 0, desc: "Poison thorn: 18 dmg + 2t poison.", effect: { status: "burn", duration: 2, chance: 75 }, upgradeOf: null, unlock: { type: "level", value: 8 } },
  { id: "bramble_wrap",   name: "Bramble Wrap",    el: "nature", tier: 2, role: "control", dmg: 20, mana: 12, cd: 2, desc: "Vines: 20 dmg + roots foe (2t). CD 2.", effect: { status: "entangle", amount: 10, chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_bramble_wrap" } },
  { id: "barkskin",       name: "Barkskin",        el: "nature", tier: 2, role: "support", dmg: 16, mana: 12, cd: 1, heal: 14, shield: 10, desc: "Sylvan armor: 16 dmg, drain 14, +10 shield. CD 1.", effect: { status: "drain", amount: 14 }, upgradeOf: "saplife", unlock: { type: "mastery", value: "saplife", casts: 8 } },
  { id: "wrath_of_nature",name: "Wrath of Nature", el: "nature", tier: 3, role: "attack",  dmg: 36, mana: 18, cd: 2, desc: "Primal fury: 36 dmg + roots foe. CD 2.", effect: { status: "entangle", amount: 12, chance: 100 }, upgradeOf: "thorns", unlock: { type: "mastery", value: "thorns", casts: 10 } },
  { id: "spore_cloud",    name: "Spore Cloud",     el: "nature", tier: 3, role: "control", dmg: 28, mana: 15, cd: 2, desc: "Toxic spores: 28 dmg + 2t poison. CD 2.", effect: { status: "burn", duration: 2, chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_spore_cloud" } },
  { id: "world_tree_grace",name:"World Tree Grace",el: "nature", tier: 3, role: "support", dmg: 0,  mana: 14, cd: 3, heal: 28, shield: 16, desc: "Ancient blessing: +28 HP, +16 shield. CD 3.", effect: { status: "heal", amount: 28 }, upgradeOf: null, unlock: { type: "boss", value: "Sylva the Archdruid" } },

  // ARCANE (9 skills: 3 attack, 3 control, 3 support across 3 tiers)
  { id: "bolt",           name: "Arcane Bolt",     el: "arcane", tier: 1, role: "attack",  dmg: 17, mana: 7,  cd: 0, desc: "Reliable neutral hit.", upgradeOf: null, unlock: { type: "starter" } },
  { id: "mind_sear",      name: "Mind Sear",       el: "arcane", tier: 1, role: "control", dmg: 15, mana: 9,  cd: 0, desc: "Disarray: 15 dmg, 50% drain 6 mana.", effect: { status: "entangle", amount: 6, chance: 50 }, upgradeOf: null, unlock: { type: "level", value: 4 } },
  { id: "ward",           name: "Runic Ward",      el: "arcane", tier: 1, role: "support", dmg: 0,  mana: 9,  cd: 3, shield: 22, desc: "Shield 22 dmg (+20% atk power). CD 3.", effect: { status: "shield", amount: 22 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "aether_lance",   name: "Aether Lance",    el: "arcane", tier: 2, role: "attack",  dmg: 28, mana: 14, cd: 1, desc: "Pure mana spear: 28 dmg. CD 1.", upgradeOf: null, unlock: { type: "level", value: 9 } },
  { id: "time_dilation",  name: "Time Dilation",   el: "arcane", tier: 2, role: "control", dmg: 18, mana: 12, cd: 2, desc: "Slow time: 18 dmg + 100% chill. CD 2.", effect: { status: "chill", chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_time_dilation" } },
  { id: "surge",          name: "Mana Surge",      el: "arcane", tier: 2, role: "support", dmg: 0,  mana: 0,  cd: 3, restore: 18, desc: "Restore 18 mana. CD 3.", effect: { status: "restore", amount: 18 }, upgradeOf: null, unlock: { type: "starter" } },
  { id: "supernova",      name: "Supernova",       el: "arcane", tier: 3, role: "attack",  dmg: 40, mana: 18, cd: 2, desc: "Cosmic blast: 40 neutral dmg. CD 2.", upgradeOf: "bolt", unlock: { type: "mastery", value: "bolt", casts: 10 } },
  { id: "void_rift",      name: "Void Rift",       el: "arcane", tier: 3, role: "control", dmg: 32, mana: 15, cd: 2, desc: "Void tear: 32 dmg + drain 10 mana. CD 2.", effect: { status: "entangle", amount: 10, chance: 100 }, upgradeOf: null, unlock: { type: "tome", value: "tome_void_rift" } },
  { id: "astral_projection",name:"Astral Projection",el: "arcane",tier: 3, role: "support", dmg: 0,  mana: 5,  cd: 3, shield: 26, restore: 14, desc: "Shift planes: +26 shield & +14 mana. CD 3.", effect: { status: "shield", amount: 26 }, upgradeOf: null, unlock: { type: "boss", value: "Vaelin the Chronomancer" } },
];

const FOCUS = { id: "focus", name: "Focus", el: "arcane", tier: 1, role: "support", dmg: 0, mana: 0, cd: 0, restore: 10, desc: "Recover 10 mana." };

const START_SKILLS = ["fireball", "emberjab", "frostlance", "iceshard", "thorns", "saplife", "bolt", "ward", "surge"];

const TOMES = [
  { id: "tome_firewall", skillId: "firewall", name: "Grimoire of Fire Wall", el: "fire", rarity: "rare", desc: "Unlocks the Fire Wall spell." },
  { id: "tome_sunburst", skillId: "sunburst", name: "Tome of the Blazing Sun", el: "fire", rarity: "legendary", desc: "Unlocks the Sunburst spell." },
  { id: "tome_blizzard", skillId: "blizzard", name: "Codex of the Blizzard", el: "ice", rarity: "rare", desc: "Unlocks the Blizzard spell." },
  { id: "tome_absolute_zero", skillId: "absolute_zero", name: "Scroll of Absolute Zero", el: "ice", rarity: "legendary", desc: "Unlocks the Absolute Zero spell." },
  { id: "tome_bramble_wrap", skillId: "bramble_wrap", name: "Leaves of Bramble Wrap", el: "nature", rarity: "rare", desc: "Unlocks the Bramble Wrap spell." },
  { id: "tome_spore_cloud", skillId: "spore_cloud", name: "Tome of the Spore Cloud", el: "nature", rarity: "epic", desc: "Unlocks the Spore Cloud spell." },
  { id: "tome_time_dilation", skillId: "time_dilation", name: "Chronos Parchment", el: "arcane", rarity: "rare", desc: "Unlocks the Time Dilation spell." },
  { id: "tome_void_rift", skillId: "void_rift", name: "Grimoire of Void Rift", el: "arcane", rarity: "legendary", desc: "Unlocks the Void Rift spell." },
];

const ARCHMAGE_BOSSES = [
  {
    id: "boss_ignis",
    name: "Ignis the Pyromancer",
    title: "Grand Magister of the Flame",
    affinity: "fire",
    hp: 135,
    rewardSkillId: "phoenix_flame",
    skills: ["inferno", "scorch", "firewall", "phoenix_flame"],
    staffId: "sunfire",
    relicId: "phoenix",
    hatId: "hat_crown",
    auraId: "aura_ember",
    capeId: "cape_phoenix",
    look: { skinTone: "skin_tan", hairColor: "hair_crimson", hairStyle: "hair_wild", beardStyle: "beard_long", eyeColor: "eye_ruby", gender: "gender_male", face: "face_sharp" },
    dialogue: "You dare step into my crucible? Let us see if your spirit burns or turns to ash!",
  },
  {
    id: "boss_kael",
    name: "Kael the Frostweaver",
    title: "Sovereign of the Frozen Wastes",
    affinity: "ice",
    hp: 135,
    rewardSkillId: "ice_barrier",
    skills: ["glacial_spike", "blizzard", "frostbite", "ice_barrier"],
    staffId: "frostbound",
    relicId: "wardsigil",
    hatId: "hat_wide",
    auraId: "aura_frost",
    capeId: "cape_fur",
    look: { skinTone: "skin_pale", hairColor: "hair_cyan", hairStyle: "hair_tied", beardStyle: "beard_braid", eyeColor: "eye_cyan", gender: "gender_male", face: "face_round" },
    dialogue: "Winter's chill cares nothing for mortal pride. Freeze and be forgotten.",
  },
  {
    id: "boss_sylva",
    name: "Sylva the Archdruid",
    title: "Guardian of the Ancient Leyline",
    affinity: "nature",
    hp: 140,
    rewardSkillId: "world_tree_grace",
    skills: ["wrath_of_nature", "spore_cloud", "bramble_wrap", "world_tree_grace"],
    staffId: "verdant",
    relicId: "soulstone",
    hatId: "hat_circlet",
    auraId: "aura_starlight",
    capeId: "cape_travel",
    look: { skinTone: "skin_warm", hairColor: "hair_emerald", hairStyle: "hair_long", beardStyle: "beard_clean", eyeColor: "eye_emerald", gender: "gender_female", face: "face_soft" },
    dialogue: "The roots remember every trespasser. The earth will reclaim your fleeting magic.",
  },
  {
    id: "boss_vaelin",
    name: "Vaelin the Chronomancer",
    title: "Lord of the Astral Void",
    affinity: "arcane",
    hp: 140,
    rewardSkillId: "astral_projection",
    skills: ["supernova", "void_rift", "time_dilation", "astral_projection"],
    staffId: "voidglass",
    relicId: "chronoloop",
    hatId: "hat_laurel",
    auraId: "aura_void",
    capeId: "cape_void",
    look: { skinTone: "skin_fair", hairColor: "hair_silver", hairStyle: "hair_spiky", beardStyle: "beard_short", eyeColor: "eye_violet", gender: "gender_male", face: "face_sharp" },
    dialogue: "I have already seen every turn of this duel. Your defeat was woven into eternity.",
  },
];

const MAX_MAGE_LEVEL = 30;

function getMageLevel(xp = 0) {
  let lvl = 1;
  let accumulated = 0;
  while (lvl < MAX_MAGE_LEVEL) {
    const needed = 50 + lvl * 20;
    if (xp < accumulated + needed) break;
    accumulated += needed;
    lvl++;
  }
  return lvl;
}

function getMageXpInfo(xp = 0) {
  let lvl = 1;
  let accumulated = 0;
  while (lvl < MAX_MAGE_LEVEL) {
    const needed = 50 + lvl * 20;
    if (xp < accumulated + needed) {
      return {
        level: lvl,
        currentInLevel: xp - accumulated,
        neededForNext: needed,
        percent: Math.min(100, Math.floor(((xp - accumulated) / needed) * 100)),
      };
    }
    accumulated += needed;
    lvl++;
  }
  return { level: MAX_MAGE_LEVEL, currentInLevel: 0, neededForNext: 0, percent: 100 };
}

function getMaxSlots(level = 1) {
  if (level >= 30) return 7;
  if (level >= 20) return 6;
  if (level >= 10) return 5;
  return 4;
}

const STAFFS = [
  { id: "ashwood",      name: "Ashwood Staff",     rarity: "common",    el: "fire",   elBonus: 0.12, desc: "+12% Fire damage" },
  { id: "frostbound",   name: "Frostbound Rod",    rarity: "rare",      el: "ice",    elBonus: 0.15, regen: 2, desc: "+15% Ice dmg · +2 mana/turn" },
  { id: "verdant",      name: "Verdant Branch",    rarity: "rare",      el: "nature", elBonus: 0.12, healBonus: 0.35, desc: "+12% Nature dmg · +35% healing" },
  { id: "voidglass",    name: "Voidglass Scepter", rarity: "epic",      el: "arcane", allDmg: 0.10, crit: 8, desc: "+10% all damage · +8% crit" },
  { id: "sunfire",      name: "Sunfire Relicstaff",rarity: "legendary", el: "fire",   elBonus: 0.22, burnChance: 25, desc: "+22% Fire dmg · +25% Burn chance" },
  { id: "stormcaller",  name: "Stormcaller",       rarity: "rare",      el: "ice",    allDmg: 0.10, chillChance: 10, desc: "+10% all damage · 10% chill chance" },
  { id: "bloodpact",    name: "Bloodpact Spike",   rarity: "epic",      el: "fire",   elBonus: 0.20, maxHpPenalty: 8, desc: "+20% Fire dmg · -8 Max HP tradeoff" },
  { id: "coral_scepter",name: "Coral Scepter",     rarity: "rare",      el: "ice",    elBonus: 0.15, regen: 2, desc: "+15% Ice dmg · +2 mana/turn" },
];
const RELICS = [
  { id: "none",      name: "No relic",       rarity: "common", desc: "—" },
  { id: "manapearl", name: "Mana Pearl",     rarity: "common",    regen: 3, desc: "+3 mana per turn" },
  { id: "foxcharm",  name: "Foxfire Charm",  rarity: "rare",      crit: 10, desc: "+10% critical chance" },
  { id: "wardsigil", name: "Ward Sigil",     rarity: "rare",      startShield: 12, desc: "Begin duels with a 12 shield" },
  { id: "phoenix",   name: "Phoenix Feather",rarity: "legendary", revive: true, desc: "Survive a fatal blow once (20 HP)" },
  { id: "soulstone", name: "Soulstone",      rarity: "rare",      healOnKill: 8, desc: "Heal 8 HP upon defeating an opponent" },
  { id: "chronoloop",name: "Chronoloop",     rarity: "epic",      cdReduction: 1, desc: "-1 turn cooldown on all abilities" },
  { id: "twinfang",  name: "Twinfang Relic", rarity: "legendary", offAffinityBonus: 0.15, desc: "+15% damage with off-affinity spells" },
];
const HATS = [
  { id: "hat_pointed", name: "Pointed Hat",       rarity: "common" },
  { id: "hat_hood",    name: "Mystic Hood",       rarity: "rare" },
  { id: "hat_wide",    name: "Starfall Brim",     rarity: "epic" },
  { id: "hat_crown",   name: "Archon Crown",      rarity: "legendary" },
  { id: "hat_circlet", name: "Enchanted Circlet", rarity: "rare" },
  { id: "hat_warlord", name: "Warlord Helm",      rarity: "epic",      desc: "Horned battle helm forged for dread sorcerers" },
  { id: "hat_laurel",  name: "Archon Laurel",     rarity: "legendary", desc: "Golden circlet crowned by 4 orbiting elemental gems" },
  { id: "hat_jester",  name: "Chaos Jester Cap",  rarity: "rare",      desc: "Mischievous split hood with jingling bells" },
];
const AURAS = [
  { id: "aura_none",      name: "No aura",                rarity: "common",    color: null },
  { id: "aura_ember",     name: "Ember Aura",             rarity: "rare",      color: "#FF6B3D" },
  { id: "aura_frost",     name: "Frost Aura",             rarity: "rare",      color: "#5FC1E8" },
  { id: "aura_void",      name: "Void Aura",              rarity: "epic",      color: "#B07FF5" },
  { id: "aura_radiant",   name: "Radiant Aura",           rarity: "legendary", color: "#E8B44F" },
  { id: "aura_starlight", name: "Starlight Constellation",rarity: "epic",      color: "#93C5FD", desc: "Twinkling star cluster and celestial geometries" },
  { id: "aura_bloodmoon", name: "Bloodmoon Eclipse",      rarity: "legendary", color: "#DC2626", desc: "Crescent eclipse dripping drops of crimson mana" },
];
const CAPES = [
  { id: "cape_none",   name: "No cape",           name_pt: "Sem capa",            rarity: "common",    color: null, desc: "—", desc_pt: "—" },
  { id: "cape_travel", name: "Traveler's Cloak",  name_pt: "Manto do Andarilho",   rarity: "rare",      color: "#7A6A52", dark: "#5E5140", desc: "Worn traveling cloak with brass clasp", desc_pt: "Manto de viagem com fecho de latão" },
  { id: "cape_shadow", name: "Shadowweave Drape", name_pt: "Manto das Sombras",   rarity: "rare",      color: "#3D3466", dark: "#28223F", desc: "Woven from twilight dusk threads", desc_pt: "Tecido com fios do crepúsculo" },
  { id: "cape_star",   name: "Starweave Mantle",  name_pt: "Manto Estelar",       rarity: "epic",      color: "#8E5FD1", dark: "#5F3F94", desc: "Glimmering with cosmic nebula dust", desc_pt: "Resplandecente com poeira de nebulosas" },
  { id: "cape_phoenix",name: "Phoenixwing Cloak", name_pt: "Capa da Fênix",       rarity: "legendary", color: "#E85A3D", dark: "#B03D24", desc: "Warm fiery cloak lined with embers", desc_pt: "Manto flamejante com brasas vivas" },
  { id: "wings_angel", name: "Angel Wings",       name_pt: "Asas Angelicais",     rarity: "legendary", color: "#F5F0E6", dark: "#D9CFC0", desc: "Seraphic plumage radiating divine starlight", desc_pt: "Plumagem seráfica irradiando luz estelar divina" },
  { id: "wings_demon", name: "Demon Wings",       name_pt: "Asas Demoníacas",     rarity: "legendary", color: "#4A1F1F", dark: "#240D0D", desc: "Draconic bone and leathery infernal membranes", desc_pt: "Ossos draconianos e membranas infernais cor de sangue" },
  { id: "wings_phoenix",name: "Phoenix Wings",    name_pt: "Asas da Fênix",       rarity: "legendary", color: "#FF5722", dark: "#991B1B", desc: "Blazing solar plumage forged in primal fire", desc_pt: "Plumagem solar flamejante forjada no fogo primordial" },
  { id: "wings_fae",   name: "Prismatic Fae Wings", name_pt: "Asas Feéricas",     rarity: "legendary", color: "#38BDF8", dark: "#7C3AED", desc: "Gossamer crystal wings humming with wild magic", desc_pt: "Asas de cristal diáfano pulsando com magia ancestral" },
  { id: "cape_banner", name: "Battle Standard",   name_pt: "Estandarte de Guerra", rarity: "rare",      color: "#854D0E", dark: "#54330A", desc: "Torn heraldic war banner slung over shoulder", desc_pt: "Estandarte de guerra heráldico sobre o ombro" },
  { id: "cape_fur",    name: "Frostwolf Cloak",   name_pt: "Manto do Lobo Ártico", rarity: "epic",      color: "#CBD5E1", dark: "#64748B", desc: "Thick arctic wolf pelt with fierce cowl", desc_pt: "Pele grossa de lobo ártico com capuz feroz" },
  { id: "cape_void",   name: "Void Tear Mantle",  name_pt: "Rasgão do Vazio",      rarity: "legendary", color: "#581C87", dark: "#2E1065", desc: "Ripped cosmic void with gazing astral eyes", desc_pt: "Fenda cósmica ondulante com olhos astrais" },
];
const ROBES = [
  { id: "robe_classic",   name: "Classic Robe",       rarity: "common",    colors: null, desc: "—" },
  { id: "robe_midnight",  name: "Midnight Robe",      rarity: "rare",      colors: { robe: "#2B2447", dark: "#1C1833", light: "#4A4488" } },
  { id: "robe_ivory",     name: "Ivory Robe",         rarity: "rare",      colors: { robe: "#EDE6D6", dark: "#C9BFA8", light: "#FFFBF0" } },
  { id: "robe_crimson",   name: "Crimson Robe",       rarity: "epic",      colors: { robe: "#8B1E3F", dark: "#5C1329", light: "#C44368" } },
  { id: "robe_gilded",    name: "Gilded Robe",        rarity: "legendary", colors: { robe: "#3A2E1A", dark: "#241A0D", light: "#E8B44F" } },
  { id: "robe_celestial", name: "Celestial Robe",     rarity: "legendary", colors: { robe: "#181B34", dark: "#0F1224", light: "#2C3259" } },
  { id: "robe_sunburst",  name: "Sunburst Vestments", rarity: "epic",      colors: { robe: "#D97706", dark: "#92400E", light: "#FDE68A" }, desc: "Radiant solar silks with flared golden trim" },
  { id: "robe_frostveil", name: "Frostveil Shroud",   rarity: "epic",      colors: { robe: "#1E3A8A", dark: "#0F172A", light: "#93C5FD" }, desc: "Glacial weave embroidered with rime patterns" },
  { id: "robe_verdant",   name: "Verdant Regalia",    rarity: "rare",      colors: { robe: "#166534", dark: "#052E16", light: "#86EFAC" }, desc: "Living leafweave lined with floral filigree" },
];
const OFFHANDS = [
  { id: "offhand_none",      name: "Empty Hand",      rarity: "common",    color: null, desc: "—" },
  { id: "offhand_tome",      name: "Apprentice Tome", rarity: "common",    color: "#8B5A33", crit: 3, desc: "+3% crit chance · Weathered leather binding" },
  { id: "offhand_grimoire",  name: "Arcane Grimoire", rarity: "rare",      color: "#5F3F94", allDmg: 0.06, desc: "+6% all damage · Hum of raw arcane power" },
  { id: "offhand_codex",     name: "Codex of Embers", rarity: "epic",      color: "#B03D24", allDmg: 0.08, crit: 5, desc: "+8% all damage · +5% crit · Volcanic dragonhide" },
  { id: "offhand_orb",       name: "Celestial Orb",   rarity: "epic",      color: "#38BDF8", allDmg: 0.05, crit: 6, desc: "+5% all damage · +6% crit · Levitating starlight sphere" },
  { id: "offhand_forbidden", name: "Forbidden Tome",  rarity: "legendary", color: "#241C3D", allDmg: 0.12, crit: 8, desc: "+12% all damage · +8% crit · Eldritch void chains" },
  { id: "offhand_buckler",   name: "Arcane Buckler",  rarity: "rare",      color: "#475569", dmgReduction: 0.05, desc: "-5% damage taken · Runic steel parrying shield" },
  { id: "offhand_skull",     name: "Lich Skull",      rarity: "epic",      color: "#334155", allDmg: 0.08, crit: -5, desc: "+8% all damage · -5% crit · Whispering necrotic focus" },
  { id: "offhand_prism",     name: "Prismatic Prism", rarity: "legendary", color: "#A855F7", echoChance: 15, desc: "15% chance to echo 50% spell damage · Floating crystal" },
];
const ARMORS = [
  { id: "armor_none",   name: "No armor",          rarity: "common",    desc: "—" },
  { id: "armor_padded", name: "Padded Robe",       rarity: "common",    maxHpBonus: 10, desc: "+10 Max HP" },
  { id: "armor_chain",  name: "Chainweave Vest",   rarity: "rare",      dmgReduction: 0.08, desc: "-8% damage taken" },
  { id: "armor_void",   name: "Voidplate Harness", rarity: "epic",      maxHpBonus: 10, dmgReduction: 0.06, desc: "+10 Max HP · -6% damage taken" },
  { id: "armor_dragon", name: "Dragonscale Plate", rarity: "legendary", dmgReduction: 0.15, desc: "-15% damage taken" },
];
const PETS = [
  { id: "pet_none",     name: "No companion",    rarity: "common",    kind: null },
  { id: "pet_imp",      name: "Ember Imp",       rarity: "rare",      kind: "imp",      color: "#FF6B3D", dark: "#C4451D", light: "#FFB27A" },
  { id: "pet_sprite",   name: "Frost Sprite",    rarity: "rare",      kind: "sprite",   color: "#5FC1E8", dark: "#3A8FBD", light: "#D6F3FF" },
  { id: "pet_fox",      name: "Leaf Fox",        rarity: "epic",      kind: "fox",      color: "#72C063", dark: "#4F8F45", light: "#DCF0C8" },
  { id: "pet_wisp",     name: "Star Wisp",       rarity: "legendary", kind: "wisp",     color: "#E8B44F", dark: "#B07FF5", light: "#FFF3C4" },
  { id: "pet_dragon",   name: "Wyrmling",        rarity: "legendary", kind: "dragon",   color: "#EF4444", dark: "#991B1B", light: "#FCA5A5", desc: "Baby red dragon hovering playfully" },
  { id: "pet_owl",      name: "Arcane Familiar", rarity: "epic",      kind: "owl",      color: "#6366F1", dark: "#3730A3", light: "#C7D2FE", desc: "Mystic horned owl perched with ancient book" },
  { id: "pet_mushroom", name: "Sporeling",       rarity: "rare",      kind: "mushroom", color: "#10B981", dark: "#047857", light: "#A7F3D0", desc: "Bouncy fungus sprout trailing spores" },
];

const GLOVES = [
  { id: "gloves_arcane",  name: "Arcane Spellweaver", rarity: "legendary", desc: "Midnight velvet gauntlets with gold trim & glowing affinity gem" },
  { id: "gloves_leather", name: "Battlemage Leather", rarity: "rare",      desc: "Reinforced saddle leather with brass buckle & riveted knuckles" },
  { id: "gloves_wraps",   name: "Runic Handwraps",   rarity: "epic",      desc: "Mystic channeled linen wraps pulsing with elemental mana" },
  { id: "gloves_bare",    name: "Stylized Mage Hands", rarity: "common",   desc: "Clean minimalist hands without glove armor" },
];

const START_OWNED = [
  "ashwood", "frostbound", "manapearl", "wardsigil", "none",
  "hat_pointed", "hat_hood", "hat_circlet",
  "aura_none", "aura_ember",
  "cape_none", "cape_travel",
  "wings_angel", "wings_demon", "wings_phoenix", "wings_fae",
  "armor_none", "armor_padded",
  "pet_none", "pet_imp",
  "robe_classic", "robe_midnight",
  "offhand_none", "offhand_tome",
  "gloves_arcane", "gloves_leather", "gloves_wraps", "gloves_bare"
];
const LOOTABLE = [
  "verdant", "voidglass", "sunfire", "foxcharm", "phoenix", "hat_wide", "hat_crown", "hat_circlet",
  "aura_frost", "aura_void", "aura_radiant", "cape_shadow", "cape_star", "cape_phoenix",
  "wings_angel", "wings_demon", "wings_phoenix", "wings_fae", "armor_chain", "armor_void", "armor_dragon",
  "pet_sprite", "pet_fox", "pet_wisp", "robe_ivory", "robe_crimson", "robe_gilded", "robe_celestial",
  "offhand_grimoire", "offhand_codex", "offhand_orb", "offhand_forbidden",
  // 23 Novos Itens
  "stormcaller", "bloodpact", "coral_scepter", "soulstone", "chronoloop", "twinfang",
  "hat_warlord", "hat_laurel", "hat_jester", "cape_banner", "cape_fur", "cape_void",
  "robe_sunburst", "robe_frostveil", "robe_verdant", "offhand_buckler", "offhand_skull", "offhand_prism",
  "pet_dragon", "pet_owl", "pet_mushroom", "aura_starlight", "aura_bloodmoon"
];
const ALL_ITEMS = [...STAFFS, ...RELICS, ...HATS, ...AURAS, ...CAPES, ...ARMORS, ...PETS, ...ROBES, ...OFFHANDS, ...GLOVES];
const findItem = (id) => ALL_ITEMS.find(i => i.id === id);

// ================= TABELA DE ITENS DA LOJA (100% COSMÉTICO) =================
// Preços em Arcane Shards (✦). Todos os itens são puramente cosméticos (zero stats de combate).
const SHOP_ITEMS = [
  { id: "hair_violet",    price: 80,  category: "hair" },
  { id: "hair_crimson",   price: 80,  category: "hair" },
  { id: "hair_blonde",    price: 60,  category: "hair" },
  { id: "eye_ruby",       price: 60,  category: "eyes" },
  { id: "eye_violet",     price: 60,  category: "eyes" },
  { id: "earring_ruby",   price: 100, category: "jewelry" },
  { id: "earring_silver", price: 80,  category: "jewelry" },
  { id: "nosering_silver",price: 60,  category: "jewelry" },
  { id: "gloves_arcane",  price: 150, category: "gloves" },
  { id: "gloves_wraps",   price: 120, category: "gloves" },
  { id: "robe_crimson",   price: 400, category: "robe" },
  { id: "robe_gilded",    price: 700, category: "robe" },
  { id: "robe_celestial", price: 700, category: "robe" },
  { id: "cape_star",      price: 400, category: "cape" },
  { id: "cape_phoenix",   price: 700, category: "cape" },
  { id: "pet_wisp",       price: 600, category: "pet" },
  { id: "pet_fox",        price: 500, category: "pet" },
  // Novos Cosméticos na Loja (ZERO status de combate)
  { id: "hat_jester",     price: 200, category: "hat" },
  { id: "hat_warlord",    price: 400, category: "hat" },
  { id: "hat_laurel",     price: 700, category: "hat" },
  { id: "aura_starlight", price: 450, category: "aura" },
  { id: "aura_bloodmoon", price: 800, category: "aura" },
  { id: "cape_banner",    price: 250, category: "cape" },
  { id: "cape_fur",       price: 450, category: "cape" },
  { id: "cape_void",      price: 850, category: "cape" },
  { id: "robe_verdant",   price: 250, category: "robe" },
  { id: "robe_sunburst",  price: 450, category: "robe" },
  { id: "robe_frostveil", price: 450, category: "robe" },
  { id: "pet_mushroom",   price: 300, category: "pet" },
  { id: "pet_owl",        price: 500, category: "pet" },
  { id: "pet_dragon",     price: 900, category: "pet" },
];

// Helper para obter os dados completos de exibição para o RarityCard
function resolveShopItem(entry) {
  let base = findItem(entry.id);
  if (!base) {
    base = [...HAIR_COLORS, ...EYE_COLORS, ...EARRINGS, ...NOSE_RINGS].find(i => i.id === entry.id);
  }
  let rarity = base?.rarity;
  if (!rarity) {
    if (entry.price >= 700) rarity = "legendary";
    else if (entry.price >= 200) rarity = "epic";
    else if (entry.price >= 80) rarity = "rare";
    else rarity = "common";
  }
  let displayName = base?.name || entry.id;
  if (entry.category === "hair" && !displayName.toLowerCase().includes("hair")) {
    displayName = `${displayName} Hair`;
  } else if (entry.category === "eyes" && !displayName.toLowerCase().includes("eyes")) {
    displayName = `${displayName} Eyes`;
  }
  return {
    ...base,
    id: entry.id,
    name: displayName,
    rarity,
    desc: base?.desc || `${entry.category.toUpperCase()} Cosmético`,
    price: entry.price,
    category: entry.category,
  };
}

// DEV: everything unlocked for now so all equipment/cosmetics are viewable. Swap back to START_OWNED before shipping progression.

// ================= BATTLE PASS (SEASON OF EMBERS) =================
const SEASON = {
  id: "s1_2026_spring",
  name: "Season of Embers",
  startDate: "2026-03-01T00:00:00Z",
  endDate: "2026-05-31T23:59:59Z",
  premiumCost: 500, // ✦ Arcane Shards
  maxLevel: 30,
  xpPerLevel: 100,
};

const BATTLE_PASS_REWARDS = [
  { level: 1,  free: { type: "shards", amount: 15, name: "15 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "robe_verdant", name: "Verdant Regalia", icon: "👘" } },
  { level: 2,  free: null, premium: { type: "shards", amount: 30, name: "30 Arcane Shards", icon: "✦" } },
  { level: 3,  free: { type: "shards", amount: 20, name: "20 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "earring_silver", name: "Silver Hoops", icon: "💍" } },
  { level: 4,  free: null, premium: { type: "shards", amount: 35, name: "35 Arcane Shards", icon: "✦" } },
  { level: 5,  free: { type: "shards", amount: 25, name: "Cofre de Shards (25✦)", icon: "🎁" }, premium: { type: "item", id: "hat_jester", name: "Chaos Jester Cap", icon: "🎭" } },
  { level: 6,  free: null, premium: { type: "shards", amount: 40, name: "40 Arcane Shards", icon: "✦" } },
  { level: 7,  free: { type: "shards", amount: 20, name: "20 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "cape_banner", name: "Battle Standard", icon: "🚩" } },
  { level: 8,  free: null, premium: { type: "shards", amount: 45, name: "45 Arcane Shards", icon: "✦" } },
  { level: 9,  free: { type: "shards", amount: 25, name: "25 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "nosering_silver", name: "Silver Ring", icon: "✨" } },
  { level: 10, free: { type: "item", id: "pet_mushroom", name: "Sporeling", icon: "🍄" }, premium: { type: "item", id: "gloves_wraps", name: "Runic Handwraps", icon: "🧤" } },
  { level: 11, free: null, premium: { type: "shards", amount: 50, name: "50 Arcane Shards", icon: "✦" } },
  { level: 12, free: { type: "shards", amount: 30, name: "30 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "hair_crimson", name: "Crimson Dye", icon: "💇" } },
  { level: 13, free: null, premium: { type: "shards", amount: 55, name: "55 Arcane Shards", icon: "✦" } },
  { level: 14, free: { type: "shards", amount: 30, name: "30 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "cape_fur", name: "Frostwolf Cloak", icon: "🐺" } },
  { level: 15, free: { type: "shards", amount: 50, name: "Cofre Mágico (50✦)", icon: "🎁" }, premium: { type: "item", id: "robe_frostveil", name: "Frostveil Shroud", icon: "❄️" } },
  { level: 16, free: null, premium: { type: "shards", amount: 60, name: "60 Arcane Shards", icon: "✦" } },
  { level: 17, free: { type: "shards", amount: 35, name: "35 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "eye_ruby", name: "Ruby Gaze", icon: "👁️" } },
  { level: 18, free: null, premium: { type: "shards", amount: 65, name: "65 Arcane Shards", icon: "✦" } },
  { level: 19, free: { type: "shards", amount: 40, name: "40 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "earring_ruby", name: "Ruby Drops", icon: "💎" } },
  { level: 20, free: { type: "item", id: "hat_warlord", name: "Warlord Helm", icon: "🪖" }, premium: { type: "item", id: "pet_owl", name: "Arcane Familiar", icon: "🦉" } },
  { level: 21, free: null, premium: { type: "shards", amount: 70, name: "70 Arcane Shards", icon: "✦" } },
  { level: 22, free: { type: "shards", amount: 45, name: "45 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "gloves_arcane", name: "Arcane Spellweaver", icon: "🧤" } },
  { level: 23, free: null, premium: { type: "shards", amount: 75, name: "75 Arcane Shards", icon: "✦" } },
  { level: 24, free: { type: "shards", amount: 50, name: "50 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "robe_sunburst", name: "Sunburst Vestments", icon: "☀️" } },
  { level: 25, free: { type: "shards", amount: 80, name: "Tesouro Arcano (80✦)", icon: "👑" }, premium: { type: "item", id: "aura_starlight", name: "Starlight Constellation", icon: "🌌" } },
  { level: 26, free: null, premium: { type: "shards", amount: 90, name: "90 Arcane Shards", icon: "✦" } },
  { level: 27, free: { type: "shards", amount: 60, name: "60 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "cape_void", name: "Void Tear Mantle", icon: "🕳️" } },
  { level: 28, free: null, premium: { type: "shards", amount: 100, name: "100 Arcane Shards", icon: "✦" } },
  { level: 29, free: { type: "shards", amount: 70, name: "70 Arcane Shards", icon: "✦" }, premium: { type: "item", id: "aura_bloodmoon", name: "Bloodmoon Eclipse", icon: "🩸" } },
  { level: 30, free: { type: "item", id: "hat_laurel", name: "Archon Laurel", icon: "🌿" }, premium: { type: "item", id: "pet_dragon", name: "Wyrmling Familiar", icon: "🐉" } },
];

const DEV_UNLOCK_ALL = false;

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

const MAX_HP = 100, MAX_MANA = 40, REGEN = 3, BASE_CRIT = 8;
const AFFINITY_BONUS = 1.25;
const ENEMY_NAMES = ["Morwen the Ashen", "Sylra Frostcall", "Bramblewick", "Vex of the Veil", "Ondrel Pyre", "Nissa Thornheart"];

const DAILY_MODIFIERS = [
  { day: 0, id: "arcane_surge", name: "Surto Celestial", icon: "✨", desc: "Regen de Mana +2 por turno e magias arcanas causam +25% de dano.", shortDesc: "Regen +2 · Arcano +25%" },
  { day: 1, id: "elemental_fury", name: "Fúria Elemental", icon: "🔥", desc: "Bônus de afinidade elemental aumentado de +25% para +50%!", shortDesc: "Afinidade +50%" },
  { day: 2, id: "blood_rite", name: "Rito de Sangue", icon: "🩸", desc: "Todos os feitiços causam +20% de dano, mas custam 3 de HP ao conjurar.", shortDesc: "Dano +20% · Custo em Vida" },
  { day: 3, id: "critical_overload", name: "Sobrecarga Crítica", icon: "⚡", desc: "Chance de acerto crítico base aumentada em +20% para todos os magos.", shortDesc: "Chance Crítica +20%" },
  { day: 4, id: "swift_duels", name: "Duelos Velozes", icon: "⏱️", desc: "Tempo de turno reduzido para 8s e recargas de feitiço reduzidas em 1.", shortDesc: "Tempo 8s · Recargas -1" },
  { day: 5, id: "status_storm", name: "Tempestade de Efeitos", icon: "🌪️", desc: "Efeitos de Queimadura duram +1 turno e combos causam dano extra!", shortDesc: "Status +1 Turno" },
  { day: 6, id: "runic_bulwark", name: "Baluarte Rúnico", icon: "🛡️", desc: "Todos os escudos e barreiras mágicas absorvem +40% de dano.", shortDesc: "Barreiras +40%" },
];

function getTodayModifier() {
  const day = new Date().getDay();
  return DAILY_MODIFIERS.find(m => m.day === day) || DAILY_MODIFIERS[0];
}

const ARCHETYPES = {
  berserker: {
    id: "berserker",
    name: "Berserker",
    icon: "⚔️",
    color: "#E05252",
    desc: "Agressivo e voraz. Prioriza dano máximo a qualquer custo e ignora defesas.",
    tagline: "Ataque Furioso",
  },
  tactician: {
    id: "tactician",
    name: "Tático",
    icon: "🧠",
    color: "#38BDF8",
    desc: "Calculista magistral. Planeja sinergias elementais, defende na hora certa e busca combos.",
    tagline: "Combos & Controle",
  },
  controller: {
    id: "controller",
    name: "Controlador",
    icon: "🌪️",
    color: "#A78BFA",
    desc: "Manipulador implacável. Focado em congelar, queimar e esgotar a mana do adversário.",
    tagline: "Debuffs Contínuos",
  },
  gambler: {
    id: "gambler",
    name: "Apostador",
    icon: "🎲",
    color: "#FBBF24",
    desc: "Ousado e caótico. Arrisca feitiços de alto calibre em busca de acertos críticos devastadores.",
    tagline: "Alto Risco & Crítico",
  },
  turtle: {
    id: "turtle",
    name: "Baluarte",
    icon: "🛡️",
    color: "#34D399",
    desc: "Fortaleza intransponível. Ergue escudos continuamente e desgasta o rival até a exaustão.",
    tagline: "Defesa Inabalável",
  },
};

const rand = (a, b) => Math.random() * (b - a) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const chance = (pct) => Math.random() * 100 < pct;
const FANTASY_MAGE_NAMES = [
  "Ignis", "Zephyr", "Astraea", "Kaelen", "Morrigan", "Solarius", "Valerius",
  "Lyra", "Eldrin", "Vespera", "Corvus", "Aurelius", "Thalor", "Nyx", "Pyra", "Caelum"
];

function computeDamage(skill, atk, def, comboMult = 1, bonusFlat = 0) {
  const todayMod = getTodayModifier();
  const affinityBonus = todayMod.id === "elemental_fury" ? 1.50 : AFFINITY_BONUS;
  let mult = skill.el === atk.affinity ? affinityBonus : 1;
  if (todayMod.id === "arcane_surge" && skill.el === "arcane") mult *= 1.25;
  if (todayMod.id === "blood_rite") mult *= 1.20;
  // Twinfang relic: +15% damage when casting off-affinity spells
  if (atk.relic?.id === "twinfang" && skill.el !== atk.affinity && skill.dmg > 0) {
    mult *= 1 + (atk.relic.offAffinityBonus || 0.15);
  }
  if (atk.staffGear) {
    if (atk.staffGear.el === skill.el && atk.staffGear.elBonus) mult *= 1 + atk.staffGear.elBonus;
    if (atk.staffGear.allDmg) mult *= 1 + atk.staffGear.allDmg;
  }
  if (atk.offhand?.allDmg) mult *= 1 + atk.offhand.allDmg;
  let chilled = false;
  if (atk.status.chill) { mult *= 0.7; chilled = true; }
  let critChance = BASE_CRIT + (atk.staffGear?.crit || 0) + (atk.relic?.crit || 0) + (atk.offhand?.crit || 0);
  if (todayMod.id === "critical_overload") critChance += 20;
  const crit = chance(critChance);
  if (crit) mult *= 1.6;
  mult *= comboMult;
  if (def.armor?.dmgReduction) mult *= 1 - def.armor.dmgReduction;
  // Offhand Buckler: 5% damage reduction
  if (def.offhand?.dmgReduction) mult *= (1 - def.offhand.dmgReduction);
  const dmg = Math.max(1, Math.round(skill.dmg * mult * rand(0.92, 1.08)) + bonusFlat);
  return { dmg, crit, chilled };
}

function makeMage(name, affinity, skills, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, look, offhandId, glovesId) {
  const armor = ARMORS.find(a => a.id === armorId && a.id !== "armor_none") || null;
  let maxHp = MAX_HP + (armor?.maxHpBonus || 0);
  // Bloodpact Spike tradeoff: -8 Max HP
  if (staffId === "bloodpact") maxHp -= 8;
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
    status: { burn: 0, chill: false, entangled: 0 }, phoenixUsed: false,
    archetype: null,
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
  const archKeys = Object.keys(ARCHETYPES);
  e.archetype = ARCHETYPES[pick(archKeys)];
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
    <g className="beard-sway">
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

function Base({ p, look = DEFAULT_LOOK, hasHat = false, affinity = "arcane", hatId = "", robeTrim = null, armor = null, hasOffhand = false, gloves = "gloves_arcane", casting = false, easterEgg = null }) {
  const eyeShiftX = casting ? 1.5 : 0;
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
        <g className="eye-blink-l">
          <path d="M167 167 C 170 159 186 159 189 167 C 186 173 170 173 167 167 Z" fill="#FCFAF5" />
          <path d="M167 167 C 170 161 186 161 189 167 C 187 164 169 164 167 167 Z" fill="#000000" opacity="0.14" />
          <circle cx={178 + eyeShiftX} cy="166.5" r={eyeR * 0.72} fill={easterEgg === "golden_eyes" ? "#F59E0B" : eye} />
          <path d={`M${174 + eyeShiftX} 168 A 4 4 0 0 0 ${182 + eyeShiftX} 168`} stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.45" />
          <circle cx={178 + eyeShiftX} cy="166.5" r={eyeR * 0.42} fill="#120E18" />
          <circle cx={180.2 + eyeShiftX} cy="164.5" r="1.8" fill="#FFFFFF" />
          <circle cx={176.2 + eyeShiftX} cy="168" r="0.9" fill="#FFFFFF" opacity="0.75" />
        </g>
        <path d="M166 167 C 170 158 186 158 190 167" stroke="#1C1424" strokeWidth={isFemale ? "2.6" : "2"} fill="none" strokeLinecap="round" />
        <path d="M169 158 Q178 155 187 158" stroke={skinD} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        {isFemale && <path d="M167 167 Q163 164 160 163" stroke="#1C1424" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
      </g>

      {/* Right eye */}
      <g>
        <g className="eye-blink-r">
          <path d="M211 167 C 214 159 230 159 233 167 C 230 173 214 173 211 167 Z" fill="#FCFAF5" />
          <path d="M211 167 C 214 161 230 161 233 167 C 231 164 213 164 211 167 Z" fill="#000000" opacity="0.14" />
          <circle cx={222 + eyeShiftX} cy="166.5" r={eyeR * 0.72} fill={easterEgg === "golden_eyes" ? "#F59E0B" : eye} />
          <path d={`M${218 + eyeShiftX} 168 A 4 4 0 0 0 ${226 + eyeShiftX} 168`} stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.45" />
          <circle cx={222 + eyeShiftX} cy="166.5" r={eyeR * 0.42} fill="#120E18" />
          <circle cx={224.2 + eyeShiftX} cy="164.5" r="1.8" fill="#FFFFFF" />
          <circle cx={220.2 + eyeShiftX} cy="168" r="0.9" fill="#FFFFFF" opacity="0.75" />
        </g>
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
      {/* Deep Volumetric Under-Feathers (Depth & Heavy Silhouette) */}
      <g opacity={0.92}>
        <path d="M 148 206 C 136 150 102 96 66 74 C 58 86 68 112 92 144 C 114 172 136 198 148 206 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 140 210 C 114 150 72 108 26 102 C 20 116 34 140 64 172 C 90 200 120 218 140 210 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 130 218 C 96 166 44 134 6 146 C 4 162 20 188 52 212 C 84 232 114 232 130 218 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 124 230 C 86 194 34 178 4 206 C 4 222 22 244 56 252 C 86 256 112 244 124 230 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 126 248 C 90 224 36 222 12 260 C 14 276 36 290 68 288 C 96 284 116 266 126 248 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 132 266 C 102 250 52 262 30 314 C 34 328 56 336 84 320 C 110 304 124 284 132 266 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
        <path d="M 138 284 C 114 278 72 300 58 362 C 66 372 86 370 108 344 C 126 324 136 300 138 284 Z" fill="url(#angelUnderFeather)" stroke="#8C7A65" strokeWidth={1.2} />
      </g>

      {/* Primary Grand Flight Feathers (Luminous Tier with Gold Quills) */}
      <g>
        {/* Feather 1 (High Seraph Crest) */}
        <path d="M 150 204 C 138 146 104 92 68 70 C 60 82 72 108 96 140 C 118 168 140 196 150 204 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 146 200 C 136 152 108 106 76 84 C 82 102 100 132 118 162 C 132 184 142 196 146 200 Z" fill="url(#angelFeatherHighlight)" opacity={0.75} />
        <path d="M 148 202 C 134 150 106 102 72 78" stroke="url(#angelGoldQuill)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 148 202 C 134 150 106 102 72 78" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Feather 2 (Upper Primary) */}
        <path d="M 142 208 C 116 148 74 104 28 98 C 22 112 36 136 66 168 C 92 196 122 216 142 208 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 138 204 C 116 154 82 118 38 108 C 46 124 68 152 90 180 C 110 200 128 208 138 204 Z" fill="url(#angelFeatherHighlight)" opacity={0.7} />
        <path d="M 140 206 C 116 152 80 114 34 104" stroke="url(#angelGoldQuill)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 140 206 C 116 152 80 114 34 104" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Feather 3 (Apex Wingspan - Maximum Width) */}
        <path d="M 132 216 C 98 164 46 130 8 142 C 4 158 20 184 54 208 C 84 228 116 230 132 216 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 128 212 C 98 168 54 142 18 150 C 26 168 50 192 80 212 C 102 222 120 220 128 212 Z" fill="url(#angelFeatherHighlight)" opacity={0.7} />
        <path d="M 130 214 C 98 168 52 138 14 148" stroke="url(#angelGoldQuill)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 130 214 C 98 168 52 138 14 148" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Feather 4 (Mid Primary Outer) */}
        <path d="M 126 228 C 88 192 36 174 6 202 C 4 218 22 240 56 248 C 86 252 114 242 126 228 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 122 224 C 88 196 44 184 16 208 C 26 224 50 238 78 244 C 98 246 114 238 122 224 Z" fill="url(#angelFeatherHighlight)" opacity={0.7} />
        <path d="M 124 226 C 88 194 42 180 12 206" stroke="url(#angelGoldQuill)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 124 226 C 88 194 42 180 12 206" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Feather 5 (Mid Lower Primary) */}
        <path d="M 128 246 C 92 222 38 220 14 258 C 16 274 38 288 70 286 C 98 282 118 264 128 246 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 124 242 C 92 224 46 226 24 262 C 34 274 58 282 86 280 C 104 276 118 262 124 242 Z" fill="url(#angelFeatherHighlight)" opacity={0.7} />
        <path d="M 126 244 C 92 224 44 224 20 260" stroke="url(#angelGoldQuill)" strokeWidth={2.4} strokeLinecap="round" fill="none" />
        <path d="M 126 244 C 92 224 44 224 20 260" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Feather 6 (Lower Primary) */}
        <path d="M 134 264 C 104 250 54 262 32 312 C 36 326 58 334 86 318 C 112 302 126 282 134 264 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.4} />
        <path d="M 130 260 C 104 252 62 266 42 314 C 52 322 74 324 98 312 C 114 300 124 282 130 260 Z" fill="url(#angelFeatherHighlight)" opacity={0.65} />
        <path d="M 132 262 C 104 252 60 266 38 314" stroke="url(#angelGoldQuill)" strokeWidth={2.2} strokeLinecap="round" fill="none" />

        {/* Feather 7 (Trailing Lower Primary) */}
        <path d="M 140 282 C 116 276 74 298 60 360 C 68 370 88 368 110 342 C 128 322 138 298 140 282 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.3} />
        <path d="M 136 280 C 116 280 82 302 68 358" stroke="url(#angelGoldQuill)" strokeWidth={2} strokeLinecap="round" fill="none" />

        {/* Feather 8 (Inward Fluff Feather) */}
        <path d="M 146 296 C 132 296 98 322 88 388 C 96 396 114 392 128 366 C 142 346 148 320 146 296 Z" fill="url(#angelFeatherPrimary)" stroke="#D4AF37" strokeWidth={1.2} />
        <path d="M 142 294 C 132 300 106 326 96 384" stroke="url(#angelGoldQuill)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      </g>

      {/* Secondary Feathers (Plump Mid-Wing Volume Tier) */}
      <g fill="url(#angelFeatherSecondary)" stroke="#C8B896" strokeWidth={1.2}>
        <path d="M 144 198 C 128 156 96 126 72 116 C 68 126 80 146 98 172 C 118 194 136 204 144 198 Z" />
        <path d="M 140 212 C 116 178 80 152 48 156 C 44 168 58 190 84 210 C 108 224 130 224 140 212 Z" />
        <path d="M 136 228 C 110 204 72 190 44 210 C 42 222 56 238 84 246 C 110 250 128 240 136 228 Z" />
        <path d="M 138 246 C 112 230 74 228 48 254 C 48 266 64 276 90 276 C 114 274 130 260 138 246 Z" />
        <path d="M 142 262 C 122 252 82 260 62 296 C 64 308 82 312 106 302 C 126 290 138 276 142 262 Z" />
        <path d="M 146 278 C 130 276 96 294 82 338 C 88 346 106 344 122 326 C 136 310 144 294 146 278 Z" />
      </g>

      {/* Scapular Coverts (Soft Downy Upper Tier) */}
      <g fill="url(#angelFeatherCovert)" stroke="#E5DAC8" strokeWidth={1.1}>
        <path d="M 152 210 C 142 176 120 144 98 132 C 92 142 102 162 116 182 C 134 202 148 216 152 210 Z" />
        <path d="M 148 224 C 130 196 102 172 78 176 C 74 186 88 202 106 216 C 126 228 144 230 148 224 Z" />
        <path d="M 146 238 C 126 218 98 204 74 218 C 72 228 86 242 106 248 C 126 252 142 246 146 238 Z" />
        <path d="M 148 252 C 128 238 100 236 80 258 C 80 268 96 276 114 272 C 132 268 144 260 148 252 Z" />
      </g>

      {/* Heavy Celestial Scapular Arch & Filigree Bone */}
      <path d="M 152 230 C 146 180 128 132 98 108" stroke="url(#angelGoldQuill)" strokeWidth={4.5} strokeLinecap="round" fill="none" />
      <path d="M 152 230 C 146 180 128 132 98 108" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" fill="none" opacity={0.9} />

      {/* Ornate Gold & Diamond Scapular Brooch */}
      <circle cx="152" cy="230" r="7" fill="url(#angelGoldBrooch)" stroke="#92400E" strokeWidth={1.5} />
      <circle cx="152" cy="230" r="4.2" fill="#FFFFFF" />
      <polygon points="152,224 155,230 152,236 149,230" fill="#FDE047" />
      <circle cx="152" cy="230" r="1.8" fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="angelHaloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#FDE047" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#EAB308" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#CA8A04" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="angelFeatherPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFFDF7" />
          <stop offset="70%" stopColor={color || "#F8EED9"} />
          <stop offset="100%" stopColor={dark || "#D8C4A0"} />
        </linearGradient>

        <linearGradient id="angelFeatherHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FEF9C3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="angelFeatherSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F9F4EB" />
          <stop offset="100%" stopColor={dark || "#E0D1B8"} />
        </linearGradient>

        <linearGradient id="angelFeatherCovert" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#FAF6ED" />
          <stop offset="100%" stopColor="#EDE3CE" />
        </linearGradient>

        <linearGradient id="angelUnderFeather" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D8C8B0" />
          <stop offset="60%" stopColor="#BFAF96" />
          <stop offset="100%" stopColor="#9C886B" />
        </linearGradient>

        <linearGradient id="angelGoldQuill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="65%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        <linearGradient id="angelGoldBrooch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FDE047" />
          <stop offset="85%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Glorious Seraphic Light Aura */}
      <ellipse cx="200" cy="210" rx="150" ry="120" fill="url(#angelHaloGlow)" opacity={0.6} />
      <circle cx="200" cy="180" r="105" fill="#FEF08A" opacity="0.14" />

      {/* Left Wing */}
      <g className="angelWingL">{leftWing}</g>

      {/* Right Wing (Clean Symmetrical Mirror across X=200) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="angelWingL">{leftWing}</g>
      </g>

      {/* Floating Sacred Diamond & Gold Stars */}
      <g fill="#FFFBEB">
        <path className="holySparkle" d="M 36 96 L 38 88 L 40 96 L 48 98 L 40 100 L 38 108 L 36 100 L 28 98 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "0.8s" }} d="M 12 144 L 14 138 L 16 144 L 22 146 L 16 148 L 14 154 L 12 148 L 6 146 Z" fill="#FFFFFF" />
        <path className="holySparkle" style={{ animationDelay: "1.4s" }} d="M 10 208 L 12 202 L 14 208 L 20 210 L 14 212 L 12 218 L 10 212 L 4 210 Z" fill="#FDE047" />
        <path className="holySparkle" style={{ animationDelay: "0.4s" }} d="M 64 362 L 66 356 L 68 362 L 74 364 L 68 366 L 66 372 L 64 366 L 58 364 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "0.5s" }} d="M 364 96 L 362 88 L 360 96 L 352 98 L 360 100 L 362 108 L 364 100 L 372 98 Z" fill="#FEF08A" />
        <path className="holySparkle" style={{ animationDelay: "1.2s" }} d="M 388 144 L 386 138 L 384 144 L 378 146 L 384 148 L 386 154 L 388 148 L 394 146 Z" fill="#FFFFFF" />
        <path className="holySparkle" style={{ animationDelay: "0.2s" }} d="M 390 208 L 388 202 L 386 208 L 380 210 L 386 212 L 388 218 L 390 212 L 396 210 Z" fill="#FDE047" />
        <path className="holySparkle" style={{ animationDelay: "1.6s" }} d="M 336 362 L 334 356 L 332 362 L 326 364 L 332 366 L 334 372 L 336 366 L 342 364 Z" fill="#FEF08A" />
      </g>
    </g>
  );
}

function WingsDemon({ color, dark }) {
  const leftWing = (
    <>
      {/* Deep Under-Membrane Shading (Massive 3D Volume & Tension) */}
      <g opacity={0.95}>
        <path d="M 100 116 C 68 124 48 122 34 122 C 38 148 30 172 16 186 C 40 170 68 152 100 116 Z" fill="#120306" />
        <path d="M 100 116 C 65 145 36 165 16 186 C 36 220 34 252 26 276 C 48 230 76 180 100 116 Z" fill="#180408" />
        <path d="M 100 116 C 68 175 46 230 26 276 C 54 314 58 336 64 354 C 82 280 92 205 100 116 Z" fill="#1F060B" />
        <path d="M 100 116 C 92 195 82 278 64 354 C 104 344 128 322 146 290 L 152 238 C 132 186 114 148 100 116 Z" fill="#150307" />
      </g>

      {/* Draconic Leathery Scalloped Membranes with Rich Molten Crimson */}
      <g stroke="#260408" strokeWidth={1.5}>
        {/* Cell 1: Thumb to Digit 1 */}
        <path d="M 100 116 Q 66 118 34 122 Q 44 146 16 186 Q 62 148 100 116 Z" fill="url(#demonMembraneMain)" />
        {/* Cell 2: Digit 1 to 2 */}
        <path d="M 100 116 Q 60 148 16 186 Q 40 226 26 276 Q 68 190 100 116 Z" fill="url(#demonMembraneMain)" />
        {/* Cell 3: Digit 2 to 3 */}
        <path d="M 100 116 Q 66 195 26 276 Q 60 318 64 354 Q 86 240 100 116 Z" fill="url(#demonMembraneMain)" />
        {/* Cell 4: Digit 3 to Trailing Flank */}
        <path d="M 100 116 Q 88 235 64 354 C 102 342 128 322 146 290 L 152 238 C 130 186 112 146 100 116 Z" fill="url(#demonMembraneMain)" />
      </g>

      {/* Luminous Crimson & Fiery Scallop Rim Highlights */}
      <path d="M 34 122 Q 44 146 16 186 Q 40 226 26 276 Q 60 318 64 354 C 102 342 128 322 146 290" stroke="url(#demonRimFlame)" strokeWidth={2.4} fill="none" opacity={0.88} />
      <path d="M 34 122 Q 44 146 16 186 Q 40 226 26 276 Q 60 318 64 354" stroke="#FDE047" strokeWidth={0.9} fill="none" opacity={0.65} />

      {/* Realistic Leathery Tension Shadows */}
      <g stroke="#080102" strokeWidth={2.2} fill="none" opacity={0.7}>
        <path d="M 98 120 C 72 138 48 150 26 162" />
        <path d="M 96 124 C 70 165 48 205 26 238" />
        <path d="M 94 128 C 80 190 68 250 44 306" />
        <path d="M 100 132 C 104 190 106 260 92 325" />
      </g>

      {/* Pulsing Liquid Molten Lava Vein Lattice */}
      <g stroke="url(#demonLavaVein)" fill="none" opacity={0.95}>
        <path d="M 98 122 Q 68 130 46 138 Q 36 148 26 162" strokeWidth={1.8} />
        <path d="M 68 130 Q 52 124 40 126" strokeWidth={1.1} />
        <path d="M 96 126 Q 62 170 34 216 Q 26 240 24 256" strokeWidth={2.2} />
        <path d="M 72 160 Q 48 186 28 200" strokeWidth={1.4} />
        <path d="M 52 196 Q 38 222 30 242" strokeWidth={1.2} />
        <path d="M 94 130 Q 72 196 54 266 Q 50 296 54 322" strokeWidth={2} />
        <path d="M 76 212 Q 62 248 42 288" strokeWidth={1.2} />
        <path d="M 98 134 Q 106 202 102 272 Q 112 298 126 318" strokeWidth={1.6} />
      </g>

      {/* Articulated Draconic Bone Phalanges (Heavy 3D Skeleton) */}
      {/* Digit 1 (Top Wing Bone) */}
      <path d="M 100 116 C 74 112 52 114 34 122" stroke="url(#demonBoneGrad)" strokeWidth={4.2} strokeLinecap="round" fill="none" />
      <path d="M 100 116 C 74 112 52 114 34 122" stroke="url(#demonBoneSpine)" strokeWidth={1.6} strokeLinecap="round" fill="none" />
      {/* Talon 1 */}
      <path d="M 34 122 C 26 120 18 116 12 112 C 16 122 24 126 34 124 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={0.9} />
      <circle cx="66" cy="115" r={2.8} fill="#20060A" />

      {/* Digit 2 (Apex Reach Bone - Maximum Wingspan) */}
      <path d="M 100 116 C 64 140 34 162 16 186" stroke="url(#demonBoneGrad)" strokeWidth={4.6} strokeLinecap="round" fill="none" />
      <path d="M 100 116 C 64 140 34 162 16 186" stroke="url(#demonBoneSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      {/* Talon 2 */}
      <path d="M 16 186 C 10 186 4 184 0 180 C 4 190 12 194 18 187 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={0.9} />
      <circle cx="54" cy="152" r={3} fill="#20060A" />

      {/* Digit 3 (Mid-Lower Bone) */}
      <path d="M 100 116 C 70 170 44 225 26 276" stroke="url(#demonBoneGrad)" strokeWidth={4.4} strokeLinecap="round" fill="none" />
      <path d="M 100 116 C 70 170 44 225 26 276" stroke="url(#demonBoneSpine)" strokeWidth={1.7} strokeLinecap="round" fill="none" />
      {/* Talon 3 */}
      <path d="M 26 276 C 20 282 14 286 8 292 C 16 292 22 288 28 278 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={0.9} />
      <circle cx="62" cy="202" r={2.8} fill="#20060A" />

      {/* Digit 4 (Trailing Lower Bone) */}
      <path d="M 100 116 C 90 196 78 276 64 354" stroke="url(#demonBoneGrad)" strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M 100 116 C 90 196 78 276 64 354" stroke="url(#demonBoneSpine)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      {/* Talon 4 */}
      <path d="M 64 354 C 60 364 54 372 48 380 C 58 376 64 366 66 356 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={0.9} />
      <circle cx="82" cy="248" r={2.8} fill="#20060A" />

      {/* Muscular Forearm Bone (Shoulder to Wrist) */}
      <path d="M 152 238 C 146 194 130 150 100 116 C 94 120 108 160 136 244 Z" fill="url(#demonBoneGrad)" stroke="#160307" strokeWidth={1.8} />
      <path d="M 150 236 C 144 195 128 153 100 116" stroke="url(#demonBoneSpine)" strokeWidth={2.8} strokeLinecap="round" fill="none" />

      {/* Forearm Armor Barbs & Spikes */}
      <path d="M 128 160 L 118 140 L 134 154 Z" fill="url(#demonTalonGrad)" stroke="#120306" strokeWidth={1} />
      <path d="M 116 136 L 104 118 L 122 130 Z" fill="url(#demonTalonGrad)" stroke="#120306" strokeWidth={1} />

      {/* Apex Wrist Raptor Talon Hook */}
      <path d="M 102 118 C 98 92 84 76 68 72 C 76 88 88 104 98 120 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={1.2} />
      <path d="M 100 116 L 110 106 L 106 120 Z" fill="url(#demonTalonGrad)" stroke="#090D16" strokeWidth={0.9} />

      {/* Wrist Knuckle Armor Sphere & Glowing Demonic Eye Core */}
      <circle cx="100" cy="118" r={6.5} fill="#20060A" stroke="#7F1D1D" strokeWidth={1.5} />
      <circle cx="100" cy="118" r={4} fill="#DC2626" />
      <circle cx="100" cy="118" r={2} fill="#FDE047" />
      <circle cx="100" cy="118" r={1} fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="demonAbyssAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#7F1D1D" stopOpacity="0.25" />
          <stop offset="85%" stopColor="#1E0A0F" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0B0204" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="demonMembraneMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B0508" />
          <stop offset="35%" stopColor={dark || "#3B0D14"} />
          <stop offset="75%" stopColor={color || "#581420"} />
          <stop offset="100%" stopColor="#8A1E2E" />
        </linearGradient>

        <linearGradient id="demonBoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#45141E" />
          <stop offset="55%" stopColor="#2A0B12" />
          <stop offset="100%" stopColor="#160307" />
        </linearGradient>

        <linearGradient id="demonBoneSpine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#450A10" />
        </linearGradient>

        <linearGradient id="demonRimFlame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F97316" />
          <stop offset="80%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        <linearGradient id="demonTalonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="demonLavaVein" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="65%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      {/* Abyssal Crimson Hellfire Aura */}
      <ellipse cx="200" cy="220" rx="150" ry="120" fill="url(#demonAbyssAura)" opacity={0.65} />
      <circle cx="200" cy="210" r="90" fill="#7F1D1D" opacity="0.18" />

      {/* Left Wing */}
      <g className="demonWingL">{leftWing}</g>

      {/* Right Wing (Clean Symmetrical Mirror across X=200) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="demonWingL">{leftWing}</g>
      </g>

      {/* Rising Infernal Embers */}
      <g fill="#EF4444">
        <circle className="wingEmber" cx="24" cy="175" r={2.5} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "0.7s" }} cx="44" cy="245" r={2} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.3s" }} cx="76" cy="325" r={2.2} fill="#EF4444" />
        <circle className="wingEmber" style={{ animationDelay: "0.3s" }} cx="18" cy="120" r={1.8} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "0.9s" }} cx="376" cy="175" r={2.5} fill="#FDE047" />
        <circle className="wingEmber" style={{ animationDelay: "1.5s" }} cx="356" cy="245" r={2} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "0.5s" }} cx="324" cy="325" r={2.2} fill="#EF4444" />
        <circle className="wingEmber" style={{ animationDelay: "1.1s" }} cx="382" cy="120" r={1.8} fill="#FDE047" />
      </g>
    </g>
  );
}

function WingsPhoenix({ color, dark }) {
  const leftWing = (
    <>
      {/* Deep Magma Fire Under-Plumage (Volumetric Silhouette Tier) */}
      <g fill="url(#phoenixMagmaBack)" stroke="#5A0B0B" strokeWidth={1.2} opacity={0.94}>
        <path d="M 148 206 C 134 148 100 96 64 74 C 56 86 68 112 92 144 C 114 172 136 198 148 206 Z" />
        <path d="M 140 210 C 114 150 72 108 26 102 C 20 116 34 140 64 172 C 90 200 120 218 140 210 Z" />
        <path d="M 130 218 C 96 166 44 134 6 146 C 4 162 20 188 52 212 C 84 232 114 232 130 218 Z" />
        <path d="M 124 230 C 86 194 34 178 4 206 C 4 222 22 244 56 252 C 86 256 112 244 124 230 Z" />
        <path d="M 126 248 C 90 224 36 222 12 260 C 14 276 36 290 68 288 C 96 284 116 266 126 248 Z" />
        <path d="M 132 266 C 102 250 52 262 30 314 C 34 328 56 336 84 320 C 110 304 124 284 132 266 Z" />
        <path d="M 138 284 C 114 278 72 300 58 362 C 68 372 88 370 110 344 C 128 324 138 300 138 284 Z" />
      </g>

      {/* Primary Blazing Solar Flame Feathers */}
      <g>
        {/* Flame 1 (High Solar Flare Feather) */}
        <path d="M 150 204 C 138 146 104 92 68 70 C 60 82 72 108 96 140 C 118 168 140 196 150 204 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 146 200 C 136 152 108 106 76 84 C 82 102 100 132 118 162 C 132 184 142 196 146 200 Z" fill="url(#phoenixFlameCore)" opacity={0.85} />
        <path d="M 148 202 C 134 150 106 102 72 78" stroke="url(#phoenixGoldSpine)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 148 202 C 134 150 106 102 72 78" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Flame 2 (Upper Flame Tongue) */}
        <path d="M 142 208 C 116 148 74 104 28 98 C 22 112 36 136 66 168 C 92 196 122 216 142 208 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 138 204 C 116 154 82 118 38 108 C 46 124 68 152 90 180 C 110 200 128 208 138 204 Z" fill="url(#phoenixFlameCore)" opacity={0.8} />
        <path d="M 140 206 C 116 152 80 114 34 104" stroke="url(#phoenixGoldSpine)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 140 206 C 116 152 80 114 34 104" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Flame 3 (Apex Solar Firestorm - Broadest Reach) */}
        <path d="M 132 216 C 98 164 46 130 8 142 C 4 158 20 184 54 208 C 84 228 116 230 132 216 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 128 212 C 98 168 54 142 18 150 C 26 168 50 192 80 212 C 102 222 120 220 128 212 Z" fill="url(#phoenixFlameCore)" opacity={0.8} />
        <path d="M 130 214 C 98 168 52 138 14 148" stroke="url(#phoenixGoldSpine)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 130 214 C 98 168 52 138 14 148" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Flame 4 (Mid Outer Solar Flare) */}
        <path d="M 126 228 C 88 192 36 174 6 202 C 4 218 22 240 56 248 C 86 252 114 242 126 228 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 122 224 C 88 196 44 184 16 208 C 26 224 50 238 78 244 C 98 246 114 238 122 224 Z" fill="url(#phoenixFlameCore)" opacity={0.8} />
        <path d="M 124 226 C 88 194 42 180 12 206" stroke="url(#phoenixGoldSpine)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M 124 226 C 88 194 42 180 12 206" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Flame 5 (Mid Lower Flare) */}
        <path d="M 128 246 C 92 222 38 220 14 258 C 16 274 38 288 70 286 C 98 282 118 264 128 246 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 124 242 C 92 224 46 226 24 262 C 34 274 58 282 86 280 C 104 276 118 262 124 242 Z" fill="url(#phoenixFlameCore)" opacity={0.8} />
        <path d="M 126 244 C 92 224 44 224 20 260" stroke="url(#phoenixGoldSpine)" strokeWidth={2.4} strokeLinecap="round" fill="none" />
        <path d="M 126 244 C 92 224 44 224 20 260" stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.9} />

        {/* Flame 6 (Lower Flame Tongue) */}
        <path d="M 134 264 C 104 250 54 262 32 312 C 36 326 58 334 86 318 C 112 302 126 282 134 264 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.4} />
        <path d="M 130 260 C 104 252 62 266 42 314 C 52 322 74 324 98 312 C 114 300 124 282 130 260 Z" fill="url(#phoenixFlameCore)" opacity={0.75} />
        <path d="M 132 262 C 104 252 60 266 38 314" stroke="url(#phoenixGoldSpine)" strokeWidth={2.2} strokeLinecap="round" fill="none" />

        {/* Flame 7 (Trailing Fire Tongue) */}
        <path d="M 140 282 C 116 276 74 298 60 360 C 68 370 88 368 110 342 C 128 322 138 298 140 282 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.3} />
        <path d="M 136 280 C 116 280 82 302 68 358" stroke="url(#phoenixGoldSpine)" strokeWidth={2} strokeLinecap="round" fill="none" />

        {/* Flame 8 (Inward Embers) */}
        <path d="M 146 296 C 132 296 98 322 88 388 C 96 396 114 392 128 366 C 142 346 148 320 146 296 Z" fill="url(#phoenixFlameMain)" stroke="#B91C1C" strokeWidth={1.2} />
        <path d="M 142 294 C 132 300 106 326 96 384" stroke="url(#phoenixGoldSpine)" strokeWidth={1.8} strokeLinecap="round" fill="none" />
      </g>

      {/* Middle Roaring Flame Tongues */}
      <g fill="url(#phoenixFlameMid)" opacity={0.96}>
        <path d="M 148 214 C 132 176 108 142 86 130 C 84 140 94 158 112 180 C 128 200 142 216 148 214 Z" />
        <path d="M 142 228 C 122 195 92 172 66 174 C 64 184 76 198 98 210 C 118 222 136 226 142 228 Z" />
        <path d="M 138 244 C 118 218 88 210 66 228 C 66 238 78 248 100 252 C 120 254 134 248 138 244 Z" />
        <path d="M 142 260 C 122 242 94 246 76 274 C 78 284 94 288 114 278 C 128 272 138 264 142 260 Z" />
      </g>

      {/* Solar Crest Wing Spar & Burning Gold Filigree */}
      <path d="M 152 230 C 146 180 128 134 98 110" stroke="#FEF08A" strokeWidth={4.5} strokeLinecap="round" fill="none" />
      <path d="M 152 230 C 146 180 128 134 98 110" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" fill="none" />

      {/* Blazing Sunburst Brooch */}
      <circle cx="152" cy="230" r="7" fill="#EA580C" stroke="#FEF08A" strokeWidth={1.6} />
      <circle cx="152" cy="230" r="4.2" fill="#FDE047" />
      <circle cx="152" cy="230" r="2" fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="phoenixSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#EA580C" stopOpacity="0.3" />
          <stop offset="75%" stopColor="#991B1B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="phoenixFlameMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor={color || "#F97316"} />
          <stop offset="100%" stopColor={dark || "#DC2626"} />
        </linearGradient>

        <linearGradient id="phoenixFlameCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="phoenixFlameMid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor={color || "#F97316"} />
          <stop offset="80%" stopColor="#C2410C" />
          <stop offset="100%" stopColor={dark || "#991B1B"} />
        </linearGradient>

        <linearGradient id="phoenixMagmaBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="50%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        <linearGradient id="phoenixGoldSpine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FEF08A" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Blinding Solar Halo */}
      <ellipse cx="200" cy="210" rx="150" ry="120" fill="url(#phoenixSunGlow)" opacity={0.65} />
      <circle cx="200" cy="190" r="100" fill="#F59E0B" opacity="0.16" />

      {/* Left Wing */}
      <g className="phoenixWingL">{leftWing}</g>

      {/* Right Wing (Clean Symmetrical Mirror across X=200) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="phoenixWingL">{leftWing}</g>
      </g>

      {/* Floating Solar Flame Embers */}
      <g fill="#F59E0B">
        <circle className="wingEmber" cx="28" cy="165" r={2.5} fill="#FEF08A" />
        <circle className="wingEmber" style={{ animationDelay: "0.8s" }} cx="48" cy="235" r={2} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.2s" }} cx="72" cy="315" r={2.2} fill="#EA580C" />
        <circle className="wingEmber" style={{ animationDelay: "0.4s" }} cx="20" cy="115" r={1.8} fill="#FFFFFF" />
        <circle className="wingEmber" style={{ animationDelay: "0.6s" }} cx="372" cy="165" r={2.5} fill="#FEF08A" />
        <circle className="wingEmber" style={{ animationDelay: "1.4s" }} cx="352" cy="235" r={2} fill="#F97316" />
        <circle className="wingEmber" style={{ animationDelay: "1.0s" }} cx="328" cy="315" r={2.2} fill="#EA580C" />
        <circle className="wingEmber" style={{ animationDelay: "0.2s" }} cx="380" cy="115" r={1.8} fill="#FFFFFF" />
      </g>
    </g>
  );
}

function WingsFae({ color, dark }) {
  const leftWing = (
    <>
      {/* Upper Grand Gossamer Wing (Forewing) */}
      <g>
        {/* Main Translucent Glass Body */}
        <path d="M 150 224 C 136 168 104 100 54 70 C 40 84 34 120 42 168 C 50 210 76 238 146 230 Z" fill="url(#faeGlassUpper)" stroke="#38BDF8" strokeWidth={1.4} />
        {/* Specular Prism Refraction Layer */}
        <path d="M 144 220 C 130 170 102 112 58 84 C 64 108 72 144 90 180 C 110 212 130 224 144 220 Z" fill="url(#faeSpecularLayer)" opacity={0.65} />

        {/* Curved Organic Bioluminescent Dragonfly Venation Lattice */}
        <g stroke="url(#faeVeinGlow)" strokeWidth={1.1} fill="none" opacity={0.92}>
          {/* Main Primary Vein Ribs */}
          <path d="M 150 224 C 126 174 92 126 54 70" strokeWidth={2.2} />
          <path d="M 148 226 C 116 186 80 152 42 168" strokeWidth={1.6} />
          <path d="M 146 228 C 112 216 84 214 48 206" strokeWidth={1.4} />

          {/* Organic Curved Cross-Vein Cells */}
          <path d="M 122 170 C 116 178 108 184 102 190" />
          <path d="M 98 132 C 92 140 84 146 76 154" />
          <path d="M 76 100 C 70 108 64 116 56 124" />
          <path d="M 110 200 C 104 206 98 212 92 218" />
          <path d="M 84 174 C 78 182 72 188 66 196" />
          <path d="M 64 142 C 58 150 52 156 46 164" />
          <path d="M 128 190 C 122 198 118 208 116 216" />
          <path d="M 102 154 C 96 164 92 174 88 184" />
          <path d="M 78 122 C 72 132 68 142 64 154" />
        </g>

        {/* Sparkling Bioluminescent Pearl Nodes at Vein Junctions */}
        <g fill="#FFFFFF">
          <circle cx="54" cy="70" r={2.6} />
          <circle cx="42" cy="168" r={2.2} />
          <circle cx="98" cy="132" r={1.8} />
          <circle cx="76" cy="154" r={1.8} />
          <circle cx="122" cy="170" r={2} />
          <circle cx="102" cy="190" r={1.6} />
          <circle cx="76" cy="100" r={1.8} />
          <circle cx="84" cy="174" r={1.6} />
        </g>
      </g>

      {/* Lower Secondary Gossamer Wing (Hindwing) */}
      <g>
        <path d="M 148 234 C 130 248 98 280 66 338 C 70 348 86 348 108 332 C 132 310 144 276 150 238 Z" fill="url(#faeGlassLower)" stroke="#A855F7" strokeWidth={1.4} />
        <g stroke="url(#faeVeinGlow)" strokeWidth={1} fill="none" opacity={0.88}>
          <path d="M 148 234 C 120 268 94 304 66 338" strokeWidth={1.8} />
          <path d="M 148 236 C 134 276 118 312 108 332" strokeWidth={1.3} />
          <path d="M 124 268 C 128 276 132 284 134 290" />
          <path d="M 104 296 C 108 304 112 312 116 318" />
          <path d="M 86 320 C 90 326 94 330 96 334" />
        </g>
        <circle cx="66" cy="338" r={2.4} fill="#FFFFFF" />
        <circle cx="108" cy="332" r={2} fill="#FFFFFF" />
        <circle cx="104" cy="296" r={1.6} fill="#FFFFFF" />
      </g>

      {/* Wing Base Crystal Brooch */}
      <polygon points="150,222 156,230 150,238 144,230" fill="#67E8F9" stroke="#FFFFFF" strokeWidth={1.2} />
      <circle cx="150" cy="230" r="2.2" fill="#FFFFFF" />
    </>
  );

  return (
    <g>
      <defs>
        <radialGradient id="faePrismGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#C084FC" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#F472B6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="faeGlassUpper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" stopOpacity="0.95" />
          <stop offset="30%" stopColor={color || "#BAE6FD"} stopOpacity="0.88" />
          <stop offset="65%" stopColor="#DDD6FE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="faeGlassLower" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor={dark || "#C4B5FD"} stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="faeSpecularLayer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="faeVeinGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#7DD3FC" />
          <stop offset="75%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>

      {/* Prismatic Mystical Aura */}
      <ellipse cx="200" cy="210" rx="150" ry="120" fill="url(#faePrismGlow)" opacity={0.65} />
      <circle cx="200" cy="190" r="95" fill="#38BDF8" opacity="0.14" />

      {/* Left Wing */}
      <g className="faeWingL">{leftWing}</g>

      {/* Right Wing (Clean Symmetrical Mirror across X=200) */}
      <g transform="translate(200, 0) scale(-1, 1) translate(-200, 0)">
        <g className="faeWingL">{leftWing}</g>
      </g>

      {/* Shimmering Starlight Sparkles */}
      <g fill="#BAE6FD">
        <circle className="holySparkle" cx="50" cy="68" r={2.5} fill="#FFFFFF" />
        <circle className="holySparkle" style={{ animationDelay: "0.6s" }} cx="36" cy="158" r={2} fill="#67E8F9" />
        <circle className="holySparkle" style={{ animationDelay: "1.1s" }} cx="62" cy="332" r={2.2} fill="#C084FC" />
        <circle className="holySparkle" style={{ animationDelay: "0.3s" }} cx="350" cy="68" r={2.5} fill="#FFFFFF" />
        <circle className="holySparkle" style={{ animationDelay: "0.9s" }} cx="364" cy="158" r={2} fill="#67E8F9" />
        <circle className="holySparkle" style={{ animationDelay: "1.4s" }} cx="338" cy="332" r={2.2} fill="#C084FC" />
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
  cape_banner: CapeBanner,
  cape_fur: CapeFur,
  cape_void: CapeVoid,
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
const ROBE_COMPONENTS = {
  robe_midnight: RobeMidnightTrim,
  robe_ivory: RobeIvoryTrim,
  robe_crimson: RobeCrimsonTrim,
  robe_gilded: RobeGildedTrim,
  robe_celestial: RobeCelestialTrim,
  robe_sunburst: RobeSunburstTrim,
  robe_frostveil: RobeFrostveilTrim,
  robe_verdant: RobeVerdantTrim,
};

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

const PET_COMPONENTS = {
  imp: PetImp,
  sprite: PetSprite,
  fox: PetFox,
  wisp: PetWisp,
  dragon: PetDragon,
  owl: PetOwl,
  mushroom: PetMushroom,
};

function Pet({ pet }) {
  if (!pet?.kind) return null;
  const Component = PET_COMPONENTS[pet.kind];
  if (!Component) return null;

  const isGround = pet.kind === "fox" || pet.kind === "mushroom";

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
  offhand_buckler: OffhandBuckler,
  offhand_skull: OffhandSkull,
  offhand_prism: OffhandPrism,
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

  if (aura.id === "aura_starlight") {
    return (
      <g className="auraPulse">
        {/* Constellation lines */}
        <path d="M110 370 L135 280 L200 130 L265 280 L290 370" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" fill="none" />
        <path d="M135 280 L265 280" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" fill="none" />
        {/* Twinkling star clusters */}
        {[[110, 370, 4.5], [135, 280, 5], [200, 130, 6], [265, 280, 5], [290, 370, 4.5], [160, 210, 3.5], [240, 210, 3.5], [200, 70, 5.5]].map(([cx, cy, s], i) => (
          <g key={i}>
            <line x1={cx - s} y1={cy} x2={cx + s} y2={cy} stroke="#BFDBFE" strokeWidth="1.2" strokeLinecap="round" />
            <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} stroke="#BFDBFE" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={1.5} fill="#FFFFFF" />
          </g>
        ))}
        <ellipse cx="200" cy="420" rx="100" ry="14" stroke="#93C5FD" strokeWidth="1" fill="none" strokeDasharray="4 6" opacity="0.4" />
      </g>
    );
  }

  if (aura.id === "aura_bloodmoon") {
    return (
      <g className="auraPulse">
        {/* Crescent blood moon over head */}
        <path d="M190 60 A 18 18 0 1 0 215 85 A 14 14 0 1 1 190 60 Z" fill="#DC2626" opacity="0.9" />
        <circle cx="200" cy="72" r="1.2" fill="#FCA5A5" />
        {/* Dripping blood orbs and crimson mist */}
        {[[115, 380, 3.5], [285, 370, 4], [108, 290, 3], [292, 260, 3.5], [125, 200, 2.5], [275, 180, 3], [195, 120, 2.8], [205, 150, 2]].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#B91C1C" opacity="0.85" />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.35} fill="#EF4444" />
          </g>
        ))}
        {/* Dark crimson orbit */}
        <ellipse cx="200" cy="430" rx="112" ry="16" stroke="#991B1B" strokeWidth="1.4" fill="none" strokeDasharray="6 8" opacity="0.7" />
      </g>
    );
  }

  return null;
}

const HAT_COMPONENTS = {
  hat_pointed: HatPointed,
  hat_hood: HatHood,
  hat_wide: HatWide,
  hat_crown: HatCrown,
  hat_circlet: HatCirclet,
  hat_warlord: HatWarlord,
  hat_laurel: HatLaurel,
  hat_jester: HatJester,
};
const STAFF_COMPONENTS = {
  ashwood: StaffAshwood,
  frostbound: StaffFrostbound,
  verdant: StaffVerdant,
  voidglass: StaffVoidglass,
  sunfire: StaffSunfire,
  stormcaller: StaffStormcaller,
  bloodpact: StaffBloodpact,
  coral_scepter: StaffCoralScepter,
};

function MageSprite({ mage, facing, hurt, casting, damageFlash = false, size = 1, easterEgg = null }) {
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

  const isLowHp = mage.hp != null && mage.maxHp != null && mage.hp < mage.maxHp * 0.25;

  return (
    <div
      className={`${hurt ? "shake" : casting ? "cast" : ""} ${damageFlash ? "damage-flash" : ""} ${isLowHp ? "low-hp-pulse" : ""}`}
      style={{ position: "relative", width: w, height: h, flexShrink: 0 }}
    >
      {aura?.color && (
        <div className="auraPulse" style={{
          position: "absolute", inset: `${4 * size}px`, borderRadius: "50%",
          background: `radial-gradient(circle, ${aura.color}66 0%, ${aura.color}22 55%, transparent 75%)`,
        }} />
      )}
      <StatusFXOverlay mage={mage} />
      <svg width={w} height={h} viewBox="0 0 400 500" style={{ position: "relative", transform: facing === "left" ? "scaleX(-1)" : "none", filter: casting ? "brightness(1.25)" : "none" }}>
        {/* Floor Ground Shadow - stays anchored to the ground plane */}
        <ellipse cx="200" cy="466" rx="68" ry="13" fill="#000000" className="groundShadow" />
        {Staff && <ellipse cx="317" cy="466" rx="15" ry="4.5" fill="#000000" className="groundShadow" opacity="0.35" />}
        {Offhand && <ellipse cx="94" cy="466" rx="16" ry="4.8" fill="#000000" className="groundShadow" opacity="0.3" />}

        {/* Floating Mage Group */}
        <g className={hurt || casting ? "" : "mageFloatGroup"}>
          <AuraVisual aura={aura} />
          {Cape && mage.cape?.color && <Cape color={mage.cape.color} dark={mage.cape.dark} />}
          <Base p={p} look={look} hasHat={!!Hat} affinity={mage.affinity} hatId={mage.hat} robeTrim={RobeTrim && <RobeTrim />} armor={Armor && <Armor />} gloves={mage.gloves} hasOffhand={!!Offhand} casting={casting} easterEgg={easterEgg} />
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
      {mage.shield > 0 && <span title={`Barreira: +${mage.shield} absorção (+20% Dano em Ataques!)`} style={{ color: "#5FC1E8" }}>🛡{mage.shield}</span>}
      {mage.status?.burn > 0 && <span title={`Queimando: 4 dmg × ${mage.status.burn} turnos (Vulnerável a Detonação)`} style={{ color: "#FF6B3D" }}>🔥{mage.status.burn}</span>}
      {mage.status?.chill && <span title="Congelado: -30% no próximo ataque (Vulnerável a Quebra de Gelo)" style={{ color: "#5FC1E8" }}>❄</span>}
      {mage.status?.entangled > 0 && <span title={`Enredado: Preso por ${mage.status.entangled} turnos (Vulnerável a Espinhos)`} style={{ color: "#72C063" }}>🌿{mage.status.entangled}</span>}
      {mage.relic?.revive && !mage.phoenixUsed && <span title="Pena da Fênix pronta para reviver" style={{ color: "#E8B44F" }}>✧</span>}
    </span>
  );
}

function RarityCard({ item, selected, locked, onClick, subtitle, lang = "pt" }) {
  const r = RARITY[item.rarity] || { color: T.common, label: "Comum" };
  const displayName = (lang === "pt" && item.name_pt) ? item.name_pt : item.name;
  const displayDesc = locked
    ? (lang === "pt" ? "Desbloqueie vencendo duelos ou na Loja Arcana." : "Unlock by winning duels or in the Arcane Shop.")
    : (subtitle || ((lang === "pt" && item.desc_pt) ? item.desc_pt : item.desc) || "");
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`card-surface rounded-xl p-3 text-left w-full transition-all duration-150 relative overflow-hidden select-none group ${
        locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{
        backgroundColor: T.bgSurface,
        borderColor: selected ? r.color : T.borderSubtle,
        boxShadow: selected
          ? `0 4px 16px rgba(0,0,0,0.5), 0 0 14px ${r.color}33, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => {
        if (!locked && !selected) {
          e.currentTarget.style.borderColor = `${r.color}99`;
        }
      }}
      onMouseLeave={(e) => {
        if (!locked && !selected) {
          e.currentTarget.style.borderColor = T.borderSubtle;
        }
      }}
    >
      <div className="flex justify-between items-center mb-1 gap-2">
        <span
          className="font-mono text-[13px] sm:text-[14px] font-bold flex items-center gap-1.5"
          style={{ color: T.textPrimary }}
        >
          {locked && <span className="text-[12px] opacity-70">🔒</span>}
          <span>{displayName}</span>
        </span>
        <span
          className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border flex-shrink-0"
          style={{
            borderColor: `${r.color}66`,
            backgroundColor: `${r.color}18`,
            color: r.color,
          }}
        >
          {r.label}
        </span>
      </div>
      <div
        className="text-[11px] sm:text-[12px] font-mono leading-relaxed"
        style={{ color: T.textSecondary }}
      >
        {displayDesc}
      </div>
    </button>
  );
}

// ================= MAIN =================
export default function MageDuel() {
  const [saved] = useState(() => loadSave());
  const [lang, setLang] = useState(() => saved?.lang ?? "pt");
  const t = (k) => I18N[lang]?.[k] || I18N.pt[k] || k;
  const toggleLang = () => setLang(l => (l === "pt" ? "en" : "pt"));
  const [phase, setPhase] = useState(saved ? "loadout" : "create");
  const [tab, setTab] = useState(null);
  const [mageName, setMageName] = useState(saved?.mageName ?? "");
  const [affinity, setAffinity] = useState(saved?.affinity ?? "fire");
  const [chosen, setChosen] = useState(saved?.chosen ?? ["fireball", "emberjab", "ward", "surge"]);
  const [staffId, setStaffId] = useState(saved?.staffId ?? "ashwood");
  const [relicId, setRelicId] = useState(saved?.relicId ?? "wardsigil");
  const [hatId, setHatId] = useState(saved?.hatId ?? "hat_pointed");
  const [auraId, setAuraId] = useState(saved?.auraId ?? "aura_ember");
  const [capeId, setCapeId] = useState(saved?.capeId ?? "wings_angel");
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
  const [owned, setOwned] = useState(() => {
    const initial = new Set(DEV_UNLOCK_ALL ? ALL_ITEMS.map(i => i.id) : (saved?.owned ?? START_OWNED));
    initial.add("wings_angel");
    initial.add("wings_demon");
    initial.add("wings_phoenix");
    initial.add("wings_fae");
    return initial;
  });
  const [shards, setShards] = useState(() => saved?.shards ?? 0);
  const [premiumOwned, setPremiumOwned] = useState(new Set(saved?.premiumOwned ?? []));

  // Battle Pass State (Season of Embers)
  const [seasonXp, setSeasonXp] = useState(() => saved?.seasonXp ?? 0);
  const [passPremiumOwned, setPassPremiumOwned] = useState(() => saved?.passPremiumOwned ?? false);
  const [claimedRewards, setClaimedRewards] = useState(() => new Set(saved?.claimedRewards ?? []));
  const [winStreak, setWinStreak] = useState(0);

  // Mage Progression (Level 1-30 & 4-7 Dynamic Slots)
  const [mageXp, setMageXp] = useState(() => saved?.mageXp ?? 0);
  const [unlockedSkills, setUnlockedSkills] = useState(() => new Set(saved?.unlockedSkills ?? START_SKILLS));
  const [skillMastery, setSkillMastery] = useState(() => saved?.skillMastery ?? {});
  const [pendingLevelDraft, setPendingLevelDraft] = useState(() => saved?.pendingLevelDraft ?? null);
  const [bossesDefeated, setBossesDefeated] = useState(() => new Set(saved?.bossesDefeated ?? []));
  const [bossEncounter, setBossEncounter] = useState(null);
  const [showBossTrialsModal, setShowBossTrialsModal] = useState(false);
  const [showMasteryCelebration, setShowMasteryCelebration] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [admToast, setAdmToast] = useState(null);

  // Skillbook Filters
  const [skillFilterEl, setSkillFilterEl] = useState("all");
  const [skillFilterRole, setSkillFilterRole] = useState("all");

  const mageLevelInfo = getMageXpInfo(mageXp);
  const mageLevel = mageLevelInfo.level;
  const maxSlots = getMaxSlots(mageLevel);

  // Juice & Feedback States
  const [damageFlashP, setDamageFlashP] = useState(false);
  const [damageFlashE, setDamageFlashE] = useState(false);
  const [screenFlash, setScreenFlash] = useState(null); // 'white' | 'gold' | null
  const [phaseTransition, setPhaseTransition] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);
  const [showShootingStars, setShowShootingStars] = useState(false);
  const [easterEgg, setEasterEgg] = useState(null);

  const seasonLevel = Math.min(SEASON.maxLevel, Math.floor(seasonXp / SEASON.xpPerLevel) + 1);

  // Phase transition circle overlay
  useEffect(() => {
    setPhaseTransition(true);
    const t = setTimeout(() => setPhaseTransition(false), 500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const data = {
      lang,
      mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId,
      skinToneId, hairColorId, hairStyleId, beardStyleId, eyeColorId, genderId, faceId,
      earringId, noseRingId, offhandId, glovesId,
      owned: [...owned],
      shards,
      premiumOwned: [...premiumOwned],
      seasonId: SEASON.id,
      seasonXp,
      passPremiumOwned,
      claimedRewards: [...claimedRewards],
      mageXp,
      unlockedSkills: [...unlockedSkills],
      skillMastery,
      pendingLevelDraft,
      bossesDefeated: [...bossesDefeated],
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }, [lang, mageName, affinity, chosen, staffId, relicId, hatId, auraId, capeId, armorId, petId, robeId, skinToneId, hairColorId, hairStyleId, beardStyleId, eyeColorId, genderId, faceId, earringId, noseRingId, offhandId, glovesId, owned, shards, premiumOwned, seasonXp, passPremiumOwned, claimedRewards, mageXp, unlockedSkills, skillMastery, pendingLevelDraft, bossesDefeated]);

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
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  const TURN_DURATION = 15;
  const [turnCountdown, setTurnCountdown] = useState(TURN_DURATION);
  const [roundNum, setRoundNum] = useState(1);
  const [currentTurn, setCurrentTurn] = useState("player");
  const [combatStats, setCombatStats] = useState({
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    critsCount: 0,
    turnsCount: 0,
    combosCount: 0,
    highestHit: 0,
    skillUsage: {},
  });
  const [isTutorial, setIsTutorial] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [screenShake, setScreenShake] = useState(null);
  const [activeSpell, setActiveSpell] = useState(null);
  const [impactEffects, setImpactEffects] = useState([]);
  const [selfCastEffects, setSelfCastEffects] = useState([]);
  const logRef = useRef(null);
  const floatId = useRef(0);
  const projId = useRef(0);

  // ================= LOJA DE COSMÉTICOS & MOEDA ARCANE SHARDS =================
  const [showShardShopModal, setShowShardShopModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [shopCategory, setShopCategory] = useState("all");
  const [scoutView, setScoutView] = useState("both");
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  const adIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (adIntervalRef.current) clearInterval(adIntervalRef.current);
    };
  }, []);

  function buyCosmetic(itemId) {
    const entry = SHOP_ITEMS.find(i => i.id === itemId);
    if (!entry || shards < entry.price) return false;
    if (owned.has(itemId)) return false;
    setShards(s => s - entry.price);
    setOwned(o => new Set([...o, itemId]));
    setPremiumOwned(p => new Set([...p, itemId]));
    return true;
  }

  function purchaseShardPack(amount) {
    // TODO: redirecionar para Stripe Checkout Session (backend)
    setPurchasing(true);
    setTimeout(() => {
      setShards(s => s + amount);
      setPurchasing(false);
      setShowShardShopModal(false);
    }, 1500);
  }

  function startWatchRewardedAd() {
    // TODO: integrar SDK de rewarded ads (CrazyGames/Poki)
    if (adIntervalRef.current) clearInterval(adIntervalRef.current);
    setAdModalOpen(true);
    setAdTimer(3);
    let timeLeft = 3;
    adIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setAdTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(adIntervalRef.current);
        setShards(s => s + 50);
        setTimeout(() => setAdModalOpen(false), 700);
      }
    }, 1000);
  }

  const stars = useMemo(() => Array.from({ length: 16 }, () => ({
    left: Math.random() * 100, top: Math.random() * 100,
    size: rand(1, 2), delay: rand(0, 4), dur: rand(3, 6),
  })), []);

  const dustParticles = useMemo(() => Array.from({ length: 8 }, () => ({
    left: Math.random() * 100,
    size: rand(1.5, 2.5),
    delay: rand(0, 15),
    dur: rand(20, 30),
  })), []);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);
  const addLog = (line) => setLog(l => [...l, line]);

  function addFloat(side, text, color, big, badge = null, badgeColor = null) {
    const id = ++floatId.current;
    setFloats(f => [...f, { id, side, text, color, big, badge, badgeColor, left: rand(20, 60) }]);
    setTimeout(() => setFloats(f => f.filter(x => x.id !== id)), 1200);
  }

  function fireProjectile(el, fromSide) {
    const id = ++projId.current;
    setProjectiles(pr => [...pr, { id, el, fromSide }]);
    setTimeout(() => setProjectiles(pr => pr.filter(x => x.id !== id)), 520);
  }

  function toggleSkill(id) {
    if (!unlockedSkills.has(id)) return;
    setChosen(c => {
      if (c.includes(id)) {
        if (c.length <= 1) return c;
        return c.filter(x => x !== id);
      }
      if (c.length < maxSlots) {
        return [...c, id];
      }
      return c;
    });
  }

  function findOpponent() {
    setBossEncounter(null);
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
      setEnemy(makeEnemy(mageLevel));
      setMatchStatus("Match Found! Teleporting to faceoff...");
      setTimeout(() => {
        setMatchmaking(false);
        setPhase("scout");
      }, 450);
    }, 2100);
  }

  function startBossDuel(boss) {
    const bossSkills = boss.skills.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
    const bossMage = makeMage(
      boss.name,
      boss.affinity,
      bossSkills,
      boss.staffId,
      boss.relicId,
      boss.hatId,
      boss.auraId,
      boss.capeId,
      "armor_none",
      "pet_none",
      "robe_classic",
      boss.look,
      "offhand_none",
      "gloves_arcane"
    );
    bossMage.maxHp = boss.hp;
    bossMage.hp = boss.hp;
    if (bossMage.relic?.startShield) bossMage.shield = bossMage.relic.startShield;

    setBossEncounter(boss);
    setEnemy(bossMage);
    setShowBossTrialsModal(false);
    setPhase("scout");
  }

  function startTutorial() {
    const dummy = makeMage(
      "Espantalho Arcano",
      "arcane",
      [FOCUS],
      "ashwood",
      "none",
      "hat_pointed",
      "aura_sparkle",
      "cape_none",
      "armor_none",
      "pet_none",
      "robe_classic",
      { skinTone: "skin_fair", hairColor: "hair_white", hairStyle: "hair_short", beardStyle: "beard_none", eyeColor: "eye_dark", gender: "gender_male", face: "face_round", earrings: "earring_none", noseRing: "nosering_none" },
      "offhand_none",
      "gloves_arcane"
    );
    dummy.maxHp = 40;
    dummy.hp = 40;
    dummy.mana = 20;
    dummy.archetype = {
      id: "dummy",
      name: "Alvo de Treino",
      icon: "🎯",
      color: "#38BDF8",
      desc: "Espantalho arcano encantado para noviços praticarem combos e gestão de mana.",
      tagline: "Inofensivo",
    };
    setBossEncounter(null);
    setIsTutorial(true);
    setEnemy(dummy);
    setPhase("scout");
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
    setShowSurrenderModal(false);
    setRoundNum(1);
    setCurrentTurn("player");
    setCombatStats({
      totalDamageDealt: 0,
      totalDamageTaken: 0,
      critsCount: 0,
      turnsCount: 0,
      combosCount: 0,
      highestHit: 0,
      skillUsage: {},
    });
    const todayMod = getTodayModifier();
    const turnDur = todayMod.id === "swift_duels" ? 8 : TURN_DURATION;
    setTurnCountdown(turnDur);
    setIsTimerPaused(false);
    setScreenShake(null);
    setActiveSpell(null);
    setImpactEffects([]);
    setSelfCastEffects([]);
    const initialLogs = isTutorial ? [
      "🎯 CAMPO DE TREINAMENTO ARCANO",
      "💡 DICA 1: Sua mana máxima é 40 (+3/turno). Use 'Foco' para restaurar +10 de mana!",
      "💡 DICA 2: Crie COMBOS! Congelar + Gelo causa Quebra (+50%). Queimar + Fogo causa Detonação!",
      "💡 DICA 3: Mantenha sua Barreira erguida para desferir Golpes Fortalecidos (+20% dano)!",
    ] : [
      `${enemy.name} challenges you!`,
      `Foe: ${ELEMENTS[enemy.affinity].name} affinity · ${enemy.staffGear.name}${enemy.relic ? " · " + enemy.relic.name : ""}`,
      `Arquétipo: ${enemy.archetype?.name || "Desconhecido"} ${enemy.archetype?.icon || "⚔️"} — ${enemy.archetype?.tagline || ""}`,
    ];
    setLog(initialLogs);
    setPhase("battle"); setBusy(false);
  }

  function recordMastery(skillId) {
    if (!skillId || skillId === "focus") return;
    setSkillMastery(prev => {
      const current = prev[skillId] || 0;
      const nextCount = current + 1;
      const updated = { ...prev, [skillId]: nextCount };
      const upgradeSkill = SKILLS.find(s => s.upgradeOf === skillId);
      if (upgradeSkill && !unlockedSkills.has(upgradeSkill.id)) {
        const required = upgradeSkill.unlock?.casts || 8;
        if (nextCount >= required) {
          setUnlockedSkills(us => new Set([...us, upgradeSkill.id]));
          const baseName = SKILLS.find(s => s.id === skillId)?.name || skillId;
          addLog(`✨ MAESTRIA! Você dominou ${baseName} e desbloqueou ${upgradeSkill.name}!`);
          setShowMasteryCelebration(upgradeSkill);
        }
      }
      return updated;
    });
  }

  function applySkill(skill, attacker, defender, side) {
    const todayMod = getTodayModifier();
    const lines = [];
    const a = { ...attacker, status: { ...attacker.status }, cds: { ...attacker.cds } };
    const d = { ...defender, status: { ...defender.status }, cds: { ...defender.cds } };

    // Blood Rite daily modifier: skills cost 3 HP
    if (todayMod.id === "blood_rite" && (skill.mana > 0 || skill.dmg > 0)) {
      a.hp = Math.max(1, a.hp - 3);
      lines.push("🩸 Rito de Sangue: Custo sacrificial de 3 HP!");
      addFloat(side, "-3 HP", "#DC2626", false);
    }

    a.mana -= skill.mana;
    if (skill.cd) a.cds[skill.id] = skill.cd + 1;
    lines.push(`${side === "p" ? "You cast" : a.name + " casts"} ${skill.name}!`);

    if (side === "p") {
      recordMastery(skill.id);
    }

    if (skill.restore) {
      a.mana = Math.min(MAX_MANA, a.mana + skill.restore);
      lines.push(`+${skill.restore} mana.`);
      addFloat(side, `+${skill.restore} 💧`, "#38BDF8", false);
    }
    if (skill.shield) {
      const shieldVal = todayMod.id === "runic_bulwark" ? Math.round(skill.shield * 1.4) : skill.shield;
      a.shield += shieldVal;
      lines.push(`A ward absorbs the next ${shieldVal} damage.`);
      addFloat(side, `+${shieldVal} 🛡️`, "#5FC1E8", false);
    }
    if (skill.heal && !skill.dmg) {
      const h = Math.round(skill.heal * (1 + (a.staffGear?.healBonus || 0)));
      a.hp = Math.min(a.maxHp, a.hp + h);
      lines.push(`Healed ${h} HP.`);
      addFloat(side, `+${h}`, "#72C063", false);
    }

    let didDamage = false;
    if (skill.dmg) {
      let comboMult = 1;
      let bonusFlatDmg = 0;
      let isCombo = false;

      // Combo 1: Chill + Frost Lance / Ice ("Quebra de Gelo")
      if (d.status.chill && skill.el === "ice") {
        comboMult *= 1.5;
        d.status.chill = false;
        isCombo = true;
        lines.push("⚡ COMBO: Quebra de Gelo! O gelo estilhaça no alvo congelado (+50% de dano)!");
        addFloat(side === "p" ? "e" : "p", "QUEBRA DE GELO!", "#4FA3D1", true, "⚡ COMBO!", "#38BDF8");
      }

      // Combo 2: Burn + Fireball / Fire ("Detonação Ígnea")
      if (d.status.burn > 0 && skill.el === "fire") {
        const burnBonus = d.status.burn * 8;
        d.status.burn = 0;
        bonusFlatDmg += burnBonus;
        isCombo = true;
        lines.push(`💥 COMBO: Detonação Ígnea! Queimadura consumida para causar +${burnBonus} de dano explosivo!`);
        addFloat(side === "p" ? "e" : "p", `+${burnBonus} EXPLOSÃO!`, "#FF6B3D", true, "💥 COMBO!", "#F97316");
      }

      // Combo 3: Entangle + Thorns / Nature ("Espinhos Entrelaçados")
      if ((d.status.entangled > 0 || d.mana <= 12) && skill.el === "nature") {
        bonusFlatDmg += 12;
        if (d.status.entangled > 0) d.status.entangled = 0;
        isCombo = true;
        lines.push("🌿 COMBO: Espinhos Entrelaçados! +12 de dano perfurante nas raízes do alvo!");
        addFloat(side === "p" ? "e" : "p", "+12 ESPINHOS!", "#72C063", true, "🌿 COMBO!", "#22C55E");
      }

      // Combo 4: Shield + Attack ("Golpe Fortalecido")
      if (a.shield > 0) {
        comboMult *= 1.2;
        isCombo = true;
        lines.push("🛡️ COMBO: Golpe Fortalecido! Barreira ativa canalizou +20% de dano!");
        addFloat(side, "+20% FORÇA!", "#E8B44F", false, "🛡️ FORÇA!", "#E8B44F");
      }

      // Mana Opportunity Cost (Change 4): Arcane high mana reserve bonus (attacker had >= 25 mana before spell deduction)
      if (attacker.mana >= 25 && (skill.el === "arcane" || skill.tier >= 2)) {
        comboMult *= 1.15;
        lines.push("✨ SOBRECARGA ARCANA: +15% de dano por reserva de mana elevada (≥25)!");
      }

      const { dmg, crit, chilled } = computeDamage(skill, a, d, comboMult, bonusFlatDmg);
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
      addFloat(side === "p" ? "e" : "p", `-${remaining}`, crit ? "#E8B44F" : "#F2EAD8", crit, isCombo ? "COMBO!" : crit ? "CRIT!" : null);

      // Track combat statistics
      if (side === "p") {
        setCombatStats(prev => ({
          ...prev,
          totalDamageDealt: prev.totalDamageDealt + remaining,
          critsCount: prev.critsCount + (crit ? 1 : 0),
          combosCount: prev.combosCount + (isCombo ? 1 : 0),
          highestHit: Math.max(prev.highestHit, remaining),
          skillUsage: {
            ...prev.skillUsage,
            [skill.id]: (prev.skillUsage[skill.id] || 0) + 1,
          },
        }));
      } else {
        setCombatStats(prev => ({
          ...prev,
          totalDamageTaken: prev.totalDamageTaken + remaining,
        }));
      }

      // Stormcaller chill proc (10% on any skill hit)
      if (a.staffGear?.chillChance && chance(a.staffGear.chillChance)) {
        d.status.chill = true;
        lines.push("Stormcaller crackles! The foe is Chilled.");
      }

      // Prismatic Prism echo proc (15% chance to echo 50% damage)
      if (didDamage && a.offhand?.echoChance && chance(a.offhand.echoChance)) {
        const echoDmg = Math.round(remaining * 0.5);
        if (echoDmg > 0) {
          d.hp -= echoDmg;
          lines.push(`Prismatic Echo resonates for ${echoDmg} extra damage!`);
          addFloat(side === "p" ? "e" : "p", `-${echoDmg}`, "#A855F7", false);
        }
      }

      // Explicit status effects from skill.effect
      const statusDurExtra = todayMod.id === "status_storm" ? 1 : 0;
      if (skill.effect) {
        const eff = skill.effect;
        const willProc = !eff.chance || chance(eff.chance);
        if (willProc) {
          if (eff.status === "burn") {
            const dur = (eff.duration || 3) + statusDurExtra;
            d.status.burn = dur;
            lines.push(`${side === "p" ? "The foe is" : "You are"} Burning! (4 dmg × ${dur} turns)`);
          } else if (eff.status === "chill") {
            d.status.chill = true;
            lines.push("Chilled! Next attack weakened 30%.");
          } else if (eff.status === "entangle") {
            const drain = eff.amount || 8;
            d.mana = Math.max(0, d.mana - drain);
            d.status.entangled = 2 + statusDurExtra;
            lines.push(`Entangled! Foe loses ${drain} mana and is rooted.`);
          }
        }
      } else {
        const heavy = skill.dmg >= 20;
        if (heavy && skill.el === "fire" && chance(25 + (a.staffGear?.burnChance || 0))) {
          const dur = 3 + statusDurExtra;
          d.status.burn = dur; lines.push(`${side === "p" ? "The foe is" : "You are"} Burning! (4 dmg × ${dur} turns)`);
        }
        if (heavy && skill.el === "ice" && chance(30)) {
          d.status.chill = true; lines.push("Chilled! Next attack weakened 30%.");
        }
        if (heavy && skill.el === "nature" && chance(30)) {
          d.mana = Math.max(0, d.mana - 8);
          d.status.entangled = 2 + statusDurExtra;
          lines.push("Entangled! Foe loses 8 mana and is rooted.");
        }
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
      // Soulstone relic: heal 8 HP upon defeating an opponent
      if (d.hp <= 0 && a.relic?.id === "soulstone") {
        const sHeal = a.relic.healOnKill || 8;
        a.hp = Math.min(a.maxHp, a.hp + sHeal);
        lines.push(`Soulstone feeds on defeat: healed +${sHeal} HP!`);
        addFloat(side, `+${sHeal}`, "#72C063", false);
      }
    }
    return { a, d, lines, didDamage };
  }

  function tickTurnEnd(m) {
    const todayMod = getTodayModifier();
    const n = { ...m, status: { ...m.status }, cds: {} };
    const cdExtra = todayMod.id === "swift_duels" ? 1 : 0;
    const cdReduction = 1 + (m.relic?.id === "chronoloop" ? 1 : 0) + cdExtra;
    for (const k in m.cds) if (m.cds[k] - cdReduction > 0) n.cds[k] = m.cds[k] - cdReduction;
    if (n.status.burn > 0) { n.hp -= 4; n.status.burn -= 1; }
    if (n.status.entangled > 0) { n.status.entangled -= 1; }
    let baseRegen = REGEN;
    if (todayMod.id === "arcane_surge") baseRegen += 2;
    n.mana = Math.min(MAX_MANA, n.mana + baseRegen + (n.staffGear?.regen || 0) + (n.relic?.regen || 0));
    return n;
  }

  function aiChoose(e, p) {
    // Training dummy is harmless and uses focus
    if (e.archetype?.id === "dummy") return FOCUS;

    const usable = e.skills.filter(s => e.mana >= s.mana && !e.cds[s.id]);
    if (usable.length === 0) return FOCUS;

    const heal = usable.find(s => s.heal);
    const ward = usable.find(s => s.shield);
    const surge = usable.find(s => s.restore);
    const attacks = usable.filter(s => s.dmg > 0);

    const arch = e.archetype?.id || "tactician";

    // Berserker: Aggressive, highest damage, ignores shields
    if (arch === "berserker") {
      if (e.hp < 18 && heal && Math.random() < 0.4) return heal;
      if (attacks.length > 0) {
        return attacks.slice().sort((a, b) => (b.dmg || 0) - (a.dmg || 0))[0];
      }
      return surge || FOCUS;
    }

    // Turtle: Highly defensive, maintains shields & sustained heals
    if (arch === "turtle") {
      if (ward && e.shield <= 6 && Math.random() < 0.85) return ward;
      if (e.hp < 65 && heal && Math.random() < 0.7) return heal;
      if (attacks.length > 0) {
        const drainAtk = attacks.find(s => s.heal);
        if (drainAtk) return drainAtk;
        return attacks.slice().sort((a, b) => a.mana - b.mana)[0];
      }
      return surge || FOCUS;
    }

    // Controller: Prioritizes applying status ailments
    if (arch === "controller") {
      const chillSpell = attacks.find(s => s.effect?.status === "chill" || s.el === "ice");
      if (!p.status.chill && chillSpell && Math.random() < 0.8) return chillSpell;

      const burnSpell = attacks.find(s => s.effect?.status === "burn" || s.el === "fire");
      if (!p.status.burn && burnSpell && Math.random() < 0.8) return burnSpell;

      const drainSpell = attacks.find(s => s.effect?.status === "entangle" || s.heal);
      if (drainSpell && p.mana > 12 && Math.random() < 0.7) return drainSpell;

      if (e.hp < 35 && heal) return heal;
      if (ward && e.shield === 0 && Math.random() < 0.4) return ward;
      if (attacks.length > 0) return attacks.slice().sort((a, b) => (b.dmg || 0) - (a.dmg || 0))[0];
      return surge || FOCUS;
    }

    // Gambler: Loves heavy attacks, crits, and high variance
    if (arch === "gambler") {
      if (Math.random() < 0.25 && surge) return surge;
      if (attacks.length > 0) {
        if (Math.random() < 0.6) {
          return attacks.slice().sort((a, b) => (b.dmg || 0) - (a.dmg || 0))[0];
        }
        return pick(attacks);
      }
      return usable[0] || FOCUS;
    }

    // Tactician: Smart combo triggers, shields when vulnerable
    if (p.status.chill) {
      const iceCombo = attacks.find(s => s.el === "ice");
      if (iceCombo) return iceCombo;
    }
    if (p.status.burn > 0) {
      const fireCombo = attacks.find(s => s.el === "fire");
      if (fireCombo) return fireCombo;
    }
    if (e.shield > 0 && attacks.length > 0) {
      return attacks.slice().sort((a, b) => (b.dmg || 0) - (a.dmg || 0))[0];
    }
    if (e.hp < 35 && heal) return heal;
    if (ward && e.shield === 0 && e.hp < 70 && Math.random() < 0.5) return ward;
    if (attacks.length === 0) return surge || usable[0] || FOCUS;

    let best = attacks[0], bestVal = -1;
    for (const s of attacks) {
      let v = s.dmg * (s.el === e.affinity ? AFFINITY_BONUS : 1);
      if (e.staffGear?.el === s.el && e.staffGear.elBonus) v *= 1 + e.staffGear.elBonus;
      if (s.effect?.status === "chill" && !p.status.chill) v += 8;
      if (s.effect?.status === "burn" && !p.status.burn) v += 10;
      if (v > bestVal) { bestVal = v; best = s; }
    }
    if (surge && e.mana < 12 && Math.random() < 0.6) return surge;
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
    // Battle Pass XP Progression
    const bpXpGained = win ? 30 : 10;
    setSeasonXp(prevXp => {
      const nextXp = prevXp + bpXpGained;
      const oldLvl = Math.min(SEASON.maxLevel, Math.floor(prevXp / SEASON.xpPerLevel) + 1);
      const newLvl = Math.min(SEASON.maxLevel, Math.floor(nextXp / SEASON.xpPerLevel) + 1);
      if (newLvl > oldLvl) {
        addLog(`🎉 Subiu para o nível ${newLvl} no Passe de Batalha!`);
      }
      return nextXp;
    });

    // Mage Level XP Progression (Win: +50 XP, Loss: +20 XP)
    const mageXpGained = win ? 50 : 20;
    setMageXp(prevXp => {
      const nextXp = prevXp + mageXpGained;
      const oldLvl = getMageLevel(prevXp);
      const newLvl = getMageLevel(nextXp);
      if (newLvl > oldLvl) {
        addLog(`🎉 MAGE LEVEL UP! Subiu para o Nível ${newLvl}!`);
        if (newLvl === 10 || newLvl === 20 || newLvl === 30) {
          addLog(`✨ NOVO SLOT DE SKILL! Agora você pode equipar ${getMaxSlots(newLvl)} feitiços!`);
        }
        // Generate 3 random choices from level pool
        const pool = SKILLS.filter(s => s.unlock.type === "level" && !unlockedSkills.has(s.id));
        const draftPool = pool.length >= 3 ? pool : SKILLS.filter(s => s.unlock.type !== "boss" && !unlockedSkills.has(s.id));
        if (draftPool.length > 0) {
          const shuffled = [...draftPool].sort(() => Math.random() - 0.5);
          const choices = shuffled.slice(0, Math.min(3, shuffled.length)).map(s => s.id);
          setPendingLevelDraft({ level: newLvl, choices });
        }
      }
      return nextXp;
    });

    // Handle Boss Training Victory
    if (win && bossEncounter) {
      const rewardSkill = SKILLS.find(s => s.id === bossEncounter.rewardSkillId);
      if (rewardSkill && !unlockedSkills.has(rewardSkill.id)) {
        setUnlockedSkills(us => new Set([...us, rewardSkill.id]));
      }
      setBossesDefeated(bd => new Set([...bd, bossEncounter.id]));
      setLoot({ isBoss: true, boss: bossEncounter, skill: rewardSkill });
      addLog(`👑 VITÓRIA DE ARQUIMAGO! ${bossEncounter.name} foi derrotado!`);
      addLog(`✨ Feitiço Mestre aprendido: ${rewardSkill ? rewardSkill.name : ""}`);
    } else if (win) {
      // Normal duel victory: 35% chance to drop an ancient Spell Tome if unlearned tomes exist
      const unlearnedTomes = TOMES.filter(t => !unlockedSkills.has(t.skillId));
      if (unlearnedTomes.length > 0 && Math.random() < 0.35) {
        const droppedTome = pick(unlearnedTomes);
        const skill = SKILLS.find(s => s.id === droppedTome.skillId);
        setUnlockedSkills(us => new Set([...us, droppedTome.skillId]));
        setLoot({ isTome: true, tome: droppedTome, skill });
        addLog(`📖 Você encontrou o ${droppedTome.name}!`);
        addLog(`✨ Novo feitiço aprendido: ${skill.name}!`);
      } else {
        const drop = rollLoot();
        if (drop) { setLoot(findItem(drop)); setOwned(o => new Set([...o, drop])); }
      }
      setShards(s => s + 5); // +5 por vitória
      setWinStreak(s => {
        const next = s + 1;
        if (next >= 3) {
          setShowShootingStars(true);
          setTimeout(() => setShowShootingStars(false), 3000);
        }
        return next;
      });
      if (Math.random() < 0.05) {
        setShowRainbow(true);
        setTimeout(() => setShowRainbow(false), 2000);
      }
    } else {
      setWinStreak(0);
    }
    setTimeout(() => setPhase("result"), 1200);
  }

  function triggerSpellFX(skill, fromSide, crit) {
    if (!skill) return;
    try {
      const isSelf = !skill.dmg || skill.dmg === 0;
      const skin = null;

      if (isSelf) {
        const id = Date.now() + Math.random();
        setSelfCastEffects(prev => [...prev, { id, skill, side: fromSide, skin }]);
        setTimeout(() => {
          setSelfCastEffects(prev => prev.filter(x => x.id !== id));
        }, 900);
      } else {
        const spellData = { id: Date.now() + Math.random(), skill, fromSide, crit, skin };
        setActiveSpell(spellData);

        // Projectile lands on defender in 460ms
        setTimeout(() => {
          setActiveSpell(null);
          const targetSide = fromSide === "p" ? "e" : "p";
          const impactId = Date.now() + Math.random();
          setImpactEffects(prev => [...prev, { id: impactId, skill, side: targetSide, crit, skin }]);

          const isHeavy = crit || (skill.dmg && skill.dmg >= 20);
          setScreenShake(isHeavy ? "heavy" : "light");
          setTimeout(() => setScreenShake(null), isHeavy ? 450 : 300);

          // Screen Flash & Damage Flash (White / Gold)
          setScreenFlash(crit ? "gold" : isHeavy ? "white" : null);
          setTimeout(() => setScreenFlash(null), crit ? 200 : 140);

          if (targetSide === "e") {
            setDamageFlashE(true);
            setTimeout(() => setDamageFlashE(false), 80);
            setHurtE(true);
            setTimeout(() => setHurtE(false), 500);
          } else {
            setDamageFlashP(true);
            setTimeout(() => setDamageFlashP(false), 80);
            setHurtP(true);
            setTimeout(() => setHurtP(false), 500);
          }

          // 1% Easter egg: Golden eyes on crit
          if (crit && Math.random() < 0.01) {
            setEasterEgg("golden_eyes");
            setTimeout(() => setEasterEgg(null), 400);
          }

          setTimeout(() => {
            setImpactEffects(prev => prev.filter(x => x.id !== impactId));
          }, 750);
        }, 460);
      }
    } catch (err) {
      console.error("Error in triggerSpellFX:", err);
    }
  }

  function handleTurnTimeout() {
    if (busy || phase !== "battle" || currentTurn !== "player") return;
    addLog("⏳ Turn timer expired! You instinctively channel Focus.");
    playerAction(FOCUS);
  }

  // Turn Countdown Timer Effect
  useEffect(() => {
    if (phase !== "battle" || busy || currentTurn !== "player" || result || isTimerPaused) return;

    const interval = setInterval(() => {
      setTurnCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTurnTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, busy, currentTurn, result, isTimerPaused, player, enemy]);

  // Keyboard Shortcuts (1-5, Spacebar)
  useEffect(() => {
    if (phase !== "battle" || busy || currentTurn !== "player" || !player) return;

    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const skills = [...player.skills, FOCUS];
      if (e.key >= "1" && e.key <= String(skills.length)) {
        const idx = parseInt(e.key) - 1;
        const s = skills[idx];
        if (s && player.mana >= s.mana && !player.cds[s.id]) {
          playerAction(s);
        }
      } else if (e.code === "Space") {
        e.preventDefault();
        playerAction(FOCUS);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, busy, currentTurn, player]);

  function surrender() {
    if (phase !== "battle" || busy) return;
    setShowSurrenderModal(false);
    setBusy(true);
    addLog(`${player.name} surrenders the duel.`);
    finishBattle(false);
  }

  function playerAction(skill) {
    if (busy || phase !== "battle" || !skill) return;
    try {
      setBusy(true);
      setCurrentTurn("resolving");
      setTurnCountdown(TURN_DURATION);

      let p = player, e = enemy;

      setCastP(true);
      setTimeout(() => setCastP(false), 600);

      const r1 = applySkill(skill, p, e, "p");
      p = r1.a; e = r1.d;

      triggerSpellFX(skill, "p", r1.crit);
      addLog(r1.lines[0]);

      // Outcome logs and numbers when projectile lands / cast resolves (460ms)
      setTimeout(() => {
        r1.lines.slice(1).forEach((line, i) => {
          setTimeout(() => addLog(line), i * 140);
        });
        setPlayer({ ...p });
        setEnemy({ ...e });
      }, 460);

      // After player's turn completes, check enemy or victory
      setTimeout(() => {
        if (e.hp <= 0) {
          addLog(`${e.name} collapses. Victory!`);
          setEnemy({ ...e });
          finishBattle(true);
          return;
        }

        // Enemy Turn
        setCurrentTurn("enemy");
        const eSkill = aiChoose(e, p) || FOCUS;

        setTimeout(() => {
          setCastE(true);
          setTimeout(() => setCastE(false), 600);

          const r2 = applySkill(eSkill, e, p, "e");
          e = r2.a; p = r2.d;

          triggerSpellFX(eSkill, "e", r2.crit);
          addLog(r2.lines[0]);

          setTimeout(() => {
            r2.lines.slice(1).forEach((line, i) => {
              setTimeout(() => addLog(line), i * 140);
            });
            setPlayer({ ...p });
            setEnemy({ ...e });
          }, 460);

          setTimeout(() => {
            p = tickTurnEnd(p);
            e = tickTurnEnd(e);
            setPlayer({ ...p });
            setEnemy({ ...e });

            if (p.hp <= 0) {
              addLog("You fall... Defeat.");
              finishBattle(false);
            } else if (e.hp <= 0) {
              addLog(`${e.name} succumbs to their wounds. Victory!`);
              finishBattle(true);
            } else {
              setRoundNum(r => r + 1);
              setCurrentTurn("player");
              setTurnCountdown(TURN_DURATION);
              setBusy(false);
            }
          }, 1000);
        }, 400);
      }, 1150);
    } catch (err) {
      console.error("Error in playerAction:", err);
      setBusy(false);
      setCurrentTurn("player");
    }
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

      /* Safe Area Insets (iOS notch, dynamic island, Android gesture bar) */
      .safe-top    { padding-top: env(safe-area-inset-top, 0px); }
      .safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
      .safe-left   { padding-left: env(safe-area-inset-left, 0px); }
      .safe-right  { padding-right: env(safe-area-inset-right, 0px); }
      .safe-x      {
        padding-left: max(0.5rem, env(safe-area-inset-left, 0px));
        padding-right: max(0.5rem, env(safe-area-inset-right, 0px));
      }
      .safe-y      {
        padding-top: max(0.375rem, env(safe-area-inset-top, 0px));
        padding-bottom: max(0.375rem, env(safe-area-inset-bottom, 0px));
      }
      .safe-all    {
        padding-top: max(0.375rem, env(safe-area-inset-top, 0px));
        padding-bottom: max(0.375rem, env(safe-area-inset-bottom, 0px));
        padding-left: max(0.5rem, env(safe-area-inset-left, 0px));
        padding-right: max(0.5rem, env(safe-area-inset-right, 0px));
      }

      /* Responsive Projectile Travel (Vertical on mobile portrait, Horizontal on landscape or tablet/desktop) */
      @keyframes spellFlyPtoE {
        0% { top: 76%; left: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        85% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { top: 24%; left: 50%; transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
      }
      @keyframes spellFlyEtoP {
        0% { top: 24%; left: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        85% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { top: 76%; left: 50%; transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
      }

      @media (min-width: 768px), (orientation: landscape) {
        @keyframes spellFlyPtoE {
          0% { left: 24%; top: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { left: 76%; top: 50%; transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
        }
        @keyframes spellFlyEtoP {
          0% { left: 76%; top: 50%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { left: 24%; top: 50%; transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
        }
      }

      .spell-proj-p { animation: spellFlyPtoE 0.46s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .spell-proj-e { animation: spellFlyEtoP 0.46s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

      .anchor-pos-p { top: 76%; left: 50%; transform: translate(-50%, -50%); }
      .anchor-pos-e { top: 24%; left: 50%; transform: translate(-50%, -50%); }
      @media (min-width: 768px), (orientation: landscape) {
        .anchor-pos-p { top: 50%; left: 24%; transform: translate(-50%, -50%); }
        .anchor-pos-e { top: 50%; left: 76%; transform: translate(-50%, -50%); }
      }

      @keyframes fireExplosionAnim {
        0% { transform: scale(0.2); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.95; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      @keyframes fireRingAnim {
        0% { transform: scale(0.3); opacity: 1; border-width: 5px; }
        100% { transform: scale(2.2); opacity: 0; border-width: 1px; }
      }
      @keyframes sparkRadial {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; }
      }

      @keyframes frostShatterAnim {
        0% { transform: scale(0.3); opacity: 1; }
        50% { transform: scale(1.25); opacity: 0.95; }
        100% { transform: scale(1.7); opacity: 0; }
      }
      @keyframes frostRingAnim {
        0% { transform: scale(0.3); opacity: 1; }
        100% { transform: scale(2.3); opacity: 0; }
      }
      @keyframes iceShardScatter {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) rotate(360deg) scale(0.3); opacity: 0; }
      }

      @keyframes arcaneSupernovaAnim {
        0% { transform: scale(0.2) rotate(0deg); opacity: 1; }
        60% { transform: scale(1.4) rotate(90deg); opacity: 0.95; }
        100% { transform: scale(2.1) rotate(180deg); opacity: 0; }
      }

      @keyframes leafScatter {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) rotate(720deg) scale(0.2); opacity: 0; }
      }
      @keyframes vineWhipAnim {
        0% { transform: scale(0.5) rotate(-15deg); opacity: 0; }
        40% { transform: scale(1.2) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 0; }
      }

      @keyframes wardHexDomeAnim {
        0% { transform: scale(0.2); opacity: 0.9; }
        40% { transform: scale(1.2); opacity: 1; }
        80% { transform: scale(1.05); opacity: 0.85; }
        100% { transform: scale(1.15); opacity: 0; }
      }
      @keyframes manaPillarAnim {
        0% { transform: translateY(40%) scaleY(0.1); opacity: 0; }
        35% { transform: translateY(0%) scaleY(1.3); opacity: 1; }
        100% { transform: translateY(-40%) scaleY(0.4); opacity: 0; }
      }
      @keyframes focusRippleAnim {
        0% { transform: scale(1.8); opacity: 0; }
        50% { transform: scale(1); opacity: 0.9; }
        100% { transform: scale(0.3); opacity: 0; }
      }

      @keyframes critBannerPop {
        0% { transform: scale(0.2) rotate(-6deg); opacity: 0; }
        40% { transform: scale(1.25) rotate(3deg); opacity: 1; }
        70% { transform: scale(1.05) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) translateY(-20px); opacity: 0; }
      }

      @keyframes shakeHeavy {
        0% { transform: translate(0, 0); }
        12% { transform: translate(-10px, 8px) rotate(-1.5deg); }
        25% { transform: translate(9px, -7px) rotate(1.2deg); }
        40% { transform: translate(-7px, 5px) rotate(-0.8deg); }
        60% { transform: translate(5px, -4px) rotate(0.5deg); }
        80% { transform: translate(-3px, 2px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes shakeLight {
        0% { transform: translate(0, 0); }
        25% { transform: translate(-4px, 3px); }
        50% { transform: translate(4px, -3px); }
        75% { transform: translate(-2px, 2px); }
        100% { transform: translate(0, 0); }
      }
      .arena-shake-heavy { animation: shakeHeavy 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
      .arena-shake-light { animation: shakeLight 0.28s cubic-bezier(0.36, 0.07, 0.19, 0.97); }

      @keyframes lowHpPulse {
        0%, 100% { box-shadow: 0 0 4px #EF444444; border-color: #EF4444; }
        50% { box-shadow: 0 0 16px #EF4444DD; border-color: #F87171; }
      }
      .low-hp-alert { animation: lowHpPulse 1.2s ease-in-out infinite; }

      /* Screen flashes */
      @keyframes flashFade { 0% { opacity: 0.45; } 100% { opacity: 0; } }
      .screen-flash-white { position: fixed; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%); pointer-events: none; z-index: 100; animation: flashFade 0.16s ease-out forwards; }
      .screen-flash-gold { position: fixed; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.45) 0%, rgba(245, 158, 11, 0.1) 70%, transparent 100%); pointer-events: none; z-index: 100; animation: flashFade 0.2s ease-out forwards; }

      /* Mage Damage Flash & Low HP Pulse */
      .damage-flash { filter: brightness(3) saturate(0) !important; }
      @keyframes lowHpPulse { 0%, 100% { filter: drop-shadow(0 0 4px #EF4444); } 50% { filter: drop-shadow(0 0 16px #EF4444); } }
      .low-hp-pulse { animation: lowHpPulse 1.2s ease-in-out infinite; }

      /* Organic Idle: Natural Eye Blinking & Beard sway */
      @keyframes naturalBlink {
        0%, 93%, 100% {
          transform: scaleY(1);
          opacity: 1;
        }
        95.5%, 97% {
          transform: scaleY(0.04);
          opacity: 0.1;
        }
        98.5% {
          transform: scaleY(1);
          opacity: 1;
        }
      }
      .eye-blink-l { animation: naturalBlink 4.4s ease-in-out infinite; transform-origin: 178px 167px; transform-box: view-box; }
      .eye-blink-r { animation: naturalBlink 4.4s ease-in-out infinite; transform-origin: 222px 167px; transform-box: view-box; }
      @keyframes beardSway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(1.2deg); } }
      .beard-sway { animation: beardSway 3.8s ease-in-out infinite; transform-origin: 200px 206px; }

      /* Arena Ambiance: Dust, Mist, Rune Circle, Phase transition */
      @keyframes dustFloat {
        0% { transform: translate3d(0px, 100vh, 0); opacity: 0; }
        10% { opacity: 0.45; }
        90% { opacity: 0.45; }
        100% { transform: translate3d(40px, -10vh, 0); opacity: 0; }
      }
      @keyframes scrollMist { 0% { transform: translate3d(-50%, 0, 0); } 100% { transform: translate3d(0%, 0, 0); } }
      @keyframes rotateRune { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes phaseCircle { 0% { clip-path: circle(0% at 50% 50%); opacity: 1; } 50% { clip-path: circle(100% at 50% 50%); opacity: 1; } 100% { clip-path: circle(100% at 50% 50%); opacity: 0; } }
      .phase-transition { position: fixed; inset: 0; background: #0B0A16; pointer-events: none; z-index: 120; animation: phaseCircle 0.5s ease-in-out forwards; }
      @keyframes shootingStar { 0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; } 100% { transform: translateX(-600px) translateY(600px) rotate(-45deg); opacity: 0; } }

      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(232, 180, 79, 0.45) rgba(14, 12, 28, 0.7);
      }
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(232, 180, 79, 0.5) rgba(14, 12, 28, 0.7);
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        scroll-behavior: smooth;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(14, 12, 28, 0.75);
        border-radius: 9999px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(232, 180, 79, 0.38);
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #E8B44F;
        box-shadow: 0 0 10px rgba(232, 180, 79, 0.6);
      }

      /* ================= DESIGN SYSTEM UI CLASSES ================= */
      .btn-gold {
        background: linear-gradient(135deg, #FBBF24 0%, #D97706 45%, #92400E 100%);
        border: 1px solid rgba(254, 240, 138, 0.65);
        color: #0F172A;
        box-shadow: 0 6px 28px rgba(245, 158, 11, 0.5), 0 2px 6px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
        font-family: 'Cinzel', serif;
        font-weight: 900;
        letter-spacing: 0.1em;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        user-select: none;
        position: relative;
        overflow: hidden;
      }
      .btn-gold:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px) scale(1.015);
        box-shadow: 0 8px 36px rgba(245, 158, 11, 0.7), 0 0 24px rgba(251, 191, 36, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.85);
      }
      .btn-gold:active:not(:disabled) {
        transform: translateY(1px) scale(0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      .btn-gold:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        filter: grayscale(0.6);
        box-shadow: none;
        transform: none;
      }

      .btn-surface {
        background: rgba(30, 41, 59, 0.82);
        color: #F8FAFC;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
        transition: transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), background 0.16s ease, border-color 0.16s ease;
        user-select: none;
        cursor: pointer;
        border-radius: 12px;
      }
      .btn-surface:hover:not(:disabled) {
        background: rgba(51, 65, 85, 0.95);
        border-color: rgba(245, 158, 11, 0.45);
        color: #FFFFFF;
        box-shadow: 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 14px rgba(245,158,11,0.2);
        transform: translateY(-1.5px);
      }
      .btn-surface:active:not(:disabled) {
        transform: translateY(1px) scale(0.98);
        box-shadow: 0 1px 2px rgba(0,0,0,0.5);
      }
      .btn-surface:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        transform: none;
      }

      .btn-danger {
        background: linear-gradient(180deg, #7F1D1D 0%, #450A0A 100%);
        color: #FEE2E2;
        border: 1px solid rgba(239, 68, 68, 0.4);
        box-shadow: 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        user-select: none;
        cursor: pointer;
        border-radius: 12px;
      }
      .btn-danger:hover:not(:disabled) {
        border-color: #EF4444;
        background: linear-gradient(180deg, #991B1B 0%, #5B0E0E 100%);
        box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
        transform: translateY(-1px);
      }
      .btn-danger:active:not(:disabled) {
        transform: translateY(1px) scale(0.98);
      }
      .btn-danger:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        transform: none;
      }

      .panel-base {
        background-color: rgba(11, 15, 26, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 16px;
        box-shadow: 0 12px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07);
      }

      .panel-elevated {
        background-color: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        box-shadow: 0 14px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
      }

      .card-surface {
        background: rgba(15, 23, 42, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
        border-radius: 14px;
        transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease;
        will-change: transform;
      }
      .card-surface:hover {
        border-color: rgba(245, 158, 11, 0.45);
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 14px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255,255,255,0.1);
      }

      @keyframes modalEnter {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(8px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .modal-backdrop {
        background-color: rgba(2, 6, 23, 0.82);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .modal-window {
        animation: modalEnter 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        background: rgba(15, 23, 42, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 25px 70px rgba(0,0,0,0.85), 0 0 35px rgba(245,158,11,0.12), inset 0 1px 0 rgba(255,255,255,0.1);
        border-radius: 20px;
      }

      /* Fluid & Responsive Game Feel Classes */
      .game-card {
        transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease;
        will-change: transform;
      }
      .game-card:hover {
        transform: translateY(-2px);
      }
      .game-card:active {
        transform: scale(0.97);
      }
      .game-btn {
        transition: transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), filter 0.16s ease, box-shadow 0.16s ease;
        user-select: none;
        will-change: transform;
      }
      .game-btn:hover {
        filter: brightness(1.12);
        transform: translateY(-1px);
      }
      .game-btn:active {
        transform: scale(0.96) translateY(1px);
        filter: brightness(0.95);
      }

      @media (prefers-reduced-motion: reduce) { .shake,.cast,.idle,.mageFloatGroup,.groundShadow,.petShadow,.auraPulse,.dmgFloat,.lootShine,.petHover,.petGround,.projectile-up,.projectile-down,.spell-proj-p,.spell-proj-e,.arena-shake-heavy,.arena-shake-light,.angelWingL,.angelWingR,.demonWingL,.demonWingR,.phoenixWingL,.phoenixWingR,.faeWingL,.faeWingR,.holySparkle,.wingEmber,.staffFloat,.offhandFloat,.matchSpin,.matchPulse,.eye-blink-l,.eye-blink-r,.beard-sway,.phase-transition,.modal-window { animation: none; } }
    `}</style>
  );

  const bg = (
    <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% -20%, #1E1B4B 0%, #0F172A 45%, #020617 100%)", overflow: "hidden", zIndex: 0, contain: "strict", pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div key={i} className={i >= 8 ? "hidden sm:block" : ""} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          borderRadius: "50%", background: "#EFE7D2",
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          willChange: "opacity",
        }} />
      ))}
      {/* Floating arena dust particles - hidden on mobile for 60fps performance */}
      {dustParticles.map((d, i) => (
        <div key={`d-${i}`} className="hidden sm:block" style={{
          position: "absolute", left: `${d.left}%`, width: d.size, height: d.size,
          borderRadius: "50%", background: "#E8B44F",
          animation: `dustFloat ${d.dur}s linear ${d.delay}s infinite`,
          opacity: 0.3,
          willChange: "transform",
        }} />
      ))}
      {/* Horizontal scrolling mist layer - hidden on mobile for 60fps performance */}
      <div className="hidden sm:block" style={{
        position: "absolute", bottom: 0, left: 0, width: "200%", height: "35%",
        background: "linear-gradient(to top, #02061799 0%, transparent 100%)",
        animation: "scrollMist 25s linear infinite",
        pointerEvents: "none", opacity: 0.35,
        willChange: "transform",
      }} />
      {/* Radial edge vignette */}
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(circle at center, transparent 40%, #020617CC 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />
    </div>
  );

  // ================= CREATE MAGE =================
  if (phase === "create") {
    const previewMage = {
      affinity, hat: hatId || "hat_pointed", aura: auraId || "aura_ember", robe: robeId || "robe_classic",
      staffGear: STAFFS.find(s => s.id === staffId) || STAFFS[0],
      cape: CAPES.find(c => c.id === capeId) || CAPES.find(c => c.id === "wings_angel") || CAPES[0],
      armor: null, pet: PETS.find(p => p.id === petId) || PETS[0],
      skinTone: skinToneId, hairColor: hairColorId, hairStyle: hairStyleId,
      beardStyle: beardStyleId, eyeColor: eyeColorId, gender: genderId,
      face: faceId, earrings: earringId, noseRing: noseRingId,
      gloves: glovesId,
      status: {},
    };
    const trimmedName = mageName.trim();
    const el = ELEMENTS[affinity] || ELEMENTS.fire;

    const rollRandomLook = () => {
      const isFemale = Math.random() < 0.5;
      const newGender = isFemale ? "gender_female" : "gender_male";
      setGenderId(newGender);
      setSkinToneId(pick(SKIN_TONES).id);
      setFaceId(pick(FACES).id);
      setHairColorId(pick(HAIR_COLORS).id);
      setHairStyleId(pick(HAIR_STYLES).id);
      setBeardStyleId(isFemale ? "beard_none" : pick(BEARD_STYLES).id);
      setEyeColorId(pick(EYE_COLORS).id);
      setGlovesId(pick(GLOVES).id);
      setCapeId(pick(["wings_angel", "wings_demon", "wings_phoenix", "wings_fae", "cape_travel", "cape_star", "cape_phoenix"]));
      setEarringId(Math.random() < 0.4 ? pick(EARRINGS.filter(e => e.id !== "earring_none")).id : "earring_none");
      setNoseRingId(Math.random() < 0.25 ? pick(NOSE_RINGS.filter(n => n.id !== "nosering_none")).id : "nosering_none");
      setMageName(pick(FANTASY_MAGE_NAMES));
    };

    const rollRandomName = () => {
      setMageName(pick(FANTASY_MAGE_NAMES));
    };

    const QUICK_NAMES = ["Ignis", "Zephyr", "Astraea", "Kaelen", "Morrigan"];

    const ELEMENT_PERKS = {
      fire:   { role: lang === "pt" ? "Explosão & Queimadura" : "Burst & Burn", perk: lang === "pt" ? "+25% Dano de Fogo" : "+25% Fire Damage", badge: lang === "pt" ? "Ataque Contínuo" : "Continuous Burn" },
      ice:    { role: lang === "pt" ? "Controle & Congelamento" : "Control & Freeze", perk: lang === "pt" ? "+25% Dano de Gelo" : "+25% Ice Damage", badge: lang === "pt" ? "Paralisia de Turno" : "Turn Freeze" },
      nature: { role: lang === "pt" ? "Cura Vital & Enraizamento" : "Vital Heal & Root", perk: lang === "pt" ? "+25% Dano da Natureza" : "+25% Nature Damage", badge: lang === "pt" ? "Sustentação" : "Sustain" },
      arcane: { role: lang === "pt" ? "Mana & Feitiços Puros" : "Pure Mana & Burst", perk: lang === "pt" ? "+25% Dano Arcano" : "+25% Arcane Damage", badge: lang === "pt" ? "Dano Mágico Alto" : "High Arcane Damage" },
    };

    const desktopTab = (createTab === "identity" ? "body" : createTab);

    const renderIdentitySection = () => (
      <div className="space-y-4">
        {/* Name input */}
        <div className="card-surface rounded-2xl p-3 sm:p-4 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-serif text-[12px] sm:text-[13px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>✍️</span><span>{t("createNameLabel")}</span>
            </label>
            <button
              onClick={rollRandomName}
              className="px-2 py-0.5 rounded-full text-[10px] font-mono text-amber-300 hover:text-amber-200 bg-amber-500/15 border border-amber-400/30 flex items-center gap-1 transition-all active:scale-95"
              title={t("createRandomName")}
            >
              <span>🎲</span><span>{t("createRandomName")}</span>
            </button>
          </div>
          <div className="relative">
            <input
              value={mageName}
              onChange={(e) => setMageName(e.target.value.slice(0, 18))}
              placeholder={t("createNamePlaceholder")}
              className="w-full rounded-xl border border-white/10 px-3.5 py-2.5 font-sans text-[14px] outline-none transition-all bg-slate-950/80 text-zinc-100 placeholder-zinc-500 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 pr-9 shadow-inner"
            />
            <button
              onClick={rollRandomName}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-300 transition-colors p-1"
              title="Sortear nome"
            >
              🎲
            </button>
          </div>

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[10px] font-sans text-zinc-400">{t("createSuggestions")}</span>
            {QUICK_NAMES.map(qName => (
              <button
                key={qName}
                onClick={() => setMageName(qName)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border transition-all ${
                  mageName === qName
                    ? "bg-amber-500/30 border-amber-400 text-amber-200 font-bold"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                }`}
              >
                {qName}
              </button>
            ))}
          </div>
        </div>

        {/* Elemental Affinity */}
        <div className="card-surface rounded-2xl p-3 sm:p-4 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="font-serif text-[12px] sm:text-[13px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>🔮</span><span>{t("createAffinityLabel")}</span>
            </label>
            <span className="text-[10px] font-mono text-zinc-400">
              {t("createAffinityDesc")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(ELEMENTS).map(([key, e]) => {
              const perkInfo = ELEMENT_PERKS[key];
              const isSel = affinity === key;
              return (
                <button
                  key={key}
                  onClick={() => setAffinity(key)}
                  className={`rounded-xl p-2.5 text-left font-sans transition-all flex items-center gap-2.5 border active:scale-95 ${
                    isSel ? "scale-[1.02] shadow-md" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: isSel ? e.color : "rgba(255,255,255,0.08)",
                    backgroundColor: isSel ? `${e.color}1c` : "rgba(15, 23, 42, 0.5)",
                    boxShadow: isSel ? `0 0 16px ${e.color}44` : "none",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0"
                    style={{ backgroundColor: `${e.color}22`, color: e.color }}
                  >
                    {e.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold truncate flex items-center justify-between" style={{ color: isSel ? e.color : T.textPrimary }}>
                      <span>{getElementName(key, lang)}</span>
                      {isSel && <span className="text-[10px]">✓</span>}
                    </div>
                    <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                      {perkInfo?.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender Toggle */}
        <div className="card-surface rounded-2xl p-3 sm:p-4 border border-white/10 shadow-sm">
          <label className="font-serif text-[12px] sm:text-[13px] font-bold text-amber-200 mb-2 flex items-center gap-1.5">
            <span>👤</span><span>{t("createGenderLabel")}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GENDERS.map(g => (
              <button
                key={g.id}
                onClick={() => setGenderId(g.id)}
                className={`py-2 px-3 rounded-xl font-mono text-[12px] font-bold transition-all border flex items-center justify-center gap-2 ${
                  genderId === g.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>{g.id === "gender_female" ? "♀" : "♂"}</span>
                <span>{g.id === "gender_female" ? t("female") : t("male")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const renderBodySection = () => (
      <div className="space-y-4">
        {/* Gender Selector */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>👤</span><span>{t("createGenderLabel")}</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {GENDERS.map(g => (
              <button
                key={g.id}
                onClick={() => setGenderId(g.id)}
                className={`py-2 px-3 rounded-xl font-mono text-[12px] font-bold transition-all border flex items-center justify-center gap-2 ${
                  genderId === g.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>{g.id === "gender_female" ? "♀" : "♂"}</span>
                <span>{g.id === "gender_female" ? t("female") : t("male")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skin Tone */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-serif text-[12px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>🎨</span><span>{t("skinTone")}</span>
            </p>
            <span className="text-[11px] font-mono text-zinc-400">
              {SKIN_TONES.find(s => s.id === skinToneId)?.name}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {SKIN_TONES.map(s => (
              <button
                key={s.id}
                onClick={() => setSkinToneId(s.id)}
                title={s.name}
                className="rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: s.skin,
                  border: skinToneId === s.id ? `3px solid ${T.gold}` : `2px solid rgba(255,255,255,0.15)`,
                  boxShadow: skinToneId === s.id ? `0 0 14px ${T.gold}aa` : "0 2px 6px rgba(0,0,0,0.5)",
                  transform: skinToneId === s.id ? "scale(1.15)" : "none",
                }}
              >
                {skinToneId === s.id && (
                  <span className="text-[11px] font-bold text-slate-950">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Face Shape */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>🎭</span><span>{t("faceShape")}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FACES.map(f => (
              <button
                key={f.id}
                onClick={() => setFaceId(f.id)}
                className={`py-2 px-2.5 rounded-xl font-mono text-[11px] font-bold transition-all border ${
                  faceId === f.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Eye Color */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-serif text-[12px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>👁️</span><span>{t("eyeColor")}</span>
            </p>
            <span className="text-[11px] font-mono text-zinc-400">
              {EYE_COLORS.find(e => e.id === eyeColorId)?.name}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {EYE_COLORS.map(e => (
              <button
                key={e.id}
                onClick={() => setEyeColorId(e.id)}
                title={e.name}
                className="rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: e.color,
                  border: eyeColorId === e.id ? `3px solid ${T.gold}` : `2px solid rgba(255,255,255,0.15)`,
                  boxShadow: eyeColorId === e.id ? `0 0 14px ${T.gold}aa` : "0 2px 6px rgba(0,0,0,0.5)",
                  transform: eyeColorId === e.id ? "scale(1.15)" : "none",
                }}
              >
                {eyeColorId === e.id && (
                  <span className="text-[10px] font-bold text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gloves */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>🧤</span><span>{t("gloves")}</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {GLOVES.map(gl => (
              <button
                key={gl.id}
                onClick={() => setGlovesId(gl.id)}
                className={`py-2 px-2.5 rounded-xl font-mono text-[11px] text-left transition-all truncate border ${
                  glovesId === gl.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 font-bold shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {gl.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const renderHairSection = () => (
      <div className="space-y-4">
        {/* Hair Color */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-serif text-[12px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>🎨</span><span>{t("hairColor")}</span>
            </p>
            <span className="text-[11px] font-mono text-zinc-400">
              {HAIR_COLORS.find(h => h.id === hairColorId)?.name}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {HAIR_COLORS.map(h => (
              <button
                key={h.id}
                onClick={() => setHairColorId(h.id)}
                title={h.name}
                className="rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: h.hair,
                  border: hairColorId === h.id ? `3px solid ${T.gold}` : `2px solid rgba(255,255,255,0.15)`,
                  boxShadow: hairColorId === h.id ? `0 0 14px ${T.gold}aa` : "0 2px 6px rgba(0,0,0,0.5)",
                  transform: hairColorId === h.id ? "scale(1.15)" : "none",
                }}
              >
                {hairColorId === h.id && (
                  <span className="text-[10px] font-bold text-slate-950">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hairstyle */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>✂</span><span>{t("hairstyle")}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {HAIR_STYLES.map(hs => (
              <button
                key={hs.id}
                onClick={() => setHairStyleId(hs.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  hairStyleId === hs.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {hs.name}
              </button>
            ))}
          </div>
        </div>

        {/* Beard Style */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>🧔</span><span>{t("beardStyle")}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BEARD_STYLES.map(b => (
              <button
                key={b.id}
                onClick={() => setBeardStyleId(b.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  beardStyleId === b.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Earrings */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>💎</span><span>{t("earrings")}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EARRINGS.map(e => (
              <button
                key={e.id}
                onClick={() => setEarringId(e.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  earringId === e.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {e.name}
              </button>
            ))}
          </div>
        </div>

        {/* Nose Rings */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>✨</span><span>{t("noseRing")}</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {NOSE_RINGS.map(n => (
              <button
                key={n.id}
                onClick={() => setNoseRingId(n.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  noseRingId === n.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const renderDetailsSection = () => (
      <div className="space-y-4">
        {/* Eye Color */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-serif text-[12px] font-bold text-amber-200 flex items-center gap-1.5">
              <span>👁️</span><span>{t("eyeColor")}</span>
            </p>
            <span className="text-[11px] font-mono text-zinc-400">
              {EYE_COLORS.find(e => e.id === eyeColorId)?.name}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {EYE_COLORS.map(e => (
              <button
                key={e.id}
                onClick={() => setEyeColorId(e.id)}
                title={e.name}
                className="rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: e.color,
                  border: eyeColorId === e.id ? `3px solid ${T.gold}` : `2px solid rgba(255,255,255,0.15)`,
                  boxShadow: eyeColorId === e.id ? `0 0 14px ${T.gold}aa` : "0 2px 6px rgba(0,0,0,0.5)",
                  transform: eyeColorId === e.id ? "scale(1.15)" : "none",
                }}
              >
                {eyeColorId === e.id && (
                  <span className="text-[10px] font-bold text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Earrings */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>💎</span><span>{t("earrings")}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EARRINGS.map(e => (
              <button
                key={e.id}
                onClick={() => setEarringId(e.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  earringId === e.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {e.name}
              </button>
            ))}
          </div>
        </div>

        {/* Nose Rings */}
        <div>
          <p className="font-serif text-[12px] font-bold mb-2 text-amber-200 flex items-center gap-1.5">
            <span>✨</span><span>{t("noseRing")}</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {NOSE_RINGS.map(n => (
              <button
                key={n.id}
                onClick={() => setNoseRingId(n.id)}
                className={`py-2 px-2 rounded-xl font-mono text-[11px] truncate transition-all font-bold border ${
                  noseRingId === n.id
                    ? "bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const renderWingsSection = () => (
      <div className="space-y-4">
        <div>
          <p className="font-serif text-[12px] sm:text-[13px] font-bold mb-1 text-amber-200 flex items-center gap-1.5">
            <span>🪽</span><span>{lang === "pt" ? "Asas Lendárias & Capas" : "Legendary Wings & Capes"}</span>
          </p>
          <p className="text-[11px] font-sans text-zinc-400">
            {lang === "pt"
              ? "Asas míticas com plumagem reluzente, ossos dracônicos e animação de voo graciosa."
              : "Mythic wings with shimmering plumage, draconic bone, and graceful flight flap."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CAPES.map(c => {
            const isSel = capeId === c.id;
            const r = RARITY[c.rarity] || { color: T.common, label: "Comum" };
            const displayName = (lang === "pt" && c.name_pt) ? c.name_pt : c.name;
            const displayDesc = (lang === "pt" && c.desc_pt) ? c.desc_pt : (c.desc || "");
            return (
              <button
                key={c.id}
                onClick={() => setCapeId(c.id)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between gap-1 active:scale-95 ${
                  isSel ? "scale-[1.02] shadow-md" : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  borderColor: isSel ? r.color : "rgba(255,255,255,0.08)",
                  backgroundColor: isSel ? `${r.color}1c` : "rgba(15, 23, 42, 0.4)",
                  boxShadow: isSel ? `0 0 16px ${r.color}44` : "none",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-[12px] font-bold truncate flex items-center gap-1" style={{ color: isSel ? r.color : T.textPrimary }}>
                    {c.id.startsWith("wings_") && <span>🪽</span>}
                    <span>{displayName}</span>
                    {isSel && <span className="text-[10px] ml-1">✓</span>}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0"
                    style={{ borderColor: `${r.color}66`, backgroundColor: `${r.color}18`, color: r.color }}
                  >
                    {r.label}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                  {displayDesc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 w-full h-full safe-all flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden select-none" style={{ color: T.textPrimary }}>
        {styles}{bg}
        {renderAdmToast()}

        <div
          className="relative z-10 w-full h-full sm:h-auto sm:max-h-[94dvh] max-w-5xl flex flex-col md:flex-row landscape:flex-row rounded-none sm:rounded-3xl panel-base overflow-hidden border-0 sm:border border-white/10 shadow-2xl"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* MOBILE PORTRAIT VIEW (< sm and portrait) */}
          <div className="flex flex-col h-full w-full md:hidden landscape:hidden overflow-hidden">
            {/* 1. Top Fixed Live Character Preview Stage */}
            <div className="flex-shrink-0 w-full bg-slate-950/95 border-b border-white/10 p-2.5 relative overflow-hidden flex flex-col items-center">
              {/* Elemental Radial Glow */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35">
                <div
                  className="w-36 h-36 rounded-full blur-2xl transition-all duration-500"
                  style={{ background: el.color }}
                />
              </div>

              {/* Top Controls Row */}
              <div className="w-full flex items-center justify-between z-10 mb-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 shadow-sm"
                    style={{ color: el.color, borderColor: `${el.color}55`, backgroundColor: `${el.color}15` }}
                  >
                    <span>{el.icon}</span>
                    <span>{getElementName(affinity, lang)}</span>
                  </span>
                  <span className="text-[10px] font-sans text-zinc-400">
                    · +25% {lang === "pt" ? "dano" : "dmg"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleLang}
                    className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-white/20 text-zinc-200 hover:border-amber-400/50 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                    title={lang === "pt" ? "Alterar para Inglês" : "Switch to Portuguese"}
                  >
                    <span>{lang === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}</span>
                  </button>
                  <button
                    onClick={rollRandomLook}
                    className="px-2.5 py-1 rounded-full text-[11px] font-sans font-bold bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                    title={t("createRandomLook")}
                  >
                    <span>🎲</span>
                    <span>{t("createRandomLook")}</span>
                  </button>
                </div>
              </div>

              {/* Centered Mage Sprite */}
              <div className="relative z-10 my-0.5 transform scale-95 flex items-center justify-center">
                <MageSprite mage={previewMage} facing="right" size={1.25} />
              </div>

              {/* Ground Shadow & Live Indicator */}
              <div className="w-full flex items-center justify-between z-10 mt-0.5 px-1">
                <button
                  onClick={() => setGenderId(genderId === "gender_female" ? "gender_male" : "gender_female")}
                  className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-900 border border-white/15 text-zinc-300 active:scale-95 flex items-center gap-1 shadow-sm"
                >
                  <span>{genderId === "gender_female" ? t("femaleSymbol") : t("maleSymbol")}</span>
                </button>

                <div className="flex items-center gap-1">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold truncate max-w-[120px]">
                    {trimmedName || t("newMage")}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Sub-Tabs Bar */}
            <div className="flex-shrink-0 grid grid-cols-4 gap-1.5 p-2 bg-slate-900/90 border-b border-white/10 z-10">
              {[
                ["identity", t("tabIdentity"), "⚔️"],
                ["body", t("tabBody"), "🎨"],
                ["hair", t("tabHair"), "✂"],
                ["wings", lang === "pt" ? "Asas" : "Wings", "🪽"],
              ].map(([tKey, label, icon]) => (
                <button
                  key={tKey}
                  onClick={() => setCreateTab(tKey)}
                  className={`py-1.5 px-1 rounded-xl font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-all border ${
                    createTab === tKey
                      ? "bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                      : "bg-slate-950/60 border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{icon}</span>
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>

            {/* 3. Content Scroll Container (Single, Smooth, Touch Momentum) */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 pb-24 overscroll-contain">
              {createTab === "identity" && renderIdentitySection()}
              {createTab === "body" && renderBodySection()}
              {createTab === "hair" && renderHairSection()}
              {createTab === "wings" && renderWingsSection()}
            </div>

            {/* 4. Bottom Sticky Action Bar */}
            <div className="flex-shrink-0 w-full p-2.5 sm:p-3 bg-slate-950/95 border-t border-white/10 safe-all z-20 shadow-2xl flex flex-col gap-1">
              {!trimmedName && (
                <span className="text-center text-[10px] font-sans text-amber-400/90 font-medium animate-pulse">
                  {t("enterNamePrompt")}
                </span>
              )}
              <button
                onClick={() => trimmedName && setPhase("loadout")}
                disabled={!trimmedName}
                className="btn-king w-full rounded-xl py-3 font-serif text-[15px] font-bold transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t("beginJourney")}</span>
              </button>
            </div>
          </div>

          {/* DESKTOP & LANDSCAPE VIEW (md:flex landscape:flex) */}
          <div className="hidden md:flex landscape:flex w-full h-full flex-row overflow-hidden">
            {/* Left Column: Studio Sanctuary, Name, Affinity, Launch */}
            <div className="w-full landscape:w-5/12 md:w-5/12 flex flex-col justify-between border-r border-white/10 p-5 md:p-6 bg-slate-950/60 flex-shrink-0">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="text-[12px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
                    title={t("settings")}
                  >
                    <span>⚙️</span>
                  </button>
                  <button
                    onClick={toggleLang}
                    className="px-2.5 py-1 rounded-full text-[11px] font-sans font-bold bg-slate-900/90 border border-white/20 text-zinc-200 hover:border-amber-400/60 hover:text-amber-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    title={lang === "pt" ? "Mudar para Inglês (Switch to English)" : "Mudar para Português (Switch to Portuguese)"}
                  >
                    <span>{lang === "pt" ? "🇧🇷 Português" : "🇺🇸 English"}</span>
                    <span className="text-[9px] text-amber-400">⇄</span>
                  </button>
                </div>
                <h1 className="font-serif text-[26px] md:text-[28px] font-bold text-center text-amber-200 drop-shadow-[0_2px_14px_rgba(245,158,11,0.35)]">
                  {t("createTitle")}
                </h1>
                <p className="text-center text-[12px] font-sans text-zinc-400 mt-1">
                  {t("createSubtitle")}
                </p>
              </div>

              {/* Pedestal with Sprite */}
              <div className="relative flex flex-col items-center justify-center my-2 select-none group">
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div
                    className="w-44 h-44 rounded-full blur-2xl transition-all duration-500"
                    style={{ background: `radial-gradient(circle, ${el.color}88 0%, transparent 70%)` }}
                  />
                </div>

                <div className="transform scale-100 hover:scale-105 transition-transform duration-300">
                  <MageSprite mage={previewMage} facing="right" size={1.65} />
                </div>

                <div className="w-36 h-3 rounded-[50%] bg-black/40 blur-sm pointer-events-none mt-1" />

                <button
                  onClick={rollRandomLook}
                  className="mt-2 px-3 py-1 rounded-full text-[11px] font-sans font-bold bg-slate-900/90 border border-amber-400/40 text-amber-200 hover:bg-amber-400/20 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <span>🎲</span>
                  <span>{t("createRandomMage")}</span>
                </button>
              </div>

              {/* Name & Affinity */}
              <div className="w-full space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-serif text-[12px] font-bold text-amber-200">
                      {t("createNameLabel")}
                    </label>
                    <button
                      onClick={rollRandomName}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-200 flex items-center gap-1 transition-colors"
                      title={t("createRandomName")}
                    >
                      <span>🎲</span>
                      <span>{t("createRandomName")}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      value={mageName}
                      onChange={(e) => setMageName(e.target.value.slice(0, 18))}
                      placeholder={t("createNamePlaceholder")}
                      className="w-full rounded-xl border border-white/10 px-3.5 py-2.5 font-sans text-[14px] outline-none transition-all bg-slate-950/80 text-zinc-100 placeholder-zinc-500 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 pr-9"
                    />
                    <button
                      onClick={rollRandomName}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-300 transition-colors p-1"
                      title="Sortear nome"
                    >
                      🎲
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-serif text-[12px] font-bold text-amber-200">
                      {t("createAffinityLabel")}
                    </label>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {t("createAffinityDesc")}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(ELEMENTS).map(([key, e]) => {
                      const perkInfo = ELEMENT_PERKS[key];
                      const isSel = affinity === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setAffinity(key)}
                          className={`rounded-xl p-2 text-left font-sans transition-all flex items-center gap-2 border active:scale-95 ${
                            isSel ? "scale-[1.02]" : "opacity-80 hover:opacity-100"
                          }`}
                          style={{
                            borderColor: isSel ? e.color : "rgba(255,255,255,0.08)",
                            backgroundColor: isSel ? `${e.color}1c` : "rgba(15, 23, 42, 0.4)",
                            boxShadow: isSel ? `0 0 16px ${e.color}44` : "none",
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                            style={{ backgroundColor: `${e.color}22`, color: e.color }}
                          >
                            {e.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[12px] font-bold truncate" style={{ color: isSel ? e.color : T.textPrimary }}>
                              {getElementName(key, lang)}
                            </div>
                            <div className="text-[9px] text-zinc-400 truncate">
                              {perkInfo?.role}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => trimmedName && setPhase("loadout")}
                  disabled={!trimmedName}
                  className="btn-king w-full rounded-xl py-3 font-serif text-[16px] font-bold transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <span>{t("beginJourney")}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Customizer Workshop */}
            <div className="w-full landscape:w-7/12 md:w-7/12 flex flex-col min-h-0 flex-1 bg-slate-900/30 overflow-hidden">
              {/* Sub-Tabs Header */}
              <div className="grid grid-cols-4 gap-2 p-3 sm:p-4 pb-3 border-b border-white/10 flex-shrink-0 bg-slate-950/40">
                {[
                  ["body", t("tabBodySkin"), "👤"],
                  ["hair", t("tabHairBeard"), "✂"],
                  ["details", t("tabFaceJewelry"), "✨"],
                  ["wings", lang === "pt" ? "Asas" : "Wings", "🪽"],
                ].map(([tKey, label, icon]) => (
                  <button
                    key={tKey}
                    onClick={() => setCreateTab(tKey)}
                    className={`btn-surface rounded-xl py-2 px-1 font-mono text-[12px] flex items-center justify-center gap-1.5 transition-all border ${
                      desktopTab === tKey
                        ? "border-amber-400/80 text-amber-300 font-bold bg-amber-500/15 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span>{icon}</span>
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>

              {/* Scrollable Customization Content (Single, Smooth Scroll) */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-5 overscroll-contain pb-12">
                {desktopTab === "body" && renderBodySection()}
                {desktopTab === "hair" && renderHairSection()}
                {desktopTab === "details" && renderDetailsSection()}
                {desktopTab === "wings" && renderWingsSection()}
              </div>
            </div>
          </div>

        </div>
        {renderAdminModal()}
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
    const el = ELEMENTS[affinity] || ELEMENTS.fire;

    const hasUnclaimedPass = BATTLE_PASS_REWARDS.some(entry => {
      if (entry.level > seasonLevel) return false;
      if (entry.free && !claimedRewards.has(`free_${entry.level}`)) return true;
      if (passPremiumOwned && entry.premium && !claimedRewards.has(`premium_${entry.level}`)) return true;
      return false;
    });

    const HUB_PORTALS = [
      { id: "skills", label: t("grimoire"), sub: lang === "pt" ? `${unlockedSkills.size}/36 Magias` : `${unlockedSkills.size}/36 Spells`, icon: "⚔️", color: "#E8B44F" },
      { id: "gear", label: t("gear"), sub: previewMage.staffGear?.name || t("gearSub"), icon: "🪄", color: "#38BDF8" },
      { id: "style", label: t("style"), sub: t("styleSub"), icon: "✨", color: "#A855F7" },
      { id: "shop", label: t("shop"), sub: `${shards} ✦ Shards`, icon: "✦", color: "#F59E0B" },
      { id: "pass", label: t("pass"), sub: `Nv. ${seasonLevel} Embers`, icon: "🎫", color: "#EC4899", hasNotice: hasUnclaimedPass },
      { id: "appearance", label: t("appearance"), sub: t("appearanceSub"), icon: "👤", color: "#10B981" },
    ];

    return (
      <div className="w-full flex flex-col landscape:flex-row md:flex-row items-center justify-between gap-2.5 sm:gap-4 md:gap-5 my-1 flex-shrink-0">
        {/* Left / Top Character Stage: Self-contained Card on Mobile Portrait, Floating Mage on Desktop/Landscape */}
        <div className="w-full landscape:w-5/12 md:w-5/12 flex-shrink-0">
          {/* Mobile Portrait Hero Card (< sm and portrait) */}
          <div className="flex sm:hidden landscape:hidden items-center justify-between gap-3 p-2.5 rounded-2xl glass-panel w-full shadow-lg border border-white/10">
            {/* Mage Avatar with Glow */}
            <div
              className="relative flex items-center justify-center cursor-pointer group flex-shrink-0 pl-1"
              onClick={() => setTab("appearance")}
              title="Toque para personalizar aparência"
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div
                  className="w-28 h-28 rounded-full blur-lg"
                  style={{ background: `radial-gradient(circle, ${el.color}77 0%, transparent 70%)` }}
                />
              </div>
              <div className="transform origin-center transition-transform group-hover:scale-105">
                <MageSprite mage={previewMage} facing="right" size={1.4} />
              </div>
            </div>

            {/* Badges & Character Summary on the Right */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-serif text-[13px] font-bold text-amber-200 truncate">
                  {mageName.trim() || t("newMage")}
                </span>
                <button
                  onClick={() => setTab("appearance")}
                  className="px-2 py-0.5 rounded-full text-[9px] font-sans font-medium bg-slate-900 border border-amber-400/40 text-amber-200 flex items-center gap-1 shadow-sm flex-shrink-0"
                >
                  <span>👤</span><span>{t("edit")}</span>
                </button>
              </div>

              {/* Badges row: Element, Gender, Relic */}
              <div className="flex items-center gap-1 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold bg-slate-900/90 border flex items-center gap-1 shadow-sm"
                  style={{ color: el.color, borderColor: `${el.color}44` }}
                >
                  <span>{el.icon}</span>
                  <span>{getElementName(affinity, lang)}</span>
                </span>

                <button
                  onClick={() => setGenderId(genderId === "gender_female" ? "gender_male" : "gender_female")}
                  title="Alternar gênero"
                  className="px-2 py-0.5 rounded-full text-[9px] font-sans font-medium bg-slate-900/90 border border-white/10 text-zinc-300 flex items-center gap-1 shadow-sm"
                >
                  <span>{genderId === "gender_female" ? "♀" : "♂"}</span>
                  <span>{genderId === "gender_female" ? t("female") : t("male")}</span>
                </button>

                {relic && relic.id !== "none" && (
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold bg-slate-900/90 border shadow-sm truncate max-w-[110px]"
                    style={{ color: RARITY[relic.rarity]?.color || T.gold, borderColor: `${RARITY[relic.rarity]?.color || T.gold}44` }}
                  >
                    ✦ {relic.name}
                  </span>
                )}
              </div>

              {/* Equipment line */}
              <div className="text-[10px] font-sans text-zinc-400 truncate mt-1">
                <span style={{ color: previewMage.staffGear ? RARITY[previewMage.staffGear.rarity]?.color : undefined }}>
                  🪄 {previewMage.staffGear?.name || "Sem cajado"}
                </span>
                {offhand && <span> · 🛡️ {offhand.name}</span>}
              </div>
            </div>
          </div>

          {/* Tablet / Desktop / Landscape layout */}
          <div className="hidden sm:flex landscape:flex flex-col items-center justify-center relative py-1">
            <div
              className="flex flex-col items-center justify-center cursor-pointer group relative py-1 sm:py-2 select-none"
              onClick={() => setTab("appearance")}
              title="Clique para customizar aparência"
            >
              {/* Atmospheric Ambient Glow behind mage */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full blur-xl transition-all duration-500"
                  style={{ background: `radial-gradient(circle, ${el.color}77 0%, transparent 70%)` }}
                />
              </div>

              {/* Floating Mage Character Sprite */}
              <div className="scale-90 sm:scale-95 landscape:scale-80 md:landscape:scale-95 md:scale-100 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
                <MageSprite mage={previewMage} facing="right" size={2.2} />
              </div>

              {/* Soft Ambient Ground Shadow */}
              <div className="w-24 sm:w-36 h-2.5 sm:h-3 rounded-[50%] bg-black/40 blur-sm pointer-events-none mt-0.5" />

              <div className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-sans font-medium bg-slate-900/90 border border-white/10 text-zinc-300 group-hover:border-amber-400/50 group-hover:text-amber-200 transition-all flex items-center gap-1 shadow-sm">
                <span>👤</span><span>{t("customize")}</span>
              </div>
            </div>

            {/* Badges on desktop/landscape */}
            <div className="flex justify-center gap-1.5 items-center flex-wrap mt-1">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-sans font-bold bg-slate-900/90 border flex items-center gap-1 shadow-sm"
                style={{ color: el.color, borderColor: `${el.color}44` }}
              >
                <span>{el.icon}</span>
                <span>{getElementName(affinity, lang)}</span>
              </span>

              <button
                onClick={() => setGenderId(genderId === "gender_female" ? "gender_male" : "gender_female")}
                title="Alternar gênero"
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-sans font-medium bg-slate-900/90 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-amber-200 transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{genderId === "gender_female" ? "♀" : "♂"}</span>
                <span>{genderId === "gender_female" ? t("female") : t("male")}</span>
              </button>

              {relic && relic.id !== "none" && (
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-sans font-semibold bg-slate-900/90 border shadow-sm"
                  style={{ color: RARITY[relic.rarity]?.color || T.gold, borderColor: `${RARITY[relic.rarity]?.color || T.gold}44` }}
                >
                  ✦ {relic.name}
                </span>
              )}
            </div>

            <div className="text-center text-[10px] sm:text-[11px] font-sans text-zinc-400/90 truncate max-w-xs mt-1">
              <span style={{ color: previewMage.staffGear ? RARITY[previewMage.staffGear.rarity]?.color : undefined }}>
                {previewMage.staffGear?.name}
              </span>
              {offhand && <span> · {offhand.name}</span>}
            </div>
          </div>
        </div>

        {/* Right: Modern 6 Hub Portals (3x2 grid on mobile & desktop for compact height) */}
        <div className="w-full landscape:w-7/12 md:w-7/12 flex flex-col justify-center flex-shrink-0">
          {extra}

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 w-full">
            {HUB_PORTALS.map(portal => (
              <button
                key={portal.id}
                onClick={() => setTab(portal.id)}
                className="glass-card p-2 sm:p-3 md:p-3.5 text-left transition-all relative overflow-hidden group select-none flex flex-col justify-between"
              >
                {/* Notification indicator dot */}
                {portal.hasNotice && (
                  <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_#F59E0B]"></span>
                  </span>
                )}

                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xl sm:text-2xl md:text-3xl drop-shadow-[0_0_10px_currentColor] transition-transform duration-200 group-hover:scale-110" style={{ color: portal.color }}>
                    {portal.icon}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-sans transition-all opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 hidden xs:inline" style={{ color: portal.color }}>
                    ▸
                  </span>
                </div>

                <div>
                  <div className="font-serif text-[11px] sm:text-[13px] md:text-[14px] font-bold tracking-wide transition-colors leading-tight text-zinc-100 group-hover:text-amber-200 truncate">
                    {portal.label}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-[11px] font-sans text-zinc-400/80 font-medium truncate mt-0.5 hidden xs:block">
                    {portal.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }


  // Battle Pass Helpers
  function claimReward(track, level) {
    const rewardKey = `${track}_${level}`;
    if (claimedRewards.has(rewardKey)) return;
    const entry = BATTLE_PASS_REWARDS.find(r => r.level === level);
    if (!entry) return;
    const reward = track === "free" ? entry.free : entry.premium;
    if (!reward) return;
    if (level > seasonLevel) return;
    if (track === "premium" && !passPremiumOwned) return;

    if (reward.type === "shards") {
      setShards(s => s + reward.amount);
      addLog(`🎫 Coletado: +${reward.amount} ✦ Arcane Shards do Passe!`);
    } else if (reward.type === "item") {
      setOwned(o => new Set([...o, reward.id]));
      addLog(`🎫 Desbloqueado: ${reward.name} do Passe de Batalha!`);
    }
    setClaimedRewards(prev => new Set([...prev, rewardKey]));
  }

  function claimAllRewards() {
    let shardCount = 0;
    const newItems = [];
    const newClaimed = new Set(claimedRewards);

    BATTLE_PASS_REWARDS.forEach(entry => {
      if (entry.level <= seasonLevel) {
        const freeKey = `free_${entry.level}`;
        if (entry.free && !newClaimed.has(freeKey)) {
          newClaimed.add(freeKey);
          if (entry.free.type === "shards") shardCount += entry.free.amount;
          else if (entry.free.type === "item") newItems.push(entry.free.id);
        }
        if (passPremiumOwned) {
          const premKey = `premium_${entry.level}`;
          if (entry.premium && !newClaimed.has(premKey)) {
            newClaimed.add(premKey);
            if (entry.premium.type === "shards") shardCount += entry.premium.amount;
            else if (entry.premium.type === "item") newItems.push(entry.premium.id);
          }
        }
      }
    });

    if (shardCount > 0) setShards(s => s + shardCount);
    if (newItems.length > 0) setOwned(o => new Set([...o, ...newItems]));
    setClaimedRewards(newClaimed);
    addLog(`🎫 Coletado tudo: +${shardCount} ✦ Shards e ${newItems.length} novos itens!`);
  }

  function buyPremiumPass() {
    if (passPremiumOwned) return;
    if (shards < SEASON.premiumCost) {
      alert("✦ Saldo insuficiente de Arcane Shards! Adquira mais no Cofre Arcano.");
      return;
    }
    setShards(s => s - SEASON.premiumCost);
    setPassPremiumOwned(true);
    addLog("✨ Passe Premium Desbloqueado! Aproveite todas as recompensas exclusivas!");
  }

  const unclaimedCount = useMemo(() => {
    let count = 0;
    BATTLE_PASS_REWARDS.forEach(entry => {
      if (entry.level <= seasonLevel) {
        if (entry.free && !claimedRewards.has(`free_${entry.level}`)) count++;
        if (passPremiumOwned && entry.premium && !claimedRewards.has(`premium_${entry.level}`)) count++;
      }
    });
    return count;
  }, [seasonLevel, passPremiumOwned, claimedRewards]);

  function renderGearModal() {
    if (!tab) return null;
    const panelTitle = { skills: t("grimoireTitle"), gear: t("gearTitle"), style: t("styleTitle"), appearance: t("appearanceTitle"), shop: t("shopTitle"), pass: t("passTitle") }[tab];
    const previewMage = buildPreviewMage();
    const el = ELEMENTS[affinity] || ELEMENTS.fire;
    const relic = RELICS.find(r => r.id === relicId);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center safe-all p-2 sm:p-4 modal-backdrop" onClick={() => setTab(null)}>
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl modal-window max-h-[92dvh] md:max-h-[86vh] flex flex-col overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-white/10 bg-slate-900/90 flex-shrink-0">
            <span className="font-serif text-[18px] sm:text-[20px] flex-1 truncate font-bold text-amber-200">
              {panelTitle}
            </span>
            <button
              onClick={() => setTab(null)}
              className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 text-zinc-400 hover:text-white transition-all text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Sticky Live Character Preview Stage for Customization (Mobile & Desktop) */}
          {(tab === "gear" || tab === "style" || tab === "appearance" || tab === "shop") && (
            <div className="flex-shrink-0 w-full bg-slate-950/95 border-b border-white/10 p-2 sm:p-2.5 flex items-center justify-between gap-2.5 relative overflow-hidden shadow-inner">
              {/* Ambient Aura Glow matching affinity */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
                <div
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-xl transition-all duration-300"
                  style={{ background: el.color }}
                />
              </div>

              {/* Left: Live Mage Character Sprite */}
              <div className="relative z-10 flex items-center justify-center flex-shrink-0 pl-1 sm:pl-2">
                <div className="scale-90 xs:scale-100 sm:scale-105 transform origin-center transition-transform">
                  <MageSprite mage={previewMage} facing="right" size={1.35} />
                </div>
              </div>

              {/* Right: Live Summary & Real-time Indicator */}
              <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center pr-1 sm:pr-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-300">
                    {t("previewLive")}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 hidden xs:inline sm:inline">
                    · {t("tapToEquip")}
                  </span>
                </div>

                {/* Badges of current equipped items */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  {previewMage.staffGear && (
                    <span
                      className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold border truncate max-w-[120px] sm:max-w-[160px]"
                      style={{
                        borderColor: `${RARITY[previewMage.staffGear.rarity]?.color || T.gold}55`,
                        backgroundColor: `${RARITY[previewMage.staffGear.rarity]?.color || T.gold}18`,
                        color: RARITY[previewMage.staffGear.rarity]?.color || T.gold,
                      }}
                    >
                      🪄 {previewMage.staffGear.name}
                    </span>
                  )}
                  {previewMage.hat && previewMage.hat !== "none" && (
                    <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono text-zinc-200 bg-slate-900/80 border border-white/10 truncate max-w-[110px]">
                      🎩 {HATS.find(h => h.id === previewMage.hat)?.name || "Chapéu"}
                    </span>
                  )}
                  {previewMage.cape && (
                    <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono text-purple-300 bg-slate-900/80 border border-purple-500/20 truncate max-w-[100px] hidden xs:inline-block">
                      🧣 {previewMage.cape.name}
                    </span>
                  )}
                  {relic && relic.id !== "none" && (
                    <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono text-amber-300 bg-slate-900/80 border border-amber-500/20 truncate max-w-[110px]">
                      ✦ {relic.name}
                    </span>
                  )}
                </div>

                <span className="text-[9px] font-sans text-zinc-400 truncate mt-0.5">
                  {tab === "gear" ? "Cajados, relíquias e itens secundários" : tab === "style" ? "Chapéus, capas, auras e pets" : tab === "appearance" ? "Rosto, tom de pele, cabelo e barba" : "Itens e cosméticos da Loja"}
                </span>
              </div>
            </div>
          )}

          <div className="p-3 sm:p-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain pb-12">

          {tab === "skills" && (
            <div>
              <p className="font-mono text-[12px] font-bold mb-2" style={{ color: T.gold }}>
                Afinidade Elemental <span style={{ color: T.textSecondary }}>(+25% dano correspondente)</span>
              </p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {Object.entries(ELEMENTS).map(([key, e]) => (
                  <button
                    key={key}
                    onClick={() => setAffinity(key)}
                    className="card-surface rounded-xl p-2 text-[12px] font-mono flex flex-col items-center justify-center transition-all"
                    style={{
                      borderColor: affinity === key ? e.color : T.borderSubtle,
                      backgroundColor: affinity === key ? `${e.color}1c` : T.bgSurface,
                      color: e.color,
                      boxShadow: affinity === key ? `0 0 14px ${e.color}44` : "none",
                    }}
                  >
                    <span className="text-base leading-none">{e.icon}</span>
                    <span className="font-bold mt-1 text-[11px]">{e.name}</span>
                  </button>
                ))}
              </div>

              {/* Skills Header & Slot Counter */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-mono text-[13px] font-bold" style={{ color: T.gold }}>
                  Grimório de Feitiços <span style={{ color: T.textSecondary }}>({chosen.length}/{maxSlots} equipados)</span>
                </p>
                <span className="text-[12px] font-mono" style={{ color: T.textTertiary }}>
                  {unlockedSkills.size}/36 Desbloqueados
                </span>
              </div>

              {/* Filter Tabs: Elements */}
              <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 text-[12px] font-mono">
                {["all", "fire", "ice", "nature", "arcane"].map(elKey => {
                  const el = ELEMENTS[elKey];
                  const label = elKey === "all" ? "Todos" : `${el.icon} ${el.name}`;
                  const isSel = skillFilterEl === elKey;
                  return (
                    <button
                      key={elKey}
                      onClick={() => setSkillFilterEl(elKey)}
                      className={`btn-surface px-3 py-1 rounded-lg transition-colors whitespace-nowrap text-[12px] ${
                        isSel ? "font-bold" : ""
                      }`}
                      style={{
                        borderColor: isSel ? T.gold : T.borderSubtle,
                        backgroundColor: isSel ? `${T.gold}20` : T.bgSurface,
                        color: isSel ? T.gold : T.textSecondary,
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Filter Tabs: Roles */}
              <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 text-[12px] font-mono">
                {[
                  { id: "all", label: "Todas Funções" },
                  { id: "attack", label: "⚔️ Ataque" },
                  { id: "control", label: "🌀 Controle" },
                  { id: "support", label: "🛡️ Suporte" },
                ].map(r => {
                  const isSel = skillFilterRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSkillFilterRole(r.id)}
                      className={`btn-surface px-3 py-1 rounded-lg transition-colors whitespace-nowrap text-[12px] ${
                        isSel ? "font-bold" : ""
                      }`}
                      style={{
                        borderColor: isSel ? T.arcane : T.borderSubtle,
                        backgroundColor: isSel ? `${T.arcane}20` : T.bgSurface,
                        color: isSel ? "#DDD6FE" : T.textSecondary,
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

              {/* 36-Skill Cards Grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {SKILLS.filter(s => {
                  if (skillFilterEl !== "all" && s.el !== skillFilterEl) return false;
                  if (skillFilterRole !== "all" && s.role !== skillFilterRole) return false;
                  return true;
                }).map(s => {
                  const isUnlocked = unlockedSkills.has(s.id);
                  const sel = chosen.includes(s.id);
                  const e = ELEMENTS[s.el];
                  const upgradeSkill = SKILLS.find(x => x.upgradeOf === s.id);
                  const masteryCasts = skillMastery[s.id] || 0;
                  const reqCasts = upgradeSkill?.unlock?.casts || 8;
                  const isUpgraded = upgradeSkill && unlockedSkills.has(upgradeSkill.id);

                  return (
                    <div
                      key={s.id}
                      onClick={() => isUnlocked && toggleSkill(s.id)}
                      className={`card-surface rounded-xl p-3 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        !isUnlocked
                          ? "opacity-55 cursor-not-allowed"
                          : sel
                          ? "cursor-pointer"
                          : "cursor-pointer hover:-translate-y-0.5"
                      }`}
                      style={{
                        backgroundColor: T.bgSurface,
                        borderColor: sel ? T.gold : isUnlocked ? `${e.color}55` : T.borderSubtle,
                        boxShadow: sel
                          ? `0 4px 16px rgba(0,0,0,0.5), 0 0 14px ${T.gold}33, inset 0 1px 0 rgba(255,255,255,0.06)`
                          : "0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                      }}
                    >
                      {/* Top row: Name, Element, Tier, Role, Mana, CD, Equip State */}
                      <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {!isUnlocked && <span className="text-xs">🔒</span>}
                          <span className="text-base drop-shadow-[0_0_8px_currentColor]" style={{ color: e.color }}>
                            {e.icon}
                          </span>
                          <span className="font-serif text-sm sm:text-base font-bold text-[#FAF6EE]">
                            {s.name}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#2D224D] border border-[#8B5CF666] text-[#DDD6FE] font-bold">
                            T{s.tier}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                            s.role === "attack"
                              ? "text-red-200 bg-red-950/60 border-red-500/50"
                              : s.role === "control"
                              ? "text-amber-200 bg-amber-950/60 border-amber-500/50"
                              : "text-blue-200 bg-blue-950/60 border-blue-500/50"
                          }`}>
                            {s.role === "attack" ? "⚔️ Ataque" : s.role === "control" ? "🌀 Controle" : "🛡️ Suporte"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-500/40">
                            💧 {s.mana}
                          </span>
                          {s.cd > 0 ? (
                            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
                              ⏳ {s.cd}t
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-emerald-400">⚡ Instant</span>
                          )}
                          {isUnlocked && (
                            sel ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E8B44F] text-[#100E1F] shadow-[0_0_10px_#E8B44F66]">
                                ✓ Slot {chosen.indexOf(s.id) + 1}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border border-[#3A3356] bg-[#100E1F] text-[#B7AE95] hover:border-[#E8B44F] hover:text-[#E8B44F] transition-colors">
                                + Equipar
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Stat badges row */}
                      <div className="flex items-center gap-1.5 flex-wrap my-1">
                        {s.dmg > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950/70 border border-red-500/50 text-red-200 font-bold">
                            ⚔️ {s.dmg} Dano
                          </span>
                        )}
                        {s.shield > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-950/70 border border-sky-500/50 text-sky-200 font-bold">
                            🛡️ +{s.shield} Ward
                          </span>
                        )}
                        {s.heal > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 font-bold">
                            💚 +{s.heal} Cura
                          </span>
                        )}
                        {s.restore > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/70 border border-cyan-500/50 text-cyan-200 font-bold">
                            💧 +{s.restore} Mana
                          </span>
                        )}
                        {s.el === affinity && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-400 text-amber-300 font-bold">
                            ✨ Afinidade (+25% Dano)
                          </span>
                        )}
                      </div>

                      {/* Description - crystal clear without truncate */}
                      <div className="text-xs font-mono text-[#D8D0BF] leading-relaxed my-1 break-words">
                        {s.desc}
                      </div>

                      {/* Unlock requirement or Mastery evolution */}
                      {!isUnlocked ? (
                        <div className="mt-2 pt-2 border-t border-[#3A335688] text-[11px] font-mono text-amber-300/90 flex items-center gap-1.5 bg-[#0D0A1C88] p-1.5 rounded">
                          <span className="font-bold">🔓 Como Desbloquear:</span>
                          <span className="text-[#F2EAD8]">
                            {s.unlock.type === "level" && `Alcançar Nível ${s.unlock.value} de Mago (Draft de Level Up)`}
                            {s.unlock.type === "tome" && `Grimório Arcano raro (Drop aleatório de vitória em duelo)`}
                            {s.unlock.type === "mastery" && `Lançar ${SKILLS.find(x => x.id === s.upgradeOf)?.name} (${skillMastery[s.upgradeOf] || 0}/${s.unlock.casts || 8} vezes em combate)`}
                            {s.unlock.type === "boss" && `Derrotar ${s.unlock.value} no Treinamento de Arquimagos`}
                          </span>
                        </div>
                      ) : upgradeSkill ? (
                        <div className="mt-2 pt-2 border-t border-[#3A335688] text-[11px] font-mono">
                          {isUpgraded ? (
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                              <span>✓ Maestria Mestra:</span>
                              <span>Evoluiu para {upgradeSkill.name}!</span>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[#E8B44F] font-bold">
                                  ✨ Maestria: {masteryCasts}/{reqCasts} lançamentos em duelos
                                </span>
                                <span className="text-[#DDD6FE]">
                                  → Desbloqueia {upgradeSkill.name}
                                </span>
                              </div>
                              <div className="w-full bg-[#100E1F] h-1.5 rounded-full overflow-hidden border border-[#3A3356]">
                                <div
                                  className="bg-gradient-to-r from-[#E8B44F] to-[#F59E0B] h-full"
                                  style={{ width: `${Math.min(100, Math.floor((masteryCasts / reqCasts) * 100))}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
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
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Chapéu" : "Hat"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {HATS.map(h1 => (
                  <RarityCard key={h1.id} item={h1} selected={hatId === h1.id} locked={!owned.has(h1.id)} onClick={() => owned.has(h1.id) && setHatId(h1.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Vestimenta / Robe" : "Robe Skin"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid gap-2 mb-4">
                {ROBES.map(r => (
                  <RarityCard key={r.id} item={r} selected={robeId === r.id} locked={!owned.has(r.id)} onClick={() => owned.has(r.id) && setRobeId(r.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Asas Lendárias & Capas" : "Legendary Wings & Capes"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {CAPES.map(c => (
                  <RarityCard key={c.id} item={c} selected={capeId === c.id} locked={!owned.has(c.id)} onClick={() => owned.has(c.id) && setCapeId(c.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Aura Mística" : "Aura"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {AURAS.map(a => (
                  <RarityCard key={a.id} item={a} selected={auraId === a.id} locked={!owned.has(a.id)} onClick={() => owned.has(a.id) && setAuraId(a.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Luvas & Manoplas" : "Gloves & Gauntlets"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {GLOVES.map(gl => (
                  <RarityCard key={gl.id} item={gl} selected={glovesId === gl.id} locked={!owned.has(gl.id)} onClick={() => owned.has(gl.id) && setGlovesId(gl.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>{lang === "pt" ? "Mascote Companheiro" : "Companion"} <span style={{ color: "#B7AE95" }}>({lang === "pt" ? "cosmético" : "cosmetic"})</span></p>
              <div className="grid grid-cols-2 gap-2">
                {PETS.map(pt => (
                  <RarityCard key={pt.id} item={pt} selected={petId === pt.id} locked={!owned.has(pt.id)} onClick={() => owned.has(pt.id) && setPetId(pt.id)} subtitle=" " lang={lang} />
                ))}
              </div>
              <p className="text-xs font-mono mt-3" style={{ color: "#5A5478" }}>{lang === "pt" ? "Itens bloqueados caem como recompensa de duelos e chefes." : "Locked items drop from victories. In the full game, they're tradeable with other players."}</p>
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
                {HAIR_COLORS.map(h => {
                  const isShop = SHOP_ITEMS.some(si => si.id === h.id);
                  const locked = isShop && !owned.has(h.id);
                  return (
                    <button key={h.id}
                      onClick={() => {
                        if (locked) { setTab("shop"); setShopCategory("hair"); }
                        else { setHairColorId(h.id); }
                      }}
                      title={locked ? `${h.name} (Bloqueado - Comprar na Loja)` : h.name}
                      className="rounded-full transition-transform relative flex items-center justify-center"
                      style={{
                        width: 34, height: 34, background: h.hair,
                        border: hairColorId === h.id ? "3px solid #E8B44F" : "3px solid #3A3356",
                        boxShadow: hairColorId === h.id ? "0 0 10px #E8B44F88" : "none",
                        transform: hairColorId === h.id ? "scale(1.1)" : "none",
                        opacity: locked ? 0.6 : 1,
                      }}>
                      {locked && <span className="text-[10px] leading-none">🔒</span>}
                    </button>
                  );
                })}
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
                {EYE_COLORS.map(e => {
                  const isShop = SHOP_ITEMS.some(si => si.id === e.id);
                  const locked = isShop && !owned.has(e.id);
                  return (
                    <button key={e.id}
                      onClick={() => {
                        if (locked) { setTab("shop"); setShopCategory("eyes"); }
                        else { setEyeColorId(e.id); }
                      }}
                      title={locked ? `${e.name} (Bloqueado - Comprar na Loja)` : e.name}
                      className="rounded-full transition-transform relative flex items-center justify-center"
                      style={{
                        width: 34, height: 34, background: e.color,
                        border: eyeColorId === e.id ? "3px solid #E8B44F" : "3px solid #3A3356",
                        boxShadow: eyeColorId === e.id ? "0 0 10px #E8B44F88" : "none",
                        transform: eyeColorId === e.id ? "scale(1.1)" : "none",
                        opacity: locked ? 0.6 : 1,
                      }}>
                      {locked && <span className="text-[10px] leading-none">🔒</span>}
                    </button>
                  );
                })}
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
                {EARRINGS.map(e => {
                  const isShop = SHOP_ITEMS.some(si => si.id === e.id);
                  const locked = isShop && !owned.has(e.id);
                  return (
                    <button key={e.id}
                      onClick={() => {
                        if (locked) { setTab("shop"); setShopCategory("jewelry"); }
                        else { setEarringId(e.id); }
                      }}
                      className="rounded-md border py-2 font-mono text-xs"
                      style={{
                        borderColor: earringId === e.id ? "#E8B44F" : "#3A3356",
                        background: earringId === e.id ? "#E8B44F1F" : "#1C1833",
                        color: earringId === e.id ? "#E8B44F" : "#B7AE95",
                        opacity: locked ? 0.6 : 1,
                      }}>
                      {locked ? `🔒 ${e.name}` : e.name}
                    </button>
                  );
                })}
              </div>

              <p className="font-mono text-sm mb-2" style={{ color: "#E8B44F" }}>Nose Piercing</p>
              <div className="grid grid-cols-3 gap-2">
                {NOSE_RINGS.map(n => {
                  const isShop = SHOP_ITEMS.some(si => si.id === n.id);
                  const locked = isShop && !owned.has(n.id);
                  return (
                    <button key={n.id}
                      onClick={() => {
                        if (locked) { setTab("shop"); setShopCategory("jewelry"); }
                        else { setNoseRingId(n.id); }
                      }}
                      className="rounded-md border py-2 font-mono text-xs"
                      style={{
                        borderColor: noseRingId === n.id ? "#E8B44F" : "#3A3356",
                        background: noseRingId === n.id ? "#E8B44F1F" : "#1C1833",
                        color: noseRingId === n.id ? "#E8B44F" : "#B7AE95",
                        opacity: locked ? 0.6 : 1,
                      }}>
                      {locked ? `🔒 ${n.name}` : n.name}
                    </button>
                  );
                })}
              </div>

              <p className="font-mono text-sm mb-2 mt-4" style={{ color: "#E8B44F" }}>Gloves & Hands</p>
              <div className="grid grid-cols-2 gap-2">
                {GLOVES.map(gl => {
                  const isShop = SHOP_ITEMS.some(si => si.id === gl.id);
                  const locked = isShop && !owned.has(gl.id);
                  return (
                    <button key={gl.id}
                      onClick={() => {
                        if (locked) { setTab("shop"); setShopCategory("clothes"); }
                        else { setGlovesId(gl.id); }
                      }}
                      className="rounded-md border py-2 px-2 font-mono text-xs text-left transition-colors truncate"
                      style={{
                        borderColor: glovesId === gl.id ? "#E8B44F" : "#3A3356",
                        background: glovesId === gl.id ? "#E8B44F1F" : "#1C1833",
                        color: glovesId === gl.id ? "#E8B44F" : "#B7AE95",
                        opacity: locked ? 0.6 : 1,
                      }}>
                      {locked ? `🔒 ${gl.name}` : gl.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "shop" && (
            <div>
              {/* Banner verde no topo: "⚔️ Cosmético apenas — não afeta o combate" */}
              <div
                className="rounded-xl border p-3 mb-3 flex items-center gap-3 shadow-sm"
                style={{ borderColor: `${T.success}44`, background: `${T.success}14` }}
              >
                <span className="text-xl flex-shrink-0">⚔️</span>
                <div>
                  <div className="text-[12px] font-mono font-bold" style={{ color: T.success }}>
                    Cosmético apenas — não afeta o combate
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: T.textSecondary }}>
                    Nenhum item da loja concede dano, mana, bônus ou qualquer vantagem de combate.
                  </div>
                </div>
              </div>

              {/* Header mostrando saldo: "✦ {shards} Arcane Shards" */}
              <div
                className="rounded-2xl panel-base border p-4 mb-3 text-center shadow-lg"
                style={{ borderColor: `${T.gold}44` }}
              >
                <div className="text-[12px] font-mono mb-1" style={{ color: T.textSecondary }}>Seu Saldo Arcane</div>
                <div
                  className="text-3xl font-mono font-bold flex items-center justify-center gap-2 drop-shadow-md"
                  style={{ color: T.gold }}
                >
                  <span>✦</span>
                  <span>{shards} Arcane Shards</span>
                </div>

                {/* Botões Obter mais Shards e Assistir anúncio */}
                <div className="flex justify-center gap-2.5 mt-3 flex-wrap">
                  <button
                    onClick={() => setShowShardShopModal(true)}
                    className="btn-gold rounded-lg px-4 py-2 font-mono text-[12px] font-bold shadow-md flex items-center gap-1.5"
                  >
                    <span>💳</span>
                    <span>Obter mais Shards</span>
                  </button>
                  <button
                    onClick={startWatchRewardedAd}
                    className="btn-surface rounded-lg px-3.5 py-2 font-mono text-[12px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    style={{ borderColor: `${T.success}66`, color: T.success }}
                  >
                    <span>🎬</span>
                    <span>Assistir anúncio +50 ✦</span>
                  </button>
                </div>
              </div>

              {/* Filtros: Todas / Cabelo / Olhos / Joias / Roupas / Asas / Pets */}
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1 text-xs font-mono">
                {[
                  ["all", "Todas"],
                  ["hair", "Cabelo"],
                  ["eyes", "Olhos"],
                  ["jewelry", "Joias"],
                  ["clothes", "Roupas"],
                  ["wings", "Asas"],
                  ["pet", "Pets"],
                ].map(([fKey, label]) => (
                  <button
                    key={fKey}
                    onClick={() => setShopCategory(fKey)}
                    className="btn-surface px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors text-[11px] font-bold"
                    style={{
                      borderColor: shopCategory === fKey ? T.gold : undefined,
                      background: shopCategory === fKey ? `${T.gold}22` : undefined,
                      color: shopCategory === fKey ? T.goldLight : undefined,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Grid de itens por categoria (usando RarityCard) */}
              <div className="grid gap-2">
                {SHOP_ITEMS
                  .filter(entry => {
                    if (shopCategory === "all") return true;
                    if (shopCategory === "hair") return entry.category === "hair";
                    if (shopCategory === "eyes") return entry.category === "eyes";
                    if (shopCategory === "jewelry") return entry.category === "jewelry";
                    if (shopCategory === "clothes") return entry.category === "robe" || entry.category === "gloves" || entry.category === "cape";
                    if (shopCategory === "wings") return entry.category === "wings";
                    if (shopCategory === "pet") return entry.category === "pet";
                    return true;
                  })
                  .map(entry => {
                    const itemObj = resolveShopItem(entry);
                    const isOwned = owned.has(entry.id);
                    const canAfford = shards >= entry.price;
                    const subtitle = isOwned
                      ? "✓ Adquirido na Coleção"
                      : `✦ ${entry.price} Shards · ${canAfford ? "Clique para comprar" : "Saldo insuficiente"}`;

                    return (
                      <RarityCard
                        key={entry.id}
                        item={itemObj}
                        selected={isOwned}
                        locked={!isOwned && !canAfford}
                        onClick={() => {
                          if (!isOwned) buyCosmetic(entry.id);
                        }}
                        subtitle={subtitle}
                      />
                    );
                  })}
              </div>
            </div>
          )}

          {tab === "pass" && (
            <div>
              {/* Season Header Banner */}
              <div
                className="rounded-2xl panel-elevated border p-4 mb-3 shadow-lg"
                style={{ borderColor: `${T.arcane}66` }}
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎫</span>
                    <span className="font-serif font-bold text-[15px] sm:text-[16px]" style={{ color: T.textPrimary }}>{SEASON.name}</span>
                  </div>
                  <span
                    className="text-[11px] font-mono px-2 py-0.5 rounded border"
                    style={{ borderColor: `${T.arcane}55`, background: `${T.arcane}18`, color: T.arcane }}
                  >
                    Termina em 31/05/2026
                  </span>
                </div>

                <div className="flex justify-between items-center text-[12px] font-mono mb-1.5" style={{ color: T.textSecondary }}>
                  <span>Nível Atual: <strong style={{ color: T.textPrimary }}>{seasonLevel}</strong> / {SEASON.maxLevel}</span>
                  <span>{seasonXp} XP Total ({seasonLevel < SEASON.maxLevel ? `${seasonXp % SEASON.xpPerLevel}/${SEASON.xpPerLevel} XP` : "MAX"})</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full border overflow-hidden mb-3" style={{ background: T.bgDeep, borderColor: T.borderSubtle }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${seasonLevel >= SEASON.maxLevel ? 100 : ((seasonXp % SEASON.xpPerLevel) / SEASON.xpPerLevel) * 100}%`,
                      background: `linear-gradient(90deg, ${T.arcane}, ${T.gold})`,
                      boxShadow: `0 0 10px ${T.arcane}66`
                    }}
                  />
                </div>

                {/* Premium Pass Status & Unlock Button */}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-2.5 border-t" style={{ borderColor: T.borderSubtle }}>
                  {passPremiumOwned ? (
                    <div className="flex items-center gap-1.5 text-[12px] font-mono font-bold" style={{ color: T.gold }}>
                      <span>⭐</span>
                      <span>Passe Premium Ativo!</span>
                    </div>
                  ) : (
                    <button
                      onClick={buyPremiumPass}
                      className="btn-gold rounded-lg px-4 py-2 font-mono text-[12px] font-bold shadow-md flex items-center gap-1.5"
                    >
                      <span>✦ Desbloquear Premium ({SEASON.premiumCost} ✦)</span>
                    </button>
                  )}

                  {unclaimedCount > 3 && (
                    <button
                      onClick={claimAllRewards}
                      className="btn-surface rounded-lg px-3.5 py-1.5 font-mono text-[11px] font-bold transition-all animate-pulse"
                      style={{ borderColor: `${T.success}88`, color: T.success }}
                    >
                      Coletar Tudo ({unclaimedCount})
                    </button>
                  )}
                </div>
              </div>

              {/* Reward Track Columns Header */}
              <div className="grid grid-cols-[1fr_40px_1fr] gap-1.5 text-center font-mono text-xs font-bold mb-2 px-1">
                <div className="text-[#B07FF5] bg-[#B07FF51A] py-1 rounded border border-[#B07FF533]">GRÁTIS</div>
                <div className="text-[#B7AE95] py-1">NV</div>
                <div className="text-[#E8B44F] bg-[#E8B44F1A] py-1 rounded border border-[#E8B44F33]">PREMIUM</div>
              </div>

              {/* 30-Level Track List */}
              <div className="grid gap-2 max-h-[50vh] overflow-y-auto pr-1">
                {BATTLE_PASS_REWARDS.map(entry => {
                  const isLevelUnlocked = entry.level <= seasonLevel;
                  const isFreeClaimed = claimedRewards.has(`free_${entry.level}`);
                  const isPremClaimed = claimedRewards.has(`premium_${entry.level}`);

                  return (
                    <div
                      key={entry.level}
                      className="grid grid-cols-[1fr_40px_1fr] gap-1.5 items-center p-1.5 rounded-lg border transition-all"
                      style={{
                        borderColor: isLevelUnlocked ? "#3A3356" : "#241D3B",
                        background: entry.level === seasonLevel ? "#221B3A" : "#141126",
                      }}
                    >
                      {/* Free Track Card */}
                      {entry.free ? (
                        <div
                          className={`p-2 rounded border flex flex-col justify-between text-xs font-mono transition-all ${
                            isFreeClaimed
                              ? "opacity-50 border-[#3A3356] bg-[#110E1F]"
                              : isLevelUnlocked
                              ? "border-[#B07FF5] bg-[#B07FF514] shadow-sm"
                              : "border-[#2A2342] bg-[#0F0D1C] opacity-70"
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>{entry.free.icon}</span>
                            <span className="font-bold text-[#F2EAD8] truncate">{entry.free.name}</span>
                          </div>
                          {isFreeClaimed ? (
                            <span className="text-[10px] text-emerald-400 font-bold">✓ Coletado</span>
                          ) : isLevelUnlocked ? (
                            <button
                              onClick={() => claimReward("free", entry.level)}
                              className="rounded bg-[#B07FF5] hover:bg-[#A855F7] text-white font-bold py-0.5 px-2 text-[10px] transition-colors"
                            >
                              Coletar
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#5A5478]">🔒 Bloqueado</span>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 text-center text-xs font-mono text-[#5A5478]">—</div>
                      )}

                      {/* Level Badge in Center */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs mx-auto border"
                        style={{
                          borderColor: isLevelUnlocked ? "#E8B44F" : "#3A3356",
                          background: isLevelUnlocked ? "#E8B44F22" : "#1A1630",
                          color: isLevelUnlocked ? "#E8B44F" : "#5A5478",
                        }}
                      >
                        {entry.level}
                      </div>

                      {/* Premium Track Card */}
                      {entry.premium ? (
                        <div
                          className={`p-2 rounded border flex flex-col justify-between text-xs font-mono transition-all ${
                            isPremClaimed
                              ? "opacity-50 border-[#3A3356] bg-[#110E1F]"
                              : isLevelUnlocked && passPremiumOwned
                              ? "border-[#E8B44F] bg-[#E8B44F14] shadow-sm"
                              : "border-[#2A2342] bg-[#0F0D1C] opacity-70"
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>{entry.premium.icon}</span>
                            <span className="font-bold text-[#F2EAD8] truncate">{entry.premium.name}</span>
                          </div>
                          {isPremClaimed ? (
                            <span className="text-[10px] text-emerald-400 font-bold">✓ Coletado</span>
                          ) : isLevelUnlocked && passPremiumOwned ? (
                            <button
                              onClick={() => claimReward("premium", entry.level)}
                              className="rounded bg-[#E8B44F] hover:bg-[#D97706] text-[#100E1F] font-bold py-0.5 px-2 text-[10px] transition-colors"
                            >
                              Coletar
                            </button>
                          ) : !passPremiumOwned ? (
                            <span className="text-[10px] text-[#E8B44F88]">⭐ Requer Passe</span>
                          ) : (
                            <span className="text-[10px] text-[#5A5478]">🔒 Bloqueado</span>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 text-center text-xs font-mono text-[#5A5478]">—</div>
                      )}
                    </div>
                  );
                })}
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
      <div className="fixed inset-0 z-50 flex items-center justify-center safe-all p-3 sm:p-4 modal-backdrop" onClick={() => setShowFriends(false)}>
        <div className="w-full max-w-md modal-window p-5 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#2A2444]">
            <span className="font-serif text-[20px] font-bold" style={{ color: T.gold }}>Amigos Arcanos</span>
            <button
              onClick={() => setShowFriends(false)}
              className="btn-surface rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold"
            >
              ✕
            </button>
          </div>
          {friends.length === 0 && (
            <p className="text-[12px] font-mono leading-relaxed" style={{ color: T.textTertiary }}>
              Nenhum amigo adicionado ainda. Adicione oponentes no relatório de confronto antes de um duelo.
            </p>
          )}
          <div className="grid gap-2.5">
            {friends.map(f => (
              <div key={f.name} className="card-surface p-3 rounded-xl border" style={{ borderColor: T.borderSubtle, backgroundColor: T.bgSurface }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif text-[14px] font-bold" style={{ color: T.textPrimary }}>{f.name}</span>
                  <ElementBadge el={f.affinity} />
                </div>
                <div className="text-[11px] font-mono mb-2.5" style={{ color: T.textTertiary }}>
                  {f.staffGear?.name || "Sem cajado"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openChat(f)}
                    className="flex-1 btn-surface rounded-lg py-1.5 font-mono text-[12px] font-bold"
                  >
                    💬 Conversar
                  </button>
                  <button
                    onClick={() => duelFriend(f)}
                    className="flex-1 btn-gold rounded-lg py-1.5 font-mono text-[12px] font-bold"
                  >
                    ⚔ Duelar
                  </button>
                  <button
                    onClick={() => removeFriend(f.name)}
                    className="btn-danger rounded-lg px-2.5 py-1.5 font-mono text-[12px] font-bold"
                    title="Remover amigo"
                  >
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
      <div className="fixed inset-0 z-50 flex items-center justify-center safe-all p-3 sm:p-4 modal-backdrop" onClick={() => setChatWith(null)}>
        <div className="w-full max-w-md modal-window p-5 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#2A2444]">
            <span className="font-serif text-[18px] font-bold" style={{ color: T.gold }}>{chatWith.name}</span>
            <button
              onClick={() => setChatWith(null)}
              className="btn-surface rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold"
            >
              ✕
            </button>
          </div>
          <div
            className="rounded-xl border p-3 mb-3 font-mono text-[12px] overflow-y-auto custom-scrollbar"
            style={{ borderColor: T.borderSubtle, backgroundColor: T.bgDeep, height: "160px" }}
          >
            {chatLog.map((m, i) => (
              <div key={i} className="mb-1.5 leading-relaxed" style={{ color: m.from === "you" ? T.gold : T.textSecondary }}>
                <span className="opacity-60">{m.from === "you" ? "Você: " : `${chatWith.name}: `}</span>{m.text}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button onClick={() => sendChat("greet")} className="btn-surface rounded-lg py-2 font-mono text-[11px] font-bold">Saudar ✦</button>
            <button onClick={() => sendChat("compliment")} className="btn-surface rounded-lg py-2 font-mono text-[11px] font-bold">Elogiar ✦</button>
            <button onClick={() => sendChat("taunt")} className="btn-surface rounded-lg py-2 font-mono text-[11px] font-bold">Provocar ⚡</button>
            <button onClick={() => sendChat("farewell")} className="btn-surface rounded-lg py-2 font-mono text-[11px] font-bold">Despedir 🌙</button>
          </div>
          {!isFriend(chatWith) && (
            <button
              onClick={() => addFriend(chatWith)}
              className="w-full btn-gold rounded-lg py-2 font-mono text-[12px] font-bold"
            >
              + Adicionar aos Amigos
            </button>
          )}
        </div>
      </div>
    );
  }

  function renderMatchmakingModal() {
    if (!matchmaking) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div className="relative w-full max-w-sm modal-window p-6 text-center flex flex-col items-center shadow-2xl">
          {/* Animated Arcane Matchmaking Radar / Sigil */}
          <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full matchSpin">
              <circle cx="50" cy="50" r="46" fill="none" stroke={T.gold} strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
              <circle cx="50" cy="50" r="36" fill="none" stroke={T.arcane} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              <polygon points="50,10 85,75 15,75" fill="none" stroke={T.gold} strokeWidth="1" opacity="0.4" />
              <polygon points="50,90 15,25 85,25" fill="none" stroke={T.ice} strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center matchPulse">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle, ${T.gold}44 0%, transparent 70%)` }}>
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border mb-2 font-bold"
            style={{ borderColor: `${T.gold}55`, backgroundColor: `${T.gold}18`, color: T.gold }}
          >
            <span>🤖</span><span>Fila de Pareamento Arcana</span>
          </div>

          <h2 className="font-serif text-[20px] font-bold mb-1" style={{ color: T.textPrimary }}>
            Buscando Oponente...
          </h2>

          <p className="font-mono text-[12px] mb-3 min-h-[20px]" style={{ color: T.textSecondary }}>
            {matchStatus}
          </p>

          <div
            className="font-mono text-[12px] font-bold mb-4 px-3 py-1.5 rounded-lg border"
            style={{ borderColor: T.borderSubtle, backgroundColor: T.bgDeep, color: T.gold }}
          >
            Tempo Decorrido: 0:0{matchTimer}
          </div>

          <button
            onClick={cancelMatchmaking}
            className="w-full btn-surface rounded-lg py-2.5 font-serif text-[13px] font-bold transition-all hover:border-red-500 hover:text-red-400"
          >
            Cancelar Busca
          </button>
        </div>
      </div>
    );
  }

  function renderShardShopModal() {
    if (!showShardShopModal) return null;
    const packs = [
      { id: "pack_100", amount: 100, price: "R$ 4,99", name: "Bolsa de Shards", tag: null },
      { id: "pack_500", amount: 500, price: "R$ 19,99", name: "Baú Arcano", tag: "Popular · +25% Bônus" },
      { id: "pack_1200", amount: 1200, price: "R$ 39,99", name: "Cofre dos Arquimagos", tag: "Melhor Valor · +50% Bônus" },
    ];

    return (
      <div className="modal-backdrop fixed inset-0 z-[60] flex items-center justify-center safe-all p-3 sm:p-4" onClick={() => !purchasing && setShowShardShopModal(false)}>
        <div
          className="modal-window relative w-full max-w-md md:max-w-lg rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center shadow-2xl max-h-[92dvh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💳</span>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold" style={{ color: T.textPrimary }}>Cofre Arcano · Shards</h2>
            </div>
            <button
              onClick={() => !purchasing && setShowShardShopModal(false)}
              disabled={purchasing}
              className="btn-surface rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border mb-4"
            style={{ borderColor: `${T.success}44`, background: `${T.success}14`, color: T.success }}
          >
            <span>⚔️</span>
            <span>Cosmético apenas — zero vantagem competitiva</span>
          </div>

          {purchasing ? (
            <div className="w-full py-10 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full matchSpin">
                  <circle cx="50" cy="50" r="44" fill="none" stroke={T.gold} strokeWidth="2.5" strokeDasharray="14 10" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke={T.ice} strokeWidth="2" strokeDasharray="8 8" opacity="0.8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl animate-pulse" style={{ color: T.gold }}>✦</span>
                </div>
              </div>
              <p className="font-serif text-[16px] font-bold mb-1" style={{ color: T.textPrimary }}>Processando pagamento seguro...</p>
              <p className="font-mono text-[12px]" style={{ color: T.textSecondary }}>
                Conectando ao gateway e creditando Shards...
              </p>
            </div>
          ) : (
            <div className="w-full grid gap-2.5 mb-4">
              {packs.map(p => (
                <div
                  key={p.id}
                  className="card-surface rounded-xl p-3.5 flex items-center justify-between text-left transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[15px] sm:text-[16px] font-bold" style={{ color: T.textPrimary }}>{p.name}</span>
                      {p.tag && (
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold"
                          style={{ borderColor: `${T.gold}55`, background: `${T.gold}18`, color: T.goldLight }}
                        >
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] font-mono font-bold flex items-center gap-1 mt-1" style={{ color: T.gold }}>
                      <span>✦</span>
                      <span>{p.amount} Arcane Shards</span>
                    </div>
                  </div>
                  <button
                    onClick={() => purchaseShardPack(p.amount)}
                    className="btn-gold rounded-lg px-4 py-2 font-mono text-[12px] font-bold shadow-md flex-shrink-0"
                  >
                    {p.price}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-[11px] font-mono flex items-center justify-center gap-1.5" style={{ color: T.textMuted }}>
            <span>🔒</span>
            <span>Transação simulada · Pronto para produção Stripe API</span>
          </div>
        </div>
      </div>
    );
  }

  function renderRewardedAdModal() {
    if (!adModalOpen) return null;
    const progressPct = Math.min(100, Math.max(0, ((3 - adTimer) / 3) * 100));

    return (
      <div className="modal-backdrop fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="modal-window relative w-full max-w-sm rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center shadow-2xl"
          style={{ borderColor: `${T.success}55` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border"
            style={{ borderColor: `${T.success}66`, background: `${T.success}18` }}
          >
            <span className="text-2xl">🎬</span>
          </div>

          <h2 className="font-serif text-[18px] font-bold mb-1" style={{ color: T.textPrimary }}>
            Transmissão Arcana Patrocinada
          </h2>
          <p className="font-mono text-[12px] mb-4" style={{ color: T.textSecondary }}>
            Assista até o encerramento para coletar sua recompensa.
          </p>

          <div
            className="w-full panel-base rounded-xl p-4 mb-4 flex flex-col items-center"
          >
            {adTimer > 0 ? (
              <>
                <span className="font-mono text-3xl font-bold mb-2" style={{ color: T.gold }}>
                  0:0{adTimer}
                </span>
                <div
                  className="w-full rounded-full h-2.5 overflow-hidden mb-2 border"
                  style={{ background: T.bgDeep, borderColor: T.borderSubtle }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progressPct}%`,
                      background: `linear-gradient(90deg, ${T.nature}, ${T.ice})`,
                      boxShadow: `0 0 10px ${T.nature}66`
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono" style={{ color: T.textTertiary }}>
                  Transmitindo anúncio parceiro...
                </span>
              </>
            ) : (
              <div className="py-2">
                <span className="font-mono font-bold text-[14px] block mb-1" style={{ color: T.success }}>
                  🎉 Recompensa Concedida!
                </span>
                <span className="text-[12px] font-mono font-bold" style={{ color: T.gold }}>
                  +50 ✦ Arcane Shards adicionados
                </span>
              </div>
            )}
          </div>

          {adTimer > 0 && (
            <button
              onClick={() => {
                if (adIntervalRef.current) clearInterval(adIntervalRef.current);
                setAdModalOpen(false);
              }}
              className="btn-surface rounded-lg px-3 py-1.5 text-[11px] font-mono transition-colors"
              style={{ color: T.textTertiary }}
            >
              Cancelar (abrir mão dos Shards)
            </button>
          )}
        </div>
      </div>
    );
  }

  function renderLevelUpModal() {
    if (!pendingLevelDraft) return null;
    const { level, choices } = pendingLevelDraft;
    const choiceSkills = choices.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);

    function selectDraft(skill) {
      setUnlockedSkills(us => new Set([...us, skill.id]));
      setPendingLevelDraft(null);
      addLog(`✨ Novo feitiço aprendido: ${skill.name}!`);
      setScreenFlash("gold");
      setTimeout(() => setScreenFlash(null), 700);
    }

    return (
      <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center safe-all p-3 sm:p-4">
        <div className="modal-window w-full max-w-lg rounded-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
          <div className="text-center mb-4">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border mb-2"
              style={{ background: `${T.gold}18`, borderColor: `${T.gold}66`, color: T.goldLight }}
            >
              <span>🌟 LEVEL UP! NÍVEL {level}</span>
            </div>
            <h2 className="font-serif text-[22px] sm:text-[26px] font-bold" style={{ color: T.textPrimary }}>
              Escolha seu Novo Feitiço
            </h2>
            <p className="text-[12px] font-mono mt-1" style={{ color: T.textSecondary }}>
              Selecione 1 das 3 opções para adicionar permanentemente ao seu grimório:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 my-3">
            {choiceSkills.map(skill => {
              const el = ELEMENTS[skill.el];
              return (
                <div
                  key={skill.id}
                  onClick={() => selectDraft(skill)}
                  className="card-surface rounded-xl p-3.5 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg relative overflow-hidden group border"
                  style={{
                    borderColor: `${el.color}66`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl" style={{ color: el.color }}>{el.icon}</span>
                      <div>
                        <div className="font-serif font-bold text-[15px] sm:text-[16px] text-[#F2EAD8] group-hover:text-[#E8B44F] transition-colors">
                          {skill.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold" style={{ background: T.bgBase, color: T.arcane }}>
                            Tier {skill.tier}
                          </span>
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold"
                            style={{
                              background: skill.role === "attack" ? `${T.danger}22` : skill.role === "control" ? `${T.warning}22` : `${T.info}22`,
                              color: skill.role === "attack" ? T.danger : skill.role === "control" ? T.warning : T.info,
                            }}
                          >
                            {skill.role === "attack" ? "⚔️ Ataque" : skill.role === "control" ? "🌀 Controle" : "🛡️ Suporte"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono text-[12px] flex items-center gap-1.5">
                      <span className="font-bold" style={{ color: T.ice }}>💧 {skill.mana}</span>
                      {skill.cd > 0 && <span className="font-bold" style={{ color: T.gold }}>⏳ {skill.cd}t CD</span>}
                    </div>
                  </div>

                  <p className="text-[12px] font-mono my-2 leading-relaxed break-words" style={{ color: T.textSecondary }}>
                    {skill.desc}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: T.borderSubtle }}>
                    <div className="flex items-center gap-2.5 text-[11px] font-mono font-bold">
                      {skill.dmg > 0 && <span style={{ color: T.danger }}>⚔️ {skill.dmg} Dano</span>}
                      {skill.shield > 0 && <span style={{ color: T.ice }}>🛡️ +{skill.shield} Escudo</span>}
                      {skill.heal > 0 && <span style={{ color: T.success }}>💚 +{skill.heal} Cura</span>}
                      {skill.restore > 0 && <span style={{ color: T.info }}>💧 +{skill.restore} Mana</span>}
                    </div>
                    <button
                      className="btn-gold px-3.5 py-1.5 rounded-lg font-serif text-[12px] font-bold shadow-md"
                    >
                      Aprender ✨
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function renderBossTrialsModal() {
    if (!showBossTrialsModal) return null;

    return (
      <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center safe-all p-3 sm:p-4" onClick={() => setShowBossTrialsModal(false)}>
        <div className="modal-window w-full max-w-2xl rounded-2xl p-5 sm:p-6 max-h-[88vh] overflow-y-auto custom-scrollbar shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border mb-1"
                style={{ background: `${T.gold}18`, borderColor: `${T.gold}55`, color: T.goldLight }}
              >
                <span>👑 ARCHMAGE TRIALS</span>
              </div>
              <h2 className="font-serif text-[20px] sm:text-[24px] font-bold" style={{ color: T.textPrimary }}>
                Treinamento de Mestres Elementais
              </h2>
            </div>
            <button
              onClick={() => setShowBossTrialsModal(false)}
              className="btn-surface rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-[12px] font-mono mb-4" style={{ color: T.textSecondary }}>
            Derrote os 4 Arquimagos lendários em combate solo para desbloquear seus feitiços assinatura de Tier 3!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ARCHMAGE_BOSSES.map(boss => {
              const el = ELEMENTS[boss.affinity];
              const isDefeated = bossesDefeated.has(boss.id);
              const rewardSkill = SKILLS.find(s => s.id === boss.rewardSkillId);

              return (
                <div
                  key={boss.id}
                  className="card-surface rounded-xl p-4 flex flex-col justify-between transition-all border"
                  style={{
                    borderColor: isDefeated ? `${T.success}66` : `${el.color}55`,
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-serif font-bold text-[15px] sm:text-[16px] text-[#F2EAD8] flex items-center gap-1.5">
                          <span>{boss.name}</span>
                          <span style={{ color: el.color }}>{el.icon}</span>
                        </div>
                        <div className="text-[11px] font-mono italic" style={{ color: T.textTertiary }}>
                          {boss.title}
                        </div>
                      </div>
                      <span
                        className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{ borderColor: `${T.danger}55`, background: `${T.danger}18`, color: T.danger }}
                      >
                        {boss.hp} HP
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg panel-base border my-2 text-xs font-mono" style={{ borderColor: T.borderSubtle }}>
                      <div className="font-bold text-[11px] mb-1 flex items-center justify-between" style={{ color: T.gold }}>
                        <span>✨ Recompensa de Assinatura:</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: T.bgSurface, color: T.arcane }}>Tier 3</span>
                      </div>
                      <div className="font-bold text-[13px]" style={{ color: T.textPrimary }}>
                        {rewardSkill ? rewardSkill.name : ""}
                      </div>
                      <div className="text-[11px] mt-0.5 leading-relaxed break-words" style={{ color: T.textSecondary }}>
                        {rewardSkill ? rewardSkill.desc : ""}
                      </div>
                    </div>

                    <p className="text-[11px] font-mono italic mb-3" style={{ color: T.textTertiary }}>
                      "{boss.dialogue}"
                    </p>
                  </div>

                  {isDefeated ? (
                    <div
                      className="w-full py-2 rounded-lg text-center font-mono text-[12px] font-bold border flex items-center justify-center gap-1.5"
                      style={{ borderColor: `${T.success}66`, background: `${T.success}18`, color: T.success }}
                    >
                      <span>✓</span><span>Mestre Derrotado · Feitiço Liberado</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => startBossDuel(boss)}
                      className="btn-gold w-full py-2.5 rounded-lg font-serif text-[12px] font-bold shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>⚔️ Desafiar Arquimago</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function renderMasteryCelebrationModal() {
    if (!showMasteryCelebration) return null;
    const skill = showMasteryCelebration;
    const el = ELEMENTS[skill.el];

    return (
      <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center safe-all p-3" onClick={() => setShowMasteryCelebration(null)}>
        <div className="modal-window w-full max-w-sm rounded-2xl p-5 sm:p-6 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="text-3xl mb-1">✨🔮✨</div>
          <h3 className="font-serif text-[20px] font-bold mb-1" style={{ color: T.gold }}>
            Nova Maestria Desbloqueada!
          </h3>
          <p className="text-[12px] font-mono my-2" style={{ color: T.textSecondary }}>
            Pelo seu uso contínuo em batalha, seu feitiço evoluiu e desbloqueou:
          </p>
          <div className="card-surface rounded-xl border p-3.5 my-3" style={{ borderColor: `${el.color}66` }}>
            <div className="font-serif font-bold text-[16px]" style={{ color: el.color }}>
              {skill.name} {el.icon}
            </div>
            <div className="text-[11px] font-mono my-1 font-semibold" style={{ color: T.gold }}>
              Tier {skill.tier} · {skill.role.toUpperCase()}
            </div>
            <div className="text-[12px] font-mono leading-relaxed break-words" style={{ color: T.textSecondary }}>
              {skill.desc}
            </div>
          </div>
          <button
            onClick={() => setShowMasteryCelebration(null)}
            className="btn-gold w-full py-2.5 rounded-xl font-serif text-[13px] font-bold shadow-md"
          >
            Adicionar ao Grimório ✦
          </button>
        </div>
      </div>
    );
  }

  // ================= ADMIN CHEAT & DEV UNLOCK SYSTEM =================
  const ALL_GAME_ITEM_IDS = useMemo(() => [
    ...new Set([
      ...ALL_ITEMS.map(i => i.id),
      ...LOOTABLE,
      ...SHOP_ITEMS.map(i => i.id),
      ...BATTLE_PASS_REWARDS.flatMap(r => [r.free?.id, r.premium?.id]).filter(Boolean),
    ])
  ], []);

  function adminUnlockAllItems() {
    setOwned(new Set(ALL_GAME_ITEM_IDS));
    setPremiumOwned(new Set(SHOP_ITEMS.map(i => i.id)));
    setPassPremiumOwned(true);
    setShards(s => Math.max(s, 50000));
    setScreenFlash("gold");
    setAdmToast("✨ [ADM] Todos os itens, equipamentos e cosméticos desbloqueados!");
    setTimeout(() => setAdmToast(null), 3500);
  }

  function adminUnlockAllSkills() {
    setUnlockedSkills(new Set(SKILLS.map(s => s.id)));
    setScreenFlash("white");
    setAdmToast("🔮 [ADM] Todos os 36 feitiços do Grimório desbloqueados!");
    setTimeout(() => setAdmToast(null), 3500);
  }

  function adminMaxLevel() {
    setMageXp(12000);
    setSeasonXp(SEASON.xpPerLevel * SEASON.maxLevel);
    setPassPremiumOwned(true);
    setScreenFlash("gold");
    setAdmToast("🌟 [ADM] Nível 30 de Mago e Passe maximizados! (7 Slots liberados)");
    setTimeout(() => setAdmToast(null), 3500);
  }

  function adminAddShards(amount = 50000) {
    setShards(s => s + amount);
    setScreenFlash("gold");
    setAdmToast(`💎 [ADM] +${amount.toLocaleString()} Arcane Shards adicionados!`);
    setTimeout(() => setAdmToast(null), 3500);
  }

  function adminDefeatAllBosses() {
    setBossesDefeated(new Set(ARCHMAGE_BOSSES.map(b => b.id)));
    setUnlockedSkills(s => new Set([...s, ...ARCHMAGE_BOSSES.map(b => b.rewardSkillId)]));
    setScreenFlash("gold");
    setAdmToast("👑 [ADM] Todos os 4 Arquimagos derrotados e feitiços liberados!");
    setTimeout(() => setAdmToast(null), 3500);
  }

  function adminUnlockEverything() {
    setOwned(new Set(ALL_GAME_ITEM_IDS));
    setPremiumOwned(new Set(SHOP_ITEMS.map(i => i.id)));
    setPassPremiumOwned(true);
    setShards(s => Math.max(s, 99999));
    setUnlockedSkills(new Set(SKILLS.map(s => s.id)));
    setMageXp(12000);
    setSeasonXp(SEASON.xpPerLevel * SEASON.maxLevel);
    setBossesDefeated(new Set(ARCHMAGE_BOSSES.map(b => b.id)));
    setScreenFlash("gold");
    setAdmToast("🚀 [ADM] GOD MODE: Todos os itens, feitiços, slots e shards liberados!");
    setTimeout(() => setAdmToast(null), 4000);
  }

  function adminResetProgress() {
    setOwned(new Set(START_OWNED));
    setPremiumOwned(new Set());
    setShards(0);
    setUnlockedSkills(new Set(START_SKILLS));
    setMageXp(0);
    setSeasonXp(0);
    setPassPremiumOwned(false);
    setBossesDefeated(new Set());
    setScreenFlash("white");
    setAdmToast("🔄 [ADM] Progresso restaurado para o padrão inicial!");
    setTimeout(() => setAdmToast(null), 3500);
  }

  function renderAdmToast() {
    if (!admToast) return null;
    return (
      <div
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[150] pointer-events-none flex items-center justify-center px-4 py-2.5 rounded-xl border font-mono text-[12px] sm:text-[13px] font-bold shadow-2xl animate-bounce"
        style={{ borderColor: T.gold, background: `${T.bgDeep}FA`, color: T.goldLight, boxShadow: `0 0 25px ${T.gold}55` }}
      >
        <span>{admToast}</span>
      </div>
    );
  }

  function renderAdminModal() {
    if (!showAdminModal) return null;

    return (
      <div
        className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center safe-all p-3 sm:p-4"
        onClick={() => setShowAdminModal(false)}
      >
        <div
          className="modal-window w-full max-w-2xl rounded-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col justify-between shadow-2xl"
          style={{ borderColor: `${T.arcane}66` }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4 pb-3 border-b" style={{ borderColor: T.borderSubtle }}>
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold border mb-1"
                style={{ background: `${T.arcane}18`, borderColor: `${T.arcane}55`, color: T.arcane }}
              >
                <span>⚡ {lang === "pt" ? "PAINEL DE CONTROLE ADM" : "ADM CONTROL PANEL"}</span>
              </div>
              <h2 className="font-serif text-[20px] sm:text-[24px] font-bold" style={{ color: T.textPrimary }}>
                {t("settingsTitle")}
              </h2>
              <p className="text-[12px] font-mono mt-0.5" style={{ color: T.textSecondary }}>
                {lang === "pt" ? "Gerencie o idioma, desbloqueie itens, feitiços ou teste a progressão livremente." : "Manage language, unlock items, spells, or test progression freely."}
              </p>
            </div>
            <button
              onClick={() => setShowAdminModal(false)}
              className="btn-surface rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Language Selector Card */}
          <div
            className="card-surface rounded-xl p-3.5 sm:p-4 mb-4 border transition-all shadow-md"
            style={{ borderColor: `${T.gold}55`, background: "rgba(15, 23, 42, 0.75)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌐</span>
                <div>
                  <h3 className="font-serif font-bold text-[14px] sm:text-[15px]" style={{ color: T.goldLight }}>
                    {t("languageSection")}
                  </h3>
                  <p className="text-[11px] font-sans text-zinc-400">
                    {t("languageSectionSub")}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border bg-amber-500/15 border-amber-400/40 text-amber-300">
                {lang === "pt" ? "🇧🇷 Português (BR)" : "🇺🇸 English (US)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setLang("pt")}
                className={`py-2 px-3 rounded-xl font-sans text-[12px] font-bold transition-all flex items-center justify-center gap-2 border ${
                  lang === "pt"
                    ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-md scale-[1.01]"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                }`}
              >
                <span className="text-base">🇧🇷</span>
                <span>Português (Brasil)</span>
                {lang === "pt" && <span className="text-emerald-400 ml-1">✓</span>}
              </button>
              <button
                onClick={() => setLang("en")}
                className={`py-2 px-3 rounded-xl font-sans text-[12px] font-bold transition-all flex items-center justify-center gap-2 border ${
                  lang === "en"
                    ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-md scale-[1.01]"
                    : "bg-slate-900/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                }`}
              >
                <span className="text-base">🇺🇸</span>
                <span>English (US)</span>
                {lang === "en" && <span className="text-emerald-400 ml-1">✓</span>}
              </button>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            
            {/* 1. Unlock All Items */}
            <div
              className="card-surface rounded-xl p-4 flex flex-col justify-between border transition-all"
              style={{ borderColor: `${T.arcane}44` }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <span>🪄</span><span>Todos os Itens</span>
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ background: `${T.arcane}18`, borderColor: `${T.arcane}44`, color: T.arcane }}
                  >
                    {ALL_GAME_ITEM_IDS.length} Itens
                  </span>
                </div>
                <p className="text-[11px] font-mono leading-relaxed mb-3" style={{ color: T.textSecondary }}>
                  Libera 100% dos cajados, relíquias, elmos, capas, túnicas, auras, mascotes, mãos secundárias e cosméticos da loja.
                </p>
              </div>
              <button
                onClick={adminUnlockAllItems}
                className="btn-surface w-full py-2.5 rounded-lg font-serif text-[12px] font-bold transition-all flex items-center justify-center gap-1.5"
                style={{ borderColor: `${T.arcane}66`, color: "#DDD6FE" }}
              >
                <span>⚡</span>
                <span>Desbloquear Todos os Itens</span>
              </button>
            </div>

            {/* 2. Unlock All Spells */}
            <div
              className="card-surface rounded-xl p-4 flex flex-col justify-between border transition-all"
              style={{ borderColor: `${T.gold}44` }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <span>📖</span><span>Todos os Feitiços</span>
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ background: `${T.gold}18`, borderColor: `${T.gold}44`, color: T.gold }}
                  >
                    36/36 Skills
                  </span>
                </div>
                <p className="text-[11px] font-mono leading-relaxed mb-3" style={{ color: T.textSecondary }}>
                  Aprende todos os feitiços de Fogo, Gelo, Natureza e Arcano (Tiers 1, 2 e 3 + Grimórios raros).
                </p>
              </div>
              <button
                onClick={adminUnlockAllSkills}
                className="btn-surface w-full py-2.5 rounded-lg font-serif text-[12px] font-bold transition-all flex items-center justify-center gap-1.5"
                style={{ borderColor: `${T.gold}66`, color: T.goldLight }}
              >
                <span>🔮</span>
                <span>Desbloquear 36 Feitiços</span>
              </button>
            </div>

            {/* 3. Add Shards */}
            <div
              className="card-surface rounded-xl p-4 flex flex-col justify-between border transition-all"
              style={{ borderColor: `${T.ice}44` }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <span>✦</span><span>Arcane Shards</span>
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ background: `${T.ice}18`, borderColor: `${T.ice}44`, color: T.ice }}
                  >
                    Moeda da Loja
                  </span>
                </div>
                <p className="text-[11px] font-mono leading-relaxed mb-3" style={{ color: T.textSecondary }}>
                  Adiciona instantaneamente +50.000 Shards ao seu saldo para comprar pacotes e cosméticos.
                </p>
              </div>
              <button
                onClick={() => adminAddShards(50000)}
                className="btn-surface w-full py-2.5 rounded-lg font-serif text-[12px] font-bold transition-all flex items-center justify-center gap-1.5"
                style={{ borderColor: `${T.ice}66`, color: T.ice }}
              >
                <span>💎</span>
                <span>+50.000 Shards</span>
              </button>
            </div>

            {/* 4. Max Level 30 & 7 Slots */}
            <div
              className="card-surface rounded-xl p-4 flex flex-col justify-between border transition-all"
              style={{ borderColor: `${T.nature}44` }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <span>🌟</span><span>Nível Máximo</span>
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ background: `${T.nature}18`, borderColor: `${T.nature}44`, color: T.nature }}
                  >
                    Nv. 30 (7 Slots)
                  </span>
                </div>
                <p className="text-[11px] font-mono leading-relaxed mb-3" style={{ color: T.textSecondary }}>
                  Eleva o mago para Nível 30, liberando todos os 7 slots de feitiço e maximizando o Passe de Batalha.
                </p>
              </div>
              <button
                onClick={adminMaxLevel}
                className="btn-surface w-full py-2.5 rounded-lg font-serif text-[12px] font-bold transition-all flex items-center justify-center gap-1.5"
                style={{ borderColor: `${T.nature}66`, color: T.nature }}
              >
                <span>⭐</span>
                <span>Maximizar para Nv. 30</span>
              </button>
            </div>

          </div>

          {/* Full God Mode Hero Banner */}
          <div
            className="panel-elevated p-4 rounded-xl border mb-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg"
            style={{ borderColor: `${T.gold}66` }}
          >
            <div>
              <div className="font-serif font-bold text-[15px] sm:text-[16px] flex items-center gap-2" style={{ color: T.goldLight }}>
                <span>🚀</span><span>MODO DEUS COMPLETO (ALL-IN-ONE)</span>
              </div>
              <div className="text-[11px] font-mono mt-0.5" style={{ color: T.textSecondary }}>
                Desbloqueia todos os itens, feitiços, slots, bosses e 99.999 shards com 1 clique.
              </div>
            </div>
            <button
              onClick={adminUnlockEverything}
              className="btn-gold px-4 py-2.5 rounded-xl font-serif text-[13px] font-bold shadow-lg whitespace-nowrap flex-shrink-0"
            >
              🌟 ATIVAR TUDO
            </button>
          </div>

          {/* Footer with Reset */}
          <div className="pt-2 border-t flex justify-between items-center text-[10px] sm:text-[11px] font-mono" style={{ borderColor: T.borderSubtle, color: T.textTertiary }}>
            <span>Os dados salvam automaticamente no seu navegador (localStorage).</span>
            <button
              onClick={adminResetProgress}
              className="hover:text-red-400 underline transition-colors"
            >
              Restaurar Padrão Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= LOADOUT =================
  if (phase === "loadout") {
    const canFindOpponent = chosen.length >= 4 && chosen.length <= maxSlots;

    return (
      <div className="min-h-[100dvh] h-full sm:h-[100dvh] overflow-y-auto sm:overflow-hidden relative flex flex-col items-center justify-between safe-all p-2 sm:p-3 md:p-4" style={{ color: T.textPrimary }}>
        {styles}{bg}
        {renderAdmToast()}
        <div className="relative z-10 w-full max-w-xl landscape:max-w-5xl md:max-w-4xl lg:max-w-5xl min-h-full sm:h-full flex flex-col justify-between p-0.5">
          {/* Modern AAA Header */}
          <div className="w-full flex items-center justify-between py-1.5 flex-shrink-0 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-[22px] sm:text-[26px] md:text-[30px] font-black tracking-wider text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">
                  {mageName.trim() || "Mage Duel"}
                </h1>
                {/* Ultra-slim XP Badge & Bar */}
                <div className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/25 flex items-center gap-2 shadow-sm">
                  <span className="font-bold text-amber-300 text-[11px] font-sans">{t("level")} {mageLevel}</span>
                  <div className="w-16 sm:w-24 h-1 rounded-full overflow-hidden bg-slate-950 border border-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${mageLevelInfo.percent}%`, background: "linear-gradient(90deg, #F59E0B, #FBBF24)" }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] font-sans text-zinc-400 mt-0.5">
                {lang === "pt" ? "Afinidade" : "Affinity"} {getElementName(affinity, lang)} +25% · {mageLevelInfo.currentInLevel}/{mageLevelInfo.neededForNext} XP
              </p>
            </div>

            {/* Right Controls: Minimalist Currency, Language, Friends & Settings Gear */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {pendingLevelDraft && (
                <button
                  onClick={() => {}}
                  className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-amber-500/20 border border-amber-400/50 text-amber-300 animate-pulse shadow-md flex items-center gap-1.5"
                  title="Novo Feitiço Disponível para Escolha!"
                >
                  🌟 Draft
                </button>
              )}

              {/* Language Switcher Pill */}
              <button
                onClick={toggleLang}
                title={lang === "pt" ? "Mudar para Inglês (Switch to English)" : "Mudar para Português (Switch to Portuguese)"}
                className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-white/15 hover:border-amber-400/50 text-zinc-200 hover:text-amber-200 text-xs font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 hover:-translate-y-0.5 active:scale-95"
              >
                <span>{lang === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}</span>
              </button>

              {/* Minimalist Shards Counter: icon + amount */}
              <button
                onClick={() => setTab("shop")}
                title={t("shopTitle")}
                className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/25 hover:border-amber-400/50 text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm hover:-translate-y-0.5"
              >
                <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">✦</span>
                <span>{shards}</span>
              </button>

              {/* Friends Pill */}
              <button
                onClick={() => setShowFriends(true)}
                title={t("friends")}
                className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-white/10 hover:border-white/25 text-zinc-300 text-xs font-sans transition-all shadow-sm flex items-center gap-1.5 hover:-translate-y-0.5"
              >
                <span>👥</span>
                <span className="font-bold">{friends.length}</span>
              </button>

              {/* Settings Gear (replaces bulky ADM button) */}
              <button
                onClick={() => setShowAdminModal(true)}
                className="p-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-amber-400/50 text-zinc-300 hover:text-white transition-all shadow-sm flex items-center justify-center text-sm hover:-translate-y-0.5"
                title={t("settings")}
              >
                <span>⚙️</span>
              </button>
            </div>
          </div>

          {renderCharacterPreview(null)}

          {/* Center: Elegant Daily Modifier Glass Banner with Shield Icon */}
          {(() => {
            const todayMod = getTodayModifier();
            return (
              <div className="w-full rounded-xl p-2 sm:p-2.5 my-1 flex items-center justify-between gap-3 shadow-lg border glass-panel transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-base border flex-shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    style={{
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)",
                      borderColor: "rgba(245, 158, 11, 0.45)",
                    }}
                  >
                    <span>🛡️</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-sans uppercase tracking-widest font-bold text-amber-400/90">
                        {t("dailyModifier")}
                      </span>
                      <span className="text-zinc-500">·</span>
                      <span className="text-xs sm:text-sm font-serif font-bold text-zinc-100 truncate">
                        {todayMod.icon} {todayMod.name}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-zinc-400 truncate mt-0.5">
                      {todayMod.desc}
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-sans font-bold border flex-shrink-0 shadow-sm"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    borderColor: "rgba(245, 158, 11, 0.35)",
                    color: "#FDE68A",
                  }}
                >
                  {todayMod.shortDesc}
                </span>
              </div>
            );
          })()}

          {/* Footer: Dynamic Loadout Slots Indicator with Translucent Glowing Glass */}
          <div className="w-full rounded-2xl glass-panel p-2.5 sm:p-3 my-1 flex-shrink-0 shadow-xl border border-white/10">
            <div className="flex items-center justify-between mb-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold flex items-center gap-1.5 text-amber-300">
                  <span>🔮</span>
                  <span>{t("spellSlots")} ({chosen.length}/{maxSlots})</span>
                </span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">
                  {maxSlots < 7 ? (lang === "pt" ? `· Nv. ${maxSlots === 4 ? 10 : maxSlots === 5 ? 20 : 30} desbloqueia próximo slot` : `· Lv. ${maxSlots === 4 ? 10 : maxSlots === 5 ? 20 : 30} unlocks next socket`) : (lang === "pt" ? "· Todos os 7 slots liberados!" : "· All 7 sockets unlocked!")}
                </span>
              </div>
              <button
                onClick={() => setTab("skills")}
                className="text-[11px] font-sans font-medium text-amber-300/80 hover:text-amber-200 transition-colors flex items-center gap-1"
              >
                <span>{t("fullGrimoire")}</span>
              </button>
            </div>

            {/* Sockets Grid: 4 cols on mobile portrait, 7 cols on sm+ */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const isUnlocked = i < maxSlots;
                const skillId = chosen[i];
                const skill = skillId ? SKILLS.find(s => s.id === skillId) : null;
                const unlockLvl = i === 4 ? 10 : i === 5 ? 20 : i === 6 ? 30 : 1;
                const el = skill ? ELEMENTS[skill.el] : null;

                return (
                  <button
                    key={i}
                    onClick={() => isUnlocked ? setTab("skills") : null}
                    className={`min-h-[50px] sm:min-h-[62px] rounded-xl text-center flex flex-col items-center justify-between p-1.5 transition-all group relative overflow-hidden ${
                      !isUnlocked
                        ? "opacity-35 cursor-not-allowed border-white/5 bg-black/40"
                        : skill
                        ? "bg-slate-950/80 hover:scale-[1.02] shadow-md"
                        : "border-dashed border-white/10 bg-slate-950/30 hover:border-amber-400/40 hover:bg-slate-900/40"
                    }`}
                    style={{
                      border: skill && el ? `1px solid ${el.color}66` : undefined,
                      boxShadow: skill && el ? `0 0 16px ${el.color}28, inset 0 1px 0 rgba(255,255,255,0.06)` : undefined,
                    }}
                    title={!isUnlocked ? `Bloqueado até Nível ${unlockLvl}` : skill ? `${skill.name} (Clique para alterar no Grimório)` : "Slot vazio (Clique para equipar)"}
                  >
                    {!isUnlocked ? (
                      <div className="flex flex-col items-center justify-center my-auto">
                        <span className="text-[12px] opacity-60">🔒</span>
                        <span className="text-[8px] font-sans font-bold text-zinc-500">Nv.{unlockLvl}</span>
                      </div>
                    ) : skill ? (
                      <>
                        <div className="flex items-center justify-between w-full px-0.5">
                          <span className="text-[11px] drop-shadow-[0_0_6px_currentColor]" style={{ color: el.color }}>{el.icon}</span>
                          <span
                            className="text-[8px] font-mono font-bold px-1 rounded-full border border-sky-400/30 text-sky-300"
                            style={{ background: "rgba(14, 165, 233, 0.15)" }}
                          >
                            💧{skill.mana}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-serif font-bold text-zinc-100 group-hover:text-amber-200 transition-colors leading-none truncate max-w-full">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-1 text-[8px] font-mono font-bold">
                          {skill.dmg > 0 && <span className="text-red-300">⚔️{skill.dmg}</span>}
                          {skill.shield > 0 && <span className="text-sky-300">🛡️{skill.shield}</span>}
                          {skill.heal > 0 && <span className="text-emerald-300">💚{skill.heal}</span>}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center my-auto group-hover:text-amber-300 transition-colors text-zinc-500">
                        <span className="text-sm font-bold leading-none">+</span>
                        <span className="text-[8px] font-sans uppercase tracking-wider mt-0.5">Slot {i + 1}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row: Adaptive Responsive Layout */}
          <div className="w-full pt-1.5 pb-1 flex-shrink-0 flex flex-col sm:flex-row gap-1.5 sm:gap-2.5 items-stretch">
            <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={startTutorial}
                className="btn-ghost flex-1 sm:flex-initial rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 font-serif text-[11px] sm:text-[13px] md:text-[14px] font-bold flex items-center justify-center gap-1.5 border-sky-500/25 text-sky-200 hover:border-sky-400/50"
                title="Treinamento com Espantalho Arcano"
              >
                <span className="text-sm sm:text-base">🎯</span>
                <span>{t("tutorial")}</span>
              </button>
              <button
                onClick={() => setShowBossTrialsModal(true)}
                className="btn-ghost flex-1 sm:flex-initial rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 font-serif text-[11px] sm:text-[13px] md:text-[14px] font-bold flex items-center justify-center gap-1.5 border-purple-500/25 text-purple-200 hover:border-purple-400/50"
                title="Treinamento de Mestres Elementais"
              >
                <span className="text-sm sm:text-base">👑</span>
                <span>{t("bossTrials")}</span>
              </button>
            </div>
            <button
              onClick={() => { setIsTutorial(false); findOpponent(); }}
              disabled={!canFindOpponent}
              className="btn-king w-full sm:flex-1 rounded-xl py-2.5 sm:py-3.5 px-4 text-[13px] sm:text-[16px] md:text-[18px] flex items-center justify-center gap-2"
            >
              <span className="text-base sm:text-xl">⚔️</span>
              <span>{t("findDuel")}</span>
            </button>
          </div>
        </div>

        {renderGearModal()}
        {renderFriendsModal()}
        {renderChatModal()}
        {renderMatchmakingModal()}
        {renderShardShopModal()}
        {renderRewardedAdModal()}
        {renderLevelUpModal()}
        {renderBossTrialsModal()}
        {renderMasteryCelebrationModal()}
        {renderAdminModal()}
      </div>
    );
  }

  // ================= SCOUT / MATCHUP SCREEN =================
  if (phase === "scout") {
    const previewMage = buildPreviewMage();
    const relic = RELICS.find(r => r.id === relicId);
    const playerSkills = chosen.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
    const foeSkills = enemy.skills;
    const bios = NPC_BIOS[enemy.affinity] || [];
    const bioHash = [...enemy.name].reduce((a, c) => a + c.charCodeAt(0), 0);
    const bio = bios.length ? bios[bioHash % bios.length] : "";
    const friended = isFriend(enemy);
    const playerEl = ELEMENTS[affinity] || ELEMENTS.fire;
    const enemyEl = ELEMENTS[enemy.affinity] || ELEMENTS.fire;
    const canEnterArena = chosen.length >= 4;

    return (
      <div className="min-h-[100dvh] h-full sm:h-[100dvh] overflow-y-auto sm:overflow-hidden relative flex flex-col items-center justify-between safe-all p-2 sm:p-3 md:p-4" style={{ color: T.textPrimary }}>
        {styles}{bg}
        <div className="relative z-10 w-full max-w-xl md:max-w-3xl lg:max-w-4xl min-h-full sm:h-full flex flex-col justify-between">
          
          {/* Header */}
          <div className="text-center py-1 flex-shrink-0">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border mb-1 shadow-sm"
              style={{ borderColor: `${T.success}66`, background: `${T.success}18`, color: T.success }}
            >
              <span>✓</span><span>{t("matchFound")} · {t("duelMatchmaking")}</span>
            </div>
            <h1 className="font-serif text-[22px] sm:text-[26px] font-bold tracking-wide" style={{ color: T.gold, textShadow: `0 0 24px ${T.gold}44` }}>
              {t("duelConfrontation")}
            </h1>
          </div>

          {/* Center Matchup: Face-to-Face Mages & Tactical Loadout */}
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2 sm:gap-2.5 my-1 overflow-y-auto custom-scrollbar overscroll-contain pb-4">
            
            {/* The Duelists Cards Side-by-Side with Central VS Badge */}
            <div className="relative grid grid-cols-2 gap-2 sm:gap-4 w-full items-stretch flex-shrink-0">
              
              {/* Central VS Emblem */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-serif font-black text-[11px] sm:text-[13px] shadow-2xl ring-4"
                  style={{ background: T.bgDeep, borderColor: T.gold, color: T.gold, ringColor: T.bgDeep, boxShadow: `0 0 20px ${T.gold}66` }}
                >
                  VS
                </div>
              </div>

              {/* Player Card */}
              <div
                className="card-surface rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-lg border"
                style={{
                  borderColor: `${playerEl.color}66`,
                }}
              >
                <div className="w-full flex items-center justify-between gap-1 mb-1">
                  <span className="font-serif text-[13px] sm:text-[15px] font-bold truncate" style={{ color: T.textPrimary }}>
                    {mageName.trim() || (lang === "pt" ? "Você" : "You")}
                  </span>
                  <ElementBadge el={affinity} />
                </div>
                <div className="my-0.5 flex justify-center items-center">
                  <MageSprite mage={previewMage} facing="right" size={1.15} />
                </div>
                <div className="w-full">
                  <div className="text-[11px] sm:text-[12px] font-mono truncate font-medium" style={{ color: T.textSecondary }}>
                    {previewMage.staffGear?.name}
                  </div>
                  {relic && relic.id !== "none" && (
                    <div className="text-[10px] sm:text-[11px] font-mono truncate font-bold mt-0.5" style={{ color: RARITY[relic.rarity].color }}>
                      ✦ {relic.name}
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
                    <button
                      onClick={() => setTab("skills")}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-all hover:scale-105 flex items-center gap-1 shadow-sm"
                      style={{ borderColor: `${playerEl.color}88`, background: `${playerEl.color}1e`, color: playerEl.color }}
                      title="Clique para abrir o Grimório e escolher seus feitiços"
                    >
                      <span>📖</span>
                      <span>{playerSkills.length}/{maxSlots} {lang === "pt" ? "Feitiços" : "Spells"}</span>
                      <span className="opacity-70">✏️</span>
                    </button>
                    <button
                      onClick={() => setTab("gear")}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border border-white/20 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all hover:scale-105 flex items-center gap-1 shadow-sm"
                      title={t("gearTitle")}
                    >
                      <span>🛡️</span>
                      <span className="hidden sm:inline">{t("gear")}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Opponent Card */}
              <div
                className="card-surface rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-lg border"
                style={{
                  borderColor: `${enemyEl.color}66`,
                }}
              >
                <div className="w-full flex items-center justify-between gap-1 mb-1">
                  <span className="font-serif text-[13px] sm:text-[15px] font-bold truncate" style={{ color: enemyEl.color }}>
                    {enemy.name}
                  </span>
                  <ElementBadge el={enemy.affinity} />
                </div>
                <div className="my-0.5 flex justify-center items-center">
                  <MageSprite mage={enemy} facing="left" size={1.15} />
                </div>
                <div className="w-full">
                  <div className="text-[11px] sm:text-[12px] font-mono truncate font-medium" style={{ color: RARITY[enemy.staffGear?.rarity || "common"]?.color || T.textSecondary }}>
                    {enemy.staffGear?.name}
                  </div>
                  {enemy.archetype ? (
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold mt-1 border max-w-full truncate"
                      style={{
                        borderColor: `${enemy.archetype.color}66`,
                        backgroundColor: `${enemy.archetype.color}18`,
                        color: enemy.archetype.color,
                      }}
                      title={enemy.archetype.desc}
                    >
                      <span>{enemy.archetype.icon}</span>
                      <span className="truncate">{enemy.archetype.name}</span>
                      <span className="opacity-80 hidden sm:inline">· {enemy.archetype.tagline}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] sm:text-[11px] font-mono italic truncate mt-0.5" style={{ color: T.textTertiary }}>
                      "{bio}"
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      style={{ borderColor: `${enemyEl.color}55`, background: `${enemyEl.color}14`, color: enemyEl.color }}
                    >
                      ⚔️ {foeSkills.length} {lang === "pt" ? "Feitiços" : "Spells"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Tactical Loadout Station: Controls & Panels */}
            <div className="w-full flex flex-col gap-2">
              
              {/* Segmented View Selector & Action Buttons */}
              <div className="flex items-center justify-between gap-2 flex-wrap flex-shrink-0">
                <div className="inline-flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-white/10 shadow-inner">
                  <button
                    onClick={() => setScoutView("both")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                      scoutView === "both"
                        ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span>⚔️</span>
                    <span>{t("viewBoth")}</span>
                  </button>
                  <button
                    onClick={() => setScoutView("player")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                      scoutView === "player"
                        ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span>🧙‍♂️</span>
                    <span>{t("viewYourLoadout")} ({playerSkills.length}/{maxSlots})</span>
                  </button>
                  <button
                    onClick={() => setScoutView("enemy")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                      scoutView === "enemy"
                        ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span>👁️</span>
                    <span>{t("viewEnemy")} ({foeSkills.length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => setTab("skills")}
                    className="btn-surface rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-amber-300 border border-amber-400/30 hover:border-amber-400/70 hover:bg-amber-400/10 transition-all flex items-center gap-1 shadow-sm"
                    title={t("grimoireTitle")}
                  >
                    <span>📖</span>
                    <span>{t("grimoire")}</span>
                  </button>
                  <button
                    onClick={() => setTab("gear")}
                    className="btn-surface rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1 shadow-sm"
                    title={t("gearTitle")}
                  >
                    <span>🛡️</span>
                    <span>{t("gear")}</span>
                  </button>
                </div>
              </div>

              {/* View 1: Both (Side-by-Side Comparison) */}
              {scoutView === "both" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full">
                  
                  {/* Player Loadout Column */}
                  <div className="rounded-2xl panel-base p-2.5 sm:p-3 border shadow-md flex flex-col justify-between" style={{ borderColor: `${playerEl.color}44` }}>
                    <div>
                      <div className="flex items-center justify-between mb-2 text-[11px] font-mono">
                        <span className="font-bold flex items-center gap-1.5" style={{ color: playerEl.color }}>
                          <span>🧙‍♂️</span>
                          <span>Seu Grimório ({playerSkills.length}/{maxSlots})</span>
                        </span>
                        <button
                          onClick={() => setTab("skills")}
                          className="text-[10px] font-mono text-amber-300/90 hover:text-amber-200 underline font-semibold"
                        >
                          + Abrir Grimório
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {playerSkills.map(s => {
                          const e = ELEMENTS[s.el];
                          return (
                            <div
                              key={s.id}
                              className="card-surface rounded-xl border p-1.5 sm:p-2 flex flex-col justify-between shadow-sm relative group hover:border-amber-400/50 transition-all"
                              style={{ borderColor: `${e.color}55` }}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-serif text-[11px] sm:text-[12px] font-bold text-[#FAF6EE] leading-tight truncate">
                                  {s.name}
                                </span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <span className="text-[11px]" style={{ color: e.color }}>{e.icon}</span>
                                  <button
                                    onClick={(ev) => {
                                      ev.stopPropagation();
                                      if (chosen.length > 1) {
                                        toggleSkill(s.id);
                                      }
                                    }}
                                    disabled={chosen.length <= 1}
                                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold bg-black/40 hover:bg-rose-500/80 text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                                    title={chosen.length <= 1 ? "Mínimo 1 feitiço necessário" : "Desequipar feitiço"}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold">
                                <span style={{ color: T.ice }}>💧{s.mana}</span>
                                {s.dmg > 0 && <span style={{ color: T.danger }}>⚔️{s.dmg}</span>}
                                {s.shield > 0 && <span style={{ color: T.ice }}>🛡️{s.shield}</span>}
                                {s.heal > 0 && <span style={{ color: T.success }}>💚{s.heal}</span>}
                                {s.restore > 0 && <span style={{ color: T.info }}>💧+{s.restore}</span>}
                              </div>
                            </div>
                          );
                        })}

                        {/* Empty Slots clickable to open Grimoire */}
                        {Array.from({ length: Math.max(0, maxSlots - playerSkills.length) }).map((_, idx) => (
                          <button
                            key={`empty-slot-${idx}`}
                            onClick={() => setTab("skills")}
                            className="rounded-xl border-2 border-dashed border-white/15 hover:border-amber-400/60 p-2 flex flex-col items-center justify-center text-center transition-all bg-white/[0.02] hover:bg-amber-400/[0.05] min-h-[46px]"
                          >
                            <span className="text-[10px] font-mono font-bold text-amber-300/80">
                              + Equipar Feitiço
                            </span>
                            <span className="text-[8px] font-mono text-zinc-500">Slot {playerSkills.length + idx + 1}/{maxSlots}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {playerSkills.length < 4 && (
                      <div className="mt-2 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>Equipe pelo menos 4 feitiços para o duelo ({playerSkills.length}/4).</span>
                      </div>
                    )}
                  </div>

                  {/* Enemy Intel Column */}
                  <div className="rounded-2xl panel-base p-2.5 sm:p-3 border shadow-md flex flex-col justify-between" style={{ borderColor: `${enemyEl.color}44` }}>
                    <div>
                      <div className="flex items-center justify-between mb-2 text-[11px] font-mono">
                        <span className="font-bold flex items-center gap-1.5" style={{ color: enemyEl.color }}>
                          <span>⚔️</span>
                          <span>Feitiços do Oponente ({foeSkills.length})</span>
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => openChat(enemy)}
                            className="btn-surface rounded-lg px-2 py-0.5 text-[10px] font-mono transition-all"
                          >
                            💬 Conversar
                          </button>
                          <button
                            onClick={() => addFriend(enemy)}
                            disabled={friended}
                            className="btn-surface rounded-lg px-2 py-0.5 text-[10px] font-mono transition-all font-bold"
                            style={{
                              borderColor: friended ? `${T.success}88` : undefined,
                              color: friended ? T.success : undefined,
                            }}
                          >
                            {friended ? "✓ Amigo" : "+ Amigo"}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {foeSkills.map(s => {
                          const e = ELEMENTS[s.el];
                          return (
                            <div
                              key={s.id}
                              className="card-surface rounded-xl border p-1.5 sm:p-2 flex flex-col justify-between shadow-sm transition-all"
                              style={{ borderColor: `${e.color}55` }}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-serif text-[11px] sm:text-[12px] font-bold text-[#FAF6EE] leading-tight truncate">
                                  {s.name}
                                </span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <span className="text-[11px]" style={{ color: e.color }}>{e.icon}</span>
                                  <span className="text-[8px] font-mono font-bold px-1 rounded" style={{ background: T.bgBase, color: T.arcane }}>
                                    T{s.tier}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold">
                                <span style={{ color: T.ice }}>💧{s.mana}</span>
                                {s.dmg > 0 && <span style={{ color: T.danger }}>⚔️{s.dmg}</span>}
                                {s.shield > 0 && <span style={{ color: T.ice }}>🛡️{s.shield}</span>}
                                {s.heal > 0 && <span style={{ color: T.success }}>💚{s.heal}</span>}
                                {s.restore > 0 && <span style={{ color: T.info }}>💧+{s.restore}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {enemy.archetype && (
                      <div className="mt-2 text-[10px] font-mono text-zinc-400 bg-black/20 border border-white/5 rounded-lg px-2 py-1 flex items-center gap-1.5 truncate">
                        <span>{enemy.archetype.icon}</span>
                        <span className="font-bold" style={{ color: enemy.archetype.color }}>{enemy.archetype.name}:</span>
                        <span className="truncate">{enemy.archetype.desc}</span>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* View 2: Player Only (Full Tactical Loadout Customization) */}
              {scoutView === "player" && (
                <div className="w-full rounded-2xl panel-base p-2.5 sm:p-3.5 border shadow-md flex flex-col gap-2.5" style={{ borderColor: `${playerEl.color}55` }}>
                  <div className="flex items-center justify-between flex-wrap gap-2 text-[12px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-serif text-[13px] sm:text-[15px]" style={{ color: T.gold }}>
                        🧙‍♂️ Seu Grimório & Configuração de Duelo
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ borderColor: `${playerEl.color}88`, color: playerEl.color, background: `${playerEl.color}18` }}>
                        {playerSkills.length}/{maxSlots} Slots Ocupados
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTab("skills")}
                        className="btn-surface rounded-xl px-3 py-1 text-[11px] font-mono font-bold text-amber-300 border border-amber-400/40 hover:bg-amber-400/10 transition-all flex items-center gap-1 shadow-sm"
                      >
                        <span>📖</span>
                        <span>Abrir Grimório Completo</span>
                      </button>
                      <button
                        onClick={() => setTab("gear")}
                        className="btn-surface rounded-xl px-3 py-1 text-[11px] font-mono font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1 shadow-sm"
                      >
                        <span>🛡️</span>
                        <span>Alterar Equipamentos</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Gear summary banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 rounded-xl bg-black/30 border border-white/5 text-[11px] font-mono">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors" onClick={() => setTab("gear")} title="Clique para trocar cajado">
                      <span className="text-base">🪄</span>
                      <div className="truncate">
                        <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Cajado</div>
                        <div className="font-bold text-zinc-200 truncate">{previewMage.staffGear?.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors" onClick={() => setTab("gear")} title="Clique para trocar relíquia">
                      <span className="text-base">✦</span>
                      <div className="truncate">
                        <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Relíquia</div>
                        <div className="font-bold truncate" style={{ color: relic ? RARITY[relic.rarity]?.color : T.textSecondary }}>
                          {relic && relic.id !== "none" ? relic.name : "Nenhuma Relíquia"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors" onClick={() => setTab("skills")} title="Clique para trocar afinidade elemental">
                      <span className="text-base">{playerEl.icon}</span>
                      <div className="truncate">
                        <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Afinidade Elemental</div>
                        <div className="font-bold truncate" style={{ color: playerEl.color }}>{playerEl.name} (+25% Dano)</div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {playerSkills.map(s => {
                      const e = ELEMENTS[s.el];
                      return (
                        <div
                          key={s.id}
                          className="card-surface rounded-xl border p-2 flex flex-col justify-between shadow-sm relative group hover:border-amber-400/50 transition-all"
                          style={{ borderColor: `${e.color}55` }}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-serif text-[12px] font-bold text-[#FAF6EE] leading-tight truncate">
                                {s.name}
                              </span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-[12px]" style={{ color: e.color }}>{e.icon}</span>
                                <span className="text-[8px] font-mono font-bold px-1 rounded" style={{ background: T.bgBase, color: T.arcane }}>
                                  T{s.tier}
                                </span>
                              </div>
                            </div>
                            {s.desc && (
                              <p className="text-[10px] font-sans text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                                {s.desc}
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold mb-2">
                              <span style={{ color: T.ice }}>💧{s.mana}</span>
                              {s.dmg > 0 && <span style={{ color: T.danger }}>⚔️{s.dmg}</span>}
                              {s.shield > 0 && <span style={{ color: T.ice }}>🛡️{s.shield}</span>}
                              {s.heal > 0 && <span style={{ color: T.success }}>💚{s.heal}</span>}
                              {s.restore > 0 && <span style={{ color: T.info }}>💧+{s.restore}</span>}
                            </div>
                            <button
                              onClick={() => toggleSkill(s.id)}
                              disabled={chosen.length <= 1}
                              className="w-full py-1 rounded-lg text-[10px] font-mono font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1"
                            >
                              <span>✕</span>
                              <span>Desequipar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Empty Slots */}
                    {Array.from({ length: Math.max(0, maxSlots - playerSkills.length) }).map((_, idx) => (
                      <button
                        key={`player-empty-${idx}`}
                        onClick={() => setTab("skills")}
                        className="rounded-xl border-2 border-dashed border-white/20 hover:border-amber-400/60 p-3 flex flex-col items-center justify-center text-center transition-all bg-white/[0.02] hover:bg-amber-400/[0.05] min-h-[100px]"
                      >
                        <span className="text-xl mb-1 text-amber-300/60">+</span>
                        <span className="text-[11px] font-mono font-bold text-amber-300/80">
                          Equipar Feitiço
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 mt-0.5">Slot {playerSkills.length + idx + 1}/{maxSlots}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View 3: Enemy Only (Tactical Dossier) */}
              {scoutView === "enemy" && (
                <div className="w-full rounded-2xl panel-base p-2.5 sm:p-3.5 border shadow-md flex flex-col gap-2.5" style={{ borderColor: `${enemyEl.color}55` }}>
                  <div className="flex items-center justify-between flex-wrap gap-2 text-[12px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-serif text-[13px] sm:text-[15px]" style={{ color: enemyEl.color }}>
                        👁️ Dossiê de Combate: {enemy.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ borderColor: `${enemyEl.color}88`, color: enemyEl.color, background: `${enemyEl.color}18` }}>
                        {enemyEl.icon} Afinidade {enemyEl.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openChat(enemy)}
                        className="btn-surface rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all flex items-center gap-1"
                      >
                        💬 Conversar
                      </button>
                      <button
                        onClick={() => addFriend(enemy)}
                        disabled={friended}
                        className="btn-surface rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all font-bold"
                        style={{
                          borderColor: friended ? `${T.success}88` : undefined,
                          color: friended ? T.success : undefined,
                        }}
                      >
                        {friended ? "✓ Amigo" : "+ Amigo"}
                      </button>
                    </div>
                  </div>

                  {/* Enemy Archetype and Lore */}
                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono">
                    {enemy.archetype ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{enemy.archetype.icon}</span>
                        <div>
                          <div className="font-bold" style={{ color: enemy.archetype.color }}>
                            {enemy.archetype.name} · <span className="opacity-80">{enemy.archetype.tagline}</span>
                          </div>
                          <div className="text-[10px] text-zinc-400">{enemy.archetype.desc}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="italic text-zinc-400">"{bio || "Um mago misterioso pronto para o confronto."}"</div>
                    )}
                    <div className="text-[10px] font-mono text-zinc-400 sm:text-right flex-shrink-0">
                      Cajado: <span className="text-zinc-200 font-bold">{enemy.staffGear?.name}</span>
                    </div>
                  </div>

                  {/* Enemy Spells Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {foeSkills.map(s => {
                      const e = ELEMENTS[s.el];
                      return (
                        <div
                          key={s.id}
                          className="card-surface rounded-xl border p-2 flex flex-col justify-between shadow-sm transition-all"
                          style={{ borderColor: `${e.color}55` }}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-serif text-[12px] font-bold text-[#FAF6EE] leading-tight truncate">
                                {s.name}
                              </span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-[12px]" style={{ color: e.color }}>{e.icon}</span>
                                <span className="text-[8px] font-mono font-bold px-1 rounded" style={{ background: T.bgBase, color: T.arcane }}>
                                  T{s.tier}
                                </span>
                              </div>
                            </div>
                            {s.desc && (
                              <p className="text-[10px] font-sans text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                                {s.desc}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                            <span style={{ color: T.ice }}>💧{s.mana}</span>
                            {s.dmg > 0 && <span style={{ color: T.danger }}>⚔️{s.dmg}</span>}
                            {s.shield > 0 && <span style={{ color: T.ice }}>🛡️{s.shield}</span>}
                            {s.heal > 0 && <span style={{ color: T.success }}>💚{s.heal}</span>}
                            {s.restore > 0 && <span style={{ color: T.info }}>💧+{s.restore}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="w-full flex flex-wrap sm:flex-nowrap gap-2 pt-1.5 pb-0.5 flex-shrink-0">
            <button
              onClick={() => setPhase("loadout")}
              className="btn-surface rounded-xl px-3.5 py-2.5 font-serif text-[12px] sm:text-[13px] font-bold transition-all flex items-center justify-center gap-1"
              title={t("backHub")}
            >
              {t("backHub")}
            </button>
            <button
              onClick={() => setTab("skills")}
              className="btn-surface rounded-xl px-3.5 py-2.5 font-serif text-[12px] sm:text-[13px] font-bold transition-all text-amber-300 border-amber-500/30 flex items-center justify-center gap-1 shadow-sm"
              title={t("grimoireTitle")}
            >
              <span>📖</span>
              <span>{t("grimoire")}</span>
            </button>
            <button
              onClick={() => setTab("gear")}
              className="btn-surface rounded-xl px-3.5 py-2.5 font-serif text-[12px] sm:text-[13px] font-bold transition-all text-zinc-300 hover:text-white flex items-center justify-center gap-1 shadow-sm"
              title={t("gearTitle")}
            >
              <span>🛡️</span>
              <span>{t("gear")}</span>
            </button>
            <button
              onClick={findOpponent}
              className="btn-surface flex-1 rounded-xl py-2.5 font-serif text-[12px] sm:text-[13px] font-bold transition-all flex items-center justify-center gap-1"
            >
              <span>🔄</span>
              <span>{t("newOpponent")}</span>
            </button>
            <button
              onClick={confirmDuel}
              disabled={!canEnterArena}
              className={`btn-gold flex-2 rounded-xl py-2.5 px-4 sm:px-6 font-serif text-[14px] sm:text-[16px] font-black shadow-xl transition-all ${
                !canEnterArena ? "opacity-50 cursor-not-allowed filter grayscale" : "hover:brightness-110"
              }`}
              title={!canEnterArena ? (lang === "pt" ? "Equipe ao menos 4 feitiços para iniciar o duelo" : "Equip at least 4 spells to start duel") : t("enterCombat")}
            >
              ⚔️ {t("enterCombat")}
            </button>
          </div>
        </div>

        {renderGearModal()}
        {renderMatchmakingModal()}
        {renderChatModal()}
        {renderShardShopModal()}
        {renderRewardedAdModal()}
      </div>
    );
  }

  // ================= RESULT =================
  if (phase === "result") {
    const isWin = result === "win";
    const mvpSkillEntry = Object.entries(combatStats.skillUsage || {}).sort((a, b) => b[1] - a[1])[0];
    const mvpSkill = mvpSkillEntry ? (SKILLS.find(s => s.id === mvpSkillEntry[0]) || (mvpSkillEntry[0] === "focus" ? FOCUS : null)) : null;
    const mvpCasts = mvpSkillEntry ? mvpSkillEntry[1] : 0;

    const badgesEarned = [];
    if (combatStats.combosCount >= 2) badgesEarned.push({ icon: "⚡", name: "Mestre dos Combos", desc: `${combatStats.combosCount} combos elementais executados` });
    if (combatStats.critsCount >= 2) badgesEarned.push({ icon: "🎯", name: "Precisão Fatal", desc: `${combatStats.critsCount} acertos críticos desferidos` });
    if (isWin && (player?.hp || 0) >= 60) badgesEarned.push({ icon: "🛡️", name: "Baluarte Imbatível", desc: `${player?.hp} HP preservados` });
    if (isWin && roundNum <= 4) badgesEarned.push({ icon: "⏱️", name: "Duelo Relâmpago", desc: `Vitória rápida em ${roundNum} turnos` });
    if (combatStats.highestHit >= 30) badgesEarned.push({ icon: "💥", name: "Impacto Arcano", desc: `Maior golpe: ${combatStats.highestHit} de dano` });

    return (
      <div className="min-h-[100dvh] h-full sm:h-[100dvh] overflow-y-auto sm:overflow-hidden relative flex items-center justify-center safe-all p-2 sm:p-4" style={{ color: T.textPrimary }}>
        {styles}{bg}
        <div
          className="modal-window relative z-10 text-center max-w-sm sm:max-w-md w-full max-h-[92dvh] overflow-y-auto custom-scrollbar rounded-2xl border p-4 sm:p-5 shadow-2xl"
          style={{
            borderColor: isWin ? `${T.gold}88` : `${T.danger}88`,
            boxShadow: isWin ? `0 0 35px ${T.gold}33` : `0 0 35px ${T.danger}22`,
          }}
        >
          <div className="text-4xl mb-1">{isWin ? "👑" : "💀"}</div>
          <h1
            className="font-serif text-[26px] sm:text-[32px] mb-1 font-black"
            style={{ color: isWin ? T.gold : T.danger, textShadow: isWin ? `0 0 24px ${T.gold}55` : "none" }}
          >
            {isWin ? (isTutorial ? t("trainingComplete") : bossEncounter ? t("archmageDefeated") : t("gloriousVictory")) : t("defeat")}
          </h1>
          <p className="font-mono text-[11px] sm:text-[12px] mb-3" style={{ color: T.textSecondary }}>
            {isWin
              ? isTutorial
                ? "Você completou as lições elementais e dominou os combos e a mana!"
                : bossEncounter
                ? `${enemy.name} curva-se perante sua maestria dos elementos!`
                : `${enemy.name} cede o duelo.`
              : `${enemy.name} permanece em pé. Ajuste sua estratégia e retorne.`}
          </p>

          {/* Combat Statistics Report Grid */}
          <div className="rounded-xl border panel-base p-3 mb-3 text-left shadow-sm" style={{ borderColor: T.borderSubtle }}>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-2 pb-1 border-b" style={{ borderColor: T.borderSubtle, color: T.gold }}>
              <span className="flex items-center gap-1.5"><span>📊</span><span>Relatório do Duelo</span></span>
              <span className="text-[10px]" style={{ color: T.textTertiary }}>{roundNum} Turnos</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
              <div className="card-surface p-1.5 rounded-lg border" style={{ borderColor: `${T.danger}44` }}>
                <div className="text-[9px] font-mono text-zinc-400">Dano Causado</div>
                <div className="font-serif text-[14px] font-black" style={{ color: T.danger }}>{combatStats.totalDamageDealt}</div>
              </div>
              <div className="card-surface p-1.5 rounded-lg border" style={{ borderColor: `${T.gold}44` }}>
                <div className="text-[9px] font-mono text-zinc-400">Maior Golpe</div>
                <div className="font-serif text-[14px] font-black" style={{ color: T.gold }}>{combatStats.highestHit}</div>
              </div>
              <div className="card-surface p-1.5 rounded-lg border" style={{ borderColor: `${T.arcane}44` }}>
                <div className="text-[9px] font-mono text-zinc-400">Combos</div>
                <div className="font-serif text-[14px] font-black" style={{ color: T.arcane }}>{combatStats.combosCount}</div>
              </div>
              <div className="card-surface p-1.5 rounded-lg border" style={{ borderColor: `${T.ice}44` }}>
                <div className="text-[9px] font-mono text-zinc-400">Críticos</div>
                <div className="font-serif text-[14px] font-black" style={{ color: T.ice }}>{combatStats.critsCount}</div>
              </div>
            </div>

            {/* MVP Skill Card */}
            {mvpSkill && (
              <div className="mt-2 pt-2 border-t flex items-center justify-between text-[11px] font-mono" style={{ borderColor: T.borderSubtle }}>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <span>⭐</span><span>Feitiço MVP:</span>
                </span>
                <span className="font-bold flex items-center gap-1" style={{ color: ELEMENTS[mvpSkill.el]?.color || T.gold }}>
                  <span>{ELEMENTS[mvpSkill.el]?.icon}</span>
                  <span>{mvpSkill.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({mvpCasts}x)</span>
                </span>
              </div>
            )}
          </div>

          {/* Badges Earned */}
          {badgesEarned.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center mb-3">
              {badgesEarned.map((b, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold shadow-sm"
                  style={{ borderColor: `${T.gold}66`, background: `${T.gold}18`, color: T.goldLight }}
                  title={b.desc}
                >
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mage XP & Level Bar */}
          <div className="rounded-xl border panel-base p-3 mb-3 text-left shadow-sm" style={{ borderColor: T.borderSubtle }}>
            <div className="flex justify-between items-center text-[12px] font-mono mb-1.5">
              <span className="font-bold" style={{ color: T.gold }}>
                🔮 Nível de Mago: Nv. {mageLevel}
              </span>
              <span className="font-bold" style={{ color: T.success }}>
                {isWin ? "+50 XP" : "+20 XP"}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full overflow-hidden border mb-1.5" style={{ background: T.bgDeep, borderColor: T.borderSubtle }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${mageLevelInfo.percent}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.warning})` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: T.textTertiary }}>
              <span>Progresso: {mageLevelInfo.currentInLevel}/{mageLevelInfo.neededForNext} XP</span>
              <span>Slots: {maxSlots}/7</span>
            </div>
          </div>

          {/* Pending Level-Up Draft Banner */}
          {pendingLevelDraft && (
            <button
              onClick={() => {}}
              className="btn-surface w-full py-2.5 px-3 rounded-xl border text-[13px] font-serif font-bold mb-3 flex items-center justify-center gap-2 animate-bounce shadow-lg"
              style={{ borderColor: T.gold, background: `${T.gold}22`, color: T.goldLight }}
            >
              <span>🌟</span>
              <span>Novo Feitiço Disponível! (Draft Nv. {pendingLevelDraft.level})</span>
              <span>✨</span>
            </button>
          )}

          {/* Victory Rewards */}
          {isWin && (
            <div
              className="rounded-xl border card-surface p-3 mb-3 flex items-center justify-between text-[12px] font-mono"
              style={{ borderColor: `${T.gold}44` }}
            >
              <span style={{ color: T.textSecondary }}>{t("shardsEarned")}:</span>
              <span className="font-bold flex items-center gap-1" style={{ color: T.gold }}>
                <span>✦</span><span>+5 Shards</span>
              </span>
            </div>
          )}

          {/* Special Boss Trial Loot */}
          {loot && loot.isBoss && (
            <div
              className="rounded-xl border-2 p-4 mb-4 relative overflow-hidden panel-elevated shadow-xl"
              style={{ borderColor: T.gold }}
            >
              <div className="text-[11px] font-mono mb-1 font-bold" style={{ color: T.gold }}>👑 RECOMPENSA DE ARQUIMAGO 👑</div>
              <div className="font-serif text-[20px] sm:text-[22px] font-bold" style={{ color: T.textPrimary }}>{loot.skill?.name}</div>
              <div className="text-[12px] font-mono mt-1" style={{ color: T.textSecondary }}>{loot.skill?.desc}</div>
              <div className="text-[11px] font-mono mt-2 font-bold" style={{ color: T.success }}>✓ Feitiço Lendário desbloqueado no seu Grimório!</div>
            </div>
          )}

          {/* Special Spell Tome Loot */}
          {loot && loot.isTome && (
            <div
              className="rounded-xl border-2 p-4 mb-4 relative overflow-hidden panel-elevated shadow-xl"
              style={{ borderColor: T.ice }}
            >
              <div className="text-[11px] font-mono mb-1 font-bold" style={{ color: T.ice }}>📖 GRIMÓRIO ARCANO ENCONTRADO! 📖</div>
              <div className="font-serif text-[20px] sm:text-[22px] font-bold" style={{ color: T.textPrimary }}>{loot.tome?.name}</div>
              <div className="text-[12px] font-mono mt-1" style={{ color: T.textSecondary }}>Aprendeu o feitiço: <strong style={{ color: T.textPrimary }}>{loot.skill?.name}</strong></div>
              <div className="text-[11px] font-mono mt-2 font-bold" style={{ color: T.success }}>✓ Feitiço adicionado permanentemente ao Grimório!</div>
            </div>
          )}

          {/* Normal Item Loot */}
          {loot && !loot.isBoss && !loot.isTome && (
            <div
              className="rounded-xl border p-4 mb-4 relative overflow-hidden card-surface shadow-md"
              style={{ borderColor: RARITY[loot.rarity].color }}
            >
              <div className="text-[11px] font-mono mb-1 font-bold" style={{ color: RARITY[loot.rarity].color }}>✦ {RARITY[loot.rarity].label} drop ✦</div>
              <div className="font-serif text-[20px] sm:text-[22px] font-bold" style={{ color: T.textPrimary }}>{loot.name}</div>
              {loot.desc && <div className="text-[12px] font-mono mt-1" style={{ color: T.textSecondary }}>{loot.desc}</div>}
              <div className="text-[11px] font-mono mt-2" style={{ color: T.textTertiary }}>Item adicionado aos seus cosméticos</div>
            </div>
          )}
          {isWin && !loot && <p className="text-[12px] font-mono mb-4" style={{ color: T.textTertiary }}>Coleção e grimório atualizados, Arquimago.</p>}

          <div className="flex gap-2.5 pt-1">
            <button
              onClick={findOpponent}
              className="btn-gold flex-1 rounded-xl py-3 font-serif text-[13px] sm:text-[14px] font-bold shadow-md"
            >
              ⚔️ {t("nextDuel")}
            </button>
            <button
              onClick={() => setPhase("loadout")}
              className="btn-surface flex-1 rounded-xl py-3 font-serif text-[13px] sm:text-[14px] font-bold transition-all"
            >
              🏰 {t("returnHub")}
            </button>
          </div>
        </div>
        {renderMatchmakingModal()}
        {renderLevelUpModal()}
        {renderMasteryCelebrationModal()}
      </div>
    );
  }

  // ================= BATTLE =================
  const menuSkills = [...player.skills, FOCUS];
  const shakeClass = screenShake === "heavy" ? "arena-shake-heavy" : screenShake === "light" ? "arena-shake-light" : "";

  return (
    <div className={`h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-between safe-all p-1 sm:p-2.5 md:p-4 ${shakeClass}`} style={{ color: "#F2EAD8" }}>
      {styles}{bg}
      {phaseTransition && <div className="phase-transition" />}
      {screenFlash === "white" && <div className="screen-flash-white" />}
      {screenFlash === "gold" && <div className="screen-flash-gold" />}
      {showRainbow && (
        <div className="fixed top-8 sm:top-12 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex items-center justify-center animate-bounce">
          <div className="text-xl sm:text-3xl font-serif text-[#FEF08A] bg-[#000000AA] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#E8B44F] filter drop-shadow-[0_0_15px_#FFF]">
            🌈✨ VITÓRIA RADIANTE! ✨🌈
          </div>
        </div>
      )}
      {showShootingStars && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              position: "absolute", top: `${i * 14}%`, right: `${i * 12}%`,
              width: 100, height: 2, background: "linear-gradient(to left, #FFF, transparent)",
              animation: `shootingStar 1.2s ease-out ${i * 0.25}s infinite`,
            }} />
          ))}
        </div>
      )}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl h-full flex flex-col justify-between overflow-hidden min-h-0">
        
        {/* Turn Countdown & Arena Header Bar */}
        <TurnCountdownBar
          turnCountdown={turnCountdown}
          maxDuration={getTodayModifier().id === "swift_duels" ? 8 : TURN_DURATION}
          roundNum={roundNum}
          currentTurn={currentTurn}
          isTimerPaused={isTimerPaused}
          onTogglePause={() => setIsTimerPaused(p => !p)}
          busy={busy}
          dailyMod={getTodayModifier()}
        />

        {/* Arena Combat Stage Area */}
        <div className="relative w-full flex-shrink-0 my-0.5 sm:my-1">
          <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-1.5 sm:gap-2.5">
            {/* Enemy Card */}
            <div
              className="card-surface rounded-2xl border p-2 sm:p-2.5 md:p-3 flex gap-2 sm:gap-3 items-center relative order-1 landscape:order-2 md:order-2 transition-all shadow-lg"
              style={{
                borderColor: currentTurn === "enemy" ? T.danger : T.borderSubtle,
                boxShadow: currentTurn === "enemy" ? `0 0 20px ${T.danger}33` : "0 4px 20px #00000044",
              }}
            >
              {floats.filter(f => f.side === "e").map(f => (
                <div
                  key={f.id}
                  className="dmgFloat font-mono absolute flex flex-col items-center pointer-events-none"
                  style={{
                    left: `${f.left}%`,
                    top: 6,
                    color: f.color,
                    fontSize: f.big ? 26 : 18,
                    fontWeight: 800,
                    WebkitTextStroke: "1.2px #000000",
                    textShadow: "0 2px 10px #000000",
                    zIndex: 25,
                  }}
                >
                  {(f.badge || f.big) && (
                    <span
                      className="text-[10px] font-black tracking-widest px-1.5 py-0.2 rounded border transform -rotate-6 animate-bounce"
                      style={{ background: "#000000CC", borderColor: f.badgeColor || T.gold, color: f.badgeColor || T.gold }}
                    >
                      {f.badge || "CRIT!"}
                    </span>
                  )}
                  <span>{f.text}</span>
                </div>
              ))}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1 flex-wrap">
                  <span className="font-serif text-xs sm:text-sm md:text-base font-bold truncate" style={{ color: T.textPrimary }}>{enemy.name}</span>
                  <ElementBadge el={enemy.affinity} />
                  <StatusIcons mage={enemy} />
                </div>

                <div className="text-[10px] sm:text-[11px] font-mono mb-1 sm:mb-1.5 truncate opacity-75" style={{ color: RARITY[enemy.staffGear.rarity].color }}>
                  {enemy.staffGear.name}{enemy.relic ? ` · ${enemy.relic.name}` : ""}{enemy.offhand ? ` · ${enemy.offhand.name}` : ""}
                </div>

                {/* Health & Mana with integrated Ward */}
                <CombatBar value={enemy.hp} max={enemy.maxHp} shield={enemy.shield} type="hp" label="Health" />
                <CombatBar value={enemy.mana} max={MAX_MANA} type="mana" label="Mana" />
              </div>

              <div className="relative flex-shrink-0">
                <div className="scale-75 sm:scale-90 md:scale-100 transform origin-center">
                  <MageSprite mage={enemy} facing="left" hurt={hurtE} casting={castE} damageFlash={damageFlashE} size={0.96} />
                </div>
              </div>
            </div>

            {/* Player Card */}
            <div
              className="card-surface rounded-2xl border p-2 sm:p-2.5 md:p-3 flex gap-2 sm:gap-3 items-center relative order-2 landscape:order-1 md:order-1 transition-all shadow-lg"
              style={{
                borderColor: currentTurn === "player" ? T.gold : T.borderSubtle,
                boxShadow: currentTurn === "player" ? `0 0 20px ${T.gold}33` : "0 4px 20px #00000044",
              }}
            >
              {floats.filter(f => f.side === "p").map(f => (
                <div
                  key={f.id}
                  className="dmgFloat font-mono absolute flex flex-col items-center pointer-events-none"
                  style={{
                    right: `${f.left}%`,
                    top: 6,
                    color: f.color,
                    fontSize: f.big ? 26 : 18,
                    fontWeight: 800,
                    WebkitTextStroke: "1.2px #000000",
                    textShadow: "0 2px 10px #000000",
                    zIndex: 25,
                  }}
                >
                  {(f.badge || f.big) && (
                    <span
                      className="text-[10px] font-black tracking-widest px-1.5 py-0.2 rounded border transform -rotate-6 animate-bounce"
                      style={{ background: "#000000CC", borderColor: f.badgeColor || T.gold, color: f.badgeColor || T.gold }}
                    >
                      {f.badge || "CRIT!"}
                    </span>
                  )}
                  <span>{f.text}</span>
                </div>
              ))}

              <div className="relative flex-shrink-0">
                <div className="scale-75 sm:scale-90 md:scale-100 transform origin-center">
                  <MageSprite mage={player} facing="right" hurt={hurtP} casting={castP} damageFlash={damageFlashP} size={0.96} easterEgg={easterEgg} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1 flex-wrap">
                  <span className="font-serif text-xs sm:text-sm md:text-base font-bold truncate" style={{ color: T.gold }}>
                    {player.name}
                  </span>
                  <ElementBadge el={player.affinity} />
                  <StatusIcons mage={player} />
                </div>

                <div className="text-[10px] sm:text-[11px] font-mono mb-1 sm:mb-1.5 truncate opacity-75" style={{ color: player.staffGear ? RARITY[player.staffGear.rarity].color : T.textMuted }}>
                  {player.staffGear?.name || "No staff"}{player.relic ? ` · ${player.relic.name}` : ""}{player.offhand ? ` · ${player.offhand.name}` : ""}
                </div>

                {/* Health & Mana with integrated Ward */}
                <CombatBar value={player.hp} max={player.maxHp} shield={player.shield} type="hp" label="Health" />
                <CombatBar value={player.mana} max={MAX_MANA} type="mana" label="Mana" />
              </div>
            </div>
          </div>

          {/* Spell Visual FX Layers */}
          <SpellProjectile spell={activeSpell} />
          {impactEffects.map(imp => (
            <ImpactFX key={imp.id} impact={imp} />
          ))}
          {selfCastEffects.map(sc => (
            <SelfCastFX key={sc.id} selfCast={sc} />
          ))}
        </div>

        {/* Arena Controls Area (Mobile Landscape / Desktop Split) */}
        <div className="flex-1 min-h-0 flex flex-col landscape:grid landscape:grid-cols-12 md:grid md:grid-cols-12 gap-1.5 sm:gap-2 md:gap-3 my-0.5 sm:my-1 md:my-1.5 overflow-hidden">
          {/* Battle Chronicle / Combat Log */}
          <div className="flex-1 min-h-[44px] max-h-[64px] landscape:max-h-none landscape:h-full landscape:col-span-4 md:max-h-none md:h-full md:col-span-4 mb-1 landscape:mb-0 md:mb-0 overflow-hidden">
            <ArcaneChronicle log={log} logRef={logRef} />
          </div>

          {/* Skills Deck & Battle Actions */}
          <div className="landscape:col-span-8 md:col-span-8 flex flex-col justify-between min-h-0 flex-1 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 flex-1 items-stretch overflow-y-auto custom-scrollbar overscroll-contain p-0.5 pb-2">
              {menuSkills.map((s, idx) => (
                <ModernSkillCard
                  key={s.id}
                  skill={s}
                  hotkey={String(idx + 1)}
                  element={ELEMENTS[s.el]}
                  player={player}
                  busy={busy}
                  onClick={() => playerAction(s)}
                />
              ))}
            </div>

            {/* Bottom bar with tips, quick focus button, and surrender button */}
            <div className="flex items-center justify-between mt-1 pt-1.5 border-t text-[10px] sm:text-[11px] font-mono flex-shrink-0" style={{ borderColor: T.borderSubtle, color: T.textSecondary }}>
              <div className="flex items-center gap-2 min-w-0 truncate">
                <span className="truncate opacity-75 hidden xs:inline">
                  [1-{menuSkills.length}] Feitiços · +{REGEN} mana/t · [Espaço] Foco (+{FOCUS.restore})
                </span>
                <span className="truncate opacity-75 xs:hidden">
                  +{REGEN} mana/t
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-1.5 sm:ml-2">
                <button
                  onClick={() => playerAction(FOCUS)}
                  disabled={busy || currentTurn !== "player"}
                  className="btn-surface px-2 sm:px-3 py-1 rounded-lg font-mono text-[10px] sm:text-[11px] font-bold transition-all disabled:opacity-40 shadow-sm flex items-center gap-1"
                  style={{ borderColor: `${T.ice}66`, color: T.ice }}
                  title={`Recuperar ${FOCUS.restore} de Mana (Tecla Espaço)`}
                >
                  <span>⚡</span>
                  <span className="hidden sm:inline">Foco (+{FOCUS.restore}) [Espaço]</span>
                  <span className="sm:hidden">Foco (+{FOCUS.restore})</span>
                </button>
                <button
                  onClick={() => setShowSurrenderModal(true)}
                  disabled={busy}
                  className="btn-danger px-2 sm:px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-[11px] font-bold transition-colors"
                >
                  Render-se
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <SurrenderModal
        isOpen={showSurrenderModal}
        onConfirm={surrender}
        onCancel={() => setShowSurrenderModal(false)}
        busy={busy}
      />
      {renderChatModal()}
      {renderMasteryCelebrationModal()}
    </div>
  );
}

/*
================================================================================
                      SISTEMA DE LOJA COSMÉTICA (MAGE DUEL)
================================================================================

1. CHECKLIST DE IMPLEMENTAÇÃO REALIZADA:
--------------------------------------------------------------------------------
[✓] DEV_UNLOCK_ALL = false: Progressão padrão ativada, bloqueando itens cosméticos.
[✓] TABELA SHOP_ITEMS: 21 itens visuais existentes (cabelos, olhos, joias, luvas,
    capas, asas, robes, pets) mapeados com categorias e preços em Arcane Shards (✦).
[✓] START_OWNED: Cosméticos da loja removidos da lista inicial para começarem bloqueados.
[✓] PERSISTÊNCIA COMPLETA:
    - Saldo `shards` e conjunto `premiumOwned` salvos no localStorage (SAVE_KEY).
    - Suporte a recarga automática no carregamento inicial (`loadSave()`).
[✓] 5ª ABA NO LOADOUT: Aba "Loja" integrada à grade de 5 colunas com ícone "✦".
[✓] PAINEL DA LOJA (tab === "shop"):
    - Banner Anti-P2W: "⚔️ Cosmético apenas — não afeta o combate".
    - Indicador de saldo destacado com efeito de brilho e botão de recarga rápida.
    - Botão de anúncio recompensado (+50 ✦ com simulação de 3s e progressão visual).
    - Filtros por categoria: Todas, Cabelo, Olhos, Joias, Roupas, Asas, Pets.
    - Reuso 100% fiel do componente <RarityCard> com legendas customizadas e bloqueio visual.
[✓] SISTEMA DE COMPRA: Função `buyCosmetic(itemId)` debitando Shards e liberando o item
    em `owned` e `premiumOwned`.
[✓] RECOMPENSA DE COMBATE: +5 ✦ Arcane Shards creditados a cada vitória em `finishBattle(win)`
    e destacados na tela de resultado (phase === "result").
[✓] MODAL DO COFRE ARCANO (renderShardShopModal):
    - Design idêntico ao modal de matchmaking (fundo escuro borrado, bordas douradas).
    - 3 pacotes de Shards (100 ✦ por R$ 4,99, 500 ✦ por R$ 19,99, 1200 ✦ por R$ 39,99).
    - Estado de carregamento com sigilo giratório durante o processamento do pagamento.
[✓] MODAL DE ANÚNCIO (renderRewardedAdModal):
    - Contador regressivo de 3 segundos com barra de progresso em tempo real.
    - Concessão garantida de +50 ✦ com feedback de sucesso.
[✓] ATALHO DIRETO DA APARÊNCIA: Clicar em uma opção de cabelo/olho/joia bloqueada
    na aba de Aparência redireciona diretamente para a Loja na categoria correspondente.

--------------------------------------------------------------------------------
2. GUIA DE INTEGRAÇÃO COM BACKEND STRIPE (CHECKOUT & WEBHOOK):
--------------------------------------------------------------------------------
Passo 1: Criar o endpoint de criação de sessão no seu servidor (ex: Node.js / Express):

  // server.js
  import Stripe from "stripe";
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  app.post("/api/create-checkout-session", async (req, res) => {
    const { packId, playerId } = req.body;
    const PACKS = {
      pack_100:  { amount: 100,  cents: 499,  name: "Bolsa de Shards (100 ✦)" },
      pack_500:  { amount: 500,  cents: 1999, name: "Baú Arcano (500 ✦)" },
      pack_1200: { amount: 1200, cents: 3999, name: "Cofre dos Arquimagos (1200 ✦)" },
    };
    const pack = PACKS[packId];
    if (!pack) return res.status(400).json({ error: "Pacote inválido" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "brl",
          product_data: { name: pack.name },
          unit_amount: pack.cents,
        },
        quantity: 1,
      }],
      mode: "payment",
      metadata: { playerId, packId, shardsAmount: pack.amount },
      success_url: `${req.headers.origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/?payment=cancelled`,
    });

    res.json({ url: session.url });
  });

Passo 2: Configurar o Webhook de validação de pagamento:

  app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { playerId, shardsAmount } = session.metadata;
      // Creditar shardsAmount no banco de dados do jogador playerId
      creditShardsToPlayer(playerId, parseInt(shardsAmount, 10));
    }
    res.json({ received: true });
  });

Passo 3: Atualizar `purchaseShardPack` no frontend:
  Substituir o setTimeout simulado por:
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packId, playerId: mageName })
    });
    const { url } = await res.json();
    window.location.href = url;

--------------------------------------------------------------------------------
3. NOTAS DE BALANCEAMENTO ECONÔMICO:
--------------------------------------------------------------------------------
- Vitória em Duelo: +5 ✦ (incentiva gameplay ativo e grind gratuito).
- Anúncio Recompensado: +50 ✦ a cada visualização (idealmente com cooldown de 5 min em produção).
- Itens Pequenos (Cabelos, Olhos, Joias): 60 a 100 ✦ (~1 a 2 anúncios ou 12-20 vitórias).
- Itens Médios (Luvas, Capas, Pets menores): 120 a 500 ✦.
- Itens Exclusivos (Asas Lendárias, Robes Celestiais): 700 a 900 ✦ (~R$ 20 a R$ 30 via loja de Shards).
- Garantia Anti-P2W: NENHUM item comercializado na loja altera atributos como HP, Mana, Dano ou Crítico.
================================================================================
*/
