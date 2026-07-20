import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivicLens AI – AI Assistant for Government Services & Welfare Schemes",
  description: "Discover eligible Indian government schemes, decode legal documents, generate document checklists, and navigate public procedures with personalized Gemini AI assistance.",
  keywords: [
    "CivicLens AI",
    "Government Schemes India",
    "Gemini AI Government Assistant",
    "PM-KISAN",
    "Ayushman Bharat",
    "Startup India Seed Fund",
    "Caste Certificate Checklist",
    "Passport Application Guide",
    "Multilingual Indic AI"
  ],
  authors: [{ name: "Google Cloud AI Builders Showcase Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "CivicLens AI – AI Assistant for Government Services",
    description: "Simplifying access to welfare schemes, legal documents, and government certificates using Google Gemini AI.",
    url: "https://civiclens-ai.web.app",
    siteName: "CivicLens AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicLens AI – AI Assistant for Government Services",
    description: "Personalized Indic multilingual AI guidance for 40+ Indian Central & State Government Schemes.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a73e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>

        {/* Accessibility ARIA Live Region for screen reader announcements */}
        <div id="a11y-announcement" aria-live="polite" className="sr-only" />

        {/* Root Content */}
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
