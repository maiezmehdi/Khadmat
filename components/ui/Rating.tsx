import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function Rating({ value, count, size = 'sm', className }: RatingProps) {
  const starSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={cn(starSize, star <= Math.round(value) ? 'text-[#F5A623]' : 'text-[#E0DDD8]')}
          >
            ★
          </span>
        ))}
      </div>
      <span className={cn('font-semibold text-[#1A1614]', size === 'sm' ? 'text-sm' : 'text-base')}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-[#9C9189] text-xs">({count})</span>
      )}
    </div>
  );
}
