"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";
import {
  PanelsTopLeft,
  Code2,
  Database,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function AboutBentoApp() {
  const { lang, openWindow } = useOSStore();

  const pillars = [
    {
      tag: "UI / UX & Product Design",
      icon: PanelsTopLeft,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      title:
        lang === "fa"
          ? "طراحی رابط و تجربه کاربری (Design Systems)"
          : "Spatial UI/UX & Design Systems",
      desc:
        lang === "fa"
          ? "طراحی وایرفریم، دیزاین توکن‌های مقیاس‌پذیر در Figma، میکرو-اینتراکشن‌های ۶۰/۱۴۴ هرتز و معماری اطلاعات کاربرمحور."
          : "Design systems, interaction flows, Figma Auto Layout, and accessible product interfaces grounded in real user tasks.",
      metrics: ["Figma Auto Layout", "Design Tokens", "Interactive Prototypes"],
    },
    {
      tag: "Modern Front-End Engineering",
      icon: Code2,
      color: "text-violet-400",
      border: "border-violet-500/30",
      title:
        lang === "fa"
          ? "مهندسی فرانت‌اند نسل جدید"
          : "High-Frequency Front-End Architecture",
      desc:
        lang === "fa"
          ? "پیاده‌سازی رابط‌های واکنش‌گرا با React 19، Next.js 16، TypeScript، Tailwind CSS و گرافیک SVG/Canvas."
          : "Responsive interfaces with Next.js 16, React 19, TypeScript, Zustand, Tailwind CSS, and browser-native graphics.",
      metrics: ["Next.js 16 + React 19", "TypeScript", "Responsive UI"],
    },
    {
      tag: "Scalable Back-End & APIs",
      icon: Database,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      title:
        lang === "fa"
          ? "معماری بک‌اند و پایگاه داده"
          : "Resilient Back-End & Real-Time Core",
      desc:
        lang === "fa"
          ? "شناخت مرزهای کلاینت و سرور، طراحی قرارداد API، مدل‌سازی داده و انتخاب الگوی مناسب برای ارتباط و ذخیره‌سازی."
          : "Understanding API contracts, data modeling, caching, and real-time communication patterns—without presenting unimplemented services as live infrastructure.",
      metrics: ["API Design", "Data Modeling", "Client / Server Boundaries"],
    },
  ];

  return (
    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="space-y-5 text-slate-200"
    >
      {/* کارت هیرو Bento */}
      <div
        data-xray-label="HeroBentoCard :: GridSpan-12"
        className="relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-white/10 flex flex-col md:flex-row items-center gap-5"
      >
        {/* تصویر آواتار یا شیدر جایگزین */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] shrink-0 bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-emerald-500/20 flex items-center justify-center">
          <img
            src="/pooya-os/assets/pooya.webp"
            alt="Pooya Goodarzi"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="flex-1 text-center md:text-start space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === "fa"
                ? "آماده همکاری در پروژه‌های شاخص (Full-Stack & UI/UX)"
                : "Available for Flagship Product & Engineering Roles"}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white">
            {lang === "fa"
              ? "پویا گودرزی — دانشجوی مهندسی کامپیوتر"
              : "Pooya Goodarzi — Computer Engineering Student"}
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === "fa"
              ? "من روی تبدیل ایده به محصول وب قابل استفاده تمرکز می‌کنم: از طراحی تجربه و سیستم بصری تا پیاده‌سازی رابط، مدیریت وضعیت و بررسی محدودیت‌های واقعی استقرار."
              : "I enjoy turning product ideas into usable web experiences, connecting visual systems, interface engineering, state management, and honest deployment constraints."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <button
              onClick={() => openWindow("projects")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-all shadow-lg"
            >
              <span>
                {lang === "fa"
                  ? "مشاهده کیس‌استادی‌ها و پروژه‌ها"
                  : "Explore Full-Stack Case Studies"}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openWindow("terminal")}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono transition-all"
            >
              {lang === "fa" ? "اجرای ترمینال محلی" : "Launch Local CLI"}
            </button>
          </div>
        </div>
      </div>

      {/* سه ستون تخصصی (UI/UX + FE + BE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              data-xray-label={`SkillPillar[${idx}] :: FlexCol`}
              className={`rounded-2xl p-4 bg-slate-950/60 border ${pillar.border} flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    {pillar.tag}
                  </span>
                  <Icon className={`w-5 h-5 ${pillar.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1.5">
                {pillar.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[11px] text-slate-300 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
