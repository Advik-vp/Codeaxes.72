import { Filter, X } from 'lucide-react'
import { cx } from '../../utils/cx.ts'
import { Button } from '../common/Button.tsx'

interface FilterPanelProps {
  technologies: string[]
  tags: string[]
  selectedTechnology: string
  selectedTag: string
  onTechnologyChange: (technology: string) => void
  onTagChange: (tag: string) => void
  onClear: () => void
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        selected
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-line bg-canvas text-muted hover:border-accent/40 hover:text-ink',
      )}
    >
      {label}
    </button>
  )
}

export function FilterPanel({
  technologies,
  tags,
  selectedTechnology,
  selectedTag,
  onTechnologyChange,
  onTagChange,
  onClear,
}: FilterPanelProps) {
  const hasFilters = Boolean(selectedTechnology || selectedTag)

  return (
    <section
      aria-label="Project filters"
      className="rounded-3xl border border-line bg-surface p-4 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Filter className="size-4 text-accent" />
          Filters
        </div>
        {hasFilters ? (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="size-4" />
            Clear filters
          </Button>
        ) : null}
      </div>
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Technology
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <FilterChip
                key={technology}
                label={technology}
                selected={selectedTechnology === technology}
                onClick={() =>
                  onTechnologyChange(selectedTechnology === technology ? '' : technology)
                }
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <FilterChip
                key={tag}
                label={tag}
                selected={selectedTag === tag}
                onClick={() => onTagChange(selectedTag === tag ? '' : tag)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
