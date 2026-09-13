import React, { useState } from "react";

// ================= RARIDADES DE TÍTULOS E CONQUISTAS =================
export const JOURNEY_RARITY = {
  common: {
    label_pt: "Comum",
    label_en: "Common",
    color: "#94A3B8",
    bg: "rgba(148, 163, 184, 0.15)",
    border: "rgba(148, 163, 184, 0.4)",
    glow: "none",
  },
  rare: {
    label_pt: "Raro",
    label_en: "Rare",
    color: "#38BDF8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.5)",
    glow: "0 0 10px rgba(56, 189, 248, 0.35)",
  },
  epic: {
    label_pt: "Épico",
    label_en: "Epic",
    color: "#C084FC",
    bg: "rgba(192, 132, 252, 0.16)",
    border: "rgba(192, 132, 252, 0.55)",
    glow: "0 0 14px rgba(192, 132, 252, 0.45)",
  },
  legendary: {
    label_pt: "Lendário",
    label_en: "Legendary",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.18)",
    border: "rgba(245, 158, 11, 0.65)",
    glow: "0 0 16px rgba(245, 158, 11, 0.55)",
  },
  mythic: {
    label_pt: "Mítico",
    label_en: "Mythic",
    color: "#EC4899",
    bg: "rgba(236, 72, 153, 0.2)",
    border: "rgba(244, 114, 182, 0.75)",
    glow: "0 0 20px rgba(236, 72, 153, 0.65)",
  },
};

// ================= CATÁLOGO DE TÍTULOS ARCANOS =================
export const TITLES = [
  {
    id: "title_apprentice",
    name_pt: "Aprendiz de Duelo",
    name_en: "Duel Apprentice",
    prefix_pt: "O Aprendiz",
    prefix_en: "The Apprentice",
    rarity: "common",
    icon: "🌱",
    color: "#94A3B8",
    desc_pt: "O início da caminhada mágica. Todo grande arquimago já empunhou um cajado pela primeira vez.",
    desc_en: "The beginning of the magical path. Every great archmage once held a staff for the first time.",
    source_pt: "Disponível por padrão para todos os duelistas.",
    source_en: "Available by default to all duelists.",
  },
  {
    id: "title_awakened",
    name_pt: "A Centelha Desperta",
    name_en: "The Awakened Spark",
    prefix_pt: "O Desperto",
    prefix_en: "The Awakened",
    rarity: "rare",
    icon: "✨",
    color: "#38BDF8",
    desc_pt: "A energia das linhas de ley ressoa em seu peito. Seu poder mágico não pode mais ser ignorado.",
    desc_en: "Leyline energy echoes in your chest. Your arcane gift can no longer be denied.",
    source_pt: "Recompensa do Capítulo I da Jornada do Herói.",
    source_en: "Hero's Journey Chapter I Reward.",
  },
  {
    id: "title_pyromancer",
    name_pt: "Arauto das Chamas",
    name_en: "Flame Herald",
    prefix_pt: "O Ígneo",
    prefix_en: "The Pyromancer",
    rarity: "rare",
    icon: "🔥",
    color: "#F87171",
    desc_pt: "Invocador das labaredas eternas de Ignis. Queima as barreiras dos rivais com calor implacável.",
    desc_en: "Channeler of eternal flames. Melts through opponent wards with relentless blaze.",
    source_pt: "Vença 5 duelos utilizando feitiços do elemento Fogo.",
    source_en: "Win 5 duels using Fire elemental spells.",
  },
  {
    id: "title_frostlord",
    name_pt: "Senhor da Geada",
    name_en: "Frost Weaver",
    prefix_pt: "O Glacial",
    prefix_en: "The Frostborn",
    rarity: "rare",
    icon: "❄️",
    color: "#67E8F9",
    desc_pt: "Seu coração é tão frio e afiado quanto as pontas de gelo dos picos boreais.",
    desc_en: "Your mind is as razor-sharp and cold as the frost peaks of the north.",
    source_pt: "Vença 5 duelos utilizando feitiços do elemento Gelo.",
    source_en: "Win 5 duels using Ice elemental spells.",
  },
  {
    id: "title_earthwarden",
    name_pt: "Guardião da Terra Viva",
    name_en: "Verdant Warden",
    prefix_pt: "O Silvestre",
    prefix_en: "The Verdant",
    rarity: "rare",
    icon: "🌿",
    color: "#4ADE80",
    desc_pt: "Raízes antigas e seiva primordial alimentam suas defesas e feitiços curativos.",
    desc_en: "Ancient roots and primordial sap fuel your defenses and healing wards.",
    source_pt: "Vença 5 duelos utilizando feitiços de Natureza.",
    source_en: "Win 5 duels using Nature elemental spells.",
  },
  {
    id: "title_disciple",
    name_pt: "Discípulo do Santuário",
    name_en: "Sanctum Disciple",
    prefix_pt: "O Discípulo",
    prefix_en: "The Disciple",
    rarity: "rare",
    icon: "📜",
    color: "#A78BFA",
    desc_pt: "Reconhecido pelo sábio Eldrin e pelo mestre Brokk como um aprendiz de rara determinação.",
    desc_en: "Acknowledged by Eldrin and Master Brokk as a mage of uncommon will.",
    source_pt: "Recompensa do Capítulo II da Jornada do Herói.",
    source_en: "Hero's Journey Chapter II Reward.",
  },
  {
    id: "title_smithmaster",
    name_pt: "Mestre da Bigorna Mágica",
    name_en: "Forge Master",
    prefix_pt: "O Forjador",
    prefix_en: "The Smith",
    rarity: "epic",
    icon: "🔨",
    color: "#F59E0B",
    desc_pt: "Seu aço e cristal são temperados no fogo sagrado de Brokk. Nenhum equipamento é fraco em suas mãos.",
    desc_en: "Your gear is tempered in the sacred forge fire. No equipment is ordinary in your grasp.",
    source_pt: "Forje 3 equipamentos ou poções na Forja / Alquimia.",
    source_en: "Craft 3 items in the Forge or Alchemy Sanctum.",
  },
  {
    id: "title_elementalist",
    name_pt: "Senhor dos Elementos",
    name_en: "Lord of Elements",
    prefix_pt: "O Elementalista",
    prefix_en: "The Elementalist",
    rarity: "epic",
    icon: "🌀",
    color: "#38BDF8",
    desc_pt: "Fogo, gelo, folhas e éter dançam em perfeita harmonia em seu repertório de duelos.",
    desc_en: "Fire, frost, flora, and ether dance in absolute equilibrium at your command.",
    source_pt: "Recompensa do Capítulo III da Jornada do Herói.",
    source_en: "Hero's Journey Chapter III Reward.",
  },
  {
    id: "title_abyss_delver",
    name_pt: "Desbravador do Abismo",
    name_en: "Abyss Delver",
    prefix_pt: "O Desbravador",
    prefix_en: "The Abyss Delver",
    rarity: "epic",
    icon: "🌌",
    color: "#C084FC",
    desc_pt: "Desceu às catacumbas etéreas mais profundas e retornou com relíquias esquecidas.",
    desc_en: "Descended into the deepest astral catacombs and returned with forbidden relics.",
    source_pt: "Recompensa do Capítulo IV da Jornada do Herói.",
    source_en: "Hero's Journey Chapter IV Reward.",
  },
  {
    id: "title_combo_king",
    name_pt: "Cadência Implacável",
    name_en: "Spellweaver",
    prefix_pt: "O Veloz",
    prefix_en: "The Spellweaver",
    rarity: "epic",
    icon: "⚡",
    color: "#FDE047",
    desc_pt: "Seus encantamentos se sucedem com velocidade vertiginosa, sem dar trégua ao oponente.",
    desc_en: "Your spell incantations chain with dizzying speed, offering zero respite.",
    source_pt: "Conquista: Dispare sequências rápidas em duelo.",
    source_en: "Achievement: Rapid cast combos in duel.",
  },
  {
    id: "title_unbroken",
    name_pt: "O Inquebrantável",
    name_en: "The Unbroken",
    prefix_pt: "O Inabalável",
    prefix_en: "The Unbroken",
    rarity: "epic",
    icon: "🛡️",
    color: "#E2E8F0",
    desc_pt: "Já encarou a beira da derrota com menos de 20% de vida e deu a volta por cima como um verdadeiro herói.",
    desc_en: "Faced the brink of defeat with under 20% health and turned the tide like a true hero.",
    source_pt: "Recompensa do Capítulo V da Jornada do Herói.",
    source_en: "Hero's Journey Chapter V Reward.",
  },
  {
    id: "title_boss_slayer",
    name_pt: "Carrasco de Titãs",
    name_en: "Titan Slayer",
    prefix_pt: "O Algoz de Titãs",
    prefix_en: "The Titan Bane",
    rarity: "legendary",
    icon: "👑",
    color: "#F59E0B",
    desc_pt: "Derrotou os colossos ancestrais das Provas de Chefe e roubou seus segredos proibidos.",
    desc_en: "Slew the ancient colossi in the Boss Trials and claimed their deepest secrets.",
    source_pt: "Derrote um Chefe lendário nas Provas de Treinamento.",
    source_en: "Defeat a legendary Boss in Boss Trials.",
  },
  {
    id: "title_living_legend",
    name_pt: "Lenda Viva dos Salões",
    name_en: "Living Legend",
    prefix_pt: "A Lenda",
    prefix_en: "The Legend",
    rarity: "legendary",
    icon: "🌟",
    color: "#FBBF24",
    desc_pt: "Biógrafos e poetas cantam sobre seus duelos nas tavernas e anfiteatros de todo o continente.",
    desc_en: "Bards and historians sing of your duels in every hall and tavern across the realm.",
    source_pt: "Recompensa do Capítulo VI da Jornada do Herói.",
    source_en: "Hero's Journey Chapter VI Reward.",
  },
  {
    id: "title_grandmaster",
    name_pt: "Grão-Mestre da Arena",
    name_en: "Arena Grandmaster",
    prefix_pt: "O Soberano",
    prefix_en: "The Grandmaster",
    rarity: "legendary",
    icon: "💎",
    color: "#38BDF8",
    desc_pt: "Alcançou o pináculo do ranking competitivo e gravou seu nome entre os melhores duelistas da era.",
    desc_en: "Reached the pinnacle of the competitive ladder and etched your name among the era's elite.",
    source_pt: "Alcance 1500+ Troféus no Ranking Arcano.",
    source_en: "Reach 1500+ Trophies in the Arcane Ladder.",
  },
  {
    id: "title_eternal_archmage",
    name_pt: "O Arquimago Eterno",
    name_en: "The Eternal Archmage",
    prefix_pt: "Arquimago Eterno",
    prefix_en: "Eternal Archmage",
    rarity: "mythic",
    icon: "🔮",
    color: "#EC4899",
    desc_pt: "Completou a Jornada do Herói por inteiro. Sua essência agora é una com as estrelas e a trama primordial do universo.",
    desc_en: "Completed the entire Hero's Journey. Your essence is now woven with the astral cosmos.",
    source_pt: "Conclua o Capítulo VII da Jornada do Herói.",
    source_en: "Complete Chapter VII of the Hero's Journey.",
  },
];

export function findTitle(id) {
  return TITLES.find(t => t.id === id) || TITLES[0];
}

// ================= CAPÍTULOS DA JORNADA DO HERÓI =================
export const HERO_JOURNEY_CHAPTERS = [
  {
    chapterNumber: 1,
    id: "chapter_1",
    title_pt: "O Despertar da Centelha",
    title_en: "The Awakening Spark",
    subtitle_pt: "O Chamado da Magia em Eldoria",
    subtitle_en: "The Call of Magic in Eldoria",
    lore_pt: "Sob o luar argênteo das planícies astrais, você descobre que as faíscas que saltam dos seus dedos não são acidentais. A Torre do Duelo aguarda os primeiros passos do seu destino.",
    lore_en: "Beneath the silver moon of the astral plains, you realize the sparks leaping from your fingers are no accident. The Duel Tower awaits the first footsteps of your destiny.",
    icon: "🌱",
    color: "#38BDF8",
    rewardShards: 50,
    rewardTitleId: "title_awakened",
    quests: [
      {
        id: "ch1_q1",
        name_pt: "O Primeiro Vínculo",
        name_en: "The First Bond",
        desc_pt: "Vença seu primeiro duelo (Ranqueado ou Treinamento).",
        desc_en: "Win your first duel (Ranked or Practice).",
        target: 1,
        statKey: "wins",
      },
      {
        id: "ch1_q2",
        name_pt: "Grimório Montado",
        name_en: "Prepared Grimoire",
        desc_pt: "Tenha pelo menos 4 feitiços equipados para o combate.",
        desc_en: "Have at least 4 spells equipped for battle.",
        target: 4,
        statKey: "equippedSpells",
      },
      {
        id: "ch1_q3",
        name_pt: "Centelha de Combate",
        name_en: "Combat Spark",
        desc_pt: "Acumule 100 de dano mágico desferido em duelos.",
        desc_en: "Deal a cumulative total of 100 magic damage in duels.",
        target: 100,
        statKey: "totalDamageDealt",
      },
    ],
  },
  {
    chapterNumber: 2,
    id: "chapter_2",
    title_pt: "O Encontro com o Mentor",
    title_en: "Meeting the Mentors",
    subtitle_pt: "Os Segredos da Forja e do Caldeirão",
    subtitle_en: "Secrets of Forge and Cauldron",
    lore_pt: "O eremita Eldrin e o mestre ferreiro Brokk percebem seu talento bruto. Para que uma chama não se apague ao vento, é preciso forjar seu próprio artefato e dominar elixires ancestrais.",
    lore_en: "Hermit Eldrin and Master Blacksmith Brokk recognize your raw gift. For a flame to endure the gale, one must forge their own gear and master ancient draughts.",
    icon: "📜",
    color: "#A78BFA",
    rewardShards: 75,
    rewardTitleId: "title_disciple",
    quests: [
      {
        id: "ch2_q1",
        name_pt: "A Bigorna Mágica",
        name_en: "The Arcane Anvil",
        desc_pt: "Forje pelo menos 1 equipamento ou anel com Brokk.",
        desc_en: "Craft at least 1 piece of gear or ring with Brokk.",
        target: 1,
        statKey: "itemsCrafted",
      },
      {
        id: "ch2_q2",
        name_pt: "Elixir do Conhecimento",
        name_en: "Elixir of Knowledge",
        desc_pt: "Crie uma poção ou aprenda um feitiço alquímico com Lyra.",
        desc_en: "Brew a potion or learn an alchemical spell with Lyra.",
        target: 1,
        statKey: "alchemyCrafted",
      },
      {
        id: "ch2_q3",
        name_pt: "Ritmo Firme",
        name_en: "Steady Rhythm",
        desc_pt: "Alcance uma sequência de 2 vitórias consecutivas.",
        desc_en: "Achieve a win streak of 2 consecutive victories.",
        target: 2,
        statKey: "highestWinStreak",
      },
    ],
  },
  {
    chapterNumber: 3,
    id: "chapter_3",
    title_pt: "Provas dos Quatro Elementos",
    title_en: "Trials of the Four Elements",
    subtitle_pt: "Fogo, Gelo, Terra e Éter",
    subtitle_en: "Fire, Ice, Flora, and Ether",
    lore_pt: "As tempestades dos picos gelados e as torrentes dos vulcões de magma rugem ao seu redor. Somente quem abraça os contrastes elementais alcança a verdadeira sabedoria.",
    lore_en: "Storms of jagged glaciers and torrents of magma volcanoes howl around you. Only those who embrace elemental harmony attain genuine mastery.",
    icon: "🌀",
    color: "#38BDF8",
    rewardShards: 100,
    rewardTitleId: "title_elementalist",
    quests: [
      {
        id: "ch3_q1",
        name_pt: "Crítico Fulminante",
        name_en: "Devastating Crit",
        desc_pt: "Acerte pelo menos 5 golpes críticos em duelos.",
        desc_en: "Land at least 5 critical strikes in duels.",
        target: 5,
        statKey: "critsLanded",
      },
      {
        id: "ch3_q2",
        name_pt: "Equilíbrio Elemental",
        name_en: "Elemental Balance",
        desc_pt: "Vença 5 duelos contra oponentes de elementos diversos.",
        desc_en: "Win 5 duels against opponents of diverse elements.",
        target: 5,
        statKey: "wins",
      },
      {
        id: "ch3_q3",
        name_pt: "Resiliência Pura",
        name_en: "Pure Resilience",
        desc_pt: "Vença um duelo com 60% ou mais de vida restante.",
        desc_en: "Win a duel with 60% or more health remaining.",
        target: 1,
        statKey: "highHpWins",
      },
    ],
  },
  {
    chapterNumber: 4,
    id: "chapter_4",
    title_pt: "A Caverna Mais Profunda",
    title_en: "The Inmost Cave",
    subtitle_pt: "O Abismo das Relíquias Perdidas",
    subtitle_en: "Abyss of Lost Relics",
    lore_pt: "Você penetra nas catacumbas esquecidas sob as ruínas da antiga torre. No breu absoluto, monstros e sombras testam se sua coragem é tão afiada quanto sua varinha.",
    lore_en: "You descend into forgotten catacombs under ancient spire ruins. In absolute gloom, shadowfiends test whether your courage matches your arcane staff.",
    icon: "🌌",
    color: "#C084FC",
    rewardShards: 125,
    rewardTitleId: "title_abyss_delver",
    quests: [
      {
        id: "ch4_q1",
        name_pt: "Portador de Relíquia",
        name_en: "Relic Wielder",
        desc_pt: "Equipe uma Relíquia ou Amuleto no seu mago.",
        desc_en: "Equip a Relic or Amulet on your mage.",
        target: 1,
        statKey: "hasRelicEquipped",
      },
      {
        id: "ch4_q2",
        name_pt: "Ascensão no Ranking",
        name_en: "Rank Ascendant",
        desc_pt: "Alcance 500+ Troféus na liga ranqueada (Adepto).",
        desc_en: "Reach 500+ Trophies in the ranked ladder (Adept).",
        target: 500,
        statKey: "trophies",
      },
      {
        id: "ch4_q3",
        name_pt: "Colecionador de Feitiços",
        name_en: "Spell Collector",
        desc_pt: "Desbloqueie pelo menos 8 feitiços no seu Grimório.",
        desc_en: "Unlock at least 8 spells in your Grimoire.",
        target: 8,
        statKey: "unlockedSpellsCount",
      },
    ],
  },
  {
    chapterNumber: 5,
    id: "chapter_5",
    title_pt: "A Suprema Provação",
    title_en: "The Supreme Ordeal",
    subtitle_pt: "Face a Face com a Morte Arcana",
    subtitle_en: "Face to Face with Arcane Peril",
    lore_pt: "Ferido e sem mana, a escuridão parecia certa. Mas no instante mais sombrio, você encontrou a centelha inquebrantável que diferencia um mero conjurador de uma lenda.",
    lore_en: "Battered and drained, darkness felt inevitable. Yet in the bleakest instant, you uncovered the indomitable spark separating a mere conjurer from a legend.",
    icon: "🛡️",
    color: "#F59E0B",
    rewardShards: 150,
    rewardTitleId: "title_unbroken",
    quests: [
      {
        id: "ch5_q1",
        name_pt: "A Virada do Destino",
        name_en: "Turn of the Tide",
        desc_pt: "Vença uma partida após ficar com menos de 25% de vida.",
        desc_en: "Win a match after dropping below 25% health.",
        target: 1,
        statKey: "clutchWins",
      },
      {
        id: "ch5_q2",
        name_pt: "Veterano dos Duelos",
        name_en: "Duel Veteran",
        desc_pt: "Conquiste 12 vitórias no total.",
        desc_en: "Achieve 12 total victories.",
        target: 12,
        statKey: "wins",
      },
      {
        id: "ch5_q3",
        name_pt: "Mestre Forjador",
        name_en: "Master Craftsman",
        desc_pt: "Crie ou forje 4 itens na Forja ou Alquimia.",
        desc_en: "Craft or brew 4 items in the Forge or Alchemy Sanctum.",
        target: 4,
        statKey: "totalCrafts",
      },
    ],
  },
  {
    chapterNumber: 6,
    id: "chapter_6",
    title_pt: "O Retorno Glorioso",
    title_en: "The Grand Return",
    subtitle_pt: "O Renome que Ecoa pelos Salões",
    subtitle_en: "Renown Echoing Through Arcane Halls",
    lore_pt: "Você retorna aos grandes anfiteatros. Os jovens aprendizes sussurram seu nome com reverência, e os magister da academia curvam-se diante de sua mestria.",
    lore_en: "You return to the great amphitheaters. Young apprentices whisper your name in awe, and academy magisters bow to your undeniable mastery.",
    icon: "🌟",
    color: "#FBBF24",
    rewardShards: 200,
    rewardTitleId: "title_living_legend",
    quests: [
      {
        id: "ch6_q1",
        name_pt: "Muralha Implacável",
        name_en: "Unstoppable Momentum",
        desc_pt: "Alcance uma sequência heroica de 4 vitórias consecutivas.",
        desc_en: "Achieve a heroic win streak of 4 consecutive victories.",
        target: 4,
        statKey: "highestWinStreak",
      },
      {
        id: "ch6_q2",
        name_pt: "Caçador de Titãs",
        name_en: "Titan Hunter",
        desc_pt: "Derrote 1 Chefe nas Provas de Chefe ou vença um rival de 1000+ troféus.",
        desc_en: "Defeat 1 Boss in Boss Trials or beat a rival with 1000+ trophies.",
        target: 1,
        statKey: "bossesDefeatedCount",
      },
      {
        id: "ch6_q3",
        name_pt: "Cofre Mágico",
        name_en: "Arcane Vault",
        desc_pt: "Tenha pelo menos 6 itens e joias em sua posse.",
        desc_en: "Possess at least 6 gear items and jewels.",
        target: 6,
        statKey: "ownedItemsCount",
      },
    ],
  },
  {
    chapterNumber: 7,
    id: "chapter_7",
    title_pt: "O Arquimago Eterno",
    title_en: "The Eternal Archmage",
    subtitle_pt: "A Transcendência Cósmica",
    subtitle_en: "Cosmic Transcendence",
    lore_pt: "O plano mortal já não limita sua sabedoria. Seu cajado comanda cometas e o próprio fluxo do tempo. Você não é mais apenas um duelista: é a própria lenda viva.",
    lore_en: "The mortal plane no longer limits your wisdom. Your staff commands comets and the flow of time itself. You are no longer just a duelist: you are the myth.",
    icon: "🔮",
    color: "#EC4899",
    rewardShards: 350,
    rewardTitleId: "title_eternal_archmage",
    quests: [
      {
        id: "ch7_q1",
        name_pt: "Soberano do Ranking",
        name_en: "Ladder Sovereign",
        desc_pt: "Alcance 1200+ Troféus no Ranking Arcano.",
        desc_en: "Reach 1200+ Trophies in the Arcane Ladder.",
        target: 1200,
        statKey: "trophies",
      },
      {
        id: "ch7_q2",
        name_pt: "Triunfo dos Duelos",
        name_en: "Triumph of Duels",
        desc_pt: "Conquiste 25 vitórias totais na sua carreira mágica.",
        desc_en: "Achieve 25 total career victories in your magical journey.",
        target: 25,
        statKey: "wins",
      },
      {
        id: "ch7_q3",
        name_pt: "Arsenal Lendário",
        name_en: "Legendary Arsenal",
        desc_pt: "Desbloqueie pelo menos 12 feitiços e forje 5 itens.",
        desc_en: "Unlock at least 12 spells and craft 5 items.",
        target: 12,
        statKey: "unlockedSpellsCount",
      },
    ],
  },
];

// ================= CATÁLOGO COMPLETO DE CONQUISTAS =================
export const ACHIEVEMENTS = [
  // --- COMBATE ---
  {
    id: "ach_first_blood",
    category: "combat",
    name_pt: "Primeiro Sangue Arcano",
    name_en: "First Arcane Blood",
    desc_pt: "Vença seu primeiro duelo de magos.",
    desc_en: "Win your very first mage duel.",
    icon: "🩸",
    rarity: "common",
    statKey: "wins",
    target: 1,
    rewardShards: 20,
  },
  {
    id: "ach_win_5",
    category: "combat",
    name_pt: "Conquistador das Arenas",
    name_en: "Arena Conqueror",
    desc_pt: "Conquiste 5 vitórias em duelos.",
    desc_en: "Claim 5 duel victories.",
    icon: "⚔️",
    rarity: "rare",
    statKey: "wins",
    target: 5,
    rewardShards: 35,
  },
  {
    id: "ach_win_15",
    category: "combat",
    name_pt: "Terror dos Duelistas",
    name_en: "Duelist Terror",
    desc_pt: "Alcance 15 vitórias em duelos.",
    desc_en: "Achieve 15 duel victories.",
    icon: "🔥",
    rarity: "epic",
    statKey: "wins",
    target: 15,
    rewardShards: 75,
  },
  {
    id: "ach_win_30",
    category: "combat",
    name_pt: "Invicto da Cidadela",
    name_en: "Citadel Champion",
    desc_pt: "Conquiste 30 vitórias acumuladas.",
    desc_en: "Claim 30 cumulative victories.",
    icon: "👑",
    rarity: "legendary",
    statKey: "wins",
    target: 30,
    rewardShards: 150,
  },
  {
    id: "ach_streak_3",
    category: "combat",
    name_pt: "Chama Constante",
    name_en: "Unbroken Flame",
    desc_pt: "Alcance uma sequência de 3 vitórias consecutivas.",
    desc_en: "Achieve a win streak of 3 consecutive wins.",
    icon: "⚡",
    rarity: "rare",
    statKey: "highestWinStreak",
    target: 3,
    rewardShards: 30,
  },
  {
    id: "ach_streak_5",
    category: "combat",
    name_pt: "Meteoro Fulminante",
    name_en: "Fulminant Meteor",
    desc_pt: "Alcance uma sequência de 5 vitórias consecutivas.",
    desc_en: "Achieve a win streak of 5 consecutive wins.",
    icon: "🌠",
    rarity: "epic",
    statKey: "highestWinStreak",
    target: 5,
    rewardShards: 80,
  },
  {
    id: "ach_clutch_win",
    category: "combat",
    name_pt: "À Beira do Abismo",
    name_en: "Brink of the Abyss",
    desc_pt: "Vença um duelo com menos de 20% de HP restante.",
    desc_en: "Win a duel with less than 20% HP remaining.",
    icon: "💖",
    rarity: "epic",
    statKey: "clutchWins",
    target: 1,
    rewardShards: 50,
  },
  {
    id: "ach_crits_10",
    category: "combat",
    name_pt: "Precisão Estelar",
    name_en: "Stellar Accuracy",
    desc_pt: "Acerte 10 acertos críticos durante seus duelos.",
    desc_en: "Land 10 critical hits during your duels.",
    icon: "🎯",
    rarity: "rare",
    statKey: "critsLanded",
    target: 10,
    rewardShards: 40,
  },

  // --- MAGIA & GRIMÓRIO ---
  {
    id: "ach_spells_6",
    category: "magic",
    name_pt: "Erudito dos Círculos",
    name_en: "Circle Scholar",
    desc_pt: "Aprenda pelo menos 6 feitiços no seu Grimório.",
    desc_en: "Learn at least 6 spells in your Grimoire.",
    icon: "📖",
    rarity: "rare",
    statKey: "unlockedSpellsCount",
    target: 6,
    rewardShards: 40,
  },
  {
    id: "ach_spells_12",
    category: "magic",
    name_pt: "Enciclopédia Arcana",
    name_en: "Arcane Encyclopedia",
    desc_pt: "Aprenda pelo menos 12 feitiços no seu Grimório.",
    desc_en: "Learn at least 12 spells in your Grimoire.",
    icon: "📚",
    rarity: "epic",
    statKey: "unlockedSpellsCount",
    target: 12,
    rewardShards: 80,
  },
  {
    id: "ach_damage_500",
    category: "magic",
    name_pt: "Sobrecarga de Mana",
    name_en: "Mana Overload",
    desc_pt: "Cause um total de 500 de dano mágico em sua carreira.",
    desc_en: "Inflict a total of 500 magic damage across your career.",
    icon: "💥",
    rarity: "rare",
    statKey: "totalDamageDealt",
    target: 500,
    rewardShards: 45,
  },
  {
    id: "ach_damage_2000",
    category: "magic",
    name_pt: "Cataclismo Ressoante",
    name_en: "Resonant Cataclysm",
    desc_pt: "Cause um total de 2000 de dano mágico acumulado.",
    desc_en: "Inflict a total of 2000 cumulative magic damage.",
    icon: "🌌",
    rarity: "epic",
    statKey: "totalDamageDealt",
    target: 2000,
    rewardShards: 100,
  },
  {
    id: "ach_boss_1",
    category: "magic",
    name_pt: "Queda do Colosso",
    name_en: "Fall of the Colossus",
    desc_pt: "Derrote seu primeiro Chefe nas Provas de Treinamento.",
    desc_en: "Defeat your first Boss in the Boss Trials.",
    icon: "🗿",
    rarity: "legendary",
    statKey: "bossesDefeatedCount",
    target: 1,
    rewardShards: 100,
  },

  // --- FORJA & ALQUIMIA ---
  {
    id: "ach_craft_1",
    category: "crafting",
    name_pt: "Primeira Centelha da Forja",
    name_en: "First Forge Spark",
    desc_pt: "Forje seu primeiro item com o mestre Brokk.",
    desc_en: "Craft your first item with Master Brokk.",
    icon: "🔨",
    rarity: "common",
    statKey: "itemsCrafted",
    target: 1,
    rewardShards: 25,
  },
  {
    id: "ach_craft_5",
    category: "crafting",
    name_pt: "Ferreiro Místico",
    name_en: "Mystic Smith",
    desc_pt: "Forje 5 itens lendários ou artefatos na bigorna mágica.",
    desc_en: "Craft 5 legendary gear items or artifacts on the anvil.",
    icon: "🛡️",
    rarity: "epic",
    statKey: "itemsCrafted",
    target: 5,
    rewardShards: 90,
  },
  {
    id: "ach_alchemy_3",
    category: "crafting",
    name_pt: "Alquimista do Caldeirão",
    name_en: "Cauldron Alchemist",
    desc_pt: "Crie 3 poções ou feitiços no Santuário de Lyra.",
    desc_en: "Brew 3 potions or spells in Lyra's Sanctum.",
    icon: "🧪",
    rarity: "rare",
    statKey: "alchemyCrafted",
    target: 3,
    rewardShards: 50,
  },
  {
    id: "ach_items_owned_8",
    category: "crafting",
    name_pt: "Colecionador de Relíquias",
    name_en: "Relic Hoarder",
    desc_pt: "Possua pelo menos 8 itens e cosméticos em seu inventário.",
    desc_en: "Possess at least 8 gear items and cosmetics in inventory.",
    icon: "💎",
    rarity: "rare",
    statKey: "ownedItemsCount",
    target: 8,
    rewardShards: 60,
  },

  // --- HISTÓRIA & JORNADA ---
  {
    id: "ach_rank_magister",
    category: "journey",
    name_pt: "Magister Aclamado",
    name_en: "Acclaimed Magister",
    desc_pt: "Alcance a Liga Magister (1000+ Troféus).",
    desc_en: "Reach the Magister League (1000+ Trophies).",
    icon: "🥇",
    rarity: "epic",
    statKey: "trophies",
    target: 1000,
    rewardShards: 100,
  },
  {
    id: "ach_rank_grandmaster",
    category: "journey",
    name_pt: "Pináculo do Olimpo Arcano",
    name_en: "Arcane Pinnacle",
    desc_pt: "Alcance 1500+ Troféus na Liga Grão-Mestre.",
    desc_en: "Reach 1500+ Trophies in Grandmaster League.",
    icon: "💎",
    rarity: "mythic",
    statKey: "trophies",
    target: 1500,
    rewardShards: 200,
  },
  {
    id: "ach_complete_journey_ch3",
    category: "journey",
    name_pt: "Coração da Jornada",
    name_en: "Heart of the Journey",
    desc_pt: "Complete os 3 primeiros capítulos da Jornada do Herói.",
    desc_en: "Complete the first 3 chapters of the Hero's Journey.",
    icon: "📜",
    rarity: "epic",
    statKey: "completedChaptersCount",
    target: 3,
    rewardShards: 100,
  },
  {
    id: "ach_complete_full_journey",
    category: "journey",
    name_pt: "Lenda Eterna Consagrada",
    name_en: "Eternal Myth Consagrated",
    desc_pt: "Conclua todos os 7 capítulos da Jornada do Herói.",
    desc_en: "Complete all 7 chapters of the Hero's Journey.",
    icon: "🔮",
    rarity: "mythic",
    statKey: "completedChaptersCount",
    target: 7,
    rewardShards: 300,
  },
];

// ================= COMPONENTE DE BADGE DE TÍTULO REUTILIZÁVEL =================
export function TitleBadge({ titleId, size = "sm", lang = "pt", onClick = null }) {
  const title = findTitle(titleId);
  const rarity = JOURNEY_RARITY[title.rarity] || JOURNEY_RARITY.common;
  const isSm = size === "sm";
  const isXs = size === "xs";
  const isLg = size === "lg";

  const paddingClass = isXs ? "px-1 py-0 text-[8px]" : isSm ? "px-1.5 py-0.5 text-[9px] sm:text-[10px]" : "px-3 py-1 text-xs sm:text-sm";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 font-serif font-bold rounded-full transition-all select-none ${paddingClass} ${onClick ? "cursor-pointer hover:scale-105 active:scale-95" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${rarity.bg}, rgba(20, 15, 45, 0.75))`,
        border: `1px solid ${rarity.border}`,
        color: rarity.color,
        boxShadow: rarity.glow !== "none" ? rarity.glow : `0 2px 8px rgba(0,0,0,0.3)`,
        textShadow: `0 0 8px ${rarity.color}66`,
      }}
      title={lang === "pt" ? title.desc_pt : title.desc_en}
    >
      <span className="text-xs leading-none">{title.icon}</span>
      <span className="truncate">{lang === "pt" ? title.name_pt : title.name_en}</span>
    </span>
  );
}

// ================= COMPONENTE TOAST DE CONQUISTA DESBLOQUEADA =================
export function AchievementToast({ toast, onClose, lang = "pt" }) {
  if (!toast) return null;
  const rarity = JOURNEY_RARITY[toast.rarity || "epic"] || JOURNEY_RARITY.epic;

  return (
    <div
      onClick={onClose}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] cursor-pointer animate-bounce flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-all max-w-[92vw] sm:max-w-md"
      style={{
        background: `linear-gradient(135deg, rgba(20, 15, 45, 0.96), rgba(35, 25, 75, 0.96))`,
        borderColor: rarity.color,
        boxShadow: `0 10px 35px rgba(0,0,0,0.7), 0 0 25px ${rarity.color}66`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border shadow-inner"
        style={{
          background: rarity.bg,
          borderColor: rarity.border,
          boxShadow: rarity.glow,
        }}
      >
        {toast.icon || "🏆"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color: rarity.color }}>
          {toast.isJourney ? (lang === "pt" ? "📜 Capítulo da Jornada Concluído!" : "📜 Journey Chapter Complete!") : (lang === "pt" ? "🏆 Conquista Desbloqueada!" : "🏆 Achievement Unlocked!")}
        </div>
        <div className="text-sm font-serif font-black text-amber-200 truncate">
          {lang === "pt" ? toast.title_pt || toast.name_pt : toast.title_en || toast.name_en}
        </div>
        {toast.rewardShards && (
          <div className="text-xs text-amber-400 font-mono font-semibold flex items-center gap-1 mt-0.5">
            <span>+{toast.rewardShards} ✦ Shards</span>
            {toast.rewardTitle && (
              <span className="text-purple-300">· 🎖️ {lang === "pt" ? toast.rewardTitle.name_pt : toast.rewardTitle.name_en}</span>
            )}
          </div>
        )}
      </div>
      <button className="text-zinc-400 hover:text-white text-sm font-bold px-1">✕</button>
    </div>
  );
}

// ================= MODAL PRINCIPAL: JORNADA DO HERÓI =================
export function HeroJourneyModal({
  isOpen,
  onClose,
  lang = "pt",
  heroJourneyProgress = {},
  onClaimChapterReward,
  equippedTitleId,
  onEquipTitle,
  unlockedTitleIds = [],
  achievementsProgress = {},
  onClaimAchievementReward,
  storyChronicle = [],
  playerStats = {},
}) {
  const [activeTab, setActiveTab] = useState("journey"); // "journey" | "titles" | "achievements" | "chronicle"
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [achCategoryFilter, setAchCategoryFilter] = useState("all");

  if (!isOpen) return null;

  const currentChapterNum = heroJourneyProgress.currentChapter || 1;
  const claimedChapters = heroJourneyProgress.claimedChapters || {};

  // Estatísticas calculadas
  const completedChaptersCount = HERO_JOURNEY_CHAPTERS.filter(ch => {
    return ch.quests.every(q => (playerStats[q.statKey] || 0) >= q.target);
  }).length;

  const completedAchievementsCount = ACHIEVEMENTS.filter(ach => {
    return (achievementsProgress[ach.id]?.completed) || (playerStats[ach.statKey] || 0) >= ach.target;
  }).length;

  const totalAchievements = ACHIEVEMENTS.length;
  const totalTitles = TITLES.length;
  const unlockedTitlesSet = new Set(unlockedTitleIds);

  const selectedChapter = HERO_JOURNEY_CHAPTERS[selectedChapterIndex] || HERO_JOURNEY_CHAPTERS[0];
  const isSelectedChapterCompleted = selectedChapter.quests.every(
    q => (playerStats[q.statKey] || 0) >= q.target
  );
  const isSelectedChapterClaimed = Boolean(claimedChapters[selectedChapter.id]);

  // Filtro de conquistas
  const filteredAchievements = ACHIEVEMENTS.filter(ach => {
    if (achCategoryFilter === "all") return true;
    return ach.category === achCategoryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-400/35 shadow-2xl overflow-hidden text-white"
        style={{
          background: "linear-gradient(175deg, rgba(26, 20, 58, 0.98) 0%, rgba(15, 11, 38, 0.99) 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(245, 158, 11, 0.25)",
        }}
      >
        {/* Header com Abas Estilizadas */}
        <div className="p-3 sm:p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-indigo-950/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              📜
            </div>
            <div>
              <h2 className="font-serif font-black text-lg sm:text-xl text-amber-200 leading-tight drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
                {lang === "pt" ? "A Senda do Arquimago" : "The Archmage's Path"}
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-200/80 font-sans">
                {lang === "pt" ? "Jornada do Herói, Títulos Arcanos & Crônicas Pessoais" : "Hero's Journey, Arcane Titles & Personal Chronicles"}
              </p>
            </div>
          </div>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white font-bold transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-indigo-950/40 text-center font-sans font-bold text-xs sm:text-sm flex-shrink-0">
          <button
            onClick={() => setActiveTab("journey")}
            className={`py-2.5 px-1 border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "journey"
                ? "border-amber-400 text-amber-300 bg-amber-400/10 shadow-[inset_0_-8px_15px_rgba(245,158,11,0.15)]"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <span>📜</span>
            <span className="truncate">{lang === "pt" ? "Jornada" : "Journey"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 hidden sm:inline">
              {completedChaptersCount}/7
            </span>
          </button>

          <button
            onClick={() => setActiveTab("titles")}
            className={`py-2.5 px-1 border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "titles"
                ? "border-purple-400 text-purple-300 bg-purple-400/10 shadow-[inset_0_-8px_15px_rgba(192,132,252,0.15)]"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <span>🎖️</span>
            <span className="truncate">{lang === "pt" ? "Títulos" : "Titles"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 hidden sm:inline">
              {unlockedTitlesSet.size}/{totalTitles}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`py-2.5 px-1 border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "achievements"
                ? "border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-[inset_0_-8px_15px_rgba(56,189,248,0.15)]"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <span>🏆</span>
            <span className="truncate">{lang === "pt" ? "Conquistas" : "Achievements"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 hidden sm:inline">
              {completedAchievementsCount}/{totalAchievements}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("chronicle")}
            className={`py-2.5 px-1 border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "chronicle"
                ? "border-rose-400 text-rose-300 bg-rose-400/10 shadow-[inset_0_-8px_15px_rgba(244,114,182,0.15)]"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <span>📖</span>
            <span className="truncate">{lang === "pt" ? "Diário" : "Chronicle"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 hidden sm:inline">
              {storyChronicle.length}
            </span>
          </button>
        </div>

        {/* Tab 1: JORNADA DO HERÓI (Capítulos e Missões) */}
        {activeTab === "journey" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 flex flex-col md:flex-row gap-4 custom-scrollbar">
            {/* Timeline Lateral com os 7 Capítulos */}
            <div className="w-full md:w-5/12 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 pr-1">
              {HERO_JOURNEY_CHAPTERS.map((ch, idx) => {
                const isSelected = selectedChapterIndex === idx;
                const isCompleted = ch.quests.every(q => (playerStats[q.statKey] || 0) >= q.target);
                const isClaimed = Boolean(claimedChapters[ch.id]);
                const isCurrent = currentChapterNum === ch.chapterNumber;

                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapterIndex(idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 relative select-none flex-shrink-0 min-w-[200px] md:min-w-0 ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.3)]"
                        : "bg-indigo-950/40 border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    {/* Chapter Icon Indicator */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black border flex-shrink-0 ${
                        isClaimed
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                          : isCompleted
                          ? "bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse"
                          : "bg-indigo-950/70 border-white/20 text-zinc-400"
                      }`}
                    >
                      {isClaimed ? "✓" : ch.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-bold flex items-center gap-1">
                        <span>{lang === "pt" ? `Capítulo ${ch.chapterNumber}` : `Chapter ${ch.chapterNumber}`}</span>
                        {isClaimed && (
                          <span className="text-[9px] px-1 py-0 rounded bg-emerald-500/20 text-emerald-300">
                            {lang === "pt" ? "Resgatado" : "Claimed"}
                          </span>
                        )}
                        {!isClaimed && isCompleted && (
                          <span className="text-[9px] px-1 py-0 rounded bg-amber-500/30 text-amber-200 animate-bounce">
                            {lang === "pt" ? "Pronto!" : "Ready!"}
                          </span>
                        )}
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm text-zinc-100 truncate">
                        {lang === "pt" ? ch.title_pt : ch.title_en}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Painel do Capítulo Selecionado */}
            <div className="flex-1 min-w-0 flex flex-col justify-between p-3 sm:p-5 rounded-2xl bg-indigo-950/60 border border-white/10 relative overflow-hidden">
              <div className="space-y-4">
                {/* Cabeçalho do Capítulo */}
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                      {lang === "pt" ? `Capítulo ${selectedChapter.chapterNumber} de 7` : `Chapter ${selectedChapter.chapterNumber} of 7`}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-serif font-black text-amber-100 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
                      {lang === "pt" ? selectedChapter.title_pt : selectedChapter.title_en}
                    </h3>
                    <p className="text-xs text-indigo-300/80 font-sans mt-0.5">
                      {lang === "pt" ? selectedChapter.subtitle_pt : selectedChapter.subtitle_en}
                    </p>
                  </div>

                  <div className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                    {selectedChapter.icon}
                  </div>
                </div>

                {/* Lore / História Pessoal */}
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-400/20 italic text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                  "{lang === "pt" ? selectedChapter.lore_pt : selectedChapter.lore_en}"
                </div>

                {/* Lista de 3 Missões do Capítulo */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2 flex items-center gap-1.5">
                    <span>⚔️</span>
                    <span>{lang === "pt" ? "Provas & Marcos Arcanos" : "Trials & Milestones"}</span>
                  </h4>

                  <div className="space-y-2">
                    {selectedChapter.quests.map(quest => {
                      const currentVal = Math.min(quest.target, playerStats[quest.statKey] || 0);
                      const isQuestDone = currentVal >= quest.target;
                      const pct = Math.min(100, Math.round((currentVal / quest.target) * 100));

                      return (
                        <div
                          key={quest.id}
                          className="p-2.5 rounded-xl bg-indigo-900/30 border border-white/10 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${isQuestDone ? "text-emerald-400" : "text-amber-400/80"}`}>
                                {isQuestDone ? "✓" : "○"}
                              </span>
                              <span className={`text-xs sm:text-sm font-sans font-bold ${isQuestDone ? "text-emerald-200 line-through opacity-80" : "text-zinc-200"}`}>
                                {lang === "pt" ? quest.name_pt : quest.name_en}
                              </span>
                            </div>
                            <span className="font-mono text-xs text-amber-300 font-bold">
                              {currentVal}/{quest.target}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-400 pl-5">
                            {lang === "pt" ? quest.desc_pt : quest.desc_en}
                          </p>

                          {/* Progress bar */}
                          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden ml-5 max-w-[calc(100%-20px)]">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                background: isQuestDone
                                  ? "linear-gradient(90deg, #10B981, #34D399)"
                                  : "linear-gradient(90deg, #F59E0B, #FBBF24)",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Seção de Recompensa do Capítulo */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/20 p-3 rounded-xl">
                <div>
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    {lang === "pt" ? "Recompensas do Capítulo:" : "Chapter Completion Rewards:"}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                      +{selectedChapter.rewardShards} ✦ Shards
                    </span>
                    {selectedChapter.rewardTitleId && (
                      <TitleBadge titleId={selectedChapter.rewardTitleId} size="xs" lang={lang} />
                    )}
                  </div>
                </div>

                {isSelectedChapterClaimed ? (
                  <button
                    disabled
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-serif font-bold cursor-default flex items-center gap-1.5"
                  >
                    <span>✓</span>
                    <span>{lang === "pt" ? "Recompensa Resgatada" : "Reward Claimed"}</span>
                  </button>
                ) : (
                  <button
                    disabled={!isSelectedChapterCompleted}
                    onClick={() => onClaimChapterReward(selectedChapter)}
                    className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg ${
                      isSelectedChapterCompleted
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.6)] cursor-pointer hover:scale-105 active:scale-95"
                        : "bg-white/10 text-zinc-500 border border-white/10 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span>🎁</span>
                    <span>{lang === "pt" ? "Reivindicar Capítulo" : "Claim Chapter Reward"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TÍTULOS ARCANOS (Equipar e Visualizar) */}
        {activeTab === "titles" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 custom-scrollbar">
            <div className="mb-4 p-3 rounded-xl bg-purple-950/40 border border-purple-400/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-purple-300 uppercase font-bold tracking-wider">
                  {lang === "pt" ? "Título Equipado Atual:" : "Current Equipped Title:"}
                </span>
                <div className="mt-1">
                  <TitleBadge titleId={equippedTitleId} size="lg" lang={lang} />
                </div>
              </div>
              <p className="text-xs text-indigo-200/70 max-w-xs hidden sm:block">
                {lang === "pt"
                  ? "Títulos concedem prestígio lendário e são exibidos para todos os seus oponentes na Arena e no Ranking."
                  : "Titles grant legendary renown and are displayed to all opponents in the Arena and Leaderboard."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {TITLES.map(title => {
                const isUnlocked = unlockedTitlesSet.has(title.id);
                const isEquipped = equippedTitleId === title.id;
                const rarity = JOURNEY_RARITY[title.rarity] || JOURNEY_RARITY.common;

                return (
                  <div
                    key={title.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between gap-2 transition-all relative overflow-hidden ${
                      isEquipped
                        ? "bg-purple-900/30 border-purple-400 shadow-[0_0_18px_rgba(192,132,252,0.35)]"
                        : isUnlocked
                        ? "bg-indigo-950/40 border-white/15 hover:border-white/30"
                        : "bg-black/30 border-white/5 opacity-60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-lg">{title.icon}</span>
                        <span
                          className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded border"
                          style={{ color: rarity.color, borderColor: rarity.border, background: rarity.bg }}
                        >
                          {lang === "pt" ? rarity.label_pt : rarity.label_en}
                        </span>
                      </div>

                      <h4 className="font-serif font-black text-sm text-zinc-100 truncate">
                        {lang === "pt" ? title.name_pt : title.name_en}
                      </h4>

                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {lang === "pt" ? title.desc_pt : title.desc_en}
                      </p>

                      <div className="mt-2 text-[10px] font-mono text-indigo-300/80 bg-indigo-950/60 p-1.5 rounded border border-white/5">
                        <span className="text-amber-300 font-bold">{lang === "pt" ? "Origem: " : "Source: "}</span>
                        {lang === "pt" ? title.source_pt : title.source_en}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      {isUnlocked ? (
                        isEquipped ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-serif w-full text-center">
                            ✓ {lang === "pt" ? "Equipado" : "Equipped"}
                          </span>
                        ) : (
                          <button
                            onClick={() => onEquipTitle(title.id)}
                            className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-serif font-bold text-xs transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                          >
                            {lang === "pt" ? "Equipar Título" : "Equip Title"}
                          </button>
                        )
                      ) : (
                        <div className="w-full text-center py-1 text-xs text-zinc-500 font-mono font-bold flex items-center justify-center gap-1">
                          <span>🔒</span>
                          <span>{lang === "pt" ? "Bloqueado" : "Locked"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: CONQUISTAS (Achievements) */}
        {activeTab === "achievements" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 flex flex-col gap-3 custom-scrollbar">
            {/* Filtros de Categoria */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0">
              {[
                { id: "all", label_pt: "Todas", label_en: "All", icon: "✨" },
                { id: "combat", label_pt: "Combate", label_en: "Combat", icon: "⚔️" },
                { id: "magic", label_pt: "Magia", label_en: "Magic", icon: "🔮" },
                { id: "crafting", label_pt: "Forja & Alquimia", label_en: "Crafting", icon: "🔨" },
                { id: "journey", label_pt: "Jornada", label_en: "Journey", icon: "📜" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setAchCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    achCategoryFilter === cat.id
                      ? "bg-amber-400 text-indigo-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                      : "bg-indigo-950/60 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === "pt" ? cat.label_pt : cat.label_en}</span>
                </button>
              ))}
            </div>

            {/* Grid de Conquistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredAchievements.map(ach => {
                const currentVal = Math.min(ach.target, playerStats[ach.statKey] || 0);
                const isCompleted = currentVal >= ach.target;
                const isClaimed = Boolean(achievementsProgress[ach.id]?.claimed);
                const pct = Math.min(100, Math.round((currentVal / ach.target) * 100));
                const rarity = JOURNEY_RARITY[ach.rarity] || JOURNEY_RARITY.common;

                return (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      isClaimed
                        ? "bg-indigo-950/30 border-white/5 opacity-70"
                        : isCompleted
                        ? "bg-amber-500/15 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-indigo-950/50 border-white/10"
                    }`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border"
                      style={{ background: rarity.bg, borderColor: rarity.border, color: rarity.color }}
                    >
                      {ach.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-zinc-100 truncate">
                          {lang === "pt" ? ach.name_pt : ach.name_en}
                        </h4>
                        <span className="font-mono text-[11px] text-amber-300 font-bold">
                          {currentVal}/{ach.target}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 truncate">
                        {lang === "pt" ? ach.desc_pt : ach.desc_en}
                      </p>

                      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden mt-1.5">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${pct}%`,
                            background: isCompleted
                              ? "linear-gradient(90deg, #10B981, #34D399)"
                              : "linear-gradient(90deg, #38BDF8, #818CF8)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Botão de Resgate */}
                    <div className="flex-shrink-0">
                      {isClaimed ? (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {lang === "pt" ? "Resgatado" : "Claimed"}
                        </span>
                      ) : isCompleted ? (
                        <button
                          onClick={() => onClaimAchievementReward(ach)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-serif shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          +{ach.rewardShards} ✦
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-500 font-bold px-1.5 py-1">
                          +{ach.rewardShards} ✦
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: DIÁRIO DO ARQUIMAGO (Personal Saga & Chronicle) */}
        {activeTab === "chronicle" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 custom-scrollbar space-y-3">
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-400/30">
              <h3 className="font-serif font-black text-sm text-rose-200 flex items-center gap-2">
                <span>📖</span>
                <span>{lang === "pt" ? "Crônicas da Sua Jornada Mágica" : "Chronicles of Your Arcane Saga"}</span>
              </h3>
              <p className="text-xs text-rose-200/80 font-sans mt-0.5">
                {lang === "pt"
                  ? "Cada vitória importante, capítulo superado e artefato lendário forjado é gravado eternamente no seu Diário Pessoal."
                  : "Every critical triumph, conquered chapter, and forged artifact is inscribed forever in your Personal Chronicle."}
              </p>
            </div>

            {storyChronicle.length === 0 ? (
              <div className="text-center py-12 text-zinc-400">
                <div className="text-4xl mb-2">📜</div>
                <p className="font-serif text-sm">
                  {lang === "pt" ? "Sua história acabou de começar..." : "Your saga has just begun..."}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {lang === "pt"
                    ? "Vença duelos, forje itens e cumpra capítulos da jornada para escrever suas crônicas!"
                    : "Win duels, craft gear, and complete journey chapters to write your chronicle!"}
                </p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-purple-400 before:to-transparent">
                {storyChronicle.map(entry => (
                  <div key={entry.id} className="relative group">
                    {/* Glowing Bullet */}
                    <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-indigo-950 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />

                    <div className="p-3 rounded-xl bg-indigo-950/60 border border-white/10 hover:border-amber-400/40 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-serif font-black text-amber-200 flex items-center gap-1.5">
                          <span>{entry.icon || "📜"}</span>
                          <span>{entry.title}</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {entry.date || "Arcane Era"}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {entry.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer info bar */}
        <div className="p-2.5 sm:p-3 border-t border-white/10 bg-indigo-950/60 flex items-center justify-between text-xs font-mono text-zinc-400 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span>
              🏆 {completedAchievementsCount}/{totalAchievements} {lang === "pt" ? "Conquistas" : "Achievements"}
            </span>
            <span>
              🎖️ {unlockedTitlesSet.size}/{totalTitles} {lang === "pt" ? "Títulos" : "Titles"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs transition-all cursor-pointer"
          >
            {lang === "pt" ? "Fechar" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
