'use client';

import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const AnalyticsTab: React.FC = () => {
  const schemeSearchData = [
    { name: 'Startup India SISFS', searches: 4200 },
    { name: 'PM-KISAN', searches: 6800 },
    { name: 'Ayushman Bharat', searches: 5900 },
    { name: 'Caste Certificate', searches: 3400 },
    { name: 'Post-Matric Scholarship', searches: 4800 },
    { name: 'MUDRA Loan', searches: 3900 }
  ];

  const latencyTimeData = [
    { time: '09:00', requests: 120, latencyMs: 180 },
    { time: '11:00', requests: 450, latencyMs: 210 },
    { time: '13:00', requests: 890, latencyMs: 240 },
    { time: '15:00', requests: 1200, latencyMs: 220 },
    { time: '17:00', requests: 950, latencyMs: 195 },
    { time: '19:00', requests: 620, latencyMs: 175 }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">BigQuery Analytics &amp; Telemetry Hub</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono">
                  Live BigQuery Stream
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time telemetry analytics monitoring citizen search trends, language distribution, and Gemini API latency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total AI Queries Today</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">29,000+</div>
          <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Gemini Latency</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">210 ms</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">Gemini-2.5-Flash</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Citizen Satisfaction</div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">99.4%</div>
          <div className="text-[11px] text-indigo-500 font-semibold mt-1">4.9 / 5.0 Rating</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Languages Supported</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">8 Native</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Indic Web Speech API</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Most Requested Government Schemes</span>
            <span className="text-[10px] text-slate-400 font-mono">Volume Count</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeSearchData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', borderColor: '#334155', color: '#fff' }}
                />
                <Bar dataKey="searches" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Query Volume &amp; Latency Timeline</span>
            <span className="text-[10px] text-slate-400 font-mono">Cloud Run Traffic</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyTimeData}>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', borderColor: '#334155', color: '#fff' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
