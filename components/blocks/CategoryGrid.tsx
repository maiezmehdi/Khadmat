'use client';

import Link from 'next/link';
import { Category } from '@/types';
import { useApp } from '@/lib/context';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  categories: Category[];
  activeSlug?: string;
  scrollable?: boolean;
}

export function CategoryGrid({ categories, activeSlug, scrollable = false }: CategoryGridProps) {
  const { lang } = useApp();

  if (scrollable) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map(cat => (
          <CategoryItem key={cat.id} cat={cat} lang={lang} active={cat.slug === activeSlug} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
      {categories.map(cat => (
        <CategoryItem key={cat.id} cat={cat} lang={lang} active={cat.slug === activeSlug} />
      ))}
    </div>
  );
}

function CategoryItem({ cat, lang, active }: { cat: Category; lang: string; active?: boolean }) {
  const name = lang === 'dr' ? cat.name_dr : cat.name_fr;

  return (
    <Link href={`/search?category=${cat.slug}`} className="flex-shrink-0">
      <div className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-[16px] transition-all duration-200 cursor-pointer group',
        active
          ? 'bg-[#1A1614] text-white'
          : 'bg-white hover:bg-[#F7F5F2] border border-[#E0DDD8] hover:border-[#F5A623]'
      )}>
        <span className="text-2xl">{cat.icon}</span>
        <span className={cn(
          'text-xs font-medium text-center leading-tight line-clamp-2',
          lang === 'dr' ? 'font-arabic' : '',
          active ? 'text-white' : 'text-[#1A1614]'
        )}>
          {name}
        </span>
      </div>
    </Link>
  );
}
