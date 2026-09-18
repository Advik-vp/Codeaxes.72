import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface/70 px-6 py-16 text-center',
        className,
      )}
    >
      {icon ? <div className="mb-4 text-accent">{icon}</div> : null}
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
