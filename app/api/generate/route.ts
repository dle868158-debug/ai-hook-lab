import { NextResponse } from 'next/server';
import { buildPrompt } from '@/lib/prompt';
import { nanoid } from 'nanoid';

// Rate limiting map (simple in-memory, will reset on cold starts)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || 0;

  if (requests >= MAX_REQUESTS) {
    return false;
  }

  rateLimitMap.set(ip, requests + 1);

  // Clean up old entries
  setTimeout(() => {
    const current = rateLimitMap.get(ip);
    if (current && current > 0) {
      rateLimitMap.set(ip, current - 1);
    }
  }, RATE_LIMIT_WINDOW);

  return true;
}

interface Hook {
  id: string;
  hook_type: string;
  content: string;
  style_tags: string[];
  click_score: number;
  reason: string;
}

interface GenerateBody {
  topic: string;
  platform: string;
  contentType: string;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .trim()
    .slice(0, 200); // Limit length
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '请求过于频繁，请稍后再试' },
        { status: 429 }
      );
    }

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key 未配置，请在服务器环境变量中设置 ANTHROPIC_API_KEY' },
        { status: 500 }
      );
    }

    // Parse body
    let body: GenerateBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: '请求格式错误' },
        { status: 400 }
      );
    }

    const { topic, platform, contentType } = body;

    // Validate inputs
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入主题内容' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTopic = sanitizeInput(topic);
    const sanitizedPlatform = sanitizeInput(platform);
    const sanitizedContentType = sanitizeInput(contentType);

    // Build prompts
    const { system, user } = buildPrompt(
      sanitizedTopic,
      sanitizedPlatform as any,
      sanitizedContentType as any
    );

    // Call Anthropic API via proxy
    const response = await fetch('https://api.mirrorstages.com/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        system,
        messages: [{ role: 'user', content: user }],
      }),
    });

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API Key 无效或已过期，请检查配置' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'API 调用频率超限，请稍后重试' },
          { status: 429 }
        );
      }

      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'AI 服务暂时不可用，请稍后重试' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return NextResponse.json(
        { error: 'AI 返回内容为空，请重试' },
        { status: 500 }
      );
    }

    // Parse JSON response
    let hooks: Hook[];
    try {
      // Try to extract JSON from the response
      let jsonStr = content.trim();

      // Remove markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith('```')) {
        jsonStr = jsonStr.slice(0, -3);
      }
      jsonStr = jsonStr.trim();

      // If response contains mixed content, extract the JSON array/object
      if (!jsonStr.startsWith('[') && !jsonStr.startsWith('{')) {
        const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
        const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
        if (arrayMatch) {
          jsonStr = arrayMatch[0];
        } else if (objectMatch) {
          jsonStr = objectMatch[0];
        }
      } else if (jsonStr.startsWith('[')) {
        // Find the closing bracket of the array (ignore trailing text)
        let depth = 0;
        let endIdx = -1;
        for (let i = 0; i < jsonStr.length; i++) {
          if (jsonStr[i] === '[') depth++;
          else if (jsonStr[i] === ']') {
            depth--;
            if (depth === 0) { endIdx = i; break; }
          }
        }
        if (endIdx > 0) jsonStr = jsonStr.slice(0, endIdx + 1);
      }
      jsonStr = jsonStr.trim();

      const parsed = JSON.parse(jsonStr);

      // Handle both { hooks: [...] } and [...] formats
      hooks = Array.isArray(parsed) ? parsed : parsed.hooks;

      if (!Array.isArray(hooks) || hooks.length === 0) {
        throw new Error('Invalid hooks format');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', content);
      return NextResponse.json(
        { error: 'AI 返回格式解析失败，请重试' },
        { status: 500 }
      );
    }

    // Validate and normalize hooks
    const normalizedHooks: Hook[] = hooks.slice(0, 10).map((hook: any) => ({
      id: nanoid(),
      hook_type: hook.hook_type || hook.style || hook.type || '通用型',
      content: hook.content || hook.hook || hook.text || '',
      style_tags: Array.isArray(hook.style_tags) ? hook.style_tags : (Array.isArray(hook.tags) ? hook.tags : []),
      click_score: typeof hook.click_score === 'number'
        ? Math.min(100, Math.max(1, hook.click_score))
        : (typeof hook.score === 'number' ? Math.min(100, Math.max(1, hook.score)) : Math.floor(Math.random() * 30) + 60),
      reason: hook.reason || hook.description || hook.why || '推荐使用',
    }));

    return NextResponse.json({ hooks: normalizedHooks });

  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: '服务器发生错误，请重试' },
      { status: 500 }
    );
  }
}