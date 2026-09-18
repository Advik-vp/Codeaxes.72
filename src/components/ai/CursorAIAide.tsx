import { Sparkles, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useMatch } from 'react-router-dom'
import { useAI } from '../../hooks/useAI.ts'
import { Button } from '../common/Button.tsx'
import { AIMessage } from './AIMessage.tsx'
import { AIPromptSuggestions } from './AIPromptSuggestions.tsx'

const suggestions = [
  'Explain this project',
  'Suggest similar project ideas',
  'How could this project be improved?',
  'What technologies should I learn?',
  'Generate a project inspired by this',
]

export function CursorAIAide() {
  const { isOpen, isThinking, messages, error, openAssistant, closeAssistant, sendMessage } =
    useAI()
  const match = useMatch('/projects/:projectId')
  const projectId = match?.params.projectId
  const titleId = useId()
  const subtitleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }
    inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAssistant()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeAssistant])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const scroller = panelRef.current?.querySelector('[data-chat-scroll]')
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight
    }
  }, [messages, isThinking, isOpen])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = draft.trim()
    if (!next) {
      return
    }
    setDraft('')
    void sendMessage(next, projectId)
  }

  return (
    <>
      <button
        type="button"
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-fg shadow-lg shadow-cyan-500/20 transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none sm:right-6 sm:bottom-6"
        onClick={() => (isOpen ? closeAssistant() : openAssistant())}
        aria-expanded={isOpen}
        aria-controls="codeaxes-ai-panel"
        aria-label={isOpen ? 'Close Codeaxes AI' : 'Open Codeaxes AI'}
      >
        <Sparkles className="size-4" />
        <span className="hidden sm:inline">Codeaxes AI</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/50 lg:bg-zinc-950/20"
            aria-label="Close Codeaxes AI"
            onClick={closeAssistant}
          />
          <aside
            id="codeaxes-ai-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={subtitleId}
            className="absolute inset-y-0 right-0 flex w-full max-w-none flex-col border-l border-line bg-surface shadow-2xl sm:max-w-md"
          >
            <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                  Codeaxes AI
                </h2>
                <p id={subtitleId} className="text-sm text-muted">
                  Your project exploration assistant
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeAssistant} aria-label="Close">
                <X className="size-4" />
              </Button>
            </header>

            <div data-chat-scroll className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.length === 0 ? (
                <p className="text-sm leading-6 text-muted">
                  Ask about architecture, improvements, or what to learn next.
                  {projectId
                    ? ' This conversation is aware of the project you are viewing.'
                    : ' Open a project page for context-aware answers.'}
                </p>
              ) : null}
              {messages.map((message) => (
                <AIMessage key={message.id} message={message} />
              ))}
              {isThinking ? (
                <p className="text-sm text-muted" aria-live="polite">
                  Thinking...
                </p>
              ) : null}
              {error ? (
                <p className="text-sm text-red-600 dark:text-red-300" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="border-t border-line px-5 py-4">
              <AIPromptSuggestions
                suggestions={suggestions}
                disabled={isThinking}
                onSelect={(prompt) => void sendMessage(prompt, projectId)}
              />
              <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
                <label htmlFor="codeaxes-ai-input" className="sr-only">
                  Message Codeaxes AI
                </label>
                <textarea
                  id="codeaxes-ai-input"
                  ref={inputRef}
                  rows={3}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask Codeaxes AI..."
                  className="w-full resize-none rounded-2xl border border-line bg-canvas px-3 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                <Button type="submit" disabled={isThinking || !draft.trim()}>
                  Send
                </Button>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
