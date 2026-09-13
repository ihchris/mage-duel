import React, { useState } from "react";

// ================= TABELA DE MATERIAIS DE FORJA =================
export const MATERIALS = [
  {
    id: "mat_ember",
    name: "Ember Essence",
    name_pt: "Essência de Brasa",
    rarity: "common",
    icon: "🔥",
    color: "#F97316",
    bg: "rgba(249, 115, 22, 0.15)",
    border: "rgba(249, 115, 22, 0.4)",
    desc: "Concentrated primal flame that burns eternally without fuel.",
    desc_pt: "Chama primordial concentrada que queima eternamente sem consumir combustível.",
  },
  {
    id: "mat_glacial",
    name: "Glacial Shard",
    name_pt: "Fragmento Glacial",
    rarity: "common",
    icon: "❄️",
    color: "#38BDF8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.4)",
    desc: "Eternal rime ice gathered from the frigid northern summits.",
    desc_pt: "Gelo eterno das montanhas do norte que nunca derrete, mesmo sob o fogo.",
  },
  {
    id: "mat_sap",
    name: "Yggdrasil Sap",
    name_pt: "Seiva de Yggdrasil",
    rarity: "common",
    icon: "🌿",
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.15)",
    border: "rgba(34, 197, 94, 0.4)",
    desc: "Pure restorative sap drawn from ancient world-tree roots.",
    desc_pt: "Seiva restauradora pura colhida das raízes mais profundas da árvore da vida.",
  },
  {
    id: "mat_stardust",
    name: "Arcane Stardust",
    name_pt: "Pó de Éter Arcano",
    rarity: "common",
    icon: "✨",
    color: "#C084FC",
    bg: "rgba(192, 132, 252, 0.15)",
    border: "rgba(192, 132, 252, 0.4)",
    desc: "Twinkling remnants salvaged from collapsed astral leylines.",
    desc_pt: "Fragmentos cintilantes recolhidos de leylines astrais que colapsaram na arena.",
  },
  {
    id: "mat_iron",
    name: "Meteoric Iron",
    name_pt: "Ferro Meteórico",
    rarity: "rare",
    icon: "⛏️",
    color: "#94A3B8",
    bg: "rgba(148, 163, 184, 0.15)",
    border: "rgba(148, 163, 184, 0.45)",
    desc: "Ultra-dense celestial ore, ideal for forging staves and ring bands.",
    desc_pt: "Minério celeste superdenso, ideal para engastes de anéis e alicerces de armas.",
  },
  {
    id: "mat_crystal",
    name: "Primal Mana Crystal",
    name_pt: "Cristal de Mana Primal",
    rarity: "rare",
    icon: "💎",
    color: "#60A5FA",
    bg: "rgba(96, 165, 250, 0.15)",
    border: "rgba(96, 165, 250, 0.45)",
    desc: "Resonant crystalline prism that channels and amplifies spellcraft.",
    desc_pt: "Prisma cristalino ressonante capaz de armazenar e amplificar conjurações.",
  },
  {
    id: "mat_ironwood",
    name: "Ancient Ironwood",
    name_pt: "Madeira de Ferro Ancestral",
    rarity: "rare",
    icon: "🪵",
    color: "#A16207",
    bg: "rgba(161, 98, 7, 0.15)",
    border: "rgba(161, 98, 7, 0.45)",
    desc: "Petrified fossilized bough, as tough and resilient as diamond.",
    desc_pt: "Galho fóssil petrificado por magia ancestral, resistente como diamante.",
  },
  {
    id: "mat_dragonblood",
    name: "Dragon Blood Core",
    name_pt: "Sangue de Dragão Coagulado",
    rarity: "epic",
    icon: "🩸",
    color: "#DC2626",
    bg: "rgba(220, 38, 38, 0.18)",
    border: "rgba(220, 38, 38, 0.5)",
    desc: "Pulsing blood essence of an ancient wyrm. Catalyst of supreme destructive power.",
    desc_pt: "Essência pulsante de sangue de dragão ancestral. Catalisador de poder bélico extremo.",
  },
  {
    id: "mat_phoenix_core",
    name: "Phoenix Heart Core",
    name_pt: "Núcleo da Fênix Solar",
    rarity: "legendary",
    icon: "👑",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.2)",
    border: "rgba(245, 158, 11, 0.6)",
    desc: "Incandescent avian heart that constantly rebirths from its own sacred ashes.",
    desc_pt: "Coração incandescente que renasce perpetuamente de suas próprias cinzas sagradas.",
  },
  {
    id: "mat_void_tesseract",
    name: "Void Tesseract Shard",
    name_pt: "Fragmento do Vazio Tesseract",
    rarity: "legendary",
    icon: "🕳️",
    color: "#9333EA",
    bg: "rgba(147, 51, 234, 0.2)",
    border: "rgba(147, 51, 234, 0.6)",
    desc: "Four-dimensional cosmic prism that bends gravity, shadows and the continuum.",
    desc_pt: "Poliedro de quatro dimensões que dobra a gravidade e o continuum espaço-tempo.",
  },
  {
    id: "mat_celestial_tear",
    name: "Celestial Tear",
    name_pt: "Lágrima dos Celestiais",
    rarity: "legendary",
    icon: "🌟",
    color: "#FDE047",
    bg: "rgba(253, 224, 71, 0.2)",
    border: "rgba(253, 224, 71, 0.7)",
    desc: "Pristine fallen star teardrop. Enables crafting mythical masterpieces.",
    desc_pt: "Gota de luz pura caída do ápice do firmamento. Permite forjar relíquias impossíveis.",
  },
];

export function findMaterial(id) {
  return MATERIALS.find(m => m.id === id) || MATERIALS[0];
}

// ================= RECEITAS DA FORJA (ESPECÍFICAS E BALANCEADAS) =================
export const FORGE_RECIPES = [
  // --- ANÉIS ARCANOS ---
  {
    id: "recipe_ring_cinder",
    resultItemId: "ring_cinder",
    category: "rings",
    cost: { mat_ember: 4, mat_iron: 2 },
  },
  {
    id: "recipe_ring_glacier",
    resultItemId: "ring_glacier",
    category: "rings",
    cost: { mat_glacial: 4, mat_iron: 2 },
  },
  {
    id: "recipe_ring_spore",
    resultItemId: "ring_spore",
    category: "rings",
    cost: { mat_sap: 8, mat_crystal: 4 },
  },
  {
    id: "recipe_ring_runic",
    resultItemId: "ring_runic",
    category: "rings",
    cost: { mat_stardust: 8, mat_iron: 4, mat_crystal: 2 },
  },
  {
    id: "recipe_ring_combustion",
    resultItemId: "ring_combustion",
    category: "rings",
    cost: { mat_ember: 12, mat_iron: 6, mat_dragonblood: 1 },
  },
  {
    id: "recipe_ring_shatter",
    resultItemId: "ring_shatter",
    category: "rings",
    cost: { mat_glacial: 12, mat_crystal: 6, mat_ironwood: 1 },
  },
  {
    id: "recipe_ring_ironroot",
    resultItemId: "ring_ironroot",
    category: "rings",
    cost: { mat_sap: 14, mat_ironwood: 4, mat_iron: 4 },
  },
  {
    id: "recipe_ring_chronos",
    resultItemId: "ring_chronos",
    category: "rings",
    cost: { mat_stardust: 14, mat_crystal: 6, mat_iron: 4 },
  },
  {
    id: "recipe_ring_singularity",
    resultItemId: "ring_singularity",
    category: "rings",
    cost: { mat_stardust: 20, mat_crystal: 10, mat_void_tesseract: 1 },
  },
  {
    id: "recipe_ring_prismatic",
    resultItemId: "ring_prismatic",
    category: "rings",
    cost: { mat_ember: 8, mat_glacial: 8, mat_sap: 8, mat_stardust: 8, mat_celestial_tear: 1 },
  },

  // --- COLARES & AMULETOS ARCANOS ---
  {
    id: "recipe_necklace_amber_tear",
    resultItemId: "necklace_amber_tear",
    category: "necklaces",
    cost: { mat_ember: 6, mat_crystal: 3 },
  },
  {
    id: "recipe_necklace_frost_gem",
    resultItemId: "necklace_frost_gem",
    category: "necklaces",
    cost: { mat_glacial: 6, mat_crystal: 3 },
  },
  {
    id: "recipe_necklace_sylvan_locket",
    resultItemId: "necklace_sylvan_locket",
    category: "necklaces",
    cost: { mat_sap: 10, mat_ironwood: 3 },
  },
  {
    id: "recipe_necklace_astral_choker",
    resultItemId: "necklace_astral_choker",
    category: "necklaces",
    cost: { mat_stardust: 10, mat_iron: 4 },
  },
  {
    id: "recipe_necklace_phoenix_heart",
    resultItemId: "necklace_phoenix_heart",
    category: "necklaces",
    cost: { mat_ember: 14, mat_crystal: 6, mat_dragonblood: 1 },
  },
  {
    id: "recipe_necklace_frozen_star",
    resultItemId: "necklace_frozen_star",
    category: "necklaces",
    cost: { mat_glacial: 14, mat_crystal: 6, mat_iron: 4 },
  },
  {
    id: "recipe_necklace_druid_torc",
    resultItemId: "necklace_druid_torc",
    category: "necklaces",
    cost: { mat_sap: 16, mat_ironwood: 6, mat_crystal: 4 },
  },
  {
    id: "recipe_necklace_chronos_pendant",
    resultItemId: "necklace_chronos_pendant",
    category: "necklaces",
    cost: { mat_stardust: 18, mat_crystal: 8, mat_void_tesseract: 1 },
  },
  {
    id: "recipe_necklace_prismatic_eye",
    resultItemId: "necklace_prismatic_eye",
    category: "necklaces",
    cost: { mat_ember: 10, mat_glacial: 10, mat_sap: 10, mat_stardust: 10, mat_celestial_tear: 1 },
  },

  // --- CAJADOS & MÃOS SECUNDÁRIAS ---
  {
    id: "recipe_coral_scepter",
    resultItemId: "coral_scepter",
    category: "weapons",
    cost: { mat_glacial: 10, mat_sap: 8, mat_crystal: 4 },
  },
  {
    id: "recipe_stormcaller",
    resultItemId: "stormcaller",
    category: "weapons",
    cost: { mat_stardust: 16, mat_iron: 8, mat_crystal: 4 },
  },
  {
    id: "recipe_bloodpact",
    resultItemId: "bloodpact",
    category: "weapons",
    cost: { mat_ember: 16, mat_iron: 8, mat_dragonblood: 2 },
  },
  {
    id: "recipe_offhand_buckler",
    resultItemId: "offhand_buckler",
    category: "weapons",
    cost: { mat_iron: 8, mat_crystal: 3 },
  },
  {
    id: "recipe_offhand_skull",
    resultItemId: "offhand_skull",
    category: "weapons",
    cost: { mat_stardust: 12, mat_dragonblood: 2 },
  },
  {
    id: "recipe_offhand_prism",
    resultItemId: "offhand_prism",
    category: "weapons",
    cost: { mat_stardust: 12, mat_crystal: 8, mat_celestial_tear: 1 },
  },
  {
    id: "recipe_voidglass",
    resultItemId: "voidglass",
    category: "weapons",
    cost: { mat_stardust: 24, mat_crystal: 12, mat_void_tesseract: 1 },
  },
  {
    id: "recipe_sunfire",
    resultItemId: "sunfire",
    category: "weapons",
    cost: { mat_ember: 24, mat_crystal: 12, mat_phoenix_core: 1 },
  },

  // --- RELÍQUIAS ARCANAS ---
  {
    id: "recipe_wardsigil",
    resultItemId: "wardsigil",
    category: "relics",
    cost: { mat_stardust: 8, mat_iron: 6 },
  },
  {
    id: "recipe_soulstone",
    resultItemId: "soulstone",
    category: "relics",
    cost: { mat_sap: 10, mat_crystal: 6, mat_dragonblood: 1 },
  },
  {
    id: "recipe_chronoloop",
    resultItemId: "chronoloop",
    category: "relics",
    cost: { mat_stardust: 16, mat_crystal: 8, mat_iron: 6 },
  },
  {
    id: "recipe_twinfang",
    resultItemId: "twinfang",
    category: "relics",
    cost: { mat_ember: 10, mat_glacial: 10, mat_celestial_tear: 1 },
  },
  {
    id: "recipe_phoenix",
    resultItemId: "phoenix",
    category: "relics",
    cost: { mat_ember: 20, mat_crystal: 8, mat_phoenix_core: 1 },
  },

  // --- VESTIMENTAS & EQUIPAMENTOS FORJÁVEIS ---
  {
    id: "recipe_boots_ironward",
    resultItemId: "boots_ironward",
    category: "apparel",
    cost: { mat_iron: 8, mat_ironwood: 4 },
  },
  {
    id: "recipe_boots_cinder",
    resultItemId: "boots_cinder",
    category: "apparel",
    cost: { mat_ember: 12, mat_iron: 6 },
  },
  {
    id: "recipe_boots_frostbite",
    resultItemId: "boots_frostbite",
    category: "apparel",
    cost: { mat_glacial: 12, mat_iron: 6 },
  },
  {
    id: "recipe_boots_verdant",
    resultItemId: "boots_verdant",
    category: "apparel",
    cost: { mat_sap: 12, mat_ironwood: 6 },
  },
  {
    id: "recipe_robe_crimson",
    resultItemId: "robe_crimson",
    category: "apparel",
    cost: { mat_ember: 16, mat_dragonblood: 1 },
  },
  {
    id: "recipe_hat_warlord",
    resultItemId: "hat_warlord",
    category: "apparel",
    cost: { mat_iron: 14, mat_ember: 8 },
  },
  {
    id: "recipe_cape_banner",
    resultItemId: "cape_banner",
    category: "apparel",
    cost: { mat_iron: 8, mat_ember: 6 },
  },
  {
    id: "recipe_cape_fur",
    resultItemId: "cape_fur",
    category: "apparel",
    cost: { mat_glacial: 14, mat_ironwood: 6 },
  },
  {
    id: "recipe_cape_void",
    resultItemId: "cape_void",
    category: "apparel",
    cost: { mat_stardust: 22, mat_void_tesseract: 1 },
  },
  {
    id: "recipe_wings_phoenix",
    resultItemId: "wings_phoenix",
    category: "apparel",
    cost: { mat_ember: 25, mat_phoenix_core: 1 },
  },
];

// ================= ROLAGEM DE DROPS PÓS-DUELO =================
export function rollMaterialDrops({ isWin, winStreak = 0, enemyAffinity = "fire", isBoss = false }) {
  const drops = {};

  function addDrop(matId, count = 1) {
    drops[matId] = (drops[matId] || 0) + count;
  }

  // 1. Essências Elementais Primárias
  const affinityMatMap = {
    fire: "mat_ember",
    ice: "mat_glacial",
    nature: "mat_sap",
    arcane: "mat_stardust",
  };
  const primaryMat = affinityMatMap[enemyAffinity] || "mat_ember";

  if (isWin) {
    // Vitória garante de 1 a 3 essências primárias
    const count = Math.floor(Math.random() * 2) + 1 + (winStreak >= 3 ? 1 : 0);
    addDrop(primaryMat, count);

    // 60% chance de essência secundária aleatória
    if (Math.random() < 0.60) {
      const allEssences = ["mat_ember", "mat_glacial", "mat_sap", "mat_stardust"];
      const secondary = allEssences[Math.floor(Math.random() * allEssences.length)];
      addDrop(secondary, 1);
    }

    // 45% chance de Ferro Meteórico
    if (Math.random() < 0.45) {
      addDrop("mat_iron", Math.random() < 0.3 ? 2 : 1);
    }

    // 40% chance de Cristal de Mana
    if (Math.random() < 0.40) {
      addDrop("mat_crystal", 1);
    }

    // 30% chance de Madeira Ancestral
    if (Math.random() < 0.30) {
      addDrop("mat_ironwood", 1);
    }

    // 18% chance de Sangue de Dragão (ou 50% se for chefe)
    if (isBoss || Math.random() < 0.18) {
      addDrop("mat_dragonblood", 1);
    }

    // Drops Lendários (8% em vitórias normais com streak ou 100% garantido em Boss Trial)
    if (isBoss) {
      const legPool = ["mat_phoenix_core", "mat_void_tesseract", "mat_celestial_tear"];
      addDrop(legPool[Math.floor(Math.random() * legPool.length)], 1);
    } else if (winStreak >= 4 && Math.random() < 0.15) {
      const legPool = ["mat_phoenix_core", "mat_void_tesseract", "mat_celestial_tear"];
      addDrop(legPool[Math.floor(Math.random() * legPool.length)], 1);
    } else if (Math.random() < 0.05) {
      const legPool = ["mat_phoenix_core", "mat_void_tesseract", "mat_celestial_tear"];
      addDrop(legPool[Math.floor(Math.random() * legPool.length)], 1);
    }
  } else {
    // Derrota: consolação de 1 essência para incentivar continuar jogando
    if (Math.random() < 0.70) {
      addDrop(primaryMat, 1);
    }
  }

  return drops;
}

// ================= DIÁLOGOS DINÂMICOS DO NPC BROKK =================
const BROKK_LINES = {
  welcome: [
    "O fogo da forja ruge, forasteiro! O que os leylines trouxeram para sua bigorna hoje?",
    "Aço comum se dobra, mas o ferro meteórico com mana queima até a alma. Escolha sua receita!",
    "Traga-me essências arcanas e núcleos ancestrais, e eu forjarei uma lenda digna de você.",
    "Bata o ferro enquanto está em brasa mágica! Veja o que seus duelos renderam.",
  ],
  success: [
    "Pelos martelos de fogo ancestral! Uma verdadeira obra-prima acaba de nascer da bigorna!",
    "Ouça o cantar do aço temperado na magia! Esse item vai despedaçar seus rivais na arena.",
    "Perfeição nascida das brasas e do éter. Equipe-o e honre a Forja!",
  ],
  missing: [
    "Minério ou essência insuficiente, mago! Volte à arena e derrote mais rivais para extrair os elementos.",
    "Minha bigorna não trabalha com ar puro. Você precisa de mais materiais para essa forja!",
    "Essa receita exige componentes raros. Lute nos duelos e suba nas ligas para encontrá-los.",
  ],
  legendary: [
    "Pelos deuses do éter... essa relíquia lendária não era forjada há mais de três eras!",
    "Um brilho divino que cega até meus olhos de ferreiro! Você carrega um artefato supremo.",
  ],
};

// ================= MODAL INTERATIVO DA FORJA ARCANA (UI) =================
export function ForgeModal({
  isOpen,
  onClose,
  materials = {},
  owned = new Set(),
  onCraftSuccess,
  lang = "pt",
  findItem,
  RARITY,
}) {
  const [activeCategory, setActiveCategory] = useState("rings"); // 'rings' | 'weapons' | 'relics' | 'cosmetics'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [forgeAnim, setForgeAnim] = useState(false);
  const [npcDialogue, setNpcDialogue] = useState(BROKK_LINES.welcome[0]);

  if (!isOpen) return null;

  const currentRecipe = selectedRecipe || FORGE_RECIPES.find(r => r.category === activeCategory) || FORGE_RECIPES[0];
  const targetItem = findItem(currentRecipe.resultItemId);

  // Checagem de materiais
  const canCraft = Object.entries(currentRecipe.cost).every(([matId, qty]) => {
    return (materials[matId] || 0) >= qty;
  });
  const alreadyOwned = owned.has(currentRecipe.resultItemId);

  function handleForge() {
    if (!canCraft || alreadyOwned) {
      setNpcDialogue(BROKK_LINES.missing[Math.floor(Math.random() * BROKK_LINES.missing.length)]);
      return;
    }

    setForgeAnim(true);
    setTimeout(() => {
      setForgeAnim(false);
      const isLeg = targetItem?.rarity === "legendary";
      const dialogueList = isLeg ? BROKK_LINES.legendary : BROKK_LINES.success;
      setNpcDialogue(dialogueList[Math.floor(Math.random() * dialogueList.length)]);
      onCraftSuccess(currentRecipe);
    }, 600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center safe-all p-2 sm:p-4 modal-backdrop" onClick={onClose}>
      <div
        className="w-full max-w-lg md:max-w-3xl modal-window max-h-[94dvh] md:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-amber-500/35"
        onClick={e => e.stopPropagation()}
      >
        {/* Header com NPC Brokk */}
        <div className="p-3 sm:p-4 border-b border-white/10 bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-950 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* NPC Avatar Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-600 to-red-700 border border-amber-300/60 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
              <span>🔨</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-lg font-black text-amber-200 truncate">
                  Brokk, o Forjador de Runas
                </h2>
                <span className="px-2 py-0.2 rounded-full bg-amber-500/20 border border-amber-400/40 text-[9px] font-sans font-bold text-amber-300 hidden xs:inline">
                  {lang === "pt" ? "Ferreiro Arcano" : "Arcane Blacksmith"}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11.5px] font-sans text-zinc-300 italic truncate mt-0.5 max-w-sm sm:max-w-md">
                "{npcDialogue}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-zinc-400 hover:text-white transition-all text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Bolsa de Materiais do Jogador (Horizontal Scrollable Bag) */}
        <div className="p-2.5 sm:p-3 bg-slate-950/90 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5 text-[10px] sm:text-[11px] font-mono">
            <span className="text-zinc-400 flex items-center gap-1">
              <span>📦</span>
              <span>{lang === "pt" ? "Sua Bolsa de Materiais:" : "Your Materials Bag:"}</span>
            </span>
            <span className="text-amber-400 font-bold">
              {lang === "pt" ? "Colete vencendo duelos na arena" : "Collect by winning duels"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {MATERIALS.map(mat => {
              const count = materials[mat.id] || 0;
              const hasAny = count > 0;
              return (
                <div
                  key={mat.id}
                  className={`px-2 py-1 rounded-xl border flex items-center gap-1.5 flex-shrink-0 transition-all ${
                    hasAny
                      ? "bg-slate-900 border-white/15 text-white"
                      : "bg-slate-950/50 border-white/5 opacity-40 text-zinc-500"
                  }`}
                  title={`${lang === "pt" ? mat.name_pt : mat.name}: ${count}`}
                >
                  <span className="text-sm">{mat.icon}</span>
                  <span className={`font-mono text-[10.5px] font-bold ${hasAny ? "text-amber-300" : ""}`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-900/80 border-b border-white/10 flex-shrink-0">
          {[
            ["rings", "💍", lang === "pt" ? "Anéis" : "Rings"],
            ["necklaces", "📿", lang === "pt" ? "Colares" : "Necklaces"],
            ["weapons", "🪄", lang === "pt" ? "Cajados & Mãos" : "Weapons"],
            ["relics", "🔮", lang === "pt" ? "Relíquias" : "Relics"],
            ["apparel", "🥋", lang === "pt" ? "Vestimentas" : "Apparel"],
          ].map(([catKey, icon, label]) => (
            <button
              key={catKey}
              onClick={() => {
                setActiveCategory(catKey);
                const first = FORGE_RECIPES.find(r => r.category === catKey);
                if (first) setSelectedRecipe(first);
              }}
              className={`flex-1 py-1.5 px-1.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1 ${
                activeCategory === catKey
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Recipe Selection & Crafting Stage */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 sm:p-4 flex flex-col md:flex-row gap-3 min-h-[260px]">
          {/* Left Column: Recipe List */}
          <div className="w-full md:w-5/12 space-y-1.5 flex-shrink-0">
            {FORGE_RECIPES.filter(r => r.category === activeCategory).map(recipe => {
              const itm = findItem(recipe.resultItemId);
              const isSelected = currentRecipe.id === recipe.id;
              const isOwned = owned.has(recipe.resultItemId);
              const recipeCanCraft = Object.entries(recipe.cost).every(([mId, qty]) => (materials[mId] || 0) >= qty);
              const rCol = RARITY[itm?.rarity]?.color || "#94A3B8";

              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                    isSelected
                      ? "bg-amber-950/40 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      : "bg-slate-900/60 hover:bg-slate-850 border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">{itm?.icon || "✨"}</span>
                    <div className="min-w-0">
                      <div className="font-serif text-xs font-bold truncate" style={{ color: rCol }}>
                        {lang === "pt" ? itm?.name_pt || itm?.name : itm?.name}
                      </div>
                      <div className="text-[9px] font-sans text-zinc-400 flex items-center gap-1">
                        <span>{RARITY[itm?.rarity]?.label || itm?.rarity}</span>
                        {isOwned && <span className="text-emerald-400 font-bold">· {lang === "pt" ? "Possui" : "Owned"}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isOwned ? (
                      <span className="text-xs text-emerald-400 font-bold">✓</span>
                    ) : recipeCanCraft ? (
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[8.5px] font-bold border border-emerald-500/40 animate-pulse">
                        {lang === "pt" ? "Pronto" : "Ready"}
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-[10px]">🔒</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Anvil Stage for Selected Recipe */}
          <div className="w-full md:w-7/12 rounded-xl bg-slate-950/90 border border-white/10 p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
            {/* Ambient Forge Fire Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
              <div className="w-44 h-44 rounded-full bg-amber-600 blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10">
              {/* Item Preview Card */}
              <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border flex-shrink-0 shadow-md"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    borderColor: RARITY[targetItem?.rarity]?.color || "#E8B44F",
                    boxShadow: `0 0 16px ${RARITY[targetItem?.rarity]?.color || "#E8B44F"}33`,
                  }}
                >
                  <span>{targetItem?.icon || "✨"}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-sm sm:text-base font-bold text-white truncate">
                    {lang === "pt" ? targetItem?.name_pt || targetItem?.name : targetItem?.name}
                  </div>
                  <div
                    className="text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: RARITY[targetItem?.rarity]?.color || "#E8B44F" }}
                  >
                    {RARITY[targetItem?.rarity]?.label} · {targetItem?.category || activeCategory}
                  </div>
                  <p className="text-[10px] font-sans text-zinc-300 leading-snug mt-0.5">
                    {lang === "pt" ? targetItem?.desc_pt || targetItem?.desc : targetItem?.desc}
                  </p>
                </div>
              </div>

              {/* Recipe Cost Materials Requirement Checklist */}
              <div className="mb-3">
                <div className="text-[10px] font-sans text-zinc-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{lang === "pt" ? "Materiais Necessários:" : "Required Materials:"}</span>
                  <span className="text-amber-400/80">{canCraft ? (lang === "pt" ? "✓ Todos os materiais disponíveis" : "✓ All materials ready") : ""}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(currentRecipe.cost).map(([mId, requiredQty]) => {
                    const matObj = findMaterial(mId);
                    const currentQty = materials[mId] || 0;
                    const hasEnough = currentQty >= requiredQty;

                    return (
                      <div
                        key={mId}
                        className={`p-1.5 sm:p-2 rounded-lg border flex items-center justify-between gap-1.5 text-xs ${
                          hasEnough
                            ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                            : "bg-red-950/15 border-red-500/30 text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-base">{matObj.icon}</span>
                          <span className="text-[10px] font-sans font-medium truncate">
                            {lang === "pt" ? matObj.name_pt : matObj.name}
                          </span>
                        </div>
                        <span className={`font-mono text-[11px] font-bold ${hasEnough ? "text-emerald-400" : "text-red-400"}`}>
                          {currentQty}/{requiredQty}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Forge Button */}
            <div className="relative z-10 pt-2 border-t border-white/10">
              {alreadyOwned ? (
                <div className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/10 text-zinc-400 font-serif font-bold text-xs text-center flex items-center justify-center gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>{lang === "pt" ? "Você já possui este item em seu inventário" : "You already own this item"}</span>
                </div>
              ) : (
                <button
                  onClick={handleForge}
                  disabled={!canCraft || forgeAnim}
                  className={`w-full py-2.5 sm:py-3 rounded-xl font-serif text-sm font-bold shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 ${
                    canCraft
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 border border-amber-300 shadow-amber-500/20"
                      : "bg-slate-900 text-zinc-500 border border-white/5 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className={`text-base ${forgeAnim ? "animate-spin" : ""}`}>🔨</span>
                  <span>
                    {forgeAnim
                      ? (lang === "pt" ? "Martelando na bigorna..." : "Forging on anvil...")
                      : canCraft
                      ? (lang === "pt" ? "Forjar Obra-Prima" : "Forge Masterpiece")
                      : (lang === "pt" ? "Materiais Insuficientes" : "Missing Materials")}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-2 sm:p-2.5 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[9.5px] sm:text-[10px] font-sans text-zinc-400 flex-shrink-0">
          <span className="flex items-center gap-1 text-amber-300">
            <span>⛏️</span>
            <span>{lang === "pt" ? "Vença duelos para dropar essências e minérios raros!" : "Win duels to drop rare ores and essences!"}</span>
          </span>
          <span className="hidden xs:inline text-zinc-500">
            {lang === "pt" ? "Chefes de Provas dropam catalisadores lendários garantidos" : "Boss trials guarantee legendary catalysts"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ================= BANNER PÓS-DUELO DE DROPS DE MATERIAIS =================
export function MaterialDropBanner({ drops = {}, lang = "pt" }) {
  const entries = Object.entries(drops).filter(([_, count]) => count > 0);
  if (entries.length === 0) return null;

  return (
    <div className="w-full rounded-xl p-2.5 sm:p-3 my-2 bg-slate-900/90 border border-amber-500/30 text-left shadow-lg">
      <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1.5 pb-1 border-b border-white/10 text-amber-300">
        <span className="flex items-center gap-1.5">
          <span>📦</span>
          <span>{lang === "pt" ? "Materiais Coletados no Duelo" : "Materials Salvaged in Duel"}</span>
        </span>
        <span className="text-[10px] text-zinc-400">
          {lang === "pt" ? "Para a Forja do Brokk" : "For Brokk's Forge"}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {entries.map(([matId, count]) => {
          const mat = findMaterial(matId);
          return (
            <div
              key={matId}
              className="px-2 py-1 rounded-lg border text-[10.5px] font-mono font-bold flex items-center gap-1 shadow-sm"
              style={{
                backgroundColor: mat.bg,
                borderColor: mat.border,
                color: mat.color,
              }}
            >
              <span>{mat.icon}</span>
              <span>+{count} {lang === "pt" ? mat.name_pt : mat.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
