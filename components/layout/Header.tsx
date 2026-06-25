'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { Avatar } from '@/components/ui/Avatar';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'search', href: '/search' },
  { key: 'bookings', href: '/bookings' },
];

const menuVariants: Variants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeInOut' } },
  open:   { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
};

const iconVariants: Variants = {
  closed: { rotate: 0,   scale: 1,    transition: { duration: 0.2 } },
  open:   { rotate: 90,  scale: 1.1,  transition: { duration: 0.2 } },
};

export function Header() {
  const { lang, user } = useApp();
  const { t } = useTranslation(lang);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-[#111827]">
              Khad<span className="text-[#10B981]">amat</span>
            </span>
            <span className="text-xs font-arabic text-[#6B7280]">خدامات</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-[8px] text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[#10B981]/10 text-[#059669]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAF9]'
                )}
              >
                {t(link.key as 'home' | 'search' | 'bookings')}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:flex" />

            {user ? (
              <>
                <button className="relative p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAF9] rounded-full transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#E8472A] rounded-full" />
                </button>
                <Link href="/profile">
                  <Avatar src={user.avatar_url} name={user.full_name} size="sm" online />
                </Link>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex bg-[#10B981] text-white font-semibold text-sm px-4 py-2 rounded-[8px] hover:bg-[#059669] transition-colors"
              >
                {t('sign_in')}
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-[#6B7280] hover:text-[#111827] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <motion.div
                animate={mobileOpen ? 'open' : 'closed'}
                variants={iconVariants}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — animated */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden bg-white border-t border-[#E5E7EB]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.key} custom={i} variants={itemVariants} initial="closed" animate="open">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-[10px] text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-[#10B981]/10 text-[#059669]'
                        : 'text-[#111827] hover:bg-[#F8FAF9]'
                    )}
                  >
                    {t(link.key as 'home' | 'search' | 'bookings')}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="pt-3 mt-1 border-t border-[#E5E7EB] flex items-center justify-between"
              >
                <LangSwitch />
                {!user && (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="bg-[#10B981] text-white font-semibold text-sm px-4 py-2 rounded-[8px] hover:bg-[#059669] transition-colors"
                  >
                    {t('sign_in')}
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
