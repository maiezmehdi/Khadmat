import { Review } from '@/types';
import { Rating } from '@/components/ui/Rating';
import { Avatar } from '@/components/ui/Avatar';
import { CheckCircle } from 'lucide-react';
import { Lang } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';

interface ReviewCardProps { review: Review; lang: Lang; }

export function ReviewCard({ review, lang }: ReviewCardProps) {
  const name = review.client?.full_name ?? 'Client';
  const comment = lang === 'dr' ? (review.comment_dr || review.comment_fr) : (review.comment_fr || review.comment_dr);
  return (
    <div className="bg-white rounded-[16px] p-4 border border-[#E0DDD8]">
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={name} size="sm" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-[#1A1614]">{name}</p>
            {review.is_verified && <CheckCircle size={13} className="text-[#27AE60]" />}
          </div>
          <p className="text-xs text-[#9C9189]">{formatDate(review.created_at, lang)}</p>
        </div>
        <Rating value={review.rating} size="sm" />
      </div>
      {comment && <p className="text-sm text-[#1A1614]/80 leading-relaxed">{comment}</p>}
    </div>
  );
}
