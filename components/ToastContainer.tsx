import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className="pointer-events-auto flex items-center gap-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-3 rounded-xl min-w-[280px]"
          >
            {toast.type === 'success' && <CheckCircle size={20} className="text-[#27C93F]" fill="black" />}
            {toast.type === 'error' && <AlertCircle size={20} className="text-[#FF5F56]" fill="black" />}
            {toast.type === 'info' && <Info size={20} className="text-[#29CDFF]" fill="black" />}
            
            <span className="font-heading font-bold text-sm text-black">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;