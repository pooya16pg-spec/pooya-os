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
        "Connected to /api/system backend endpoint. Type 'help' or click a command chip below:",
      ],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

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

    try {
      const res = await fetch("/api/system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: clean, lang }),
      });
      const data = await res.json();

      if (data.action === "TOGGLE_XRAY") {
        toggleXRayMode();
      }

      setLogs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-out`,
          type: "output",
          lines: data.lines || ["Executed successfully."],
        },
      ]);
    } catch {
      setLogs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          type: "output",
          lines: ["Error communicating with backend API route."],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="ltr"
      data-xray-label="TerminalCLI :: Connected to POST /api/system"
      className="flex flex-col h-full min-h-[340px] bg-slate-950/90 rounded-xl border border-white/10 p-3.5 font-mono text-xs"
    >
      {/* دکمه‌های دستور سریع برای تجربه عالی در موبایل و دسکتاپ */}
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

      {/* خروجی دستورات */}
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
            Executing on Next.js Server Runtime...
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ورودی متن */}
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