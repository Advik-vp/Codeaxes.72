import { Search, X } from 'lucide-react'
import { cx } from '../../utils/cx.ts'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search projects, technologies, or tags',
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
      <input
        id="project-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cx(
          'h-12 w-full rounded-2xl border border-line bg-surface pr-12 pl-11 text-sm text-ink shadow-sm',
          'placeholder:text-muted/80',
          'focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:outline-none',
        )}
      />
      {value ? (
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-muted hover:bg-surface-hover hover:text-ink"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
