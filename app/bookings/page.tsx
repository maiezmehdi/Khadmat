'use client';

import { useState } from 'react';
import { BookingCard } from '@/components/blocks/BookingCard';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { useToast } from '@/components/ui/Toast';
import { BOOKINGS } from '@/lib/mock-data';
import { Booking, BookingStatus } from '@/types';
import { cn } from '@/lib/utils';

type Tab = 'active' | 'completed' | 'cancelled';

const TAB_STATUSES: Record<Tab, BookingStatus[]> = {
  active: ['pending', 'confirmed', 'in_progress'],
  completed: ['completed'],
  cancelled: ['cancelled', 'disputed'],
};

export default function BookingsPage() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('active');
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);

  const filtered = bookings.filter(b => TAB_STATUSES[tab].includes(b.status));

  const handleCancel = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    toast(lang === 'dr' ? 'تم إلغاء الحجز' : 'Réservation annulée.', 'info');
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'active', label: lang === 'dr' ? 'الجارية' : 'En cours' },
    { key: 'completed', label: lang === 'dr' ? 'المنجزة' : 'Terminées' },
    { key: 'cancelled', label: lang === 'dr' ? 'الملغاة' : 'Annulées' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <h1 className={`text-2xl font-display font-bold text-[#111827] mb-6 ${lang === 'dr' ? 'font-arabic' : ''}`}>
        {t('bookings')}
      </h1>

      {/* Tabs */}
      <div className="flex bg-[#F8FAF9] rounded-[12px] p-1 mb-6 gap-1">
        {tabs.map(tab_ => (
          <button
            key={tab_.key}
            onClick={() => setTab(tab_.key)}
            className={cn(
              'flex-1 py-2.5 rounded-[8px] text-sm font-semibold transition-all',
              tab === tab_.key
                ? 'bg-white text-[#111827] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]',
              lang === 'dr' ? 'font-arabic' : ''
            )}
          >
            {tab_.label}
          </button>
        ))}
      </div>

      {/* Bookings */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              viewAs="client"
              onCancel={handleCancel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📋</p>
          <p className={`text-[#6B7280] ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('no_bookings')}</p>
        </div>
      )}
    </div>
  );
}
