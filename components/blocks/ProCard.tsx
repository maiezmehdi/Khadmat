'use client';

import Link from 'next/link';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { ProProfile } from '@/types';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface ProCardProps {
  pro: ProProfile;
  compact?: boolean;
  className?: string;
}

export function ProCard({ pro, compact = false, className }: ProCardProps) {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const name = pro.user?.full_name ?? '';
  const city = pro.user?.city ?? '';
  const service = pro.services?.[0];
  const bio = lang === 'dr' ? pro.bio_dr : pro.bio_fr;

  return (
    <Link href={`/pro/${pro.id}`}>
      <div className={cn(
        'bg-white rounded-[16px] p-3 sm:p-4 shadow-sm border border-[#E0DDD8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
        compact ? 'flex gap-3 items-start' : 'flex flex-col gap-2',
        className
      )}>
        <div className={cn('flex items-start gap-2.5', compact && 'flex-1')}>
          <Avatar src={pro.user?.avatar_url} name={name} size="md" online />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-[#1A1614] text-sm leading-snug">{name}</h3>
              {pro.is_approved && (
                <CheckCircle size={12} className="text-[#27AE60] flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#9C9189] mt-0.5">
              <MapPin size={10} />
              <span className="truncate">{city}</span>
            </div>
            <Rating value={pro.rating_avg} count={pro.rating_count} className="mt-1" />
          </div>
        </div>

        {!compact && bio && (
          <p className="hidden sm:block text-sm text-[#9C9189] line-clamp-2 leading-relaxed">{bio}</p>
        )}

        {service && (
          <div className="pt-2 border-t border-[#F0EDE8]">
            <p className="text-[10px] text-[#9C9189] uppercase tracking-wide">{t('price_from')}</p>
            <p className="font-bold text-[#1A1614] text-sm leading-tight">
              {service.price_from} DT
              <span className="text-[#9C9189] font-normal text-xs">
                {' '}/{service.price_unit === 'heure' ? t('per_hour').replace('/', '') : service.price_unit === 'forfait' ? t('flat_rate') : t('quote')}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              {pro.response_time && (
                <div className="flex items-center gap-1 text-[10px] text-[#9C9189]">
                  <Clock size={10} />
                  <span>{pro.response_time} min</span>
                </div>
              )}
              {pro.subscription === 'premium' && (
                <Badge variant="active">Pro ⭐</Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
