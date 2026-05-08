import { Platform, ContentType } from './types';

interface PromptContext {
  platform: Platform;
  contentType: ContentType;
  topic: string;
}

const platformDescriptions: Record<Platform, string> = {
  xiaohongshu: '小红书：口语化、亲切、有温度，擅长种草和分享。标题要有代入感，emoji 丰富，鼓励点赞收藏。',
  douyin: '抖音：节奏快、抓眼球、有冲击感。前3秒决定成败，标题要让人停下来。简短有力，制造悬念或情绪。',
  bilibili: 'B站：深度内容、知识性强，用户愿意看长内容。标题可以有梗、玩梗，但核心信息要清晰。',
  youtube: 'YouTube：标题要有信息量、具体、可点击。YouTube 算法依赖标题+缩略图，标题要能概括核心价值。',
  x: 'X (Twitter)：极短、极有力、信息密度高。140字限制，标题要一针见血，有观点有态度。',
  instagram: 'Instagram：视觉优先、生活方式感强，Reels和Stories节奏快。标题要简洁有美感，配合视觉内容，善用hashtag思维，吸引互动。',
};

const contentTypeDescriptions: Record<ContentType, string> = {
  video: '视频：用于视频开场白或标题。要有画面感，能激发好奇心，让人想点进来。',
  image: '图文：用于图文笔记的标题。要有干货感，让人觉得收藏了就是赚到了。',
  ad: '产品广告：用于推广产品或服务。要有说服力，突出卖点，让人产生购买冲动。',
  tutorial: '教程：用于教学类内容。要有针对性，让人觉得学会了这个技能就能解决某个问题。',
  opinion: '观点帖：用于输出个人看法和观点。要有态度、有立场，能引发讨论和共鸣。',
};

const hookTypeExamples: Record<string, string> = {
  '悬念型': '例子："99%的人都不知道的XX秘密"',
  '数字型': '例子："3个技巧让你XX效率翻倍"',
  '情绪型': '例子："被XX支配的恐惧，你中招了吗？"',
  '对比型': '例子："普通人和高手之间，只差XX"',
  '问答型': '例子："XX是怎么一步步毁掉你的？"',
  '命令型': '例子："千万别XX，否则你会后悔"',
  '蹭热点型': '例子："从XX事件看XX现象"',
  '揭秘型': '例子："XX内部人揭秘XX真相"',
  '故事型': '例子："我XX年的XX经历，改变了XX"',
  '利益型': '例子："XX天学会XX，这套方法收好了"',
};

function buildSystemPrompt(): string {
  const hookTypesList = Object.entries(hookTypeExamples)
    .map(([type, example]) => `- ${type}：${example}`)
    .join('\n');

  return `你是"AI Hook Lab"的AI内容策划专家，专门帮内容创作者生成爆款标题和开场白。

## 你的能力
- 精通各大内容平台的算法和用户心理
- 深谙爆款内容的底层逻辑
- 能够根据不同平台和内容类型，生成最合适的标题

## Hook类型库
${hookTypesList}

## 输出要求
你必须返回格式正确的JSON数组，包含10个不同风格的hook。
每个hook必须包含以下字段：
- hook_type: hook类型（从上面10种类型中选择）
- content: hook文案内容（25-50字，中文，越有冲击力越好）
- style_tags: 2-3个风格标签，如["情绪共鸣", "数字冲击", "悬念引导"]
- click_score: 点击欲评分（1-100，基于hook的吸引力、平台适配度、情绪触发力）
- reason: 推荐理由（50字以内，说明为什么这个hook能爆）

## 关键原则
1. 10个hook必须风格多样，不能重复类型
2. 每个hook都要符合目标平台的调性
3. 文案要有画面感、情绪感，让人忍不住想点
4. click_score要真实评估，不要都打高分
5. reason要具体指出hook的爆点在哪里`;
}

function buildUserPrompt(context: PromptContext): string {
  const platformDesc = platformDescriptions[context.platform];
  const contentTypeDesc = contentTypeDescriptions[context.contentType];

  return `## 任务
为以下主题生成10个爆款hook：

**主题：** ${context.topic}
**目标平台：** ${platformDesc}
**内容类型：** ${contentTypeDesc}

请生成10个不同风格的hook，确保类型多样、文案有冲击力。

**重要：只返回纯JSON数组，不要包含任何其他文字、解释或markdown格式。直接以[开头，以]结尾。**`;
}

export function buildPrompt(topic: string, platform: Platform, contentType: ContentType): { system: string; user: string } {
  return {
    system: buildSystemPrompt(),
    user: buildUserPrompt({ platform, contentType, topic }),
  };
}

export const JSON_SCHEMA = {
  type: 'object',
  properties: {
    hooks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          hook_type: { type: 'string' },
          content: { type: 'string' },
          style_tags: { type: 'array', items: { type: 'string' } },
          click_score: { type: 'number' },
          reason: { type: 'string' },
        },
        required: ['hook_type', 'content', 'style_tags', 'click_score', 'reason'],
      },
    },
  },
  required: ['hooks'],
};