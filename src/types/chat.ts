export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  suggestedActions?: string[];
  referencedSchemes?: string[];
  documentChecklist?: string[];
  isRealApi?: boolean;
}

export interface GeminiResponse {
  text: string;
  suggestedActions?: string[];
  referencedSchemes?: string[];
  documentChecklist?: string[];
  isRealApi: boolean;
}

export interface DocumentAnalysisResult {
  summary: string;
  jargon: { term: string; explanation: string }[];
  importantDates: string[];
  actionItems: string[];
  warnings: string[];
}
