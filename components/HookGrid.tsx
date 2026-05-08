'use client';

import { Hook } from '@/lib/types';
import HookCard from './HookCard';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface HookGridProps {
  hooks: Hook[];
  favoriteIds: Set<string>;
  onToggleFavorite: (hook: Hook) => void;
  onCopy: (hook: Hook) => Promise<void>;
}

export default function HookGrid({
  hooks,
  favoriteIds,
  onToggleFavorite,
  onCopy,
}: HookGridProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const copyAll = async () => {
    const text = hooks
      .map((h, i) => `${i + 1}. [${h.hook_type}] ${h.content}`)
      .join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Copy All Button */}
      <div className="flex justify-end">
        <button
          onClick={copyAll}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
                     transition-all duration-200 shadow-md
                     ${
                       copiedAll
                         ? 'bg-green-500 text-white'
                         : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg'
                     }`}
        >
          {copiedAll ? (
            <>
              <Check className="w-5 h-5" />
              已全部复制
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              一键复制全部
            </>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hooks.map((hook, index) => (
          <HookCard
            key={hook.id}
            hook={hook}
            index={index}
            isFavorite={favoriteIds.has(hook.id)}
            onToggleFavorite={() => onToggleFavorite(hook)}
            onCopy={() => onCopy(hook)}
          />
        ))}
      </div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-8 py-6 text-center"
      >
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
          {hooks.length}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          个 Hook 已生成
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
          {hooks.filter(h => h.click_score >= 80).length}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          个高点击率
        </div>
      </motion.div>
    </div>
  );
}