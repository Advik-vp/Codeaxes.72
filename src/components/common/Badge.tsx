import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'

export type BadgeVariant = 'technology' | 'tag' | 'status'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variantClass: Record<BadgeVariant, string> = {
  technology:
    'border-cyan-500/25 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200',
  tag: 'border-violet-500/25 bg-violet-500/10 text-violet-800 dark:text-violet-200',
  status: 'border-line bg-surface-hover text-muted',
}

export function Badge({
  variant = 'status',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
