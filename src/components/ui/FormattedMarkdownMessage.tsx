'use client';

import React from 'react';

interface FormattedMarkdownMessageProps {
  content: string;
}

export const FormattedMarkdownMessage: React.FC<FormattedMarkdownMessageProps> = ({ content }) => {
  // Split into lines for structured rendering
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) return <div key={idx} className="h-1" />;

        // ### Header 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-3 mb-1 border-b border-slate-200/60 dark:border-slate-800 pb-1 flex items-center gap-2">
              {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }

        // #### Header 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300 mt-2 mb-1">
              {renderInlineMarkdown(trimmed.replace(/^####\s+/, ''))}
            </h4>
          );
        }

        // > Quote / Tip
        if (trimmed.startsWith('> ')) {
          return (
            <div key={idx} className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-500 text-blue-900 dark:text-blue-200 my-2 text-xs">
              {renderInlineMarkdown(trimmed.replace(/^>\s+/, ''))}
            </div>
          );
        }

        // Bullet point - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 text-slate-700 dark:text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span>{renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''))}</span>
            </div>
          );
        }

        // Numbered item 1. 2.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 text-slate-700 dark:text-slate-200">
              <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                {numMatch[1]}
              </span>
              <span>{renderInlineMarkdown(numMatch[2])}</span>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="text-slate-700 dark:text-slate-200">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

function renderInlineMarkdown(text: string): React.ReactNode[] {
  // Regex pattern for bold **text** and links [text](url)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // Check for link [title](url)
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);

    if (linkMatch && (!boldMatch || linkMatch.index! < boldMatch.index!)) {
      const preText = remaining.substring(0, linkMatch.index);
      if (preText) parts.push(<span key={keyIdx++}>{preText}</span>);

      parts.push(
        <a
          key={keyIdx++}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-500"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.substring(linkMatch.index! + linkMatch[0].length);
    } else if (boldMatch) {
      const preText = remaining.substring(0, boldMatch.index);
      if (preText) parts.push(<span key={keyIdx++}>{preText}</span>);

      parts.push(
        <strong key={keyIdx++} className="font-bold text-slate-900 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
    } else {
      parts.push(<span key={keyIdx++}>{remaining}</span>);
      break;
    }
  }

  return parts;
}
