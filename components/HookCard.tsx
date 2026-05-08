'use client';

import { Hook } from '@/lib/types';
import { Copy, Check, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface HookCardProps {
  hook: Hook;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onCopy: () => void;
}

export default function HookCard({
  hook,
  index,
  isFavorite,
  onToggleFavorite,
  onCopy,
}: HookCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700
                 p-6 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600
                 transition-all duration-300"
    >
      {/* Header: Hook Type Badge + Score */}
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold
                        bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50
                        text-primary-700 dark:text-primary-300">
          {hook.hook_type}
        </span>

        {/* Click Score */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getScoreBg(hook.click_score)}`}>
          <Star className={`w-4 h-4 ${getScoreColor(hook.click_score)} fill-current`} />
          <span className={`text-sm font-bold ${getScoreColor(hook.click_score)}`}>
            {hook.click_score}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div
        onClick={handleCopy}
        className="cursor-pointer mb-4"
      >
        <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed
                     group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {hook.content}
        </p>
      </div>

      {/* Style Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {hook.style_tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-full text-xs font-medium
                      bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Reason */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">推荐理由：</span>
          {hook.reason}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                     text-sm font-medium transition-all duration-200
                     ${
                       copied
                         ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                         : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                     }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? '已复制' : '复制'}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`p-2.5 rounded-lg transition-all duration-200
            ${
              isFavorite
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-red-500'
            }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Index Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500
                      flex items-center justify-center text-white text-sm font-bold shadow-lg">
        {index + 1}
      </div>
    </motion.div>
  );
}