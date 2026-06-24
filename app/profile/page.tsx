'use client';

import Link from 'next/link';
import { User, Bell, Globe, LogOut, ChevronRight, Star, CalendarCheck } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { BOOKINGS } from '@/lib/mock-data';

export default function ProfilePage() {
  const { lang, user } = useApp();
  const { t } = useTranslation(lang);

  const mockUser = {
    full_name: 'Ahmed Khalil',
    phone: '+216 98 123 456',
    city: 'Tunis',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  };

  const displayUser = user ?? mockUser;
  const completedBookings = BOOKINGS.filter(b => b.status === 'completed').length;

  const menuItems = [
    { icon: CalendarCheck, labelFr: 'Mes réservations', labelDr: 'حجوزاتي', href: '/bookings' },
    { icon: Star, labelFr: 'Mes avis', labelDr: 'تقييماتي', href: '#' },
    { icon: Bell, labelFr: 'Notifications', labelDr: 'الإشعارات', href: '#' },
    { icon: Globe, labelFr: 'Langue', labelDr: 'اللغة', href: '#', isLang: true },
    { icon: User, labelFr: 'Devenir pro', labelDr: 'انضم كحرفي', href: '/auth/register-pro' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-[24px] border border-[#E0DDD8] p-6 mb-6 text-center">
        <Avatar
          src={displayUser.avatar_url}
          name={displayUser.full_name}
          size="xl"
          className="mx-auto mb-4"
        />
        <h1 className="text-xl font-display font-bold text-[#1A1614] mb-1">{displayUser.full_name}</h1>
        <p className="text-sm text-[#9C9189]">{displayUser.phone}</p>
        <p className="text-sm text-[#9C9189]">{displayUser.city}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E0DDD8]">
          {[
            { label: lang === 'dr' ? 'الحجوزات' : 'Réservations', value: BOOKINGS.length },
            { label: lang === 'dr' ? 'المنجزة' : 'Terminées', value: completedBookings },
            { label: lang === 'dr' ? 'تقييماتي' : 'Avis donnés', value: 2 },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-xl font-bold text-[#1A1614]">{stat.value}</p>
              <p className={`text-xs text-[#9C9189] mt-0.5 ${lang === 'dr' ? 'font-arabic' : ''}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-[24px] border border-[#E0DDD8] overflow-hidden mb-6">
        {menuItems.map((item, i) => (
          <div key={item.labelFr}>
            {i > 0 && <div className="h-px bg-[#E0DDD8] mx-4" />}
            {item.isLang ? (
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#F7F5F2] rounded-[10px] flex items-center justify-center">
                    <item.icon size={18} className="text-[#9C9189]" />
                  </div>
                  <span className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                    {lang === 'dr' ? item.labelDr : item.labelFr}
                  </span>
                </div>
                <LangSwitch />
              </div>
            ) : (
              <Link href={item.href} className="flex items-center justify-between px-5 py-4 hover:bg-[#F7F5F2] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#F7F5F2] rounded-[10px] flex items-center justify-center">
                    <item.icon size={18} className="text-[#9C9189]" />
                  </div>
                  <span className={`text-sm font-medium text-[#1A1614] ${lang === 'dr' ? 'font-arabic' : ''}`}>
                    {lang === 'dr' ? item.labelDr : item.labelFr}
                  </span>
                </div>
                <ChevronRight size={16} className="text-[#9C9189]" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Sign Out */}
      <Button variant="ghost" fullWidth className="text-[#E8472A] hover:bg-[#E8472A]/5 border border-[#E8472A]/20">
        <LogOut size={16} />
        <span className={lang === 'dr' ? 'font-arabic' : ''}>{t('sign_out')}</span>
      </Button>

      <p className="text-center text-xs text-[#9C9189] mt-6">
        Khadamat v1.0 · خدامات
      </p>
    </div>
  );
}
