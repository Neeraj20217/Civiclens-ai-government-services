'use client';

import React from 'react';

export const SkeletonLoader: React.FC<{ type?: 'card' | 'list' | 'analytics' }> = ({ type = 'card' }) => {
  if (type === 'analytics') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6 animate-pulse">
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4 animate-pulse">
      <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
    </div>
  );
};
