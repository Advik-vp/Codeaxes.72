import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'

interface PageContainerProps {
  children: ReactNode
  className?: string
  id?: string
  as?: 'div' | 'section'
}

export function PageContainer({
  children,
  className,
  id,
  as: Component = 'div',
}: PageContainerProps) {
  return (
    <Component
      id={id}
      className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </Component>
  )
}
