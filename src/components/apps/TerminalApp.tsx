"use client";

import React, { useState, useRef, useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";
import { Send, Terminal as TerminalIcon } from "lucide-react";

interface LogEntry {
  id: string;
  type: "input" | "output";
  lines: string[];
}

const QUICK_COMMANDS = ["help", "whoami", "stack", "status", "xray", "hire", "clear"];

export default function TerminalApp() {
  const { lang, toggleXRayMode } = useOSStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init",
      type: "output",
      lines: [
        "Pooya.OS Kernel v4.2.0-spatial — Full-Stack Interactive Shell",
        "Connected to Hybrid Edge Engine. Type 'help' or click a command chip below:",
      ],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const executeLocalKernel = (cmd: string, currentLang: "fa" | "en") => {
    switch (cmd) {
      case "help":
        return {
          action: "PRINT",
          lines:
            currentLang === "fa"
              ? [
                  "دستورات قابل اجرا در هسته Pooya.OS:",
                  "  whoami  -> نمایش بیوگرافی مهندسی پویا گودرزی",
                  "  stack   -> لیست کامل مهارت‌های UI/UX، فرانت‌اند و بک‌اند",
                  "  xray    -> فعال/غیرفعال کردن حالت بازرس مهندسی (X-Ray)",
                  "  status  -> دریافت تلمتری زنده سیستم",
                  "  hire    -> دریافت اطلاعات تماس مستقیم و گیت‌هاب",
                  "  clear   -> پاکسازی صفحه ترمینال",
                ]
              : [
                  "Available Kernel Commands in Pooya.OS:",
                  "  whoami  -> Display Pooya Goodarzi's engineering profile",
                  "  stack   -> Full breakdown of UI/UX, Frontend & Backend stack",
                  "  xray    -> Toggle live X-Ray Design Inspector mode",
                  "  status  -> Fetch real-time system telemetry",
                  "  hire    -> Direct contact endpoints & GitHub",
                  "  clear   -> Clear terminal buffer",
                ],
        };

      case "whoami":
        return {
          action: "PRINT",
          lines:
            currentLang === "fa"
              ? [
                  "● نام: پویا گودرزی (Pooya Goodarzi)",
                  "● تخصص: مهندس کامپیوتر | طراح ارشد UI/UX و توسعه‌دهنده Full-Stack",
                  "● رویکرد مهندسی: ترکیب زیبایی‌شناسی سطح اول محصول با معماری بک‌اند مقیاس‌پذیر و فرانت‌اند فوق سریع.",
                ]
              : [
                  "● Engineer: Pooya Goodarzi",
                  "● Discipline: Computer Engineer | Full-Stack Design Engineer (UI/UX + FE + BE)",
                  "● Philosophy: Bridging pixel-perfect spatial UI/UX with high-throughput backend systems.",
                ],
        };

      case "stack":
        return {
          action: "PRINT",
          lines: [
            "[UI/UX Design] :: Figma Design Systems • Interactive Prototyping • Spatial UI Tokens",
            "[Front-End]    :: Next.js App Router • React 18 • TypeScript • Tailwind • Framer Motion",
            "[Back-End]     :: Node.js • REST & WebSockets • PostgreSQL & Prisma • Redis Caching",
          ],
        };

      case "status":
        return {
          action: "PRINT",
          lines: [
            "✔ Edge Kernel       : ONLINE (GitHub Pages CDN + Hybrid Runtime)",
            "✔ State Engine      : ZUSTAND Reactive Store Ready",
            "✔ Render Target     : 144Hz High-Refresh Spatial UI",
            `✔ System Timestamp  : ${new Date().toLocaleTimeString()}`,
          ],
        };

      case "xray":
        return {
          action: "TOGGLE_XRAY",
          lines:
            currentLang === "fa"
              ? ["✔ حالت بازرس مهندسی (X-Ray Mode) تغییر وضعیت داد."]
              : ["✔ X-Ray Engineering Inspector mode toggled."],
        };

      case "hire":
        return {
          action: "PRINT",
          lines:
            currentLang === "fa"
              ? [
                  "🚀 آماده همکاری در پروژه‌های سطح اول (تمام‌وقت / پروژه‌ای / بین‌المللی):",
                  "  • GitHub   : https://github.com/pooya16pg-spec",
                  "  • Live OS  : https://pooya16pg-spec.github.io/pooya-os/",
                ]
              : [
                  "🚀 Open for Flagship Engineering & Product Design Roles:",
                  "  • GitHub   : https://github.com/pooya16pg-spec",
                  "  • Live OS  : https://pooya16pg-spec.github.io/pooya-os/",
                ],
        };

      default:
        return {
          action: "PRINT",
          lines:
            currentLang === "fa"
              ? [`دستور '${cmd}' شناخته نشد. عبارت 'help' را تایپ کنید.`]
              : [`Command '${cmd}' not recognized. Type 'help' for available commands.`],
        };
    }
  };

  const runCommand = async (cmdText: string) => {
    const clean = cmdText.trim().toLowerCase();
    if (!clean) return;

    if (clean === "clear") {
      setLogs([]);
      setInput("");
      return;
    }

    setLogs((prev) => [
      ...prev,
      { id: `${Date.now()}-in`, type: "input", lines: [`pooya@kernel:~$ ${clean}`] },
    ]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const result = executeLocalKernel(clean, lang);
      if (result.action === "TOGGLE_XRAY") {
        toggleXRayMode();
      }
      setLogs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-out`,
          type: "output",
          lines: result.lines,
        },
      ]);
      setLoading(false);
    }, 180);
  };

  return (
    <div
      dir="ltr"
      data-xray-label="TerminalCLI :: Hybrid Edge Shell"
      className="flex flex-col h-full min-h-[340px] bg-slate-950/90 rounded-xl border border-white/10 p-3.5 font-mono text-xs"
    >
      <div className="flex items-center gap-1.5 flex-wrap pb-3 mb-3 border-b border-white/10">
        <span className="text-[10px] text-slate-400 mr-1 flex items-center gap-1">
          <TerminalIcon className="w-3 h-3 text-emerald-400" />
          Quick Run:
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => runCommand(cmd)}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 text-emerald-300 transition-colors text-[11px]"
          >
            {cmd}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {logs.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.lines.map((line, i) => (
              <p
                key={i}
                dir="auto"
                className={
                  entry.type === "input"
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-300 leading-relaxed"
                }
              >
                {line}
              </p>
            ))}
          </div>
        ))}
        {loading && (
          <p className="text-emerald-400 animate-pulse">
            Executing on Pooya.OS Kernel...
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
        }}
        className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-bold shrink-0">
          pooya@kernel:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g., whoami, stack, status)..."
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}