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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E0DDD8] safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ key, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[8px] min-w-[56px] transition-colors',
                active ? 'text-[#F5A623]' : 'text-[#9C9189]'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">
                {t(key as 'home' | 'search' | 'bookings' | 'profile')}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
