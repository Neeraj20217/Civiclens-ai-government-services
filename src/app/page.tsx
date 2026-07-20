'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { AiErrorBoundary } from '@/components/layout/AiErrorBoundary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ApiKeyModal } from '@/components/layout/ApiKeyModal';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureHighlights } from '@/components/landing/FeatureHighlights';
import { TechStackSection } from '@/components/landing/TechStackSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { AiAssistantTab } from '@/components/assistant/AiAssistantTab';
import { FloatingChatbotWidget } from '@/components/assistant/FloatingChatbotWidget';
import { SchemeMatcherTab } from '@/components/schemes/SchemeMatcherTab';
import { EligibilityCheckerTab } from '@/components/schemes/EligibilityCheckerTab';
import { DocChecklistTab } from '@/components/documents/DocChecklistTab';
import { DocExplainerTab } from '@/components/documents/DocExplainerTab';
import { OfficeFinderTab } from '@/components/tools/OfficeFinderTab';
import { ActionPlanTab } from '@/components/tools/ActionPlanTab';
import { AiDynamicFormTab } from '@/components/tools/AiDynamicFormTab';
import { CitizenDashboardTab } from '@/components/dashboard/CitizenDashboardTab';
import { AnalyticsTab } from '@/components/dashboard/AnalyticsTab';
import { SupportedLanguage } from '@/lib/translations';
import { Scheme } from '@/types/scheme';
import { getCustomGeminiApiKey } from '@/lib/gemini';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasCustomApiKey, setHasCustomApiKey] = useState<boolean>(false);

  // Sync client-side localStorage preferences after initial hydration to avoid SSR mismatch
  useEffect(() => {
    const savedLang = localStorage.getItem('civiclens_language') as SupportedLanguage;
    if (savedLang) {
      startTransition(() => {
        setCurrentLang(savedLang);
      });
    }

    const savedDark = localStorage.getItem('civiclens_dark_mode');
    if (savedDark !== null) {
      startTransition(() => {
        setIsDarkMode(savedDark === 'true');
      });
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      startTransition(() => {
        setIsDarkMode(true);
      });
    }

    const key = getCustomGeminiApiKey();
    startTransition(() => {
      setHasCustomApiKey(!!key && key.trim().length > 5);
    });
  }, []);

  // Sync DOM dark mode class whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('civiclens_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('civiclens_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Cross-tab shared state payload
  const [assistantPrompt, setAssistantPrompt] = useState<string | undefined>(undefined);
  const [selectedSchemeForEligibility, setSelectedSchemeForEligibility] = useState<Scheme | null>(null);
  const [selectedSchemeForActionPlan, setSelectedSchemeForActionPlan] = useState<Scheme | null>(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Scheme[]>([]);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('civiclens_language', lang);
    }
  };

  const handleToggleBookmark = (scheme: Scheme) => {
    setBookmarkedSchemes((prev) => {
      const exists = prev.some((s) => s.id === scheme.id);
      if (exists) {
        return prev.filter((s) => s.id !== scheme.id);
      } else {
        return [...prev, scheme];
      }
    });
  };

  const isBookmarked = (schemeId: string) => {
    return bookmarkedSchemes.some((s) => s.id === schemeId);
  };

  const handleStartAssistant = (promptText?: string) => {
    if (promptText) {
      setAssistantPrompt(promptText);
    }
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSchemeForEligibility = (scheme: Scheme) => {
    setSelectedSchemeForEligibility(scheme);
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSchemeForActionPlan = (scheme: Scheme) => {
    setSelectedSchemeForActionPlan(scheme);
    setActiveTab('actionplan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTab = (tabId: string, payload?: unknown) => {
    if (tabId === 'eligibility' && payload) {
      setSelectedSchemeForEligibility(payload as Scheme);
    } else if (tabId === 'actionplan' && payload) {
      setSelectedSchemeForActionPlan(payload as Scheme);
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AiErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 relative">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentLang={currentLang}
          setLanguage={handleSetLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          hasCustomApiKey={hasCustomApiKey}
        />

        {/* Main View Area */}
        <main className="flex-1">
          {activeTab === 'landing' && (
            <div className="space-y-4">
              <HeroSection
                onStartAssistant={handleStartAssistant}
                onStartMatcher={() => setActiveTab('matcher')}
                currentLang={currentLang}
              />
              <FeatureHighlights onSelectFeature={handleNavigateToTab} />
              <TechStackSection />
              <FaqSection />
            </div>
          )}

          {activeTab === 'assistant' && (
            <AiAssistantTab
              initialPrompt={assistantPrompt}
              currentLang={currentLang}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'matcher' && (
            <SchemeMatcherTab
              onSelectSchemeForEligibility={handleSelectSchemeForEligibility}
              onSelectSchemeForActionPlan={handleSelectSchemeForActionPlan}
              onSaveBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {activeTab === 'eligibility' && (
            <EligibilityCheckerTab
              preselectedScheme={selectedSchemeForEligibility}
              onNavigateToActionPlan={handleSelectSchemeForActionPlan}
            />
          )}

          {activeTab === 'checklist' && <DocChecklistTab />}

          {activeTab === 'explainer' && <DocExplainerTab />}

          {activeTab === 'offices' && <OfficeFinderTab />}

          {activeTab === 'actionplan' && (
            <ActionPlanTab initialScheme={selectedSchemeForActionPlan} />
          )}

          {activeTab === 'dynamic-form' && <AiDynamicFormTab currentLang={currentLang} />}

          {activeTab === 'dashboard' && (
            <CitizenDashboardTab
              bookmarks={bookmarkedSchemes}
              onRemoveBookmark={(id) => setBookmarkedSchemes((prev) => prev.filter((s) => s.id !== id))}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsTab />}
        </main>

        {/* Global Floating AI Chatbot Widget */}
        <FloatingChatbotWidget currentLang={currentLang} />

        {/* Footer */}
        <Footer />

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
          onKeyUpdated={() => {
            const key = getCustomGeminiApiKey();
            setHasCustomApiKey(!!key && key.trim().length > 5);
          }}
        />
      </div>
    </AiErrorBoundary>
  );
}
