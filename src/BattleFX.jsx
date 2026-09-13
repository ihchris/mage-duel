import React, { useState, useRef, useEffect } from "react";
import { T } from "./tokens.js";

// ================= TURN COUNTDOWN BAR =================
export function TurnCountdownBar({
  turnCountdown,
  maxDuration = 15,
  roundNum = 1,
  currentTurn = "player",
  isTimerPaused = false,
  onTogglePause,
  busy = false,
  dailyMod = null,
  playerHp,
  enemyHp,
  onForceFinish,
  onSurrender,
  lang = "pt",
}) {
  const pct = Math.max(0, Math.min(100, (turnCountdown / maxDuration) * 100));
  const isUrgent = turnCountdown <= 4;
  const isWarning = turnCountdown <= 8 && !isUrgent;

  const timerColor = isUrgent ? T.danger : isWarning ? T.warning : T.textSecondary;

  return (
    <div
      className="w-full rounded-xl border px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-md mb-1 sm:mb-1.5 relative overflow-hidden flex-shrink-0"
      style={{
        backgroundColor: T.bgSurface,
        borderColor: T.borderSubtle,
      }}
    >
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Round & Daily Modifier */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span
            className="px-2 py-0.5 rounded font-mono font-bold text-[10.5px] sm:text-[11.5px] tracking-wider shadow-sm"
            style={{
              backgroundColor: `${T.gold}18`,
              color: T.gold,
              border: `1px solid ${T.gold}44`,
            }}
          >
            R{roundNum}
          </span>
          {dailyMod && (
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono"
              style={{ color: T.textSecondary }}
              title={dailyMod.desc}
            >
              <span>{dailyMod.icon}</span>
              <span className="truncate">{dailyMod.name}</span>
            </span>
          )}
        </div>

        {/* Center: Clean Turn Status */}
        <div className="flex items-center gap-1.5 font-serif text-[11.5px] sm:text-[12.5px] font-bold tracking-wider select-none">
          {enemyHp !== undefined && enemyHp !== null && enemyHp <= 0 ? (
            <button
              onClick={onForceFinish}
              type="button"
              className="flex items-center gap-1.5 text-amber-300 font-bold animate-pulse hover:scale-105 transition-transform cursor-pointer bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/40 shadow-sm"
              title="Duelo concluído! Clique para ver a tela de resultado"
            >
              <span>👑</span>
              <span>VITÓRIA!</span>
              <span className="text-[10px] opacity-75">➔</span>
            </button>
          ) : playerHp !== undefined && playerHp !== null && playerHp <= 0 ? (
            <button
              onClick={onForceFinish}
              type="button"
              className="flex items-center gap-1.5 text-red-400 font-bold animate-pulse hover:scale-105 transition-transform cursor-pointer bg-red-500/10 px-2 py-0.5 rounded border border-red-500/40 shadow-sm"
              title="Duelo concluído! Clique para ver a tela de resultado"
            >
              <span>💀</span>
              <span>DERROTA</span>
              <span className="text-[10px] opacity-75">➔</span>
            </button>
          ) : currentTurn === "player" ? (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
              <span>{lang === "pt" ? "SEU TURNO" : "YOUR TURN"}</span>
            </span>
          ) : currentTurn === "enemy" ? (
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_#F87171]" />
              <span>{lang === "pt" ? "TURNO INIMIGO" : "ENEMY TURN"}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-purple-300">
              <span className="animate-spin text-xs">✦</span>
              <span>{lang === "pt" ? "RESOLVENDO..." : "RESOLVING..."}</span>
            </span>
          )}
        </div>

        {/* Right: Timer & Pause & Surrender */}
        <div className="flex items-center gap-1 sm:gap-2">
          {isTimerPaused && (
            <span className="text-[10px] font-mono text-amber-400 animate-pulse hidden sm:inline">
              {lang === "pt" ? "PAUSADO" : "PAUSED"}
            </span>
          )}
          <span
            className="font-mono text-[12px] sm:text-[13px] font-black tracking-tight"
            style={{ color: timerColor }}
          >
            {turnCountdown}s
          </span>
          <button
            onClick={onTogglePause}
            disabled={busy || currentTurn !== "player"}
            title={isTimerPaused ? "Retomar" : "Pausar"}
            className="text-[11px] p-1 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-zinc-200 cursor-pointer"
          >
            {isTimerPaused ? "▶" : "⏸"}
          </button>
          {onSurrender && (
            <button
              onClick={onSurrender}
              disabled={busy}
              title={lang === "pt" ? "Render-se do duelo [Esc]" : "Surrender duel [Esc]"}
              className="px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 hover:text-red-100 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <span>🏳️</span>
              <span className="hidden xs:inline">{lang === "pt" ? "Render-se" : "Surrender"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sleek, thin gauge bar */}
      <div className="w-full h-1 rounded-full overflow-hidden mt-1.5 bg-black/40">
        <div
          className="h-full rounded-full transition-all duration-300 ease-linear"
          style={{
            width: `${pct}%`,
            backgroundColor: isUrgent ? T.danger : isWarning ? T.warning : T.gold,
          }}
        />
      </div>
    </div>
  );
}

// ================= COMBAT HEALTH & MANA BARS =================
export function CombatBar({ value, max, shield = 0, type = "hp", label }) {
  const isHp = type === "hp";
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const isLowHp = isHp && value / max <= 0.25;

  // === [6] HP BAR COM DAMAGE TRAIL ===
  const [trailPct, setTrailPct] = useState(pct);
  const [healFlash, setHealFlash] = useState(false);
  const prevValRef = useRef(value);

  useEffect(() => {
    if (value < prevValRef.current) {
      // Dano tomado: a barra verde recua em 0.25s e a vermelha atrasa 0.4s para mostrar o dano recente
      const timer = setTimeout(() => {
        setTrailPct(pct);
      }, 400);
      prevValRef.current = value;
      return () => clearTimeout(timer);
    } else if (value > prevValRef.current) {
      // Cura: atualiza trail e pisca branco por 120ms
      setTrailPct(pct);
      setHealFlash(true);
      const timer = setTimeout(() => setHealFlash(false), 120);
      prevValRef.current = value;
      return () => clearTimeout(timer);
    } else {
      setTrailPct(pct);
    }
  }, [value, pct]);

  // Colors
  const barGrad = isHp
    ? `linear-gradient(90deg, ${T.success} 0%, #059669 100%)`
    : `linear-gradient(90deg, ${T.info} 0%, #3B82F6 100%)`;
  const glowColor = isHp ? T.success : T.info;

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center text-[11px] sm:text-[12px] font-mono mb-1">
        <span className="flex items-center gap-1.5 font-bold" style={{ color: isHp ? "#A7F3D0" : "#BAE6FD" }}>
          <span>{isHp ? "❤️" : "💧"}</span>
          <span className="tracking-wide">{label}</span>
        </span>
        <div className="flex items-center gap-2 font-mono">
          {shield > 0 && isHp && (
            <span
              className="text-[11px] px-2 py-0.2 rounded border font-bold"
              style={{
                borderColor: `${T.info}88`,
                backgroundColor: `${T.info}22`,
                color: T.info,
              }}
            >
              +{shield} Ward
            </span>
          )}
          <span
            className={`font-bold text-[11px] sm:text-[12px] ${
              isLowHp ? "animate-pulse" : ""
            }`}
            style={{ color: isLowHp ? T.danger : T.textPrimary }}
          >
            {Math.max(0, Math.round(value))}/{max}
          </span>
        </div>
      </div>

      {/* The Bar Track */}
      <div
        className="h-3 sm:h-3.5 rounded-lg border relative overflow-hidden shadow-inner"
        style={{
          backgroundColor: T.bgDeep,
          borderColor: isLowHp ? T.danger : T.borderSubtle,
        }}
      >
        {/* Red Recent Damage Trail Bar (Behind) */}
        {isHp && (
          <div
            className="absolute top-0 bottom-0 left-0 rounded transition-all duration-600 ease-out"
            style={{ width: `${trailPct}%`, backgroundColor: T.danger }}
          />
        )}

        {/* Health / Mana Fill (Front) */}
        <div
          className="h-full rounded transition-all duration-250 ease-out relative"
          style={{
            width: `${pct}%`,
            background: barGrad,
            boxShadow: `0 0 10px ${glowColor}66`,
          }}
        >
          {/* Specular gloss highlight reflection */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-white/20 rounded-t" />

          {/* White Heal Flash (120ms) */}
          {healFlash && (
            <div className="absolute inset-0 bg-white opacity-90 transition-opacity duration-120 pointer-events-none" />
          )}
        </div>

        {/* Shield overlay bar on HP */}
        {isHp && shield > 0 && (
          <div
            className="absolute top-0 bottom-0 border-l border-[#A5F3FC] transition-all duration-300"
            style={{
              left: `${Math.min(98, pct)}%`,
              width: `${Math.min(100 - pct, (shield / max) * 100)}%`,
              background: "linear-gradient(90deg, #38BDF8CC, #0284C7CC)",
              boxShadow: "0 0 8px #38BDF8CC",
            }}
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#FFFFFF33_3px,#FFFFFF33_6px)]" />
          </div>
        )}
      </div>
    </div>
  );
}

// ================= ON-SPRITE STATUS OVERLAY =================
export function StatusFXOverlay({ mage }) {
  if (!mage) return null;
  const hasShield = mage.shield > 0;
  const isBurning = mage.status?.burn > 0;
  const isChilled = !!mage.status?.chill;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
      {/* 1. Runic Shield Bubble */}
      {hasShield && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[115%] h-[115%] rounded-full border-2 border-[#5FC1E8] shadow-[0_0_24px_#5FC1E888] animate-pulse relative flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #5FC1E818 0%, #5FC1E833 70%, #5FC1E855 100%)",
            }}
          >
            {/* Rotating Arcane Glyph Sigil on shield */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 matchSpin">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#5FC1E8" strokeWidth="1" strokeDasharray="6 4" />
              <polygon points="50,15 80,75 20,75" fill="none" stroke="#A5F3FC" strokeWidth="0.8" />
              <polygon points="50,85 20,25 80,25" fill="none" stroke="#5FC1E8" strokeWidth="0.8" />
            </svg>
          </div>
          <div className="absolute -top-3 right-1 bg-[#091522] border border-[#5FC1E8] text-[#5FC1E8] font-mono text-[10px] px-2 py-0.5 rounded-full shadow-lg font-bold flex items-center gap-1">
            <span>🛡️</span>
            <span>{mage.shield}</span>
          </div>
        </div>
      )}

      {/* 2. Burning Fire Effect */}
      {isBurning && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-2">
          <div className="w-full h-24 relative flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-24 h-20 opacity-85">
              <defs>
                <radialGradient id="burnGrad" cx="50%" cy="80%" r="60%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="40%" stopColor="#F97316" />
                  <stop offset="85%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <path
                d="M50,10 Q65,40 58,75 Q45,80 40,75 Q35,40 50,10 Z"
                fill="url(#burnGrad)"
                className="wingEmber"
              />
              <path
                d="M35,25 Q50,45 42,75 Q30,78 28,75 Q25,45 35,25 Z"
                fill="url(#burnGrad)"
                className="wingEmber"
                style={{ animationDelay: "0.4s" }}
              />
              <path
                d="M65,25 Q75,45 68,75 Q58,78 55,75 Q52,45 65,25 Z"
                fill="url(#burnGrad)"
                className="wingEmber"
                style={{ animationDelay: "0.8s" }}
              />
            </svg>
          </div>
          <div className="absolute -top-3 left-1 bg-[#260C0A] border border-[#FF6B3D] text-[#FF6B3D] font-mono text-[10px] px-2 py-0.5 rounded-full shadow-lg font-bold flex items-center gap-1">
            <span>🔥</span>
            <span>{mage.status.burn}t</span>
          </div>
        </div>
      )}

      {/* 3. Chilled Frost Effect */}
      {isChilled && (
        <div className="absolute inset-0 border-2 border-[#5FC1E888] rounded-lg shadow-[inset_0_0_20px_#5FC1E866] pointer-events-none flex items-center justify-center">
          <div className="absolute top-1 right-1 text-xs animate-bounce">❄️</div>
          <div className="absolute bottom-1 left-1 text-xs animate-bounce" style={{ animationDelay: "0.5s" }}>❄️</div>
          <div className="absolute -bottom-3 bg-[#0C1A2E] border border-[#5FC1E8] text-[#5FC1E8] font-mono text-[9px] px-2 py-0.5 rounded-full shadow-lg font-bold">
            ❄️ CHILLED (-30%)
          </div>
        </div>
      )}
    </div>
  );
}

// === [2] PROJÉTEIS COM TRAIL ===
function ProjectileTrail({ color, darkColor, isP }) {
  const gradId = `projTrail_${color.replace('#', '')}`;
  return (
    <div
      className="absolute pointer-events-none -z-10 flex items-center justify-center"
      style={{
        transform: isP ? "translateY(28px) scaleY(1)" : "translateY(-28px) scaleY(-1)",
      }}
    >
      <svg viewBox="0 0 40 120" className="w-8 h-24 overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="50%" stopColor={darkColor || color} stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M20,0 Q18,60 20,120"
          stroke={`url(#${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="140"
          className="projectileTrailStroke"
        />
        <path
          d="M20,0 Q22,50 20,95"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

// ================= SPELL PROJECTILE ANIMATIONS =================
export function SpellProjectile({ spell }) {
  if (!spell) return null;
  const { skill, fromSide, skin } = spell;
  const isP = fromSide === "p";
  const animClass = isP ? "spell-proj-p" : "spell-proj-e";

  return (
    <div className={`absolute z-30 pointer-events-none ${animClass}`} style={{ willChange: "transform, top, left" }}>
      {/* 0. Custom Cosmetic Skin Visual (100% Anti-P2W, pure visual) */}
      {skin && skin.visual ? (
        <div className="relative flex items-center justify-center">
          <div
            className="rounded-full flex items-center justify-center relative shadow-lg"
            style={{
              width: 52,
              height: 52,
              background: `radial-gradient(circle, #FFFFFF 0%, ${skin.visual.projectileColor} 45%, ${skin.visual.trailColor} 85%, transparent 100%)`,
              boxShadow: `0 0 26px 6px ${skin.visual.projectileColor}, 0 0 46px 12px ${skin.visual.trailColor}`,
            }}
          >
            {skin.visual.particleShape === "star" && (
              <span className="text-white text-base animate-spin">✦</span>
            )}
            {skin.visual.particleShape === "leaf" && (
              <span className="text-white text-base animate-pulse">🍃</span>
            )}
            {skin.visual.particleShape === "spark" && (
              <span className="text-white text-base animate-ping">✧</span>
            )}
            {skin.visual.particleShape === "circle" && (
              <div className="w-5 h-5 rounded-full bg-white opacity-85 animate-ping" />
            )}
          </div>
          <div
            className="absolute -bottom-2.5 w-4 h-4 rounded-full blur-xs opacity-80 animate-ping"
            style={{ background: skin.visual.trailColor }}
          />
        </div>
      ) : (
        <>
          {/* 1. Fireball */}
          {skill.id === "fireball" && (
            <div className="relative flex items-center justify-center">
              <ProjectileTrail color="#F59E0B" darkColor="#EF4444" isP={isP} />
              {/* Main Fireball Core */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-[0_0_35px_#F97316,0_0_65px_#DC2626]"
                style={{
                  background: "radial-gradient(circle, #FFFBEB 0%, #FEF08A 25%, #F97316 65%, #DC2626 95%, transparent 100%)",
                }}
              >
                {/* Spinning fire vortex ring */}
                <svg viewBox="0 0 50 50" className="w-10 h-10 matchSpin opacity-85">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#FFFBEB" strokeWidth="2.5" strokeDasharray="8 6" />
                  <circle cx="25" cy="25" r="14" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="5 4" />
                </svg>
              </div>
              {/* Trailing embers */}
              <div className="absolute -bottom-3 w-4 h-4 rounded-full bg-amber-400 blur-sm animate-ping" />
              <div className="absolute -top-3 w-3 h-3 rounded-full bg-red-500 blur-sm animate-ping" style={{ animationDelay: "0.2s" }} />
            </div>
          )}

          {/* 2. Ember Jab */}
          {skill.id === "emberjab" && (
            <div className="relative flex flex-col gap-1.5 items-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-200 via-orange-500 to-red-600 shadow-[0_0_18px_#F97316] animate-pulse" />
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 shadow-[0_0_14px_#F97316] opacity-80" />
              <div className="w-3.5 h-3.5 rounded-full bg-red-400 opacity-60" />
            </div>
          )}

          {/* 3. Frost Lance */}
          {skill.id === "frostlance" && (
            <div className="relative flex items-center justify-center">
              <ProjectileTrail color="#E0F2FE" darkColor="#0284C7" isP={isP} />
              <svg viewBox="0 0 80 80" className="w-20 h-20 drop-shadow-[0_0_24px_#38BDF8]">
                <polygon
                  points="40,5 52,40 40,75 28,40"
                  fill="url(#lanceGrad)"
                  stroke="#E0F2FE"
                  strokeWidth="1.5"
                />
                <polygon
                  points="40,12 47,40 40,68 33,40"
                  fill="#BAE6FD"
                  opacity="0.8"
                />
                <line x1="40" y1="8" x2="40" y2="72" stroke="#FFFFFF" strokeWidth="2" />
                <defs>
                  <linearGradient id="lanceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-sky-200 blur-md opacity-75 animate-ping" />
              </div>
            </div>
          )}

          {/* 4. Ice Shard */}
          {skill.id === "iceshard" && (
            <div className="relative flex gap-2 items-center">
              <div className="w-5 h-8 bg-gradient-to-b from-white via-sky-300 to-blue-600 rotate-12 shadow-[0_0_12px_#38BDF8] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]" />
              <div className="w-6 h-10 bg-gradient-to-b from-white via-cyan-300 to-sky-600 shadow-[0_0_16px_#38BDF8] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]" />
              <div className="w-4 h-7 bg-gradient-to-b from-white via-sky-200 to-blue-500 -rotate-12 shadow-[0_0_10px_#38BDF8] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]" />
            </div>
          )}

          {/* 5. Wild Thorns */}
          {skill.id === "thorns" && (
            <div className="relative flex items-center justify-center">
              <ProjectileTrail color="#4ADE80" darkColor="#15803D" isP={isP} />
              <svg viewBox="0 0 70 70" className="w-16 h-16 drop-shadow-[0_0_20px_#22C55E]">
                <path
                  d="M35,10 Q50,25 35,40 Q20,55 35,65"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M35,10 Q50,25 35,40 Q20,55 35,65"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Thorns */}
                <polygon points="45,22 55,20 44,28" fill="#166534" />
                <polygon points="26,38 16,36 27,44" fill="#166534" />
                <polygon points="43,50 53,52 42,56" fill="#166534" />
              </svg>
              <div className="absolute text-emerald-300 text-sm animate-spin">🌿</div>
            </div>
          )}

          {/* 6. Sap Life */}
          {skill.id === "saplife" && (
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-lime-300 via-emerald-500 to-teal-800 shadow-[0_0_25px_#22C55E] flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">💚</span>
              </div>
              <div className="absolute w-14 h-14 rounded-full border border-emerald-400 opacity-60 animate-ping" />
            </div>
          )}

          {/* 7. Arcane Bolt */}
          {skill.id === "bolt" && (
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-900 via-fuchsia-500 to-violet-200 shadow-[0_0_30px_#C084FC] flex items-center justify-center relative">
                <svg viewBox="0 0 60 60" className="w-full h-full matchSpin">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E9D5FF" strokeWidth="1.5" strokeDasharray="6 4" />
                  <polygon points="30,8 48,45 12,45" fill="none" stroke="#F0ABFC" strokeWidth="1" />
                  <polygon points="30,52 12,15 48,15" fill="none" stroke="#C084FC" strokeWidth="1" />
                </svg>
                <div className="absolute w-4 h-4 rounded-full bg-white blur-xs" />
              </div>
            </div>
          )}

          {/* Elemental Fallbacks for all 27 new attack/control skills */}
          {!["fireball", "emberjab", "frostlance", "iceshard", "thorns", "saplife", "bolt"].includes(skill.id) && skill.dmg > 0 && (
            <div className="relative flex items-center justify-center">
              {skill.el === "fire" && (
                <>
                  <ProjectileTrail color="#F59E0B" darkColor="#EF4444" isP={isP} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_0_30px_#F97316]" style={{ background: "radial-gradient(circle, #FFFBEB 0%, #F97316 70%, #DC2626 100%)" }}>
                    <span className="text-xl animate-spin">🔥</span>
                  </div>
                </>
              )}
              {skill.el === "ice" && (
                <>
                  <ProjectileTrail color="#38BDF8" darkColor="#1D4ED8" isP={isP} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_0_30px_#38BDF8]" style={{ background: "radial-gradient(circle, #FFFFFF 0%, #38BDF8 65%, #1E3A8A 100%)" }}>
                    <span className="text-xl animate-pulse">❄️</span>
                  </div>
                </>
              )}
              {skill.el === "nature" && (
                <>
                  <ProjectileTrail color="#4ADE80" darkColor="#15803D" isP={isP} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_0_30px_#22C55E]" style={{ background: "radial-gradient(circle, #DCFCE7 0%, #22C55E 65%, #14532D 100%)" }}>
                    <span className="text-xl animate-bounce">🌿</span>
                  </div>
                </>
              )}
              {skill.el === "arcane" && (
                <>
                  <ProjectileTrail color="#C084FC" darkColor="#6B21A8" isP={isP} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_0_30px_#C084FC]" style={{ background: "radial-gradient(circle, #FAF5FF 0%, #A855F7 65%, #581C87 100%)" }}>
                    <span className="text-xl animate-spin">✦</span>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ================= IMPACT FX (HITS & BURSTS) =================
export function ImpactFX({ impact }) {
  if (!impact) return null;
  const { skill, side, crit, skin } = impact;
  const anchorClass = side === "p" ? "anchor-pos-p" : "anchor-pos-e";

  return (
    <div className={`absolute z-40 pointer-events-none ${anchorClass} flex items-center justify-center`}>
      {/* 0. Custom Cosmetic Skin Impact Burst (100% Anti-P2W) */}
      {skin && skin.visual ? (
        <div className="relative flex items-center justify-center">
          <div
            className="w-36 h-36 rounded-full"
            style={{
              animation: "fireExplosionAnim 0.5s ease-out forwards",
              background: `radial-gradient(circle, #FFFFFF 0%, ${skin.visual.impactColor} 40%, ${skin.visual.projectileColor} 75%, transparent 100%)`,
              boxShadow: `0 0 55px ${skin.visual.impactColor}`,
            }}
          />
          <div
            className="absolute w-44 h-44 rounded-full border-4"
            style={{
              borderColor: skin.visual.impactColor,
              boxShadow: `0 0 35px ${skin.visual.projectileColor}`,
              animation: "fireRingAnim 0.45s ease-out forwards",
            }}
          />
          {skin.visual.particleShape === "leaf" && (
            <div className="absolute text-emerald-200 text-2xl animate-spin">🍃</div>
          )}
          {skin.visual.particleShape === "star" && (
            <div className="absolute text-purple-200 text-3xl animate-spin">✦</div>
          )}
          {skin.visual.particleShape === "spark" && (
            <div className="absolute text-amber-200 text-2xl animate-ping">✧</div>
          )}
        </div>
      ) : (
        <>
          {/* 1. Fireball Impact Explosion */}
          {skill.id === "fireball" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full shadow-[0_0_60px_#EF4444]"
                style={{
                  animation: "fireExplosionAnim 0.5s ease-out forwards",
                  background: "radial-gradient(circle, #FFFBEB 0%, #F59E0B 35%, #EF4444 70%, transparent 100%)",
                }}
              />
              <div
                className="absolute w-44 h-44 rounded-full border-4 border-amber-400 shadow-[0_0_30px_#F59E0B]"
                style={{ animation: "fireRingAnim 0.45s ease-out forwards" }}
              />
              {/* Radial Sparks */}
              {[
                { dx: "60px", dy: "-50px" },
                { dx: "-60px", dy: "-50px" },
                { dx: "70px", dy: "20px" },
                { dx: "-70px", dy: "20px" },
                { dx: "40px", dy: "60px" },
                { dx: "-40px", dy: "60px" },
                { dx: "0px", dy: "-75px" },
                { dx: "0px", dy: "75px" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_8px_#F59E0B]"
                  style={{
                    "--dx": s.dx,
                    "--dy": s.dy,
                    animation: "sparkRadial 0.48s ease-out forwards",
                  }}
                />
              ))}
            </div>
          )}

          {/* 2. Ember Jab Hit */}
          {skill.id === "emberjab" && (
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 opacity-90 blur-sm animate-ping" />
              <div className="absolute text-2xl font-bold text-amber-300">💥</div>
            </div>
          )}

          {/* 3. Frost Lance Glacial Shatter */}
          {skill.id === "frostlance" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full shadow-[0_0_50px_#38BDF8]"
                style={{
                  animation: "frostShatterAnim 0.5s ease-out forwards",
                  background: "radial-gradient(circle, #F0F9FF 0%, #7DD3FC 40%, #0284C7 80%, transparent 100%)",
                }}
              />
              <div
                className="absolute w-44 h-44 rounded-full border-4 border-sky-300 shadow-[0_0_35px_#38BDF8]"
                style={{ animation: "frostRingAnim 0.45s ease-out forwards" }}
              />
              {/* Flying ice crystals */}
              {[
                { dx: "65px", dy: "-45px" },
                { dx: "-65px", dy: "-45px" },
                { dx: "75px", dy: "30px" },
                { dx: "-75px", dy: "30px" },
                { dx: "0px", dy: "75px" },
                { dx: "0px", dy: "-75px" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-7 bg-gradient-to-b from-white to-sky-400 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] shadow-[0_0_10px_#38BDF8]"
                  style={{
                    "--dx": s.dx,
                    "--dy": s.dy,
                    animation: "iceShardScatter 0.5s ease-out forwards",
                  }}
                />
              ))}
            </div>
          )}

          {/* 4. Ice Shard Hit */}
          {skill.id === "iceshard" && (
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-sky-200 opacity-80 blur-md animate-ping" />
              <div className="absolute text-2xl font-bold text-sky-200">❄️</div>
            </div>
          )}

          {/* 5. Wild Thorns Lash */}
          {skill.id === "thorns" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-full shadow-[0_0_40px_#22C55E]"
                style={{
                  animation: "vineWhipAnim 0.5s ease-out forwards",
                  background: "radial-gradient(circle, #DCFCE7 0%, #4ADE80 50%, #15803D 80%, transparent 100%)",
                }}
              />
              {/* Leaf Flurry */}
              {[
                { dx: "55px", dy: "-40px" },
                { dx: "-55px", dy: "-40px" },
                { dx: "60px", dy: "40px" },
                { dx: "-60px", dy: "40px" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute text-emerald-300 text-lg"
                  style={{
                    "--dx": s.dx,
                    "--dy": s.dy,
                    animation: "leafScatter 0.55s ease-out forwards",
                  }}
                >
                  🍃
                </div>
              ))}
            </div>
          )}

          {/* 6. Sap Life Siphon Effect */}
          {skill.id === "saplife" && (
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-emerald-400 opacity-80 blur-md animate-ping" />
              {/* Siphon Soul Orbs drifting back to caster */}
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`fixed w-5 h-5 rounded-full bg-lime-300 shadow-[0_0_16px_#22C55E] flex items-center justify-center ${
                    side === "e" ? "spell-proj-e" : "spell-proj-p"
                  }`}
                  style={{ animationDelay: `${num * 0.12}s` }}
                >
                  <span className="text-[9px]">✦</span>
                </div>
              ))}
            </div>
          )}

          {/* 7. Arcane Bolt Supernova */}
          {skill.id === "bolt" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full shadow-[0_0_50px_#C084FC]"
                style={{
                  animation: "arcaneSupernovaAnim 0.52s ease-out forwards",
                  background: "radial-gradient(circle, #FAF5FF 0%, #C084FC 45%, #7C3AED 80%, transparent 100%)",
                }}
              />
              <div className="absolute text-3xl text-fuchsia-200 animate-spin">✶</div>
            </div>
          )}

          {/* Elemental Impact Burst Fallbacks for all 27 new attack/control skills */}
          {!["fireball", "emberjab", "frostlance", "iceshard", "thorns", "saplife", "bolt"].includes(skill.id) && skill.dmg > 0 && (
            <div className="relative flex items-center justify-center">
              {skill.el === "fire" && (
                <div
                  className="w-36 h-36 rounded-full shadow-[0_0_55px_#F97316]"
                  style={{
                    animation: "fireExplosionAnim 0.5s ease-out forwards",
                    background: "radial-gradient(circle, #FFFBEB 0%, #F97316 45%, #DC2626 80%, transparent 100%)",
                  }}
                />
              )}
              {skill.el === "ice" && (
                <div
                  className="w-36 h-36 rounded-full shadow-[0_0_55px_#38BDF8]"
                  style={{
                    animation: "frostShatterAnim 0.5s ease-out forwards",
                    background: "radial-gradient(circle, #FFFFFF 0%, #38BDF8 45%, #1D4ED8 80%, transparent 100%)",
                  }}
                />
              )}
              {skill.el === "nature" && (
                <div
                  className="w-36 h-36 rounded-full shadow-[0_0_55px_#22C55E]"
                  style={{
                    animation: "vineWhipAnim 0.5s ease-out forwards",
                    background: "radial-gradient(circle, #DCFCE7 0%, #22C55E 45%, #14532D 80%, transparent 100%)",
                  }}
                />
              )}
              {skill.el === "arcane" && (
                <div
                  className="w-36 h-36 rounded-full shadow-[0_0_55px_#C084FC]"
                  style={{
                    animation: "arcaneSupernovaAnim 0.52s ease-out forwards",
                    background: "radial-gradient(circle, #FAF5FF 0%, #C084FC 45%, #7C3AED 80%, transparent 100%)",
                  }}
                />
              )}
            </div>
          )}
        </>
      )}

      {/* Critical Hit Banner Overlay & Golden Falling Particles */}
      {crit && (
        <>
          <div
            className="absolute -top-12 z-50 whitespace-nowrap px-3 py-1 rounded-full border border-amber-400 bg-amber-950/90 text-[#FDE047] font-serif font-black text-sm tracking-wider shadow-[0_0_25px_#EAB308]"
            style={{ animation: "critBannerPop 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards" }}
          >
            ✦ CRITICAL HIT! ✦
          </div>

          {/* === [3] IMPACTOS EM CAMADAS: 12 Partículas Douradas Caindo no Crit === */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FEF08A] shadow-[0_0_10px_#F59E0B]"
                style={{
                  left: `${(i - 5.5) * 16}px`,
                  top: `-40px`,
                  animation: `goldDrop 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.04}s forwards`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ================= SELF-CAST FX (WARD / SURGE / FOCUS) =================
export function SelfCastFX({ selfCast }) {
  if (!selfCast) return null;
  const { skill, side, skin } = selfCast;
  const anchorClass = side === "p" ? "anchor-pos-p" : "anchor-pos-e";

  return (
    <div className={`absolute z-40 pointer-events-none ${anchorClass} flex items-center justify-center`}>
      {/* 0. Custom Cosmetic Self Cast FX */}
      {skin && skin.visual ? (
        <div className="relative flex items-center justify-center">
          <div
            className="w-40 h-40 rounded-full border-4"
            style={{
              borderColor: skin.visual.projectileColor,
              boxShadow: `0 0 50px ${skin.visual.projectileColor}`,
              animation: "wardHexDomeAnim 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              background: `radial-gradient(circle, ${skin.visual.impactColor}44 0%, ${skin.visual.trailColor}55 60%, transparent 85%)`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-3xl animate-pulse">
              {skin.visual.particleShape === "star" ? "✦" : skin.visual.particleShape === "spark" ? "✧" : "🛡️"}
            </div>
          </div>
          <div className="absolute text-base font-serif font-bold animate-bounce" style={{ color: skin.visual.impactColor }}>
            ✦ {skin.name}
          </div>
        </div>
      ) : (
        <>
          {/* 1. Runic Ward Hex Dome */}
          {skill.id === "ward" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-40 h-40 rounded-full border-4 border-[#38BDF8] shadow-[0_0_50px_#38BDF8]"
                style={{
                  animation: "wardHexDomeAnim 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                  background: "radial-gradient(circle, #38BDF833 0%, #0284C744 60%, transparent 85%)",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full matchSpin opacity-70">
                  <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="none" stroke="#E0F2FE" strokeWidth="2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="5 3" />
                </svg>
              </div>
              <div className="absolute text-xl text-sky-200 font-serif font-bold animate-bounce">
                🛡️ +{skill.shield} WARD
              </div>
            </div>
          )}

          {/* 2. Mana Surge Pillar */}
          {skill.id === "surge" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-24 h-48 rounded-full bg-gradient-to-t from-transparent via-cyan-400 to-violet-500 blur-md shadow-[0_0_60px_#38BDF8]"
                style={{ animation: "manaPillarAnim 0.85s ease-out forwards" }}
              />
              <div className="absolute text-lg text-cyan-200 font-serif font-bold animate-pulse">
                💧 +{skill.restore} MANA
              </div>
            </div>
          )}

          {/* 3. Focus Ripple */}
          {skill.id === "focus" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full border-2 border-violet-400 shadow-[0_0_40px_#A855F7]"
                style={{
                  animation: "focusRippleAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  background: "radial-gradient(circle, #A855F722 0%, transparent 75%)",
                }}
              />
              <div className="absolute text-sm text-fuchsia-200 font-mono font-bold animate-bounce">
                ✦ Focus +{skill.restore} MP
              </div>
            </div>
          )}

          {/* 4. Support Heal Burst (Cauterize, Soothing Bloom, World Tree Grace) */}
          {skill.heal > 0 && !skill.dmg && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-40 h-40 rounded-full border-2 border-emerald-400 shadow-[0_0_50px_#10B981]"
                style={{
                  animation: "wardHexDomeAnim 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                  background: "radial-gradient(circle, #10B98133 0%, #05966944 60%, transparent 85%)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-3xl animate-pulse">
                  💚
                </div>
              </div>
              <div className="absolute text-xl text-emerald-200 font-serif font-bold animate-bounce">
                💚 +{skill.heal} HEAL
              </div>
            </div>
          )}

          {/* 5. Generic Shield Ward (Glaze, Ice Barrier, Astral Projection) */}
          {skill.shield > 0 && skill.id !== "ward" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-40 h-40 rounded-full border-4 border-sky-400 shadow-[0_0_50px_#38BDF8]"
                style={{
                  animation: "wardHexDomeAnim 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                  background: "radial-gradient(circle, #38BDF833 0%, #0284C744 60%, transparent 85%)",
                }}
              />
              <div className="absolute text-xl text-sky-200 font-serif font-bold animate-bounce">
                🛡️ +{skill.shield} WARD
              </div>
            </div>
          )}

          {/* 6. Generic Restore (Astral Projection, etc.) */}
          {skill.restore > 0 && skill.id !== "surge" && skill.id !== "focus" && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-24 h-48 rounded-full bg-gradient-to-t from-transparent via-cyan-400 to-violet-500 blur-md shadow-[0_0_60px_#38BDF8]"
                style={{ animation: "manaPillarAnim 0.85s ease-out forwards" }}
              />
              <div className="absolute text-lg text-cyan-200 font-serif font-bold animate-pulse">
                💧 +{skill.restore} MANA
              </div>
            </div>
          )}

          {/* 7. Generic Self Buff Fallback */}
          {skill.id !== "ward" && skill.id !== "surge" && skill.id !== "focus" && !(skill.heal > 0 && !skill.dmg) && !(skill.shield > 0) && !(skill.restore > 0) && (
            <div className="relative flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full border-2 border-violet-400 shadow-[0_0_40px_#A855F7]"
                style={{
                  animation: "focusRippleAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  background: "radial-gradient(circle, #A855F722 0%, transparent 75%)",
                }}
              />
              <div className="absolute text-sm text-fuchsia-200 font-mono font-bold animate-bounce">
                ✦ {skill.name}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ================= MODERN SKILL CARD =================
export function ModernSkillCard({
  skill,
  hotkey,
  altKey,
  element,
  player,
  busy,
  onClick,
  onInspect,
  lang = "pt",
}) {
  const el = element || { name: "Arcane", color: T.arcane, icon: "✶" };
  const cdVal = (player?.cds && player.cds[skill.id]) || 0;
  const onCd = cdVal > 0;
  const noMana = (player?.mana ?? 0) < skill.mana;
  const disabled = busy || onCd || noMana;
  const isAffinity = skill.el === player?.affinity;

  // Feedback states
  const [justTriggered, setJustTriggered] = useState(false);
  const [cdFinishedFlash, setCdFinishedFlash] = useState(false);
  const prevCdRef = useRef(cdVal);

  useEffect(() => {
    if (prevCdRef.current > 0 && cdVal === 0) {
      setCdFinishedFlash(true);
      const timer = setTimeout(() => setCdFinishedFlash(false), 500);
      prevCdRef.current = cdVal;
      return () => clearTimeout(timer);
    }
    prevCdRef.current = cdVal;
  }, [cdVal]);

  const handleCardClick = (e) => {
    if (disabled) return;
    setJustTriggered(true);
    setTimeout(() => setJustTriggered(false), 300);
    if (onClick) onClick(e);
  };

  const displayName = (lang === "pt" && skill.name_pt)
    ? skill.name_pt
    : (skill.name_pt || (skill.id === "focus" && lang === "pt" ? "Foco Arcano" : skill.name));

  const displayDesc = (lang === "pt" ? (skill.desc_pt || skill.desc) : (skill.desc || skill.desc_pt)) || "";

  return (
    <button
      onClick={handleCardClick}
      disabled={disabled}
      type="button"
      className={`w-full rounded-xl border p-1.5 xs:p-2 sm:p-2.5 text-left font-mono transition-all duration-150 relative overflow-hidden group flex flex-col justify-between select-none min-h-[96px] xs:min-h-[102px] sm:min-h-[110px] ${
        disabled
          ? "opacity-45 cursor-not-allowed filter grayscale-[0.3]"
          : "hover:-translate-y-0.5 active:translate-y-0.5 hover:border-amber-400/60 cursor-pointer shadow-md hover:shadow-lg"
      }`}
      style={{
        backgroundColor: T.bgSurface,
        borderColor: cdFinishedFlash
          ? T.warning
          : noMana && !onCd
          ? `${T.danger}55`
          : !disabled
          ? `${el.color}50`
          : T.borderSubtle,
        boxShadow: cdFinishedFlash
          ? `0 0 16px ${T.warning}88`
          : !disabled
          ? `0 4px 14px rgba(0,0,0,0.35), 0 0 12px ${el.color}25`
          : "none",
      }}
    >
      {/* Expanding energy ring feedback upon trigger */}
      {justTriggered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none animate-ping opacity-60"
          style={{ border: `2px solid ${el.color}` }}
        />
      )}

      {/* Cooldown end shimmer overlay */}
      {cdFinishedFlash && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none animate-pulse" />
      )}

      {/* Top Header Row: Hotkey Badge, Element Icon/Badge & Mana Gem */}
      <div className="flex items-center justify-between gap-1 w-full mb-0.5 flex-shrink-0">
        <div className="flex items-center gap-1 min-w-0">
          <div className="keycap-pill">
            <span>{hotkey}</span>
            {altKey && <span className="text-[8px] opacity-70 ml-0.5">·{altKey}</span>}
          </div>
          <span
            className="text-[9px] xs:text-[9.5px] sm:text-[10px] font-mono font-bold flex items-center gap-1 px-1.5 py-0.5 rounded border flex-shrink-0"
            style={{
              color: el.color,
              borderColor: `${el.color}44`,
              backgroundColor: `${el.color}18`,
            }}
            title={el.name}
          >
            <span>{el.icon}</span>
            <span className="hidden xs:inline text-[8.5px] sm:text-[9px]">{el.name}</span>
          </span>
          {isAffinity && (
            <span className="text-[8px] xs:text-[8.5px] font-mono font-bold px-1 py-0.2 rounded bg-amber-950/80 border border-amber-400/50 text-amber-300 flex-shrink-0 shadow-sm">
              +25%
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <span
            className={`text-[9px] xs:text-[9.5px] sm:text-[10.5px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full border shadow-sm ${
              skill.mana === 0
                ? "border-emerald-500/60 bg-emerald-950/80 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                : noMana
                ? "border-red-500/60 bg-red-950/80 text-red-300"
                : "border-sky-500/50 bg-sky-950/80 text-sky-200 shadow-[0_0_8px_rgba(14,165,233,0.25)]"
            }`}
          >
            {skill.mana === 0 ? "GRÁTIS" : `💧 ${skill.mana}`}
          </span>
          {onInspect && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onInspect(skill);
              }}
              className="text-[10px] xs:text-[11px] px-1 py-0.5 rounded hover:bg-white/20 active:scale-95 text-zinc-400 hover:text-amber-300 transition-all cursor-pointer"
              title={lang === "pt" ? "Ver detalhes do feitiço" : "Spell details"}
            >
              ℹ️
            </span>
          )}
        </div>
      </div>

      {/* Dedicated Spell Name Row + Stat Badges */}
      <div className="w-full my-0.5 min-w-0 flex items-center justify-between gap-1 flex-shrink-0">
        <h4
          className="font-serif text-[11.5px] xs:text-[12.5px] sm:text-[13.5px] font-bold leading-tight text-[#FAF6EE] group-hover:text-amber-200 transition-colors truncate max-w-[65%]"
          title={displayName}
        >
          {displayName}
        </h4>
        <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
          {skill.dmg > 0 && (
            <span className="font-bold text-red-200 bg-red-950/70 px-1 py-0.2 rounded border border-red-500/40 flex items-center gap-0.5 shadow-sm text-[8.5px] xs:text-[9.5px]">
              ⚔️ {skill.dmg}
            </span>
          )}
          {skill.shield > 0 && (
            <span className="font-bold text-sky-200 bg-sky-950/70 px-1 py-0.2 rounded border border-sky-500/40 flex items-center gap-0.5 shadow-sm text-[8.5px] xs:text-[9.5px]">
              🛡️ +{skill.shield}
            </span>
          )}
          {skill.restore > 0 && (
            <span className="font-bold text-cyan-200 bg-cyan-950/70 px-1 py-0.2 rounded border border-cyan-500/40 flex items-center gap-0.5 shadow-sm text-[8.5px] xs:text-[9.5px]">
              💧 +{skill.restore}
            </span>
          )}
          {skill.heal > 0 && (
            <span className="font-bold text-emerald-200 bg-emerald-950/70 px-1 py-0.2 rounded border border-emerald-500/40 flex items-center gap-0.5 shadow-sm text-[8.5px] xs:text-[9.5px]">
              💚 +{skill.heal}
            </span>
          )}
        </div>
      </div>

      {/* Bottom row: Lore/Effect summary - High contrast, clearly readable */}
      <div className="w-full mt-auto text-[9px] xs:text-[9.5px] sm:text-[10px] font-sans text-zinc-200/95 leading-tight line-clamp-2 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 flex-shrink-0">
        {displayDesc}
      </div>

      {/* Cooldown Sleek Glass Overlay */}
      {onCd && (
        <div
          className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none z-10 rounded-xl"
          style={{
            backgroundColor: "rgba(10, 12, 18, 0.85)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 shadow-md">
            <span className="text-xs">⏳</span>
            <span className="text-[11px] font-mono font-bold text-amber-300">
              {cdVal} turno{cdVal > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

// ================= ARCANE FOCUS ACTION TILE =================
export function FocoActionTile({
  onClick,
  restore = 14,
  disabled = false,
  hotkey = "ESPAÇO",
  altKey = "F",
  lang = "pt",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`rounded-xl border p-1.5 xs:p-2 sm:p-2.5 text-left font-mono transition-all duration-150 relative overflow-hidden group flex flex-col justify-between select-none min-h-[96px] xs:min-h-[102px] sm:min-h-[110px] ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer shadow-[0_0_15px_rgba(2,132,199,0.25)] hover:shadow-[0_0_22px_rgba(56,189,248,0.4)] hover:border-sky-400"
      }`}
      style={{
        background: disabled
          ? "linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)"
          : "linear-gradient(145deg, rgba(8, 47, 73, 0.85) 0%, rgba(3, 105, 161, 0.4) 100%)",
        borderColor: disabled ? "rgba(56, 189, 248, 0.2)" : "rgba(56, 189, 248, 0.6)",
      }}
      title={lang === "pt" ? `Recuperar ${restore} de Mana (Teclas Espaço ou F)` : `Restore ${restore} Mana (Keys Space or F)`}
    >
      <div className="flex items-center justify-between gap-1 w-full flex-shrink-0">
        <div className="keycap-pill keycap-pill-cyan">
          <span>{hotkey}</span>
          {altKey && <span className="text-[8px] opacity-70 ml-0.5">·{altKey}</span>}
        </div>
        <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-sky-950/80 border border-sky-400/50 text-sky-200 shadow-[0_0_8px_rgba(56,189,248,0.3)]">
          💧 +{restore}
        </span>
      </div>

      <div className="w-full my-0.5 flex items-center gap-1.5 flex-shrink-0">
        <span className="text-sm sm:text-base animate-pulse">⚡</span>
        <h4 className="font-serif text-[12px] xs:text-[13px] sm:text-[14px] font-bold text-sky-100 group-hover:text-white truncate">
          {lang === "pt" ? "Foco Arcano" : "Arcane Focus"}
        </h4>
      </div>

      <div className="w-full mt-auto text-[9px] xs:text-[9.5px] sm:text-[10px] font-sans text-sky-200/80 leading-tight bg-black/30 px-1.5 py-0.5 rounded border border-sky-400/10 flex-shrink-0 truncate">
        {lang === "pt" ? "Gera mana instantânea" : "Generates instant mana"}
      </div>
    </button>
  );
}

// ================= CONSUMABLES BAG ACTION TILE =================
export function MochilaActionTile({
  onClick,
  count = 0,
  disabled = false,
  hotkey = "B",
  altKey = "M",
  lang = "pt",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`rounded-xl border p-1.5 xs:p-2 sm:p-2.5 text-left font-mono transition-all duration-150 relative overflow-hidden group flex flex-col justify-between select-none min-h-[96px] xs:min-h-[102px] sm:min-h-[110px] ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer shadow-[0_0_15px_rgba(5,150,105,0.25)] hover:shadow-[0_0_22px_rgba(52,211,153,0.4)] hover:border-emerald-400"
      }`}
      style={{
        background: disabled
          ? "linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)"
          : "linear-gradient(145deg, rgba(6, 78, 59, 0.85) 0%, rgba(5, 150, 105, 0.4) 100%)",
        borderColor: disabled ? "rgba(52, 211, 153, 0.2)" : "rgba(52, 211, 153, 0.6)",
      }}
      title={lang === "pt" ? "Abrir Mochila de Consumíveis [Teclas B ou M]" : "Open Consumables Bag [Keys B or M]"}
    >
      <div className="flex items-center justify-between gap-1 w-full flex-shrink-0">
        <div className="keycap-pill keycap-pill-emerald">
          <span>{hotkey}</span>
          {altKey && <span className="text-[8px] opacity-70 ml-0.5">·{altKey}</span>}
        </div>
        <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-400/50 text-emerald-200 shadow-[0_0_8px_rgba(52,211,153,0.3)]">
          🎒 {count}
        </span>
      </div>

      <div className="w-full my-0.5 flex items-center gap-1.5 flex-shrink-0">
        <span className="text-sm sm:text-base">🧪</span>
        <h4 className="font-serif text-[12px] xs:text-[13px] sm:text-[14px] font-bold text-emerald-100 group-hover:text-white truncate">
          {lang === "pt" ? "Mochila" : "Potion Bag"}
        </h4>
      </div>

      <div className="w-full mt-auto text-[9px] xs:text-[9.5px] sm:text-[10px] font-sans text-emerald-200/80 leading-tight bg-black/30 px-1.5 py-0.5 rounded border border-emerald-400/10 flex-shrink-0 truncate">
        {lang === "pt" ? "Poções & Elixires" : "Potions & Elixirs"}
      </div>
    </button>
  );
}

// ================= ARCANE CHRONICLE (COMBAT LOG) =================
export function ArcaneChronicle({ log, logRef }) {
  const [showFullModal, setShowFullModal] = useState(false);

  // Automatically auto-scroll to latest log entry
  useEffect(() => {
    if (logRef?.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log, logRef]);

  return (
    <>
      <div
        className="rounded-xl border p-1.5 xs:p-2 sm:p-2.5 font-mono flex flex-col h-full overflow-hidden shadow-lg"
        style={{
          backgroundColor: T.bgBase,
          borderColor: T.borderDefault,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Compact Header with Full History Trigger */}
        <div
          className="flex items-center justify-between pb-1 mb-1 border-b text-[10px] sm:text-[12px] font-mono flex-shrink-0"
          style={{ borderColor: `${T.borderSubtle}` }}
        >
          <div className="flex items-center gap-1.5 font-serif font-bold text-amber-300">
            <span>📜</span>
            <span className="tracking-wide text-[10.5px] xs:text-[11px] sm:text-[13px]">CRÔNICA DE BATALHA</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFullModal(true)}
            className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-amber-400/40 hover:border-amber-300 text-amber-300 text-[9px] sm:text-[10px] font-sans font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm active:scale-95"
            title="Ver histórico completo do combate"
          >
            <span>↗</span>
            <span>Histórico</span>
          </button>
        </div>

        {/* Live Scrolling Log Entries without Truncation */}
        <div ref={logRef} className="flex-1 overflow-y-auto pr-0.5 sm:pr-1 space-y-0.5 sm:space-y-1 custom-scrollbar">
          {log.map((line, idx) => {
            const isLatest = idx === log.length - 1;
            const isCrit = line.includes("CRITICAL HIT") || line.includes("CRÍTICO");
            const isYou = line.startsWith("You cast") || line.startsWith("Você lançou") || line.startsWith("Você usou");
            const isFoe = line.includes("casts") || line.includes("lançou");
            const isVictory = line.includes("Victory") || line.includes("Vitória");
            const isDefeat = line.includes("Defeat") || line.includes("Derrota");
            const isWard = line.includes("ward") || line.includes("Ward");
            const isBurn = line.includes("Burning") || line.includes("Queimadura");
            const isChill = line.includes("Chilled") || line.includes("Congelamento");

            return (
              <div
                key={idx}
                className={`leading-tight transition-opacity text-[9.5px] xs:text-[10px] sm:text-[11.5px] font-mono break-words ${
                  isLatest ? "font-bold" : "opacity-85"
                }`}
                style={{
                  color: isCrit
                    ? T.gold
                    : isVictory
                    ? T.success
                    : isDefeat
                    ? T.danger
                    : isYou
                    ? "#A7F3D0"
                    : isFoe
                    ? "#FCA5A5"
                    : isWard
                    ? T.info
                    : isBurn
                    ? T.fire
                    : isChill
                    ? "#BAE6FD"
                    : T.textPrimary,
                }}
              >
                <span className="opacity-40 mr-1" style={{ color: T.textTertiary }}>▸</span>
                {line}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Combat History Modal for Mobile & Desktop */}
      {showFullModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm safe-all"
          onClick={() => setShowFullModal(false)}
        >
          <div
            className="w-full max-w-md md:max-w-lg bg-slate-950 border border-amber-500/40 rounded-2xl p-3.5 sm:p-5 shadow-2xl flex flex-col max-h-[85dvh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-amber-200">
                    Histórico Completo da Batalha
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Todos os turnos, feitiços e danos registrados ({log.length} eventos)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFullModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar text-[11px] sm:text-[12px] font-mono">
              {log.map((line, idx) => {
                const isCrit = line.includes("CRITICAL HIT") || line.includes("CRÍTICO");
                const isYou = line.startsWith("You cast") || line.startsWith("Você lançou") || line.startsWith("Você usou");
                const isFoe = line.includes("casts") || line.includes("lançou");
                const isVictory = line.includes("Victory") || line.includes("Vitória");
                const isDefeat = line.includes("Defeat") || line.includes("Derrota");
                const isWard = line.includes("ward") || line.includes("Ward");
                const isBurn = line.includes("Burning") || line.includes("Queimadura");
                const isChill = line.includes("Chilled") || line.includes("Congelamento");

                return (
                  <div
                    key={idx}
                    className="p-1.5 rounded bg-slate-900/60 border border-white/5 leading-relaxed break-words"
                    style={{
                      color: isCrit
                        ? T.gold
                        : isVictory
                        ? T.success
                        : isDefeat
                        ? T.danger
                        : isYou
                        ? "#A7F3D0"
                        : isFoe
                        ? "#FCA5A5"
                        : isWard
                        ? T.info
                        : isBurn
                        ? T.fire
                        : isChill
                        ? "#BAE6FD"
                        : T.textPrimary,
                    }}
                  >
                    <span className="opacity-40 mr-1.5 text-zinc-400">#{idx + 1} ▸</span>
                    {line}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 mt-2 border-t border-white/10 flex justify-end flex-shrink-0">
              <button
                onClick={() => setShowFullModal(false)}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-sans transition-colors cursor-pointer shadow-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ================= SURRENDER CONFIRMATION MODAL =================
export function SurrenderModal({ isOpen, onConfirm, onCancel, busy }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="w-full max-w-sm rounded-xl p-6 text-center modal-window">
        <div className="text-3xl mb-3">🏳️</div>
        <h3 className="font-serif text-[20px] font-bold mb-2" style={{ color: T.textPrimary }}>
          Conceder o Duelo?
        </h3>
        <p className="font-mono text-[12px] mb-6 leading-relaxed" style={{ color: T.textSecondary }}>
          Abandonar conta como derrota e você retornará ao Sanctum. Deseja prosseguir?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 btn-danger rounded-lg py-2.5 font-mono text-[12px] font-bold transition-all"
          >
            Sim, Conceder
          </button>
          <button
            onClick={onCancel}
            className="flex-1 btn-surface rounded-lg py-2.5 font-mono text-[12px] font-bold transition-all"
          >
            Continuar Lutando
          </button>
        </div>
      </div>
    </div>
  );
}
