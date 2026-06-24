'use client';
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; icon?: ReactNode; iconRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, iconRight, className, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-[#1A1614]">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9189]">{icon}</span>}
      <input ref={ref} className={cn('w-full bg-white border rounded-[12px] px-4 py-3 text-[#1A1614] text-base placeholder:text-[#9C9189] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all', error ? 'border-[#E8472A]' : 'border-[#E0DDD8]', icon && 'pl-10', iconRight && 'pr-10', className)} {...props} />
      {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9189]">{iconRight}</span>}
    </div>
    {error && <p className="text-xs text-[#E8472A]">{error}</p>}
  </div>
));
Input.displayName = 'Input';
