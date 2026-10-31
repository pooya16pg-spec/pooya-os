"use client";

import React, { useEffect, useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import {
  ScanEye,
  Globe,
  Activity,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

export default function TopStatusBar() {
  const {
    lang,
    isXRayMode,
    telemetry,
    toggleLanguage,
    toggleXRayMode,
    updateTelemetry,
    openWindow,
  } = useOSStore();

  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString(lang === "fa" ? "fa-IR" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  // Measure the browser's rendered frame rate locally; GitHub Pages has no server telemetry endpoint.
  useEffect(() => {
    let frameId = 0;
    let frameCount = 0;
    let lastSample = performance.now();

    const sampleFrame = (now: number) => {
      frameCount += 1;
      const elapsed = now - lastSample;
      if (elapsed >= 1000) {
        updateTelemetry({
          fps: Math.round((frameCount * 1000) / elapsed),
          frameMs: Number((elapsed / frameCount).toFixed(1)),
        });
        frameCount = 0;
        lastSample = now;
      }
      frameId = window.requestAnimationFrame(sampleFrame);
    };

    frameId = window.requestAnimationFrame(sampleFrame);
    return () => window.cancelAnimationFrame(frameId);
  }, [updateTelemetry]);

  // میانبر کیبورد Shift + X برای فعال‌سازی X-Ray Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        toggleXRayMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleXRayMode]);

  return (
    <header
      data-xray-label="TopStatusBar :: Sticky z-50"
      className="fixed top-0 inset-x-0 h-[calc(2.75rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] z-50 px-2.5 sm:px-3 md:px-6 flex items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 text-xs select-none"
    >
      {/* بخش راست/چپ اول: برندینگ هسته سیستم */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => openWindow("about")}
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="font-bold tracking-wider text-white">Pooya.OS</span>
          <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
            v4.2
          </span>
        </button>

        {/* تلمتری زنده - فقط در دسکتاپ */}
        <div
          data-xray-label="TelemetryMetrics :: Browser Frame Monitor"
          className="hidden lg:flex items-center gap-4 text-slate-400 font-mono text-[11px] px-3 py-1 rounded-lg bg-slate-900/60 border border-white/5"
        >
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{telemetry.fps} FPS</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{telemetry.frameMs}ms/frame</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Sparkles className="w-3 h-3 text-violet-400" />
            {lang === "fa"
              ? "معماری: UI/UX + Full-Stack"
              : "Role: Design + Full-Stack"}
          </span>
        </div>
      </div>

      {/* بخش کنترل‌های تعاملی کارفرما */}
      <div className="flex items-center gap-2">
        {/* دکمه طلایی X-Ray Mode */}
        <button
          onClick={toggleXRayMode}
          title="Shortcut: Shift + X"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all border ${
            isXRayMode
              ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
              : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
          }`}
        >
          <ScanEye className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === "fa" ? "حالت X-Ray" : "X-Ray Mode"}</span>
          <span className="hidden md:inline text-[10px] opacity-70 font-mono">
            [Shift+X]
          </span>
        </button>

        {/* دکمه باز کردن سریع ترمینال */}
        <button
          onClick={() => openWindow("terminal")}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all"
        >
          <TerminalSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[11px]">CLI</span>
        </button>

        {/* تغییر زبان فوری برای لینکدین (EN) و جاب‌ویژن (FA) */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 border border-violet-400/30 text-violet-200 transition-all font-mono text-[11px]"
        >
          <Globe className="w-3.5 h-3.5 text-violet-400" />
          <span>{lang === "fa" ? "EN" : "فارسی"}</span>
        </button>

        {/* ساعت زنده سیستم */}
        <div className="hidden sm:flex items-center px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/5 font-mono text-[11px] text-slate-300 min-w-[76px] justify-center">
          {clock || "14:40:00"}
        </div>
      </div>
    </header>
  );
}
