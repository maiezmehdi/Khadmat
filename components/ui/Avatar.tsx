import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

const sizes: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-3xl',
};

const dotSizes: Record<AvatarSize, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

export function Avatar({ src, name, size = 'md', online, className }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={cn('relative flex-shrink-0 rounded-full', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover', sizes[size])}
        />
      ) : (
        <div className={cn('rounded-full bg-[#10B981] flex items-center justify-center font-bold text-[#111827]', sizes[size])}>
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-white',
          dotSizes[size],
          online ? 'bg-[#16A34A]' : 'bg-[#6B7280]'
        )} />
      )}
    </div>
  );
}
