import { SupportedLanguage, LANGUAGES } from './translations';
import { getCustomGeminiApiKey } from './gemini';
import { DynamicSchemeForm, AiErrorDiagnosis } from '@/types/dynamic-form';

/**
 * Generate a dynamic scheme form with fields, document checklist, and action steps
 */
export async function generateDynamicSchemeForm(
  serviceName: string,
  lang: SupportedLanguage = 'en'
): Promise<DynamicSchemeForm> {
  const targetLang = LANGUAGES.find((l) => l.code === lang)?.name || 'English';

  const prompt = `Act as an expert Indian Government Services Architect. The user wants to apply for or understand the government service or scheme: "${serviceName}".
Generate a complete, structured application specification in JSON format.
Language for labels and descriptions: ${targetLang}.

Return ONLY valid JSON matching this exact JSON schema:
{
  "schemeId": "string-slug",
  "schemeTitle": "Official Service Name in ${targetLang}",
  "department": "Government Department Name",
  "category": "Welfare / Certificate / License / Subsidy / Business",
  "description": "Clear 2-sentence summary of the scheme in ${targetLang}",
  "eligibilityCriteria": ["Criterion 1", "Criterion 2", "Criterion 3"],
  "formFields": [
    {
      "id": "field_id",
      "label": "Field Label in ${targetLang}",
      "type": "text | number | select | date | checkbox | textarea",
      "placeholder": "Sample input value",
      "required": true,
      "options": [{ "label": "Option 1", "value": "opt1" }],
      "helperText": "Helpful guidance for low literacy citizens"
    }
  ],
  "requiredDocuments": [
    {
      "id": "doc_id",
      "name": "Document Name in ${targetLang}",
      "description": "Where to get it or what it proves",
      "isMandatory": true,
      "acceptedFormats": ["PDF", "JPG"],
      "maxMb": 5
    }
  ],
  "actionSteps": [
    {
      "stepNumber": 1,
      "title": "Step Title in ${targetLang}",
      "description": "Step instruction",
      "estimatedTime": "10 minutes",
      "officialPortalUrl": "https://india.gov.in"
    }
  ]
}`;

  try {
    const apiRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, lang }),
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.text) {
        const parsed = parseJsonFromText(data.text);
        if (parsed && parsed.schemeTitle) {
          return {
            ...(parsed as unknown as DynamicSchemeForm),
            generatedAt: new Date().toISOString(),
          };
        }
      }
    }
  } catch (err) {
    console.warn('Server API route fetch failed for dynamic form, checking direct key:', err);
  }

  const userKey = getCustomGeminiApiKey();
  if (userKey) {
    try {
      const directRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );
      if (directRes.ok) {
        const result = await directRes.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = parseJsonFromText(rawText);
          if (parsed && parsed.schemeTitle) {
            return {
              ...(parsed as unknown as DynamicSchemeForm),
              generatedAt: new Date().toISOString(),
            };
          }
        }
      }
    } catch (e) {
      console.warn('Direct Gemini call failed:', e);
    }
  }

  // Fallback default dynamic form if API is offline
  return generateFallbackDynamicForm(serviceName, lang);
}

/**
 * Diagnose client errors using Gemini AI
 */
export async function diagnoseWebsiteError(
  errorMessage: string,
  componentStack: string,
  lang: SupportedLanguage = 'en'
): Promise<AiErrorDiagnosis> {
  const targetLang = LANGUAGES.find((l) => l.code === lang)?.name || 'English';

  const prompt = `You are CivicLens AI Self-Healing Diagnostic Engine.
A client runtime error occurred in the website:
Error Message: "${errorMessage}"
Component Stack: "${componentStack.slice(0, 300)}"

Explain this error sympathetically to the user in ${targetLang} and provide 3 immediate recovery steps.
Return ONLY valid JSON matching this schema:
{
  "errorCause": "Brief technical cause",
  "userFriendlyExplanation": "Clear, friendly explanation in ${targetLang}",
  "suggestedAction": "Primary action button text in ${targetLang}",
  "recoverySteps": ["Step 1", "Step 2", "Step 3"],
  "isRecoverable": true
}`;

  try {
    const apiRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, lang }),
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.text) {
        const parsed = parseJsonFromText(data.text);
        if (parsed && parsed.userFriendlyExplanation) {
          return parsed as unknown as AiErrorDiagnosis;
        }
      }
    }
  } catch (err) {
    console.warn('Error diagnosis API call failed:', err);
  }

  return {
    errorCause: 'Temporary Browser State Mismatch',
    userFriendlyExplanation:
      lang === 'hi'
        ? 'वेबसाइट में एक अस्थायी समस्या आई है। हम इसे आसानी से ठीक कर सकते हैं।'
        : lang === 'ta'
        ? 'வலைத்தளத்தில் தற்காலிகப் பிழை ஏற்பட்டது. பக்கத்தைப் புதுப்பித்து சரிசெய்யலாம்.'
        : 'A temporary display glitch occurred. You can safely reload or reset application state to continue.',
    suggestedAction: lang === 'hi' ? 'पुनः लोड करें' : lang === 'ta' ? 'புதுப்பிக்கவும்' : 'Reload Page',
    recoverySteps: [
      'Click Reload Page to refresh the current view.',
      'If the issue persists, clear local cache using the Reset State button.',
      'Your saved bookmarks and API key settings remain safe.',
    ],
    isRecoverable: true,
  };
}

function parseJsonFromText(text: string): Record<string, unknown> | null {
  try {
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn('Failed to parse JSON from Gemini response:', e);
    return null;
  }
}

function generateFallbackDynamicForm(serviceName: string, lang: SupportedLanguage): DynamicSchemeForm {
  const isHindi = lang === 'hi';
  const isTamil = lang === 'ta';

  return {
    schemeId: serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    schemeTitle: serviceName,
    department: isHindi ? 'राज्य एवं केंद्रीय सेवा विभाग' : isTamil ? 'அரசு தன்னாட்சித் துறை' : 'Department of Public Services',
    category: 'Welfare & Licensing',
    description: isHindi
      ? `${serviceName} के लिए ऑनलाइन आवेदन प्रपत्र और आवश्यक दस्तावेजों की सूची।`
      : isTamil
      ? `${serviceName} விண்ணப்பப் படிவம் மற்றும் தேவையான ஆவணப் பட்டியல்.`
      : `AI-Generated Application Specification for ${serviceName}.`,
    eligibilityCriteria: [
      isHindi ? 'भारत का नागरिक होना आवश्यक है' : isTamil ? 'இந்தியக் குடிமகனாக இருக்க வேண்டும்' : 'Must be a citizen of India',
      isHindi ? 'वैध पहचान पत्र (आधार / पैन) अनिवार्य' : isTamil ? 'செல்லுபடியாகும் அடையாளச் சான்று (ஆதார்)' : 'Valid Govt Identity Card (Aadhaar/PAN)',
    ],
    formFields: [
      {
        id: 'applicant_name',
        label: isHindi ? 'आवेदक का पूरा नाम' : isTamil ? 'விண்ணப்பதாரரின் முழுப் பெயர்' : 'Full Name of Applicant',
        type: 'text',
        placeholder: 'e.g. Rajesh Kumar',
        required: true,
        helperText: 'As printed on Aadhaar Card',
      },
      {
        id: 'mobile_number',
        label: isHindi ? 'मोबाइल नंबर (आधार से लिंक)' : isTamil ? 'கைப்பேசி எண்' : 'Mobile Number (Aadhaar-Linked)',
        type: 'number',
        placeholder: '10-digit Mobile Number',
        required: true,
      },
      {
        id: 'income_slab',
        label: isHindi ? 'वार्षिक आय सीमा' : isTamil ? 'ஆண்டு வருமானம்' : 'Annual Family Income',
        type: 'select',
        required: true,
        options: [
          { label: 'Below ₹1,00,000 (Low Income)', value: 'below_1l' },
          { label: '₹1,00,000 - ₹3,00,000', value: '1l_3l' },
          { label: 'Above ₹3,00,000', value: 'above_3l' },
        ],
      },
    ],
    requiredDocuments: [
      {
        id: 'doc_aadhaar',
        name: 'Aadhaar Card Copy',
        description: 'Identity & Address Proof',
        isMandatory: true,
        acceptedFormats: ['PDF', 'JPG'],
        maxMb: 2,
      },
      {
        id: 'doc_income',
        name: 'Income Certificate / Ration Card',
        description: 'Proof of income status',
        isMandatory: true,
        acceptedFormats: ['PDF'],
        maxMb: 5,
      },
    ],
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Verify Aadhaar & Mobile Link',
        description: 'Ensure mobile number is linked for OTP authentication.',
        estimatedTime: '5 mins',
        officialPortalUrl: 'https://uidai.gov.in',
      },
      {
        stepNumber: 2,
        title: 'Submit Application on Official Portal',
        description: 'Fill details and upload scanned copies of mandatory documents.',
        estimatedTime: '15 mins',
        officialPortalUrl: 'https://india.gov.in',
      },
    ],
    generatedAt: new Date().toISOString(),
  };
}
