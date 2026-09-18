import { cx } from '../../utils/cx.ts'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx('animate-pulse rounded-xl bg-line/70', className)}
      aria-hidden="true"
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface p-3">
      <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
      <div className="space-y-3 p-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
