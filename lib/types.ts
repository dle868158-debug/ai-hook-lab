// Type definitions for AI Hook Lab

export type Platform = 'xiaohongshu' | 'douyin' | 'bilibili' | 'youtube' | 'x' | 'instagram';
export type ContentType = 'video' | 'image' | 'ad' | 'tutorial' | 'opinion';

export interface Hook {
  id: string;
  hook_type: string;
  content: string;
  style_tags: string[];
  click_score: number;
  reason: string;
}

export interface HistoryItem {
  id: string;
  topic: string;
  platform: Platform;
  contentType: ContentType;
  hooks: Hook[];
  timestamp: number;
}

export interface GenerateRequest {
  topic: string;
  platform: Platform;
  contentType: ContentType;
}

export interface GenerateResponse {
  hooks: Hook[];
  error?: string;
}

export interface PlatformOption {
  value: Platform;
  label: string;
  icon: string;
  description: string;
}

export interface ContentTypeOption {
  value: ContentType;
  label: string;
  icon: string;
  description: string;
}

export const PLATFORMS: PlatformOption[] = [
  { value: 'xiaohongshu', label: '小红书', icon: '📕', description: '种草、分享、生活方式' },
  { value: 'douyin', label: '抖音', icon: '🎵', description: '短视频、娱乐、热点' },
  { value: 'bilibili', label: 'B站', icon: '📺', description: '深度内容、二次元、知识' },
  { value: 'youtube', label: 'YouTube', icon: '🌐', description: '长视频、教程、vlog' },
  { value: 'x', label: 'X (Twitter)', icon: '✖', description: '短文、热点、观点' },
  { value: 'instagram', label: 'Instagram', icon: '📷', description: '视觉、生活方式、Reels' },
];

export const CONTENT_TYPES: ContentTypeOption[] = [
  { value: 'video', label: '视频', icon: '🎬', description: '视频标题/开场白' },
  { value: 'image', label: '图文', icon: '🖼', description: '图文笔记标题' },
  { value: 'ad', label: '产品广告', icon: '📣', description: '广告文案' },
  { value: 'tutorial', label: '教程', icon: '📚', description: '教学类内容' },
  { value: 'opinion', label: '观点帖', icon: '💭', description: '个人观点输出' },
];

export const HOOK_TYPES = [
  '悬念型',
  '数字型',
  '情绪型',
  '对比型',
  '问答型',
  '命令型',
  '蹭热点型',
  '揭秘型',
  '故事型',
  '利益型',
] as const;

export type HookType = typeof HOOK_TYPES[number];