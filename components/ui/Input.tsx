'use client';

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  iconRight,
  className,
  ...props
}, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-[#111827]">{label}</label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-white border rounded-[12px] px-4 py-3 text-[#111827] text-base placeholder:text-[#6B7280]',
          'focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all',
          error ? 'border-[#E8472A]' : 'border-[#E5E7EB]',
          icon && 'pl-10',
          iconRight && 'pr-10',
          className
        )}
        {...props}
      />
      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
          {iconRight}
        </span>
      )}
    </div>
    {error && (
      <p className="text-xs text-[#E8472A]">{error}</p>
    )}
  </div>
));

Input.displayName = 'Input';
