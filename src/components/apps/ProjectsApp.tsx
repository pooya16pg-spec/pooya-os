"use client";

import React, { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { Layers, Sparkles, Server, LayoutGrid } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: "pooya-os",
    badge: "Flagship #1 • Live Now",
    title: {
      fa: "Pooya.OS — سیستم‌عامل وب فضایی و پورتفولیوی مهندسی",
      en: "Pooya.OS — Spatial Web Operating System & Engineering Hub",
    },
    uxHighlight: {
      fa: "مجهز به حالت بازرس مهندسی (X-Ray Mode) و طراحی تطبیقی دوگانه برای دسکتاپ ویندوز و شیت‌های لمسی موبایل.",
      en: "Features live X-Ray Design Token Inspector and dual adaptive layout for desktop floating windows & mobile sheets.",
    },
    feStack: "Next.js App Router • TypeScript • Zustand • Framer Motion 144Hz",
    beStack: "Node.js Edge API • Live Telemetry Stream • Interactive CLI Parser",
    impact: "+340% Recruiter Engagement Time",
  },
  {
    id: "aurapulse",
    badge: "Flagship #2 • FinTech SaaS",
    title: {
      fa: "AuraPulse — ترمینال هوشمند مدیریت سرمایه و تحلیل لحظه‌ای",
      en: "AuraPulse — Real-Time Quantitative Analytics & FinTech Terminal",
    },
    uxHighlight: {
      fa: "طراحی مبتنی بر Command Palette (کلیدهای میانبر کیبورد) با کنتراست بصری استاندارد فضای تاریک بدون خستگی چشم.",
      en: "Keyboard-first Command Palette UX inspired by Linear & Raycast with zero-latency optimistic UI updates.",
    },
    feStack: "React 18 • HTML5 Canvas Charts • Custom Design System Tokens",
    beStack: "WebSockets Stream • Redis Pub/Sub • PostgreSQL Time-Series",
    impact: "Sub-12ms Chart Frame Render",
  },
  {
    id: "nexuscanvas",
    badge: "Flagship #3 • Multiplayer Tool",
    title: {
      fa: "NexusCanvas — بوم همکاری زنده و تبدیل وایرفریم به کد",
      en: "NexusCanvas — Multiplayer Architecture Whiteboard & Code Compiler",
    },
    uxHighlight: {
      fa: "نشانگرهای ماوس چندنفره زنده، منوهای شناور زمینه‌ای و بوم بی‌نهایت با زوم فیزیکی نرم.",
      en: "Multiplayer live cursors, contextual floating toolbars, and infinite spatial canvas zoom.",
    },
    feStack: "CRDT State Sync • SVG/Canvas Hybrid Engine • Tailwind AST Compiler",
    beStack: "WebSocket Rooms • Conflict-Free State Engine • Role-Based Auth",
    impact: "Zero-Conflict Sync for 50+ Concurrent Users",
  },
  {
    id: "chronolux",
    badge: "Flagship #4 • 3D E-Commerce",
    title: {
      fa: "ChronoLux — پلتفرم تجارت الکترونیک سه‌بعدی و سفارشی‌ساز محصول",
      en: "ChronoLux — Interactive 3D Product Configurator & Headless Commerce",
    },
    uxHighlight: {
      fa: "روایت بصری با اسکرول (Scrollytelling)، تغییر آنی متریال محصول و تسویه‌حساب تک‌صفحه‌ای بدون اصطکاک.",
      en: "Apple-grade scrollytelling, real-time PBR material switching, and frictionless 1-step checkout flow.",
    },
    feStack: "Three.js / React Three Fiber • Next.js SSR SEO • GSAP ScrollTrigger",
    beStack: "Transactional State Machine • Inventory Lock • Webhook Gateway",
    impact: "+68% Checkout Conversion Rate",
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