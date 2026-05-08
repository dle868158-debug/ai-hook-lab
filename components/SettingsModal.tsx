'use client';

import { X, Key, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasApiKey: boolean;
}

export default function SettingsModal({ isOpen, onClose, hasApiKey }: SettingsModalProps) {
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6
                   bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
              <Key className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Key 配置</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          {!hasApiKey && (
            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                当前未检测到 API Key
              </p>
              <p>请在项目根目录创建 <code className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/50 font-mono text-xs">.env.local</code> 文件，并添加以下内容：</p>
              <div className="mt-2 p-3 rounded-lg bg-gray-900 dark:bg-black font-mono text-green-400 text-xs overflow-x-auto">
                ANTHROPIC_API_KEY=your_api_key_here
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">配置说明</h3>
            <ul className="space-y-2">
              <li>1. 在根目录创建 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs">.env.local</code> 文件</li>
              <li>2. 添加 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs">ANTHROPIC_API_KEY=your_key</code></li>
              <li>3. 重启开发服务器</li>
              <li>4. 如果部署到 Vercel，请在 Vercel 控制台的环境变量中设置</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">获取 API Key</h3>
            <p>访问 Anthropic 官网获取您的 API Key：</p>
            <a
              href="https://console.anthropic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-primary-600 hover:text-primary-700"
            >
              Anthropic Console
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {hasApiKey && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                API Key 已配置
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900
                     font-medium hover:opacity-90 transition-opacity"
          >
            关闭
          </button>
        </div>
      </motion.div>
    </>
  );
}