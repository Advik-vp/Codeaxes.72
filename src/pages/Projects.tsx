import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterPanel } from '../components/search/FilterPanel.tsx'
import { SearchBar } from '../components/search/SearchBar.tsx'
import { ProjectList } from '../components/projects/ProjectList.tsx'
import { PageContainer } from '../components/layout/PageContainer.tsx'
import { useProjects } from '../hooks/useProjects.ts'
import { filterProjects, uniqueTags, uniqueTechnologies } from '../utils/projectFilters.ts'

export default function Projects() {
  const { projects } = useProjects()
  const [params, setParams] = useSearchParams()
  const keyword = params.get('q') ?? ''
  const technology = params.get('technology') ?? ''
  const tag = params.get('tag') ?? ''

  const technologies = useMemo(() => uniqueTechnologies(projects), [projects])
  const tags = useMemo(() => uniqueTags(projects), [projects])
  const filtered = useMemo(
    () => filterProjects(projects, { keyword, technology, tag }),
    [projects, keyword, technology, tag],
  )

  const update = (next: { q?: string; technology?: string; tag?: string }) => {
    const merged = {
      q: next.q ?? keyword,
      technology: next.technology ?? technology,
      tag: next.tag ?? tag,
    }
    const search = new URLSearchParams()
    if (merged.q.trim()) search.set('q', merged.q)
    if (merged.technology) search.set('technology', merged.technology)
    if (merged.tag) search.set('tag', merged.tag)
    setParams(search, { replace: true })
  }

  return (
    <main id="main-content">
      <PageContainer className="py-10">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">Projects</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Search the Codeaxes library by name, description, stack, or tag. Filters update the
          grid immediately.
        </p>
        <div className="mt-8 space-y-4">
          <SearchBar value={keyword} onChange={(value) => update({ q: value })} />
          <FilterPanel
            technologies={technologies}
            tags={tags}
            selectedTechnology={technology}
            selectedTag={tag}
            onTechnologyChange={(value) => update({ technology: value })}
            onTagChange={(value) => update({ tag: value })}
            onClear={() => setParams({}, { replace: true })}
          />
          <p className="text-sm text-muted" aria-live="polite">
            Showing {filtered.length} of {projects.length} projects
          </p>
          <ProjectList projects={filtered} />
        </div>
      </PageContainer>
    </main>
  )
}
