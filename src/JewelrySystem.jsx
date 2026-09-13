import React from "react";

// ================= TABELA DE ANÉIS ARCANOS (JEWELRY GEAR) =================
export const RINGS = [
  {
    id: "ring_none",
    name: "No Ring",
    name_pt: "Sem Anel",
    rarity: "common",
    el: null,
    desc: "Empty ring socket. Equip an arcane ring to gain battle synergies.",
    desc_pt: "Engaste de anel vazio. Equipe um anel arcano para obter sinergias de batalha.",
    icon: "💍",
    gemColor: "#94A3B8",
    bandColor: "#64748B",
  },
  {
    id: "ring_cinder",
    name: "Cinder Spark Ring",
    name_pt: "Anel da Fagulha Viva",
    rarity: "common",
    el: "fire",
    elBonus: 0.05,
    burnManaRestore: true,
    desc: "+5% Fire dmg · Restores +1 Mana when casting Fire on a Burning target",
    desc_pt: "+5% Dano de Fogo · Restaura +1 Mana ao lançar Fogo em alvo Queimando",
    icon: "🔥",
    gemColor: "#EF4444",
    bandColor: "#F59E0B",
  },
  {
    id: "ring_combustion",
    name: "Seal of Fast Combustion",
    name_pt: "Selo da Combustão Rápida",
    rarity: "epic",
    el: "fire",
    elBonus: 0.08,
    burnDetonateBonus: 0.30,
    desc: "+8% Fire dmg · Burn Detonation combo deals +30% extra damage",
    desc_pt: "+8% Dano de Fogo · Combo de Detonação de Chamas causa +30% de dano extra",
    icon: "🌋",
    gemColor: "#DC2626",
    bandColor: "#78350F",
  },
  {
    id: "ring_glacier",
    name: "Hoop of Permafrost",
    name_pt: "Aro da Geada Eterna",
    rarity: "common",
    el: "ice",
    elBonus: 0.05,
    startShield: 5,
    desc: "+5% Ice dmg · Begin duels with +5 Glacial Barrier",
    desc_pt: "+5% Dano de Gelo · Inicia o duelo com +5 de Barreira Glacial",
    icon: "❄️",
    gemColor: "#38BDF8",
    bandColor: "#CBD5E1",
  },
  {
    id: "ring_shatter",
    name: "Band of the Rime Piercer",
    name_pt: "Aliança do Perfurador Glacial",
    rarity: "epic",
    el: "ice",
    elBonus: 0.08,
    freezeShatterBonus: 6,
    desc: "+8% Ice dmg · Shattering a Frozen enemy inflicts +6 bonus pierce damage",
    desc_pt: "+8% Dano de Gelo · Quebrar gelo do alvo causa +6 de dano perfurante extra",
    icon: "💎",
    gemColor: "#0284C7",
    bandColor: "#94A3B8",
  },
  {
    id: "ring_spore",
    name: "Band of Vital Spores",
    name_pt: "Banda dos Esporos Vitais",
    rarity: "rare",
    el: "nature",
    elBonus: 0.05,
    natureShieldHeal: 4,
    desc: "+5% Nature dmg · While Barrier is active, Nature spells heal +4 HP",
    desc_pt: "+5% Dano de Natureza · Com Barreira ativa, magias de Natureza curam +4 HP",
    icon: "🌿",
    gemColor: "#22C55E",
    bandColor: "#B45309",
  },
  {
    id: "ring_ironroot",
    name: "Link of the Ironwood",
    name_pt: "Elo da Raiz-de-Ferro",
    rarity: "epic",
    el: "nature",
    maxHpBonus: 6,
    dmgReduction: 0.05,
    desc: "+6 Max HP · -5% damage taken · Roots are deeply anchored",
    desc_pt: "+6 Vida Máxima · -5% dano recebido · Raízes firmes e inquebráveis",
    icon: "🪵",
    gemColor: "#15803D",
    bandColor: "#451A03",
  },
  {
    id: "ring_runic",
    name: "Seal of Runic Spiral",
    name_pt: "Selo da Espiral Rúnica",
    rarity: "rare",
    el: "arcane",
    elBonus: 0.06,
    crit: 5,
    desc: "+6% Arcane dmg · +5% critical strike chance",
    desc_pt: "+6% Dano Arcano · +5% de chance de acerto crítico",
    icon: "⚡",
    gemColor: "#A855F7",
    bandColor: "#FDE047",
  },
  {
    id: "ring_singularity",
    name: "Void Singularity Ring",
    name_pt: "Anel da Singularidade",
    rarity: "legendary",
    el: "arcane",
    elBonus: 0.10,
    critManaRestore: 2,
    desc: "+10% Arcane dmg · Critical strikes immediately restore +2 Mana",
    desc_pt: "+10% Dano Arcano · Acertos críticos restauram +2 de Mana instantaneamente",
    icon: "🕳️",
    gemColor: "#7C3AED",
    bandColor: "#1E1B4B",
  },
  {
    id: "ring_chronos",
    name: "Time Weaver Band",
    name_pt: "Aliança do Tecelão Temporal",
    rarity: "epic",
    el: null,
    maxManaBonus: 2,
    focusCdReduction: 1,
    desc: "+2 Max Mana · Using 'Focus' reduces all spell cooldowns by 1 turn",
    desc_pt: "+2 Mana Máxima · Usar 'Foco' reduz o tempo de recarga das magias em 1 turno",
    icon: "⏱️",
    gemColor: "#F59E0B",
    bandColor: "#94A3B8",
  },
  {
    id: "ring_prismatic",
    name: "Prismatic Horizon Ring",
    name_pt: "Anel do Prisma Elemental",
    rarity: "legendary",
    el: null,
    offAffinityBonus: 0.15,
    crit: 6,
    desc: "+15% damage & +6% crit on spells outside your main affinity",
    desc_pt: "+15% dano e +6% crítico em feitiços fora da afinidade principal",
    icon: "🌈",
    gemColor: "#F43F5E",
    bandColor: "#FBBF24",
  },
];

export function findRing(id) {
  return RINGS.find(r => r.id === id) || RINGS[0];
}

// ================= ÍCONE VETORIAL SVG PARA ANÉIS =================
export function RingVectorIcon({ ring, size = 32 }) {
  if (!ring || ring.id === "ring_none") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" className="opacity-40">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#64748B" strokeWidth="2.5" strokeDasharray="3 3" />
        <circle cx="20" cy="10" r="3" fill="#475569" />
      </svg>
    );
  }

  const band = ring.bandColor || "#F59E0B";
  const gem = ring.gemColor || "#EF4444";

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
      {/* Outer Metallic Ring Band */}
      <circle cx="20" cy="22" r="13" fill="none" stroke={band} strokeWidth="3.5" />
      {/* Inner Rim Highlight */}
      <circle cx="20" cy="22" r="13" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
      {/* Bottom Ring Shading */}
      <path d="M12 28 C 15 35, 25 35, 28 28" fill="none" stroke="#000000" strokeWidth="2" opacity="0.35" />
      
      {/* Gem Socket Mount */}
      <rect x="15.5" y="8" width="9" height="4" rx="1" fill={band} stroke="#000000" strokeWidth="0.6" />
      
      {/* Glowing Gemstone */}
      <circle cx="20" cy="8" r="6" fill={gem} className="animate-pulse" opacity="0.4" />
      <polygon points="20,3 25,8 20,13 15,8" fill={gem} stroke="#FFFFFF" strokeWidth="0.8" />
      <circle cx="18.5" cy="6.5" r="1.2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// ================= COMPONENTE INTERATIVO DE JOALHERIA (UI) =================
export function JewelryGearSection({
  ring1Id,
  ring2Id,
  onEquipRing,
  onUnequipRing,
  ownedRingIds,
  lang = "pt",
  RARITY,
}) {
  const [activeSlot, setActiveSlot] = React.useState(1); // 1 = Ring 1, 2 = Ring 2

  const ring1 = findRing(ring1Id);
  const ring2 = findRing(ring2Id);

  return (
    <div className="w-full">
      {/* Header Info & Sub-Slots */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">💍</span>
            <span className="font-serif font-bold text-sm sm:text-base text-amber-200">
              {lang === "pt" ? "Joalheria Arcana (2 Slots de Anéis)" : "Arcane Jewelry (2 Ring Sockets)"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {lang === "pt" ? "Selecione o slot e clique no anel" : "Select socket & tap ring"}
          </span>
        </div>
        <p className="text-[10.5px] font-sans text-zinc-400">
          {lang === "pt"
            ? "Anéis concedem passivas reativas, bônus elementais e cura/mana em combate. Equipe até 2 anéis simultâneos."
            : "Rings grant reactive passives, elemental damage, and combat sustain. Equip up to 2 unique rings."}
        </p>
      </div>

      {/* Interactive 2 Ring Sockets (Top Cards) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        {/* Socket 1: Left Ring */}
        <div
          onClick={() => setActiveSlot(1)}
          className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            activeSlot === 1
              ? "bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
              : "bg-slate-900/60 border-white/10 hover:border-white/20"
          }`}
        >
          {activeSlot === 1 && (
            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[8px] tracking-wider uppercase">
              {lang === "pt" ? "Equipando Aqui" : "Active Slot"}
            </span>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-950/80 border border-white/10 flex items-center justify-center flex-shrink-0">
              <RingVectorIcon ring={ring1} size={28} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-sans text-zinc-400 uppercase tracking-wider">
                {lang === "pt" ? "Anel 1 (Esquerdo)" : "Ring 1 (Left)"}
              </div>
              <div className="font-serif text-xs sm:text-sm font-bold text-amber-200 truncate">
                {ring1.id !== "ring_none" ? (lang === "pt" ? ring1.name_pt : ring1.name) : (lang === "pt" ? "Vazio" : "Empty")}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-sans pt-1 border-t border-white/5">
            <span className="text-zinc-400 truncate">
              {ring1.id !== "ring_none" ? (lang === "pt" ? ring1.desc_pt : ring1.desc) : (lang === "pt" ? "Toque em um anel abaixo" : "Tap a ring below to equip")}
            </span>
            {ring1.id !== "ring_none" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnequipRing(1);
                }}
                className="text-[9px] font-bold text-red-400 hover:text-red-300 ml-1 flex-shrink-0"
              >
                ✕ {lang === "pt" ? "Tirar" : "Remove"}
              </button>
            )}
          </div>
        </div>

        {/* Socket 2: Right Ring */}
        <div
          onClick={() => setActiveSlot(2)}
          className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            activeSlot === 2
              ? "bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
              : "bg-slate-900/60 border-white/10 hover:border-white/20"
          }`}
        >
          {activeSlot === 2 && (
            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[8px] tracking-wider uppercase">
              {lang === "pt" ? "Equipando Aqui" : "Active Slot"}
            </span>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-950/80 border border-white/10 flex items-center justify-center flex-shrink-0">
              <RingVectorIcon ring={ring2} size={28} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-sans text-zinc-400 uppercase tracking-wider">
                {lang === "pt" ? "Anel 2 (Direito)" : "Ring 2 (Right)"}
              </div>
              <div className="font-serif text-xs sm:text-sm font-bold text-amber-200 truncate">
                {ring2.id !== "ring_none" ? (lang === "pt" ? ring2.name_pt : ring2.name) : (lang === "pt" ? "Vazio" : "Empty")}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-sans pt-1 border-t border-white/5">
            <span className="text-zinc-400 truncate">
              {ring2.id !== "ring_none" ? (lang === "pt" ? ring2.desc_pt : ring2.desc) : (lang === "pt" ? "Toque em um anel abaixo" : "Tap a ring below to equip")}
            </span>
            {ring2.id !== "ring_none" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnequipRing(2);
                }}
                className="text-[9px] font-bold text-red-400 hover:text-red-300 ml-1 flex-shrink-0"
              >
                ✕ {lang === "pt" ? "Tirar" : "Remove"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ring Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {RINGS.filter(r => r.id !== "ring_none").map(r => {
          const isOwned = ownedRingIds.has(r.id);
          const isEquippedSlot1 = ring1Id === r.id;
          const isEquippedSlot2 = ring2Id === r.id;
          const isEquipped = isEquippedSlot1 || isEquippedSlot2;
          const rarityData = RARITY[r.rarity] || { color: "#94A3B8", label: "Comum" };

          return (
            <div
              key={r.id}
              onClick={() => {
                if (!isOwned) return;
                onEquipRing(r.id, activeSlot);
              }}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all relative overflow-hidden select-none ${
                !isOwned
                  ? "opacity-50 cursor-not-allowed bg-slate-950/40 border-white/5"
                  : isEquipped
                  ? "bg-amber-950/30 border-amber-400/80 shadow-md cursor-pointer"
                  : "bg-slate-900/70 hover:bg-slate-850 border-white/10 hover:border-amber-400/50 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <RingVectorIcon ring={r} size={24} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif text-xs sm:text-sm font-bold text-zinc-100 truncate block">
                      {!isOwned && "🔒 "}
                      {lang === "pt" ? r.name_pt : r.name}
                    </span>
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border inline-block"
                      style={{
                        borderColor: `${rarityData.color}66`,
                        color: rarityData.color,
                        backgroundColor: `${rarityData.color}15`,
                      }}
                    >
                      {rarityData.label}
                    </span>
                  </div>
                </div>

                {isEquipped && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-mono font-bold shadow">
                    {isEquippedSlot1 && isEquippedSlot2 ? "Anel 1 & 2" : isEquippedSlot1 ? "Anel 1" : "Anel 2"}
                  </span>
                )}
              </div>

              <p className="text-[10px] sm:text-[11px] font-sans text-zinc-300 leading-snug">
                {isOwned
                  ? (lang === "pt" ? r.desc_pt : r.desc)
                  : (lang === "pt" ? "Bloqueado · Desbloqueie em duelos ou na Loja Arcana." : "Locked · Drops from duels or Arcane Shop.")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
