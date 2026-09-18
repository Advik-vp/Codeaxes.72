import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CursorAIAide } from './CursorAIAide.tsx'
import { renderWithProviders } from '../../test/providers.tsx'

describe('CursorAIAide', () => {
  it('opens and closes the assistant panel', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CursorAIAide />)

    await user.click(screen.getByRole('button', { name: 'Open Codeaxes AI' }))
    expect(screen.getByRole('dialog', { name: 'Codeaxes AI' })).toBeInTheDocument()
    expect(screen.getByText('Your project exploration assistant')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog', { name: 'Codeaxes AI' })).not.toBeInTheDocument()
  })
})
