import { Heart } from 'lucide-react'
import { Button } from '../components/common/Button.tsx'
import { EmptyState } from '../components/common/EmptyState.tsx'
import { PageContainer } from '../components/layout/PageContainer.tsx'
import { ProjectList } from '../components/projects/ProjectList.tsx'
import { useFavorites } from '../hooks/useFavorites.ts'
import { useProjects } from '../hooks/useProjects.ts'

export default function Favorites() {
  const { projects } = useProjects()
  const { favorites, clearFavorites } = useFavorites()
  const saved = projects.filter((project) => favorites.includes(project.id))

  return (
    <main id="main-content">
      <PageContainer className="py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              Library
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">Favorites</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Saved projects stay in this browser as a guest. When authentication lands, these
              IDs can sync to a user account without changing the rest of the UI.
            </p>
          </div>
          {saved.length > 0 ? (
            <Button variant="ghost" onClick={clearFavorites}>
              Clear all
            </Button>
          ) : null}
        </div>
        {saved.length === 0 ? (
          <EmptyState
            icon={<Heart className="size-10" />}
            title="No favorites yet"
            description="Save a Codeaxes project from any card or detail page. Your list will reappear after refresh on this device."
            action={
              <Button to="/projects" variant="secondary">
                Explore projects
              </Button>
            }
          />
        ) : (
          <ProjectList
            projects={saved}
            emptyTitle="No favorites yet"
            emptyDescription="Save a project to keep it here."
          />
        )}
      </PageContainer>
    </main>
  )
}
