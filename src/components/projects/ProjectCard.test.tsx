import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProjectCard } from './ProjectCard.tsx'
import { projects } from '../../data/projects.ts'
import { renderWithProviders } from '../../test/providers.tsx'

describe('ProjectCard', () => {
  it('renders project content, technologies, and actions', () => {
    const project = projects[0]!
    renderWithProviders(<ProjectCard project={project} />)

    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    expect(screen.getByText(project.description)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View project' })).toHaveAttribute(
      'href',
      `/projects/${project.id}`,
    )
    expect(screen.getByAltText(`${project.title} project artwork`)).toHaveAttribute(
      'loading',
      'lazy',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
    for (const technology of project.technologies.slice(0, 4)) {
      expect(screen.getAllByText(technology).length).toBeGreaterThan(0)
    }
  })
})
