import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CursorAIAide } from './components/ai/CursorAIAide.tsx'
import { ProjectCardSkeleton } from './components/common/Skeleton.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { PageContainer } from './components/layout/PageContainer.tsx'
import { AIProvider } from './context/AIContext.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'
import { ProjectProvider } from './context/ProjectContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

const Home = lazy(() => import('./pages/Home.tsx'))
const Projects = lazy(() => import('./pages/Projects.tsx'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails.tsx'))
const Favorites = lazy(() => import('./pages/Favorites.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </ProjectProvider>
    </ThemeProvider>
  )
}

function PageFallback() {
  return (
    <PageContainer className="grid gap-6 py-16 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </PageContainer>
  )
}

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <CursorAIAide />
    </div>
  )
}

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AIProvider>
          <AppShell />
        </AIProvider>
      </BrowserRouter>
    </Providers>
  )
}
