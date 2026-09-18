import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FilterPanel } from './FilterPanel.tsx'

describe('FilterPanel', () => {
  it('toggles technology and tag filters and can clear them', async () => {
    const user = userEvent.setup()
    const onTechnologyChange = vi.fn()
    const onTagChange = vi.fn()
    const onClear = vi.fn()

    const { rerender } = render(
      <FilterPanel
        technologies={['React', 'Python']}
        tags={['AI', 'SaaS']}
        selectedTechnology=""
        selectedTag=""
        onTechnologyChange={onTechnologyChange}
        onTagChange={onTagChange}
        onClear={onClear}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'React' }))
    expect(onTechnologyChange).toHaveBeenCalledWith('React')
    await user.click(screen.getByRole('button', { name: 'AI' }))
    expect(onTagChange).toHaveBeenCalledWith('AI')

    rerender(
      <FilterPanel
        technologies={['React', 'Python']}
        tags={['AI', 'SaaS']}
        selectedTechnology="React"
        selectedTag="AI"
        onTechnologyChange={onTechnologyChange}
        onTagChange={onTagChange}
        onClear={onClear}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(onClear).toHaveBeenCalled()
  })
})
