import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const FALLBACK_MODEL = 'google/gemma-3-4b-it:free';
const EXTRA_FALLBACK_MODELS = [
  'google/gemma-3-12b-it:free',
  'liquid/lfm-2.5-1.2b-instruct:free',
  'stepfun/step-3.5-flash:free',
];
const REQUEST_TIMEOUT_MS = 25000;

const SYSTEM_PROMPT = `You are Faran's AI assistant on his portfolio website.

Primary responsibilities:
- Provide helpful, accurate answers like a real AI assistant.
- Help visitors with services, timelines, pricing approach, and project planning.
- Ask 1-3 focused follow-up questions only when needed (especially for custom quotes).
- Keep answers practical, clear, and action-oriented.

Verified context:
- Faran is a Computer Engineering student at IIUI.
- Faran is a Full Stack Developer.
- He builds modern web apps, dashboards, APIs, and frontend/backend systems.

Behavior rules:
- If question is portfolio-related, answer with this context.
- If question is general (not portfolio-specific), still answer helpfully as a normal AI assistant.
- Mirror the user's language style (English/Urdu/Roman Urdu) when reasonable.
- If user sends very short confirmations like "yes", "ok", "haan", infer context from previous assistant message and continue naturally.
- Do NOT invent fake personal facts, fake guarantees, or fake numbers.
- If exact pricing is unknown, explain that estimate depends on scope and ask key details.
- If user asks to hire or proceed, guide to Contact section briefly.

Formatting style:
- Prefer short paragraphs.
- Use bullet points for steps/checklists.
- Avoid unnecessarily long responses unless user asks for detail.`;

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== 'object') return false;
      const maybeMessage = message as Partial<ChatMessage>;
      return (
        typeof maybeMessage.content === 'string' &&
        (maybeMessage.role === 'user' || maybeMessage.role === 'assistant' || maybeMessage.role === 'system')
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-12);
}

function getValidApiKey(): string | null {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const hasValidKey = !!apiKey && apiKey.length > 20 && !apiKey.includes('your_openrouter_api_key_here');
  return hasValidKey ? apiKey : null;
}

function getModelOrder(): string[] {
  const preferredModel = process.env.AI_MODEL?.trim() || FALLBACK_MODEL;
  const models = [preferredModel, FALLBACK_MODEL, ...EXTRA_FALLBACK_MODELS];
  return Array.from(new Set(models.filter(Boolean)));
}

export async function GET() {
  const apiKey = getValidApiKey();
  const models = getModelOrder();

  return NextResponse.json(
    {
      ok: true,
      configured: !!apiKey,
      model: models[0],
      fallbackModel: models[1] || null,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = sanitizeMessages(body?.messages);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'At least one valid message is required', code: 'INVALID_MESSAGES' },
        { status: 400 }
      );
    }

    const apiKey = getValidApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service is not configured', code: 'AI_NOT_CONFIGURED' },
        { status: 503 }
      );
    }

    const models = getModelOrder();
    let lastProviderError = 'Unknown provider error';

    for (const model of models) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'Faran Portfolio AI Assistant',
          },
          body: JSON.stringify({
            model,
            temperature: 0.35,
            top_p: 0.9,
            max_tokens: 600,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages.filter((m) => m.role !== 'system')],
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          lastProviderError = await response.text();
          console.error(`AI provider error for model ${model}:`, lastProviderError);
          continue;
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content;

        if (!reply || typeof reply !== 'string') {
          lastProviderError = 'Invalid AI response format';
          continue;
        }

        return NextResponse.json({ success: true, reply: reply.trim(), modelUsed: model }, { status: 200 });
      } catch (providerError) {
        clearTimeout(timeout);
        const isAbort = providerError instanceof Error && providerError.name === 'AbortError';
        if (isAbort) {
          lastProviderError = `Model ${model} timed out`;
          continue;
        }

        lastProviderError = providerError instanceof Error ? providerError.message : 'Provider request failed';
        console.error(`AI provider exception for model ${model}:`, providerError);
        continue;
      }
    }

    console.error('All configured AI models failed. Last error:', lastProviderError);
    return NextResponse.json(
      { error: 'Failed to get AI response', code: 'PROVIDER_ERROR' },
      { status: 502 }
    );
  } catch (error) {
    const isAbort = error instanceof Error && error.name === 'AbortError';

    if (isAbort) {
      return NextResponse.json({ error: 'AI request timed out', code: 'TIMEOUT' }, { status: 504 });
    }

    console.error('AI Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}