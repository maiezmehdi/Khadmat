import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'active' | 'default' | 'dark' | 'urgent' | 'success';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  active:  'bg-[#F59E0B]/20 text-[#B45309] border border-[#F59E0B]/30',   // amber — premium
  default: 'bg-[#EFF6FF] text-[#3B82F6]',                                  // blue-gray — neutral
  dark:    'bg-[#111827] text-white',                                        // dark
  urgent:  'bg-[#E8472A]/15 text-[#E8472A]',                               // red — urgent
  success: 'bg-[#10B981]/15 text-[#059669] border border-[#10B981]/25',    // green — verified
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}
