'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, CalendarCheck, User } from 'lucide-react';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'home', href: '/', icon: Home },
  { key: 'search', href: '/search', icon: Search },
  { key: 'bookings', href: '/bookings', icon: CalendarCheck },
  { key: 'profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ key, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={key}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-[56px] transition-colors"
            >
              <span className={cn(
                'flex items-center justify-center w-10 h-7 rounded-full transition-all',
                active ? 'bg-[#10B981]' : ''
              )}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} className={active ? 'text-white' : 'text-[#6B7280]'} />
              </span>
              <span className={cn('text-[10px] font-medium', active ? 'text-[#10B981]' : 'text-[#6B7280]')}>
                {t(key as 'home' | 'search' | 'bookings' | 'profile')}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
