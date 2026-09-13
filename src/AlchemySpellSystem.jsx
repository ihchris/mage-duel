import React, { useState } from "react";
import { MATERIALS } from "./ForgeSystem.jsx";

// ================= DESIGN SYSTEM REFS =================
const T = {
  bgDeep: "#08060F",
  bgBase: "#0F0C1F",
  bgSurface: "#1A1630",
  bgElevated: "#242043",
  bgOverlay: "#0A0814F2",
  borderSubtle: "#2A2444",
  borderDefault: "#3A3356",
  borderStrong: "#4A4270",
  textPrimary: "#F2EAD8",
  textSecondary: "#B7AE95",
  textTertiary: "#8E87A5",
  textMuted: "#5A5478",
  gold: "#E8B44F",
  goldDark: "#C08A2E",
  goldLight: "#FFE28A",
  success: "#22C55E",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#38BDF8",
  fire: "#FF6B3D",
  ice: "#5FC1E8",
  nature: "#72C063",
  arcane: "#B07FF5",
};

// ================= CATÁLOGO DE CONSUMÍVEIS (ESTILO POKÉMON) =================
export const CONSUMABLES = {
  potion_hp_minor: {
    id: "potion_hp_minor",
    name: "Poção Menor de Cura",
    name_en: "Minor Healing Potion",
    category: "health",
    icon: "🧪",
    rarity: "common",
    heal: 35,
    desc: "Restaura imediatamente +35 de Vida em combate.",
    recipe: { mat_sap: 2, shards: 0 },
    yield: 1,
  },
  potion_hp_greater: {
    id: "potion_hp_greater",
    name: "Poção Maior de Cura",
    name_en: "Greater Healing Potion",
    category: "health",
    icon: "💖",
    rarity: "rare",
    heal: 70,
    desc: "Restaura imediatamente +70 de Vida em combate.",
    recipe: { mat_sap: 4, mat_crystal: 1, shards: 5 },
    yield: 1,
  },
  potion_hp_supreme: {
    id: "potion_hp_supreme",
    name: "Néctar da Vida Ancestral",
    name_en: "Supreme Life Nectar",
    category: "health",
    icon: "🍷",
    rarity: "epic",
    heal: 110,
    cleanse: true,
    desc: "Cura massiva de +110 HP e purifica Queimaduras e Congelamento.",
    recipe: { mat_sap: 6, mat_crystal: 2, mat_dragonblood: 1, shards: 15 },
    yield: 1,
  },
  potion_mana_minor: {
    id: "potion_mana_minor",
    name: "Frasco de Mana Menor",
    name_en: "Minor Mana Vial",
    category: "mana",
    icon: "💧",
    rarity: "common",
    mana: 25,
    desc: "Restaura imediatamente +25 de Mana em combate.",
    recipe: { mat_stardust: 2, shards: 0 },
    yield: 1,
  },
  potion_mana_greater: {
    id: "potion_mana_greater",
    name: "Elixir de Mana Puro",
    name_en: "Pure Mana Elixir",
    category: "mana",
    icon: "🔮",
    rarity: "rare",
    mana: 50,
    desc: "Restaura imediatamente +50 de Mana em combate.",
    recipe: { mat_stardust: 4, mat_crystal: 1, shards: 5 },
    yield: 1,
  },
  potion_mana_surge: {
    id: "potion_mana_surge",
    name: "Concentrado Astral de Mana",
    name_en: "Astral Mana Concentrate",
    category: "mana",
    icon: "✨",
    rarity: "epic",
    mana: 60,
    reduceCds: 1,
    desc: "Restaura +60 de Mana e acelera todas recargas ativas em 1 turno.",
    recipe: { mat_stardust: 5, mat_crystal: 2, mat_void_tesseract: 1, shards: 15 },
    yield: 1,
  },
  tonic_stoneskin: {
    id: "tonic_stoneskin",
    name: "Tônico Pele de Pedra",
    name_en: "Stoneskin Tonic",
    category: "defense",
    icon: "🛡️",
    rarity: "common",
    shield: 35,
    desc: "Concede imediatamente uma barreira mágica de +35 de Escudo.",
    recipe: { mat_iron: 2, mat_sap: 2, shards: 0 },
    yield: 1,
  },
  elixir_focus: {
    id: "elixir_focus",
    name: "Elixir do Foco Arcano",
    name_en: "Arcane Focus Elixir",
    category: "defense",
    icon: "⚡",
    rarity: "rare",
    mana: 20,
    shield: 20,
    reduceCds: 1,
    desc: "Concede +20 Mana, +20 Escudo e acelera as recargas em -1 turno.",
    recipe: { mat_stardust: 3, mat_glacial: 2, shards: 8 },
    yield: 1,
  },
  flask_greek_fire: {
    id: "flask_greek_fire",
    name: "Frasco de Fogo Alquímico",
    name_en: "Alchemical Fire Flask",
    category: "offensive",
    icon: "🔥",
    rarity: "rare",
    dmg: 30,
    element: "fire",
    status: { type: "burn", duration: 3 },
    desc: "Arremessa fogo cáustico: 30 Dano Ígneo + 3 turnos de Queimadura.",
    recipe: { mat_ember: 3, mat_iron: 1, shards: 5 },
    yield: 1,
  },
  flask_frostbite: {
    id: "flask_frostbite",
    name: "Ampola de Gelo Primordial",
    name_en: "Primordial Frost Ampoule",
    category: "offensive",
    icon: "❄️",
    rarity: "rare",
    dmg: 25,
    element: "ice",
    status: { type: "chill" },
    desc: "Arremessa gelo perene: 25 Dano Glacial e Congela (Chill 100%) o oponente.",
    recipe: { mat_glacial: 3, mat_stardust: 1, shards: 5 },
    yield: 1,
  },
  draught_phoenix: {
    id: "draught_phoenix",
    name: "Lágrima da Fênix Alquímica",
    name_en: "Phoenix Tear Draught",
    category: "legendary",
    icon: "👑",
    rarity: "legendary",
    heal: 65,
    mana: 35,
    shield: 25,
    cleanse: true,
    desc: "Elixir lendário: +65 Vida, +35 Mana, +25 Escudo e purifica aflições.",
    recipe: { mat_phoenix_core: 1, mat_sap: 3, mat_stardust: 3, shards: 25 },
    yield: 1,
  },
  elixir_celestial: {
    id: "elixir_celestial",
    name: "Ambrósia dos Astros",
    name_en: "Celestial Ambrosia",
    category: "legendary",
    icon: "🌟",
    rarity: "legendary",
    heal: 80,
    mana: 50,
    shield: 30,
    dmg: 30,
    cleanse: true,
    desc: "Milagre celestial: +80 Vida, +50 Mana, +30 Escudo e causa 30 Dano no inimigo!",
    recipe: { mat_celestial_tear: 1, mat_crystal: 3, mat_dragonblood: 2, shards: 40 },
    yield: 1,
  },
};

// Kit de consumíveis iniciais para o jogador já poder testar de imediato
export const DEFAULT_STARTING_CONSUMABLES = {
  potion_hp_minor: 3,
  potion_mana_minor: 3,
  tonic_stoneskin: 1,
  flask_greek_fire: 1,
};

// ================= FEITIÇOS ALQUÍMICOS QUE CRIAM CONSUMÍVEIS =================
export const ALCHEMICAL_SPELLS = [
  {
    id: "alch_transmute_potion",
    name: "Alquimia Espontânea",
    name_pt: "Alquimia Espontânea",
    el: "nature",
    tier: 2,
    role: "support",
    dmg: 0,
    mana: 10,
    cd: 2,
    heal: 22,
    conjureItem: "potion_hp_minor",
    desc: "Cura 22 HP e materializa instantaneamente 1 Poção de Vida na Mochila. CD 2.",
    unlock: {
      type: "alchemist",
      materials: { mat_sap: 4, mat_stardust: 2 },
      shards: 15,
      costLabel: "4x Seiva, 2x Pó de Éter, 15 Shards",
    },
  },
  {
    id: "alch_distill_mana",
    name: "Destilar Éter",
    name_pt: "Destilar Éter",
    el: "arcane",
    tier: 2,
    role: "support",
    dmg: 0,
    mana: 2,
    cd: 2,
    restore: 16,
    conjureItem: "potion_mana_minor",
    desc: "Restaura 16 de Mana e destila 1 Frasco de Mana na Mochila. CD 2.",
    unlock: {
      type: "alchemist",
      materials: { mat_stardust: 4, mat_crystal: 2 },
      shards: 15,
      costLabel: "4x Pó de Éter, 2x Cristal, 15 Shards",
    },
  },
  {
    id: "alch_aegis_stoneskin",
    name: "Égide de Quartzo",
    name_pt: "Égide de Quartzo",
    el: "nature",
    tier: 2,
    role: "control",
    dmg: 12,
    mana: 13,
    cd: 3,
    shield: 24,
    conjureItem: "tonic_stoneskin",
    desc: "12 dano, +24 escudo e sintetiza 1 Tônico Pele de Pedra na Mochila. CD 3.",
    unlock: {
      type: "alchemist",
      materials: { mat_iron: 3, mat_sap: 3 },
      shards: 20,
      costLabel: "3x Ferro Meteórico, 3x Seiva, 20 Shards",
    },
  },
  {
    id: "alch_pyro_distill",
    name: "Frasco Flamejante",
    name_pt: "Frasco Flamejante",
    el: "fire",
    tier: 2,
    role: "attack",
    dmg: 24,
    mana: 14,
    cd: 2,
    conjureItem: "flask_greek_fire",
    desc: "24 dano ígneo + queima e forja 1 Frasco de Fogo Alquímico na Mochila. CD 2.",
    effect: { status: "burn", duration: 2, chance: 100 },
    unlock: {
      type: "alchemist",
      materials: { mat_ember: 4, mat_iron: 2 },
      shards: 20,
      costLabel: "4x Brasa, 2x Ferro, 20 Shards",
    },
  },
  {
    id: "alch_cryo_vial",
    name: "Frasco Criogênico",
    name_pt: "Frasco Criogênico",
    el: "ice",
    tier: 2,
    role: "control",
    dmg: 20,
    mana: 13,
    cd: 2,
    conjureItem: "flask_frostbite",
    desc: "20 dano de gelo + 100% chill e sintetiza 1 Ampola de Gelo na Mochila. CD 2.",
    effect: { status: "chill", chance: 100 },
    unlock: {
      type: "alchemist",
      materials: { mat_glacial: 4, mat_crystal: 2 },
      shards: 20,
      costLabel: "4x Glacial, 2x Cristal, 20 Shards",
    },
  },
  {
    id: "alch_philosopher_touch",
    name: "Toque Filosofal",
    name_pt: "Toque Filosofal",
    el: "arcane",
    tier: 3,
    role: "support",
    dmg: 0,
    mana: 15,
    cd: 3,
    heal: 32,
    restore: 20,
    conjureItem: "draught_phoenix",
    desc: "Milagre Alquímico: Cura 32 HP, +20 Mana e forja 1 Lágrima da Fênix na Mochila. CD 3.",
    unlock: {
      type: "alchemist",
      materials: { mat_phoenix_core: 1, mat_crystal: 4 },
      shards: 40,
      costLabel: "1x Núcleo Fênix, 4x Cristal, 40 Shards",
    },
  },
];

// ================= RECEITAS DE PESQUISA DE FEITIÇOS DE GRIMÓRIO (TOMES) =================
export const GRIMOIRE_CRAFT_RECIPES = [
  {
    skillId: "firewall",
    name: "Muralha de Fogo (Fire Wall)",
    el: "fire",
    tier: 2,
    role: "control",
    desc: "Barricada Flamejante: 14 dano & 14 de escudo.",
    materials: { mat_ember: 4, mat_iron: 2 },
    shards: 15,
  },
  {
    skillId: "sunburst",
    name: "Explosão Solar (Sunburst)",
    el: "fire",
    tier: 3,
    role: "control",
    desc: "Clarão Solar: 34 dano ígneo + 80% chill.",
    materials: { mat_ember: 6, mat_dragonblood: 1, mat_crystal: 2 },
    shards: 30,
  },
  {
    skillId: "blizzard",
    name: "Nevasca (Blizzard)",
    el: "ice",
    tier: 2,
    role: "control",
    desc: "Tempestade Uivante: 28 dano glacial + 100% chill.",
    materials: { mat_glacial: 4, mat_stardust: 2 },
    shards: 15,
  },
  {
    skillId: "absolute_zero",
    name: "Zero Absoluto (Absolute Zero)",
    el: "ice",
    tier: 3,
    role: "control",
    desc: "Congelamento Profundo: 32 dano de gelo puro + 100% chill.",
    materials: { mat_glacial: 6, mat_crystal: 3, mat_void_tesseract: 1 },
    shards: 30,
  },
  {
    skillId: "bramble_wrap",
    name: "Emaranhado de Sarças (Bramble Wrap)",
    el: "nature",
    tier: 2,
    role: "control",
    desc: "Vinhas Vivas: 20 dano + enraíza o oponente por 2 turnos.",
    materials: { mat_sap: 4, mat_ironwood: 2 },
    shards: 15,
  },
  {
    skillId: "spore_cloud",
    name: "Nuvem de Esporos (Spore Cloud)",
    el: "nature",
    tier: 3,
    role: "control",
    desc: "Esporos Tóxicos: 28 dano + veneno profundo de 2 turnos.",
    materials: { mat_sap: 6, mat_dragonblood: 1, mat_crystal: 2 },
    shards: 30,
  },
  {
    skillId: "time_dilation",
    name: "Dilatação Temporal (Time Dilation)",
    el: "arcane",
    tier: 2,
    role: "control",
    desc: "Distorção Crônica: 18 dano + 100% retardo/chill.",
    materials: { mat_stardust: 4, mat_crystal: 2 },
    shards: 15,
  },
  {
    skillId: "void_rift",
    name: "Fenda do Vazio (Void Rift)",
    el: "arcane",
    tier: 3,
    role: "control",
    desc: "Rasgo no Espaço: 32 dano de vácuo + drena 10 de mana do inimigo.",
    materials: { mat_stardust: 6, mat_void_tesseract: 1, mat_crystal: 2 },
    shards: 30,
  },
];

// Helper: calcula o total de consumíveis na bolsa
export function getTotalConsumablesCount(consumables = {}) {
  return Object.values(consumables).reduce((acc, qty) => acc + (Number(qty) || 0), 0);
}

// ================= MODAL ESTILO POKÉMON PARA A BATALHA =================
export function BattleBagModal({
  isOpen,
  onClose,
  consumables = {},
  onUseItem,
  player = {},
  busy = false,
  currentTurn = "player",
  lang = "pt",
}) {
  const [filter, setFilter] = useState("all");

  if (!isOpen) return null;

  const itemsList = Object.keys(CONSUMABLES).map((key) => {
    const item = CONSUMABLES[key];
    const qty = consumables[key] || 0;
    return { ...item, qty };
  });

  const filteredItems = itemsList.filter((item) => {
    if (filter === "all") return true;
    if (filter === "health") return item.category === "health";
    if (filter === "mana") return item.category === "mana";
    if (filter === "defense") return item.category === "defense";
    if (filter === "offensive") return item.category === "offensive";
    if (filter === "legendary") return item.category === "legendary";
    return true;
  });

  // Ordenar: itens com estoque > 0 primeiro
  filteredItems.sort((a, b) => (b.qty > 0 ? 1 : 0) - (a.qty > 0 ? 1 : 0));

  const totalInBag = getTotalConsumablesCount(consumables);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: T.bgBase,
          borderColor: "#10B98188",
          boxShadow: "0 0 35px rgba(16, 185, 129, 0.25), 0 20px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Cabeçalho Estilo Pokémon */}
        <div
          className="p-3 sm:p-4 border-b flex items-center justify-between flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #064E3B 0%, #0F172A 100%)",
            borderColor: "#10B98144",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shadow-inner">
              🎒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-emerald-200">
                  {lang === "pt" ? "Mochila de Batalha" : "Battle Bag"}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  {totalInBag} {lang === "pt" ? "itens" : "items"}
                </span>
              </div>
              <p className="text-[11px] font-mono text-emerald-400/80">
                {lang === "pt"
                  ? "Estilo Pokémon: Usar um item consome seu turno na rodada."
                  : "Pokémon style: Using an item expends your turn action."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors flex items-center justify-center font-bold text-sm"
            title="Voltar aos Feitiços"
          >
            ✕
          </button>
        </div>

        {/* Tactical Status Banner: Player HP & Mana Bars */}
        <div
          className="px-3 sm:px-4 py-2 border-b grid grid-cols-2 gap-2 text-[11px] font-mono flex-shrink-0"
          style={{ backgroundColor: "#0A0814CC", borderColor: T.borderSubtle }}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-zinc-400">
              <span className="font-bold text-emerald-400">❤️ Vida (HP)</span>
              <span>{player.hp || 0} / {player.maxHp || 100}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-emerald-400 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, ((player.hp || 0) / (player.maxHp || 100)) * 100))}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-zinc-400">
              <span className="font-bold text-sky-400">💧 Mana</span>
              <span>{player.mana || 0} / 50</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, ((player.mana || 0) / 50) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-3 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto custom-scrollbar flex-shrink-0 border-b border-zinc-800/60">
          {[
            { id: "all", label: lang === "pt" ? "Todos" : "All", icon: "🎒" },
            { id: "health", label: lang === "pt" ? "Vida" : "Health", icon: "❤️" },
            { id: "mana", label: lang === "pt" ? "Mana" : "Mana", icon: "💧" },
            { id: "defense", label: lang === "pt" ? "Tônicos" : "Tonics", icon: "🛡️" },
            { id: "offensive", label: lang === "pt" ? "Ofensivos" : "Attack", icon: "🔥" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all whitespace-nowrap border ${
                filter === cat.id
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-sm"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de Consumíveis Estilo Card */}
        <div className="p-3 sm:p-4 overflow-y-auto custom-scrollbar flex-1 space-y-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 font-mono text-xs">
              Nenhum item encontrado nesta categoria.
            </div>
          ) : (
            filteredItems.map((item) => {
              const hasStock = item.qty > 0;
              const canUse = hasStock && !busy && currentTurn === "player";

              return (
                <div
                  key={item.id}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    hasStock
                      ? "bg-slate-900/70 border-zinc-700/60 hover:border-emerald-500/60 hover:bg-slate-900/90"
                      : "bg-zinc-950/40 border-zinc-900 opacity-45 cursor-not-allowed"
                  }`}
                  style={{
                    boxShadow: hasStock ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border shadow-inner"
                      style={{
                        backgroundColor: hasStock ? "#064E3B44" : "#18181B",
                        borderColor: hasStock ? "#10B98155" : "#27272A",
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-bold text-sm text-zinc-100 truncate">
                          {lang === "pt" ? item.name : item.name_en}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold ${
                            hasStock
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          x{item.qty}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5 line-clamp-1 sm:line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onUseItem && onUseItem(item)}
                    disabled={!canUse}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-mono text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1.5 shadow-md ${
                      canUse
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white cursor-pointer active:scale-95 shadow-emerald-950"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                    }`}
                  >
                    <span>✨</span>
                    <span>{hasStock ? (lang === "pt" ? "Usar" : "Use") : (lang === "pt" ? "Vazio" : "Empty")}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé: Botão Voltar aos Feitiços */}
        <div
          className="p-3 border-t flex items-center justify-between flex-shrink-0"
          style={{ backgroundColor: "#08060F", borderColor: T.borderSubtle }}
        >
          <span className="text-[11px] font-mono text-zinc-500">
            {lang === "pt" ? "Pressione ESC ou clique abaixo para cancelar." : "Press ESC or click below to cancel."}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-mono text-xs font-semibold transition-colors"
          >
            {lang === "pt" ? "Voltar aos Feitiços ↩" : "Back to Spells ↩"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= MODAL DO NPC ARQUIMAGA LYRA (SANCTUM DE FEITIÇOS & ALQUIMIA) =================
export function AlchemySanctumModal({
  isOpen,
  onClose,
  materials = {},
  shards = 0,
  consumables = {},
  unlockedSkills = new Set(),
  onCraftConsumable,
  onLearnSpell,
  lang = "pt",
}) {
  const [tab, setTab] = useState("brewing"); // "brewing", "spells", "pouch"
  const [craftingNotice, setCraftingNotice] = useState(null);
  const [isBrewingAnim, setIsBrewingAnim] = useState(false);

  if (!isOpen) return null;

  // Helper para verificar se jogador tem materiais suficientes
  function checkRequirements(reqMats = {}, reqShards = 0) {
    if (shards < reqShards) return false;
    for (const [mId, needed] of Object.entries(reqMats)) {
      if ((materials[mId] || 0) < needed) return false;
    }
    return true;
  }

  // Ação de criar consumível
  function handleBrew(item, multiplier = 1) {
    const totalCost = {};
    for (const [mId, cost] of Object.entries(item.recipe)) {
      if (mId === "shards") continue;
      totalCost[mId] = cost * multiplier;
    }
    const shardCost = (item.recipe.shards || 0) * multiplier;

    if (!checkRequirements(totalCost, shardCost)) return;

    setIsBrewingAnim(true);
    setTimeout(() => {
      setIsBrewingAnim(false);
      onCraftConsumable(item.id, totalCost, shardCost, (item.yield || 1) * multiplier);
      setCraftingNotice(
        `✨ Destilação concluída! +${(item.yield || 1) * multiplier}x [${item.name}] foram guardados na sua Mochila.`
      );
      setTimeout(() => setCraftingNotice(null), 3500);
    }, 600);
  }

  // Ação de forjar/aprender feitiço no grimório
  function handleSpellCraft(spellRecipe) {
    const skillId = spellRecipe.id || spellRecipe.skillId;
    if (unlockedSkills.has(skillId)) return;

    const reqMats = spellRecipe.unlock?.materials || spellRecipe.materials || {};
    const reqShards = spellRecipe.unlock?.shards || spellRecipe.shards || 0;

    if (!checkRequirements(reqMats, reqShards)) return;

    setIsBrewingAnim(true);
    setTimeout(() => {
      setIsBrewingAnim(false);
      onLearnSpell(skillId, reqMats, reqShards);
      setCraftingNotice(
        `📖 Feitiço decifrado com sucesso! [${spellRecipe.name}] agora está disponível no seu Grimório!`
      );
      setTimeout(() => setCraftingNotice(null), 4000);
    }, 700);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden relative"
        style={{
          backgroundColor: T.bgBase,
          borderColor: "#A855F788",
          boxShadow: "0 0 45px rgba(168, 85, 247, 0.25), 0 20px 45px rgba(0,0,0,0.8)",
        }}
      >
        {/* Banner do NPC Arquimaga Lyra */}
        <div
          className="p-3 sm:p-4 border-b flex items-center justify-between flex-shrink-0 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #3B0764 0%, #1E1B4B 50%, #0F0C1F 100%)",
            borderColor: "#A855F744",
          }}
        >
          {/* Brilho de fundo místico */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg flex-shrink-0">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-2xl relative overflow-hidden">
                <span>🧙‍♀️</span>
                <span className="absolute bottom-0 right-0 text-[10px]">✨</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg sm:text-xl text-purple-200">
                  Arquimaga Lyra
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-semibold">
                  Alquimia & Grimórios
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-purple-300/80 mt-0.5 italic max-w-md">
                "As essências do éter obedecem à sabedoria ancestral. O que deseja transmutar hoje, duelista?"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {/* Shards Wallet Pill */}
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/70 border border-purple-500/40 text-xs font-mono font-bold text-amber-300 shadow-sm">
              <span>✦</span>
              <span>{shards} Shards</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors flex items-center justify-center font-bold text-sm"
              title="Fechar Santuário"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Feedback de Criação / Notificação Flutuante */}
        {craftingNotice && (
          <div className="px-4 py-2 bg-gradient-to-r from-emerald-950/90 to-purple-950/90 border-b border-emerald-500/50 text-emerald-300 font-mono text-xs text-center animate-pulse flex-shrink-0">
            {craftingNotice}
          </div>
        )}

        {/* Navegação de Abas do NPC */}
        <div className="px-3 sm:px-4 py-2 border-b border-zinc-800 bg-[#0A0814] flex items-center justify-between gap-2 overflow-x-auto flex-shrink-0">
          <div className="flex items-center gap-1.5">
            {[
              { id: "brewing", label: lang === "pt" ? "🧪 Caldeirão Alquímico" : "🧪 Cauldron Brewing" },
              { id: "spells", label: lang === "pt" ? "📜 Pesquisa de Feitiços" : "📜 Spell Scribe" },
              { id: "pouch", label: lang === "pt" ? "🎒 Minha Mochila" : "🎒 My Bag" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  tab === t.id
                    ? "bg-purple-600/25 border-purple-400 text-purple-200 shadow-md shadow-purple-950"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Saldo de Shards no Mobile */}
          <div className="xs:hidden flex items-center gap-1 text-[11px] font-mono text-amber-300 font-bold">
            <span>✦ {shards}</span>
          </div>
        </div>

        {/* Resumo Rápido de Materiais do Jogador */}
        <div className="px-3 sm:px-4 py-1.5 bg-black/40 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto custom-scrollbar flex-shrink-0 text-[10.5px] font-mono">
          <span className="text-zinc-500 flex-shrink-0">Ingredientes:</span>
          {MATERIALS.slice(0, 6).map((m) => (
            <span
              key={m.id}
              className="px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 flex items-center gap-1 whitespace-nowrap"
            >
              <span>{m.icon}</span>
              <span>{materials[m.id] || 0}</span>
            </span>
          ))}
          <span className="text-zinc-600 text-[9px]">+outros</span>
        </div>

        {/* Conteúdo das Abas */}
        <div className="p-3 sm:p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
          {/* ABA 1: CALDEIRÃO ALQUÍMICO (DESTILAÇÃO DE CONSUMÍVEIS) */}
          {tab === "brewing" && (
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs font-mono text-purple-300/90 flex items-center gap-2">
                <span>💡</span>
                <span>
                  Use os materiais dropados nos duelos para destilar poções e elixires. Eles podem ser usados em combate como no Pokémon!
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {Object.values(CONSUMABLES).map((item) => {
                  const reqMats = {};
                  for (const [mId, cost] of Object.entries(item.recipe)) {
                    if (mId !== "shards") reqMats[mId] = cost;
                  }
                  const reqShards = item.recipe.shards || 0;
                  const canAfford = checkRequirements(reqMats, reqShards);
                  const inBag = consumables[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border bg-slate-900/60 border-zinc-800 hover:border-purple-500/50 transition-all flex flex-col justify-between gap-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-serif font-bold text-sm text-zinc-100">
                                {item.name}
                              </h4>
                            </div>
                            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex-shrink-0">
                          Bolsa: {inBag}x
                        </span>
                      </div>

                      {/* Lista de Requisitos de Materiais */}
                      <div className="p-2 rounded-lg bg-black/40 border border-zinc-800/80 flex flex-wrap items-center gap-2 text-[10.5px] font-mono">
                        <span className="text-zinc-500">Custo:</span>
                        {Object.entries(reqMats).map(([mId, needed]) => {
                          const matDef = MATERIALS.find((m) => m.id === mId);
                          const have = materials[mId] || 0;
                          const ok = have >= needed;
                          return (
                            <span
                              key={mId}
                              className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                ok
                                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                                  : "bg-red-950/40 border-red-500/40 text-red-300"
                              }`}
                            >
                              <span>{matDef?.icon || "📦"}</span>
                              <span>
                                {have}/{needed} {matDef?.name_pt || mId}
                              </span>
                            </span>
                          );
                        })}
                        {reqShards > 0 && (
                          <span
                            className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                              shards >= reqShards
                                ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                                : "bg-red-950/40 border-red-500/40 text-red-300"
                            }`}
                          >
                            <span>✦</span>
                            <span>
                              {shards}/{reqShards} Shards
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Botões de Ação */}
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-800/60">
                        <button
                          onClick={() => handleBrew(item, 1)}
                          disabled={!canAfford || isBrewingAnim}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 ${
                            canAfford && !isBrewingAnim
                              ? "bg-purple-600 hover:bg-purple-500 text-white cursor-pointer active:scale-95 shadow-md shadow-purple-950"
                              : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                          }`}
                        >
                          <span>⚗️</span>
                          <span>Destilar (+1)</span>
                        </button>
                        <button
                          onClick={() => handleBrew(item, 3)}
                          disabled={!checkRequirements(
                            Object.fromEntries(Object.entries(reqMats).map(([k, v]) => [k, v * 3])),
                            reqShards * 3
                          ) || isBrewingAnim}
                          className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all border ${
                            checkRequirements(
                              Object.fromEntries(Object.entries(reqMats).map(([k, v]) => [k, v * 3])),
                              reqShards * 3
                            ) && !isBrewingAnim
                              ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/20 cursor-pointer"
                              : "border-zinc-800 text-zinc-600 cursor-not-allowed"
                          }`}
                          title="Destilar lote de 3 unidades"
                        >
                          Lote (+3)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: PESQUISA DE FEITIÇOS (CRAFT DE SPELLS EXCLUSIVAS & TOMES) */}
          {tab === "spells" && (
            <div className="space-y-4">
              <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs font-mono text-indigo-300/90 flex items-center gap-2">
                <span>📖</span>
                <span>
                  Forje feitiços alquímicos exclusivos capazes de materializar consumíveis em combate ou aprenda pergaminhos antigos de Grimório!
                </span>
              </div>

              {/* Seção A: Feitiços Alquímicos Únicos */}
              <div>
                <h3 className="font-serif font-bold text-sm text-purple-200 mb-2 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Feitiços Alquímicos (Conjuradores de Consumíveis)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {ALCHEMICAL_SPELLS.map((spell) => {
                    const isLearned = unlockedSkills.has(spell.id);
                    const reqMats = spell.unlock?.materials || {};
                    const reqShards = spell.unlock?.shards || 0;
                    const canAfford = checkRequirements(reqMats, reqShards);

                    return (
                      <div
                        key={spell.id}
                        className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                          isLearned
                            ? "bg-slate-900/40 border-emerald-500/30"
                            : "bg-slate-900/70 border-zinc-800 hover:border-purple-500/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">
                                {spell.el === "fire" ? "🔥" : spell.el === "ice" ? "❄️" : spell.el === "nature" ? "🌿" : "✶"}
                              </span>
                              <h4 className="font-serif font-bold text-sm text-zinc-100">
                                {spell.name_pt || spell.name}
                              </h4>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/30 text-purple-300">
                                T{spell.tier}
                              </span>
                            </div>

                            {isLearned ? (
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ Aprendido
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                                Bloqueado
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] font-mono text-zinc-300 mt-1">
                            {spell.desc}
                          </p>

                          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-zinc-400">
                            <span>💧 Custo: {spell.mana} Mana</span>
                            <span>⏱️ Recarga: {spell.cd}t</span>
                            <span className="text-emerald-400">🎒 Conjura Consumível</span>
                          </div>
                        </div>

                        {/* Requisitos de Materiais para Desbloquear */}
                        {!isLearned && (
                          <div className="p-2 rounded-lg bg-black/40 border border-zinc-800 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                            <span className="text-zinc-500">Requer:</span>
                            {Object.entries(reqMats).map(([mId, needed]) => {
                              const matDef = MATERIALS.find((m) => m.id === mId);
                              const have = materials[mId] || 0;
                              const ok = have >= needed;
                              return (
                                <span
                                  key={mId}
                                  className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                    ok
                                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                                      : "bg-red-950/40 border-red-500/40 text-red-300"
                                  }`}
                                >
                                  <span>{matDef?.icon || "📦"}</span>
                                  <span>
                                    {have}/{needed} {matDef?.name_pt || mId}
                                  </span>
                                </span>
                              );
                            })}
                            {reqShards > 0 && (
                              <span
                                className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                  shards >= reqShards
                                    ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                                    : "bg-red-950/40 border-red-500/40 text-red-300"
                                }`}
                              >
                                <span>✦</span>
                                <span>
                                  {shards}/{reqShards}
                                </span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Botão de Forjar Feitiço */}
                        <div className="flex items-center justify-end pt-1">
                          {isLearned ? (
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                              <span>✓</span>
                              <span>Disponível para equipar no Grimório</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSpellCraft(spell)}
                              disabled={!canAfford || isBrewingAnim}
                              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 ${
                                canAfford && !isBrewingAnim
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white cursor-pointer active:scale-95 shadow-md"
                                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                              }`}
                            >
                              <span>✨</span>
                              <span>Aprender Feitiço</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Seção B: Feitiços de Grimório Ancestral (Tomes) */}
              <div className="pt-3 border-t border-zinc-800">
                <h3 className="font-serif font-bold text-sm text-indigo-200 mb-2 flex items-center gap-1.5">
                  <span>📜</span>
                  <span>Pergaminhos Antigos de Grimório (Tomes)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {GRIMOIRE_CRAFT_RECIPES.map((recipe) => {
                    const isLearned = unlockedSkills.has(recipe.skillId);
                    const canAfford = checkRequirements(recipe.materials, recipe.shards);

                    return (
                      <div
                        key={recipe.skillId}
                        className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                          isLearned
                            ? "bg-slate-900/40 border-emerald-500/30"
                            : "bg-slate-900/70 border-zinc-800 hover:border-indigo-500/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1.5">
                            <h4 className="font-serif font-bold text-sm text-zinc-100">
                              {recipe.name}
                            </h4>
                            {isLearned ? (
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ Aprendido
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                                Desbloqueável
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-zinc-300 mt-1">
                            {recipe.desc}
                          </p>
                        </div>

                        {!isLearned && (
                          <div className="p-2 rounded-lg bg-black/40 border border-zinc-800 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                            <span className="text-zinc-500">Requer:</span>
                            {Object.entries(recipe.materials).map(([mId, needed]) => {
                              const matDef = MATERIALS.find((m) => m.id === mId);
                              const have = materials[mId] || 0;
                              const ok = have >= needed;
                              return (
                                <span
                                  key={mId}
                                  className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                    ok
                                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                                      : "bg-red-950/40 border-red-500/40 text-red-300"
                                  }`}
                                >
                                  <span>{matDef?.icon || "📦"}</span>
                                  <span>
                                    {have}/{needed} {matDef?.name_pt || mId}
                                  </span>
                                </span>
                              );
                            })}
                            {recipe.shards > 0 && (
                              <span
                                className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                  shards >= recipe.shards
                                    ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                                    : "bg-red-950/40 border-red-500/40 text-red-300"
                                }`}
                              >
                                <span>✦</span>
                                <span>
                                  {shards}/{recipe.shards}
                                </span>
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-end pt-1">
                          {isLearned ? (
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                              ✓ Já presente no Grimório
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSpellCraft(recipe)}
                              disabled={!canAfford || isBrewingAnim}
                              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1 ${
                                canAfford && !isBrewingAnim
                                  ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer active:scale-95 shadow-md"
                                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                              }`}
                            >
                              <span>📖</span>
                              <span>Decifrar Feitiço</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: MINHA MOCHILA (INSPEÇÃO DE CONSUMÍVEIS) */}
          {tab === "pouch" && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-zinc-100">
                    Bolsa Tática de Combate
                  </h4>
                  <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    Estes itens ficam disponíveis para uso direto durante suas batalhas.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-zinc-500">Capacidade:</span>
                  <div className="font-mono text-base font-bold text-emerald-400">
                    {getTotalConsumablesCount(consumables)} itens
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Object.values(CONSUMABLES).map((item) => {
                  const qty = consumables[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                        qty > 0
                          ? "bg-slate-900/80 border-emerald-500/30"
                          : "bg-black/30 border-zinc-800/60 opacity-40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-xs text-zinc-200 truncate">
                            {item.name}
                          </span>
                          <span className="font-mono text-xs font-bold text-emerald-300">
                            x{qty}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div
          className="p-3 border-t flex items-center justify-between flex-shrink-0"
          style={{ backgroundColor: "#08060F", borderColor: T.borderSubtle }}
        >
          <span className="text-[11px] font-mono text-zinc-400">
            {lang === "pt"
              ? "Arquimaga Lyra · Dicas: Combine feitiços de alquimia para nunca ficar sem poções!"
              : "Archmage Lyra · Tip: Use alchemy spells in duel to regenerate consumables!"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-purple-500/40 text-purple-200 hover:bg-purple-500/20 font-mono text-xs font-semibold transition-colors"
          >
            {lang === "pt" ? "Fechar Santuário" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
