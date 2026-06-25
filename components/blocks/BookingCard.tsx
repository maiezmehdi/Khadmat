'use client';

import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Booking } from '@/types';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { formatDateTime, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  viewAs?: 'client' | 'pro';
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
}

const statusLabels: Record<string, 'status_pending' | 'status_confirmed' | 'status_in_progress' | 'status_completed' | 'status_cancelled'> = {
  pending: 'status_pending',
  confirmed: 'status_confirmed',
  in_progress: 'status_in_progress',
  completed: 'status_completed',
  cancelled: 'status_cancelled',
};

export function BookingCard({ booking, viewAs = 'client', onAccept, onCancel, onComplete }: BookingCardProps) {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const pro = booking.pro;
  const category = booking.category;

  const statusKey = statusLabels[booking.status];

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-sm border border-[#E5E7EB]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {pro && (
            <Avatar src={pro.user?.avatar_url} name={pro.user?.full_name ?? ''} size="md" />
          )}
          <div>
            <p className="font-semibold text-[#111827] text-sm">{pro?.user?.full_name}</p>
            <p className="text-xs text-[#6B7280]">{lang === 'dr' ? category?.name_dr : category?.name_fr}</p>
          </div>
        </div>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', getStatusColor(booking.status))}>
          {statusKey ? t(statusKey) : booking.status}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <CalendarDays size={14} />
          <span>{formatDateTime(booking.scheduled_at)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <MapPin size={14} />
          <span className="truncate">{booking.address}</span>
        </div>
        {booking.price_quoted && (
          <div className="text-sm">
            <span className="text-[#6B7280]">Prix : </span>
            <span className="font-semibold text-[#111827]">{booking.price_quoted} DT</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {viewAs === 'pro' && booking.status === 'pending' && (
          <>
            <Button size="sm" variant="primary" onClick={() => onAccept?.(booking.id)}>
              {t('accept')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onCancel?.(booking.id)}>
              {t('refuse')}
            </Button>
          </>
        )}
        {viewAs === 'pro' && booking.status === 'confirmed' && (
          <Button size="sm" variant="secondary" onClick={() => onComplete?.(booking.id)}>
            {t('mark_done')}
          </Button>
        )}
        {viewAs === 'client' && booking.status === 'completed' && (
          <Link href={`/booking/${booking.id}/review`}>
            <Button size="sm" variant="primary">{t('leave_review')}</Button>
          </Link>
        )}
        {['pending', 'confirmed'].includes(booking.status) && (
          <Button size="sm" variant="ghost" className="text-[#E8472A] hover:bg-[#E8472A]/10" onClick={() => onCancel?.(booking.id)}>
            {t('cancel')}
          </Button>
        )}
      </div>
    </div>
  );
}
