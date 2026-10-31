# Pooya.OS — Interactive Web Desktop & Engineering Portfolio

**Author:** Pooya Goodarzi  
**Live site:** https://pooya16pg-spec.github.io/pooya-os/

Pooya.OS is a client-side portfolio experience built to present four interactive engineering projects through a desktop-inspired interface.

## What is included
- Draggable application windows, responsive dock, language switching, and an X-Ray inspection mode.
- A local CLI sandbox with informational commands. It does not execute operating-system commands and does not connect to a backend shell.
- Browser frame-rate sampling using `requestAnimationFrame`; reported FPS and frame time are measured locally in the current browser tab.
- Project summaries that distinguish real browser functionality from simulated or local-only features.

## Deployment and architecture
- Next.js 14, React 18, TypeScript, Zustand, and Tailwind CSS.
- Built with Next.js static export and deployed on GitHub Pages.
- No Next.js server runtime, API route, database, authentication service, or server telemetry is available in this deployment.
- Public assets are served from the `/pooya-os` base path.

## Project ecosystem
- **AuraPulse:** browser-based market dashboard and paper-trading simulation. It can read public Binance market data when the browser can reach the public endpoint; it never places real exchange orders.
- **NexusCanvas:** local architecture graph editor with same-browser-tab synchronization and a Docker Compose prototype exporter.
- **LuminaGlass:** browser-native visual experiments and Web Audio DSP, including uploaded audio and optional microphone input.

All trading, topology metrics, and visual presets are demonstrations unless a feature explicitly identifies an external public data source.
