import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'active' | 'default' | 'dark' | 'urgent' | 'success';
interface BadgeProps { variant?: BadgeVariant; children: ReactNode; className?: string; }

const variants: Record<BadgeVariant, string> = {
  active: 'bg-[#F5A623]/15 text-[#D4881A]',
  default: 'bg-[#F7F5F2] text-[#9C9189]',
  dark: 'bg-[#1A1614] text-white',
  urgent: 'bg-[#E8472A]/15 text-[#E8472A]',
  success: 'bg-[#27AE60]/15 text-[#27AE60]',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', variants[variant], className)}>{children}</span>;
}
