import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSportsStore } from '../lib/sportsStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSportsStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-3 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 text-xs ${
              toast.type === 'success'
                ? 'bg-[#0A0D14] text-white border-[#CDFF00]/40'
                : toast.type === 'error'
                ? 'bg-red-950 text-white border-red-600/50'
                : 'bg-neutral-900 text-white border-neutral-700'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#CDFF00]" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="font-extrabold text-white text-[13px]">{toast.title}</div>
              <div className="text-neutral-300 leading-snug">{toast.message}</div>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
