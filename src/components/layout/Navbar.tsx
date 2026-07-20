'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Key,
  Sun,
  Moon,
  MessageSquare,
  Compass,
  CheckCircle2,
  FileCheck,
  FileText,
  MapPin,
  ListTodo,
  Sliders,
  LayoutDashboard,
  BarChart3,
  Menu,
  X,
  Check
} from 'lucide-react';
import { SupportedLanguage, LANGUAGES, UI_TRANSLATIONS } from '@/lib/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onOpenApiKeyModal: () => void;
  hasCustomApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLang,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  onOpenApiKeyModal,
  hasCustomApiKey,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const navItems = [
    { id: 'landing', labelKey: 'navHome', fallback: 'Overview', icon: Sparkles },
    { id: 'assistant', labelKey: 'navAssistant', fallback: 'AI Assistant', icon: MessageSquare, badge: 'Gemini' },
    { id: 'matcher', labelKey: 'navMatcher', fallback: 'Scheme Matcher', icon: Compass },
    { id: 'eligibility', labelKey: 'navEligibility', fallback: 'Eligibility', icon: CheckCircle2 },
    { id: 'checklist', labelKey: 'navChecklist', fallback: 'Checklists', icon: FileCheck },
    { id: 'explainer', labelKey: 'navExplainer', fallback: 'Doc Explainer', icon: FileText },
    { id: 'offices', labelKey: 'navOffices', fallback: 'Offices', icon: MapPin },
    { id: 'actionplan', labelKey: 'navActionPlan', fallback: 'Action Plan', icon: ListTodo },
    { id: 'dynamic-form', labelKey: 'navDynamicForm', fallback: 'AI Dynamic Form', icon: Sliders, badge: 'AI' },
    { id: 'dashboard', labelKey: 'navDashboard', fallback: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', labelKey: 'navAnalytics', fallback: 'Analytics', icon: BarChart3 },
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 container mx-auto overflow-hidden">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="truncate">
            Google Cloud AI Showcase Initiative &bull; <strong className="underline underline-offset-2">CivicLens AI 2.5</strong>
          </span>
          <span className="hidden md:inline-block text-blue-100 font-mono text-[11px] ml-2 px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm shrink-0">
            {hasCustomApiKey ? 'Live Gemini 2.5 Flash API Connected' : 'Google Gemini AI Engine: Active'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] shrink-0">
          <span className="hidden sm:inline-block">Support: 1800-CIVIC-AI</span>
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap"
          >
            <Key className="w-3 h-3" />
            <span>{hasCustomApiKey ? 'Key Set' : t.apiKeyBtn || 'Configure API Key'}</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          <div
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                  {t.appTitle || 'CivicLens'}<span className="text-blue-500 font-light ml-0.5">AI</span>
                </h1>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  Gov AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block truncate max-w-[200px] sm:max-w-[260px] leading-tight">
                {t.appSubtitle || 'AI Assistant for Government Services & Schemes'}
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-[55vw] xl:max-w-none scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const labelText = t[item.labelKey] || item.fallback;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-label={`Navigate to ${labelText}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 relative whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span>{labelText}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {/* Multilingual Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label="Change Language"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 transition-colors shadow-sm whitespace-nowrap"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-blue-500" />
                <span>{currentLangObj.nativeName}</span>
                <span className="text-[10px] text-blue-400 font-mono">({currentLangObj.code.toUpperCase()})</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 grid grid-cols-1 gap-0.5 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Select Language / भाषा</span>
                    <span className="text-blue-500">8 Indic</span>
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left hover:bg-blue-50 dark:hover:bg-blue-950/60 ${
                          isSelected
                            ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span className="font-semibold">{lang.nativeName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <span>{lang.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const labelText = t[item.labelKey] || item.fallback;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{labelText}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
