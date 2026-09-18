import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'

interface ProjectSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function ProjectSection({
  title,
  children,
  defaultOpen = true,
}: ProjectSectionProps) {
  return (
    <details
      className="group rounded-3xl border border-line bg-surface"
      open={defaultOpen}
    >
      <summary
        className={cx(
          'flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-line px-5 py-5 text-sm leading-7 text-muted">
        {children}
      </div>
    </details>
  )
}
