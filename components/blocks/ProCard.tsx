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
  distance?: string;
}

export function ProCard({ pro, compact = false, className, distance }: ProCardProps) {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const name = pro.user?.full_name ?? '';
  const city = pro.user?.city ?? '';
  const service = pro.services?.[0];
  const bio = lang === 'dr' ? pro.bio_dr : pro.bio_fr;

  const unit = service?.price_unit === 'heure'
    ? t('per_hour').replace('/', '')
    : service?.price_unit === 'forfait'
    ? t('flat_rate')
    : t('quote');

  if (compact) {
    return (
      <Link href={`/pro/${pro.id}`}>
        <div className={cn(
          'bg-white rounded-[16px] p-4 shadow-sm border border-[#E0DDD8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-3 items-start',
          className
        )}>
          <Avatar src={pro.user?.avatar_url} name={name} size="md" online />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-[#1A1614] text-sm truncate">{name}</h3>
              {pro.is_approved && <CheckCircle size={12} className="text-[#27AE60] flex-shrink-0" />}
              {distance && (
                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#F5A623] bg-[#F5A623]/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  <MapPin size={8} />{distance}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#9C9189] mt-0.5">
              <MapPin size={10} /><span className="truncate">{city}</span>
            </div>
            <Rating value={pro.rating_avg} count={pro.rating_count} className="mt-1" />
            {service && (
              <p className="text-xs mt-1">
                <span className="font-bold text-[#1A1614]">{service.price_from} DT</span>
                <span className="text-[#9C9189]"> /{unit}</span>
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/pro/${pro.id}`}>
      <div className={cn(
        'bg-white rounded-[16px] p-4 shadow-sm border border-[#E0DDD8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center gap-2',
        className
      )}>
        {/* Avatar centered */}
        <div className="relative">
          <Avatar src={pro.user?.avatar_url} name={name} size="md" online />
          {pro.subscription === 'premium' && (
            <span className="absolute -top-1 -right-1 text-[10px]">⭐</span>
          )}
        </div>

        {/* Name + verified */}
        <div>
          <div className="flex items-center justify-center gap-1">
            <h3 className="font-semibold text-[#1A1614] text-sm leading-snug">{name}</h3>
            {pro.is_approved && <CheckCircle size={12} className="text-[#27AE60] flex-shrink-0" />}
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-[#9C9189] mt-0.5">
            <MapPin size={10} /><span>{city}</span>
          </div>
        </div>

        {/* Rating */}
        <Rating value={pro.rating_avg} count={pro.rating_count} />

        {/* Bio — desktop only */}
        {bio && (
          <p className="hidden sm:block text-xs text-[#9C9189] line-clamp-2 leading-relaxed">{bio}</p>
        )}

        {/* Price */}
        {service && (
          <div className="w-full mt-auto pt-2 border-t border-[#F0EDE8]">
            <p className="font-bold text-[#1A1614] text-sm">
              {service.price_from} DT
              <span className="text-[#9C9189] font-normal text-xs"> /{unit}</span>
            </p>
            {pro.response_time && (
              <div className="flex items-center justify-center gap-1 text-[10px] text-[#9C9189] mt-0.5">
                <Clock size={10} /><span>{pro.response_time} min</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
