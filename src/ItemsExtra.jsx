import React from "react";

// ================= CONSTANTES E CORES COMPARTILHADAS =================
const GOLD = "#E8B44F";
const GOLD_D = "#C9902E";

// ================= GRUPO 1: 3 NOVOS STAFFS =================

/**
 * 1. stormcaller — "Stormcaller's Rod"
 * Haste de madeira negra com bifurcação metálica, cristal de tempestade
 * emitindo arcos elétricos violetas e dourados.
 */
export function StaffStormcaller() {
  return (
    <g>
      <defs>
        <linearGradient id="stormShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B0914" />
          <stop offset="30%" stopColor="#1E1736" />
          <stop offset="70%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#0B0914" />
        </linearGradient>
        <linearGradient id="stormProngGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="40%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <radialGradient id="stormOrbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Main Staff Shaft */}
      <path d="M315 150 L319 150 L320 460 L314 460 Z" fill="url(#stormShaftGrad)" stroke="#3B0764" strokeWidth="0.8" />
      {/* Gold ferrule rings */}
      <rect x="313" y="445" width="8" height="6" rx="1" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
      <rect x="313.5" y="290" width="7" height="8" rx="1" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
      <rect x="313.5" y="165" width="7" height="5" rx="1" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />

      {/* Forked Lightning Metal Prongs */}
      {/* Left prong */}
      <path d="M314 165 C308 150 298 135 304 110 C306 100 311 96 314 102 C312 115 315 132 316 150 Z" fill="url(#stormProngGrad)" stroke="#6D28D9" strokeWidth="1" />
      {/* Right prong */}
      <path d="M320 165 C326 150 336 135 330 110 C328 100 323 96 320 102 C322 115 319 132 318 150 Z" fill="url(#stormProngGrad)" stroke="#6D28D9" strokeWidth="1" />

      {/* Central Floating Tempest Crystal */}
      <circle cx="317" cy="115" r="14" fill="url(#stormOrbGlow)" opacity="0.4" className="matchPulse" />
      <polygon points="317,98 324,115 317,132 310,115" fill="#DDD6FE" stroke="#FDE047" strokeWidth="1.2" />
      <polygon points="317,104 321,115 317,126 313,115" fill="#7C3AED" />

      {/* Crackling Lightning Arcs between Prongs */}
      <path d="M307 108 L314 114 L310 117 L317 122 L326 112" stroke="#FDE047" strokeWidth="1.4" fill="none" className="holySparkle" />
      <path d="M327 106 L321 113 L325 116 L317 120 L309 114" stroke="#C084FC" strokeWidth="1.2" fill="none" className="holySparkle" style={{ animationDelay: "0.6s" }} />

      {/* Floating Sparkles */}
      <circle cx="302" cy="112" r="1.5" fill="#FDE047" className="holySparkle" />
      <circle cx="332" cy="108" r="1.8" fill="#DDD6FE" className="holySparkle" style={{ animationDelay: "0.9s" }} />
      <circle cx="317" cy="88" r="1.5" fill="#FDE047" className="holySparkle" style={{ animationDelay: "0.4s" }} />
    </g>
  );
}

/**
 * 2. bloodpact — "Bloodpact Stave"
 * Haste de ferro escuro (#450A0A) com veias vermelhas pulsantes,
 * topo com caveira e gema rubi flamejante.
 */
export function StaffBloodpact() {
  return (
    <g>
      <defs>
        <linearGradient id="bloodShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1C0505" />
          <stop offset="40%" stopColor="#450A0A" />
          <stop offset="70%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#1C0505" />
        </linearGradient>
        <radialGradient id="bloodGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Main Staff Shaft */}
      <path d="M315 145 L319 145 L320 460 L314 460 Z" fill="url(#bloodShaftGrad)" stroke="#2B0505" strokeWidth="0.9" />

      {/* Pulsing Cursed Blood Veins on the Shaft */}
      <path d="M315 420 Q318 380 316 340 Q319 300 316 260 Q318 220 316 170" stroke="#EF4444" strokeWidth="1.3" fill="none" opacity="0.85" className="wingEmber" />
      <path d="M318 390 Q315 350 318 310 Q315 270 318 210 Q315 180 317 150" stroke="#F87171" strokeWidth="0.9" fill="none" opacity="0.75" className="wingEmber" style={{ animationDelay: "0.5s" }} />

      {/* Bone Skull Crown at Top */}
      <g transform="translate(317 130)">
        {/* Blood Aura */}
        <circle cx="0" cy="-5" r="20" fill="url(#bloodGlow)" opacity="0.45" className="matchPulse" />

        {/* Skull Head Base */}
        <path d="M-9 -16 C-10 -24 10 -24 9 -16 C10 -10 6 -4 6 2 C3 4 -3 4 -6 2 C-6 -4 -10 -10 -9 -16 Z" fill="#F5F0E6" stroke="#450A0A" strokeWidth="1.2" />
        {/* Skull Cheekbones & Teeth */}
        <path d="M-5 2 L-5 7 L5 7 L5 2 Z" fill="#E6DFD1" stroke="#450A0A" strokeWidth="0.9" />
        <line x1="-2.5" y1="2" x2="-2.5" y2="7" stroke="#450A0A" strokeWidth="0.8" />
        <line x1="0" y1="2" x2="0" y2="7" stroke="#450A0A" strokeWidth="0.8" />
        <line x1="2.5" y1="2" x2="2.5" y2="7" stroke="#450A0A" strokeWidth="0.8" />
        {/* Eye sockets with blazing crimson fire */}
        <ellipse cx="-4" cy="-12" rx="2.5" ry="3.2" fill="#2B0505" />
        <circle cx="-4" cy="-12" r="1.3" fill="#EF4444" className="matchPulse" />
        <ellipse cx="4" cy="-12" rx="2.5" ry="3.2" fill="#2B0505" />
        <circle cx="4" cy="-12" r="1.3" fill="#EF4444" className="matchPulse" />
        {/* Nasal Cavity */}
        <polygon points="0,-8 -1.2,-5 1.2,-5" fill="#2B0505" />

        {/* Pulsing Ruby Gem Crested in Forehead */}
        <polygon points="0,-24 4,-19 0,-14 -4,-19" fill="#DC2626" stroke="#FEF08A" strokeWidth="0.9" />
        <circle cx="0" cy="-19" r="1.4" fill="#FFFFFF" />

        {/* Floating Blood Droplets */}
        <circle cx="-8" cy="-22" r="1.6" fill="#DC2626" className="holySparkle" />
        <circle cx="9" cy="-20" r="1.4" fill="#F87171" className="holySparkle" style={{ animationDelay: "0.8s" }} />
      </g>
    </g>
  );
}

/**
 * 3. coral_scepter — "Coral Scepter"
 * Scepter de coral rosa e azul marinho com pérola luminosa dentro
 * de uma concha aberta e peixinhos nadando em volta.
 */
export function StaffCoralScepter() {
  return (
    <g>
      <defs>
        <linearGradient id="coralBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </radialGradient>
      </defs>

      {/* Main Living Coral Branching Shaft */}
      <path d="M315 160 C317 220 313 280 317 350 C315 390 318 430 316 460" stroke="url(#coralBranchGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M315 160 C317 220 313 280 317 350 C315 390 318 430 316 460" stroke="#FDF2F8" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Secondary Coral Side Branches */}
      <path d="M315 270 C306 255 302 245 300 238" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M317 330 C326 315 330 305 332 295" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Top Open Sea Shell with Radiant Pearl */}
      <g transform="translate(317 135)">
        {/* Back Shell Half */}
        <path d="M-14 8 C-18 -10 18 -10 14 8 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1" />
        <line x1="0" y1="8" x2="0" y2="-6" stroke="#F472B6" strokeWidth="1" opacity="0.6" />
        <line x1="-7" y1="8" x2="-10" y2="-4" stroke="#F472B6" strokeWidth="0.8" opacity="0.6" />
        <line x1="7" y1="8" x2="10" y2="-4" stroke="#F472B6" strokeWidth="0.8" opacity="0.6" />

        {/* Radiant Luminous Pearl */}
        <circle cx="0" cy="2" r="8" fill="url(#pearlGlow)" className="matchPulse" />
        <circle cx="-2.5" cy="-0.5" r="2.2" fill="#FFFFFF" />

        {/* Front Shell Lip */}
        <path d="M-13 8 C-8 12 8 12 13 8 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />

        {/* Tiny swimming ocean fish */}
        <g transform="translate(-16 -12) scale(0.7)" className="holySparkle">
          <polygon points="0,0 8,3 8,-3" fill="#38BDF8" />
          <polygon points="8,0 12,4 12,-4" fill="#0284C7" />
        </g>
        <g transform="translate(18 -5) scale(0.6) scale(-1, 1)" className="holySparkle" style={{ animationDelay: "0.8s" }}>
          <polygon points="0,0 8,3 8,-3" fill="#F472B6" />
          <polygon points="8,0 12,4 12,-4" fill="#DB2777" />
        </g>
      </g>
    </g>
  );
}

// ================= GRUPO 3: 3 NOVOS HATS =================

/**
 * 7. hat_warlord — "Warlord's Horned Helm"
 * Capacete de ferro escuro (#3F3F46), chifres curvados de carneiro (#1F1F23),
 * placas laterais, proteção nasal e detalhes em ouro #E8B44F.
 */
export function HatWarlord() {
  return (
    <g>
      {/* Curved Ram Horns (curved down & around) */}
      {/* Left Horn */}
      <path d="M165 140 C140 120 125 140 135 170 C140 185 152 180 156 168 C148 152 152 142 165 146 Z" fill="#1F1F23" stroke="#09090B" strokeWidth="1.2" />
      <path d="M142 132 C135 144 135 160 144 172" stroke="#3F3F46" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Right Horn */}
      <path d="M235 140 C260 120 275 140 265 170 C260 185 248 180 244 168 C252 152 248 142 235 146 Z" fill="#1F1F23" stroke="#09090B" strokeWidth="1.2" />
      <path d="M258 132 C265 144 265 160 256 172" stroke="#3F3F46" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Heavy Iron Skull Cap */}
      <path d="M152 155 C150 115 250 115 248 155 L246 162 C230 158 170 158 154 162 Z" fill="#3F3F46" stroke="#18181B" strokeWidth="1.4" />
      {/* Forehead Gold Band & Rivets */}
      <path d="M154 154 C170 150 230 150 246 154 L245 162 C230 158 170 158 155 162 Z" fill={GOLD} stroke={GOLD_D} strokeWidth="1" />
      <circle cx="170" cy="157" r="1.4" fill="#18181B" />
      <circle cx="200" cy="156" r="1.8" fill="#18181B" />
      <circle cx="230" cy="157" r="1.4" fill="#18181B" />

      {/* Central Nasal Guard */}
      <polygon points="196,155 204,155 202,185 198,185" fill="#27272A" stroke="#18181B" strokeWidth="1" />
      <line x1="200" y1="156" x2="200" y2="183" stroke={GOLD} strokeWidth="1" />

      {/* Flanking Cheekguards */}
      <path d="M154 160 L160 185 L166 182 L163 160 Z" fill="#3F3F46" stroke="#18181B" strokeWidth="1" />
      <path d="M246 160 L240 185 L234 182 L237 160 Z" fill="#3F3F46" stroke="#18181B" strokeWidth="1" />
    </g>
  );
}

/**
 * 8. hat_laurel — "Laurel of the Archmage"
 * Coroa de folhas de louro douradas (#E8B44F) em volta da cabeça com
 * 4 gemas flutuantes orbitando (fire #FF6B3D, ice #5FC1E8, nature #72C063, arcane #B07FF5).
 * Cabelo permanece visível.
 */
export function HatLaurel() {
  const leavesL = [
    [165, 142, -25], [172, 137, -15], [180, 134, -8], [190, 133, -2], [198, 134, 0]
  ];
  const leavesR = [
    [235, 142, 25], [228, 137, 15], [220, 134, 8], [210, 133, 2], [202, 134, 0]
  ];

  return (
    <g>
      {/* Golden Wreath Stem Arc */}
      <path d="M162 144 C180 132 220 132 238 144" stroke={GOLD_D} strokeWidth="2" fill="none" />

      {/* Left Golden Laurel Leaves */}
      {leavesL.map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 0 C-4 -8 0 -14 6 -12 C10 -6 6 0 0 0 Z" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
          <line x1="0" y1="0" x2="4" y2="-10" stroke="#FFFBEB" strokeWidth="0.6" />
        </g>
      ))}

      {/* Right Golden Laurel Leaves */}
      {leavesR.map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 0 C4 -8 0 -14 -6 -12 C-10 -6 -6 0 0 0 Z" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
          <line x1="0" y1="0" x2="-4" y2="-10" stroke="#FFFBEB" strokeWidth="0.6" />
        </g>
      ))}

      {/* 4 Elemental Floating Orbiting Gems above the Brow */}
      {/* 1. Fire (Ruby) */}
      <g transform="translate(176 116)" className="holySparkle">
        <polygon points="0,-4 4,0 0,4 -4,0" fill="#FF6B3D" stroke="#FFF" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1" fill="#FFF" />
      </g>
      {/* 2. Ice (Sapphire) */}
      <g transform="translate(192 110)" className="holySparkle" style={{ animationDelay: "0.5s" }}>
        <polygon points="0,-4 4,0 0,4 -4,0" fill="#5FC1E8" stroke="#FFF" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1" fill="#FFF" />
      </g>
      {/* 3. Nature (Emerald) */}
      <g transform="translate(208 110)" className="holySparkle" style={{ animationDelay: "1.0s" }}>
        <polygon points="0,-4 4,0 0,4 -4,0" fill="#72C063" stroke="#FFF" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1" fill="#FFF" />
      </g>
      {/* 4. Arcane (Amethyst) */}
      <g transform="translate(224 116)" className="holySparkle" style={{ animationDelay: "1.5s" }}>
        <polygon points="0,-4 4,0 0,4 -4,0" fill="#B07FF5" stroke="#FFF" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1" fill="#FFF" />
      </g>
    </g>
  );
}

/**
 * 9. hat_jester — "Jester's Cap"
 * Gorro de bobo da corte de 3 pontas com sinetas douradas,
 * cores alternadas (roxo #7C3AED, vermelho #DC2626, dourado #E8B44F).
 */
export function HatJester() {
  return (
    <g>
      {/* Head Band Base */}
      <path d="M156 150 C170 144 230 144 244 150 L242 160 C230 156 170 156 158 160 Z" fill={GOLD} stroke={GOLD_D} strokeWidth="1" />
      {/* Alternating triangles on head band */}
      <polygon points="166,160 172,152 178,160" fill="#DC2626" />
      <polygon points="186,160 192,152 198,160" fill="#7C3AED" />
      <polygon points="206,160 212,152 218,160" fill="#DC2626" />
      <polygon points="226,160 232,152 238,160" fill="#7C3AED" />

      {/* Left Cap Horn (Curling outward to the left, Red) */}
      <path d="M162 148 C140 130 120 125 116 142 C114 152 128 156 138 146 C148 138 160 145 174 147 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
      {/* Left Bell */}
      <circle cx="116" cy="144" r="3.5" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
      <circle cx="116" cy="144" r="1.5" fill="#FEF08A" />

      {/* Center Cap Horn (Rising high & bending backward, Gold/Purple) */}
      <path d="M188 145 C192 110 200 90 208 85 C214 82 220 92 214 105 C208 118 206 135 212 145 Z" fill={GOLD} stroke={GOLD_D} strokeWidth="1.2" />
      {/* Center Bell */}
      <circle cx="210" cy="85" r="3.5" fill="#FEF08A" stroke={GOLD} strokeWidth="0.8" />
      <circle cx="210" cy="85" r="1.5" fill="#FFFFFF" />

      {/* Right Cap Horn (Curling outward to the right, Purple) */}
      <path d="M238 148 C260 130 280 125 284 142 C286 152 272 156 262 146 C252 138 240 145 226 147 Z" fill="#7C3AED" stroke="#4C1D95" strokeWidth="1.2" />
      {/* Right Bell */}
      <circle cx="284" cy="144" r="3.5" fill={GOLD} stroke={GOLD_D} strokeWidth="0.8" />
      <circle cx="284" cy="144" r="1.5" fill="#FEF08A" />
    </g>
  );
}

// ================= GRUPO 5: 3 NOVAS CAPES =================

/**
 * 12. cape_banner — "Banner of the Fallen"
 * Estandarte rasgado pendurado nas costas (#7A1C1C / #4A1010),
 * com brasão desbotado, furos de batalha e correias no ombro.
 */
export function CapeBanner({ color = "#7A1C1C", dark = "#4A1010" }) {
  return (
    <g>
      {/* Hanging battle banner draped behind mage */}
      <path
        d="M152 238
           C148 290 144 370 140 450
           L154 442 L164 452 L178 440 L192 454 L208 442 L222 452 L236 438 L248 450 L260 442
           C256 370 252 290 248 238 Z"
        fill={color}
        stroke={dark}
        strokeWidth="1.5"
      />
      {/* Shadow inner fold */}
      <path d="M152 238 C158 310 160 390 164 452 L178 440 L174 238 Z" fill={dark} opacity="0.5" />
      <path d="M248 238 C242 310 240 390 236 438 L222 452 L226 238 Z" fill={dark} opacity="0.5" />

      {/* Weathered Golden Gryphon / Eagle Crest */}
      <g transform="translate(200 310) scale(0.9)" opacity="0.75">
        <circle cx="0" cy="0" r="22" fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="6 3" />
        <polygon points="0,-16 6,-6 16,-6 8,2 11,12 0,6 -11,12 -8,2 -16,-6 -6,-6" fill={GOLD} opacity="0.8" />
        <circle cx="0" cy="0" r="3" fill="#DC2626" />
      </g>

      {/* Battle Torn Holes and Slashes */}
      <polygon points="168,360 172,364 167,370 164,364" fill="#0E0B1A" />
      <polygon points="230,380 236,384 232,392 227,385" fill="#0E0B1A" />
      <polygon points="185,410 190,412 186,420 182,414" fill="#0E0B1A" />

      {/* Shoulder Leather Harness Straps */}
      <line x1="150" y1="236" x2="168" y2="246" stroke="#2B1810" strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="236" r="3" fill={GOLD} />
      <line x1="250" y1="236" x2="232" y2="246" stroke="#2B1810" strokeWidth="3" strokeLinecap="round" />
      <circle cx="250" cy="236" r="3" fill={GOLD} />
    </g>
  );
}

/**
 * 13. cape_fur — "Northern Wolf Cloak"
 * Manto com gola volumosa de pele de lobo (#6B7280 / #3F4650),
 * fecho de osso no peito e cabeça de lobo no ombro direito.
 */
export function CapeFur({ color = "#6B7280", dark = "#3F4650" }) {
  return (
    <g>
      {/* Heavy Wool Cloak Body */}
      <path
        d="M148 238
           C140 280 134 360 128 456
           C160 464 240 464 272 456
           C266 360 260 280 252 238 Z"
        fill={color}
        stroke={dark}
        strokeWidth="1.6"
      />
      {/* Fold Drapery */}
      <path d="M148 238 C154 310 158 390 162 458 C150 456 138 454 128 456 Z" fill={dark} opacity="0.5" />
      <path d="M252 238 C246 310 242 390 238 458 C250 456 262 454 272 456 Z" fill={dark} opacity="0.5" />

      {/* Shaggy Wolf Fur Collar framing the shoulders */}
      <g fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.8">
        <path d="M140 230 C130 240 135 255 146 256 C140 264 148 274 162 268 C158 278 174 282 186 272 C194 280 206 280 214 272 C226 282 242 278 238 268 C252 274 260 264 254 256 C265 255 270 240 260 230 C246 220 154 220 140 230 Z" />
      </g>
      {/* Darker Inner Fur Depth */}
      <path d="M152 234 C165 245 235 245 248 234 C236 262 164 262 152 234 Z" fill="#6B7280" opacity="0.6" />

      {/* Bone Tibia Clasp */}
      <line x1="188" y1="246" x2="212" y2="246" stroke="#F5F0E6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="188" cy="246" r="3.2" fill="#E6DFD1" />
      <circle cx="212" cy="246" r="3.2" fill="#E6DFD1" />

      {/* Carved Northern Wolf Head Brooch on Right Shoulder */}
      <g transform="translate(250 234) scale(0.85)">
        <polygon points="0,-8 10,0 8,10 0,6 -8,10 -10,0" fill="#374151" stroke="#1F2937" strokeWidth="1" />
        <polygon points="-6,-6 -12,-14 -2,-9" fill="#1F2937" />
        <polygon points="6,-6 12,-14 2,-9" fill="#1F2937" />
        <circle cx="-3.5" cy="-1" r="1.5" fill="#38BDF8" />
        <circle cx="3.5" cy="-1" r="1.5" fill="#38BDF8" />
        <polygon points="0,4 -2,2 2,2" fill="#111827" />
      </g>
    </g>
  );
}

/**
 * 14. cape_void — "Void-Woven Shroud"
 * Manto espacial cósmico (#1E1B4B / #0F0A2E) que rasga revelando
 * o vácuo sideral com olhos arcanos piscantes e textura cósmica.
 */
export function CapeVoid({ color = "#1E1B4B", dark = "#0F0A2E" }) {
  return (
    <g>
      <defs>
        <radialGradient id="voidEyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAF5FF" />
          <stop offset="35%" stopColor="#C084FC" />
          <stop offset="85%" stopColor="#581C87" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Main Void Cosmic Shroud */}
      <path
        d="M144 236
           C134 290 126 380 120 460
           C155 470 245 470 280 460
           C274 380 266 290 256 236 Z"
        fill={color}
        stroke="#4C1D95"
        strokeWidth="1.8"
      />

      {/* Deep Space Dimensional Tears revealing Starfield */}
      <path d="M152 280 Q168 340 156 420 Q174 390 180 320 Z" fill="#05030A" stroke="#A855F7" strokeWidth="0.8" />
      <path d="M248 290 Q232 350 244 430 Q226 400 220 330 Z" fill="#05030A" stroke="#A855F7" strokeWidth="0.8" />
      <path d="M188 350 Q200 420 204 460 Q212 410 214 360 Z" fill="#05030A" stroke="#C084FC" strokeWidth="0.8" />

      {/* Starlight Constellations on Cape */}
      {[
        [158, 320], [164, 380], [172, 350], [238, 330], [230, 390], [200, 380], [195, 430], [206, 440]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.3} fill="#E9D5FF" className="holySparkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}

      {/* 4 Arcane Blinking Watcher Eyes along the Shroud */}
      {/* Eye 1 */}
      <g transform="translate(162 335)" className="matchPulse">
        <path d="M-8 0 Q0 -5 8 0 Q0 5 -8 0 Z" fill="#1E0A38" stroke="#C084FC" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.8" fill="url(#voidEyeGrad)" />
        <ellipse cx="0" cy="0" rx="0.9" ry="2.2" fill="#0A0214" />
      </g>
      {/* Eye 2 */}
      <g transform="translate(236 345)" className="matchPulse" style={{ animationDelay: "0.7s" }}>
        <path d="M-7 0 Q0 -4.5 7 0 Q0 4.5 -7 0 Z" fill="#1E0A38" stroke="#C084FC" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.6" fill="url(#voidEyeGrad)" />
        <ellipse cx="0" cy="0" rx="0.8" ry="2" fill="#0A0214" />
      </g>
      {/* Eye 3 */}
      <g transform="translate(200 405)" className="matchPulse" style={{ animationDelay: "1.2s" }}>
        <path d="M-9 0 Q0 -6 9 0 Q0 6 -9 0 Z" fill="#1E0A38" stroke="#E9D5FF" strokeWidth="1.1" />
        <circle cx="0" cy="0" r="3.2" fill="url(#voidEyeGrad)" />
        <ellipse cx="0" cy="0" rx="1.0" ry="2.5" fill="#0A0214" />
      </g>
    </g>
  );
}

// ================= GRUPO 6: 3 NOVOS ROBES & TRIMS =================

/**
 * 15. RobeSunburstTrim
 * Sol geométrico dourado no peito (#EA580C / #FED7AA / #F59E0B),
 * raios descendo pela estola e barra ornamentada.
 */
export function RobeSunburstTrim() {
  return (
    <g>
      {/* Solar Core Medallion on Chest */}
      <circle cx="200" cy="265" r="14" fill="#F59E0B" stroke="#FED7AA" strokeWidth="1.5" opacity="0.95" />
      <circle cx="200" cy="265" r="9" fill="#EA580C" />
      <circle cx="200" cy="265" r="4.5" fill="#FFFBEB" />

      {/* Sunburst Rays radiating outward */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
        <line
          key={i}
          x1="200"
          y1="265"
          x2={200 + Math.cos((ang * Math.PI) / 180) * 22}
          y2={265 + Math.sin((ang * Math.PI) / 180) * 22}
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}

      {/* Gilded Solar Rays descending the Stole */}
      <path d="M194 290 L194 445 M206 290 L206 445" stroke={GOLD} strokeWidth="1.6" opacity="0.85" />
      {[315, 350, 385, 420].map((y, i) => (
        <polygon key={i} points={`200,${y - 5} 204,${y} 200,${y + 5} 196,${y}`} fill="#FED7AA" />
      ))}
      <rect x="186" y="446" width="28" height="6" rx="1" fill={GOLD} />
    </g>
  );
}

/**
 * 16. RobeFrostveilTrim
 * Cristais de gelo geométricos no peito, geada rastejando pela barra
 * e flocos cintilantes (#BAE6FD / #F0F9FF).
 */
export function RobeFrostveilTrim() {
  return (
    <g>
      {/* Glacial Crystal Core on Chest */}
      <g transform="translate(200 265)">
        <polygon points="0,-16 12,0 0,16 -12,0" fill="#BAE6FD" stroke="#F0F9FF" strokeWidth="1.5" opacity="0.9" />
        <polygon points="0,-10 7,0 0,10 -7,0" fill="#38BDF8" opacity="0.85" />
        <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
      </g>

      {/* Frost Veins crawling down center panel */}
      <path d="M200 282 L200 445" stroke="#BAE6FD" strokeWidth="1.5" />
      <path d="M200 310 L192 322 M200 340 L208 352 M200 370 L190 384 M200 400 L210 414" stroke="#F0F9FF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Frozen Icicle Hem Pattern */}
      {[135, 155, 175, 195, 215, 235, 255].map((x, i) => (
        <polygon key={i} points={`${x},452 ${x + 5},464 ${x + 10},452`} fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="0.8" />
      ))}
    </g>
  );
}

/**
 * 17. RobeVerdantTrim
 * Vinhas vivas subindo pelas laterais, folhas brotando e
 * flor sagrada da floresta na gola (#166534 / #4ADE80).
 */
export function RobeVerdantTrim() {
  return (
    <g>
      {/* Blooming Forest Blossom on Chest */}
      <g transform="translate(200 265)">
        <circle cx="0" cy="0" r="10" fill="#15803D" opacity="0.8" />
        <circle cx="0" cy="-6" r="4.5" fill="#4ADE80" />
        <circle cx="6" cy="0" r="4.5" fill="#4ADE80" />
        <circle cx="0" cy="6" r="4.5" fill="#4ADE80" />
        <circle cx="-6" cy="0" r="4.5" fill="#4ADE80" />
        <circle cx="0" cy="0" r="4" fill="#FDE047" />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Living Green Vines winding down the stole */}
      <path d="M196 278 Q192 330 204 360 Q194 400 198 448" stroke="#16A34A" strokeWidth="1.8" fill="none" />
      <path d="M204 278 Q208 330 196 360 Q206 400 202 448" stroke="#4ADE80" strokeWidth="1.4" fill="none" />

      {/* Tiny Leaves Sprouting */}
      {[
        [190, 310, -35], [212, 340, 35], [192, 380, -35], [210, 420, 35]
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 0 C-3 -6 3 -6 0 0 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="0.8" />
        </g>
      ))}
    </g>
  );
}

// ================= GRUPO 7: 3 NOVOS OFFHANDS =================

/**
 * 18. offhand_buckler — "Runic Buckler"
 * Pequeno escudo redondo (30x35) flutuando do lado esquerdo,
 * ferro #52525B, runas douradas #E8B44F girando, gema azul #38BDF8 no centro.
 */
export function OffhandBuckler() {
  return (
    <g transform="translate(94 315) rotate(5)">
      {/* Telekinetic Levitation Glow */}
      <ellipse cx="0" cy="24" rx="22" ry="6" fill="none" stroke={GOLD} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.75" />

      {/* Outer Iron Rim */}
      <circle cx="0" cy="0" r="22" fill="#52525B" stroke="#27272A" strokeWidth="2" />
      <circle cx="0" cy="0" r="19" fill="#3F3F46" stroke={GOLD} strokeWidth="1.2" />

      {/* Rotating Arcane Runes Band */}
      <circle cx="0" cy="0" r="14" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="4 2" opacity="0.85" className="matchSpin" />

      {/* Center Shield Boss with Radiant Blue Gem */}
      <circle cx="0" cy="0" r="9" fill="#18181B" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="0" cy="0" r="6" fill="#38BDF8" className="matchPulse" />
      <circle cx="-1.8" cy="-1.8" r="2" fill="#FFFFFF" />

      {/* 4 Golden Rivets */}
      <circle cx="0" cy="-16" r="1.4" fill={GOLD} />
      <circle cx="16" cy="0" r="1.4" fill={GOLD} />
      <circle cx="0" cy="16" r="1.4" fill={GOLD} />
      <circle cx="-16" cy="0" r="1.4" fill={GOLD} />
    </g>
  );
}

/**
 * 19. offhand_skull — "Skull Grimoire"
 * Livro encadernado em osso (#F5F0E6), capa com relevo espectral de caveira,
 * correntes penduradas e vela acesa no topo derretendo cera (#FEF08A).
 */
export function OffhandSkull() {
  return (
    <g transform="translate(94 315) rotate(-8)">
      {/* Telekinetic Levitation Glow */}
      <ellipse cx="0" cy="26" rx="26" ry="7" fill="none" stroke="#DC2626" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.65" />

      {/* Bone Book Cover */}
      <rect x="-26" y="-18" width="48" height="36" rx="3.5" fill="#3A2416" />
      <rect x="-24" y="-16" width="44" height="32" rx="2" fill="#F5F0E6" stroke="#451A0A" strokeWidth="1.2" />

      {/* Skeletal Spine with Brass Ribs */}
      <rect x="-26" y="-18" width="8" height="36" fill="#D4C8B5" stroke="#451A0A" strokeWidth="0.9" />
      <line x1="-26" y1="-8" x2="-18" y2="-8" stroke="#451A0A" strokeWidth="1.2" />
      <line x1="-26" y1="0" x2="-18" y2="0" stroke="#451A0A" strokeWidth="1.2" />
      <line x1="-26" y1="8" x2="-18" y2="8" stroke="#451A0A" strokeWidth="1.2" />

      {/* Spectral Carved Skull Face on Cover */}
      <g transform="translate(-4 0)">
        <path d="M-8 -8 C-8 -14 8 -14 8 -8 C8 -2 5 2 5 6 C2 7 -2 7 -5 6 C-5 2 -8 -2 -8 -8 Z" fill="#E6DFD1" stroke="#451A0A" strokeWidth="1" />
        <circle cx="-3" cy="-7" r="1.8" fill="#1C0A00" />
        <circle cx="3" cy="-7" r="1.8" fill="#1C0A00" />
        <polygon points="0,-4 -1,-2 1,-2" fill="#1C0A00" />
      </g>

      {/* Melting Skull Candle on Top of Book */}
      <g transform="translate(-6 -22)">
        <rect x="-3" y="0" width="6" height="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
        {/* Dripping wax */}
        <path d="M-3 4 Q-5 7 -3 8" stroke="#FEF08A" strokeWidth="1" fill="none" />
        <path d="M3 2 Q5 6 3 7" stroke="#FEF08A" strokeWidth="1" fill="none" />
        {/* Burning Flame */}
        <path d="M0 -6 C3 -2 2 0 0 0 C-2 0 -3 -2 0 -6 Z" fill="#F97316" className="wingEmber" />
        <circle cx="0" cy="-1.5" r="1.5" fill="#FEF08A" />
      </g>

      {/* Hanging Cursed Chains */}
      <path d="M-18 18 Q-22 28 -14 34 Q-8 28 -12 18" stroke="#71717A" strokeWidth="1.2" fill="none" />
    </g>
  );
}

/**
 * 20. offhand_prism — "Prism of Echoes"
 * Cristal triangular multicolorido flutuante (#E0E7FF), emitindo raios
 * dos 4 elementos com 3 mini-cristais satélites girando.
 */
export function OffhandPrism() {
  return (
    <g transform="translate(94 315)">
      {/* Prismatic Aura Glow */}
      <circle cx="0" cy="0" r="28" fill="#E0E7FF" opacity="0.25" className="matchPulse" />

      {/* Central Rotating Triangular Prism */}
      <g className="matchSpin">
        {/* Facet 1: Fire/Warm */}
        <polygon points="0,-22 18,10 0,6" fill="#FCA5A5" opacity="0.85" stroke="#EF4444" strokeWidth="0.8" />
        {/* Facet 2: Ice/Cool */}
        <polygon points="0,-22 -18,10 0,6" fill="#BAE6FD" opacity="0.85" stroke="#38BDF8" strokeWidth="0.8" />
        {/* Facet 3: Arcane/Bottom */}
        <polygon points="-18,10 18,10 0,6" fill="#DDD6FE" opacity="0.9" stroke="#A855F7" strokeWidth="0.8" />
        {/* Center Crystal Core */}
        <circle cx="0" cy="2" r="3" fill="#FFFFFF" />
      </g>

      {/* 3 Orbiting Mini Satellites */}
      {/* Satellite 1 (Nature) */}
      <g transform="translate(18 -16) scale(0.6)" className="holySparkle">
        <polygon points="0,-8 6,0 0,8 -6,0" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" />
      </g>
      {/* Satellite 2 (Arcane) */}
      <g transform="translate(-20 -12) scale(0.55)" className="holySparkle" style={{ animationDelay: "0.6s" }}>
        <polygon points="0,-8 6,0 0,8 -6,0" fill="#C084FC" stroke="#7C3AED" strokeWidth="1" />
      </g>
      {/* Satellite 3 (Fire) */}
      <g transform="translate(4 22) scale(0.5)" className="holySparkle" style={{ animationDelay: "1.2s" }}>
        <polygon points="0,-8 6,0 0,8 -6,0" fill="#FDE047" stroke="#EA580C" strokeWidth="1" />
      </g>
    </g>
  );
}

// ================= GRUPO 8: 3 NOVOS PETS =================

/**
 * 21. pet_dragon — "Baby Dragon"
 * Chibi dragão bebê com escamas vermelhas (#DC2626), asas pequenas,
 * cauda com chama na ponta, olhinhos amarelos, paira via `petHover`.
 */
export function PetDragon() {
  return (
    <g>
      {/* Heat Glow */}
      <circle cx="0" cy="0" r="26" fill="#F97316" opacity="0.2" className="matchPulse" />

      {/* Dragon Wings */}
      <path d="M-6 -2 C-18 -18 -26 -10 -16 2 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="0.9" />
      <path d="M6 -2 C18 -18 26 -10 16 2 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="0.9" />

      {/* Tail with flame tip */}
      <path d="M6 14 C14 18 20 12 22 2 C20 4 16 8 10 12 Z" fill="#B91C1C" />
      <path d="M22 2 C25 -4 20 -8 24 -14 C26 -8 32 -4 24 2 Z" fill="#F59E0B" className="wingEmber" />
      <circle cx="23" cy="-4" r="1.5" fill="#FEF08A" />

      {/* Round Chibi Body */}
      <ellipse cx="0" cy="8" rx="13" ry="11" fill="#DC2626" />
      {/* Golden belly scales */}
      <ellipse cx="-1" cy="9" rx="7" ry="8" fill="#FBBF24" opacity="0.9" />

      {/* Chibi Dragon Head */}
      <circle cx="0" cy="-6" r="12" fill="#DC2626" />

      {/* Curved Horns */}
      <path d="M-4 -14 C-7 -22 -12 -22 -10 -16 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.8" />
      <path d="M4 -14 C7 -22 12 -22 10 -16 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.8" />

      {/* Cute Snout */}
      <ellipse cx="0" cy="-2" rx="6" ry="4" fill="#B91C1C" />
      <circle cx="-2" cy="-2.5" r="0.8" fill="#450A0A" />
      <circle cx="2" cy="-2.5" r="0.8" fill="#450A0A" />

      {/* Large expressive golden eyes */}
      <circle cx="-5" cy="-7" r="4.2" fill="#1C0A00" />
      <circle cx="-5" cy="-7" r="3.2" fill="#FBBF24" />
      <circle cx="-4" cy="-8" r="1.4" fill="#FFFFFF" />
      <circle cx="5" cy="-7" r="4.2" fill="#1C0A00" />
      <circle cx="5" cy="-7" r="3.2" fill="#FBBF24" />
      <circle cx="6" cy="-8" r="1.4" fill="#FFFFFF" />

      {/* Tiny claws */}
      <ellipse cx="-5" cy="19" rx="3.5" ry="2" fill="#7F1D1D" />
      <ellipse cx="5" cy="19" rx="3.5" ry="2" fill="#7F1D1D" />
    </g>
  );
}

/**
 * 22. pet_owl — "Owl Familiar"
 * Coruja arcana pousada (`petGround`), olhos roxos luminosos,
 * penas #4C1D95, lendo minilivro cósmico flutuante.
 */
export function PetOwl() {
  return (
    <g>
      {/* Owl Body */}
      <ellipse cx="0" cy="8" rx="12" ry="15" fill="#4C1D95" stroke="#2E1065" strokeWidth="1" />
      {/* Light speckled breast */}
      <ellipse cx="0" cy="10" rx="8" ry="11" fill="#6D28D9" opacity="0.75" />
      <path d="M-3 5 Q0 7 3 5 M-4 9 Q0 11 4 9 M-3 13 Q0 15 3 13" stroke="#DDD6FE" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Folded Wings */}
      <path d="M-11 4 C-14 12 -12 20 -7 22 C-9 16 -10 10 -9 4 Z" fill="#3B0764" />
      <path d="M11 4 C14 12 12 20 7 22 C9 16 10 10 9 4 Z" fill="#3B0764" />

      {/* Owl Head with Feather Tufts */}
      <circle cx="0" cy="-6" r="11" fill="#4C1D95" />
      <polygon points="-8,-12 -11,-18 -4,-13" fill="#3B0764" />
      <polygon points="8,-12 11,-18 4,-13" fill="#3B0764" />

      {/* Big Arcane Glowing Eyes */}
      <circle cx="-5" cy="-6" r="5" fill="#1E0A38" />
      <circle cx="-5" cy="-6" r="4" fill="#C084FC" className="matchPulse" />
      <circle cx="-5" cy="-6" r="2.2" fill="#2E1065" />
      <circle cx="-4" cy="-7.5" r="1.2" fill="#FFFFFF" />

      <circle cx="5" cy="-6" r="5" fill="#1E0A38" />
      <circle cx="5" cy="-6" r="4" fill="#C084FC" className="matchPulse" />
      <circle cx="5" cy="-6" r="2.2" fill="#2E1065" />
      <circle cx="6" cy="-7.5" r="1.2" fill="#FFFFFF" />

      {/* Golden Beak */}
      <polygon points="0,-3 -2,-6 2,-6" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.6" />

      {/* Small Claws clutching perch */}
      <ellipse cx="-4" cy="23" rx="3" ry="2" fill="#FDE047" />
      <ellipse cx="4" cy="23" rx="3" ry="2" fill="#FDE047" />

      {/* Tiny Hovering Open Book reading companion */}
      <g transform="translate(18 -10) scale(0.65)" className="holySparkle">
        <polygon points="-8,-5 0,-7 8,-5 6,5 0,3 -6,5" fill="#EDE9FE" stroke="#5B21B6" strokeWidth="1" />
        <line x1="0" y1="-7" x2="0" y2="3" stroke="#5B21B6" strokeWidth="0.8" />
        <circle cx="0" cy="-9" r="1.8" fill="#A855F7" />
      </g>
    </g>
  );
}

/**
 * 23. pet_mushroom — "Mushroom Sprite"
 * Cogumelo antropomórfico pousado (`petGround`), chapéu vermelho com
 * manchas brancas, corpinho de madeira, olhinhos amarelos, esporos verdes.
 */
export function PetMushroom() {
  return (
    <g>
      {/* Wooden Stalk Body */}
      <path d="M-6 4 C-8 12 -7 20 0 20 C7 20 8 12 6 4 Z" fill="#A16207" stroke="#713F12" strokeWidth="1" />
      <ellipse cx="0" cy="11" rx="4.5" ry="6" fill="#CA8A04" opacity="0.6" />

      {/* Big Red Mushroom Cap */}
      <path d="M-15 4 C-16 -12 16 -12 15 4 C10 6 -10 6 -15 4 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />

      {/* White Spots on Cap */}
      <circle cx="-6" cy="-4" r="3" fill="#FFFFFF" />
      <circle cx="6" cy="-3" r="2.6" fill="#FFFFFF" />
      <circle cx="0" cy="-8" r="2.8" fill="#FFFFFF" />
      <circle cx="-10" cy="1" r="1.8" fill="#FFFFFF" opacity="0.9" />
      <circle cx="10" cy="1" r="1.8" fill="#FFFFFF" opacity="0.9" />

      {/* Cute Little Yellow Eyes */}
      <circle cx="-3" cy="8" r="1.8" fill="#FEF08A" stroke="#713F12" strokeWidth="0.6" />
      <circle cx="-3" cy="8" r="0.9" fill="#18181B" />
      <circle cx="3" cy="8" r="1.8" fill="#FEF08A" stroke="#713F12" strokeWidth="0.6" />
      <circle cx="3" cy="8" r="0.9" fill="#18181B" />

      {/* Floating Green Spores */}
      <circle cx="-12" cy="-8" r="1.5" fill="#4ADE80" className="wingEmber" />
      <circle cx="13" cy="-12" r="1.8" fill="#86EFAC" className="wingEmber" style={{ animationDelay: "0.5s" }} />
      <circle cx="2" cy="-18" r="1.4" fill="#22C55E" className="wingEmber" style={{ animationDelay: "0.9s" }} />

      {/* Stubby Feet */}
      <ellipse cx="-4" cy="20" rx="3" ry="1.8" fill="#713F12" />
      <ellipse cx="4" cy="20" rx="3" ry="1.8" fill="#713F12" />
    </g>
  );
}
