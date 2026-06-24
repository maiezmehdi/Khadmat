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

interface ProCardProps { pro: ProProfile; compact?: boolean; className?: string; }

export function ProCard({ pro, compact = false, className }: ProCardProps) {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const name = pro.user?.full_name ?? '';
  const city = pro.user?.city ?? '';
  const service = pro.services?.[0];
  const bio = lang === 'dr' ? pro.bio_dr : pro.bio_fr;

  return (
    <Link href={`/pro/${pro.id}`}>
      <div className={cn('bg-white rounded-[16px] p-4 shadow-sm border border-[#E0DDD8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer', compact ? 'flex gap-3 items-start' : 'flex flex-col gap-3', className)}>
        <div className={cn('flex items-start gap-3', compact && 'flex-1')}>
          <Avatar src={pro.user?.avatar_url} name={name} size={compact ? 'md' : 'lg'} online />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-[#1A1614] text-base truncate">{name}</h3>
              {pro.is_approved && <CheckCircle size={14} className="text-[#27AE60] flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#9C9189] mt-0.5">
              <MapPin size={11} /><span>{city}</span>
            </div>
            <Rating value={pro.rating_avg} count={pro.rating_count} className="mt-1" />
          </div>
        </div>
        {!compact && bio && <p className="text-sm text-[#9C9189] line-clamp-2 leading-relaxed">{bio}</p>}
        <div className="flex items-center justify-between flex-wrap gap-2">
          {service && (
            <div className="text-sm">
              <span className="text-[#9C9189]">{t('price_from')} </span>
              <span className="font-bold text-[#1A1614]">{service.price_from} DT</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {pro.response_time && (
              <div className="flex items-center gap-1 text-xs text-[#9C9189]"><Clock size={11} /><span>{pro.response_time} {t('minutes')}</span></div>
            )}
            {pro.subscription === 'premium' && <Badge variant="active">Pro ⭐</Badge>}
          </div>
        </div>
      </div>
    </Link>
  );
}
