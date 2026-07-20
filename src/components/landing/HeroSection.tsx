'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Mic,
  ArrowRight,
  Compass,
  FileCheck,
  Building2,
  Cloud,
} from 'lucide-react';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { voiceController } from '@/lib/voice';
import { HeroBackground } from './HeroBackground';

interface HeroSectionProps {
  onStartAssistant: (prompt?: string) => void;
  onStartMatcher: () => void;
  currentLang: SupportedLanguage;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAssistant,
  onStartMatcher,
  currentLang,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const quickPrompts = [
    'I am a graduate looking for startup funding grant',
    'Required documents for Caste Certificate in Maharashtra',
    'How can senior citizens get Ayushman Bharat card?',
    'What is the eligibility for PM-KISAN 6,000 rupees?',
    'How do I renew my Tatkaal Driving Licence?',
  ];

  const handleMicClick = () => {
    if (isListening) {
      voiceController.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceController.startListening(
        currentLang,
        (text) => { setSearchInput(text); setIsListening(false); },
        (err)  => { console.error('Speech error:', err); setIsListening(false); },
        ()     => setIsListening(false)
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) onStartAssistant(searchInput);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-36 transition-colors duration-300">
      {/* ────── Layered premium background ────── */}
      <HeroBackground />

      {/* ────── Foreground content (must stay relative z-10) ────── */}
      <div className="container mx-auto px-4 relative z-10">

        {/* Initiative pill badge */}
        <div className="flex justify-center mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-white/90 dark:bg-slate-900/90
            border border-blue-200/80 dark:border-blue-800
            text-blue-700 dark:text-blue-300
            text-xs font-semibold
            shadow-lg shadow-blue-500/10
            backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>{t.heroTag}</span>
          </div>
        </div>

        {/* Heading + subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold
            text-slate-900 dark:text-white
            tracking-tight leading-[1.12]">
            Empowering Citizens with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Generative AI
            </span>{' '}
            for Government Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300
            font-medium max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>
        </div>

        {/* ── Interactive AI search card ── */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="bg-white/96 dark:bg-slate-900/96 rounded-3xl p-3.5 sm:p-5
            shadow-2xl shadow-blue-500/10
            border border-white/80 dark:border-slate-800
            backdrop-blur-2xl">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="pl-3 text-blue-600 dark:text-blue-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchPlaceholder || 'Search schemes, services, documents...'}
                className="w-full py-3.5 px-2 bg-transparent
                  text-slate-900 dark:text-white
                  placeholder-slate-400
                  focus:outline-none text-sm sm:text-base font-medium"
              />
              <button
                type="button"
                onClick={handleMicClick}
                aria-label="Toggle Voice Input"
                className={`p-3 rounded-2xl transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="submit"
                aria-label="Submit Search"
                className="px-6 py-3.5 rounded-2xl
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500
                  hover:from-blue-500 hover:to-sky-400
                  text-white text-xs sm:text-sm font-bold
                  transition-all shadow-xl shadow-blue-500/25
                  flex items-center gap-2 shrink-0"
              >
                <span>{t.tryAssistant}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick-prompt chips */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800
              flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 shrink-0">Popular:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onStartAssistant(prompt)}
                  className="px-3 py-1 rounded-xl
                    bg-slate-50 dark:bg-slate-800
                    hover:bg-blue-50 dark:hover:bg-blue-950/40
                    text-slate-600 dark:text-slate-300
                    hover:text-blue-600 dark:hover:text-blue-400
                    text-xs font-medium whitespace-nowrap
                    transition-all border border-slate-200/60 dark:border-slate-700 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4-column feature bar ── */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            {
              icon: Sparkles, label: 'AI Assistant',
              desc: 'Ask any query in 8 Indic languages',
              color: 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400',
              ring: 'hover:border-blue-500/50',
              onClick: () => onStartAssistant(),
            },
            {
              icon: Compass, label: 'Scheme Matcher',
              desc: 'Get 100% personalised schemes',
              color: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400',
              ring: 'hover:border-indigo-500/50',
              onClick: onStartMatcher,
            },
            {
              icon: FileCheck, label: 'Doc Checklist',
              desc: 'Download official required lists',
              color: 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400',
              ring: 'hover:border-sky-500/50',
              onClick: () => onStartAssistant('Document Checklist Generator'),
            },
            {
              icon: Building2, label: 'Office Finder',
              desc: 'Passport, RTO & CSC centres',
              color: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
              ring: 'hover:border-emerald-500/50',
              onClick: () => onStartAssistant('Nearby Government Office Finder'),
            },
          ].map(({ icon: Icon, label, desc, color, ring, onClick }, i) => (
            <button
              key={i}
              onClick={onClick}
              className={`p-4 rounded-2xl text-left group
                bg-white/75 dark:bg-slate-900/75
                border border-white/70 dark:border-slate-800
                shadow-lg hover:shadow-xl ${ring}
                backdrop-blur-xl transition-all`}
            >
              <div className={`w-10 h-10 rounded-xl ${color}
                flex items-center justify-center mb-3
                group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{label}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
            </button>
          ))}
        </div>

        {/* Powered-by strip */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/70 dark:bg-slate-900/60
            border border-slate-200/60 dark:border-slate-800
            shadow-sm backdrop-blur-md text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Cloud className="w-3.5 h-3.5 text-sky-500" />
            <span>Powered by Google Cloud · Gemini 2.5 · Digital India</span>
          </div>
        </div>
      </div>
    </section>
  );
};
