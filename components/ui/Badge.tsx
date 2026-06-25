import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'active' | 'default' | 'dark' | 'urgent' | 'success';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  active: 'bg-[#10B981]/15 text-[#059669]',
  default: 'bg-[#F8FAF9] text-[#6B7280]',
  dark: 'bg-[#111827] text-white',
  urgent: 'bg-[#E8472A]/15 text-[#E8472A]',
  success: 'bg-[#16A34A]/15 text-[#16A34A]',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}
