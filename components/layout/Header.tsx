'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { Avatar } from '@/components/ui/Avatar';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const navLinks = [{ key: 'home', href: '/' }, { key: 'search', href: '/search' }, { key: 'bookings', href: '/bookings' }];

export function Header() {
  const { lang, user } = useApp();
  const { t } = useTranslation(lang);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E0DDD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-[#1A1614]">Khad<span className="text-[#F5A623]">amat</span></span>
            <span className="text-xs font-arabic text-[#9C9189] hidden sm:inline">خدامات</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.key} href={link.href} className={cn('px-4 py-2 rounded-[8px] text-sm font-medium transition-colors', pathname === link.href ? 'bg-[#F5A623]/10 text-[#D4881A]' : 'text-[#9C9189] hover:text-[#1A1614] hover:bg-[#F7F5F2]')}>
                {t(link.key as 'home' | 'search' | 'bookings')}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:flex" />
            {user ? (
              <>
                <button className="relative p-2 text-[#9C9189] hover:text-[#1A1614] hover:bg-[#F7F5F2] rounded-full transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#E8472A] rounded-full" />
                </button>
                <Link href="/profile"><Avatar src={user.avatar_url} name={user.full_name} size="sm" online /></Link>
              </>
            ) : (
              <Link href="/auth/login" className="bg-[#F5A623] text-[#1A1614] font-semibold text-sm px-4 py-2 rounded-[8px] hover:bg-[#D4881A] transition-colors">
                {t('sign_in')}
              </Link>
            )}
            <button className="md:hidden p-2 text-[#9C9189]" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E0DDD8] px-4 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)} className={cn('px-4 py-3 rounded-[8px] text-sm font-medium transition-colors', pathname === link.href ? 'bg-[#F5A623]/10 text-[#D4881A]' : 'text-[#1A1614] hover:bg-[#F7F5F2]')}>
              {t(link.key as 'home' | 'search' | 'bookings')}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E0DDD8]"><LangSwitch /></div>
        </div>
      )}
    </header>
  );
}
