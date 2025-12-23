# Joey’s Party Tricks

A mobile-optimized improv prompt generator built for the Designated Driver improv group, serving up witty, unexpected scene ideas on demand.

🔗 **Live Demo:** https://joeys-party-tricks.replit.app

---

## Why I Built This

Improv groups need fresh, non-cheesy prompts that spark genuine creativity. Most prompt generators produce predictable, groan-worthy suggestions. I wanted to create something that delivers the kind of irreverent, intellectually playful scenarios that actually make performers excited to jump on stage.

---

## What It Does

- Generates curated improv prompts across categories:
  - Scenarios
  - Characters
  - Props & Lines
  - **Spin the Bottle** (random mix)
- Displays special elements like accents, props, and character traits as visual badges
- Maintains a **Recent Prompts** archive so skipped ideas aren’t lost
- Provides a smooth, mobile-first experience with playful animations and a pastel rainbow aesthetic

---

## How It Works (High Level)

1. User selects a category (or lets the app surprise them with **Spin the Bottle**)
2. Tapping **Generate New Prompt** fetches a random prompt from that category
3. Each prompt may include optional special elements (props, accents, lines) shown as colorful badges
4. Previous prompts are saved to a recent history for easy reference

---

## Tech Stack

**Frontend**
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

**Backend**
- Express.js
- Node.js

**Data**
- In-memory storage with curated seed prompts

---

## Notes / Scope

- No authentication system — designed for quick access during improv sessions
- No persistent storage — prompts reset on server restart
- Save/share functionality intentionally omitted to keep the interface minimal

---

## Run Locally

```bash
npm install
npm run dev
