import React from "react";

export function BottomNav({
  tab,
  setTab,
  shards = 0,
  seasonLevel = 1,
  unclaimedCount = 0,
  hasUnclaimedPass = false,
  friends = [],
  setShowFriends,
  setShowAdminModal,
  toggleLang,
  lang = "pt",
}) {
  const isPassAlert = unclaimedCount > 0 || hasUnclaimedPass;

  const navItems = [
    {
      id: "shop",
      label: lang === "pt" ? "Loja" : "Shop",
      icon: "✦",
      color: "#FBBF24",
      hasNotice: shards >= 50,
      action: () => setTab("shop"),
    },
    {
      id: "skills",
      label: lang === "pt" ? "Cartas" : "Cards",
      icon: "📖",
      color: "#E8B44F",
      action: () => setTab("skills"),
    },
    {
      id: "battle",
      label: lang === "pt" ? "Batalha" : "Battle",
      icon: "⚔️",
      color: "#F59E0B",
      isMain: true,
      action: () => setTab(null),
    },
    {
      id: "social",
      label: lang === "pt" ? "Social" : "Social",
      icon: "👥",
      color: "#38BDF8",
      badgeCount: friends.length,
      action: () => setShowFriends && setShowFriends(true),
    },
    {
      id: "pass",
      label: lang === "pt" ? "Passe" : "Pass",
      icon: "🎫",
      color: "#F43F5E",
      hasNotice: isPassAlert,
      action: () => setTab("pass"),
    },
  ];

  return (
    <>
      {/* ================= MOBILE BOTTOM NAV (< 1024px) ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bottom-nav-bar flex items-center justify-around px-2 py-1.5 bottom-safe-padding lg:hidden select-none">
        {navItems.map((item) => {
          const isActive = (item.id === "battle" && tab === null) || tab === item.id;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`bottom-nav-item flex flex-col items-center justify-center py-1 px-2 rounded-xl flex-1 max-w-[72px] relative group transition-all duration-150 ${
                item.isMain
                  ? "scale-110 -translate-y-1 bg-gradient-to-b from-amber-500/25 to-amber-900/50 border border-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.5)]"
                  : isActive
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5"
              }`}
              title={item.label}
            >
              {item.hasNotice && (
                <span className="absolute top-0.5 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#F43F5E]"></span>
                </span>
              )}
              {item.badgeCount > 0 && (
                <span className="absolute top-0.5 right-1.5 px-1 py-0.2 rounded-full text-[8px] font-bold bg-sky-500 text-white shadow-sm">
                  {item.badgeCount}
                </span>
              )}
              <span
                className={`text-xl sm:text-2xl drop-shadow-[0_0_10px_currentColor] transition-transform duration-150 group-hover:scale-110 group-active:scale-90 ${
                  item.isMain ? "scale-115 text-amber-300" : ""
                }`}
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-sans font-black leading-tight mt-0.5 tracking-tight truncate ${
                  item.isMain ? "text-amber-200" : isActive ? "text-white" : "text-zinc-300"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ================= DESKTOP FIXED SIDEBAR (>= 1024px) ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-24 flex-col items-center justify-between py-6 z-40 desktop-sidebar select-none">
        {/* Top Arcane Crest */}
        <div
          onClick={() => setTab(null)}
          className="flex flex-col items-center gap-1 cursor-pointer group"
          title="Mage Duel - Início"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-[14px] bg-[#0E0A24] flex items-center justify-center text-2xl">
              🔮
            </div>
          </div>
          <span className="font-serif text-[11px] font-black text-amber-200 tracking-wider">MAGE DUEL</span>
        </div>

        {/* Center Nav Stack (5 items) */}
        <div className="flex flex-col items-center gap-3.5 w-full px-2">
          {navItems.map((item) => {
            const isActive = (item.id === "battle" && tab === null) || tab === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? "bg-gradient-to-b from-amber-500/25 to-indigo-900/60 border-2 border-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.45)] scale-105"
                    : "hover:bg-white/10 border border-transparent hover:border-white/20 hover:scale-105"
                }`}
                title={item.label}
              >
                {item.hasNotice && (
                  <span className="absolute top-1 right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-[0_0_8px_#F43F5E]"></span>
                  </span>
                )}
                {item.badgeCount > 0 && (
                  <span className="absolute top-1 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-sky-500 text-white shadow">
                    {item.badgeCount}
                  </span>
                )}
                <span
                  className="text-2xl drop-shadow-[0_0_12px_currentColor] transition-transform duration-200 group-hover:scale-115"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[10px] font-sans font-black mt-1 leading-none uppercase tracking-wider ${
                    isActive ? "text-amber-200" : "text-zinc-400 group-hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Dock: Lang & Settings */}
        <div className="flex flex-col items-center gap-2">
          {toggleLang && (
            <button
              onClick={toggleLang}
              title={lang === "pt" ? "Mudar Idioma" : "Switch Language"}
              className="w-10 h-10 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/30 hover:border-amber-400/60 text-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow"
            >
              {lang === "pt" ? "🇧🇷" : "🇺🇸"}
            </button>
          )}
          {setShowAdminModal && (
            <button
              onClick={() => setShowAdminModal(true)}
              title={lang === "pt" ? "Configurações" : "Settings"}
              className="w-10 h-10 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/30 hover:border-amber-400/60 text-lg flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow"
            >
              ⚙️
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default BottomNav;
