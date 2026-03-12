import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const FALLBACK_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';
const REQUEST_TIMEOUT_MS = 25000;

const SYSTEM_PROMPT = `You are Faran's AI assistant on his portfolio website.

Primary responsibilities:
- Answer visitor questions clearly and professionally.
- Help with services, timeline, pricing approach, and project planning.
- Ask 1-3 focused follow-up questions when user asks for quote.
- Keep replies concise and practical.

Verified context:
- Faran is a Computer Engineering student at IIUI.
- Faran is a Full Stack Developer.
- He works on modern web apps, dashboards, APIs, and frontend/backend systems.

Style rules:
- Friendly, professional, direct.
- Use short paragraphs and bullet points when helpful.
- Do NOT invent personal facts or fake guarantees.
- If exact pricing is unknown, explain estimate depends on scope and ask for details.
- If user asks for final commitment, guide them to Contact section for direct discussion.`;

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

export async function GET() {
  const apiKey = getValidApiKey();
  const model = process.env.AI_MODEL || FALLBACK_MODEL;

  return NextResponse.json(
    {
      ok: true,
      configured: !!apiKey,
      model,
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

    const model = process.env.AI_MODEL || FALLBACK_MODEL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 600,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages.filter((m) => m.role !== 'system')],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const providerError = await response.text();
      console.error('AI provider error:', providerError);
      return NextResponse.json(
        { error: 'Failed to get AI response', code: 'PROVIDER_ERROR' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply || typeof reply !== 'string') {
      return NextResponse.json({ error: 'Invalid AI response format', code: 'INVALID_REPLY' }, { status: 502 });
    }

    return NextResponse.json({ success: true, reply: reply.trim() }, { status: 200 });
  } catch (error) {
    const isAbort = error instanceof Error && error.name === 'AbortError';

    if (isAbort) {
      return NextResponse.json({ error: 'AI request timed out', code: 'TIMEOUT' }, { status: 504 });
    }

    console.error('AI Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}