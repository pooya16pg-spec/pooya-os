import { create } from "zustand";

export type AppID = "about" | "projects" | "terminal" | "architecture";
export type Language = "fa" | "en";

export interface WindowState {
  id: AppID;
  title: { fa: string; en: string };
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPos: { x: number; y: number };
  defaultSize: { width: string; height: string };
}

interface OSStore {
  lang: Language;
  isXRayMode: boolean;
  activeApp: AppID | null;
  maxZIndex: number;
  windows: Record<AppID, WindowState>;
  telemetry: {
    fps: number;
    frameMs: number;
  };
  toggleLanguage: () => void;
  toggleXRayMode: () => void;
  openWindow: (id: AppID) => void;
  closeWindow: (id: AppID) => void;
  minimizeWindow: (id: AppID) => void;
  toggleMaximizeWindow: (id: AppID) => void;
  focusWindow: (id: AppID) => void;
  updateTelemetry: (data: Partial<OSStore["telemetry"]>) => void;
}

const initialWindows: Record<AppID, WindowState> = {
  about: {
    id: "about",
    title: {
      fa: "پویا گودرزی — پروفایل مهندسی و UI/UX",
      en: "Pooya Goodarzi — Engineering & UI/UX Core",
    },
    iconName: "Cpu",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    defaultPos: { x: 60, y: 55 },
    defaultSize: { width: "760px", height: "520px" },
  },
  projects: {
    id: "projects",
    title: {
      fa: "آزمایشگاه محصول و کیس‌استادی‌ها",
      en: "Product Lab & Full-Stack Case Studies",
    },
    iconName: "Layers",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
    defaultPos: { x: 140, y: 85 },
    defaultSize: { width: "820px", height: "540px" },
  },
  terminal: {
    id: "terminal",
    title: {
      fa: "ترمینال محلی مرورگر (Pooya.CLI)",
      en: "Local Browser CLI Sandbox (Pooya.CLI)",
    },
    iconName: "Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 21,
    defaultPos: { x: 460, y: 150 },
    defaultSize: { width: "620px", height: "410px" },
  },
  architecture: {
    id: "architecture",
    title: {
      fa: "معماری سیستم و دیزاین توکن‌ها",
      en: "System Architecture & Design Tokens",
    },
    iconName: "Network",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 18,
    defaultPos: { x: 200, y: 100 },
    defaultSize: { width: "740px", height: "490px" },
  },
};

export const useOSStore = create<OSStore>((set) => ({
  lang: "fa",
  isXRayMode: false,
  activeApp: "about",
  maxZIndex: 22,
  windows: initialWindows,
  telemetry: {
    fps: 0,
    frameMs: 0,
  },

  toggleLanguage: () =>
    set((state) => ({ lang: state.lang === "fa" ? "en" : "fa" })),

  toggleXRayMode: () =>
    set((state) => ({ isXRayMode: !state.isXRayMode })),

  openWindow: (id) =>
    set((state) => {
      const nextZ = state.maxZIndex + 1;
      return {
        activeApp: id,
        maxZIndex: nextZ,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      activeApp: state.activeApp === id ? null : state.activeApp,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      activeApp: state.activeApp === id ? null : state.activeApp,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
        },
      },
    })),

  toggleMaximizeWindow: (id) =>
    set((state) => {
      const nextZ = state.maxZIndex + 1;
      return {
        activeApp: id,
        maxZIndex: nextZ,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMaximized: !state.windows[id].isMaximized,
            zIndex: nextZ,
          },
        },
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      if (state.activeApp === id && !state.windows[id].isMinimized) {
        return state;
      }
      const nextZ = state.maxZIndex + 1;
      return {
        activeApp: id,
        maxZIndex: nextZ,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: false,
            zIndex: nextZ,
          },
        },
      };
    }),

  updateTelemetry: (data) =>
    set((state) => ({
      telemetry: { ...state.telemetry, ...data },
    })),
}));
