'use client';

import React from 'react';
import { Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CivicLens AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering citizens across India with personalized, multilingual AI guidance for government services, schemes, legal documents, and office procedures.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-blue-400 font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>Google Cloud AI Showcase Project</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">AI Capabilities</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Gemini 2.5 Multi-turn Assistant</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>Vertex AI Semantic Scheme Search</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Jargon Decoder &amp; GR Document Explainer</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>8-Language STT / TTS Voice Assistant</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Google Cloud Architecture</h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li className="flex items-center justify-between">
                <span>Generative AI:</span>
                <span className="text-blue-400">Gemini 2.5 Flash</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Vector Search:</span>
                <span className="text-indigo-400">Vertex AI Search</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Database:</span>
                <span className="text-amber-400">Cloud Firestore</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Analytics:</span>
                <span className="text-emerald-400">BigQuery Telemetry</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Deployment:</span>
                <span className="text-sky-400">Google Cloud Run</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Official Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://myscheme.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>myScheme Portal (Government of India)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cloud.google.com/vertex-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Google Cloud Vertex AI</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>CivicLens AI &bull; Built for Google Meet the Builders Showcase</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy &amp; Security</span>
            <span>Terms of Service</span>
            <span>Accessibility (WCAG 2.1)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
