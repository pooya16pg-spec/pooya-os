"use client";

import React from "react";
import { useOSStore, AppID } from "@/store/useOSStore";
import { Cpu, Layers, Terminal, Network, ScanEye } from "lucide-react";

const DOCK_ITEMS: {
  id: AppID;
  label: { fa: string; en: string };
  icon: React.ElementType;
  accent: string;
}[] = [
  {
    id: "about",
    label: { fa: "پروفایل مهندسی", en: "Engineer Profile" },
    icon: Cpu,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    id: "projects",
    label: { fa: "کیس‌استادی‌ها", en: "Case Studies" },
    icon: Layers,
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "terminal",
    label: { fa: "ترمینال بک‌اند", en: "Backend CLI" },
    icon: Terminal,
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "architecture",
    label: { fa: "معماری و UI/UX", en: "System & UI/UX" },
    icon: Network,
    accent: "from-amber-400 to-orange-500",
  },
];

export default function AdaptiveDock() {
  const {
    lang,
    windows,
    activeApp,
    isXRayMode,
    openWindow,
    toggleXRayMode,
  } = useOSStore();

  return (
    <nav
      data-xray-label="AdaptiveDock :: Floating Spatial Bar"
      className="fixed bottom-[calc(0.5rem+env(safe-area-inset-bottom))] inset-x-0 z-50 flex justify-center px-2 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-full overflow-x-auto flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.75)]">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isOpen = windows[item.id].isOpen && !windows[item.id].isMinimized;
          const isFocused = activeApp === item.id && isOpen;

          return (
            <button
              key={item.id}
              onClick={() => openWindow(item.id)}
              aria-label={item.label[lang]} className="group relative flex flex-col items-center shrink-0 min-w-11 min-h-11 justify-center"
            >
              {/* تولتیپ عنوان در دسکتاپ */}
              <span className="hidden md:block absolute -top-9 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-white/10 text-[11px] text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {item.label[lang]}
              </span>

              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isFocused
                    ? `bg-gradient-to-br ${item.accent} text-slate-950 scale-105 shadow-lg`
                    : "bg-white/5 hover:bg-white/15 text-slate-200 hover:scale-105 border border-white/10"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* نقطه نشانگر باز بودن برنامه */}
              <span
                className={`mt-1 h-1 rounded-full transition-all ${
                  isFocused
                    ? "w-4 bg-cyan-400"
                    : isOpen
                    ? "w-1.5 bg-slate-400"
                    : "w-0 bg-transparent"
                }`}
              />
            </button>
          );
        })}

        {/* جداکننده */}
        <div className="h-8 w-[1px] bg-white/10 mx-1" />

        {/* دکمه دسترسی سریع شست به X-Ray در موبایل و دسکتاپ */}
        <button
          onClick={toggleXRayMode}
          aria-label={lang === "fa" ? "حالت X-Ray" : "X-Ray mode"}
          className="group relative flex flex-col items-center shrink-0 min-w-11 min-h-11 justify-center"
        >
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all border ${
              isXRayMode
                ? "bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                : "bg-white/5 hover:bg-white/15 border-white/10 text-slate-300"
            }`}
          >
            <ScanEye className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          </div>
          <span className="mt-1 text-[9px] font-mono text-cyan-400">X-RAY</span>
        </button>
      </div>
    </nav>
  );
}
