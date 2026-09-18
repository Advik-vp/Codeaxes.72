import { useAI } from '../../hooks/useAI.ts'
import type { Project } from '../../types/project.ts'
import { Badge } from '../common/Badge.tsx'
import { Button } from '../common/Button.tsx'
import { PageContainer } from '../layout/PageContainer.tsx'
import { ArchitectureDiagram } from './ArchitectureDiagram.tsx'
import { ProjectHero } from './ProjectHero.tsx'
import { ProjectSection } from './ProjectSection.tsx'

interface ProjectDetailProps {
  project: Project
}

const aiActions = [
  { prompt: 'Explain this project', label: 'Explain this project' },
  { prompt: 'Suggest improvements', label: 'Suggest improvements' },
  { prompt: 'Suggest similar projects', label: 'Suggest similar projects' },
  { prompt: 'Generate a related project idea', label: 'Generate a related project idea' },
]

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { openAssistant } = useAI()

  return (
    <article>
      <ProjectHero project={project} />
      <PageContainer className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <ProjectSection title="Overview">
            <p>{project.overview}</p>
          </ProjectSection>
          <ProjectSection title="Features">
            <ul className="list-disc space-y-2 pl-5 text-ink">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </ProjectSection>
          <ProjectSection title="Architecture">
            <p className="mb-6">{project.architecture.replaceAll('\n', ' ')}</p>
            <ArchitectureDiagram architecture={project.architecture} />
          </ProjectSection>
          <ProjectSection title="Challenges">
            <ul className="space-y-3">
              {project.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="rounded-2xl border border-line bg-canvas px-4 py-3 text-ink"
                >
                  {challenge}
                </li>
              ))}
            </ul>
          </ProjectSection>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl border border-line bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Technologies
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge key={technology} variant="technology">
                  {technology}
                </Badge>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-line bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              AI actions
            </h2>
            <div className="mt-4 grid gap-2">
              {aiActions.map((action) => (
                <Button
                  key={action.prompt}
                  variant="secondary"
                  className="justify-start"
                  onClick={() => openAssistant(action.prompt, project.id)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </section>
        </aside>
      </PageContainer>
    </article>
  )
}
