import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ProjectCard } from '../components/projects/ProjectCard.tsx'
import { projects } from '../data/projects.ts'
import { STORAGE_KEYS } from '../utils/storage.ts'
import { renderWithProviders } from '../test/providers.tsx'

const sample = projects[0]!

describe('favorites', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  it('adds and removes a favorite', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectCard project={sample} />)

    const addButton = screen.getByRole('button', {
      name: `Save ${sample.title} to favorites`,
    })
    await user.click(addButton)
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]')).toEqual([
      sample.id,
    ])

    const removeButton = screen.getByRole('button', {
      name: `Remove ${sample.title} from favorites`,
    })
    await user.click(removeButton)
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]')).toEqual([])
  })

  it('persists favorites in localStorage across remounts', async () => {
    const user = userEvent.setup()
    const first = renderWithProviders(<ProjectCard project={sample} />)
    await user.click(
      screen.getByRole('button', { name: `Save ${sample.title} to favorites` }),
    )
    first.unmount()

    renderWithProviders(<ProjectCard project={sample} />)
    expect(
      screen.getByRole('button', { name: `Remove ${sample.title} from favorites` }),
    ).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]')).toContain(
      sample.id,
    )
  })
})
