import { Heart, Moon, Sparkles, Sun } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAI } from '../../hooks/useAI.ts'
import { useFavorites } from '../../hooks/useFavorites.ts'
import { useTheme } from '../../hooks/useTheme.ts'
import { cx } from '../../utils/cx.ts'
import { Button } from '../common/Button.tsx'
import { PageContainer } from './PageContainer.tsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/favorites', label: 'Favorites' },
]

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-ink">
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="9" className="fill-surface stroke-line" />
        <path
          d="M8 16h16M16 8v16"
          className="stroke-accent"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2.4" className="fill-violet" />
        <path
          d="M10 11h4v4M18 17h4v4"
          className="stroke-ink/70"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>
      {compact ? <span className="sr-only">Codeaxes</span> : (
        <span className="text-lg font-semibold tracking-tight">Codeaxes</span>
      )}
    </span>
  )
}

export function Navbar() {
  const { toggleTheme, theme } = useTheme()
  const { openAssistant } = useAI()
  const { favorites } = useFavorites()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cx(
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-surface-hover text-ink'
        : 'text-muted hover:bg-surface-hover hover:text-ink',
    )

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
      <PageContainer className="flex h-16 items-center justify-between gap-3">
        <NavLink to="/" className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <Logo />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
              {link.to === '/favorites' && favorites.length > 0 ? (
                <span className="ml-2 rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">
                  {favorites.length}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => openAssistant()}
          >
            <Sparkles className="size-4" />
            AI Assistant
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <span className="text-lg leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
              </span>
            )}
          </Button>
        </div>
      </PageContainer>

      {open ? (
        <div id={menuId} className="border-t border-line bg-canvas px-4 py-3 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === '/'}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted hover:bg-surface-hover hover:text-ink"
              onClick={() => {
                closeMenu()
                openAssistant()
              }}
            >
              <Sparkles className="size-4" />
              AI Assistant
            </button>
            <NavLink to="/favorites" className={linkClass} onClick={closeMenu}>
              <Heart className="mr-2 inline size-4" />
              Saved projects
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
