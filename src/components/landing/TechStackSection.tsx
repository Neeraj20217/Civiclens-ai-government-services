'use client';

import React from 'react';
import { Cloud, Activity } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const cloudServices = [
    {
      title: 'Google Gemini 2.5 Flash API',
      role: 'Reasoning, Summarization & Multilingual translation engine',
      tech: 'Gemini-2.5-Flash',
      color: 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Google Vertex AI Search',
      role: 'Semantic embeddings vector retrieval across state scheme gazettes',
      tech: 'Vertex AI Agent Builder',
      color: 'border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Google Cloud Firestore',
      role: 'Real-time document storage for user profiles, saved vaults & history',
      tech: 'NoSQL Firestore Sync',
      color: 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Google BigQuery Analytics',
      role: 'Telemetry analytics tracking query trends, language metrics & latency',
      tech: 'BigQuery Data Warehouse',
      color: 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Google Cloud Run',
      role: 'Serverless container deployment with auto-scaling & zero cold-start',
      tech: 'Cloud Run Containers',
      color: 'border-sky-500/50 bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400'
    },
    {
      title: 'Firebase Authentication & IAM',
      role: 'Secure citizen authentication, role-based access & encrypted sessions',
      tech: 'Firebase Auth & Secret Mgr',
      color: 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Cloud className="w-3.5 h-3.5" />
            <span>Architecture &amp; Infrastructure</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Powered by Enterprise Google Cloud AI Platform
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Designed to meet Google Cloud production standards for scalability, low latency, accessibility, and high data security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cloudServices.map((srv) => (
            <div
              key={srv.title}
              className={`p-6 rounded-3xl border ${srv.color} transition-all hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 shadow-sm">
                  {srv.tech}
                </span>
                <Activity className="w-4 h-4 opacity-70" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {srv.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
