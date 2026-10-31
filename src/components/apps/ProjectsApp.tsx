"use client";

import React, { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import {
  Blocks,
  Code2,
  ExternalLink,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const PROJECTS_DATA = [
  {
    id: "pooya-os",
    index: "01",
    badge: "INTERACTIVE WEB DESKTOP",
    title: { fa: "Pooya.OS", en: "Pooya.OS" },
    subtitle: {
      fa: "یک پورتفولیوی مهندسی با تجربهٔ یک دسکتاپ واقعی",
      en: "An engineering portfolio presented as a spatial desktop",
    },
    challenge: {
      fa: "چطور می‌توان یک پورتفولیو را از صفحه‌ای ثابت به محیطی قابل کشف و تعاملی تبدیل کرد؟",
      en: "How can a portfolio feel like a discoverable, interactive workspace instead of a static page?",
    },
    approach: {
      fa: "مدیریت پنجره‌ها، داک تطبیقی، ترمینال محلی، حالت X-Ray و ناوبری مبتنی بر Zustand در یک خروجی کاملاً استاتیک.",
      en: "A window manager, adaptive dock, local CLI, X-Ray inspector, and Zustand-driven navigation in a fully static build.",
    },
    proof: {
      fa: "پنجره‌ها را جابه‌جا و کوچک کن، X-Ray را روشن کن و دستورهای help، stack و status را در ترمینال اجرا کن.",
      en: "Move and minimize windows, enable X-Ray, and run help, stack, or status in the local terminal.",
    },
    stack: "Next.js 16 • React 19 • TypeScript • Zustand • Tailwind CSS",
    boundary: {
      fa: "ترمینال در مرورگر اجرا می‌شود؛ این نسخه به Shell یا API سمت سرور متصل نیست.",
      en: "The terminal is browser-local; this static deployment has no server shell or API runtime.",
    },
    live: "https://pooya16pg-spec.github.io/pooya-os/",
    source: "https://github.com/pooya16pg-spec/pooya-os",
    accent: "from-cyan-400/20 via-blue-500/10 to-violet-500/20",
  },
  {
    id: "aurapulse",
    index: "02",
    badge: "MARKET DATA & PAPER TRADING",
    title: { fa: "AuraPulse", en: "AuraPulse" },
    subtitle: {
      fa: "ترمینال بازار با مرزبندی روشن بین داده و شبیه‌سازی",
      en: "A market terminal with a clear boundary between data and simulation",
    },
    challenge: {
      fa: "چطور یک تجربهٔ معاملاتی قابل لمس بسازیم، بدون اینکه دادهٔ نمونه با قیمت واقعی یا سفارش واقعی اشتباه شود؟",
      en: "How do you make a trading interface tangible without confusing sample data with live quotes or real orders?",
    },
    approach: {
      fa: "دریافت فقط‌خواندنی قیمت عمومی BTC، ETH و SOL از بایننس، نمودار SVG و موتور معاملات آزمایشی محلی.",
      en: "Read-only public BTC, ETH, and SOL tickers, an SVG chart, and a local paper-trading engine.",
    },
    proof: {
      fa: "اتصال بازار را بررسی کن، نمادها و بازهٔ زمانی نمودار را تغییر بده و سفارش آزمایشی ثبت کن.",
      en: "Check the market-feed state, switch symbols and chart intervals, then place a paper order.",
    },
    stack: "Next.js 16 • React 19 • TypeScript • SVG • Local paper-trading state",
    boundary: {
      fa: "هیچ سفارش بورسی ارسال نمی‌شود؛ دفتر سفارش، سابقهٔ اولیه و شاخص‌های AI نمایشی هستند.",
      en: "No exchange orders are sent; the order book, seeded history, and AI-style indicators are illustrative.",
    },
    live: "https://pooya16pg-spec.github.io/aurapulse/",
    source: "https://github.com/pooya16pg-spec/aurapulse",
    accent: "from-emerald-400/20 via-cyan-500/10 to-teal-500/20",
  },
  {
    id: "nexuscanvas",
    index: "03",
    badge: "SYSTEM ARCHITECTURE STUDIO",
    title: { fa: "NexusCanvas", en: "NexusCanvas" },
    subtitle: {
      fa: "تبدیل ایدهٔ معماری به گراف قابل تحلیل و خروجی",
      en: "Turn an architecture idea into an inspectable graph and export",
    },
    challenge: {
      fa: "چطور وابستگی سرویس‌ها، نقاط شکست و مسیرهای بحرانی را پیش از استقرار قابل مشاهده کنیم؟",
      en: "How can service dependencies, failure points, and critical paths become visible before deployment?",
    },
    approach: {
      fa: "ویرایشگر گراف، تحلیل توپولوژی، شبیه‌سازی بار، همگام‌سازی بین تب‌ها و تولید قالب شروع Docker Compose.",
      en: "A graph editor, topology analysis, local load simulation, same-origin tab sync, and a Docker Compose starter export.",
    },
    proof: {
      fa: "یک قالب را بارگذاری کن، نود اضافه کن، اتصال بساز و سپس خطاهای گراف را در بازرس مشاهده کن.",
      en: "Load a template, add nodes, create dependencies, and inspect graph warnings in the topology panel.",
    },
    stack: "Next.js 16 • React 19 • TypeScript • SVG • BroadcastChannel",
    boundary: {
      fa: "اعداد CPU و Throughput ورودی‌های نمونه‌اند؛ همگام‌سازی فقط بین تب‌های همان مرورگر انجام می‌شود.",
      en: "CPU and throughput values are illustrative inputs; synchronization is limited to tabs in the same browser.",
    },
    live: "https://pooya16pg-spec.github.io/nexus-canvas/",
    source: "https://github.com/pooya16pg-spec/nexus-canvas",
    accent: "from-sky-400/20 via-indigo-500/10 to-emerald-500/20",
  },
  {
    id: "lumina-glass",
    index: "04",
    badge: "OPTICAL & AUDIO LAB",
    title: { fa: "LuminaGlass", en: "LuminaGlass" },
    subtitle: {
      fa: "آزمایشگاه تعاملی اپتیک و پردازش سیگنال در مرورگر",
      en: "An interactive browser lab for optics and signal processing",
    },
    challenge: {
      fa: "چطور می‌توان کنترل‌های بصری و صوتی را به تجربه‌ای قابل آزمایش و قابل ذخیره تبدیل کرد؟",
      en: "How can optical and audio controls become an experience that can be explored and reproduced?",
    },
    approach: {
      fa: "هندسهٔ SVG قابل تنظیم، خروجی PNG، اکولایزر پنج‌باند Web Audio و برد کاری محلی.",
      en: "Adjustable SVG geometry, PNG export, a five-band Web Audio EQ, and a local workflow board.",
    },
    proof: {
      fa: "پارامترهای اپتیکی را تغییر بده، خروجی PNG بگیر و اکولایزر را با سینت‌سایزر یا فایل شخصی آزمایش کن.",
      en: "Tune optical parameters, export a PNG, and test the EQ with the synth or your own audio file.",
    },
    stack: "Next.js 16 • React 19 • TypeScript • SVG/Canvas • Web Audio API",
    boundary: {
      fa: "ورودی صوتی در خود مرورگر پردازش می‌شود؛ بخش اپتیک مولد تصویر هوش مصنوعی نیست.",
      en: "Audio is processed in the browser; the optical studio is not an AI image-generation service.",
    },
    live: "https://pooya16pg-spec.github.io/lumina-glass/",
    source: "https://github.com/pooya16pg-spec/lumina-glass",
    accent: "from-fuchsia-400/20 via-indigo-500/10 to-cyan-400/20",
  },
];

const COPY = {
  fa: {
    eyebrow: "SELECTED WORK • 2026",
    heading: "چهار محصول، چهار مسئلهٔ مهندسی",
    intro: "به‌جای فهرست‌کردن ابزارها، هر پروژه یک مسئله، یک تصمیم معماری و یک مسیر آزمایش‌پذیر را نشان می‌دهد.",
    challenge: "مسئله",
    approach: "رویکرد مهندسی",
    proof: "چه چیزی را امتحان کنی؟",
    stack: "پشتهٔ فنی",
    boundary: "مرز قابلیت‌ها",
    live: "اجرای پروژه",
    source: "مشاهدهٔ کد",
    workflow: "روش کار",
    workflowText: "کشف مسئله → مدل‌سازی تجربه و داده → پیاده‌سازی → اعتبارسنجی → انتشار",
    principles: ["قابلیت واقعی، نه ادعای نمایشی", "طراحی واکنش‌گرا و قابل استفاده", "کد قابل نگهداری و قابل بررسی"],
  },
  en: {
    eyebrow: "SELECTED WORK • 2026",
    heading: "Four products. Four engineering problems.",
    intro: "Each project tells a story through a concrete problem, an architectural decision, and something you can actually try.",
    challenge: "The challenge",
    approach: "Engineering approach",
    proof: "Try this",
    stack: "Technology",
    boundary: "Capability boundary",
    live: "Launch project",
    source: "Explore source",
    workflow: "How I work",
    workflowText: "Discover → Model the experience and data → Build → Validate → Ship",
    principles: ["Real functionality over inflated claims", "Responsive, usable interfaces", "Maintainable and inspectable code"],
  },
};

export default function ProjectsApp() {
  const { lang } = useOSStore();
  const [selectedId, setSelectedId] = useState<string>("pooya-os");
  const activeProject = PROJECTS_DATA.find((project) => project.id === selectedId) || PROJECTS_DATA[0];
  const copy = COPY[lang];

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"} className="space-y-5 text-slate-200">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950/85 to-cyan-950/25 p-5 md:p-6 space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-300">{copy.eyebrow}</span>
        <h2 className="text-xl md:text-2xl font-black text-white">{copy.heading}</h2>
        <p className="max-w-3xl text-xs md:text-sm text-slate-400 leading-relaxed">{copy.intro}</p>
      </section>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {PROJECTS_DATA.map((project) => {
          const active = project.id === selectedId;
          return (
            <button
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              aria-pressed={active}
              className={`min-w-0 rounded-xl border p-3 text-start transition-all ${active ? "border-cyan-300/60 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.1)]" : "border-white/10 bg-slate-900/60 hover:bg-slate-800/80"}`}
            >
              <span className="font-mono text-[10px] text-cyan-300">{project.index}</span>
              <span className="mt-1 block text-xs font-bold text-white">{project.title[lang]}</span>
              <span className="mt-1 block text-[10px] text-slate-500 truncate">{project.badge}</span>
            </button>
          );
        })}
      </div>

      <article className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${activeProject.accent} p-5 md:p-6 space-y-5`}>
        <div className="absolute inset-0 bg-slate-950/55 pointer-events-none" />
        <div className="relative space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-white/10 pb-4">
            <div className="min-w-0">
              <span className="font-mono text-[10px] tracking-wider text-cyan-300">{activeProject.index} / {activeProject.badge}</span>
              <h3 className="mt-1 text-2xl md:text-3xl font-black text-white">{activeProject.title[lang]}</h3>
              <p className="mt-1 text-sm text-slate-300">{activeProject.subtitle[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href={activeProject.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-200">
                <ExternalLink className="h-3.5 w-3.5" />{copy.live}
              </a>
              <a href={activeProject.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white hover:bg-white/10">
                <Code2 className="h-3.5 w-3.5" />{copy.source}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: copy.challenge, body: activeProject.challenge[lang], icon: Sparkles, tone: "text-amber-300" },
              { title: copy.approach, body: activeProject.approach[lang], icon: Workflow, tone: "text-cyan-300" },
              { title: copy.proof, body: activeProject.proof[lang], icon: ShieldCheck, tone: "text-emerald-300" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-white/10 bg-slate-950/70 p-4 space-y-2">
                  <div className={`flex items-center gap-2 text-xs font-bold ${item.tone}`}>
                    <Icon className="h-4 w-4" />{item.title}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-3">
            <div className="rounded-xl border border-white/10 bg-slate-950/65 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-300"><Code2 className="h-4 w-4" />{copy.stack}</div>
              <p className="font-mono text-[11px] leading-relaxed text-slate-300">{activeProject.stack}</p>
            </div>
            <div className="rounded-xl border border-amber-300/20 bg-amber-400/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-200"><Server className="h-4 w-4" />{copy.boundary}</div>
              <p className="text-xs leading-relaxed text-slate-300">{activeProject.boundary[lang]}</p>
            </div>
          </div>
        </div>
      </article>

      <section className="rounded-2xl border border-white/10 bg-slate-950/75 p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white"><Blocks className="h-4 w-4 text-cyan-300" />{copy.workflow}</div>
        <p className="text-xs text-slate-300">{copy.workflowText}</p>
        <div className="flex flex-wrap gap-2">
          {copy.principles.map((principle) => (
            <span key={principle} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-300">{principle}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
