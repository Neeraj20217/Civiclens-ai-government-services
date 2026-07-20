'use client';

import React, { useState } from 'react';
import { Key, X, CheckCircle2, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { getCustomGeminiApiKey, setCustomGeminiApiKey } from '@/lib/gemini';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKeyInput, setApiKeyInput] = useState(() => getCustomGeminiApiKey() || '');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKeyInput.trim().length > 0) {
      setCustomGeminiApiKey(apiKeyInput.trim());
      setSaveStatus('API Key saved successfully! Live Gemini 2.5 Flash API is active.');
    } else {
      setCustomGeminiApiKey(null);
      setSaveStatus('Cleared custom API key. Reverted to built-in Generative Engine.');
    }
    onKeyUpdated();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKeyInput('');
    setCustomGeminiApiKey(null);
    setSaveStatus('API Key cleared.');
    onKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Google Gemini API Configuration</h3>
              <p className="text-xs text-blue-100 font-medium">Use your Google AI Studio key for live Gemini 2.5 Flash responses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close API Key modal"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            CivicLens AI includes a powerful <strong>built-in Generative Intelligence Engine</strong> that works out of the box. Optionally enter your free Google Gemini API key from <strong>Google AI Studio</strong> to enable live Gemini 2.5 Flash API calls.
          </p>

          <div>
            <label htmlFor="gemini-key-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Gemini API Key
            </label>
            <input
              id="gemini-key-input"
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Get Free Key at Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKeyInput && (
              <button
                onClick={handleClear}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear Key
              </button>
            )}
          </div>

          {saveStatus && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{saveStatus}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-slate-600 dark:text-slate-400 text-[11px] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Your key is stored securely in your environment or local browser memory and processed safely via server routes.</span>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Save & Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
