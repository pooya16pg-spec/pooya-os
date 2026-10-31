"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore, AppID } from "@/store/useOSStore";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface WindowFrameProps {
  id: AppID;
  children: React.ReactNode;
}

export default function WindowFrame({ id, children }: WindowFrameProps) {
  const {
    lang,
    windows,
    activeApp,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
  } = useOSStore();

  const win = windows[id];
  const isFocused = activeApp === id;
  const [isCompactViewport, setIsCompactViewport] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsCompactViewport(media.matches);
    sync();
    if (media.addEventListener) media.addEventListener("change", sync);
    else media.addListener(sync);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", sync);
      else media.removeListener(sync);
    };
  }, []);

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <AnimatePresence>
      <motion.section
        key={id}
        data-xray-label={`WindowFrame[${id}] :: z-${win.zIndex}`}
        onPointerDown={() => focusWindow(id)}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        drag={!win.isMaximized && !isCompactViewport}
        dragMomentum={false}
        style={{
          zIndex: win.zIndex,
        }}
        className={`fixed flex flex-col overflow-hidden transition-shadow duration-200 ${
          win.isMaximized
            ? "inset-x-0 top-[calc(2.75rem+env(safe-area-inset-top))] bottom-[calc(5.25rem+env(safe-area-inset-bottom))] rounded-none md:top-11 md:bottom-20"
            : "inset-x-2 top-[calc(3.5rem+env(safe-area-inset-top))] bottom-[calc(5.25rem+env(safe-area-inset-bottom))] rounded-2xl md:inset-auto md:top-16 md:left-12 lg:left-24 md:w-[min(760px,calc(100vw-6rem))] md:h-[min(520px,calc(100dvh-7rem))]"
        } ${
          isFocused
            ? "bg-slate-900/85 border border-cyan-400/35 shadow-[0_25px_70px_-15px_rgba(0,240,255,0.22)]"
            : "bg-slate-900/70 border border-white/10 shadow-2xl"
        } backdrop-blur-2xl`}
      >
        {/* نوار دستگیره موبایل (Swipe Handle) */}
        <div className="w-full flex justify-center pt-2 pb-0.5 md:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* هدر پنجره */}
        <div
          data-xray-label="WindowHeader :: DragHandle"
          className="flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 min-h-12 bg-slate-950/60 border-b border-white/10 cursor-default md:cursor-grab md:active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            {/* دکمه‌های کنترلی استاندارد سیستم‌عامل */}
            <div className="window-chrome-controls flex items-center gap-1.5 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                aria-label="Close"
                className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center text-slate-950 transition-colors"
              >
                <X className="w-2.5 h-2.5 opacity-80" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                aria-label="Minimize"
                className="w-3.5 h-3.5 rounded-full bg-amber-400/80 hover:bg-amber-400 flex items-center justify-center text-slate-950 transition-colors"
              >
                <Minus className="w-2.5 h-2.5 opacity-80" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximizeWindow(id);
                }}
                aria-label="Maximize"
                className="hidden md:flex w-3.5 h-3.5 rounded-full bg-emerald-400/80 hover:bg-emerald-400 items-center justify-center text-slate-950 transition-colors"
              >
                {win.isMaximized ? (
                  <Minimize2 className="w-2 h-2 opacity-80" />
                ) : (
                  <Maximize2 className="w-2 h-2 opacity-80" />
                )}
              </button>
            </div>

            <span className="text-xs md:text-sm font-semibold text-slate-200 truncate max-w-[230px] sm:max-w-md">
              {win.title[lang]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
              PID:{win.zIndex * 12}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              className="md:hidden text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30"
            >
              {lang === "fa" ? "بستن" : "Close"}
            </button>
          </div>
        </div>

        {/* محتوای داخلی پنجره */}
        <div
          data-xray-label={`WindowViewport[${id}] :: Scrollable`}
          className="window-scroll-viewport flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6 select-text"
        >
          {children}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
