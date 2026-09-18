import { createContext, useMemo, type ReactNode } from 'react'
import { projects as projectCatalog } from '../data/projects.ts'
import type { Project } from '../types/project.ts'
import { getProjectById } from '../utils/projectFilters.ts'

export interface ProjectContextValue {
  projects: Project[]
  featuredProjects: Project[]
  getProjectById: (projectId: string | undefined) => Project | undefined
}

export const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ProjectContextValue>(
    () => ({
      projects: projectCatalog,
      featuredProjects: projectCatalog.filter((project) => project.featured),
      getProjectById: (projectId) => getProjectById(projectCatalog, projectId),
    }),
    [],
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}
