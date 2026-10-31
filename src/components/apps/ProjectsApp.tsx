"use client";

import React, { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { Layers, Sparkles, Server, LayoutGrid } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: "pooya-os",
    badge: "Flagship #1 • Static WebOS",
    title: {
      fa: "Pooya.OS — دسکتاپ وب تعاملی و هاب مهندسی",
      en: "Pooya.OS — Interactive Web Desktop & Engineering Hub",
    },
    uxHighlight: {
      fa: "پنجره‌های قابل جابه‌جایی، داک واکنش‌گرا، تغییر زبان، حالت X-Ray و ترمینال محلی مرورگر.",
      en: "Draggable desktop windows, responsive dock, language toggle, X-Ray mode, and a local browser CLI.",
    },
    feStack: "Next.js 14 Static Export • React 18 • TypeScript • Zustand • Tailwind CSS",
    beStack: "No backend runtime; deployed as a static GitHub Pages site",
    impact: "Client-side interactive portfolio",
  },
  {
    id: "aurapulse",
    badge: "Flagship #2 • Paper Trading",
    title: {
      fa: "AuraPulse — ترمینال تحلیل بازار و معاملات آزمایشی",
      en: "AuraPulse — Market Dashboard & Paper Trading Simulator",
    },
    uxHighlight: {
      fa: "چارت کندلی SVG، دفتر سفارشات شبیه‌سازی‌شده، ثبت سفارش محلی و نمایش قیمت‌های عمومی بایننس در صورت دسترسی شبکه.",
      en: "SVG charts, a simulated order book, local paper orders, and public Binance prices when the feed is reachable.",
    },
    feStack: "Next.js Static Export • React • TypeScript • Custom SVG Charting",
    beStack: "Client-side paper-trading state; no exchange order execution or private API",
    impact: "Local demo account — no real funds or orders",
  },
  {
    id: "nexuscanvas",
    badge: "Flagship #3 • Architecture Studio",
    title: {
      fa: "NexusCanvas — ویرایشگر گراف معماری سیستم",
      en: "NexusCanvas — System Architecture Graph Editor",
    },
    uxHighlight: {
      fa: "ساخت و ویرایش نودها، اتصال سرویس‌ها، تحلیل توپولوژی، شبیه‌سازی بار و همگام‌سازی تب‌های همان مرورگر.",
      en: "Create nodes, connect services, inspect topology, simulate load, and sync tabs in the same browser.",
    },
    feStack: "Next.js Static Export • React • TypeScript • SVG Graph Canvas",
    beStack: "Local graph state and BroadcastChannel tab sync; no remote multiplayer backend",
    impact: "Interactive architecture and Compose export prototype",
  },
  {
    id: "lumina-glass",
    badge: "Flagship #4 • Optical & Audio Lab",
    title: {
      fa: "LuminaGlass — آزمایشگاه Liquid Glass و پردازش صدا",
      en: "LuminaGlass — Liquid Glass & Web Audio Lab",
    },
    uxHighlight: {
      fa: "اتمسفرهای بصری، کنترل‌های اپتیکی و اکولایزر پنج‌باند برای صدای تولیدی، فایل صوتی یا میکروفون.",
      en: "Visual themes, optical controls, and a five-band equalizer for generated, uploaded, or microphone audio.",
    },
    feStack: "Next.js Static Export • React • TypeScript • SVG/Canvas • Web Audio API",
    beStack: "Browser-native audio processing; no server-side AI or commerce backend",
    impact: "Interactive browser-based visual and audio experiments",
  },
];

export default function ProjectsApp() {
  const { lang } = useOSStore();
  const [selectedId, setSelectedId] = useState<string>("pooya-os");

  const activeProject =
    PROJECTS_DATA.find((p) => p.id === selectedId) || PROJECTS_DATA[0];

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"} className="space-y-5">
      {/* نوار انتخاب پروژه */}
      <div
        data-xray-label="ProjectSelectorTabs :: HorizontalScroll"
        className="flex items-center gap-2 overflow-x-auto pb-2"
      >
        {PROJECTS_DATA.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                active
                  ? "bg-violet-500/25 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400"
              }`}
            >
              {item.badge}
            </button>
          );
        })}
      </div>

      {/* جزئیات کیس‌استادی انتخاب‌شده */}
      <div
        data-xray-label={`CaseStudyCard[${activeProject.id}]`}
        className="rounded-2xl p-5 bg-slate-950/75 border border-white/10 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[11px] text-violet-400">
              {activeProject.badge}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              {activeProject.title[lang]}
            </h2>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-mono text-xs">
            {activeProject.impact}
          </span>
        </div>

        {/* تفکیک مهندسی سه لایه */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{lang === "fa" ? "نوآوری UI/UX" : "UI/UX Innovation"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProject.uxHighlight[lang]}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-violet-500/20 space-y-2">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold">
              <LayoutGrid className="w-4 h-4" />
              <span>
                {lang === "fa" ? "تکنولوژی فرانت‌اند" : "Front-End Stack"}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {activeProject.feStack}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Server className="w-4 h-4" />
              <span>
                {lang === "fa" ? "معماری بک‌اند" : "Back-End Architecture"}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {activeProject.beStack}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
