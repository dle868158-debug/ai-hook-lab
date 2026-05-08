'use client';

import { Platform, ContentType, PLATFORMS, CONTENT_TYPES } from '@/lib/types';
import { Sparkles, Send } from 'lucide-react';
import { useState } from 'react';

interface HookInputProps {
  topic: string;
  setTopic: (value: string) => void;
  platform: Platform;
  setPlatform: (value: Platform) => void;
  contentType: ContentType;
  setContentType: (value: ContentType) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function HookInput({
  topic,
  setTopic,
  platform,
  setPlatform,
  contentType,
  setContentType,
  onSubmit,
  isLoading,
}: HookInputProps) {
  const [charCount, setCharCount] = useState(0);

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 200);
    setTopic(value);
    setCharCount(value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && topic.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入你的主题
          </label>
          <textarea
            value={topic}
            onChange={handleTopicChange}
            placeholder="例如：如何在30天内从零开始学习一门新技能？"
            className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20
                     transition-all duration-200 resize-none
                     min-h-[120px]"
            rows={3}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {charCount}/200
          </div>
        </div>

        {/* Platform Selection */}
        <div className="relative z-10">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            选择平台
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlatform(p.value)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center
                  ${
                    platform === p.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="text-sm font-medium">{p.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            内容类型
          </label>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct.value}
                type="button"
                onClick={() => setContentType(ct.value)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-2
                  ${
                    contentType === ct.value
                      ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-600 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <span>{ct.icon}</span>
                <span className="text-sm font-medium">{ct.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg
                     flex items-center justify-center gap-3 transition-all duration-200
                     ${
                       isLoading || !topic.trim()
                         ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                         : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                     }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>生成中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>生成 10 个 Hook</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}