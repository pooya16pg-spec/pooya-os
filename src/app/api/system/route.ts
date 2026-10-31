import { NextRequest, NextResponse } from "next/server";

interface CommandPayload {
  command: string;
  lang: "fa" | "en";
}

const ENGINEER_PROFILE = {
  name: "Pooya Goodarzi | پویا گودرزی",
  role: "Computer Engineer & Full-Stack Design Engineer",
  stack: {
    ui_ux: [
      "Figma Design Systems",
      "Interactive Prototyping",
      "Design Tokens & Spatial UI",
      "Micro-Interactions & Scrollytelling",
    ],
    frontend: [
      "Next.js (App Router / SSR)",
      "React 18 & TypeScript",
      "Tailwind CSS & Framer Motion",
      "WebGL / Three.js & Canvas Optimization",
    ],
    backend: [
      "Node.js & REST / GraphQL APIs",
      "PostgreSQL, Prisma & Redis Caching",
      "WebSockets & Real-Time State Sync",
      "System Architecture & Clean Code",
    ],
  },
};

export async function GET() {
  const serverTimestamp = new Date().toISOString();
  const simulatedLatency = Math.floor(Math.random() * 8) + 9; // 9ms - 17ms

  return NextResponse.json({
    status: "OPERATIONAL",
    engineer: ENGINEER_PROFILE.name,
    kernelVersion: "Pooya.OS v4.2.0-spatial",
    uptime: "99.98%",
    latencyMs: simulatedLatency,
    timestamp: serverTimestamp,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CommandPayload;
    const rawCmd = (body.command || "").trim().toLowerCase();
    const lang = body.lang || "fa";

    let output: string[] = [];

    switch (rawCmd) {
      case "help":
        output =
          lang === "fa"
            ? [
                "دستورات قابل اجرا در هسته بک‌اند Pooya.OS:",
                "  whoami        -> نمایش بیوگرافی مهندسی پویا گودرزی",
                "  stack         -> لیست کامل مهارت‌های UI/UX، فرانت‌اند و بک‌اند",
                "  xray          -> فعال/غیرفعال کردن حالت بازرس مهندسی (X-Ray)",
                "  status        -> دریافت تلمتری زنده سرور و دیتابیس",
                "  hire          -> دریافت اطلاعات تماس مستقیم و لینکدین",
                "  clear         -> پاکسازی صفحه ترمینال",
              ]
            : [
                "Available Backend Kernel Commands in Pooya.OS:",
                "  whoami        -> Display Pooya Goodarzi's engineering profile",
                "  stack         -> Full breakdown of UI/UX, Frontend & Backend stack",
                "  xray          -> Toggle live X-Ray Design Inspector mode",
                "  status        -> Fetch real-time server & database telemetry",
                "  hire          -> Direct contact endpoints & hiring availability",
                "  clear         -> Clear terminal buffer",
              ];
        break;

      case "whoami":
        output =
          lang === "fa"
            ? [
                "● نام: پویا گودرزی (Pooya Goodarzi)",
                "● تخصص: مهندس کامپیوتر | طراح ارشد UI/UX و توسعه‌دهنده Full-Stack",
                "● رویکرد مهندسی: ترکیب زیبایی‌شناسی سطح اول محصول با معماری بک‌اند مقیاس‌پذیر و فرانت‌اند فوق سریع.",
              ]
            : [
                "● Engineer: Pooya Goodarzi",
                "● Discipline: Computer Engineer | Full-Stack Design Engineer (UI/UX + FE + BE)",
                "● Philosophy: Bridging pixel-perfect spatial UI/UX with high-throughput backend systems.",
              ];
        break;

      case "stack":
        output = [
          `[UI/UX Design]  :: ${ENGINEER_PROFILE.stack.ui_ux.join(" • ")}`,
          `[Front-End]     :: ${ENGINEER_PROFILE.stack.frontend.join(" • ")}`,
          `[Back-End]      :: ${ENGINEER_PROFILE.stack.backend.join(" • ")}`,
        ];
        break;

      case "status":
        output = [
          "✔ API Gateway       : ONLINE (Next.js Edge Runtime)",
          "✔ State Synchronization: ZUSTAND + WebSockets Ready",
          "✔ Render Target     : 144Hz High-Refresh Spatial UI",
          `✔ Server Timestamp  : ${new Date().toLocaleTimeString()}`,
        ];
        break;

      case "hire":
        output =
          lang === "fa"
            ? [
                "🚀 آماده همکاری در پروژه‌های سطح اول (تمام‌وقت / پروژه‌ای / بین‌المللی):",
                "  • LinkedIn : linkedin.com/in/pooya-goodarzi",
                "  • GitHub   : github.com/pooya-goodarzi",
                "  • Email    : pooya.goodarzi.dev@gmail.com",
              ]
            : [
                "🚀 Open for Flagship Engineering & Product Design Roles:",
                "  • LinkedIn : linkedin.com/in/pooya-goodarzi",
                "  • GitHub   : github.com/pooya-goodarzi",
                "  • Email    : pooya.goodarzi.dev@gmail.com",
              ];
        break;

      default:
        output =
          lang === "fa"
            ? [
                `دستور '${rawCmd}' شناخته نشد. برای مشاهده لیست دستورات، عبارت 'help' را تایپ کنید.`,
              ]
            : [
                `Command '${rawCmd}' not recognized. Type 'help' to inspect available system commands.`,
              ];
    }

    return NextResponse.json({
      ok: true,
      command: rawCmd,
      action: rawCmd === "xray" ? "TOGGLE_XRAY" : "PRINT",
      lines: output,
      executedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, lines: ["Kernel Error: Invalid command payload."] },
      { status: 400 }
    );
  }
}
