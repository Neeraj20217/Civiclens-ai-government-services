'use client';

import React from 'react';
import {
  LayoutDashboard,
  Bookmark,
  History,
  Trash2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Scheme } from '@/types/scheme';

interface CitizenDashboardTabProps {
  bookmarks: Scheme[];
  onRemoveBookmark: (schemeId: string) => void;
  onNavigateToTab: (tabId: string, payload?: Scheme) => void;
}

export const CitizenDashboardTab: React.FC<CitizenDashboardTabProps> = ({
  bookmarks,
  onRemoveBookmark,
  onNavigateToTab,
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Personalized Citizen Dashboard</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage saved scheme bookmarks, document readiness checklists, and past eligibility verification reports.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              {bookmarks.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saved Schemes Vault</div>
          </div>
          <Bookmark className="w-8 h-8 text-blue-500/20" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              100%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aadhaar &amp; Privacy Encryption</div>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-500/20" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Active
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Firestore Real-time Sync</div>
          </div>
          <History className="w-8 h-8 text-indigo-500/20" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-500" />
            <span>Bookmarked Schemes Vault ({bookmarks.length})</span>
          </h3>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400">No Saved Schemes Yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Use the Smart Scheme Matcher to discover schemes and click the bookmark icon to save them here.
            </p>
            <button
              onClick={() => onNavigateToTab('matcher')}
              aria-label="Discover schemes now"
              className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
            >
              Discover Schemes Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookmarks.map((scheme) => (
              <div
                key={scheme.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {scheme.shortCode}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{scheme.ministry}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {scheme.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                    {scheme.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigateToTab('actionplan', scheme)}
                    aria-label={`Generate action plan for ${scheme.title}`}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <span>Action Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(scheme.id)}
                    aria-label={`Remove bookmark for ${scheme.title}`}
                    className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-red-500 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
