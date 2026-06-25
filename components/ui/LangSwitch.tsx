'use client';

import { useApp } from '@/lib/context';
import { cn } from '@/lib/utils';

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useApp();

  return (
    <div className={cn('flex items-center bg-[#E5E7EB] rounded-full p-0.5 gap-0.5', className)}>
      <button
        onClick={() => setLang('fr')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
          lang === 'fr'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#111827]'
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLang('dr')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 font-arabic',
          lang === 'dr'
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#111827]'
        )}
      >
        دارجة
      </button>
    </div>
  );
}
