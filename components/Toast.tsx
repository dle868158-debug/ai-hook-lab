'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
};

function Toast({ id, type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm
                 ${bgColors[type]} max-w-sm`}
    >
      {icons[type]}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </motion.div>
  );
}

// Toast Manager
let toastId = 0;
let addToastHandler: ((toast: { type: ToastType; message: string }) => void) | null = null;

export function showToast(type: ToastType, message: string) {
  if (addToastHandler) {
    addToastHandler({ type, message });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'>>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    addToastHandler = (toast) => {
      const id = `toast-${++toastId}`;
      setToasts((prev) => [...prev, { ...toast, id }]);
    };

    return () => {
      addToastHandler = null;
    };
  }, []);

  const handleClose = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={handleClose} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}