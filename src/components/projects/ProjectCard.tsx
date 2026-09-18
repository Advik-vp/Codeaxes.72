import { ExternalLink, GitBranch, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites.ts'
import type { Project } from '../../types/project.ts'
import { cx } from '../../utils/cx.ts'
import { Badge } from '../common/Badge.tsx'
import { Button } from '../common/Button.tsx'

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(project.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
      <Link
        to={`/projects/${project.id}`}
        className="relative block overflow-hidden"
        aria-label={`View ${project.title}`}
      >
        <div className="aspect-[16/10] bg-surface-hover">
          <img
            src={project.thumbnail}
            alt={`${project.title} project artwork`}
            width={800}
            height={500}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              <Link
                to={`/projects/${project.id}`}
                className="rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
          </div>
          <button
            type="button"
            className={cx(
              'rounded-full border p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              saved
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-line text-muted hover:border-accent/40 hover:text-accent',
            )}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove ${project.title} from favorites`
                : `Save ${project.title} to favorites`
            }
            onClick={() => toggleFavorite(project.id)}
          >
            <Heart className={cx('size-4', saved && 'fill-current')} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((technology) => (
            <Badge key={technology} variant="technology">
              {technology}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button to={`/projects/${project.id}`} size="sm">
            View project
          </Button>
          {project.githubUrl ? (
            <Button href={project.githubUrl} variant="secondary" size="sm">
              <GitBranch className="size-4" />
              GitHub
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button href={project.liveUrl} variant="ghost" size="sm">
              <ExternalLink className="size-4" />
              Live demo
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
