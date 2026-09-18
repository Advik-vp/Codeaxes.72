import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from '../App.tsx'
import { renderWithProviders } from '../test/providers.tsx'

describe('routing', () => {
  it('renders a valid project route', async () => {
    renderWithProviders(<AppShell />, { route: '/projects/nimbus-mind' })
    expect(await screen.findByRole('heading', { name: 'NimbusMind', level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/AI knowledge workspace/i)).toBeInTheDocument()
  })

  it('renders a professional not-found state for an invalid project', async () => {
    renderWithProviders(<AppShell />, { route: '/projects/missing-project' })
    expect(await screen.findByRole('heading', { name: /off the map/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /browse projects/i })).toBeInTheDocument()
  })
})
