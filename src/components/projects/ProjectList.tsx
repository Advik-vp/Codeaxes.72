import { FolderSearch } from 'lucide-react'
import type { Project } from '../../types/project.ts'
import { Button } from '../common/Button.tsx'
import { EmptyState } from '../common/EmptyState.tsx'
import { ProjectCardSkeleton } from '../common/Skeleton.tsx'
import { ProjectCard } from './ProjectCard.tsx'

interface ProjectListProps {
  projects: Project[]
  isLoading?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

export function ProjectList({
  projects,
  isLoading = false,
  emptyTitle = 'No projects match these filters',
  emptyDescription = 'Try a broader keyword, or clear technology and tag filters to see the full Codeaxes catalog.',
}: ProjectListProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<FolderSearch className="size-10" />}
        title={emptyTitle}
        description={emptyDescription}
        action={
          <Button to="/projects" variant="secondary">
            Browse all projects
          </Button>
        }
      />
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.id}>
          <ProjectCard project={project} priority={index < 3} />
        </li>
      ))}
    </ul>
  )
}
