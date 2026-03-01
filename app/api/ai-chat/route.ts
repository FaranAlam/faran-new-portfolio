import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const FALLBACK_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

const SYSTEM_PROMPT = `You are Faran's AI assistant for his portfolio website.

Goals:
- Help visitors understand services, pricing, timelines, and how to start.
- Be concise, professional, and friendly.
- If user asks for exact project quote, ask for project scope (features, timeline, budget).
- Encourage users to contact through the website for final quote.

Known context:
- Faran is a Computer Engineering student at IIUI.
- He is a Full Stack Developer.
- He works on web apps, dashboards, APIs, and modern frontend/backend stacks.

Style:
- Keep answers practical and clear.
- Prefer short paragraphs and bullets when useful.
- Do not invent personal details beyond provided context.`;

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = sanitizeMessages(body?.messages);

    if (messages.length === 0) {
      return NextResponse.json({ error: 'At least one valid message is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const hasValidKey =
      !!apiKey &&
      apiKey.length > 20 &&
      !apiKey.includes('your_openrouter_api_key_here');

    if (!hasValidKey) {
      return NextResponse.json(
        { error: 'AI service is not configured. Add a valid OPENROUTER_API_KEY in .env.local.' },
        { status: 400 }
      );
    }

    const model = process.env.AI_MODEL || FALLBACK_MODEL;

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
        temperature: 0.7,
        max_tokens: 500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.filter((message) => message.role !== 'system'),
        ],
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error('AI provider error:', providerError);
      return NextResponse.json({ error: 'Failed to get AI response' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply || typeof reply !== 'string') {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 });
    }

    return NextResponse.json({ success: true, reply: reply.trim() }, { status: 200 });
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
