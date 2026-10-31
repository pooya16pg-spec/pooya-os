# Pooya.OS — Interactive Spatial Portfolio & Personal Engineering Ecosystem
**Author & Architect:** Pooya Goodarzi (Computer Engineering)  
**Live Ecosystem Portal:** [https://pooya16pg-spec.github.io/pooya-os/](https://pooya16pg-spec.github.io/pooya-os/)

## Ecosystem Overview
**Pooya.OS** serves as the central gateway to a 4-project flagship engineering portfolio, designed as a desktop/mobile hybrid WebOS with a custom window manager, X-Ray engineering inspector, and interactive client-side CLI sandbox:

1. **[Pooya.OS](https://pooya16pg-spec.github.io/pooya-os/)** — Personal Engineering WebOS & Central Hub.
2. **[AuraPulse](https://pooya16pg-spec.github.io/aurapulse/)** — Quantitative FinTech & Persistent Paper Trading Terminal (Live Binance Spot API + Pure SVG Charting).
3. **[NexusCanvas](https://pooya16pg-spec.github.io/nexus-canvas/)** — Distributed System Architecture Studio, SPOF Graph Validator & Docker Compose IaC Generator.
4. **[LuminaGlass](https://pooya16pg-spec.github.io/lumina-glass/)** — Apple visionOS-Inspired Liquid Glass Optical Lab & Real Web Audio API 5-Band Parametric EQ.

## Technical Architecture
- **Framework:** Next.js 14 (Static Export), React 18, TypeScript (`strict: true`), Tailwind CSS.
- **Window Management:** Custom state machine managing window focus, z-index stacking, minimization, and mobile sheet adaptation.
- **Honest Telemetry & Sandbox CLI:** Measures real browser frame-rate (`requestAnimationFrame`) and provides an interactive client-side command interpreter.