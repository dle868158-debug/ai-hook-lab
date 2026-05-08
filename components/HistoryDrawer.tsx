'use client';

import { HistoryItem } from '@/lib/types';
import { X, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onLoad,
  onDelete,
  onClear,
}: HistoryDrawerProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  const getPlatformLabel = (platform: string) => {
    const labels: Record<string, string> = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      bilibili: 'B站',
      youtube: 'YouTube',
      x: 'X',
    };
    return labels[platform] || platform;
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900
                   shadow-2xl z-50 flex flex-col ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">历史记录</h2>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="p-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                清空
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">暂无历史记录</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">生成的内容会自动保存到这里</p>
            </div>
          ) : (
            history.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-800
                          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => onLoad(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50
                                   text-primary-700 dark:text-primary-300">
                      {getPlatformLabel(item.platform)}
                    </span>
                    <span className="text-xs text-gray-400">{formatTime(item.timestamp)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100
                              transition-all rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {item.topic}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.hooks.length} 个 Hook
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}