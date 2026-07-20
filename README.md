# 🏛️ CivicLens AI – Generative AI Platform for Government Services

> **Google Cloud AI Showcase Initiative &bull; Meet the Builders Entry 2026**  
> *Empowering 1.4 Billion citizens with Google Gemini 2.5 AI for Indian Central & State Government Welfare Schemes, Legal Certificates, Document Summarization, and Public Office Navigation.*

[![Live Platform](https://img.shields.io/badge/Live%20Platform-Vercel%20Production-000000?style=for-the-badge&logo=vercel)](https://civiclens-ai-government-services.vercel.app/)
[![Google Gemini](https://img.shields.io/badge/AI%20Engine-Google%20Gemini%202.5-4285F4?style=for-the-badge&logo=googlecloud)](https://aistudio.google.com/)
[![Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015%20App%20Router-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Summary

Navigating administrative portals, understanding complex government eligibility gazettes, decoding bureaucratic legalese, and locating government offices (Passport, RTO, MeeSeva, Tahsildar, Municipalities) are major hurdles for citizens—especially senior citizens, rural populations, and non-English speakers.

**CivicLens AI** is an enterprise-grade SaaS web application built with **Google Gemini 2.5 AI** and **Google Cloud**. It acts as a 24/7 intelligent civic co-pilot, translating administrative complexity into natural, empathetic, multimodal, and multilingual guidance across **8 native Indic languages** (English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi).

---

## 🏗️ High-Level System Architecture

```mermaid
graph TD
    subgraph Client ["Client Layer (Browser / Mobile / Desktop)"]
        UI["Next.js 15 React Frontend"]
        Canvas["60fps Animated Hero Canvas"]
        Voice["Indic Web Speech STT / TTS Engine"]
        Storage["Local Vault & Preferences Storage"]
    end

    subgraph Server ["Next.js Server Proxy (Vercel Edge/Serverless)"]
        Route["/api/chat API Route"]
        Sanitizer["Input Sanitization & Rate Limiter (30 req/min)"]
        ModelFallback["Model Fallback & Retry Controller"]
    end

    subgraph GCP ["Google Cloud Infrastructure & AI Services"]
        Gemini["Google Gemini 2.5 / Flash AI API"]
        Vertex["Vertex AI Vector Services"]
        Telemetry["BigQuery Telemetry Hub"]
    end

    UI -->|"User Prompts / Voice Input"| Voice
    Voice -->|"Text Prompt"| Route
    Route --> Sanitizer
    Sanitizer --> ModelFallback
    ModelFallback -->|"Secure API Key Header"| Gemini
    Gemini -->|"Streaming / Structured Response"| Route
    Route -->|"Sanitized JSON Response"| UI
    UI --> Storage
    Route -.->|"Log Anonymized Telemetry"| Telemetry
```

---

## 🔄 Core User Workflows & Data Flows

### 1. AI Government Assistant (CivicBot) Query Flow

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Citizen User
    participant UI as CivicLens UI
    participant Proxy as /api/chat Proxy
    participant Gemini as Google Gemini AI Engine
    participant Speech as Web Speech TTS

    Citizen->>UI: Types query or clicks Voice Mic ("PM-KISAN eligibility in Hindi")
    UI->>Proxy: POST /api/chat { prompt, lang: 'hi', history }
    Proxy->>Proxy: Sanitize input & enforce sliding-window rate limit
    Proxy->>Gemini: POST /v1beta/models/gemini-flash-latest:generateContent
    Gemini-->>Proxy: Returns structured Markdown + Scheme Citations
    Proxy-->>UI: 200 OK { text, suggestedActions, referencedSchemes }
    UI->>Citizen: Displays formatted answer + scheme cards
    Citizen->>UI: Clicks Audio Listen icon
    UI->>Speech: Trigger Indic Speech Synthesis
    Speech-->>Citizen: Plays audio narration in selected language
```

---

### 2. Smart Scheme Recommendation & Eligibility Checker Engine

```mermaid
flowchart LR
    A[Citizen Profile Input] --> B{Age, Income, State, Occupation}
    B --> C[Schemes Database Engine]
    C --> D[Ranked Scheme Matches]
    D --> E[Eligibility Evaluator]
    E -->|Interactive QA| F[Gemini Verification Engine]
    F --> G[100% Verified Verdict: Eligible / Conditional / Ineligible]
    G --> H[Action Plan Roadmap Generator]
```

---

### 3. Pan-India Nearby Office Locator Flow

```mermaid
flowchart TD
    Start([User opens Office Finder]) --> SelectCity[Select 1 of 12 Major Indian Cities]
    SelectCity --> SelectCategory[Choose Category: Passport, RTO, CSC/MeeSeva, Tahsildar, Municipality]
    SelectCategory --> DatabaseLookup[Static Database Lookup: 60+ Verified Centers]
    DatabaseLookup --> Display[Render Office Cards: Address, Contact, Operating Hours, Official Portal]
    Display --> FallbackQuery{City/Office Not in Database?}
    FallbackQuery -- Yes --> GeminiSearch[Execute Live Gemini AI Search]
    GeminiSearch --> RenderAI[Render AI Discovered Office Details]
```

---

## 🛠️ Complete DevOps & Deployment Pipeline

```mermaid
gitGraph
    commit id: "Initial Project"
    branch feature/canvas-hero
    checkout feature/canvas-hero
    commit id: "Add 60fps Canvas Hero"
    checkout main
    merge feature/canvas-hero id: "Merge Canvas Hero"
    branch feature/office-finder
    checkout feature/office-finder
    commit id: "Add Pan-India 12 Cities Database"
    checkout main
    merge feature/office-finder id: "Merge Office Finder"
    commit id: "Push to GitHub (54 Files)"
    commit id: "Vercel Auto-Trigger CI/CD"
```

### CI/CD Deployment Flow

```mermaid
flowchart LR
    Sub1["1. Local Dev (npm run dev)"] --> Sub2["2. Git Commit & Push (main branch)"]
    Sub2 --> Sub3["3. GitHub Repository Trigger"]
    Sub3 --> Sub4["4. Vercel Auto-Build & Install"]
    Sub4 --> Sub5["5. Inject Environment Secrets (GEMINI_API_KEY)"]
    Sub5 --> Sub6["6. Live Production Release (Vercel Edge)"]
```

---

## 🚀 Key Features & Product Matrix

| Feature | Description | Tech Stack | Status |
|---|---|---|---|
| **60fps Canvas Hero** | Animated India neural network, pulsing nodes, flowing data packets, glassmorphic badges | HTML5 Canvas, React `requestAnimationFrame` | ✅ Production |
| **CivicBot AI Assistant** | Multi-turn conversational AI with system instructions for legal scheme advice | Google Gemini 2.5, Next.js API Routes | ✅ Production |
| **Smart Scheme Matcher** | 4-step interactive profile wizard matching 100+ Central & State schemes | Custom Rule Engine, React State | ✅ Production |
| **Deep Eligibility Checker** | Dynamic QA assessment providing explicit verdicts & reasoning | Gemini AI Prompt Chain | ✅ Production |
| **Doc Checklist Generator** | Downloadable & printable document requirement checklists | PDF Print CSS, React Modals | ✅ Production |
| **Pan-India Office Locator** | Locator for 60+ offices across 12 cities (Passport, RTO, CSC, Tahsildar, Municipality) | Static Geo DB + Gemini Fallback | ✅ Production |
| **Indic Voice Assistant** | Hands-free voice input and speech synthesis audio narration | Web Speech API (STT & TTS) | ✅ Production |
| **8 Native Languages** | English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi | Translation Dictionary Engine | ✅ Production |
| **BigQuery Telemetry** | Analytics dashboard for search query trends and system health | Recharts, Simulated GCP Telemetry | ✅ Production |

---

## 🔧 Installation & Local Setup Guide

### 1. Clone & Install Dependencies

```bash
# Clone repository
git clone https://github.com/Neeraj20217/Civiclens-ai-government-services.git

# Navigate into project folder
cd Civiclens-ai-government-services

# Install packages
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google Gemini API key:

```env
# Google Gemini API Key (Server-Side Only)
# Get a free key at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel (Free 1-Click)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Update application"
git push origin main
```

### Step 2: Import on Vercel
1. Log into **[vercel.com](https://vercel.com)**
2. Click **Add New Project** → Import `Civiclens-ai-government-services`
3. Expand **Environment Variables**:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key`
4. Click **Deploy** ✅

---

## 🛡️ Security Architecture & Best Practices

- **Zero Client API Key Exposure**: All requests route through server-side Edge endpoint `/api/chat`. API keys are never bundled in client JS.
- **Git Protection**: `.env.local` is gitignored. Sensitive keys are stored strictly in Vercel Environment Secret Manager.
- **Sliding-Window Rate Limiting**: Built-in 30 requests/min per IP protection against abuse.
- **Input Sanitization**: XSS & script tag sanitization applied to all user prompts prior to model submission.

---

## 📄 License & Attribution

Distributed under the **MIT License**. Built for the **Google Cloud AI Showcase Initiative 2026**.
