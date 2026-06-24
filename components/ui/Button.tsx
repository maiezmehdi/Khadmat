'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; loading?: boolean; fullWidth?: boolean;
}

const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
const variants: Record<Variant, string> = {
  primary: 'bg-[#F5A623] text-[#1A1614] hover:bg-[#D4881A] active:scale-[0.98]',
  secondary: 'bg-[#1A1614] text-white hover:bg-[#2a2320] active:scale-[0.98]',
  ghost: 'bg-transparent text-[#1A1614] hover:bg-[#E0DDD8] active:scale-[0.98]',
  danger: 'bg-[#E8472A] text-white hover:bg-[#c93820] active:scale-[0.98]',
};
const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-[8px]',
  md: 'text-base px-6 py-3 rounded-[12px]',
  lg: 'text-lg px-8 py-4 rounded-[16px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', loading = false, fullWidth = false, className, children, disabled, ...props }, ref) => (
  <button ref={ref} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)} {...props}>
    {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
    {children}
  </button>
));
Button.displayName = 'Button';
