"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";

export default function ArchitectureApp() {
  const { lang, isXRayMode, toggleXRayMode } = useOSStore();

  const tokens = [
    { name: "--spatial-cyan", hex: "#00F0FF", role: "Primary Interactive & Focus" },
    { name: "--spatial-violet", hex: "#8B5CF6", role: "Design System Accents" },
    { name: "--spatial-emerald", hex: "#10B981", role: "Live Backend Telemetry" },
    { name: "--obsidian-core", hex: "#06080D", role: "Deep OLED Spatial Canvas" },
  ];

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"} className="space-y-5">
      <div className="rounded-2xl p-4 bg-slate-950/70 border border-white/10 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 border border-white/10 flex items-center justify-center shrink-0">
          <img
            src="/pooya-os/assets/architecture-core.webp"
            alt="System Architecture"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white">
            {lang === "fa"
              ? "معماری هسته Pooya.OS و دیزاین توکن‌ها"
              : "Pooya.OS Kernel & Design Token Specification"}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === "fa"
              ? "این سیستم با الگوی Atomic Design در لایه UI و معماری State-Driven در لایه فرانت‌اند و بک‌اند طراحی شده است. برای مشاهده مرز کامپوننت‌ها در لحظه، حالت X-Ray را فعال کنید."
              : "Engineered with Atomic Design tokens on the surface and a unified Zustand + Next.js Edge API kernel underneath."}
          </p>
          <button
            onClick={toggleXRayMode}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono"
          >
            {isXRayMode ? "Disable X-Ray Inspector" : "Activate X-Ray Inspector"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tokens.map((t) => (
          <div
            key={t.name}
            data-xray-label={`DesignToken[${t.name}]`}
            className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg border border-white/20 shrink-0"
              style={{ backgroundColor: t.hex }}
            />
            <div className="font-mono text-xs">
              <div className="text-white font-bold">{t.name}</div>
              <div className="text-slate-400 text-[11px]">
                {t.hex} • {t.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
