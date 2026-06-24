'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; type: ToastType; message: string; }
interface ToastContextType { toast: (message: string, type?: ToastType) => void; }

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));
  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={18} className="text-[#27AE60]" />,
    error: <XCircle size={18} className="text-[#E8472A]" />,
    info: <Info size={18} className="text-[#F5A623]" />,
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
        {toasts.map(t => (
          <div key={t.id} className="flex items-center gap-3 bg-white rounded-[12px] shadow-lg px-4 py-3 border border-[#E0DDD8]">
            {icons[t.type]}
            <p className="text-sm text-[#1A1614] flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-[#9C9189] hover:text-[#1A1614]"><X size={14} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }
