import { Sparkles } from 'lucide-react'
import { useAI } from '../hooks/useAI.ts'
import { useProjects } from '../hooks/useProjects.ts'
import { Badge } from '../components/common/Badge.tsx'
import { Button } from '../components/common/Button.tsx'
import { PageContainer } from '../components/layout/PageContainer.tsx'
import { ProjectCard } from '../components/projects/ProjectCard.tsx'

const showcase = [
  { name: 'React', note: 'Interfaces' },
  { name: 'TypeScript', note: 'Contracts' },
  { name: 'Python', note: 'Intelligence' },
  { name: 'Node.js', note: 'Services' },
  { name: 'AI', note: 'Reasoning' },
  { name: 'MongoDB', note: 'Documents' },
  { name: 'PostgreSQL', note: 'Systems of record' },
  { name: 'Cloud', note: 'Delivery' },
  { name: 'Three.js', note: 'Spatial UI' },
]

export default function Home() {
  const { featuredProjects, projects } = useProjects()
  const { openAssistant } = useAI()

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-a" aria-hidden="true" />
        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <PageContainer className="relative grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-accent uppercase">
              Codeaxes
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Build. Explore. Create.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Discover innovative software projects, explore the technologies behind them, and
              turn ideas into your next build.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/projects" size="lg">
                Explore Projects
              </Button>
              <Button variant="secondary" size="lg" onClick={() => openAssistant()}>
                <Sparkles className="size-4" />
                Ask Codeaxes AI
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              {projects.length} cataloged systems · architecture, challenges, and stack included
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div key={project.id} className={index === 1 ? 'sm:mt-8' : undefined}>
                <ProjectCard project={project} priority={index === 0} />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <PageContainer as="section" className="py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              Projects worth studying
            </h2>
          </div>
          <Button to="/projects" variant="ghost">
            View catalog
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index === 0} />
          ))}
        </div>
      </PageContainer>

      <section className="border-y border-line bg-surface/50">
        <PageContainer className="py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Technology showcase</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            The Codeaxes catalog spans product surfaces, data platforms, and model-backed
            systems. Filter the library by any of these axes.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {showcase.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl border border-line bg-canvas px-4 py-4 transition hover:border-accent/40"
              >
                <Badge variant="technology">{item.name}</Badge>
                <p className="mt-3 text-sm text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <PageContainer as="section" className="py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(34,211,238,0.12),transparent_40%)]" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-violet uppercase">
              Codeaxes AI
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Have a project idea?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The assistant explains architecture, suggests improvements, and generates adjacent
              builds. On a project page it already knows the stack and constraints. No private
              API keys live in this frontend.
            </p>
            <div className="mt-6">
              <Button size="lg" onClick={() => openAssistant('Generate a project inspired by this')}>
                <Sparkles className="size-4" />
                Ask Codeaxes AI
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
