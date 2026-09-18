import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects.ts'
import { filterProjects } from './projectFilters.ts'

describe('filterProjects', () => {
  it('matches keywords in title, description, technologies, and tags', () => {
    const byTitle = filterProjects(projects, { keyword: 'nimbus' })
    expect(byTitle.some((project) => project.id === 'nimbus-mind')).toBe(true)

    const byDescription = filterProjects(projects, { keyword: 'conversion-focused' })
    expect(byDescription.some((project) => project.id === 'harbor-cart')).toBe(true)

    const byTechnology = filterProjects(projects, { keyword: 'react' })
    expect(byTechnology.length).toBeGreaterThan(0)
    expect(
      byTechnology.every((project) =>
        [project.title, project.description, ...project.technologies, ...project.tags]
          .join(' ')
          .toLowerCase()
          .includes('react'),
      ),
    ).toBe(true)

    const byTag = filterProjects(projects, { keyword: 'healthcare' })
    expect(byTag.some((project) => project.id === 'pulsecare')).toBe(true)
  })

  it('is case insensitive and whitespace tolerant', () => {
    const result = filterProjects(projects, { keyword: '  ReAct   ' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('filters by technology', () => {
    const result = filterProjects(projects, { technology: 'Three.js' })
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('prismforge')
  })

  it('filters by tag', () => {
    const result = filterProjects(projects, { tag: 'E-commerce' })
    expect(result.every((project) => project.tags.includes('E-commerce'))).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('applies combined filters', () => {
    const result = filterProjects(projects, {
      keyword: 'ai',
      technology: 'Python',
      tag: 'AI',
    })
    expect(result.length).toBeGreaterThan(0)
    expect(
      result.every(
        (project) =>
          project.technologies.includes('Python') &&
          project.tags.includes('AI'),
      ),
    ).toBe(true)
  })

  it('returns an empty list when nothing matches', () => {
    const result = filterProjects(projects, { keyword: 'quantum-banana-stack' })
    expect(result).toEqual([])
  })
})
