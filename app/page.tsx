'use client';

import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Platform, ContentType, Hook, HistoryItem, GenerateResponse } from '@/lib/types';
import {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from '@/lib/storage';
import HookInput from '@/components/HookInput';
import HookGrid from '@/components/HookGrid';
import HistoryDrawer from '@/components/HistoryDrawer';
import SettingsModal from '@/components/SettingsModal';
import { ToastContainer, showToast } from '@/components/Toast';
import { Clock, Settings, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'generate' | 'favorites';

export default function Home() {
  // Input state
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<Platform>('xiaohongshu');
  const [contentType, setContentType] = useState<ContentType>('video');

  // Result state
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('generate');
  const [favorites, setFavorites] = useState<Hook[]>([]);

  // Load history and favorites on mount
  useEffect(() => {
    setHistory(getHistory());
    const favs = getFavorites();
    setFavorites(favs);
    setFavoriteIds(new Set(favs.map((f) => f.id)));
  }, []);

  // Generate hooks
  const handleGenerate = async () => {
    if (!topic.trim()) {
      showToast('warning', '请输入主题内容');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHooks([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), platform, contentType }),
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error || '生成失败，请重试';
        setError(errorMsg);
        showToast('error', errorMsg);

        if (response.status === 500 && errorMsg.includes('API Key')) {
          setSettingsOpen(true);
        }
        return;
      }

      if (data.hooks && data.hooks.length > 0) {
        setHooks(data.hooks);
        showToast('success', `成功生成 ${data.hooks.length} 个 Hook`);

        // Save to history
        const historyItem: HistoryItem = {
          id: nanoid(),
          topic: topic.trim(),
          platform,
          contentType,
          hooks: data.hooks,
          timestamp: Date.now(),
        };
        addToHistory(historyItem);
        setHistory(getHistory());
      }
    } catch (err) {
      const errorMsg = '网络错误，请检查网络连接后重试';
      setError(errorMsg);
      showToast('error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy hook
  const handleCopy = async (hook: Hook) => {
    try {
      await navigator.clipboard.writeText(hook.content);
      showToast('success', '已复制到剪贴板');
    } catch {
      showToast('error', '复制失败，请手动复制');
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (hook: Hook) => {
    if (favoriteIds.has(hook.id)) {
      removeFromFavorites(hook.id);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(hook.id);
        return next;
      });
      setFavorites(getFavorites());
      showToast('info', '已取消收藏');
    } else {
      addToFavorites(hook);
      setFavoriteIds((prev) => new Set(prev).add(hook.id));
      setFavorites(getFavorites());
      showToast('success', '已收藏');
    }
  };

  // Load from history
  const handleLoadHistory = (item: HistoryItem) => {
    setTopic(item.topic);
    setPlatform(item.platform);
    setContentType(item.contentType);
    setHooks(item.hooks);
    setHistoryOpen(false);
    setViewMode('generate');
    showToast('info', '已加载历史记录');
  };

  // Delete history item
  const handleDeleteHistory = (id: string) => {
    removeFromHistory(id);
    setHistory(getHistory());
    showToast('info', '已删除');
  };

  // Clear all history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    showToast('info', '历史记录已清空');
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-effect border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500
                          flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Hook Lab</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">爆款标题生成器</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'generate' ? 'favorites' : 'generate')}
              className={`p-2.5 rounded-xl transition-all duration-200
                ${viewMode === 'favorites'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              title="收藏夹"
            >
              <Heart className={`w-5 h-5 ${viewMode === 'favorites' ? 'fill-current' : ''}`} />
            </button>

            {/* History Button */}
            <button
              onClick={() => setHistoryOpen(true)}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800
                       transition-all duration-200 relative"
              title="历史记录"
            >
              <Clock className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500
                              text-white text-[10px] flex items-center justify-center font-bold">
                  {history.length > 9 ? '9+' : history.length}
                </span>
              )}
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800
                       transition-all duration-200"
              title="设置"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {viewMode === 'generate' ? (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Hero Section */}
              {hooks.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    让 AI 帮你写出
                    <span className="gradient-text"> 爆款开头</span>
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    输入主题，选择平台和内容类型，一键生成 10 个不同风格的 Hook
                  </p>
                </div>
              )}

              {/* Input Section */}
              <HookInput
                topic={topic}
                setTopic={setTopic}
                platform={platform}
                setPlatform={setPlatform}
                contentType={contentType}
                setContentType={setContentType}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-900" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 animate-pulse">
                    AI 正在为你生成爆款 Hook...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto p-6 rounded-2xl bg-red-50 dark:bg-red-900/20
                           border border-red-200 dark:border-red-800 text-center"
                >
                  <p className="text-red-700 dark:text-red-300 font-medium mb-2">{error}</p>
                  <button
                    onClick={handleGenerate}
                    className="mt-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30
                             text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50
                             transition-colors text-sm font-medium"
                  >
                    重试
                  </button>
                </motion.div>
              )}

              {/* Results */}
              {hooks.length > 0 && !isLoading && (
                <HookGrid
                  hooks={hooks}
                  favoriteIds={favoriteIds}
                  onToggleFavorite={handleToggleFavorite}
                  onCopy={handleCopy}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                  我的收藏
                </h2>
                <span className="text-sm text-gray-500">{favorites.length} 个</span>
              </div>

              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-800
                                flex items-center justify-center">
                    <Heart className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">暂无收藏</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    生成 Hook 后点击心形图标即可收藏
                  </p>
                </div>
              ) : (
                <HookGrid
                  hooks={favorites}
                  favoriteIds={favoriteIds}
                  onToggleFavorite={handleToggleFavorite}
                  onCopy={handleCopy}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            AI Hook Lab - Powered by Claude
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onLoad={handleLoadHistory}
        onDelete={handleDeleteHistory}
        onClear={handleClearHistory}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        hasApiKey={false}
      />

      <ToastContainer />
    </main>
  );
}