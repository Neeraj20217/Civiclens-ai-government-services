'use client';

import React from 'react';
import {
  MessageSquare,
  Compass,
  CheckCircle2,
  FileCheck,
  FileText,
  Globe,
  Mic,
  LayoutDashboard,
  ListTodo,
  MapPin,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FeatureHighlightsProps {
  onSelectFeature: (tabId: string) => void;
}

export const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'assistant',
      title: '1. AI Government Assistant (CivicBot)',
      desc: 'Conversational AI powered by Gemini 2.5 Flash. Natural language answers to scheme eligibility, document requirements, and procedure steps.',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-600',
      tag: 'Gemini 2.5 Multi-turn'
    },
    {
      id: 'matcher',
      title: '2. Smart Scheme Recommendation Engine',
      desc: 'Multi-criteria matching algorithm considering Age, State, Occupation, Income, Education, and Disability to surface 100% tailored schemes.',
      icon: Compass,
      color: 'from-indigo-500 to-purple-600',
      tag: 'Match Algorithm'
    },
    {
      id: 'eligibility',
      title: '3. Deep Eligibility Checker & Evaluator',
      desc: 'Pick any central or state scheme to complete targeted dynamic QA. Returns precise verdict (Eligible, Conditional, Ineligible) with reasoning.',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Verdict & Reasoning'
    },
    {
      id: 'checklist',
      title: '4. Document Checklist Generator',
      desc: 'Customizable document checklists for 15+ government services (Passport, Driving Licence, Caste Cert, Startup India) with PDF & Print export.',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-600',
      tag: 'PDF & Print Export'
    },
    {
      id: 'explainer',
      title: '5. Government Document & GR Explainer',
      desc: 'Upload PDFs or government notices. Gemini OCR extracts plain-language summaries, translates legal terminology, and highlights deadlines.',
      icon: FileText,
      color: 'from-sky-500 to-blue-600',
      tag: 'Jargon Decoder'
    },
    {
      id: 'assistant',
      title: '6. Multilingual Engine (8 Native Languages)',
      desc: 'Supports English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, and Marathi with natural AI translations and local script UI.',
      icon: Globe,
      color: 'from-purple-500 to-pink-600',
      tag: '8 Native Languages'
    },
    {
      id: 'assistant',
      title: '7. Voice Assistant (Speech STT & TTS)',
      desc: 'Hands-free voice recognition input and high-quality speech synthesis audio narration for citizens with low literacy or visual impairments.',
      icon: Mic,
      color: 'from-rose-500 to-red-600',
      tag: 'Hands-free Audio'
    },
    {
      id: 'dashboard',
      title: '8. Citizen Personal Dashboard',
      desc: 'Centralized vault to save bookmarked schemes, track application progress, view past eligibility reports, and download document checklists.',
      icon: LayoutDashboard,
      color: 'from-cyan-500 to-blue-600',
      tag: 'Personal Vault'
    },
    {
      id: 'actionplan',
      title: '9. AI-Generated Action Plan Roadmap',
      desc: 'Visual execution timeline breaking goals into Step 1, Step 2, Step 3 with estimated fees, issuing offices, and completion checkboxes.',
      icon: ListTodo,
      color: 'from-teal-500 to-emerald-600',
      tag: 'Step-by-Step Gantt'
    },
    {
      id: 'offices',
      title: '10. Nearby Government Office Finder',
      desc: 'Interactive map locator finding nearest Passport Seva Kendras, RTOs, MeeSeva / CSC centers, Municipality offices, and Tahsildars.',
      icon: MapPin,
      color: 'from-blue-600 to-indigo-700',
      tag: 'Interactive Map'
    },
    {
      id: 'assistant',
      title: '11. AI Semantic Search Engine',
      desc: 'Powered by Gemini embeddings vector search, allowing citizens to search by intent rather than rigid administrative keywords.',
      icon: Search,
      color: 'from-indigo-600 to-blue-700',
      tag: 'Vertex AI Embeddings'
    },
    {
      id: 'analytics',
      title: '12. BigQuery Telemetry & Analytics Hub',
      desc: 'Real-time analytics portal tracking search volume trends, language distribution, top requested schemes, and citizen satisfaction scores.',
      icon: Sparkles,
      color: 'from-amber-600 to-yellow-500',
      tag: 'BigQuery Data'
    }
  ];

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Capabilities</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            12 Power Features Building the Future of Civic Access
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered to feel like a flagship Google Cloud AI product — intuitive, accessible, fast, and reliable.
          </p>
        </div>

        {/* Grid of 12 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => onSelectFeature(item.id)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
