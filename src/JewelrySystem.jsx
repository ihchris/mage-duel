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

// ================= TABELA DE COLARES ARCANOS (NECKLACE GEAR) =================
export const NECKLACES = [
  {
    id: "necklace_none",
    name: "No Necklace",
    name_pt: "Sem Colar",
    rarity: "common",
    el: null,
    desc: "Empty neck socket. Equip an arcane necklace or talisman for combat blessings.",
    desc_pt: "Sem colar equipado. Equipe um colar arcano para bênçãos e atributos de combate.",
    icon: "📿",
    cordColor: "#64748B",
    gemColor: "#94A3B8",
  },
  {
    id: "necklace_apprentice",
    name: "Apprentice Talisman",
    name_pt: "Talismã do Aprendiz",
    rarity: "common",
    el: null,
    maxHpBonus: 6,
    maxManaBonus: 2,
    desc: "+6 Max HP · +2 Max Mana · Braided cord with an apprentice focus stone",
    desc_pt: "+6 Vida Máxima · +2 Mana Máxima · Cordão trançado com pedra de foco de aprendiz",
    icon: "📿",
    cordColor: "#78350F",
    gemColor: "#60A5FA",
  },
  {
    id: "necklace_amber_tear",
    name: "Amber Tear of Pyros",
    name_pt: "Lágrima de Âmbar Flamejante",
    rarity: "rare",
    el: "fire",
    elBonus: 0.08,
    startShield: 4,
    desc: "+8% Fire dmg · +4 Start Shield · Primordial amber crystal burning with eternal embers",
    desc_pt: "+8% Dano de Fogo · +4 Escudo Inicial · Cristal de âmbar com brasas eternas",
    icon: "🔥",
    cordColor: "#D97706",
    gemColor: "#EF4444",
  },
  {
    id: "necklace_frost_gem",
    name: "Glacial Heart Pendant",
    name_pt: "Pingente do Coração Glacial",
    rarity: "rare",
    el: "ice",
    elBonus: 0.08,
    dmgReduction: 0.04,
    desc: "+8% Ice dmg · -4% damage taken · Flawless sapphire cut from millennium rime ice",
    desc_pt: "+8% Dano de Gelo · -4% Dano Recebido · Safira pura lapidada de gelo milenar",
    icon: "❄️",
    cordColor: "#CBD5E1",
    gemColor: "#38BDF8",
  },
  {
    id: "necklace_sylvan_locket",
    name: "Sylvan Blossom Locket",
    name_pt: "Medalhão da Flor Silvestre",
    rarity: "rare",
    el: "nature",
    elBonus: 0.08,
    healBonus: 0.20,
    desc: "+8% Nature dmg · +20% healing potency · Living wood locket blessed by dryads",
    desc_pt: "+8% Dano de Natureza · +20% Eficácia de Cura · Madeira viva abençoada pelas dríades",
    icon: "🌿",
    cordColor: "#15803D",
    gemColor: "#22C55E",
  },
  {
    id: "necklace_astral_choker",
    name: "Astral Leyline Choker",
    name_pt: "Gargantilha das Linhas de Ley",
    rarity: "rare",
    el: "arcane",
    elBonus: 0.08,
    regen: 1,
    desc: "+8% Arcane dmg · +1 Mana/turn · Star-silver chain aligned with cosmic leylines",
    desc_pt: "+8% Dano Arcano · +1 Mana/turno · Corrente de prata estelar alinhada aos leylines",
    icon: "⚡",
    cordColor: "#94A3B8",
    gemColor: "#A855F7",
  },
  {
    id: "necklace_phoenix_heart",
    name: "Heart of the Phoenix",
    name_pt: "Coração da Fênix",
    rarity: "epic",
    el: "fire",
    maxHpBonus: 10,
    fireBonus: 0.10,
    clutchHeal: 14,
    desc: "+10 Max HP · +10% Fire dmg · Restores +14 HP when dropping below 30% HP once per duel",
    desc_pt: "+10 Vida Máxima · +10% Dano de Fogo · Restaura +14 Vida ao cair abaixo de 30% HP",
    icon: "👑",
    cordColor: "#F59E0B",
    gemColor: "#DC2626",
  },
  {
    id: "necklace_frozen_star",
    name: "North Star Amulet",
    name_pt: "Amuleto da Estrela Polar",
    rarity: "epic",
    el: "ice",
    startShield: 10,
    iceBonus: 0.10,
    crit: 5,
    desc: "+10 Start Shield · +10% Ice dmg · +5% crit chance · Gleaming aurora borealis diamond",
    desc_pt: "+10 Escudo Glacial · +10% Dano de Gelo · +5% Crítico · Diamante brilhante da aurora",
    icon: "💎",
    cordColor: "#93C5FD",
    gemColor: "#0284C7",
  },
  {
    id: "necklace_druid_torc",
    name: "Torc of the World Tree",
    name_pt: "Torque da Árvore-Mundo",
    rarity: "epic",
    el: "nature",
    maxHpBonus: 14,
    natureBonus: 0.10,
    dmgReduction: 0.05,
    desc: "+14 Max HP · +10% Nature dmg · -5% damage taken · Hand-carved ironwood neck ring",
    desc_pt: "+14 Vida Máxima · +10% Dano de Natureza · -5% Dano Recebido · Aro rúnico de madeira de ferro",
    icon: "🪵",
    cordColor: "#451A03",
    gemColor: "#16A34A",
  },
  {
    id: "necklace_chronos_pendant",
    name: "Hourglass of Eternity",
    name_pt: "Ampulheta da Eternidade",
    rarity: "legendary",
    el: "arcane",
    maxManaBonus: 4,
    allDmg: 0.08,
    crit: 8,
    desc: "+4 Max Mana · +8% all dmg · +8% crit chance · Suspended sands of infinite time",
    desc_pt: "+4 Mana Máxima · +8% Dano Global · +8% Crítico · Areias do tempo infinito em estase",
    icon: "⏱️",
    cordColor: "#FBBF24",
    gemColor: "#8B5CF6",
  },
  {
    id: "necklace_prismatic_eye",
    name: "Eye of the Archmage",
    name_pt: "Olho do Arquimago",
    rarity: "legendary",
    el: null,
    allDmg: 0.10,
    startShield: 8,
    regen: 1,
    maxHpBonus: 12,
    desc: "+10% all dmg · +8 Start Shield · +1 Mana/turn · +12 Max HP · Supreme masterwork of the high council",
    desc_pt: "+10% Dano Global · +8 Escudo Inicial · +1 Mana/turno · +12 Vida Máxima · Obra-prima suprema",
    icon: "👁️",
    cordColor: "#E8B44F",
    gemColor: "#F43F5E",
  },
];

export function findNecklace(id) {
  return NECKLACES.find(n => n.id === id) || NECKLACES[0];
}

// ================= ÍCONE VETORIAL SVG PARA COLARES =================
export function NecklaceVectorIcon({ necklace, size = 32 }) {
  if (!necklace || necklace.id === "necklace_none") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" className="opacity-40">
        <path d="M10 8 C 10 24, 30 24, 30 8" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="20" cy="22" r="3" fill="#475569" />
      </svg>
    );
  }

  const cord = necklace.cordColor || "#F59E0B";
  const gem = necklace.gemColor || "#EF4444";

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
      {/* Necklace Cord / Chain */}
      <path d="M10 8 C 10 25, 30 25, 30 8" fill="none" stroke={cord} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 8 C 10 25, 30 25, 30 8" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      
      {/* Pendant Ring Link */}
      <circle cx="20" cy="21" r="2.5" fill="none" stroke={cord} strokeWidth="1.5" />
      
      {/* Ambient Pulsing Gem Glow */}
      <circle cx="20" cy="27" r="6.5" fill={gem} className="animate-pulse" opacity="0.35" />
      
      {/* Gem Mount Base */}
      <polygon points="20,20 26,26 20,33 14,26" fill={cord} stroke="#000000" strokeWidth="0.8" />
      
      {/* Faceted Gemstone */}
      <polygon points="20,21.5 24.5,26 20,31.5 15.5,26" fill={gem} stroke="#FFFFFF" strokeWidth="0.7" />
      
      {/* Glint Highlight */}
      <circle cx="18.5" cy="24.5" r="1.1" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// ================= VISUAL DO COLAR NO SPRITE DO MAGO =================
export function NecklaceSpriteVisual({ necklace }) {
  if (!necklace || necklace.id === "necklace_none") return null;
  const cord = necklace.cordColor || "#F59E0B";
  const gem = necklace.gemColor || "#EF4444";

  return (
    <g className="necklaceVisual">
      {/* Chain draped from high neck over collar */}
      <path
        d="M184 218 C 184 242, 216 242, 216 218"
        fill="none"
        stroke={cord}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M184 218 C 184 242, 216 242, 216 218"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Central Pendant Mount */}
      <circle cx="200" cy="239" r="4.5" fill={cord} stroke="#000000" strokeWidth="0.8" />
      {/* Radiant Gem Glow */}
      <circle cx="200" cy="239" r="6" fill={gem} opacity="0.4" className="matchPulse" />
      {/* Glowing Gemstone */}
      <circle cx="200" cy="239" r="3.2" fill={gem} stroke="#FFFFFF" strokeWidth="0.6" />
      <circle cx="199" cy="238" r="0.9" fill="#FFFFFF" opacity="0.9" />
    </g>
  );
}

// ================= COMPONENTE INTERATIVO DE COLARES (UI) =================
export function NecklaceGearSection({
  necklaceId,
  onEquipNecklace,
  onUnequipNecklace,
  ownedNecklaceIds,
  lang = "pt",
  RARITY,
}) {
  const currentNecklace = findNecklace(necklaceId);

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">📿</span>
            <span className="font-serif font-bold text-sm sm:text-base text-amber-200">
              {lang === "pt" ? "Colares & Amuletos Arcanos" : "Arcane Necklaces & Talismans"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {lang === "pt" ? "1 Colar Ativo" : "1 Active Necklace"}
          </span>
        </div>
        <p className="text-[10.5px] font-sans text-zinc-400">
          {lang === "pt"
            ? "Colares concedem amplificações de poder, bônus de vida, mana, escudos e efeitos de sobrevivência."
            : "Necklaces grant spell amplification, HP, mana, initial shields, and survival passives."}
        </p>
      </div>

      {/* Equipped Necklace Showcase Card */}
      <div className="mb-4">
        <div className="p-3 rounded-xl border bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-slate-950 border border-amber-400/40 flex items-center justify-center flex-shrink-0 shadow-inner">
              <NecklaceVectorIcon necklace={currentNecklace} size={34} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-sans text-amber-300 uppercase tracking-wider font-bold">
                {lang === "pt" ? "Colar Equipado Atualmente" : "Currently Equipped Necklace"}
              </div>
              <div className="font-serif text-sm sm:text-base font-bold text-amber-100 truncate">
                {currentNecklace.id !== "necklace_none"
                  ? (lang === "pt" ? currentNecklace.name_pt : currentNecklace.name)
                  : (lang === "pt" ? "Nenhum Colar Equipado" : "No Necklace Equipped")}
              </div>
              <p className="text-[10.5px] font-sans text-zinc-300 line-clamp-1 mt-0.5">
                {currentNecklace.id !== "necklace_none"
                  ? (lang === "pt" ? currentNecklace.desc_pt : currentNecklace.desc)
                  : (lang === "pt" ? "Selecione um colar abaixo para equipar" : "Select a necklace below to equip")}
              </p>
            </div>
          </div>
          {currentNecklace.id !== "necklace_none" && (
            <button
              type="button"
              onClick={() => onUnequipNecklace()}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-all flex-shrink-0 cursor-pointer"
            >
              ✕ {lang === "pt" ? "Desequipar" : "Unequip"}
            </button>
          )}
        </div>
      </div>

      {/* Necklaces Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {NECKLACES.filter(n => n.id !== "necklace_none").map(n => {
          const isOwned = ownedNecklaceIds.has(n.id);
          const isEquipped = necklaceId === n.id;
          const rarityData = RARITY[n.rarity] || { color: "#94A3B8", label: "Comum" };

          return (
            <div
              key={n.id}
              onClick={() => {
                if (!isOwned) return;
                onEquipNecklace(n.id);
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
                    <NecklaceVectorIcon necklace={n} size={26} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif text-xs sm:text-sm font-bold text-zinc-100 truncate block">
                      {!isOwned && "🔒 "}
                      {lang === "pt" ? n.name_pt : n.name}
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
                    {lang === "pt" ? "Equipado" : "Equipped"}
                  </span>
                )}
              </div>

              <p className="text-[10px] sm:text-[11px] font-sans text-zinc-300 leading-snug">
                {isOwned
                  ? (lang === "pt" ? n.desc_pt : n.desc)
                  : (lang === "pt" ? "Bloqueado · Obtenha em duelos ou forja." : "Locked · Drops from duels or forge.")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

