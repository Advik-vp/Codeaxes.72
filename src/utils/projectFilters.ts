import type { Project, ProjectFilters } from '../types/project.ts'

export function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function matchesKeyword(project: Project, keyword: string): boolean {
  if (!keyword) {
    return true
  }

  const haystack = [
    project.title,
    project.description,
    project.overview,
    ...project.technologies,
    ...project.tags,
  ]
    .join(' ')
    .toLowerCase()

  const tokens = normalizeSearchValue(keyword).split(' ').filter(Boolean)
  return tokens.every((token) => haystack.includes(token))
}

function matchesTechnology(project: Project, technology: string): boolean {
  if (!technology) {
    return true
  }
  const expected = normalizeSearchValue(technology)
  return project.technologies.some((item) => normalizeSearchValue(item) === expected)
}

function matchesTag(project: Project, tag: string): boolean {
  if (!tag) {
    return true
  }
  const expected = normalizeSearchValue(tag)
  return project.tags.some((item) => normalizeSearchValue(item) === expected)
}

export function filterProjects(
  projects: Project[],
  { keyword = '', technology = '', tag = '' }: ProjectFilters,
): Project[] {
  const normalizedKeyword = normalizeSearchValue(keyword)
  const normalizedTechnology = normalizeSearchValue(technology)
  const normalizedTag = normalizeSearchValue(tag)

  return projects.filter(
    (project) =>
      matchesKeyword(project, normalizedKeyword) &&
      matchesTechnology(project, normalizedTechnology) &&
      matchesTag(project, normalizedTag),
  )
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  )
}

export function uniqueTechnologies(projects: Project[]): string[] {
  return uniqueSorted(projects.flatMap((project) => project.technologies))
}

export function uniqueTags(projects: Project[]): string[] {
  return uniqueSorted(projects.flatMap((project) => project.tags))
}

export function getProjectById(
  projects: Project[],
  projectId: string | undefined,
): Project | undefined {
  if (!projectId) {
    return undefined
  }
  return projects.find((project) => project.id === projectId)
}
