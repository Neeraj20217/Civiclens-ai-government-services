# CivicLens AI – AI Assistant for Government Services

> **Google Cloud AI Showcase Initiative &bull; Meet the Builders Entry**  
> *Simplifying access to Indian Central & State Government Services, Welfare Schemes, Certificates, and Legal Documents powered by Google Gemini 2.5 AI.*

---

## 🌟 Executive Summary

Millions of citizens struggle with navigating complex government portals, understanding dense eligibility criteria, translating administrative jargon, and identifying required document checklists. **CivicLens AI** bridges this gap using Generative AI (Google Gemini 2.5 Flash), offering natural, Indic multilingual, and voice-assisted guidance tailored to every citizen's age, income, state, and occupation.

---

## 🚀 Core Features

1. **AI Government Assistant (CivicBot)**: Multi-turn conversational AI with Web Speech STT/TTS in 8 Indic languages.
2. **Smart Scheme Recommendation Engine**: 4-Step interactive profile matching algorithm.
3. **Deep Eligibility Checker**: Dynamic QA assessment with 100% verdict verification & reasoning.
4. **Document Checklist Generator**: Downloadable & printable document lists with issuing office guidance.
5. **Document Explainer & Jargon Decoder**: Plain-language summaries of official GRs and Gazette notices.
6. **Nearby Government Office Locator**: Interactive map locator for Passport Offices, RTOs, MeeSeva/CSC, Municipalities.
7. **AI Action Plan Roadmap**: Visual execution timeline breaking goals into Step 1, Step 2, Step 3 milestones.
8. **Citizen Dashboard**: Saved scheme vault and document readiness tracking.
9. **BigQuery Telemetry Hub**: Analytics tracking search trends, language distribution, and API latency (210ms avg).

---

## 🛠️ Architecture & Tech Stack

```
CivicLens AI Web Application
├── 🌐 Next.js 15+ App Router (TypeScript, Tailwind CSS, Lucide Icons)
├── 🤖 Server-Side API Proxy (/api/chat) & Google Gemini 2.5 Flash API
├── 🗣️ Indic Web Speech API (STT & TTS across 8 Native Languages)
├── 📊 Recharts & Canvas-Confetti (Interactive Telemetry & Micro-Interactions)
└── 🛡️ Enterprise Security (Security Headers, Rate Limiting, Input Sanitization)
```

---

## 🔧 Environment Setup

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Secrets**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google AI Studio key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🛡️ Security & Privacy Architecture

- **Zero Client Key Leakage**: API requests are routed through Next.js server-side route `/api/chat` using private `GEMINI_API_KEY`.
- **Security Headers**: Configured with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.
- **Input Sanitization**: HTML/script sanitization and sliding-window rate limiting (30 requests/min/IP).

---

## 📄 License & Attribution
Distributed under the MIT License. Built for Google Cloud Meet the Builders Showcase 2026.
