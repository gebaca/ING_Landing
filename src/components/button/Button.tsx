import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-3.5 text-base rounded-lg',
};

const variantBase: Record<string, string> = {
  primary: 'bg-[#ff6200] text-white border border-transparent',
  secondary:
    'bg-transparent text-[#3d1400] border border-[#d0c0b0] hover:border-[#ff6200] hover:text-[#ff6200] hover:bg-[#fff3e8]',
  ghost:
    'bg-transparent text-[#ff6200] border border-transparent hover:bg-[#fff3e8]',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // useCallback en vez de contextSafe — mismo resultado,
  // sin acceder al ref durante el render
  const onEnter = useCallback(() => {
    if (disabled) return;
    const el = href ? anchorRef.current : btnRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1.04, duration: 0.2, ease: 'power2.out' });
    if (variant === 'primary') {
      gsap.to(el, {
        boxShadow: '0 6px 20px rgba(255, 98, 0, 0.45)',
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [disabled, href, variant]);

  const onLeave = useCallback(() => {
    const el = href ? anchorRef.current : btnRef.current;
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      boxShadow: '0 0px 0px rgba(255, 98, 0, 0)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }, [href]);

  const onPress = useCallback(() => {
    if (disabled) return;
    const el = href ? anchorRef.current : btnRef.current;
    if (!el) return;
    gsap.to(el, { scale: 0.96, duration: 0.1, ease: 'power2.in' });
  }, [disabled, href]);

  const onRelease = useCallback(() => {
    const el = href ? anchorRef.current : btnRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.15, ease: 'power2.out' });
  }, [href]);

  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium',
    'transition-colors duration-150',
    'outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200] focus-visible:ring-offset-2',
    'select-none',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    sizeClasses[size],
    variantBase[variant],
    className,
  ].join(' ');

  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onPress,
    onMouseUp: onRelease,
  };

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={disabled ? undefined : href}
        className={baseClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        role='button'
        {...handlers}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      {...handlers}
    >
      {children}
    </button>
  );
};
