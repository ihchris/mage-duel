import React, { useState, useEffect } from "react";

// ================= CONSTANTES DE RARIDADE =================
export const RARITY = {
  common:    { label: "Comum",      color: "#9AA0B4", glow: "none" },
  rare:      { label: "Raro",       color: "#4FA3E8", glow: "0 0 10px #4FA3E855" },
  epic:      { label: "Épico",      color: "#B07FF5", glow: "0 0 12px #B07FF566" },
  legendary: { label: "Lendário",   color: "#E8B44F", glow: "0 0 16px #E8B44F77" },
};

// ================= SKINS COSMÉTICAS (100% ANTI PAY-TO-WIN) =================
// REGRAS INVIOLÁVEIS: NENHUMA skin possui atributos de combate (sem dano, sem bônus, sem crítico).
// O servidor autoritativo valida que o inventário cosmético não altera os atributos de combate.
export const SKINS = [
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

export const STRIPE_PACKAGES = [
  { id: "pack_100", shards: 100, priceBRL: "R$ 4,99", badge: null },
  { id: "pack_500", shards: 500, priceBRL: "R$ 19,99", badge: "Mais Popular (+25% Bônus)" },
  { id: "pack_1200", shards: 1200, priceBRL: "R$ 39,99", badge: "Melhor Valor (+50% Bônus)" },
];

// ================= SERVIDOR AUTORITATIVO & API LAYER (MOCKADO) =================
export const STORAGE_KEYS = {
  SHARDS: "mage_duel_shards_cache",
  OWNED_SKINS: "mage_duel_owned_skins",
  EQUIPPED_SKINS: "mage_duel_equipped_skins",
  STREAK: "mage_duel_win_streak",
};

export const mockBackend = {
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

  purchaseSkin: (skinId) => {
    const skin = SKINS.find(s => s.id === skinId);
    if (!skin) return { success: false, error: "Skin inexistente no catálogo do servidor." };

    const inv = mockBackend.getInventory();
    if (inv.ownedSkins.includes(skinId)) {
      return { success: false, error: "Você já possui esta skin cosmética." };
    }

    if (skin.priceType === "rewarded_ad") {
      inv.ownedSkins.push(skinId);
      localStorage.setItem(STORAGE_KEYS.OWNED_SKINS, JSON.stringify(inv.ownedSkins));
      return { success: true, shards: inv.shards, ownedSkins: inv.ownedSkins };
    }

    if (inv.shards < skin.price) {
      return { success: false, error: "Arcane Shards insuficientes para esta compra." };
    }

    const newShards = inv.shards - skin.price;
    const newOwned = [...inv.ownedSkins, skinId];

    localStorage.setItem(STORAGE_KEYS.SHARDS, String(newShards));
    localStorage.setItem(STORAGE_KEYS.OWNED_SKINS, JSON.stringify(newOwned));

    return { success: true, shards: newShards, ownedSkins: newOwned };
  },

  equipSkin: (skillId, skinId) => {
    const inv = mockBackend.getInventory();
    if (skinId !== null && !inv.ownedSkins.includes(skinId)) {
      return { success: false, error: "Skin não adquirida na conta." };
    }

    const newEquipped = { ...inv.equippedSkins };
    if (skinId === null) {
      delete newEquipped[skillId];
    } else {
      newEquipped[skillId] = skinId;
    }

    localStorage.setItem(STORAGE_KEYS.EQUIPPED_SKINS, JSON.stringify(newEquipped));
    return { success: true, equippedSkins: newEquipped };
  },

  recordBattleVictory: () => {
    const inv = mockBackend.getInventory();
    const newStreak = inv.winStreak + 1;
    let rewardShards = 5;
    let streakBonus = false;

    if (newStreak % 5 === 0) {
      rewardShards += 25;
      streakBonus = true;
    }

    const newShards = inv.shards + rewardShards;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(newShards));
    localStorage.setItem(STORAGE_KEYS.STREAK, String(newStreak));

    return { success: true, shards: newShards, winStreak: newStreak, rewardShards, streakBonus };
  },

  simulateStripePayment: (packageId) => {
    const pack = STRIPE_PACKAGES.find(p => p.id === packageId);
    if (!pack) return { success: false, error: "Pacote inválido." };

    const inv = mockBackend.getInventory();
    const newShards = inv.shards + pack.shards;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(newShards));

    return { success: true, shards: newShards, added: pack.shards };
  },

  claimRewardedAd: () => {
    const inv = mockBackend.getInventory();
    const newShards = inv.shards + 50;
    localStorage.setItem(STORAGE_KEYS.SHARDS, String(newShards));
    return { success: true, shards: newShards, added: 50 };
  }
};

// ================= COMPONENTES VISUAIS DA LOJA =================

export function AntiP2WBanner() {
  return (
    <div className="rounded-md border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-purple-950/25 to-amber-950/30 p-2.5 mb-3 flex items-center gap-2.5 shadow-sm">
      <span className="text-xl flex-shrink-0">🛡️</span>
      <div className="text-left leading-tight">
        <div className="text-[11px] font-mono font-bold text-[#E8B44F] uppercase tracking-wider flex items-center gap-1.5">
          <span>Garantia 100% Anti Pay-to-Win</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Oficial</span>
        </div>
        <div className="text-[10px] font-mono text-[#B7AE95]">
          Todos os itens desta loja são puramente visuais (cores, partículas e projéteis). Nenhuma compra concede dano, mana ou qualquer vantagem competitiva.
        </div>
      </div>
    </div>
  );
}

export function StripeCheckoutModal({
  isOpen,
  selectedPack,
  onSelectPack,
  onConfirm,
  onClose,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-[#E8B44F66] bg-[#16122A] p-5 shadow-2xl text-left" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-serif text-xl font-bold text-[#E8B44F] flex items-center gap-1.5">
            <span>💳</span>
            <span>Adquirir Arcane Shards</span>
          </h3>
          <button
            onClick={onClose}
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
            const sel = selectedPack?.id === pack.id;
            return (
              <button
                key={pack.id}
                onClick={() => onSelectPack(pack)}
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
            onClick={onConfirm}
            disabled={loading || !selectedPack}
            className="flex-1 py-2.5 rounded-md border border-[#E8B44F] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#100E1F] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <span className="animate-spin">⚡</span>
                <span>Processando no Stripe...</span>
              </>
            ) : (
              <span>Pagar {selectedPack?.priceBRL || ""} com Cartão</span>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-md border border-[#3A3356] bg-[#120F24] font-mono text-xs text-[#B7AE95] hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export function RewardedAdModal({
  isOpen,
  timer,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-sm rounded-xl border border-emerald-500/50 bg-[#0E1719] p-5 text-center shadow-2xl">
        <div className="text-3xl mb-2">🎬</div>
        <h3 className="font-serif text-lg font-bold text-emerald-300 mb-1">
          Transmissão de Vídeo Patrocinado
        </h3>
        <p className="font-mono text-xs text-[#B7AE95] mb-4">
          Apoie os servidores do Mage Duel para receber <span className="text-emerald-300 font-bold">+50 ✦ Arcane Shards</span> grátis!
        </p>

        {/* Barra de Progresso do Anúncio */}
        <div className="w-full h-3 rounded-full bg-[#1A2624] border border-emerald-900/60 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear"
            style={{ width: `${((3 - timer) / 3) * 100}%` }}
          />
        </div>

        <div className="font-mono text-xs text-[#E8B44F] font-bold mb-4">
          {timer > 0 ? `Aguarde ${timer}s para creditar recompensa...` : "✓ Recompensa creditada!"}
        </div>

        {timer === 0 && (
          <button
            onClick={onClose}
            className="w-full py-2 rounded-md border border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-black font-mono text-xs font-bold transition-all shadow-md"
          >
            Coletar +50 Shards
          </button>
        )}
      </div>
    </div>
  );
}

export function ShopPanel({
  shards,
  ownedSkins,
  equippedSkins,
  skills,
  shopFilter,
  setShopFilter,
  displaySkins,
  setDisplaySkins,
  onOpenStripe,
  onWatchAd,
  onBuySkin,
  onEquipSkin,
}) {
  const filteredSkins = SKINS.filter(skin => {
    if (shopFilter === "free") return skin.priceType === "rewarded_ad";
    if (shopFilter === "promo") return skin.rarity === "legendary" || skin.rarity === "epic";
    if (shopFilter === "equipped") return Object.values(equippedSkins).includes(skin.id);
    return true;
  });

  return (
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
              onClick={onOpenStripe}
              className="rounded border border-[#E8B44F] bg-amber-950/40 hover:bg-amber-900/60 text-[#E8B44F] px-2.5 py-1 text-xs font-mono font-bold transition-colors shadow-sm"
            >
              💳 Comprar Shards (R$)
            </button>
            <button
              onClick={onWatchAd}
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
          const targetSkillObj = (skills || []).find(s => s.id === skin.targetSkill);
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
                  Habilidade: <span className="text-[#F2EAD8]">{targetSkillObj?.name || skin.targetSkill}</span>
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
                          onClick={() => onEquipSkin(skin.targetSkill, null)}
                          className="px-2.5 py-1 rounded border border-[#EF444466] bg-red-950/40 text-red-300 text-xs font-mono hover:bg-red-900/60 transition-colors"
                        >
                          Restaurar Padrão
                        </button>
                      ) : (
                        <button
                          onClick={() => onEquipSkin(skin.targetSkill, skin.id)}
                          className="px-2.5 py-1 rounded border border-[#E8B44F] bg-amber-950/40 text-[#E8B44F] text-xs font-mono font-bold hover:bg-amber-900/60 transition-colors"
                        >
                          Equipar
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => onBuySkin(skin)}
                        className="px-3 py-1 rounded border font-mono text-xs font-bold transition-all"
                        style={{
                          borderColor: skin.priceType === "rewarded_ad" ? "#10B981" : "#E8B44F",
                          background: skin.priceType === "rewarded_ad" ? "#064E3B" : "#78350F",
                          color: skin.priceType === "rewarded_ad" ? "#A7F3D0" : "#FDE68A",
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
  );
}

export function EquippedSkinsStyleSection({
  skills,
  equippedSkins,
  onOpenShop,
  onResetSkin,
}) {
  return (
    <div className="border-t border-[#3A3356] pt-3 mt-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-mono text-sm" style={{ color: "#E8B44F" }}>Skins de Magia Equipadas</p>
        <button onClick={onOpenShop} className="text-xs font-mono text-[#E8B44F] underline">
          Abrir Loja ✦
        </button>
      </div>
      <div className="space-y-2">
        {(skills || []).map(skill => {
          const curSkinId = equippedSkins[skill.id];
          const curSkin = curSkinId ? SKINS.find(s => s.id === curSkinId) : null;
          return (
            <div key={skill.id} className="rounded border border-[#3A3356] bg-[#141126] p-2 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#F2EAD8] font-bold">{skill.name}:</span>
                {curSkin ? (
                  <span style={{ color: RARITY[curSkin.rarity].color }}>✦ {curSkin.name}</span>
                ) : (
                  <span className="text-[#8E87A5]">Padrão (Sem skin)</span>
                )}
              </div>
              {curSkin ? (
                <button
                  onClick={() => onResetSkin(skill.id)}
                  className="text-[10px] px-2 py-0.5 rounded border border-[#3A3356] hover:border-red-400 text-[#B7AE95] hover:text-red-400 transition-colors"
                >
                  Remover
                </button>
              ) : (
                <button
                  onClick={onOpenShop}
                  className="text-[10px] px-2 py-0.5 rounded border border-[#3A3356] text-[#E8B44F] hover:border-[#E8B44F] transition-colors"
                >
                  Personalizar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
