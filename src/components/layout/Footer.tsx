import { Link } from 'react-router-dom'
import { PageContainer } from './PageContainer.tsx'
import { Logo } from './Navbar.tsx'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/favorites', label: 'Favorites' },
]

const exploreLinks = [
  { to: '/projects?technology=AI', label: 'AI projects' },
  { to: '/projects?tag=Developer%20Tools', label: 'Developer tools' },
  { to: '/projects?tag=Healthcare', label: 'Healthcare' },
  { to: '/projects?technology=Three.js', label: '3D experiences' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/60">
      <PageContainer className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Explore. Build. Ship. Codeaxes is a project discovery workspace for engineers who
            want architecture, constraints, and a next build — not just a screenshot gallery.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-ink">Navigate</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="text-muted transition-colors hover:text-ink" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-ink">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link className="text-muted transition-colors hover:text-ink" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
      <div className="border-t border-line">
        <PageContainer className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Codeaxes. All rights reserved.</p>
          <p>Guest favorites stay on this device until you connect an account later.</p>
        </PageContainer>
      </div>
    </footer>
  )
}
