import { ExternalLink, GitBranch, Heart, Sparkles } from 'lucide-react'
import { useAI } from '../../hooks/useAI.ts'
import { useFavorites } from '../../hooks/useFavorites.ts'
import type { Project } from '../../types/project.ts'
import { Badge } from '../common/Badge.tsx'
import { Button } from '../common/Button.tsx'
import { PageContainer } from '../layout/PageContainer.tsx'

interface ProjectHeroProps {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { openAssistant } = useAI()
  const saved = isFavorite(project.id)

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.12),transparent_32%)]" />
      <PageContainer className="relative grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Codeaxes project
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <Badge key={technology} variant="technology">
                {technology}
              </Badge>
            ))}
            {project.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant={saved ? 'secondary' : 'primary'}
              onClick={() => toggleFavorite(project.id)}
              aria-pressed={saved}
            >
              <Heart className={saved ? 'size-4 fill-current' : 'size-4'} />
              {saved ? 'Saved' : 'Save to favorites'}
            </Button>
            {project.githubUrl ? (
              <Button href={project.githubUrl} variant="secondary">
                <GitBranch className="size-4" />
                GitHub
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button href={project.liveUrl} variant="ghost">
                <ExternalLink className="size-4" />
                Live demo
              </Button>
            ) : null}
            <Button
              variant="ghost"
              onClick={() => openAssistant('Explain this project', project.id)}
            >
              <Sparkles className="size-4" />
              Ask Codeaxes AI
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
          <img
            src={project.thumbnail}
            alt={`${project.title} large project artwork`}
            width={800}
            height={500}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </PageContainer>
    </section>
  )
}
