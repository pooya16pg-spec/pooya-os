"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";
import TopStatusBar from "@/components/TopStatusBar";
import AdaptiveDock from "@/components/AdaptiveDock";
import WindowFrame from "@/components/WindowFrame";
import AboutBentoApp from "@/components/apps/AboutBentoApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TerminalApp from "@/components/apps/TerminalApp";
import ArchitectureApp from "@/components/apps/ArchitectureApp";

export default function PooyaOSDesktop() {
  const { isXRayMode, lang, openWindow } = useOSStore();

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden bg-obsidian select-none ${
        isXRayMode ? "xray-active" : ""
      }`}
    >
      {/* پس‌زمینه والپیپر فضایی یا شیدر نوری */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none transition-transform duration-700"
        style={{ backgroundImage: "url('/assets/spatial-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,0.14),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.14),transparent_50%)] pointer-events-none" />

      {/* شبکه گرید مهندسی در حالت X-Ray */}
      {isXRayMode && (
        <div className="absolute inset-0 bg-xray-grid bg-xray-size pointer-events-none z-10" />
      )}

      {/* نوار وضعیت بالا */}
      <TopStatusBar />

      {/* میانبرهای روی دسکتاپ/موبایل برای زمانی که همه پنجره‌ها بسته هستند */}
      <div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className="relative z-10 pt-16 px-4 md:px-8 flex flex-wrap gap-3"
      >
        <button
          onClick={() => openWindow("about")}
          className="px-3.5 py-2 rounded-xl bg-slate-900/65 hover:bg-slate-900/90 border border-white/10 text-xs text-slate-200 backdrop-blur-md transition-all"
        >
          {lang === "fa" ? "👤 پروفایل پویا گودرزی" : "👤 Pooya Goodarzi Profile"}
        </button>
        <button
          onClick={() => openWindow("projects")}
          className="px-3.5 py-2 rounded-xl bg-slate-900/65 hover:bg-slate-900/90 border border-white/10 text-xs text-slate-200 backdrop-blur-md transition-all"
        >
          {lang === "fa" ? "🚀 کیس‌استادی‌های فول‌استک" : "🚀 Flagship Case Studies"}
        </button>
      </div>

      {/* پنجره‌های سیستم‌عامل */}
      <WindowFrame id="about">
        <AboutBentoApp />
      </WindowFrame>

      <WindowFrame id="projects">
        <ProjectsApp />
      </WindowFrame>

      <WindowFrame id="terminal">
        <TerminalApp />
      </WindowFrame>

      <WindowFrame id="architecture">
        <ArchitectureApp />
      </WindowFrame>

      {/* داک مغناطیسی پایین */}
      <AdaptiveDock />
    </main>
  );
}