import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../utils/cx.ts'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  href?: string
  children: ReactNode
  ref?: Ref<HTMLButtonElement>
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-fg shadow-[0_0_0_1px_rgba(34,211,238,0.28)] hover:brightness-110',
  secondary:
    'border border-line bg-surface text-ink hover:bg-surface-hover hover:border-accent/40',
  ghost: 'text-ink hover:bg-surface-hover',
  danger:
    'bg-red-500/12 text-red-700 hover:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/24',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-2.5',
}

const baseClass =
  'inline-flex items-center justify-center rounded-xl font-medium transition-[color,background-color,border-color,filter,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  children,
  type = 'button',
  ref,
  ...props
}: ButtonProps) {
  const classes = cx(baseClass, variantClass[variant], sizeClass[size], className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
