import { NextResponse } from 'next/server';

interface RateLimitStore {
  [ip: string]: { count: number; lastReset: number };
}

const rateLimitMap: RateLimitStore = {};
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap[ip];

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap[ip] = { count: 1, lastReset: now };
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .substring(0, 3000)
    .trim();
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before asking again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { prompt, lang = 'en', history = [] } = body;

    const cleanPrompt = sanitizeInput(prompt);
    if (!cleanPrompt) {
      return NextResponse.json(
        { error: 'Prompt text is required and cannot be empty.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length === 0) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server.' },
        { status: 503 }
      );
    }

    const systemInstruction = `You are CivicLens AI, an expert, compassionate Google Cloud AI Assistant for Indian Government Services, Welfare Schemes, Certificates, and Licenses. Target Language code: ${lang}.
RULES:
1. Respond clearly in the requested language (${lang}).
2. Use well-formatted Markdown with headings, bullet points, and numbered steps.
3. Be empathetic to low-literacy, rural, senior, student, or marginalized citizens.
4. Always include Eligibility, Required Documents, Step-by-Step guide, and official portal links when explaining a scheme.`;

    const formattedContents = [
      ...history.slice(-6).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: sanitizeInput(msg.content) }],
      })),
      {
        role: 'user',
        parts: [{ text: cleanPrompt }],
      },
    ];

    const modelsToTry = ['gemini-flash-latest', 'gemini-3.5-flash'];
    let responseData: string | null = null;
    let lastError: string | null = null;

    for (const model of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 1500,
              },
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              responseData = text;
              break;
            }
          } else {
            const errText = await res.text();
            lastError = `Model ${model} returned ${res.status}: ${errText}`;
            if ((res.status === 429 || res.status === 503) && attempt === 0) {
              await new Promise((r) => setTimeout(r, 1200));
              continue;
            }
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          lastError = `Model ${model} fetch failed: ${message}`;
        }
        break;
      }
      if (responseData) break;
    }

    if (responseData) {
      return NextResponse.json({
        text: responseData,
        isRealApi: true,
      });
    }

    return NextResponse.json(
      { error: 'Failed to generate response from Gemini API', details: lastError },
      { status: 502 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: message },
      { status: 500 }
    );
  }
}
