import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AIProvider } from '../context/AIContext.tsx'
import { FavoritesProvider } from '../context/FavoritesContext.tsx'
import { ProjectProvider } from '../context/ProjectContext.tsx'
import { ThemeProvider } from '../context/ThemeContext.tsx'

interface ProvidersProps {
  children: ReactNode
  route?: string
}

export function AppProviders({ children, route = '/' }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <FavoritesProvider>
          <MemoryRouter initialEntries={[route]}>
            <AIProvider>{children}</AIProvider>
          </MemoryRouter>
        </FavoritesProvider>
      </ProjectProvider>
    </ThemeProvider>
  )
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { route?: string },
) {
  const { route = '/', ...renderOptions } = options ?? {}
  return render(ui, {
    wrapper: ({ children }) => <AppProviders route={route}>{children}</AppProviders>,
    ...renderOptions,
  })
}
