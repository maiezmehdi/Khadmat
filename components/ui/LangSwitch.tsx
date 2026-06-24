'use client';

import { useApp } from '@/lib/context';
import { cn } from '@/lib/utils';

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useApp();

  return (
    <div className={cn('flex items-center bg-[#E0DDD8] rounded-full p-0.5 gap-0.5', className)}>
      <button
        onClick={() => setLang('fr')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
          lang === 'fr'
            ? 'bg-white text-[#1A1614] shadow-sm'
            : 'text-[#9C9189] hover:text-[#1A1614]'
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLang('dr')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 font-arabic',
          lang === 'dr'
            ? 'bg-white text-[#1A1614] shadow-sm'
            : 'text-[#9C9189] hover:text-[#1A1614]'
        )}
      >
        دارجة
      </button>
    </div>
  );
}
